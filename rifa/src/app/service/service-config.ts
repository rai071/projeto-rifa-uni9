import { Injectable } from '@angular/core';


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Usuario } from '../security/login/user.model';
import { CreateRifa } from '../rifan/create-rifa/create-rifa-model';

@Injectable()
export class ServiceConf {

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getLogin(login: Usuario): Observable<any> {
    return this.http.post('/api/login/', JSON.stringify(login), this.httpOptions);
  }

  saveUsuarioNovoCadastro(usuario: Usuario): Observable<any> {
    return this.http.post('/api/subscribe/', JSON.stringify(usuario), this.httpOptions);
  }

  createRifa(rifa: CreateRifa): Observable<any> {
    return this.http.post('/api/createRifa/', JSON.stringify(rifa), this.httpOptions);
  }

  showNamesRifaFriend(token: any): Observable<any> {
    return this.http.post('/api/showNamesRifaFriend/', JSON.stringify(token), this.httpOptions);
  }

  createGroupRifa(group: any): Observable<any> {
    return this.http.post('/api/addGroupRifa/', JSON.stringify(group), this.httpOptions);
  }

  findNameGroup(groupId: any): Observable<any> {
    return this.http.post('/api/showNamesByGroup/', JSON.stringify(groupId), this.httpOptions);
  }

  findMyRifa(token: any): Observable<any> {
    return this.http.post('/api/showRifas/', JSON.stringify(token), this.httpOptions);
  }

  rafflerWinner(dados: any): Observable<any> {
    return this.http.post('/api/raffleWinner/', JSON.stringify(dados), this.httpOptions);
  }

  showGroupNames(userToken: any): Observable<any> {
    return this.http.post('/api/showGroupNames/', JSON.stringify(userToken), this.httpOptions);
  }

  payNumber(payment: any): Observable<any> {
    return this.http.post('/api/payNumber/', JSON.stringify(payment), this.httpOptions);
  }
}
