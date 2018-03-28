"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wjcOlap = require("wijmo/wijmo.olap");
/*
    *
    * Wijmo Library 5.20171.300
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
/**
* Contains Angular 2 components for the <b>wijmo.olap</b> module.
*
* <b>wijmo.angular2.olap</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjOlap from 'wijmo/wijmo.angular2.olap';
* &nbsp;
* &#64;Component({
*     directives: [wjOlap.WjPivotGrid],
*     template: '&lt;wj-pivot-grid [itemsSource]="data"&gt;&lt;/wj-pivot-grid&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.olap'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjPivotGridMeta = {
    selector: 'wj-pivot-grid',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'newRowAtTop',
        'allowAddNew',
        'allowDelete',
        'allowDragging',
        'allowMerging',
        'allowResizing',
        'allowSorting',
        'autoSizeMode',
        'autoGenerateColumns',
        'childItemsPath',
        'groupHeaderFormat',
        'headersVisibility',
        'showSelectedHeaders',
        'showMarquee',
        'itemFormatter',
        'isReadOnly',
        'imeEnabled',
        'mergeManager',
        'selectionMode',
        'showGroups',
        'showSort',
        'showAlternatingRows',
        'showErrors',
        'validateEdits',
        'treeIndent',
        'itemsSource',
        'autoClipboard',
        'frozenRows',
        'frozenColumns',
        'deferResizing',
        'sortRowIndex',
        'stickyHeaders',
        'preserveSelectedState',
        'preserveOutlineState',
        'showDetailOnDoubleClick',
        'customContextMenu',
        'collapsibleSubtotals',
        'centerHeadersVertically',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'beginningEditNg: beginningEdit',
        'cellEditEndedNg: cellEditEnded',
        'cellEditEndingNg: cellEditEnding',
        'prepareCellForEditNg: prepareCellForEdit',
        'formatItemNg: formatItem',
        'resizingColumnNg: resizingColumn',
        'resizedColumnNg: resizedColumn',
        'autoSizingColumnNg: autoSizingColumn',
        'autoSizedColumnNg: autoSizedColumn',
        'draggingColumnNg: draggingColumn',
        'draggingColumnOverNg: draggingColumnOver',
        'draggedColumnNg: draggedColumn',
        'sortingColumnNg: sortingColumn',
        'sortedColumnNg: sortedColumn',
        'resizingRowNg: resizingRow',
        'resizedRowNg: resizedRow',
        'autoSizingRowNg: autoSizingRow',
        'autoSizedRowNg: autoSizedRow',
        'draggingRowNg: draggingRow',
        'draggingRowOverNg: draggingRowOver',
        'draggedRowNg: draggedRow',
        'deletingRowNg: deletingRow',
        'loadingRowsNg: loadingRows',
        'loadedRowsNg: loadedRows',
        'rowEditStartingNg: rowEditStarting',
        'rowEditStartedNg: rowEditStarted',
        'rowEditEndingNg: rowEditEnding',
        'rowEditEndedNg: rowEditEnded',
        'rowAddedNg: rowAdded',
        'groupCollapsedChangedNg: groupCollapsedChanged',
        'groupCollapsedChangingNg: groupCollapsedChanging',
        'itemsSourceChangedNg: itemsSourceChanged',
        'selectionChangingNg: selectionChanging',
        'selectionChangedNg: selectionChanged',
        'scrollPositionChangedNg: scrollPositionChanged',
        'updatingViewNg: updatingView',
        'updatedViewNg: updatedView',
        'updatingLayoutNg: updatingLayout',
        'updatedLayoutNg: updatedLayout',
        'pastingNg: pasting',
        'pastedNg: pasted',
        'pastingCellNg: pastingCell',
        'pastedCellNg: pastedCell',
        'copyingNg: copying',
        'copiedNg: copied',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.olap.PivotGrid control.
 *
 * Use the <b>wj-pivot-grid</b> component to add <b>PivotGrid</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjPivotGrid</b> component is derived from the <b>PivotGrid</b> control and
 * inherits all its properties, events and methods.
*/
var WjPivotGrid = (function (_super) {
    __extends(WjPivotGrid, _super);
    function WjPivotGrid(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>beginningEdit</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>beginningEdit</b> Wijmo event name.
         */
        _this.beginningEditNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>cellEditEnded</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>cellEditEnded</b> Wijmo event name.
         */
        _this.cellEditEndedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>cellEditEnding</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>cellEditEnding</b> Wijmo event name.
         */
        _this.cellEditEndingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>prepareCellForEdit</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>prepareCellForEdit</b> Wijmo event name.
         */
        _this.prepareCellForEditNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
         */
        _this.formatItemNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>resizingColumn</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>resizingColumn</b> Wijmo event name.
         */
        _this.resizingColumnNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>resizedColumn</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>resizedColumn</b> Wijmo event name.
         */
        _this.resizedColumnNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>autoSizingColumn</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>autoSizingColumn</b> Wijmo event name.
         */
        _this.autoSizingColumnNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>autoSizedColumn</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>autoSizedColumn</b> Wijmo event name.
         */
        _this.autoSizedColumnNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>draggingColumn</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>draggingColumn</b> Wijmo event name.
         */
        _this.draggingColumnNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>draggingColumnOver</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>draggingColumnOver</b> Wijmo event name.
         */
        _this.draggingColumnOverNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>draggedColumn</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>draggedColumn</b> Wijmo event name.
         */
        _this.draggedColumnNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>sortingColumn</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>sortingColumn</b> Wijmo event name.
         */
        _this.sortingColumnNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>sortedColumn</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>sortedColumn</b> Wijmo event name.
         */
        _this.sortedColumnNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>resizingRow</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>resizingRow</b> Wijmo event name.
         */
        _this.resizingRowNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>resizedRow</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>resizedRow</b> Wijmo event name.
         */
        _this.resizedRowNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>autoSizingRow</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>autoSizingRow</b> Wijmo event name.
         */
        _this.autoSizingRowNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>autoSizedRow</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>autoSizedRow</b> Wijmo event name.
         */
        _this.autoSizedRowNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>draggingRow</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>draggingRow</b> Wijmo event name.
         */
        _this.draggingRowNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>draggingRowOver</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>draggingRowOver</b> Wijmo event name.
         */
        _this.draggingRowOverNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>draggedRow</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>draggedRow</b> Wijmo event name.
         */
        _this.draggedRowNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>deletingRow</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>deletingRow</b> Wijmo event name.
         */
        _this.deletingRowNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>loadingRows</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>loadingRows</b> Wijmo event name.
         */
        _this.loadingRowsNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>loadedRows</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>loadedRows</b> Wijmo event name.
         */
        _this.loadedRowsNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rowEditStarting</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rowEditStarting</b> Wijmo event name.
         */
        _this.rowEditStartingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rowEditStarted</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rowEditStarted</b> Wijmo event name.
         */
        _this.rowEditStartedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rowEditEnding</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rowEditEnding</b> Wijmo event name.
         */
        _this.rowEditEndingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rowEditEnded</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rowEditEnded</b> Wijmo event name.
         */
        _this.rowEditEndedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rowAdded</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rowAdded</b> Wijmo event name.
         */
        _this.rowAddedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>groupCollapsedChanged</b> Wijmo event name.
         */
        _this.groupCollapsedChangedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanging</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>groupCollapsedChanging</b> Wijmo event name.
         */
        _this.groupCollapsedChangingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>itemsSourceChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>itemsSourceChanged</b> Wijmo event name.
         */
        _this.itemsSourceChangedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>selectionChanging</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>selectionChanging</b> Wijmo event name.
         */
        _this.selectionChangingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
         */
        _this.selectionChangedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>scrollPositionChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>scrollPositionChanged</b> Wijmo event name.
         */
        _this.scrollPositionChangedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>updatingView</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>updatingView</b> Wijmo event name.
         */
        _this.updatingViewNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>updatedView</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>updatedView</b> Wijmo event name.
         */
        _this.updatedViewNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>updatingLayout</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>updatingLayout</b> Wijmo event name.
         */
        _this.updatingLayoutNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>updatedLayout</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>updatedLayout</b> Wijmo event name.
         */
        _this.updatedLayoutNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>pasting</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>pasting</b> Wijmo event name.
         */
        _this.pastingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>pasted</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>pasted</b> Wijmo event name.
         */
        _this.pastedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>pastingCell</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>pastingCell</b> Wijmo event name.
         */
        _this.pastingCellNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>pastedCell</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>pastedCell</b> Wijmo event name.
         */
        _this.pastedCellNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>copying</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>copying</b> Wijmo event name.
         */
        _this.copyingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>copied</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>copied</b> Wijmo event name.
         */
        _this.copiedNg = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjPivotGrid.prototype.created = function () {
    };
    WjPivotGrid.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjPivotGrid.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjPivotGrid.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjPivotGrid;
}(wjcOlap.PivotGrid));
WjPivotGrid.meta = {
    outputs: exports.wjPivotGridMeta.outputs,
};
WjPivotGrid.decorators = [
    { type: core_1.Component, args: [{
                selector: exports.wjPivotGridMeta.selector,
                template: exports.wjPivotGridMeta.template,
                inputs: exports.wjPivotGridMeta.inputs,
                outputs: exports.wjPivotGridMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotGrid; }) }
                ].concat(exports.wjPivotGridMeta.providers)
            },] },
];
/** @nocollapse */
WjPivotGrid.ctorParameters = function () { return [
    { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
    { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
    { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
]; };
exports.WjPivotGrid = WjPivotGrid;
exports.wjPivotChartMeta = {
    selector: 'wj-pivot-chart',
    template: "",
    inputs: [
        'wjModelProperty',
        'chartType',
        'showHierarchicalAxes',
        'showTotals',
        'stacking',
        'maxSeries',
        'maxPoints',
        'itemsSource',
    ],
    outputs: [
        'initialized',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.olap.PivotChart control.
 *
 * Use the <b>wj-pivot-chart</b> component to add <b>PivotChart</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjPivotChart</b> component is derived from the <b>PivotChart</b> control and
 * inherits all its properties, events and methods.
*/
var WjPivotChart = (function (_super) {
    __extends(WjPivotChart, _super);
    function WjPivotChart(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjPivotChart.prototype.created = function () {
    };
    WjPivotChart.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjPivotChart.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjPivotChart.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjPivotChart;
}(wjcOlap.PivotChart));
WjPivotChart.meta = {
    outputs: exports.wjPivotChartMeta.outputs,
};
WjPivotChart.decorators = [
    { type: core_1.Component, args: [{
                selector: exports.wjPivotChartMeta.selector,
                template: exports.wjPivotChartMeta.template,
                inputs: exports.wjPivotChartMeta.inputs,
                outputs: exports.wjPivotChartMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotChart; }) }
                ].concat(exports.wjPivotChartMeta.providers)
            },] },
];
/** @nocollapse */
WjPivotChart.ctorParameters = function () { return [
    { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
    { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
    { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
]; };
exports.WjPivotChart = WjPivotChart;
exports.wjPivotPanelMeta = {
    selector: 'wj-pivot-panel',
    template: "",
    inputs: [
        'wjModelProperty',
        'autoGenerateFields',
        'viewDefinition',
        'engine',
        'itemsSource',
    ],
    outputs: [
        'initialized',
        'itemsSourceChangedNg: itemsSourceChanged',
        'viewDefinitionChangedNg: viewDefinitionChanged',
        'updatingViewNg: updatingView',
        'updatedViewNg: updatedView',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.olap.PivotPanel control.
 *
 * Use the <b>wj-pivot-panel</b> component to add <b>PivotPanel</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjPivotPanel</b> component is derived from the <b>PivotPanel</b> control and
 * inherits all its properties, events and methods.
*/
var WjPivotPanel = (function (_super) {
    __extends(WjPivotPanel, _super);
    function WjPivotPanel(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>itemsSourceChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>itemsSourceChanged</b> Wijmo event name.
         */
        _this.itemsSourceChangedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>viewDefinitionChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>viewDefinitionChanged</b> Wijmo event name.
         */
        _this.viewDefinitionChangedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>updatingView</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>updatingView</b> Wijmo event name.
         */
        _this.updatingViewNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>updatedView</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>updatedView</b> Wijmo event name.
         */
        _this.updatedViewNg = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjPivotPanel.prototype.created = function () {
    };
    WjPivotPanel.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjPivotPanel.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjPivotPanel.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjPivotPanel;
}(wjcOlap.PivotPanel));
WjPivotPanel.meta = {
    outputs: exports.wjPivotPanelMeta.outputs,
};
WjPivotPanel.decorators = [
    { type: core_1.Component, args: [{
                selector: exports.wjPivotPanelMeta.selector,
                template: exports.wjPivotPanelMeta.template,
                inputs: exports.wjPivotPanelMeta.inputs,
                outputs: exports.wjPivotPanelMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotPanel; }) }
                ].concat(exports.wjPivotPanelMeta.providers)
            },] },
];
/** @nocollapse */
WjPivotPanel.ctorParameters = function () { return [
    { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
    { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
    { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
]; };
exports.WjPivotPanel = WjPivotPanel;
var moduleExports = [
    WjPivotGrid,
    WjPivotChart,
    WjPivotPanel
];
var WjOlapModule = (function () {
    function WjOlapModule() {
    }
    return WjOlapModule;
}());
WjOlapModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            },] },
];
/** @nocollapse */
WjOlapModule.ctorParameters = function () { return []; };
exports.WjOlapModule = WjOlapModule;
//# sourceMappingURL=wijmo.angular2.olap.js.map