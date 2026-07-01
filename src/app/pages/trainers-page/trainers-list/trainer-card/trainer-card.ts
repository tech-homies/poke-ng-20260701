import { Component, input } from '@angular/core';
import { TrainerDto } from '../../../../services/api/trainer-dto';

@Component({
  selector: 'app-trainer-card',
  imports: [],
  templateUrl: './trainer-card.html',
  styleUrl: './trainer-card.css',
})
export class TrainerCard {
  readonly trainer = input.required<TrainerDto>();
}
