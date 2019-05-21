import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Project } from "src/app/models/Project";
import { List } from "src/app/models/List";
import { DashboardStateService } from "../dashboard-state.service";
import { CreateListComponent } from "./create-list/create-list.component";
import { ModalService } from "src/app/shared/modal.service";

@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  styleUrls: ["./project-detail.component.scss"]
})
export class ProjectDetailComponent implements OnInit {
  project: Observable<Project>;
  lists: Observable<List[]>; // somehow need to get this, @TODO need this route for dashboard state service
  shouldDisplay$: Observable<boolean>;

  constructor(
    private dashboardStateService: DashboardStateService,
    private modal: ModalService
  ) {}

  ngOnInit() {
    this.project = this.dashboardStateService.selectedProject.asObservable();
    this.lists = this.dashboardStateService.lists;
    this.shouldDisplay$ = this.dashboardStateService.selectedProject
      .asObservable()
      .pipe(map(proj => !!proj));
  }

  addList() {
    this.modal.open(CreateListComponent);
  }
}
