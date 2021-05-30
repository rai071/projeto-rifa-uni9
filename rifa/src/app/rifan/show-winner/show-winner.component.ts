import { Component, OnInit, ViewChild } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/messages/notification.service';
import { Usuario } from 'src/app/security/login/user.model';

import { ServiceConf } from 'src/app/service/service-config';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { ShowMyRifa } from '../show-rifa/show-my-rifa';
import { GroupRifa } from '../create-rifa/group-rifa';
import { ShowRifaModel } from '../show-rifa/show-rifa-model';

export interface PeriodicElement {
  rifa_name: string;
  rifa_token: string;
  actions?: string;
}

export interface Token {
  user_token: string;
}

export interface RafllerWinner {
  id: string;
  nome: string;
  email_amigo: string;
}

@Component({
  selector: 'app-show-winner',
  templateUrl: './show-winner.component.html',
  styleUrls: ['./show-winner.component.css']
})
export class ShowWinnerComponent implements OnInit {

  winner = {} as ShowRifaModel;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns: string[] = ['rifa_name', 'actions'];
  dataSource = new MatTableDataSource<ShowMyRifa>();
  selection = new SelectionModel<ShowMyRifa>(true, []);

  usuario = {} as Usuario;
  myRifa = {} as ShowMyRifa;
  tokeUser = {} as Token;
  dados = {} as GroupRifa;
  rafllerWinner = {} as RafllerWinner;

  notificationService: NotificationService;

  constructor(private router: Router, private service: ServiceConf) {
    this.winner = JSON.parse(sessionStorage.getItem('winner'));
    if (this.winner) {
      console.log(this.winner);
    } else if (sessionStorage.length > 0) {
      this.usuario = JSON.parse(sessionStorage.getItem('user'));
      this.tokeUser.user_token = this.usuario.user_token;
      this.service.findMyRifa(this.tokeUser).subscribe({
        next: data => {
          if (data) {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
          } else {
            this.msgShowInfo('Nenhum valor encontrado!');
          }
        },
        error: erro => {
          this.msgShowError();
        }
      });
    }
  }

  ngOnInit() {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewGroup(row: any) {
    this.dados.rifa_token =  row.rifa_token; // teste 'df654sdf654dsf65sd4fs'
    this.service.showNamesRifaFriend(this.dados).subscribe({
      next: data => {
        this.rafllerWinner = data;
        this.msgShowWinner();
      },
      error: erro => {
        console.log(erro);
        this.msgShowError();
      }
    });

  }

  msgShowWinner() {
    Swal.fire({
      title: '<strong>Ganhador</strong>',
      icon: 'info',
      html:
        '<div style="text-align:left; font-size: 14px">Nro.: <b>' + this.rafllerWinner.id + '</b> <br/>' +
        'Nome: <b>' + this.rafllerWinner.nome + '</b> <br/>' +
        'E-mail: <b>' + this.rafllerWinner.email_amigo + '</b> </div>',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    });
  }

  msgShowError() {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      html: '<div style="font-size: 14px"> Algo deu errado! </div>'
    });
  }

  msgShowInfo(msg: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      html: '<div style="font-size: 14px">' + msg + ' </div>'
    });
  }

}

