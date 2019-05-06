import { Router } from "./Router";
import { Request, Response } from "express";
import { UserManager } from "../controllers/UserManager";
import { OrganizationManager } from "../controllers/OrganizationManager";

export class DefaultRouter extends Router {
  protected setServices(): void {
    this.services = new Map();
    this.services.set("GET /", this.getLandingPage);
  }

  password = "not encrypted";
  email = "test@test.com";
  displayName = "Irik";
  userName = "Irik";
  icon = "nifty Ikon";

  private async getLandingPage(_: Request, res: Response): Promise<any> {
    //res.send("The thing is working!");

    //Make account
    //UserManager.createAccount(this.email, this.password, this.displayName, this.userName, this.icon)
    //Get User info
    var results = await UserManager.getUserInformation(this.displayName);
    //Make Org
    const orgName = "Nifty Org";
    const orgDescription = "The niftiest!";
    const orgIcon = "Fancy Ikon!";

    //await OrganizationManager.addOrganizationUser(1,1)
    //await OrganizationManager.createOrganization(orgName, orgDescription, orgIcon, 1)

    //get Organization
    var orgResults = await OrganizationManager.getOrganization(1);

    var userorgs = await UserManager.getOrganizations(1);

    var orgUsers = await OrganizationManager.getOrganizationUsers(1);
    res.send(userorgs);
  }
}
