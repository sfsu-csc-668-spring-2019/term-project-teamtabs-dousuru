import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { faPlus, faCog } from "@fortawesome/free-solid-svg-icons";
import { DashboardStateService } from "./../dashboard-state.service";
import { Organization } from "../../models";
import { ModalService } from "src/app/shared/modal.service";
import { CreateOrganizationComponent } from "../create-organization/create-organization.component";
import { map } from "rxjs/operators";
import { EditOrganizationComponent } from "../edit-organization/edit-organization.component";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-organization-list",
  templateUrl: "./organization-list.component.html",
  styleUrls: ["./organization-list.component.scss"]
})
export class OrganizationListComponent implements OnInit {
  plusIcon = faPlus;
  editIcon = faCog;

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

  selectOrganization(e: Event, id: number) {
    e.stopPropagation();
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

  addOrganization(e: Event) {
    e.stopPropagation();
    this.modal.open(CreateOrganizationComponent);
  }

  edit(e: Event, organization: Organization) {
    e.stopPropagation();
    const componentRef = this.modal.open(EditOrganizationComponent);
    componentRef.instance.organization = organization;
  }

  clear() {
    this.dashboardStateService.clearSelected();
  }
}
