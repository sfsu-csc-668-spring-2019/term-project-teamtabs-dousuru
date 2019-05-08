import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";

export class GetAuthValid implements IService {
  public getRoute(): string {
    return "GET /auth_valid";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, _: NextFunction) => {
      authenticate(request, response, (req: AuthRequest, res: Response) => {
        res.send(!!req.user);
      });
    };
  }
}
