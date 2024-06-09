import { DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MeetingService } from "../meeting.service";
import { MeetingRoom, MeetingRoomStatus } from "../../models/meeting.models";
import { CreateMeetingService } from "../create-meeting-dialog/create-meeting.service";

@Component({
  selector: "app-check-status-dialog",
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, DatePipe, NgClass],
  templateUrl: "./check-status-dialog.component.html",
  styleUrl: "./check-status-dialog.component.css",
})
export class CheckStatusDialogComponent {
  @Output() close = new EventEmitter<void>();
  @Output() updatedmeetings = new EventEmitter<void>();
  meetingRooms: MeetingRoom[] = [];
  roomsWithStatus: MeetingRoomStatus[] = [];
  isDiaplayError: boolean = false;

  constructor(
    private meetingService: MeetingService,
    private createMeetingService: CreateMeetingService
  ) {}

  ngOnInit() {
    this.meetingService.getMeetingRooms().subscribe((rooms) => {
      this.meetingRooms = rooms;
    });
  }

  closePopup() {
    this.close.emit();
  }

  userName: string = "";
  meetingDate: string;
  startTime: string;
  endTime: string;

  onSearch() {
    let fromDatetime = this.createMeetingService.combineDateAndTime(
      this.meetingDate,
      this.startTime
    );
    let toDatetime = this.createMeetingService.combineDateAndTime(
      this.meetingDate,
      this.endTime
    );

    this.roomsWithStatus = this.meetingService.checkAvailability(
      this.meetingRooms,
      fromDatetime,
      toDatetime
    );
  }

  getStatus(room: MeetingRoomStatus): string {
    return room.status;
  }

  getBookings(room: MeetingRoomStatus) {
    return room.bookingsInRange || [];
  }

  getStatusClass(room: MeetingRoomStatus) {
    return room.status === "Available" ? "available" : "not-available";
  }
}
