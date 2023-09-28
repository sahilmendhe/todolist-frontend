import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(public themeService: ThemeService, public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTodoComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  toggleTheme() {
    this.themeService.toggleTheme();
  }

}
