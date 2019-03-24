import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NetworkTestingComponent } from "./network-testing.component";

describe("NetworkTestingComponent", () => {
  let component: NetworkTestingComponent;
  let fixture: ComponentFixture<NetworkTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkTestingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
