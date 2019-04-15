import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { TodoComponent } from "./todo/todo/todo.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "todo", component: TodoComponent },
  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
