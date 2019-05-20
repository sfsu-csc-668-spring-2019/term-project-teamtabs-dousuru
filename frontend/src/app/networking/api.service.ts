import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Organization, Project, List, Task } from "../models";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private apiURL: string = environment.apiRoot;

  getOrganizations(): Observable<Organization[]> {
    const url = `${this.apiURL}/organization/list`;
    return this.http.get<Organization[]>(url);
  }

  createOrganization(
    name: string,
    description: string,
    icon: string
  ): Observable<Organization> {
    const url = `${this.apiURL}/organization/`;
    const body = { name, description, icon };
    return this.http.put<Organization>(url, body);
  }

  updateOrganization(organization: Organization): Observable<Organization> {
    const url = `${this.apiURL}/organization/`;
    const body = organization;
    return this.http.post<Organization>(url, body);
  }

  createAccount(
    email: string,
    username: string,
    password: string
  ): Observable<TokenResponse> {
    const url = `${this.apiURL}/users/signup`;
    const body = { email, username, password };
    return this.http.put<TokenResponse>(url, body);
  }

  login(identifier: string, password: string): Observable<TokenResponse> {
    const url = `${this.apiURL}/users/login`;
    const body = { password, identifier };
    return this.http.put<TokenResponse>(url, body);
  }

  getProjects(organization: number | Organization): Observable<Project[]> {
    if (typeof organization !== "number") {
      organization = organization.id;
    }
    const url = `${this.apiURL}/project/organizationProjects/${organization}`;
    return this.http.get<Project[]>(url);
  }

  createProject(
    organization: number | Organization,
    name: string,
    description: string,
    isPublic: boolean = true
  ): Observable<Project> {
    if (typeof organization !== "number") {
      organization = organization.id;
    }
    const url = `${this.apiURL}/project/${organization}`;
    const body = { name, isPublic, description };
    return this.http.put<Project>(url, body);
  }

  updateProject(project: Project): Observable<Project> {
    const url = `${this.apiURL}/project/update/${project.id}`;
    const body = project;
    return this.http.post<Project>(url, body);
  }

  createList(
    projectId: number | Project,
    name: string,
    description: string
  ): Observable<List> {
    if (typeof projectId !== "number") {
      projectId = projectId.id;
    }
    const url = `${this.apiURL}/list/create`;
    const body = { name, description, projectId };
    return this.http.post<List>(url, body);
  }

  createTask(
    listId: number | List,
    name: string,
    description: string
  ): Observable<Task> {
    if (typeof listId !== "number") {
      listId = listId.id;
    }
    console.log(listId, name, description);
    const url = `${this.apiURL}/task/create`;
    const body = { name, description, listId };
    return this.http.post<Task>(url, body);
  }

  getLists(project: number | Project): Observable<List[]> {
    if (typeof project !== "number") {
      project = project.id;
    }
    const url = `${this.apiURL}/list/projectLists/${project}`;
    return this.http.get<List[]>(url);
  }

  getInviteLink(organization: Organization): Observable<string> {
    const url = `${this.apiURL}/organization/inviteLink/${organization.id}`;
    const frontendPath = "/join_organization";
    const location = window.location;
    const frontendURL = `${location.protocol}//${window.location.host +
      frontendPath}`;
    return this.http.get<string>(url).pipe(
      map(inviteCode => {
        return frontendURL + `?invite=${inviteCode}`;
      })
    );
  }

  getOrganizationFromInvite(inviteCode: string): Observable<Organization> {
    const url = `${this.apiURL}/organization/withInvite/${inviteCode}`;
    return this.http.get<Organization>(url);
  }

  joinOrganization(inviteCode: string): Observable<Organization> {
    const url = `${this.apiURL}/organization/join/${inviteCode}`;
    console.log("calling join");
    return this.http.get<Organization>(url);
  }
}

interface TokenResponse {
  token: string;
}
