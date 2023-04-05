import { Component, OnInit } from '@angular/core'
import { Todo, TodosService } from '../../services/todos.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$!: Observable<Todo[]>

  error = ''

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todos$ = this.todosService.todos$
    this.getTodos()
  }

  getTodos() {
    this.todosService.getTodos()
  }

  createTodo() {
    const random = Math.floor(Math.random() * 100)
    const title = 'angular ' + random
    this.todosService.createTodo(title)
  }

  deleteTodo() {
    const todoId = '896d58f9-ee63-446b-999b-2d3734607f96'
    this.todosService.deleteTodo(todoId)
  }
}
