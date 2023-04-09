import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ParentComponent } from './parent/parent.component'
import { ChildComponent } from './parent/child/child.component'
import { TodosComponent } from './components/todos/todos.component'
import { HttpClientModule } from '@angular/common/http'
import { LoginComponent } from './components/login/login/login.component'
import { ProfileComponent } from './components/profile/profile.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { UsersComponent } from './components/users/users.component'
import { HomeComponent } from './components/home/home.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    TodosComponent,
    LoginComponent,
    ProfileComponent,
    PageNotFoundComponent,
    UsersComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'todos', component: TodosComponent },
      { path: 'users', component: UsersComponent },
      { path: 'profile', component: ProfileComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
