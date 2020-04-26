import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

class Message {
  text: string;
  deploymentId: number;
  appId: number;
  title?: string;
}


@Injectable()
export class TplDeployLogservice {

  text = new Subject<Message>();

  text$ = this.text.asObservable();

  openModal(text: string, deploymentId: number, appId: number, title?: string) {
    console.log(text);
    const msg = new Message();
    msg.text = text;
    msg.deploymentId = deploymentId;
    msg.appId = appId;
    if (title) { msg.title = title; }
    this.text.next(msg);
  }

}
