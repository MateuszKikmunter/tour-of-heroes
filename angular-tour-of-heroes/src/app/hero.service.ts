import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { MessageService } from './message.service';

const options = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

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

  public updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, options).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, options);
  }

  public deleteHero(hero: Hero): Observable<Hero> {
    return this.http.delete<Hero>(`${this.heroesUrl}/${hero.id}`, options);
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    if(!term){
      return of([]);
    }

    const url = `${this.heroesUrl}/?name=${term.trim()}`;
    return this.http.get<Hero[]>(url)
      .pipe(tap(_ => this.log(`found heroes matching ${term}`)),
        catchError(this.handleError<Hero[]>("searchHeroes", [])));
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
