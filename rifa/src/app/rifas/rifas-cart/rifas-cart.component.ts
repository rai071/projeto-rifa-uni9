import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { RifasCartService } from './cart-service';
import { RifasComponent } from '../rifas.component';
import { RifanComponent } from 'src/app/rifan/rifan.component';
import { RifaItem } from '../rifa-item.model';
import { NotificationService } from 'src/app/messages/notification.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceConf } from 'src/app/service/service-config';
export interface Payment {
  email: string;
  rifa_token: string;
  id_number: string;
}

@Component({
  selector: 'app-rifas-cart',
  templateUrl: './rifas-cart.component.html',
  styleUrls: ['./rifas-cart.component.css'],
  providers: [RifasCartService, RifasComponent],
  animations: [
    trigger('row', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        style({ opacity: 0, transform: 'translateX(-30px)', offset: 0 }),
        style({ opacity: 0.8, transform: 'translateX(10px)', offset: 0.8 }),
        style({ opacity: 1, transform: 'translateX(0px)', offset: 1 })
      ]))),
      transition('ready => void', animate('300ms 0s ease-out', keyframes([
        style({ opacity: 1, transform: 'translateX(0px)', offset: 0 }),
        style({ opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2 }),
        style({ opacity: 0, transform: 'translateX(30px)', offset: 1 })
      ])))
    ])
  ]
})
export class RifasCartComponent implements OnInit {

  rowState = 'ready';
  itemAllRemove: any;

  itemsSelecionados: RifaItem[] = [];

  payment = {} as Payment;

  sendPayment: Payment[] = [];

  notificationService: NotificationService;

  constructor(
    private rifasCartService: RifasCartService,
    private rifa: RifasComponent,
    private rifan: RifanComponent,
    private router: Router,
    private service: ServiceConf) { }

  ngOnInit() {
  }

  items(): any[] {
    return this.rifasCartService.items;
  }

  clear() {
    this.itemAllRemove = 'all';
    this.rifa.emitAddEvent(this.itemAllRemove);
    this.rifasCartService.clear();
  }

  removeItem(item: any) {
    // this.rifa.emitAddEvent(item);
    this.rifan.emitAddEvent(item);
    this.rifasCartService.removeItem(item);
  }

  addItem(item: any) {
    this.rifasCartService.addItem(item);
  }

  total(): number {
    return this.rifasCartService.total();
  }

  comprar() {
    this.notificationService = new NotificationService(this.router);
    if (sessionStorage.getItem('tokenFriend')) {
      const token = sessionStorage.getItem('tokenFriend');
      const e = JSON.parse(sessionStorage.getItem('rifa_token'));
      this.itemsSelecionados = this.items();
      this.itemsSelecionados.forEach((x) => {
        this.payment = {} as Payment;
        this.payment.email = e.email;
        this.payment.id_number = x.rifaItem.id_nome;
        this.payment.rifa_token = token;
        this.service.payNumber(this.payment).subscribe({
          next: data => {
            console.log(data);
          },
          error: erro => {
            console.log(erro);
          }
        });
      });
      this.rifasCartService.removeAllItem(this.items());
      this.notificationService.simpleAlertSuccess('Compra feita com sucesso, boa sorte !');
    } else {
      this.notificationService.msgShowError();
    }
  }

  msgShowError() {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      html: '<div style="font-size: 14px"> Algo deu errado! </div>'
    });
  }

}
