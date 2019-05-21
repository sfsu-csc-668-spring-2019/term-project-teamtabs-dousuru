import { Organization, User, Project, Message, Role } from "../entity";
import { SecretsService } from "../middleware/SecretsService";
import { UserQueries } from "./UserQueries";
import { ProjectQueries } from "./ProjectQueries";
import { RoleQueries } from "./RoleQueries";
import { PermissionQueries } from "./PermissionQueries";

export class OrganizationQueries {
  public static async createOrganization(
    name: string,
    description: string,
    icon: string,
    ownerId: number
  ): Promise<Organization> {
    let owner = await User.findOne(ownerId);
    let organization = await Organization.create({
      name,
      description,
      icon,
      owner
    }).save();
    organization.roles = await RoleQueries.createDefaultOrganizationRoles(
      organization.id,
      ownerId
    );
    organization.containedProjects = [];
    return OrganizationQueries.addOrganizationUser(organization.id, ownerId);
  }

  public static async updateOrganization(
    currentUserId: number,
    organizationId: number,
    name: string,
    description: string,
    icon: string
  ): Promise<Organization> {
    let organization = await Organization.findOne(organizationId, {
      relations: ["owner"]
    });
    if (organization.owner.id !== currentUserId) {
      throw new Error(
        "Error: organization update is only accessable for organization owner"
      );
    }
    if (name) {
      organization.name = name;
    }
    if (description) {
      organization.description = description;
    }
    if (icon) {
      organization.icon = icon;
    }
    organization = await organization.save();
    return organization;
  }

  public static async deleteOrganization(
    ownerId: number,
    organizationId: number
  ): Promise<void> {
    let organization = await Organization.findOne(organizationId, {
      relations: ["owner"]
    });
    if (organization.owner.id === ownerId) {
      await Organization.delete(organizationId);
    }
  }

  public static async getOrganization(
    organizationId: number
  ): Promise<Organization> {
    let organization = await Organization.findOne(organizationId, {
      select: ["id", "name", "description", "icon", "owner"],
      relations: ["owner"]
    });
    return organization;
  }

  public static async getContentsByName(
    userId: number,
    organizationId: number,
    name: string
  ): Promise<JSON> {
    let result: any = {};
    let projects: Project[];
    (await UserQueries.getOrganizationProjects(userId, organizationId)).map(
      _projects => projects.concat(_projects)
    );
    result.projects = UserQueries.filterCaseInsensitive(projects, "name", name);
    let tasksArray = await Promise.all(
      projects.map(project =>
        ProjectQueries.getContentsByName(project.id, name)
      )
    );
    result.tasks = [];
    tasksArray.map((e: any) => result.tasks.concat(e.tasks));
    return result;
  }

  public static async addOrganizationUser(
    organizationId: number,
    userId: number
  ): Promise<Organization> {
    let user = await User.findOne(userId);
    let organization = await Organization.findOne(organizationId, {
      relations: ["users", "roles"]
    });
    if (!organization.users.includes(user)) {
      organization.users.push(user);
      let memberRole = organization.roles.find(role => role.name == "Member");
      RoleQueries.addUser(memberRole.id, userId);
    }
    return await organization.save();
  }

  public static async removeOrganizationUser(
    organizationId: number,
    userId: number
  ): Promise<Organization> {
    let organization = await Organization.findOne(organizationId, {
      relations: ["users", "roles"]
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
    userId: number,
    organizationId: number
  ): Promise<Project[]> {
    try {
      console.log("getting projects");
      let organization = await Organization.findOne(organizationId, {
        relations: ["containedProjects"]
      });
      console.log("organization", organization);
      organization.containedProjects = organization.containedProjects.filter(
        project => PermissionQueries.checkProjectManage(userId, project.id)
      );
      console.log(organization.containedProjects);
      return organization.containedProjects;
    } catch (err) {
      console.error(err);
    }
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
    const organization = await Organization.findOne(organizationId);
    return SecretsService.generateInvite(organization);
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

  public static async userIsAuthorized(
    userId: number,
    organizationId: number
  ): Promise<boolean> {
    let organization = await Organization.findOne(organizationId, {
      relations: ["users"]
    });
    return !!organization.users.filter(
      organizationUser => organizationUser.id === userId
    ).length;
  }
}
