import { TodoService } from "./../../todo.service";
import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "../../Todo";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
  @Input()
  todos: Observable<Todo[]>;

  constructor(private todoService: TodoService) {}

  changeCompleted(todo: Todo, event) {
    const newValue = event.target.checked;
    todo.completed = newValue;
    this.todoService.setTodo(todo.id, todo);
  }

  ngOnInit() {}
}
