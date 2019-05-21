import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";

import { HttpResponse } from "@angular/common/http";
import { ApiTestComponent } from "./api-test.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ApiService } from "../api.service";

class ApiStubService {
  makeRequest(
    path: string,
    method: string,
    body: string
  ): Observable<HttpResponse<string>> {
    return of(new HttpResponse({ body: "asdf" }));
  }
}

describe("ApiTestComponent", () => {
  let component: ApiTestComponent;
  let fixture: ComponentFixture<ApiTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApiTestComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: ApiService, useValue: ApiStubService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
