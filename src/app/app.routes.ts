import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
// import { UpcomingMeetingsComponent } from "./meeting-room/upcoming-meetings/upcoming-meetings.component";
// import { MeetingRoomDetailsComponent } from "./meeting-room/meeting-room-details/meeting-room-details.component";
import { MeetingRoomComponent } from "./meeting-room/meeting-room.component";
import { authGuard } from "./auth/auth.guard";

export const routes: Routes = [
  { path: "login", component: LoginComponent, pathMatch: "full" },
  {
    path: "meetings",
    component: MeetingRoomComponent,
    canActivate: [authGuard],
  },
  { path: "**", redirectTo: "/login" },
];
