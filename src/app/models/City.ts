export interface City {
  _id: string;
  id: number;
  name: string;
  country: string;
  coords: Coords;
}

export interface Coords {
  lon: number;
  lat: number;
}
