import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, RouterModule],
  providers: [AuthService],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  userName: String = "";
  password: String = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/meetings"]);
    }
  }
  onSubmit() {
    this.authService
      .login(this.userName, this.password)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(["meetings"]);
        }
      });
  }
}
