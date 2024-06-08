import { NgFor } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-create-meeting-dialog",
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: "./create-meeting-dialog.component.html",
  styleUrl: "./create-meeting-dialog.component.css",
})
export class CreateMeetingDialogComponent {
  @Output() close = new EventEmitter<void>();

  meetingRoomIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  closePopup() {
    this.close.emit();
  }

  userName: string = "";
  meetingDate: string = "";
  startTime: string = "";
  endTime: string = "";
  meetingRoom: string = "";
  agenda: string = "";

  onSubmit() {
    console.log("User Name:", this.userName);
    console.log("Meeting Date:", this.meetingDate);
    console.log("Start Time:", this.startTime);
    console.log("End Time:", this.endTime);
    console.log("Meeting Room:", this.meetingRoom);
    console.log("Agenda:", this.agenda);
  }
}
