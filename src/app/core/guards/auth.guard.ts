import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    await this.authService.authRequest

    const isAuth = this.authService.isAuth

    if (!isAuth) {
      this.router.navigate(['/login'], {
        queryParams: {
          isAuth: false,
        },
      })
    }

    return isAuth
  }
}
