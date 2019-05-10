import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { OrganizationManager, ProjectManager } from "../../controllers";
import { Project } from "../../entity";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";

export class PutProject implements IService {
  public getRoute(): string {
    return "PUT /";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        body: { name, description, isPublic, updatedId, newOwnerId },
        params: { organizationId }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) =>
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
            .catch(_ => response.sendStatus(500))
      );
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
      OrganizationManager.userBelongsToOrganization(
        request.user.id,
        organizationId
      ).then(userIsMember => {
        if (userIsMember) {
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
