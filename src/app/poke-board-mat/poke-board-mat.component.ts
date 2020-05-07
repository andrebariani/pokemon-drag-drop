import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';

import { Pokemon } from '../models/pokemon.model';
import { NestedListPokemon } from '../models/nested-list-pokemon.model';
import { PokeSafariComponent } from '../poke-safari/poke-safari.component';
import { SnackBarComponent } from '../material/snackbar/snack-bar.component';
import { PokeListService } from '../poke-list/poke-list.service';
import { CdkDropList, CdkDropListContainer, CdkDropListGroup, moveItemInArray, CdkDrag, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-poke-board-mat',
  templateUrl: './poke-board-mat.component.html',
  styleUrls: ['./poke-board-mat.component.css']
})
export class PokeBoardMatComponent implements OnInit {
  // @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  // @ViewChild(CdkDropList) placeholder: CdkDropList;

  allPokemons: Array<Pokemon>

  pokeBox: NestedListPokemon = {content: new Pokemon(), label: "", children: []};
  pokemonBoard: Array<NestedListPokemon> = [];
  storageKey = 'pokeboard';

  dropzoneTypes: string[] = ["pokemon", "pokeBox"];
  saveHidden = true;

  bgSelected = 'forest';

  constructor(private pokeListService: PokeListService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  // ngAfterViewInit() {
  //   let phElement = this.placeholder.element.nativeElement;

  //   phElement.style.display = 'none';
  //   phElement.parentNode.removeChild(phElement);
  // }

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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  // public target: CdkDropList;
  // public targetIndex: number;
  // public source: CdkDropListContainer;
  // public sourceIndex: number;

  // drop() {
  //   if (!this.target)
  //     return;

  //   let phElement = this.placeholder.element.nativeElement;
  //   let parent = phElement.parentNode;

  //   phElement.style.display = 'none';

  //   parent.removeChild(phElement);
  //   parent.appendChild(phElement);
  //   parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);

  //   this.target = null;
  //   this.source = null;

  //   if (this.sourceIndex != this.targetIndex) moveItemInArray(this.pokemonBoard, this.sourceIndex, this.targetIndex);
  // }

  // enter = (drag: CdkDrag, drop: CdkDropList) => {
  //   if (drop == this.placeholder)
  //     return true;

  //   let phElement = this.placeholder.element.nativeElement;
  //   let dropElement = drop.element.nativeElement;

  //   let dragIndex = __indexOf(dropElement.parentNode.children, drag.dropContainer.element.nativeElement);
  //   let dropIndex = __indexOf(dropElement.parentNode.children, dropElement);

  //   if (!this.source) {
  //     this.sourceIndex = dragIndex;
  //     this.source = drag.dropContainer;

  //     let sourceElement = this.source.element.nativeElement;
  //     phElement.style.width = sourceElement.clientWidth + 'px';
  //     phElement.style.height = sourceElement.clientHeight + 'px';
      
  //     sourceElement.parentNode.removeChild(sourceElement);
  //   }

  //   this.targetIndex = dropIndex;
  //   this.target = drop;

  //   phElement.style.display = '';
  //   dropElement.parentNode.insertBefore(phElement, (dragIndex < dropIndex)
  //     ? dropElement.nextSibling : dropElement);

  //   this.source.start();
  //   this.placeholder.enter(drag, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);

  //   return false;
  // }

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

function __indexOf(collection, node) {
  return Array.prototype.indexOf.call(collection, node);
};