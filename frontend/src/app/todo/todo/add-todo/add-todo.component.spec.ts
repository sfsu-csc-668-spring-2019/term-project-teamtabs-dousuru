import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AddTodoComponent } from "./add-todo.component";
import { TodoService } from "../../todo.service";
import { DebugElement } from "@angular/core";

describe("AddTodoComponent", () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let de: DebugElement;
  let serviceSpy: jasmine.Spy;
  let service: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [AddTodoComponent],
      providers: [TodoService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(TodoService);
    serviceSpy = spyOn(service, "addTodo");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be able to add todos", () => {
    component.todoName.setValue("test todo");
    component.onSubmit({ preventDefault: () => {} });
    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy.calls.mostRecent().args[0].name).toEqual("test todo");
  });

  it("should reset input field on submit", () => {
    component.todoName.setValue("test todo");
    component.onSubmit({ preventDefault: () => {} });
    expect(component.todoName.value).toEqual("");
  });
});
