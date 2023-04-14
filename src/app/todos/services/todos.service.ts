import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs'
import { environment } from '../../../environment/environment'
import { BeautyLoggerService } from '../../core/services/beauty-logger.service'
import { Todo } from '../models/todos.model'
import { BaseResponse } from '../../core/models/core.model'

@Injectable()
export class TodosService {
  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([])

  constructor(private http: HttpClient, private beautyLoggerService: BeautyLoggerService) {}

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  createTodo(title: string) {
    this.http
      .post<BaseResponse<{ item: Todo }>>(`${environment.baseUrl}/todo-lists`, { title })
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(res => {
          const newTodo = res.data.item
          const stateTodos = this.todos$.getValue()
          return [newTodo, ...stateTodos]
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  deleteTodo(todoId: string) {
    this.http
      .delete<BaseResponse>(`${environment.baseUrl}/todo-lists/${todoId}`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(() => {
          return this.todos$.getValue().filter(tl => tl.id !== todoId)
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  updateTodoTitle(data: { newTitle: string; todoId: string }) {
    this.http
      .put<BaseResponse>(`${environment.baseUrl}/todo-lists/${data.todoId}`, {
        title: data.newTitle,
      })
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(() => {
          return this.todos$
            .getValue()
            .map(tl => (tl.id === data.todoId ? { ...tl, title: data.newTitle } : tl))
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  private errorHandler(err: HttpErrorResponse) {
    this.beautyLoggerService.log(err.message, 'error')
    return EMPTY
  }
}
