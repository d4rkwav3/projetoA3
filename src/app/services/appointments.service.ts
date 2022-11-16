import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Paciente } from '../models/paciente.model';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private appointments?: Appointment[];
  private url: string = 'http://localhost:9100/agendamentos'

  constructor(private http: HttpClient) {}

  getAppointments(patient_id: string) :Observable<Appointment[]> {
    let query = new HttpParams().append("paciente_id", patient_id)
    return this.http.get<Appointment[]>(this.url, { params: query})
  }
}
