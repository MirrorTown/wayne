import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { HostAlias } from '../../../shared/model/v1/hostalias';
import { AuthService } from '../../../shared/auth/auth.service';
import { Page } from '../../../shared/page/page-state';

@Component({
  selector: 'list-hostalias',
  templateUrl: 'list-hostalias.component.html',
  styleUrls: ['list-hostalias.scss']
})
export class ListHostAliasComponent implements OnInit {
  @Input() showState: object;
  @Input() listType: string;
  @Input() hostaliases: HostAlias[];
  @Input() page: Page;
  currentPage = 1;
  state: ClrDatagridStateInterface;

  @Output() paginate = new EventEmitter<ClrDatagridStateInterface>();
  @Output() delete = new EventEmitter<HostAlias>();
  @Output() edit = new EventEmitter<HostAlias>();

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
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

  deleteHostAlias(appUser: HostAlias) {
    this.delete.emit(appUser);
  }

  editHostAlias(hostAlias: HostAlias) {
    this.edit.emit(hostAlias);
  }
}
