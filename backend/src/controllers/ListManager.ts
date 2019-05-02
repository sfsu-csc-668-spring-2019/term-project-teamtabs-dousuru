import { List, Project, Task } from "../entity";
import { Timestamp } from "typeorm";

export class ListManager {
  static async createList(name: string, description: string, projectID: number): Promise<List> {
    const baseProject = await Project.findOne(projectID);
    const task = await List.create({
      name,
      description,
      baseProject
    });
    return task
  }
}

