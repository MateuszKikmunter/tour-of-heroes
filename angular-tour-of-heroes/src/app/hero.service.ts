import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl: string = "api/heroes";

  constructor(private messageService: MessageService, private http: HttpClient) { }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log("fetched heroes")),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  public getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched hero with id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(mesage: string): void {
    this.messageService.add(`HeroService: ${mesage}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
