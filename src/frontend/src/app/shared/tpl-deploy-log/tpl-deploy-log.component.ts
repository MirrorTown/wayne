import { Component, OnDestroy, OnInit } from '@angular/core';
import { TplDeployLogservice } from './tpl-deploy-log.service';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { SlsService } from '../client/v1/sls.service';
import { DeployLog } from '../model/v1/deploy-log';
import { MessageHandlerService } from '../message-handler/message-handler.service';

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

  constructor(private tplDeployLogService: TplDeployLogservice,
              private messageHandlerService: MessageHandlerService,
              private slsService: SlsService) {
  }

  openModal(text: string) {
    this.text = text;
    this.modalOpened = true;
  }


  ngOnInit(): void {
    console.log("enter")
    const now = new Date();
    /*this.startTime = moment(new Date(now.getTime() - 1000 * 3600 * 24 * 7)).format('YYYY-MM-DD HH:mm:ss');
    this.endTime = moment(now).format('YYYY-MM-DD HH:mm:ss');
    console.log(this.startTime, this.endTime);*/
    this.textSub = this.tplDeployLogService.text$.subscribe(
      msg => {
        console.log(msg);
        this.queryLog = new DeployLog(msg.text, msg.text, 1, 1000)
        this.slsService.getDeployLog(this.queryLog).subscribe(
          response => {
            console.log(response.data);
            this.text = response.data.obj.message;
          },
          error => this.messageHandlerService.handleError(error)
        );
        this.modalOpened = true;
        if (msg.title) { this.title = msg.title; }
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


