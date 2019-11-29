export var /** @type {?} */ notEmptyArray = function (arr) {
    if (!Array.isArray(arr))
        return false;
    return arr && arr.length > 0;
};
export var /** @type {?} */ makeRandomID = function () { return Math.random().toString(16).slice(-8); };
var ModelStandard = /** @class */ (function () {
    /**
     * @param {?} init
     */
    function ModelStandard(init) {
        this.init = init;
    }
    /**
     * @param {?} models
     * @return {?}
     */
    ModelStandard.LoopRemoveChecked = function (models) {
        models.forEach(function (item) {
            item.checked = false;
            if (item.children && item.children.length) {
                ModelStandard.LoopRemoveChecked(item.children);
            }
        });
    };
    /**
     * @param {?} id
     * @param {?} models
     * @param {?} accordion
     * @return {?}
     */
    ModelStandard.DeepUpdateExpanded = function (id, models, accordion) {
        if (!models || !models.length)
            return [];
        var /** @type {?} */ index = models.findIndex(function (item) { return item.id === id; });
        if (index === -1)
            return models.map(function (item) {
                return Object.assign(item, {
                    children: ModelStandard.DeepUpdateExpanded(id, item.children || [], accordion)
                });
            });
        // in accordion mode, only open one.
        // dont return new object, new object will cause the component to be re rendered,
        // and the current animation may be lost.
        var /** @type {?} */ nextExpanded = !models[index].expanded;
        if (accordion) {
            models = models.map(function (item) { return Object.assign(item, {
                expanded: false
            }); });
        }
        models[index].expanded = nextExpanded;
        return models;
    };
    /**
     * @param {?} id
     * @param {?} models
     * @return {?}
     */
    ModelStandard.DeepUpdateChecked = function (id, models) {
        if (!models || !models.length)
            return [];
        var /** @type {?} */ index = models.findIndex(function (item) { return item.id === id; });
        if (index === -1) {
            models.forEach(function (item) {
                var /** @type {?} */ nextChildren = ModelStandard.DeepUpdateChecked(id, item.children || []);
                var /** @type {?} */ nextIndeterminate = !!nextChildren.find(function (item) { return item.checked || item._indeterminate; });
                var /** @type {?} */ allChecked = nextChildren.length > 0 && !nextChildren.find(function (item) { return !item.checked; });
                item._indeterminate = allChecked ? false : nextIndeterminate;
                item.children = nextChildren;
                // leaf have have no subelements so no need to be updated。
                // leaf element is not affected by subelements.
                if (nextChildren.length) {
                    item.checked = allChecked;
                }
            });
            return models;
        }
        models[index].checked = !models[index].checked;
        models[index]._indeterminate = false;
        if (models[index].children && models[index].children.length > 0) {
            ModelStandard.SetChildrenChecked(models[index].children, models[index].checked);
        }
        return models;
    };
    /**
     * @param {?} models
     * @param {?} checked
     * @return {?}
     */
    ModelStandard.SetChildrenChecked = function (models, checked) {
        models.forEach(function (item) {
            item.checked = checked;
            if (item.children && item.children.length) {
                ModelStandard.SetChildrenChecked(item.children, checked);
            }
        });
    };
    /**
     * @param {?} models
     * @return {?}
     */
    ModelStandard.FindAllChecked = function (models) {
        var /** @type {?} */ checkedLabels = models.reduce(function (labels, item) {
            if (labels === void 0) { labels = []; }
            var /** @type {?} */ childrenLabels = (item.children && item.children.length)
                ? ModelStandard.FindAllChecked(item.children)
                : [];
            return labels.concat.apply(labels, childrenLabels.concat([item.checked ? item.label : []]));
        }, []);
        return checkedLabels;
    };
    /**
     * @param {?} models
     * @return {?}
     */
    ModelStandard.prototype.filterModel = function (models) {
        return this.updateDepthIdent(models, this.init.initDepth);
    };
    /**
     * @param {?} models
     * @param {?} depth
     * @return {?}
     */
    ModelStandard.prototype.updateDepthIdent = function (models, depth) {
        var _this = this;
        return models.map(function (item) {
            var /** @type {?} */ nextID = item.id || makeRandomID();
            var /** @type {?} */ nextChildren = notEmptyArray(item.children)
                ? _this.updateDepthIdent(item.children, depth + 1) : [];
            var /** @type {?} */ nextIndeterminate = !!nextChildren.find(function (item) { return item.checked || item._indeterminate; });
            var /** @type {?} */ allChecked = nextChildren.length > 0 && !nextChildren.find(function (item) { return !item.checked; });
            return Object.assign({}, item, {
                id: nextID,
                checked: allChecked || _this.isChecked(nextID, item),
                _level: depth ? depth + 1 : 1,
                expanded: _this.isExpanded(nextID, item),
                _indeterminate: allChecked ? false : nextIndeterminate,
                children: nextChildren,
            });
        });
    };
    /**
     * @param {?} id
     * @param {?} item
     * @return {?}
     */
    ModelStandard.prototype.isExpanded = function (id, item) {
        if (item.expanded === true)
            return true;
        if (this.init.defaultExpandAll)
            return true;
        if (!this.init.defaultExpandedKeys.length)
            return false;
        return !!this.init.defaultExpandedKeys.find(function (key) { return key === id; });
    };
    /**
     * @param {?} id
     * @param {?} item
     * @return {?}
     */
    ModelStandard.prototype.isChecked = function (id, item) {
        if (item.checked === true)
            return true;
        if (!this.init.defaultCheckedKeys.length)
            return false;
        return !!this.init.defaultCheckedKeys.find(function (key) { return key === id; });
    };
    return ModelStandard;
}());
export { ModelStandard };
function ModelStandard_tsickle_Closure_declarations() {
    /** @type {?} */
    ModelStandard.prototype.init;
}
//# sourceMappingURL=utils.js.map