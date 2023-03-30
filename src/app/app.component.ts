import { Component } from '@angular/core'

@Component({
  selector: 'inst-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  appTitle = 'instagram'

  text = 'start value'

  changeTextHandler(e: Event) {
    this.text = (e.currentTarget as HTMLInputElement).value
  }
}
