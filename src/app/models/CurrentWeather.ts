export interface CurrentWeather {
    weather: Weather;
    main: Temperatures;
    city: City;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Temperatures {
    temp: number;
    tempMin: number;
    tempMax: number;
}

interface City {
    id: number;
    name: string;
}