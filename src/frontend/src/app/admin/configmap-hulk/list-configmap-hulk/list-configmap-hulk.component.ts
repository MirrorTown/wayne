import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Page } from '../../../shared/page/page-state';
import { AceEditorService } from '../../../shared/ace-editor/ace-editor.service';
import { AceEditorMsg } from '../../../shared/ace-editor/ace-editor';
import { ListRelatedAppComponent } from "../../../shared/list-related-app/list-related-app.component";
import {ConfigmapHulk} from "../../../shared/model/v1/configmap-hulk";

@Component({
  selector: 'list-configmap-hulk',
  templateUrl: 'list-configmap-hulk.component.html'
})
export class ListConfigmapHulkComponent implements OnInit {

  @Input() configs: ConfigmapHulk[];

  @Input() page: Page;
  currentPage = 1;
  state: ClrDatagridStateInterface;

  @Output() paginate = new EventEmitter<ClrDatagridStateInterface>();
  @Output() delete = new EventEmitter<ConfigmapHulk>();
  @Output() edit = new EventEmitter<ConfigmapHulk>();

  @ViewChild(ListRelatedAppComponent, { static: false })
  listRelatedAppComponent: ListRelatedAppComponent;


  constructor(private router: Router,
              private aceEditorService: AceEditorService) {
  }

  ngOnInit(): void {
  }

  pageSizeChange(pageSize: number) {
    this.state.page.to = pageSize - 1;
    this.state.page.size = pageSize;
    this.currentPage = 1;
    this.paginate.emit(this.state);
  }

  refresh(state: ClrDatagridStateInterface) {
    this.state = state;
    this.paginate.emit(state);
  }

  deleteConfigMapHulk(configmapHulk: ConfigmapHulk) {
    this.delete.emit(configmapHulk);
  }

  editConfigMapHulk(configmapHulk: ConfigmapHulk) {
    this.edit.emit(configmapHulk);
  }

  detailMetaDataTpl(tpl: string) {
    this.aceEditorService.announceMessage(AceEditorMsg.Instance(tpl, false, '元数据查看'));
  }

}
