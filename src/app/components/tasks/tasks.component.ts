import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/serveces/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  resulttasks: Task[] = [];
  myTask: Task = {
    label: '',
    completed: false
  };
  editForm: boolean = false;
  showForm: boolean = false;
  searchText: string = "";
  constructor(private tastServirce: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  searchTasks(){
    this.resulttasks = this.tasks.filter((task)=> task.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }
  getTasks(){
    this.tastServirce.findAll()
                     .subscribe(tasks => {
                       this.tasks = tasks;
                       this.resulttasks = tasks;
                      });
  }
  persist(){
    this.tastServirce.persist(this.myTask)
                      .subscribe((task)=>{
                        this.tasks = [task, ...this.tasks];
                        this.ressetTask();
                        this.showForm = !this.showForm;
                      });
  }
  
  updateTasks(myTask: Task){
    this.tastServirce.updateTask(myTask)
                      .subscribe((task)=>{
                            this.editForm = false;
                            this.ressetTask();
                            this.showForm = !this.showForm;
                      });
  }
  deleteTasks(id: any){
    this.tastServirce.delete(id)
                      .subscribe(
                        ()=>this.tasks = this.tasks.filter(task => task.id != id)
                      );
  }
  toggleTaskCompleted(task: Task){
    this.tastServirce.completed( task.id , task.completed)
                      .subscribe(()=>{
                        task.completed = ! task.completed
                      });
  }

  ressetTask(){
    this.myTask = {
      label: '',
      completed: false
    };
  }
  editTask(task: Task){
    this.showForm = !this.showForm;
    this.myTask = task;
    this.editForm = true;
  }

}
