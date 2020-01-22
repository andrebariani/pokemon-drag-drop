import { Component, OnInit } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';

import { Pokemon } from '../models/pokemon.model';
import { PokeListService } from './poke-list.service';

interface NestedListPokemon {
  content: Pokemon;
  children?: NestedListPokemon[];
}
@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {

  draggable = {
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false,
    type: "pokemon"
  };

  dragBox = {
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false,
    type: "pokeBox"
  };  

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredPokemons = this.listFilter ? this.performFilter(this.listFilter) : this.pokemons
  }

  performFilter(value: string): Pokemon[] {
    return this.pokemons.filter( (pokemon: Pokemon) =>
      pokemon.name.english.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1);
  }

  pokeBox: NestedListPokemon = {content: new Pokemon(), children: []};
  pokemons: Array<Pokemon>;
  filteredPokemons: Array<Pokemon>;

  constructor(private pokeListService: PokeListService) { }

  ngOnInit() {
    this.pokeListService.getPokemons().subscribe( {
      next: pokemons => { this.pokemons = pokemons, this.filteredPokemons = this.pokemons },
    error: err => "Uh oh..."
    });
  }

  onDragStart(event: DragEvent) {
    console.log("drag started", JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {
    console.log("drag ended", JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }

  onDraggableMoved(event: DragEvent) {
    console.log("draggable moved", JSON.stringify(event, null, 2));
  }

  onDragCanceled(event: DragEvent) {
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }
}
