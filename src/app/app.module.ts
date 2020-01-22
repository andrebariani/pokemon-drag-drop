import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from "@angular/material/card";

import { DndModule } from 'ngx-drag-drop';

import { AppComponent } from './app.component';
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokeBoardComponent } from './poke-board/poke-board.component';
import { PokeBoardBuglessComponent } from './poke-board-bugless/poke-board-bugless.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PokeListComponent,
    PokeBoardComponent,
    PokeBoardBuglessComponent
  ],
  imports: [
    BrowserModule,
    DndModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
