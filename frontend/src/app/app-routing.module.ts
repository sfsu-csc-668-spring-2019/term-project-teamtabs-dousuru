import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { TodoComponent } from "./todo/todo/todo.component";
import { AuthGuard } from "./auth/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LogoutComponent } from "./logout/logout.component";
import { JoinOrganizationComponent } from "./join-organization/join-organization.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "todo", component: TodoComponent },
  { path: "landing", component: LandingPageComponent },
  { path: "logout", component: LogoutComponent },
  { path: "join_organization", component: JoinOrganizationComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
