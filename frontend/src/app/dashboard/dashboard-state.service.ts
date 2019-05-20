import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, mergeAll } from "rxjs/operators";
import { ApiService } from "./../networking/api.service";
import { Organization, Project, List, Task } from "../models";

@Injectable({
  providedIn: "root"
})
export class DashboardStateService {
  selectedOrganization: BehaviorSubject<Organization>;
  organizationsSubject: BehaviorSubject<Organization[]>;
  projects: Observable<Project[]>;
  selectedProject: BehaviorSubject<Project>;
  lists: Observable<List[]>;

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
    this.lists = this.selectedProject.pipe(
      map(selected => {
        if (!selected) {
          return [];
        }
        return this.apiService.getLists(selected);
      }),
      mergeAll()
    );
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

  clearSelected() {
    this.selectedOrganization.next(null);
    this.selectedProject.next(null);
  }

  createOrganization(name, description, icon): Observable<Organization> {
    return this.apiService.createOrganization(name, description, icon);
  }

  updateOrganization(organization: Organization): Observable<Organization> {
    return this.apiService.updateOrganization(organization);
  }

  deleteOrganization(organization: Organization): Observable<void> {
    return this.apiService.deleteOrganization(organization);
  }

  getInviteLink(organization: Organization): Observable<string> {
    return this.apiService.getInviteLink(organization);
  }

  createProject(name, description, isPublic): Observable<Project> {
    if (!this.selectedOrganization.value) {
      // tslint:disable-next-line: deprecation
      return of();
    }
    const org = this.selectedOrganization.value;
    return this.apiService.createProject(org, name, description, isPublic);
  }

  updateProject(project: Project): Observable<Project> {
    return this.apiService.updateProject(project);
  }

  deleteProject(project: Project): Observable<void> {
    return this.apiService.deleteProject(project);
  }

  setSelectedProject(project: Project) {
    this.selectedProject.next(project);
  }

  createList(name: string, description: string): Observable<List> {
    if (!this.selectedProject.value) {
      return of();
    }
    const project = this.selectedProject.value;
    return this.apiService.createList(project, name, description);
  }

  updateList(list: List): Observable<List> {
    return this.apiService.updateList(list);
  }

  createTask(taskId: number): Observable<Task> {
    if (!this.lists) {
      // don't think this is right
      return of();
    }
    return this.apiService.createTask(taskId, "new task", "description stuffs");
  }

  updateTask(task: Task): Observable<Task> {
    return this.apiService.updateTask(task);
  }
}
