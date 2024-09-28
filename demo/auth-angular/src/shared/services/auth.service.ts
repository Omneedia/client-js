import { createClient, OmneediaClient } from '@omneedia/client-js'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated$ = new BehaviorSubject<boolean>(false)
  private omneedia: OmneediaClient

  constructor(private router: Router) {
    this.omneedia = createClient(environment.omneediaUrl, environment.omneediaKey)
    this.checkAuthState()
  }

  private checkAuthState() {
    const session = this.omneedia.auth.getSession()
    if (session.getUser()) this.updateAuthState(session.getUser().aud === 'authenticated')
    this.omneedia.auth.onAuthStateChange((event: string, session: any) => {
      setTimeout(async () => {
        //console.log(session)
        switch (event) {
          case 'SIGNED_OUT':
            this.updateAuthState(false)
            break
          case 'SIGNED_IN':
          case 'AUTHENTICATED':
            this.updateAuthState(true)
            break
          default:
            this.updateAuthState(false)
        }
      }, 0)
    })
  }

  private updateAuthState(isAuthenticated: boolean) {
    this.isAuthenticated$.next(isAuthenticated)
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated$.asObservable()
  }

  async signIn() {
    return this.omneedia.auth.signInWithProvider({
      provider: 'cerema',
      config: {
        callback: location.href,
      },
    })
  }

  async signOut() {
    await this.omneedia.auth.signOut()
  }

  async getUser() {
    return this.omneedia.auth.getUser()
  }
}
