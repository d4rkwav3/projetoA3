import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    constructor(private ls: LoginService, private aps: AppointmentsService) {}

    ngOnInit(): void {}

    appointments: Appointment[] = [
        {
            id: 1,
            nome: 'Bruno',
            sobrenome: 'Venâncio',
            data_hora: '2022-11-10',
            sala: 'Online via Zoom',
            paciente_id: '38434365847',
            psicologo_crp: 123456,
            sessao_id: null,
        },
        {
            id: 2,
            nome: 'Durval',
            sobrenome: 'Guimarães',
            data_hora: '2022-11-17',
            sala: 'Rua Teste, nº0 - Sala 03',
            paciente_id: '38434365847',
            psicologo_crp: 123456,
            sessao_id: null,
        },
    ];
    remove = false;
}
