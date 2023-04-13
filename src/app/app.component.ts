import { Component, OnInit } from '@angular/core'
import { AuthService } from './core/services/auth.service'

@Component({
  selector: 'tl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  appTitle = 'instagram'

  text = 'start value'

  constructor(private authService: AuthService) {}

  changeTextHandler(e: Event) {
    this.text = (e.currentTarget as HTMLInputElement).value
  }

  ngOnInit(): void {
    this.authService.me()
    console.log('1')
  }
}
