import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { TrainersApi } from '../../services/api/trainers-api';
import { TrainerDto } from '../../services/api/trainer-dto';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-trainers-page',
  imports: [],
  templateUrl: './trainers-page.html',
  styleUrl: './trainers-page.css',
})
export class TrainersPage implements OnInit {
  private trainersAPI = inject(TrainersApi);

  public trainers = signal<TrainerDto[]>([]);

  ngOnInit(): void {
    this.trainersAPI.getAll().subscribe((trainers) => {
      this.trainers.set(trainers);
    });
  }
}
