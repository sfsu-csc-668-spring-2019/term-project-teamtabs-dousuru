import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DashboardStateService } from "../dashboard-state.service";
import { Project } from "../../models";

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"]
})
export class ProjectsListComponent implements OnInit {
  projects: Observable<Project[]>;

  constructor(private dashboardStateService: DashboardStateService) {}

  ngOnInit() {
    this.projects = this.dashboardStateService.projectsSubject.asObservable();
    this.dashboardStateService.fetchProjects();
  }

  selectProject(id: number) {
    this.dashboardStateService.setSelectedProject(id);
  }
}
