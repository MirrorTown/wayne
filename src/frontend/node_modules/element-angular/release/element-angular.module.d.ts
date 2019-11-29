import { ModuleWithProviders } from '@angular/core';
import { ElMessageService } from './message/message.service';
import { ElNotificationService } from './notification/notification.service';
export declare const ElChildModules: any;
export declare const ELMODULES_GROUP: any[];
declare class ElModule {
    static forRoot(): ModuleWithProviders;
}
export { ElModule, ElMessageService, ElNotificationService };
