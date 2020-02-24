export interface CurrentWeather {
    weather: Weather;
    main: Main;
    city: City;
    wind: Wind;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    tempMin: number;
    tempMax: number;
    feels_like: number;
    pressure: number;
    humidity: number;
}

interface City {
    id: number;
    name: string;
}

interface Wind {
    speed: number;
}