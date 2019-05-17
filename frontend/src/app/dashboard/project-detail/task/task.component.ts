import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ProjectDetailService } from "../project-detail.service";
import { Task } from "src/app/models/Task";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"]
})
export class TaskComponent implements OnInit {
  tasks: Observable<Task[]>;

  constructor(private projectDetailService: ProjectDetailService) {}

  @Input() id: number;

  ngOnInit() {
    this.tasks = this.projectDetailService
      .getList(12)
      .pipe(map(list => list.tasks));
  }
}
