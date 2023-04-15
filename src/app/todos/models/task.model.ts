export interface GetTasksResponse {
  items: Task[]
  totalCount: number
  error: string
}

export interface Task {
  id: string
  todoListId: string
  order: number
  addedDate: string
  title: string
  description: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadLine: string
}

export interface DomainTask {
  [key: string]: Task[]
}
