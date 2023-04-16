import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task, UpdateTaskModel } from '../../../../../models/updateTaskModel'
import { TaskStatus } from '../../../../../../core/enums/core.enums'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() removeTaskEvent = new EventEmitter<{ todoId: string; taskId: string }>()
  @Output() updateTaskEvent = new EventEmitter<{
    todoId: string
    taskId: string
    model: UpdateTaskModel
  }>()

  taskStatus = TaskStatus
  editMode = false
  newTitle = ''

  removeTaskHandler() {
    this.removeTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id })
  }

  changeTaskStatus(event: MouseEvent) {
    const isChecked = (event.currentTarget as HTMLInputElement).checked
    this.changeTask({ status: isChecked ? TaskStatus.completed : TaskStatus.active })
  }

  activateEditMode() {
    this.editMode = true
    this.newTitle = this.task.title
  }

  deactivateEditMode() {
    this.editMode = false
    this.changeTask({ title: this.newTitle })
    this.newTitle = ''
  }

  changeTask(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      status: this.task.status,
      completed: this.task.completed,
      title: this.task.title,
      deadLine: this.task.deadLine,
      description: this.task.description,
      priority: this.task.priority,
      startDate: this.task.startDate,
      ...patch,
    }
    this.updateTaskEvent.emit({
      todoId: this.task.todoListId,
      taskId: this.task.id,
      model,
    })
  }
}
