import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hero, HEROES} from "./list-resource.module";

@Component({
  selector: 'cmdb-resource',
  templateUrl: './list-resource.component.html',
  styleUrls: ['./list-resource.component.scss']
})

export class ResourceComponent implements OnInit {

  heroes = HEROES;
  tagIndex: number;
  selectedHero: Hero;
  @Input() selectedDeploy: number;
  @Output() selectedNS = new EventEmitter<Hero>();

  constructor() { }

  ngOnInit() {
    console.log("select deploy id " , this.selectedDeploy)
  }

  onSelect(hero: Hero): void {
    this.selectedNS.emit(hero);
  }

  selectTagIndex(id: number): void {
    this.tagIndex = id;
    console.log(id);
  }
}
