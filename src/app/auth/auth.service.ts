import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:3000/users";
  private loggedIn = false;
  constructor(private http: HttpClient) {}

  login(userName: String, password: String): Observable<Boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.userName === userName && u.password === password
        );
        if (user) {
          localStorage.setItem("isLoggedIn", "true");
          return true;
        } else return false;
      })
    );
  }

  setLoggedIn(v: boolean): void {
    this.loggedIn = v;
  }

  logout(): void {
    localStorage.removeItem("isLoggedIn");
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("isLoggedIn") === "true";
  }
}
