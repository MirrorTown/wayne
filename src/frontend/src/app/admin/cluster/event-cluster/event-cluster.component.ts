import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Event } from '../../../shared/model/v1/event';
import { PageState} from '../../../shared/page/page-state';
import { AceEditorService } from '../../../shared/ace-editor/ace-editor.service';
import { AceEditorMsg } from '../../../shared/ace-editor/ace-editor';
import { EventClient } from '../../../shared/client/v1/kubernetes/event';
import { Cluster } from "../../../shared/model/v1/cluster";
import { MessageHandlerService } from '../../../shared/message-handler/message-handler.service';
import { ClusterService } from '../../../shared/client/v1/cluster.service';

@Component({
  selector: 'event-cluster',
  templateUrl: 'event-cluster.component.html'
})
export class EventClusterComponent implements OnInit {

  events: Event[];
  cluster: string;
  clusters: Cluster[];
  pageState: PageState = new PageState();
  currentPage = 1;
  state: ClrDatagridStateInterface;

  @Output() paginate = new EventEmitter<ClrDatagridStateInterface>();

  constructor(private router: Router,
              private clusterService: ClusterService,
              private eventClient: EventClient,
              private messageHandlerService: MessageHandlerService,
              private aceEditorService: AceEditorService) {
  }

  ngOnInit(): void {
    this.clusterService.list(this.pageState, 'false')
      .subscribe(
        response => {
          const data = response.data;
          this.pageState.page.totalPage = data.totalPage;
          this.pageState.page.totalCount = data.totalCount;
          this.clusters = data.list;
        },
        error => this.messageHandlerService.handleError(error)
      );
  }

  ngOnDestroy(): void {
  }

  pageSizeChange(pageSize: number) {
    this.state.page.to = pageSize - 1;
    this.state.page.size = pageSize;
    this.currentPage = 1;
    this.searchEvent(this.state);
  }

  refresh(state: ClrDatagridStateInterface) {
    this.state = state;
    this.paginate.emit(state);
  }

  searchEvent(state?: ClrDatagridStateInterface) {
    if (state) {
      this.state = state;
      this.pageState = PageState.fromState(state, {totalPage: this.pageState.page.totalPage, totalCount: this.pageState.page.totalCount});
    }
    if (this.cluster != null) {
      this.pageState.sort.by = "lastseen";
      this.pageState.sort.reverse = true;
      this.eventClient.listEventByCluster(this.pageState, this.cluster)
        .subscribe(
          response => {
            const data = response.data;
            this.events = data.list;
            this.pageState.page.totalPage = data.totalPage;
            this.pageState.page.totalCount = data.totalCount;
          },
          error => this.messageHandlerService.handleError(error)
        );
    }
  }

  detailMetaDataTpl(tpl: string) {
    alert(tpl);
  }

}
