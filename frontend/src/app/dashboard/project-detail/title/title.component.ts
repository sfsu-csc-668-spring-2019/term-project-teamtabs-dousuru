import { Component, OnInit, Input } from "@angular/core";

import { Project } from "../../../models/Project";
import { ProjectDetailService } from "../project-detail.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.scss"]
})
export class TitleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() project: Project;
}
