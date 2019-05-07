import { Observable, of } from "rxjs";
import { Project } from "./Project";
import { Task } from "./Task";

export class Tag {
  id: number;
  name: string;
  color: string;

  getProject(): Observable<Project> {
    return of();
  }

  getTasks(): Observable<Task[]> {
    return of();
  }
}
