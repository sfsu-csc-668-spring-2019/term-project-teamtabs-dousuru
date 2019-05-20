import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { DashboardStateService } from "../dashboard-state.service";
import { Project } from "src/app/models";
import { ModalService } from "src/app/shared/modal.service";
import { EditProjectComponent } from "../edit-project/edit-project.component";

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"]
})
export class ProjectsListComponent implements OnInit {
  projects$: Observable<Project[]>;
  selectedProject$: Observable<Project>;

  constructor(
    private state: DashboardStateService,
    private modal: ModalService
  ) {}

  ngOnInit() {
    this.projects$ = this.state.projects;
    this.selectedProject$ = this.state.selectedProject.asObservable();
  }

  addProject() {
    this.state
      .createProject()
      .toPromise()
      .then(proj => {
        console.log(proj);
      });
  }

  select(project: Project) {
    this.state.setSelectedProject(project);
  }

  isSelected(project: Project): Observable<boolean> {
    return this.selectedProject$.pipe(
      map(selected => {
        if (!selected) {
          return false;
        }
        return selected.id === project.id;
      })
    );
  }

  edit(project: Project) {
    const editRef = this.modal.open(EditProjectComponent);
    editRef.instance.project = project;
  }
}
