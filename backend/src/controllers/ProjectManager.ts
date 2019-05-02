import { Organization, User, List, Project } from "../entity";

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

  //get lists within a project
  static async getProjectLists(projectID: number): Promise<List[]> {
    const project = await Project.findOne(projectID);
    return project.containedLists;
  }

  //get users within a project NEEDS ROLES if not public
  //if public return all users for organization
  
}

