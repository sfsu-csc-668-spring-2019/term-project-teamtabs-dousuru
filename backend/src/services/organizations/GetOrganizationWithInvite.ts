import { AuthenticatedService, IAuthenticatedMiddlewareFunction } from "..";
import { AuthRequest } from "../../types/AuthRequest";
import { User, Organization } from "../../entity";
import { OrganizationQueries } from "../../queries";
import { SecretsService } from "../../middleware/SecretsService";

export class GetOrganizationWithInvite extends AuthenticatedService {
  public getRoute(): string {
    return "GET /withInvite/:invite";
  }
  public authenticatedExecute(): IAuthenticatedMiddlewareFunction {
    return (request, response, next) => {
      const { invite } = request.params;
      return this.validate(request, invite)
        .then(() => SecretsService.getOrganizationFromInvite(invite))
        .then(org => {
          response.json(org);
        })
        .catch(err => {
          console.error(err);
          response.sendStatus(500);
        });
    };
  }

  validate(request: AuthRequest, invite: string): Promise<User> {
    return new Promise((resolve, reject) => {
      if (!request.user || !invite) {
        reject();
      } else {
        resolve(request.user);
      }
    });
  }
}
