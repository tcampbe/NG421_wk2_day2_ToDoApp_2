import { Component, OnInit, Input } from "@angular/core";
import { ITodo } from "../interfaces/itodo";
import { TodoService } from "../services/todo.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  @Input() todo: ITodo;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todo = this.todo;
  }
}
