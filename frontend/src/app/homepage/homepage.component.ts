import { Component, OnInit } from "@angular/core";
import { ModalService } from "../shared/modal.service";
import { LoginComponent } from "../login/login.component";
@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"]
})
export class HomepageComponent implements OnInit {
  constructor(private modal: ModalService) {}

  ngOnInit() {}

  open() {
    this.modal.open(LoginComponent);
  }
}
