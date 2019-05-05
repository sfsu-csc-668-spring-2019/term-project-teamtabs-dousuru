import { List, Project, Task, Tag } from "../entity";
import { Timestamp, getConnection } from "typeorm";

export class TaskManager {
  static async createTask(
    name: string,
    description: string,
    listID: number,
    dueDate: Date
  ): Promise<Task> {
    const baseList = await List.findOne(listID);
    const startTime = Date.now();
    const task = await Task.create({
      name,
      description,
      baseList,
      startTime,
      dueDate
    });
    return task.save();
  }

  static async updateDescriptionTask(
    description: string,
    taskId: number
  ): Promise<any> {
    const updated = await getConnection()
      .createQueryBuilder()
      .update(Task)
      .set({ description: description })
      .where("id = :id", { id: taskId })
      .execute();

    return updated;
  }

  static async updateDueDate(dueDate: Date, taskId: number): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .update(Task)
      .set({ dueDate: dueDate })
      .where("id = :id", { id: taskId })
      .execute();
  }

  static async updateName(name: string, taskId: number): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .update(Task)
      .set({ name: name })
      .where("id = :id", { id: taskId })
      .execute();
  }

  static async remove(taskId: number): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where("id = :id", { id: taskId })
      .execute();
  }

  static async addTag(tagId: number, taskId: number): Promise<Task> {
    let tag = await Tag.findOne(tagId);
    let task = await Task.findOne(taskId);
    task.containedTags.push(tag);
    return await task.save();
  }

  static async removeTag(tagId: number, taskId: number): Promise<Task> {
    let task = await Task.findOne(taskId);
    task.containedTags = task.containedTags.filter(
      containTag => containTag.id !== tagId
    );
    return await task.save();
  }

  static async getTags(taskId: number): Promise<Tag[]> {
    let task = await Task.findOne(taskId);
    return task.containedTags;
  }
}
