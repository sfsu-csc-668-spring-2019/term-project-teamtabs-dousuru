import { User, Project, List } from "../entity";
import { getConnection, Like } from "typeorm";
import { Organization } from "../entity";
import { OrganizationQueries } from "./OrganizationQueries";
import { PermissionQueries } from "./PermissionQueries";

export class UserQueries {
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
      contacts.map(contact => UserQueries.getUserInformationById(contact.id))
    );
  }

  //get all organizations user is in
  static async getOrganizations(userId: number): Promise<Organization[]> {
    const user = await User.findOne(userId, { relations: ["organizations"] });
    return user.organizations;
  }

  public static async getOrganizationProjects(
    userId: number,
    organizationId: number
  ): Promise<Project[]> {
    try {
      console.log("getting projects");
      let organization = await Organization.findOne(organizationId, {
        relations: ["containedProjects"]
      });
      console.log("organization", organization);
      organization.containedProjects = organization.containedProjects.filter(
        project => PermissionQueries.checkProjectManage(userId, project.id)
      );
      console.log(organization.containedProjects);
      return organization.containedProjects;
    } catch (err) {
      console.error(err);
    }
  }

  static async getProjectLists(projectID: number): Promise<List[]> {
    let project = await Project.findOne(projectID, {
      relations: ["containedLists", "containedLists.containedTasks"]
    });
    return project.containedLists;
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
    result.organizations = UserQueries.filterCaseInsensitive(
      organizations,
      "name",
      name
    );
    let projectsAndTasks = await Promise.all(
      organizations.map(organization =>
        OrganizationQueries.getContentsByName(userId, organization.id, name)
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
