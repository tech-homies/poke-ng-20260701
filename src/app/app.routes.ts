import { Routes } from '@angular/router';
import { TrainersPage } from './pages/trainers-page/trainers-page';
import { TrainerPage } from './pages/trainer-page/trainer-page';

export const routes: Routes = [
  { path: '', redirectTo: 'trainers', pathMatch: 'full' },
  { path: 'trainers', component: TrainersPage },
  { path: 'trainers/:id', component: TrainerPage },
  { path: '**', redirectTo: '' },
];
