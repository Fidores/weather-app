export interface Forecast {
    days: Day;
    city: City;
}

interface Day {
    [prop: string]: Period[];
}

export interface Period {
    main: Temperatures;
    weather: Weather;
    day: string;
    hour: string
}

interface Temperatures {
    temp: number;
}

interface Weather {
    id: number;
    main: string;
    description: string,
    icon: string;
}

interface City {
    id: number;
    name: string;
}