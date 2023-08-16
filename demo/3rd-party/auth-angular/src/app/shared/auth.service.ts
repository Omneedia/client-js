import { Injectable } from '@angular/core'
import { createClient } from '../../../../../dist/module/index'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private omneedia: any
  constructor() {
    this.omneedia = createClient(environment.OMNEEDIA_URL, environment.OMNEEDIA_KEY)
  }
  get session() {}
  public async isLoggedIn() {}
}
