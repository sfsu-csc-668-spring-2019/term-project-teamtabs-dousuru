import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";

export class DeleteOrganization implements IService {
  public getRoute(): string {
    return "DELETE /id/:organizationId";
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

  public validate(organizationId: number, request: AuthRequest): Promise<void> {
    if (request.user) {
      return Promise.resolve(
        OrganizationManager.deleteOrganization(request.user.id, organizationId)
      );
    } else {
      return Promise.reject();
    }
  }
}
