import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DashboardStateService } from "../../dashboard-state.service";
import { Task } from "src/app/models";

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.scss"]
})
export class EditTaskComponent implements OnInit {
  @Input() task: Task;

  constructor(
    private fb: FormBuilder,
    private dashboardStateService: DashboardStateService
  ) {}

  formGroup = this.fb.group({
    name: "",
    description: ""
  });

  save() {
    if (!this.task || !this.formGroup.valid) {
      return;
    }
    const { name, description } = this.formGroup.value;
    this.task.name = name;
    this.task.description = description;
    this.dashboardStateService
      .updateTask(this.task)
      .toPromise()
      .then(task => {
        console.log(task);
      });
  }

  ngOnInit() {}
}
