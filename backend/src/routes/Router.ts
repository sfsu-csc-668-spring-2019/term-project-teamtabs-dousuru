export abstract class Router {
  private app: any;
  protected services: Map<string, Function>;

  public constructor(app: Express.Application) {
    if (null === app) {
      throw new Error("Missing required App");
    }
    this.setDefaultValues(app);
    this.registerServices();
  }

  private setDefaultValues(app: Express.Application): void {
    this.app = app;
    this.setServices();
  }

  protected abstract setServices(): void;

  public abstract getRoute(): string;

  private registerServices(): void {
    this.services.forEach((_, fullPath, __) => {
      let pathItems = fullPath.split(" ");
      this.app[pathItems[0].toLowerCase()](
        this.getRoute() + pathItems[1],
        this.services.get(fullPath).bind(this)
      );
    });
  }
}
