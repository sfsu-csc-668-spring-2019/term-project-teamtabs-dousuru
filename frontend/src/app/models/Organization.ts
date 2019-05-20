import { Observable, of } from "rxjs";
import { Project } from "./Project";
import { User } from "./User";
import { Role } from "./Role";
import { Chat } from "./Chat";

export class Organization {
  id: number;
  name: string;
  description: string;
  icon: string;
}
