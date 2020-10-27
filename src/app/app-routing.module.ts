import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaStudentiComponent } from './lista-studenti/lista-studenti.component';


const routes: Routes = [
  {
    path: '**', redirectTo: 'ListaStudenti'
  },
  {
    path: 'ListaStudenti', component: ListaStudentiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
