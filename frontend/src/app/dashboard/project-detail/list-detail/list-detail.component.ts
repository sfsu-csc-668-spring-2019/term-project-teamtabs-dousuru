import { Component, OnInit, Input } from "@angular/core";

import { List, Task } from "../../../models";
import { DashboardStateService } from "../../dashboard-state.service";
import { ModalService } from "src/app/shared/modal.service";
import { EditListComponent } from "../edit-list/edit-list.component";
import { io, serverAddress } from "../../../../api/socket";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-list-detail",
  templateUrl: "./list-detail.component.html",
  styleUrls: ["./list-detail.component.scss"]
})
export class ListDetailComponent implements OnInit {
  tasks: Task[];
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

  @Input() id: number; // use this to get http id get
  @Input() list: List;

  ngOnInit() {
    this.getTask();
    this.socket.on(`list:${this.list.id}:update`, this.onListUpdate);
    this.socket.on(`list:${this.list.id}:update:tasks`, this.onListTasksUpdate);
  }

  private onListUpdate = data => {
    this.edit(data);
  };

  private onListTasksUpdate = data => {
    this.tasks = data;
  };

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
