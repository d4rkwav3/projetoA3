import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { HomeComponent } from './components/home/home.component';
import { SessionComponent } from './components/session/session.component';
import { UserDataComponent } from './components/user-data/user-data.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'userdata', component: UserDataComponent },
    { path: 'appointment', component: AppointmentComponent },
    { path: 'session', component: SessionComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
