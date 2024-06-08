import { Component } from "@angular/core";
import { UpcomingMeetingsComponent } from "./upcoming-meetings/upcoming-meetings.component";
import { MeetingRoomDetailsComponent } from "./meeting-room-details/meeting-room-details.component";

@Component({
  selector: "app-meeting-room",
  standalone: true,
  imports: [UpcomingMeetingsComponent, MeetingRoomDetailsComponent],
  templateUrl: "./meeting-room.component.html",
  styleUrl: "./meeting-room.component.css",
})
export class MeetingRoomComponent {}
