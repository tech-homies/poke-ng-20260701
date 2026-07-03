import { inject, Service } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TrainersApi } from '../services/api/trainers-api';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { TrainerModel } from '../services/api/trainer-model';
import { PokemonsApi } from '../services/api/pokemons-api';
import { AddTrainerDto } from '../services/api/add-trainer-dto';

@Service()
export class TrainersStore {
  private trainersApi = inject(TrainersApi);
  private pokemonsApi = inject(PokemonsApi);

  private readonly _trainersResource = rxResource({
    stream: () => this.trainersApi.getAllWithFavoritePokemon(),
    defaultValue: [],
  });

  public readonly trainersResource = this._trainersResource.asReadonly();

  public addTrainer(trainer: AddTrainerDto): Observable<TrainerModel> {
    return forkJoin([this.trainersApi.add(trainer), this.pokemonsApi.getPokemonById(trainer.favoritePokemon)]).pipe(
      map(([trainer, pokemon]): TrainerModel => ({ ...trainer, pokemon })),
      tap(newTrainer => this._trainersResource.update(v => [...v, newTrainer]))
    );
  }

  public removeTrainer(trainer: TrainerModel): Observable<void> {
    return this.trainersApi
      .delete(trainer.id)
      .pipe(tap(() => this._trainersResource.update(trainers => trainers.filter(t => t.id !== trainer.id))));
  }
}
