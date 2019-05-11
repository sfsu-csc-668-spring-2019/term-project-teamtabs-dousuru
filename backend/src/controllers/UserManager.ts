import { User, Project, Task } from "../entity";
import { getConnection, Like } from "typeorm";
import { Organization } from "../entity";
import { OrganizationManager } from "./OrganizationManager";
import { ProjectManager } from "./ProjectManager";

export class UserManager {
  static async createAccount(
    email: string,
    password: string,
    displayName: string,
    userName: string,
    icon: string
  ): Promise<User> {
    const user = await User.create({
      email,
      password,
      userName,
      icon
    });
    return await user.save();
  }

  //update displayname, username, icon
  static async updateAccount(
    userName: string,
    icon: string,
    id: number
  ): Promise<JSON> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ userName, icon })
      .where("id = :id", { id })
      .execute();
    return await this.getUserInformation(userName);
  }

  //gets display name and icon
  static async getUserInformation(userName: string): Promise<JSON> {
    return await getConnection()
      .createQueryBuilder()
      .select("user.userName", "user.icon")
      .from(User, "user")
      .where("user.userName = :userName", { userName })
      .getRawOne();
  }

  static async getUserInformationById(userId: number): Promise<User> {
    return await User.findOne(userId, { select: ["id", "userName", "icon"] });
  }

  static async getUserInformationSignIn(identifier: string): Promise<User> {
    return await User.findOne({
      where: [{ userName: identifier }, { password: identifier }]
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

  public static async getUserHasAccessToProject(
    userId: number,
    projectId: number
  ): Promise<boolean> {
    let user = await User.findOne(userId, { relations: ["roles"] });
    let project = await Project.findOne(projectId, { relations: ["roles"] });
    return UserManager.userHasAccessToProject(user, project);
  }

  private static userHasAccessToProject(user: User, project: Project): boolean {
    if (project.isPublic) {
      return true;
    }
    user.roles.forEach(role => {
      if (project.roles.includes(role)) {
        return true;
      }
    });
    return false;
  }

  public static async getUsers(userName: string): Promise<User[]> {
    return await User.find({
      select: ["id", "userName", "icon"],
      where: { displayName: Like(`%${userName}%`) }
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
