import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    constructor(private ls: LoginService, private router: Router) {}

    ngOnInit(): void {}

    private user!: User | Observable<User> | undefined;

    logIn(form: NgForm): void {
        let login: User = { login: form.value.login, senha: form.value.senha };
        this.ls.findUser(login).subscribe((user) => {
            console.log('logado com', user.login);
            this.user = user;
            this.router.navigate(["home"])
        });
    }
}
