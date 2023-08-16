import { Routes } from '@angular/router'
import { AuthGuard } from '../shared/guard/auth.guard'

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('../shared/pages/login/login.page').then((m) => m.LoginPage),
  },
]
