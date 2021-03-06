import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeListService {
  private dataUrl = 'assets/pokedex.json'
  constructor(private http: HttpClient) { }

  getJSON(key: string): Observable<any> {
    return this.http.get<any>(key)
      .pipe(
        tap(data => console.log("Fetched JSON")),
        catchError(this.handleError)
      );
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.dataUrl)
      .pipe(
        tap(data => console.log("Fetched Pokemans")),
        catchError(this.handleError)
      );
  }

  getPokemon(id: number): Observable<Pokemon | undefined> {
    return this.getPokemons()
      .pipe(
        map((pokemon: Pokemon[]) => pokemon.find(p => p.id === id))
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
