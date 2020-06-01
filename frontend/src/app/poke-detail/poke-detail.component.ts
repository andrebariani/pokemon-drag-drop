import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.css']
})
export class PokeDetailComponent implements OnInit {

  pokemon: Pokemon;

  constructor(private modalRef: MatDialogRef<PokeDetailComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.pokemon = data;
  }

  ngOnInit() {
  }

}
