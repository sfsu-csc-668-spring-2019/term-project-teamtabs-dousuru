import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import {
  MessageManager,
  OrganizationManager,
  UserManager
} from "../../controllers";
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
        .then(_ => this.checkPermission(request, id))
        .then(_ => MessageManager.getOrganizationMessages(id))
        .then(results => response.json(results))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(request: AuthRequest, id: number): Promise<any> {
    if (!request.user || !id) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  }

  public checkPermission(request: AuthRequest, id: number): Promise<any> {
    return UserManager.checkOrganizationPermission(request.user.id, id).then(
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
