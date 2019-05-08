import { User, Project } from "../entity";
import { getConnection } from "typeorm";
import { Organization } from "../entity";

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

  //update password for user
  static async updatePassword(id: number, password: string): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ password })
      .where("id = :id", { id })
      .execute();
  }

  static async getContacts(id: number): Promise<JSON[]> {
    let contacts = (await User.findOne(id, { relations: ["contacts"] }))
      .contacts;
    if (undefined === contacts) {
      return [];
    }
    return Promise.all(
      contacts.map(contact =>
        UserManager.getUserInformation(contact.displayName)
      )
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

  //static async signIn( userName: string, password: string)
  //get all accounts in project

  //find account by email
}
