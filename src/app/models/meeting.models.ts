export interface Meeting {
  userName: String;
  agenda: String;
  fromDatetime: Date;
  toDatetime: Date;
  roomid: String;
}

export interface MeetingRoom {
  id: Number;
  bookings: Array<Meeting>;
}
