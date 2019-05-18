import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import {
  MessageManager,
  OrganizationManager,
  UserManager
} from "../../controllers";
import { Message } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";

export class PutOrganizationChatlogData extends AuthenticatedService {
  public getRoute(): string {
    return "PUT /chatLog/:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { partitions, updateId },
        params: { id }
      } = request;
      this.validate(id, partitions, updateId, request)
        .then(_ => {
          if (undefined !== updateId) {
            return Promise.resolve(
              MessageManager.updateMessage(updateId, partitions)
            );
          } else {
            return Promise.resolve(
              MessageManager.createOrganizationMessage(
                request.user.id,
                id,
                partitions
              )
            );
          }
        })
        .then(results => response.json(results))
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    id: number,
    partitions: any[],
    updateId: number,
    request: AuthRequest
  ): Promise<Message> {
    if (!request.user || !partitions) {
      return Promise.reject();
    } else {
      UserManager.checkOrganizationPermission(request.user.id, id).then(
        results => {
          if (results) {
            return Promise.resolve();
            Promise.reject();
          }
        }
      );
    }
  }
}
