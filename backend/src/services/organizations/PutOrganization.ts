import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import { Organization } from "../../entity";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";

export class PutOrganization implements IService {
  public getRoute(): string {
    return "PUT /";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        body: { name, description, icon, updatedId, newOwnerId }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) =>
          this.validate(name, description, icon, updatedId, newOwnerId, request)
            .then(response.json)
            .catch(_ => response.sendStatus(500))
      );
    };
  }

  public validate(
    name: string,
    description: string,
    icon: string,
    updatedId: number,
    newOwnerId: number,
    request: AuthRequest
  ): Promise<Organization> {
    if (request.user) {
      if (undefined !== updatedId) {
        return Promise.resolve(
          OrganizationManager.updateOrganization(
            request.user.id,
            updatedId,
            name,
            description,
            icon,
            newOwnerId
          )
        );
      } else {
        return Promise.resolve(
          OrganizationManager.createOrganization(
            name,
            description,
            icon,
            request.user.id
          )
        );
      }
    } else {
      return Promise.reject();
    }
  }
}
