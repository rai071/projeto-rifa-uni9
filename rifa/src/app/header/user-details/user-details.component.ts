import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/security/login/user.model';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  usuario = {} as Usuario;

  isUrlFriend: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    let friend: any;
    if (sessionStorage.getItem('rifa_token')) {
      friend = sessionStorage.getItem('rifa_token');
    }
    const param = window.location.href.includes('token');
    if (param) {
      this.isUrlFriend = true;
    } else if (friend) {
      this.isUrlFriend = true;
    } else {
      this.isUrlFriend = false;
    }
  }

  isFriend() {

    let friend: any;
    if (sessionStorage.getItem('rifa_token')) {
      friend = sessionStorage.getItem('rifa_token');
    }
    this.usuario = JSON.parse(sessionStorage.getItem('user'));
    if (this.usuario && !friend) {
      return true;
    } else if (friend) {
      return false;
    } else {
      return true;
    }
  }

  isLoggedIn() {
    this.usuario = JSON.parse(sessionStorage.getItem('user'));
    if (this.usuario !== null && this.usuario !== undefined && this.usuario.user_email !== '') {
      return true;
    } else {
      return false;
    }
  }

  login() {
    this.router.navigateByUrl('login');
  }

  logout() {
    sessionStorage.clear();
    this.usuario = undefined;
    this.router.navigateByUrl('login');
  }

}
