import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  authenticated$: Observable<boolean>;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authenticated$ = this.authService.authenticated;
  }
}
