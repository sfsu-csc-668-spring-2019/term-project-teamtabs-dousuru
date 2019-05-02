import { Organization, User, Project } from "../entity";

export class ProjectManager {
  static async createProject(name: string, description: string, isPublic: boolean, ownerID: number, organizationID: number): Promise<Project> {
    const owner = await User.findOne(ownerID);
    const baseOrganization = await Organization.findOne(organizationID)
    const project = await Project.create({
      name,
      description,
      isPublic,
      owner,
      baseOrganization
    });
    return project.save();
  }


  //get projects within an organization

}

