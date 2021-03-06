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
// enable use of EcmaScript6 maps
//declare var Map: any;
// initialize groupHeaderFormat
wijmo.culture.FlexGrid = window['wijmo'].culture.FlexGrid || {
    groupHeaderFormat: '{name}: <b>{value}</b> ({count:n0} items)'
};
/**
 * Defines the @see:FlexGrid control and associated classes.
 *
 * The example below creates a @see:FlexGrid control and binds it to a
 * 'data' array. The grid has four columns, specified by explicitly
 * populating the grid's @see:FlexGrid.columns array.
 *
 * @fiddle:6GB66
 */
var wijmo;
(function (wijmo) {
    var grid;
    (function (grid) {
        'use strict';
        /**
         * Specifies constants that define the visibility of row and column headers.
         */
        var HeadersVisibility;
        (function (HeadersVisibility) {
            /** No header cells are displayed. */
            HeadersVisibility[HeadersVisibility["None"] = 0] = "None";
            /** Only column header cells are displayed. */
            HeadersVisibility[HeadersVisibility["Column"] = 1] = "Column";
            /** Only row header cells are displayed. */
            HeadersVisibility[HeadersVisibility["Row"] = 2] = "Row";
            /** Both column and row header cells are displayed. */
            HeadersVisibility[HeadersVisibility["All"] = 3] = "All";
        })(HeadersVisibility = grid.HeadersVisibility || (grid.HeadersVisibility = {}));
        /**
         * The @see:FlexGrid control provides a powerful and flexible way to
         * display and edit data in a tabular format.
         *
         * The @see:FlexGrid control is a full-featured grid, providing all the
         * features you are used to including several selection modes, sorting,
         * column reordering, grouping, filtering, editing, custom cells,
         * XAML-style star-sizing columns, row and column virtualization, etc.
         *
         * @fiddle:6GB66
         */
        var FlexGrid = (function (_super) {
            __extends(FlexGrid, _super);
            /**
             * Initializes a new instance of the @see:FlexGrid class.
             *
             * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
             * @param options JavaScript object containing initialization data for the control.
             */
            function FlexGrid(element, options) {
                var _this = _super.call(this, element, null, true) || this;
                /*private*/ _this._szClient = new wijmo.Size(0, 0);
                /*private*/ _this._ptScrl = new wijmo.Point(0, 0); // accessible to GridPanel
                /*private*/ _this._cellPadding = 3; // accessible to CellFactory
                // property storage
                _this._autoGenCols = true;
                _this._autoClipboard = true;
                _this._readOnly = false;
                _this._indent = 14;
                _this._autoSizeMode = grid.AutoSizeMode.Both;
                _this._hdrVis = HeadersVisibility.All;
                _this._alSorting = true;
                _this._alAddNew = false;
                _this._alDelete = false;
                _this._alResizing = grid.AllowResizing.Columns;
                _this._alDragging = grid.AllowDragging.Columns;
                _this._alMerging = grid.AllowMerging.None;
                _this._ssHdr = HeadersVisibility.None;
                _this._shSort = true;
                _this._shGroups = true;
                _this._shAlt = true;
                _this._shErr = true;
                _this._valEdt = true;
                _this._deferResizing = false;
                _this._pSel = true; // preserve selection state
                _this._pOutline = true; // preserve outline state
                _this._vt = 0; // virtualization threshold
                //#endregion
                //--------------------------------------------------------------------------
                //#region ** events
                /**
                 * Occurs after the grid has been bound to a new items source.
                 */
                _this.itemsSourceChanged = new wijmo.Event();
                /**
                 * Occurs after the control has scrolled.
                 */
                _this.scrollPositionChanged = new wijmo.Event();
                /**
                 * Occurs before selection changes.
                 */
                _this.selectionChanging = new wijmo.Event();
                /**
                 * Occurs after selection changes.
                 */
                _this.selectionChanged = new wijmo.Event();
                /**
                 * Occurs before the grid rows are bound to items in the data source.
                 */
                _this.loadingRows = new wijmo.Event();
                /**
                 * Occurs after the grid rows have been bound to items in the data source.
                 */
                _this.loadedRows = new wijmo.Event();
                /**
                 * Occurs before the grid updates its internal layout.
                 */
                _this.updatingLayout = new wijmo.Event();
                /**
                 * Occurs after the grid has updated its internal layout.
                 */
                _this.updatedLayout = new wijmo.Event();
                /**
                 * Occurs as columns are resized.
                 */
                _this.resizingColumn = new wijmo.Event();
                /**
                 * Occurs when the user finishes resizing a column.
                 */
                _this.resizedColumn = new wijmo.Event();
                /**
                 * Occurs before the user auto-sizes a column by double-clicking the
                 * right edge of a column header cell.
                 */
                _this.autoSizingColumn = new wijmo.Event();
                /**
                 * Occurs after the user auto-sizes a column by double-clicking the
                 * right edge of a column header cell.
                 */
                _this.autoSizedColumn = new wijmo.Event();
                /**
                 * Occurs when the user starts dragging a column.
                 */
                _this.draggingColumn = new wijmo.Event();
                /**
                 * Occurs as the user drags a column to a new position.
                 *
                 * The handler may cancel the event to prevent users from
                 * dropping columns at certain positions. For example:
                 *
                 * <pre>// remember column being dragged
                 * flex.draggingColumn.addHandler(function (s, e) {
                 *     theColumn = s.columns[e.col].binding;
                 * });
                 *
                 * // prevent 'sales' column from being dragged to index 0
                 * s.draggingColumnOver.addHandler(function (s, e) {
                 *     if (theColumn == 'sales' && e.col == 0) {
                 *         e.cancel = true;
                 *     }
                 * });</pre>
                 */
                _this.draggingColumnOver = new wijmo.Event();
                /**
                 * Occurs when the user finishes dragging a column.
                 */
                _this.draggedColumn = new wijmo.Event();
                /**
                 * Occurs as rows are resized.
                 */
                _this.resizingRow = new wijmo.Event();
                /**
                 * Occurs when the user finishes resizing rows.
                 */
                _this.resizedRow = new wijmo.Event();
                /**
                 * Occurs before the user auto-sizes a row by double-clicking the
                 * bottom edge of a row header cell.
                 */
                _this.autoSizingRow = new wijmo.Event();
                /**
                 * Occurs after the user auto-sizes a row by double-clicking the
                 * bottom edge of a row header cell.
                 */
                _this.autoSizedRow = new wijmo.Event();
                /**
                 * Occurs when the user starts dragging a row.
                 */
                _this.draggingRow = new wijmo.Event();
                /**
                 * Occurs as the user drags a row to a new position.
                 */
                _this.draggingRowOver = new wijmo.Event();
                /**
                 * Occurs when the user finishes dragging a row.
                 */
                _this.draggedRow = new wijmo.Event();
                /**
                 * Occurs when a group is about to be expanded or collapsed.
                 */
                _this.groupCollapsedChanging = new wijmo.Event();
                /**
                 * Occurs after a group has been expanded or collapsed.
                 */
                _this.groupCollapsedChanged = new wijmo.Event();
                /**
                 * Occurs before the user applies a sort by clicking on a column header.
                 */
                _this.sortingColumn = new wijmo.Event();
                /**
                 * Occurs after the user applies a sort by clicking on a column header.
                 */
                _this.sortedColumn = new wijmo.Event();
                /**
                 * Occurs before a cell enters edit mode.
                 */
                _this.beginningEdit = new wijmo.Event();
                /**
                 * Occurs when an editor cell is created and before it becomes active.
                 */
                _this.prepareCellForEdit = new wijmo.Event();
                /**
                 * Occurs when a cell edit is ending.
                 *
                 * You can use this event to perform validation and prevent invalid edits.
                 * For example, the code below prevents users from entering values that
                 * do not contain the letter 'a'. The code demonstrates how you can obtain
                 * the old and new values before the edits are applied.
                 *
                 * <pre>function cellEditEnding (sender, e) {
                 *   // get old and new values
                 *   var flex = sender,
                 *       oldVal = flex.getCellData(e.row, e.col),
                 *       newVal = flex.activeEditor.value;
                 *   // cancel edits if newVal doesn't contain 'a'
                 *   e.cancel = newVal.indexOf('a') &lt; 0;
                 * }</pre>
                 *
                 * Setting the @see:CellEditEndingEventArgs.cancel parameter to
                 * true causes the grid to discard the edited value and keep the
                 * cell's original value.
                 *
                 * If you also set the @see:CellEditEndingEventArgs.stayInEditMode
                 * parameter to true, the grid will remain in edit mode so the user
                 * can correct invalid entries before committing the edits.
                 */
                _this.cellEditEnding = new wijmo.Event();
                /**
                 * Occurs when a cell edit has been committed or canceled.
                 */
                _this.cellEditEnded = new wijmo.Event();
                /**
                 * Occurs before a row enters edit mode.
                 */
                _this.rowEditStarting = new wijmo.Event();
                /**
                 * Occurs after a row enters edit mode.
                 */
                _this.rowEditStarted = new wijmo.Event();
                /**
                 * Occurs when a row edit is ending, before the changes are committed or canceled.
                 *
                 * This event can be used in conjunction with the @see:rowEditStarted event to
                 * implement deep-binding edit undos. For example:
                 *
                 * <pre>// save deep bound values when editing starts
                 * var itemData = {};
                 * s.rowEditStarted.addHandler(function (s, e) {
                 *   var item = s.collectionView.currentEditItem;
                 *   itemData = {};
                 *   s.columns.forEach(function (col) {
                 *     if (col.binding.indexOf('.') &gt; -1) { // deep binding
                 *       var binding = new wijmo.Binding(col.binding);
                 *       itemData[col.binding] = binding.getValue(item);
                 *     }
                 *   })
                 * });
                 *
                 * // restore deep bound values when edits are canceled
                 * s.rowEditEnded.addHandler(function (s, e) {
                 *   if (e.cancel) { // edits were canceled by the user
                 *     var item = s.collectionView.currentEditItem;
                 *     for (var k in itemData) {
                 *       var binding = new wijmo.Binding(k);
                 *       binding.setValue(item, itemData[k]);
                 *     }
                 *   }
                 *   itemData = {};
                 * });</pre>
                 */
                _this.rowEditEnding = new wijmo.Event();
                /**
                 * Occurs when a row edit has been committed or canceled.
                 */
                _this.rowEditEnded = new wijmo.Event();
                /**
                 * Occurs when the user creates a new item by editing the new row template
                 * (see the @see:allowAddNew property).
                 *
                 * The event handler may customize the content of the new item or cancel
                 * the new item creation.
                 */
                _this.rowAdded = new wijmo.Event();
                /**
                 * Occurs when the user is deleting a selected row by pressing the Delete
                 * key (see the @see:allowDelete property).
                 *
                 * The event handler may cancel the row deletion.
                 */
                _this.deletingRow = new wijmo.Event();
                /**
                 * Occurs after the user has deleted a row by pressing the Delete
                 * key (see the @see:allowDelete property).
                 */
                _this.deletedRow = new wijmo.Event();
                /**
                 * Occurs when the user is copying the selection content to the
                 * clipboard by pressing one of the clipboard shortcut keys
                 * (see the @see:autoClipboard property).
                 *
                 * The event handler may cancel the copy operation.
                 */
                _this.copying = new wijmo.Event();
                /**
                 * Occurs after the user has copied the selection content to the
                 * clipboard by pressing one of the clipboard shortcut keys
                 * (see the @see:autoClipboard property).
                 */
                _this.copied = new wijmo.Event();
                /**
                 * Occurs when the user is pasting content from the clipboard
                 * by pressing one of the clipboard shortcut keys
                 * (see the @see:autoClipboard property).
                 *
                 * The event handler may cancel the copy operation.
                 */
                _this.pasting = new wijmo.Event();
                /**
                 * Occurs after the user has pasted content from the
                 * clipboard by pressing one of the clipboard shortcut keys
                 * (see the @see:autoClipboard property).
                 */
                _this.pasted = new wijmo.Event();
                /**
                 * Occurs when the user is pasting content from the clipboard
                 * into a cell (see the @see:autoClipboard property).
                 *
                 * The event handler may cancel the copy operation.
                 */
                _this.pastingCell = new wijmo.Event();
                /**
                 * Occurs after the user has pasted content from the
                 * clipboard into a cell (see the @see:autoClipboard property).
                 */
                _this.pastedCell = new wijmo.Event();
                /**
                 * Occurs when an element representing a cell has been created.
                 *
                 * This event can be used to format cells for display. It is similar
                 * in purpose to the @see:itemFormatter property, but has the advantage
                 * of allowing multiple independent handlers.
                 *
                 * For example, this code removes the 'wj-wrap' class from cells in
                 * group rows:
                 *
                 * <pre>flex.formatItem.addHandler(function (s, e) {
                 *   if (flex.rows[e.row] instanceof wijmo.grid.GroupRow) {
                 *     wijmo.removeClass(e.cell, 'wj-wrap');
                 *   }
                 * });</pre>
                 */
                _this.formatItem = new wijmo.Event();
                /**
                 * Occurs when the grid starts creating/updating the elements that
                 * make up the current view.
                 */
                _this.updatingView = new wijmo.Event();
                /**
                 * Occurs when the grid finishes creating/updating the elements that
                 * make up the current view.
                 *
                 * The grid updates the view in response to several actions, including:
                 *
                 * <ul>
                 * <li>refreshing the grid or its data source,</li>
                 * <li>adding, removing, or changing rows or columns,</li>
                 * <li>resizing or scrolling the grid,</li>
                 * <li>changing the selection.</li>
                 * </ul>
                 */
                _this.updatedView = new wijmo.Event();
                // sort converter used to sort mapped columns by display value
                _this._mappedColumns = null;
                var host = _this.hostElement;
                // make sure we have no border radius if the browser is IE/Edge
                // (rounded borders **kill** scrolling perf!!!!)
                if (wijmo.isIE()) {
                    host.style.borderRadius = '0px';
                }
                // instantiate and apply template
                var tpl = _this.getTemplate();
                _this.applyTemplate('wj-control wj-flexgrid wj-content', tpl, {
                    _root: 'root',
                    _eSz: 'sz',
                    _eCt: 'cells',
                    _fCt: 'fcells',
                    _eTL: 'tl',
                    _eBL: 'bl',
                    _eCHdr: 'ch',
                    _eRHdr: 'rh',
                    _eCFtr: 'cf',
                    _eTLCt: 'tlcells',
                    _eBLCt: 'blcells',
                    _eCHdrCt: 'chcells',
                    _eCFtrCt: 'cfcells',
                    _eRHdrCt: 'rhcells',
                    _eMarquee: 'marquee',
                    _eFocus: 'focus'
                });
                // calculate default row height
                var defRowHei = _this._getDefaultRowHeight();
                // build the control
                _this.deferUpdate(function () {
                    // create row and column collections
                    _this._rows = new grid.RowCollection(_this, defRowHei);
                    _this._cols = new grid.ColumnCollection(_this, defRowHei * 4);
                    _this._hdrRows = new grid.RowCollection(_this, defRowHei);
                    _this._hdrCols = new grid.ColumnCollection(_this, Math.round(defRowHei * 1.25));
                    _this._ftrRows = new grid.RowCollection(_this, defRowHei);
                    // create grid panels
                    _this._gpTL = new grid.GridPanel(_this, grid.CellType.TopLeft, _this._hdrRows, _this._hdrCols, _this._eTLCt);
                    _this._gpCHdr = new grid.GridPanel(_this, grid.CellType.ColumnHeader, _this._hdrRows, _this._cols, _this._eCHdrCt);
                    _this._gpRHdr = new grid.GridPanel(_this, grid.CellType.RowHeader, _this._rows, _this._hdrCols, _this._eRHdrCt);
                    _this._gpCells = new grid.GridPanel(_this, grid.CellType.Cell, _this._rows, _this._cols, _this._eCt);
                    _this._gpBL = new grid.GridPanel(_this, grid.CellType.BottomLeft, _this._ftrRows, _this._hdrCols, _this._eBLCt);
                    _this._gpCFtr = new grid.GridPanel(_this, grid.CellType.ColumnFooter, _this._ftrRows, _this._cols, _this._eCFtrCt);
                    // add row and column headers
                    _this._hdrRows.push(new grid.Row());
                    _this._hdrCols.push(new grid.Column());
                    _this._hdrCols[0].align = 'center';
                    // initialize control
                    _this._cf = new grid.CellFactory();
                    _this._keyHdl = new grid._KeyboardHandler(_this);
                    _this._mouseHdl = new grid._MouseHandler(_this);
                    _this._edtHdl = new grid._EditHandler(_this);
                    _this._selHdl = new grid._SelectionHandler(_this);
                    _this._addHdl = new grid._AddNewHandler(_this);
                    _this._mrgMgr = new grid.MergeManager(_this);
                    _this._bndSortConverter = _this._sortConverter.bind(_this);
                    _this._bndScroll = _this._scroll.bind(_this);
                    // apply options after grid has been initialized
                    _this.initialize(options);
                });
                // update content when user scrolls the control
                _this.addEventListener(_this._root, 'scroll', function (e) {
                    if (_this._updateScrollPosition()) {
                        _this.finishEditing();
                        _this._updateContent(true);
                    }
                });
                return _this;
            }
            // reset rcBounds when window is resized
            // (even if the control size didn't change, because it may have moved: TFS 112961)
            FlexGrid.prototype._handleResize = function () {
                this._rcBounds = null;
                _super.prototype._handleResize.call(this);
            };
            Object.defineProperty(FlexGrid.prototype, "headersVisibility", {
                //--------------------------------------------------------------------------
                //#region ** object model
                /**
                 * Gets or sets a value that determines whether the row and column headers
                 * are visible.
                 */
                get: function () {
                    return this._hdrVis;
                },
                set: function (value) {
                    if (value != this._hdrVis) {
                        this._hdrVis = wijmo.asEnum(value, HeadersVisibility);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "stickyHeaders", {
                /**
                 * Gets or sets a value that determines whether column headers should remain
                 * visible when the user scrolls the document.
                 */
                get: function () {
                    return this._stickyHdr;
                },
                set: function (value) {
                    if (value != this._stickyHdr) {
                        this._stickyHdr = wijmo.asBoolean(value);
                        this._updateStickyHeaders();
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "preserveSelectedState", {
                /**
                 * Gets or sets a value that determines whether the grid should preserve
                 * the selected state of rows when the data is refreshed.
                 */
                get: function () {
                    return this._pSel;
                },
                set: function (value) {
                    this._pSel = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "preserveOutlineState", {
                /**
                 * Gets or sets a value that determines whether the grid should preserve
                 * the expanded/collapsed state of nodes when the data is refreshed.
                 *
                 * The @see:preserveOutlineState property implementation is based on
                 * JavaScript's @see:Map object, which is not available in IE 9 or 10.
                 */
                get: function () {
                    return this._pOutline;
                },
                set: function (value) {
                    this._pOutline = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "_virtualizationThreshold", {
                /**
                 * Gets or sets the minimum number of rows required to enable virtualization.
                 *
                 * This property is set to zero by default, meaning virtualization is always
                 * enabled. This improves binding performance and memory requirements, at the
                 * expense of a small performance decrease while scrolling.
                 *
                 * If your grid has a small number of rows (about 50 to 100), you may be able to
                 * improve scrolling performance by setting this property to a slightly higher
                 * value (like 150). This will disable virtualization and will slow down binding,
                 * but may improve perceived scroll performance.
                 *
                 * Setting this property to values higher than 200 is not recommended. Loading
                 * times will become too long; the grid will freeze for a few seconds while
                 * creating cells for all rows, and the browser will become slow because of
                 * the large number of elements on the page.
                 */
                get: function () {
                    return this._vt;
                },
                set: function (value) {
                    this._vt = wijmo.asNumber(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "autoGenerateColumns", {
                /**
                 * Gets or sets a value that determines whether the grid should generate columns
                 * automatically based on the @see:itemsSource.
                 *
                 * The column generation depends on the @see:itemsSource property containing
                 * at least one item. This data item is inspected and a column is created and
                 * bound to each property that contains a primitive value (number, string,
                 * Boolean, or Date).
                 *
                 * Properties set to null do not generate columns, because the grid would
                 * have no way of guessing the appropriate type. In this type of scenario,
                 * you should set the @see:autoGenerateColumns property to false and create
                 * the columns explicitly. For example:
                 *
                 * <pre>var grid = new wijmo.grid.FlexGrid('#theGrid', {
                 *   autoGenerateColumns: false, // data items may contain null values
                 *   columns: [                  // so define columns explicitly
                 *     { binding: 'name', header: 'Name', type: 'String' },
                 *     { binding: 'amount', header: 'Amount', type: 'Number' },
                 *     { binding: 'date', header: 'Date', type: 'Date' },
                 *     { binding: 'active', header: 'Active', type: 'Boolean' }
                 *   ],
                 *   itemsSource: customers
                 * });</pre>
                 */
                get: function () {
                    return this._autoGenCols;
                },
                set: function (value) {
                    this._autoGenCols = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "autoClipboard", {
                /**
                 * Gets or sets a value that determines whether the grid should handle
                 * clipboard shortcuts.
                 *
                 * The clipboard shortcuts are as follows:
                 *
                 * <dl class="dl-horizontal">
                 *   <dt>ctrl+C, ctrl+Ins</dt>    <dd>Copy grid selection to clipboard.</dd>
                 *   <dt>ctrl+V, shift+Ins</dt>   <dd>Paste clipboard text to grid selection.</dd>
                 * </dl>
                 *
                 * Only visible rows and columns are included in clipboard operations.
                 *
                 * Read-only cells are not affected by paste operations.
                 */
                get: function () {
                    return this._autoClipboard;
                },
                set: function (value) {
                    this._autoClipboard = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "columnLayout", {
                /**
                 * Gets or sets a JSON string that defines the current column layout.
                 *
                 * The column layout string represents an array with the columns and their
                 * properties. It can be used to persist column layouts defined by users so
                 * they are preserved across sessions, and can also be used to implement undo/redo
                 * functionality in applications that allow users to modify the column layout.
                 *
                 * The column layout string does not include <b>dataMap</b> properties, because
                 * data maps are not serializable.
                 */
                get: function () {
                    var props = FlexGrid._getSerializableProperties(grid.Column), defs = new grid.Column(), proxyCols = [];
                    // populate array with proxy columns
                    // save only primitive value and non-default settings
                    // don't save 'size', we are already saving 'width'
                    for (var i = 0; i < this.columns.length; i++) {
                        var col = this.columns[i], proxyCol = {};
                        for (var j = 0; j < props.length; j++) {
                            var prop = props[j], value = col[prop];
                            if (value != defs[prop] && wijmo.isPrimitive(value) && prop != 'size') {
                                proxyCol[prop] = value;
                            }
                        }
                        proxyCols.push(proxyCol);
                    }
                    // return JSON string with proxy columns
                    return JSON.stringify({ columns: proxyCols });
                },
                set: function (value) {
                    var colOptions = JSON.parse(wijmo.asString(value));
                    if (!colOptions || colOptions.columns == null) {
                        throw 'Invalid columnLayout data.';
                    }
                    this.columns.clear();
                    this.initialize(colOptions);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "isReadOnly", {
                /**
                 * Gets or sets a value that determines whether the user can modify
                 * cell values using the mouse and keyboard.
                 */
                get: function () {
                    return this._readOnly;
                },
                set: function (value) {
                    if (value != this._readOnly) {
                        this._readOnly = wijmo.asBoolean(value);
                        this.finishEditing();
                        this.invalidate(true); // TFS 79965
                        this._addHdl.updateNewRowTemplate(); // TFS 97544
                        wijmo.toggleClass(this.hostElement, 'wj-state-readonly', this.isReadOnly);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "imeEnabled", {
                /**
                 * Gets or sets a value that determines whether the grid should support
                 * Input Method Editors (IME) while not in edit mode.
                 *
                 * This property is relevant only for sites/applications in Japanese,
                 * Chinese, Korean, and other languages that require IME support.
                 */
                get: function () {
                    return this._imeHdl != null;
                },
                set: function (value) {
                    if (value != this.imeEnabled) {
                        if (this._imeHdl) {
                            this._imeHdl.dispose();
                            this._imeHdl = null;
                        }
                        if (value) {
                            this._imeHdl = new grid._ImeHandler(this);
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "allowResizing", {
                /**
                 * Gets or sets a value that determines whether users may resize
                 * rows and/or columns with the mouse.
                 *
                 * If resizing is enabled, users can resize columns by dragging
                 * the right edge of column header cells, or rows by dragging the
                 * bottom edge of row header cells.
                 *
                 * Users may also double-click the edge of the header cells to
                 * automatically resize rows and columns to fit their content.
                 * The auto-size behavior can be customized using the @see:autoSizeMode
                 * property.
                 */
                get: function () {
                    return this._alResizing;
                },
                set: function (value) {
                    this._alResizing = wijmo.asEnum(value, grid.AllowResizing);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "deferResizing", {
                /**
                 * Gets or sets a value that determines whether row and column resizing
                 * should be deferred until the user releases the mouse button.
                 *
                 * By default, @see:deferResizing is set to false, causing rows and columns
                 * to be resized as the user drags the mouse. Setting this property to true
                 * causes the grid to show a resizing marker and to resize the row or column
                 * only when the user releases the mouse button.
                 */
                get: function () {
                    return this._deferResizing;
                },
                set: function (value) {
                    this._deferResizing = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "autoSizeMode", {
                /**
                 * Gets or sets which cells should be taken into account when auto-sizing a
                 * row or column.
                 *
                 * This property controls what happens when users double-click the edge of
                 * a column header.
                 *
                 * By default, the grid will automatically set the column width based on the
                 * content of the header and data cells in the column. This property allows
                 * you to change that to include only the headers or only the data.
                 */
                get: function () {
                    return this._autoSizeMode;
                },
                set: function (value) {
                    this._autoSizeMode = wijmo.asEnum(value, grid.AutoSizeMode);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "allowSorting", {
                /**
                 * Gets or sets a value that determines whether users are allowed to sort columns
                 * by clicking the column header cells.
                 */
                get: function () {
                    return this._alSorting;
                },
                set: function (value) {
                    this._alSorting = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "allowAddNew", {
                /**
                 * Gets or sets a value that indicates whether the grid should provide a new row
                 * template so users can add items to the source collection.
                 *
                 * The new row template will not be displayed if the @see:isReadOnly property
                 * is set to true.
                 */
                get: function () {
                    return this._alAddNew;
                },
                set: function (value) {
                    if (value != this._alAddNew) {
                        this._alAddNew = wijmo.asBoolean(value);
                        this._addHdl.updateNewRowTemplate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "newRowAtTop", {
                /**
                 * Gets or sets a value that indicates whether the new row template should be
                 * located at the top of the grid or at the bottom.
                 *
                 * If you set the @see:newRowAtTop property to true, and you want the new
                 * row template to remain visible at all times, set the @see:frozenRows
                 * property to one. This will freeze the new row template at the top so
                 * it won't scroll off the view.
                 *
                 * The new row template will be displayed only if the @see:allowAddNew property
                 * is set to true and if the @see:itemsSource object supports adding new items.
                 */
                get: function () {
                    return this._addHdl.newRowAtTop;
                },
                set: function (value) {
                    this._addHdl.newRowAtTop = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "allowDelete", {
                /**
                 * Gets or sets a value that indicates whether the grid should delete
                 * selected rows when the user presses the Delete key.
                 *
                 * Selected rows will not be deleted if the @see:isReadOnly property
                 * is set to true.
                 */
                get: function () {
                    return this._alDelete;
                },
                set: function (value) {
                    if (value != this._alDelete) {
                        this._alDelete = wijmo.asBoolean(value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "allowMerging", {
                /**
                 * Gets or sets which parts of the grid provide cell merging.
                 */
                get: function () {
                    return this._alMerging;
                },
                set: function (value) {
                    if (value != this._alMerging) {
                        this._alMerging = wijmo.asEnum(value, grid.AllowMerging);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "showSelectedHeaders", {
                /**
                 * Gets or sets a value that indicates whether the grid should
                 * add class names to indicate selected header cells.
                 */
                get: function () {
                    return this._ssHdr;
                },
                set: function (value) {
                    if (value != this._ssHdr) {
                        this._ssHdr = wijmo.asEnum(value, HeadersVisibility);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "showMarquee", {
                /**
                 * Gets or sets a value that indicates whether the grid should
                 * display a marquee element around the current selection.
                 */
                get: function () {
                    return !this._eMarquee.style.display;
                },
                set: function (value) {
                    if (value != this.showMarquee) {
                        var s = this._eMarquee.style;
                        s.visibility = 'collapse'; // show only after positioning
                        s.display = wijmo.asBoolean(value) ? '' : 'none';
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "showSort", {
                /**
                 * Gets or sets a value that determines whether the grid should display
                 * sort indicators in the column headers.
                 *
                 * Sorting is controlled by the @see:ICollectionView.sortDescriptions
                 * property of the @see:ICollectionView object used as a the grid's
                 * @see:itemsSource.
                 */
                get: function () {
                    return this._shSort;
                },
                set: function (value) {
                    if (value != this._shSort) {
                        this._shSort = wijmo.asBoolean(value);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "showGroups", {
                /**
                 * Gets or sets a value that determines whether the grid should insert group
                 * rows to delimit data groups.
                 *
                 * Data groups are created by modifying the @see:ICollectionView.groupDescriptions
                 * property of the @see:ICollectionView object used as a the grid's @see:itemsSource.
                 */
                get: function () {
                    return this._shGroups;
                },
                set: function (value) {
                    if (value != this._shGroups) {
                        this._shGroups = wijmo.asBoolean(value);
                        this._bindGrid(false);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "showAlternatingRows", {
                /**
                 * Gets or sets a value that determines whether the grid should add the 'wj-alt'
                 * class to cells in alternating rows.
                 *
                 * Setting this property to false disables alternate row styles without any
                 * changes to the CSS.
                 */
                get: function () {
                    return this._shAlt;
                },
                set: function (value) {
                    if (value != this._shAlt) {
                        this._shAlt = wijmo.asBoolean(value);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "showErrors", {
                /**
                 * Gets or sets a value that determines whether the grid should add the 'wj-state-invalid'
                 * class to cells that contain validation errors, and tooltips with error descriptions.
                 *
                 * The grid detects validation errors using the @see:CollectionView.getError property
                 * on the grid's @see:itemsSource.
                 */
                get: function () {
                    return this._shErr;
                },
                set: function (value) {
                    if (value != this._shErr) {
                        this._shErr = wijmo.asBoolean(value);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "validateEdits", {
                /**
                 * Gets or sets a value that determines whether the grid should remain
                 * in edit mode when the user tries to commit edits that fail validation.
                 *
                 * The grid detects validation errors by calling the @see:CollectionView.getError
                 * method on the grid's @see:itemsSource.
                 */
                get: function () {
                    return this._valEdt;
                },
                set: function (value) {
                    this._valEdt = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "groupHeaderFormat", {
                /**
                 * Gets or sets the format string used to create the group header content.
                 *
                 * The string may contain any text, plus the following replacement strings:
                 * <ul>
                 *   <li><b>{name}</b>: The name of the property being grouped on.</li>
                 *   <li><b>{value}</b>: The value of the property being grouped on.</li>
                 *   <li><b>{level}</b>: The group level.</li>
                 *   <li><b>{count}</b>: The total number of items in this group.</li>
                 * </ul>
                 *
                 * If a column is bound to the grouping property, the column header is used
                 * to replace the <code>{name}</code> parameter, and the column's format and
                 * data maps are used to calculate the <code>{value}</code> parameter.
                 * If no column is available, the group information is used instead.
                 *
                 * You may add invisible columns bound to the group properties in order to
                 * customize the formatting of the group header cells.
                 *
                 * The default value for this property is<br/>
                 * <code>'{name}: &lt;b&gt;{value}&lt;/b&gt;({count:n0} items)'</code>,
                 * which creates group headers similar to<br/>
                 * <code>'Country: <b>UK</b> (12 items)'</code> or<br/>
                 * <code>'Country: <b>Japan</b> (8 items)'</code>.
                 */
                get: function () {
                    return this._gHdrFmt;
                },
                set: function (value) {
                    if (value != this._gHdrFmt) {
                        this._gHdrFmt = wijmo.asString(value);
                        this._bindGrid(false);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "allowDragging", {
                /**
                 * Gets or sets a value that determines whether users are allowed to drag
                 * rows and/or columns with the mouse.
                 */
                get: function () {
                    return this._alDragging;
                },
                set: function (value) {
                    if (value != this._alDragging) {
                        this._alDragging = wijmo.asEnum(value, grid.AllowDragging);
                        this.invalidate(); // to re-create row/col headers
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "itemsSource", {
                /**
                 * Gets or sets the array or @see:ICollectionView that contains items shown on the grid.
                 */
                get: function () {
                    return this._items;
                },
                set: function (value) {
                    if (value != this._items) {
                        // unbind current collection view
                        if (this._cv) {
                            var cv = wijmo.tryCast(this._cv, wijmo.collections.CollectionView);
                            if (cv && cv.sortConverter == this._bndSortConverter) {
                                cv.sortConverter = null;
                            }
                            this._cv.currentChanged.removeHandler(this._cvCurrentChanged, this);
                            this._cv.collectionChanged.removeHandler(this._cvCollectionChanged, this);
                            this._cv = null;
                        }
                        // save new data source and collection view
                        this._items = value;
                        this._cv = this._getCollectionView(value);
                        this._lastCount = 0;
                        // bind new collection view
                        if (this._cv) {
                            this._cv.currentChanged.addHandler(this._cvCurrentChanged, this);
                            this._cv.collectionChanged.addHandler(this._cvCollectionChanged, this);
                            var cv = wijmo.tryCast(this._cv, wijmo.collections.CollectionView);
                            if (cv && !cv.sortConverter) {
                                cv.sortConverter = this._bndSortConverter;
                            }
                        }
                        // bind grid
                        this._bindGrid(true);
                        // raise itemsSourceChanged
                        this.onItemsSourceChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "collectionView", {
                /**
                 * Gets the @see:ICollectionView that contains the grid data.
                 */
                get: function () {
                    return this._cv;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "childItemsPath", {
                /**
                 * Gets or sets the name of the property (or properties) used to generate
                 * child rows in hierarchical grids.
                 *
                 * Set this property to a string to specify the name of the property that
                 * contains an item's child items (e.g. <code>'items'</code>).
                 *
                 * If items at different levels child items with different names, then
                 * set this property to an array containing the names of the properties
                 * that contain child items et each level
                 * (e.g. <code>[ 'accounts', 'checks', 'earnings' ]</code>).
                 *
                 * @fiddle:t0ncmjwp
                 */
                get: function () {
                    return this._childItemsPath;
                },
                set: function (value) {
                    if (value != this._childItemsPath) {
                        wijmo.assert(value == null || wijmo.isArray(value) || wijmo.isString(value), 'childItemsPath should be an array or a string.');
                        this._childItemsPath = value;
                        this._bindGrid(true);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "cells", {
                /**
                 * Gets the @see:GridPanel that contains the data cells.
                 */
                get: function () {
                    return this._gpCells;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "columnHeaders", {
                /**
                 * Gets the @see:GridPanel that contains the column header cells.
                 */
                get: function () {
                    return this._gpCHdr;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "columnFooters", {
                /**
                 * Gets the @see:GridPanel that contains the column footer cells.
                 *
                 * The @see:columnFooters panel appears below the grid cells, to the
                 * right of the @see:bottomLeftCells panel. It can be used to display
                 * summary information below the grid data.
                 *
                 * The example below shows how you can add a row to the @see:columnFooters
                 * panel to display summary data for columns that have the
                 * @see:Column.aggregate property set:
                 *
                 * <pre>function addFooterRow(flex) {
                 *   // create a GroupRow to show aggregates
                 *   var row = new wijmo.grid.GroupRow();
                 *
                 *   // add the row to the column footer panel
                 *   flex.columnFooters.rows.push(row);
                 *
                 *   // show a sigma on the header
                 *   flex.bottomLeftCells.setCellData(0, 0, '\u03A3');
                 * }</pre>
                 */
                get: function () {
                    return this._gpCFtr;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "rowHeaders", {
                /**
                 * Gets the @see:GridPanel that contains the row header cells.
                 */
                get: function () {
                    return this._gpRHdr;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "topLeftCells", {
                /**
                 * Gets the @see:GridPanel that contains the top left cells
                 * (to the left of the column headers).
                 */
                get: function () {
                    return this._gpTL;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "bottomLeftCells", {
                /**
                 * Gets the @see:GridPanel that contains the bottom left cells.
                 *
                 * The @see:bottomLeftCells panel appears below the row headers, to the
                 * left of the @see:columnFooters panel.
                 */
                get: function () {
                    return this._gpBL;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "rows", {
                /**
                 * Gets the grid's row collection.
                 */
                get: function () {
                    return this._rows;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "columns", {
                /**
                 * Gets the grid's column collection.
                 */
                get: function () {
                    return this._cols;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Gets a column by name or by binding.
             *
             * The method searches the column by name. If a column with the given name
             * is not found, it searches by binding. The searches are case-sensitive.
             *
             * @param name The name or binding to find.
             * @return The column with the specified name or binding, or null if not found.
             */
            FlexGrid.prototype.getColumn = function (name) {
                return this.columns.getColumn(name);
            };
            Object.defineProperty(FlexGrid.prototype, "frozenRows", {
                /**
                 * Gets or sets the number of frozen rows.
                 *
                 * Frozen rows do not scroll vertically, but the cells they contain
                 * may be selected and edited.
                 */
                get: function () {
                    return this.rows.frozen;
                },
                set: function (value) {
                    this.rows.frozen = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "frozenColumns", {
                /**
                 * Gets or sets the number of frozen columns.
                 *
                 * Frozen columns do not scroll horizontally, but the cells they contain
                 * may be selected and edited.
                 */
                get: function () {
                    return this.columns.frozen;
                },
                set: function (value) {
                    this.columns.frozen = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "sortRowIndex", {
                /**
                 * Gets or sets the index of row in the column header panel that
                 * shows and changes the current sort.
                 *
                 * This property is set to null by default, causing the last row
                 * in the @see:columnHeaders panel to act as the sort row.
                 */
                get: function () {
                    return this._sortRowIndex;
                },
                set: function (value) {
                    if (value != this._sortRowIndex) {
                        this._sortRowIndex = wijmo.asNumber(value, true);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "scrollPosition", {
                /**
                 * Gets or sets a @see:Point that represents the value of the grid's scrollbars.
                 */
                get: function () {
                    return this._ptScrl.clone();
                },
                set: function (pt) {
                    var root = this._root, left = -pt.x;
                    // IE/Chrome/FF handle scrollLeft differently under RTL:
                    // Chrome reverses direction, FF uses negative values, IE does the right thing (nothing)
                    if (this.rightToLeft) {
                        switch (FlexGrid._getRtlMode()) {
                            case 'rev':
                                left = (root.scrollWidth - root.clientWidth) + pt.x;
                                break;
                            case 'neg':
                                left = pt.x;
                                break;
                            default:
                                left = -pt.x;
                                break;
                        }
                    }
                    root.scrollLeft = left;
                    root.scrollTop = -pt.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "clientSize", {
                /**
                 * Gets the client size of the control (control size minus headers and scrollbars).
                 */
                get: function () {
                    return this._szClient;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "controlRect", {
                /**
                 * Gets the bounding rectangle of the control in page coordinates.
                 */
                get: function () {
                    if (!this._rcBounds) {
                        this._rcBounds = wijmo.getElementRect(this._root);
                    }
                    return this._rcBounds;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "scrollSize", {
                /**
                 * Gets the size of the grid content in pixels.
                 */
                get: function () {
                    return new wijmo.Size(this._gpCells.width, this._heightBrowser);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "viewRange", {
                /**
                 * Gets the range of cells currently in view.
                 */
                get: function () {
                    return this._gpCells.viewRange;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "cellFactory", {
                /**
                 * Gets or sets the @see:CellFactory that creates and updates cells for this grid.
                 */
                get: function () {
                    return this._cf;
                },
                set: function (value) {
                    if (value != this._cf) {
                        this._cf = wijmo.asType(value, grid.CellFactory, false);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "itemFormatter", {
                /**
                 * Gets or sets a formatter function used to customize cells on this grid.
                 *
                 * The formatter function can add any content to any cell. It provides
                 * complete flexibility over the appearance and behavior of grid cells.
                 *
                 * If specified, the function should take four parameters: the @see:GridPanel
                 * that contains the cell, the row and column indices of the cell, and the
                 * HTML element that represents the cell. The function will typically change
                 * the <b>innerHTML</b> property of the cell element.
                 *
                 * For example:
                 * <pre>
                 * flex.itemFormatter = function(panel, r, c, cell) {
                 *   if (panel.cellType == CellType.Cell) {
                 *     // draw sparklines in the cell
                 *     var col = panel.columns[c];
                 *     if (col.name == 'sparklines') {
                 *       cell.innerHTML = getSparklike(panel, r, c);
                 *     }
                 *   }
                 * }
                 * </pre>
                 *
                 * Note that the FlexGrid recycles cells, so if your @see:itemFormatter
                 * modifies the cell's style attributes, you must make sure that it resets
                 * these attributes for cells that should not have them. For example:
                 *
                 * <pre>
                 * flex.itemFormatter = function(panel, r, c, cell) {
                 *   // reset attributes we are about to customize
                 *   var s = cell.style;
                 *   s.color = '';
                 *   s.backgroundColor = '';
                 *   // customize color and backgroundColor attributes for this cell
                 *   ...
                 * }
                 * </pre>
                 *
                 * If you have a scenario where multiple clients may want to customize the
                 * grid rendering (for example when creating directives or re-usable libraries),
                 * consider using the @see:formatItem event instead. The event allows multiple
                 * clients to attach their own handlers.
                 */
                get: function () {
                    return this._itemFormatter;
                },
                set: function (value) {
                    if (value != this._itemFormatter) {
                        this._itemFormatter = wijmo.asFunction(value);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Gets a value that indicates whether a given cell can be edited.
             *
             * @param r Index of the row that contains the cell.
             * @param c Index of the column that contains the cell.
             */
            FlexGrid.prototype.canEditCell = function (r, c) {
                return this._edtHdl._allowEditing(r, c);
            };
            /**
             * Gets the value stored in a cell in the scrollable area of the grid.
             *
             * @param r Index of the row that contains the cell.
             * @param c Index of the column that contains the cell.
             * @param formatted Whether to format the value for display.
             */
            FlexGrid.prototype.getCellData = function (r, c, formatted) {
                return this.cells.getCellData(r, c, formatted);
            };
            /**
             * Gets a the bounds of a cell element in viewport coordinates.
             *
             * This method returns the bounds of cells in the @see:cells
             * panel (scrollable data cells). To get the bounds of cells
             * in other panels, use the @see:getCellBoundingRect method
             * in the appropriate @see:GridPanel object.
             *
             * The returned value is a @see:Rect object which contains the
             * position and dimensions of the cell in viewport coordinates.
             * The viewport coordinates are the same used by the
             * <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect">getBoundingClientRect</a>
             * method.
             *
             * @param r Index of the row that contains the cell.
             * @param c Index of the column that contains the cell.
             * @param raw Whether to return the rectangle in raw panel coordinates
             * as opposed to viewport coordinates.
             */
            FlexGrid.prototype.getCellBoundingRect = function (r, c, raw) {
                return this.cells.getCellBoundingRect(r, c, raw);
            };
            /**
             * Sets the value of a cell in the scrollable area of the grid.
             *
             * @param r Index of the row that contains the cell.
             * @param c Index, name, or binding of the column that contains the cell.
             * @param value Value to store in the cell.
             * @param coerce Whether to change the value automatically to match the column's data type.
             * @param invalidate Whether to invalidate the grid to show the change.
             * @return True if the value was stored successfully, false otherwise.
             */
            FlexGrid.prototype.setCellData = function (r, c, value, coerce, invalidate) {
                if (coerce === void 0) { coerce = true; }
                if (invalidate === void 0) { invalidate = true; }
                return this.cells.setCellData(r, c, value, coerce, invalidate);
            };
            /**
             * Gets a @see:wijmo.grid.HitTestInfo object with information about a given point.
             *
             * For example:
             *
             * <pre>// hit test a point when the user clicks on the grid
             * flex.hostElement.addEventListener('click', function (e) {
             *   var ht = flex.hitTest(e.pageX, e.pageY);
             *   console.log('you clicked a cell of type "' +
             *     wijmo.grid.CellType[ht.cellType] + '".');
             * });</pre>
             *
             * @param pt @see:Point to investigate, in page coordinates, or a MouseEvent object, or x coordinate of the point.
             * @param y Y coordinate of the point in page coordinates (if the first parameter is a number).
             * @return A @see:wijmo.grid.HitTestInfo object with information about the point.
             */
            FlexGrid.prototype.hitTest = function (pt, y) {
                if (wijmo.isNumber(pt) && wijmo.isNumber(y)) {
                    pt = new wijmo.Point(pt, y);
                }
                return new grid.HitTestInfo(this, pt);
            };
            /**
             * Gets the content of a @see:CellRange as a string suitable for
             * copying to the clipboard.
             *
             * Hidden rows and columns are not included in the clip string.
             *
             * @param rng @see:CellRange to copy. If omitted, the current selection is used.
             */
            FlexGrid.prototype.getClipString = function (rng) {
                var clipString = '', firstRow = true, firstCell = true;
                // get the source range (taking selection mode into account)
                if (!rng) {
                    rng = this.selection;
                    switch (this.selectionMode) {
                        // row modes: expand range to cover all columns
                        case grid.SelectionMode.Row:
                        case grid.SelectionMode.RowRange:
                            rng.col = 0;
                            rng.col2 = this.columns.length - 1;
                            break;
                        // ListBox mode: scan rows and copy selected ones
                        case grid.SelectionMode.ListBox:
                            rng.col = 0;
                            rng.col2 = this.columns.length - 1;
                            for (var i = 0; i < this.rows.length; i++) {
                                if (this.rows[i].isSelected && this.rows[i].isVisible) {
                                    rng.row = rng.row2 = i;
                                    if (clipString)
                                        clipString += '\n';
                                    clipString += this.getClipString(rng);
                                }
                            }
                            return clipString;
                    }
                }
                // scan rows
                rng = wijmo.asType(rng, grid.CellRange);
                for (var r = rng.topRow; r <= rng.bottomRow; r++) {
                    // skip invisible, add separator
                    if (!this.rows[r].isVisible)
                        continue;
                    if (!firstRow)
                        clipString += '\n';
                    firstRow = false;
                    // scan cells
                    for (var c = rng.leftCol, firstCell = true; c <= rng.rightCol; c++) {
                        // skip invisible, add separator
                        if (!this.columns[c].isVisible)
                            continue;
                        if (!firstCell)
                            clipString += '\t';
                        firstCell = false;
                        // append cell (handling tabs, new lines, and double quotes TFS 243258)
                        var cell = this.cells.getCellData(r, c, true).toString();
                        cell = cell.replace(/\t/g, ' ');
                        if (cell.indexOf('\n') > -1 || cell.indexOf('"') > -1) {
                            cell = '"' + cell.replace(/"/g, '""') + '"';
                        }
                        clipString += cell;
                    }
                }
                // done
                return clipString;
            };
            /**
             * Parses a string into rows and columns and applies the content to a given range.
             *
             * Hidden rows and columns are skipped.
             *
             * @param text Tab and newline delimited text to parse into the grid.
             * @param rng @see:CellRange to copy. If omitted, the current selection is used.
             */
            FlexGrid.prototype.setClipString = function (text, rng) {
                // get the target range (taking selection mode into account)
                var autoRange = rng == null;
                if (!rng) {
                    rng = this.selection;
                    switch (this.selectionMode) {
                        case grid.SelectionMode.Row:
                        case grid.SelectionMode.RowRange:
                        case grid.SelectionMode.ListBox:
                            rng.col = 0;
                            rng.col2 = this.columns.length - 1;
                            break;
                    }
                }
                rng = wijmo.asType(rng, grid.CellRange);
                // normalize text
                text = wijmo.asString(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
                if (text && text[text.length - 1] == '\n') {
                    text = text.substring(0, text.length - 1);
                }
                if (autoRange && !rng.isSingleCell) {
                    text = this._expandClipString(text, rng);
                }
                // keep track of paste range to select later
                var rngPaste = new grid.CellRange(rng.topRow, rng.leftCol);
                // copy lines to rows
                this.beginUpdate();
                var row = rng.topRow, lines = this._clipToRows(text), pasted = false, e;
                for (var i = 0; i < lines.length && row < this.rows.length; i++, row++) {
                    // skip invisible row, keep clip line
                    if (!this.rows[row].isVisible) {
                        i--;
                        continue;
                    }
                    // copy cells to columns
                    var cells = this._clipToCells(lines[i]), //lines[i].split('\t'),
                    col = rng.leftCol;
                    for (var j = 0; j < cells.length && col < this.columns.length; j++, col++) {
                        // skip invisible column, keep clip cell
                        if (!this.columns[col].isVisible) {
                            j--;
                            continue;
                        }
                        // assign cell
                        if (this._edtHdl._allowEditing(row, col)) {
                            // raise events so user can cancel the paste
                            e = new grid.CellRangeEventArgs(this.cells, new grid.CellRange(row, col), cells[j]);
                            if (this.onPastingCell(e)) {
                                if (this.cells.setCellData(row, col, e.data)) {
                                    this.onPastedCell(e);
                                    pasted = true;
                                }
                            }
                            // update paste range
                            rngPaste.row2 = Math.max(rngPaste.row2, row);
                            rngPaste.col2 = Math.max(rngPaste.col2, col);
                        }
                    }
                }
                this.endUpdate();
                // handle editing
                if (pasted) {
                    var ecv = wijmo.tryCast(this.collectionView, 'IEditableCollectionView');
                    if (ecv && ecv.currentItem == ecv.currentAddItem) {
                        ecv.editItem(ecv.currentItem); // editing a new item, get into edit mode
                    }
                    else if (this.collectionView) {
                        this.collectionView.refresh(); // update sorting/filtering 
                    }
                }
                // select pasted range
                this.select(rngPaste);
            };
            // break a string into rows and cells accounting for quoted breaks
            FlexGrid.prototype._clipToRows = function (text) {
                var arr = [], start = 0, quoting = false;
                for (var i = 0; i < text.length; i++) {
                    switch (text[i]) {
                        case '"':
                            quoting = !quoting;
                            break;
                        case '\n':
                            if (!quoting) {
                                arr.push(text.substr(start, i - start));
                                start = i + 1;
                            }
                            break;
                    }
                }
                arr.push(text.substr(start));
                return arr;
            };
            FlexGrid.prototype._clipToCells = function (text) {
                var arr = text.split('\t');
                for (var i = 0; i < arr.length; i++) {
                    var text = arr[i], len = text.length;
                    if (len > 1 && text[0] == '"' && text[len - 1] == '"') {
                        text = text.substr(1, len - 2);
                        text = text.replace(/""/g, '"');
                    }
                    arr[i] = text;
                }
                return arr;
            };
            // expand clip string to get Excel-like behavior
            FlexGrid.prototype._expandClipString = function (text, rng) {
                // sanity
                if (!text)
                    return text;
                // get clip string dimensions and cells
                var lines = text.split('\n'), srcRows = lines.length, srcCols = 0, rows = [];
                for (var r = 0; r < srcRows; r++) {
                    var cells = lines[r].split('\t');
                    rows.push(cells);
                    if (r > 1 && cells.length != srcCols)
                        return text;
                    srcCols = cells.length;
                }
                // get destination size (visible rows/cols only, TFS 238478, 238479)
                var dstRows = 0, dstCols = 0;
                for (var r = rng.topRow; r <= rng.bottomRow; r++) {
                    if (this.rows[r].isVisible) {
                        dstRows++;
                    }
                }
                for (var c = rng.leftCol; c <= rng.rightCol; c++) {
                    if (this.columns[c].isVisible) {
                        dstCols++;
                    }
                }
                // expand if destination size is a multiple of source size (like Excel)
                if (dstRows > 1 || dstCols > 1) {
                    if (dstRows == 1)
                        dstRows = srcRows;
                    if (dstCols == 1)
                        dstCols = srcCols;
                    if (dstCols % srcCols == 0 && dstRows % srcRows == 0) {
                        text = '';
                        for (var r = 0; r < dstRows; r++) {
                            for (var c = 0; c < dstCols; c++) {
                                if (r > 0 && c == 0)
                                    text += '\n';
                                if (c > 0)
                                    text += '\t';
                                text += rows[r % srcRows][c % srcCols];
                            }
                        }
                    }
                }
                // done
                return text;
            };
            /**
             * Overridden to set the focus to the grid without scrolling the
             * whole grid into view.
             */
            FlexGrid.prototype.focus = function () {
                // no host? no work
                var host = this.hostElement;
                if (!host) {
                    return;
                }
                // if we have an active editor, let it keep the focus
                if (this.activeEditor) {
                    this.activeEditor.focus();
                    return;
                }
                // save work if possible
                if (wijmo.getActiveElement() == this._eFocus) {
                    return;
                }
                // if the grid is visible, use inner element '_efocus'
                var rc = host.getBoundingClientRect();
                if (rc.bottom > 0 && rc.right > 0 && rc.top < innerHeight && rc.left < innerWidth) {
                    this._eFocus.focus();
                    return;
                }
                // if the grid is off the screen, try focusing on the selected cell
                var cell = this.cells.hostElement.querySelector('.wj-cell.wj-state-selected');
                if (cell) {
                    cell.focus();
                    if (wijmo.getActiveElement() == cell) {
                        return;
                    }
                }
                // off-screen, no current cell, focus on the grid's host element (will scroll it into view)
                _super.prototype.focus.call(this);
            };
            /**
             * Checks whether this control contains the focused element.
             */
            FlexGrid.prototype.containsFocus = function () {
                // grid has focus
                if (_super.prototype.containsFocus.call(this)) {
                    return true;
                }
                // drop-down editor has focus (TFS 212895)
                var lbx = this._edtHdl ? this._edtHdl._lbx : null;
                if (lbx != null && lbx.containsFocus()) {
                    return true;
                }
                // filter editor has focus (TFS 234587)
                var ae = wijmo.getActiveElement(), ed = wijmo.Control.getControl(ae), flt = ed ? ed.filter : null, col = flt ? flt.column : null;
                if (col && col.grid == this) {
                    return true;
                }
                // nope
                return false;
            };
            /**
             * Disposes of the control by removing its association with the host element.
             */
            FlexGrid.prototype.dispose = function () {
                // cancel any pending edits, close drop-down list
                this.finishEditing(true);
                // remove itemsSource so it doesn't have references to our
                // change event handlers that would prevent the grid from being
                // garbage-collected.
                this.itemsSource = null;
                // allow base class
                _super.prototype.dispose.call(this);
            };
            /**
             * Refreshes the grid display.
             *
             * @param fullUpdate Whether to update the grid layout and content, or just the content.
             */
            FlexGrid.prototype.refresh = function (fullUpdate) {
                if (fullUpdate === void 0) { fullUpdate = true; }
                // always call base class to handle being/endUpdate logic
                _super.prototype.refresh.call(this, fullUpdate);
                // close any open drop-downs
                this.finishEditing();
                // on full updates, get missing column types based on bindings and
                // update scroll position in case the control just became visible
                // and IE wrongly reset the element's scroll position to the origin
                // http://wijmo.com/topic/flexgrid-refresh-issue-when-hidden/
                if (fullUpdate) {
                    this._updateColumnTypes();
                    this.scrollPosition = this._ptScrl; // update element to match grid
                    //this._updateScrollPosition(); // update grid to match element
                }
                // go refresh the cells
                this.refreshCells(fullUpdate);
            };
            /**
             * Refreshes the grid display.
             *
             * @param fullUpdate Whether to update the grid layout and content, or just the content.
             * @param recycle Whether to recycle existing elements.
             * @param state Whether to keep existing elements and update their state.
             */
            FlexGrid.prototype.refreshCells = function (fullUpdate, recycle, state) {
                if (!this.isUpdating) {
                    if (fullUpdate) {
                        this._updateLayout();
                    }
                    else {
                        this._updateContent(recycle, state);
                    }
                }
            };
            /**
             * Resizes a column to fit its content.
             *
             * @param c Index of the column to resize.
             * @param header Whether the column index refers to a regular or a header row.
             * @param extra Extra spacing, in pixels.
             */
            FlexGrid.prototype.autoSizeColumn = function (c, header, extra) {
                if (header === void 0) { header = false; }
                if (extra === void 0) { extra = 4; }
                this.autoSizeColumns(c, c, header, extra);
            };
            /**
             * Resizes a range of columns to fit their content.
             *
             * The grid will always measure all rows in the current view range, plus up to 2,000 rows
             * not currently in view. If the grid contains a large amount of data (say 50,000 rows),
             * then not all rows will be measured since that could potentially take a long time.
             *
             * @param firstColumn Index of the first column to resize (defaults to the first column).
             * @param lastColumn Index of the last column to resize (defaults to the last column).
             * @param header Whether the column indices refer to regular or header columns.
             * @param extra Extra spacing, in pixels.
             */
            FlexGrid.prototype.autoSizeColumns = function (firstColumn, lastColumn, header, extra) {
                var _this = this;
                if (header === void 0) { header = false; }
                if (extra === void 0) { extra = 4; }
                var max = 0, pHdr = header ? this.topLeftCells : this.columnHeaders, pCells = header ? this.rowHeaders : this.cells, rowRange = this.viewRange;
                // initialize parameters
                firstColumn = firstColumn == null ? 0 : wijmo.asInt(firstColumn);
                lastColumn = lastColumn == null ? pCells.columns.length - 1 : wijmo.asInt(lastColumn);
                wijmo.asBoolean(header);
                wijmo.asNumber(extra);
                // choose row range to measure
                // (viewrange by default, everything if we have only a few items)
                rowRange.row = Math.max(0, rowRange.row - 1000);
                rowRange.row2 = Math.min(rowRange.row2 + 1000, this.rows.length - 1);
                // finish editing and perform auto-sizing
                if (this.finishEditing()) {
                    this.deferUpdate(function () {
                        // make sure content element width is set
                        wijmo.setCss(_this._eCt, { width: _this._gpCells.width });
                        // create element to measure content
                        var eMeasure = document.createElement('div');
                        eMeasure.setAttribute(FlexGrid._WJS_MEASURE, 'true');
                        eMeasure.style.visibility = 'hidden';
                        pCells.hostElement.parentElement.appendChild(eMeasure);
                        // measure cells in the range
                        for (var c = firstColumn; c <= lastColumn && c > -1 && c < pCells.columns.length; c++) {
                            max = 0;
                            // headers
                            if (_this.autoSizeMode & grid.AutoSizeMode.Headers) {
                                for (var r = 0; r < pHdr.rows.length; r++) {
                                    if (pHdr.rows[r].isVisible) {
                                        var w = _this._getDesiredWidth(pHdr, r, c, eMeasure);
                                        max = Math.max(max, w);
                                    }
                                }
                            }
                            // cells
                            if (_this.autoSizeMode & grid.AutoSizeMode.Cells) {
                                for (var r = rowRange.row; r <= rowRange.row2 && r > -1 && r < pCells.rows.length; r++) {
                                    if (pCells.rows[r].isVisible) {
                                        var w = _this._getDesiredWidth(pCells, r, c, eMeasure);
                                        max = Math.max(max, w);
                                    }
                                }
                            }
                            // set size
                            pCells.columns[c].width = max + extra + 2;
                        }
                        // done with measuring element
                        eMeasure.parentElement.removeChild(eMeasure);
                    });
                }
            };
            /**
             * Resizes a row to fit its content.
             *
             * @param r Index of the row to resize.
             * @param header Whether the row index refers to a regular or a header row.
             * @param extra Extra spacing, in pixels.
             */
            FlexGrid.prototype.autoSizeRow = function (r, header, extra) {
                if (header === void 0) { header = false; }
                if (extra === void 0) { extra = 0; }
                this.autoSizeRows(r, r, header, extra);
            };
            /**
             * Resizes a range of rows to fit their content.
             *
             * @param firstRow Index of the first row to resize.
             * @param lastRow Index of the last row to resize.
             * @param header Whether the row indices refer to regular or header rows.
             * @param extra Extra spacing, in pixels.
             */
            FlexGrid.prototype.autoSizeRows = function (firstRow, lastRow, header, extra) {
                var _this = this;
                if (header === void 0) { header = false; }
                if (extra === void 0) { extra = 0; }
                var max = 0, pHdr = header ? this.topLeftCells : this.rowHeaders, pCells = header ? this.columnHeaders : this.cells;
                // initialize parameters
                header = wijmo.asBoolean(header);
                extra = wijmo.asNumber(extra);
                firstRow = firstRow == null ? 0 : wijmo.asInt(firstRow);
                lastRow = lastRow == null ? pCells.rows.length - 1 : wijmo.asInt(lastRow);
                // finish editing and perform auto-sizing
                if (this.finishEditing()) {
                    this.deferUpdate(function () {
                        // make sure content element width is set
                        wijmo.setCss(_this._eCt, { width: _this._gpCells.width });
                        // create element to measure content
                        var eMeasure = document.createElement('div');
                        eMeasure.setAttribute(FlexGrid._WJS_MEASURE, 'true');
                        eMeasure.style.visibility = 'hidden';
                        pCells.hostElement.appendChild(eMeasure);
                        // measure cells in the range
                        for (var r = firstRow; r <= lastRow && r > -1 && r < pCells.rows.length; r++) {
                            max = 0;
                            // headers
                            if (_this.autoSizeMode & grid.AutoSizeMode.Headers) {
                                for (var c = 0; c < pHdr.columns.length; c++) {
                                    if (pHdr.columns[c].renderSize > 0) {
                                        var h = _this._getDesiredHeight(pHdr, r, c, eMeasure);
                                        max = Math.max(max, h);
                                    }
                                }
                            }
                            // cells
                            if (_this.autoSizeMode & grid.AutoSizeMode.Cells) {
                                for (var c = 0; c < pCells.columns.length; c++) {
                                    if (pCells.columns[c].renderSize > 0) {
                                        var h = _this._getDesiredHeight(pCells, r, c, eMeasure);
                                        max = Math.max(max, h);
                                    }
                                }
                            }
                            // update size
                            pCells.rows[r].height = max + extra;
                        }
                        // done with measuring element
                        eMeasure.parentElement.removeChild(eMeasure);
                    });
                }
            };
            Object.defineProperty(FlexGrid.prototype, "treeIndent", {
                /**
                 * Gets or sets the indent used to offset row groups of different levels.
                 */
                get: function () {
                    return this._indent;
                },
                set: function (value) {
                    if (value != this._indent) {
                        this._indent = wijmo.asNumber(value, false, true);
                        this.columns.onCollectionChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Collapses all the group rows to a given level.
             *
             * @param level Maximum group level to show.
             */
            FlexGrid.prototype.collapseGroupsToLevel = function (level) {
                // finish editing first (this may change the collection)
                if (this.finishEditing()) {
                    // set collapsed state for all rows in the grid
                    var rows = this.rows;
                    rows.deferUpdate(function () {
                        for (var r = 0; r < rows.length; r++) {
                            var gr = wijmo.tryCast(rows[r], grid.GroupRow);
                            if (gr) {
                                gr.isCollapsed = gr.level >= level;
                            }
                        }
                    });
                }
            };
            Object.defineProperty(FlexGrid.prototype, "selectionMode", {
                /**
                 * Gets or sets the current selection mode.
                 */
                get: function () {
                    return this._selHdl.selectionMode;
                },
                set: function (value) {
                    if (value != this.selectionMode) {
                        this._selHdl.selectionMode = wijmo.asEnum(value, grid.SelectionMode);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "selection", {
                /**
                 * Gets or sets the current selection.
                 */
                get: function () {
                    return this._selHdl.selection.clone();
                },
                set: function (value) {
                    this._selHdl.selection = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Selects a cell range and optionally scrolls it into view.
             *
             * @param rng Range to select.
             * @param show Whether to scroll the new selection into view.
             */
            FlexGrid.prototype.select = function (rng, show) {
                if (show === void 0) { show = true; }
                this._selHdl.select(rng, show);
            };
            /**
             * Gets a @see:SelectedState value that indicates the selected state of a cell.
             *
             * @param r Row index of the cell to inspect.
             * @param c Column index of the cell to inspect.
             */
            FlexGrid.prototype.getSelectedState = function (r, c) {
                return this.cells.getSelectedState(r, c, null);
            };
            Object.defineProperty(FlexGrid.prototype, "selectedRows", {
                /**
                 * Gets or sets an array containing the rows that are currently selected.
                 *
                 * Note: this property can be read in all selection modes, but it can be
                 * set only when @see:selectionMode is set to <b>SelectionMode.ListBox</b>.
                 */
                get: function () {
                    var rows = [];
                    if (this.selectionMode == grid.SelectionMode.ListBox) {
                        for (var i = 0; i < this.rows.length; i++) {
                            if (this.rows[i].isSelected) {
                                rows.push(this.rows[i]);
                            }
                        }
                    }
                    else if (this.rows.length) {
                        var sel = this.selection;
                        for (var i = sel.topRow; i > -1 && i <= sel.bottomRow; i++) {
                            rows.push(this.rows[i]);
                        }
                    }
                    return rows;
                },
                set: function (value) {
                    var _this = this;
                    wijmo.assert(this.selectionMode == grid.SelectionMode.ListBox, 'This property can be set only in ListBox mode.');
                    value = wijmo.asArray(value);
                    this.deferUpdate(function () {
                        for (var i = 0, first = true; i < _this.rows.length; i++) {
                            var row = _this.rows[i], sel = value && value.indexOf(row) > -1;
                            if (sel && first) {
                                first = false;
                                _this.select(i, _this.selection.col);
                            }
                            row.isSelected = sel;
                        }
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "selectedItems", {
                /**
                 * Gets or sets an array containing the data items that are currently selected.
                 *
                 * Note: this property can be read in all selection modes, but it can be
                 * set only when @see:selectionMode is set to <b>SelectionMode.ListBox</b>.
                 */
                get: function () {
                    var items = this.selectedRows;
                    for (var i = 0; i < items.length; i++) {
                        items[i] = items[i].dataItem;
                    }
                    return items;
                },
                set: function (value) {
                    var _this = this;
                    wijmo.assert(this.selectionMode == grid.SelectionMode.ListBox, 'This property can be set only in ListBox mode.');
                    value = wijmo.asArray(value);
                    this.deferUpdate(function () {
                        for (var i = 0, first = true; i < _this.rows.length; i++) {
                            var row = _this.rows[i], sel = value && value.indexOf(row.dataItem) > -1;
                            if (sel && first) {
                                first = false;
                                _this.select(i, _this.selection.col);
                            }
                            row.isSelected = sel;
                        }
                    });
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Scrolls the grid to bring a specific cell into view.
             *
             * @param r Index of the row to scroll into view.
             * @param c Index of the column to scroll into view.
             * @return True if the grid scrolled.
             */
            FlexGrid.prototype.scrollIntoView = function (r, c) {
                // make sure our dimensions are set and up-to-date
                if (this._maxOffsetY == null) {
                    this._updateLayout();
                }
                // and go to work
                var sp = this.scrollPosition, wid = this._szClient.width, hei = this._szClient.height - this._gpCFtr.rows.getTotalSize(), ptFrz = this.cells._getFrozenPos();
                // calculate row offset
                r = wijmo.asInt(r);
                if (r > -1 && r < this._rows.length && r >= this._rows.frozen) {
                    var row = this._rows[r], pct = this.cells.height > hei ? Math.round(row.pos / (this.cells.height - hei) * 100) / 100 : 0, offsetY = Math.round(this._maxOffsetY * pct), rpos = row.pos - offsetY, rbot = rpos + row.renderSize; // - 1; // TFS 250815
                    if (rbot > hei - sp.y) {
                        sp.y = Math.max(-rpos, hei - rbot);
                    }
                    if (rpos - ptFrz.y < -sp.y) {
                        sp.y = -(rpos - ptFrz.y);
                    }
                }
                // calculate column offset
                c = wijmo.asInt(c);
                if (c > -1 && c < this._cols.length && c >= this._cols.frozen) {
                    var col = this._cols[c], rgt = col.pos + col.renderSize - 1;
                    if (rgt > -sp.x + wid) {
                        sp.x = Math.max(-col.pos, wid - rgt);
                    }
                    if (col.pos - ptFrz.x < -sp.x) {
                        sp.x = -(col.pos - ptFrz.x);
                    }
                }
                // update scroll position
                if (!sp.equals(this._ptScrl)) {
                    this.scrollPosition = sp;
                    return true;
                }
                // no change
                return false;
            };
            /**
             * Checks whether a given CellRange is valid for this grid's row and column collections.
             *
             * @param rng Range to check.
             */
            FlexGrid.prototype.isRangeValid = function (rng) {
                return rng.isValid && rng.bottomRow < this.rows.length && rng.rightCol < this.columns.length;
            };
            /**
             * Starts editing a given cell.
             *
             * Editing in the @see:FlexGrid is similar to editing in Excel:
             * Pressing F2 or double-clicking a cell puts the grid in <b>full-edit</b> mode.
             * In this mode, the cell editor remains active until the user presses Enter, Tab,
             * or Escape, or until he moves the selection with the mouse. In full-edit mode,
             * pressing the cursor keys does not cause the grid to exit edit mode.
             *
             * Typing text directly into a cell puts the grid in <b>quick-edit mode</b>.
             * In this mode, the cell editor remains active until the user presses Enter,
             * Tab, or Escape, or any arrow keys.
             *
             * Full-edit mode is normally used to make changes to existing values.
             * Quick-edit mode is normally used for entering new data quickly.
             *
             * While editing, the user can toggle between full and quick modes by
             * pressing the F2 key.
             *
             * @param fullEdit Whether to stay in edit mode when the user presses the cursor keys. Defaults to false.
             * @param r Index of the row to be edited. Defaults to the currently selected row.
             * @param c Index of the column to be edited. Defaults to the currently selected column.
             * @param focus Whether to give the editor the focus when editing starts. Defaults to true.
             * @return True if the edit operation started successfully.
             */
            FlexGrid.prototype.startEditing = function (fullEdit, r, c, focus) {
                if (fullEdit === void 0) { fullEdit = true; }
                return this._edtHdl.startEditing(fullEdit, r, c, focus);
            };
            /**
             * Commits any pending edits and exits edit mode.
             *
             * @param cancel Whether pending edits should be canceled or committed.
             * @return True if the edit operation finished successfully.
             */
            FlexGrid.prototype.finishEditing = function (cancel) {
                if (cancel === void 0) { cancel = false; }
                return this._edtHdl.finishEditing(cancel);
            };
            Object.defineProperty(FlexGrid.prototype, "activeEditor", {
                /**
                 * Gets the <b>HTMLInputElement</b> that represents the cell editor currently active.
                 */
                get: function () {
                    return this._edtHdl.activeEditor;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "editRange", {
                /**
                 * Gets a @see:CellRange that identifies the cell currently being edited.
                 */
                get: function () {
                    return this._edtHdl.editRange;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FlexGrid.prototype, "mergeManager", {
                /**
                 * Gets or sets the @see:MergeManager object responsible for determining how cells
                 * should be merged.
                 */
                get: function () {
                    return this._mrgMgr;
                },
                set: function (value) {
                    if (value != this._mrgMgr) {
                        this._mrgMgr = wijmo.asType(value, grid.MergeManager, true);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Gets a @see:CellRange that specifies the merged extent of a cell
             * in a @see:GridPanel.
             *
             * @param p The @see:GridPanel that contains the range.
             * @param r Index of the row that contains the cell.
             * @param c Index of the column that contains the cell.
             * @param clip Whether to clip the merged range to the grid's current view range.
             * @return A @see:CellRange that specifies the merged range, or null if the cell is not merged.
             */
            FlexGrid.prototype.getMergedRange = function (p, r, c, clip) {
                if (clip === void 0) { clip = true; }
                return this._mrgMgr ? this._mrgMgr.getMergedRange(p, r, c, clip) : null;
            };
            /**
             * Raises the @see:itemsSourceChanged event.
             */
            FlexGrid.prototype.onItemsSourceChanged = function (e) {
                this.itemsSourceChanged.raise(this, e);
            };
            /**
             * Raises the @see:scrollPositionChanged event.
             */
            FlexGrid.prototype.onScrollPositionChanged = function (e) {
                this.scrollPositionChanged.raise(this, e);
            };
            /**
             * Raises the @see:selectionChanging event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onSelectionChanging = function (e) {
                this.selectionChanging.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:selectionChanged event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onSelectionChanged = function (e) {
                this.selectionChanged.raise(this, e);
            };
            /**
             * Raises the @see:loadingRows event.
             *
             * @param e @see:CancelEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onLoadingRows = function (e) {
                this.loadingRows.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:loadedRows event.
             */
            FlexGrid.prototype.onLoadedRows = function (e) {
                this.loadedRows.raise(this, e);
            };
            /**
             * Raises the @see:updatingLayout event.
             *
             * @param e @see:CancelEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onUpdatingLayout = function (e) {
                this.updatingLayout.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:updatedLayout event.
             */
            FlexGrid.prototype.onUpdatedLayout = function (e) {
                this.updatedLayout.raise(this, e);
            };
            /**
             * Raises the @see:resizingColumn event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onResizingColumn = function (e) {
                this.resizingColumn.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:resizedColumn event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onResizedColumn = function (e) {
                this.resizedColumn.raise(this, e);
            };
            /**
             * Raises the @see:autoSizingColumn event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onAutoSizingColumn = function (e) {
                this.autoSizingColumn.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:autoSizedColumn event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onAutoSizedColumn = function (e) {
                this.autoSizedColumn.raise(this, e);
            };
            /**
             * Raises the @see:draggingColumn event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onDraggingColumn = function (e) {
                this.draggingColumn.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:draggingColumnOver event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onDraggingColumnOver = function (e) {
                this.draggingColumnOver.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:draggedColumn event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onDraggedColumn = function (e) {
                this.draggedColumn.raise(this, e);
            };
            /**
             * Raises the @see:resizingRow event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onResizingRow = function (e) {
                this.resizingRow.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:resizedRow event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onResizedRow = function (e) {
                this.resizedRow.raise(this, e);
            };
            /**
             * Raises the @see:autoSizingRow event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onAutoSizingRow = function (e) {
                this.autoSizingRow.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:autoSizedRow event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onAutoSizedRow = function (e) {
                this.autoSizedRow.raise(this, e);
            };
            /**
             * Raises the @see:draggingRow event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onDraggingRow = function (e) {
                this.draggingRow.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:draggingRowOver event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onDraggingRowOver = function (e) {
                this.draggingRowOver.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:draggedRow event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onDraggedRow = function (e) {
                this.draggedRow.raise(this, e);
            };
            /**
             * Raises the @see:groupCollapsedChanging event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onGroupCollapsedChanging = function (e) {
                this.groupCollapsedChanging.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:groupCollapsedChanged event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onGroupCollapsedChanged = function (e) {
                this.groupCollapsedChanged.raise(this, e);
            };
            /**
             * Raises the @see:sortingColumn event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onSortingColumn = function (e) {
                this.sortingColumn.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:sortedColumn event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onSortedColumn = function (e) {
                this.sortedColumn.raise(this, e);
            };
            /**
             * Raises the @see:beginningEdit event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onBeginningEdit = function (e) {
                this.beginningEdit.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:prepareCellForEdit event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onPrepareCellForEdit = function (e) {
                this.prepareCellForEdit.raise(this, e);
            };
            /**
             * Raises the @see:cellEditEnding event.
             *
             * @param e @see:CellEditEndingEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onCellEditEnding = function (e) {
                this.cellEditEnding.raise(this, e);
                return !e.cancel && !e.stayInEditMode;
            };
            /**
             * Raises the @see:cellEditEnded event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onCellEditEnded = function (e) {
                this.cellEditEnded.raise(this, e);
            };
            /**
             * Raises the @see:rowEditStarting event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onRowEditStarting = function (e) {
                this.rowEditStarting.raise(this, e);
            };
            /**
             * Raises the @see:rowEditStarted event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onRowEditStarted = function (e) {
                this.rowEditStarted.raise(this, e);
            };
            /**
             * Raises the @see:rowEditEnding event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onRowEditEnding = function (e) {
                this.rowEditEnding.raise(this, e);
            };
            /**
             * Raises the @see:rowEditEnded event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onRowEditEnded = function (e) {
                this.rowEditEnded.raise(this, e);
            };
            /**
             * Raises the @see:rowAdded event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onRowAdded = function (e) {
                this.rowAdded.raise(this, e);
            };
            /**
             * Raises the @see:deletingRow event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onDeletingRow = function (e) {
                this.deletingRow.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:deletedRow event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onDeletedRow = function (e) {
                this.deletedRow.raise(this, e);
            };
            /**
             * Raises the @see:copying event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onCopying = function (e) {
                this.copying.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:copied event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onCopied = function (e) {
                this.copied.raise(this, e);
            };
            /**
             * Raises the @see:pasting event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onPasting = function (e) {
                this.pasting.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:pasted event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onPasted = function (e) {
                this.pasted.raise(this, e);
            };
            /**
             * Raises the @see:pastingCell event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onPastingCell = function (e) {
                this.pastingCell.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:pastedCell event.
             *
             * @param e @see:CellRangeEventArgs that contains the event data.
             */
            FlexGrid.prototype.onPastedCell = function (e) {
                this.pastedCell.raise(this, e);
            };
            /**
             * Raises the @see:formatItem event.
             *
             * @param e @see:FormatItemEventArgs that contains the event data.
             */
            FlexGrid.prototype.onFormatItem = function (e) {
                this.formatItem.raise(this, e);
            };
            /**
             * Raises the @see:updatingView event.
             *
             * @param e @see:CancelEventArgs that contains the event data.
             * @return True if the event was not canceled.
             */
            FlexGrid.prototype.onUpdatingView = function (e) {
                this.updatingView.raise(this, e);
                return !e.cancel;
            };
            /**
             * Raises the @see:updatedView event.
             */
            FlexGrid.prototype.onUpdatedView = function (e) {
                this.updatedView.raise(this, e);
            };
            //#endregion
            //--------------------------------------------------------------------------
            //#region ** implementation
            // measure the control's default row height based on current styles
            FlexGrid.prototype._getDefaultRowHeight = function () {
                // add control's root element to document body if it's detached 
                // (so CSS rules apply to our measurements)
                var host = this.hostElement, body = document.body, root = null;
                if (body && !wijmo.contains(body, host)) {
                    for (var p = host; p; p = p.parentElement) {
                        root = p;
                    }
                    if (root) {
                        body.appendChild(root);
                    }
                }
                // create cell, measure, and remove it
                // (add extra 2px to keep default compatible with old algorithm)
                var cell = wijmo.createElement('<div class="wj-cell">123</div>', host), defRowHei = cell.scrollHeight + 2;
                host.removeChild(cell);
                // remove root if we added it earlier
                if (root) {
                    body.removeChild(root);
                }
                // make 100% sure we have a reasonable default row height!
                if (defRowHei <= 6 || isNaN(defRowHei) || !body) {
                    defRowHei = 28;
                }
                // done, return what we have
                return defRowHei;
            };
            // gets the collection view associated with an itemsSource object
            FlexGrid.prototype._getCollectionView = function (value) {
                return wijmo.asCollectionView(value);
            };
            // measures the desired width of a cell
            FlexGrid.prototype._getDesiredWidth = function (p, r, c, e) {
                var rng = this.getMergedRange(p, r, c);
                this.cellFactory.updateCell(p, r, c, e, rng);
                e.style.width = '';
                var w = e.offsetWidth;
                return rng && rng.columnSpan > 1
                    ? w / rng.columnSpan
                    : w;
            };
            // measures the desired height of a cell
            FlexGrid.prototype._getDesiredHeight = function (p, r, c, e) {
                var rng = this.getMergedRange(p, r, c);
                this.cellFactory.updateCell(p, r, c, e, rng);
                e.style.height = '';
                var h = e.offsetHeight;
                return rng && rng.rowSpan > 1
                    ? h / rng.rowSpan
                    : h;
            };
            // gets the index of the sort row, with special handling for nulls
            FlexGrid.prototype._getSortRowIndex = function () {
                return this._sortRowIndex != null
                    ? this._sortRowIndex
                    : this.columnHeaders.rows.length - 1;
            };
            FlexGrid.prototype._sortConverter = function (sd, item, value, init) {
                var col;
                // initialize mapped column dictionary
                if (init) {
                    this._mappedColumns = null;
                    if (this.collectionView) {
                        var sds = this.collectionView.sortDescriptions;
                        for (var i = 0; i < sds.length; i++) {
                            col = this.getColumn(sds[i].property);
                            if (col && col.dataMap) {
                                if (!this._mappedColumns) {
                                    this._mappedColumns = {};
                                }
                                this._mappedColumns[col.binding] = col.dataMap;
                            }
                        }
                    }
                    // prioritize the column that was clicked
                    // (in case multiple columns map the same property)
                    if (this._mouseHdl._htDown && this._mouseHdl._htDown.col > -1) {
                        col = this.columns[this._mouseHdl._htDown.col];
                        if (this._mappedColumns && col.dataMap) {
                            this._mappedColumns[col.binding] = col.dataMap;
                        }
                    }
                }
                // convert value if we have a map
                if (this._mappedColumns) {
                    var map = this._mappedColumns[sd.property];
                    if (map && map.sortByDisplayValues) {
                        value = map.getDisplayValue(value);
                    }
                }
                // return the value to use for sorting
                return value;
            };
            // binds the grid to the current data source.
            FlexGrid.prototype._bindGrid = function (full) {
                var _this = this;
                this.deferUpdate(function () {
                    // do a full binding if we didn't have any data when we did it the first time
                    if (_this._lastCount == 0 && _this._cv && _this._cv.items && _this._cv.items.length) {
                        full = true;
                    }
                    // save selected state
                    var selItems = [];
                    if (_this.preserveSelectedState && _this.selectionMode == grid.SelectionMode.ListBox) {
                        for (var i = 0; i < _this.rows.length; i++) {
                            var row = _this.rows[i];
                            if (row.isSelected && row.dataItem) {
                                selItems.push(row.dataItem);
                            }
                        }
                    }
                    // save collapsed state
                    var map;
                    if (_this.preserveOutlineState && wijmo.isFunction(window['Map']) && _this.rows.maxGroupLevel > -1) {
                        map = new Map();
                        for (var i = 0; i < _this.rows.length; i++) {
                            var gr = _this.rows[i];
                            if (gr instanceof grid.GroupRow && gr.isCollapsed && gr.dataItem) {
                                var key = gr.dataItem;
                                if (key instanceof wijmo.collections.CollectionViewGroup) {
                                    key = key._path;
                                }
                                map.set(key, true);
                            }
                        }
                    }
                    // update columns
                    if (full) {
                        _this.columns.deferUpdate(function () {
                            _this._bindColumns();
                        });
                    }
                    // update rows
                    _this.rows.deferUpdate(function () {
                        _this._bindRows();
                    });
                    // restore/initialize ListBox selection
                    var cnt = 0;
                    if (selItems.length) {
                        for (var i = 0; i < _this.rows.length && cnt < selItems.length; i++) {
                            if (selItems.indexOf(_this.rows[i].dataItem) > -1) {
                                _this.rows[i].isSelected = true;
                                cnt++;
                            }
                        }
                    }
                    // failed to restore ListBox selection by object, update by index
                    if (_this.selectionMode == grid.SelectionMode.ListBox && cnt == 0) {
                        var sel = _this.selection;
                        for (var i = sel.topRow; i <= sel.bottomRow && i > -1 && i < _this.rows.length; i++) {
                            _this.rows[i].isSelected = true;
                        }
                    }
                    // restore collapsed state
                    if (map) {
                        _this.rows.deferUpdate(function () {
                            for (var i = 0; i < _this.rows.length; i++) {
                                var gr = _this.rows[i];
                                if (gr instanceof grid.GroupRow) {
                                    var key = gr.dataItem;
                                    if (key instanceof wijmo.collections.CollectionViewGroup) {
                                        key = key._path;
                                    }
                                    if (map.get(key)) {
                                        gr.isCollapsed = true;
                                    }
                                }
                            }
                        });
                    }
                    // save item count for next time
                    if (!_this._lastCount && _this._cv && _this._cv.items) {
                        _this._lastCount = _this._cv.items.length;
                    }
                });
                // update selection in case we have no rows
                if (!this.rows.length) {
                    this._selHdl._sel.row = this._selHdl._sel.row2 = -1;
                }
                // update selection with source view
                if (this.collectionView) {
                    this._cvCurrentChanged(this.collectionView, wijmo.EventArgs.empty);
                }
            };
            // update grid rows to sync with data source
            /*protected*/ FlexGrid.prototype._cvCollectionChanged = function (sender, e) {
                // auto-generate if necessary
                if (this.autoGenerateColumns && this.columns.length == 0) {
                    this._bindGrid(true);
                    return;
                }
                // hierarchical binding: re-create all rows
                if (this.childItemsPath && e.action != wijmo.collections.NotifyCollectionChangedAction.Change) {
                    this._bindGrid(false);
                    return;
                }
                // synchronize grid with updated CollectionView
                var index;
                switch (e.action) {
                    // an item has changed, invalidate the grid to show the changes
                    case wijmo.collections.NotifyCollectionChangedAction.Change:
                        this.invalidate();
                        return;
                    // an item has been added, insert a row
                    case wijmo.collections.NotifyCollectionChangedAction.Add:
                        if (e.index == this.collectionView.items.length - 1) {
                            index = this.rows.length;
                            if (this.rows[index - 1] instanceof grid._NewRowTemplate) {
                                index--;
                            }
                            this.rows.insert(index, new grid.Row(e.item));
                            return;
                        }
                        wijmo.assert(false, 'added item should be the last one.');
                        break;
                    // an item has been removed, delete the row
                    case wijmo.collections.NotifyCollectionChangedAction.Remove:
                        var index = this._findRow(e.item);
                        if (index > -1) {
                            this.rows.removeAt(index);
                            this._cvCurrentChanged(sender, e);
                            return;
                        }
                        wijmo.assert(false, 'removed item not found in grid.');
                        break;
                }
                // reset (sort, new source, etc): re-create all rows
                this._bindGrid(false);
            };
            // update selection to sync with data source
            FlexGrid.prototype._cvCurrentChanged = function (sender, e) {
                if (this.collectionView) {
                    // get grid's current item
                    var sel = this.selection, item = sel.row > -1 && sel.row < this.rows.length
                        ? this.rows[sel.row].dataItem
                        : null;
                    // groups are not regular data items (TFS 142470)
                    if (item instanceof wijmo.collections.CollectionViewGroup) {
                        item = null;
                    }
                    // if it doesn't match the view's, move the selection to match
                    if (item != this.collectionView.currentItem) {
                        // unless this is a focused tree: http://jsfiddle.net/Wijmo5/kk9j93bL/
                        if (!this.childItemsPath || !this.containsFocus()) {
                            sel.row = sel.row2 = this._getRowIndex(this.collectionView.currentPosition);
                            this.select(sel, false);
                            if (this.selectionMode != grid.SelectionMode.None) {
                                this.scrollIntoView(sel.row, -1);
                            }
                        }
                    }
                }
            };
            // convert CollectionView index to row index
            FlexGrid.prototype._getRowIndex = function (index) {
                if (this.collectionView) {
                    // look up item, then scan rows to find it
                    if (index > -1) {
                        var item = this.collectionView.items[index];
                        for (; index < this.rows.length; index++) {
                            if (this.rows[index].dataItem === item) {
                                return index;
                            }
                        }
                        return -1; // item not found, shouldn't happen!
                    }
                    else {
                        // empty grid except for new row template? select that
                        if (this.rows.length == 1 && this.rows[0] instanceof grid._NewRowTemplate) {
                            return 0;
                        }
                        // no item to look up, so return current unbound row (group header)
                        // or -1 (no selection)
                        var index = this.selection.row, row = index > -1 ? this.rows[index] : null;
                        return row && (row instanceof grid.GroupRow || row.dataItem == null)
                            ? index
                            : -1;
                    }
                }
                // not bound
                return this.selection.row;
            };
            // convert row index to CollectionView index
            FlexGrid.prototype._getCvIndex = function (index) {
                if (index > -1 && this.collectionView) {
                    var item = this.rows[index].dataItem;
                    index = Math.min(index, this.collectionView.items.length);
                    for (; index > -1; index--) {
                        if (this.collectionView.items[index] === item) {
                            return index;
                        }
                    }
                }
                return -1;
            };
            // gets the index of the row that represents a given data item
            FlexGrid.prototype._findRow = function (data) {
                for (var i = 0; i < this.rows.length; i++) {
                    if (this.rows[i].dataItem == data) {
                        return i;
                    }
                }
                return -1;
            };
            // re-arranges the child HTMLElements within this grid.
            FlexGrid.prototype._updateLayout = function () {
                // raise updatingLayout event
                var e = new wijmo.CancelEventArgs();
                if (!this.onUpdatingLayout(e)) {
                    return;
                }
                // compute content height, max height supported by browser,
                // and max offset so things match up when you scroll all the way down.
                var tlw = (this._hdrVis & HeadersVisibility.Row) ? this._hdrCols.getTotalSize() : 0, tlh = (this._hdrVis & HeadersVisibility.Column) ? this._hdrRows.getTotalSize() : 0, blh = this._ftrRows.getTotalSize(), heightReal = this._rows.getTotalSize() + blh;
                // make sure scrollbars are functional even if we have no rows (TFS 110441)
                if (heightReal < 1) {
                    heightReal = 1;
                }
                // keep track of relevant variables
                this._heightBrowser = Math.min(heightReal, FlexGrid._getMaxSupportedCssHeight());
                this._maxOffsetY = Math.max(0, heightReal - this._heightBrowser);
                // compute default cell padding
                if (this.cells.hostElement) {
                    var cell = wijmo.createElement('<div class="wj-cell"></div>', this.cells.hostElement), cs = getComputedStyle(cell);
                    this._cellPadding = parseInt(this.rightToLeft ? cs.paddingRight : cs.paddingLeft);
                    cell.parentElement.removeChild(cell);
                }
                // top of the footer divs
                var ftrTop = this._heightBrowser + tlh - blh;
                // set sizes that do *not* depend on scrollbars being visible
                if (this.rightToLeft) {
                    wijmo.setCss(this._eTL, { right: 0, top: 0, width: tlw, height: tlh });
                    wijmo.setCss(this._eCHdr, { right: tlw, top: 0, height: tlh });
                    wijmo.setCss(this._eRHdr, { right: 0, top: tlh, width: tlw });
                    wijmo.setCss(this._eCt, { right: tlw, top: tlh, width: this._gpCells.width, height: this._heightBrowser });
                    wijmo.setCss(this._fCt, { right: tlw, top: tlh });
                    wijmo.setCss(this._eBL, { right: 0, top: ftrTop, width: tlw, height: blh });
                    wijmo.setCss(this._eCFtr, { right: tlw, top: ftrTop, height: blh });
                }
                else {
                    wijmo.setCss(this._eTL, { left: 0, top: 0, width: tlw, height: tlh });
                    wijmo.setCss(this._eCHdr, { left: tlw, top: 0, height: tlh });
                    wijmo.setCss(this._eRHdr, { left: 0, top: tlh, width: tlw });
                    wijmo.setCss(this._eCt, { left: tlw, top: tlh, width: this._gpCells.width, height: this._heightBrowser });
                    wijmo.setCss(this._fCt, { left: tlw, top: tlh });
                    wijmo.setCss(this._eBL, { left: 0, top: ftrTop, width: tlw, height: blh });
                    wijmo.setCss(this._eCFtr, { left: tlw, top: ftrTop, height: blh });
                }
                // update sticky headers
                if (this._stickyHdr) {
                    this._updateStickyHeaders();
                }
                // adjust frozen cell panel when using marquee
                var zIndexArr = [this._eTL, this._eBL, this._eCHdr, this._eCFtr, this._eRHdr, this._eMarquee];
                if (this._useFrozenDiv() && this.showMarquee && (this.frozenRows || this.frozenColumns)) {
                    wijmo.setCss(zIndexArr, { zIndex: 1 });
                }
                else {
                    wijmo.setCss(zIndexArr, { zIndex: '' });
                }
                // update auto-sizer element
                var root = this._root, sbW = root.offsetWidth - root.clientWidth, sbH = root.offsetHeight - root.clientHeight;
                wijmo.setCss(this._eSz, {
                    width: tlw + sbW + this._gpCells.width,
                    height: tlh + sbH + this._heightBrowser
                });
                // update star sizes and re-adjust content width to handle round-offs
                var clientWidth = null;
                if (this.columns._updateStarSizes(root.clientWidth - tlw)) {
                    clientWidth = root.clientWidth;
                    wijmo.setCss(this._eCt, { width: this._gpCells.width });
                }
                // store control size
                this._rcBounds = null;
                this._szClient = new wijmo.Size(root.clientWidth - tlw, root.clientHeight - tlh);
                // update window scroll handler (sticky headers, window clipping)
                this._updateScrollHandler();
                // update content
                this._updateContent(false);
                // update auto-sizer element after refreshing content
                sbW = root.offsetWidth - root.clientWidth;
                sbH = root.offsetHeight - root.clientHeight;
                wijmo.setCss(this._eSz, {
                    width: tlw + sbW + this._gpCells.width,
                    height: tlh + sbH + this._heightBrowser
                });
                // update client size after refreshing content
                this._szClient = new wijmo.Size(root.clientWidth - tlw, root.clientHeight - tlh);
                // adjust star sizes to account for vertical scrollbars
                if (clientWidth && clientWidth != root.clientWidth) {
                    if (this.columns._updateStarSizes(root.clientWidth - tlw)) {
                        wijmo.setCss(this._eCt, { width: this._gpCells.width });
                        this._updateContent(false);
                    }
                }
                // set sizes that *do* depend on scrollbars being visible
                wijmo.setCss([this._eCHdr, this._eCFtr, this._fCt], { width: this._szClient.width });
                wijmo.setCss([this._eRHdr, this._fCt], { height: this._szClient.height });
                // adjust top of footer panel
                if (blh) {
                    ftrTop = Math.min(ftrTop, this._szClient.height + tlh - blh);
                    wijmo.setCss([this._eBL, this._eCFtr], { top: ftrTop });
                }
                // raise the event
                this.onUpdatedLayout(e);
            };
            // update the top of the header elements to remain visible 
            // when the user scrolls the window
            FlexGrid.prototype._updateStickyHeaders = function () {
                var stuck = false, offset = 0;
                // calculate offset
                if (this._stickyHdr) {
                    var maxTop = 0, thisTop = null;
                    for (var el = this.hostElement; el; el = el.parentElement) {
                        var rc = el.getBoundingClientRect();
                        if (thisTop == null) {
                            thisTop = rc.top;
                        }
                        maxTop = Math.max(maxTop, rc.top);
                    }
                    thisTop = Math.max(0, maxTop - thisTop - 1);
                    offset = -thisTop;
                    stuck = thisTop > 0;
                }
                // apply offset
                this._eTL.style.top = this._eCHdr.style.top = stuck ? (-offset + 'px') : '';
                wijmo.toggleClass(this._eTL, FlexGrid._WJS_STICKY, stuck);
                wijmo.toggleClass(this._eCHdr, FlexGrid._WJS_STICKY, stuck);
            };
            // attaches/removes handler for window scroll event depending
            // on whether we have sticky headers or doc-level virtual DOM
            FlexGrid.prototype._updateScrollHandler = function () {
                var needScrollHandler = this._stickyHdr || this._clipToScreen();
                if (needScrollHandler != this._scrollHandlerAttached) {
                    this._scrollHandlerAttached = needScrollHandler;
                    if (needScrollHandler) {
                        this.addEventListener(window, 'scroll', this._bndScroll, true);
                    }
                    else {
                        this.removeEventListener(window, 'scroll', this._bndScroll, true);
                    }
                }
            };
            // gets a value that determines whether the viewRange should be clipped
            // to the browser window (in addition to the control rect)
            /*private*/ FlexGrid.prototype._clipToScreen = function () {
                var host = this.hostElement;
                return this.rows.length > FlexGrid._MIN_VIRT_ROWS &&
                    host.parentElement == document.body &&
                    host.clientHeight == host.scrollHeight;
            };
            // handle window scroll events to update sticky headers and window clipping
            FlexGrid.prototype._scroll = function (e) {
                var _this = this;
                if (wijmo.contains(e.target, this.hostElement)) {
                    // window-level virtualization
                    if (this._clipToScreen()) {
                        if (this._afScrl) {
                            cancelAnimationFrame(this._afScrl);
                        }
                        this._afScrl = requestAnimationFrame(function () {
                            _this.finishEditing();
                            _this._updateContent(true);
                            _this._afScrl = null;
                        });
                    }
                    // sticky headers
                    if (this._stickyHdr) {
                        if (this._toSticky) {
                            cancelAnimationFrame(this._toSticky);
                        }
                        this._toSticky = requestAnimationFrame(function () {
                            var e = new wijmo.CancelEventArgs();
                            if (_this.onUpdatingLayout(e)) {
                                _this._updateStickyHeaders();
                                _this.onUpdatedLayout(e);
                            }
                            _this._toSticky = null;
                        });
                    }
                }
            };
            // updates the scrollPosition property based on the element's scroll position
            // note that IE/Chrome/FF handle scrollLeft differently under RTL:
            // - Chrome reverses direction,
            // - FF uses negative values, 
            // - IE does the right thing (nothing)
            FlexGrid.prototype._updateScrollPosition = function () {
                var root = this._root, top = root.scrollTop, left = root.scrollLeft;
                if (this.rightToLeft && FlexGrid._getRtlMode() == 'rev') {
                    left = (root.scrollWidth - root.clientWidth) - left;
                }
                var pt = new wijmo.Point(-Math.abs(left), -top);
                // save new value and raise event
                if (!this._ptScrl.equals(pt)) {
                    this._ptScrl = pt;
                    this.onScrollPositionChanged();
                    return true;
                }
                // no change...
                return false;
            };
            // updates the cell elements within this grid.
            FlexGrid.prototype._updateContent = function (recycle, state) {
                var _this = this;
                var elFocus = this.containsFocus() ? wijmo.getActiveElement() : null;
                // raise updatingView event
                var e = new wijmo.CancelEventArgs();
                if (!this.onUpdatingView(e)) {
                    return;
                }
                // calculate offset to work around IE limitations
                this._offsetY = 0;
                if (this._heightBrowser > this._szClient.height) {
                    var pct = Math.round((-this._ptScrl.y) / (this._heightBrowser - this._szClient.height) * 100) / 100;
                    this._offsetY = Math.round(this._maxOffsetY * pct);
                }
                // update scroll position and then cells (TFS 144263, 152757)
                this._updateScrollPosition();
                this._gpCells._updateContent(recycle, state, this._offsetY);
                // update visible headers
                if (this._hdrVis & HeadersVisibility.Column) {
                    if (!state || (this._ssHdr & HeadersVisibility.Column)) {
                        this._gpCHdr._updateContent(recycle, state, 0);
                    }
                }
                if (this._hdrVis & HeadersVisibility.Row) {
                    if (!state || (this._ssHdr & HeadersVisibility.Row)) {
                        this._gpRHdr._updateContent(recycle, state, this._offsetY);
                    }
                }
                if (this._hdrVis && !state) {
                    this._gpTL._updateContent(recycle, state, 0);
                }
                // update column footers
                if (this._gpCFtr.rows.length) {
                    this._gpBL._updateContent(recycle, state, 0);
                    this._gpCFtr._updateContent(recycle, state, 0);
                }
                // update marquee position
                if (this.showMarquee) {
                    var sel = this._selHdl._sel, marquee = this._eMarquee;
                    if (!this.isRangeValid(sel)) {
                        wijmo.setCss(marquee, {
                            left: 0,
                            top: 0,
                            width: 0,
                            height: 0,
                            visibility: 'collapse'
                        });
                    }
                    else {
                        var rcm = this._getMarqueeRect(sel), mc = marquee.firstChild, dx = marquee.offsetWidth - mc.offsetWidth, dy = marquee.offsetHeight - mc.offsetHeight;
                        wijmo.setCss(marquee, {
                            left: rcm.left + this.cells.hostElement.offsetLeft - dx / 2,
                            top: rcm.top + this.cells.hostElement.offsetTop - dy / 2,
                            width: rcm.width + dx,
                            height: rcm.height + dy,
                            visibility: rcm.width > 0 && rcm.height > 0 ? '' : 'collapse'
                        });
                    }
                }
                // copy frozen cells into their own container
                this._updateFrozenCells(state);
                // make sure hit-testing works
                this._rcBounds = null;
                // done updating the view
                this.onUpdatedView(e);
                // restore focus
                if (!state && elFocus) {
                    setTimeout(function () {
                        var host = _this.hostElement;
                        if (host) {
                            // give focus to elFocus if necessary and possible: TFS 236021
                            if (!_this.activeEditor && wijmo.contains(host, elFocus)) {
                                if (elFocus != wijmo.getActiveElement() && elFocus != _this._root) {
                                    elFocus.focus();
                                }
                            }
                            // can't give it to elFocus? give it to the grid
                            if (!_this.containsFocus()) {
                                _this.focus();
                            }
                        }
                    });
                }
            };
            // use a separate div for frozen cells in IE/Firefox/Mobile browsers
            // this improves perceived performance by reducing flicker 
            // when scrolling with frozen cells.
            /*private*/ FlexGrid.prototype._useFrozenDiv = function () {
                return wijmo.isIE() || wijmo.isFirefox() || wijmo.isMobile();
            };
            // copy frozen cells into their own container
            FlexGrid.prototype._updateFrozenCells = function (state) {
                if (this._useFrozenDiv()) {
                    var frozen = this._eCt.querySelectorAll('.wj-frozen');
                    if (!this.frozenRows && !this.frozenColumns) {
                        // clear frozen cells (TFS 237203)
                        wijmo.setText(this._fCt, null);
                    }
                    else {
                        // copy state without re-creating cells (TFS 221355)
                        if (state && this._fCt.children.length == frozen.length) {
                            for (var i = 0; i < frozen.length; i++) {
                                this._fCt.children[i].className = frozen[i].className;
                            }
                            return;
                        }
                        // clone frozen cells
                        wijmo.setText(this._fCt, null);
                        if (!this.activeEditor) {
                            for (var i = 0; i < frozen.length; i++) {
                                var cell = frozen[i].cloneNode(true);
                                cell.style.pointerEvents = 'auto';
                                this._fCt.appendChild(cell);
                            }
                        }
                    }
                }
            };
            // get marquee rectangle (accounting for merging, freezing, RTL)
            FlexGrid.prototype._getMarqueeRect = function (rng) {
                // get selection corner cells (accounting for merging)
                var m1 = this.getMergedRange(this.cells, rng.topRow, rng.leftCol) || new grid.CellRange(rng.topRow, rng.leftCol), m2 = this.getMergedRange(this.cells, rng.bottomRow, rng.rightCol) || new grid.CellRange(rng.bottomRow, rng.rightCol);
                // get cell client rectangles
                var rc1 = this.cells.getCellBoundingRect(m1.topRow, m1.leftCol, true), rc2 = this.cells.getCellBoundingRect(m2.bottomRow, m2.rightCol, true);
                // adjust for frozen rows
                if (this.rows.frozen) {
                    var fzr = Math.min(this.rows.length, this.rows.frozen), rcf = this.cells.getCellBoundingRect(fzr - 1, 0, true);
                    if (rng.topRow >= fzr && rc1.top < rcf.bottom) {
                        rc1.top = rcf.bottom;
                    }
                    if (rng.bottomRow >= fzr && rc2.bottom < rcf.bottom) {
                        rc2.height = rcf.bottom - rc2.top;
                    }
                }
                // adjust for frozen columns
                if (this.columns.frozen) {
                    var fzc = Math.min(this.columns.length, this.columns.frozen), rcf = this.cells.getCellBoundingRect(0, fzc - 1, true);
                    if (this.rightToLeft) {
                        if (rng.leftCol >= fzc && rc1.right > rcf.left) {
                            rc1.left = rcf.left - rc1.width;
                        }
                        if (rng.rightCol >= fzc && rc2.left > rcf.left) {
                            rc2.left = rcf.left;
                        }
                    }
                    else {
                        if (rng.leftCol >= fzc && rc1.left < rcf.right) {
                            rc1.left = rcf.right;
                        }
                        if (rng.rightCol >= fzc && rc2.right < rcf.right) {
                            rc2.width = rcf.right - rc2.left;
                        }
                    }
                }
                // return marquee rect
                return this.rightToLeft
                    ? new wijmo.Rect(rc2.left, rc1.top, rc1.right - rc2.left, rc2.bottom - rc1.top)
                    : new wijmo.Rect(rc1.left, rc1.top, rc2.right - rc1.left, rc2.bottom - rc1.top);
            };
            // bind columns
            /*protected*/ FlexGrid.prototype._bindColumns = function () {
                // remove old auto-generated columns
                for (var i = 0; i < this.columns.length; i++) {
                    var col = this.columns[i];
                    if (col._getFlag(grid.RowColFlags.AutoGenerated)) {
                        this.columns.removeAt(i);
                        i--;
                    }
                }
                // get first item to infer data types
                var cv = this.collectionView, sc = cv ? cv.sourceCollection : null, item = sc && sc.length ? sc[0] : null;
                // auto-generate new columns
                // (skipping unwanted types: array and object)
                if (item && this.autoGenerateColumns) {
                    for (var key in item) {
                        var value = null; // look for the first non-null value
                        for (var index = 0; index < sc.length && index < 1000 && value == null; index++) {
                            value = sc[index][key];
                            if (wijmo.isPrimitive(value)) {
                                col = new grid.Column();
                                col._setFlag(grid.RowColFlags.AutoGenerated, true);
                                col.binding = col.name = key;
                                col.header = wijmo.toHeaderCase(key);
                                col.dataType = wijmo.getType(value);
                                if (col.dataType == wijmo.DataType.Number) {
                                    col.width = 80;
                                }
                                var pdesc = Object.getOwnPropertyDescriptor(item, key);
                                if (pdesc && !pdesc.writable && !wijmo.isFunction(pdesc.set)) {
                                    col._setFlag(grid.RowColFlags.ReadOnly, true);
                                }
                                this.columns.push(col);
                            }
                        }
                    }
                }
                // update missing column types
                this._updateColumnTypes();
                // REVIEW: add onLoading/edColumns()?
            };
            // update missing column types to match data
            /*protected*/ FlexGrid.prototype._updateColumnTypes = function () {
                var cv = this.collectionView;
                if (wijmo.hasItems(cv)) {
                    var item = cv.items[0], cols = this.columns;
                    for (var i = 0; i < cols.length; i++) {
                        var col = cols[i];
                        if (col.dataType == null && col._binding) {
                            col.dataType = wijmo.getType(col._binding.getValue(item));
                        }
                    }
                }
            };
            // get the binding column 
            // (in the MultiRow grid, each physical column may contain several binding columns)
            /*protected*/ FlexGrid.prototype._getBindingColumn = function (p, r, c) {
                return c;
            };
            // bind rows
            /*protected*/ FlexGrid.prototype._bindRows = function () {
                // raise loading rows event
                var e = new wijmo.CancelEventArgs();
                if (!this.onLoadingRows(e)) {
                    return;
                }
                // clear rows
                this.rows.clear();
                // re-populate
                var cv = this.collectionView;
                if (cv && cv.items) {
                    var list = cv.items;
                    var groups = cv.groups;
                    // bind to hierarchical sources (childItemsPath)
                    if (this.childItemsPath) {
                        for (var i = 0; i < list.length; i++) {
                            this._addNode(list, i, 0);
                        }
                        // bind to grouped sources
                    }
                    else if (groups != null && groups.length > 0 && this.showGroups) {
                        for (var i = 0; i < groups.length; i++) {
                            this._addGroup(groups[i]);
                        }
                        // bind to regular sources
                    }
                    else {
                        for (var i = 0; i < list.length; i++) {
                            this._addBoundRow(list, i);
                        }
                    }
                }
                // done binding rows
                this.onLoadedRows(e);
            };
            /*protected*/ FlexGrid.prototype._addBoundRow = function (items, index) {
                this.rows.push(new grid.Row(items[index]));
            };
            /*protected*/ FlexGrid.prototype._addNode = function (items, index, level) {
                var gr = new grid.GroupRow(), path = this.childItemsPath, prop = wijmo.isArray(path) ? path[level] : path, item = items[index], children = item[prop];
                // add main node
                gr.dataItem = item;
                gr.level = level;
                this.rows.push(gr);
                // add child nodes
                if (wijmo.isArray(children)) {
                    for (var i = 0; i < children.length; i++) {
                        this._addNode(children, i, level + 1);
                    }
                }
            };
            FlexGrid.prototype._addGroup = function (g) {
                // add group row
                var gr = new grid.GroupRow();
                gr.level = g.level;
                gr.dataItem = g;
                this.rows.push(gr);
                // add child rows
                if (g.isBottomLevel) {
                    var items = g.items;
                    for (var i = 0; i < items.length; i++) {
                        this._addBoundRow(items, i);
                    }
                }
                else {
                    for (var i = 0; i < g.groups.length; i++) {
                        this._addGroup(g.groups[i]);
                    }
                }
            };
            // gets a list of the properties defined by a class and its ancestors
            // that have getters, setters, and whose names don't start with '_'.
            FlexGrid._getSerializableProperties = function (obj) {
                var arr = [];
                // travel up class hierarchy saving public properties that can be get/set.
                // NOTE: use getPrototypeOf instead of __proto__ for IE9 compatibility.
                for (obj = obj.prototype; obj != Object.prototype; obj = Object.getPrototypeOf(obj)) {
                    var names = Object.getOwnPropertyNames(obj);
                    for (var i = 0; i < names.length; i++) {
                        var name = names[i], pd = Object.getOwnPropertyDescriptor(obj, name);
                        if (pd && pd.set && pd.get && name[0] != '_' &&
                            !name.match(/disabled|required/)) {
                            arr.push(name);
                        }
                    }
                }
                // done
                return arr;
            };
            // method used in JSON-style initialization
            FlexGrid.prototype._copy = function (key, value) {
                if (key == 'columns') {
                    this.columns.clear();
                    var arr = wijmo.asArray(value);
                    for (var i = 0; i < arr.length; i++) {
                        var c = new grid.Column();
                        wijmo.copy(c, arr[i]);
                        this.columns.push(c);
                    }
                    return true;
                }
                return false;
            };
            // checked whether an object is an input element
            FlexGrid.prototype._isInputElement = function (e) {
                if (e instanceof HTMLElement) {
                    // contentEditable elements want the mouse as well
                    if (e.contentEditable == 'true') {
                        return true;
                    }
                    // added 'OPTION' just for Firefox SELECT elements...
                    var m = e.tagName.match(/^(BUTTON|A|INPUT|TEXTAREA|SELECT|OPTION)$/i);
                    return m && m.length > 0;
                }
                return false;
            };
            // checks whether an element should receive input without being bothered by the grid
            FlexGrid.prototype._wantsInput = function (e) {
                return !this.activeEditor &&
                    this._isInputElement(e) &&
                    !e.getAttribute('wj-part'); // REVIEW: why is this needed?
            };
            FlexGrid._getMaxSupportedCssHeight = function () {
                if (!FlexGrid._maxCssHeight) {
                    var maxHeight = 1e6, testUpTo = 60e6, div = document.createElement('div');
                    div.style.visibility = 'hidden';
                    document.body.appendChild(div);
                    for (var test = maxHeight; test <= testUpTo; test += 500000) {
                        div.style.height = test + 'px';
                        if (div.offsetHeight != test) {
                            break;
                        }
                        maxHeight = test;
                    }
                    document.body.removeChild(div);
                    FlexGrid._maxCssHeight = maxHeight;
                }
                return FlexGrid._maxCssHeight;
            };
            FlexGrid._getRtlMode = function () {
                if (!FlexGrid._rtlMode) {
                    var el = wijmo.createElement('<div dir="rtl" style="visibility:hidden;width:100px;height:100px;overflow:auto">' +
                        '<div style="width:2000px;height:2000px"></div>' +
                        '</div>');
                    document.body.appendChild(el);
                    var sl = el.scrollLeft;
                    el.scrollLeft = -1000;
                    var sln = el.scrollLeft;
                    document.body.removeChild(el);
                    FlexGrid._rtlMode = sln < 0 ? 'neg' : sl > 0 ? 'rev' : 'std';
                }
                return FlexGrid._rtlMode;
            };
            return FlexGrid;
        }(wijmo.Control));
        // constants
        FlexGrid._WJS_STICKY = 'wj-state-sticky';
        FlexGrid._WJS_MEASURE = 'wj-state-measuring';
        FlexGrid._MIN_VIRT_ROWS = 200; // min rows required for window virtualization
        /**
         * Gets or sets the template used to instantiate @see:FlexGrid controls.
         */
        FlexGrid.controlTemplate = '<div style="position:relative;width:100%;height:100%;overflow:hidden;max-width:inherit;max-height:inherit">' +
            '<div wj-part="focus" tabIndex="0" style="position:fixed;opacity:0;pointer-events:none;left:-10px;top:-10px"></div>' +
            '<div wj-part="root" tabIndex="-1" style="position:absolute;width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch;max-width:inherit;max-height:inherit;box-sizing:content-box">' +
            '<div wj-part="cells" class="wj-cells" style="position:absolute"></div>' +
            '<div wj-part="marquee" class="wj-marquee" style="display:none;pointer-events:none">' +
            '<div style="width:100%;height:100%"></div>' +
            '</div>' +
            '</div>' +
            '<div wj-part="fcells" class="wj-cells" style="position:absolute;pointer-events:none;overflow:hidden"></div>' +
            '<div wj-part="rh" style="position:absolute;overflow:hidden;outline:none">' +
            '<div wj-part="rhcells" class="wj-rowheaders" style="position:relative"></div>' +
            '</div>' +
            '<div wj-part="cf" style="position:absolute;overflow:hidden;outline:none">' +
            '<div wj-part="cfcells" class="wj-colfooters" style="position:relative"></div>' +
            '</div>' +
            '<div wj-part="ch" style="position:absolute;overflow:hidden;outline:none">' +
            '<div wj-part="chcells" class="wj-colheaders" style="position:relative"></div>' +
            '</div>' +
            '<div wj-part="bl" style="position:absolute;overflow:hidden;outline:none">' +
            '<div wj-part="blcells" class="wj-bottomleft" style="position:relative"></div>' +
            '</div>' +
            '<div wj-part="tl" style="position:absolute;overflow:hidden;outline:none">' +
            '<div wj-part="tlcells" class="wj-topleft" style="position:relative"></div>' +
            '</div>' +
            '<div wj-part="sz" style="position:relative;visibility:hidden"></div>' +
            '</div>';
        grid.FlexGrid = FlexGrid;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

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
var wijmo;
(function (wijmo) {
    var grid;
    (function (grid) {
        'use strict';
        /**
         * Provides arguments for @see:CellRange events.
         */
        var CellRangeEventArgs = (function (_super) {
            __extends(CellRangeEventArgs, _super);
            /**
             * Initializes a new instance of the @see:CellRangeEventArgs class.
             *
             * @param p @see:GridPanel that contains the range.
             * @param rng Range of cells affected by the event.
             * @param data Data related to the event.
             */
            function CellRangeEventArgs(p, rng, data) {
                var _this = _super.call(this) || this;
                _this._p = wijmo.asType(p, grid.GridPanel);
                _this._rng = wijmo.asType(rng, grid.CellRange);
                _this._data = data;
                return _this;
            }
            Object.defineProperty(CellRangeEventArgs.prototype, "panel", {
                /**
                 * Gets the @see:GridPanel affected by this event.
                 */
                get: function () {
                    return this._p;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRangeEventArgs.prototype, "range", {
                /**
                 * Gets the @see:CellRange affected by this event.
                 */
                get: function () {
                    return this._rng.clone();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRangeEventArgs.prototype, "row", {
                /**
                 * Gets the row affected by this event.
                 */
                get: function () {
                    return this._rng.row;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRangeEventArgs.prototype, "col", {
                /**
                 * Gets the column affected by this event.
                 */
                get: function () {
                    return this._rng.col;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRangeEventArgs.prototype, "data", {
                /**
                 * Gets or sets the data associated with the event.
                 */
                get: function () {
                    return this._data;
                },
                set: function (value) {
                    this._data = value;
                },
                enumerable: true,
                configurable: true
            });
            return CellRangeEventArgs;
        }(wijmo.CancelEventArgs));
        grid.CellRangeEventArgs = CellRangeEventArgs;
        /**
         * Provides arguments for the @see:FlexGrid.formatItem event.
         */
        var FormatItemEventArgs = (function (_super) {
            __extends(FormatItemEventArgs, _super);
            /**
            * Initializes a new instance of the @see:FormatItemEventArgs class.
            *
            * @param p @see:GridPanel that contains the range.
            * @param rng Range of cells affected by the event.
            * @param cell Element that represents the grid cell to be formatted.
            */
            function FormatItemEventArgs(p, rng, cell) {
                var _this = _super.call(this, p, rng) || this;
                _this._cell = wijmo.asType(cell, HTMLElement);
                return _this;
            }
            Object.defineProperty(FormatItemEventArgs.prototype, "cell", {
                /**
                 * Gets a reference to the element that represents the grid cell to be formatted.
                 */
                get: function () {
                    return this._cell;
                },
                enumerable: true,
                configurable: true
            });
            return FormatItemEventArgs;
        }(CellRangeEventArgs));
        grid.FormatItemEventArgs = FormatItemEventArgs;
        /**
         * Provides arguments for the @see:FlexGrid.cellEditEnding event.
         */
        var CellEditEndingEventArgs = (function (_super) {
            __extends(CellEditEndingEventArgs, _super);
            function CellEditEndingEventArgs() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(CellEditEndingEventArgs.prototype, "stayInEditMode", {
                /**
                 * Gets or sets whether the cell should remain in edit mode instead
                 * of finishing the edits.
                 */
                get: function () {
                    return this._stayInEditMode;
                },
                set: function (value) {
                    this._stayInEditMode = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });
            return CellEditEndingEventArgs;
        }(CellRangeEventArgs));
        grid.CellEditEndingEventArgs = CellEditEndingEventArgs;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

var wijmo;
(function (wijmo) {
    var grid;
    (function (grid) {
        'use strict';
        /**
         * Specifies constants that define the type of cell in a @see:GridPanel.
         */
        var CellType;
        (function (CellType) {
            /** Unknown or invalid cell type. */
            CellType[CellType["None"] = 0] = "None";
            /** Regular data cell. */
            CellType[CellType["Cell"] = 1] = "Cell";
            /** Column header cell. */
            CellType[CellType["ColumnHeader"] = 2] = "ColumnHeader";
            /** Row header cell. */
            CellType[CellType["RowHeader"] = 3] = "RowHeader";
            /** Top-left cell. */
            CellType[CellType["TopLeft"] = 4] = "TopLeft";
            /** Column footer cell. */
            CellType[CellType["ColumnFooter"] = 5] = "ColumnFooter";
            /** Bottom left cell (at the intersection of the row header and column footer cells). **/
            CellType[CellType["BottomLeft"] = 6] = "BottomLeft";
        })(CellType = grid.CellType || (grid.CellType = {}));
        /**
         * Represents a logical part of the grid, such as the column headers, row headers,
         * and scrollable data part.
         */
        var GridPanel = (function () {
            /**
             * Initializes a new instance of the @see:GridPanel class.
             *
             * @param g The @see:FlexGrid object that owns the panel.
             * @param cellType The type of cell in the panel.
             * @param rows The rows displayed in the panel.
             * @param cols The columns displayed in the panel.
             * @param element The HTMLElement that hosts the cells in the control.
             */
            function GridPanel(g, cellType, rows, cols, element) {
                this._offsetY = 0;
                this._g = wijmo.asType(g, grid.FlexGrid);
                this._ct = wijmo.asInt(cellType);
                this._rows = wijmo.asType(rows, grid.RowCollection);
                this._cols = wijmo.asType(cols, grid.ColumnCollection);
                this._e = wijmo.asType(element, HTMLElement);
                this._vrb = new grid.CellRange();
                // dispatch blur event for focused cells before recycling the panel
                if (!GridPanel._evtBlur) {
                    GridPanel._evtBlur = document.createEvent('HTMLEvents');
                    GridPanel._evtBlur.initEvent('blur', true, false);
                }
            }
            Object.defineProperty(GridPanel.prototype, "grid", {
                /**
                 * Gets the grid that owns the panel.
                 */
                get: function () {
                    return this._g;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridPanel.prototype, "cellType", {
                /**
                 * Gets the type of cell contained in the panel.
                 */
                get: function () {
                    return this._ct;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridPanel.prototype, "viewRange", {
                /**
                 * Gets a @see:CellRange that indicates the range of cells currently visible on the panel.
                 */
                get: function () {
                    return this._getViewRange();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridPanel.prototype, "width", {
                /**
                 * Gets the total width of the content in the panel.
                 */
                get: function () {
                    return this._cols.getTotalSize();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridPanel.prototype, "height", {
                /**
                 * Gets the total height of the content in this panel.
                 */
                get: function () {
                    return this._rows.getTotalSize();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridPanel.prototype, "rows", {
                /**
                 * Gets the panel's row collection.
                 */
                get: function () {
                    return this._rows;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridPanel.prototype, "columns", {
                /**
                 * Gets the panel's column collection.
                 */
                get: function () {
                    return this._cols;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Gets the value stored in a cell in the panel.
             *
             * @param r The row index of the cell.
             * @param c The index, name, or binding of the column that contains the cell.
             * @param formatted Whether to format the value for display.
             */
            GridPanel.prototype.getCellData = function (r, c, formatted) {
                var row = this._rows[wijmo.asNumber(r, false, true)], col, value = null;
                // get column index by name or binding
                if (wijmo.isString(c)) {
                    c = this._cols.indexOf(c);
                    if (c < 0) {
                        throw 'Invalid column name or binding.';
                    }
                }
                // get column
                col = this._cols[wijmo.asNumber(c, false, true)];
                // get binding column (MultiRow grid may have multiple display columns for each physical column)
                var bcol = this._g ? this._g._getBindingColumn(this, r, col) : col;
                // get bound value from data item using binding
                if (bcol.binding && row.dataItem &&
                    !(row.dataItem instanceof wijmo.collections.CollectionViewGroup)) {
                    value = bcol._binding.getValue(row.dataItem);
                }
                else if (row._ubv) {
                    value = row._ubv[col._hash];
                }
                // special values for row and column headers, aggregates
                if (value == null) {
                    switch (this._ct) {
                        case CellType.ColumnHeader:
                            if (r == this._rows.length - 1 || bcol != col) {
                                value = bcol.header;
                            }
                            break;
                        case CellType.ColumnFooter:
                            if (bcol.aggregate != wijmo.Aggregate.None && row instanceof grid.GroupRow) {
                                var icv = this._g.collectionView;
                                if (icv) {
                                    var cv = wijmo.tryCast(icv, wijmo.collections.CollectionView);
                                    value = cv
                                        ? cv.getAggregate(bcol.aggregate, bcol.binding)
                                        : wijmo.getAggregate(bcol.aggregate, icv.items, bcol.binding);
                                }
                            }
                            break;
                        case CellType.Cell:
                            if (bcol.aggregate != wijmo.Aggregate.None && row instanceof grid.GroupRow) {
                                var group = wijmo.tryCast(row.dataItem, wijmo.collections.CollectionViewGroup);
                                if (group) {
                                    value = group.getAggregate(bcol.aggregate, bcol.binding, this._g.collectionView);
                                }
                            }
                            break;
                    }
                }
                // format value if requested, never return null
                if (formatted) {
                    if (this.cellType == CellType.Cell && bcol.dataMap) {
                        value = bcol.dataMap.getDisplayValue(value);
                    }
                    value = value != null ? wijmo.Globalize.format(value, bcol.format) : '';
                }
                // done
                return value;
            };
            /**
             * Sets the content of a cell in the panel.
             *
             * @param r The index of the row that contains the cell.
             * @param c The index, name, or binding of the column that contains the cell.
             * @param value The value to store in the cell.
             * @param coerce Whether to change the value automatically to match the column's data type.
             * @param invalidate Whether to invalidate the grid to show the change.
             * @return Returns true if the value is stored successfully, false otherwise (failed cast).
             */
            GridPanel.prototype.setCellData = function (r, c, value, coerce, invalidate) {
                if (coerce === void 0) { coerce = true; }
                if (invalidate === void 0) { invalidate = true; }
                var row = this._rows[wijmo.asNumber(r, false, true)], col;
                // get column index by name or binding
                if (wijmo.isString(c)) {
                    c = this._cols.indexOf(c);
                    if (c < 0) {
                        throw 'Invalid column name or binding.';
                    }
                }
                // get column
                col = this._cols[wijmo.asNumber(c, false, true)];
                // get binding column (MultiRow grid may have multiple display columns for each physical column)
                var bcol = this._g ? this._g._getBindingColumn(this, r, col) : col;
                // handle dataMap, coercion, type-checking
                if (this._ct == CellType.Cell) {
                    // honor dataMap
                    if (bcol.dataMap && value != null) {
                        if (bcol.isRequired || (value !== '' && value != null)) {
                            var map = bcol.dataMap, key = map.getKeyValue(value);
                            if (key == null) {
                                if (!map.isEditable || map.displayMemberPath != map.selectedValuePath) {
                                    return false; // not on map, not editable? cancel edits
                                }
                            }
                            else {
                                value = key; // got the key, use it instead of the value
                            }
                        }
                    }
                    // get target type
                    var targetType = wijmo.DataType.Object;
                    if (bcol.dataType) {
                        targetType = bcol.dataType;
                    }
                    else {
                        var current = this.getCellData(r, c, false);
                        targetType = wijmo.getType(current);
                    }
                    // honor 'isRequired' property
                    if (wijmo.isBoolean(bcol.isRequired)) {
                        if (!bcol.isRequired && (value === '' || value === null)) {
                            value = null; // setting to null
                            coerce = false;
                        }
                        else if (bcol.isRequired && (value === '' || value === null)) {
                            return false; // value is required
                        }
                    }
                    // coerce type if required
                    if (coerce) {
                        value = wijmo.changeType(value, targetType, bcol.format);
                        if (targetType != wijmo.DataType.Object && wijmo.getType(value) != targetType) {
                            return false; // wrong data type
                        }
                    }
                }
                // store value
                if (row.dataItem && bcol.binding) {
                    var binding = bcol._binding, item = row.dataItem, oldValue = binding.getValue(item);
                    if (value !== oldValue && !wijmo.DateTime.equals(value, oldValue)) {
                        // set the value
                        binding.setValue(item, value);
                        // track changes in CollectionView if this is not the current edit item (e.g. when pasting)
                        var view = this._g.collectionView;
                        if (view instanceof wijmo.collections.CollectionView && item != view.currentEditItem) {
                            var e = new wijmo.collections.NotifyCollectionChangedEventArgs(wijmo.collections.NotifyCollectionChangedAction.Change, item, view.items.indexOf(item));
                            view.onCollectionChanged(e);
                        }
                    }
                }
                else {
                    if (!row._ubv)
                        row._ubv = {};
                    row._ubv[col._hash] = value;
                }
                // invalidate
                if (invalidate && this._g) {
                    this._g.invalidate();
                }
                // done
                return true;
            };
            /**
             * Gets a cell's bounds in viewport coordinates.
             *
             * The returned value is a @see:Rect object which contains the position and dimensions
             * of the cell in viewport coordinates.
             * The viewport coordinates are the same as those used by the
             * <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect"
             * target="_blank">getBoundingClientRect</a> method.
             *
             * @param r The index of the row that contains the cell.
             * @param c The index of the column that contains the cell.
             * @param raw Whether to return the rectangle in raw panel coordinates as opposed to viewport coordinates.
             */
            GridPanel.prototype.getCellBoundingRect = function (r, c, raw) {
                // get rect in panel coordinates
                var row = this.rows[r], col = this.columns[c], rc = new wijmo.Rect(col.pos, row.pos, col.renderSize, row.renderSize);
                // adjust for rtl
                if (this._g.rightToLeft) {
                    rc.left = this.hostElement.clientWidth - rc.right;
                    // account for scrollbars (in Chrome only: TFS 240091)
                    if (!wijmo.isIE() && !wijmo.isFirefox()) {
                        var root = this.hostElement.parentElement;
                        rc.left -= root.offsetWidth - root.clientWidth;
                    }
                }
                // adjust for panel position
                if (!raw) {
                    var rcp = this.hostElement.getBoundingClientRect();
                    rc.left += rcp.left;
                    rc.top += rcp.top - this._offsetY;
                }
                // account for frozen rows/columns (TFS 105593)
                if (r < this.rows.frozen) {
                    rc.top -= this._g.scrollPosition.y;
                }
                if (c < this.columns.frozen) {
                    rc.left -= this._g.scrollPosition.x * (this._g.rightToLeft ? -1 : +1);
                }
                // done
                return rc;
            };
            /**
             * Gets the element that represents a cell within this @see:GridPanel.
             *
             * If the cell is not currently in view, this method returns null.
             *
             * @param r The index of the row that contains the cell.
             * @param c The index of the column that contains the cell.
             */
            GridPanel.prototype.getCellElement = function (r, c) {
                // get the element
                var rc = this.getCellBoundingRect(r, c), cell = document.elementFromPoint(rc.left + rc.width / 2, rc.top + rc.height / 2);
                // travel up to the cell
                if (cell) {
                    while (cell && !wijmo.hasClass(cell, 'wj-cell')) {
                        cell = cell.parentElement;
                    }
                }
                // done
                return cell;
            };
            /**
             * Gets a @see:SelectedState value that indicates the selected state of a cell.
             *
             * @param r Row index of the cell to inspect.
             * @param c Column index of the cell to inspect.
             * @param rng @see:CellRange that contains the cell to inspect.
             */
            GridPanel.prototype.getSelectedState = function (r, c, rng) {
                var g = this._g, mode = g.selectionMode, sel = g._selHdl._sel;
                if (mode != grid.SelectionMode.None) {
                    switch (this._ct) {
                        // regular cells
                        case CellType.Cell:
                            // handle merged ranges
                            if (!rng) {
                                rng = g.getMergedRange(this, r, c);
                            }
                            if (rng) {
                                if (rng.contains(sel.row, sel.col)) {
                                    return g.showMarquee ? grid.SelectedState.None : grid.SelectedState.Cursor;
                                }
                                else if (rng.intersects(sel)) {
                                    return grid.SelectedState.Selected;
                                }
                            }
                            // cursor (if not showing marquee)
                            if (sel.row == r && sel.col == c) {
                                return g.showMarquee ? grid.SelectedState.None : grid.SelectedState.Cursor;
                            }
                            // special case: row/col selected property
                            if (g.rows[r].isSelected || g.columns[c].isSelected) {
                                return grid.SelectedState.Selected;
                            }
                            // adjust for selection mode
                            sel = g._selHdl._adjustSelection(sel);
                            // ListBox mode (already checked for selected rows/cols)
                            if (mode == grid.SelectionMode.ListBox) {
                                return grid.SelectedState.None;
                            }
                            // regular ranges
                            return sel.containsRow(r) && sel.containsColumn(c)
                                ? grid.SelectedState.Selected
                                : grid.SelectedState.None;
                        // column headers
                        case CellType.ColumnHeader:
                            if (g.showSelectedHeaders & grid.HeadersVisibility.Column) {
                                if (g.columns[c].isSelected || sel.containsColumn(c) || sel.intersectsColumn(rng)) {
                                    if (rng)
                                        r = rng.bottomRow;
                                    if (r == this.rows.length - 1) {
                                        return grid.SelectedState.Selected;
                                    }
                                }
                            }
                            break;
                        // row headers
                        case CellType.RowHeader:
                            if (g.showSelectedHeaders & grid.HeadersVisibility.Row) {
                                if (g.rows[r].isSelected || sel.containsRow(r) || sel.intersectsRow(rng)) {
                                    if (rng)
                                        c = rng.rightCol;
                                    if (c == this.columns.length - 1) {
                                        return grid.SelectedState.Selected;
                                    }
                                }
                            }
                            break;
                    }
                }
                // not selected
                return grid.SelectedState.None;
            };
            Object.defineProperty(GridPanel.prototype, "hostElement", {
                /**
                 * Gets the host element for the panel.
                 */
                get: function () {
                    return this._e;
                },
                enumerable: true,
                configurable: true
            });
            // ** implementation
            /* -- do not document, this is internal --
             * Gets the Y offset for cells in the panel.
             */
            GridPanel.prototype._getOffsetY = function () {
                return this._offsetY;
            };
            /* -- do not document, this is internal --
             * Updates the cell elements in the panel.
             * @param recycle Whether to recycle existing elements or start from scratch.
             * @param state Whether to keep existing elements and update their state.
             * @param offsetY Scroll position to use when updating the panel.
             */
            GridPanel.prototype._updateContent = function (recycle, state, offsetY) {
                var r, c, ctr, cell, g = this._g, rows = this._rows, cols = this._cols, ct = this._ct;
                // scroll headers into position
                if (ct == CellType.ColumnHeader || ct == CellType.ColumnFooter || ct == CellType.RowHeader) {
                    var sp = g._ptScrl, s = this._e.style;
                    if (ct == CellType.RowHeader) {
                        s.top = sp.y + 'px';
                    }
                    else {
                        if (g.rightToLeft) {
                            s.right = sp.x + 'px';
                        }
                        else {
                            s.left = sp.x + 'px';
                        }
                    }
                }
                // update offset (and don't recycle if it changed!)
                if (this._offsetY != offsetY) {
                    recycle = false;
                    this._offsetY = offsetY;
                }
                // calculate new unbuffered view range
                var vru = this._getViewRange();
                // calculate new buffered view range
                var vrb;
                if (rows.length <= g._virtualizationThreshold) {
                    vrb = new grid.CellRange(0, 0, rows.length - 1, cols.length - 1);
                }
                else {
                    vrb = vru.clone();
                    if (vrb.isValid && g.isTouching) {
                        var sz = 6;
                        vrb.row = Math.max(vru.row - sz, rows.frozen);
                        vrb.row2 = Math.min(vru.row2 + sz, rows.length - 1);
                        vrb.col = Math.max(vru.col - 1, cols.frozen);
                        vrb.col2 = Math.min(vru.col2 + 1, cols.length - 1);
                    }
                }
                // done if recycling, not updating state, and old range contains new (unbuffered)
                // this happens a lot while scrolling by small amounts (< 1 cell)
                if (recycle && !state && this._vrb.contains(vru) && !rows.frozen && !cols.frozen) {
                    return;
                }
                // if not recycling or if the range changed, can't just update state
                if (!recycle || !vrb.equals(this._vrb)) {
                    state = false;
                }
                // clear content if not recycling
                if (!recycle) {
                    var ae = wijmo.getActiveElement(), eFocus = wijmo.contains(this._e, ae) ? ae : null, cf = this._g.cellFactory;
                    // give cell factory a chance to dispose of the cells
                    for (var i = 0; i < this._e.childElementCount; i++) {
                        cf.disposeCell(this._e.children[i]);
                    }
                    // clear content
                    wijmo.setText(this._e, null);
                    // update focus state in case the editor was disposed
                    if (eFocus) {
                        eFocus.dispatchEvent(GridPanel._evtBlur);
                    }
                    // clear row indices
                    this._rowIdx = [];
                }
                // reorder cells to optimize scrolling (headers too)
                if (recycle && this._ct != CellType.TopLeft) {
                    this._reorderCells(vrb, this._vrb);
                }
                // save new ranges
                this._vru = vru;
                this._vrb = vrb;
                // go create/update the cells
                // (render frozen cells last so we don't need z-index!)
                ctr = 0;
                this._rowIdx = [];
                for (r = vrb.topRow; r <= vrb.bottomRow && r > -1; r++) {
                    this._rowIdx.push(ctr);
                    ctr = this._renderRow(r, vrb, false, state, ctr);
                }
                this._rowIdx.push(ctr); // one past last cell
                for (r = vrb.topRow; r <= vrb.bottomRow && r > -1; r++) {
                    ctr = this._renderRow(r, vrb, true, state, ctr);
                }
                for (r = 0; r < rows.frozen && r < rows.length; r++) {
                    ctr = this._renderRow(r, vrb, false, state, ctr);
                }
                for (r = 0; r < rows.frozen && r < rows.length; r++) {
                    ctr = this._renderRow(r, vrb, true, state, ctr);
                }
                // show the cells we are using, hide the others
                var cnt = this._e.childElementCount;
                for (var i = ctr; i < cnt; i++) {
                    cell = this._e.children[i];
                    cell.style.display = 'none';
                }
            };
            // reorder cells within the panel to optimize scrolling performance
            GridPanel.prototype._reorderCells = function (rngNew, rngOld) {
                // sanity
                if (!this._rowIdx || this._rows.frozen > 0 || this._cols.frozen > 0 ||
                    rngNew.columnSpan != rngOld.columnSpan || rngNew.rowSpan != rngOld.rowSpan ||
                    !rngOld.isValid || !rngNew.isValid || !rngNew.intersects(rngOld)) {
                    return;
                }
                // vertical scrolling
                if (rngNew.row != rngOld.row) {
                    var delta = rngNew.row - rngOld.row, limit = Math.max(1, rngNew.rowSpan - 1);
                    if (delta != 0 && Math.abs(delta) < limit) {
                        // down:
                        // remove cells from the top and append to bottom
                        if (delta > 0) {
                            var rng = this._createRange(0, this._rowIdx[delta]);
                            this._e.appendChild(rng.extractContents());
                        }
                        // up:
                        // remove cells from the bottom and insert at the top
                        if (delta < 0) {
                            var last = this._rowIdx.length - 1, rng = this._createRange(this._rowIdx[last + delta], this._rowIdx[last]);
                            this._e.insertBefore(rng.extractContents(), this._e.firstChild);
                        }
                    }
                }
                // horizontal scrolling
                if (rngNew.col != rngOld.col) {
                    var delta = rngNew.col - rngOld.col, limit = Math.max(1, rngNew.columnSpan - 1);
                    if (delta != 0 && Math.abs(delta) < limit) {
                        // scan each row in the view and move the elements within
                        var cnt = this._e.childElementCount;
                        for (var i = 0; i < this._rowIdx.length - 1; i++) {
                            var row = this.rows[rngNew.topRow + i], start = this._rowIdx[i], end = this._rowIdx[i + 1];
                            if (!(row instanceof grid.GroupRow) && end > start) {
                                // right:
                                // move first 'delta' elements to the end of the row range
                                if (delta > 0 && start + delta <= cnt) {
                                    var rng = this._createRange(start, start + delta);
                                    this._e.insertBefore(rng.extractContents(), this._e.children[end]);
                                }
                                // left:
                                // move last 'delta' elements to the start of the row range
                                if (delta < 0 && end + delta - 1 >= 0) {
                                    var rng = this._createRange(end + delta - 1, end - 1);
                                    this._e.insertBefore(rng.extractContents(), this._e.children[start]);
                                }
                            }
                        }
                    }
                }
            };
            // creates a range of cells that can be moved to optimize rendering
            GridPanel.prototype._createRange = function (start, end) {
                var rng = document.createRange();
                rng.setStart(this._e, start);
                rng.setEnd(this._e, end);
                return rng;
            };
            // renders a row
            GridPanel.prototype._renderRow = function (r, rng, frozen, state, ctr) {
                // skip hidden rows
                if (this.rows[r].renderSize <= 0) {
                    return ctr;
                }
                // render each cell in the row
                if (frozen) {
                    for (var c = 0; c < this.columns.frozen && c < this.columns.length; c++) {
                        ctr = this._renderCell(r, c, rng, state, ctr);
                    }
                }
                else {
                    for (var c = rng.leftCol; c <= rng.rightCol && c > -1; c++) {
                        ctr = this._renderCell(r, c, rng, state, ctr);
                    }
                }
                // return updated counter
                return ctr;
            };
            // renders a cell
            GridPanel.prototype._renderCell = function (r, c, rng, state, ctr) {
                // skip over cells that have been merged over
                var g = this._g, mrng = g.getMergedRange(this, r, c);
                if (mrng) {
                    for (var over = Math.max(rng.row, mrng.row); over < r; over++) {
                        if (this.rows[over].isVisible)
                            return ctr;
                    }
                    for (var over = Math.max(rng.col, mrng.col); over < c; over++) {
                        if (this.columns[over].isVisible)
                            return ctr;
                    }
                }
                // skip hidden and non-merged columns
                if (this.columns[c].renderSize <= 0) {
                    if (!mrng || mrng.getRenderSize(this).width <= 0) {
                        return ctr;
                    }
                }
                // try recycling a cell
                var cell = this._e.childNodes[ctr++];
                // update selected state
                if (cell && state) {
                    var selState = this.getSelectedState(r, c, mrng);
                    wijmo.toggleClass(cell, 'wj-state-selected', selState == grid.SelectedState.Cursor);
                    wijmo.toggleClass(cell, 'wj-state-multi-selected', selState == grid.SelectedState.Selected);
                    return ctr;
                }
                // create or recycle cell
                if (!cell) {
                    cell = document.createElement('div');
                    cell.tabIndex = 0; // TFS 230246
                    this._e.appendChild(cell);
                }
                // set/update cell content/style
                g.cellFactory.updateCell(this, r, c, cell, mrng);
                // return updated counter
                return ctr;
            };
            // gets the range of cells currently visible
            GridPanel.prototype._getViewRange = function () {
                var g = this._g, sp = g._ptScrl, rows = this._rows, cols = this._cols, rng = new grid.CellRange(0, 0, rows.length - 1, cols.length - 1);
                // calculate row range
                if (this._ct == CellType.Cell || this._ct == CellType.RowHeader) {
                    var y = -sp.y + this._offsetY, h = g._szClient.height, fz = Math.min(rows.frozen, rows.length - 1);
                    // account for frozen rows
                    if (fz > 0) {
                        var fzs = rows[fz - 1].pos;
                        y += fzs;
                        h -= fzs;
                    }
                    // set row range
                    rng.row = Math.min(rows.length - 1, Math.max(rows.frozen, rows.getItemAt(y + 1)));
                    rng.row2 = rows.getItemAt(y + h);
                    // clip to screen (in case user didn't limit the grid height)
                    if (g._clipToScreen()) {
                        var rc = g.hostElement.getBoundingClientRect();
                        if (rc.top < 0) {
                            rng.row = Math.max(rng.row, rows.getItemAt(-rc.top) - 1);
                            //console.log('top row => ' + rng.row);
                        }
                        if (rc.bottom > innerHeight) {
                            rng.row2 = Math.min(rng.row2, rows.getItemAt(-rc.top + innerHeight) + 1);
                            //console.log('bot row => ' + rng.row2);
                        }
                    }
                }
                // calculate column range
                if (this._ct == CellType.Cell || this._ct == CellType.ColumnHeader) {
                    var x = -sp.x, w = g._szClient.width, fz = Math.min(cols.frozen, cols.length - 1);
                    // account for frozen columns
                    if (fz > 0) {
                        var fzs = cols[fz - 1].pos;
                        x += fzs;
                        w -= fzs;
                    }
                    // set column range
                    rng.col = Math.min(cols.length - 1, Math.max(cols.frozen, cols.getItemAt(x + 1)));
                    rng.col2 = cols.getItemAt(x + w);
                }
                // handle case where all rows/cols are frozen
                if (rows.length <= rows.frozen) {
                    rng.row = rng.row2 = -1;
                }
                if (cols.length <= cols.frozen) {
                    rng.col = rng.col2 = -1;
                }
                // return the viewRange
                return rng;
            };
            // gets the point where the frozen area ends
            GridPanel.prototype._getFrozenPos = function () {
                var fzr = this._rows.frozen, fzc = this._cols.frozen, fzrow = fzr > 0 ? this._rows[fzr - 1] : null, fzcol = fzc > 0 ? this._cols[fzc - 1] : null, fzy = fzrow ? fzrow.pos + fzrow.renderSize : 0, fzx = fzcol ? fzcol.pos + fzcol.renderSize : 0;
                return new wijmo.Point(fzx, fzy);
            };
            return GridPanel;
        }());
        grid.GridPanel = GridPanel;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

var wijmo;
(function (wijmo) {
    var grid;
    (function (grid) {
        'use strict';
        /**
         * Creates HTML elements that represent cells within a @see:FlexGrid control.
         */
        var CellFactory = (function () {
            function CellFactory() {
            }
            /**
             * Creates or updates a cell in the grid.
             *
             * @param p The @see:GridPanel that contains the cell.
             * @param r The index of the row that contains the cell.
             * @param c The index of the column that contains the cell.
             * @param cell The element that represents the cell.
             * @param rng The @see:CellRange object that contains the cell's
             * merged range, or null if the cell is not merged.
             * @param updateContent Whether to update the cell's content as
             * well as its position and style.
             */
            CellFactory.prototype.updateCell = function (p, r, c, cell, rng, updateContent) {
                var g = p.grid, rtl = g.rightToLeft, ct = p.cellType, rows = p.rows, cols = p.columns, row = rows[r], col = cols[c], r2 = r, c2 = c, gr = (row instanceof grid.GroupRow ? row : null), nr = (row instanceof grid._NewRowTemplate ? row : null), cellWidth = col.renderWidth, cellHeight = row.renderHeight, cl = 'wj-cell', css = { display: '' }, canSkip = (updateContent != false); // don't skip if not updating content
                // clear cells that have child elements before re-using them
                // this is a workaround for a bug in IE that affects templates
                // strangely, setting the cell's innerHTML to '' doesn't help...
                if (updateContent != false && cell.firstElementChild) {
                    if (cell.childNodes.length != 1 || cell.firstElementChild.type != 'checkbox') {
                        wijmo.setText(cell, null);
                        canSkip = false;
                    }
                }
                // adjust for merged ranges
                if (rng && !rng.isSingleCell) {
                    r = rng.row;
                    c = rng.col;
                    r2 = rng.row2;
                    c2 = rng.col2;
                    row = rows[r];
                    col = cols[c];
                    gr = wijmo.tryCast(row, grid.GroupRow);
                    var sz = rng.getRenderSize(p);
                    cellHeight = sz.height;
                    cellWidth = sz.width;
                }
                // get column to use for binding (usually the same as col, but not on MultiRow)
                var bcol = g._getBindingColumn(p, r, col);
                // use checkboxes if the dataType is Boolean and there's no dataMap
                var checkBox = bcol.dataType == wijmo.DataType.Boolean && !bcol.dataMap;
                // get cell position accounting for frozen rows/columns
                // in non-Chrome browsers, frozen cells: will be moved to a fixed div, 
                // so adjust the scroll position for that
                // in Chrome, they will remain in the cells div, so adjust for that instead
                // (not when editing...)
                var cpos = col.pos, rpos = row.pos;
                if (g._useFrozenDiv() && ct == grid.CellType.Cell && !g.editRange) {
                    if (r < rows.frozen && c >= cols.frozen) {
                        cpos += g._ptScrl.x;
                    }
                    if (c < cols.frozen && r >= rows.frozen) {
                        rpos += g._ptScrl.y;
                    }
                }
                else {
                    if (r < rows.frozen) {
                        rpos -= g._ptScrl.y;
                    }
                    if (c < cols.frozen) {
                        cpos -= g._ptScrl.x;
                    }
                }
                // can't skip frozen cells in any panels: TFS 221836
                if (r < rows.frozen || c < cols.frozen) {
                    canSkip = false;
                }
                // size and position
                if (rtl) {
                    css.right = cpos + 'px';
                }
                else {
                    css.left = cpos + 'px';
                }
                css.top = (rpos - p._getOffsetY()) + 'px';
                css.width = cellWidth + 'px';
                css.height = cellHeight + 'px';
                // selector classes that only apply to regular cells
                if (ct == grid.CellType.Cell) {
                    if (gr) {
                        cl += ' wj-group';
                    }
                    if (g.showAlternatingRows && r % 2 != 0) {
                        if (!rng || (rng.row == rng.row2)) {
                            cl += ' wj-alt';
                        }
                    }
                    if (r < rows.frozen || c < cols.frozen) {
                        cl += ' wj-frozen';
                    }
                    if (nr) {
                        cl += ' wj-new';
                    }
                    if (row.cssClass) {
                        cl += ' ' + row.cssClass;
                    }
                    if (bcol.cssClass) {
                        cl += ' ' + bcol.cssClass;
                    }
                }
                else {
                    cl += ' wj-header';
                    if (g.showAlternatingRows && r % 2 != 0) {
                        cl += ' wj-header-alt';
                    }
                }
                // errors
                var view = g.collectionView;
                if (view && g.showErrors && row.dataItem) {
                    if (ct == grid.CellType.Cell) {
                        var getError = view['getError'];
                        if (wijmo.isFunction(getError)) {
                            cell.title = '';
                            var error = getError(row.dataItem, bcol.binding);
                            if (error) {
                                cl += ' wj-state-invalid';
                                cell.title = error;
                            }
                        }
                    }
                    else if (ct == grid.CellType.RowHeader) {
                        var getError = view['getError'];
                        if (wijmo.isFunction(getError)) {
                            for (var i = 0; i < g.columns.length; i++) {
                                var bce = g._getBindingColumn(p, r, g.columns[i]);
                                if (getError(row.dataItem, bce.binding)) {
                                    cl += ' wj-state-invalid';
                                    break;
                                }
                            }
                        }
                    }
                }
                // selected state
                var selState = p.getSelectedState(r, c, rng);
                if (selState != grid.SelectedState.None &&
                    ct == grid.CellType.Cell && !checkBox &&
                    g.editRange && g.editRange.contains(r, c)) {
                    selState = grid.SelectedState.None;
                }
                switch (selState) {
                    case grid.SelectedState.Cursor:
                        cl += ' wj-state-selected';
                        break;
                    case grid.SelectedState.Selected:
                        cl += ' wj-state-multi-selected';
                        break;
                }
                // frozen area boundary
                if (r2 == rows.frozen - 1) {
                    cl += ' wj-frozen-row';
                }
                if (c2 == cols.frozen - 1) {
                    cl += ' wj-frozen-col';
                }
                // word-wrapping
                if (bcol.wordWrap || row.wordWrap) {
                    cl += ' wj-wrap';
                }
                // optimization: skip cell update if possible
                if (canSkip && cl == cell.className) {
                    var s = cell.style;
                    if (s.top == css.top && s.width == css.width && s.height == css.height) {
                        if ((rtl && s.right == css.right) ||
                            (!rtl && s.left == css.left)) {
                            if (s.display) {
                                s.display = '';
                            }
                            return;
                        }
                    }
                }
                // alignment
                css.textAlign = bcol.getAlignment();
                // TODO: vertical alignment?
                // group row indentation
                if (ct == grid.CellType.Cell) {
                    if (g.rows.maxGroupLevel > -1) {
                        css.paddingLeft = css.paddingRight = '';
                        if (c == g.columns.firstVisibleIndex && g.treeIndent) {
                            var level = gr ? Math.max(0, gr.level) : (g.rows.maxGroupLevel + 1), indent = g.treeIndent * level + g._cellPadding;
                            if (rtl) {
                                css.paddingRight = indent + 'px';
                            }
                            else {
                                css.paddingLeft = indent + 'px';
                            }
                        }
                    }
                }
                // cell content
                if (updateContent != false) {
                    var data = p.getCellData(r, c, false), content = p.getCellData(r, c, true);
                    if (ct == grid.CellType.Cell && c == g.columns.firstVisibleIndex &&
                        gr && gr.hasChildren && !this._isEditingCell(g, r, c)) {
                        // collapse/expand outline
                        if (!content) {
                            content = gr.getGroupHeader();
                        }
                        cell.innerHTML = this._getTreeIcon(gr) + ' ' + content;
                        css.textAlign = '';
                    }
                    else if (ct == grid.CellType.ColumnHeader && bcol.currentSort && g.showSort && (r2 == g._getSortRowIndex() || bcol != col)) {
                        // add sort class names to allow easier customization
                        cl += ' wj-sort-' + (bcol.currentSort == '+' ? 'asc' : 'desc');
                        // column header with sort sign
                        cell.innerHTML = wijmo.escapeHtml(content) + '&nbsp;' + this._getSortIcon(bcol);
                    }
                    else if (ct == grid.CellType.RowHeader && c == g.rowHeaders.columns.length - 1 && !content) {
                        // edit/new item template indicators
                        // (using glyphs for extra CSS control)
                        var ecv = g.collectionView, editItem = ecv ? ecv.currentEditItem : null;
                        if (editItem && row.dataItem == editItem) {
                            //content = '\u270E'; // pencil icon indicates item being edited
                            cell.innerHTML = '<span class="wj-glyph-pencil"></span>';
                        }
                        else if (wijmo.tryCast(row, grid._NewRowTemplate)) {
                            //content = '*'; // asterisk indicates new row template
                            cell.innerHTML = '<span class="wj-glyph-asterisk"></span>';
                        }
                        //setText(cell, content);
                    }
                    else if (ct == grid.CellType.Cell &&
                        bcol.dataType == wijmo.DataType.Boolean && !bcol.dataMap &&
                        (!gr || wijmo.isBoolean(data))) {
                        // re-use/create checkbox
                        // (re-using allows selecting and checking/unchecking with a single click)
                        var chk = cell.firstChild;
                        if (!(chk instanceof HTMLInputElement) || chk.type != 'checkbox') {
                            cell.innerHTML = '<input type="checkbox" class="wj-cell-check"/>';
                            chk = cell.firstChild;
                        }
                        // initialize/update checkbox value
                        chk.checked = data == true ? true : false;
                        chk.indeterminate = data == null;
                        // disable checkbox if it is not editable (so user can't click it)
                        chk.disabled = !g.canEditCell(r, c);
                        if (chk.disabled) {
                            chk.style.cursor = 'default';
                        }
                        // assign editor to grid
                        if (g.editRange && g.editRange.contains(r, c)) {
                            g._edtHdl._edt = chk;
                        }
                    }
                    else if (ct == grid.CellType.Cell && this._isEditingCell(g, r, c)) {
                        // select input type (important for mobile devices)
                        var inpType = bcol.inputType;
                        if (!bcol.inputType) {
                            inpType = bcol.dataType == wijmo.DataType.Number && !bcol.dataMap ? 'tel' : 'text';
                        }
                        // get editor value (use full precision when editing floating point values)
                        // this is pretty tricky: TFS 123276, 134218, 135336, 250306
                        if (!bcol.dataMap && !bcol.mask) {
                            var val = p.getCellData(r, c, false);
                            if (wijmo.isNumber(val)) {
                                var str = val.toString(), fmt = bcol.format; // TFS 255421
                                if (fmt && val != Math.round(val)) {
                                    var dec = str.match(/\.(\d+)/)[1].length; // decimals in value
                                    fmt = fmt.replace(/([a-z])(\d*)(.*)/ig, '$01' + dec + '$3');
                                }
                                content = wijmo.Globalize.formatNumber(val, fmt, true);
                            }
                        }
                        // create/initialize editor
                        cell.innerHTML = '<input type="' + inpType + '" class="wj-grid-editor wj-form-control">';
                        var edt = cell.children[0];
                        edt.value = content;
                        edt.required = bcol.getIsRequired();
                        edt.style.textAlign = bcol.getAlignment(); // right-align numbers when editing
                        css.padding = '0px'; // no padding on cell div (the editor has it)
                        // apply mask, if any
                        if (bcol.mask) {
                            var mp = new wijmo._MaskProvider(edt, bcol.mask);
                        }
                        // assign editor to grid
                        g._edtHdl._edt = edt;
                    }
                    else {
                        // regular content
                        if (ct == grid.CellType.Cell && (row.isContentHtml || bcol.isContentHtml)) {
                            cell.innerHTML = content;
                        }
                        else {
                            wijmo.setText(cell, content);
                        }
                    }
                    // add drop-down element to the cell if the column:
                    // a) has a dataMap,
                    // b) has showDropDown set to not false (null or true)
                    // c) is editable
                    if (ct == grid.CellType.Cell && wijmo.input && bcol.dataMap
                        && bcol.showDropDown !== false && g.canEditCell(r, c)) {
                        // create icon once
                        if (!CellFactory._ddIcon) {
                            CellFactory._ddIcon = wijmo.createElement('<div class="' + CellFactory._WJC_DROPDOWN + '"><span class="wj-glyph-down"></span></div>');
                        }
                        // clone icon and add clone to cell
                        var dd = CellFactory._ddIcon.cloneNode(true);
                        cell.appendChild(dd);
                    }
                }
                // make row/col headers draggable
                switch (ct) {
                    case grid.CellType.RowHeader:
                        cell.removeAttribute('draggable');
                        if (!gr && !nr && (g.allowDragging & grid.AllowDragging.Rows) != 0 && row.allowDragging) {
                            cell.setAttribute('draggable', 'true');
                        }
                        break;
                    case grid.CellType.ColumnHeader:
                        cell.removeAttribute('draggable');
                        if ((g.allowDragging & grid.AllowDragging.Columns) != 0 && col.allowDragging) {
                            cell.setAttribute('draggable', 'true');
                        }
                        break;
                }
                // apply class list to cell
                if (cell.className != cl) {
                    cell.className = cl;
                }
                // apply style to cell
                wijmo.setCss(cell, css);
                // customize the cell
                if (g.itemFormatter) {
                    g.itemFormatter(p, r, c, cell);
                }
                if (g.formatItem.hasHandlers) {
                    var rng = CellFactory._fmtRng;
                    if (!rng) {
                        rng = CellFactory._fmtRng = new grid.CellRange(r, c, r2, c2);
                    }
                    else {
                        rng.setRange(r, c, r2, c2);
                    }
                    var e = new grid.FormatItemEventArgs(p, rng, cell);
                    g.onFormatItem(e);
                }
            };
            /**
             * Disposes of a cell element and releases all resources associated with it.
             *
             * @param cell The element that represents the cell.
             */
            CellFactory.prototype.disposeCell = function (cell) {
                // no action needed for standard cells...
            };
            /**
             * Gets the value of the editor currently being used.
             *
             * @param g @see:FlexGrid that owns the editor.
             */
            CellFactory.prototype.getEditorValue = function (g) {
                var edt = g._edtHdl._edt;
                if (edt instanceof HTMLInputElement) {
                    return edt.type == 'checkbox' ? edt.checked : edt.value;
                }
                return null;
            };
            // ** implementation
            // determines whether the grid is currently editing a cell
            CellFactory.prototype._isEditingCell = function (g, r, c) {
                return g.editRange && g.editRange.contains(r, c);
            };
            // get an element to create a collapse/expand icon
            // NOTE: the _WJC_COLLAPSE class is used by the mouse handler to identify
            // the collapse/expand button/element.
            CellFactory.prototype._getTreeIcon = function (gr) {
                var glyph = 'wj-glyph-' +
                    (gr.isCollapsed ? '' : 'down-') +
                    (gr.grid.rightToLeft ? 'left' : 'right');
                return '<span class="' + CellFactory._WJC_COLLAPSE + ' ' + glyph + '"></span>';
            };
            // get an element to create a sort up/down icon
            CellFactory.prototype._getSortIcon = function (col) {
                return '<span class="wj-glyph-' + (col.currentSort == '+' ? 'up' : 'down') + '"></span>';
            };
            return CellFactory;
        }());
        CellFactory._WJC_COLLAPSE = 'wj-elem-collapse';
        CellFactory._WJC_DROPDOWN = 'wj-elem-dropdown';
        grid.CellFactory = CellFactory;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

var wijmo;
(function (wijmo) {
    var grid;
    (function (grid) {
        'use strict';
        /**
         * Represents a rectangular group of cells defined by two row indices and
         * two column indices.
         */
        var CellRange = (function () {
            /**
             * Initializes a new instance of the @see:CellRange class.
             *
             * @param r The index of the first row in the range (defaults to -1).
             * @param c The index of the first column in the range (defaults to -1).
             * @param r2 The index of the last row in the range (defaults to <b>r</b>).
             * @param c2 The index of the last column in the range (defaults to <b>c</b>).
             */
            function CellRange(r, c, r2, c2) {
                if (r === void 0) { r = -1; }
                if (c === void 0) { c = -1; }
                if (r2 === void 0) { r2 = r; }
                if (c2 === void 0) { c2 = c; }
                this.setRange(r, c, r2, c2);
            }
            /**
             * Initializes an existing @see:CellRange.
             *
             * @param r The index of the first row in the range (defaults to -1).
             * @param c The index of the first column in the range (defaults to -1).
             * @param r2 The index of the last row in the range (defaults to <b>r</b>).
             * @param c2 The index of the last column in the range (defaults to <b>c</b>).
             */
            CellRange.prototype.setRange = function (r, c, r2, c2) {
                if (r === void 0) { r = -1; }
                if (c === void 0) { c = -1; }
                if (r2 === void 0) { r2 = r; }
                if (c2 === void 0) { c2 = c; }
                this._row = wijmo.asInt(r);
                this._col = wijmo.asInt(c);
                this._row2 = wijmo.asInt(r2);
                this._col2 = wijmo.asInt(c2);
            };
            Object.defineProperty(CellRange.prototype, "row", {
                /**
                 * Gets or sets the index of the first row in the range.
                 */
                get: function () {
                    return this._row;
                },
                set: function (value) {
                    this._row = wijmo.asInt(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRange.prototype, "col", {
                /**
                 * Gets or sets the index of the first column in the range.
                 */
                get: function () {
                    return this._col;
                },
                set: function (value) {
                    this._col = wijmo.asInt(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRange.prototype, "row2", {
                /**
                 * Gets or sets the index of the second row in the range.
                 */
                get: function () {
                    return this._row2;
                },
                set: function (value) {
                    this._row2 = wijmo.asInt(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRange.prototype, "col2", {
                /**
                 * Gets or sets the index of the second column in the range.
                 */
                get: function () {
                    return this._col2;
                },
                set: function (value) {
                    this._col2 = wijmo.asInt(value);
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Creates a copy of the range.
             */
            CellRange.prototype.clone = function () {
                return new CellRange(this._row, this._col, this._row2, this._col2);
            };
            Object.defineProperty(CellRange.prototype, "rowSpan", {
                /**
                 * Gets the number of rows in the range.
                 */
                get: function () {
                    return Math.abs(this._row2 - this._row) + 1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRange.prototype, "columnSpan", {
                /**
                 * Gets the number of columns in the range.
                 */
                get: function () {
                    return Math.abs(this._col2 - this._col) + 1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRange.prototype, "topRow", {
                /**
                 * Gets the index of the top row in the range.
                 */
                get: function () {
                    return Math.min(this._row, this._row2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRange.prototype, "bottomRow", {
                /**
                 * Gets the index of the bottom row in the range.
                 */
                get: function () {
                    return Math.max(this._row, this._row2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRange.prototype, "leftCol", {
                /**
                 * Gets the index of the leftmost column in the range.
                 */
                get: function () {
                    return Math.min(this._col, this._col2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRange.prototype, "rightCol", {
                /**
                 * Gets the index of the rightmost column in the range.
                 */
                get: function () {
                    return Math.max(this._col, this._col2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRange.prototype, "isValid", {
                /**
                 * Checks whether the range contains valid row and column indices
                 * (row and column values are zero or greater).
                 */
                get: function () {
                    return this._row > -1 && this._col > -1 && this._row2 > -1 && this._col2 > -1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CellRange.prototype, "isSingleCell", {
                /**
                 * Checks whether this range corresponds to a single cell (beginning and ending rows have
                 * the same index, and beginning and ending columns have the same index).
                 */
                get: function () {
                    return this._row == this._row2 && this._col == this._col2;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Checks whether the range contains another range or a specific cell.
             *
             * @param r The CellRange object or row index to find.
             * @param c The column index (required if the r parameter is not a CellRange object).
             */
            CellRange.prototype.contains = function (r, c) {
                // first parameter may be a cell range
                var rng = wijmo.tryCast(r, CellRange);
                if (rng) {
                    return rng.topRow >= this.topRow && rng.bottomRow <= this.bottomRow &&
                        rng.leftCol >= this.leftCol && rng.rightCol <= this.rightCol;
                }
                // check specific cell
                if (wijmo.isInt(r) && wijmo.isInt(c)) {
                    return r >= this.topRow && r <= this.bottomRow &&
                        c >= this.leftCol && c <= this.rightCol;
                }
                // anything else is an error
                throw 'contains expects a CellRange or row/column indices.';
            };
            /**
             * Checks whether the range contains a given row.
             *
             * @param r The index of the row to find.
             */
            CellRange.prototype.containsRow = function (r) {
                return wijmo.asInt(r) >= this.topRow && r <= this.bottomRow;
            };
            /**
             * Checks whether the range contains a given column.
             *
             * @param c The index of the column to find.
             */
            CellRange.prototype.containsColumn = function (c) {
                return wijmo.asInt(c) >= this.leftCol && c <= this.rightCol;
            };
            /**
             * Checks whether the range intersects another range.
             *
             * @param rng The CellRange object to check.
             */
            CellRange.prototype.intersects = function (rng) {
                return this.intersectsRow(rng) && this.intersectsColumn(rng);
            };
            /**
             * Checks whether the range intersects the rows in another range.
             *
             * @param rng The CellRange object to check.
             */
            CellRange.prototype.intersectsRow = function (rng) {
                return rng && !(this.bottomRow < rng.topRow || this.topRow > rng.bottomRow);
            };
            /**
             * Checks whether the range intersects the columns in another range.
             *
             * @param rng The CellRange object to check.
             */
            CellRange.prototype.intersectsColumn = function (rng) {
                return rng && !(this.rightCol < rng.leftCol || this.leftCol > rng.rightCol);
            };
            /**
             * Gets the rendered size of this range.
             *
             * @param p The @see:GridPanel object that contains the range.
             * @return A @see:Size object that represents the sum of row heights and column widths in the range.
             */
            CellRange.prototype.getRenderSize = function (p) {
                var sz = new wijmo.Size(0, 0);
                if (this.isValid) {
                    for (var r = this.topRow; r <= this.bottomRow; r++) {
                        sz.height += p.rows[r].renderSize;
                    }
                    for (var c = this.leftCol; c <= this.rightCol; c++) {
                        sz.width += p.columns[c].renderSize;
                    }
                }
                return sz;
            };
            /**
             * Checks whether the range equals another range.
             *
             * @param rng The CellRange object to compare to this range.
             */
            CellRange.prototype.equals = function (rng) {
                return (rng instanceof CellRange) &&
                    this._row == rng._row && this._col == rng._col &&
                    this._row2 == rng._row2 && this._col2 == rng._col2;
            };
            return CellRange;
        }());
        grid.CellRange = CellRange;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

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
var wijmo;
(function (wijmo) {
    var grid;
    (function (grid_1) {
        'use strict';
        /**
         * Specifies flags that represent the state of a grid row or column.
         */
        var RowColFlags;
        (function (RowColFlags) {
            /** The row or column is visible. */
            RowColFlags[RowColFlags["Visible"] = 1] = "Visible";
            /** The row or column can be resized. */
            RowColFlags[RowColFlags["AllowResizing"] = 2] = "AllowResizing";
            /** The row or column can be dragged to a new position with the mouse. */
            RowColFlags[RowColFlags["AllowDragging"] = 4] = "AllowDragging";
            /** The row or column can contain merged cells. */
            RowColFlags[RowColFlags["AllowMerging"] = 8] = "AllowMerging";
            /** The column can be sorted by clicking its header with the mouse. */
            RowColFlags[RowColFlags["AllowSorting"] = 16] = "AllowSorting";
            /** The column was generated automatically. */
            RowColFlags[RowColFlags["AutoGenerated"] = 32] = "AutoGenerated";
            /** The group row is collapsed. */
            RowColFlags[RowColFlags["Collapsed"] = 64] = "Collapsed";
            /** The row has a parent group that is collapsed. */
            RowColFlags[RowColFlags["ParentCollapsed"] = 128] = "ParentCollapsed";
            /** The row or column is selected. */
            RowColFlags[RowColFlags["Selected"] = 256] = "Selected";
            /** The row or column is read-only (cannot be edited). */
            RowColFlags[RowColFlags["ReadOnly"] = 512] = "ReadOnly";
            /** Cells in this row or column contain HTML text. */
            RowColFlags[RowColFlags["HtmlContent"] = 1024] = "HtmlContent";
            /** Cells in this row or column may contain wrapped text. */
            RowColFlags[RowColFlags["WordWrap"] = 2048] = "WordWrap";
            /** Default settings for new rows. */
            RowColFlags[RowColFlags["RowDefault"] = 3] = "RowDefault";
            /** Default settings for new columns. */
            RowColFlags[RowColFlags["ColumnDefault"] = 23] = "ColumnDefault";
        })(RowColFlags = grid_1.RowColFlags || (grid_1.RowColFlags = {}));
        /**
         * An abstract class that serves as a base for the @see:Row and @see:Column classes.
         */
        var RowCol = (function () {
            function RowCol() {
                this._list = null;
                this._pos = 0;
                this._idx = -1;
            }
            Object.defineProperty(RowCol.prototype, "visible", {
                /**
                 * Gets or sets a value that indicates whether the row or column is visible.
                 */
                get: function () {
                    return this._getFlag(RowColFlags.Visible);
                },
                set: function (value) {
                    this._setFlag(RowColFlags.Visible, value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "isVisible", {
                /**
                 * Gets a value that indicates whether the row or column is visible and not collapsed.
                 *
                 * This property is read-only. To change the visibility of a
                 * row or column, use the @see:visible property instead.
                 */
                get: function () {
                    // if visible is false, we're not visible
                    if (!this._getFlag(RowColFlags.Visible)) {
                        return false;
                    }
                    // if the parent node is collapsed and this is not a new row, we're not visible
                    if (this._getFlag(RowColFlags.ParentCollapsed) && !(this instanceof grid_1._NewRowTemplate)) {
                        return false;
                    }
                    // looks like we're visible
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "pos", {
                /**
                 * Gets the position of the row or column.
                 */
                get: function () {
                    if (this._list)
                        this._list._update();
                    return this._pos;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "index", {
                /**
                 * Gets the index of the row or column in the parent collection.
                 */
                get: function () {
                    if (this._list)
                        this._list._update();
                    return this._idx;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "size", {
                /**
                 * Gets or sets the size of the row or column.
                 * Setting this property to null or negative values causes the element to use the
                 * parent collection's default size.
                 */
                get: function () {
                    return this._sz;
                },
                set: function (value) {
                    if (value != this._sz) {
                        this._sz = wijmo.asNumber(value, true);
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "renderSize", {
                /**
                 * Gets the render size of the row or column.
                 * This property accounts for visibility, default size, and min and max sizes.
                 */
                get: function () {
                    if (!this.isVisible) {
                        return 0;
                    }
                    var sz = this._sz, list = this._list;
                    // list default/min/max (TFS 242535)
                    if (list) {
                        if (sz == null || sz < 0) {
                            sz = Math.round((list).defaultSize);
                        }
                        if (list.minSize != null && sz < list.minSize) {
                            sz = list.minSize;
                        }
                        if (list.maxSize != null && sz > list.maxSize) {
                            sz = list.maxSize;
                        }
                    }
                    // this min/max
                    if (this._szMin != null && sz < this._szMin) {
                        sz = this._szMin;
                    }
                    if (this._szMax != null && sz > this._szMax) {
                        sz = this._szMax;
                    }
                    // done
                    return Math.round(sz);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "allowResizing", {
                /**
                 * Gets or sets a value that indicates whether the user can resize the row or column with the mouse.
                 */
                get: function () {
                    return this._getFlag(RowColFlags.AllowResizing);
                },
                set: function (value) {
                    this._setFlag(RowColFlags.AllowResizing, value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "allowDragging", {
                /**
                 * Gets or sets a value that indicates whether the user can move the row or column to a new position with the mouse.
                 */
                get: function () {
                    return this._getFlag(RowColFlags.AllowDragging);
                },
                set: function (value) {
                    this._setFlag(RowColFlags.AllowDragging, value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "allowMerging", {
                /**
                 * Gets or sets a value that indicates whether cells in the row or column can be merged.
                 */
                get: function () {
                    return this._getFlag(RowColFlags.AllowMerging);
                },
                set: function (value) {
                    this._setFlag(RowColFlags.AllowMerging, value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "isSelected", {
                /**
                 * Gets or sets a value that indicates whether the row or column is selected.
                 */
                get: function () {
                    return this._getFlag(RowColFlags.Selected);
                },
                set: function (value) {
                    //this._setFlag(RowColFlags.Selected, value);
                    // set flag quietly, then update selection (faster than full invalidation)
                    if (this._setFlag(RowColFlags.Selected, value, true)) {
                        var g = this.grid;
                        if (g) {
                            g.refreshCells(false, true, true);
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "isReadOnly", {
                /**
                 * Gets or sets a value that indicates whether cells in the row or column can be edited.
                 */
                get: function () {
                    return this._getFlag(RowColFlags.ReadOnly);
                },
                set: function (value) {
                    this._setFlag(RowColFlags.ReadOnly, value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "isContentHtml", {
                /**
                 * Gets or sets a value that indicates whether cells in this row or column
                 * contain HTML content rather than plain text.
                 */
                get: function () {
                    return this._getFlag(RowColFlags.HtmlContent);
                },
                set: function (value) {
                    if (this.isContentHtml != value) {
                        this._setFlag(RowColFlags.HtmlContent, value);
                        if (this.grid) {
                            this.grid.invalidate();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "wordWrap", {
                /**
                 * Gets or sets a value that indicates whether cells in the row or column wrap their content.
                 */
                get: function () {
                    return this._getFlag(RowColFlags.WordWrap);
                },
                set: function (value) {
                    this._setFlag(RowColFlags.WordWrap, value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "cssClass", {
                /**
                 * Gets or sets a CSS class name to use when rendering
                 * non-header cells in the row or column.
                 */
                get: function () {
                    return this._cssClass;
                },
                set: function (value) {
                    if (value != this._cssClass) {
                        this._cssClass = wijmo.asString(value);
                        if (this.grid) {
                            this.grid.invalidate(false);
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "grid", {
                /**
                 * Gets the @see:FlexGrid that owns the row or column.
                 */
                get: function () {
                    return this._list ? this._list._g : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowCol.prototype, "collectionView", {
                /**
                 * Gets the @see:ICollectionView bound to this row or column.
                 */
                get: function () {
                    return this.grid ? this.grid.collectionView : null;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Marks the owner list as dirty and refreshes the owner grid.
             */
            RowCol.prototype.onPropertyChanged = function () {
                if (this._list) {
                    this._list._dirty = true;
                    this.grid.invalidate();
                }
            };
            // Gets the value of a flag.
            RowCol.prototype._getFlag = function (flag) {
                return (this._f & flag) != 0;
            };
            // Sets the value of a flag, with optional notification.
            RowCol.prototype._setFlag = function (flag, value, quiet) {
                if (value != this._getFlag(flag)) {
                    this._f = value ? (this._f | flag) : (this._f & ~flag);
                    if (!quiet) {
                        this.onPropertyChanged();
                    }
                    return true;
                }
                return false;
            };
            return RowCol;
        }());
        grid_1.RowCol = RowCol;
        /**
         * Represents a column on the grid.
         */
        var Column = (function (_super) {
            __extends(Column, _super);
            /**
             * Initializes a new instance of the @see:Column class.
             *
             * @param options Initialization options for the column.
             */
            function Column(options) {
                var _this = _super.call(this) || this;
                _this._f = RowColFlags.ColumnDefault;
                _this._hash = Column._ctr.toString(36); // unique column key (used for unbound rows)
                Column._ctr++;
                if (options) {
                    wijmo.copy(_this, options);
                }
                return _this;
            }
            Object.defineProperty(Column.prototype, "name", {
                /**
                 * Gets or sets the name of the column.
                 *
                 * The column name can be used to retrieve the column using the
                 * @see:FlexGrid.getColumn method.
                 */
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    this._name = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "dataType", {
                /**
                 * Gets or sets the type of value stored in the column.
                 *
                 * Values are coerced into the proper type when editing the grid.
                 */
                get: function () {
                    return this._type;
                },
                set: function (value) {
                    if (this._type != value) {
                        this._type = wijmo.asEnum(value, wijmo.DataType);
                        if (this.grid) {
                            this.grid.invalidate();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "isRequired", {
                /**
                 * Gets or sets a value that determines whether values in the column
                 * are required.
                 *
                 * By default, this property is set to null, which means values
                 * are required, but non-masked string columns may contain empty
                 * strings.
                 *
                 * When set to true, values are required and empty strings are
                 * not allowed.
                 *
                 * When set to false, null values and empty strings are allowed.
                 */
                get: function () {
                    return this._required;
                },
                set: function (value) {
                    this._required = wijmo.asBoolean(value, true);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "showDropDown", {
                // Deprecated: use 'isRequired' instead to avoid confusion with 'required' HTML attribute.
                //get required(): boolean {
                //    _deprecated('required', 'isRequired');
                //    return this.isRequired;
                //}
                //set required(value: boolean) {
                //    _deprecated('required', 'isRequired');
                //    this.isRequired = value;
                //}
                /**
                 * Gets or sets a value that indicates whether the grid adds drop-down buttons to the
                 * cells in this column.
                 *
                 * The drop-down buttons are shown only if the column has a @see:dataMap
                 * set and is editable. Clicking on the drop-down buttons causes the grid
                 * to show a list where users can select the value for the cell.
                 *
                 * Cell drop-downs require the wijmo.input module to be loaded.
                 */
                get: function () {
                    return this._showDropDown;
                },
                set: function (value) {
                    if (value != this._showDropDown) {
                        this._showDropDown = wijmo.asBoolean(value, true);
                        if (this.grid) {
                            this.grid.invalidate();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "dropDownCssClass", {
                /**
                 * Gets or sets a CSS class name to add to drop-downs in this column.
                 *
                 * The drop-down buttons are shown only if the column has a @see:dataMap
                 * set and is editable. Clicking on the drop-down buttons causes the grid
                 * to show a list where users can select the value for the cell.
                 *
                 * Cell drop-downs require the wijmo.input module to be loaded.
                 */
                get: function () {
                    return this._ddCssClass;
                },
                set: function (value) {
                    this._ddCssClass = wijmo.asString(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "inputType", {
                /**
                 * Gets or sets the "type" attribute of the HTML input element used to edit values
                 * in this column.
                 *
                 * By default, this property is set to "tel" for numeric columns, and to "text" for
                 * all other non-boolean column types. The "tel" input type causes mobile devices
                 * to show a numeric keyboard that includes a negative sign and a decimal separator.
                 *
                 * Use this property to change the default setting if the default does not work well
                 * for the current culture, device, or application. In these cases, try setting the
                 * property to "number" or simply "text."
                 */
                get: function () {
                    return this._inpType;
                },
                set: function (value) {
                    this._inpType = wijmo.asString(value, true);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "mask", {
                /**
                 * Gets or sets a mask to use while editing values in this column.
                 *
                 * The mask format is the same used by the @see:wijmo.input.InputMask
                 * control.
                 *
                 * If specified, the mask must be compatible with the value of
                 * the @see:format property. For example, the mask '99/99/9999' can
                 * be used for entering dates formatted as 'MM/dd/yyyy'.
                 */
                get: function () {
                    return this._mask;
                },
                set: function (value) {
                    this._mask = wijmo.asString(value, true);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "binding", {
                /**
                 * Gets or sets the name of the property the column is bound to.
                 */
                get: function () {
                    return this._binding ? this._binding.path : null;
                },
                set: function (value) {
                    if (value != this.binding) {
                        var path = wijmo.asString(value);
                        this._binding = path ? new wijmo.Binding(path) : null;
                        if (!this._type && this.grid && this._binding) {
                            var cv = this.grid.collectionView;
                            if (cv && cv.sourceCollection && cv.sourceCollection.length) {
                                var item = cv.sourceCollection[0];
                                this._type = wijmo.getType(this._binding.getValue(item));
                            }
                        }
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "sortMemberPath", {
                /**
                 * Gets or sets the name of the property to use when sorting this column.
                 *
                 * Use this property in cases where you want the sorting to be performed
                 * based on values other than the ones specified by the @see:binding property.
                 *
                 * Setting this property is null causes the grid to use the value of the
                 * @see:binding property to sort the column.
                 */
                get: function () {
                    return this._bindingSort ? this._bindingSort.path : null;
                },
                set: function (value) {
                    if (value != this.sortMemberPath) {
                        var path = wijmo.asString(value);
                        this._bindingSort = path ? new wijmo.Binding(path) : null;
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "width", {
                /**
                 * Gets or sets the width of the column.
                 *
                 * Column widths may be positive numbers (sets the column width in pixels),
                 * null or negative numbers (uses the collection's default column width), or
                 * strings in the format '{number}*' (star sizing).
                 *
                 * The star-sizing option performs a XAML-style dynamic sizing where column
                 * widths are proportional to the number before the star. For example, if
                 * a grid has three columns with widths "100", "*", and "3*", the first column
                 * will be 100 pixels wide, the second will take up 1/4th of the remaining
                 * space, and the last will take up the remaining 3/4ths of the remaining space.
                 *
                 * Star-sizing allows you to define columns that automatically stretch to fill
                 * the width available. For example, set the width of the last column to "*"
                 * and it will automatically extend to fill the entire grid width so there's
                 * no empty space. You may also want to set the column's @see:minWidth property
                 * to prevent the column from getting too narrow.
                 */
                get: function () {
                    if (this._szStar != null) {
                        return this._szStar;
                    }
                    else {
                        return this.size;
                    }
                },
                set: function (value) {
                    if (Column._parseStarSize(value) != null) {
                        this._szStar = value;
                        this.onPropertyChanged();
                    }
                    else {
                        this._szStar = null;
                        this.size = wijmo.asNumber(value, true);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "minWidth", {
                /**
                 * Gets or sets the minimum width of the column.
                 */
                get: function () {
                    return this._szMin;
                },
                set: function (value) {
                    if (value != this._szMin) {
                        this._szMin = wijmo.asNumber(value, true, true);
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "maxWidth", {
                /**
                 * Gets or sets the maximum width of the column.
                 */
                get: function () {
                    return this._szMax;
                },
                set: function (value) {
                    if (value != this._szMax) {
                        this._szMax = wijmo.asNumber(value, true, true);
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "renderWidth", {
                /**
                 * Gets the render width of the column.
                 *
                 * The value returned takes into account the column's visibility, default size, and min and max sizes.
                 */
                get: function () {
                    return this.renderSize;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "align", {
                /**
                 * Gets or sets the horizontal alignment of items in the column.
                 *
                 * The default value for this property is null, which causes the grid to select
                 * the alignment automatically based on the column's @see:dataType (numbers are
                 * right-aligned, Boolean values are centered, and other types are left-aligned).
                 *
                 * If you want to override the default alignment, set this property
                 * to 'left,' 'right,' or 'center,'
                 */
                get: function () {
                    return this._align;
                },
                set: function (value) {
                    if (this._align != value) {
                        this._align = value;
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Gets the actual column alignment.
             *
             * Returns the value of the @see:align property if it is not null, or
             * selects the alignment based on the column's @see:dataType.
             */
            Column.prototype.getAlignment = function () {
                var value = this._align;
                if (value == null) {
                    value = '';
                    if (!this._map) {
                        switch (this._type) {
                            case wijmo.DataType.Boolean:
                                value = 'center';
                                break;
                            case wijmo.DataType.Number:
                                value = 'right';
                                break;
                        }
                    }
                }
                return value;
            };
            /**
             * Gets a value that determines whether the column is required.
             *
             * Returns the value of the @see:isRequired property if it is not null, or
             * determines the required status based on the column's @see:dataType.
             *
             * By default, string columns are not required unless they have an associated
             * @see:dataMap or @see:mask; all other data types are required.
             */
            Column.prototype.getIsRequired = function () {
                if (this._required != null) {
                    return this._required;
                }
                if (this.dataType == wijmo.DataType.String) {
                    return this.dataMap != null || (this._mask && this._mask.length > 0);
                }
                return true;
            };
            Object.defineProperty(Column.prototype, "header", {
                /**
                 * Gets or sets the text displayed in the column header.
                 */
                get: function () {
                    return this._hdr ? this._hdr : this.binding;
                },
                set: function (value) {
                    if (this._hdr != value) {
                        this._hdr = value;
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "dataMap", {
                /**
                 * Gets or sets the @see:DataMap used to convert raw values into display
                 * values for the column.
                 *
                 * Columns with an associated @see:dataMap show drop-down buttons that
                 * can be used for quick editing. If you do not want to show the drop-down
                 * buttons, set the column's @see:showDropDown property to false.
                 *
                 * Cell drop-downs require the wijmo.input module to be loaded.
                 */
                get: function () {
                    return this._map;
                },
                set: function (value) {
                    if (this._map != value) {
                        // disconnect old map
                        if (this._map) {
                            this._map.mapChanged.removeHandler(this.onPropertyChanged, this);
                        }
                        // convert arrays into DataMaps
                        if (wijmo.isArray(value)) {
                            value = new grid_1.DataMap(value, null, null);
                        }
                        // set new map
                        this._map = wijmo.asType(value, grid_1.DataMap, true);
                        // connect new map
                        if (this._map) {
                            this._map.mapChanged.addHandler(this.onPropertyChanged, this);
                        }
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "format", {
                /**
                 * Gets or sets the format string used to convert raw values into display
                 * values for the column (see @see:Globalize).
                 */
                get: function () {
                    return this._fmt;
                },
                set: function (value) {
                    if (this._fmt != value) {
                        this._fmt = value;
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "allowSorting", {
                /**
                 * Gets or sets a value that indicates whether the user can sort the column by clicking its header.
                 */
                get: function () {
                    return this._getFlag(RowColFlags.AllowSorting);
                },
                set: function (value) {
                    this._setFlag(RowColFlags.AllowSorting, value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "currentSort", {
                /**
                 * Gets a string that describes the current sorting applied to the column.
                 * Possible values are '+' for ascending order, '-' for descending order, or
                 * null for unsorted columns.
                 */
                get: function () {
                    if (this.grid && this.grid.collectionView && this.grid.collectionView.canSort) {
                        var sds = this.grid.collectionView.sortDescriptions;
                        for (var i = 0; i < sds.length; i++) {
                            if (sds[i].property == this._getBindingSort()) {
                                return sds[i].ascending ? '+' : '-';
                            }
                        }
                    }
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Column.prototype, "aggregate", {
                /**
                 * Gets or sets the @see:Aggregate to display in the group header rows
                 * for the column.
                 */
                get: function () {
                    return this._agg != null ? this._agg : wijmo.Aggregate.None;
                },
                set: function (value) {
                    if (value != this._agg) {
                        this._agg = wijmo.asEnum(value, wijmo.Aggregate);
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            // gets the binding used for sorting (sortMemberPath if specified, binding ow)
            /*protected*/ Column.prototype._getBindingSort = function () {
                return this.sortMemberPath ? this.sortMemberPath :
                    this.binding ? this.binding :
                        null;
            };
            // parses a string in the format '<number>*' and returns the number (or null if the parsing fails).
            Column._parseStarSize = function (value) {
                if (wijmo.isString(value) && value.length > 0 && value[value.length - 1] == '*') {
                    var sz = value.length == 1 ? 1 : value.substr(0, value.length - 1) * 1;
                    if (sz > 0 && !isNaN(sz)) {
                        return sz;
                    }
                }
                return null;
            };
            return Column;
        }(RowCol));
        Column._ctr = 0;
        grid_1.Column = Column;
        /**
         * Represents a row in the grid.
         */
        var Row = (function (_super) {
            __extends(Row, _super);
            /**
             * Initializes a new instance of the @see:Row class.
             *
             * @param dataItem The data item that this row is bound to.
             */
            function Row(dataItem) {
                var _this = _super.call(this) || this;
                _this._f = RowColFlags.ColumnDefault;
                _this._data = dataItem;
                return _this;
            }
            Object.defineProperty(Row.prototype, "dataItem", {
                /**
                 * Gets or sets the item in the data collection that the item is bound to.
                 */
                get: function () {
                    return this._data;
                },
                set: function (value) {
                    this._data = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Row.prototype, "height", {
                /**
                 * Gets or sets the height of the row.
                 * Setting this property to null or negative values causes the element to use the
                 * parent collection's default size.
                 */
                get: function () {
                    return this.size;
                },
                set: function (value) {
                    this.size = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Row.prototype, "renderHeight", {
                /**
                 * Gets the render height of the row.
                 *
                 * The value returned takes into account the row's visibility, default size, and min and max sizes.
                 */
                get: function () {
                    return this.renderSize;
                },
                enumerable: true,
                configurable: true
            });
            return Row;
        }(RowCol));
        grid_1.Row = Row;
        /**
         * Represents a row that serves as a header for a group of rows.
         */
        var GroupRow = (function (_super) {
            __extends(GroupRow, _super);
            /**
             * Initializes a new instance of the @see:GroupRow class.
             */
            function GroupRow() {
                var _this = _super.call(this) || this;
                _this._level = -1;
                _this.isReadOnly = true; // group rows are read-only by default
                return _this;
            }
            Object.defineProperty(GroupRow.prototype, "level", {
                /**
                 * Gets or sets the hierarchical level of the group associated with the GroupRow.
                 */
                get: function () {
                    return this._level;
                },
                set: function (value) {
                    wijmo.asInt(value);
                    if (value != this._level) {
                        this._level = value;
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GroupRow.prototype, "hasChildren", {
                /**
                 * Gets a value that indicates whether the group row has child rows.
                 */
                get: function () {
                    if (this.grid != null && this._list != null) {
                        // get the next row
                        this._list._update();
                        var rNext = this.index < this._list.length - 1
                            ? this._list[this.index + 1]
                            : null;
                        // check if it's a group row or a new row template
                        var gr = wijmo.tryCast(rNext, GroupRow), nr = wijmo.tryCast(rNext, grid_1._NewRowTemplate);
                        // return true if there is a next row and
                        // it's a data row or a deeper group row
                        return rNext != null && nr == null && (gr == null || gr.level > this.level);
                    }
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GroupRow.prototype, "isCollapsed", {
                /**
                 * Gets or sets a value that indicates whether the GroupRow is collapsed
                 * (child rows are hidden) or expanded (child rows are visible).
                 */
                get: function () {
                    return this._getFlag(RowColFlags.Collapsed);
                },
                set: function (value) {
                    wijmo.asBoolean(value);
                    if (value != this.isCollapsed && this._list != null) {
                        this._setCollapsed(value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Gets the header text for this @see:GroupRow.
             */
            GroupRow.prototype.getGroupHeader = function () {
                var grid = this.grid, fmt = grid.groupHeaderFormat ? grid.groupHeaderFormat : wijmo.culture.FlexGrid.groupHeaderFormat, group = wijmo.tryCast(this.dataItem, wijmo.collections.CollectionViewGroup);
                if (group && fmt) {
                    // get group info
                    var propName = group.groupDescription['propertyName'], value = group.name, col = grid.getColumn(propName);
                    // customize with column info if possible
                    var isHtml = this.isContentHtml; // TFS 114902
                    if (col) {
                        isHtml = isHtml || col.isContentHtml;
                        if (col.header) {
                            propName = col.header;
                        }
                        if (col.dataMap) {
                            value = col.dataMap.getDisplayValue(value);
                        }
                        else if (col.format) {
                            value = wijmo.Globalize.format(value, col.format);
                        }
                    }
                    // get count including all items (including items not on the current page,
                    // as calculated when setting Column.Aggregate TFS 195467)
                    var count = group.getAggregate(wijmo.Aggregate.CntAll, null, grid.collectionView);
                    //var count = group.items.length;
                    // build header text
                    return wijmo.format(fmt, {
                        name: wijmo.escapeHtml(propName),
                        value: isHtml ? value : wijmo.escapeHtml(value),
                        level: group.level,
                        count: count
                    });
                }
                return '';
            };
            // sets the collapsed/expanded state of a group row
            GroupRow.prototype._setCollapsed = function (collapsed) {
                var _this = this;
                var g = this.grid, rows = g.rows, rng = this.getCellRange(), e = new grid_1.CellRangeEventArgs(g.cells, new grid_1.CellRange(this.index, -1)), gr;
                // fire GroupCollapsedChanging
                g.onGroupCollapsedChanging(e);
                // if user canceled, or edits failed, bail out
                if (e.cancel) {
                    return;
                }
                // apply new value
                g.deferUpdate(function () {
                    // collapse/expand this group
                    _this._setFlag(RowColFlags.Collapsed, collapsed);
                    for (var r = rng.topRow + 1; r <= rng.bottomRow && r > -1 && r < rows.length; r++) {
                        // apply state to this row
                        rows[r]._setFlag(RowColFlags.ParentCollapsed, collapsed);
                        // if this is a group, skip range to preserve the original state
                        gr = wijmo.tryCast(rows[r], GroupRow);
                        if (gr != null && gr.isCollapsed) {
                            r = gr.getCellRange().bottomRow;
                        }
                    }
                });
                // fire GroupCollapsedChanged
                g.onGroupCollapsedChanged(e);
            };
            /**
             * Gets a @see:CellRange object that contains all of the rows in the group represented
             * by this @see:GroupRow and all of the columns in the grid.
             */
            GroupRow.prototype.getCellRange = function () {
                var rows = this._list, top = this.index, bottom = rows.length - 1;
                for (var r = top + 1; r <= bottom; r++) {
                    var gr = wijmo.tryCast(rows[r], GroupRow);
                    if (gr != null && gr.level <= this.level) {
                        bottom = r - 1;
                        break;
                    }
                }
                return new grid_1.CellRange(top, 0, bottom, this.grid.columns.length - 1);
            };
            return GroupRow;
        }(Row));
        grid_1.GroupRow = GroupRow;
        /**
         * Abstract class that serves as a base for row and column collections.
         */
        var RowColCollection = (function (_super) {
            __extends(RowColCollection, _super);
            /**
             * Initializes a new instance of the @see:RowColCollection class.
             *
             * @param g The @see:FlexGrid that owns the collection.
             * @param defaultSize The default size of the elements in the collection.
             */
            function RowColCollection(g, defaultSize) {
                var _this = _super.call(this) || this;
                _this._frozen = 0;
                _this._szDef = 28;
                _this._szTot = 0;
                _this._dirty = false;
                _this._g = wijmo.asType(g, grid_1.FlexGrid);
                _this._szDef = wijmo.asNumber(defaultSize, false, true);
                return _this;
            }
            Object.defineProperty(RowColCollection.prototype, "defaultSize", {
                /**
                 * Gets or sets the default size of elements in the collection.
                 */
                get: function () {
                    return this._szDef;
                },
                set: function (value) {
                    if (this._szDef != value) {
                        this._szDef = wijmo.asNumber(value, false, true);
                        this._dirty = true;
                        this._g.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowColCollection.prototype, "frozen", {
                /**
                 * Gets or sets the number of frozen rows or columns in the collection.
                 *
                 * Frozen rows and columns do not scroll, and instead remain at the top or left of
                 * the grid, next to the fixed cells. Unlike fixed cells, however, frozen
                 * cells may be selected and edited like regular cells.
                 */
                get: function () {
                    return this._frozen;
                },
                set: function (value) {
                    if (value != this._frozen) {
                        this._frozen = wijmo.asNumber(value, false, true);
                        this._dirty = true;
                        this._g.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Checks whether a row or column is frozen.
             *
             * @param index The index of the row or column to check.
             */
            RowColCollection.prototype.isFrozen = function (index) {
                return index < this.frozen;
            };
            Object.defineProperty(RowColCollection.prototype, "minSize", {
                /**
                 * Gets or sets the minimum size of elements in the collection.
                 */
                get: function () {
                    return this._szMin;
                },
                set: function (value) {
                    if (value != this._szMin) {
                        this._szMin = wijmo.asNumber(value, true, true);
                        this._dirty = true;
                        this._g.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RowColCollection.prototype, "maxSize", {
                /**
                 * Gets or sets the maximum size of elements in the collection.
                 */
                get: function () {
                    return this._szMax;
                },
                set: function (value) {
                    if (value != this._szMax) {
                        this._szMax = wijmo.asNumber(value, true, true);
                        this._dirty = true;
                        this._g.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Gets the total size of the elements in the collection.
             */
            RowColCollection.prototype.getTotalSize = function () {
                this._update();
                return this._szTot;
            };
            /**
             * Gets the index of the element at a given physical position.
             * @param position Position of the item in the collection, in pixels.
             */
            RowColCollection.prototype.getItemAt = function (position) {
                // update if necessary
                this._update();
                // shortcut for common case
                if (position <= 0 && this.length > 0) {
                    return 0;
                }
                // binary search
                // REVIEW: is this worth it? might be better to use a simpler method?
                var min = 0, max = this.length - 1, cur, item;
                while (min <= max) {
                    cur = (min + max) >>> 1;
                    item = this[cur];
                    if (item._pos > position) {
                        max = cur - 1;
                    }
                    else if (item._pos + item.renderSize < position) {
                        min = cur + 1;
                    }
                    else {
                        // skip invisible elements
                        while (cur > 0 && !this[cur].visible) {
                            cur--;
                        }
                        while (cur < this.length - 1 && !this[cur].visible) {
                            cur++;
                        }
                        // done
                        return cur;
                    }
                }
                // not found, return max
                return max;
            };
            /**
             * Finds the next visible cell for a selection change.
             * @param index Starting index for the search.
             * @param move Type of move (size and direction).
             * @param pageSize Size of a page (in case the move is a page up/down).
             */
            RowColCollection.prototype.getNextCell = function (index, move, pageSize) {
                var i;
                switch (move) {
                    case grid_1.SelMove.Next:
                        for (i = index + 1; i < this.length; i++) {
                            if (this[i].renderSize > 0)
                                return i;
                        }
                        break;
                    case grid_1.SelMove.Prev:
                        for (i = index - 1; i >= 0; i--) {
                            if (this[i].renderSize > 0)
                                return i;
                        }
                        break;
                    case grid_1.SelMove.End:
                        for (i = this.length - 1; i >= 0; i--) {
                            if (this[i].renderSize > 0)
                                return i;
                        }
                        break;
                    case grid_1.SelMove.Home:
                        for (i = 0; i < this.length; i++) {
                            if (this[i].renderSize > 0)
                                return i;
                        }
                        break;
                    case grid_1.SelMove.NextPage:
                        i = this.getItemAt(this[index].pos + pageSize);
                        return i < 0 ? this.getNextCell(index, grid_1.SelMove.End, pageSize) :
                            i == index && i < this.length - 1 ? i + 1 :
                                i;
                    case grid_1.SelMove.PrevPage:
                        i = this.getItemAt(this[index].pos - pageSize);
                        return i < 0 ? this.getNextCell(index, grid_1.SelMove.Home, pageSize) :
                            i == index && i > 0 ? i - 1 :
                                i;
                }
                return index;
            };
            /**
             * Checks whether an element can be moved from one position to another.
             *
             * @param src The index of the element to move.
             * @param dst The position to which to move the element, or specify -1 to append the element.
             * @return Returns true if the move is valid, false otherwise.
             */
            RowColCollection.prototype.canMoveElement = function (src, dst) {
                // no move?
                if (dst == src) {
                    return false;
                }
                // invalid move?
                if (src < 0 || src >= this.length || dst >= this.length) {
                    return false;
                }
                // illegal move?
                if (dst < 0)
                    dst = this.length - 1;
                var start = Math.min(src, dst), end = Math.max(src, dst);
                for (var i = start; i <= end; i++) {
                    if (!this[i].allowDragging) {
                        return false;
                    }
                }
                // can't move anything past the new row template (TFS 109012)
                if (this[dst] instanceof grid_1._NewRowTemplate) {
                    return false;
                }
                // all seems OK
                return true;
            };
            /**
             * Moves an element from one position to another.
             * @param src Index of the element to move.
             * @param dst Position where the element should be moved to (-1 to append).
             */
            RowColCollection.prototype.moveElement = function (src, dst) {
                if (this.canMoveElement(src, dst)) {
                    var e = this[src];
                    this.removeAt(src);
                    if (dst < 0)
                        dst = this.length;
                    this.insert(dst, e);
                }
            };
            /**
             * Keeps track of dirty state and invalidate grid on changes.
             */
            RowColCollection.prototype.onCollectionChanged = function (e) {
                if (e === void 0) { e = wijmo.collections.NotifyCollectionChangedEventArgs.reset; }
                this._dirty = true;
                this._g.invalidate();
                _super.prototype.onCollectionChanged.call(this, e);
            };
            /**
             * Appends an item to the array.
             *
             * @param item Item to add to the array.
             * @return The new length of the array.
             */
            RowColCollection.prototype.push = function (item) {
                item._list = this;
                return _super.prototype.push.call(this, item);
            };
            /**
             * Removes or adds items to the array.
             *
             * @param index Position where items are added or removed.
             * @param count Number of items to remove from the array.
             * @param item Item to add to the array.
             * @return An array containing the removed elements.
             */
            RowColCollection.prototype.splice = function (index, count, item) {
                if (item) {
                    item._list = this;
                }
                return _super.prototype.splice.call(this, index, count, item);
            };
            /**
             * Suspends notifications until the next call to @see:endUpdate.
             */
            RowColCollection.prototype.beginUpdate = function () {
                // make sure we're up-to-date before suspending the updates
                this._update();
                // OK, now it's OK to suspend things
                _super.prototype.beginUpdate.call(this);
            };
            // updates the index, size and position of the elements in the array.
            RowColCollection.prototype._update = function () {
                // update only if we're dirty *and* if the collection is not in an update block.
                // this is important for performance, especially when expanding/collapsing nodes.
                if (this._dirty && !this.isUpdating) {
                    this._dirty = false;
                    var pos = 0, rc;
                    for (var i = 0; i < this.length; i++) {
                        rc = this[i];
                        rc._idx = i;
                        rc._list = this;
                        rc._pos = pos;
                        pos += rc.renderSize;
                    }
                    this._szTot = pos;
                    return true;
                }
                return false;
            };
            return RowColCollection;
        }(wijmo.collections.ObservableArray));
        grid_1.RowColCollection = RowColCollection;
        /**
         * Represents a collection of @see:Column objects in a @see:FlexGrid control.
         */
        var ColumnCollection = (function (_super) {
            __extends(ColumnCollection, _super);
            function ColumnCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._firstVisible = -1;
                return _this;
            }
            /**
             * Gets a column by name or by binding.
             *
             * The method searches the column by name. If a column with the given name
             * is not found, it searches by binding. The searches are case-sensitive.
             *
             * @param name The name or binding to find.
             * @return The column with the specified name or binding, or null if not found.
             */
            ColumnCollection.prototype.getColumn = function (name) {
                var index = this.indexOf(name);
                return index > -1 ? this[index] : null;
            };
            /**
             * Gets the index of a column by name or binding.
             *
             * The method searches the column by name. If a column with the given name
             * is not found, it searches by binding. The searches are case-sensitive.
             *
             * @param name The name or binding to find.
             * @return The index of column with the specified name or binding, or -1 if not found.
             */
            ColumnCollection.prototype.indexOf = function (name) {
                // direct lookup
                if (name instanceof Column) {
                    return _super.prototype.indexOf.call(this, name);
                }
                // by name
                for (var i = 0; i < this.length; i++) {
                    if (this[i].name == name) {
                        return i;
                    }
                }
                // by binding
                for (var i = 0; i < this.length; i++) {
                    if (this[i].binding == name) {
                        return i;
                    }
                }
                return -1;
            };
            Object.defineProperty(ColumnCollection.prototype, "firstVisibleIndex", {
                /**
                 * Gets the index of the first visible column (where the outline tree is displayed).
                 */
                get: function () {
                    this._update();
                    return this._firstVisible;
                },
                enumerable: true,
                configurable: true
            });
            // override to keep track of first visible column (and later to handle star sizes)
            ColumnCollection.prototype._update = function () {
                if (_super.prototype._update.call(this)) {
                    this._firstVisible = -1;
                    for (var i = 0; i < this.length; i++) {
                        if ((this[i]).visible) {
                            this._firstVisible = i;
                            break;
                        }
                    }
                    return true;
                }
                return false;
            };
            // update the width of the columns with star sizes
            ColumnCollection.prototype._updateStarSizes = function (szAvailable) {
                var starCount = 0, lastStarCol;
                // count stars, remove fixed size columns from available size
                for (var i = 0; i < this.length; i++) {
                    var col = this[i];
                    if (col.isVisible) {
                        if (col._szStar) {
                            starCount += Column._parseStarSize(col._szStar);
                            lastStarCol = col;
                        }
                        else {
                            szAvailable -= col.renderWidth;
                        }
                    }
                }
                // update width of star columns
                if (lastStarCol) {
                    var lastWidth = szAvailable;
                    for (var i = 0; i < this.length; i++) {
                        var col = this[i];
                        if (col.isVisible) {
                            if (col._szStar) {
                                if (col == lastStarCol && lastWidth > 0) {
                                    col._sz = lastWidth; // to avoid round-off errors...
                                }
                                else {
                                    col._sz = Math.max(0, Math.round(Column._parseStarSize(col._szStar) / starCount * szAvailable));
                                    lastWidth -= col.renderWidth;
                                }
                            }
                        }
                    }
                    this._dirty = true;
                    this._update();
                    return true;
                }
                // no star sizes...
                return false;
            };
            return ColumnCollection;
        }(RowColCollection));
        grid_1.ColumnCollection = ColumnCollection;
        /**
         * Represents a collection of @see:Row objects in a @see:FlexGrid control.
         */
        var RowCollection = (function (_super) {
            __extends(RowCollection, _super);
            function RowCollection() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._maxLevel = -1;
                return _this;
            }
            Object.defineProperty(RowCollection.prototype, "maxGroupLevel", {
                /**
                 * Gets the maximum group level in the grid.
                 *
                 * @return The maximum group level or -1 if the grid has no group rows.
                 */
                get: function () {
                    this._update();
                    return this._maxLevel;
                },
                enumerable: true,
                configurable: true
            });
            // override to keep track of the maximum group level
            RowCollection.prototype._update = function () {
                if (_super.prototype._update.call(this)) {
                    this._maxLevel = -1;
                    for (var i = 0; i < this.length; i++) {
                        var gr = wijmo.tryCast(this[i], GroupRow);
                        if (gr && gr.level > this._maxLevel) {
                            this._maxLevel = gr.level;
                        }
                    }
                    return true;
                }
                return false;
            };
            return RowCollection;
        }(RowColCollection));
        grid_1.RowCollection = RowCollection;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

var wijmo;
(function (wijmo) {
    var grid;
    (function (grid_1) {
        'use strict';
        /**
         * Contains information about the part of a @see:FlexGrid control that exists at
         * a specified page coordinate.
         */
        var HitTestInfo = (function () {
            /**
             * Initializes a new instance of the @see:wijmo.grid.HitTestInfo class.
             *
             * @param grid The @see:FlexGrid control or @see:GridPanel to investigate.
             * @param pt The @see:Point object in page coordinates to investigate.
             */
            function HitTestInfo(grid, pt) {
                this._row = -1;
                this._col = -1;
                this._edge = 0; // left, top, right, bottom: 1, 2, 4, 8
                var g;
                // check parameters
                if (grid instanceof grid_1.FlexGrid) {
                    g = this._g = grid;
                }
                else if (grid instanceof grid_1.GridPanel) {
                    this._p = grid;
                    g = this._g = this._p.grid;
                }
                else {
                    throw 'First parameter should be a FlexGrid or GridPanel.';
                }
                pt = wijmo.mouseToPage(pt);
                this._pt = pt.clone();
                // get the variables we need
                var rc = g.controlRect, sz = g._szClient, tlp = g.topLeftCells, etl = g._eTL, hdrVis = g.headersVisibility, hve = grid_1.HeadersVisibility, tlWid = (hdrVis & hve.Row) ? tlp.columns.getTotalSize() : 0, tlHei = (hdrVis & hve.Column) ? tlp.rows.getTotalSize() : 0, tlHeiSticky = (hdrVis & hve.Column) ? tlHei + etl.offsetTop : 0, ebl = g._eBL, blHei = ebl.offsetHeight;
                // convert page to control coordinates (TFS 229880)
                //pt.x = Math.max(0, pt.x - rc.left);
                //pt.y = Math.max(0, pt.y - rc.top);
                pt.x -= rc.left;
                pt.y -= rc.top;
                // account for right to left
                if (this._g.rightToLeft) {
                    pt.x = rc.width - pt.x;
                }
                // find out which panel was clicked
                if (!this._p &&
                    pt.x >= 0 && pt.y >= etl.offsetTop &&
                    sz && pt.x <= sz.width + tlWid && pt.y <= sz.height + tlHeiSticky) {
                    if (pt.y <= tlHeiSticky) {
                        this._p = pt.x <= tlWid ? g.topLeftCells : g.columnHeaders;
                    }
                    else if (pt.y <= ebl.offsetTop) {
                        this._p = pt.x <= tlWid ? g.rowHeaders : g.cells;
                    }
                    else {
                        this._p = pt.x <= tlWid ? g.bottomLeftCells : g.columnFooters;
                    }
                }
                // if we have a panel, get the coordinates
                if (this._p != null) {
                    // account for frozen rows/cols
                    var rows = this._p.rows, cols = this._p.columns, ct = this._p.cellType, cte = grid_1.CellType, ptFrz = this._p._getFrozenPos(), totHei = (ct == cte.TopLeft || ct == cte.ColumnHeader) ? tlHei :
                        (ct == cte.BottomLeft || ct == cte.ColumnFooter) ? blHei :
                            rows.getTotalSize(), totWid = (ct == cte.TopLeft || ct == cte.BottomLeft || ct == cte.RowHeader) ? tlWid :
                        cols.getTotalSize();
                    // adjust y for scrolling/freezing
                    if (ct == cte.RowHeader || ct == cte.Cell) {
                        pt.y -= tlHei; // discount header height without 'stickiness'
                        if (pt.y > ptFrz.y || ptFrz.y <= 0) {
                            pt.y -= g._ptScrl.y;
                            pt.y += this._p._getOffsetY(); // account for IE's CSS limitations...
                        }
                    }
                    else if (ct == cte.BottomLeft || ct == cte.ColumnFooter) {
                        pt.y -= ebl.offsetTop;
                    }
                    // adjust x for scrolling/freezing
                    if (ct == cte.ColumnHeader || ct == cte.Cell || ct == cte.ColumnFooter) {
                        pt.x -= tlWid;
                        if (pt.x > ptFrz.x || ptFrz.x <= 0) {
                            pt.x -= g._ptScrl.x;
                        }
                    }
                    // enable mouse operations while in "sticky" mode
                    if (ct == cte.ColumnHeader || ct == cte.TopLeft) {
                        pt.y -= (tlHeiSticky - tlHei);
                    }
                    // get row and column
                    this._row = pt.y > totHei ? -1 : rows.getItemAt(pt.y);
                    this._col = pt.x > totWid ? -1 : cols.getItemAt(pt.x);
                    if (this._row < 0 || this._col < 0) {
                        this._p = null;
                        return;
                    }
                    // get edges (larger if touching)
                    this._edge = 0;
                    var szEdge = HitTestInfo._SZEDGE[this._g.isTouching ? 1 : 0];
                    if (this._col > -1) {
                        var col = cols[this._col];
                        if (pt.x - col.pos <= szEdge) {
                            this._edge |= 1; // left
                        }
                        if (col.pos + col.renderSize - pt.x <= szEdge) {
                            this._edge |= 4; // right
                        }
                    }
                    if (this._row > -1) {
                        var row = rows[this._row];
                        if (pt.y - row.pos <= szEdge) {
                            this._edge |= 2; // top
                        }
                        if (row.pos + row.renderSize - pt.y <= szEdge) {
                            this._edge |= 8; // bottom
                        }
                    }
                }
            }
            Object.defineProperty(HitTestInfo.prototype, "point", {
                /**
                 * Gets the point in control coordinates that this @see:wijmo.grid.HitTestInfo refers to.
                 */
                get: function () {
                    return this._pt;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HitTestInfo.prototype, "cellType", {
                /**
                 * Gets the cell type at the specified position.
                 */
                get: function () {
                    return this._p ? this._p.cellType : grid.CellType.None;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HitTestInfo.prototype, "panel", {
                /**
                 * Gets the grid panel at the specified position.
                 */
                get: function () {
                    return this._p;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HitTestInfo.prototype, "row", {
                /**
                 * Gets the row index of the cell at the specified position.
                 */
                get: function () {
                    return this._row;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HitTestInfo.prototype, "col", {
                /**
                 * Gets the column index of the cell at the specified position.
                 */
                get: function () {
                    return this._col;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HitTestInfo.prototype, "range", {
                /**
                 * Gets the cell range at the specified position.
                 */
                get: function () {
                    return new grid_1.CellRange(this._row, this._col);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HitTestInfo.prototype, "edgeLeft", {
                /**
                 * Gets a value that indicates whether the mouse is near the left edge of the cell.
                 */
                get: function () {
                    return (this._edge & 1) != 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HitTestInfo.prototype, "edgeTop", {
                /**
                 * Gets a value that indicates whether the mouse is near the top edge of the cell.
                 */
                get: function () {
                    return (this._edge & 2) != 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HitTestInfo.prototype, "edgeRight", {
                /**
                 * Gets a value that indicates whether the mouse is near the right edge of the cell.
                 */
                get: function () {
                    return (this._edge & 4) != 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HitTestInfo.prototype, "edgeBottom", {
                /**
                 * Gets a value that indicates whether the mouse is near the bottom edge of the cell.
                 */
                get: function () {
                    return (this._edge & 8) != 0;
                },
                enumerable: true,
                configurable: true
            });
            return HitTestInfo;
        }());
        HitTestInfo._SZEDGE = [5, 30]; // distance to cell border (mouse, touch)
        grid_1.HitTestInfo = HitTestInfo;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

var wijmo;
(function (wijmo) {
    var grid;
    (function (grid) {
        'use strict';
        /**
         * Specifies constants that define which areas of the grid support cell merging.
         */
        var AllowMerging;
        (function (AllowMerging) {
            /** No merging. */
            AllowMerging[AllowMerging["None"] = 0] = "None";
            /** Merge scrollable cells. */
            AllowMerging[AllowMerging["Cells"] = 1] = "Cells";
            /** Merge column headers. */
            AllowMerging[AllowMerging["ColumnHeaders"] = 2] = "ColumnHeaders";
            /** Merge row headers. */
            AllowMerging[AllowMerging["RowHeaders"] = 4] = "RowHeaders";
            /** Merge column and row headers. */
            AllowMerging[AllowMerging["AllHeaders"] = 6] = "AllHeaders";
            /** Merge all areas. */
            AllowMerging[AllowMerging["All"] = 7] = "All";
        })(AllowMerging = grid.AllowMerging || (grid.AllowMerging = {}));
        /**
         * Defines the @see:FlexGrid's cell merging behavior.
         *
         * An instance of this class is automatically created and assigned to
         * the grid's @see:FlexGrid.mergeManager property to implement the
         * grid's default merging behavior.
         *
         * If you want to customize the default merging behavior, create a class
         * that derives from @see:MergeManager and override the @see:getMergedRange
         * method.
         */
        var MergeManager = (function () {
            /**
             * Initializes a new instance of the @see:MergeManager class.
             *
             * @param g The @see:FlexGrid object that owns this @see:MergeManager.
             */
            function MergeManager(g) {
                this._g = g;
            }
            /**
             * Gets a @see:CellRange that specifies the merged extent of a cell
             * in a @see:GridPanel.
             *
             * @param p The @see:GridPanel that contains the range.
             * @param r The index of the row that contains the cell.
             * @param c The index of the column that contains the cell.
             * @param clip Whether to clip the merged range to the grid's current view range.
             * @return A @see:CellRange that specifies the merged range, or null if the cell is not merged.
             */
            MergeManager.prototype.getMergedRange = function (p, r, c, clip) {
                if (clip === void 0) { clip = true; }
                var rng, vr, ct = p.cellType, cols = p.columns, rows = p.rows, row = rows[r], col = cols[c];
                // no merging in new row template (TFS 82235)
                if (row instanceof grid._NewRowTemplate) {
                    return null;
                }
                // merge cells in group rows
                if (row instanceof grid.GroupRow && row.dataItem instanceof wijmo.collections.CollectionViewGroup) {
                    rng = new grid.CellRange(r, c);
                    // expand left and right preserving aggregates
                    if (col.aggregate == wijmo.Aggregate.None) {
                        while (rng.col > 0 &&
                            cols[rng.col - 1].aggregate == wijmo.Aggregate.None &&
                            rng.col != cols.frozen) {
                            rng.col--;
                        }
                        while (rng.col2 < cols.length - 1 &&
                            cols[rng.col2 + 1].aggregate == wijmo.Aggregate.None &&
                            rng.col2 + 1 != cols.frozen) {
                            rng.col2++;
                        }
                    }
                    // don't start range with invisible columns
                    while (rng.col < c && !cols[rng.col].visible) {
                        rng.col++;
                    }
                    // return merged range
                    return rng.isSingleCell ? null : rng;
                }
                // honor grid's allowMerging setting
                var done = false;
                switch (this._g.allowMerging) {
                    case AllowMerging.None:
                        done = true;
                        break;
                    case AllowMerging.Cells:
                        done = ct != grid.CellType.Cell;
                        break;
                    case AllowMerging.ColumnHeaders:
                        done = ct != grid.CellType.ColumnHeader && ct != grid.CellType.TopLeft;
                        break;
                    case AllowMerging.RowHeaders:
                        done = ct != grid.CellType.RowHeader && ct != grid.CellType.TopLeft;
                        break;
                    case AllowMerging.AllHeaders:
                        done = ct == grid.CellType.Cell;
                        break;
                }
                if (done) {
                    return null;
                }
                // merge up and down columns
                if (cols[c].allowMerging) {
                    rng = new grid.CellRange(r, c);
                    // clip to current viewport
                    var rMin = 0, rMax = rows.length - 1;
                    if (r >= rows.frozen) {
                        if (clip && (ct == grid.CellType.Cell || ct == grid.CellType.RowHeader)) {
                            vr = p._getViewRange();
                            rMin = vr.topRow;
                            rMax = vr.bottomRow;
                        }
                    }
                    else {
                        rMax = rows.frozen - 1;
                    }
                    // expand up and down
                    for (var tr = r - 1; tr >= rMin && this._mergeCell(p, tr, c, r, c); tr--) {
                        rng.row = tr;
                    }
                    for (var br = r + 1; br <= rMax && this._mergeCell(p, r, c, br, c); br++) {
                        rng.row2 = br;
                    }
                    // don't start range with invisible rows
                    while (rng.row < r && !rows[rng.row].visible) {
                        rng.row++;
                    }
                    // done
                    if (!rng.isSingleCell) {
                        return rng;
                    }
                }
                // merge left and right along rows
                if (rows[r].allowMerging) {
                    rng = new grid.CellRange(r, c);
                    // get merging limits
                    var cMin = 0, cMax = cols.length - 1;
                    if (c >= cols.frozen) {
                        if (clip && (ct == grid.CellType.Cell || ct == grid.CellType.ColumnHeader)) {
                            vr = p._getViewRange();
                            cMin = vr.leftCol;
                            cMax = vr.rightCol;
                        }
                    }
                    else {
                        cMax = cols.frozen - 1;
                    }
                    // expand left and right
                    for (var cl = c - 1; cl >= cMin && this._mergeCell(p, r, cl, r, c); cl--) {
                        rng.col = cl;
                    }
                    for (var cr = c + 1; cr <= cMax && this._mergeCell(p, r, c, r, cr); cr++) {
                        rng.col2 = cr;
                    }
                    // don't start range with invisible columns
                    while (rng.col < c && !cols[rng.col].visible) {
                        rng.col++;
                    }
                    // done
                    if (!rng.isSingleCell) {
                        return rng;
                    }
                }
                // no merging...
                return null;
            };
            // check whether two cells should be merged
            MergeManager.prototype._mergeCell = function (p, r1, c1, r2, c2) {
                // group rows and new row templates are handled separately
                var row1 = p.rows[r1], row2 = p.rows[r2];
                if (row1 instanceof grid.GroupRow || row1 instanceof grid._NewRowTemplate ||
                    row2 instanceof grid.GroupRow || row2 instanceof grid._NewRowTemplate) {
                    return false;
                }
                // no merging across freezing boundaries
                if (r1 != r2 && p.rows.isFrozen(r1) != p.rows.isFrozen(r2)) {
                    return false;
                }
                if (c1 != c2 && p.columns.isFrozen(c1) != p.columns.isFrozen(c2)) {
                    return false;
                }
                // no vertical merging if the range is already merged horizontally
                if (r1 != r2) {
                    if (c1 > 0) {
                        if ((row1.allowMerging && this._mergeCell(p, r1, c1 - 1, r1, c1)) ||
                            (row2.allowMerging && this._mergeCell(p, r2, c1 - 1, r2, c1))) {
                            return false;
                        }
                    }
                    if (c2 < p.columns.length - 1) {
                        if ((row1.allowMerging && this._mergeCell(p, r1, c2, r1, c2 + 1)) ||
                            (row2.allowMerging && this._mergeCell(p, r2, c2, r2, c2 + 1))) {
                            return false;
                        }
                    }
                }
                // no merging if the data is different
                if (p.getCellData(r1, c1, true) != p.getCellData(r2, c2, true)) {
                    return false;
                }
                // OK to merge
                return true;
            };
            return MergeManager;
        }());
        grid.MergeManager = MergeManager;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

var wijmo;
(function (wijmo) {
    var grid;
    (function (grid) {
        'use strict';
        /**
         * Represents a data map for use with a column's @see:Column.dataMap property.
         *
         * Data maps provide the grid with automatic look up capabilities. For example,
         * you may want to display a customer name instead of his ID, or a color name
         * instead of its RGB value.
         *
         * The code below binds a grid to a collection of products, then assigns a
         * @see:DataMap to the grid's 'CategoryID' column so the grid displays the
         * category names rather than the raw IDs.
         *
         * The grid takes advantage of data maps also for editing. If the <b>wijmo.input</b>
         * module is loaded, then when editing data-mapped columns the grid will show
         * a drop-down list containing the values on the map.
         *
         * <pre>
         * // bind grid to products
         * var flex = new wijmo.grid.FlexGrid();
         * flex.itemsSource = products;
         * // map CategoryID column to show category name instead of ID
         * var col = flex.columns.getColumn('CategoryID');
         * col.dataMap = new wijmo.grid.DataMap(categories, 'CategoryID', 'CategoryName');
         * </pre>
         *
         * In general, data maps apply to whole columns. However, there are situations
         * where you may want to restrict the options available for a cell based on a
         * value on a different column. For example, if you have "Country" and "City"
         * columns, you will probably want to restrict the cities based on the current
         * country.
         *
         * There are two ways you can implement these "dynamic" data maps:
         *
         * <ol>
         *   <li>
         *     If the @see:DataMap is just a list of strings, you can change it before
         *     the grid enters edit mode. In this case, the cells contain the string
         *     being displayed, and changing the map won't affect other cells in the
         *     same column.
         *     This fiddle demonstrates:
         *     <a href="http://jsfiddle.net/Wijmo5/8brL80r8/">show me</a>.
         *   </li>
         *   <li>
         *     If the @see:DataMap is a real map (stores key values in the cells, shows
         *     a corresponding string), then you can apply a filter to restrict the
         *     values shown in the drop-down. The @see:DataMap will still contain the
         *     same keys and values, so other cells in the same column won't be disturbed
         *     by the filter.
         *     This fiddle demonstrates:
         *     <a href="http://jsfiddle.net/Wijmo5/xborLd4t/">show me</a>.
         *   </li>
         * </ol>
         *
         * In some cases, you may want to create a @see:DataMap to represent an enumeration.
         * This can be done with the following code:
         *
         * <pre>// build a DataMap for a given enum
         *  function getDataMap(enumClass) {
         *      var pairs = [];
         *      for (var key in enumClass) {
         *          var val = parseInt(key);
         *          if (!isNaN(val)) {
         *              pairs.push({ key: val, name: enumClass[val] });
         *          }
         *      }
         *      return new wijmo.grid.DataMap(pairs, 'key', 'name');
         * }</pre>
         */
        var DataMap = (function () {
            /**
             * Initializes a new instance of the @see:DataMap class.
             *
             * @param itemsSource An array or @see:ICollectionView that contains the items to map.
             * @param selectedValuePath The name of the property that contains the keys (data values).
             * @param displayMemberPath The name of the property to use as the visual representation of the items.
             */
            function DataMap(itemsSource, selectedValuePath, displayMemberPath) {
                /**
                 * Occurs when the map data changes.
                 */
                this.mapChanged = new wijmo.Event();
                // turn arrays into real maps
                if (wijmo.isArray(itemsSource) && !selectedValuePath && !displayMemberPath) {
                    var arr = [];
                    for (var i = 0; i < itemsSource.length; i++) {
                        arr.push({ value: itemsSource[i] });
                    }
                    itemsSource = arr;
                    selectedValuePath = displayMemberPath = 'value';
                }
                // initialize map
                this._cv = wijmo.asCollectionView(itemsSource);
                this._keyPath = wijmo.asString(selectedValuePath, false);
                this._displayPath = wijmo.asString(displayMemberPath, false);
                // notify listeners when the map changes
                this._cv.collectionChanged.addHandler(this.onMapChanged, this);
            }
            Object.defineProperty(DataMap.prototype, "sortByDisplayValues", {
                /**
                 * Gets or sets a value that determines whether to use mapped (display)
                 * or raw values when sorting the data.
                 */
                get: function () {
                    return this._sortByKey != true;
                },
                set: function (value) {
                    this._sortByKey = !wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataMap.prototype, "collectionView", {
                /**
                 * Gets the @see:ICollectionView object that contains the map data.
                 */
                get: function () {
                    return this._cv;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataMap.prototype, "selectedValuePath", {
                /**
                 * Gets the name of the property to use as a key for the item (data value).
                 */
                get: function () {
                    return this._keyPath;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataMap.prototype, "displayMemberPath", {
                /**
                 * Gets the name of the property to use as the visual representation of the item.
                 */
                get: function () {
                    return this._displayPath;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Gets the key that corresponds to a given display value.
             *
             * @param displayValue The display value of the item to retrieve.
             */
            DataMap.prototype.getKeyValue = function (displayValue) {
                var index = this._indexOf(displayValue, this._displayPath, false);
                return index > -1 ? this._cv.sourceCollection[index][this._keyPath] : null;
            };
            /**
             * Gets the display value that corresponds to a given key.
             *
             * @param key The key of the item to retrieve.
             */
            DataMap.prototype.getDisplayValue = function (key) {
                if (!this._hash) {
                    this._hash = {};
                    var arr = this._cv.sourceCollection;
                    if (arr && this._keyPath && this._displayPath) {
                        for (var i = arr.length - 1; i >= 0; i--) {
                            var item = arr[i], k = item[this._keyPath], v = item[this._displayPath];
                            this._hash[k] = v;
                        }
                    }
                }
                var value = this._hash[key];
                return value != null ? value : key;
                // old version: slow sequential lookup, orders of magnitude slower than hash
                //var index = this._indexOf(key, this._keyPath, true);
                //return index > -1 ? this._cv.sourceCollection[index][this._displayPath] : key;
            };
            /**
             * Gets an array with all of the display values on the map.
             *
             * @param dataItem Data item for which to get the display items.
             * This parameter is optional. If not provided, all possible display
             * values should be returned.
             */
            DataMap.prototype.getDisplayValues = function (dataItem) {
                var values = [];
                if (this._cv && this._displayPath) {
                    var items = this._cv.items; // << list filtered/sorted values
                    for (var i = 0; i < items.length; i++) {
                        values.push(items[i][this._displayPath]);
                    }
                }
                return values;
            };
            /**
             * Gets an array with all of the keys on the map.
             */
            DataMap.prototype.getKeyValues = function () {
                var values = [];
                if (this._cv && this._keyPath) {
                    var items = this._cv.items; // << list filtered/sorted values
                    for (var i = 0; i < items.length; i++) {
                        values.push(items[i][this._keyPath]);
                    }
                }
                return values;
            };
            Object.defineProperty(DataMap.prototype, "isEditable", {
                /**
                 * Gets or sets a value that indicates whether users should be allowed to enter
                 * values that are not present on the @see:DataMap.
                 *
                 * In order for a @see:DataMap to be editable, the @see:selectedValuePath and
                 * @see:displayMemberPath must be set to the same value.
                 */
                get: function () {
                    return this._editable;
                },
                set: function (value) {
                    this._editable = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Raises the @see:mapChanged event.
             */
            DataMap.prototype.onMapChanged = function (e) {
                this._hash = null;
                this.mapChanged.raise(this, e);
            };
            // implementation
            // gets the index of a value in the sourceCollection (not the view)
            // if the value appears multiple times, returns the first that is not
            // filtered out of view
            DataMap.prototype._indexOf = function (value, path, caseSensitive) {
                var index = -1, firstMatch = -1;
                if (this._cv && path) {
                    var sval = value != null ? value.toString() : '', lcval = caseSensitive ? sval : sval.toLowerCase();
                    // look for items
                    var items = this._cv.sourceCollection;
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i], val = item[path];
                        // straight comparinson
                        if (val == value) {
                            index = i;
                        }
                        else if (!caseSensitive && val.length == lcval.length && val.toLowerCase() == lcval) {
                            index = i;
                        }
                        else if (val != null && val.toString() == sval) {
                            index = i;
                        }
                        // if this is a match and the item passes the filter, we're done
                        if (index == i) {
                            if (!this._cv.filter || this._cv.filter(item)) {
                                return index;
                            }
                            else if (firstMatch < 0) {
                                firstMatch = index;
                            }
                        }
                    }
                }
                // return the first match we found (in sourceCollection but filtered out of view)
                return firstMatch;
            };
            return DataMap;
        }());
        grid.DataMap = DataMap;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

var wijmo;
(function (wijmo) {
    var grid;
    (function (grid) {
        'use strict';
        /**
         * Specifies constants that define the selection behavior.
         */
        var SelectionMode;
        (function (SelectionMode) {
            /** The user cannot select cells using the mouse or keyboard. */
            SelectionMode[SelectionMode["None"] = 0] = "None";
            /** The user can select only a single cell at a time. */
            SelectionMode[SelectionMode["Cell"] = 1] = "Cell";
            /** The user can select contiguous blocks of cells. */
            SelectionMode[SelectionMode["CellRange"] = 2] = "CellRange";
            /** The user can select a single row at a time. */
            SelectionMode[SelectionMode["Row"] = 3] = "Row";
            /** The user can select contiguous rows. */
            SelectionMode[SelectionMode["RowRange"] = 4] = "RowRange";
            /** The user can select non-contiguous rows. */
            SelectionMode[SelectionMode["ListBox"] = 5] = "ListBox";
        })(SelectionMode = grid.SelectionMode || (grid.SelectionMode = {}));
        /**
         * Specifies constants that represent the selected state of a cell.
         */
        var SelectedState;
        (function (SelectedState) {
            /** The cell is not selected. */
            SelectedState[SelectedState["None"] = 0] = "None";
            /** The cell is selected but is not the active cell. */
            SelectedState[SelectedState["Selected"] = 1] = "Selected";
            /** The cell is selected and is the active cell. */
            SelectedState[SelectedState["Cursor"] = 2] = "Cursor";
        })(SelectedState = grid.SelectedState || (grid.SelectedState = {}));
        /**
         * Specifies constants that represent a type of movement for the selection.
         */
        var SelMove;
        (function (SelMove) {
            /** Do not change the selection. */
            SelMove[SelMove["None"] = 0] = "None";
            /** Select the next visible cell. */
            SelMove[SelMove["Next"] = 1] = "Next";
            /** Select the previous visible cell. */
            SelMove[SelMove["Prev"] = 2] = "Prev";
            /** Select the first visible cell in the next page. */
            SelMove[SelMove["NextPage"] = 3] = "NextPage";
            /** Select the first visible cell in the previous page. */
            SelMove[SelMove["PrevPage"] = 4] = "PrevPage";
            /** Select the first visible cell. */
            SelMove[SelMove["Home"] = 5] = "Home";
            /** Select the last visible cell. */
            SelMove[SelMove["End"] = 6] = "End";
            /** Select the next visible cell skipping rows if necessary. */
            SelMove[SelMove["NextCell"] = 7] = "NextCell";
            /** Select the previous visible cell skipping rows if necessary. */
            SelMove[SelMove["PrevCell"] = 8] = "PrevCell";
        })(SelMove = grid.SelMove || (grid.SelMove = {}));
        /**
         * Handles the grid's selection.
         */
        var _SelectionHandler = (function () {
            /**
             * Initializes a new instance of the @see:_SelectionHandler class.
             *
             * @param g @see:FlexGrid that owns this @see:_SelectionHandler.
             */
            function _SelectionHandler(g) {
                this._sel = new grid.CellRange(0, 0);
                this._mode = SelectionMode.CellRange;
                this._g = g;
            }
            Object.defineProperty(_SelectionHandler.prototype, "selectionMode", {
                /**
                 * Gets or sets the current selection mode.
                 */
                get: function () {
                    return this._mode;
                },
                set: function (value) {
                    if (value != this._mode) {
                        // update ListBox selection when switching modes
                        if (value == SelectionMode.ListBox || this._mode == SelectionMode.ListBox) {
                            var rows = this._g.rows;
                            for (var i = 0; i < rows.length; i++) {
                                var row = rows[i], sel = (value == SelectionMode.ListBox) ? this._sel.containsRow(i) : false;
                                row._setFlag(grid.RowColFlags.Selected, sel, true);
                            }
                        }
                        // collapse selection when switching to None/Cell/Row modes (TFS 130691)
                        switch (value) {
                            case SelectionMode.None:
                                this._sel.setRange(-1, -1);
                                break;
                            case SelectionMode.Cell:
                                this._sel.row2 = this._sel.row;
                                this._sel.col2 = this._sel.col;
                                break;
                            case SelectionMode.Row:
                                this._sel.row2 = this._sel.row;
                                break;
                        }
                        // apply new mode
                        this._mode = value;
                        this._g.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(_SelectionHandler.prototype, "selection", {
                /**
                 * Gets or sets the current selection.
                 */
                get: function () {
                    return this._sel;
                },
                set: function (value) {
                    this.select(value);
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Selects a cell range and optionally scrolls it into view.
             *
             * @param rng Range to select.
             * @param show Whether to scroll the new selection into view.
             */
            _SelectionHandler.prototype.select = function (rng, show) {
                if (show === void 0) { show = true; }
                // allow passing in row and column indices
                if (wijmo.isNumber(rng) && wijmo.isNumber(show)) {
                    rng = new grid.CellRange(rng, show);
                    show = true;
                }
                rng = wijmo.asType(rng, grid.CellRange);
                // get old and new selections
                var g = this._g, oldSel = this._sel, newSel = rng, lbMode = false;
                // adjust for selection mode
                switch (g.selectionMode) {
                    // Cell mode: collapse range into single cell
                    case SelectionMode.Cell:
                        rng.row2 = rng.row;
                        rng.col2 = rng.col;
                        break;
                    // Row mode: collapse range into single row
                    case SelectionMode.Row:
                        rng.row2 = rng.row;
                        break;
                    // ListBox mode: remember because handling is quite different
                    case SelectionMode.ListBox:
                        lbMode = true;
                        break;
                }
                // check if the selection really is changing
                // (special handling for ListBox mode when re-selecting items)
                var noChange = newSel.equals(oldSel);
                if (lbMode && newSel.row > -1 && !g.rows[newSel.row].isSelected) {
                    noChange = false;
                }
                // no change? done
                if (noChange) {
                    if (show) {
                        g.scrollIntoView(newSel.row, newSel.col);
                    }
                    return;
                }
                // raise selectionChanging event
                var e = new grid.CellRangeEventArgs(g.cells, newSel);
                if (!g.onSelectionChanging(e)) {
                    return;
                }
                // ListBox mode: update Selected flag and refresh to show changes
                // (after firing the selectionChanging cancelable event)
                if (lbMode) {
                    for (var i = 0; i < g.rows.length; i++) {
                        g.rows[i]._setFlag(grid.RowColFlags.Selected, newSel.containsRow(i), true);
                    }
                    g.refreshCells(false, true, true);
                }
                // validate selection after the change
                newSel.row = Math.min(newSel.row, g.rows.length - 1);
                newSel.row2 = Math.min(newSel.row2, g.rows.length - 1);
                // update selection
                this._sel = newSel;
                // show the new selection
                g.refreshCells(false, true, true);
                if (show) {
                    g.scrollIntoView(newSel.row, newSel.col);
                }
                // update collectionView cursor
                if (g.collectionView) {
                    var index = g._getCvIndex(newSel.row);
                    g.collectionView.moveCurrentToPosition(index);
                }
                // raise selectionChanged event
                g.onSelectionChanged(e);
            };
            /**
             * Moves the selection by a specified amount in the vertical and horizontal directions.
             * @param rowMove How to move the row selection.
             * @param colMove How to move the column selection.
             * @param extend Whether to extend the current selection or start a new one.
             */
            _SelectionHandler.prototype.moveSelection = function (rowMove, colMove, extend) {
                var row, col, g = this._g, rows = g.rows, cols = g.columns, rng = this._getReferenceCell(rowMove, colMove, extend), pageSize = Math.max(0, g._szClient.height - g.columnHeaders.height);
                // handle next cell with wrapping
                if (colMove == SelMove.NextCell) {
                    col = cols.getNextCell(rng.col, SelMove.Next, pageSize);
                    row = rng.row;
                    if (col == rng.col) {
                        row = rows.getNextCell(row, SelMove.Next, pageSize);
                        if (row > rng.row) {
                            col = cols.getNextCell(0, SelMove.Next, pageSize);
                            col = cols.getNextCell(col, SelMove.Prev, pageSize);
                        }
                    }
                    g.select(row, col);
                }
                else if (colMove == SelMove.PrevCell) {
                    col = cols.getNextCell(rng.col, SelMove.Prev, pageSize);
                    row = rng.row;
                    if (col == rng.col) {
                        row = rows.getNextCell(row, SelMove.Prev, pageSize);
                        if (row < rng.row) {
                            col = cols.getNextCell(cols.length - 1, SelMove.Prev, pageSize);
                            col = cols.getNextCell(col, SelMove.Next, pageSize);
                        }
                    }
                    g.select(row, col);
                }
                else {
                    // get target row, column
                    row = rows.getNextCell(rng.row, rowMove, pageSize);
                    col = cols.getNextCell(rng.col, colMove, pageSize);
                    // extend or select
                    if (extend) {
                        var sel = g._selHdl._sel;
                        g.select(new grid.CellRange(row, col, sel.row2, sel.col2));
                    }
                    else {
                        g.select(row, col);
                    }
                }
            };
            // get reference cell for selection change, taking merging into account
            _SelectionHandler.prototype._getReferenceCell = function (rowMove, colMove, extend) {
                var g = this._g, sel = g._selHdl._sel, rng = g.getMergedRange(g.cells, sel.row, sel.col);
                // not merging? use selection as a reference
                if (!rng || rng.isSingleCell) {
                    return sel;
                }
                // clone range and set reference cell within the range
                rng = rng.clone();
                switch (rowMove) {
                    case SelMove.Next:
                    case SelMove.NextCell:
                        rng.row = rng.bottomRow;
                        break;
                    case SelMove.None:
                        rng.row = sel.row;
                        break;
                }
                switch (colMove) {
                    case SelMove.Next:
                    case SelMove.NextCell:
                        rng.col = rng.rightCol;
                        break;
                    case SelMove.None:
                        rng.col = sel.col;
                        break;
                }
                // done
                return rng;
            };
            // adjusts a selection to reflect the current selection mode
            /*private*/ _SelectionHandler.prototype._adjustSelection = function (rng) {
                switch (this._mode) {
                    case SelectionMode.Cell:
                        return new grid.CellRange(rng.row, rng.col, rng.row, rng.col);
                    case SelectionMode.Row:
                        return new grid.CellRange(rng.row, 0, rng.row, this._g.columns.length - 1);
                    case SelectionMode.RowRange:
                    case SelectionMode.ListBox:
                        return new grid.CellRange(rng.row, 0, rng.row2, this._g.columns.length - 1);
                }
                return rng;
            };
            return _SelectionHandler;
        }());
        grid._SelectionHandler = _SelectionHandler;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

var wijmo;
(function (wijmo) {
    var grid;
    (function (grid) {
        'use strict';
        /**
         * Handles the grid's keyboard commands.
         */
        var _KeyboardHandler = (function () {
            /**
             * Initializes a new instance of the @see:_KeyboardHandler class.
             *
             * @param g @see:FlexGrid that owns this @see:_KeyboardHandler.
             */
            function _KeyboardHandler(g) {
                this._g = g;
                g.addEventListener(g.hostElement, 'keypress', this._keypress.bind(this));
                g.addEventListener(g.hostElement, 'keydown', this._keydown.bind(this));
            }
            // handles the key down event (selection)
            /*private*/ _KeyboardHandler.prototype._keydown = function (e) {
                var g = this._g, sel = g.selection, ctrl = e.ctrlKey || e.metaKey, shift = e.shiftKey, target = e.target, handled = true;
                if (g.isRangeValid(sel) && !e.defaultPrevented) {
                    // allow input elements that don't belong to us to handle keys (TFS 131138, 191989)
                    if (g._wantsInput(e.target)) {
                        return;
                    }
                    // pre-process keys while editor is active
                    if (g.activeEditor && g._edtHdl._keydown(e)) {
                        return;
                    }
                    // get the variables we need
                    var gr = wijmo.tryCast(g.rows[sel.row], grid.GroupRow), ecv = wijmo.tryCast(g.collectionView, 'IEditableCollectionView'), keyCode = e.keyCode;
                    // handle clipboard
                    if (g.autoClipboard) {
                        // copy: ctrl+c or ctrl+Insert
                        if (ctrl && (keyCode == 67 || keyCode == 45)) {
                            var args = new grid.CellRangeEventArgs(g.cells, sel);
                            if (g.onCopying(args)) {
                                var text = g.getClipString() + '\r\n'; // TFS 228046
                                wijmo.Clipboard.copy(text);
                                g.onCopied(args);
                            }
                            e.stopPropagation();
                            return;
                        }
                        // paste: ctrl+v or shift+Insert
                        if ((ctrl && keyCode == 86) || (shift && keyCode == 45)) {
                            if (!g.isReadOnly) {
                                var args = new grid.CellRangeEventArgs(g.cells, sel);
                                if (g.onPasting(args)) {
                                    wijmo.Clipboard.paste(function (text) {
                                        g.setClipString(text);
                                        g.onPasted(args);
                                    });
                                }
                            }
                            e.stopPropagation();
                            return;
                        }
                    }
                    // reverse left/right keys when rendering in right-to-left
                    if (g.rightToLeft) {
                        switch (keyCode) {
                            case wijmo.Key.Left:
                                keyCode = wijmo.Key.Right;
                                break;
                            case wijmo.Key.Right:
                                keyCode = wijmo.Key.Left;
                                break;
                        }
                    }
                    // default key handling
                    var sm = grid.SelMove;
                    switch (keyCode) {
                        case 65:
                            if (ctrl) {
                                g.select(new grid.CellRange(0, 0, g.rows.length - 1, g.columns.length - 1));
                            }
                            else {
                                handled = false;
                            }
                            break;
                        case wijmo.Key.Left:
                            if (sel.isValid && sel.col == 0 && gr != null && !gr.isCollapsed && gr.hasChildren) {
                                gr.isCollapsed = true;
                            }
                            else {
                                this._moveSel(sm.None, ctrl ? sm.Home : sm.Prev, shift);
                            }
                            break;
                        case wijmo.Key.Right:
                            if (sel.isValid && sel.col == 0 && gr != null && gr.isCollapsed) {
                                gr.isCollapsed = false;
                            }
                            else {
                                this._moveSel(sm.None, ctrl ? sm.End : sm.Next, shift);
                            }
                            break;
                        case wijmo.Key.Up:
                            if (e.altKey && g._edtHdl._toggleListBox(e)) {
                                break;
                            }
                            this._moveSel(ctrl ? sm.Home : sm.Prev, sm.None, shift);
                            break;
                        case wijmo.Key.Down:
                            if (e.altKey && g._edtHdl._toggleListBox(e)) {
                                break;
                            }
                            this._moveSel(ctrl ? sm.End : sm.Next, sm.None, shift);
                            break;
                        case wijmo.Key.PageUp:
                            this._moveSel(sm.PrevPage, sm.None, shift);
                            break;
                        case wijmo.Key.PageDown:
                            this._moveSel(sm.NextPage, sm.None, shift);
                            break;
                        case wijmo.Key.Home:
                            this._moveSel(ctrl ? sm.Home : sm.None, sm.Home, shift);
                            break;
                        case wijmo.Key.End:
                            this._moveSel(ctrl ? sm.End : sm.None, sm.End, shift);
                            break;
                        case wijmo.Key.Tab:
                            this._moveSel(sm.None, shift ? sm.PrevCell : sm.NextCell, false);
                            break;
                        case wijmo.Key.Enter:
                            this._moveSel(shift ? sm.Prev : sm.Next, sm.None, false);
                            if (!shift && ecv && ecv.currentEditItem != null) {
                                g._edtHdl._commitRowEdits(); // in case we're at the last row (TFS 105989)
                            }
                            break;
                        case wijmo.Key.Escape:
                            handled = false;
                            if (ecv) {
                                if (ecv.currentAddItem || ecv.currentEditItem) {
                                    // fire rowEditEnding/Ended events with cancel set to true
                                    // the event handlers can use this to restore deep bindings
                                    var ee = new grid.CellRangeEventArgs(g.cells, g.selection);
                                    ee.cancel = true;
                                    g.onRowEditEnding(ee);
                                    if (ecv.currentAddItem) {
                                        ecv.cancelNew();
                                    }
                                    if (ecv.currentEditItem) {
                                        ecv.cancelEdit();
                                    }
                                    g.onRowEditEnded(ee);
                                    handled = true;
                                }
                            }
                            g._mouseHdl.resetMouseState();
                            break;
                        case wijmo.Key.Delete:
                        case wijmo.Key.Back:
                            handled = this._deleteSel(e);
                            break;
                        case wijmo.Key.F2:
                            handled = this._startEditing(true, e);
                            break;
                        case wijmo.Key.F4:
                            handled = g._edtHdl._toggleListBox(e);
                            break;
                        case wijmo.Key.Space:
                            handled = this._startEditing(true, e);
                            if (handled) {
                                setTimeout(function () {
                                    var edt = g.activeEditor;
                                    if (edt) {
                                        if (edt.type == 'checkbox') {
                                            edt.checked = !edt.checked;
                                            g.finishEditing();
                                        }
                                        else {
                                            wijmo.setSelectionRange(edt, edt.value.length);
                                        }
                                    }
                                });
                            }
                            break;
                        default:
                            handled = false;
                            break;
                    }
                    if (handled) {
                        g.focus(); // http://wijmo.com/topic/angular-2-focus-issue-with-wj-input-number-as-rendering-cell-of-flexgrid/
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            };
            // handles the key press event (start editing or try auto-complete)
            _KeyboardHandler.prototype._keypress = function (e) {
                // allow input elements that don't belong to us to handle keys (TFS 131138, 191989)
                var g = this._g;
                if (g._wantsInput(e.target)) {
                    return;
                }
                // forward key to editor (auto-complete) or handle ourselves
                if (g.activeEditor) {
                    g._edtHdl._keypress(e);
                }
                else if (e.charCode > wijmo.Key.Space) {
                    if (this._startEditing(false, e) && g.activeEditor) {
                        //setTimeout(() => { // TFS 250815
                        var edt = g.activeEditor;
                        if (edt && edt.type != 'checkbox') {
                            edt.value = String.fromCharCode(e.charCode); // Firefox needs this...
                            wijmo.setSelectionRange(edt, 1);
                            edt.dispatchEvent(g._edtHdl._evtInput); // to apply mask (TFS 131232)
                            g._edtHdl._keypress(e); // to start auto-complete
                        }
                        //}); // TFS 250815
                        e.preventDefault();
                    }
                }
                e.stopPropagation();
            };
            // move the selection
            _KeyboardHandler.prototype._moveSel = function (rowMove, colMove, extend) {
                if (this._g.selectionMode != grid.SelectionMode.None) {
                    this._g._selHdl.moveSelection(rowMove, colMove, extend);
                }
            };
            // delete the selected rows
            _KeyboardHandler.prototype._deleteSel = function (evt) {
                var g = this._g, ecv = wijmo.tryCast(g.collectionView, 'IEditableCollectionView'), sel = g.selection, rows = g.rows, selRows = [], rng = new grid.CellRange(), e = new grid.CellEditEndingEventArgs(g.cells, rng, evt);
                // if g.allowDelete and ecv.canRemove, and not editing/adding, (TFS 87718)
                // and the grid allows deleting items, then delete selected rows
                if (g.allowDelete && !g.isReadOnly &&
                    (ecv == null || (ecv.canRemove && !ecv.isAddingNew && !ecv.isEditingItem))) {
                    // get selected rows
                    switch (g.selectionMode) {
                        case grid.SelectionMode.CellRange:
                            if (sel.leftCol == 0 && sel.rightCol == g.columns.length - 1) {
                                for (var i = sel.topRow; i > -1 && i <= sel.bottomRow; i++) {
                                    selRows.push(rows[i]);
                                }
                            }
                            break;
                        case grid.SelectionMode.ListBox:
                            for (var i = 0; i < rows.length; i++) {
                                if (rows[i].isSelected) {
                                    selRows.push(rows[i]);
                                }
                            }
                            break;
                        case grid.SelectionMode.Row:
                            if (sel.topRow > -1) {
                                selRows.push(rows[sel.topRow]);
                            }
                            break;
                        case grid.SelectionMode.RowRange:
                            for (var i = sel.topRow; i > -1 && i <= sel.bottomRow; i++) {
                                selRows.push(rows[i]);
                            }
                            break;
                    }
                }
                // finish with row deletion
                if (selRows.length > 0) {
                    // begin updates
                    if (ecv)
                        ecv.beginUpdate();
                    g.beginUpdate();
                    // delete selected rows
                    for (var i = selRows.length - 1; i >= 0; i--) {
                        var r = selRows[i];
                        rng.setRange(r.index, -1);
                        if (g.onDeletingRow(e)) {
                            if (ecv && r.dataItem) {
                                ecv.remove(r.dataItem);
                            }
                            else {
                                g.rows.removeAt(r.index);
                            }
                            g.onDeletedRow(e);
                        }
                    }
                    // finish updates
                    g.endUpdate();
                    if (ecv)
                        ecv.endUpdate();
                    // make sure one row is selected in ListBox mode (TFS 82683)
                    if (g.selectionMode == grid.SelectionMode.ListBox) {
                        var index = g.selection.row;
                        if (index > -1 && index < g.rows.length) {
                            g.rows[index].isSelected = true;
                        }
                    }
                    // handle childItemsPath (TFS 87577)
                    if (g.childItemsPath && g.collectionView) {
                        g.collectionView.refresh();
                    }
                    // all done
                    return true;
                }
                // delete cell content (if there is any) (TFS 94178, 228047)
                if (!g.isReadOnly && selRows.length == 0) {
                    // begin updates
                    if (ecv)
                        ecv.beginUpdate();
                    g.beginUpdate();
                    // delete selected cells
                    for (var sr = sel.topRow; sr <= sel.bottomRow; sr++) {
                        for (var sc = sel.leftCol; sc <= sel.rightCol; sc++) {
                            var bcol = g._getBindingColumn(g.cells, sr, g.columns[sc]);
                            if (!bcol.getIsRequired() && !bcol.isReadOnly) {
                                if (g.getCellData(sr, sc, true)) {
                                    rng.setRange(sr, sc);
                                    e.cancel = false;
                                    if (g.onBeginningEdit(e)) {
                                        if (ecv) {
                                            ecv.editItem(g.rows[sr].dataItem);
                                            g._edtHdl._edItem = ecv.currentEditItem; // TFS 259115
                                        }
                                        g.setCellData(sr, sc, '', true, false); // TFS 118470
                                        g.onCellEditEnding(e);
                                        g.onCellEditEnded(e);
                                    }
                                }
                            }
                        }
                    }
                    // finish updates
                    if (ecv) {
                        ecv.endUpdate();
                    }
                    g.endUpdate();
                    // restore selection
                    g.selection = sel;
                    return true;
                }
                // no deletion
                return false;
            };
            // start editing and pass the event that caused the edit to start
            _KeyboardHandler.prototype._startEditing = function (fullEdit, evt, r, c) {
                return this._g._edtHdl.startEditing(fullEdit, r, c, true, evt);
            };
            return _KeyboardHandler;
        }());
        grid._KeyboardHandler = _KeyboardHandler;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

var wijmo;
(function (wijmo) {
    var grid;
    (function (grid) {
        'use strict';
        // allow resizing by dragging regular cells as well as headers
        var _AR_ALLCELLS = 4;
        /**
         * Specifies constants that define the row/column sizing behavior.
         */
        var AllowResizing;
        (function (AllowResizing) {
            /** The user may not resize rows or columns. */
            AllowResizing[AllowResizing["None"] = 0] = "None";
            /** The user may resize columns by dragging the edge of the column headers. */
            AllowResizing[AllowResizing["Columns"] = 1] = "Columns";
            /** The user may resize rows by dragging the edge of the row headers. */
            AllowResizing[AllowResizing["Rows"] = 2] = "Rows";
            /** The user may resize rows and columns by dragging the edge of the headers. */
            AllowResizing[AllowResizing["Both"] = 3] = "Both";
            /** The user may resize columns by dragging the edge of any cell. */
            AllowResizing[AllowResizing["ColumnsAllCells"] = AllowResizing.Columns | _AR_ALLCELLS] = "ColumnsAllCells";
            /** The user may resize rows by dragging the edge of any cell. */
            AllowResizing[AllowResizing["RowsAllCells"] = AllowResizing.Rows | _AR_ALLCELLS] = "RowsAllCells";
            /** The user may resize rows and columns by dragging the edge of any cell. */
            AllowResizing[AllowResizing["BothAllCells"] = AllowResizing.Both | _AR_ALLCELLS] = "BothAllCells"; // 7
        })(AllowResizing = grid.AllowResizing || (grid.AllowResizing = {}));
        /**
         * Specifies constants that define the row/column auto-sizing behavior.
         */
        var AutoSizeMode;
        (function (AutoSizeMode) {
            /** Autosizing is disabled. */
            AutoSizeMode[AutoSizeMode["None"] = 0] = "None";
            /** Autosizing accounts for header cells. */
            AutoSizeMode[AutoSizeMode["Headers"] = 1] = "Headers";
            /** Autosizing accounts for data cells. */
            AutoSizeMode[AutoSizeMode["Cells"] = 2] = "Cells";
            /** Autosizing accounts for header and data cells. */
            AutoSizeMode[AutoSizeMode["Both"] = 3] = "Both";
        })(AutoSizeMode = grid.AutoSizeMode || (grid.AutoSizeMode = {}));
        /**
         * Specifies constants that define the row/column dragging behavior.
         */
        var AllowDragging;
        (function (AllowDragging) {
            /** The user may not drag rows or columns. */
            AllowDragging[AllowDragging["None"] = 0] = "None";
            /** The user may drag columns. */
            AllowDragging[AllowDragging["Columns"] = 1] = "Columns";
            /** The user may drag rows. */
            AllowDragging[AllowDragging["Rows"] = 2] = "Rows";
            /** The user may drag rows and columns. */
            AllowDragging[AllowDragging["Both"] = 3] = "Both";
        })(AllowDragging = grid.AllowDragging || (grid.AllowDragging = {}));
        /**
         * Handles the grid's mouse commands.
         */
        var _MouseHandler = (function () {
            /**
             * Initializes a new instance of the @see:_MouseHandler class.
             *
             * @param g @see:FlexGrid that owns this @see:_MouseHandler.
             */
            function _MouseHandler(g) {
                var _this = this;
                var host = g.hostElement;
                this._g = g;
                // create target indicator element
                this._dvMarker = wijmo.createElement('<div class="wj-marker">&nbsp;</div>');
                // clear control bounds on mouse/drag enter to support hit-testing
                g.addEventListener(host, 'mouseenter', function () {
                    g._rcBounds = null;
                });
                g.addEventListener(host, 'dragenter', function () {
                    g._rcBounds = null;
                });
                // mouse events:
                // when the user presses the mouse on the control, hook up handlers to 
                // mouse move/up on the *document*, and unhook on mouse up.
                // this simulates a mouse capture (nice idea from ngGrid).
                // note: use 'document' and not 'window'; that doesn't work on Android.
                g.addEventListener(host, 'mousedown', function (e) {
                    // clear control bounds just in case
                    g._rcBounds = null;
                    // start actions on left button only: TFS 114623
                    if (!e.defaultPrevented && e.button == 0) {
                        // allow input elements that don't belong to us to handle the mouse
                        // but select the cell anyway, or scroll it into view if it's a header
                        var target = e.target;
                        if (!g.activeEditor && g._isInputElement(target)) {
                            // select/scroll if the target doesn't have the focus
                            // and if the target is not an OPTION element (Firefox only...)
                            if (wijmo.getActiveElement() != target && target.tagName != 'OPTION') {
                                var ht = g.hitTest(e);
                                switch (ht.cellType) {
                                    case grid.CellType.Cell:
                                        g.select(ht.range);
                                        break;
                                    case grid.CellType.ColumnHeader:
                                    case grid.CellType.ColumnFooter:
                                        g.scrollIntoView(-1, ht.col);
                                        break;
                                    case grid.CellType.RowHeader:
                                        g.scrollIntoView(ht.row, -1);
                                        break;
                                }
                            }
                            // and let the target handle the event
                            return;
                        }
                        // make sure the target does not belong to another nested grid: TFS 200695
                        if (wijmo.closest(e.target, '.wj-flexgrid') == g.hostElement && !_this._isDown) {
                            _this._isDown = true;
                            g.addEventListener(document, 'mousemove', mouseMove);
                            g.addEventListener(document, 'mouseup', mouseUp);
                            _this._mousedown(e);
                        }
                    }
                });
                var mouseMove = function (e) {
                    _this._mousemove(e);
                };
                var mouseUp = function (e) {
                    _this._isDown = false;
                    g.removeEventListener(document, 'mousemove');
                    g.removeEventListener(document, 'mouseup');
                    _this._mouseup(e);
                };
                // offer to resize on mousemove (pressing the button not required)
                g.addEventListener(host, 'mousemove', this._hover.bind(this));
                // double-click to auto-size rows/columns and to enter edit mode
                g.addEventListener(host, 'dblclick', this._dblclick.bind(this));
                // prevent user from selecting grid content (as text)
                g.addEventListener(host, 'selectstart', function (e) {
                    if (!g._isInputElement(e.target)) {
                        e.preventDefault();
                    }
                });
                // custom handling for wheel events (TFS 250507)
                g.addEventListener(host, 'wheel', function (e) {
                    var root = g.cells.hostElement.parentElement;
                    if (e.deltaY && !e.ctrlKey && !e.metaKey && root.scrollHeight > root.offsetHeight) {
                        if (wijmo.closest(e.target, '.wj-flexgrid') == g.hostElement) {
                            root.scrollTop += g.rows.defaultSize * (e.deltaY < 0 ? -1 : +1);
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                });
                // row and column dragging
                g.addEventListener(host, 'dragstart', this._dragstart.bind(this));
                g.addEventListener(host, 'dragover', this._dragover.bind(this));
                g.addEventListener(host, 'dragleave', this._dragover.bind(this));
                g.addEventListener(host, 'drop', this._drop.bind(this));
                g.addEventListener(host, 'dragend', this._dragend.bind(this));
            }
            /**
             * Resets the mouse state.
             */
            _MouseHandler.prototype.resetMouseState = function () {
                // because dragEnd fires too late in Firefox...
                if (this._dragSource) {
                    this._dragSource.style.opacity = null;
                }
                this._showDragMarker(null);
                // reset cursor state (if the grid hasn't been disposed)
                var host = this._g.hostElement;
                if (host) {
                    host.style.cursor = null;
                }
                // remove event listeners just in case
                var g = this._g;
                g.removeEventListener(document, 'mousemove');
                g.removeEventListener(document, 'mouseup');
                // reset everything else
                this._isDown = null;
                this._htDown = null;
                this._lbSelRows = null;
                this._szRowCol = null;
                this._szArgs = null;
                this._dragSource = null;
            };
            // handles the mouse down event
            _MouseHandler.prototype._mousedown = function (e) {
                var g = this._g;
                // get the element under the mouse
                var ht = g.hitTest(e), ct = ht.cellType;
                // if the user clicked an active editor, let the editor handle things
                if (ct == grid.CellType.Cell && g.editRange && g.editRange.contains(ht.range)) {
                    return;
                }
                // ignore clicks on focused input elements (TFS 135271)
                var ae = wijmo.getActiveElement();
                if (e.target == ae && g._isInputElement(e.target)) {
                    return;
                }
                // ignore clicks on unknown areas
                if (ct == grid.CellType.None) {
                    g._edtHdl._commitRowEdits(); // TFS 229996
                    return;
                }
                // unless the target has the focus, give it to the grid (TFS 81949, 102177, 120430)
                if (e.target != ae) {
                    g.focus();
                }
                // check where the mouse is
                this._htDown = ht;
                this._eMouse = e;
                // handle resizing
                if (this._szRowCol != null) {
                    this._handleResizing(e);
                    return;
                }
                // starting cell selection? special handling for ListBox mode
                switch (ct) {
                    case grid.CellType.Cell:
                        if (e.ctrlKey && g.selectionMode == grid.SelectionMode.ListBox) {
                            this._startListBoxSelection(ht.row);
                        }
                        this._mouseSelect(e, e.shiftKey);
                        break;
                    case grid.CellType.RowHeader:
                        if ((this._g.allowDragging & AllowDragging.Rows) == 0) {
                            if (e.ctrlKey && g.selectionMode == grid.SelectionMode.ListBox) {
                                this._startListBoxSelection(ht.row);
                            }
                            this._mouseSelect(e, e.shiftKey);
                        }
                        break;
                }
                // handle collapse/expand (after selecting the cell)
                if (ct == grid.CellType.Cell && g.rows.maxGroupLevel > -1) {
                    var gr = wijmo.tryCast(g.rows[ht.row], grid.GroupRow), icon = wijmo.closest(e.target, '.' + grid.CellFactory._WJC_COLLAPSE);
                    if (gr && icon) {
                        if (e.ctrlKey) {
                            // ctrl+click: collapse/expand entire outline to this level
                            g.collapseGroupsToLevel(gr.isCollapsed ? gr.level + 1 : gr.level);
                        }
                        else {
                            // simple click: toggle this group
                            gr.isCollapsed = !gr.isCollapsed;
                        }
                        // done with the mouse
                        this.resetMouseState();
                        e.preventDefault();
                        return;
                    }
                }
            };
            // handles the mouse move event
            _MouseHandler.prototype._mousemove = function (e) {
                if (this._htDown != null) {
                    // in case we lost the focus or the button (TFS 145149)
                    // note that e.buttons is not supported in Safari, and
                    // e.which only works correctly (like e.buttons) in Chrome.
                    if (e.buttons == 0) {
                        //console.log('lost the mouse?');
                        if (this._eMouse && (e.timeStamp - this._eMouse.timeStamp > 600)) {
                            //console.log('yes, resetting...: ' + (e.timeStamp - this._eMouse.timeStamp));
                            this.resetMouseState();
                            return;
                        }
                    }
                    // handle the event as usual
                    this._eMouse = e;
                    if (this._szRowCol) {
                        this._handleResizing(e);
                    }
                    else {
                        switch (this._htDown.cellType) {
                            case grid.CellType.Cell:
                                this._mouseSelect(e, true);
                                break;
                            case grid.CellType.RowHeader:
                                if ((this._g.allowDragging & AllowDragging.Rows) == 0) {
                                    this._mouseSelect(e, true);
                                }
                                break;
                        }
                    }
                }
            };
            // handles the mouse up event
            _MouseHandler.prototype._mouseup = function (e) {
                // IE raises mouseup while touch-dragging...???
                if (this._dragSource && this._g.isTouching) {
                    return;
                }
                // select all cells, finish resizing, sorting
                var htd = this._htDown;
                if (htd && htd.cellType == grid.CellType.TopLeft && !this._szArgs && !e.defaultPrevented) {
                    var g = this._g, ht = g.hitTest(e);
                    if (ht.panel == htd.panel && ht.row == htd.row && ht.col == htd.col) {
                        var rng = g.getMergedRange(htd.panel, htd.row, htd.col) || ht.range;
                        if (rng.row == 0 && rng.col == 0) {
                            g.select(new grid.CellRange(0, 0, g.rows.length - 1, g.columns.length - 1));
                        }
                    }
                }
                else if (this._szArgs) {
                    this._finishResizing(e);
                }
                else if (!e['dataTransfer']) {
                    this._handleSort(e);
                }
                // done with the mouse
                this.resetMouseState();
            };
            // handles double-clicks
            _MouseHandler.prototype._dblclick = function (e) {
                var g = this._g, ht = g.hitTest(e), ct = ht.cellType, sel = g.selection, rng = ht.range, args;
                // ignore if already handled
                if (e.defaultPrevented) {
                    return;
                }
                // auto-size columns
                if (ht.edgeRight && (g.allowResizing & AllowResizing.Columns)) {
                    if (ct == grid.CellType.ColumnHeader || (ct == grid.CellType.Cell && (g.allowResizing & _AR_ALLCELLS))) {
                        e.preventDefault();
                        if (e.ctrlKey && sel.containsColumn(ht.col)) {
                            rng = sel;
                        }
                        for (var c = rng.leftCol; c <= rng.rightCol; c++) {
                            if (g.columns[c].allowResizing) {
                                args = new grid.CellRangeEventArgs(g.cells, new grid.CellRange(-1, c));
                                if (g.onAutoSizingColumn(args) && g.onResizingColumn(args)) {
                                    g.autoSizeColumn(c);
                                    g.onResizedColumn(args);
                                    g.onAutoSizedColumn(args);
                                }
                            }
                        }
                    }
                    else if (ct == grid.CellType.TopLeft) {
                        if (ht.panel.columns[ht.col].allowResizing) {
                            e.preventDefault();
                            args = new grid.CellRangeEventArgs(ht.panel, new grid.CellRange(-1, ht.col));
                            if (g.onAutoSizingColumn(args) && g.onResizingColumn(args)) {
                                g.autoSizeColumn(ht.col, true);
                                g.onAutoSizedColumn(args);
                                g.onResizedColumn(args);
                            }
                        }
                    }
                    this.resetMouseState();
                    return;
                }
                // auto-size rows
                if (ht.edgeBottom && (g.allowResizing & AllowResizing.Rows)) {
                    if (ct == grid.CellType.RowHeader || (ct == grid.CellType.Cell && (g.allowResizing & _AR_ALLCELLS))) {
                        if (e.ctrlKey && sel.containsRow(ht.row)) {
                            rng = sel;
                        }
                        for (var r = rng.topRow; r <= rng.bottomRow; r++) {
                            if (g.rows[r].allowResizing) {
                                args = new grid.CellRangeEventArgs(g.cells, new grid.CellRange(r, -1));
                                if (g.onAutoSizingRow(args) && g.onResizingRow(args)) {
                                    g.autoSizeRow(r);
                                    g.onResizedRow(args);
                                    g.onAutoSizedRow(args);
                                }
                            }
                        }
                    }
                    else if (ct == grid.CellType.TopLeft) {
                        if (ht.panel.rows[ht.row].allowResizing) {
                            args = new grid.CellRangeEventArgs(ht.panel, new grid.CellRange(ht.row, -1));
                            if (g.onAutoSizingRow(args) && g.onResizingRow(args)) {
                                g.autoSizeRow(ht.row, true);
                                g.onResizedRow(args);
                                g.onAutoSizedRow(args);
                            }
                        }
                    }
                    this.resetMouseState();
                }
            };
            // offer to resize rows/columns
            _MouseHandler.prototype._hover = function (e) {
                // make sure we're hovering
                if (this._htDown == null) {
                    var g = this._g, ht = g.hitTest(e), p = ht.panel, ct = ht.cellType, cursor = 'default';
                    // find which row/column is being resized
                    this._szRowCol = null;
                    if (ct == grid.CellType.ColumnHeader || ct == grid.CellType.TopLeft || (ct == grid.CellType.Cell && (g.allowResizing & _AR_ALLCELLS))) {
                        if (ht.edgeRight && (g.allowResizing & AllowResizing.Columns) != 0) {
                            this._szRowCol = this._getResizeCol(ht);
                        }
                    }
                    if (ct == grid.CellType.RowHeader || ct == grid.CellType.TopLeft || (ct == grid.CellType.Cell && (g.allowResizing & _AR_ALLCELLS))) {
                        if (ht.edgeBottom && (g.allowResizing & AllowResizing.Rows) != 0) {
                            this._szRowCol = this._getResizeRow(ht);
                        }
                    }
                    // keep track of element to resize and original size
                    if (this._szRowCol instanceof grid.Column) {
                        cursor = 'col-resize';
                    }
                    else if (this._szRowCol instanceof grid.Row) {
                        cursor = 'row-resize';
                    }
                    this._szStart = this._szRowCol ? this._szRowCol.renderSize : 0;
                    // update the cursor to provide user feedback
                    g.hostElement.style.cursor = cursor;
                }
            };
            _MouseHandler.prototype._getResizeCol = function (ht) {
                // start with the column under the mouse
                var cols = ht.panel.columns, col = cols[ht.col];
                // if the next column in the panel is visible but collapsed, switch
                for (var c = ht.col + 1; c < cols.length; c++) {
                    var newCol = cols[c];
                    if (newCol.visible) {
                        if (newCol.size < 1) {
                            col = newCol;
                        }
                        break;
                    }
                }
                // if this is the last column on a fixed panel, and the first
                // column on the cells panel is visible but collapsed, switch
                if (ht.col == cols.length - 1) {
                    if (ht.cellType == grid.CellType.TopLeft || ht.cellType == grid.CellType.RowHeader) {
                        cols = this._g.columns;
                        for (var c = 0; c < cols.length; c++) {
                            var newCol = cols[c];
                            if (newCol.visible) {
                                if (newCol.size < 1) {
                                    col = newCol;
                                }
                                break;
                            }
                        }
                    }
                }
                // return the column we got
                return col.allowResizing ? col : null;
            };
            _MouseHandler.prototype._getResizeRow = function (ht) {
                // start with the row under the mouse
                var rows = ht.panel.rows, row = rows[ht.row];
                // if the next row in the panel is visible but collapsed, switch
                for (var r = ht.row + 1; r < rows.length; r++) {
                    var newRow = rows[r];
                    if (newRow.visible) {
                        if (newRow.size < 1) {
                            row = newRow;
                        }
                        break;
                    }
                }
                // if this is the last row on a fixed panel, and the first
                // row on the cells panel is visible but collapsed, switch
                if (ht.row == rows.length - 1) {
                    if (ht.cellType == grid.CellType.TopLeft || ht.cellType == grid.CellType.ColumnHeader) {
                        rows = this._g.rows;
                        for (var r = 0; r < rows.length; r++) {
                            var newRow = rows[r];
                            if (newRow.visible) {
                                if (newRow.size < 1) {
                                    row = newRow;
                                }
                                break;
                            }
                        }
                    }
                }
                // return the column we got
                return row.allowResizing ? row : null;
            };
            // handles mouse moves while the button is pressed on the cell area
            _MouseHandler.prototype._mouseSelect = function (e, extend) {
                var _this = this;
                if (this._htDown && this._htDown.panel && this._g.selectionMode != grid.SelectionMode.None) {
                    // handle the selection
                    var ht = new grid.HitTestInfo(this._htDown.panel, e);
                    this._handleSelection(ht, extend);
                    // done, prevent selection of content outside the grid
                    // (unless the click was on an element that wants/needs it!!! TFS 191989)
                    if (!ht.panel && !this._g._isInputElement(e.target)) {
                        e.preventDefault();
                    }
                    // keep calling this if the user keeps the mouse outside the control without moving it
                    // but don't do this in IE9, it can keep scrolling forever... TFS 110374
                    // NOTE: doesn't seem to be an issue anymore, but keep the check to avoid potential regressions.
                    if (!wijmo.isIE9() && e.button >= 0) {
                        ht = new grid.HitTestInfo(this._g, e);
                        if (ht.cellType != grid.CellType.Cell && ht.cellType != grid.CellType.RowHeader) {
                            setTimeout(function () {
                                _this._mouseSelect(_this._eMouse, extend);
                            }, 100);
                        }
                    }
                }
            };
            // handle row and column resizing
            _MouseHandler.prototype._handleResizing = function (e) {
                // prevent browser from selecting cell content
                e.preventDefault();
                // resizing column
                if (this._szRowCol instanceof grid.Column) {
                    var g = this._g, pageX = e.clientX + pageXOffset, // e.pageXY doesn't work well in Chrome/zoom/touch
                    sz = Math.round(Math.max(_MouseHandler._SZ_MIN, this._szStart + (pageX - this._htDown.point.x) * (g.rightToLeft ? -1 : 1)));
                    if (this._szRowCol.renderSize != sz) {
                        if (this._szArgs == null) {
                            var panel = g.rowHeaders.columns.indexOf(this._szRowCol) > -1 ? g.rowHeaders : g.cells;
                            this._szArgs = new grid.CellRangeEventArgs(panel, new grid.CellRange(-1, this._szRowCol.index));
                        }
                        this._szArgs.cancel = false;
                        if (g.onResizingColumn(this._szArgs)) {
                            if (g.deferResizing || g.isTouching) {
                                this._showResizeMarker(sz);
                            }
                            else {
                                this._szRowCol.width = sz;
                            }
                        }
                    }
                }
                // resizing row
                if (this._szRowCol instanceof grid.Row) {
                    var g = this._g, pageY = e.clientY + pageYOffset, // e.pageXY doesn't work well in Chrome/zoom/touch
                    sz = Math.round(Math.max(_MouseHandler._SZ_MIN, this._szStart + (pageY - this._htDown.point.y)));
                    if (this._szRowCol.renderSize != sz) {
                        if (this._szArgs == null) {
                            var panel = g.columnHeaders.rows.indexOf(this._szRowCol) > -1 ? g.columnHeaders : g.cells;
                            this._szArgs = new grid.CellRangeEventArgs(panel, new grid.CellRange(this._szRowCol.index, -1));
                        }
                        this._szArgs.cancel = false;
                        if (g.onResizingRow(this._szArgs)) {
                            if (g.deferResizing || g.isTouching) {
                                this._showResizeMarker(sz);
                            }
                            else {
                                this._szRowCol.height = sz;
                            }
                        }
                    }
                }
            };
            // drag-drop handling (dragging rows/columns)
            _MouseHandler.prototype._dragstart = function (e) {
                var g = this._g, ht = this._htDown;
                // make sure this is event is ours
                if (!ht) {
                    return;
                }
                // get drag source element (if we're not resizing)
                this._dragSource = null;
                if (!this._szRowCol) {
                    var args = new grid.CellRangeEventArgs(ht.panel, ht.range);
                    if (ht.cellType == grid.CellType.ColumnHeader && (g.allowDragging & AllowDragging.Columns) &&
                        ht.col > -1 && g.columns[ht.col].allowDragging) {
                        if (g.onDraggingColumn(args)) {
                            this._dragSource = e.target;
                        }
                        else {
                            e.preventDefault(); // TFS 241962
                        }
                    }
                    else if (ht.cellType == grid.CellType.RowHeader && (g.allowDragging & AllowDragging.Rows) &&
                        ht.row > -1 && g.rows[ht.row].allowDragging) {
                        var row = g.rows[ht.row];
                        if (!(row instanceof grid.GroupRow) && !(row instanceof grid._NewRowTemplate)) {
                            if (g.onDraggingRow(args)) {
                                this._dragSource = e.target;
                            }
                            else {
                                e.preventDefault(); // TFS 241962
                            }
                        }
                    }
                }
                // if we have a valid source, set opacity; ow prevent dragging
                if (this._dragSource && e.dataTransfer && !e.defaultPrevented) {
                    wijmo._startDrag(e.dataTransfer, 'move');
                    this._dragSource.style.opacity = .5;
                    e.stopPropagation(); // prevent parent grids from cancelling the event (TFS 120810)
                    // suspend updates while dragging
                    g.beginUpdate();
                    this._updating = true;
                }
            };
            _MouseHandler.prototype._dragend = function (e) {
                // restore updates after dragging
                if (this._updating) {
                    this._g.endUpdate();
                    this._updating = false;
                }
                // always reset the mouse state
                this.resetMouseState();
            };
            _MouseHandler.prototype._dragover = function (e) {
                var g = this._g, ht = g.hitTest(e), valid = false;
                // check whether the move is valid
                var args = new grid.CellRangeEventArgs(g.cells, ht.range);
                if (this._htDown && ht.cellType == this._htDown.cellType) {
                    if (ht.cellType == grid.CellType.ColumnHeader) {
                        args.cancel = !g.columns.canMoveElement(this._htDown.col, ht.col);
                        valid = g.onDraggingColumnOver(args);
                    }
                    else if (ht.cellType == grid.CellType.RowHeader) {
                        args.cancel = !g.rows.canMoveElement(this._htDown.row, ht.row);
                        valid = g.onDraggingRowOver(args);
                    }
                }
                // if valid, prevent default to allow drop
                if (valid) {
                    e.dataTransfer.dropEffect = 'move';
                    this._showDragMarker(ht);
                    e.preventDefault();
                    e.stopPropagation(); // prevent scrolling on Android
                }
                else {
                    this._showDragMarker(null);
                }
            };
            _MouseHandler.prototype._drop = function (e) {
                var g = this._g, ht = g.hitTest(e), args = new grid.CellRangeEventArgs(g.cells, ht.range);
                // move the row/col to a new position
                if (this._htDown && ht.cellType == this._htDown.cellType) {
                    var sel = g.selection;
                    if (ht.cellType == grid.CellType.ColumnHeader) {
                        g.columns.moveElement(this._htDown.col, ht.col);
                        g.select(sel.row, ht.col);
                        g.onDraggedColumn(args);
                    }
                    else if (ht.cellType == grid.CellType.RowHeader) {
                        g.rows.moveElement(this._htDown.row, ht.row);
                        g.select(ht.row, sel.col);
                        g.onDraggedRow(args);
                    }
                }
                this.resetMouseState();
            };
            // updates the marker to show the new size of the row/col being resized
            _MouseHandler.prototype._showResizeMarker = function (sz) {
                var g = this._g;
                // add marker element to panel
                var t = this._dvMarker;
                if (!t.parentElement) {
                    g.cells.hostElement.appendChild(t);
                }
                // update marker position
                var css, ct = this._szArgs.panel.cellType;
                if (this._szRowCol instanceof grid.Column) {
                    css = {
                        display: '',
                        left: this._szRowCol.pos + sz - 1,
                        top: 0,
                        right: '',
                        bottom: 0,
                        width: 3,
                        height: '',
                        zIndex: 1000
                    };
                    if (g.rightToLeft) {
                        css.left = t.parentElement.clientWidth - css.left - css.width;
                    }
                    if (ct == grid.CellType.TopLeft || ct == grid.CellType.RowHeader) {
                        css.left -= g.topLeftCells.hostElement.offsetWidth;
                    }
                }
                else {
                    css = {
                        left: 0,
                        top: this._szRowCol.pos + sz - 1,
                        right: 0,
                        bottom: '',
                        width: '',
                        height: 3,
                        zIndex: 1000
                    };
                    if (ct == grid.CellType.TopLeft || ct == grid.CellType.ColumnHeader) {
                        css.top -= g.topLeftCells.hostElement.offsetHeight;
                    }
                }
                // apply new position
                wijmo.setCss(t, css);
            };
            // updates the marker to show the position where the row/col will be inserted
            _MouseHandler.prototype._showDragMarker = function (ht) {
                var g = this._g;
                // remove target indicator if no HitTestInfo
                var t = this._dvMarker;
                if (!ht) {
                    if (t.parentElement) {
                        t.parentElement.removeChild(t);
                    }
                    this._rngTarget = null;
                    return;
                }
                // avoid work/flicker
                if (ht.range.equals(this._rngTarget)) {
                    return;
                }
                this._rngTarget = ht.range;
                // add marker element to panel
                if (!t.parentElement) {
                    ht.panel.hostElement.appendChild(t);
                }
                // update marker position
                var css = {
                    display: '',
                    left: 0,
                    top: 0,
                    width: 6,
                    height: 6
                };
                switch (ht.cellType) {
                    case grid.CellType.ColumnHeader:
                        css.height = ht.panel.height;
                        var col = g.columns[ht.col];
                        css.left = col.pos - css.width / 2;
                        if (ht.col > this._htDown.col) {
                            css.left += col.renderWidth;
                        }
                        if (g.rightToLeft) {
                            css.left = t.parentElement.clientWidth - css.left - css.width;
                        }
                        break;
                    case grid.CellType.RowHeader:
                        css.width = ht.panel.width;
                        var row = g.rows[ht.row];
                        css.top = row.pos - css.height / 2;
                        if (ht.row > this._htDown.row) {
                            css.top += row.renderHeight;
                        }
                        break;
                }
                // update marker
                wijmo.setCss(t, css);
            };
            // raises the ResizedRow/Column events and 
            // applies the new size to the selection if the control key is pressed
            _MouseHandler.prototype._finishResizing = function (e) {
                var g = this._g, sel = g.selection, ctrl = this._eMouse.ctrlKey, args = this._szArgs, pageX = e.clientX + pageXOffset, // e.pageXY doesn't work well in Chrome/zoom/touch
                pageY = e.clientY + pageYOffset, rc, sz;
                // finish column sizing
                if (args && !args.cancel && args.col > -1) {
                    // apply new size, fire event
                    rc = args.col;
                    sz = Math.round(Math.max(_MouseHandler._SZ_MIN, this._szStart + (pageX - this._htDown.point.x) * (this._g.rightToLeft ? -1 : 1)));
                    args.panel.columns[rc].width = Math.round(sz);
                    g.onResizedColumn(args);
                    // apply new size to selection if the control key is pressed
                    if (ctrl && this._htDown.cellType == grid.CellType.ColumnHeader && sel.containsColumn(rc)) {
                        for (var c = sel.leftCol; c <= sel.rightCol; c++) {
                            if (g.columns[c].allowResizing && c != rc) {
                                args = new grid.CellRangeEventArgs(g.cells, new grid.CellRange(-1, c));
                                if (g.onResizingColumn(args)) {
                                    g.columns[c].size = g.columns[rc].size;
                                    g.onResizedColumn(args);
                                }
                            }
                        }
                    }
                }
                // finish row sizing
                if (args && !args.cancel && args.row > -1) {
                    // apply new size, fire event
                    rc = args.row;
                    sz = Math.round(Math.max(_MouseHandler._SZ_MIN, this._szStart + (pageY - this._htDown.point.y)));
                    args.panel.rows[rc].height = Math.round(sz);
                    g.onResizedRow(args);
                    // apply new size to selection if the control key is pressed
                    if (ctrl && this._htDown.cellType == grid.CellType.RowHeader && sel.containsRow(rc)) {
                        for (var r = sel.topRow; r <= sel.bottomRow; r++) {
                            if (g.rows[r].allowResizing && r != rc) {
                                args = new grid.CellRangeEventArgs(g.cells, new grid.CellRange(r, -1));
                                if (g.onResizingRow(args)) {
                                    g.rows[r].size = g.rows[rc].size;
                                    g.onResizedRow(args);
                                }
                            }
                        }
                    }
                }
            };
            // start ListBox selection by keeping track of which rows were selected 
            // when the action started
            _MouseHandler.prototype._startListBoxSelection = function (row) {
                var rows = this._g.rows;
                this._lbSelState = !rows[row].isSelected;
                this._lbSelRows = {};
                for (var r = 0; r < rows.length; r++) {
                    if (rows[r].isSelected) {
                        this._lbSelRows[r] = true;
                    }
                }
            };
            // handle mouse selection
            _MouseHandler.prototype._handleSelection = function (ht, extend) {
                var g = this._g, rows = g.rows, sel = g._selHdl._sel, rng = new grid.CellRange(ht.row, ht.col);
                // check that the selection is valid
                if (ht.row > -1 && ht.col > -1) {
                    if (this._lbSelRows != null) {
                        // special handling for ListBox mode
                        var changed = false;
                        rng = new grid.CellRange(ht.row, ht.col, this._htDown.row, this._htDown.col);
                        for (var r = 0; r < rows.length; r++) {
                            var selected = rng.containsRow(r) ? this._lbSelState : this._lbSelRows[r] != null;
                            if (selected != rows[r].isSelected) {
                                var e = new grid.CellRangeEventArgs(g.cells, new grid.CellRange(r, sel.col, r, sel.col2));
                                if (g.onSelectionChanging(e)) {
                                    rows[r]._setFlag(grid.RowColFlags.Selected, selected, true);
                                    changed = true;
                                    //rows[r].isSelected = selected; // this invalidates
                                    g.onSelectionChanged(e);
                                }
                            }
                        }
                        // if the selection changed, refresh cells to show the change
                        if (changed) {
                            g.refreshCells(false, true, true);
                        }
                        // and scroll the selection into view
                        g.scrollIntoView(ht.row, ht.col);
                    }
                    else {
                        // row headers, select the whole row
                        if (ht.cellType == grid.CellType.RowHeader) {
                            rng.col = 0;
                            rng.col2 = g.columns.length - 1;
                        }
                        // extend range if that was asked
                        if (extend) {
                            rng.row2 = sel.row2;
                            rng.col2 = sel.col2;
                        }
                        // select
                        g.select(rng);
                    }
                }
            };
            // handle mouse sort
            _MouseHandler.prototype._handleSort = function (e) {
                var g = this._g, cv = g.collectionView, ht = g.hitTest(e);
                if (this._htDown && ht.cellType == this._htDown.cellType && ht.col == this._htDown.col &&
                    ht.cellType == grid.CellType.ColumnHeader && !ht.edgeRight && ht.col > -1 &&
                    cv && cv.canSort && g.allowSorting) {
                    // get row that was clicked accounting for merging
                    var rng = g.getMergedRange(ht.panel, ht.row, ht.col), row = rng ? rng.row2 : ht.row;
                    // get column and binding column
                    var col = g.columns[ht.col], bcol = g._getBindingColumn(ht.panel, ht.row, col);
                    // if the click was on the sort row, sort
                    if (row == g._getSortRowIndex() || col != bcol) {
                        var currSort = bcol.currentSort, asc = currSort != '+';
                        if (bcol.allowSorting && bcol.binding) {
                            // can't remove sort from unsorted column
                            if (!currSort && e.ctrlKey)
                                return;
                            // raise sorting column
                            var args = new grid.CellRangeEventArgs(ht.panel, new grid.CellRange(ht.row, ht.col));
                            if (g.onSortingColumn(args)) {
                                // update sort
                                var sds = cv.sortDescriptions;
                                if (e.ctrlKey) {
                                    sds.clear();
                                }
                                else {
                                    sds.splice(0, sds.length, new wijmo.collections.SortDescription(bcol._getBindingSort(), asc));
                                }
                                // raise sorted column
                                g.onSortedColumn(args);
                            }
                        }
                    }
                }
            };
            return _MouseHandler;
        }());
        _MouseHandler._SZ_MIN = 0; // minimum size allowed when resizing rows/cols
        grid._MouseHandler = _MouseHandler;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

var wijmo;
(function (wijmo) {
    var grid;
    (function (grid) {
        'use strict';
        /**
         * Handles the grid's editing.
         */
        var _EditHandler = (function () {
            /**
             * Initializes a new instance of the @see:_EditHandler class.
             *
             * @param g @see:FlexGrid that owns this @see:_EditHandler.
             */
            function _EditHandler(g) {
                var _this = this;
                this._fullEdit = false;
                this._list = null;
                this._g = g;
                // raise input event when selecting from ListBox
                this._evtInput = document.createEvent('HTMLEvents');
                this._evtInput.initEvent('input', true, false);
                // finish editing when selection changes (commit row edits if row changed)
                g.selectionChanging.addHandler(function (s, e) {
                    if (_this.finishEditing()) {
                        var oldrow = g._selHdl._sel.row;
                        if (oldrow != e.row) {
                            var len = g.rows.length, olditem = oldrow > -1 && oldrow < len ? g.rows[oldrow].dataItem : null, newitem = e.row > -1 && e.row < len ? g.rows[e.row].dataItem : null;
                            if (olditem != newitem) {
                                _this._commitRowEdits();
                            }
                        }
                    }
                    else {
                        e.cancel = true; // staying in edit mode, keep selection
                    }
                });
                // commit row edits when losing focus
                g.lostFocus.addHandler(function () {
                    if (!g.containsFocus()) {
                        var ae = wijmo.getActiveElement(); // TFS 121877, 122033 Bootstrap modal issue
                        if (!ae || getComputedStyle(ae).position != 'fixed') {
                            _this._commitRowEdits();
                        }
                    }
                });
                // commit edits when clicking non-cells (e.g. sort, drag, resize),
                // start editing when clicking on checkboxes
                g.addEventListener(g.hostElement, 'mousedown', function (e) {
                    // start actions on left button only: TFS 114623
                    if (e.defaultPrevented || e.button != 0) {
                        return;
                    }
                    // not while resizing...
                    if (g._mouseHdl._szRowCol) {
                        return;
                    }
                    // handle the event as usual
                    var sel = g.selection, ht = g.hitTest(e);
                    _this._htDown = null;
                    if (ht.cellType != grid.CellType.Cell && ht.cellType != grid.CellType.None) {
                        // mouse down on non-cell area: commit any pending edits
                        // **REVIEW: this is a fix for TFS 98332
                        if (!_this._lbx || !wijmo.contains(_this._lbx.hostElement, e.target)) {
                            _this._commitRowEdits();
                        }
                    }
                    else if (ht.cellType != grid.CellType.None) {
                        // start editing when clicking on checkboxes that are not the active editor
                        // NOTE: we check for the 'wj-cell-check' class to determine whether the
                        // checkbox is native and not custom content (formatItem/template) TFS 221442
                        var edt = wijmo.tryCast(e.target, HTMLInputElement);
                        if (edt && edt.type == 'checkbox' &&
                            wijmo.hasClass(edt, 'wj-cell-check') &&
                            wijmo.closest(edt, '.wj-flexgrid') == g.hostElement) {
                            if (edt != _this.activeEditor) {
                                // cancel the event and start editing the item that was clicked
                                e.preventDefault();
                                if (_this.startEditing(false, ht.row, ht.col)) {
                                    edt = _this.activeEditor;
                                    if (edt && edt.type == 'checkbox') {
                                        edt.checked = !edt.checked;
                                        edt.focus(); // TFS 135943
                                        _this.finishEditing();
                                    }
                                }
                            }
                            else {
                                _this.finishEditing();
                            }
                        }
                        // handle drop-down items (even on editors)
                        var icon = document.elementFromPoint(e.clientX, e.clientY);
                        if (wijmo.closest(icon, '.' + grid.CellFactory._WJC_DROPDOWN) &&
                            wijmo.closest(icon, '.wj-flexgrid') == g.hostElement) {
                            _this._toggleListBox(e, ht.range);
                            _this._htDown = null;
                            e.preventDefault();
                            return;
                        }
                        // if the click was on the cursor cell, save the hit test info
                        // to start editing when we get the click event later 
                        if (edt == null && ht.row == sel.row && ht.col == sel.col) {
                            _this._htDown = ht;
                        }
                    }
                }, true);
                // start editing when the user clicks the selected cell
                g.addEventListener(g.hostElement, 'click', function (e) {
                    // start editing when clicking a cell without an active editor
                    if (_this._htDown && !_this.activeEditor && !g._isInputElement(e.target)) {
                        var ht = g.hitTest(e);
                        if (ht.panel == g.cells && ht.range.equals(_this._htDown.range)) {
                            _this.startEditing(true, ht.row, ht.col, true, e);
                        }
                    }
                }, true);
            }
            /**
             * Starts editing a given cell.
             *
             * @param fullEdit Whether to stay in edit mode when the user presses the cursor keys. Defaults to false.
             * @param r Index of the row to be edited. Defaults to the currently selected row.
             * @param c Index of the column to be edited. Defaults to the currently selected column.
             * @param focus Whether to give the editor the focus. Defaults to true.
             * @param evt Event that triggered this action (usually a keypress or keydown).
             * @return True if the edit operation started successfully.
             */
            _EditHandler.prototype.startEditing = function (fullEdit, r, c, focus, evt) {
                if (fullEdit === void 0) { fullEdit = true; }
                // type-checking is always good!
                fullEdit = wijmo.asBoolean(fullEdit);
                // default row/col to current selection
                var g = this._g;
                r = wijmo.asNumber(r, true, true);
                c = wijmo.asNumber(c, true, true);
                if (r == null) {
                    r = g.selection.row;
                }
                if (c == null) {
                    c = g.selection.col;
                }
                // default focus to true
                if (focus == null) {
                    focus = true;
                }
                // check that the cell is editable
                if (!this._allowEditing(r, c)) {
                    return false;
                }
                // get edit range
                var rng = g.getMergedRange(g.cells, r, c);
                if (!rng) {
                    rng = new grid.CellRange(r, c);
                }
                // get item to be edited
                var item = g.rows[r].dataItem;
                // make sure cell is selected
                g.select(rng, true);
                // check that we still have the same item after moving the selection (TFS 110143)
                if (!g.rows[r] || item != g.rows[r].dataItem) {
                    return false;
                }
                // no work if we are already editing this cell
                if (rng.equals(this._rng)) {
                    return true;
                }
                // make sure we're not editing another cell
                if (this.activeEditor && !this.finishEditing()) {
                    return false;
                }
                // start editing cell
                var e = new grid.CellRangeEventArgs(g.cells, rng, evt);
                if (!g.onBeginningEdit(e)) {
                    return false;
                }
                // start editing item
                var ecv = wijmo.tryCast(g.collectionView, 'IEditableCollectionView');
                if (ecv) {
                    item = g.rows[r].dataItem;
                    var itemEditStarting = item != ecv.currentEditItem;
                    if (itemEditStarting) {
                        g.onRowEditStarting(e);
                    }
                    ecv.editItem(item);
                    if (itemEditStarting) {
                        g.onRowEditStarted(e);
                        this._edItem = item;
                    }
                }
                // save editing parameters
                this._fullEdit = fullEdit;
                this._rng = rng;
                this._list = null;
                var map = g.columns[c].dataMap;
                if (map) {
                    this._list = map.getDisplayValues(item);
                }
                // refresh to create editor
                // (and to cancel any pending invalidations)
                g.refresh(false);
                // initialize editor
                var edt = this._edt;
                if (edt) {
                    if (edt.type == 'checkbox') {
                        this._fullEdit = false; // no full edit on checkboxes...
                    }
                    else if (focus) {
                        wijmo.setSelectionRange(edt, 0, edt.value.length);
                    }
                    g.onPrepareCellForEdit(e);
                    // give the editor the focus in case it doesn't have it
                    // NOTE: this happens on Android, it's strange...
                    edt = this._edt;
                    if (edt && focus) {
                        edt.focus();
                    }
                }
                // done
                return true;
            };
            /**
             * Commits any pending edits and exits edit mode.
             *
             * @param cancel Whether pending edits should be canceled or committed.
             * @return True if the edit operation finished successfully.
             */
            _EditHandler.prototype.finishEditing = function (cancel) {
                if (cancel === void 0) { cancel = false; }
                // make sure we're editing
                var edt = this._edt;
                if (!edt) {
                    this._removeListBox();
                    return true;
                }
                // get parameters
                var g = this._g, rng = this._rng, e = new grid.CellEditEndingEventArgs(g.cells, rng), focus = g.containsFocus();
                // commit changes to focused custom editors TFS 229139, 203106
                var cstEdtHost = g.hostElement.querySelector('.wj-control.wj-state-focused');
                if (cstEdtHost) {
                    var cstEdt = wijmo.Control.getControl(cstEdtHost);
                    if (cstEdt) {
                        cstEdt.onLostFocus(e);
                    }
                }
                // validate edits
                e.cancel = cancel;
                if (!cancel && g.validateEdits) {
                    var error = this._getValidationError();
                    if (error) {
                        e.cancel = true;
                        var cell = edt.parentElement;
                        if (cell) {
                            wijmo.toggleClass(cell, 'wj-state-invalid', true);
                            cell.title = error;
                            e.stayInEditMode = true;
                        }
                    }
                }
                // stay in edit mode if validation fails and stayInEditMode is true
                if (!g.onCellEditEnding(e) && e.stayInEditMode) {
                    if (focus) {
                        setTimeout(function () {
                            edt.select();
                        });
                    }
                    else {
                        edt.select();
                    }
                    return false; // continue editing
                }
                // apply edits
                if (!e.cancel) {
                    // save original value so user can check it in the cellEditEnded event
                    e.data = g.cells.getCellData(rng.topRow, rng.leftCol, false);
                    // apply value to the range
                    var value = g.cellFactory.getEditorValue(g);
                    for (var r = rng.topRow; r <= rng.bottomRow && r < g.rows.length; r++) {
                        for (var c = rng.leftCol; c <= rng.rightCol && c < g.columns.length; c++) {
                            g.cells.setCellData(r, c, value, true);
                        }
                    }
                }
                // dispose of editor
                this._edt = null;
                this._rng = null;
                this._list = null;
                this._removeListBox();
                // refresh to replace the editor with regular content
                g.refresh(false);
                // restore focus
                if (focus) {
                    g.focus();
                }
                // edit ended
                g.onCellEditEnded(e);
                // done
                return true;
            };
            Object.defineProperty(_EditHandler.prototype, "activeEditor", {
                /**
                 * Gets the <b>HTMLInputElement</b> that represents the cell editor currently active.
                 */
                get: function () {
                    return this._edt;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(_EditHandler.prototype, "editRange", {
                /**
                 * Gets a @see:CellRange that identifies the cell currently being edited.
                 */
                get: function () {
                    return this._rng;
                },
                enumerable: true,
                configurable: true
            });
            // ** implementation
            // gets a validation error for the cell currently being edited
            _EditHandler.prototype._getValidationError = function () {
                var g = this._g, view = g.collectionView, getError = view ? view['getError'] : null;
                // check that the grid is bound to a validating collection
                if (wijmo.isFunction(getError)) {
                    var rng = this._rng, col = g._getBindingColumn(g.cells, rng.row, g.columns[rng.col]), binding = col.binding, dataType = col.dataType, item = g.rows[rng.row].dataItem, val = g.cellFactory.getEditorValue(g), error = null;
                    // coerce the value
                    val = wijmo.changeType(val, dataType, col.format);
                    if (wijmo.getType(val) == dataType && item) {
                        // validate the cell
                        var oldVal = col._binding.getValue(item);
                        col._binding.setValue(item, val);
                        error = getError(item, binding);
                        col._binding.setValue(item, oldVal);
                        return error;
                    }
                }
                // no errors found
                return null;
            };
            // checks whether a cell can be edited
            _EditHandler.prototype._allowEditing = function (r, c) {
                var g = this._g;
                if (g.isReadOnly || g.selectionMode == grid.SelectionMode.None)
                    return false;
                if (r < 0 || r >= g.rows.length || g.rows[r].isReadOnly || !g.rows[r].isVisible)
                    return false;
                if (c < 0 || c >= g.columns.length)
                    return false;
                var col = g._getBindingColumn(g.cells, r, g.columns[c]);
                if (col && (col.isReadOnly || !col.isVisible))
                    return false;
                return true;
            };
            // finish editing the current item
            _EditHandler.prototype._commitRowEdits = function () {
                var g = this._g;
                if (this.finishEditing() && this._edItem) {
                    var ecv = wijmo.tryCast(g.collectionView, 'IEditableCollectionView');
                    if (ecv && ecv.currentEditItem) {
                        var e = new grid.CellRangeEventArgs(g.cells, g.selection);
                        g.onRowEditEnding(e);
                        ecv.commitEdit();
                        g.onRowEditEnded(e);
                    }
                    this._edItem = null;
                }
            };
            // handles keyDown events while editing
            // returns true if the key was handled, false if the grid should handle it
            _EditHandler.prototype._keydown = function (e) {
                switch (e.keyCode) {
                    // F2 toggles edit mode
                    case wijmo.Key.F2:
                        this._fullEdit = !this._fullEdit;
                        e.preventDefault();
                        return true;
                    // F4 toggles ListBox
                    case wijmo.Key.F4:
                        this._toggleListBox(e);
                        e.preventDefault();
                        return true;
                    // space toggles checkboxes
                    case wijmo.Key.Space:
                        var edt = this._edt;
                        if (edt && edt.type == 'checkbox') {
                            edt.checked = !edt.checked;
                            this.finishEditing();
                            e.preventDefault();
                        }
                        return true;
                    // enter, tab, escape finish editing
                    case wijmo.Key.Enter:
                    case wijmo.Key.Tab:
                        e.preventDefault();
                        return !this.finishEditing(); // let grid handle key if editing finished
                    case wijmo.Key.Escape:
                        e.preventDefault();
                        this.finishEditing(true);
                        return true;
                    // cursor keys: ListBox selection/finish editing if not in full edit mode
                    case wijmo.Key.Up:
                    case wijmo.Key.Down:
                    case wijmo.Key.Left:
                    case wijmo.Key.Right:
                    case wijmo.Key.PageUp:
                    case wijmo.Key.PageDown:
                    case wijmo.Key.Home:
                    case wijmo.Key.End:
                        // if the ListBox is active, let it handle the key
                        if (this._lbx) {
                            return this._keydownListBox(e);
                        }
                        // open ListBox on alt up/down
                        if (e.altKey) {
                            switch (e.keyCode) {
                                case wijmo.Key.Up:
                                case wijmo.Key.Down:
                                    this._toggleListBox(e);
                                    e.preventDefault();
                                    return true;
                            }
                        }
                        // finish editing if not in full-edit mode
                        if (!this._fullEdit) {
                            if (this.finishEditing()) {
                                return false;
                            }
                        }
                }
                // key has been handled
                return true;
            };
            // handles keydown events when ListBox is visible
            _EditHandler.prototype._keydownListBox = function (e) {
                var handled = true;
                if (this._lbx) {
                    switch (e.keyCode) {
                        case wijmo.Key.Up:
                            if (e.altKey) {
                                this._toggleListBox(e);
                            }
                            else if (this._lbx.selectedIndex > 0) {
                                this._lbx.selectedIndex--;
                            }
                            break;
                        case wijmo.Key.Down:
                            if (e.altKey) {
                                this._toggleListBox(e);
                            }
                            else {
                                this._lbx.selectedIndex++;
                            }
                            break;
                        case wijmo.Key.Home:
                        case wijmo.Key.PageUp:
                            this._lbx.selectedIndex = 0;
                            break;
                        case wijmo.Key.End:
                        case wijmo.Key.PageDown:
                            this._lbx.selectedIndex = this._lbx.collectionView.items.length - 1;
                            break;
                        default:
                            handled = false;
                            break;
                    }
                }
                // if handled, we're done
                if (handled) {
                    e.preventDefault();
                    return true;
                }
                // return false to let the grid handle the key
                return false;
            };
            // handles keyPress events while editing
            _EditHandler.prototype._keypress = function (e) {
                // auto-complete based on dataMap
                var edt = this._edt;
                if (edt && edt.type != 'checkbox' && e.target == edt &&
                    this._list && this._list.length > 0 && e.charCode >= 32) {
                    // get text up to selection start
                    var start = edt.selectionStart, text = edt.value.substr(0, start);
                    // add the new char if the source element is the editor
                    // (but not if the source element is the grid!)
                    if (e.target == edt) {
                        start++;
                        text += String.fromCharCode(e.charCode);
                    }
                    // convert to lower-case for matching
                    text = text.toLowerCase();
                    // look for a match
                    for (var i = 0; i < this._list.length; i++) {
                        if (this._list[i].toLowerCase().indexOf(text) == 0) {
                            // found the match, update text and selection
                            edt.value = this._list[i];
                            wijmo.setSelectionRange(edt, start, this._list[i].length);
                            edt.dispatchEvent(this._evtInput);
                            // eat the key and be done
                            e.preventDefault();
                            break;
                        }
                    }
                }
            };
            // shows the drop-down element for a cell (if it is not already visible)
            _EditHandler.prototype._toggleListBox = function (evt, rng) {
                var g = this._g, sel = g._selHdl._sel;
                // if a range was not specified, use current selection
                if (!rng) {
                    rng = sel;
                }
                // close select element if any; if this is the same cell, we're done
                if (this._lbx) {
                    this._removeListBox();
                    if (sel.contains(rng)) {
                        if (g.activeEditor) {
                            g.activeEditor.focus();
                        }
                        else if (!g.containsFocus()) {
                            g.focus();
                        }
                        return true;
                    }
                }
                // if this was a touch, give focus to ListBox to hide soft keyboard
                var lbxFocus = g.isTouching;
                // check that we have a drop-down
                var bcol = g._getBindingColumn(g.cells, rng.row, g.columns[rng.col]);
                if (!wijmo.input || !bcol.dataMap || bcol.showDropDown === false) {
                    return false;
                }
                // start editing so we can position the select element
                if (!wijmo.input || !this.startEditing(true, rng.row, rng.col, !lbxFocus, evt)) {
                    return false;
                }
                // create and initialize the ListBox
                this._lbx = this._createListBox();
                this._lbx.showSelection();
                if (lbxFocus) {
                    this._lbx.focus();
                }
                return true;
            };
            // create the ListBox and add it to the document
            _EditHandler.prototype._createListBox = function () {
                var _this = this;
                var g = this._g, rng = this._rng, row = g.rows[rng.row], col = g._getBindingColumn(g.cells, rng.row, g.columns[rng.col]), div = document.createElement('div'), lbx = new wijmo.input.ListBox(div);
                // configure ListBox
                wijmo.addClass(div, 'wj-dropdown-panel');
                lbx.maxHeight = row.renderHeight * 4;
                lbx.itemsSource = col.dataMap.getDisplayValues(row.dataItem);
                lbx.selectedValue = g.activeEditor
                    ? g.activeEditor.value
                    : g.getCellData(rng.row, rng.col, true);
                wijmo.addClass(div, col.dropDownCssClass);
                // close ListBox on clicks
                lbx.addEventListener(lbx.hostElement, 'click', function () {
                    _this._removeListBox();
                    g.focus(); // TFS 222950
                    _this.finishEditing();
                });
                // close ListBox when losing focus
                lbx.lostFocus.addHandler(function () {
                    _this._removeListBox();
                });
                // update editor when the selected index changes
                lbx.selectedIndexChanged.addHandler(function () {
                    var edt = g.activeEditor;
                    if (edt) {
                        edt.value = _this._lbx.selectedValue;
                        edt.dispatchEvent(_this._evtInput);
                        wijmo.setSelectionRange(edt, 0, edt.value.length);
                    }
                });
                // show the popup
                wijmo.showPopup(div, g.getCellBoundingRect(rng.row, rng.col));
                // done
                return lbx;
            };
            // remove the ListBox element from the DOM and disconnect its event handlers
            _EditHandler.prototype._removeListBox = function () {
                if (this._lbx) {
                    wijmo.hidePopup(this._lbx.hostElement, true);
                    this._lbx.dispose();
                    this._lbx = null;
                }
            };
            return _EditHandler;
        }());
        grid._EditHandler = _EditHandler;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

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
var wijmo;
(function (wijmo) {
    var grid;
    (function (grid) {
        'use strict';
        /**
         * Manages the new row template used to add rows to the grid.
         */
        var _AddNewHandler = (function () {
            /**
             * Initializes a new instance of the @see:_AddNewHandler class.
             *
             * @param g @see:FlexGrid that owns this @see:_AddNewHandler.
             */
            function _AddNewHandler(g) {
                this._nrt = new _NewRowTemplate();
                this._g = g;
                this._keydownBnd = this._keydown.bind(this);
                this._attach();
            }
            Object.defineProperty(_AddNewHandler.prototype, "newRowAtTop", {
                /**
                 * Gets or sets a value that indicates whether the new row template should be located
                 * at the top of the grid or at the bottom.
                 */
                get: function () {
                    return this._top;
                },
                set: function (value) {
                    if (value != this.newRowAtTop) {
                        this._top = wijmo.asBoolean(value);
                        this.updateNewRowTemplate();
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Updates the new row template to ensure it's visible only if the grid is
             * bound to a data source that supports adding new items, and that it is
             * in the right position.
             */
            _AddNewHandler.prototype.updateNewRowTemplate = function () {
                // get variables
                var ecv = wijmo.tryCast(this._g.collectionView, 'IEditableCollectionView'), g = this._g, rows = g.rows;
                // see if we need a new row template
                var needTemplate = ecv && ecv.canAddNew && g.allowAddNew && !g.isReadOnly;
                // get current template index
                var index = rows.indexOf(this._nrt), newRowPos = this._top ? 0 : rows.length - 1, insert = false;
                // update template position
                if (!needTemplate && index > -1) {
                    var sel = g.selection; // move selection away from the row being deleted
                    if (sel.row == index) {
                        g.select(sel.row - 1, sel.col);
                    }
                    rows.removeAt(index);
                }
                else if (needTemplate) {
                    if (index < 0) {
                        insert = true;
                    }
                    else if (index != newRowPos) {
                        rows.removeAt(index);
                        insert = true;
                    }
                    // add the new row template at the proper position
                    if (insert) {
                        if (this._top) {
                            rows.insert(0, this._nrt);
                        }
                        else {
                            rows.push(this._nrt);
                        }
                    }
                    // make sure the new row template is not collapsed
                    if (this._nrt) {
                        this._nrt._setFlag(grid.RowColFlags.ParentCollapsed, false);
                    }
                }
            };
            // ** implementation
            // add/remove handlers to manage the new row template
            /*protected*/ _AddNewHandler.prototype._attach = function () {
                var g = this._g;
                if (g) {
                    g.beginningEdit.addHandler(this._beginningEdit, this);
                    g.pastingCell.addHandler(this._beginningEdit, this);
                    g.rowEditEnded.addHandler(this._rowEditEnded, this);
                    g.loadedRows.addHandler(this.updateNewRowTemplate, this);
                    g.hostElement.addEventListener('keydown', this._keydownBnd, true);
                }
            };
            /*protected*/ _AddNewHandler.prototype._detach = function () {
                var g = this._g;
                if (g) {
                    g.beginningEdit.removeHandler(this._beginningEdit);
                    g.pastingCell.removeHandler(this._beginningEdit);
                    g.rowEditEnded.removeHandler(this._rowEditEnded);
                    g.loadedRows.removeHandler(this.updateNewRowTemplate);
                    g.hostElement.removeEventListener('keydown', this._keydownBnd, true);
                }
            };
            // cancel new row at top addition on Escape (same as new row at bottom)
            /*protected*/ _AddNewHandler.prototype._keydown = function (e) {
                if (!e.defaultPrevented && e.keyCode == wijmo.Key.Escape) {
                    if (this._g.activeEditor == null && this._top && this._nrt.dataItem) {
                        this._nrt.dataItem = null;
                        this._g.invalidate();
                    }
                }
            };
            // beginning edit, add new item if necessary
            /*protected*/ _AddNewHandler.prototype._beginningEdit = function (sender, e) {
                if (!e.cancel) {
                    var row = this._g.rows[e.row];
                    if (wijmo.tryCast(row, _NewRowTemplate)) {
                        var ecv = wijmo.tryCast(this._g.collectionView, 'IEditableCollectionView');
                        if (ecv && ecv.canAddNew) {
                            // add new row at the top
                            if (this._top) {
                                if (this._nrt.dataItem == null) {
                                    // create new item
                                    var newItem = null, src = ecv.sourceCollection, creator = ecv['newItemCreator'];
                                    if (wijmo.isFunction(creator)) {
                                        newItem = creator();
                                    }
                                    else if (src && src.length) {
                                        newItem = new src[0].constructor();
                                    }
                                    else {
                                        newItem = {};
                                    }
                                    // assign new item to new row template
                                    this._nrt.dataItem = newItem;
                                }
                                // add new row at the bottom (TFS 145498)
                            }
                            else {
                                var newItem = (ecv.currentAddItem && ecv.currentAddItem == row.dataItem)
                                    ? ecv.currentAddItem
                                    : ecv.addNew();
                                ecv.moveCurrentTo(newItem);
                                this.updateNewRowTemplate();
                                // update now to ensure the editor will get a fresh layout (TFS 96705)
                                this._g.refresh(true);
                                // fire row added event (user can customize the new row or cancel)
                                this._g.onRowAdded(e);
                                if (e.cancel) {
                                    ecv.cancelNew();
                                }
                            }
                        }
                    }
                }
            };
            // row has been edited, commit if this is the new row
            /*protected*/ _AddNewHandler.prototype._rowEditEnded = function (sender, e) {
                var _this = this;
                var ecv = wijmo.tryCast(this._g.collectionView, 'IEditableCollectionView'), item = this._nrt.dataItem;
                if (ecv) {
                    // adding at the bottom
                    if (ecv.isAddingNew) {
                        ecv.commitNew();
                        // adding at the top
                    }
                    else if (item && !e.cancel) {
                        // clear row template data
                        this._nrt.dataItem = null;
                        // add new item to collection view
                        var newItem = ecv.addNew();
                        for (var k in item) {
                            newItem[k] = item[k];
                        }
                        // fire row added event (user can customize the new row or cancel)
                        this._g.onRowAdded(e);
                        if (e.cancel) {
                            ecv.cancelNew();
                        }
                        else {
                            ecv.commitNew();
                        }
                        // move selection back to new row template
                        setTimeout(function () {
                            _this._g.select(0, _this._g.columns.firstVisibleIndex);
                            _this.updateNewRowTemplate(); // needed when adding the first row
                        }, 20);
                    }
                }
            };
            return _AddNewHandler;
        }());
        grid._AddNewHandler = _AddNewHandler;
        /**
         * Represents a row template used to add items to the source collection.
         */
        var _NewRowTemplate = (function (_super) {
            __extends(_NewRowTemplate, _super);
            function _NewRowTemplate() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return _NewRowTemplate;
        }(grid.Row));
        grid._NewRowTemplate = _NewRowTemplate;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

var wijmo;
(function (wijmo) {
    var grid;
    (function (grid) {
        'use strict';
        /**
         * Implements a hidden input element so users can choose IME modes when
         * the FlexGrid has focus, and start composing before the grid enters
         * edit mode.
         */
        var _ImeHandler = (function () {
            //--------------------------------------------------------------------------
            //#region ** ctor
            /**
             * Initializes a new instance of the @see:_ImeHandler class and attaches it to a @see:FlexGrid.
             *
             * @param g @see:FlexGrid that this @see:_ImeHandler will be attached to.
             */
            function _ImeHandler(g) {
                this._g = g;
                // create hidden input focus element
                this._tbx = wijmo.createElement('<input class="wj-grid-editor wj-form-control" wj-part="ime-target"/>');
                this._cssHidden = {
                    position: 'fixed',
                    pointerEvents: 'none',
                    opacity: 0,
                    left: -10,
                    top: -10,
                    width: 0
                };
                wijmo.setCss(this._tbx, this._cssHidden);
                // add IME input to the grid, update the focus
                g.cells.hostElement.parentElement.appendChild(this._tbx);
                this._updateImeFocus();
                // attach event handlers
                var host = g.hostElement;
                g.addEventListener(this._tbx, 'compositionstart', this._compositionstart.bind(this));
                g.addEventListener(this._tbx, 'keydown', this._keydown.bind(this));
                g.addEventListener(host, 'blur', this._updateImeFocus.bind(this), true);
                g.addEventListener(host, 'focus', this._updateImeFocus.bind(this), true);
                g.addEventListener(host, 'mousedown', this._mousedown.bind(this), true);
                g.addEventListener(host, 'mouseup', this._mouseup.bind(this), true);
                g.cellEditEnded.addHandler(this._cellEditEnded, this);
                g.selectionChanged.addHandler(this._updateImeFocus, this);
            }
            //#endregion
            //--------------------------------------------------------------------------
            //#region ** object model
            /**
             * Disposes of this @see:_ImeHandler.
             */
            _ImeHandler.prototype.dispose = function () {
                var g = this._g, host = g.hostElement;
                // remove event listeners
                g.removeEventListener(this._tbx, 'compositionstart');
                g.removeEventListener(host, 'blur');
                g.removeEventListener(host, 'focus');
                g.removeEventListener(host, 'mousedown');
                g.removeEventListener(host, 'mouseup');
                g.cellEditEnded.removeHandler(this._cellEditEnded);
                g.selectionChanged.removeHandler(this._updateImeFocus);
                // remove IME input from grid
                if (this._tbx.parentElement) {
                    this._tbx.parentElement.removeChild(this._tbx);
                }
            };
            //#endregion
            //--------------------------------------------------------------------------
            //#region ** implementation
            // hide IME input after editing
            _ImeHandler.prototype._cellEditEnded = function () {
                wijmo.setCss(this._tbx, this._cssHidden);
                this._tbx.value = '';
            };
            // show IME input as current editor when composition starts
            _ImeHandler.prototype._compositionstart = function () {
                var g = this._g;
                if (g.activeEditor == null) {
                    var sel = g._selHdl.selection;
                    if (g.startEditing(false, sel.row, sel.col, false)) {
                        // get editor position
                        var rc = g.getCellBoundingRect(sel.row, sel.col), host = g.cells.hostElement, left = g.columns[sel.col].pos + host.offsetLeft, top = g.rows[sel.row].pos + host.offsetTop;
                        // account for frozen cells (TFS 239266)
                        if (sel.row < g.frozenRows) {
                            top += host.parentElement.scrollTop;
                        }
                        if (sel.col < g.frozenColumns) {
                            left += host.parentElement.scrollLeft;
                        }
                        // position the editor
                        wijmo.setCss(this._tbx, {
                            position: 'absolute',
                            pointerEvents: '',
                            opacity: '',
                            left: left,
                            top: top,
                            width: rc.width - 1,
                            height: rc.height - 1
                        });
                        // and make it the active editor
                        g._edtHdl._edt = this._tbx;
                    }
                }
            };
            // forward up/down keys to grid in case it's in a form element in IE (ugh! TFS 202913)
            _ImeHandler.prototype._keydown = function (e) {
                switch (e.keyCode) {
                    case wijmo.Key.Up:
                    case wijmo.Key.Down:
                    case wijmo.Key.PageUp:
                    case wijmo.Key.PageDown:
                        this._g._keyHdl._keydown(e);
                }
            };
            // enable/disable IME on mousedown/up (TFS 194411)
            _ImeHandler.prototype._mousedown = function (e) {
                this._mouseDown = true;
                this._updateImeFocus();
            };
            _ImeHandler.prototype._mouseup = function (e) {
                this._mouseDown = false;
                this._updateImeFocus();
            };
            // transfer focus from grid to IME input
            _ImeHandler.prototype._updateImeFocus = function () {
                var g = this._g, ae = wijmo.getActiveElement();
                if (!g.activeEditor && !g.isTouching && !this._mouseDown &&
                    wijmo.contains(g.hostElement, ae)) {
                    var tbx = this._tbx;
                    if (this._enableIme()) {
                        if (ae != tbx) {
                            tbx.disabled = false;
                            tbx.select();
                        }
                    }
                    else {
                        tbx.disabled = true;
                    }
                }
            };
            // checks whether IME should be enabled for the current selection
            _ImeHandler.prototype._enableIme = function () {
                var g = this._g, sel = g.selection;
                // can't edit? can't use IME
                if (!g.canEditCell(sel.row, sel.col)) {
                    return false;
                }
                // disable IME for boolean cells (with checkboxes)
                if (g.columns[sel.col].dataType == wijmo.DataType.Boolean) {
                    return false;
                }
                // seems OK to use IME
                return true;
            };
            return _ImeHandler;
        }());
        grid._ImeHandler = _ImeHandler;
    })(grid = wijmo.grid || (wijmo.grid = {}));
})(wijmo || (wijmo = {}));

