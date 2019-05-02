import { Organization, User } from "../entity";

export class OrganizationManager {
  static async createOrganization(name: string, description: string, icon: string, ownerID: number): Promise<Organization> {
    const owner = await User.findOne(ownerID);
    const organization = await Organization.create({
      name,
      description,
      icon,
      owner
    });
    return organization.save();
  }

  //get users for organization
  
}