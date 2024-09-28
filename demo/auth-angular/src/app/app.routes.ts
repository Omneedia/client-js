import { Routes } from '@angular/router'
import { LoginComponent } from '../shared/login.component'
import { SecureComponent } from './pages/secure/secure.component'
import { AuthGuard } from '../shared/guards/auth.guard'

export const routes: Routes = [
  { path: '', redirectTo: 'secure', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'secure', component: SecureComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'secure' },
]
