import { Tag, Task, Project } from "../entity";
import { getConnection } from "typeorm";

export class TagManager {
  public static async createTag(
    name: string,
    color: string,
    projectId: number
  ): Promise<Tag> {
    let baseProject = await getConnection()
      .createQueryBuilder()
      .select("project")
      .from(Project, "project")
      .where("project.id = :projectId", { projectId })
      .getOne();
    let tag = await Tag.create({ name, color, baseProject });
    return await tag.save();
  }

  public static async removeTag(tagId: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Tag)
      .where("id = :tagId", { tagId })
      .execute();
  }

  public static async updateTag(
    tagId: number,
    name: string,
    color: string
  ): Promise<JSON> {
    await getConnection()
      .createQueryBuilder()
      .update(Tag)
      .set({ name, color })
      .where("id = :tagId", { tagId })
      .execute();
    return await this.getTag(tagId);
  }

  public static async getTasks(tagId: number): Promise<Task[]> {
    let tag = await Tag.findOne(tagId);
    return tag.tasks;
  }

  public static async getTag(tagId: number): Promise<JSON> {
    return await getConnection()
      .createQueryBuilder()
      .select(["tag.id", "tag.name", "tag.color", "tag.basedProject"])
      .from(Tag, "tag")
      .where("tag.id = :tagId", { tagId })
      .getRawOne();
  }
}
