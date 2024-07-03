import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client'; // Import correct de 'Socket'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:3000/events';
  private socket: Socket; // Déclarer le type de 'socket'

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000');
  }

  getEvents(): Observable<any[]> { // Spécifier le type de retour de getEvents()
    return this.http.get<any[]>(this.baseUrl);
  }

  addEvent(event: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, event);
  }

  updateEvent(id: string, event: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, event);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  onEventAdded(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('eventAdded', (data: any) => {
        observer.next(data);
      });
    });
  }
}
