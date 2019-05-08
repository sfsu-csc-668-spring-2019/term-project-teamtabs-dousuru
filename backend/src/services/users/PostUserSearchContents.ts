import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { UserManager } from "../../controllers";
import { AuthRequest } from "../../types/AuthRequest";
import authenticate from "../../middleware/authMiddleware";

export class PostUserSearchContents implements IService {
  public getRoute(): string {
    return "POST /id/:userId/search";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        body: { name },
        params: { userId }
      } = request;
      authenticate(request, response, (_: AuthRequest, response: Response) => {
        this.validate(userId, name)
          .then(response.json)
          .catch(_ => response.sendStatus(500));
      });
    };
  }

  public validate(userId: number, name: string): Promise<JSON> {
    return Promise.resolve(UserManager.GetContentsByName(userId, name));
  }
}
