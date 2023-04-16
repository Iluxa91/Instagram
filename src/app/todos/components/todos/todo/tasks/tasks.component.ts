import { Component, Input, OnInit } from '@angular/core'
import { Task, UpdateTaskModel } from 'src/app/todos/models/updateTaskModel'
import { TasksService } from '../../../../services/tasks.service'
import { combineLatest, map, Observable } from 'rxjs'
import { TodosService } from '../../../../services/todos.service'
import { TaskStatus } from '../../../../../core/enums/core.enums'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$?: Observable<Task[]>

  newTitle = ''

  constructor(private tasksService: TasksService, private todosService: TodosService) {}

  ngOnInit(): void {
    // subscribe
    // this.tasks$ = this.tasksService.tasks$.pipe(map(tasks => tasks[this.todoId]))
    this.tasks$ = combineLatest([this.tasksService.tasks$, this.todosService.todos$]).pipe(
      map(res => {
        const todos = res[1]
        const tasks = res[0]
        const tasksForTodo = tasks[this.todoId]
        const activeTodo = todos.find(tl => tl.id === this.todoId)

        if (activeTodo?.filter === 'active') {
          return tasksForTodo.filter(t => t.status === TaskStatus.active)
        } else if (activeTodo?.filter === 'completed') {
          return tasksForTodo.filter(t => t.status === TaskStatus.completed)
        }
        return tasksForTodo
      })
    )

    this.tasksService.getTasks(this.todoId)
  }

  addTaskHandler() {
    this.tasksService.createTask({ todoId: this.todoId, title: this.newTitle })
    this.newTitle = ''
  }

  removeTaskHandler(data: { todoId: string; taskId: string }) {
    this.tasksService.deleteTask(data.todoId, data.taskId)
  }

  updateTaskHandler(data: { todoId: string; taskId: string; model: UpdateTaskModel }) {
    this.tasksService.updateTask(data.todoId, data.taskId, data.model)
  }
}
