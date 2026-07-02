import { Component, inject, signal } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddTrainerDto } from '../../../services/api/add-trainer-dto';
import { form, FormField, min, required, validate } from '@angular/forms/signals';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { TrainersApi } from '../../../services/api/trainers-api';

@Component({
  selector: 'app-add-trainer-dialog',
  imports: [MatDialogModule, MatButtonModule, MatInput, FormField, MatFormField, MatLabel, MatSelect, MatOption],
  templateUrl: './add-trainer-dialog.html',
})
export class AddTrainerDialog {
  private newTrainer = signal<AddTrainerDto>({
    name: '',
    age: 10,
    favoritePokemon: 0,
    hometown: 'Lille',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1308977',
    description: 'Poke-Angular trainer',
    level: 'beginner',
  });
  private trainerApi = inject(TrainersApi);

  protected form = form(this.newTrainer, ctx => {
    required(ctx.name);
    min(ctx.age, 5);
    required(ctx.avatarUrl);
    required(ctx.hometown);
    required(ctx.level);
    validate(ctx.level, ({ value }) => {
      if (['beginner', 'intermediate', 'advanced', 'master'].some(l => l === value())) {
        return null;
      } else {
        return {
          kind: 'bad-level',
          message: "Level must be in 'beginner' | 'intermediate' | 'advanced' | 'master'",
        };
      }
    });
    required(ctx.description);
    validate(ctx.avatarUrl, ({ value }) => {
      if (!value().startsWith('https://')) {
        return {
          kind: 'https',
          message: 'URL must start with https://',
        };
      }
      return null;
    });
  });

  protected submitForm(event: SubmitEvent) {
    event.preventDefault();

    this.trainerApi.add(this.newTrainer()).subscribe(trainer => {
      // TODO vendredi
    });
  }
}
