import { DebugElement, Component } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { TodoListComponent } from "./todo-list.component";
import { Todo } from "../../Todo";
import { TodoService } from "../../todo.service";

@Component({ template: "", selector: "app-checkbox" })
class CheckboxStubComponent {}

describe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let service: TodoService;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent, CheckboxStubComponent],
      providers: [TodoService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(TodoService);
    component.todos = service.todos$;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display a list of todos from service", () => {
    const todos = [new Todo("hello"), new Todo("World")];
    service.setTodos(todos);
    fixture.detectChanges();

    const el: HTMLElement = de.query(By.css("ul")).nativeElement;
    expect(el.innerText).toContain("hello");
    expect(el.innerText).toContain("World");
  });

  it("should update service when todo is updated", () => {
    const spy = spyOn(service, "setTodo");
    const todo = new Todo("asdf");
    component.changeCompleted(todo, { target: { checked: true } });
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.mostRecent().args[0]).toEqual(todo.id);
  });
});
