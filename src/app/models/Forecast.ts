import { Weather } from './CurrentWeather';

export interface Forecast {
  days: Day;
  city: City;
}

export interface Day {
  [prop: string]: Period[];
}

export interface Period {
  main: Temperatures;
  weather: Weather;
  day: string;
  hour: string;
}

export interface Temperatures {
  temp: number;
}

export interface City {
  id: number;
  name: string;
}
