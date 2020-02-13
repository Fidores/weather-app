import { AddCityComponent } from './pages/add-city/add-city.component';
import { WeatherDetailsComponent } from './pages/weather-details/weather-details.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weather-details/:id', component: WeatherDetailsComponent },
  { path: 'add-city', component: AddCityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
