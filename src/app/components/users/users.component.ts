import { Component, OnInit } from '@angular/core'
import { User, UsersService } from '../../services/users.service'
import { Observable } from 'rxjs'
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'inst-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$!: Observable<User[]>
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.getUsers(params['page'] ? params['page'] : 1)
    })
  }

  getUsers(page: number) {
    this.users$ = this.usersService.getUsers(page)
  }

  nextUsersHandler() {
    const page = Number(this.route.snapshot.queryParamMap.get('page'))
    const nextPage = page ? page + 1 : 2
    this.router.navigateByUrl(`/users?page=${nextPage}`)
  }
}
