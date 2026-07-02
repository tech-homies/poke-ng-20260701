import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-trainer-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './add-trainer-dialog.html',
})
export class AddTrainerDialog {}
