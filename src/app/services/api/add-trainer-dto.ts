import { TrainerDto } from './trainer-dto';

export type AddTrainerDto = Omit<TrainerDto, 'id'>;
