import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DashboardStateService } from "../dashboard-state.service";
import { Project } from "../../models";

@Component({
  selector: "app-edit-project",
  templateUrl: "./edit-project.component.html",
  styleUrls: ["./edit-project.component.scss"]
})
export class EditProjectComponent implements OnInit {
  @Input() project: Project;
  constructor(private fb: FormBuilder, private state: DashboardStateService) {}

  formGroup = this.fb.group({
    name: "",
    description: ""
  });

  ngOnInit() {}

  save() {
    if (!this.project || !this.formGroup.valid) {
      return;
    }
    const { name, description } = this.formGroup.value;
    this.project.name = name;
    this.project.description = description;
    this.state
      .updateProject(this.project)
      .toPromise()
      .then(proj => {
        console.log(proj);
      });
  }
}
