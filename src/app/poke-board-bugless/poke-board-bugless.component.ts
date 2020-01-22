import { Component, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { Pokemon } from '../models/pokemon.model';

interface NestedListPokemon {
  content: Pokemon
  children?: NestedListPokemon[];
}

@Component({
  selector: 'app-poke-board-bugless',
  templateUrl: './poke-board-bugless.component.html',
  styleUrls: ['./poke-board-bugless.component.css']
})
export class PokeBoardBuglessComponent implements OnInit {

  pokemonBoard: Array<NestedListPokemon> = [];
  dropzoneTypes: string[] = ["pokemon", "pokeBox"];

  constructor() { }

  ngOnInit() {
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
}
