import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  event: any = { title: '', date: '', description: '' };
  id: string | null = null;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.eventService.getEvents().subscribe(data => {
        this.event = data.find((e: any) => e._id === this.id);
      });
    }
  }

  saveEvent() {
    if (this.id) {
      this.eventService.updateEvent(this.id, this.event).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.eventService.addEvent(this.event).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
