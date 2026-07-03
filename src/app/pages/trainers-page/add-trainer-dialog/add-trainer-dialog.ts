import { Component, inject, resource, signal, type ResourceRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddTrainerDto } from '../../../services/api/add-trainer-dto';
import { form, FormField, min, pattern, required, submit, validateAsync } from '@angular/forms/signals';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatHint } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { firstValueFrom } from 'rxjs';
import { TrainersApi } from '../../../services/api/trainers-api';
import { PokemonsApi } from '../../../services/api/pokemons-api';
import { PokemonDto } from '../../../services/api/pokemon-dto';
import { TrainerDto } from '../../../services/api/trainer-dto';
import { TrainersStore } from '../../../store/trainers.store';

@Component({
  selector: 'app-add-trainer-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInput,
    FormField,
    MatFormField,
    MatLabel,
    MatError,
    MatHint,
    MatSelect,
    MatOption,
  ],
  templateUrl: './add-trainer-dialog.html',
})
export class AddTrainerDialog {
  private readonly pokemonsApi = inject(PokemonsApi);
  private readonly trainersStore = inject(TrainersStore);
  private readonly dialogRef: MatDialogRef<AddTrainerDialog> = inject(MatDialogRef);

  protected readonly levels = [
    { value: 'beginner', label: 'Débutant' },
    { value: 'intermediate', label: 'Intermédiaire' },
    { value: 'advanced', label: 'Avancé' },
    { value: 'master', label: 'Maître' },
  ] as const;

  private readonly newTrainer = signal<AddTrainerDto>({
    name: '',
    age: 10,
    favoritePokemon: 0,
    hometown: 'Lille',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1308977',
    description: 'Poke-Angular trainer',
    level: 'beginner',
  });

  // Ressource créée par la factory de validateAsync, exposée pour afficher le pokémon trouvé
  protected pokemonLookup?: ResourceRef<PokemonDto | null | undefined>;

  protected readonly form = form(this.newTrainer, ctx => {
    required(ctx.name, { message: 'Le nom est requis' });
    min(ctx.age, 5, { message: 'Un dresseur doit avoir au moins 5 ans' });
    required(ctx.hometown, { message: 'Le domicile est requis' });
    required(ctx.description, { message: 'La description est requise' });
    required(ctx.level, { message: 'Le niveau est requis' });
    required(ctx.avatarUrl, { message: "L'URL de l'avatar est requise" });
    pattern(ctx.avatarUrl, /^https:\/\//, { message: "L'URL doit commencer par https://" });
    min(ctx.favoritePokemon, 1, { message: 'Renseignez un numéro de Pokédex (1 ou plus)' });
    validateAsync(ctx.favoritePokemon, {
      params: ({ value }) => value(),
      debounce: 300,
      factory: params => {
        this.pokemonLookup = resource({
          params,
          loader: ({ params: pokedexId }) => this.findPokemon(pokedexId),
        });
        return this.pokemonLookup;
      },
      onSuccess: pokemon =>
        pokemon ? undefined : { kind: 'unknown-pokemon', message: "Ce numéro n'existe pas dans le Pokédex" },
      onError: () => ({ kind: 'pokedex-unavailable', message: 'Vérification impossible : le Pokédex ne répond pas' }),
    });
  });

  protected favoritePokemonName(): string | undefined {
    const lookup = this.pokemonLookup;
    return lookup?.hasValue() ? lookup.value()?.name.fr : undefined;
  }

  protected submitForm(event: SubmitEvent): void {
    // Neutralise la soumission HTML native (qui rechargerait la page) : c'est Angular qui pilote
    event.preventDefault();

    // submit() des Signal Forms : marque tous les champs comme touched (les erreurs s'affichent),
    // n'exécute le callback que si le formulaire est valide (validations async comprises),
    // et passe form().submitting() à true pendant l'exécution (bouton désactivé dans le template).
    // Retourner un objet { kind, message } depuis le callback attache une erreur serveur au formulaire.
    submit(this.form, async () => {
      try {
        const trainer = await firstValueFrom(this.trainersStore.addTrainer(this.newTrainer()));
        this.dialogRef.close(trainer);
        return undefined;
      } catch {
        return { kind: 'submit-failed', message: "L'ajout du dresseur a échoué, réessayez plus tard" };
      }
    });
  }

  // Un 404 signifie « pokémon inconnu » : on le distingue d'une vraie erreur technique
  private async findPokemon(pokedexId: number): Promise<PokemonDto | null> {
    try {
      return await firstValueFrom(this.pokemonsApi.getPokemonById(pokedexId));
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return null;
      }
      throw error;
    }
  }
}
