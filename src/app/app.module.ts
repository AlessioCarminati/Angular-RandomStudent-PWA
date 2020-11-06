import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListaStudentiComponent } from './lista-studenti/lista-studenti.component';

import { NbThemeModule, NbLayoutModule, NbCardModule, NbListModule, NbIconModule, NbButtonModule, NbInputModule, NbFormFieldModule, NbTooltipModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [
    AppComponent,
    ListaStudentiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbListModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbFormFieldModule,
    NbTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
