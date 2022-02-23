import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiURL = "http://localhost:5500/tasks";
  constructor(private http: HttpClient) { }

  findAll(){
    // json-server --watch data/db.json --port 5500
    return this.http.get<Task[]>(this.apiURL);
  }
  delete(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  persist(task: Task){
    return this.http.post<Task>(this.apiURL, task);
  }

  completed(id : any,completed: boolean){
    return this.http.patch(`${this.apiURL}/${id}`,{completed : !completed});
  }
  updateTask(task: Task){
    return this.http.put(`${this.apiURL}/${task.id}`, task);
  }
}
