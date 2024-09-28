import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../shared/services/auth.service'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-secure',
  imports: [JsonPipe],
  standalone: true,
  template: `
    <div class="secure">
      <h2>Secure Page</h2>
      <div id="info">{{ user | json }}</div>
      <button (click)="logout()">Sign Out</button>
    </div>
  `,
})
export class SecureComponent implements OnInit {
  user: any

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.user = await this.authService.getUser()
    console.log(this.user)
  }

  async logout() {
    await this.authService.signOut()
  }
}
