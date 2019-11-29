import { ElNotificationContainer } from './notification';
import { ExDynamicService } from '../shared/services';
export interface Options {
    type?: string;
    offset?: number;
    position?: string;
    iconClass?: string;
    customClass?: string;
    duration?: number;
    showClose?: boolean;
    zIndex?: number;
    onClose?: Function;
}
export declare class ElNotificationService {
    private root;
    private dynamic;
    components: any[];
    constructor(root: ElNotificationContainer, dynamic: ExDynamicService);
    show(msg: string, title?: string): void;
    success(msg: string, title?: string): void;
    warning(msg: string, title?: string): void;
    info(msg: string, title?: string): void;
    error(msg: string, title?: string): void;
    setOptions(options: Options): void;
    createComponent(): void;
}
