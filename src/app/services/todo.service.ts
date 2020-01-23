import { Injectable, OnInit } from "@angular/core";
import { ITodo } from "../interfaces/itodo";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  title = "Todos";
  todoList: ITodo[] = [
    {id:1, title:"install angular cli", description: "test"}
  ];
  todoTitle: string;
  todoId: number = 0;

  constructor() {}

  addTodo(title: string): void {
    this.todoList.push({
      id: this.todoId++,
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

  getTodos() {
    return this.todoList;
  }
}
