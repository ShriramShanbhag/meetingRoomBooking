import { Component } from "@angular/core";
import { UpcomingMeetingsComponent } from "./upcoming-meetings/upcoming-meetings.component";
import { MeetingRoomDetailsComponent } from "./meeting-room-details/meeting-room-details.component";
import { CreateMeetingDialogComponent } from "./create-meeting-dialog/create-meeting-dialog.component";
import { NgIf } from "@angular/common";

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
  showMeetingDialog = false;

  openMeetingDialog = () => {
    this.showMeetingDialog = true;
  };

  closeMeetingDialog = () => {
    this.showMeetingDialog = false;
  };
}
