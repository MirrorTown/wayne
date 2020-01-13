import { Component, OnInit } from '@angular/core';
import {Hero, HEROES} from "./list-cluster.module";

@Component({
  selector: 'cmdb-cluster',
  templateUrl: './list-cluster.component.html',
  styleUrls: ['./list-cluster.component.scss']
})

export class HeroesComponent implements OnInit {

  heroes = HEROES;
  selectedHero: Hero;
  selectedNS: Hero;

  constructor() { }

  ngOnInit() {
  }

  onSelect(hero: Hero): void {
    console.log(hero);
    this.selectedHero = hero;
  }

  selectPod(hero: Hero): void {
    console.log(hero);
    this.selectedNS = hero;
  }
}
