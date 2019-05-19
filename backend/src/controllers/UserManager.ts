import { User, Project, Task, List } from "../entity";
import { getConnection, Like } from "typeorm";
import { Organization } from "../entity";
import { OrganizationManager } from "./OrganizationManager";
import { ProjectManager } from "./ProjectManager";

export class UserManager {
  static async createAccount(
    email: string,
    password: string,
    username: string,
    icon: string
  ): Promise<User> {
    const user = await User.create({
      email,
      password,
      username,
      icon
    });
    return await user.save();
  }

  //update displayname, username, icon
  static async updateAccount(
    username: string,
    icon: string,
    id: number
  ): Promise<JSON> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ username, icon })
      .where("id = :id", { id })
      .execute();
    return await this.getUserInformation(username);
  }

  //gets display name and icon
  static async getUserInformation(username: string): Promise<JSON> {
    return await getConnection()
      .createQueryBuilder()
      .select("user.username", "user.icon")
      .from(User, "user")
      .where("user.username = :username", { username })
      .getRawOne();
  }

  static async getUserInformationById(userId: number): Promise<User> {
    return await User.findOne(userId, { select: ["id", "username", "icon"] });
  }

  static async getUserInformationByLogin(identifier: string): Promise<User> {
    return await User.findOne({
      where: [{ username: identifier }, { email: identifier }]
    });
  }

  //update password for user
  static async updatePassword(userId: number, password: string): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ password })
      .where("id = :id", { userId })
      .execute();
  }

  static async getContacts(userId: number): Promise<User[]> {
    let contacts = (await User.findOne(userId, { relations: ["contacts"] }))
      .contacts;
    if (undefined === contacts) {
      return [];
    }
    return Promise.all(
      contacts.map(contact => UserManager.getUserInformationById(contact.id))
    );
  }

  //get all organizations user is in
  static async getOrganizations(userId: number): Promise<Organization[]> {
    const user = await User.findOne(userId, { relations: ["organizations"] });
    console.log(user);
    const organizations = user.organizations;
    console.log(organizations);
    return organizations;
  }

  static async getOrganizationProjects(
    userID: number,
    organizationID: number
  ): Promise<Project[]> {
    const user = await User.findOne(userID, { relations: ["roles"] });
    const organization = await Organization.findOne(organizationID, {
      relations: ["containedProjects", "containedProjects.roles"]
    });
    return organization.containedProjects.filter(project =>
      UserManager.userHasAccessToProject(user, project)
    );
  }

  //checks if user has post permission for organization
  public static async checkOrganizationPost(
    userId: number,
    organizationId: number
  ): Promise<boolean> {
    const user = await User.findOne(userId, { relations: ["roles"] });
    const organization = await Organization.findOne(organizationId, {
      relations: ["roles"]
    });
    user.roles.forEach(role => {
      if (organization.roles.includes(role) && role.canPost) {
        return true;
      }
    });
    return false;
  }

  //checks if user has management permission for organization
  public static async checkOrganizationManage(
    userId: number,
    organizationId: number
  ): Promise<boolean> {
    const user = await User.findOne(userId, { relations: ["roles"] });
    const organization = await Organization.findOne(organizationId, {
      relations: ["roles"]
    });
    user.roles.forEach(role => {
      if (organization.roles.includes(role) && role.canManage) {
        return true;
      }
    });
    return false;
  }

  //checks if user has management permission for project
  public static async checkProjectManage(
    userId: number,
    projectId: number
  ): Promise<boolean> {
    const user = await User.findOne(userId, { relations: ["roles"] });
    const project = await Project.findOne(projectId, {
      relations: ["roles", "baseOrganization"]
    });
    if (project.isPublic) {
      return this.checkOrganizationManage(userId, project.baseOrganization.id);
    }
    user.roles.forEach(role => {
      if (project.roles.includes(role)) {
        if (role.canManage) {
          return true;
        }
      }
      return false;
    });
  }

  //checks if user can manage list
  public static async checkListManage(
    userId: number,
    listId: number
  ): Promise<boolean> {
    const list = await List.findOne(listId, { relations: ["baseProject"] });
    const projectId = list.baseProject.id;
    return this.checkProjectManage(userId, projectId);
  }

  //checks if user can manage task
  public static async checkTaskManage(
    userId: number,
    taskId: number
  ): Promise<boolean> {
    const task = await Task.findOne(taskId, { relations: ["baseList"] });
    const listId = task.baseList.id;
    return this.checkListManage(userId, listId);
  }

  //checks if user has permission to view task
  public static async checkTaskPermission(
    userId: number,
    taskId: number
  ): Promise<boolean> {
    const task = await Task.findOne(taskId, { relations: ["baseList"] });
    return this.checkListPermission(userId, taskId);
  }

  //check if user has permission to view list, possibly not needed
  public static async checkListPermission(
    userId: number,
    listId: number
  ): Promise<boolean> {
    const list = await List.findOne(listId, { relations: ["baseProject"] });
    const project = list.baseProject;
    return this.checkProjectPermission(userId, project.id);
  }

  public static async checkProjectPermission(
    userId: number,
    projectId: number
  ): Promise<boolean> {
    let user = await User.findOne(userId, { relations: ["users"] });
    let project = await Project.findOne(projectId, { relations: ["users"] });
    return this.userHasAccessToProject(user, project);
  }

  public static async checkOrganizationPermission(
    userId: number,
    organizationId: number
  ): Promise<boolean> {
    try {
      let user = await User.findOne(userId);
      let organization = await Organization.findOne(organizationId, {
        relations: ["users"]
      });
      if (organization.users.find(u => u.id === user.id)) {
        return true;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public static async checkOrganizationInvite(
    userId: number,
    organizationId: number
  ): Promise<boolean> {
    const user = await User.findOne(userId, { relations: ["roles"] });
    const organization = await Organization.findOne(organizationId, {
      relations: ["roles"]
    });
    user.roles.forEach(role => {
      if (organization.roles.includes(role) && role.canInvite) {
        return true;
      }
    });
    return false;
  }

  public static async checkProjectInvite(
    userId: number,
    projectId: number
  ): Promise<boolean> {
    const user = await User.findOne(userId, { relations: ["roles"] });
    const project = await Project.findOne(projectId, {
      relations: ["roles"]
    });
    user.roles.forEach(role => {
      if (project.roles.includes(role) && role.canInvite) {
        return true;
      }
    });
    return false;
  }

  private static userHasAccessToProject(user: User, project: Project): boolean {
    if (project.isPublic) {
      return true;
    }
    if (project.users.includes(user)) return true;
  }

  public static async getUsers(username: string): Promise<User[]> {
    return await User.find({
      select: ["id", "username", "icon"],
      where: { displayName: Like(`%${username}%`) }
    });
  }

  public static async getContentsByName(
    userId: number,
    name: string
  ): Promise<JSON> {
    let result: any = {};
    let organizations = (await User.findOne(userId, {
      relations: ["organizations"]
    })).organizations;
    result.organizations = UserManager.filterCaseInsensitive(
      organizations,
      "name",
      name
    );
    let projectsAndTasks = await Promise.all(
      organizations.map(organization =>
        OrganizationManager.getContentsByName(userId, organization.id, name)
      )
    );
    result.projects = [];
    result.tasks = [];
    projectsAndTasks.map((e: any) => {
      result.projects.concat(e.projects);
      result.tasks.concat(e.tasks);
      return true;
    });
    return result;
  }

  public static filterCaseInsensitive(
    ary: any[],
    attribute: string,
    filter: string
  ): any[] {
    return ary.filter(e =>
      e[attribute].toLowerCase().includes(filter.toLowerCase())
    );
  }
}
