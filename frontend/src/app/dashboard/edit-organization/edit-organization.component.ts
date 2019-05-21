import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { Cloudinary } from "@cloudinary/angular-5.x";
import { Organization } from "../../models";
import { DashboardStateService } from "../dashboard-state.service";
import { ImageUploaderService } from "src/app/networking/image-uploader.service";

@Component({
  selector: "app-edit-organization",
  templateUrl: "./edit-organization.component.html",
  styleUrls: ["./edit-organization.component.scss"]
})
export class EditOrganizationComponent implements OnInit {
  constructor(
    private state: DashboardStateService,
    private fb: FormBuilder,
    private imageUploader: ImageUploaderService
  ) {}

  @Input() organization: Organization;
  // possible race condition
  inviteLink: Observable<string>;
  imageLink: string;
  uploading = false;

  formGroup = this.fb.group({
    name: [""],
    description: [""]
  });

  ngOnInit() {
    this.inviteLink = this.state.getInviteLink(this.organization);
  }

  changeFile(event) {
    this.uploading = true;
    const file = event.target.files[0];
    this.upload(file)
      .toPromise()
      .then(url => {
        this.imageLink = url;
      })
      .finally(() => {
        this.uploading = false;
      });
  }

  save() {
    const org = this.organization;
    if (!org || !this.formGroup.valid || this.uploading) {
      return;
    }
    const { name, description } = this.formGroup.value;
    org.name = name;
    org.description = description;
    org.icon = this.imageLink;
    this.state
      .updateOrganization(org)
      .toPromise()
      .then(updatedOrg => {
        console.log(updatedOrg);
      })
      .catch(err => {
        console.error(err);
      });
  }

  upload(icon: any): Observable<string> {
    return this.imageUploader.upload(icon);
  }

  delete() {
    if (!this.organization) {
      return;
    }
    this.state
      .deleteOrganization(this.organization)
      .toPromise()
      .then(() => console.log("deleted"));
  }
}
