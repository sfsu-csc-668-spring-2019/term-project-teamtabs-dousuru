import { Component } from "@angular/core";
import { ToggleDescriptor } from "../shared/gsap-toggleable.directive";

import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { ApiService } from "../networking/api.service";
import { DashboardStateService } from "./dashboard-state.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  collapsed = false;

  gridInfo: ToggleDescriptor = {
    on: { gridTemplateColumns: "0rem 0% 1fr" },
    off: { gridTemplateColumns: "6rem 20% 1fr" }
  };

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor(private dashboardStateService: DashboardStateService) {}

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  active() {
    return this.dashboardStateService.selectedOrganization.value != null;
  }
}
