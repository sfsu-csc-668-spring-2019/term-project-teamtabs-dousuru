import { List, Project, Task } from "../entity";
import { Timestamp } from "typeorm";

export class TaskManager {
  static async createTask(name: string, description: string, listID: number, dueDate: Date): Promise<Task> {
    const baseList = await List.findOne(listID);
    const startTime = Date.now();
    const task = await Task.create({
      name,
      description,
      baseList,
      startTime,
      dueDate
    });
    return task.save()
  }
}

