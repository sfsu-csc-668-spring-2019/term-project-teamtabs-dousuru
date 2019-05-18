import { ApiService } from "./../networking/api.service";
import { Injectable } from "@angular/core";
import { Organization, Project } from "../models";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DashboardStateService {
  selectedOrganization: Organization;
  selectedProject: Project;

  organizationsSubject: BehaviorSubject<Organization[]>;
  projectsSubject: BehaviorSubject<Project[]>;

  constructor(private apiService: ApiService) {
    this.organizationsSubject = new BehaviorSubject([]);
    this.projectsSubject = new BehaviorSubject([]);
  }

  get organizations(): Organization[] {
    return this.organizationsSubject.value;
  }

  set organizations(newValue: Organization[]) {
    this.organizationsSubject.next(newValue);
  }

  get projects(): Project[] {
    return this.projectsSubject.value;
  }

  set projects(newValue: Project[]) {
    this.projectsSubject.next(newValue);
  }

  fetchOrganizations(): void {
    this.apiService
      .getOrganizations()
      .toPromise()
      .then(orgs => (this.organizations = orgs));
  }

  fetchProjects(): void {
    this.apiService
      .getProjects(this.selectedOrganization)
      .toPromise()
      .then(projects => (this.projects = projects));
  }

  setSelectedOrganization(id: number): void {
    this.selectedOrganization = this.organizations.find(org => org.id === id);
  }

  setSelectedProject(id: number): void {
    this.selectedProject = this.projects.find(project => project.id === id);
  }
}
