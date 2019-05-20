import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Cloudinary } from "@cloudinary/angular-5.x";
import { DashboardStateService } from "../dashboard-state.service";
import { FormBuilder } from "@angular/forms";
import { Organization } from "src/app/models";

@Component({
  selector: "app-edit-organization",
  templateUrl: "./edit-organization.component.html",
  styleUrls: ["./edit-organization.component.scss"]
})
export class EditOrganizationComponent implements OnInit {
  constructor(
    private state: DashboardStateService,
    private fb: FormBuilder,
    private cloudinary: Cloudinary
  ) {}

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
    const formData = new FormData();
    formData.append("icon", icon);
    console.log(formData);
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

  upload() {
    const cloudName = this.cloudinary.cloudinaryInstance.config().cloud_name;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const data = this.formGroup.value;
  }
}
