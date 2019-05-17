import { DashboardStateService } from "./../dashboard-state.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Organization } from "../../models";

@Component({
  selector: "app-organization-list",
  templateUrl: "./organization-list.component.html",
  styleUrls: ["./organization-list.component.scss"]
})
export class OrganizationListComponent implements OnInit {
  organizations: Observable<Organization[]>;
  constructor(private dashboardStateService: DashboardStateService) {}

  ngOnInit() {}

  selectOrganization(id: number) {
    console.log("selectOrganization");
  }
}
