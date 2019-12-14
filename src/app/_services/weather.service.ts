import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

constructor(private http: HttpClient) { }

getGeo(cityName: any) {
  return this.http.get(`https://api.opencagedata.com/geocode/v1/geojson?q=${cityName},poland
  &key=cee88c9e31dc4743878a300261425142&pretty=1`);
}

getWeather(x: any, y: any, date: any) {
  return this.http.get(`/darksky/${x},${y},${date}?exclude=hourly,daily,flags&units=auto`);
}


}
