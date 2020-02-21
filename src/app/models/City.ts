export interface City {
    _id: string;
    id: number;
    name: string;
    country: string;
    coord: Coords;
}

interface Coords {
    lon: number;
    lat: number;
}