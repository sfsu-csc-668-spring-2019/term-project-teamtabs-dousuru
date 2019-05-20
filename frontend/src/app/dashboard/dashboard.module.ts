import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { OrganizationListComponent } from "./organization-list/organization-list.component";
import { ProjectsListComponent } from "./projects-list/projects-list.component";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { SharedModule } from "../shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ChatComponent } from "./project-detail/chat/chat.component";
import { TitleComponent } from "./project-detail/title/title.component";
import { ListDetailComponent } from "./project-detail/list-detail/list-detail.component";
import { TaskComponent } from "./project-detail/task/task.component";
import { TaskDetailComponent } from "./project-detail/task-detail/task-detail.component";
import { CreateOrganizationComponent } from "./create-organization/create-organization.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UsersListComponent } from "./users-list/users-list.component";
import { EditOrganizationComponent } from "./edit-organization/edit-organization.component";

@NgModule({
  declarations: [
    CreateOrganizationComponent,
    DashboardComponent,
    OrganizationListComponent,
    ProjectsListComponent,
    ProjectDetailComponent,
    ChatComponent,
    TitleComponent,
    ListDetailComponent,
    TaskComponent,
    TaskDetailComponent,
    UsersListComponent,
    EditOrganizationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ],
  exports: [DashboardComponent],
  entryComponents: [CreateOrganizationComponent, EditOrganizationComponent]
})
export class DashboardModule {}
