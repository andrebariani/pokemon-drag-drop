import { Pokemon } from "./pokemon.model";

export interface NestedListPokemon {
    content: Pokemon;
    type?: string;
    label?: string;
    children?: NestedListPokemon[];
  }