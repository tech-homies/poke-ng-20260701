export type PokemonDto = {
  pokedex_id: number;
  generation: number;

  category: string;

  name: { fr: string; en: string; jp: string };

  sprites: {
    regular: string;
    shiny: string | null;
    gmax: {
      regular: string;
      shiny: string | null;
    } | null;
  };

  //types: PokemonType['id'][];

  //talents: Talent[];

  //stats: Stats;

  //resistances: Resistance[];

  evolution: {
    pre: { pokedex_id: number; name: string; condition: string }[];
    next: { pokedex_id: number; name: string; condition: string }[];
    mega: { orbe: string; sprites: { regular: string; shiny: string } }[];
  };

  height: string;

  weight: string;

  egg_groups: string[];

  //sexe: SexeRate | null;

  catch_rate: number;

  level_100: number;

  formes: {
    region: string;
    name: { fr: string; en: string; jp: string };
  }[];
};
