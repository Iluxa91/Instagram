import { Injectable } from '@angular/core'
import { environment } from '../../../environment/environment'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { User, UsersResponse } from '../models/users.model'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<User[]> {
    return this.http
      .get<UsersResponse>(`${environment.baseNetworkUrl}/users?page=${page}`)
      .pipe(map(el => el.items))
  }
}
