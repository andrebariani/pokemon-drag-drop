import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';

import { Pokemon } from '../models/pokemon.model';
import { NestedListPokemon } from '../models/nested-list-pokemon.model';
import { PokeSafariComponent } from '../poke-safari/poke-safari.component';
import { SnackBarComponent } from '../material/snackbar/snack-bar.component';
import { PokeListService } from '../poke-list/poke-list.service';

@Component({
  selector: 'app-poke-board-mat',
  templateUrl: './poke-board-mat.component.html',
  styleUrls: ['./poke-board-mat.component.css']
})
export class PokeBoardMatComponent implements OnInit {

  allPokemons: Array<Pokemon>

  pokeBox: NestedListPokemon = {content: new Pokemon(), label: "", children: []};
  pokemonBoard: Array<NestedListPokemon> = [];
  storageKey = 'pokeboard';

  dropzoneTypes: string[] = ["pokemon", "pokeBox"];
  saveHidden = true;

  bgSelected = 'forest';

  constructor(private pokeListService: PokeListService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() { 
    this.pokeListService.getPokemons().subscribe( {
      next: pokemons => { this.allPokemons = pokemons },
    error: err => "Uh oh..."
    });

    if (localStorage.getItem(this.storageKey) && JSON.parse(atob(localStorage.getItem(this.storageKey))).length !== 0) {
      this.pokemonBoard = JSON.parse(atob(localStorage.getItem(this.storageKey)));
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 5000,
        data: {
          isCaptured: false,
          message: "pokeBoard restored!"
        }
      });
    } else {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 5000,
        data: {
          isCaptured: false,
          message: "pokeBoard not restored"
        }
      });
    }
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

  start() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '500px';
    dialogConfig.data = {
      wildPokemon: this.allPokemons[Math.floor(Math.random() * this.allPokemons.length)]
    }
    const dialogRef = this.dialog.open(PokeSafariComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) => {
        let snackData: MatSnackBarConfig;

        if(data.pokemon) {
          this.pokemonBoard.push({content: data.pokemon});

          snackData = {
            duration: 5000,
            data: {
              isCaptured: true,
              message: data.message,
              img: data.img
            }
          }
        } else {
          snackData = {
            duration: 5000,
            data: {
              isCaptured: false,
              message: data.message
            }
          }
        }

        this.snackBar.openFromComponent(SnackBarComponent, snackData);
      }
    );
  }

  addPokemon() {
    this.pokemonBoard.push({content: this.allPokemons[Math.floor(Math.random() * this.allPokemons.length)]});
  }

  save(): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
      data: {
        isCaptured: false,
        message: "pokeBoard saved!"
      }
    });
    localStorage.setItem(this.storageKey, btoa(JSON.stringify(this.pokemonBoard)));
    console.log(JSON.parse(atob(localStorage.getItem(this.storageKey))));
  }
}
