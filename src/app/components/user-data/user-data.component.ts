import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { Psicologo } from 'src/app/models/psicologo.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
    selector: 'app-user-data',
    templateUrl: './user-data.component.html',
    styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
    constructor(private ud: UserDataService, private ls: LoginService) {}
  
    ngOnInit(): void {
        //let diff: number = Math.abs(new Date().getTime() - new Date(this.user.dataNascimento).getTime());
        //let age: number = Math.floor((diff / (1000 * 3600 * 24)) / 365.25);
        //this.idade = String(age);

        this.user = this.ls.getUser()
        
        if (this.user.paciente) {
            this.userData = this.user.paciente;
        } else if (this.user.psico) {
            this.psicoData = this.user.psico;
        }
        this.ls.setActiveRoute("userdata");
        console.log("rota ativa: userdata");
    }

    user!: User;

    userData?: Paciente; /*
    userData?: Paciente = {
        cpf: '12345678910',
        usuario_id: 1,
        psicologo_crp: 123456,
        valorConsulta: 100.0,
        responsavel: '',
    }; */
    //psicoData: Psicologo = { crp: 123456, cpf: "38434365847", usuario_id: 2, titulacao: "Graduado em Psicologia", especialidade: "" }
    psicoData?: Psicologo;

    idade!: string;

    salvar(): void {
        this.ud.updateUserInfo(this.user, this.userData);
    }
}
