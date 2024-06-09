import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CreateMeetingService {
  combineDateAndTime(date: string, time: string): Date {
    return new Date(`${date}T${time}`);
  }

  isTimeValid(time: Date): boolean {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return hours >= 9 && (hours < 18 || (hours === 18 && minutes === 0));
  }

  isDurationValid(startTime: Date, endTime: Date): boolean {
    const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60); // Duration in minutes
    return duration >= 30;
  }

  isStartTimeLessThanEndTime(startTime: Date, endTime: Date): boolean {
    return endTime.getTime() > startTime.getTime();
  }

  isBookingInPast(startTime: Date, endTime: Date): boolean {
    const now = new Date();
    if (startTime < now) {
      return true;
    } else return false;
  }
}
