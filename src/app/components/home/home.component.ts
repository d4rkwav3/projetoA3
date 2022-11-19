import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { Paciente } from 'src/app/models/paciente.model';
import { User } from 'src/app/models/user.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    constructor(private ls: LoginService,
        private aps: AppointmentsService) {}

    ngOnInit(): void {
        this.loading = true;
        this.ls.setActiveRoute("home");
        console.log("rota ativa: home");

        this.loguedUser = this.ls.getUser();

        if (this.loguedUser.tipo === 'paciente') {
            this.ls.getUserData(this.loguedUser.id, this.loguedUser.tipo).subscribe((data) => {
                this.loguedUser.paciente = data;
                this.aps.getAppointments(this.loguedUser.paciente, undefined).subscribe((ag) => {
                    this.agendamentosRecentes = ag
                })
            })
        } else if (this.loguedUser.tipo === 'psicologo') {
            this.ls.getPsicoData(this.loguedUser.id, this.loguedUser.tipo).subscribe((data) => {
                this.loguedUser.psico = data;
                this.aps.getAppointments(undefined, this.loguedUser.psico).subscribe((ag) => {
                    this.agendamentosRecentes = ag
                })
            })
        }
        this.loading = false;
    }
    loading: boolean = false;
    /*
    agendamentosRecentes?: Appointment[] = [
        {id: 1, data_hora: "2022-11-20 10:00:00", sala: "Online via Zoom", paciente_id: "38434365847", sessao_id: null},
        {id: 2, data_hora: "2022-11-22 18:00:00", sala: "Online via Zoom", paciente_id: "38434365847", sessao_id: null},
        {id: 3, data_hora: "2022-11-25 15:00:00", sala: "Avendia Paulista, nº 2073 - 15º Andar, Sala 5", paciente_id: "38434365847", sessao_id: null},
        {id: 4, data_hora: "2022-11-27 19:00:00", sala: "Online via Zoom", paciente_id: "38434365847", sessao_id: null},
        {id: 5, data_hora: "2022-11-29 09:15:00", sala: "Online via Zoom", paciente_id: "38434365847", sessao_id: null},
        {id: 6, data_hora: "2022-12-02 16:30:00", sala: "Online via Zoom", paciente_id: "38434365847", sessao_id: null},];*/
    agendamentosRecentes?: Appointment[]

    loguedUser!: User;
}
