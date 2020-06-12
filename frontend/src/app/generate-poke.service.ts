import { Injectable } from '@angular/core';
import { NestedListPokemon } from './models/nested-list-pokemon.model';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneratePokeService {

  APIendpoint: string = 'https://erj76lmysc.execute-api.sa-east-1.amazonaws.com/dev/api'; 

  constructor(private http: HttpClient) { }

  download(pokemons: Array<NestedListPokemon>): Observable<Blob> {
    const pokes = JSON.stringify({
      pokemons: pokemons
    });

    return this.http.post(this.APIendpoint, pokes,
    {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }),
        responseType: 'blob'
    })
    .pipe(
        catchError(this.handleErr)
    );
  }


  handleErr(err: HttpErrorResponse): Observable<never> {
    let message: String;

    console.log(err);

    if(err.error instanceof ErrorEvent) {
        // Client-side Error
        message = `Error: ${err.error.message}`
    } else {    
        // Server-side Error
        message = `Failed to Download File - Error ${err.status}: ${err.statusText}`
    }

    console.error(message);
    return throwError(message);
  }
}
