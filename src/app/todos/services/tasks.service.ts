import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map } from 'rxjs'
import { environment } from '../../../environment/environment'
import { DomainTask, GetTasksResponse, Task, UpdateTaskModel } from '../models/updateTaskModel'
import { BaseResponse } from '../../core/models/core.model'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$ = new BehaviorSubject<DomainTask>({})

  constructor(private http: HttpClient) {}

  getTasks(todoId: string) {
    return this.http
      .get<GetTasksResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`)
      .pipe(map(tl => tl.items))
      .subscribe(tasks => {
        const stateTasks = this.tasks$.getValue()
        stateTasks[todoId] = tasks
        this.tasks$.next(stateTasks)
      })
  }

  createTask(data: { todoId: string; title: string }) {
    this.http
      .post<BaseResponse<{ item: Task }>>(
        `${environment.baseUrl}/todo-lists/${data.todoId}/tasks`,
        {
          title: data.title,
        }
      )
      .pipe(map(res => res.data.item))
      .subscribe(task => {
        const stateTasks = this.tasks$.getValue()
        const newTasks = [task, ...stateTasks[data.todoId]]
        stateTasks[data.todoId] = newTasks
        this.tasks$.next(stateTasks)
      })
  }

  deleteTask(todoId: string, taskId: string) {
    return this.http
      .delete<BaseResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks/${taskId}`)
      .pipe(
        map(res => {
          const stateTasks = this.tasks$.getValue()
          const tasksForTodo = stateTasks[todoId]
          const filteredTasks = tasksForTodo.filter(t => t.id !== taskId)
          stateTasks[todoId] = filteredTasks
          return stateTasks
        })
      )
      .subscribe(tasks => {
        this.tasks$.next(tasks)
      })
  }

  updateTask(todoId: string, taskId: string, model: UpdateTaskModel) {
    this.http
      .put<BaseResponse<{ item: Task }>>(
        `${environment.baseUrl}/todo-lists/${todoId}/tasks/${taskId}`,
        model
      )
      .pipe(
        map(() => {
          const stateTasks = this.tasks$.getValue()
          const tasksForTodo = stateTasks[todoId]
          const newTasks = tasksForTodo.map(t => (t.id === taskId ? { ...t, ...model } : t))
          stateTasks[todoId] = newTasks
          return stateTasks
        })
      )
      .subscribe(tasks => {
        this.tasks$.next(tasks)
      })
  }
}
