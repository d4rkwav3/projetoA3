import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Paciente } from '../models/paciente.model';
import { Psicologo } from '../models/psicologo.model';

@Injectable({
    providedIn: 'root',
})
export class UserDataService {
    constructor(private http: HttpClient) {}

    private url: string = "http://localhost:9300/update"

    private currentUserData!: User;
    private currentPatientData?: Paciente;
    private currentPsicoData?: Psicologo;
    private newUserData?: User;
    private newPatientData?: Paciente;
    private newPsicoData?: Psicologo;

    setCurrentUserData(user: User, patient?: Paciente, psico?: Psicologo) :void {
        this.currentUserData = user;
        this.currentPatientData = patient;
        this.currentPsicoData = psico;
    }

    setNewUserData(user: User, patient?: Paciente, psico?: Psicologo) :void {
        this.newUserData = user;
        this.newPatientData = patient;
        this.newPsicoData = psico;
    }

    updateUserInfo(user: User, patient?: Paciente, psico?: Psicologo) :void {
        if (patient !== undefined && psico === undefined){ 
            let update: User = user;
            update.paciente = patient
            console.log(update)
            let params = new HttpParams().append("id", update.id).append("paciente_id", update.paciente.cpf)
            this.http.post(this.url, update, {params: params}).subscribe((res) => {console.log(res)})
        }
    }
}
