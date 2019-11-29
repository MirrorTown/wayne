declare const removeNgTag: (nativeElement: HTMLElement) => void;
declare const isParentTag: (nativeElement: HTMLElement, parentTag: string) => boolean;
declare const isParentAttr: (nativeElement: HTMLElement, parentAttr: string) => boolean | HTMLElement;
export { removeNgTag, isParentTag, isParentAttr };
