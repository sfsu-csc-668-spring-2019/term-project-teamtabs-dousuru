import { Component, OnInit, Input } from "@angular/core";

import { List } from "../../../models/List";
import { ProjectDetailService } from "../project-detail.service";
import { Observable } from "rxjs";
import { Task } from "src/app/models/Task";

@Component({
  selector: "app-list-detail",
  templateUrl: "./list-detail.component.html",
  styleUrls: ["./list-detail.component.scss"]
})
export class ListDetailComponent implements OnInit {
  tasks: Task[];

  constructor(private projectDetailService: ProjectDetailService) {}

  @Input() id: number; // use this to get http id get
  @Input() list: List;

  ngOnInit() {
    this.getTask();
  }

  private getTask() {
    this.tasks = this.list.tasks;
    console.log("inside of list detail", this.tasks);
  }

  // hacky af right now
  private getList(id: number): void {
    this.projectDetailService.getLists().subscribe(list => {
      if (list[id - 1].id === id) this.list = list[id - 1];
    });
  }
}
