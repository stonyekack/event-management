import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
    this.eventService.onEventAdded().subscribe(event => {
      this.events.push(event);
    });
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  deleteEvent(id: string) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();
    });
  }
}
