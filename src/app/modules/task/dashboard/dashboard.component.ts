import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/models/task';
import Swal from 'sweetalert2';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showAdd!: boolean;
  showUpdate!: boolean;

  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'action',
  ];

  listTasks: any;
  data: any;

  task: Task = {
    nameTask: '',
    description: '',
    status: 'Pendiente',
  };

  constructor(private taskService: TaskService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.listTask();
    this.refresh();
  }

  refresh() {
    this.task = {
      nameTask: '',
      description: '',
      status: 'Pendiente',
    };

    this.showAdd = true;
    this.showUpdate = false;
  }

  formSubmit() {
    if (this.task.nameTask == '' || this.task.nameTask == null) {
      this.snack.open('El nombre de la tarea es requerido!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }
    if (this.task.description == '' || this.task.description == null) {
      this.snack.open('La descripcion de la tarea es requerida!!', 'Aceptar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    if (this.showAdd) {
      this.taskService.addTask(this.task).subscribe(
        (resp: any) => {
          this.listTask();
          Swal.fire('Guardado', 'Se guardo la tarea con exito!!', 'success');
        },
        (err) => {
          Swal.fire(
            'Error',
            'Ocurrion un error al guardar una nueva tarea',
            'error'
          );
        }
      );
    } else if (this.showUpdate) {
      this.taskService.updateTask(this.task).subscribe(
        (resp: any) => {
          console.log('Esta es la respuesta de la actualización ', resp);
          this.refresh();
          this.listTask();
          Swal.fire(
            'Actualizado',
            'Se actualizo la tarea con exito!!',
            'success'
          );
        },
        (err) => {
          Swal.fire('Error', 'Error al actualizar la tarea ', 'error');
        }
      );
    }
  }

  listTask() {
    this.taskService.listTask().subscribe((resp: any) => {
      this.listTasks = resp;
    });
  }

  changeData(element: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.task = element;
  }

  deleteTask(element: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: ' ms-3 btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar tarea!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.taskService.deleteTask(element.id).subscribe((resp: any) => {
            this.listTask();
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Tarea eliminada con exito!!',
              'success'
            );
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Eliminación cancelada :)',
            'error'
          );
        }
      });
  }
}
