import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { OrganizationManager, ProjectManager } from "../../controllers";
import { Project } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class PutProject extends AuthenticatedService {
  public getRoute(): string {
    return "PUT /";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { name, description, isPublic, updatedId, newOwnerId },
        params: { organizationId }
      } = request;
      this.validate(
        name,
        description,
        isPublic,
        organizationId,
        updatedId,
        newOwnerId,
        request
      )
        .then(response.json)
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    name: string,
    description: string,
    isPublic: boolean,
    organizationId: number,
    updatedId: number,
    newOwnerId: number,
    request: AuthRequest
  ): Promise<Project> {
    if (request.user) {
      OrganizationManager.userIsAuthorized(
        request.user.id,
        organizationId
      ).then(userIsAuthorized => {
        if (userIsAuthorized) {
          if (undefined !== updatedId) {
            return Promise.resolve(
              ProjectManager.updateProject(
                request.user.id,
                updatedId,
                name,
                description,
                isPublic,
                newOwnerId
              )
            );
          } else {
            return Promise.resolve(
              ProjectManager.createProject(
                name,
                description,
                isPublic,
                organizationId,
                request.user.id
              )
            );
          }
        }
        return Promise.reject();
      });
    } else {
      return Promise.reject();
    }
  }
}
