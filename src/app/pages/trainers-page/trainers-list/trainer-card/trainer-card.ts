import { Component, computed, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TrainerModel } from '../../../../services/api/trainer-model';

const LEVEL_BADGE_CLASSES: Record<TrainerModel['level'], string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-blue-100 text-blue-800',
  advanced: 'bg-orange-100 text-orange-800',
  master: 'bg-purple-100 text-purple-800',
};

@Component({
  selector: 'app-trainer-card',
  imports: [NgOptimizedImage],
  templateUrl: './trainer-card.html',
  styleUrl: './trainer-card.css',
})
export class TrainerCard {
  readonly trainer = input.required<TrainerModel>();
  readonly deleted = output();

  readonly levelLabel = computed(() => {
    const level = this.trainer().level;
    return level.charAt(0).toUpperCase() + level.slice(1);
  });

  readonly levelBadgeClasses = computed(() => LEVEL_BADGE_CLASSES[this.trainer().level]);

  protected delete(): void {
    this.deleted.emit();
  }
}
