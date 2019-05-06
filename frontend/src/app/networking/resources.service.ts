import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiService } from "../network-testing/api.service";
import { Organization } from "./Organization";

@Injectable({
  providedIn: "root"
})
export class ResourcesService {
  constructor(private api: ApiService) {}

  private unsplash = "https://source.unsplash.com/random";

  getOrganizations(): Observable<Organization[]> {
    const organizations = [1, 2, 3].map(i => {
      return new Organization(`org ${i}`, this.unsplash);
    });
    organizations[0].active = true;
    return of(organizations);
  }
}
