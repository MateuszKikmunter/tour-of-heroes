import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from './../hero.service';
import { Hero } from './../hero';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  public hero: Hero;

  constructor(private heroSerivce: HeroService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.heroSerivce.getHero(id).subscribe(h => this.hero = h);
  }

  public goBack(): void {
    this.location.back();
  }

  public save(): void {
    this.heroSerivce.updateHero(this.hero).subscribe(() => this.goBack());
  }
}
