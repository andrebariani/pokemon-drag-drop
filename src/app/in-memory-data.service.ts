import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { NestedListPokemon } from './models/nested-list-pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const pokemons = Array<NestedListPokemon>();
    return pokemons;
  }

  constructor() { }
}
