import { Component } from '@angular/core'
import { AuthService } from './services/auth.service'
import { Router } from '@angular/router'

@Component({
  standalone: true,
  template: `<button (click)="login()">Sign In</button> `,
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/secure'])
      }
    })
  }
  login() {
    this.authService.signIn()
  }
}
