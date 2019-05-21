import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { TodoService } from "../../todo.service";
import { TodoFilter } from "./TodoFilter";

@Component({
  selector: "app-todo-filter",
  templateUrl: "./todo-filter.component.html",
  styleUrls: ["./todo-filter.component.scss"]
})
export class TodoFilterComponent implements OnInit, OnDestroy {
  constructor(private todoService: TodoService) {}

  dropdown = new FormControl(TodoFilter.All);

  private dropdownSub: Subscription;

  @Output()
  filter = new EventEmitter<TodoFilter>();

  get currentFilter(): TodoFilter {
    return this.dropdown.value as TodoFilter;
  }

  filters = [
    { name: "All", value: TodoFilter.All },
    { name: "Only Uncompleted", value: TodoFilter.Uncompleted },
    { name: "Only Completed", value: TodoFilter.Completed }
  ];

  ngOnInit() {
    this.dropdownSub = this.dropdown.valueChanges.subscribe(value => {
      const filter: TodoFilter = parseInt(value, 10);
      this.filter.emit(filter);
    });
  }

  ngOnDestroy() {
    this.dropdownSub.unsubscribe();
  }
}
