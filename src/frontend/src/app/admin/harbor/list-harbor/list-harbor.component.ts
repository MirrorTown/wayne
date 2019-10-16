import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Harbor } from '../../../shared/model/v1/harbor';
import { Page } from '../../../shared/page/page-state';
import { harborStatus } from 'app/shared/shared.const';
import { AceEditorService } from '../../../shared/ace-editor/ace-editor.service';
import { AceEditorMsg } from '../../../shared/ace-editor/ace-editor';

@Component({
  selector: 'list-harbor',
  templateUrl: 'list-harbor.component.html'
})
export class ListHarborComponent implements OnInit {

  @Input() harbors: Harbor[];

  @Input() page: Page;
  currentPage = 1;
  state: ClrDatagridStateInterface;

  @Output() paginate = new EventEmitter<ClrDatagridStateInterface>();
  @Output() delete = new EventEmitter<Harbor>();
  @Output() edit = new EventEmitter<Harbor>();


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

  getHarborStatus(state: number) {
    return harborStatus[state];
  }

  deleteHarbor(harbor: Harbor) {
    this.delete.emit(harbor);
  }

  editHarbor(harbor: Harbor) {
    this.edit.emit(harbor);
  }

  detailMetaDataTpl(tpl: string) {
    this.aceEditorService.announceMessage(AceEditorMsg.Instance(tpl, false, '元数据查看'));
  }

}
