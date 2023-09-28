import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: any[] = [];

  constructor(private sharedService: SharedService, private todoService: TodoService, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchTodos();

    // Subscribe to the todoAdded$ observable to handle the event
    this.sharedService.todoAdded$.subscribe((addedTodo) => {
      if (addedTodo) {
        // Handle the newly added todo here
        // console.log('Newly added todo:', addedTodo);
        // You can add the addedTodo to your todos list if needed
        this.todos.push(addedTodo);
      }
    });
  }

  fetchTodos() {
    this.todoService.getItems().subscribe((data) => {
      this.todos = data;
    });
  }



  openDialog(todo: any) {

    const dialogRef = this.dialog.open(UpdateTodoComponent, {
      data: { todo: todo } // Pass the entire todo object
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('Dialog closed with result:', result);
    });
  }

  onTodoAdded(addedTodo: any) {
    // Handle the newly added todo here
    // console.log('Newly added todo:', addedTodo);
    // You can add the addedTodo to your todos list if needed
    this.todos.push(addedTodo);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodoById(id).subscribe(
      () => {
        this.fetchTodos();
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }

  toggleTodoStatus(todo: any) {
    todo.isCompleted = !todo.isCompleted; // Toggle the status locally

    this.todoService.updateTodoStatus(todo._id, todo.isCompleted).subscribe(
      (response) => {
        // console.log('Todo status updated:', response);
      },
      (error) => {
        console.error('Error updating todo status:', error);
        // Revert the local change on error
        todo.isCompleted = !todo.isCompleted;
      }
    );
  }



}
