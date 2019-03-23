import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ApiService } from "../api.service";
import { formArrayNameProvider } from "@angular/forms/src/directives/reactive_directives/form_group_name";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-api-test",
  templateUrl: "./api-test.component.html",
  styleUrls: ["./api-test.component.scss"]
})
export class ApiTestComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  resBody: string;
  resError?: string;
  formGroup: FormGroup;
  subscription: Subscription;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      method: ["", Validators.required],
      path: ["", Validators.required],
      body: [""]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  makeRequest() {
    if (!this.formGroup.valid) {
      return;
    }
    const { method, body, path } = this.formGroup.value;
    this.formGroup.disable();
    this.subscription = this.apiService
      .makeRequest(path, method, body)
      .pipe(
        catchError(err => {
          this.resError = err;
          return of(err);
        })
      )
      .subscribe((res: HttpResponse<string>) => {
        console.log(res);
        this.resBody = res.body;
        this.formGroup.reset();
        this.formGroup.enable();
      });
  }
}
