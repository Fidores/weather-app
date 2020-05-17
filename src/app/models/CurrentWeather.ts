export interface CurrentWeather {
  weather: Weather;
  main: Main;
  city: City;
  wind: Wind;
}

export type Icon =
  | '01d'
  | '02d'
  | '03d'
  | '04d'
  | '09d'
  | '10d'
  | '11d'
  | '13d'
  | '50d'
  | '01n'
  | '02n'
  | '03n'
  | '04n'
  | '09n'
  | '10n'
  | '11n'
  | '13n'
  | '50n';

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: Icon;
}

export interface Main {
  temp: number;
  tempMin: number;
  tempMax: number;
  feels_like: number;
  pressure: number;
  humidity: number;
}

export interface City {
  id: number;
  name: string;
}

export interface Wind {
  speed: number;
}
