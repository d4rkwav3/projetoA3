import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'frontend';

    // visible: boolean = false;

    // loginBox() {
    //   this.visible = this.visible ? false:true;
    // }

    login!: string;
    senha!: string;

    enter(user: string, senha: string): void {

    }
}
