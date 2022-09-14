import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-add-task',
  templateUrl: './form-add-task.component.html',
  styleUrls: ['./form-add-task.component.css'],
})
export class FormAddTaskComponent implements OnInit {
  listTasks: Array<Task> = [];

  task: any = {
    nameTask: '',
    descriptionTask: '',
    status: 'pending',
  };

  constructor(private snack: MatSnackBar) {}

  ngOnInit(): void {}

  formSubmit() {
    if (this.task.nameTask == '' || this.task.nameTask == null) {
      this.snack.open('El nombre de la tarea es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }
    if (this.task.descriptionTask == '' || this.task.descriptionTask == null) {
      this.snack.open('La descripcion de la tarea es requerida!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    console.log('Envio la información');

    this.listTasks.push(this.task);

    console.log('Este es el array ', this.listTasks);
  }
}
