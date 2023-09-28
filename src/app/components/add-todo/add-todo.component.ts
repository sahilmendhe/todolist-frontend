import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import { SharedService } from 'src/app/services/shared.service'; // Import the shared service

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  inputValue: string = '';
  todo: any = { title: '' };

  constructor(
    public todoService: TodoService,
    public dialogRef: MatDialogRef<AddTodoComponent>,
    private sharedService: SharedService // Inject the shared service
  ) { }
  addTodo() {
    this.todoService.addTodo(this.todo).subscribe(
      (response) => {
        this.sharedService.emitTodoAdded(response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error adding todo:', error);
      }
    );
  }
}

