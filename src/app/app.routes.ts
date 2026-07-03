import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'trainers', pathMatch: 'full' },
  { path: 'trainers', loadComponent: () => import('./pages/trainers-page/trainers-page') },
  { path: 'trainers/:id', loadComponent: () => import('./pages/trainer-page/trainer-page') },
  { path: '**', redirectTo: '' },
];
