import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./../shared/shared.module";
import { TodoComponent } from "./todo/todo.component";
import { TodoInfoComponent } from "./todo/todo-info/todo-info.component";
import { AddTodoComponent } from "./todo/add-todo/add-todo.component";
import { TodoFilterComponent } from "./todo/todo-filter/todo-filter.component";
import { TodoListComponent } from "./todo/todo-list/todo-list.component";
import { TodoService } from "./todo.service";

@NgModule({
  declarations: [
    TodoComponent,
    TodoInfoComponent,
    AddTodoComponent,
    TodoFilterComponent,
    TodoListComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  exports: [TodoComponent],
  providers: [TodoService]
})
export class TodoModule {}
