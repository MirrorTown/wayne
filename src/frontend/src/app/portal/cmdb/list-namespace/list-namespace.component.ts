import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hero, HEROES} from "./list-namespace.module";

@Component({
  selector: 'cmdb-ns',
  templateUrl: './list-namespace.component.html',
  styleUrls: ['./list-namespace.component.scss']
})

export class CmdbNsComponent implements OnInit {

  heroes = HEROES;
  selectedHero: Hero;
  @Input() selectedCluster: Hero;
  @Output() selectedNS = new EventEmitter<Hero>();

  constructor() { }

  ngOnInit() {
    console.log("enter ns")
  }

  onSelect(hero: Hero): void {
    this.selectedNS.emit(hero);
  }
}
