import { Observable, of } from "rxjs";
import { Organization } from "./Organization";
import { Message } from "./Message";

export class User {
  id: number;
  username: string;
  displayName: string;
  email: string;
  icon: string;

  getOrganizations(): Observable<Organization[]> {
    return of();
  }

  getOwnedMessages(): Observable<Message[]> {
    return of();
  }

  getReceivedMessages(): Observable<Message[]> {
    return of();
  }
}

export class OwnUser extends User {}
