import { Component, inject, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { TrainersApi } from '../../services/api/trainers-api';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-trainer-page',
  imports: [JsonPipe, RouterLink],
  templateUrl: './trainer-page.html',
  styleUrl: './trainer-page.css',
})
export default class TrainerPage {
  private trainersAPI = inject(TrainersApi);
  public readonly id = input(); // from query Params

  // TODO: test d'export de la resource depuis le service
  protected readonly trainer = httpResource(() => `${this.trainersAPI.resourceUrl}/${this.id()}`);
}
