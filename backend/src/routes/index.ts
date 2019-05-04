import { UserRouter } from "./UserRouter";
import { OrganizationRouter } from "./OrganizationRouter";
import { ProjectRouter } from "./ProjectRouter";
export class DousuruRouter {
  private static _instance: DousuruRouter;
  private constructor(app: Express.Application) {
    if (DousuruRouter._instance) {
      throw new Error(
        "Instantiation failed: use Dousuru.getInstance() instead of new."
      );
    }
    new UserRouter("/users", app);
    new OrganizationRouter("/organization", app);
    new ProjectRouter("/organization/id/:organizationId/project", app);
    DousuruRouter._instance = this;
  }
  public static initializeInstance(app: Express.Application): void {
    if (DousuruRouter._instance) {
      throw new Error(
        "Instantiation failed: instance has already been initiated."
      );
    }
    new DousuruRouter(app);
  }

  public static getInstance(): DousuruRouter {
    return DousuruRouter._instance;
  }
}
