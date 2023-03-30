import { Component } from '@angular/core'
interface Lessons {
  id: number
  title: string
  weekGrades: Week[]
}

interface Week {
  id: number
  gradeItem: number
}
@Component({
  selector: 'inst-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent {
  lessons: Lessons[] = [
    {
      id: 0,
      title: 'math',
      weekGrades: [
        {
          id: 0,
          gradeItem: 6,
        },
        {
          id: 1,
          gradeItem: 5,
        },
        {
          id: 2,
          gradeItem: 4,
        },
      ],
    },
    {
      id: 1,
      title: 'phys',
      weekGrades: [
        {
          id: 0,
          gradeItem: 3,
        },
        {
          id: 1,
          gradeItem: 4,
        },
        {
          id: 2,
          gradeItem: 1,
        },
      ],
    },
  ]

  isLoading = true

  isSuccess = false

  constructor() {
    setTimeout(() => {
      this.isLoading = false
      this.isSuccess = true
    }, 3000)
  }

  value = ''
}
