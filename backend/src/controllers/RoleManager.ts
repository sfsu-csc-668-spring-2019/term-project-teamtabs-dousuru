import { Role, Organization, Project, User } from "../entity";
import { UserManager } from "./UserManager";

export class RoleManager {
  public static async createProjectRole(
    name: string,
    canInvite: boolean,
    canManage: boolean,
    canPost: boolean,
    organizationId: number,
    projectId: number
  ): Promise<Role> {
    let organization = await Organization.findOne(organizationId);
    let project = await Project.findOne(projectId);
    return await (await Role.create({
      name,
      canInvite,
      canManage,
      canPost,
      organization,
      project
    })).save();
  }
  public static async createOrganizationRole(
    name: string,
    canInvite: boolean,
    canManage: boolean,
    canPost: boolean,
    organizationId: number
  ): Promise<Role> {
    let organization = await Organization.findOne(organizationId);
    return await (await Role.create({
      name,
      canInvite,
      canManage,
      canPost,
      organization
    })).save();
  }
  public static async deleteRole(roleId: number): Promise<void> {
    await Role.delete(roleId);
  }
  public static async getRole(roleId: number): Promise<Role> {
    return await Role.findOne(roleId);
  }

  public static async addUser(roleId: number, userId: number): Promise<Role> {
    let user = await User.findOne(userId);
    let role = await Role.findOne(roleId);
    role.users.push(user);
    return await role.save();
  }
  public static async removeUser(
    roleId: number,
    userId: number
  ): Promise<void> {
    let user = await User.findOne(userId);
    let role = await Role.findOne(roleId);
    role.users = role.users.filter(roleUser => roleUser !== user);
    await role.save();
  }
  public static async getUsers(roleId: number): Promise<JSON[]> {
    let users = (await Role.findOne(roleId)).users;
    return await Promise.all(
      users.map(user => UserManager.getUserInformation(user.displayName))
    );
  }
}
