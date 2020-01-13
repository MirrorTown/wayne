import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hero, HEROES} from "./detail-resource.module";

@Component({
  selector: 'cmdb-detail-resource',
  templateUrl: './detail-resource.component.html',
  styleUrls: ['./detail-resource.component.scss']
})

export class DetailResourceComponent implements OnInit {

  heroes = HEROES;
  tagIndex: number;
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

  selectTagIndex(id: number): void {
    this.tagIndex = id;
    console.log(id);
  }
}
