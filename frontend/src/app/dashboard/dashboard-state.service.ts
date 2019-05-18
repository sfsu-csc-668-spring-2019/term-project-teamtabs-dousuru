import { ApiService } from "./../networking/api.service";
import { Injectable } from "@angular/core";
import { Organization } from "../models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DashboardStateService {
  selectedOrganization: Organization;

  constructor(private apiService: ApiService) {}

  getOrganizations(): Observable<Organization[]> {
    return this.apiService.getOrganizations();
  }
}
