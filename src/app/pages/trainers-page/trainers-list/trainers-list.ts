import { Component, input, output } from '@angular/core';
import { TrainerCard } from './trainer-card/trainer-card';
import { TrainerModel } from '../../../services/api/trainer-model';

@Component({
  selector: 'app-trainers-list',
  imports: [TrainerCard],
  templateUrl: './trainers-list.html',
  styleUrl: './trainers-list.css',
})
export class TrainersList {
  readonly trainers = input<TrainerModel[]>([]);
  readonly trainerDeleted = output<TrainerModel>();

  protected removeTrainerFromList(trainer: TrainerModel) {
    this.trainerDeleted.emit(trainer);
  }
}
