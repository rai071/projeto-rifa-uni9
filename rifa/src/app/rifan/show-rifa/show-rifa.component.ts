import { Component, OnInit, ViewChild } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/security/login/user.model';
import { ShowMyRifa } from './show-my-rifa';
import { ServiceConf } from 'src/app/service/service-config';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  rifa_name: string;
  rifa_token: string;
  actions?: string;
}

export interface Token {
  user_token: string;
}

@Component({
  selector: 'app-show-rifa',
  templateUrl: './show-rifa.component.html',
  styleUrls: ['./show-rifa.component.css']
})
export class ShowRifaComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns: string[] = ['rifa_name', 'actions'];
  dataSource = new MatTableDataSource<ShowMyRifa>();
  selection = new SelectionModel<ShowMyRifa>(true, []);

  usuario = {} as Usuario;
  myRifa = {} as ShowMyRifa;
  tokeUser = {} as Token;

  constructor(private router: Router, private service: ServiceConf) {
    if (sessionStorage.length > 0) {
      this.usuario = JSON.parse(sessionStorage.getItem('user'));
      this.tokeUser.user_token = this.usuario.user_token;
      this.service.findMyRifa(this.tokeUser).subscribe({
        next: data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        },
        error: erro => {
          console.log(erro);
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
    const url = environment.api + '?token=' + row.rifa_token;

    this.msgLink(url.replace('apis/', ''));
  }

  msgLink(link: any) {
    Swal.fire({
      title: '<strong>Link Gerado</strong>',
      icon: 'info',
      html:
        '<div style="text-align:left; font-size: 14px">' + link + '</div>',
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

}
