import { Observable, of } from "rxjs";
import { Organization } from "./Organization";
import { Project } from "./Project";
import { User } from "./User";

export class Role {
  id: number;
  name: string;
  canInvite: boolean;
  canManage: boolean;
  canPost: boolean;

  getOrganization(): Observable<Organization> {
    return of();
  }

  getProject(): Observable<Project> {
    return of();
  }

  getUsers(): Observable<User[]> {
    return of();
  }
}
