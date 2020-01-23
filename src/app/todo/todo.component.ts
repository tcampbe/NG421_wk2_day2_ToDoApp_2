import { Component, OnInit, Input } from "@angular/core";
import { ITodo } from "../interfaces/itodo";
import { TodoService } from "../services/todo.service";
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';


@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  @Input() todo: ITodo;

  constructor(
    private todoService: TodoService,
    private confirmationModalService: ConfirmationModalComponent
    ) {}

  ngOnInit() {
  }

  async deleteTodo() {
    const result = await this.confirmationModalService.show();
  }

}
