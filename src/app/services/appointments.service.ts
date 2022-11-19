import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Paciente } from '../models/paciente.model';
import { Appointment } from '../models/appointment.model';
import { Psicologo } from '../models/psicologo.model';

@Injectable({
    providedIn: 'root',
})
export class AppointmentsService {
    private appointments?: Appointment[];
    private url: string = 'http://localhost:9100/agendamentos';

    constructor(private http: HttpClient) {}

    getAppointments(
        patient?: Paciente,
        psico?: Psicologo
    ): Observable<Appointment[]> {
        let query!: HttpParams;

        if (patient !== undefined) {
            query = new HttpParams().append('cpf', patient.cpf);
        } else if (psico !== undefined) {
            query = new HttpParams().append('psicologo_crp', psico.crp);
        }

        return this.http.get<Appointment[]>(this.url, { params: query });
    }

    setAppointments(appointment: Appointment[]): void {
        this.appointments = appointment;
    }

    deleteAppointment(id: number) :void {
        let params = new HttpParams().append('id', id);
        this.http.delete(this.url, {params: params}).subscribe();
    }

    getCurrentAppointments() :Appointment[] | undefined {
        if(this.appointments) {
            return this.appointments;
        } else {
            return undefined;
        }
    }
}
