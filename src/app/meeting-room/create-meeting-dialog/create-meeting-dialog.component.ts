import { NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MeetingService } from "../meeting.service";
import { Meeting, MeetingRoom } from "../../models/meeting.models";
import { CreateMeetingService } from "./create-meeting.service";

@Component({
  selector: "app-create-meeting-dialog",
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: "./create-meeting-dialog.component.html",
  styleUrl: "./create-meeting-dialog.component.css",
})
export class CreateMeetingDialogComponent {
  @Output() close = new EventEmitter<void>();
  @Output() updatedmeetings = new EventEmitter<void>();
  meetingRooms: MeetingRoom[] = [];
  meetingRoomIds: Number[] = [];
  isDisplayRoomAgenda: boolean = false;

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

  showAvailableRooms() {
    let fromDatetime = this.createMeetingService.combineDateAndTime(
      this.meetingDate,
      this.startTime
    );
    let toDatetime = this.createMeetingService.combineDateAndTime(
      this.meetingDate,
      this.endTime
    );

    if (this.createMeetingService.isBookingInPast(fromDatetime, toDatetime)) {
      alert("Cannot book for the past");
      return;
    }

    // Check if selected date is weekend
    const selectedDay = fromDatetime.getDay();
    if (selectedDay === 0 || selectedDay === 6) {
      alert("Meetings cannot be booked on Weekends");
      return;
    }

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

    if (
      !this.createMeetingService.isStartTimeLessThanEndTime(
        fromDatetime,
        toDatetime
      )
    ) {
      alert("Start time cannot be greater than end time");
      return;
    }

    this.meetingRoomIds = this.meetingService
      .checkAvailability(this.meetingRooms, fromDatetime, toDatetime)
      .filter((r) => r.status === "Available")
      .map((u) => u.id);
    this.isDisplayRoomAgenda = true;
  }

  hideAvailableRooms() {
    this.isDisplayRoomAgenda = false;
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
    if (!this.userName) {
      alert("Username missing");
      return;
    }
    if (!this.meetingRoom) {
      alert("Select a meeting room");
      return;
    }
    if (!this.agenda) {
      alert("agenda cannot be empty");
      return;
    }

    let fromDatetime = this.createMeetingService.combineDateAndTime(
      this.meetingDate,
      this.startTime
    );
    let toDatetime = this.createMeetingService.combineDateAndTime(
      this.meetingDate,
      this.endTime
    );

    if (
      !this.createMeetingService.isStartTimeLessThanEndTime(
        fromDatetime,
        toDatetime
      )
    ) {
      alert("Start time cannot be greater than end time");
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
