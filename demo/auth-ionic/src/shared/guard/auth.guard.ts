import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard#canActivate called')
    console.log(this.auth.isAuthenticated())
    if (this.auth.isAuthenticated()) {
      return true
    } else {
      return createUrlTreeFromSnapshot(next, ['/', 'login'])
    }
  }
}
