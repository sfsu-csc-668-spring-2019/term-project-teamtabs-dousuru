import { TestBed } from "@angular/core/testing";

import { TodoService } from "./todo.service";
import { Todo } from "./Todo";

describe("TodoService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });

  it("should provide an observable of todos", () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service.todos$).not.toBeNull();
  });

  it("should allow setting of todos", (done: DoneFn) => {
    const service: TodoService = TestBed.get(TodoService);
    const mockTodos = [new Todo("idk"), new Todo("sometime", true)];
    service.setTodos(mockTodos);
    service.todos$.subscribe(todos => {
      expect(todos).toEqual(mockTodos);
      done();
    });
  });

  it("should allow adding of a todo", (done: DoneFn) => {
    const service: TodoService = TestBed.get(TodoService);
    const mockTodo = new Todo("test");
    service.addTodo(mockTodo);
    service.todos$.subscribe(todos => {
      expect(todos).toEqual([mockTodo]);
      done();
    });
  });

  it("should allow updating of a todo by id", (done: DoneFn) => {
    const service: TodoService = TestBed.get(TodoService);
    const mockTodos = [new Todo("first"), new Todo("second")];
    service.setTodos(mockTodos);
    mockTodos[0].name = "new first";
    service.setTodo(mockTodos[0].id, mockTodos[0]);
    service.todos$.subscribe(todos => {
      expect(todos).toEqual(mockTodos);
      done();
    });
  });

  it("can remove completed todos", (done: DoneFn) => {
    const service: TodoService = TestBed.get(TodoService);
    const mockTodos = [
      new Todo("uncompleted", false),
      new Todo("completed", true)
    ];
    service.setTodos(mockTodos);
    service.removeCompleted();
    service.todos$.subscribe(todos => {
      expect(todos.length).toBe(1);
      expect(todos.every(todo => !todo.completed)).toBe(true);
      done();
    });
  });
});
