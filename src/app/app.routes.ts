import { Routes } from '@angular/router';
import { TrainersPage } from './pages/trainers-page/trainers-page';

export const routes: Routes = [
  { path: '', redirectTo: 'trainers', pathMatch: 'full' },
  { path: 'trainers', component: TrainersPage },
  { path: '**', redirectTo: '' },
];
