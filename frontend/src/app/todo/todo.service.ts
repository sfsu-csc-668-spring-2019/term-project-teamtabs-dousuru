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

  get todos$(): Observable<Todo[]> {
    return this.todosSubject$.asObservable();
  }

  addTodo(todo: Todo) {
    this.todosSubject$.pipe(take(1)).subscribe(todos => {
      this.todosSubject$.next([...todos, todo]);
    });
  }

  setTodos(todos: Todo[]) {
    this.todosSubject$.next(todos);
  }

  setTodo(withId: number, newTodo: Todo) {
    this.todosSubject$.pipe(take(1)).subscribe(todos => {
      const updated = todos.map(todo => {
        if (todo.id !== withId) return todo;
        else return newTodo;
      });
      this.todosSubject$.next(updated);
    });
  }

  removeCompleted() {
    this.todosSubject$.pipe(take(1)).subscribe(todos => {
      const filtered = todos.filter(todo => !todo.completed);
      this.todosSubject$.next(filtered);
    });
  }
}
