import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DashboardStateService } from "../../dashboard-state.service";
import { ModalService } from "src/app/shared/modal.service";

@Component({
  selector: "app-create-list",
  templateUrl: "./create-list.component.html",
  styleUrls: ["./create-list.component.scss"]
})
export class CreateListComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dashboardStateService: DashboardStateService,
    private modal: ModalService
  ) {}

  errorMessage: string;

  formGroup = this.fb.group({
    name: ["", Validators.required],
    description: ["", Validators.required]
  });

  onSubmit() {
    if (this.formGroup.valid) {
      const { name, description } = this.formGroup.value;
      this.dashboardStateService
        .createList(name, description)
        .toPromise()
        .then(list => {
          console.log(list);
          this.modal.close();
        });
    } else {
      this.errorMessage = "Make sure all fields are valid";
    }
  }

  ngOnInit() {}
}
