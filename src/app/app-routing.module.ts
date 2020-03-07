import { AppSettingsComponent } from './pages/app-settings/app-settings.component';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { WeatherDetailsComponent } from './pages/weather-details/weather-details.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';

const settings: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'app', component: AppSettingsComponent }
]

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weather-details/:id', component: WeatherDetailsComponent },
  { path: 'add-city', component: AddCityComponent },
  { path: 'user-settings', component: UserSettingsComponent, children: settings }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
