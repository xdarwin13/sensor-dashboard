import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts'; // Importa NgChartsModule aquí

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { HumidityComponent } from './humidity/humidity.component';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    HumidityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule // Asegúrate de agregar NgChartsModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
