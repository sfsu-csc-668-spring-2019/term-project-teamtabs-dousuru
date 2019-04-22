import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthTesterComponent } from "./auth-tester.component";

describe("AuthTesterComponent", () => {
  let component: AuthTesterComponent;
  let fixture: ComponentFixture<AuthTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthTesterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
