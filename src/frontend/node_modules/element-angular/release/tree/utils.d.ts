import { ElTreeModelData } from './tree-props';
export declare const notEmptyArray: (arr?: any) => boolean;
export declare const makeRandomID: () => string;
export declare type ModelStandardInit = {
    initDepth: number;
    defaultExpandAll: boolean;
    defaultExpandedKeys: Array<string | number>;
    defaultCheckedKeys: Array<string | number>;
};
export declare class ModelStandard {
    private init;
    static LoopRemoveChecked(models: ElTreeModelData[]): void;
    static DeepUpdateExpanded(id: string | number, models: ElTreeModelData[], accordion: boolean): ElTreeModelData[];
    static DeepUpdateChecked(id: string | number, models: ElTreeModelData[]): ElTreeModelData[];
    static SetChildrenChecked(models: ElTreeModelData[], checked: boolean): void;
    static FindAllChecked(models: ElTreeModelData[]): string[];
    constructor(init: ModelStandardInit);
    filterModel(models: ElTreeModelData[]): ElTreeModelData[];
    private updateDepthIdent(models, depth);
    private isExpanded(id, item);
    private isChecked(id, item);
}
