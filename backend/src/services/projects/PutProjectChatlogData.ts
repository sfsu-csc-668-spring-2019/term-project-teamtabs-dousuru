import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { MessageQueries, PermissionQueries } from "../../queries";
import { Message, User } from "../../entity";
import { AuthRequest } from "../../types/AuthRequest";
import { ProjectHandler } from "../../socket/handlers";

export class PutProjectChatlogData extends AuthenticatedService {
  public getRoute(): string {
    return "PUT /chatlog/:id";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, __: NextFunction) => {
      const {
        body: { partitions },
        params: { id: projectId }
      } = request;
      this.validate(projectId, partitions, request)
        .then(() => {
          console.log("here");
          return MessageQueries.createProjectMessage(
            request.user.id,
            projectId,
            partitions
          );
        })
        .then(message => response.json(message))
        // .then(data => {
        //   ProjectHandler.getInstance().chat(projectId, data);
        //   response.sendStatus(200);
        // })
        .catch(_ => response.sendStatus(500));
    };
  }

  public validate(
    projectId: number,
    partitions: any[],
    request: AuthRequest
  ): Promise<User> {
    console.log(projectId, partitions);
    return new Promise((resolve, reject) => {
      if (request.user && projectId && partitions) {
        resolve(request.user);
      } else {
        reject();
      }
    });
  }
}
