import { Component, OnInit, Input } from "@angular/core";
import { Task } from "src/app/models/Task";
import { DashboardStateService } from "../../dashboard-state.service";
import { ModalService } from "src/app/shared/modal.service";
import { EditTaskComponent } from "../edit-task/edit-task.component";
import { io, serverAddress } from "../../../../api/socket";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.scss"]
})
export class TaskDetailComponent implements OnInit {
  expanded: boolean = false;
  socket: any = null;

  constructor(
    private authService: AuthService,
    private dashboardStateService: DashboardStateService,
    private modal: ModalService
  ) {
    this.socket = io.connect(serverAddress, {
      query: `token=${authService.authToken}`
    });
  }

  @Input() task: Task;

  ngOnInit() {
    this.socket.on(`task:${this.task.id}:update`, this.onTaskUpdate);
  }

  onTaskUpdate = data => {
    this.task.name = data.name;
    this.task.description = data.description;
    this.task.startTime = data.startTime;
    this.task.endTime = data.endTime;
    this.task.dueDate = data.dueDate;
    this.task.baseList = data.baseList;
    this.task.tags = data.tags;
  };

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  edit() {
    const editRef = this.modal.open(EditTaskComponent);
    editRef.instance.task = this.task;
  }
}
