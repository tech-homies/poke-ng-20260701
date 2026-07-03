import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrainerDto } from './trainer-dto';
import { concatAll, concatMap, filter, map, mergeMap, Observable, toArray } from 'rxjs';
import { TrainerModel } from './trainer-model';
import { PokemonsApi } from './pokemons-api';
import { AddTrainerDto } from './add-trainer-dto';

@Service()
export class TrainersApi {
  private http = inject(HttpClient);
  private pokemonsApi = inject(PokemonsApi);

  public resourceUrl = 'http://localhost:3000/trainers';

  public getAll(): Observable<TrainerDto[]> {
    return this.http.get<TrainerDto[]>(this.resourceUrl);
  }

  public getAllWithFavoritePokemon(): Observable<TrainerModel[]> {
    return this.getAll().pipe(
      concatAll(),
      mergeMap(trainer =>
        this.pokemonsApi.getPokemonById(trainer.favoritePokemon).pipe(map(pokemon => ({ ...trainer, pokemon })))
      ),
      toArray(),
      map(trainers => trainers.sort((a, b) => a.id - b.id))
    );
  }

  public delete(trainerId: TrainerDto['id']): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${trainerId}`);
  }

  public add(trainer: AddTrainerDto): Observable<TrainerDto> {
    return this.http.post<TrainerDto>(this.resourceUrl, trainer);
  }
}
