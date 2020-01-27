import { Component, OnInit } from '@angular/core';

import { DndDropEvent, DropEffect } from 'ngx-drag-drop';

import { Pokemon } from '../models/pokemon.model';
import { NestedListPokemon } from '../models/nested-list-pokemon.model';
import { PokeBoardService } from './poke-board.service';

@Component({
  selector: 'app-poke-board',
  templateUrl: './poke-board.component.html',
  styleUrls: ['./poke-board.component.css']
})
export class PokeBoardComponent implements OnInit {

  pokeBox: NestedListPokemon = {content: new Pokemon(), label: "", children: []};
  pokemonBoard: Array<NestedListPokemon> = [];
  dropzoneTypes: string[] = ["pokemon", "pokeBox"];
  saveHidden = true;

  constructor(private pokeBoardService: PokeBoardService) { }

  ngOnInit() { 
    this.pokeBoardService.getPokemons().subscribe( {
      next: pokemons => { this.pokemonBoard = pokemons },
    error: err => "Uh oh..."
    });
  }

  onDragged(item: any, list?: any[], effect?: DropEffect) {
    if( effect === "move" ) {
      const index = list.indexOf( item );

      list.splice( index, 1 );
    }
  }

  onDrop(event: DndDropEvent, list?: any[], effect?: DropEffect) {
    let index = event.index;
    if (typeof index === 'undefined') {
      index = list.length;
    }

    if(typeof event.data.content === 'undefined') {
      let newPoke = {content: event.data};
      list.splice( index, 0, newPoke );
    } else {
      list.splice( index, 0, event.data );
    }
    
  }

  onCapturedPokemon(p: Pokemon) : void {
    let newPoke = {content: p};
    this.pokemonBoard.push(newPoke);
  }

  save(): void {
    this.saveHidden = !this.saveHidden;
    console.log("It's lying, nothing is saved!");
  }


}
