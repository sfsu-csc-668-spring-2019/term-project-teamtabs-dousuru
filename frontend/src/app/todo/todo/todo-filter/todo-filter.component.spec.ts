import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TodoFilterComponent } from "./todo-filter.component";
import { TodoFilter } from "./TodoFilter";

describe("TodoFilterComponent", () => {
  let component: TodoFilterComponent;
  let fixture: ComponentFixture<TodoFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [TodoFilterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit on change", () => {
    let spy = spyOn(component.onFilter, "emit");
    component.dropdown.setValue(0);
    expect(spy).toHaveBeenCalled();
  });

  it("should emit currently selected filter", () => {
    let spy = spyOn(component.onFilter, "emit");
    component.dropdown.setValue(TodoFilter.Uncompleted);
    expect(spy.calls.mostRecent().args[0]).toBe(TodoFilter.Uncompleted);
  });
});
