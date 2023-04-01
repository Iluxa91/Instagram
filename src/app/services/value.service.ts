import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  value$ = new BehaviorSubject<number>(0)

  inc() {
    this.value$.next(this.value$.getValue() + 1)
  }

  dec() {
    this.value$.next(this.value$.getValue() - 1)
  }
}
