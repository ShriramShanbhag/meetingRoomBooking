import { Component } from "@angular/core";
import { UpcomingMeetingsComponent } from "../upcoming-meetings/upcoming-meetings.component";
import { DatePipe, NgFor } from "@angular/common";
import { Meeting } from "../../models/meeting.models";

@Component({
  selector: "app-meeting-room-details",
  standalone: true,
  imports: [UpcomingMeetingsComponent, NgFor, DatePipe],
  templateUrl: "./meeting-room-details.component.html",
  styleUrl: "./meeting-room-details.component.css",
})
export class MeetingRoomDetailsComponent {
  meetingRoomIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  upcomingMeetings: Array<Meeting> = [
    {
      userName: "demo",
      agenda: "demo",
      datetime: new Date(),
      roomid: "1",
    },
  ];
}
