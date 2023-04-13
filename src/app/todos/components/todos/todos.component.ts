import { Component, OnInit } from '@angular/core'
import { TodosService } from '../../services/todos.service'
import { Observable } from 'rxjs'
import { Todo } from '../../models/todos.model'

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$!: Observable<Todo[]>

  todoTitle = ''

  error = ''

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todos$ = this.todosService.todos$
    this.getTodos()
  }

  getTodos() {
    this.todosService.getTodos()
  }

  addTodoHandler() {
    this.todosService.createTodo(this.todoTitle)
    this.todoTitle = ''
  }

  deleteTodo() {
    const todoId = '126c2636-07c5-44a1-90bd-39b087ff8afc'
    this.todosService.deleteTodo(todoId)
  }
}
