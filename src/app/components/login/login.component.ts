import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ls: LoginService) { }

  ngOnInit(): void {
  }

  private user!: Observable<User>;

  logIn(form: NgForm): void {
    let login = new User(form.value.login, form.value.passwd)
    this.user = this.ls.findUser(login)
    console.log("Usuário do servidor", this.user)
  }
}
