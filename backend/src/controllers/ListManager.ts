import { List, Project, Task } from "../entity";
import { Timestamp, getConnection } from "typeorm";

export class ListManager {
  static async createList(
    name: string,
    description: string,
    projectID: number
  ): Promise<List> {
    const baseProject = await Project.findOne(projectID);
    const list = await List.create({
      name,
      description,
      baseProject
    });
    return list.save();
  }

  static async getTasks(listID: number): Promise<Task[]> {
    const list = await List.findOne(listID);
    return list.containedTasks;
  }

  static async updateName(name: string, listId: number): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .update(List)
      .set({ name: name })
      .where("id = :id", { id: listId })
      .execute();
  }

  static async updateDescription(
    description: string,
    listId: number
  ): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .update(List)
      .set({ description: description })
      .where("id =:id", { id: listId })
      .execute();
  }

  static async remove(listId: number): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .delete()
      .from(List)
      .where("id =:id", { id: listId })
      .execute();
  }

  static async removeTask(taskId: number, listId: number): Promise<List> {
    const list = await List.findOne(listId);
    list.containedTasks = list.containedTasks.filter(
      task => task.id !== taskId
    );
    return await list.save();
  }
}
