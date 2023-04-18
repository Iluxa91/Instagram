import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'tl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    //   email: new FormControl<string>('', {
    //     nonNullable: true,
    //     validators: [
    //       Validators.required,
    //       Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$'),
    //     ],
    //   }),
    //   password: new FormControl<string>('', {
    //     nonNullable: true,
    //     validators: [Validators.required, Validators.minLength(3)],
    //   }),
    //   rememberMe: new FormControl<boolean>(false, {
    //     nonNullable: true,
    //     validators: [Validators.required, Validators.minLength(3)],
    //   }),
  })
  constructor(private authService: AuthService) {}

  onLoginSubmit() {
    this.authService.login(this.loginForm.value)
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }
}
