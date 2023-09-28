import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent {

  inputValue: string = ''; // Initialize inputValue
  todo: any = { title: '' };

  constructor(
    private dialogRef: MatDialogRef<UpdateTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private todoService: TodoService
  ) {
    if (typeof this.data.todo === 'object') {
      this.inputValue = this.data.todo.title; // Initialize inputValue with the todo title
    }
  }

  updateTodo() {
    console.log('updateTodo function called'); // Add this line for debugging
    // Check if data.todo is an object
    if (typeof this.data.todo === 'object') {
      this.data.todo.title = this.inputValue;

      this.todoService.updateTodo(this.data.todo.id, this.data.todo).subscribe(
        (response) => {
          console.log('Todo updated:', response);
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error updating todo:', error);
        }
      );
    } else {
      console.error('Invalid data.todo:', this.data.todo);
    }
  }
}

