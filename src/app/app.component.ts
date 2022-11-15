import { Component } from '@angular/core';
import { User } from './models/user.model';

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

    user: User | undefined = undefined;
    login!: string;
    senha!: string;

}
