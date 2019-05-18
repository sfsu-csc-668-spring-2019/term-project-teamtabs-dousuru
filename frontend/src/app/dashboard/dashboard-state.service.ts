import { ApiService } from "./../networking/api.service";
import { Injectable } from "@angular/core";
import { Organization } from "../models";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DashboardStateService {
  selectedOrganization: Organization;
  organizationsSubject: BehaviorSubject<Organization[]>;

  constructor(private apiService: ApiService) {
    this.organizationsSubject = new BehaviorSubject([]);
  }

  get organizations(): Organization[] {
    return this.organizationsSubject.value;
  }

  set organizations(newValue: Organization[]) {
    this.organizationsSubject.next(newValue);
  }

  fetchOrganizations() {
    this.apiService
      .getOrganizations()
      .toPromise()
      .then(orgs => {
        this.organizations = orgs;
      });
  }

  setSelectedOrganization(id: number) {
    const selectedOrg = this.organizations.find(org => {
      return org.id === id;
    });
    this.selectedOrganization = selectedOrg;
    this.apiService
      .createProject(this.selectedOrganization, "new project", "desc", true)
      .toPromise()
      .then(proj => {
        console.log(proj);
      });
  }
}
