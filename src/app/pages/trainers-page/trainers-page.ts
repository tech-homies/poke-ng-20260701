import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TrainersList } from './trainers-list/trainers-list';
import { TrainerModel } from '../../services/api/trainer-model';
import { AddTrainerDialog } from './add-trainer-dialog/add-trainer-dialog';
import { TrainersStore } from '../../store/trainers.store';

@Component({
  selector: 'app-trainers-page',
  imports: [TrainersList, MatButtonModule, MatIconModule],
  templateUrl: './trainers-page.html',
  styleUrl: './trainers-page.css',
})
export class TrainersPage {
  private dialog = inject(MatDialog);
  private trainersStore = inject(TrainersStore);

  public trainersResource = this.trainersStore.trainersResource;

  protected removeTrainer(trainer: TrainerModel) {
    this.trainersStore.removeTrainer(trainer).subscribe();
  }

  protected openAddTrainerDialog(): void {
    this.dialog.open(AddTrainerDialog);
  }
}
