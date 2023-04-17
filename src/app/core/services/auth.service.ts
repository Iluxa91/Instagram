import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environment/environment'
import { BaseResponse, LoginRequest, MeResponse } from '../models/core.model'
import { ResultCodes } from '../enums/core.enums'
import { Router } from '@angular/router'
import { NotificationService } from './notification.service'
import { catchError, EMPTY } from 'rxjs'

@Injectable()
export class AuthService {
  isAuth = false

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  resolveAuthRequest: Function = () => {}

  authRequest = new Promise(resolve => {
    this.resolveAuthRequest = resolve
  })

  me() {
    this.http
      .get<BaseResponse<MeResponse>>(`${environment.baseNetworkUrl}/auth/me`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodes.success) {
          this.isAuth = true
        } else {
          this.errorHandler(res.messages[0])
        }
        this.resolveAuthRequest()
      })
  }

  login(data: Partial<LoginRequest>) {
    this.http
      .post<BaseResponse<{ userId: number }>>(`${environment.baseNetworkUrl}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodes.success) {
          this.isAuth = true
          this.router.navigate(['/'])
        } else {
          this.errorHandler(res.messages[0])
        }
      })
  }

  logout() {
    this.http
      .delete<BaseResponse>(`${environment.baseNetworkUrl}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodes.success) {
          this.isAuth = false
          this.router.navigate(['/login'])
        } else {
          this.errorHandler(res.messages[0])
        }
      })
  }

  private errorHandler(message: string) {
    this.notificationService.handleError(message)
    return EMPTY
  }
}
