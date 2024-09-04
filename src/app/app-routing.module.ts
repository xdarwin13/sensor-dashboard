import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureComponent } from './temperature/temperature.component';
import { HumidityComponent } from './humidity/humidity.component';

const routes: Routes = [
  { path: 'temperature', component: TemperatureComponent },
  { path: 'humidity', component: HumidityComponent },
  { path: '', redirectTo: '/temperature', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
