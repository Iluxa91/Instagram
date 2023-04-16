import { Component, OnInit } from '@angular/core'
import { TodosService } from '../../services/todos.service'
import { Observable } from 'rxjs'
import { DomainTodo } from '../../models/todos.model'

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$!: Observable<DomainTodo[]>

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

  deleteTodo(todoId: string) {
    this.todosService.deleteTodo(todoId)
  }

  changeTitle(data: { newTitle: string; todoId: string }) {
    this.todosService.updateTodoTitle(data)
  }
}
