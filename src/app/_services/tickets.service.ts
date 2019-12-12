import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

constructor(private http: HttpClient) { }

getUserTickets(httpParams: HttpParams) {
  return this.http.get('http://localhost:5000/tickets/usertickets', {params: httpParams});
}

createUserTicket(body: any) {
  return this.http.post('http://localhost:5000/tickets/', body);
}

}
