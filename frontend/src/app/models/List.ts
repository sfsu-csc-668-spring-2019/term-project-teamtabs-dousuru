import { Task } from "./Task";

export class List {
  id: number;
  name: string;
  description: string;
  containedTasks: Task[];
}
