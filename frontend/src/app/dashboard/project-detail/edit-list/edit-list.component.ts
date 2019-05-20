import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DashboardStateService } from "../../dashboard-state.service";
import { List } from "src/app/models";

@Component({
  selector: "app-edit-list",
  templateUrl: "./edit-list.component.html",
  styleUrls: ["./edit-list.component.scss"]
})
export class EditListComponent implements OnInit {
  @Input() list: List;

  constructor(
    private fb: FormBuilder,
    private dashboardStateService: DashboardStateService
  ) {}

  formGroup = this.fb.group({
    name: "",
    description: ""
  });

  save() {
    if (!this.list || !this.formGroup.valid) {
      return;
    }
    const { name, description } = this.formGroup.value;
    this.list.name = name;
    this.list.description = description;
    this.dashboardStateService
      .updateList(this.list)
      .toPromise()
      .then(list => {
        console.log(list);
      });
  }

  ngOnInit() {}
}
