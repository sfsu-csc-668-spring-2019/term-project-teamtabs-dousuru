export abstract class Router {
  private app: any;
  private routePath: string;
  protected services: Map<string, Function>;

  public constructor(routePath: string, app: Express.Application) {
    if (null === app) {
      throw new Error("Missing required App");
    }
    this.setDefaultValues(routePath, app);
    this.registerServices();
  }

  private setDefaultValues(routePath: string, app: Express.Application): void {
    this.app = app;
    this.routePath = routePath;
    this.setServices();
  }

  protected abstract setServices(): void;

  public abstract getRoute(): string;

  private registerServices(): void {
    this.services.forEach((_, fullPath, __) => {
      let pathItems = fullPath.split(" ");
      this.app[pathItems[0].toLowerCase()](
        this.routePath + pathItems[1],
        this.services.get(fullPath).bind(this)
      );
    });
  }
}
