import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersList } from './trainers-list';

describe('TrainersList', () => {
  let component: TrainersList;
  let fixture: ComponentFixture<TrainersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainersList],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainersList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
