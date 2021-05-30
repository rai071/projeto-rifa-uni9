import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Usuario } from './login/user.model';

@Injectable()
export class AuthGuard implements CanActivate {

    usuario = {} as Usuario;

    constructor(private router: Router) {
    }

    canActivate() {
        const queryString = window.location.search;
        if (queryString.includes('?token=')) {
            const token = queryString.replace('?token=', '');
            sessionStorage.removeItem('user');
            sessionStorage.setItem('tokenFriend', token);
            this.router.navigateByUrl('token');
            return true;
        } else {
            this.usuario = JSON.parse(sessionStorage.getItem('user'));
            const friend = JSON.parse(sessionStorage.getItem('rifa_token'));
            if (this.usuario) {
                // this.router.navigateByUrl('**');
                return true;
            } else if (friend) {
                this.router.parseUrl('/rifan/rifas');
                return true;
            } else if (queryString === '') {
                this.router.navigateByUrl('home');
                return true;
            }

        }
        return false;
    }
}
