import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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
  selector: 'wayne-cmdb',
  templateUrl: 'cmdb.component.html',
  styleUrls: ['cmdb.component.scss']
})
export class CmdbComponent implements OnInit {
  data3: any;
  title = 'Tour of Heroes';

  // @ts-ignore
  @ViewChild('tree') tree: ElementRef & ElTree;
  hooks: UserSafeHooks;

  constructor() { }

  ngOnInit() {
    console.log("enter cmdb")
    this.data3 = [{
      label: '一级 1',
      id: '1.1.1',
      children: [{
        label: '二级 1-1',
        id: '2.1.1',
        children: [{
          id: '3.1.1',
          label: '三级 1-1-1',
          checked: true,
          expanded: true,
        }]
      }]
    }, {
      label: '一级 2',
      id: '1.2.1',
      children: [{
        id: '2.2.1',
        label: '二级 2-1',
      }]
    }, {
      id: '1.3.1',
      label: '一级 3',
    }]
  }

  findAllChecked(): void {
    console.log("find all")
    console.log(this.hooks.findAllChecked())
  }

  removeAllChecked(): void {
    console.log("remove all")
    this.hooks.removeAllChecked()
  }

  updateItemChecked(): void {
    console.log("updateItem")
    this.hooks.updateItemChecked('1.3.1')
  }

  updateItemExpanded(): void {
    console.log("updateItem")
    this.hooks.updateItemExpanded('1.2.1')
  }

  ngAfterViewInit(): void {
    console.log("ngAfterVie")
    this.hooks = this.tree.userSafeHooks()
  }

  changeClick(evnet: any): void {
    console.log(evnet)
  }
}
