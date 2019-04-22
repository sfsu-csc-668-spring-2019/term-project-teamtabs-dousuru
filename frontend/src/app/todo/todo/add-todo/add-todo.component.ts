import { Component, OnInit } from "@angular/core";
import { TodoService } from "../../todo.service";
import { FormControl } from "@angular/forms";
import { Todo } from "../../Todo";

@Component({
  selector: "app-add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.scss"]
})
export class AddTodoComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  todoName = new FormControl("");

  ngOnInit() {}

  onSubmit(event) {
    event.preventDefault();
    const todoText = this.todoName.value;
    const todo = new Todo(todoText);
    this.todoService.addTodo(todo);
    this.todoName.setValue("");
  }
}
