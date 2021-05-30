import { Component, OnInit } from '@angular/core';
import { Usuario } from '../security/login/user.model';
import { UserDetailsComponent } from './user-details/user-details.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserDetailsComponent]
})
export class HeaderComponent implements OnInit {

  usuario = {} as Usuario;

  constructor() {
  }

  ngOnInit() {

  }

  isLoggedIn() {
    this.usuario = JSON.parse(sessionStorage.getItem('user'));
    if (this.usuario !== null && this.usuario !== undefined && this.usuario.user_email !== '') {
      return true;
    } else {
      return false;
    }
  }

  isFriend() {
    const friend = JSON.parse(sessionStorage.getItem('winner'));
    this.usuario = JSON.parse(sessionStorage.getItem('user'));
    if (this.usuario && !friend) {
      return true;
    } else if (friend) {
      if (friend.id !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  isWinner() {
    let friend;
    if (sessionStorage.getItem('winner')) {
      friend = JSON.parse(sessionStorage.getItem('winner'));
    }
    if (friend && friend.id) {
      return true;
    } else {
      return false;
    }
  }

  isShowRifa() {
    const friend = JSON.parse(sessionStorage.getItem('rifa_token'));
    this.usuario = JSON.parse(sessionStorage.getItem('user'));
    if (this.usuario || friend) {
      return true;
    } else {
      return false;
    }
  }

}
