import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TodoComponent } from "./todo/todo.component";
import { TodoInfoComponent } from "./todo/todo-info/todo-info.component";
import { AddTodoComponent } from "./todo/add-todo/add-todo.component";
import { TodoFilterComponent } from "./todo/todo-filter/todo-filter.component";
import { TodoService } from "./todo.service";

@NgModule({
  declarations: [
    TodoComponent,
    TodoInfoComponent,
    AddTodoComponent,
    TodoFilterComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [TodoComponent],
  providers: [TodoService]
})
export class TodoModule {}
