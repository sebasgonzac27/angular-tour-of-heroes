import { Injectable } from '@angular/core';

interface Position {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  center: Position = {
    latitude: 0,
    longitude: 0
  };
  constructor() { }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const {coords} = position;
      const {latitude, longitude} = coords;
      this.center = {
        latitude,
        longitude
      };
    })
   }
}
