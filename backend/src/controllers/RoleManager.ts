import { Role, Organization, Project, User } from "../entity";
import { UserManager } from "./UserManager";

export class RoleManager {
  //Roles that should be added by default on creation
  private static ownerConfiguration = {
    name: "Owner",
    canInvite: true,
    canManage: true,
    canPost: true
  };

  private static memberConfiguration = {
    name: "Member",
    canInvite: true,
    canManage: false,
    canPost: true
  };

  //should be called when a project or organization is made to instantiate default roles
  public static async createDefaultRoles(
    projectId: number,
    organizationId: number
  ): Promise<Role[]> {
    let addedRoles = [];
    addedRoles.push(
      await this.createProjectRole(
        RoleManager.memberConfiguration.name,
        RoleManager.memberConfiguration.canInvite,
        RoleManager.memberConfiguration.canManage,
        RoleManager.memberConfiguration.canPost,
        organizationId,
        projectId
      )
    );
    addedRoles.push(
      await this.createProjectRole(
        RoleManager.ownerConfiguration.name,
        RoleManager.ownerConfiguration.canInvite,
        RoleManager.ownerConfiguration.canManage,
        RoleManager.ownerConfiguration.canPost,
        organizationId,
        projectId
      )
    );
    return addedRoles;
  }

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

  public static async updateRole(
    roleId: number,
    name: string,
    canInvite: boolean,
    canManage: boolean,
    canPost: boolean
  ): Promise<Role> {
    let role = await Role.findOne(roleId);
    role.name = name;
    role.canInvite = canInvite;
    role.canManage = canManage;
    role.canPost = canPost;
    return await role.save();
  }

  public static async deleteRole(roleId: number): Promise<void> {
    await Role.delete(roleId);
  }

  public static async getRole(roleId: number): Promise<Role> {
    return await Role.findOne(roleId);
  }

  public static async addUser(roleId: number, userId: number): Promise<Role> {
    let user = await User.findOne(userId);
    let role = await Role.findOne(roleId, { relations: ["users"] });
    if (!role.users.includes(user)) {
      role.users.push(user);
    }
    return await role.save();
  }

  public static async removeUser(
    roleId: number,
    userId: number
  ): Promise<void> {
    let role = await Role.findOne(roleId, { relations: ["users"] });
    role.users = role.users.filter(roleUser => roleUser.id !== userId);
    await role.save();
  }

  public static async getUsers(roleId: number): Promise<JSON[]> {
    let users = (await Role.findOne(roleId, { relations: ["users"] })).users;
    return await Promise.all(
      users.map(user => UserManager.getUserInformation(user.username))
    );
  }
}
