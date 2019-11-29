import { ComponentRef, ComponentFactoryResolver, Injector, ApplicationRef } from '@angular/core';
export declare class DocumentWrapper extends Document {
}
export declare class WindowWrapper extends Window {
}
export declare class ExDynamicService {
    private document;
    private factory;
    private injector;
    private appRef;
    constructor(document: DocumentWrapper, factory: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef);
    generator(Container: any): ComponentRef<any>;
    destroy(com: ComponentRef<any>): void;
    destroyWait(com: ComponentRef<any>): void;
    makeID(): string;
}
