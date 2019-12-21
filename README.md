## Intro
This project is our Todo app as we should have completed it from the last project. We are now going to continue building it out to practice our skills.


## Setup
1. Fork, clone, npm i, npm start

## Code a Model

1. Create a new Interface using the CLI toolkit: `ng generate interface interfaces/ITodo`. This will ask the `ng` toolkit to `generate` a new `interface` inside a new folder called `interfaces/` called `Todo`.
1. Now let's shape our todo items in way that captures more data and helps us rendering them later. Create a few keys for the new `interface ITodo`

    ```typescript
      export interface ITodo {
        id: number;
        title: string;
        isDone: boolean;
        isDoing: boolean;
        isEditing: boolean;
      }
    ```

1. Then find your app class and change your `todoList` array from an array of `any` to only accept objects the fit the shape of `ITodo`:

    ```typescript
      export class AppComponent {
        title = "Todos";
        todoList: ITodo [] = [];
        todoTitle: String;
      }
      // code continues
    ```

1. If VScode didn't automatically import `ITodo` for you, make sure you write import statement at the top of the file so you have access to it.
1. By now your todo app should be broken! You should get an error that says something like: "...is not assignable to parameter of type 'ITodo'."
1. To fix this adjust your `addTodo` method:

    ```typescript
      addTodo():void {
        this.todoList.push({
          id: this.todoId,
          title: this.todoTitle,
          isDone: false,
          isDoing: false,
          isEditing: false,
        });

        this.todoTitle = '';
        this.todoId++;

      }
    ```

1. You might want to change what is in your `ngOnInit()` method too...

## Code a Service
1. Create a service folder and file in you Todo App: `ng generate service services/todo`.
1. Then import and register the service in the `app.module.ts` file.


