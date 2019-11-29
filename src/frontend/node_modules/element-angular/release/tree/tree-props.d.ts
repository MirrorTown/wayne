import { EventEmitter } from '@angular/core';
export declare type ElTreeModelData = {
    label: string;
    checked?: boolean;
    expanded?: boolean;
    _level?: number;
    _indeterminate?: boolean;
    id?: number | string;
    children?: ElTreeModelData[];
};
export declare type ElTreeModelEvent = {
    label: string;
    treeNodeID: string | number;
    action: string;
    checked: boolean;
};
export declare class ElTreeProps {
    identModel: ElTreeModelData[];
    modelChange: EventEmitter<ElTreeModelEvent>;
    emptyText: string;
    showCheckbox: boolean;
    defaultExpandAll: boolean;
    defaultExpandedKeys: Array<string | number>;
    defaultCheckedKeys: Array<string | number>;
    expandOnClickNode: boolean;
    indent: number;
    accordion: boolean;
    disabled: boolean;
    elDisabled: boolean;
}
