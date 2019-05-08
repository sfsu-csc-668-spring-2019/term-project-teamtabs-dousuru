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
      displayName,
      userName,
      icon
    });
    return await user.save();
  }

  //update displayname, username, icon
  static async updateAccount(
    displayName: string,
    userName: string,
    icon: string,
    id: number
  ): Promise<JSON> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ displayName, userName, icon })
      .where("id = :id", { id })
      .execute();
    return await this.getUserInformation(displayName);
  }

  //gets display name and icon
  static async getUserInformation(displayName: string): Promise<JSON> {
    return await getConnection()
      .createQueryBuilder()
      .select("user.displayName", "user.icon")
      .from(User, "user")
      .where("user.displayName = :displayName", { displayName })
      .getRawOne();
  }

  static async getUserInformationById(id: number): Promise<User> {
    return await User.findOne(id, { select: ["id", "displayName", "icon"] });
  }

  //update password for user
  static async updatePassword(id: number, password: string): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ password })
      .where("id = :id", { id })
      .execute();
  }

  static async getContacts(id: number): Promise<User[]> {
    let contacts = (await User.findOne(id, { relations: ["contacts"] }))
      .contacts;
    if (undefined === contacts) {
      return [];
    }
    return Promise.all(
      contacts.map(contact => UserManager.getUserInformationById(contact.id))
    );
  }

  //get all organizations user is in
  static async getOrganizations(id: number): Promise<Organization[]> {
    const user = await User.findOne(id, { relations: ["organizations"] });
    console.log(user);
    const organizations = user.organizations;
    console.log(organizations);
    return organizations;
  }

  static async getOrganizationProjects(
    userID: number,
    organizationID: number
  ): Promise<Project[]> {
    const user = await User.findOne(userID);
    const organization = await Organization.findOne(organizationID);
    return organization.containedProjects.filter(project => {
      if (project.isPublic) {
        return true;
      }

      user.roles.forEach(role => {
        if (project.roles.includes(role)) {
          return true;
        }
      });
      return false;
    });
  }

  public static async GetUsers(displayName: string): Promise<User[]> {
    return await User.find({
      select: ["id", "displayName", "icon"],
      where: { displayName: Like(`%${displayName}%`) }
    });
  }

  public static async GetContentsByName(
    userId: number,
    name: string
  ): Promise<JSON> {
    let result: any = {};
    let organizations = (await User.findOne(userId, {
      relations: ["organizations"]
    })).organizations;
    result.organizations = UserManager.FilterCaseInsensitive(
      organizations,
      "name",
      name
    );
    let projects: Project[];
    (await Promise.all(
      organizations.map(organization =>
        UserManager.getOrganizationProjects(userId, organization.id)
      )
    )).map(_projects => projects.concat(_projects));
    result.projects = UserManager.FilterCaseInsensitive(projects, "name", name);
    let tasks: Task[];
    (await Promise.all(
      projects.map(project => ProjectManager.getTasks(project.id))
    )).map(_tasks => tasks.concat(_tasks));
    result.tasks = UserManager.FilterCaseInsensitive(tasks, "name", name);
    return result;
  }

  private static FilterCaseInsensitive(
    ary: any[],
    attribute: string,
    filter: string
  ): any[] {
    return ary.filter(e =>
      e[attribute].toLowerCase().includes(filter.toLowerCase())
    );
  }

  //static async signIn( userName: string, password: string)
  //get all accounts in project

  //find account by email
}
