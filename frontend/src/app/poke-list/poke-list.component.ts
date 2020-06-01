import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Pokemon } from '../models/pokemon.model';
import { PokeListService } from './poke-list.service';
import { PokeDetailComponent } from '../poke-detail/poke-detail.component';

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

  pokemons: Array<Pokemon>;
  filteredPokemons: Array<Pokemon>;

  constructor(private pokeListService: PokeListService, private dialog: MatDialog) { }

  ngOnInit() {
    this.pokeListService.getPokemons().subscribe( {
      next: pokemons => { this.pokemons = pokemons, this.filteredPokemons = this.pokemons },
    error: err => "Uh oh..."
    });
  }

  openDetail(p: Pokemon) {
    // Definição do dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '500px';
    dialogConfig.data = p;
    const dialogRef = this.dialog.open(PokeDetailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe();
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
