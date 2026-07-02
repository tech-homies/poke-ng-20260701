import { Component, input, output } from '@angular/core';
import { TrainerDto } from '../../../services/api/trainer-dto';
import { TrainerCard } from './trainer-card/trainer-card';

@Component({
  selector: 'app-trainers-list',
  imports: [TrainerCard],
  templateUrl: './trainers-list.html',
  styleUrl: './trainers-list.css',
})
export class TrainersList {
  readonly trainers = input<TrainerDto[]>([]);
  readonly trainerDeleted = output<TrainerDto>();

  protected removeTrainerFromList(trainer: TrainerDto) {
    this.trainerDeleted.emit(trainer);
  }
}
