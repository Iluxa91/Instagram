import { Component, Input, OnInit } from '@angular/core'
import { Task } from 'src/app/todos/models/task.model'
import { TasksService } from '../../../../services/tasks.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$?: Observable<Task[]>

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks$ = this.tasksService.getTasks(this.todoId)
  }
}
