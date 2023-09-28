import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private todoAddedSource = new BehaviorSubject<any>(null);
  todoAdded$ = this.todoAddedSource.asObservable();

  constructor() { }

  emitTodoAdded(todo: any) {
    this.todoAddedSource.next(todo);
  }
}