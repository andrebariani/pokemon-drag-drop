import { Pokemon } from "./pokemon.model";

export interface NestedListPokemon {
    content: Pokemon;
    label?: string;
    children?: NestedListPokemon[];
  }