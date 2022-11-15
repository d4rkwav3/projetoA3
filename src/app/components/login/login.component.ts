import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

    @Output() loginSucessful: EventEmitter<boolean> = new EventEmitter();

    ngOnInit(): void {}

    private user!: User | Observable<User> | undefined;

    logIn(form: NgForm): void {
        if (form.value.login === "" || form.value.senha === "") {
            return alert('Erro, verifique suas credenciais e tente novamente');
        } else {
            let login: User = {
                login: form.value.login,
                senha: form.value.senha,
            };
            this.ls.findUser(login).subscribe((user) => {
                if (user){
                    console.log('logado com', user.login);
                    this.user = user;
                    this.ls.setUser(user);
                    this.loginSucessful.emit(true);
                    this.router.navigate(['home']);
                } else {
                    alert("Usuário ou senha inválidos!")
                    form.reset()
                }
            });
        }
    }
}
