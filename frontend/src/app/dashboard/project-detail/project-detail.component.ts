import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import { Project } from "src/app/models/Project";
import { ProjectDetailService } from "./project-detail.service";
import { List } from "src/app/models/List";

@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  styleUrls: ["./project-detail.component.scss"]
})
export class ProjectDetailComponent implements OnInit {
  project: Observable<Project>;
  lists: Observable<List[]>; // can prob just use the project^

  constructor(private projectDetailService: ProjectDetailService) {}

  ngOnInit() {
    this.getProject();
    this.getLists();
  }

  getProject() {
    this.project = this.projectDetailService.getProject();
  }

  getLists() {
    this.lists = this.projectDetailService.getLists();
  }
}
