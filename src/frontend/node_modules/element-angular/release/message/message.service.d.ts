import { ElMessageContainer } from './message';
import { ExDynamicService } from '../shared/services';
export interface Options {
    type?: string;
    iconClass?: string;
    customClass?: string;
    duration?: number;
    showClose?: boolean;
    center?: boolean;
    zIndex?: number;
    onClose?: Function;
}
export declare class ElMessageService {
    private root;
    private dynamic;
    components: any[];
    constructor(root: ElMessageContainer, dynamic: ExDynamicService);
    show(msg: string): void;
    success(msg: string): void;
    warning(msg: string): void;
    info(msg: string): void;
    error(msg: string): void;
    setOptions(options: Options): void;
    createComponent(): void;
}
