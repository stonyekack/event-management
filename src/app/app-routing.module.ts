import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';

const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'add-event', component: EventFormComponent },
  { path: 'edit-event/:id', component: EventFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
