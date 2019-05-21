import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Cloudinary } from "@cloudinary/angular-5.x";
import { ModalService } from "src/app/shared/modal.service";
import { DashboardStateService } from "../dashboard-state.service";
import { HttpClient } from "@angular/common/http";
import { ImageUploaderService } from "src/app/networking/image-uploader.service";

@Component({
  selector: "app-create-organization",
  templateUrl: "./create-organization.component.html",
  styleUrls: ["./create-organization.component.scss"]
})
export class CreateOrganizationComponent {
  constructor(
    private fb: FormBuilder,
    private state: DashboardStateService,
    private modal: ModalService,
    private imageUploader: ImageUploaderService
  ) {}

  errorMessage: string;
  uploading = false;
  imageLink: string;

  formGroup = this.fb.group({
    name: ["", Validators.required],
    description: ["", Validators.required]
  });

  onSubmit() {
    if (this.formGroup.valid && !this.uploading && this.imageLink) {
      const { name, description } = this.formGroup.value;
      this.state
        .createOrganization(name, description, this.imageLink)
        .toPromise()
        .then(org => {
          console.log(org);
          this.modal.close();
        });
    } else {
      this.errorMessage = "Make sure all fields are valid";
    }
  }

  upload(icon: any): Observable<string> {
    return this.imageUploader.upload(icon);
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
}
