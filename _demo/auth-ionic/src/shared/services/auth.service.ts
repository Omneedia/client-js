import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { OmneediaClient, createClient } from '../../../../../dist/module'
import { environment } from 'src/environments/environment'
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private omneedia: OmneediaClient
  private authenticated: boolean = false

  private currentUser: any
  constructor(private router: Router) {
    /**
     * event: SIGNED_IN | SIGNED_OUT
     */
    this.omneedia = createClient(environment.omneediaUrl, environment.omneediaKey)
    this.omneedia.auth.onAuthStateChange((event: any, sess: any) => {
      console.log(event)
      console.log(sess)
      if (event === 'SIGNED_IN') {
        this.authenticated = true
        this.currentUser = this.currentUser
        location.href = '/home'
      }
      if (event === 'SIGNED_OUT') {
        this.authenticated = true
        this.currentUser = this.currentUser
        location.href = '/login'
      }
    })
    this.loadUser()
  }
  signInWithProvider(provider: any) {
    return this.omneedia.auth.signInWithProvider(provider)
  }
  loadUser() {
    if (this.currentUser?.value) {
      return
    }
    const user = this.omneedia.auth.session().getUser()
    if (user.user_metadata) {
      this.authenticated = true
      this.currentUser = user.user_metadata
    } else {
      this.currentUser = false
    }
  }
  get session() {
    return this.omneedia.auth.session().getUser()
  }
  signIn(provider: any) {
    return this.omneedia.auth.signInWithProvider(provider)
  }
  logout() {
    return this.omneedia.auth.signOut()
  }
  isAuthenticated(): boolean {
    return this.authenticated
  }
}
