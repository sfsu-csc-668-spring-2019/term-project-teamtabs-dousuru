import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DashboardStateService } from "../dashboard-state.service";

@Component({
  selector: "app-create-organization",
  templateUrl: "./create-organization.component.html",
  styleUrls: ["./create-organization.component.scss"]
})
export class CreateOrganizationComponent {
  constructor(private fb: FormBuilder, private state: DashboardStateService) {}

  formGroup = this.fb.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    icon: ["", Validators.required]
  });

  onSubmit() {
    if (this.formGroup.valid) {
      const { name, description, icon } = this.formGroup.value;
      this.state
        .createOrganization(name, description, icon)
        .toPromise()
        .then(org => {
          console.log(org);
        });
    }
  }
}
