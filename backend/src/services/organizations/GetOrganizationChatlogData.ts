import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { MessageManager, UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";
import { User } from "../../entity";

export class GetOrganizationChatlogData extends AuthenticatedService {
  public getRoute(): string {
    return "GET /chatlog/:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (
      { params: { id }, user }: AuthRequest,
      response: Response,
      __: NextFunction
    ) => {
      this.validate(user)
        .then(_ => this.checkPermission(user, id))
        .then(_ => MessageManager.getOrganizationMessages(id))
        .then(results => response.json(results))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(user: User): Promise<any> {
    if (!user) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }

  public checkPermission(user: User, id: number): Promise<any> {
    return UserManager.checkOrganizationPermission(user.id, id).then(
      results => {
        if (results) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      }
    );
  }
}
