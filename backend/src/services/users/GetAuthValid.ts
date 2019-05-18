import { Response, NextFunction } from "express";
import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { AuthRequest } from "../../types/AuthRequest";

export class GetAuthValid extends AuthenticatedService {
  public getRoute(): string {
    return "GET /auth_valid";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request: AuthRequest, response: Response, _: NextFunction) => {
      response.send(!!request.user);
    };
  }
}
