import { Request, Response, NextFunction } from "express";
import { IMiddlewareFunction, Service } from "..";
import { UserManager, OrganizationManager } from "../../controllers";

export class GetLandingPage extends Service {
  public getRoute(): string {
    return "GET /";
  }

  user_id = 1;
  password = "not encrypted";
  email = "test@test.com";
  displayName = "Irik";
  username = "Irik";
  icon = "nifty Ikon";

  public execute(): IMiddlewareFunction {
    return (_: Request, response: Response, __: NextFunction) => {
      this.richardTest(response);
    };
  }

  private async richardTest(response: Response): Promise<void> {
    //res.send("The thing is working!");

    //Make account
    //UserManager.createAccount(this.email, this.password, this.displayName, this.username, this.icon)
    //Get User info
    var results = await UserManager.getUserInformation(this.displayName);
    //Make Org
    const orgName = "Nifty Org";
    const orgDescription = "The niftiest!";
    const orgIcon = "Fancy Ikon!";

    //await OrganizationManager.addOrganizationUser(1,1)
    //await OrganizationManager.createOrganization(orgName, orgDescription, orgIcon, 1)

    //get Organization
    // var orgResults = await OrganizationManager.getOrganization(1);

    var userorgs = await UserManager.getOrganizations(1);

    var orgUsers = await OrganizationManager.getOrganizationUsers(1);
    response.send(userorgs);
  }

  private async userTests(): Promise<any> {
    //Make account
    //UserManager.createAccount(this.email, this.password, this.displayName, this.username, this.icon)
    var results = [];
    //Get User info
    var userInformation = await UserManager.getUserInformation(
      this.displayName
    );
    results.push(userInformation);

    var userOrgs = await UserManager.getOrganizations(this.user_id);
    results.push(userOrgs);

    var userProjects = await UserManager.getOrganizationProjects(
      this.user_id,
      userOrgs[0].id
    );
    results.push(userProjects);

    return results;
  }

  private async organizationTests(): Promise<any> {}
}
