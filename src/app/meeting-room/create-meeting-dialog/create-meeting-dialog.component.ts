import { NgFor } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MeetingService } from "../meeting.service";
import { Meeting, MeetingRoom } from "../../models/meeting.models";
import { CreateMeetingService } from "./create-meeting.service";

@Component({
  selector: "app-create-meeting-dialog",
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: "./create-meeting-dialog.component.html",
  styleUrl: "./create-meeting-dialog.component.css",
})
export class CreateMeetingDialogComponent {
  @Output() close = new EventEmitter<void>();
  @Output() updatedmeetings = new EventEmitter<void>();
  meetingRooms: MeetingRoom[] = [];
  meetingRoomIds: Number[] = [];
  isDiaplayError: boolean = false;

  constructor(
    private meetingService: MeetingService,
    private createMeetingService: CreateMeetingService
  ) {}

  ngOnInit() {
    this.meetingService.getMeetingRooms().subscribe((rooms) => {
      this.meetingRooms = rooms;
      this.meetingRoomIds = rooms.map((r) => r.id);
    });
  }

  closePopup() {
    this.close.emit();
  }

  userName: string = "";
  meetingDate: string;
  startTime: string;
  endTime: string;
  meetingRoom: number;
  agenda: string = "";

  onSubmit() {
    let fromDatetime = this.createMeetingService.combineDateAndTime(
      this.meetingDate,
      this.startTime
    );
    let toDatetime = this.createMeetingService.combineDateAndTime(
      this.meetingDate,
      this.endTime
    );
    // Validate time range
    if (
      !this.createMeetingService.isTimeValid(fromDatetime) ||
      !this.createMeetingService.isTimeValid(toDatetime)
    ) {
      alert("Meeting times must be between 09:00 AM and 06:00 PM");
      return;
    }

    // Validate duration
    if (!this.createMeetingService.isDurationValid(fromDatetime, toDatetime)) {
      alert("Meeting duration must be at least 30 minutes");
      return;
    }
    let meeting: Meeting = {
      userName: this.userName,
      agenda: this.agenda,
      roomid: this.meetingRoom,
      fromDatetime: fromDatetime,
      toDatetime: toDatetime,
    };
    this.meetingService
      .addMeeting(meeting.roomid, meeting, () => {
        this.updatedmeetings.emit();
        this.closePopup();
      })
      .subscribe();
  }
}
