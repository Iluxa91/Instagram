import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Notify } from '../../../core/models/core.model'
import { NotificationService } from '../../../core/services/notification.service'

@Component({
  selector: 'tl-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
})
export class NotifyComponent implements OnInit {
  notification$?: Observable<null | Notify>

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // subscribe
    this.notification$ = this.notificationService.notify$
  }

  closeNotification() {
    this.notificationService.clear()
  }
}
