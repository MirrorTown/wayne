import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {NgForm} from '@angular/forms';
import {MessageHandlerService} from '../../../shared/message-handler/message-handler.service';
import {ActionType} from '../../../shared/shared.const';
import {HostAlias} from '../../../shared/model/v1/hostalias';
import {Group} from '../../../shared/model/v1/group';
import {UserService} from '../../../shared/client/v1/user.service';
import {GroupService} from '../../../shared/client/v1/group.service';
import {HostAliasService} from '../../../shared/client/v1/hostAlias.service';
import {ActivatedRoute} from "@angular/router";
import {CacheService} from "../../../shared/auth/cache.service";

@Component({
  selector: 'create-hostalias',
  templateUrl: 'create-hostalias.component.html',
  styleUrls: ['create-hostalias.scss']
})
export class CreateHostAliasComponent implements OnInit {
  @Output() create = new EventEmitter<boolean>();
  createHostAliasOpened: boolean;

  hostaliasForm: NgForm;
  @ViewChild('hostaliasForm', { static: true })
  currentForm: NgForm;

  hostalias: HostAlias;
  checkOnGoing = false;
  isSubmitOnGoing = false;
  isNameValid = true;

  hostaliasId: number;
  mapGroups: Map<string, Group> = new Map<string, Group>();
  prepareGroups: Array<any>;
  hostAliasTitle: string

  hostaliasStr: string;
  actionType: ActionType;

  hostaliases: HostAlias[];

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    public cacheService: CacheService,
    private hostAliasService: HostAliasService,
    private messageHandlerService: MessageHandlerService
  ) {
  }

  ngOnInit(): void {
    /*const appId = parseInt(this.route.parent.snapshot.params['id'], 10);
    const namespaceId = this.cacheService.namespaceId;
    this.hostalias = new HostAlias();
    this.hostAliasService.list(new PageState({pageSize: 500}), appId, namespaceId).subscribe(
      response => {
        console.log(response.data);
        /!*this.allGroups = response.data.list;
        for (const x in this.allGroups) {
          if (this.allGroups.hasOwnProperty(x)) {
            this.mapGroups.set(this.allGroups[x].id.toString(), this.allGroups[x]);
          }
        }*!/
      },
      error => this.messageHandlerService.handleError(error)
    );*/
  }

  newOrEditHostAlias(id?: number) {
    this.prepareGroups = new Array<any>();
    this.createHostAliasOpened = true;
    if (id) {
      this.actionType = ActionType.EDIT;
      this.hostAliasTitle = '编辑HostAlias';
      this.hostaliasId = id;
    } else {
      this.actionType = ActionType.ADD_NEW;
      this.hostAliasTitle = '新增HostAlias';
      this.hostaliasId = 0;
    }
  }

  onCancel() {
    this.createHostAliasOpened = false;
    this.currentForm.reset();
  }

  getUserId(name: string): number {
    return 0;
  }

  onSubmit() {
    if (this.isSubmitOnGoing) {
      return;
    }
    const appId = parseInt(this.route.parent.snapshot.params['id'], 10);
    const namespaceId = this.cacheService.namespaceId;
    this.hostaliases = new Array<HostAlias>();

    this.hostaliasStr.split("\n").forEach((value, index) => {
      let item;
      let ha;
      item = value.trim();
      if (item != '') {
        let itemlist = item.split(" ");
        ha = new HostAlias(itemlist[0], itemlist.slice(1).filter(s => { return s && s.trim()}));
        this.hostaliases.push(ha)
      }

    });
    this.isSubmitOnGoing = true;
    if (this.actionType === ActionType.EDIT && this.hostaliases.length > 1) {
      this.messageHandlerService.handleError("单条编辑模式，请勿确认更新")
    } else if (this.actionType === ActionType.EDIT && this.hostaliases.length === 1) {
      this.hostaliases[0].id = this.hostaliasId
      this.hostAliasService.update(this.hostaliases).subscribe(
        status => {
          this.isSubmitOnGoing = false;
          this.create.emit(true);
          this.createHostAliasOpened = false;
          this.messageHandlerService.showSuccess(this.hostAliasTitle + '成功！');
        },
      error => {
        this.isSubmitOnGoing = false;
        this.createHostAliasOpened = false;
        this.messageHandlerService.handleError(error);
      }
      )
    } else if (this.actionType === ActionType.ADD_NEW) {
      this.hostAliasService.create(this.hostaliases, appId, namespaceId).subscribe(
        status => {
          this.isSubmitOnGoing = false;
          this.create.emit(true);
          this.createHostAliasOpened = false;
          this.messageHandlerService.showSuccess(this.hostAliasTitle + '成功！');
        },
        error => {
          this.isSubmitOnGoing = false;
          this.createHostAliasOpened = false;
          this.messageHandlerService.handleError(error);
        }
      );
    }
    this.currentForm.reset();
  }

  public get isValid(): boolean {
    return this.currentForm &&
      this.currentForm.valid &&
      !this.isSubmitOnGoing &&
      !this.checkOnGoing;
  }

  // Handle the form validation
  handleValidation(): void {
  }
}


