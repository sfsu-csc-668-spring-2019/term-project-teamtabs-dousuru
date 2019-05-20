import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { AuthRequest } from "../../types/AuthRequest";
import { User } from "../../entity";
import { OrganizationQueries } from "../../queries";

export class PostOrganization extends AuthenticatedService {
  public getRoute(): string {
    return "POST /";
  }

  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request, response, next) => {
      this.validate(request)
        .then(user => {
          const { id, name, description, icon } = request.body;
          return OrganizationQueries.updateOrganization(
            user.id,
            id,
            name,
            description,
            icon
          );
        })
        .then(org => {
          response.json(org);
        });
    };
  }

  public validate(request: AuthRequest): Promise<User> {
    return new Promise((resolve, reject) => {
      const { id, name, description, icon } = request.body;
      if (request.user && id) {
        resolve(request.user);
      } else {
        reject();
      }
    });
  }
}
