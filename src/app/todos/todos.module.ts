import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TodosRoutingModule } from './todos-routing.module'
import { TodosComponent } from './components/todos/todos.component'
import { TodosService } from './services/todos.service'
import { TodoComponent } from './components/todos/todo/todo.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [TodosComponent, TodoComponent],
  imports: [CommonModule, TodosRoutingModule, FormsModule],
  providers: [TodosService],
})
export class TodosModule {}
