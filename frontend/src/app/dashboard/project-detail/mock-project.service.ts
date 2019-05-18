import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";

import { Project } from "../../models/Project";
import { PROJECT } from "./mock-project";

@Injectable({
  providedIn: "root"
})
export class MockProjectService {
  constructor() {}

  public getProject(): Observable<Project> {
    return of(PROJECT);
  }
}
