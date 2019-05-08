import { Organization, User, Project, Message, Role } from "../entity";
import { SecretsService } from "./SecretsService";

export class OrganizationManager {
  public static async createOrganization(
    name: string,
    description: string,
    icon: string,
    ownerId: number
  ): Promise<Organization> {
    let owner = await User.findOne(ownerId);
    let inviteLink = SecretsService.createToken(await Organization.count());
    let organization = await Organization.create({
      name,
      description,
      inviteLink,
      icon,
      owner
    });
    await organization.save();
    return OrganizationManager.addOrganizationUser(organization.id, ownerId);
  }

  public static async updateOrganization(
    organizationId: number,
    name: string,
    description: string,
    icon: string
  ): Promise<Organization> {
    let organization = await Organization.findOne(organizationId);
    organization.name = name;
    organization.description = description;
    organization.icon = icon;
    return await organization.save();
  }

  public static async deleteOrganization(
    organizationId: number
  ): Promise<void> {
    await Organization.delete(organizationId);
  }

  public static async getOrganization(
    organizationId: number
  ): Promise<Organization> {
    return await Organization.findOne(organizationId);
  }

  public static async addOrganizationUser(
    organizationId: number,
    userId: number
  ): Promise<Organization> {
    let user = await User.findOne(userId);
    let organization = await Organization.findOne(organizationId, {
      relations: ["users"]
    });
    if (!organization.users.includes(user)) {
      organization.users.push(user);
    }
    return await organization.save();
  }

  public static async removeOrganizationUser(
    organizationId: number,
    userId: number
  ): Promise<Organization> {
    let organization = await Organization.findOne(organizationId, {
      relations: ["users"]
    });
    organization.users = organization.users.filter(user => user.id !== userId);
    return await organization.save();
  }

  public static async getOrganizationUsers(
    organizationId: number
  ): Promise<User[]> {
    let organization = await Organization.findOne(organizationId, {
      relations: ["users"]
    });
    return organization.users;
  }

  public static async addOrganizationProject(
    organizationId: number,
    projectId: number
  ): Promise<Organization> {
    let project = await Project.findOne(projectId);
    let organization = await Organization.findOne(organizationId, {
      relations: ["containedProjects"]
    });
    organization.containedProjects = organization.containedProjects || [];
    organization.containedProjects.push(project);
    return await organization.save();
  }

  public static async removeOrganizationProject(
    organizationId: number,
    projectId: number
  ): Promise<Organization> {
    let organization = await Organization.findOne(organizationId, {
      relations: ["containedProjects"]
    });
    organization.containedProjects = organization.containedProjects.filter(
      containedProject => containedProject.id !== projectId
    );
    return await organization.save();
  }

  public static async getOrganizationProjects(
    organizationId: number
  ): Promise<Project[]> {
    let organization = await Organization.findOne(organizationId, {
      relations: ["containedProjects"]
    });
    return organization.containedProjects;
  }

  public static async addOrganizationRole(
    organizationId: number,
    roleId: number
  ): Promise<Organization> {
    let role = await Role.findOne(roleId);
    let organization = await Organization.findOne(organizationId, {
      relations: ["roles"]
    });
    if (!organization.roles.includes(role)) {
      organization.roles.push(role);
    }
    return await organization.save();
  }

  public static async removeOrganizationRole(
    organizationId: number,
    roleId: number
  ): Promise<Organization> {
    let organization = await Organization.findOne(organizationId, {
      relations: ["roles"]
    });
    organization.roles = organization.roles.filter(role => role.id !== roleId);
    return await organization.save();
  }

  public static async getOrganizationRoles(
    organizationId: number
  ): Promise<Role[]> {
    let organization = await Organization.findOne(organizationId, {
      relations: ["roles"]
    });
    return organization.roles;
  }

  public static async changeOwner(
    organizationId: number,
    ownerId: number
  ): Promise<Organization> {
    let owner = await User.findOne(ownerId);
    let organization = await Organization.findOne(organizationId);
    organization.owner = owner;
    return await organization.save();
  }

  public static async getInviteLink(organizationId: number): Promise<string> {
    return (await Organization.findOne(organizationId)).inviteLink;
  }

  public static async getMessages(organizationId: number): Promise<Message[]> {
    return (await Organization.findOne(organizationId, {
      relations: ["organizationMessages"]
    })).organizationMessages;
  }

  public static async postMessage(
    organizationId: number,
    messageId: number
  ): Promise<void> {
    let message = await Message.findOne(messageId);
    let organization = await Organization.findOne(organizationId, {
      relations: ["organizationMessages"]
    });
    organization.organizationMessages.push(message);
    await organization.save();
  }
}
