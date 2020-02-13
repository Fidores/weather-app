import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './ui-components/main-header/main-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { HomeComponent } from './pages/home/home.component';
import { WeatherDetailsComponent } from './pages/weather-details/weather-details.component';
import { WeatherCardComponent } from './ui-components/weather-card/weather-card.component';
import { SideMenuComponent } from './ui-components/side-menu/side-menu.component';
import { OverlayComponent } from './ui-components/overlay/overlay.component';
import { AddCityCardComponent } from './ui-components/add-city-card/add-city-card.component';
import { SmallWeatherCardComponent } from './ui-components/small-weather-card/small-weather-card.component';
import { AddCityComponent } from './pages/add-city/add-city.component';

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
    AddCityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SwiperModule,
    NgScrollbarModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
