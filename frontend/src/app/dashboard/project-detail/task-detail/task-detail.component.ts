import { Component, OnInit, Input } from "@angular/core";
import { Task } from "src/app/models/Task";
import { DashboardStateService } from "../../dashboard-state.service";
import { ModalService } from "src/app/shared/modal.service";
import { EditTaskComponent } from "../edit-task/edit-task.component";

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.scss"]
})
export class TaskDetailComponent implements OnInit {
  expanded = false;

  constructor(
    private dashboardStateService: DashboardStateService,
    private modal: ModalService
  ) {}

  @Input() task: Task;

  ngOnInit() {}

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  edit() {
    const editRef = this.modal.open(EditTaskComponent);
    editRef.instance.task = this.task;
  }
}
