import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DashboardStateService } from "../dashboard-state.service";

@Component({
  selector: "app-create-project",
  templateUrl: "./create-project.component.html",
  styleUrls: ["./create-project.component.scss"]
})
export class CreateProjectComponent implements OnInit {
  constructor(private fb: FormBuilder, private state: DashboardStateService) {}

  formGroup = this.fb.group({
    name: "",
    description: ""
  });

  ngOnInit() {}

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    const { name, description } = this.formGroup.value;

    this.state
      .createProject(name, description, true)
      .toPromise()
      .then(proj => {
        console.log(proj);
      });
  }
}
