import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from "@angular/cdk/drag-drop";

import { DndModule } from 'ngx-drag-drop';

import { AppComponent } from './app.component';
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokeBoardComponent } from './poke-board/poke-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokeSafariComponent } from './poke-safari/poke-safari.component';
import { AppRoutingModule } from './app-routing.module';
import { PokeDetailComponent } from './poke-detail/poke-detail.component';
import { SnackBarComponent } from './material/snackbar/snack-bar.component';
import { PokeBoardMatComponent } from './poke-board-mat/poke-board-mat.component';

@NgModule({
  declarations: [
    AppComponent,
    PokeListComponent,
    PokeBoardComponent,
    PokeSafariComponent,
    PokeDetailComponent,
    SnackBarComponent,
    PokeBoardMatComponent
  ],
  imports: [
    BrowserModule,
    DndModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatGridListModule,
    MatSnackBarModule,
    MatListModule,
    MatInputModule,
    DragDropModule,
    FormsModule,
    AppRoutingModule,
  ],
  entryComponents: [
    PokeDetailComponent,
    SnackBarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
