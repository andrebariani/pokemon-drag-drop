import { Injectable } from '@angular/core';
import { NestedListPokemon } from './models/nested-list-pokemon.model';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneratePokeService {

  APIendpoint: string = 'https://i610o7r2nl.execute-api.sa-east-1.amazonaws.com/dev/api'; 

  constructor(private http: HttpClient) { }

  download(pokemons: Array<NestedListPokemon>): Observable<Blob> {
    const pokes = JSON.stringify({
      pokemons: pokemons
    });

    return this.http.post(this.APIendpoint, pokes,
    {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': 'true',
          // 'Authorization': 'AWS4-HMAC-SHA256 Credential=AKIARABRGNGVQRC4QS3N/20200609/sa-east-1/execute-api/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=36ffe53212686609b7a4d5ce6882f21cd64967cd365a1a6dff23eb87fce306e3',
          // 'X-Amz-Content-Sha256': 'beaead3198f7da1e70d03ab969765e0821b24fc913697e929e726aeaebf0eba3',
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
