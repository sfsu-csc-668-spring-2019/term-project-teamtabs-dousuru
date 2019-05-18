import { Component, OnInit, Input } from "@angular/core";
import { Task } from "src/app/models/Task";

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.scss"]
})
export class TaskDetailComponent implements OnInit {
  expanded = false;
  constructor() {}

  @Input() task: Task;

  ngOnInit() {}

  toggleExpanded() {
    this.expanded = !this.expanded;
  }
}
