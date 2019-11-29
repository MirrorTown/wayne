import { ElTreeProps, ElTreeModelEvent, ElTreeModelData } from './tree-props';
export declare type UserSafeHooks = {
    findAllChecked: () => string[];
    removeAllChecked: () => void;
    updateItemChecked: (id: string | number) => void;
    updateItemExpanded: (id: string | number) => void;
};
export declare class ElTree extends ElTreeProps {
    model: ElTreeModelData[];
    constructor();
    userSafeHooks: () => UserSafeHooks;
    findAllChecked(): string[];
    removeAllChecked(): void;
    updateExpanded(id: string | number): void;
    updateChecked(id: string | number): void;
    emitter(next: ElTreeModelEvent): void;
}
