var /** @type {?} */ removeNgTag = function (nativeElement) {
    var /** @type {?} */ parentElement = nativeElement.parentElement;
    if (!parentElement || !parentElement.insertBefore)
        return;
    while (nativeElement.firstChild) {
        parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    parentElement.removeChild(nativeElement);
};
var /** @type {?} */ isParentTag = function (nativeElement, parentTag) {
    var /** @type {?} */ parentIsTag = false;
    var /** @type {?} */ parent = nativeElement.parentElement;
    var /** @type {?} */ findLen = 3, /** @type {?} */ lowerName = '';
    while (findLen) {
        lowerName = parent.localName.toLowerCase();
        if (lowerName.indexOf('el') > -1) {
            parentIsTag = lowerName === parentTag;
            findLen = 0;
        }
        else {
            parent = parent.parentElement;
            findLen--;
        }
    }
    return parentIsTag;
};
var /** @type {?} */ isParentAttr = function (nativeElement, parentAttr) {
    var /** @type {?} */ parentIsAttr = false;
    var /** @type {?} */ parent = nativeElement.parentElement;
    var /** @type {?} */ findLen = 5;
    while (findLen) {
        parentIsAttr = parent.hasAttribute(parentAttr);
        if (parentIsAttr) {
            parentIsAttr = parent;
            findLen = 0;
        }
        else {
            parent = parent.parentElement;
            findLen--;
        }
    }
    return parentIsAttr;
};
export { removeNgTag, isParentTag, isParentAttr, };
//# sourceMappingURL=host.js.map