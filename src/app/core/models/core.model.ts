export interface BaseResponse<T = object> {
  data: T
  messages: string[]
  fieldsErrors: string[]
  resultCode: number
}

export interface MeResponse {
  id: number
  login: string
  email: string
}

export type SeverityType = 'info' | 'success' | 'error' | 'warning'
