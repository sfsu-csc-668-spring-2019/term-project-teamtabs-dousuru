import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Todo } from "./Todo";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  private todosSubject$: BehaviorSubject<Todo[]>;

  constructor() {
    this.todosSubject$ = new BehaviorSubject([]);
  }

  get todos(): Todo[] {
    return this.todosSubject$.getValue();
  }

  set todos(newValue: Todo[]) {
    this.todosSubject$.next(newValue);
  }

  get todos$(): Observable<Todo[]> {
    return this.todosSubject$.asObservable();
  }

  addTodo(todo: Todo) {
    this.todos = [...this.todos, todo];
  }

  setTodos(todos: Todo[]) {
    this.todosSubject$.next(todos);
  }

  setTodo(withId: number, newTodo: Todo) {
    const updated = this.todos.map(todo => {
      if (todo.id !== withId) {
        return todo;
      } else {
        return newTodo;
      }
    });
    this.todos = updated;
  }

  removeCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }
}
