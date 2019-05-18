import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { MessageManager, OrganizationManager } from "../../controllers";
import { Message } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class GetOrganizationChatlogData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /chatlog/:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        params: { id }
      } = request;
      this.validate(request, id)
        .then(_ => MessageManager.getOrganizationMessages(id))
        .then(results => response.json(results))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(request: AuthRequest, id: number): Promise<any> {
    if (!request.user || !id) {
      return Promise.reject();
    } else {
      OrganizationManager.userIsAuthorized(request.user.id, id).then(
        userIsAuthorized => {
          if (userIsAuthorized) {
            return Promise.resolve();
          }
          return Promise.reject();
        }
      );
    }
  }
}
