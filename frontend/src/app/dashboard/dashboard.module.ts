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
import { EditProjectComponent } from "./edit-project/edit-project.component";
import { CreateListComponent } from "./project-detail/create-list/create-list.component";
import { CreateTaskComponent } from "./project-detail/create-task/create-task.component";
import { EditListComponent } from "./project-detail/edit-list/edit-list.component";
import { EditTaskComponent } from "./project-detail/edit-task/edit-task.component";

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
    EditOrganizationComponent,
    EditProjectComponent,
    CreateListComponent,
    CreateTaskComponent,
    EditListComponent,
    EditTaskComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ],
  exports: [DashboardComponent],
  entryComponents: [
    CreateOrganizationComponent,
    EditOrganizationComponent,
    EditProjectComponent,
    CreateListComponent,
    EditListComponent,
    EditTaskComponent
  ]
})
export class DashboardModule {}
