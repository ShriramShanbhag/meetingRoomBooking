import { Component } from "@angular/core";
import { UpcomingMeetingsComponent } from "./upcoming-meetings/upcoming-meetings.component";
import { MeetingRoomDetailsComponent } from "./meeting-room-details/meeting-room-details.component";
import { CreateMeetingDialogComponent } from "./create-meeting-dialog/create-meeting-dialog.component";
import { NgIf } from "@angular/common";
import { MeetingService } from "./meeting.service";
import { Meeting } from "../models/meeting.models";
import { CheckStatusDialogComponent } from "./check-status-dialog/check-status-dialog.component";

@Component({
  selector: "app-meeting-room",
  standalone: true,
  imports: [
    UpcomingMeetingsComponent,
    MeetingRoomDetailsComponent,
    CreateMeetingDialogComponent,
    CheckStatusDialogComponent,
    NgIf,
  ],
  templateUrl: "./meeting-room.component.html",
  styleUrl: "./meeting-room.component.css",
})
export class MeetingRoomComponent {
  constructor(private meetingService: MeetingService) {}

  showMeetingDialog = false;
  showStatusDialog = false;
  upcomingMeetings: Meeting[] = [];
  upcomingMeetingsForUser: Meeting[] = [];

  ngOnInit() {
    this.handleMeetingsUpdated();
  }

  openMeetingDialog = () => {
    this.showMeetingDialog = true;
  };
  openStatusDialog = () => {
    this.showStatusDialog = true;
  };

  handleMeetingsUpdated() {
    let now = new Date();
    this.meetingService.getMeetings().subscribe((meetings) => {
      this.upcomingMeetings = meetings.filter(
        (m) => new Date(m.fromDatetime) >= now
      );
      this.upcomingMeetingsForUser = meetings
        .filter((m) => m.userName === localStorage.getItem("userName"))
        .filter((me) => new Date(me.fromDatetime) >= now);
    });
  }

  closeMeetingDialog = () => {
    this.showMeetingDialog = false;
  };

  closeStatusDialog = () => {
    this.showStatusDialog = false;
  };
}
