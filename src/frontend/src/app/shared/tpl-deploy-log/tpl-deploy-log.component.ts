import { Component, OnDestroy, OnInit } from '@angular/core';
import { TplDeployLogservice } from './tpl-deploy-log.service';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { SlsService } from '../client/v1/sls.service';
import { DeployLog } from '../model/v1/deploy-log';
import { MessageHandlerService } from '../message-handler/message-handler.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {TektonBuildService} from "../client/v1/tektonBuild.service";
import {ModalService} from "./_modal";


@Component({
  selector: 'tpl-deploy-log',
  templateUrl: 'tpl-deploy-log.component.html',
  styleUrls: ['tpl-deploy-log.scss']
})

export class TplDeployLogComponent implements OnInit, OnDestroy {
  modalOpened: boolean;
  startTime: string;
  endTime: string;
  text: string;
  title = 'release_explain';
  textSub: Subscription;
  queryLog: DeployLog;
  iframe: SafeResourceUrl;

  constructor(private tplDeployLogService: TplDeployLogservice,
              private messageHandlerService: MessageHandlerService,
              private tektonBuildService: TektonBuildService,
              private modalService: ModalService,
              private slsService: SlsService,
              public sanitizer: DomSanitizer) {
  }

  // openModal(text: string) {
  //   this.text = text;
  //   this.modalOpened = true;
  // }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


  ngOnInit(): void {
    this.textSub = this.tplDeployLogService.text$.subscribe(
      msg => {
        this.tektonBuildService.getById(msg.deploymentId, msg.appId).subscribe(response => {
          let src = response.data.logUri + response.data.pipelineExecuteId;
          console.log("构建日志地址: " + src);
          // let src = "https://dasoudevops.digitalvolvo.com/tekton/#/namespaces/dasouche-devops/pipelineruns/pipelinerun-volov-build-qdxrq"
          this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(src);
        })
        this.modalOpened = true;
        if (msg.title) { this.title = msg.title; }
        this.openModal("custom-modal-1")
      }
    );
  }

  search(): void {
    console.log(moment(this.startTime, 'MM/DD/YYYY', true).format('YYYY-MM-DDTHH:mm:SS') + 'Z',
      moment(this.endTime, 'MM/DD/YYYY', true).format('YYYY-MM-DDTHH:mm:SS') + 'Z');
  }

  ngOnDestroy() {
    if (this.textSub) {
      this.textSub.unsubscribe();
    }
  }
}


