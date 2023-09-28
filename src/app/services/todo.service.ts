import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/tasks';
  constructor(private http: HttpClient) { }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Add a new todo
  addTodo(todo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, todo);
  }

  // Update an existing todo
  updateTodo(id: number, updatedTodo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedTodo);
  }

  // Delete an existing todo
  deleteTodoById(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  updateTodoStatus(id: number, completed: boolean): Observable<any> {
    const updateData = { isCompleted: completed }; // Create an object with the updated completed status
    return this.http.put(`${this.apiUrl}/${id}`, updateData);
  }
}
