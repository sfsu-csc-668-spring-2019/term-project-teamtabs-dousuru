import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";

import { Project } from "../../models/Project";
import { List } from "../../models/List";

import { PROJECT } from "./mock-project";

import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProjectDetailService {
  constructor() {}

  getProject(): Observable<Project> {
    return of(PROJECT);
  }

  getLists(): Observable<List[]> {
    return PROJECT.getLists();
  }

  // fix this function
  getList(id: number): Observable<List> {
    return PROJECT.getLists().pipe(
      map(lists => {
        lists[id - 1];
      }),
      tap(_ => console.log("fetched id: ", id)),
      catchError(null)
    );
  }
}
