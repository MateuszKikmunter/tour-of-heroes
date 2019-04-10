import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';

import { Hero } from './../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: Hero[] = [];
  public selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes().subscribe(data => this.heroes = data);
  }

  public onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
