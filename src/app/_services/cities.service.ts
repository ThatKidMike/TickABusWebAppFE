import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

constructor(private http: HttpClient) { }

getCities() {
  return this.http.get('http://localhost:5000/cities/');
}

addCity(body: any) {
  return this.http.post('http://localhost:5000/cities/addcity', body);
}

deleteCity(id: any) {
  return this.http.delete(`http://localhost:5000/cities/${id}`);
}

modifyCity(id: any, body: any) {
  return this.http.put(`http://localhost:5000/cities/${id}`, body);
 }



}
