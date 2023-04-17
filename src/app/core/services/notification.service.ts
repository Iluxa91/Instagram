import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Notify } from '../models/core.model'

@Injectable()
export class NotificationService {
  notify$ = new BehaviorSubject<null | Notify>(null)

  handleError(message: string) {
    this.notify$.next({ message, severity: 'error' })
  }

  handleSuccess(message: string) {
    this.notify$.next({ message, severity: 'success' })
  }

  clear() {
    this.notify$.next(null)
  }
}
