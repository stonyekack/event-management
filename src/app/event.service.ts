import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:3000/events';
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000');
  }

  getEvents(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addEvent(event: any): Observable<any> {
    return this.http.post(this.baseUrl, event);
  }

  updateEvent(id: string, event: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, event);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  onEventAdded(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('eventAdded', (data: any) => {
        observer.next(data);
      });
    });
  }
}
