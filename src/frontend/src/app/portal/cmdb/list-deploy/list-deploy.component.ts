import {Component, Input, OnInit} from '@angular/core';
import {Hero, HEROES} from "./list-deploy.module";

@Component({
  selector: 'cmdb-deploy',
  templateUrl: './list-deploy.component.html',
  styleUrls: ['./list-deploy.component.scss']
})

export class CmdbDeployComponent implements OnInit {

  heroes = HEROES;
  selectedHero: Hero;
  @Input() selectedPod: Hero;
  @Input() selectedNS: Hero;

  constructor() { }

  ngOnInit() {
    console.log("enter deploy")
  }

  onSelect(hero: Hero): void {
    this.selectedPod = hero;
  }

  handle(index: string): void {
    console.log(this.selectedNS);
    console.log(index)
  }
}
