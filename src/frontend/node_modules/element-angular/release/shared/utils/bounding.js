var /** @type {?} */ getRealShape = function (el) {
    var /** @type {?} */ rect = el.getBoundingClientRect();
    var _a = window.getComputedStyle(el), width = _a.width, height = _a.height;
    var /** @type {?} */ getCSSStyleVal = function (val, parentNum) {
        if (!val)
            return 0;
        var /** @type {?} */ str = String(val);
        var /** @type {?} */ strVal = str.includes('px') ? str.split('px')[0] :
            str.includes('%') ? Number(str.split('%')[0]) * parentNum * 0.01 : str;
        return Number.isNaN(Number(strVal)) ? 0 : Number(strVal);
    };
    return {
        width: getCSSStyleVal(width, rect.width),
        height: getCSSStyleVal(height, rect.height),
    };
};
var /** @type {?} */ getPositionForDir = function (hostRect, selfRect, dir, arrowDir) {
    var /** @type {?} */ diffWidth = hostRect.width - selfRect.width;
    var /** @type {?} */ diffHeight = selfRect.height - hostRect.height;
    var /** @type {?} */ topMap = {
        top: -10 - selfRect.height,
        bottom: hostRect.height,
        left: arrowDir === 'start' ? 0 : arrowDir === 'end' ? 0 - diffHeight : 0 - Math.abs(diffHeight / 2),
        right: arrowDir === 'start' ? 0 : arrowDir === 'end' ? 0 - diffHeight : 0 - Math.abs(diffHeight / 2),
    };
    var /** @type {?} */ leftMap = {
        left: -10 - selfRect.width,
        right: hostRect.width,
        top: arrowDir === 'start' ? 0 : arrowDir === 'end' ? diffWidth : diffWidth / 2,
        bottom: arrowDir === 'start' ? 0 : arrowDir === 'end' ? diffWidth : diffWidth / 2,
    };
    var /** @type {?} */ isHorizontal = dir === 'left' || dir === 'right';
    var /** @type {?} */ arrowLen = isHorizontal
        ? arrowDir === 'center' ? selfRect.height : Math.min(hostRect.height, selfRect.height)
        : arrowDir === 'center' ? selfRect.width : Math.min(hostRect.height, selfRect.height);
    var /** @type {?} */ position = {
        arrowFace: dir,
        arrowDir: isHorizontal ? (arrowDir === 'end' ? 'bottom' : 'top') : (arrowDir === 'start' ? 'left' : 'right'),
        arrowPosition: arrowLen / 2 - 5,
        top: topMap[dir],
        left: leftMap[dir],
    };
    return position;
};
export { getPositionForDir, getRealShape, };
//# sourceMappingURL=bounding.js.map