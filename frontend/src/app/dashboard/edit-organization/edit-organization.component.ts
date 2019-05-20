import { Component, OnInit } from "@angular/core";
import { DashboardStateService } from "../dashboard-state.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-organization",
  templateUrl: "./edit-organization.component.html",
  styleUrls: ["./edit-organization.component.scss"]
})
export class EditOrganizationComponent implements OnInit {
  constructor(private state: DashboardStateService, private fb: FormBuilder) {}

  formGroup = this.fb.group({
    name: [""],
    description: [""],
    icon: [""]
  });

  ngOnInit() {}

  save() {
    const org = this.state.selectedOrganization.value;
    if (!org || !this.formGroup.valid) {
      return;
    }
    const { name, description, icon } = this.formGroup.value;
    org.name = name;
    org.description = description;
    org.icon = icon;
    this.state
      .updateOrganization(org)
      .toPromise()
      .then(updatedOrg => {
        console.log(updatedOrg);
      });
  }
}
