import { Organization, User, Project, Message } from "../entity";
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
    return await organization.save();
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

  public static async getOrganizationUsers(
    organizationId: number
  ): Promise<User[]> {
    let organization = await Organization.findOne(organizationId);
    return organization.users;
  }

  public static async getOrganizationProjects(
    organizationId: number
  ): Promise<Project[]> {
    let organization = await Organization.findOne(organizationId);
    return organization.containedProjects;
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
  public static async getMessage(organizationId: number): Promise<Message[]> {
    return (await Organization.findOne(organizationId)).organizationMessages;
  }
  public static async postMessage(
    organizationId: number,
    messageId: number
  ): Promise<void> {
    let message = await Message.findOne(messageId);
    let organization = await Organization.findOne(organizationId);
    organization.organizationMessages.push(message);
    await organization.save();
  }
}
