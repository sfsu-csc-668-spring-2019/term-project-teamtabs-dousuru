import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import {
  ProjectQueries,
  OrganizationQueries,
  PermissionQueries
} from "../../queries";
import { User } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";
import { OrganizationHandler, ProjectHandler } from "../../socket/handlers";

export class PutProject extends AuthenticatedService {
  public getRoute(): string {
    return "PUT /:organizationId";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { name, description, isPublic },
        params: { organizationId },
        user
      } = request;
      this.validate(name, description, isPublic, organizationId, request)
        .then(() => this.checkPermission(request, organizationId))
        .then(() =>
          ProjectQueries.createProject(
            name,
            description,
            isPublic,
            request.user.id,
            organizationId
          )
        )
        .then(results =>
          /*
          OrganizationQueries.getOrganizationProjects(
            user.id,
            organizationId
          ).then(data => {
            OrganizationHandler.getInstance().updateProjects(
              organizationId,
              data
            );
            ProjectHandler.getInstance().update(results.id.toString(), results);
            */
          response.json(results)
        )
        .catch(err => {
          console.error(err);
          response.sendStatus(500);
        });
    };
  }

  public validate(
    name: string,
    description: string,
    isPublic: boolean,
    organizationId: number,
    request: AuthRequest
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      if (request.user && name && description && isPublic && organizationId) {
        resolve(request.user);
      } else {
        reject();
      }
    });
  }

  public checkPermission(
    request: AuthRequest,
    organizationId: number
  ): Promise<any> {
    console.log("check permission");
    return PermissionQueries.checkOrganizationPost(
      request.user.id,
      organizationId
    );
  }

  public createProject(
    name: string,
    description: string,
    isPublic: boolean,
    ownerId: number,
    organizationId: number
  ) {
    return;
  }
}
