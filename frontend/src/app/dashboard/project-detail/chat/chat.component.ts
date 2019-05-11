import { Component, OnInit } from "@angular/core";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  upArrow = faChevronUp;
  downArrow = faChevronDown;
  collapsed = false;

  constructor() {}

  ngOnInit() {}

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
