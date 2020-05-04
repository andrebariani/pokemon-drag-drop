import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  isCaptured: boolean;
  message: string;
  image: string;

  constructor(private snackBarRef: MatSnackBarRef<SnackBarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data.message;
    this.isCaptured = data.isCaptured;
    if(data.img) this.image = data.img;
  }

  ngOnInit() { }

  undoAction() {
    this.snackBarRef.dismissWithAction();
  }

}
