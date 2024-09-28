import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.auth.isLoggedIn().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        return true
      } else {
        return this.router.navigate(['/', 'login'])
      }
    })
  }
}
