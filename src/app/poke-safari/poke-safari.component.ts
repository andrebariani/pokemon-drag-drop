import { Component, OnInit, Input, Output } from '@angular/core';
import { PokeListService } from '../poke-list/poke-list.service';
import { Pokemon } from '../models/pokemon.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-poke-safari',
  templateUrl: './poke-safari.component.html',
  styleUrls: ['./poke-safari.component.css']
})
export class PokeSafariComponent implements OnInit {

  message: string;
  battleMsg: string;
  allPokemons = [];

  wildPokemon: Pokemon;
  angry: number;
  eating: number;
  catchRate: number;

  @Output() capturedPokemon: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  constructor(private pokeListService: PokeListService) { }

  ngOnInit() {
    this.pokeListService.getPokemons().subscribe({
      next: pokemons => { this.allPokemons = pokemons },
      error: err => "Uh oh..."
    });
  }

  start() {
    this.message = "";
    this.wildPokemon = this.allPokemons[Math.floor(Math.random() * this.allPokemons.length)];

    this.battleMsg = "A Wild " + this.wildPokemon.name.english + " appears! What will you do?"

    this.angry = 0;
    this.eating = 0;
    this.catchRate = 250 / 3;
  }

  run() {
    this.message = "You've ran away!";
    this.wildPokemon = null;
  }

  pokemonRan() {
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
      this.message = this.wildPokemon.name.english + " ran away !";
      this.wildPokemon = null;
      return true;
    }
    return false;
  }

  throwRock() {
    this.eating = 0;
    this.angry = Math.min(this.angry + Math.floor((Math.random() * 5)), 255);
    this.catchRate = Math.min(this.catchRate * 2, 255);
    if (!this.pokemonRan()) {
      this.battleMsg = this.wildPokemon.name.english + " is angry!!";
      this.catchRate = this.catchRate / 2;
    }
  }

  throwBait() {
    this.angry = 0;
    this.eating = Math.min(this.eating + Math.floor((Math.random() * 5)), 255);

    if (!this.pokemonRan()) {
      this.battleMsg = this.wildPokemon.name.english + " is eating!";
      this.catchRate = this.catchRate / 2;
    }
  }

  throwPokeball() {

    let finalCatchRate = Math.pow(2, 16) / Math.pow((255 / this.catchRate), (3 / 16));

    for(let i = 0 ; i < 3 ; i++) {
      if(finalCatchRate <= (Math.floor(Math.random() * (Math.pow(2, 16))))) {
        console.log(finalCatchRate, (Math.floor(Math.random() * (Math.pow(2, 16)))), i)
        if(!this.pokemonRan()) {
          switch(i) {
            case 0: {
              this.battleMsg = "Oh no! The Pokémon broke free!";
              break;
            }
            case 1: {
              this.battleMsg = "Aww! It appeared to be caught!";
              break;
            }
            case 2: {
              this.battleMsg = "Aargh! Almost had it!";
              break;
            }
          }
        }
        return;
      }
    }
    
    this.capturedPokemon.emit(this.wildPokemon)

    this.message = "You've captured " + this.wildPokemon.name.english + "!";

    this.wildPokemon = null;
  }

}
