import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Organization, Project } from "../models";
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
    const body = {
      name: name,
      description: description,
      icon: icon ? icon : "https://picsum.photos/200"
    };
    return this.http.put<Organization>(url, body);
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
    const url = `${this.apiURL}/project/${organization}`;
    return this.http.get<Project[]>(url);
  }

  createProject(
    organization: number | Organization,
    name: string,
    isPublic: boolean = true
  ): Observable<Project> {
    if (typeof organization !== "number") {
      organization = organization.id;
    }
    const url = `${this.apiURL}/project/${organization}`;
    const body = { name, isPublic };
    return this.http.put<Project>(url, body);
  }
}

interface TokenResponse {
  token: string;
}
