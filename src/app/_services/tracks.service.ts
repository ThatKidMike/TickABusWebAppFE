import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

constructor(private http: HttpClient) { }

getCities() {
  return this.http.get('http://localhost:5000/cities/');
}

getTracks(httpParams: HttpParams) {
  return this.http.get('http://localhost:5000/tracks/', {params: httpParams});
}

getTracksNoParams() {
  return this.http.get('http://localhost:5000/tracks/noparams');
}

getCityName(name: any) {
  return this.http.get(`http://localhost:5000/cities/${name}`);
}

modifyTrack(id: any, body: any) {
 return this.http.put(`http://localhost:5000/tracks/${id}`, body);
}

deleteTrack(id: any) {
  return this.http.delete(`http://localhost:5000/tracks/${id}`);
}

addTrack(body: any) {
  return this.http.post('http://localhost:5000/tracks/addtrack', body);
}


}
