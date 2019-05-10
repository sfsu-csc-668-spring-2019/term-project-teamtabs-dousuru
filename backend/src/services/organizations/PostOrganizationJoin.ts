import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";
import { Organization } from "../../entity";

export class PostOrganizationJoin implements IService {
  public getRoute(): string {
    return "POST /id/:organizationId/join/:inviteLink";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        params: { organizationId, inviteLink }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) =>
          this.validate(organizationId, inviteLink, request)
            .then(response.json)
            .catch(_ => response.sendStatus(500))
      );
    };
  }

  public validate(
    organizationId: number,
    inviteLink: string,
    request: AuthRequest
  ): Promise<Organization> {
    if (request.user) {
      return Promise.resolve(
        OrganizationManager.addOrganizationUser(
          request.user.id,
          organizationId,
          inviteLink
        )
      );
    } else {
      return Promise.reject();
    }
  }
}
