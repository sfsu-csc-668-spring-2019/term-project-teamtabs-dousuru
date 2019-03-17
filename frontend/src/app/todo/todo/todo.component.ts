import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TodoService } from "../todo.service";
import { Todo } from "../Todo";
import { TodoFilter } from "./todo-filter/TodoFilter";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
  todos: Observable<Todo[]>;
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todos = this.todoService.todos$;
  }

  changeCompleted(todo: Todo, event) {
    const newValue = event.target.checked;
    todo.completed = newValue;
    this.todoService.setTodo(todo.id, todo);
  }

  removeCompleted() {
    this.todoService.removeCompleted();
  }

  filter(filterType: TodoFilter) {
    switch (filterType) {
      case TodoFilter.All:
        this.todos = this.todoService.todos$;
        break;
      case TodoFilter.Completed:
        this.todos = this.todoService.todos$.pipe(
          map(todos => todos.filter(todo => todo.completed))
        );
        break;
      case TodoFilter.Uncompleted:
        this.todos = this.todoService.todos$.pipe(
          map(todos => todos.filter(todo => !todo.completed))
        );
        break;
      default:
        throw new Error(typeof filterType);
    }
  }
}
