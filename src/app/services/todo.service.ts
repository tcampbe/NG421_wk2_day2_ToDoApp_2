import { Injectable, OnInit } from "@angular/core";
import { ITodo } from "../interfaces/itodo";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  todoList: ITodo[] = [
    { id: 1, title: "Install Angular CLI", description: "false" }
  ];
  todoId = 0;

  constructor() {}

  addTodo(title: string): void {
    this.todoList.push({
      id: this.todoId++,
      title,
      description: ""
    });
  }

  deleteTodo(todo: ITodo) {
    const index = this.todoList.findIndex(todoItem => todoItem === todo);
    this.todoList.splice(index, 1);
  }

  getTodos(): ITodo[] {
    return this.todoList;
  }
}
