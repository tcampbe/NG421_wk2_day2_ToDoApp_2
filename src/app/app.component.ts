import { Component, OnInit } from "@angular/core";
import { ITodo } from "./interfaces/itodo";
import { TodoService } from "./services/todo.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Todos";
  todoList: ITodo[] = [];
  todoTitle: string;
  todoId: number = 0;

  constructor(private itemService: TodoService) {}

  ngOnInit() {
    this.todoTitle = "";
    this.todoList = [
      // example of how to make an item in todo list
      {
        id: 1,
        title: "Install Angular CLI",
        description: "npm install -g @angular/cli"
      }
    ];
  }
}
