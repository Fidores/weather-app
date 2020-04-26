import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UnAuthGuard } from './guards/un-auth/un-auth.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { SavedCitiesComponent } from './pages/saved-cities/saved-cities.component';
import { AppSettingsComponent } from './pages/app-settings/app-settings.component';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { WeatherDetailsComponent } from './pages/weather-details/weather-details.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';

const settings: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'app', component: AppSettingsComponent },
  { path: 'saved-cities', component: SavedCitiesComponent },
  { path: 'account', component: AccountSettingsComponent }
]

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weather-details/:id', component: WeatherDetailsComponent },
  { path: 'add-city', component: AddCityComponent },
  { path: 'user-settings', component: UserSettingsComponent, children: settings, canActivate: [UnAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
