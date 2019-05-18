import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DashboardStateService } from "./../dashboard-state.service";
import { Organization } from "../../models";
import { ModalService } from "src/app/shared/modal.service";
import { CreateOrganizationComponent } from "../create-organization/create-organization.component";
import { map } from "rxjs/operators";

@Component({
  selector: "app-organization-list",
  templateUrl: "./organization-list.component.html",
  styleUrls: ["./organization-list.component.scss"]
})
export class OrganizationListComponent implements OnInit {
  plusIcon = faPlus;
  organizations: Observable<Organization[]>;
  selectedOrganization: Observable<Organization>;
  constructor(
    private dashboardStateService: DashboardStateService,
    private modal: ModalService
  ) {}

  ngOnInit() {
    this.organizations = this.dashboardStateService.organizationsSubject.asObservable();
    this.selectedOrganization = this.dashboardStateService.selectedOrganization.asObservable();
    this.dashboardStateService.fetchOrganizations();
  }

  selectOrganization(id: number) {
    this.dashboardStateService.setSelectedOrganization(id);
  }

  isSelected(organization: Organization): Observable<boolean> {
    return this.selectedOrganization.pipe(
      map(selected => {
        if (!selected) {
          return false;
        }
        return selected.id === organization.id;
      })
    );
  }

  addOrganization() {
    this.modal.open(CreateOrganizationComponent);
  }
}
