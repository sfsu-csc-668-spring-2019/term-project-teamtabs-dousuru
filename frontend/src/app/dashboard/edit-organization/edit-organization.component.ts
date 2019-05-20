import { Component, OnInit, Input } from "@angular/core";
import { HttpClient, HttpBackend } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";
import { Observable, of } from "rxjs";
import { Cloudinary } from "@cloudinary/angular-5.x";
import { Organization } from "../../models";
import { DashboardStateService } from "../dashboard-state.service";

@Component({
  selector: "app-edit-organization",
  templateUrl: "./edit-organization.component.html",
  styleUrls: ["./edit-organization.component.scss"]
})
export class EditOrganizationComponent implements OnInit {
  constructor(
    private state: DashboardStateService,
    private fb: FormBuilder,
    private cloudinary: Cloudinary,
    private http: HttpBackend
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
    this.upload(icon)
      .pipe()
      .toPromise()
      .then(value => {
        console.log(value);
      });
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

  upload(icon: any): any {
    const cloudName = this.cloudinary.cloudinaryInstance.config().cloud_name;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=dousuru`;
    console.log(url);
    const formData = new FormData();
    formData.append("file", icon);
    return fetch(url, { method: "POST", body: formData }).then(stuff =>
      console.log(stuff)
    );
  }
}
