import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";
import { Organization } from "../../entity";

export class PostOrganizationLeave implements IService {
  public getRoute(): string {
    return "POST /id/:organizationId/leave";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        params: { organizationId }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) =>
          this.validate(organizationId, request)
            .then(_ => response.sendStatus(200))
            .catch(_ => response.sendStatus(500))
      );
    };
  }

  public validate(
    organizationId: number,
    request: AuthRequest
  ): Promise<Organization> {
    if (request.user) {
      return Promise.resolve(
        OrganizationManager.removeOrganizationUser(
          organizationId,
          request.user.id
        )
      );
    } else {
      return Promise.reject();
    }
  }
}
