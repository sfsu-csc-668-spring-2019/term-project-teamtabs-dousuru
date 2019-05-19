import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    identifier: ["", Validators.required],
    password: ["", Validators.required]
  });

  onSubmit(): void {
    const { identifier, password } = this.loginForm.value;
    this.authService
      .login(identifier, password)
      .toPromise()
      .then(success => {
        console.log(success);
        if (success) {
          this.router.navigateByUrl("/dashboard");
        }
      });
  }
}
