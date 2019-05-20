import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm: FormGroup;

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ["", Validators.required],
      username: ["", Validators.required],
      displayname: [""],
      password: ["", Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.registerForm);
    const { email, username, password } = this.registerForm.value;
    this.authService
      .createAccount(username, email, password)
      .toPromise()
      .then(success => {
        console.log(success);
        if (success) {
          this.router.navigateByUrl("/dashboard");
        }
      });
  }
}
