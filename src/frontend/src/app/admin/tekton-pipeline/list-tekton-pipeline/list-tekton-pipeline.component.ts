import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Harbor } from '../../../shared/model/v1/harbor';
import { Page } from '../../../shared/page/page-state';
import { pipelineStatus } from 'app/shared/shared.const';
import { AceEditorService } from '../../../shared/ace-editor/ace-editor.service';
import { AceEditorMsg } from '../../../shared/ace-editor/ace-editor';
import {Pipeline} from "../../../shared/model/v1/pipeline";

@Component({
  selector: 'list-tekton-pipeline',
  templateUrl: 'list-tekton-pipeline.component.html'
})
export class ListTektonPipelineComponent implements OnInit {

  @Input() pipelines: Pipeline[];

  @Input() page: Page;
  currentPage = 1;
  state: ClrDatagridStateInterface;

  @Output() paginate = new EventEmitter<ClrDatagridStateInterface>();
  @Output() delete = new EventEmitter<Pipeline>();
  @Output() edit = new EventEmitter<Pipeline>();


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

  getPipelineStatus(state: number) {
    return pipelineStatus[state];
  }

  deletePipeline(pipeline: Pipeline) {
    this.delete.emit(pipeline);
  }

  editPipeline(pipeline: Pipeline) {
    this.edit.emit(pipeline);
  }

  detailMetaDataTpl(tpl: string) {
    this.aceEditorService.announceMessage(AceEditorMsg.Instance(tpl, false, '元数据查看'));
  }

}
