import { Component, Input, OnInit } from '@angular/core'
import { Task } from 'src/app/todos/models/task.model'
import { TasksService } from '../../../../services/tasks.service'
import { map, Observable } from 'rxjs'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$?: Observable<Task[]>

  newTitle = ''

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    // subscribe
    this.tasks$ = this.tasksService.tasks$.pipe(map(tasks => tasks[this.todoId]))
    this.tasksService.getTasks(this.todoId)
  }

  addTaskHandler() {
    this.tasksService.createTask({ todoId: this.todoId, title: this.newTitle })
    this.newTitle = ''
  }

  removeTaskHandler(data: { todoId: string; taskId: string }) {
    this.tasksService.deleteTask(data.todoId, data.taskId)
  }
}
