import { PokemonDto } from './pokemon-dto';
import { TrainerDto } from './trainer-dto';

export type TrainerModel = TrainerDto & { pokemon: PokemonDto };
