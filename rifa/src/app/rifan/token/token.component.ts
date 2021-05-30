import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/messages/notification.service';
import { ServiceConf } from 'src/app/service/service-config';
import { ShowRifaModel } from '../show-rifa/show-rifa-model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TokenRifa } from './token-rifa';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  providers: [ServiceConf]
})
export class TokenComponent implements OnInit {

  showRifa = {} as ShowRifaModel;

  tokenRifa = {} as TokenRifa;

  notificationService: NotificationService;

  email: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: ServiceConf) {

  }

  ngOnInit() {
    const token = sessionStorage.getItem('tokenFriend');
    if (token) {
      console.log('token', token);
      this.tokenRifa.rifa_token = token;
      this.findFriend();
    } else {
      this.router.navigateByUrl('**');
    }
  }


  private findFriend() {
    this.service.showNamesRifaFriend(this.tokenRifa).subscribe({
      next: data => {
        this.showRifa = data;
        console.log('data', data);
        if (!this.showRifa.id) {
          this.alerta();
        } else {
          sessionStorage.setItem('rifa_token', JSON.stringify(this.tokenRifa));
          sessionStorage.setItem('winner', JSON.stringify(this.showRifa));
          this.router.navigateByUrl('winner');
        }
      },
      error: erro => {
        console.log('erro', erro);
        this.router.navigateByUrl('/');
      }
    });
  }


  alerta() {

    (async () => {

      const { value: email } = await Swal.fire({
        title: 'Informe seu E-mail',
        input: 'email',
        inputPlaceholder: 'Digite seu E-mail'
      });

      if (email) {
        this.tokenRifa.email = email;
        sessionStorage.setItem('winner', JSON.stringify(this.showRifa));
        if (this.showRifa.id_nome === undefined) {
          sessionStorage.setItem('rifa_token', JSON.stringify(this.tokenRifa));
          this.router.navigateByUrl('rifan');
        } else {
          this.router.navigateByUrl('winner');
        }
      }

    })();
  }

  alertFriend() {
    Swal.fire({
      title: 'Informe seu E-mail',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Ok',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            );
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log('Erro', result);
    });

  }
}
