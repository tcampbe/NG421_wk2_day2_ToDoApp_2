import { Component, OnInit } from "@angular/core";
import { ITodo } from "./interfaces/itodo";
import { TodoService } from "./services/todo.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private itemService: TodoService) {}
}
