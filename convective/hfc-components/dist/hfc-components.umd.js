(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material'), require('@angular/flex-layout/index')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/material', '@angular/flex-layout/index'], factory) :
	(factory((global['hfc-components'] = {}),global._angular_core,global._angular_common,global._angular_material,global._angular_flexLayout_index));
}(this, (function (exports,_angular_core,_angular_common,_angular_material,_angular_flexLayout_index) { 'use strict';

var SearchPanelComponent = (function () {
    function SearchPanelComponent() {
        this.expanded = true;
        this.formData = new _angular_core.EventEmitter();
        this.expandedChanged = new _angular_core.EventEmitter();
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
SearchPanelComponent.decorators = [
    { type: _angular_core.Component, args: [{
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
    'title': [{ type: _angular_core.Input },],
    'description': [{ type: _angular_core.Input },],
    'expanded': [{ type: _angular_core.Input },],
    'formData': [{ type: _angular_core.Output },],
    'expandedChanged': [{ type: _angular_core.Output },],
    'content': [{ type: _angular_core.ContentChild, args: ['content',] },],
};

var HfcComponentsModule = (function () {
    function HfcComponentsModule() {
    }
    /**
     * @return {?}
     */
    HfcComponentsModule.forRoot = function () {
        return {
            ngModule: HfcComponentsModule,
            providers: []
        };
    };
    return HfcComponentsModule;
}());
HfcComponentsModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule,
                    _angular_material.MdCardModule,
                    _angular_material.MdButtonModule,
                    _angular_material.MdExpansionModule,
                    _angular_material.MdInputModule,
                    _angular_material.MdSelectModule,
                    _angular_flexLayout_index.FlexLayoutModule
                ],
                declarations: [
                    SearchPanelComponent
                ],
                exports: [
                    SearchPanelComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
HfcComponentsModule.ctorParameters = function () { return []; };

exports.HfcComponentsModule = HfcComponentsModule;
exports.SearchPanelComponent = SearchPanelComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
