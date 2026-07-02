export type TrainerDto = {
  id: number;
  name: string;
  avatarUrl: string;
  description: string;
  age: number;
  hometown: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'master';
  favoritePokemon: number;
};
