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
}
