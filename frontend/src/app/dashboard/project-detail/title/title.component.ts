import { Component, OnInit } from "@angular/core";

import { Project } from "../../../models/Project";
import { ProjectDetailService } from "../project-detail.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.scss"]
})
export class TitleComponent implements OnInit {
  project: Observable<Project>;

  constructor(private projectDetailService: ProjectDetailService) {}

  ngOnInit() {
    this.getProject();
  }

  getProject(): void {
    this.project = this.projectDetailService.getProject();
  }
}
