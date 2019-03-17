import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";

import { TodoComponent } from "./todo.component";
import { TodoService } from "../todo.service";
import { Todo } from "../Todo";
import { By } from "@angular/platform-browser";

@Component({ template: "", selector: "app-todo-info" })
class TodoInfoStubComponent {}

@Component({ template: "", selector: "app-add-todo" })
class AddTodoStubComponent {}

@Component({ template: "", selector: "app-todo-filter" })
class TodoFilterStubComponent {}

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
        TodoFilterStubComponent
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

  it("should update service when todo is updated", () => {
    const spy = spyOn(service, "setTodo");
    const todo = new Todo("asdf");
    component.changeCompleted(todo, { target: { checked: true } });
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.mostRecent().args[0]).toEqual(todo.id);
  });

  it("should display a list of todos from service", () => {
    const todos = [new Todo("hello"), new Todo("World")];
    service.setTodos(todos);
    fixture.detectChanges();

    const el: HTMLElement = de.query(By.css("ul")).nativeElement;
    expect(el.innerText).toContain("hello");
    expect(el.innerText).toContain("World");
  });
});
