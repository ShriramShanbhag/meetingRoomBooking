import { Component, Input } from "@angular/core";
import { UpcomingMeetingsComponent } from "../upcoming-meetings/upcoming-meetings.component";
import { DatePipe, NgFor } from "@angular/common";
import { Meeting, MeetingRoom } from "../../models/meeting.models";
import { MeetingService } from "../meeting.service";

@Component({
  selector: "app-meeting-room-details",
  standalone: true,
  imports: [UpcomingMeetingsComponent, NgFor, DatePipe],
  templateUrl: "./meeting-room-details.component.html",
  styleUrl: "./meeting-room-details.component.css",
})
export class MeetingRoomDetailsComponent {
  @Input() upcomingMeetings: Array<Meeting>;

  meetingRooms: MeetingRoom[] = [];
  meetingRoomIds: Number[] = [];
  upcomingMeetingsByRoom: Meeting[] = [];

  constructor(private meetingService: MeetingService) {}

  ngOnInit() {
    this.meetingService.getMeetingRooms().subscribe((rooms) => {
      this.meetingRooms = rooms;
      this.meetingRoomIds = rooms.map((r) => r.id);
    });
  }

  onSelectionChange(event: Event) {
    let selectElement = event.target as HTMLSelectElement;
    let selectedValue = selectElement.value;
    this.getMeetingRoomDetails(Number(selectedValue));
  }

  getMeetingRoomDetails(meetingRoomId: Number) {
    this.upcomingMeetingsByRoom = this.upcomingMeetings.filter(
      (m) => Number(m.roomid) === meetingRoomId
    );
  }
}
