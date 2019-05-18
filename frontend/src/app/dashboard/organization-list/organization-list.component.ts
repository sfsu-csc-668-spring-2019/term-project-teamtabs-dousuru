import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DashboardStateService } from "./../dashboard-state.service";
import { Organization } from "../../models";

@Component({
  selector: "app-organization-list",
  templateUrl: "./organization-list.component.html",
  styleUrls: ["./organization-list.component.scss"]
})
export class OrganizationListComponent implements OnInit {
  plusIcon = faPlus;
  organizations: Observable<Organization[]>;
  constructor(private dashboardStateService: DashboardStateService) {}

  ngOnInit() {
    this.organizations = this.dashboardStateService.organizationsSubject.asObservable();
    this.dashboardStateService.fetchOrganizations();
  }

  selectOrganization(id: number) {
    this.dashboardStateService.setSelectedOrganization(id);
  }

  addOrganization() {
    this.dashboardStateService
      .createOrganization()
      .toPromise()
      .then(newOrg => {
        console.log(newOrg);
      });
  }
}
