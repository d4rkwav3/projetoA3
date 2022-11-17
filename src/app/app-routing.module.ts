import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserDataComponent } from './components/user-data/user-data.component';


const routes: Routes = [ 
  {path: "home", component: HomeComponent},
  {path: "userdata", component: UserDataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
