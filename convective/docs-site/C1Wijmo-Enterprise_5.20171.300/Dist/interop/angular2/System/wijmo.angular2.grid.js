﻿/*
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
///<wijmo-soft-import from="wijmo.input"/>
System.register("wijmo/wijmo.angular2.grid", ["@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
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
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1, wjFlexGridMeta, WjFlexGrid, wjFlexGridColumnMeta, WjFlexGridColumn, WjFlexGridCellTemplate, CellTemplateType, DirectiveCellFactory, moduleExports, WjGridModule, WjFlexGrid_1, WjFlexGridColumn_1, WjFlexGridCellTemplate_1;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
                core_3 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (wijmo_angular2_directiveBase_1_1) {
                wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1;
            }
        ],
        execute: function () {
            ///<wijmo-soft-import from="wijmo.input"/>
            exports_1("wjFlexGridMeta", wjFlexGridMeta = {
                selector: 'wj-flex-grid',
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
            });
            WjFlexGrid = WjFlexGrid_1 = (function (_super) {
                __extends(WjFlexGrid, _super);
                function WjFlexGrid(elRef, injector, parentCmp, cdRef) {
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
                    new DirectiveCellFactory(_this, cdRef);
                    //TBD: patch: default row height, remove after the issue will be fixed in grid
                    _this.deferUpdate(function () {
                        if (_this.rows.defaultSize < 10) {
                            var e = _this.hostElement, csh = getComputedStyle(e), csb = getComputedStyle(document.body), defRowHei = parseInt(csh.fontSize && wijmo.contains(document.body, e) ? csh.fontSize : csb.fontSize) * 2;
                            _this.rows.defaultSize = defRowHei;
                            _this.columns.defaultSize = defRowHei * 4;
                            _this.columnHeaders.rows.defaultSize = defRowHei;
                            _this.rowHeaders.columns.defaultSize = Math.round(defRowHei * 1.25);
                        }
                    });
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
                WjFlexGrid.prototype.created = function () {
                };
                WjFlexGrid.prototype.ngOnInit = function () {
                    this._wjBehaviour.ngOnInit();
                };
                WjFlexGrid.prototype.ngAfterViewInit = function () {
                    this._wjBehaviour.ngAfterViewInit();
                };
                WjFlexGrid.prototype.ngOnDestroy = function () {
                    this._wjBehaviour.ngOnDestroy();
                };
                return WjFlexGrid;
            }(wijmo.grid.FlexGrid));
            WjFlexGrid.meta = {
                outputs: wjFlexGridMeta.outputs,
            };
            WjFlexGrid = WjFlexGrid_1 = __decorate([
                core_1.Component({
                    selector: wjFlexGridMeta.selector,
                    template: wjFlexGridMeta.template,
                    inputs: wjFlexGridMeta.inputs,
                    outputs: wjFlexGridMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGrid_1; }) }
                    ].concat(wjFlexGridMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
                __param(3, core_3.Inject(core_3.ChangeDetectorRef))
            ], WjFlexGrid);
            exports_1("WjFlexGrid", WjFlexGrid);
            exports_1("wjFlexGridColumnMeta", wjFlexGridColumnMeta = {
                selector: 'wj-flex-grid-column',
                template: "<div><ng-content></ng-content></div>",
                inputs: [
                    'wjProperty',
                    'name',
                    'dataMap',
                    'dataType',
                    'binding',
                    'sortMemberPath',
                    'format',
                    'header',
                    'width',
                    'minWidth',
                    'maxWidth',
                    'align',
                    'allowDragging',
                    'allowSorting',
                    'allowResizing',
                    'allowMerging',
                    'aggregate',
                    'isReadOnly',
                    'cssClass',
                    'isContentHtml',
                    'isSelected',
                    'visible',
                    'wordWrap',
                    'mask',
                    'inputType',
                    'isRequired',
                    'showDropDown',
                    'dropDownCssClass',
                ],
                outputs: [
                    'initialized',
                    'isSelectedChangePC: isSelectedChange',
                ],
                providers: []
            });
            WjFlexGridColumn = WjFlexGridColumn_1 = (function (_super) {
                __extends(WjFlexGridColumn, _super);
                function WjFlexGridColumn(elRef, injector, parentCmp) {
                    var _this = _super.call(this) || this;
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
                     * Gets or sets a name of a property that this component is assigned to.
                     * Default value is 'columns'.
                     */
                    _this.wjProperty = 'columns';
                    _this.isSelectedChangePC = new core_1.EventEmitter(false);
                    var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
                    var gridCmp = behavior.parentBehavior.directive;
                    if (gridCmp.autoGenerateColumns) {
                        gridCmp.autoGenerateColumns = false;
                        gridCmp.columns.clear();
                    }
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
                WjFlexGridColumn.prototype.created = function () {
                };
                WjFlexGridColumn.prototype.ngOnInit = function () {
                    this._wjBehaviour.ngOnInit();
                };
                WjFlexGridColumn.prototype.ngAfterViewInit = function () {
                    this._wjBehaviour.ngAfterViewInit();
                };
                WjFlexGridColumn.prototype.ngOnDestroy = function () {
                    this._wjBehaviour.ngOnDestroy();
                };
                return WjFlexGridColumn;
            }(wijmo.grid.Column));
            WjFlexGridColumn.meta = {
                outputs: wjFlexGridColumnMeta.outputs,
                changeEvents: {
                    'grid.selectionChanged': ['isSelected']
                },
            };
            WjFlexGridColumn = WjFlexGridColumn_1 = __decorate([
                core_1.Component({
                    selector: wjFlexGridColumnMeta.selector,
                    template: wjFlexGridColumnMeta.template,
                    inputs: wjFlexGridColumnMeta.inputs,
                    outputs: wjFlexGridColumnMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridColumn_1; }) }
                    ].concat(wjFlexGridColumnMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexGridColumn);
            exports_1("WjFlexGridColumn", WjFlexGridColumn);
            WjFlexGridCellTemplate = WjFlexGridCellTemplate_1 = (function () {
                function WjFlexGridCellTemplate(viewContainerRef, templateRef, elRef, parentCmp, domRenderer, injector, cdRef) {
                    this.viewContainerRef = viewContainerRef;
                    this.templateRef = templateRef;
                    this.elRef = elRef;
                    this.domRenderer = domRenderer;
                    this.cdRef = cdRef;
                    this.autoSizeRows = true;
                    if (parentCmp instanceof WjFlexGrid) {
                        this.grid = parentCmp;
                    }
                    else if (parentCmp instanceof WjFlexGridColumn) {
                        this.column = parentCmp;
                        this.grid = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getBehavior(parentCmp).parentBehavior.directive;
                    }
                }
                // returns the name of the property on control instance that stores info for the specified cell template type.
                WjFlexGridCellTemplate._getTemplContextProp = function (templateType) {
                    return '$__cellTempl' + CellTemplateType[templateType];
                };
                WjFlexGridCellTemplate.prototype.ngOnInit = function () {
                    this.ownerControl = this.column && this.column.grid === this.grid ? this.column : this.grid;
                    this._attachToControl();
                };
                WjFlexGridCellTemplate.prototype.ngOnDestroy = function () {
                    if (this.cellTypeStr) {
                        this.viewContainerRef.clear();
                        this.ownerControl[WjFlexGridCellTemplate_1._getTemplContextProp(this.cellType)] = null;
                        this.grid.invalidate();
                    }
                };
                WjFlexGridCellTemplate.prototype._instantiateTemplate = function (parent) {
                    return wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(parent, this.viewContainerRef, this.templateRef, this.domRenderer);
                };
                WjFlexGridCellTemplate.prototype._attachToControl = function () {
                    if (!this.cellTypeStr) {
                        return;
                    }
                    this.cellType = wijmo.asEnum(this.cellTypeStr, CellTemplateType);
                    this.ownerControl[WjFlexGridCellTemplate_1._getTemplContextProp(this.cellType)] = this;
                    this.grid.invalidate();
                };
                return WjFlexGridCellTemplate;
            }());
            WjFlexGridCellTemplate = WjFlexGridCellTemplate_1 = __decorate([
                core_2.Directive({
                    selector: '[wjFlexGridCellTemplate]',
                    inputs: ['wjFlexGridCellTemplate', 'cellTypeStr: cellType', 'cellOverflow', 'valuePaths',
                        'autoSizeRows'],
                    exportAs: 'wjFlexGridCellTemplate',
                    providers: [{ provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridCellTemplate_1; }) }]
                }),
                __param(0, core_3.Inject(core_2.ViewContainerRef)),
                __param(1, core_3.Inject(core_2.TemplateRef)), __param(1, core_2.Optional()),
                __param(2, core_3.Inject(core_2.ElementRef)),
                __param(3, core_3.Inject('WjComponent')), __param(3, core_3.SkipSelf()), __param(3, core_2.Optional()),
                __param(4, core_3.Inject(core_2.Renderer)),
                __param(5, core_3.Inject(core_2.Injector)),
                __param(6, core_3.Inject(core_3.ChangeDetectorRef))
            ], WjFlexGridCellTemplate);
            exports_1("WjFlexGridCellTemplate", WjFlexGridCellTemplate);
            /**
            * Defines the type of cell on which a template is to be applied. This value is specified in the <b>cellType</b> attribute
            * of the @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate directive.
            */
            (function (CellTemplateType) {
                /** Defines a regular (data) cell. */
                CellTemplateType[CellTemplateType["Cell"] = 0] = "Cell";
                /** Defines a cell in edit mode. */
                CellTemplateType[CellTemplateType["CellEdit"] = 1] = "CellEdit";
                /** Defines a column header cell. */
                CellTemplateType[CellTemplateType["ColumnHeader"] = 2] = "ColumnHeader";
                /** Defines a row header cell. */
                CellTemplateType[CellTemplateType["RowHeader"] = 3] = "RowHeader";
                /** Defines a row header cell in edit mode. */
                CellTemplateType[CellTemplateType["RowHeaderEdit"] = 4] = "RowHeaderEdit";
                /** Defines a top left cell. */
                CellTemplateType[CellTemplateType["TopLeft"] = 5] = "TopLeft";
                /** Defines a group header cell in a group row. */
                CellTemplateType[CellTemplateType["GroupHeader"] = 6] = "GroupHeader";
                /** Defines a regular cell in a group row. */
                CellTemplateType[CellTemplateType["Group"] = 7] = "Group";
                /** Defines a cell in a new row template. */
                CellTemplateType[CellTemplateType["NewCellTemplate"] = 8] = "NewCellTemplate";
                /** Defines a column footer cell. */
                CellTemplateType[CellTemplateType["ColumnFooter"] = 9] = "ColumnFooter";
                /** Defines a bottom left cell (at the intersection of the row header and column footer cells). **/
                CellTemplateType[CellTemplateType["BottomLeft"] = 10] = "BottomLeft";
            })(CellTemplateType || (CellTemplateType = {}));
            exports_1("CellTemplateType", CellTemplateType);
            DirectiveCellFactory = (function (_super) {
                __extends(DirectiveCellFactory, _super);
                function DirectiveCellFactory(grid, gridCdRef) {
                    var _this = _super.call(this) || this;
                    _this._needsCdCheck = false;
                    _this._lastApplyTimeStamp = 0;
                    _this._noApplyLag = false;
                    _this._startingEditing = false;
                    _this._cellStampCounter = 0;
                    _this.grid = grid;
                    _this._gridCdRef = gridCdRef;
                    // init _templateTypes
                    if (!DirectiveCellFactory._templateTypes) {
                        DirectiveCellFactory._templateTypes = [];
                        for (var templateType in CellTemplateType) {
                            if (isNaN(templateType)) {
                                DirectiveCellFactory._templateTypes.push(templateType);
                            }
                        }
                    }
                    var self = _this;
                    _this._baseCf = grid.cellFactory;
                    grid.cellFactory = _this;
                    // initialize input event dispatcher
                    _this._evtInput = document.createEvent('HTMLEvents');
                    _this._evtInput.initEvent('input', true, false);
                    // initialize blur event dispatcher
                    _this._evtBlur = document.createEvent('HTMLEvents');
                    _this._evtBlur.initEvent('blur', false, false);
                    // no $apply() lag while editing
                    grid.prepareCellForEdit.addHandler(function (s, e) {
                        self._noApplyLag = true;
                    });
                    grid.cellEditEnded.addHandler(function (s, e) {
                        // If column has no cell edit template, clear _editChar buffer.
                        if (e.range.col < 0 || e.range.col < grid.columns.length &&
                            !grid.columns[e.range.col][WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType.CellEdit)]) {
                            self._editChar = null;
                        }
                        setTimeout(function () {
                            self._noApplyLag = false;
                        }, 300);
                    });
                    grid.beginningEdit.addHandler(function (s, e) {
                        self._startingEditing = true;
                    });
                    grid.hostElement.addEventListener('keydown', function (e) {
                        self._startingEditing = false;
                    }, true);
                    grid.hostElement.addEventListener('keypress', function (e) {
                        var char = e.charCode > 32 ? String.fromCharCode(e.charCode) : null;
                        if (char) {
                            // Grid's _KeyboardHandler may receive 'keypress' before or after this handler (observed at least in IE,
                            // not clear why this happens). So both grid.activeEditor and _startingEditing (the latter is initialized in
                            // beginningEdit and cleared in 'keydown') participate in detecting whether this char has initialized a cell
                            // editing.
                            if (!grid.activeEditor || self._startingEditing) {
                                self._editChar = char;
                            }
                            else if (self._editChar) {
                                self._editChar += char;
                            }
                        }
                    }, true);
                    // If host component uses OnPush change detection, we need to markForCheck; otherwise,
                    // cell template bindings will not be updated.
                    grid.updatedView.addHandler(function () {
                        if (_this._needsCdCheck) {
                            _this._needsCdCheck = false;
                            _this._gridCdRef.markForCheck();
                        }
                    }, _this);
                    return _this;
                }
                DirectiveCellFactory.prototype.updateCell = function (panel, rowIndex, colIndex, cell, rng) {
                    this._cellStampCounter = (this._cellStampCounter + 1) % 10000000;
                    var cellStamp = cell[DirectiveCellFactory._cellStampProp] = this._cellStampCounter;
                    // restore overflow for any cell
                    if (cell.style.overflow) {
                        cell.style.overflow = '';
                    }
                    var self = this, grid = panel.grid, editRange = grid.editRange, templateType, row = panel.rows[rowIndex], dataItem = row.dataItem, isGridCtx = false, needCellValue = false, isEdit = false, isCvGroup = false;
                    // determine template type
                    switch (panel.cellType) {
                        case wijmo.grid.CellType.Cell:
                            if (editRange && editRange.row === rowIndex && editRange.col === colIndex) {
                                templateType = CellTemplateType.CellEdit;
                                needCellValue = isEdit = true;
                            }
                            else if (row instanceof wijmo.grid.GroupRow) {
                                isCvGroup = dataItem instanceof wijmo.collections.CollectionViewGroup;
                                var isHierNonGroup = !(isCvGroup || row.hasChildren);
                                if (colIndex == panel.columns.firstVisibleIndex) {
                                    templateType = isHierNonGroup ? CellTemplateType.Cell : CellTemplateType.GroupHeader;
                                }
                                else {
                                    templateType = isHierNonGroup ? CellTemplateType.Cell : CellTemplateType.Group;
                                    needCellValue = true;
                                }
                            }
                            else if (row instanceof wijmo.grid._NewRowTemplate) {
                                templateType = CellTemplateType.NewCellTemplate;
                            }
                            else if (!(wijmo.grid['detail'] && wijmo.grid['detail'].DetailRow &&
                                (row instanceof wijmo.grid['detail'].DetailRow))) {
                                templateType = CellTemplateType.Cell;
                            }
                            break;
                        case wijmo.grid.CellType.ColumnHeader:
                            templateType = CellTemplateType.ColumnHeader;
                            break;
                        case wijmo.grid.CellType.RowHeader:
                            templateType = grid.collectionView &&
                                grid.collectionView.currentEditItem === dataItem
                                ? CellTemplateType.RowHeaderEdit
                                : CellTemplateType.RowHeader;
                            isGridCtx = true;
                            break;
                        case wijmo.grid.CellType.TopLeft:
                            templateType = CellTemplateType.TopLeft;
                            isGridCtx = true;
                            break;
                        case wijmo.grid.CellType.ColumnFooter:
                            templateType = CellTemplateType.ColumnFooter;
                            needCellValue = true;
                            break;
                        case wijmo.grid.CellType.BottomLeft:
                            templateType = CellTemplateType.BottomLeft;
                            isGridCtx = true;
                            break;
                    }
                    var isUpdated = false;
                    if (templateType != null) {
                        var col = (isCvGroup && templateType == CellTemplateType.GroupHeader ?
                            grid.columns.getColumn(dataItem.groupDescription['propertyName']) :
                            (colIndex >= 0 && colIndex < panel.columns.length ? panel.columns[colIndex] : null));
                        if (col) {
                            var templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType), templContext = (isGridCtx ? grid : col)[templContextProp];
                            // maintain template inheritance
                            if (!templContext) {
                                if (templateType === CellTemplateType.RowHeaderEdit) {
                                    templateType = CellTemplateType.RowHeader;
                                    templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType);
                                    templContext = grid[templContextProp];
                                }
                                else if (templateType === CellTemplateType.Group || templateType === CellTemplateType.GroupHeader) {
                                    if (!isCvGroup) {
                                        templateType = CellTemplateType.Cell;
                                        templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType);
                                        templContext = col[templContextProp];
                                    }
                                }
                            }
                            if (templContext) {
                                // apply directive template and style
                                var isTpl = true, cellValue;
                                if (needCellValue) {
                                    cellValue = panel.getCellData(rowIndex, colIndex, false);
                                }
                                // apply cell template
                                if (isTpl) {
                                    isUpdated = true;
                                    var measureAttr = cell.getAttribute(wijmo.grid.FlexGrid._WJS_MEASURE), isMeasuring = measureAttr && measureAttr.toLowerCase() === 'true';
                                    if (isEdit) {
                                        this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng, true);
                                    }
                                    // if this is false then we can't reuse previously cached scope and linked tree.
                                    var cellContext = (cell[templContextProp] || {}), isForeignCell = cellContext.column !== col || !cellContext.viewRef ||
                                        cellContext.templateContextProperty !== templContextProp ||
                                        cell.firstChild != cellContext.rootElement;
                                    if (isForeignCell) {
                                        if (isEdit) {
                                            var rootEl = cell.firstElementChild;
                                            if (rootEl) {
                                                // set focus to cell, because hiding a focused element may move focus to a page body
                                                // that will force Grid to finish editing.
                                                cell.focus();
                                                rootEl.style.display = 'none';
                                            }
                                        }
                                        else {
                                            cell.textContent = '';
                                        }
                                        //
                                        //console.log('updateCell - instantiate');
                                        this._doDisposeCell(cell);
                                        //if (templContext && cellContext && cellContext.viewRef) {
                                        //    let viewIdx = templContext.viewContainerRef.indexOf(cellContext.viewRef);
                                        //    if (viewIdx > -1) {
                                        //        console.log('updateCell - remove View');
                                        //        templContext.viewContainerRef.remove(viewIdx);
                                        //    }
                                        //}
                                        //
                                        var templInstance = templContext._instantiateTemplate(cell);
                                        //console.log('Cell Templ: ' + cell.outerHTML);
                                        cellContext.column = col;
                                        cellContext.viewRef = templInstance.viewRef;
                                        cellContext.rootElement = templInstance.rootElement;
                                        cellContext.templateContextProperty = templContextProp;
                                        cell[templContextProp] = cellContext;
                                    }
                                    var cellInfo_1 = this._setViewRefVars(cellContext.viewRef, row, col, dataItem, cellValue, templContext.valuePaths);
                                    if (templContext.cellOverflow) {
                                        cell.style.overflow = templContext.cellOverflow;
                                    }
                                    if (isMeasuring) {
                                        //force local template 'cell' var values to be applied immediately
                                        templContext.cdRef.detectChanges();
                                    }
                                    else if (templContext.autoSizeRows) {
                                        // increase row height if cell doesn't fit in the current row height.
                                        setTimeout(function () {
                                            // ignore the cell if it is already obsolete at this moment
                                            if (cellStamp !== cell[DirectiveCellFactory._cellStampProp]) {
                                                //console.log('!!!!!!!!!!!!!!!!!!!! Bad cell stamp');
                                                return;
                                            }
                                            var cellHeight = cell.scrollHeight, panelRows = panel.rows, rowSpan = rng && rng.rowSpan || 1;
                                            // TBD: it's not clear why we need (cellHeight - 1), but without it may get to an 
                                            // infinite loop. It's not the issue in Ng2 Explorer.
                                            if (rowIndex < panelRows.length &&
                                                (panelRows[rowIndex].renderHeight * rowSpan) < (cellHeight - 1)) {
                                                //if (cellHeight > 45) {
                                                //    throw "Infinite row expand loop!!!";
                                                //}
                                                //console.log('row.renderHeight = ' + panelRows[rowIndex].renderHeight + '; panelRows.defaultSize = ' + panelRows.defaultSize + ';cell.scrollHeight = ' + cellHeight + '; cell.offsetHeight = ' + cell.offsetHeight + '; cell.clientHeight = ' + cell.clientHeight + '; cell.height = ' + cell.style.height + '; rowSpan = ' + rowSpan);
                                                //console.log('range: ' + JSON.stringify(rng));
                                                //console.log('ID: ' + dataItem.id);
                                                //console.log(cell.outerHTML);
                                                panelRows.defaultSize = cellHeight / rowSpan;
                                                if (isEdit) {
                                                    grid.refresh();
                                                    //grid.refreshCells(false, true, false);
                                                    grid.startEditing();
                                                    return;
                                                }
                                                //} else if (isEdit && !wijmo.contains(cellContext.rootElement, wijmo.getActiveElement())) {
                                            }
                                            else if (isEdit) {
                                                // Find first visible input element and focus it. Make it only if editing
                                                // was not interrupted by row height change performed above, because it may finally
                                                // results in calling setSelectionRange on detached input, which causes crash in IE.
                                                //let inputs = cellContext.rootElement.querySelectorAll('input');
                                                var inputs = cellContext && cellContext.rootElement
                                                    && cellContext.rootElement.querySelectorAll('input');
                                                if (inputs) {
                                                    for (var i = 0; i < inputs.length; i++) {
                                                        var input = inputs[i], inpSt = window.getComputedStyle(input);
                                                        if (inpSt.display !== 'none' && inpSt.visibility === 'visible') {
                                                            var inpFocusEh = function () {
                                                                input.removeEventListener('focus', inpFocusEh);
                                                                setTimeout(function () {
                                                                    // at this moment control had to select the whole content
                                                                    if (self._editChar) {
                                                                        var caretPos_1 = input.selectionStart + self._editChar.length;
                                                                        input.value = self._editChar;
                                                                        self._editChar = null;
                                                                        input.dispatchEvent(self._evtInput);
                                                                        setTimeout(function () {
                                                                            // at this moment control had to process 'input' event,
                                                                            // even if it happens asynchronously 
                                                                            setTimeout(function () {
                                                                                wijmo.setSelectionRange(input, Math.min(caretPos_1, input.value.length));
                                                                            }, 0);
                                                                        }, 0);
                                                                    }
                                                                }, 0);
                                                            };
                                                            input.addEventListener('focus', inpFocusEh);
                                                            input.focus();
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                        }, 0);
                                    }
                                    if (isEdit) {
                                        self._cellEditorVars = cellInfo_1.localVars;
                                        var editEndingEH = function (s, e) {
                                            grid.cellEditEnding.removeHandler(editEndingEH);
                                            // Move focus out of the current input element, in order to let it to save
                                            // its value (necessary for controls like InputDate that can't update value immediately
                                            // as user typing).
                                            // We do it via event emulation, instead of moving focus to another element,
                                            // because in IE an element doesn't fit in time to receive the 'blur' event.
                                            if (!e.stayInEditMode) {
                                                var activeElement = wijmo.getActiveElement();
                                                if (activeElement) {
                                                    activeElement.dispatchEvent(self._evtBlur);
                                                }
                                                // We need to move focus nevertheless, because without this grid may lose focus at all in IE.
                                                cell.focus();
                                            }
                                            if (!(e.cancel || e.stayInEditMode)) {
                                                e.cancel = true;
                                                var cellVar = cellInfo_1.localVars, newVal = cellVar.value, bindNames = Object.getOwnPropertyNames(cellInfo_1.bindings);
                                                // set cell value
                                                panel.grid.setCellData(rowIndex, colIndex, newVal);
                                                // set values for valuePaths
                                                for (var _i = 0, bindNames_1 = bindNames; _i < bindNames_1.length; _i++) {
                                                    var curName = bindNames_1[_i];
                                                    cellInfo_1.bindings[curName].setValue(cellVar, cellInfo_1.localVars.values[curName]);
                                                }
                                            }
                                            // close all open dropdowns 
                                            var dropDowns = cell.querySelectorAll('.wj-dropdown');
                                            [].forEach.call(dropDowns, function (el) {
                                                var ctrl = wijmo.Control.getControl(el);
                                                if (ctrl && wijmo.input && ctrl instanceof wijmo.input.DropDown) {
                                                    ctrl.isDroppedDown = false;
                                                }
                                            });
                                        };
                                        // subscribe the handler to the cellEditEnding event
                                        grid.cellEditEnding.addHandler(editEndingEH);
                                        grid.cellEditEnded.addHandler(function () {
                                            self._cellEditorVars = null;
                                        });
                                    }
                                    else {
                                        this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng, false);
                                        //console.log('ID: ' + dataItem.id + '; exit cell.height = ' + cell.style.height);
                                    }
                                }
                            }
                        }
                    }
                    if (!isUpdated) {
                        this._doDisposeCell(cell);
                        this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng);
                    }
                };
                DirectiveCellFactory.prototype.getEditorValue = function (g) {
                    if (this._cellEditorVars) {
                        return this._cellEditorVars.value;
                    }
                    else {
                        return _super.prototype.getEditorValue.call(this, g);
                    }
                };
                DirectiveCellFactory.prototype.disposeCell = function (cell) {
                    //console.log('disposeCell');
                    //this.cellCounter--;
                    //console.log('disposeCell cellCounter = ' + this.cellCounter);
                    this._doDisposeCell(cell);
                };
                DirectiveCellFactory.prototype._doDisposeCell = function (cell) {
                    var ttm = DirectiveCellFactory._templateTypes;
                    for (var i = 0; i < ttm.length; i++) {
                        var templContextProp = WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[ttm[i]]), cellContext = (cell[templContextProp]);
                        if (cellContext && cellContext.viewRef) {
                            var templateOwner = cellContext.column || this.grid, templateContext = templateOwner[templContextProp];
                            if (templateContext) {
                                var viewIdx = templateContext.viewContainerRef.indexOf(cellContext.viewRef);
                                if (viewIdx > -1) {
                                    //console.log('disposeCell - remove View');
                                    templateContext.viewContainerRef.remove(viewIdx);
                                }
                            }
                            cellContext.viewRef = null;
                            cellContext.rootElement = null;
                            cellContext.column = null;
                            cellContext.templateContextProperty = null;
                            cell[templContextProp] = null;
                        }
                    }
                };
                DirectiveCellFactory.prototype._setViewRefVars = function (viewRef, row, col, dataItem, cellValue, valuePaths) {
                    this._needsCdCheck = true;
                    viewRef.context.row = row;
                    viewRef.context.col = col;
                    viewRef.context.item = dataItem;
                    var values = {}, 
                    //cellCtx = { row: row, col: col, item: dataItem, value: cellValue, values: values },
                    cellCtx = viewRef.context.cell || {}, bindings = {}, ret = { localVars: cellCtx, bindings: bindings };
                    cellCtx.row = row;
                    cellCtx.col = col;
                    cellCtx.item = dataItem;
                    cellCtx.value = cellValue;
                    cellCtx.values = values;
                    if (valuePaths) {
                        var pathNames = Object.getOwnPropertyNames(valuePaths);
                        for (var _i = 0, pathNames_1 = pathNames; _i < pathNames_1.length; _i++) {
                            var pName = pathNames_1[_i];
                            var binding = new wijmo.Binding(valuePaths[pName]);
                            bindings[pName] = binding;
                            values[pName] = binding.getValue(cellCtx);
                        }
                    }
                    if (viewRef.context.cell !== cellCtx) {
                        viewRef.context.cell = cellCtx;
                    }
                    return ret;
                };
                return DirectiveCellFactory;
            }(wijmo.grid.CellFactory));
            DirectiveCellFactory._cellStampProp = '__wjCellStamp';
            moduleExports = [
                WjFlexGrid,
                WjFlexGridColumn,
                WjFlexGridCellTemplate
            ];
            WjGridModule = (function () {
                function WjGridModule() {
                }
                return WjGridModule;
            }());
            WjGridModule = __decorate([
                core_1.NgModule({
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                })
            ], WjGridModule);
            exports_1("WjGridModule", WjGridModule);
        }
    };
});
