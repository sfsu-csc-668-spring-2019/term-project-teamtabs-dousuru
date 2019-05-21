import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, DebugElement, Input } from "@angular/core";

import { TodoComponent } from "./todo.component";
import { TodoService } from "../todo.service";

@Component({ template: "", selector: "app-todo-info" })
class TodoInfoStubComponent {}

@Component({ template: "", selector: "app-add-todo" })
class AddTodoStubComponent {}

@Component({ template: "", selector: "app-todo-filter" })
class TodoFilterStubComponent {}

@Component({ template: "", selector: "app-todo-list" })
class TodoListStubComponent {
  @Input() todos;
}

describe("TodoComponent", () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let service: TodoService;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoComponent,
        TodoInfoStubComponent,
        AddTodoStubComponent,
        TodoFilterStubComponent,
        TodoListStubComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(TodoService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
