import { Observable, of } from "rxjs";
import { Organization } from "./Organization";
import { Message } from "./Message";

export class User {
  id: number;
  username: string;
  displayName: string;
  email: string;
  icon: string;
}

export class OwnUser extends User {}
