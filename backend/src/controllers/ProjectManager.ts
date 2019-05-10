import {
  Organization,
  User,
  List,
  Project,
  Message,
  Role,
  Tag,
  Task
} from "../entity";
import { ListManager } from "./ListManager";

export class ProjectManager {
  public static async createProject(
    name: string,
    description: string,
    isPublic: boolean,
    ownerId: number,
    organizationId: number
  ): Promise<Project> {
    let owner = await User.findOne(ownerId);
    let baseOrganization = await Organization.findOne(organizationId);
    let project = await Project.create({
      name,
      description,
      isPublic,
      owner,
      baseOrganization
    });
    return project.save();
  }

  public static async updateProject(
    ownerId: number,
    projectId: number,
    name: string,
    description: string,
    isPublic: boolean,
    newOwnerId: number
  ): Promise<Project> {
    let project = await Project.findOne(projectId, { relations: ["owner"] });
    if (project.owner.id !== ownerId) {
      throw new Error(
        "Error: project update is only accessable for organization owner"
      );
    }
    project.name = name;
    project.description = description;
    project.isPublic = isPublic;
    if (newOwnerId !== ownerId) {
      let newOwner = await User.findOne(newOwnerId);
      project.owner = newOwner;
    }
    return await project.save();
  }

  public static async deleteProject(
    ownerId: number,
    projectId: number
  ): Promise<void> {
    let project = await Project.findOne(projectId, { relations: ["owner"] });
    if (project.owner.id === ownerId) {
      await Project.delete(projectId);
    }
  }

  public static async changeOwner(
    projectId: number,
    ownerId: number
  ): Promise<Project> {
    let owner = await User.findOne(ownerId);
    let project = await Project.findOne(projectId);
    project.owner = owner;
    return await project.save();
  }

  public static async getProject(projectId: number): Promise<Project> {
    return await Project.findOne(projectId, {
      relations: [
        "owner",
        "users",
        "baseOrganization",
        "containedList",
        "roles",
        "tags"
      ]
    });
  }
  public static async postMessage(
    projectId: number,
    messageId: number
  ): Promise<Project> {
    let message = await Message.findOne(messageId);
    let project = await Project.findOne(projectId, {
      relations: ["projectMessages"]
    });
    project.projectMessages.push(message);
    return await project.save();
  }

  public static async getMessages(projectId: number): Promise<Message[]> {
    return (await Project.findOne(projectId, {
      relations: ["projectMessages"]
    })).projectMessages;
  }

  public static async addUser(
    projectId: number,
    userId: number
  ): Promise<Project> {
    let user = await User.findOne(userId);
    let project = await Project.findOne(projectId, { relations: ["users"] });
    if (!project.users.includes(user)) {
      project.users.push(user);
    }
    return await project.save();
  }

  public static async removeUser(
    projectId: number,
    userId: number
  ): Promise<Project> {
    let project = await Project.findOne(projectId, { relations: ["users"] });
    project.users = project.users.filter(user => user.id !== userId);
    return await project.save();
  }
  public static async getUsers(projectId: number): Promise<User[]> {
    return (await Project.findOne(projectId, { relations: ["users"] })).users;
  }

  public static async addRole(
    projectId: number,
    roleId: number
  ): Promise<Project> {
    let role = await Role.findOne(roleId);
    let project = await Project.findOne(projectId, { relations: ["roles"] });
    if (!project.roles.includes(role)) {
      project.roles.push(role);
    }
    return await project.save();
  }

  public static async removeRole(
    projectId: number,
    roleId: number
  ): Promise<Project> {
    let project = await Project.findOne(projectId, { relations: ["roles"] });
    project.roles = project.roles.filter(role => role.id !== roleId);
    return await project.save();
  }

  public static async getRoles(projectId: number): Promise<Role[]> {
    return (await Project.findOne(projectId, { relations: ["roles"] })).roles;
  }

  public static async addList(
    projectId: number,
    containedListId: number
  ): Promise<Project> {
    let containedList = await List.findOne(containedListId);
    let project = await Project.findOne(projectId, {
      relations: ["containedLists"]
    });
    if (!project.containedLists.includes(containedList)) {
      project.containedLists.push(containedList);
    }
    return await project.save();
  }

  public static async removeList(
    projectId: number,
    containedListId: number
  ): Promise<Project> {
    let project = await Project.findOne(projectId, {
      relations: ["containedLists"]
    });
    project.containedLists = project.containedLists.filter(
      containedList => containedList.id !== containedListId
    );
    return await project.save();
  }

  public static async getLists(projectId: number): Promise<List[]> {
    return (await Project.findOne(projectId, { relations: ["containedLists"] }))
      .containedLists;
  }

  public static async getTasks(projectId: number): Promise<Task[]> {
    let lists: List[] = (await Project.findOne(projectId, {
      relations: ["containedLists"]
    })).containedLists;
    let tasks: Task[];
    (await Promise.all(lists.map(list => ListManager.getTasks(list.id)))).map(
      _tasks => tasks.concat(_tasks)
    );
    return tasks;
  }

  public static async addTag(
    projectId: number,
    tagId: number
  ): Promise<Project> {
    let tag = await Tag.findOne(tagId);
    let project = await Project.findOne(projectId, { relations: ["tags"] });
    if (!project.tags.includes(tag)) {
      project.tags.push(tag);
    }
    return await project.save();
  }

  public static async removeTag(
    projectId: number,
    tagId: number
  ): Promise<Project> {
    let project = await Project.findOne(projectId, { relations: ["tags"] });
    project.tags = project.tags.filter(tag => tag.id !== tagId);
    return await project.save();
  }

  public static async getTags(projectId: number): Promise<Tag[]> {
    return (await Project.findOne(projectId, { relations: ["tags"] })).tags;
  }
}
