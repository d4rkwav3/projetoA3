import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  private user: User = {
    id: 1, nome: "Bruno", sobrenome: "Venâncio", email: "projetoA3@angular.com", login: "bvsilva", senha: "123", dataNascimento: "1990-08-29", telefone: "11987786706", endereço: "Rua dos Bobos Nº0", cidade: "São Paulo - SP", cep: "04430080", tipo: "paciente", data: {cpf: "12345678910", usuario_id: 1, psicologo_crp: 123456, valorConsulta: 100.00, responsavel: null}
  }
}
