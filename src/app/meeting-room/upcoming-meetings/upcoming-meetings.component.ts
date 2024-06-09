import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DatePipe, NgFor } from "@angular/common";
import { MeetingService } from "../meeting.service";
import { Meeting } from "../../models/meeting.models";

@Component({
  selector: "app-upcoming-meetings",
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: "./upcoming-meetings.component.html",
  styleUrl: "./upcoming-meetings.component.css",
})
export class UpcomingMeetingsComponent {
  constructor(private meetingService: MeetingService) {}
  @Input() upcomingMeetings: Array<Meeting> = [];
  @Output() updateMeetings = new EventEmitter<void>();

  deleteMeeting(meeting: Meeting) {
    if (confirm("Are you sure you want to delete?"))
      this.meetingService
        .deleteMeeting(meeting.roomid, meeting.id)
        .subscribe(() => {
          this.updateMeetings.emit();
        });
  }
}
