export interface Meeting {
  id?: number;
  userName: String;
  agenda: String;
  fromDatetime: Date;
  toDatetime: Date;
  roomid: number;
}

export interface MeetingRoom {
  id: number;
  bookings: Array<Meeting>;
}

export interface MeetingRoomStatus extends MeetingRoom {
  status: string;
  bookingsInRange: Array<Meeting>;
}
