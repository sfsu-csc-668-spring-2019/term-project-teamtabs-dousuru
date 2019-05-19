import { Observable, of } from "rxjs";

import { Project } from "../../models/Project";

import { List } from "../../models/List";
import { LISTS } from "./mock-list";

export const PROJECT: Project = {
  id: 1,
  name: "Title is called Eric Groom",
  description:
    "Let's test out the services. She is a cool person, but who knows how well this is going. Honestly I don't know what else to put here cuz ypu ypu yup",
  getLists() {
    return of(LISTS);
  },
  getChat: null
};
