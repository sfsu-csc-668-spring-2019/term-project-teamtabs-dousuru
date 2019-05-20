import { Component, OnInit, Input } from "@angular/core";

import { List, Task } from "../../../models";

@Component({
  selector: "app-list-detail",
  templateUrl: "./list-detail.component.html",
  styleUrls: ["./list-detail.component.scss"]
})
export class ListDetailComponent implements OnInit {
  tasks: Task[];

  constructor() {}

  @Input() id: number; // use this to get http id get
  @Input() list: List;

  ngOnInit() {
    this.getTask();
  }

  private getTask() {
    this.tasks = this.list.tasks;
  }
}