## Code a Modal
1. Use Angular CLI to create a component called: " confirmationModal ". We'll use this modal to confirm a user want's to **delete** the todo item. `ng generate component confirmationModal --spec=false`. (*the last argument tells Angular we don't want a .spec file created as well.*)
1. Copy/paste the [Modal code from Bootstrap](https://ng-bootstrap.github.io/#/components/modal/examples) into these new files CAREFULLY, so you get the right values in the right places. Make sure your decorator function looks like this:

    ```typescript
      @Component({
        selector: 'confirmation-modal',
        templateURL: './confirmation-modal.component.html',
        styleUrls: ['./confirmation-modal.component.css']
      })
    ```

1. Get your import statements correct, as well as your constructor.
1. Copy/paste everything from the `modal-example` [template at Bootstrap](https://ng-bootstrap.github.io/#/components/modal/examples) into your `confirmationModal` template.
1. Edit the modal to be what you'd like when a user wants to edit a todo item. Work carefully to comment-out and delete lines slowly. Remember, you can always pull the code back from [ng-bootstrap](https://ng-bootstrap.github.io/#/components/modal/examples).
1. Use the bootstrapped `confirmation-modal` to create a pop up modal for **deleting** items from the todo list. The modal should ask user if they are sure they want to **delete** the item when they click the **delete** button.

1. You might try something like this in your `confirmation-modal.component.html` template file:

    ```html
      <div class="form-group">
        <!-- You will want to change this label later on but for now it can stay as-is -->
        <label for="dateOfBirth">Are you sure you want to delete this item?</label>
        <div class="input-group">
          <div class="input-group-append">
              <button type="button" class="btn btn-danger btn-sm" (click)="modal.close('Save click')">Yes, delete</button>
            <!-- <button class="btn btn-outline-secondary" (click)="dp.toggle()" type="button"></button> -->
          </div>
        </div>
      </div>
      <!-- ...... -->
      <!-- more code is here -->
      <!-- ...... -->

      </ng-template>

      <button class="btn btn-danger btn-sm" (click)="open(content)">Delete</button>
    ```

1. You might also try this in your `app.component.html` template file:

    ```html
      <div class="view">
        <label>{{todo.title}}</label>
        <div class="float-right">
          <confirmation-modal></confirmation-modal>
          <!-- <button type="button" (click)=deleteTodo(todo) class="btn btn-danger btn-sm">Delete</button> -->
        </div>
      </div>
    ```

1. You probably noticed that we can't delete todo items any more!! This is true. We just commented out the button that was capturing our user's click to call the delete method. Let's try to move that event listener to our modals "Yes, delete" button.

    ```html
      <button type="button" class="btn btn-danger btn-sm" (click)="deleteTodo(todo)">Yes, delete</button>
    ```

1. That does a whole lot of nothing. Why do you think? Do you remember creating your "TodoService"? The service allows us to put methods (or function) in a file separate from all components but still be imported into any component we'd like to use those methods in. In this case, we're going to need to be able to call a delete method from our `confirmation-modal` class and map over the array of todo items from the `app.component` class. So we're going to build an array of todos, a delete method, an add method, and even a get method in our `todo.service` file. In this way the file will look very similar to the `cart.service.ts` class we made during the shopping cart app.
1. As always, we can work from either direction, user-to-logic or logic-to-user. Let's go with the direction of user-to-logic this time. Start by changing the event listener on your confirmation modal's button to say:

    ```html
      <!-- confirmation-modal template file -->
      <button type="button" class="btn btn-danger btn-sm" (click)="yesDeleteTodo(todo)">Yes, delete</button>
    ```

1. Now that we can capture the event let's add a method called `yesDeleteTodo()` to the `confirmation-modal` class:

    ```typescript
      export class ConfirmationModalComponent implements OnInit {
        closeResult: string;

        constructor(
          private modalService: NgbModal,
          private TodoService: TodoService
          ) {
        }

        ngOnInit() {
        }

        // add this method to do something with the event we're capturing
        yesDeleteTodo(todo:any) {
          console.log("Delete button in Modal was clicked: " + todo)
          this.TodoService.deleteTodoItem(todo)
        }

        open(content){
          // ....
    ```

1. Notice this method is using `TodoService`. You're going to have to import the `TodoService` class at the top of this file.

    ```typescript
      import { TodoService } from '../services/todo.service'
    ```

1. And pass it to the constructor to be available for use.
1. Now that we have access to `TodoService` from our `confirmation-modal` class let's create the `deleteTodoItem` method:

    ```typescript
      // In services/todo.service
      // copy/paste the method we create last class to delete todo items, just simply rename it and add the console.log statement

      deleteTodoItem(todo:any):void {
        console.log("delete methods was called in todo.services" + todo)
        const index = this.todoList.findIndex(todoItem => todoItem === todo)
        this.todoList.splice(index, 1);
      }

    ```

1. Since this method `.splice`s from an array called `this.todoList` you'll have to create that array just like we did in `app.component` class last class: `todoList: ITodo [] = [];`

    ```typescript

      import { Injectable } from '@angular/core';
      import { ITodo } from '../interfaces/itodo';

      @Injectable({
        providedIn: 'root'
      })

      export class TodoService {
        constructor() { }

        todoList: ITodo [] = [];
        // ....
    ```

1. Also, it uses the model we created, so import `ITodo` and declare it as the type for the `todoList` array.
1. By now you should be able to click the delete button, go to the modal, click "Yes, delete" and get a console message confirming you clicked it. But, we don't actually have the item being removed from the list. To do that we're going to need our `app.component` class to pull the data from the array `todoList: ITodo [] = [];` from `todo.service`.
1. Add two methods to the `todo.service` file, below our new `deleteTodoItem` method:

    ```typescript
        // in service/todo.service

        getTodoItems() {
          return this.todoList;
        }

        addTodoItem(todo: ITodo):void {
          this.todoList.push({
            id: todo.id,
            title: todo.title,
            isDone: false,
            isDoing: false,
            isEditing: false
          });
        }
    ```

1. These methods look just like the methods we created last class in our `app.component` class. So now, you'll need to change your `app.component` class so it gets the information from `todo.services` instead of itself, (*the way it's currently doing*).
1. Go to `app.component` class and import `TodoServices` at the top and initialize it in it's constructor method.
1. Now we need to change the methods of the `app.component` class to utilize the methods we've built in the `TodoService` class instead of doing everything on their own. Change the `app.component` class to do these things instead:

    ```typescript

        export class AppComponent {
          title = 'Todos';
          todoList: ITodo [] = [];

          todoId = number;
          todoTitle: string;


          constructor(
            private TodoService: TodoService,) {

          }

          // utilizes the addTodoItem method in TodoService
          addTodo():void {
            this.TodoService.addTodoItem({
              id: this.todoId,
              title: this.todoTitle,
              isDone: false,
              isDoing: false,
              isEditing: false
            });

            this.todoTitle = '';
            this.todoId++;
          }

          // utilizes the deleteTodoItem method in TodoService
          deleteTodo(todo:any) {
            this.TodoService.deleteTodoItem(todo)
          }
    ```

1. Now that we've moved the tasks of moving and deleting items to our `todo.service` file, if we want to continue having our list initialized with the `{id: 0, title: 'Install Angular CLI', isDone: false, isDoing: false, isEditing: false}` object we've been working with we'll have to tell the `ngOnInit()` method to utilize the methods in `todo.service`:

    ```typescript
        ngOnInit() {
          this.todoTitle = '';
          this.todoId = 1;
          this.TodoService.addTodoItem(
            {id: 0, title: 'Install Angular CLI', isDone: false, isDoing: false, isEditing: false},)
          this.todoList = this.TodoService.getTodoItems();
        }
    ```

1. At the point we have broken some things, fix those things, and you should be able to still add todo items, and delete them through the modal window. If not, you'll need to step through your program and see what's going on. **THIS IS PROGRAMMING** You have to figure out how things are wired together, throw breadcrumbs (*console.logs*) when you don't know, and comment out sections of code until you, **YOU**, internalize and understand how the app works. Get used to this! You have another problem:
1. If you create multiple todo items and try to delete a specific one it will always delete the last item off the list. [How might you solve this?](https://medium.com/@izzatnadiri/how-to-pass-data-to-and-receive-from-ng-bootstrap-modals-916f2ad5d66e). If you don't figure it out, you'll certainly get it by next class. But push yourself.
1. Moving on, you might start seeing how this `todo.service` file might be useful for other things. Maybe we create an app like [Trello](https://trello.com), that has three lanes: "Todo", "Doing", and "Done". The way they end up in those different lanes is based on their status: `isDone: false, isDoing: false,`. Since all of the todo items are held in one place, `todo.service` we can just change there status by click on and updating them to be: `isDone: false, isDoing: true,` equals "Doing" lane, or `isDone: true, isDoing: false,` equals "Done" lane. Then we could filter the items by their status and put them in the correct lane. This is why we use services in a different file.
1. Since you've got your app up and going with adding and deleting, let's get those update functions working. Follow the video below and get your double-clicking and updating functions going. You'll have to adjust just a little because we're using a service file and not directly working from our component's class. But I think you can figure it out.

******

### Follow-up Video

[Passing Data From Your Modal](https://player.vimeo.com/video/364364863)

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/nbFmHD4T04k/0.jpg)](https://youtu.be/nbFmHD4T04k?t=1345)



 