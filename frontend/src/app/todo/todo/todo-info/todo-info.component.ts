import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Todo } from "../../Todo";
import { TodoService } from "../../todo.service";

@Component({
  selector: "app-todo-info",
  templateUrl: "./todo-info.component.html",
  styleUrls: ["./todo-info.component.scss"]
})
export class TodoInfoComponent implements OnInit {
  todos: Observable<Todo[]>;
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todos = this.todoService.todos$;
  }

  get count(): Observable<number> {
    return this.todos.pipe(map(todos => todos.length));
  }

  get completedCount(): Observable<number> {
    return this.todos.pipe(
      map(todos => todos.filter(todo => todo.completed).length)
    );
  }
}
