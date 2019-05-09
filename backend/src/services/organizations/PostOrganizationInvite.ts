import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";

export class PostOrganizationInvite implements IService {
  public getRoute(): string {
    return "POST /id/:organizationId/invite";
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
            .then(inviteLink => response.json({ inviteLink }))
            .catch(_ => response.sendStatus(500))
      );
    };
  }

  public validate(
    organizationId: number,
    request: AuthRequest
  ): Promise<string> {
    if (request.user) {
      return Promise.resolve(
        OrganizationManager.getInviteLink(request.user.id, organizationId)
      );
    } else {
      return Promise.reject();
    }
  }
}
