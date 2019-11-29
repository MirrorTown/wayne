import { OnInit, TemplateRef } from '@angular/core';
import { ElCollapse, ModelValue } from './collapse';
export declare class ElCollapseItem implements OnInit {
    private root;
    labelTmp: TemplateRef<any>;
    label: string;
    value: ModelValue | null;
    isActive: boolean;
    constructor(root: ElCollapse);
    updateActiveStatus(): void;
    clickHandle(): void;
    ngOnInit(): void;
}
