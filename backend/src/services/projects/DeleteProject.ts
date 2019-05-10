import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { ProjectManager } from "../../controllers";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";

export class DeleteProject implements IService {
  public getRoute(): string {
    return "DELETE /id/:projectId";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        params: { projectId }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) =>
          this.validate(projectId, request)
            .then(_ => response.sendStatus(200))
            .catch(_ => response.sendStatus(500))
      );
    };
  }

  public validate(projectId: number, request: AuthRequest): Promise<void> {
    if (request.user) {
      return Promise.resolve(
        ProjectManager.deleteProject(request.user.id, projectId)
      );
    } else {
      return Promise.reject();
    }
  }
}
