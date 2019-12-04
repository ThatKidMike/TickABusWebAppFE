import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackDataService {
  private subject = new BehaviorSubject('');

  sendTrackData(obj) {
    this.subject.next(obj);
  }

  clearTrackData() {
    this.subject.next('');
  }

  getTrackData(): Observable<any> {
    return this.subject.asObservable();
  }

constructor() { }

}
