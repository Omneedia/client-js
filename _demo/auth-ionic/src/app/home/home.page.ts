import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'
import { AuthService } from '../../shared/services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  info: any = {}
  constructor(private readonly auth: AuthService) {}
  ngOnInit() {
    this.info = this.auth.session
  }

  logout() {
    this.auth.logout()
  }
}
