import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Paciente } from '../models/paciente.model';
import { Psicologo } from '../models/psicologo.model';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private apiLogin: string = 'http://localhost:9300/login';
    private userDataApi: string = 'http://localhost:9300/user';
    private LoguedUser: User = {
        id: 1, nome: "Bruno", sobrenome: "Venâncio", email: "projetoA3@angular.com", login: "bvsilva", senha: "123", dataNascimento: "1990-08-29", telefone: "11987786706", endereco: "Rua dos Bobos Nº0", cidade: "São Paulo - SP", cep: "04430080", tipo: "paciente", data: {cpf: "12345678910", usuario_id: 1, psicologo_crp: 123456, valorConsulta: 100.00, responsavel: "ç"}
    };

    /*
    testUser: User = {
        id: 1, nome: "Bruno", sobrenome: "Venâncio", email: "projetoA3@angular.com", login: "bvsilva", senha: "123", dataNascimento: "1990-08-29", telefone: "11987786706", endereco: "Rua dos Bobos Nº0", cidade: "São Paulo - SP", cep: "04430080", tipo: "paciente", data: {cpf: "12345678910", usuario_id: 1, psicologo_crp: 123456, valorConsulta: 100.00, responsavel: "ç"}
    }
    */

    constructor(private http: HttpClient) {}

    findUser(login: string, senha: string): Observable<User> {
        let parametros = new HttpParams()
            .append('login', login)
            .append('senha', senha);
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

    getUserData(id: number, tipo: string) :Observable<Paciente | Psicologo> {
        let parametros = new HttpParams().append("tipo", tipo).append("usuario_id", id)
        return this.http.get<Paciente | Psicologo>(this.userDataApi, {params: parametros})
    }

}
