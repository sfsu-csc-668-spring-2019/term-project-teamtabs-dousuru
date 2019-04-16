import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-auth-tester",
  templateUrl: "./auth-tester.component.html",
  styleUrls: ["./auth-tester.component.scss"]
})
export class AuthTesterComponent implements OnInit {
  constructor(private authService: AuthService) {}

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  selectionChanged(event) {
    const isAuthString = event.target.value;
    const isAuth = isAuthString === "true";
    this.authService.isAuthenticated = isAuth;
  }

  ngOnInit() {}
}
