import { User, Organization, Project, Task, List } from "../entity";

export class PermissionQueries {
  //checks if user has post permission for organization
  public static async checkOrganizationPost(
    userId: number,
    organizationId: number
  ): Promise<boolean> {
    const user = await User.findOne(userId, { relations: ["roles"] });
    const organization = await Organization.findOne(organizationId, {
      relations: ["roles"]
    });
    user.roles.forEach(role => {
      if (organization.roles.includes(role) && role.canPost) {
        return true;
      }
    });
    return false;
  }

  //checks if user has management permission for organization
  public static async checkOrganizationManage(
    userId: number,
    organizationId: number
  ): Promise<boolean> {
    const user = await User.findOne(userId, { relations: ["roles"] });
    const organization = await Organization.findOne(organizationId, {
      relations: ["roles"]
    });
    user.roles.forEach(role => {
      if (organization.roles.includes(role) && role.canManage) {
        return true;
      }
    });
    return false;
  }

  //checks if user has management permission for project
  public static async checkProjectManage(
    userId: number,
    projectId: number
  ): Promise<boolean> {
    const user = await User.findOne(userId, { relations: ["roles"] });
    const project = await Project.findOne(projectId, {
      relations: ["roles", "baseOrganization"]
    });
    if (project.isPublic) {
      return this.checkOrganizationManage(userId, project.baseOrganization.id);
    }
    user.roles.forEach(role => {
      if (project.roles.includes(role)) {
        if (role.canManage) {
          return true;
        }
      }
      return false;
    });
  }

  //checks if user can manage list
  public static async checkListManage(
    userId: number,
    listId: number
  ): Promise<boolean> {
    const list = await List.findOne(listId, { relations: ["baseProject"] });
    const projectId = list.baseProject.id;
    return this.checkProjectManage(userId, projectId);
  }

  //checks if user can manage task
  public static async checkTaskManage(
    userId: number,
    taskId: number
  ): Promise<boolean> {
    const task = await Task.findOne(taskId, { relations: ["baseList"] });
    const listId = task.baseList.id;
    return this.checkListManage(userId, listId);
  }

  //checks if user has permission to view task
  public static async checkTaskPermission(
    userId: number,
    taskId: number
  ): Promise<boolean> {
    const task = await Task.findOne(taskId, { relations: ["baseList"] });
    return this.checkListPermission(userId, taskId);
  }

  //check if user has permission to view list, possibly not needed
  public static async checkListPermission(
    userId: number,
    listId: number
  ): Promise<boolean> {
    const list = await List.findOne(listId, { relations: ["baseProject"] });
    const project = list.baseProject;
    return this.checkProjectPermission(userId, project.id);
  }

  public static async checkProjectPermission(
    userId: number,
    projectId: number
  ): Promise<boolean> {
    let user = await User.findOne(userId, { relations: ["users"] });
    let project = await Project.findOne(projectId, { relations: ["users"] });
    return this.userHasAccessToProject(user, project);
  }

  public static async checkOrganizationPermission(
    userId: number,
    organizationId: number
  ): Promise<boolean> {
    try {
      let user = await User.findOne(userId);
      let organization = await Organization.findOne(organizationId, {
        relations: ["users"]
      });
      if (organization.users.find(u => u.id === user.id)) {
        return true;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public static async checkOrganizationInvite(
    userId: number,
    organizationId: number
  ): Promise<boolean> {
    const user = await User.findOne(userId, { relations: ["roles"] });
    const organization = await Organization.findOne(organizationId, {
      relations: ["roles"]
    });
    user.roles.forEach(role => {
      if (organization.roles.includes(role) && role.canInvite) {
        return true;
      }
    });
    return false;
  }

  public static async checkProjectInvite(
    userId: number,
    projectId: number
  ): Promise<boolean> {
    const user = await User.findOne(userId, { relations: ["roles"] });
    const project = await Project.findOne(projectId, {
      relations: ["roles"]
    });
    user.roles.forEach(role => {
      if (project.roles.includes(role) && role.canInvite) {
        return true;
      }
    });
    return false;
  }

  private static userHasAccessToProject(user: User, project: Project): boolean {
    if (project.isPublic) {
      return true;
    }
    if (project.users.includes(user)) return true;
  }
}
