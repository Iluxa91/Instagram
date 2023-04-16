import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DomainTodo, FilterType } from '../../../models/todos.model'
import { TodosService } from '../../../services/todos.service'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: DomainTodo
  @Output() removeTodoEvent = new EventEmitter<string>()
  @Output() changeTitleEvent = new EventEmitter<{ newTitle: string; todoId: string }>()

  newTitle = ''

  isEditMode = false

  constructor(private todosService: TodosService) {}

  removeTodoHandler() {
    this.removeTodoEvent.emit(this.todo.id)
  }

  activateEditTitle() {
    this.isEditMode = true
    this.newTitle = this.todo.title
  }

  deactivateEditMode() {
    this.isEditMode = false
    this.changeTitleEvent.emit({ newTitle: this.newTitle, todoId: this.todo.id })
  }

  changeFilter(filter: FilterType) {
    this.todosService.changeFilter({ filter, todoId: this.todo.id })
  }
}
