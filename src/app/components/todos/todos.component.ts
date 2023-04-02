import { Component, OnInit } from '@angular/core'
import { Todo, TodosService } from '../../services/todos.service'

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = []

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.getTodos()
  }

  getTodos() {
    this.todosService.getTodos().subscribe(res => {
      this.todos = res
    })
  }

  createTodo() {
    const random = Math.floor(Math.random() * 100)
    const title = 'angular ' + random
    this.todosService.createTodo(title).subscribe(res => {
      const newTodo = res.data.item
      this.todos.unshift(newTodo)
    })
  }

  deleteTodo() {
    const todoId = 'fa40d910-e3c1-40ee-8f0b-04e232eb5275'
    this.todosService.deleteTodo(todoId).subscribe(() => {
      this.todos = this.todos.filter(tl => tl.id !== todoId)
    })
  }
}
