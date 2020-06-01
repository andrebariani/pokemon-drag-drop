import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokeBoardComponent } from './poke-board/poke-board.component';

const routes: Routes =[
  {path: 'poke-list', component: PokeListComponent},
  {path: 'poke-board', component: PokeBoardComponent},
  { path: '', redirectTo: '/poke-board', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
