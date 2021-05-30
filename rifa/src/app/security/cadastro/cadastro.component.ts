import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';
import { UserDetailsComponent } from 'src/app/header/user-details/user-details.component';
import { NotificationService } from 'src/app/messages/notification.service';
import { RIFA_API } from 'src/app/api';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Usuario } from '../login/user.model';
import { ServiceConf } from 'src/app/service/service-config';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [UserDetailsComponent, ServiceConf]
})
export class CadastroComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  numberPattern = /^[0-9]*$/;

  cadastroForm: FormGroup;

  usuario = {} as Usuario;

  notificationService: NotificationService;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private userDetailsComponent: UserDetailsComponent,
    private service: ServiceConf) {
  }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: this.formBuilder.control('', Validators.required),
      passwordConfirmation: this.formBuilder.control('', Validators.required)
    }, { validator: this.equalsTo });
  }

  equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');
    const password = group.get('password');
    const passwordConfirmation = group.get('passwordConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }
    if (emailConfirmation.value !== '') {
      if (email.value !== emailConfirmation.value) {
        return { emailsNotMatch: true };
      }
    }
    if (!password || !passwordConfirmation) {
      return undefined;
    }
    if (passwordConfirmation.value !== '') {
      if (password.value !== passwordConfirmation.value) {
        return { passwordsNotMatch: true };
      }
    }
    return undefined;
  }

  novoUsuario() {
    this.notificationService = new NotificationService(this.router);
    if (this.cadastroForm.status === 'VALID') {
      this.usuario.user_name = this.cadastroForm.value.name;
      this.usuario.user_email = this.cadastroForm.value.email;
      this.usuario.user_password = this.cadastroForm.value.password;

      this.service.saveUsuarioNovoCadastro(this.usuario).subscribe({
        next: data => {
          sessionStorage.setItem('user', JSON.stringify(data));
          this.router.navigateByUrl('rifan');
          this.userDetailsComponent.isLoggedIn();
        },
        error: error => {
          this.showMessage(error.error.info);
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
