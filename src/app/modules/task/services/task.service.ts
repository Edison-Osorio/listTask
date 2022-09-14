import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly urlBase = 'http://localhost:9090/api';
  constructor(private http: HttpClient) {}

  listTask() {
    return this.http.get(`${this.urlBase}/task`);
  }

  addTask(task: Task) {
    return this.http.post(`${this.urlBase}/task`, task);
  }

  updateTask(task: Task) {
    return this.http.put(`${this.urlBase}/task/${task.id}`, task);
  }

  deleteTask(idTask: number) {
    return this.http.delete(`${this.urlBase}/task/${idTask}`);
  }
}
