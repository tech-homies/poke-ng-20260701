import { TestBed } from '@angular/core/testing';

import { TrainersStore } from './trainers.store';

describe('TrainersStore', () => {
  let service: TrainersStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainersStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
