import { Component, OnInit, Input, Output } from '@angular/core';
import { PokeListService } from '../poke-list/poke-list.service';
import { Pokemon } from '../models/pokemon.model';
import { EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../material/snackbar/snack-bar.component';

@Component({
  selector: 'app-poke-safari',
  templateUrl: './poke-safari.component.html',
  styleUrls: ['./poke-safari.component.css']
})
export class PokeSafariComponent implements OnInit {

  afterBattleMsg: string;
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

  @Output() capturedPokemon: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  constructor(private pokeListService: PokeListService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.pokeListService.getPokemons().subscribe({
      next: pokemons => { this.allPokemons = pokemons },
      error: err => "Uh oh..."
    });
  }

  start() {
    this.afterBattleMsg = "";
    this.wildPokemon = this.allPokemons[Math.floor(Math.random() * this.allPokemons.length)];

    this.battleMsg = "A Wild " + this.wildPokemon.name.english + " appears! What will you do?";

    this.angry = 0;
    this.eating = 0;
    this.catchRate = 250 / 3;
  }

  run() {
    this.afterBattleMsg = "You've ran away!";
    this.wildPokemon = null;
  }

  didPokemonRan() {
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
      this.afterBattleMsg = this.wildPokemon.name.english + " ran away !";
      this.wildPokemon = null;

      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 5000,
        data: { 
          isCaptured: false,
          message: this.afterBattleMsg
        }
      });

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
    
    this.capturedPokemon.emit(this.wildPokemon)
    this.afterBattleMsg = "You've captured " + this.wildPokemon.name.english + "!";
    this.wildPokemon = null;

    let snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
      data: { 
        isCaptured: true,
        message: this.afterBattleMsg
      }
    });

    snackBarRef.onAction().subscribe(() => {
      console.log("miau");
    });
  }

}
