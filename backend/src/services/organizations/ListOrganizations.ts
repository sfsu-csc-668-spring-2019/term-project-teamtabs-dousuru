import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { Organization, User } from "../../entity";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";
import { UserManager } from "../../controllers/UserManager";

export class ListOrganizations implements IService {
  public getRoute(): string {
    return "GET /list/";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, _: NextFunction) => {
      console.log("got list");
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) =>
          this.validate(request)
            .then(user => UserManager.getOrganizations(user.id))
            .then(orgs => response.json(orgs))
            .catch(_ => {
              response.sendStatus(400);
            })
      );
    };
  }

  public validate(request: AuthRequest): Promise<User> {
    if (request.user) {
      return Promise.resolve(request.user);
    } else {
      return Promise.reject();
    }
  }
}
