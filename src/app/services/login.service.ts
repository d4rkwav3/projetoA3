import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiLogin: string = "http://localhost:930/login"

  constructor(private http: HttpClient) { }

  findUser(user: User): Observable<User> {
    console.log("Usuário do método findUser", user)
    let query = new HttpParams().append("login", user.getLogin()).append("senha", user.getPass())
    console.log("url do servidor", this.apiLogin)
    console.log("parametros http", query)
    console.log(this.http.get<User>(this.apiLogin, {params: query}))
    return this.http.get<User>(this.apiLogin, {params: query});
  }
}
