import { Component, OnInit, Input } from "@angular/core";
import { TodoService } from "../services/todo.service";

@Component({
  selector: "app-create-todo",
  templateUrl: "./create-todo.component.html",
  styleUrls: ["./create-todo.component.css"]
})
export class CreateTodoComponent implements OnInit {
  text: string;
  todoTitle = "";
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    /*     this.todoService.addTodo();   */
  }

  addTodo(): void {
    this.todoService.addTodo(this.todoTitle);
    this.todoTitle = "";
  }
}
