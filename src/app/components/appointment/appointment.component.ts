import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { Moment } from 'moment';
import { Appointment } from 'src/app/models/appointment.model';
import { Psicologo } from 'src/app/models/psicologo.model';
import { User } from 'src/app/models/user.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
    constructor(private ls: LoginService, private aps: AppointmentsService) {}

    ngOnInit(): void {
        this.hoje = new Date()
        this.validador = new Date(this.hoje.setDate(this.hoje.getDate() + 1));
        this.ls.setActiveRoute('appointment');
        console.log('rota ativa: appointment');
        this.user = this.ls.getUser();
        this.appointments = this.aps.getCurrentAppointments();
        if (this.user.paciente) {
            this.ls.getPsicoInfo(this.user.paciente.psicologo_crp).subscribe((data) => {
                // console.log(data)
                this.psico = data;
                this.ls.getNomePsico(data.usuario_id).subscribe((res) => {
                    // console.log(res)
                    this.nomePsico = res;
                })
            })
        }
    }

    user!: User; /*= {login: '', senha: '', id: 0, email: '', dataNascimento: '', nome: '', sobrenome: '', telefone: '', endereco: '', cidade: '', cep: '', tipo: 'paciente', paciente: {cpf: '38434365847', usuario_id: 1, psicologo_crp: 123456, valorConsulta: 100.0, responsavel: null}};*/

    hoje!: Date;
    validador!: Date;
    psico!: Psicologo;
    nomePsico!: string;
    data!: Date; //Moment;
    hora!: Date;
    local!: string;
    // newAppointment: string[] = [];
    online: string = 'Online via Zoom'

    appointments?: Appointment[]; /*= [
        {
            id: 1,
            data_hora: '2022-11-20 10:00:00',
            sala: 'Online via Zoom',
            paciente_id: '38434365847',
            sessao_id: null,
            psicologo_crp: 123,
        },
        {
            id: 2,
            data_hora: '2022-11-22 18:00:00',
            sala: 'Online via Zoom',
            paciente_id: '38434365847',
            sessao_id: null,
            psicologo_crp: 123,
        },
        {
            id: 3,
            data_hora: '2022-11-25 15:00:00',
            sala: 'Avendia Paulista, nº 2073 - 15º Andar, Sala 5',
            paciente_id: '38434365847',
            sessao_id: null,
            psicologo_crp: 123,
        },
        {
            id: 4,
            data_hora: '2022-11-27 19:00:00',
            sala: 'Online via Zoom',
            paciente_id: '38434365847',
            sessao_id: null,
            psicologo_crp: 123,
        },
        {
            id: 5,
            data_hora: '2022-11-29 09:15:00',
            sala: 'Online via Zoom',
            paciente_id: '38434365847',
            sessao_id: null,
            psicologo_crp: 123,
        },
        {
            id: 6,
            data_hora: '2022-12-02 16:30:00',
            sala: 'Online via Zoom',
            paciente_id: '38434365847',
            sessao_id: null,
            psicologo_crp: 123,
        },
    ];
    */
    remover(id: number) :void {
        if(this.appointments) {
            this.appointments = this.appointments.filter(appointment => appointment.id !== id);
        }
    }

    excluir(id: number): void {
        if (confirm('Confirmar exclusão do agendamento?')) {
            this.aps.deleteAppointment(id);
            this.remover(id);
        }
    }   

    agendar(form: NgForm) :void {
        let sala: string = "";

        if (form.value.local === 'presencial') sala = this.psico.atendimento;
        else if (form.value.local === 'online') sala = this.online;

        if (this.user.paciente) {
            this.aps.addAppoitment(form.value.data.toISOString().substring(0,10) + ' ' + form.value.hora + ':00', sala, this.user.paciente?.cpf, this.psico.crp)
            form.reset()
        } 
    }
}
