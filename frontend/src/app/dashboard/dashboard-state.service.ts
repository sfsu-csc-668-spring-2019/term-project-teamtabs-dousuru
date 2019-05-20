import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, mergeAll } from "rxjs/operators";
import { ApiService } from "./../networking/api.service";
import { Organization, Project } from "../models";

@Injectable({
  providedIn: "root"
})
export class DashboardStateService {
  selectedOrganization: BehaviorSubject<Organization>;
  organizationsSubject: BehaviorSubject<Organization[]>;
  projects: Observable<Project[]>;
  selectedProject: BehaviorSubject<Project>;

  constructor(private apiService: ApiService) {
    this.selectedOrganization = new BehaviorSubject(null);
    this.organizationsSubject = new BehaviorSubject([]);
    this.projects = this.selectedOrganization.asObservable().pipe(
      map(org => {
        if (!org) {
          return [];
        }
        return this.apiService.getProjects(org);
      }),
      mergeAll()
    );
    this.selectedProject = new BehaviorSubject(null);
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
    if (selectedOrg !== this.selectedOrganization.value) {
      this.selectedProject.next(null);
    }
    this.selectedOrganization.next(selectedOrg);
  }

  createOrganization(name, description, icon): Observable<Organization> {
    return this.apiService.createOrganization(name, description, icon);
  }

  updateOrganization(organization: Organization): Observable<Organization> {
    return this.apiService.updateOrganization(organization);
  }

  createProject(): Observable<Project> {
    if (!this.selectedOrganization.value) {
      // tslint:disable-next-line: deprecation
      return of();
    }
    const org = this.selectedOrganization.value;
    return this.apiService.createProject(org, "new project", "asdf", true);
  }

  setSelectedProject(project: Project) {
    this.selectedProject.next(project);
  }
}
