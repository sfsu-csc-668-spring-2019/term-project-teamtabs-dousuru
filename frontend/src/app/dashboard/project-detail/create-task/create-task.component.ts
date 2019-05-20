import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DashboardStateService } from "../../dashboard-state.service";
import { ModalService } from "src/app/shared/modal.service";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.scss"]
})
export class CreateTaskComponent implements OnInit {
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

  // need to fix this
  // onSubmit() {
  //   if (this.formGroup.valid) {
  //     const { name, description } = this.formGroup.value;
  //     this.dashboardStateService
  //       .createTask( list.id, name, description)
  //       .toPromise()
  //       .then(task => {
  //         console.log(task);
  //         this.modal.close();
  //       });
  //   } else {
  //     this.errorMessage = "Make sure all fields are valid";
  //   }
  // }

  ngOnInit() {}
}
