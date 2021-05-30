import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RIFA_API } from 'src/app/api';
import { UserDetailsComponent } from 'src/app/header/user-details/user-details.component';
import { NotificationService } from 'src/app/messages/notification.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceConf } from 'src/app/service/service-config';
import { Usuario } from './user.model';
import { HeaderComponent } from 'src/app/header/header.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserDetailsComponent, ServiceConf, HeaderComponent]
})

export class LoginComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  loginForm: FormGroup;
  usuario = {} as Usuario;
  notificationService: NotificationService;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: ServiceConf,
    private userDetailsComponent: UserDetailsComponent,
    private header: HeaderComponent) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user_email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      user_password: this.formBuilder.control('', [Validators.required]),
    }, { validator: this.equalsTo });
  }

  equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('user_email');
    const password = group.get('user_password');
    if (!email) {
      return undefined;
    }
    if (!password) {
      return undefined;
    }
    return undefined;
  }

  login() {
    this.notificationService = new NotificationService(this.router);
    if (this.loginForm.status === 'VALID') {
      this.usuario.user_email = this.loginForm.value.user_email;
      this.usuario.user_password = this.loginForm.value.user_password;

      this.loginService.getLogin(this.usuario).subscribe({
        next: data => {
          sessionStorage.setItem('user', JSON.stringify(data));
          this.router.navigateByUrl('rifan');
          this.router.onSameUrlNavigation = 'reload';
          this.userDetailsComponent.isLoggedIn();
          this.header.isLoggedIn();
        },
        error: erro => {
          if (erro && erro.error && erro.error.info) {
            this.showMessage(erro.error.info);
          } else {
            this.showMessage('Usuário não encontrado !');
          }
        }
      });
    } else {
      const msg = `Preencha os campos`;
      this.showMessage(msg);
    }
  }
  showMessage(msg: any) {
    this.notificationService.simpleAlert(msg);
  }
}
