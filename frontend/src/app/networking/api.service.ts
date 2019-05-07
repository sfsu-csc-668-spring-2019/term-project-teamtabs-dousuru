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
    const url = `${this.apiURL}/organizations`;
    return this.http.get<Organization[]>(url);
  }
}
