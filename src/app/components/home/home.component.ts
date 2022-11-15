import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    constructor(private ls: LoginService) {}

    ngOnInit(): void {
        this.loguedUser = this.ls.getUser();
        console.log(this.loguedUser)
    }

    loguedUser!: User;
}
