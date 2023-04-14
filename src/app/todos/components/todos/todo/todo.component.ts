import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Todo } from '../../../models/todos.model'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: Todo
  @Output() removeTodoEvent = new EventEmitter<string>()
  @Output() changeTitleEvent = new EventEmitter<{ newTitle: string; todoId: string }>()

  newTitle = ''

  isEditMode = false

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
}
