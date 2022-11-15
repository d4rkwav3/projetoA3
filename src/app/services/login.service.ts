import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private apiLogin: string = 'http://localhost:9300/login';
    private LoguedUser!: User;

    constructor(private http: HttpClient) {}

    findUser(user: User): Observable<User> {
        let parametros = new HttpParams()
            .append('login', user.login)
            .append('senha', user.senha);
        let inscricao = this.http.get<User>(this.apiLogin, {
            params: parametros,
        });
        return inscricao;
    }

    setUser(user: User) :void {
        this.LoguedUser = user;
    }

    getUser() :User {
        return this.LoguedUser;
    }
}
