export interface Todo {
  title: string
  id: string
  addedDate: string
  order: number
}

export interface DomainTodo extends Todo {
  filter: FilterType
}

export type FilterType = 'all' | 'completed' | 'active'
