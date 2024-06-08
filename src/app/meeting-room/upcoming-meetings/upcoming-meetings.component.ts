import { Component } from "@angular/core";
import { Meeting } from "../../models/meeting.models";
import { DatePipe, NgFor } from "@angular/common";

@Component({
  selector: "app-upcoming-meetings",
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: "./upcoming-meetings.component.html",
  styleUrl: "./upcoming-meetings.component.css",
})
export class UpcomingMeetingsComponent {
  upcomingMeetings: Array<Meeting> = [
    {
      userName: "demo",
      agenda: "demo",
      datetime: new Date(),
      roomid: "1",
    },
  ];
}
