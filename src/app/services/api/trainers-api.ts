import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrainerDto } from './trainer-dto';
import { Observable } from 'rxjs';

@Service()
export class TrainersApi {
  private http = inject(HttpClient);

  public getAll(): Observable<TrainerDto[]> {
    return this.http.get<TrainerDto[]>('http://localhost:3000/trainers');
  }

  public delete(trainerId: TrainerDto['id']): Observable<void> {
    return this.http.delete<void>('http://localhost:3000/trainers/' + trainerId);
  }
}
