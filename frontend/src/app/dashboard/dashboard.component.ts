import { Component } from "@angular/core";
import { ToggleDescriptor } from "../shared/gsap-toggleable.directive";

import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { ApiService } from "../networking/api.service";

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

  constructor(private api: ApiService) {}

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  printOrgs() {
    this.api.getOrganizations().subscribe(data => {
      console.log(data);
    });
  }

  createOrg() {
    this.api
      .createOrganization("name", "desc", "https://picsum.photos/200")
      .subscribe(org => {
        console.log(org);
      });
  }
}
