import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ToggleDescriptor } from "../shared/gsap-toggleable.directive";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  collapsed = false;
  gridInfo: ToggleDescriptor = {
    on: { gridTemplateColumns: "0rem 0% 1fr" },
    off: { gridTemplateColumns: "5rem 20% 1fr" }
  };

  constructor() {}

  ngOnInit() {}

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
