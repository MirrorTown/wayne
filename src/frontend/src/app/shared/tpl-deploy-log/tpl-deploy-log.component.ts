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
    console.log("enter tekton-dashboard");
    const now = new Date();
    /*this.startTime = moment(new Date(now.getTime() - 1000 * 3600 * 24 * 7)).format('YYYY-MM-DD HH:mm:ss');
    this.endTime = moment(now).format('YYYY-MM-DD HH:mm:ss');
    console.log(this.startTime, this.endTime);*/
    this.textSub = this.tplDeployLogService.text$.subscribe(
      msg => {
        // this.queryLog = new DeployLog(msg.text, msg.text, 1, 1000)
        // this.slsService.getDeployLog(this.queryLog).subscribe(
        //   response => {
        //     console.log(response.data);
        //     this.text = response.data.obj.message;
        //   },
        //   error => this.messageHandlerService.handleError(error)
        // );

        this.tektonBuildService.getById(msg.deploymentId, msg.appId).subscribe(response => {
          let src = response.data.logUri + response.data.pipelineExecuteId;
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


