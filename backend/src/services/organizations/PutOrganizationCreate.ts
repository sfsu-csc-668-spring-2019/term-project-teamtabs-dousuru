import { Request, Response, NextFunction } from "express";
import { IService, IMiddlewareFunction } from "..";
import { OrganizationManager } from "../../controllers";
import { Organization } from "../../entity";
import authenticate from "../../middleware/authMiddleware";
import { AuthRequest } from "../../types/AuthRequest";

export class PutOrganizationCreate implements IService {
  public getRoute(): string {
    return "PUT /create";
  }

  public execute(): IMiddlewareFunction {
    return (request: Request, response: Response, __: NextFunction) => {
      const {
        body: { name, description, icon }
      } = request;
      authenticate(
        request,
        response,
        (request: AuthRequest, response: Response) =>
          this.validate(name, description, icon, request)
            .then(response.json)
            .catch(_ => response.sendStatus(500))
      );
    };
  }

  public validate(
    name: string,
    description: string,
    icon: string,
    request: AuthRequest
  ): Promise<Organization> {
    if (request.user) {
      return Promise.resolve(
        OrganizationManager.createOrganization(
          name,
          description,
          icon,
          request.user.id
        )
      );
    } else {
      return Promise.reject();
    }
  }
}
