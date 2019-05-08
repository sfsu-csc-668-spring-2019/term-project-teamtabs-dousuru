import { List, Project, Task } from "../entity";
import { getConnection } from "typeorm";

export class ListManager {
  static async createList(
    name: string,
    description: string,
    projectId: number
  ): Promise<List> {
    const baseProject = await Project.findOne(projectId);
    const list = await List.create({
      name,
      description,
      baseProject
    });
    return list.save();
  }

  static async getTasks(listId: number): Promise<Task[]> {
    const list = await List.findOne(listId, { relations: ["containedTasks"] });
    return list.containedTasks;
  }

  static async updateName(name: string, listId: number): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .update(List)
      .set({ name: name })
      .where("id = :listId", { listId })
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
      .where("id =:listId", { listId })
      .execute();
  }

  static async removeTask(taskId: number, listId: number): Promise<List> {
    const list = await List.findOne(listId, { relations: ["containedTasks"] });
    list.containedTasks = list.containedTasks.filter(
      task => task.id !== taskId
    );
    return await list.save();
  }
}
