import { DefaultRouter } from "./DefaultRouter";
import { UserRouter } from "./UserRouter";
import { OrganizationRouter } from "./OrganizationRouter";
import { ProjectRouter } from "./ProjectRouter";
import { ListRouter } from "./ListRouter";
import { TaskRouter } from "./TaskRouter";

const ROUTERS = [
  DefaultRouter,
  UserRouter,
  OrganizationRouter,
  ProjectRouter,
  ListRouter,
  TaskRouter
];

export class DousuruRouter {
  private static _instance: DousuruRouter;
  private constructor(app: Express.Application) {
    if (DousuruRouter._instance) {
      throw new Error(
        "Instantiation failed: use Dousuru.getInstance() instead of new."
      );
    }
    new DefaultRouter(DefaultRouter.getRoute(), app);
    new UserRouter("/users", app);
    new OrganizationRouter("/organization", app);
    new ProjectRouter("/organization/id/:organizationId/project", app);
    new ListRouter(
      "/organization/id/:organizationId/project/id/:projectId/list",
      app
    );
    new TaskRouter(
      "/organization/id/:organizationId/project/id/:projectId/list/id/:listId/task",
      app
    );
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
