import { Component, OnInit, Input } from "@angular/core";

import { List, Task } from "../../../models";
import { DashboardStateService } from "../../dashboard-state.service";
import { ModalService } from "src/app/shared/modal.service";
import { EditListComponent } from "../edit-list/edit-list.component";

@Component({
  selector: "app-list-detail",
  templateUrl: "./list-detail.component.html",
  styleUrls: ["./list-detail.component.scss"]
})
export class ListDetailComponent implements OnInit {
  tasks: Task[];

  constructor(
    private dashboardStateService: DashboardStateService,
    private modal: ModalService
  ) {}

  @Input() id: number; // use this to get http id get
  @Input() list: List;

  ngOnInit() {
    this.getTask();
  }

  private getTask() {
    this.tasks = this.list.containedTasks;
  }

  addTask() {
    this.dashboardStateService
      .createTask(this.list.id)
      .toPromise()
      .then(task => {
        console.log(task);
      });
  }

  edit(list: List) {
    const editRef = this.modal.open(EditListComponent);
    editRef.instance.list = list;
  }
}
