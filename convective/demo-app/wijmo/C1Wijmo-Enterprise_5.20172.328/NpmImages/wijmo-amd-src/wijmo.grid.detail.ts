

import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';


import * as wjcSelf from 'wijmo/wijmo.grid.detail';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['grid'] = window['wijmo']['grid'] || {};
window['wijmo']['grid']['detail'] = wjcSelf;

/*
    *
    * Wijmo Library 5.20172.328
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
 * Extension that provides detail rows for @see:FlexGrid controls.
 */

    'use strict';

    /**
     * Specifies when and how the row details are displayed.
     */
    export enum DetailVisibilityMode {
        /**
         * Details are shown or hidden in code, using the 
         * @see:FlexGridDetailProvider.showDetail and
         * @see:FlexGridDetailProvider.hideDetail methods.
         */
        Code,
        /**
         * Details are shown for the row that is currently selected.
         */
        Selection,
        /**
         * Details are shown or hidden using buttons added to the row headers.
         * Only one row may be expanded at a time.
         */
        ExpandSingle,
        /**
         * Details are shown or hidden using buttons added to the row headers.
         * Multiple rows may be expanded at a time.
         */
        ExpandMulti,
    }

    /**
     * Implements detail rows for @see:FlexGrid controls.
     *
     * To add detail rows to a @see:FlexGrid control, create an instance of a
     * @see:FlexGridDetailProvider and set the @see:createDetailCell property
     * to a function that creates elements to be displayed in the detail cells.
     *
     * For example:
     *
     * <pre>// create FlexGrid to show categories
     * var gridCat = new wijmo.grid.FlexGrid('#gridCat');
     * gridCat.itemsSource = getCategories();
     * // add detail rows showing products in each category
     * var detailProvider = new wijmo.grid.detail.FlexGridDetailProvider(gridCat);
     * detailProvider.createDetailCell = function (row) {
     *   var cell = document.createElement('div');
     *   var gridProducts = new wijmo.grid.FlexGrid(cell);
     *   gridProducts.itemsSource = getProducts(row.dataItem.CategoryID);
     *   return cell;
     * }</pre>
     *
     * The @see:FlexGridDetailProvider provides a @see:detailVisibilityMode property
     * that determines when the detail rows should be displayed. The default value for
     * this property is <b>ExpandSingle</b>, which adds collapse/expand icons to the
     * row headers.
     */
    export class FlexGridDetailProvider {
        _g: wjcGrid.FlexGrid;
        _maxHeight: number;
        _mode = DetailVisibilityMode.ExpandSingle;
        _animated = false;
        _toSel: any;
        _createDetailCellFn: Function;
        _disposeDetailCellFn: Function;
        _rowHasDetailFn: Function;

        /**
         * Initializes a new instance of the @see:FlexGridDetailProvider class.
         *
         * @param grid @see:FlexGrid that will receive detail rows.
         * @param options Initialization options for the new @see:FlexGridDetailProvider.
         */
        constructor(grid: wjcGrid.FlexGrid, options?: any) {
            this._g = grid;

            // custom merging for cells and row headers
            grid.mergeManager = new DetailMergeManager(grid);

            // expand/collapse detail
            grid.rowHeaders.hostElement.addEventListener('click', this._hdrClick.bind(this));

            // show details, collapse/expand icons
            grid.formatItem.addHandler(this._formatItem, this);

            // show details for selected cell
            grid.selectionChanged.addHandler(this._selectionChanged, this);

            // refresh controls to update layout when detail rows are resized
            grid.resizedRow.addHandler(this._resizedRow, this);

            // hide all details when grid is refreshed
            grid.loadingRows.addHandler(() => {
                this.hideDetail();
            });

            // hide detail when dragging row (TFS 241962)
            grid.draggingRow.addHandler((s, e: wjcGrid.CellRangeEventArgs) => {
                if (e.row < s.rows.length - 1 && s.rows[e.row + 1] instanceof DetailRow) {
                    e.cancel = true;
                    this.hideDetail(e.row);
                }
            });

            // keep detail row at the start even with frozen columns (TFS 131863)
            grid.formatItem.addHandler((s, e: wjcGrid.FormatItemEventArgs) => {
                if (e.panel == s.cells) {
                    var row = s.rows[e.row];
                    if (row instanceof DetailRow) {
                        e.cell.style.left = '0';
                    }
                }
            });

            // apply initialization options if any
            if (options) {
                wjcCore.copy(this, options);
            }
        }

        // ** object model

        /**
         * Gets the @see:FlexGrid that owns this @see:FlexGridDetailProvider.
         */
        get grid(): wjcGrid.FlexGrid {
            return this._g;
        }
        /**
         * Gets or sets a value that determines when row details are displayed.
         */
        get detailVisibilityMode(): DetailVisibilityMode {
            return this._mode;
        }
        set detailVisibilityMode(value: DetailVisibilityMode) {
            if (value != this._mode) {
                this._mode = wjcCore.asEnum(value, DetailVisibilityMode);
                this.hideDetail();
                this._g.invalidate();
            }
        }
        /**
         * Gets or sets the maximum height of the detail rows, in pixels.
         */
        get maxHeight(): number { 
            return this._maxHeight;
        }
        set maxHeight(value: number) { 
            this._maxHeight = wjcCore.asNumber(value, true);
        }
        /**
         * Gets or sets a value that indicates whether to use animation when
         * showing row details.
         */
        get isAnimated(): boolean {
            return this._animated;
        }
        set isAnimated(value: boolean) {
            if (value != this._animated) {
                this._animated = wjcCore.asBoolean(value);
            }
        }
        /**
         * Gets or sets the callback function that creates detail cells.
         *
         * The callback function takes a @see:Row as a parameter and
         * returns an HTML element representing the row details.
         * For example:
         *
         * <pre>// create detail cells for a given row
         * dp.createDetailCell = function (row) {
         *   var cell = document.createElement('div');
         *   var detailGrid = new wijmo.grid.FlexGrid(cell, {
         *     itemsSource: getProducts(row.dataItem.CategoryID),
         *     headersVisibility: wijmo.grid.HeadersVisibility.Column
         *   });
         *   return cell;
         * };</pre>
         */
        get createDetailCell(): Function {
            return this._createDetailCellFn;
        }
        set createDetailCell(value: Function) {
            this._createDetailCellFn = wjcCore.asFunction(value, true);
        }
        /**
         * Gets or sets the callback function that disposes of detail cells.
         *
         * The callback function takes a @see:Row as a parameter and
         * disposes of any resources associated with the detail cell.
         *
         * This function is optional. Use it in cases where the 
         * @see:createDetailCell function allocates resources that are not
         * automatically garbage-collected.
         */
        get disposeDetailCell(): Function {
            return this._disposeDetailCellFn;
        }
        set disposeDetailCell(value: Function) {
            this._disposeDetailCellFn = wjcCore.asFunction(value, true);
        }
        /**
         * Gets or sets the callback function that determines whether a row 
         * has details.
         *
         * The callback function takes a @see:Row as a parameter and
         * returns a boolean value that indicates whether the row has
         * details. For example:
         *
         * <pre>// remove details from items with odd CategoryID
         * dp.rowHasDetail = function (row) {
         *   return row.dataItem.CategoryID % 2 == 0;
         * };</pre>
         *
         * Setting this property to null indicates all rows have details.
         */
        get rowHasDetail(): Function {
            return this._rowHasDetailFn;
        }
        set rowHasDetail(value: Function) {
            this._rowHasDetailFn = wjcCore.asFunction(value, true);
        }
        /**
         * Gets a value that determines if a row's details are visible.
         *
         * @param row Row or index of the row to investigate.
         */
        isDetailVisible(row: any): boolean {
            var rows = this._g.rows;
            row = this._toIndex(row);
            if (rows[row] instanceof DetailRow) {
                return true;
            }
            if (row < rows.length - 1 && rows[row + 1] instanceof DetailRow) {
                return true;
            }
            return false;
        }
        /**
         * Gets a value that determines if a row has details to show.
         *
         * @param row Row or index of the row to investigate.
         */
        isDetailAvailable(row: any): boolean {
            var rows = this._g.rows;
            row = this._toIndex(row);
            return this._hasDetail(row);
        }
        /**
         * Hides the detail row for a given row.
         *
         * @param row Row or index of the row that will have its details hidden.
         * This parameter is optional. If not provided, all detail rows are hidden.
         */
        hideDetail(row?: any) {
            var rows = this._g.rows;

            // if 'row' is not provided, hide all details
            if (row == null) {
                for (var r = 0; r < rows.length; r++) {
                    if (rows[r] instanceof DetailRow) {
                        this.hideDetail(r);
                    }
                }
                return;
            }

            // remove detail for a given row
            row = this._toIndex(row);

            // skip to next row if this is the main row
            if (!(rows[row] instanceof DetailRow) && 
                row < rows.length - 1 && 
                rows[row + 1] instanceof DetailRow) {
                row++;
            }

            // if we have a detail row, dispose of any child controls 
            // (to avoid memory leaks) and remove the row
            var detailRow = rows[row];
            if (detailRow instanceof DetailRow) {
                if (this.disposeDetailCell) {
                    this.disposeDetailCell(detailRow);
                }
                wjcCore.Control.disposeAll(detailRow.detail);
                rows.removeAt(row);
            }
        }
        /**
         * Shows the detail row for a given row.
         *
         * @param row Row or index of the row that will have its details shown.
         * @param hideOthers Whether to hide details for all other rows.
         */
        showDetail(row: any, hideOthers = false) {
            var g = this._g,
                rows = g.rows;

            // convert rows into indices
            row = this._toIndex(row);

            // get main row if given row was a detail
            if (row > 0 && rows[row] instanceof DetailRow) {
                row--;
            }

            // hide others before showing this
            if (hideOthers) {
                var sel = g.selection,
                    updateSelection = false;
                for (var r = 0; r < rows.length - 1; r++) {
                    if (r != row && rows[r + 1] instanceof DetailRow) {
                        this.hideDetail(r);
                        if (r < row) {
                            row--;
                        }
                        if (r < sel.row) {
                            sel.row--;
                            sel.row2--;
                            updateSelection = true;
                        }
                    }
                }
                if (updateSelection) {
                    g.select(sel, false);
                }
            }

            // show this after hiding the others (TFS 203017)
            if (!this.isDetailVisible(row) && this._hasDetail(row)) {

                // create detail row and cell element
                var detailRow = new DetailRow(rows[row]);
                detailRow.detail = this._createDetailCell(rows[row]);

                // insert new detail row below the current row and show it
                if (detailRow.detail) {
                    if (!this._animated) { // without animation
                        rows.insert(row + 1, detailRow);
                        g.scrollIntoView(row, -1);
                    } else { // with animation
                        var style = detailRow.detail.style;
                        style.transform = 'translateY(-100%)';
                        style.opacity = '0';
                        rows.insert(row + 1, detailRow);
                        wjcCore.animate((pct) => {
                            if (pct < 1) {
                                style.transform = 'translateY(' + (-(1 - pct) * 100).toFixed(0) + '%)';
                                style.opacity = (pct * pct).toString();
                            } else {
                                style.transform = '';
                                style.opacity = '';
                                wjcCore.Control.invalidateAll(detailRow.detail);
                                g.scrollIntoView(row, -1);
                            }
                        });
                    }
                }
            }
        }

        // ** implementation

        // convert Row objects into row indices
        _toIndex(row: any): number {
            if (row instanceof wjcGrid.Row) {
                row = row.index;
            }
            return wjcCore.asNumber(row, false, true);
        }

        // expand/collapse detail row
        _hdrClick(e: MouseEvent) {
            if (!e.defaultPrevented) {
                switch (this._mode) {
                    case DetailVisibilityMode.ExpandMulti:
                    case DetailVisibilityMode.ExpandSingle:
                        var g = this._g,
                            ht = g.hitTest(e);
                        if (ht.row > -1) {
                            var row = g.rows[ht.row];
                            if (this.isDetailVisible(ht.row)) {
                                this.hideDetail(ht.row);
                            } else {
                                g.select(new wjcGrid.CellRange(ht.row, 0, ht.row, g.columns.length - 1));
                                this.showDetail(ht.row, this._mode == DetailVisibilityMode.ExpandSingle);
                            }
                            e.preventDefault();
                        }
                        break;
                }
            }
        }

        // expand selected row (but not too often)
        _selectionChanged(s: wjcGrid.FlexGrid, e: wjcCore.EventArgs) {
            if (this._mode == DetailVisibilityMode.Selection) {
                if (this._toSel) {
                    clearTimeout(this._toSel);
                }
                this._toSel = setTimeout(() => {
                    if (s.selection.row > -1) { // TFS 121667
                        this.showDetail(s.selection.row, true);
                    } else {
                        this.hideDetail();
                    }
                }, 300);
            }
        }

        // show details, collapse/expand icons
        _formatItem(s, e: wjcGrid.FormatItemEventArgs) {
            var g = this._g,
                row = e.panel.rows[e.row];

            // show detail in detail row
            if (e.panel == g.cells && row instanceof DetailRow && row.detail != null) {

                // add detail to cell
                wjcCore.addClass(e.cell, 'wj-detail');
                e.cell.textContent = '';
                e.cell.style.textAlign = ''; // TFS 130035
                e.cell.appendChild(row.detail);

                // set row height (once)
                if (row.height == null) {

                    // make sure controls in detail cell are properly sized
                    wjcCore.Control.refreshAll(e.cell)

                    // calculate height needed for the detail plus padding
                    var cs = getComputedStyle(e.cell),
                        h = row.detail.scrollHeight + parseInt(cs.paddingTop) + parseInt(cs.paddingBottom);

                    // honor max height
                    if (this._maxHeight > 0 && h > this._maxHeight) {
                        h = this._maxHeight;
                    }

                    // apply height
                    row.height = h;

                    // make the cell element fill the row
                    if (!row.detail.style.height) {
                        row.detail.style.height = '100%';
                    }

                    // make inner FlexGrid controls fill the row
                    var gridHost = row.detail.querySelector('.wj-flexgrid') as HTMLElement;
                    if (gridHost && !gridHost.style.height) {
                        gridHost.style.height = '100%';
                    }
                } else {
                    setTimeout(() => {
                        wjcCore.Control.refreshAll(row.detail);
                    });
                }
            }

            // show collapse/expand icon
            if (this._mode == DetailVisibilityMode.ExpandMulti ||
                this._mode == DetailVisibilityMode.ExpandSingle) {

                // if this row has details, add collapse/expand icons
                if (e.panel == g.rowHeaders && e.col == 0 && this._hasDetail(e.row)) {

                    // if the next row is, the icon is a 'minus' (collapse)
                    var minus = e.row < g.rows.length - 1 && g.rows[e.row + 1] instanceof DetailRow;

                    // show icon
                    e.cell.innerHTML = minus
                        ? '<span class="wj-glyph-minus"></span>'
                        : '<span class="wj-glyph-plus"></span>';
                }
            }
        }

        // refresh controls to update layout when detail rows are resized
        _resizedRow(s, e: wjcGrid.FormatItemEventArgs) {
            var row = e.panel.rows[e.row];
            if (row instanceof DetailRow && row.detail) {
                wjcCore.Control.refreshAll(row.detail);
            }
        }

        // check if a row has details currently visible
        _hasVisibleDetail(row: wjcGrid.Row): boolean {
            return row instanceof DetailRow || row instanceof wjcGrid.GroupRow || row instanceof wjcGrid._NewRowTemplate
                ? false
                : true;
        }

        // check if a row has details to show
        _hasDetail(row: number): boolean {
            return wjcCore.isFunction(this._rowHasDetailFn)
                ? this._rowHasDetailFn(this._g.rows[row])
                : true;
        }

        // creates the cell element that will show details for a given row
        _createDetailCell(row: wjcGrid.Row, col?: wjcGrid.Column): HTMLElement {
            return this.createDetailCell
                ? this.createDetailCell(row, col)
                : null;
        }
    }


    'use strict';

    /**
     * Merge manager class used by the @see:FlexGridDetailProvider class.
     *
     * The @see:DetailMergeManager merges detail cells (cells in a @see:DetailRow)
     * into a single detail cell that spans all grid columns.
     */
    export class DetailMergeManager extends wjcGrid.MergeManager {

        /**
         * Initializes a new instance of the @see:DetailMergeManager class.
         *
         * @param grid The @see:FlexGrid object that owns this @see:DetailMergeManager.
         */
        constructor(grid: wjcGrid.FlexGrid) {
            super(grid);
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
        getMergedRange(p: wjcGrid.GridPanel, r: number, c: number, clip = true): wjcGrid.CellRange {
            switch (p.cellType) {

                // merge detail cells all the way across
                case wjcGrid.CellType.Cell:
                    if (p.rows[r] instanceof DetailRow) {
                        return new wjcGrid.CellRange(r, 0, r, p.columns.length - 1);
                    }
                    break;

                // merge row headers for main and detail rows
                case wjcGrid.CellType.RowHeader:
                    if (p.rows[r] instanceof DetailRow) {
                        return new wjcGrid.CellRange(r - 1, c, r, c);
                    } else if (r < p.rows.length - 1 && p.rows[r + 1] instanceof DetailRow) {
                        return new wjcGrid.CellRange(r, c, r + 1, c);
                    }
                    break;
            }

            // allow base class
            return super.getMergedRange(p, r, c, clip);
        }
   }


    'use strict';

    /**
     * Row that contains a single detail cell spanning all grid columns.
     */
    export class DetailRow extends wjcGrid.Row {
        _detail: HTMLElement;

        /**
         * Initializes a new instance of the @see:DetailRow class.
         * 
         * @param parentRow @see:Row that this @see:DetailRow provides details for.
         */
        constructor(parentRow: wjcGrid.Row) {
            super();
            this.isReadOnly = true;
        }

        /**
         * Gets or sets the HTML element that represents the detail cell in this @see:DetailRow.
         */
        get detail() : HTMLElement {
            return this._detail;
        }
        set detail(value: HTMLElement) {
            this._detail = value;
        }
    }


