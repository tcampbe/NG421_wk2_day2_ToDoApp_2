import { Injectable, OnInit } from "@angular/core";
import { ITodo } from "../interfaces/itodo";

@Injectable({
  providedIn: "root"
})
export class TodoService implements OnInit {
  title = "Todos";
  todoList: ITodo[] = [];
  todoTitle: string;
  todoId: number = 0;
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
  addTodo(): void {
    this.todoList.push({
      id: this.todoId,
      title: this.todoTitle,
      description: ""
    });

    // resets our todoTitle variable to an empty string
    this.todoTitle = "";
    this.todoId++;
  }
  deleteTodo(todo: any) {
    const index = this.todoList.findIndex(todoItem => todoItem === todo);
    this.todoList.splice(index, 1);
  }
}
