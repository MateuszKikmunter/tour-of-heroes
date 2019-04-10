import { Component, OnInit } from '@angular/core';

import { HEROES } from './../mock-heroes';
import { Hero } from './../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: Hero[] = [];
  public selectedHero: Hero;

  constructor() { }

  ngOnInit() {
    this.heroes = HEROES;
  }

  public onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
