import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { PokeListService } from '../poke-list/poke-list.service';
import { Pokemon } from '../models/pokemon.model';
import { EventEmitter } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackBarComponent } from '../material/snackbar/snack-bar.component';
import { NestedListPokemon } from '../models/nested-list-pokemon.model';

@Component({
  selector: 'app-poke-safari',
  templateUrl: './poke-safari.component.html',
  styleUrls: ['./poke-safari.component.css']
})
export class PokeSafariComponent implements OnInit {

  afterBattle = {
    message: "",
    pokemon: new Pokemon(),
    img: ""
  };
  battleMsg: string;
  escapedMsg =  [
    "Oh no! The Pokémon broke free!",
    "Aww! It appeared to be caught!",
    "Aargh! Almost had it!"
  ];
  allPokemons: Array<Pokemon> = [];

  wildPokemon: Pokemon;
  angry: number;
  eating: number;
  catchRate: number;

  constructor(private dialogRef: MatDialogRef<PokeSafariComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.wildPokemon = data.wildPokemon;

    this.battleMsg = "A Wild " + this.wildPokemon.name.english + " appears! What will you do?";

    this.angry = 0;
    this.eating = 0;
    this.catchRate = 250 / 3;
  }

  ngOnInit() { }

  run() {
    this.afterBattle.message = "You've ran away!";
    this.afterBattle.pokemon = null;

    this.closeDialog();
    this.dialogRef.close(this.afterBattle);
  }

  didPokemonRan(): boolean {
    let runProb: number = 0;
    let escaped = false;
    if (this.eating) {
      runProb = (((this.wildPokemon.base.Speed / 4 ) % 256));
      if(runProb > Math.floor(Math.random() * 255) ) {
        escaped = true;
      }
    } else if (this.angry) {
      runProb = (((this.wildPokemon.base.Speed * 4) % 256));
      if(runProb > Math.floor(Math.random() * 255) ) {
        escaped = true;
      }
    } else {
      runProb = (((this.wildPokemon.base.Speed * 2) % 256));
      if(runProb > 255) {
        escaped = true;
      }
    }

    if (escaped) {
      this.afterBattle.message = this.wildPokemon.name.english + " ran away !";
      this.afterBattle.pokemon = null;

      this.dialogRef.close(this.afterBattle);

      return true;
    }
    return false;
  }

  throwRock() {
    this.eating = 0;
    this.angry = Math.min(this.angry + Math.floor((Math.random() * 5)), 255);
    this.catchRate = Math.min(this.catchRate * 2, 255);
    if (!this.didPokemonRan()) {
      this.battleMsg = this.wildPokemon.name.english + " is angry!!";
      this.catchRate = this.catchRate / 2;
    }
  }

  throwBait() {
    this.angry = 0;
    this.eating = Math.min(this.eating + Math.floor((Math.random() * 5)), 255);

    if (!this.didPokemonRan()) {
      this.battleMsg = this.wildPokemon.name.english + " is eating!";
      this.catchRate = this.catchRate / 2;
    }
  }

  throwPokeball() {
    let finalCatchRate = Math.pow(2, 16) / Math.pow((255 / this.catchRate), (3 / 16));

    for(let i = 0 ; i < 3 ; i++) {
      if(finalCatchRate <= (Math.floor(Math.random() * (Math.pow(2, 16))))) {
        if(!this.didPokemonRan()) this.battleMsg = this.escapedMsg[i];
        return;
      }
    }
    
    this.afterBattle.message = "You've captured " + this.wildPokemon.name.english + "!";
    this.afterBattle.pokemon = this.wildPokemon;
    this.afterBattle.img = `assets/sprites/${('000' + this.wildPokemon.id).substr(-3)}MS.png`;

    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close(this.afterBattle);
  }
}
