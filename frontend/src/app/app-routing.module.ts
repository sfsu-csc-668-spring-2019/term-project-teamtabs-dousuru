import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { TodoComponent } from "./todo/todo/todo.component";
import { LogoutComponent } from "./logout/logout.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "logout", component: LogoutComponent },
  { path: "todo", component: TodoComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
