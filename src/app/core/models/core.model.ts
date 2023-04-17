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

export interface LoginRequest {
  email: string
  password: string
  rememberMe: boolean
}

export type SeverityType = 'info' | 'success' | 'error' | 'warning'

export interface Notify {
  message: string
  severity: SeverityType
}
