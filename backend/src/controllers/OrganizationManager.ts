import { Organization, User } from "../entity";

export class OrganizationManager {
  static async createOrganization(name: string, description: string, icon: string, owner: User): Promise<Organization> {
    const organization = await Organization.create({
      name,
      description,
      icon,
      owner
    });
    return organization.save();
  }
}