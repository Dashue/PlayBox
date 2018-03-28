

import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';


import * as wjcSelf from 'wijmo/wijmo.grid.multirow';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['grid'] = window['wijmo']['grid'] || {};
window['wijmo']['grid']['multirow'] = wjcSelf;

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

    'use strict';

    /**
     * Extends the @see:Row to provide additional information for multi-row records.
     */
    export class _MultiRow extends wjcGrid.Row {
        _idxData: number;
        _idxRecord: number;

        /**
         * Initializes a new instance of the @see:Row class.
         *
         * @param dataItem The data item this row is bound to.
         * @param dataIndex The index of the record within the items source.
         * @param recordIndex The index of this row within the record (data item).
         */
        constructor(dataItem: any, dataIndex: number, recordIndex: number) {
            super(dataItem);
            this._idxData = dataIndex;
            this._idxRecord = recordIndex;
        }
        /**
         * Gets the index of this row within the record (data item) it represents.
         */
        get recordIndex(): number {
            return this._idxRecord;
        }
        /**
         * Gets the index of this row within the data source collection.
         */
        get dataIndex(): number {
            return this._idxData;
        }
    }


    'use strict';

    /**
     * Extends the @see:Column class with <b>colspan</b> property to
     * describe a cell in a @see:_CellGroup.
     */
    export class _Cell extends wjcGrid.Column {
        _row: number;
        _col: number;
        _colspan: number;
        _rowspan: number;

        /**
         * Initializes a new instance of the @see:_Cell class.
         *
         * @param options JavaScript object containing initialization data for the @see:_Cell.
         */
        constructor(options?: any) {
            super();
            this._row = this._col = 0;
            this._rowspan = this._colspan = 1;
            if (options) {
                wjcCore.copy(this, options);
            }
        }

        /**
         * Gets or sets the number of physical columns spanned by the @see:_Cell.
         */
        get colspan(): number {
            return this._colspan;
        }
        set colspan(value: number) {
            this._colspan = wjcCore.asInt(value, false, true);
        }
    }


    'use strict';

    /**
     * Describes a group of cells that may span multiple rows and columns.
     */
    export class _CellGroup extends _Cell {
        _g: MultiRow;               // owner grid
        _colstart = 0;              // index of the column where this group starts
        _cells: _Cell[];            // list of binding columns in this group
        _rng: wjcGrid.CellRange[];          // array of ranges with merge range offsets for cells in this group
        _cols: wjcGrid.ColumnCollection;    // array of columns to use for binding cells in this group

        /**
         * Initializes a new instance of the @see:_CellGroup class.
         *
         * @param grid @see:MultiRow that owns the @see:_CellGroup.
         * @param options JavaScript object containing initialization data for the new @see:_CellGroup.
         */
        constructor(grid: MultiRow, options?: any) {
            super();

            // save reference to owner grid
            this._g = grid;

            // parse options
            if (options) {
                wjcCore.copy(this, options);
            }
            if (!this._cells) {
                throw 'Cell group with no cells?';
            }

            // group cannot span more columns than there are cells (TFS 228090)
            if (this._colspan > this._cells.length) {
                this._colspan = this._cells.length;
            }

            // count rows/columns
            let r = 0,
                c = 0;
            for (let i = 0; i < this._cells.length; i++) {
                let cell = this._cells[i] as _Cell;

                // if the cell doesn't fit in this row, start a new row
                if (c + cell.colspan > this._colspan) {
                    r++;
                    c = 0;
                }

                // store cell position within the group
                cell._row = r;
                cell._col = c;

                // update column and continue
                c += cell.colspan;
            }
            this._rowspan = r + 1;

            // adjust colspans to fill every row
            for (let i = 0; i < this._cells.length; i++) {
                let cell = this._cells[i] as _Cell;
                if (i == this._cells.length - 1 || this._cells[i + 1]._row > cell._row) {
                    c = cell._col;
                    cell._colspan = this._colspan - c;
                }
            }
        }

        // method used in JSON-style initialization
        _copy(key: string, value: any): boolean {
            if (key == 'cells') {
                this._cells = [];
                if (wjcCore.isArray(value)) {
                    for (let i = 0; i < value.length; i++) {
                        let cell = new _Cell(value[i]);
                        if (!value[i].header && cell.binding) {
                            value.header = wjcCore.toHeaderCase(cell.binding);
                        }
                        this._cells.push(cell);
                        this._colspan = Math.max(this._colspan, cell.colspan);
                    }
                }
                return true;
            }
            return false;
        }

        // required for JSON-style initialization
        get cells(): _Cell[] {
            return this._cells;
        }

        // calculate merged ranges
        closeGroup(rowsPerItem: number) {

            // adjust rowspan to match longest group in the grid
            if (rowsPerItem > this._rowspan) {
                for (let i = 0; i < this._cells.length; i++) {
                    let cell = this._cells[i];
                    if (cell._row == this._rowspan - 1) {
                        cell._rowspan = rowsPerItem - cell._row;
                    }
                }
                this._rowspan = rowsPerItem;
            }

            // create arrays with binding columns and merge ranges for each cell
            this._cols = new wjcGrid.ColumnCollection(this._g, this._g.columns.defaultSize);
            this._rng = new Array(rowsPerItem * this._colspan);
            for (let i = 0; i < this._cells.length; i++) {
                let cell = this._cells[i] as _Cell;
                for (let r = 0; r < cell._rowspan; r++) {
                    for (let c = 0; c < cell._colspan; c++) {
                        let index = (cell._row + r) * this._colspan + (cell._col) + c;

                        // save binding column for this cell offset
                        // (using 'setAt' to handle list ownership)
                        this._cols.setAt(index, cell);
                        //console.log('binding[' + index + '] = ' + cell.binding);

                        // save merge range for this cell offset
                        let rng = new wjcGrid.CellRange(0 - r, 0 - c, 0 - r + cell._rowspan - 1, 0 - c + cell._colspan - 1);
                        if (!rng.isSingleCell) {
                            //console.log('rng[' + index + '] = ' + format('({row},{col})-({row2},{col2})', rng));
                            this._rng[index] = rng;
                        }
                    }
                }
            }

            // add extra range for collapsed group headers
            this._rng[-1] = new wjcGrid.CellRange(0, this._colstart, 0, this._colstart + this._colspan - 1);
        }

        // get the preferred column width for a column in the group
        getColumnWidth(c: number): any {
            for (let i = 0; i < this._cells.length; i++) {
                let cell = this._cells[i];
                if (cell._col == c && cell.colspan == 1) {
                    return cell.width;
                }
            }
            return null;
        }

        // get merged range for a cell in this group
        getMergedRange(p: wjcGrid.GridPanel, r: number, c: number): wjcGrid.CellRange {

            // column header group
            if (r < 0) {
                return this._rng[-1];
            }

            // regular cell range
            let row = p.rows[r] as _MultiRow,
                rs = row.recordIndex != null ? row.recordIndex : r % this._rowspan,
                cs = c - this._colstart,
                rng = this._rng[rs * this._colspan + cs];

            // column headers non-group
            if (p.cellType == wjcGrid.CellType.ColumnHeader) {
                r++;
            }

            // done
            return rng
                ? new wjcGrid.CellRange(r + rng.row, c + rng.col, r + rng.row2, c + rng.col2)
                : null;
        }

        // get the binding column for a cell in this group
        getBindingColumn(p: wjcGrid.GridPanel, r: number, c: number): wjcGrid.Column {

            // merged column header binding
            // return 'this' to render the collapsed column header
            if (r < 0) {
                return this;
            }

            // regular cells
            let row = p.rows[r] as _MultiRow,
                rs = (row && row.recordIndex != null) ? row.recordIndex : r % this._rowspan,
                cs = c - this._colstart;
            return this._cols[rs * this._colspan + cs];
        }

        // get the binding column by name/binding
        getColumn(name: string): wjcGrid.Column {
            return this._cols.getColumn(name);
        }
    }


    'use strict';

    /**
     * Provides custom merging for @see:MultiRow controls.
     */
    export class _MergeManager extends wjcGrid.MergeManager {

        /**
         * Gets a @see:CellRange that specifies the merged extent of a cell
         * in a @see:GridPanel.
         *
         * @param p The @see:GridPanel that contains the range.
         * @param r The index of the row that contains the cell.
         * @param c The index of the column that contains the cell.
         * @param clip Specifies whether to clip the merged range to the grid's current view range.
         * @return A @see:CellRange that specifies the merged range, or null if the cell is not merged.
         */
        getMergedRange(p: wjcGrid.GridPanel, r: number, c: number, clip = true): wjcGrid.CellRange {
            let grid = p.grid as MultiRow;

            // handle group rows
            switch (p.cellType) {
                case wjcGrid.CellType.Cell:
                case wjcGrid.CellType.RowHeader:
                    if (p.rows[r] instanceof wjcGrid.GroupRow) {
                        return super.getMergedRange(p, r, c, clip);
                    }
            }

            // other cells
            switch (p.cellType) {

                // merge cells in cells and column headers panels
                case wjcGrid.CellType.Cell:
                case wjcGrid.CellType.ColumnHeader:

                    // get the group range
                    let group = grid._cellGroupsByColumn[c] as _CellGroup;
                    wjcCore.assert(group instanceof _CellGroup, 'Failed to get the group!');
                    let rng = (p.cellType == wjcGrid.CellType.ColumnHeader)
                        ? group.getMergedRange(p, r - 1, c) // discount group header row (always the first)
                        : group.getMergedRange(p, r, c);

                    // prevent merging across frozen column boundary (TFS 192385)
                    if (rng && p.columns.frozen) {
                        let frz = p.columns.frozen;
                        if (rng.col < frz && rng.col2 >= frz) {
                            if (c < frz) {
                                rng.col2 = frz - 1;
                            } else {
                                rng.col = frz;
                            }
                        }
                    }

                    // prevent merging across frozen row boundary (TFS 192385)
                    if (rng && p.rows.frozen && p.cellType == wjcGrid.CellType.Cell) {
                        let frz = p.rows.frozen;
                        if (rng.row < frz && rng.row2 >= frz) {
                            if (r < frz) {
                                rng.row2 = frz - 1;
                            } else {
                                rng.row = frz;
                            }
                        }
                    }

                    // return the range
                    return rng;

                // merge cells in row headers panel
                case wjcGrid.CellType.RowHeader:
                    let rpi = grid._rowsPerItem,
                        row = p.rows[r] as _MultiRow,
                        top = r - row.recordIndex;
                    return new wjcGrid.CellRange(top, 0, top + rpi - 1, p.columns.length - 1);

                // merge cells in top/left cell
                case wjcGrid.CellType.TopLeft:
                    return new wjcGrid.CellRange(0, 0, p.rows.length - 1, p.columns.length - 1);
            }

            // no merging
            return null;
        }
    }


    'use strict';

    /**
     * Manages the new row template used to add rows to the grid.
     */
    export class _AddNewHandler extends wjcGrid._AddNewHandler {

        /**
         * Initializes a new instance of the @see:_AddNewHandler class.
         *
         * @param grid @see:FlexGrid that owns this @see:_AddNewHandler.
         */
        constructor(grid: wjcGrid.FlexGrid) {

            // detach old handler
            let old = grid._addHdl;
            old._detach();

            // attach this handler instead
            super(grid);
        }

        /**
         * Updates the new row template to ensure that it is visible only when the grid is
         * bound to a data source that supports adding new items, and that it is 
         * in the right position.
         */
        updateNewRowTemplate() {

            // get variables
            let ecv = this._g.editableCollectionView,
                g = this._g as MultiRow,
                rows = g.rows;

            // see if we need a new row template
            let needTemplate = ecv && ecv.canAddNew && g.allowAddNew && !g.isReadOnly;

            // see if we have new row template
            let hasTemplate = true;
            for (let i = rows.length - g.rowsPerItem; i < rows.length; i++) {
                if (!(rows[i] instanceof _NewRowTemplate)) {
                    hasTemplate = false;
                    break;
                }
            }

            // add template
            if (needTemplate && !hasTemplate) {
                for (let i = 0; i < g.rowsPerItem; i++) {
                    let nrt = new _NewRowTemplate(i);
                    rows.push(nrt);
                }
            }

            // remove template
            if (!needTemplate && hasTemplate) {
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i] instanceof _NewRowTemplate) {
                        rows.removeAt(i);
                        i--;
                    }
                }
            }
        }
    }

    /**
     * Represents a row template used to add items to the source collection.
     */
    class _NewRowTemplate extends wjcGrid._NewRowTemplate {
        _idxRecord: number;
        constructor(indexInRecord: number) {
            super();
            this._idxRecord = indexInRecord;
        }
        get recordIndex(): number {
            return this._idxRecord;
        }
    }


