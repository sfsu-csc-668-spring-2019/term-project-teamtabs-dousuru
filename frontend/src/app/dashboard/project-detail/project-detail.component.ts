import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import { Project } from "src/app/models/Project";
import { ProjectDetailService } from "./project-detail.service";
import { List } from "src/app/models/List";
import { DashboardStateService } from "../dashboard-state.service";

@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  styleUrls: ["./project-detail.component.scss"]
})
export class ProjectDetailComponent implements OnInit {
  project: Observable<Project>;
  lists: Observable<List[]>; // somehow need to get this, @TODO need this route for dashboard state service

  constructor(
    private projectDetailService: ProjectDetailService,
    private dashboardStateService: DashboardStateService
  ) {}

  ngOnInit() {
    this.project = this.dashboardStateService.selectedProject.asObservable();
    this.lists = this.dashboardStateService.lists;
    //this.lists = this.projectDetailService.getLists();
  }
}
