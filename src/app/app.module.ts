import { environment } from './../environments/environment';
import { ErrorInterceptor } from './common/error.interceptor';
import { ErrorsHandler } from './common/errors.handler';
import { AuthInterceptor } from './common/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { HomeComponent } from './pages/home/home.component';
import { WeatherDetailsComponent } from './pages/weather-details/weather-details.component';
import { AddCityCardComponent } from './ui-components/add-city-card/add-city-card.component';
import { MainHeaderComponent } from './ui-components/main-header/main-header.component';
import { OverlayComponent } from './ui-components/overlay/overlay.component';
import { SideMenuComponent } from './ui-components/side-menu/side-menu.component';
import { SmallWeatherCardComponent } from './ui-components/small-weather-card/small-weather-card.component';
import { WeatherCardComponent } from './ui-components/weather-card/weather-card.component';
import { LoaderComponent } from './ui-components/loader/loader.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { AppSettingsComponent } from './pages/app-settings/app-settings.component';
import { SelectComponent } from './ui-components/select/select.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SavedCitiesComponent } from './pages/saved-cities/saved-cities.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    HomeComponent,
    WeatherDetailsComponent,
    WeatherCardComponent,
    SideMenuComponent,
    OverlayComponent,
    AddCityCardComponent,
    SmallWeatherCardComponent,
    AddCityComponent,
    LoaderComponent,
    UserSettingsComponent,
    AppSettingsComponent,
    SelectComponent,
    SavedCitiesComponent,
    AccountSettingsComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SwiperModule,
    NgScrollbarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(environment.notifications),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorsHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
