import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";
import authenticate from "../../middleware/authMiddleware";

export class PostOrganizationSearch implements IService {
  public getRoute(): string {
    return "POST /id/:organizationId/search";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        body: { name },
        params: { organizationId }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) => {
          this.validate(organizationId, name, request)
            .then(response.json)
            .catch(_ => response.sendStatus(500));
        }
      );
    };
  }

  public validate(
    organizationId: number,
    name: string,
    request: AuthRequest
  ): Promise<JSON> {
    if (request.user) {
      OrganizationManager.userBelongsToOrganization(
        request.user.id,
        organizationId
      ).then(userIsMember => {
        if (userIsMember) {
          return Promise.resolve(
            OrganizationManager.getContentsByName(
              request.user.id,
              organizationId,
              name
            )
          );
        } else {
          return Promise.reject();
        }
      });
    } else {
      return Promise.reject();
    }
  }
}
