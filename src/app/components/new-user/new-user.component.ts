import { Component, OnInit } from '@angular/core';
import { PsicoInfo } from 'src/app/models/psicoInfo.model';
import { Psicologo } from 'src/app/models/psicologo.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
    constructor(private ls: LoginService) {}

    ngOnInit(): void {
        this.hoje = new Date();
        this.ls.selectPsicos().subscribe((psicos) => {
            this.psicos = psicos;
        })
    }

    hoje!: Date;
    newUser: User = {
        login: '',
        senha: '',
        id: 0,
        email: '',
        nome: '',
        sobrenome: '',
        telefone: '',
        dataNascimento: '',
        endereco: '',
        cidade: '',
        cep: '',
        tipo: 'paciente',
        paciente: {
            cpf: '',
            psicologo_crp: 0,
            usuario_id: 0,
            valorConsulta: 0,
            responsavel: '',
        },
    };
    psicos: PsicoInfo[] = []
}
