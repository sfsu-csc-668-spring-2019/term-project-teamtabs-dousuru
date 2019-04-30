import { Component } from "@angular/core";
import { ToggleDescriptor } from "../shared/gsap-toggleable.directive";

import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  collapsed = false;
  gridInfo: ToggleDescriptor = {
    on: { gridTemplateColumns: "0rem 0% 1fr" },
    off: { gridTemplateColumns: "5rem 20% 1fr" }
  };

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
