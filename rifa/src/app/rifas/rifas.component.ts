import { Component, Injectable, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { empty, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../messages/notification.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RifaCartItem } from './rifas-cart/cart-item-model';
import { RifasCartComponent } from './rifas-cart/rifas-cart.component';
import { RifasCartService } from './rifas-cart/cart-service';
import { Usuario } from '../security/login/user.model';
@Component({
  selector: 'app-rifas',
  templateUrl: './rifas.component.html',
  styleUrls: ['./rifas.component.css']
})

export class RifasComponent implements OnInit {

  menuItemState = 'ready';

  @Input() rifaCartItem: RifaCartItem;
  @Output() add = new EventEmitter();

  LIMIT_SELECT_NUMBER = 3;

  users: [
    { id: 1, numero: '1', filme: 'Vingadores', email: '', flag: false, price: 2.00 },
    { id: 2, numero: '2', filme: 'Tropa de Elite', email: 'rai071@github.com', flag: false, price: 2.00 },
    { id: 3, numero: '3', filme: 'Star Wars', email: '', flag: false, price: 2.00 },
    { id: 4, numero: '4', filme: 'Godzilla', email: '', flag: false, price: 2.00 },
    { id: 5, numero: '5', filme: 'Matrix', email: '', flag: false, price: 2.00 },
    { id: 6, numero: '6', filme: 'John Wick', email: '', flag: false, price: 2.00 },
    { id: 7, numero: '7', filme: 'Farofeiros', email: '', flag: false, price: 2.00 },
    { id: 8, numero: '8', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 },
    { id: 9, numero: '9', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 },
    { id: 10, numero: '10', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 },
    { id: 11, numero: '11', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 },
    { id: 12, numero: '12', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 },
    { id: 13, numero: '13', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 },
    { id: 14, numero: '14', filme: 'Central do Brasil', email: '', flag: false, price: 2.00 }
  ];

  customers: any[];

  scrollableCols: any[];

  time = new Date();

  searchBarState = 'hidden';
  usuario = {} as Usuario;

  searchForm: FormGroup;
  searchControl: FormControl;

  notificationService: NotificationService;

  constructor(private router: Router) {
    if (sessionStorage.length > 0) {
      this.usuario = JSON.parse(sessionStorage.getItem('user'));
    }
  }

  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.scrollableCols = [
      { field: 'id', header: 'Id' },
      { field: 'date', header: 'Date' },
      { field: 'company', header: 'Company' },
      { field: 'status', header: 'Status' },
      { field: 'activity', header: 'Activity' }
  ];
  }

  public selectUsers(event: any, user: any) {
    this.notificationService = new NotificationService(this.router);
    user.flag = !user.flag;
    const s = user.email;
    if (s) {
      if (s === this.usuario.user_email && event === 1) {
        user.email = '';
      } else {
        const msg = `Número já selecionado`;
        this.notificationService.simpleAlert(msg);
      }
    } else if (this.usuario.user_email) {
      user.email = this.usuario.user_email;
      const msg = `Adicionado 1 item ao Carrinho`;
      this.notificationService.simpleAlert(msg);
    } else {
      this.notificationService.alertConfirmation();
    }
  }

  alertRemoverItemConfirmation(msg: string, user: any) {
    Swal.fire({
      title: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonText: 'Fechar'
    }).then((result) => {
      if (result.value) {
        user.email = '';
      }
    });
  }

  emitAddEvent(item: any) {
    this.selectUsers(1, item.rifaItem);
  }

}
