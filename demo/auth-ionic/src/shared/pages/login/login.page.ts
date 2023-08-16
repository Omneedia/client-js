import { Component, OnInit, Renderer2 } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, IonicModule, CommonModule, FormsModule],
})
export class LoginPage implements OnInit {
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}
  credentials = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  isLoading: boolean = false
  listenerFn: any
  get email() {
    return this.credentials.controls.email
  }
  get password() {
    return this.credentials.controls.password
  }
  ngOnDestroy() {
    this.listenerFn()
  }
  ngOnInit() {
    this.listenerFn = () => {}
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/home'])
    }
    this.listenerFn = this.renderer.listen('document', 'visibilitychange', () => {
      if (document.hidden) {
        this.isLoading = true
      } else {
        setTimeout(() => {
          this.isLoading = false
        }, 3000)
      }
    })
  }
  getMagicLink() {}
  forgotPw() {}
  loginByGoogle() {
    this.isLoading = true
    this.auth.signInWithProvider({
      provider: 'google',
    })
  }
  async login() {}
}
