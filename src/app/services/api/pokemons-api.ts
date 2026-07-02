import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PokemonDto } from './pokemon-dto';

@Service()
export class PokemonsApi {
  private http = inject(HttpClient);

  getPokemonById(id: PokemonDto['pokedex_id']): Observable<PokemonDto> {
    return this.http.get<PokemonDto>(`http://localhost:3000/pokemons/${id}`);
  }
}
