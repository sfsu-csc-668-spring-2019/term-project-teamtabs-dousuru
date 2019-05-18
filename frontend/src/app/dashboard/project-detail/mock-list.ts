import { Observable, of } from "rxjs";

import { List } from "../../models/List";
import { TASKS } from "./mock-task";

export const LISTS: List[] = [
  {
    id: 1,
    name: "Final Project",
    description: "This is some kind of description for list",
    tasks: TASKS
  },
  {
    id: 2,
    name: "Presentation",
    description: "this sill be the presentation thing",
    tasks: TASKS
  }
];
