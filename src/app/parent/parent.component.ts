import { Component, OnInit } from '@angular/core'
import { ValueService } from '../services/value.service'
import { Observable } from 'rxjs'
import { BeatyLoggerService } from '../services/beaty-logger.service'

interface Fruit {
  id: number
  name: string
  price: number
}
@Component({
  selector: 'inst-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit {
  value$ = new Observable()

  constructor(private valueService: ValueService, private beautyLogger: BeatyLoggerService) {}

  fruits: Fruit[] = [
    { id: 1, name: 'apple', price: 10 },
    { id: 2, name: 'orange', price: 20 },
    { id: 3, name: 'watermelon', price: 30 },
    { id: 4, name: 'banana', price: 5 },
    { id: 5, name: 'pears', price: 12 },
    { id: 6, name: 'raspberries', price: 18 },
    { id: 7, name: 'avocados', price: 14 },
    { id: 8, name: 'mangoes', price: 3 },
    { id: 9, name: 'kiwifruit', price: 7 },
  ]

  ngOnInit() {
    // this.valueService.value$.subscribe(value => {
    //   this.value = value
    // })
    this.value$ = this.valueService.value$
  }

  incValueHandler() {
    this.valueService.inc()
    this.beautyLogger.log('inc value', 'success')
  }

  decValueHandler() {
    this.valueService.dec()
    this.beautyLogger.log('dec value', 'warning')
  }
}
