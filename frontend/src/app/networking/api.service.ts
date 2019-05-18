import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Organization } from "../models";
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

  createOrganization(): Observable<Organization> {
    const url = `${this.apiURL}/organization/`;
    const body = {
      name: "name",
      description: "description",
      icon: "https://picsum.photos/200"
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
}

interface TokenResponse {
  token: string;
}