/**
 * Defines the @see:MultiRow control and its associated classes.
 */

    'use strict';

    /**
     * Extends the @see:FlexGrid control to provide multiple rows per item.
     *
     * Use the <b>layoutDefinition</b> property to define the layout of the rows 
     * used to display each data item.
     *
     * A few @see:FlexGrid properties are disabled in the @see:MultiRow control
     * because they would interfere with the custom multi-row layouts.
     * The list of disabled properties includes @see:FlexGrid.allowMerging and
     * @see:FlexGrid.childItemsPath.
     */
    export class MultiRow extends wjcGrid.FlexGrid {
        _rowsPerItem = 1;
        _layoutDef: any[];
        _cellBindingGroups: _CellGroup[] = [];
        _cellGroupsByColumn: any;
        _centerVert = true;
        _collapsedHeaders = false;
        _btnCollapse: HTMLElement;

        /**
         * Initializes a new instance of the @see:MultiRow class.
         * 
         * In most cases, the <b>options</b> parameter will include the value for the
         * @see:layoutDefinition property.
         *
         * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);

            // add class name to enable styling
            wjcCore.addClass(this.hostElement, 'wj-multirow');

            // add header collapse/expand button
            let hdr = this.columnHeaders.hostElement.parentElement,
                btn = wjcCore.createElement('<div class="wj-hdr-collapse"><span></span></div>');
            btn.style.display = 'none';
            hdr.appendChild(btn);
            this._btnCollapse = btn;
            this._updateButtonGlyph();

            // handle mousedown on collapse/expand button (not click: TFS 190572)
            this.addEventListener(btn, 'mousedown', (e: MouseEvent) => {
                this.collapsedHeaders = !this.collapsedHeaders;
                e.preventDefault();
            }, true);

            // change some defaults
            this.autoGenerateColumns = false;
            this.mergeManager = new _MergeManager(this);

            // can't drag/drop columns on MultiRow
            // but can drag columns into GroupPanel
            let host = this.hostElement;
            this.removeEventListener(host, 'dragover');
            this.removeEventListener(host, 'dragleave');
            this.removeEventListener(host, 'dragdrop');

            // custom AddNewHandler
            this._addHdl = new _AddNewHandler(this);

            // customize cell rendering
            this.formatItem.addHandler(this._formatItem, this);

            // select multi-row items when clicking the row headers
            this.addEventListener(this.rowHeaders.hostElement, 'click', (e: MouseEvent) => {
                if (!e.defaultPrevented && this.selectionMode != wjcGrid.SelectionMode.None) {
                    let ht = this.hitTest(e);
                    if (ht.panel == this.rowHeaders && ht.row > -1) {
                        let sel = this.selection,
                            topRow = this.rows[sel.topRow] as _MultiRow,
                            botRow = this.selectionMode != wjcGrid.SelectionMode.Row
                                ? <_MultiRow>this.rows[sel.bottomRow]
                                : topRow;
                        if (topRow && topRow.recordIndex != null) {
                            let top = topRow.index - topRow.recordIndex,
                                bot = botRow.index - botRow.recordIndex + this.rowsPerItem - 1,
                                cnt = this.columns.length - 1,
                                rng = sel.row != sel.topRow
                                    ? new wjcGrid.CellRange(bot, 0, top, cnt)
                                    : new wjcGrid.CellRange(top, 0, bot, cnt);
                            this.select(rng);
                            e.preventDefault();
                        }
                    }
                }
            }, true);

            // apply options after everything else is ready
            this.initialize(options);
        }

        /**
         * Gets or sets an array that defines the layout of the rows used to display each data item.
         *
         * The array contains a list of cell group objects which have the following properties:
         *
         * <ul>
         * <li><b>header</b>: Group header (shown when the headers are collapsed)</li>
         * <li><b>colspan</b>: Number of grid columns spanned by the group</li>
         * <li><b>cells</b>: Array of cell objects, which extend @see:Column with a <b>colspan</b> property.</li>
         * </ul>
         *
         * When the @see:layoutDefinition property is set, the grid scans the cells in each
         * group as follows:
         *
         * <ol>
         * <li>The grid calculates the colspan of the group either as group's own colspan 
         * or as span of the widest cell in the group, whichever is wider.</li>
         * <li>If the cell fits the current row within the group, it is added to the current row.</li>
         * <li>If it doesn't fit, it is added to a new row.</li>
         * </ol>
         *
         * When all groups are ready, the grid calculates the number of rows per record to the maximum 
         * rowspan of all groups, and adds rows to each group to pad their height as needed.
         *
         * This scheme is simple and flexible. For example:
         * <pre>{ header: 'Group 1', cells: [{ binding: 'c1' }, { bnding: 'c2'}, { binding: 'c3' }]}</pre>
         *
         * The group has colspan 1, so there will be one cell per column. The result is:
         * <pre>
         * | C1 |
         * | C2 |
         * | C3 |
         * </pre>
         *
         * To create a group with two columns, set <b>colspan</b> property of the group:
         *
         * <pre>{ header: 'Group 1', colspan: 2, cells:[{ binding: 'c1' }, { binding: 'c2'}, { binding: 'c3' }]}</pre>
         *
         * The cells will wrap as follows:
         * <pre>
         * | C1  | C2 |
         * | C3       |
         * </pre>
         *
         * Note that the last cell spans two columns (to fill the group).
         *
         * You can also specify the colspan on individual cells rather than on the group:
         *
         * <pre>{ header: 'Group 1', cells: [{binding: 'c1', colspan: 2 }, { bnding: 'c2'}, { binding: 'c3' }]}</pre>
         *
         * Now the first cell has colspan 2, so the result is:
         * <pre>
         * | C1       |
         * | C2 |  C3 |
         * </pre>
         *
         * Because cells extend the @see:Column class, you can add all the usual @see:Column 
         * properties to any cells:
         * <pre>
         * { header: 'Group 1', cells: [
         *    { binding: 'c1', colspan: 2 },
         *    { bnding: 'c2'},
         *    { binding: 'c3', format: 'n0', required: false, etc... } 
         * ]}</pre>
         */
        get layoutDefinition(): any[] {
            return this._layoutDef;
        }
        set layoutDefinition(value: any[]) {

            // store original value so user can get it back
            this._layoutDef = wjcCore.asArray(value);

            // parse cell bindings
            this._rowsPerItem = 1;
            this._cellBindingGroups = this._parseCellGroups(this._layoutDef);
            for (let i = 0; i < this._cellBindingGroups.length; i++) {
                let group = this._cellBindingGroups[i];
                this._rowsPerItem = Math.max(this._rowsPerItem, group._rowspan);
            }

            // go bind/rebind the grid
            this._bindGrid(true);
        }
        /**
         * Gets the number of rows used to display each item.
         *
         * This value is calculated automatically based on the value
         * of the <b>layoutDefinition</b> property.
         */
        get rowsPerItem(): number {
            return this._rowsPerItem;
        }
        /**
         * Gets the @see:Column object used to bind a data item to a grid cell.
         *
         * @param p @see:GridPanel that contains the cell.
         * @param r Index of the row that contains the cell.
         * @param c Index of the column that contains the cell.
         */
        getBindingColumn(p: wjcGrid.GridPanel, r: number, c: number): wjcGrid.Column {
            return this._getBindingColumn(p, r, p.columns[c]);
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
        getColumn(name: string): wjcGrid.Column {
            let groups = this._cellBindingGroups;
            for (let i = 0; i < groups.length; i++) {
                let col = groups[i].getColumn(name);
                groups[i].getBindingColumn
                if (col) {
                    return col;
                }
            }
            return null;
        }
        /**
         * Gets or sets a value that determines whether the content of cells
         * that span multiple rows should be vertically centered.
         */
        get centerHeadersVertically(): boolean {
            return this._centerVert;
        }
        set centerHeadersVertically(value: boolean) {
            if (value != this._centerVert) {
                this._centerVert = wjcCore.asBoolean(value);
                this.invalidate();
            }
        }
        /**
         * Gets or sets a value that determines whether column headers
         * should be collapsed and displayed as a single row containing 
         * the group headers.
         *
         * If you set the @see:collapsedHeaders property to <b>true</b>,
         * remember to set the <b>header</b> property of every group in
         * order to avoid empty header cells.
         *
         * Setting the @see:collapsedHeaders property to <b>null</b> causes
         * the grid to show all header information (groups and columns).
         * In this case, the first row will show the group headers and the
         * remaining rows will show the individual column headers.
         */
        get collapsedHeaders(): boolean {
            return this._collapsedHeaders;
        }
        set collapsedHeaders(value: boolean) {
            if (value != this._collapsedHeaders) {
                this._collapsedHeaders = wjcCore.asBoolean(value, true); // null means 'expand all'
                this._updateCollapsedHeaders();
                this._updateButtonGlyph();
            }
        }
        /**
         * Gets or sets a value that determines whether the grid should display
         * a button in the column header panel to allow users to collapse and
         * expand the column headers.
         *
         * If the button is visible, clicking on it will cause the grid to 
         * toggle the value of the <b>collapsedHeaders</b> property.
         */
        get showHeaderCollapseButton(): boolean {
            return this._btnCollapse.style.display == '';
        }
        set showHeaderCollapseButton(value: boolean) {
            if (value != this.showHeaderCollapseButton) {
                this._btnCollapse.style.display = wjcCore.asBoolean(value) ? '' : 'none';
            }
        }

        // ** overrides

        // bind rows
        /*protected*/ _addBoundRow(items: any[], index: number) {
            let item = items[index];
            for (let i = 0; i < this._rowsPerItem; i++) {
                this.rows.push(new _MultiRow(item, index, i));
            }
        }
        /*protected*/ _addNode(items: any[], index: number, level: number) {
            this._addBoundRow(items, index); // childItemsPath not supported
        }

        // bind columns
        /*protected*/ _bindColumns() {

            // update column header row count
            let rows = this.columnHeaders.rows,
                cnt = this._rowsPerItem + 1;
            while (rows.length > cnt) {
                rows.removeAt(rows.length - 1);
            }
            while (rows.length < cnt) {
                rows.push(new wjcGrid.Row());
            }

            // update column header visibility
            this._updateCollapsedHeaders();

            // remove old columns
            this.columns.clear();
            this._cellGroupsByColumn = {};

            // get first item to infer data types
            let item = null,
                cv = this.collectionView;
            if (cv && cv.sourceCollection && cv.sourceCollection.length) {
                item = cv.sourceCollection[0];
            }

            // generate columns
            if (this._cellBindingGroups) {
                for (let i = 0; i < this._cellBindingGroups.length; i++) {
                    let group = this._cellBindingGroups[i];
                    for (let c = 0; c < group._colspan; c++) {
                        this._cellGroupsByColumn[this.columns.length] = group;
                        let col = new wjcGrid.Column();

                        // set column width based on first cell on the current column 
                        // that has a width and no colspan
                        for (let cellIndex = 0; cellIndex < group.cells.length; cellIndex++) {
                            let cell = group.cells[cellIndex];
                            if (cell._col == c) {
                                if (cell.width) {
                                    col.width = cell.width;
                                }
                                if (cell.binding) {
                                    col.binding = cell.binding;
                                }
                                if (cell.format) {
                                    col.format = cell.format;
                                }
                                if (cell.aggregate != wjcCore.Aggregate.None) {
                                    col.aggregate = cell.aggregate;
                                }
                                break;
                            }
                        }

                        this.columns.push(col);
                    }
                }
            }
        }

        // set row visibility to match headerCollapsed
        _updateCollapsedHeaders() {
            let rows = this.columnHeaders.rows,
                ch = this.collapsedHeaders;
            rows[0].visible = ch != false; // true or null
            for (let i = 1; i < rows.length; i++) {
                rows[i].visible = ch != true; // false or null
            }
        }

        // update missing column types to match data
        /*protected*/ _updateColumnTypes() {

            // allow base class
            super._updateColumnTypes();

            // update missing column types in all binding groups
            let cv = this.collectionView;
            if (wjcCore.hasItems(cv)) {
                let item = cv.items[0];
                for (let i = 0; i < this._cellBindingGroups.length; i++) {
                    let group = this._cellBindingGroups[i];
                    for (let c = 0; c < group._cols.length; c++) {
                        let col = group._cols[c];
                        if (col.dataType == null && col._binding) {
                            col.dataType = wjcCore.getType(col._binding.getValue(item));
                        }
                    }
                }
            }
        }

        // get the binding column 
        // (in the MultiRow grid, each physical column may contain several binding columns)
        /*protected*/ _getBindingColumn(p: wjcGrid.GridPanel, r: number, c: wjcGrid.Column): wjcGrid.Column {

            // convert column to binding column (cell)
            if (p == this.cells || p == this.columnHeaders) {
                let group = this._cellGroupsByColumn[c.index];
                if (p == this.columnHeaders) {
                    r--; // discount group header row (always the first)
                }
                c = group.getBindingColumn(p, r, c.index);
            } 

            // done
            return c;
        }

        // update grid rows to sync with data source
        /*protected*/ _cvCollectionChanged(sender, e: wjcCore.NotifyCollectionChangedEventArgs) {
            if (this.autoGenerateColumns && this.columns.length == 0) {
                this._bindGrid(true);
            } else {
                switch (e.action) {

                    // item changes don't require re-binding
                    case wjcCore.NotifyCollectionChangedAction.Change:
                        this.invalidate();
                        break;

                    // always add at the bottom (TFS 193086)
                    case wjcCore.NotifyCollectionChangedAction.Add:
                        if (e.index == this.collectionView.items.length - 1) {
                            let index = this.rows.length;
                            while (index > 0 && this.rows[index - 1] instanceof wjcGrid._NewRowTemplate) {
                                index--;
                            }
                            for (let i = 0; i < this._rowsPerItem; i++) {
                                this.rows.insert(index + i, new _MultiRow(e.item, e.index, i));
                            }
                            return;
                        }
                        wjcCore.assert(false, 'added item should be the last one.');
                        break;

                    // remove/refresh require re-binding
                    default:
                        this._bindGrid(false);
                        break;
                }
            }
        }

        // ** implementation

        // parse an array of JavaScript objects into an array of _BindingGroup objects
        _parseCellGroups(groups: any[]): _CellGroup[] {
            let arr: _CellGroup[] = [],
                rowsPerItem = 1;
            if (groups) {

                // parse binding groups
                for (let i = 0, colstart = 0; i < groups.length; i++) {
                    let group = new _CellGroup(this, groups[i]);
                    group._colstart = colstart;
                    colstart += group._colspan;
                    rowsPerItem = Math.max(rowsPerItem, group._rowspan);
                    arr.push(group);
                }

                // close binding groups (calculate group's rowspan, ranges, and bindings)
                for (let i = 0; i < arr.length; i++) {
                    arr[i].closeGroup(rowsPerItem);
                }
            }
            return arr;
        }

        // customize cells
        _formatItem(s: MultiRow, e: wjcGrid.FormatItemEventArgs) {
            let rpi = this._rowsPerItem,
                ct = e.panel.cellType,
                row = e.panel.rows[e.range.row] as _MultiRow,
                row2 = e.panel.rows[e.range.row2] as _MultiRow;

            // toggle group header style
            if (ct == wjcGrid.CellType.ColumnHeader) {
                wjcCore.toggleClass(e.cell, 'wj-group-header', e.range.row == 0);
            }

            // add group start/end class markers
            if (ct == wjcGrid.CellType.Cell || ct == wjcGrid.CellType.ColumnHeader) {
                let group = this._cellGroupsByColumn[e.col] as _CellGroup;
                wjcCore.assert(group instanceof _CellGroup, 'Failed to get the group!');
                wjcCore.toggleClass(e.cell, 'wj-group-start', group._colstart == e.range.col);
                wjcCore.toggleClass(e.cell, 'wj-group-end', group._colstart + group._colspan - 1 == e.range.col2);
            }

            // add item start/end class markers
            if (rpi > 1) {
                if (ct == wjcGrid.CellType.Cell || ct == wjcGrid.CellType.RowHeader) {
                    wjcCore.toggleClass(e.cell, 'wj-record-start', row instanceof _MultiRow ? row.recordIndex == 0 : false);
                    wjcCore.toggleClass(e.cell, 'wj-record-end', row2 instanceof _MultiRow ? row2.recordIndex == rpi - 1 : false);
                }
            }

            // handle alternating rows
            if (this.showAlternatingRows) {
                wjcCore.toggleClass(e.cell, 'wj-alt', row instanceof _MultiRow ? row.dataIndex % 2 != 0 : false);
            }

            // center-align cells vertically if they span multiple rows
            if (this._centerVert) {
                if (e.cell.hasChildNodes && e.range.rowSpan > 1) {

                    // surround cell content in a vertically centered table-cell div
                    let div = wjcCore.createElement('<div style="display:table-cell;vertical-align:middle"></div>'),
                        rng = document.createRange();
                    rng.selectNodeContents(e.cell);
                    rng.surroundContents(div);

                    // make the cell display as a table
                    wjcCore.setCss(e.cell, {
                        display: 'table',
                        tableLayout: 'fixed',
                        paddingTop: 0, // remove top/bottom padding to work around Safari bug
                        paddingBottom: 0
                    });
                } else { // restore defaults for non-merged cells
                    let padding = e.cell.querySelector('input') ? '0px' : '';
                    wjcCore.setCss(e.cell, {
                        display: '',
                        tableLayout: '',
                        paddingTop: padding,
                        paddingBottom: padding
                    });
                }
            }
        }

        // update glyph in collapse/expand headers button
        _updateButtonGlyph() {
            let span = this._btnCollapse.querySelector('span') as HTMLElement;
            if (span instanceof HTMLElement) {
                span.className = this.collapsedHeaders ? 'wj-glyph-left' : 'wj-glyph-down-left';
            }
        }
    }


