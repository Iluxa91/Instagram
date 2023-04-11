import { Injectable } from '@angular/core'
import { environment } from '../../../environment/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface ProfileResponse {
  aboutMe?: string
  contacts: Contacts
  lookingForAJob: boolean
  lookingForAJobDescription?: string
  fullName: string
  userId: number
  photos: {
    small?: string
    large?: string
  }
}

export interface Contacts {
  facebook?: any
  website: any
  vk?: any
  twitter?: any
  instagram?: any
  youtube?: any
  github?: any
  mainLink?: any
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUsers(userId: number): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${environment.baseNetworkUrl}/profile/${userId}`)
  }
}
