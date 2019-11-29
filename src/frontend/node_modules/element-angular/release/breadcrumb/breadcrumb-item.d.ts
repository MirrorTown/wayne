import { OnInit, ElementRef } from '@angular/core';
import { ElBreadcrumb } from './breadcrumb';
import { Router } from '@angular/router';
export declare class ElBreadcrumbItem implements OnInit {
    root: ElBreadcrumb;
    private router;
    private el;
    to: string;
    prevent: boolean;
    extras?: any;
    constructor(root: ElBreadcrumb, router: Router, el: ElementRef);
    clickHandle(event: Event): any;
    ngOnInit(): void;
}
