import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { DashboardStateService } from "../dashboard-state.service";
import { Project } from "src/app/models";

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"]
})
export class ProjectsListComponent implements OnInit {
  projects$: Observable<Project[]>;
  constructor(private state: DashboardStateService) {}

  ngOnInit() {
    this.projects$ = this.state.projects;
  }

  addProject() {
    this.state.createProject();
  }
}
