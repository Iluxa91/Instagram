import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environment/environment'
import { BaseResponse, MeResponse } from '../models/core.model'
import { ResultCodes } from '../enums/core.enums'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {
  isAuth = false

  constructor(private http: HttpClient, private router: Router) {}

  me() {
    this.http
      .get<BaseResponse<MeResponse>>(`${environment.baseNetworkUrl}/auth/me`)
      .subscribe(res => {
        if (res.resultCode === ResultCodes.success) {
          this.isAuth = true
        }
      })
  }

  login(data: any) {
    this.http
      .post<BaseResponse<{ userId: number }>>(`${environment.baseNetworkUrl}/auth/login`, data)
      .subscribe(res => {
        if (res.resultCode === ResultCodes.success) {
          this.isAuth = true
          this.router.navigate(['/'])
        }
      })
  }

  logout() {
    this.http.delete<BaseResponse>(`${environment.baseNetworkUrl}/auth/login`).subscribe(res => {
      if (res.resultCode === ResultCodes.success) {
        this.isAuth = true
        this.router.navigate(['/login'])
      }
    })
  }
}
