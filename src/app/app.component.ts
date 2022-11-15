import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'frontend';

    constructor(private router: Router, private ls: LoginService) {}

    ngOnInit(): void {}

    user: User | undefined = undefined;
    hide: boolean = false;

    onLogin(value: boolean): void {
        this.hide = true;
    }

    onLogOut(): void {
        console.log(this.user?.login, "deslogado")
        this.hide = false;
        this.user = undefined;
    }
}
