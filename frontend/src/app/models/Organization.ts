import { Observable, of } from "rxjs";
import { Project } from "./Project";
import { User } from "./User";
import { Role } from "./Role";
import { Chat } from "./Chat";

export class Organization {
  id: number;
  name: string;
  description: string;
  inviteLink: string;
  icon: string;

  getProjects(): Observable<Project[]> {
    return of();
  }

  getUsers(): Observable<User[]> {
    return of();
  }

  getOwner(): Observable<User> {
    return of();
  }

  getRoles(): Observable<Role[]> {
    return of();
  }

  getChat(): Observable<Chat> {
    return of();
  }
}
