import { Component, inject, OnInit, signal } from '@angular/core';
import { TrainersApi } from '../../services/api/trainers-api';
import { TrainersList } from './trainers-list/trainers-list';
import { TrainerModel } from '../../services/api/trainer-model';

@Component({
  selector: 'app-trainers-page',
  imports: [TrainersList],
  templateUrl: './trainers-page.html',
  styleUrl: './trainers-page.css',
})
export class TrainersPage implements OnInit {
  private trainersAPI = inject(TrainersApi);

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
}
