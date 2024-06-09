import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  Meeting,
  MeetingRoom,
  MeetingRoomStatus,
} from "../models/meeting.models";
import { roomsAPIUrl } from "../constants";

@Injectable({
  providedIn: "root",
})
export class MeetingService {
  // private roomsAPIUrl = "http://localhost:3000/meetingRooms";
  private roomsAPIUrl = roomsAPIUrl;

  constructor(private http: HttpClient) {}

  getMeetings(): Observable<Meeting[]> {
    return this.http
      .get<MeetingRoom[]>(this.roomsAPIUrl)
      .pipe(map((rooms) => rooms.flatMap((room) => room.bookings)));
  }

  getMeeting(id: number): Observable<Meeting | undefined> {
    return this.http
      .get<MeetingRoom[]>(this.roomsAPIUrl)
      .pipe(
        map((rooms) =>
          rooms
            .flatMap((room) => room.bookings)
            .find((meeting) => meeting.id === id)
        )
      );
  }

  addMeeting(
    roomId: number,
    meeting: Meeting,
    callback: Function
  ): Observable<MeetingRoom> {
    return this.http.get<MeetingRoom>(`${this.roomsAPIUrl}/${roomId}`).pipe(
      map((room) => {
        const newMeeting = { ...meeting, id: new Date().getTime() }; // Generate a unique ID
        room.bookings.push(newMeeting);
        this.http
          .put<MeetingRoom>(`${this.roomsAPIUrl}/${roomId}`, room)
          .subscribe((res) => callback());
        return room;
      })
    );
  }

  updateMeeting(
    roomId: number,
    meetingId: number,
    updatedMeeting: Meeting
  ): Observable<MeetingRoom> {
    return this.http.get<MeetingRoom>(`${this.roomsAPIUrl}/${roomId}`).pipe(
      map((room) => {
        const index = room.bookings.findIndex(
          (meeting) => meeting.id === meetingId
        );
        if (index !== -1) {
          room.bookings[index] = updatedMeeting;
          this.http
            .put<MeetingRoom>(`${this.roomsAPIUrl}/${roomId}`, room)
            .subscribe();
        }
        return room;
      })
    );
  }

  deleteMeeting(
    roomId: number,
    meetingId: number | undefined
  ): Observable<void> {
    return this.http.get<MeetingRoom>(`${this.roomsAPIUrl}/${roomId}`).pipe(
      map((room) => {
        const index = room.bookings.findIndex(
          (meeting) => meeting.id === meetingId
        );
        if (index !== -1) {
          room.bookings.splice(index, 1);
          this.http
            .put<MeetingRoom>(`${this.roomsAPIUrl}/${roomId}`, room)
            .subscribe();
        }
      })
    );
  }

  getMeetingsByUser(userName: string): Observable<Meeting[]> {
    return this.http.get<MeetingRoom[]>(this.roomsAPIUrl).pipe(
      map((rooms) => rooms.flatMap((room) => room.bookings)),
      map((meetings) =>
        meetings.filter((meeting) => meeting.userName === userName)
      )
    );
  }

  getMeetingsByRoomId(roomId: number): Observable<Meeting[]> {
    return this.http.get<MeetingRoom[]>(this.roomsAPIUrl).pipe(
      map((rooms) => rooms.find((room) => room.id === roomId)),
      map((room) => {
        if (!room) {
          throw new Error("Room not found");
        }
        return room.bookings || [];
      })
    );
  }

  checkAvailability(
    rooms: MeetingRoom[],
    fromDatetime: Date,
    toDatetime: Date
  ): MeetingRoomStatus[] {
    return rooms.map((room) => {
      let status = "Available";
      let bookingsInRange = [];

      for (const booking of room.bookings) {
        const bookingStart = new Date(booking.fromDatetime);
        const bookingEnd = new Date(booking.toDatetime);

        if (bookingStart < toDatetime && bookingEnd > fromDatetime) {
          bookingsInRange.push(booking);

          if (bookingStart <= fromDatetime && bookingEnd >= toDatetime) {
            status = "Booked";
            break;
          } else {
            status = "In Use";
          }
        }
      }

      return { ...room, status, bookingsInRange };
    });
  }

  getMeetingRooms(): Observable<MeetingRoom[]> {
    return this.http.get<MeetingRoom[]>(this.roomsAPIUrl);
  }
}
