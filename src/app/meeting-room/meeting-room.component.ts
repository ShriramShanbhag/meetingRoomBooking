import { Component } from "@angular/core";
import { UpcomingMeetingsComponent } from "./upcoming-meetings/upcoming-meetings.component";
import { MeetingRoomDetailsComponent } from "./meeting-room-details/meeting-room-details.component";
import { CreateMeetingDialogComponent } from "./create-meeting-dialog/create-meeting-dialog.component";
import { NgIf } from "@angular/common";
import { MeetingService } from "./meeting.service";
import { Meeting } from "../models/meeting.models";

@Component({
  selector: "app-meeting-room",
  standalone: true,
  imports: [
    UpcomingMeetingsComponent,
    MeetingRoomDetailsComponent,
    CreateMeetingDialogComponent,
    NgIf,
  ],
  templateUrl: "./meeting-room.component.html",
  styleUrl: "./meeting-room.component.css",
})
export class MeetingRoomComponent {
  constructor(private meetingService: MeetingService) {}

  showMeetingDialog = false;
  upcomingMeetings: Meeting[] = [];
  upcomingMeetingsForUser: Meeting[] = [];

  ngOnInit() {
    this.handleMeetingsUpdated();
  }

  openMeetingDialog = () => {
    this.showMeetingDialog = true;
  };

  handleMeetingsUpdated() {
    this.meetingService.getMeetings().subscribe((meetings) => {
      this.upcomingMeetings = meetings;
      this.upcomingMeetingsForUser = meetings.filter(
        (m) => m.userName === localStorage.getItem("userName")
      );
    });
  }

  closeMeetingDialog = () => {
    this.showMeetingDialog = false;
  };
}
