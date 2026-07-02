import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TrainersApi } from '../../services/api/trainers-api';
import { TrainersList } from './trainers-list/trainers-list';
import { TrainerModel } from '../../services/api/trainer-model';
import { AddTrainerDialog } from './add-trainer-dialog/add-trainer-dialog';

@Component({
  selector: 'app-trainers-page',
  imports: [TrainersList, MatButtonModule, MatIconModule],
  templateUrl: './trainers-page.html',
  styleUrl: './trainers-page.css',
})
export class TrainersPage implements OnInit {
  private trainersAPI = inject(TrainersApi);
  private dialog = inject(MatDialog);

  public trainers = signal<TrainerModel[]>([]);

  ngOnInit(): void {
    this.trainersAPI.getAllWithFavoritePokemon().subscribe(trainers => {
      this.trainers.set(trainers);
    });
  }

  protected removeTrainer(trainer: TrainerModel) {
    this.trainersAPI.delete(trainer.id).subscribe(() => {
      this.trainers.update(trainers => trainers.filter(t => t.id !== trainer.id));
    });
  }

  protected openAddTrainerDialog(): void {
    this.dialog.open(AddTrainerDialog);
  }
}
