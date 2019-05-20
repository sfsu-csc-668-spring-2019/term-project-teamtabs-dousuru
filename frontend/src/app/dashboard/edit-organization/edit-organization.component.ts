import { Component, OnInit, Input } from "@angular/core";
import { DashboardStateService } from "../dashboard-state.service";
import { FormBuilder } from "@angular/forms";
import { Organization } from "src/app/models";
import { Observable } from "rxjs";

@Component({
  selector: "app-edit-organization",
  templateUrl: "./edit-organization.component.html",
  styleUrls: ["./edit-organization.component.scss"]
})
export class EditOrganizationComponent implements OnInit {
  constructor(private state: DashboardStateService, private fb: FormBuilder) {}

  @Input() organization: Organization;
  // possible race condition
  inviteLink: Observable<string>;

  formGroup = this.fb.group({
    name: [""],
    description: [""],
    icon: [""]
  });

  ngOnInit() {
    this.inviteLink = this.state.getInviteLink(this.organization);
  }

  save() {
    const org = this.organization;
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
