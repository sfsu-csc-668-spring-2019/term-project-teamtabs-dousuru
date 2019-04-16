import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { OrganizationListComponent } from "./organization-list/organization-list.component";
import { ProjectsListComponent } from "./projects-list/projects-list.component";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";

@NgModule({
  declarations: [
    DashboardComponent,
    OrganizationListComponent,
    ProjectsListComponent,
    ProjectDetailComponent
  ],
  imports: [CommonModule, DashboardRoutingModule],
  exports: [DashboardComponent]
})
export class DashboardModule {}
