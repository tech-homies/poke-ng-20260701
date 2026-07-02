import { Component, inject, OnInit, signal } from '@angular/core';
import { TrainersApi } from '../../services/api/trainers-api';
import { TrainerDto } from '../../services/api/trainer-dto';
import { TrainersList } from './trainers-list/trainers-list';

@Component({
  selector: 'app-trainers-page',
  imports: [TrainersList],
  templateUrl: './trainers-page.html',
  styleUrl: './trainers-page.css',
})
export class TrainersPage implements OnInit {
  private trainersAPI = inject(TrainersApi);

  public trainers = signal<TrainerDto[]>([]);

  ngOnInit(): void {
    this.trainersAPI.getAll().subscribe(trainers => {
      this.trainers.set(trainers);
    });
  }

  protected removeTrainer(trainer: TrainerDto) {
    this.trainersAPI.delete(trainer.id).subscribe(() => {
      this.trainers.update(trainers => trainers.filter(t => t.id !== trainer.id));
    });
  }
}
