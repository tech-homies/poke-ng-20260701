import { Component, inject } from '@angular/core';
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
export class TrainerPage {
  private trainersAPI = inject(TrainersApi);
  private route = inject(ActivatedRoute);
  private params = toSignal(this.route.params);

  // TODO: test d'export de la resource depuis le service
  protected readonly trainer = httpResource(() => `${this.trainersAPI.resourceUrl}/${this.params()?.['id']}`);
}
