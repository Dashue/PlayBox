import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
var SearchPanelComponent = (function () {
    function SearchPanelComponent() {
        this.expanded = true;
        this.formData = new EventEmitter();
        this.expandedChanged = new EventEmitter();
    }
    /**
     * @return {?}
     */
    SearchPanelComponent.prototype.ngOnInit = function () { };
    /**
     * @return {?}
     */
    SearchPanelComponent.prototype.clear = function () {
        this.content.clear();
    };
    /**
     * @return {?}
     */
    SearchPanelComponent.prototype.submit = function () {
        this.content.submit();
    };
    /**
     * @param {?} data
     * @return {?}
     */
    SearchPanelComponent.prototype.onFormData = function (data) {
        this.formData.emit(data);
    };
    /**
     * @return {?}
     */
    SearchPanelComponent.prototype.opened = function () {
        this.expandedChanged.emit(true);
    };
    /**
     * @return {?}
     */
    SearchPanelComponent.prototype.closed = function () {
        this.expandedChanged.emit(false);
    };
    return SearchPanelComponent;
}());
export { SearchPanelComponent };
SearchPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'hfc-search-panel',
                template: "<md-expansion-panel [expanded]=\"expanded\" (opened)=\"opened()\" (closed)=\"closed()\"> <md-expansion-panel-header> <mat-panel-description>{{description}}</mat-panel-description> <mat-panel-title>{{title}}</mat-panel-title> </md-expansion-panel-header> <ng-content (formData)=\"onFormData($event)\"></ng-content> <md-action-row> <button md-button color=\"primary\" (click)=\"clear()\">Reset</button> <button md-button color=\"accent\" (click)=\"submit()\">Search</button> </md-action-row> </md-expansion-panel> ",
                styles: [""]
            },] },
];
/**
 * @nocollapse
 */
SearchPanelComponent.ctorParameters = function () { return []; };
SearchPanelComponent.propDecorators = {
    'title': [{ type: Input },],
    'description': [{ type: Input },],
    'expanded': [{ type: Input },],
    'formData': [{ type: Output },],
    'expandedChanged': [{ type: Output },],
    'content': [{ type: ContentChild, args: ['content',] },],
};
function SearchPanelComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchPanelComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SearchPanelComponent.ctorParameters;
    /** @type {?} */
    SearchPanelComponent.propDecorators;
    /** @type {?} */
    SearchPanelComponent.prototype.title;
    /** @type {?} */
    SearchPanelComponent.prototype.description;
    /** @type {?} */
    SearchPanelComponent.prototype.expanded;
    /** @type {?} */
    SearchPanelComponent.prototype.formData;
    /** @type {?} */
    SearchPanelComponent.prototype.expandedChanged;
    /** @type {?} */
    SearchPanelComponent.prototype.content;
}
