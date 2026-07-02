import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from, map, of, tap } from 'rxjs';
import { Nav } from './layout/nav/nav';

@Component({
  selector: 'app-root',
  imports: [Nav],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
