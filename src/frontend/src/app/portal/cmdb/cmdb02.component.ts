import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';

import { Deploy } from '../../shared/model/v1/deploy';
import { DeployService } from '../../shared/client/v1/deploy.service';
import {ElTree, UserSafeHooks} from "element-angular/release/tree/tree";

@Component({
// template: `
// <nz-tree [(ngModel)]="nodes"
// [nzShowLine]="true"
// (nzExpandChange)="mouseAction('expand',$event)"
// (nzDblClick)="mouseAction('dblclick',$event)"
// (nzContextMenu)="mouseAction('contextmenu', $event)"
// (nzClick)="mouseAction('click',$event)">
// </nz-tree>`,
  selector: 'wayne-cmdb02',
  templateUrl: 'cmdb02.component.html',
  styleUrls: ['cmdb02.component.scss']
})
export class Cmdb02Component implements OnInit {
  open: boolean;
  envName: string;
  appName: string;
  canCreateDeploy: number;
  selectedDeploy: number;
  data3: any;
  deployList: any;
  title = 'Tour of Heroes';

  // @ts-ignore
  @ViewChild('tree') tree: ElementRef & ElTree;
  hooks: UserSafeHooks;

  constructor() { }

  ngOnInit() {
    this.open = false;
    this.canCreateDeploy = 2;
    console.log("enter cmdb")
    this.deployList = [{
      name: 'wayne',
      id: '1',
      dockerNum: 2,
      cpu: 1,
      ram: 2
    }, {
      name: 'wayne-middleware',
      id: '2',
      dockerNum: 2,
      cpu: 1,
      ram: 2
    }]
  }

  createDeploy(): void {
    console.log("create deploy:" + this.appName);
    console.log(this.deployList);
  }

  selectDeploy(id: number): void {
    console.log(id);
    this.open = true;
    this.selectedDeploy = id;
    console.log(this.open);
  }
}
