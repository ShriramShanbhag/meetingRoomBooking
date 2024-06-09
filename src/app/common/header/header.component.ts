import { Component } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [NgIf],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}
  userName = localStorage.getItem("userName");
  isLoggedIn = this.authService.isLoggedIn();

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
    this.isLoggedIn = false;
  }
}
