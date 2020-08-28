import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Rover} from './rover.component';
import { Home } from './home.component';
import { Sat} from './sat.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: "/home",
    pathMatch: 'full'
  },

  {path: 'rover', component: Rover},
  {path: 'home', component: Home},
  {path: 'sat', component: Sat}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
