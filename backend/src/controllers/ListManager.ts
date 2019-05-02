import { List, Project, Task } from "../entity";
import { Timestamp } from "typeorm";

export class ListManager {
  static async createList(name: string, description: string, projectID: number): Promise<List> {
    const baseProject = await Project.findOne(projectID);
    const list = await List.create({
      name,
      description,
      baseProject
    });
    return list.save()
  }

  //get tasks within a list
  static async getListTasks(listID: number): Promise<Task[]> {
    const list = await List.findOne(listID);
    return list.containedTasks;
  }
}

