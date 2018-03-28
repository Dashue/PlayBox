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
* Contains Angular 2 components for the <b>wijmo.grid.sheet</b> module.
*
* <b>wijmo.angular2.grid.sheet</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjSheet from 'wijmo/wijmo.angular2.grid.sheet';
* &nbsp;
* &#64;Component({
*     directives: [wjSheet.WjFlexSheet],
*     template: `&lt;wj-flex-sheet&gt;&lt;/wj-flex-sheet&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.sheet'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.grid.sheet", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexSheetMeta = {
        selector: 'wj-flex-sheet',
        template: "<div><ng-content></ng-content></div>",
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
            'isTabHolderVisible',
            'selectedSheetIndex',
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
            'selectedSheetChangedNg: selectedSheetChanged',
            'selectedSheetIndexChangePC: selectedSheetIndexChange',
            'draggingRowColumnNg: draggingRowColumn',
            'droppingRowColumnNg: droppingRowColumn',
            'loadedNg: loaded',
            'unknownFunctionNg: unknownFunction',
            'sheetClearedNg: sheetCleared',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.sheet.FlexSheet control.
     *
     * Use the <b>wj-flex-sheet</b> component to add <b>FlexSheet</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexSheet</b> component is derived from the <b>FlexSheet</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-sheet</b> component may contain a @see:wijmo/wijmo.angular2.grid.sheet.WjSheet child component.
    */
    var WjFlexSheet = WjFlexSheet_1 = (function (_super) {
        __extends(WjFlexSheet, _super);
        function WjFlexSheet(elRef, injector, parentCmp) {
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
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectedSheetChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectedSheetChanged</b> Wijmo event name.
             */
            _this.selectedSheetChangedNg = new core_1.EventEmitter(false);
            _this.selectedSheetIndexChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingRowColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingRowColumn</b> Wijmo event name.
             */
            _this.draggingRowColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>droppingRowColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>droppingRowColumn</b> Wijmo event name.
             */
            _this.droppingRowColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>loaded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>loaded</b> Wijmo event name.
             */
            _this.loadedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>unknownFunction</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>unknownFunction</b> Wijmo event name.
             */
            _this.unknownFunctionNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>sheetCleared</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>sheetCleared</b> Wijmo event name.
             */
            _this.sheetClearedNg = new core_1.EventEmitter(false);
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
        WjFlexSheet.prototype.created = function () {
        };
        WjFlexSheet.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexSheet.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexSheet.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexSheet;
    }(wijmo.grid.sheet.FlexSheet));
    WjFlexSheet.meta = {
        outputs: exports.wjFlexSheetMeta.outputs,
        changeEvents: {
            'selectedSheetChanged': ['selectedSheetIndex']
        },
    };
    WjFlexSheet = WjFlexSheet_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexSheetMeta.selector,
            template: exports.wjFlexSheetMeta.template,
            inputs: exports.wjFlexSheetMeta.inputs,
            outputs: exports.wjFlexSheetMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexSheet_1; }) }
            ].concat(exports.wjFlexSheetMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexSheet);
    exports.WjFlexSheet = WjFlexSheet;
    exports.wjSheetMeta = {
        selector: 'wj-sheet',
        template: "",
        inputs: [
            'wjProperty',
            'name',
            'itemsSource',
            'visible',
            'rowCount',
            'columnCount',
        ],
        outputs: [
            'initialized',
            'nameChangedNg: nameChanged',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.sheet.Sheet control.
     *
     * The <b>wj-sheet</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.grid.sheet.WjFlexSheet component.
     *
     * Use the <b>wj-sheet</b> component to add <b>Sheet</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjSheet</b> component is derived from the <b>Sheet</b> control and
     * inherits all its properties, events and methods.
    */
    var WjSheet = WjSheet_1 = (function (_super) {
        __extends(WjSheet, _super);
        function WjSheet(elRef, injector, parentCmp) {
            var _this = _super.call(this, parentCmp) || this;
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
             * Angular (EventEmitter) version of the Wijmo <b>nameChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>nameChanged</b> Wijmo event name.
             */
            _this.nameChangedNg = new core_1.EventEmitter(false);
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this._flexSheet = parentCmp;
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
        WjSheet.prototype.created = function () {
        };
        WjSheet.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
            //TBD: it should add itself to FlexSheet
            if (this.itemsSource) {
                return this._flexSheet.addBoundSheet(this.name, this.itemsSource);
            }
            else {
                return this._flexSheet.addUnboundSheet(this.name, this.boundRowCount != null ? +this.boundRowCount : null, this.boundColumnCount != null ? +this.boundColumnCount : null);
            }
        };
        WjSheet.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjSheet.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjSheet.prototype.ngOnChanges = function (changes) {
            var chg;
            if ((chg = changes['rowCount']) && chg.isFirstChange) {
                this.boundRowCount = chg.currentValue;
            }
            if ((chg = changes['columnCount']) && chg.isFirstChange) {
                this.boundColumnCount = chg.currentValue;
            }
        };
        return WjSheet;
    }(wijmo.grid.sheet.Sheet));
    WjSheet.meta = {
        outputs: exports.wjSheetMeta.outputs,
    };
    WjSheet = WjSheet_1 = __decorate([
        core_1.Component({
            selector: exports.wjSheetMeta.selector,
            template: exports.wjSheetMeta.template,
            inputs: exports.wjSheetMeta.inputs,
            outputs: exports.wjSheetMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjSheet_1; }) }
            ].concat(exports.wjSheetMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjSheet);
    exports.WjSheet = WjSheet;
    var moduleExports = [
        WjFlexSheet,
        WjSheet
    ];
    var WjGridSheetModule = (function () {
        function WjGridSheetModule() {
        }
        return WjGridSheetModule;
    }());
    WjGridSheetModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjGridSheetModule);
    exports.WjGridSheetModule = WjGridSheetModule;
    var WjFlexSheet_1, WjSheet_1;
});
