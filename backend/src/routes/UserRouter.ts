import { Router } from "./Router";
import { default as SERVICES } from "../services/users";

export class UserRouter extends Router {
  protected setServices(): void {
    this.services = new Map();
    SERVICES.forEach(ServiceClass => {
      const instance = new ServiceClass();
      this.services.set(instance.getRoute(), instance.execute());
    });
  }

  public getRoute(): string {
    return "/users";
  }
}
