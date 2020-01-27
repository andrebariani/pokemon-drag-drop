import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { NestedListPokemon } from '../models/nested-list-pokemon.model';
import { tap, catchError } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeBoardService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private serverUrl = 'assets/server.py'
  private boardUrl = 'assets/poke-board.json'
  constructor(private http: HttpClient) { }

  getPokemons(): Observable<NestedListPokemon[]> {
    return this.http.get<NestedListPokemon[]>(this.boardUrl)
      .pipe(
        tap(data => console.log("Fetched Pokemans from board")),
        catchError(this.handleError)
      );
  }

  updateBoard(b: NestedListPokemon[]): Observable<any> {
    return this.http.post(this.serverUrl, b, this.httpOptions)
    .pipe(
      tap(_ => console.log(`Board Updated`)),
      catchError(this.handleError)
    );
  }
  
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
