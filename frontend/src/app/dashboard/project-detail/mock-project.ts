import { Observable, of } from "rxjs";

import { Project } from "../../models/Project";

import { List } from "../../models/List";
import { LISTS } from "./mock-list";

export const PROJECT: Project = {
  id: 1,
  name: "Keisha",
  description:
    "Let's test out the services. She is a cool person, but who knows how well this is going",
  getLists() {
    return of(LISTS);
  },
  getChat: null
};
