import { Tag } from "../entity";

export class TagManager {
  public static async createTag(name: string, color: string): Promise<Tag> {
    let tag = await Tag.create({ name, color });
    return await tag.save();
  }

  public static async removeTag(tagId: number): Promise<void> {
    let tag = await Tag.findOne(tagId);
    await Tag.remove(tag);
  }

  public static async updateTag(
    tagId: number,
    name: string,
    color: string
  ): Promise<Tag> {
    const tag = await Tag.findOne(tagId);
    tag.name = name;
    tag.color = color;
    return await tag.save();
  }

  public static async getTag(tagId: number): Promise<Tag> {
    return await Tag.findOne(tagId);
  }
}
