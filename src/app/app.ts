import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
