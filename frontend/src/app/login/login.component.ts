import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  onSubmit(): void {
    console.log(this.loginForm.value);
  }
}
