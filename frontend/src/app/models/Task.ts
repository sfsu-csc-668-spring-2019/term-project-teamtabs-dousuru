import { List } from "./List";
import { Tag } from "./Tag";

export class Task {
  id: number;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  dueDate: Date;
  baseList: List;
  tags: Tag[];
}
