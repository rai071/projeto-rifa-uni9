import { Component, OnInit } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from '../messages/notification.service';
import { Usuario } from '../security/login/user.model';
import { ServiceConf } from '../service/service-config';
import { TokenRifa } from './token/token-rifa';
import { Lista } from './rifan-items';
import { FormControl } from '@angular/forms';
import { ShowMyRifa } from './show-rifa/show-my-rifa';

export interface PeriodicElement {
  id_nome: string;
  group_id: string;
  nome_numero: string;
  pago: string;
  email_amigo: string;
}
export interface UserToken {
  user_token: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-rifan',
  templateUrl: './rifan.component.html',
  styleUrls: ['./rifan.component.css']
})
export class RifanComponent implements OnInit {

  displayedColumns: string[] = ['id_nome', 'nome_numero', 'pago'];
  dataSource = new MatTableDataSource<Lista>();
  selection = new SelectionModel<Lista>(true, []);

  usuario = {} as Usuario;

  tokenRifa = {} as TokenRifa;

  lista: Lista[] = [];

  email: string;

  userToken = {} as UserToken;

  notificationService: NotificationService;

  group: PeriodicElement[] = [];

  selectedValue: string;

  rifa: ShowMyRifa[] = [];

  constructor(private router: Router, private service: ServiceConf) {
    if (sessionStorage.length > 0) {
      this.usuario = JSON.parse(sessionStorage.getItem('user'));
      const e = JSON.parse(sessionStorage.getItem('rifa_token'));
      if (e) {
        this.email = e.email;
      }
    }

    if (this.usuario) {
      this.userToken.user_token = this.usuario.user_token;
      this.service.findMyRifa(this.userToken).subscribe({
        next: data => {
          this.rifa = data;
        },
        error: erro => {
          console.log(erro);
        }
      });
    }

    if (sessionStorage.getItem('tokenFriend')) {
      sessionStorage.removeItem('user');
      this.tokenRifa.rifa_token = sessionStorage.getItem('tokenFriend');
      this.service.showNamesRifaFriend(this.tokenRifa).subscribe({
        next: data => {
          this.lista = data;
          this.dataSource = new MatTableDataSource(this.lista);
        },
        error: erro => {
          console.log('erro', erro);
        }
      });
    }

  }

  ngOnInit() {
  }

  isAllSelected() {

    if (this.selection.selected.length > 0) {
      if (this.usuario) {
        this.selection.selected[0].pago = '1';
      } else {
        this.selection.selected[0].pago = '0';
      }
    }

    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_nome + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected1(row?: PeriodicElement, event?: any) {
    this.notificationService = new NotificationService(this.router);

    if (this.usuario) {
      const msg = `Você não pode comprar`;
      this.notificationService.simpleAlert(msg);
    } else {
      const s = row.email_amigo;
      let e: string;
      if (this.usuario) {
        e = this.usuario.user_email;
      } else if (this.email) {
        e = this.email;
      }
      if (row.pago === '1') {
        if (s === e && event === 1) {
          row.email_amigo = '';
          row.pago = '0';
        } else {
          const msg = `Número já selecionado`;
          this.notificationService.simpleAlert(msg);
        }
      } else if (this.usuario && this.usuario.user_email) {
        row.email_amigo = this.usuario.user_email;
        row.pago = '1';
        const msg = `Adicionado 1 item ao Carrinho`;
        this.notificationService.simpleAlert(msg);
      } else if (this.email) {
        row.email_amigo = this.email;
        row.pago = '1';
        const msg = `Adicionado 1 item ao Carrinho`;
        this.notificationService.simpleAlert(msg);
      } else {
        this.notificationService.alertConfirmation();
      }

    }
  }

  emitAddEvent(item: any) {
    this.isAllSelected1(item.rifaItem, 1);
  }

  showRifaSelected() {
    this.tokenRifa.rifa_token = this.selectedValue;
    this.service.showNamesRifaFriend(this.tokenRifa).subscribe({
      next: data => {
        this.lista = data;
        this.dataSource = new MatTableDataSource(this.lista);
      },
      error: erro => {
        console.log('erro', erro);
      }
    });
  }

}
