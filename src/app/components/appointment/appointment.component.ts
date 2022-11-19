import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  constructor(private ls: LoginService, private aps: AppointmentsService) { }

  ngOnInit(): void {
    this.ls.setActiveRoute("appointment");
        console.log("rota ativa: appointment");
  }

  teste: boolean = false;

  appointments: Appointment[] = [
    {id: 1, data_hora: "2022-11-20 10:00:00", sala: "Online via Zoom", paciente_id: "38434365847", sessao_id: null, psicologo_crp: 123},
    {id: 2, data_hora: "2022-11-22 18:00:00", sala: "Online via Zoom", paciente_id: "38434365847", sessao_id: null, psicologo_crp: 123},
    {id: 3, data_hora: "2022-11-25 15:00:00", sala: "Avendia Paulista, nº 2073 - 15º Andar, Sala 5", paciente_id: "38434365847", sessao_id: null, psicologo_crp: 123},
    {id: 4, data_hora: "2022-11-27 19:00:00", sala: "Online via Zoom", paciente_id: "38434365847", sessao_id: null, psicologo_crp: 123},
    {id: 5, data_hora: "2022-11-29 09:15:00", sala: "Online via Zoom", paciente_id: "38434365847", sessao_id: null, psicologo_crp: 123},
    {id: 6, data_hora: "2022-12-02 16:30:00", sala: "Online via Zoom", paciente_id: "38434365847", sessao_id: null, psicologo_crp: 123},
  ];
}
