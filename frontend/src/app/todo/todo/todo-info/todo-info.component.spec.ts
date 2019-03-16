import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { Todo } from "../../Todo";
import { TodoInfoComponent } from "./todo-info.component";
import { TodoService } from "../../todo.service";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("TodoInfoComponent", () => {
  let component: TodoInfoComponent;
  let fixture: ComponentFixture<TodoInfoComponent>;
  let de: DebugElement;
  let service: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoInfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoInfoComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(TodoService);
    const mockTodos = [new Todo("hmmm", true)];
    service.setTodos(mockTodos);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display number of total todos", () => {
    const tag: HTMLElement = de.query(By.css("p")).nativeElement;
    expect(tag.innerText).toContain("1");
  });
});
