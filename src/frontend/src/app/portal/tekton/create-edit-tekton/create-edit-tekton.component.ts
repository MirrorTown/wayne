import { Component } from '@angular/core';
import { MessageHandlerService } from '../../../shared/message-handler/message-handler.service';
import 'rxjs/add/observable/combineLatest';
import { Deployment } from '../../../shared/model/v1/deployment';
import { DeploymentService } from '../../../shared/client/v1/deployment.service';
import { AuthService } from '../../../shared/auth/auth.service';
import { CreateEditTektonResource } from '../../../shared/base/resource/create-edit-tekton-resource';
import {TektonService} from "../../../shared/client/v1/tekton.service";
import {Tekton, VolumnMeta} from "../../../shared/model/v1/tekton";

@Component({
  selector: 'create-edit-tekton',
  templateUrl: 'create-edit-tekton.component.html',
  styleUrls: ['create-edit-tekton.scss']
})

export class CreateEditTektonComponent extends CreateEditTektonResource {
  constructor(
    public tektonService: TektonService,
    public authService: AuthService,
    public messageHandlerService: MessageHandlerService) {
    super(tektonService, authService, messageHandlerService);
    this.registResource(new Tekton());
    this.registResourceType('Trigger');
  }

  trackByFn(index, item) {
    return index;
  }
}


