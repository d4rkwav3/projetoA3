import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { Psicologo } from 'src/app/models/psicologo.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { 
    let diff: number = Math.abs(new Date().getTime() - new Date(this.user.dataNascimento).getTime());
    let age: number = Math.floor((diff / (1000 * 3600 * 24)) / 365.25);
    this.idade = String(age);
  }

  user: User = {
    id: 1, nome: "Bruno", sobrenome: "Venâncio", email: "projetoA3@angular.com", login: "bvsilva", senha: "123", dataNascimento: "1990-08-29", telefone: "11987786706", endereco: "Rua dos Bobos Nº0", cidade: "São Paulo - SP", cep: "04430080", tipo: "paciente", data: {cpf: "12345678910", usuario_id: 1, psicologo_crp: 123456, valorConsulta: 100.00, responsavel: "ç"}
  }

  //userData?: Paciente;
  userData: Paciente = { cpf: "12345678910", usuario_id: 1, psicologo_crp: 123456, valorConsulta: 100.00, responsavel: "" }
  //psicoData: Psicologo = { crp: 123456, cpf: "38434365847", usuario_id: 2, titulacao: "Graduado em Psicologia", especialidade: "" }
  psicoData?: Psicologo;

  idade!: string;

  salvar() :void {
    console.log(this.user, this.userData)
  }
}
