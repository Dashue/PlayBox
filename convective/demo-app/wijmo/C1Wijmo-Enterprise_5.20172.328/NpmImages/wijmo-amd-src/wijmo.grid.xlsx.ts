

import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcXlsx from 'wijmo/wijmo.xlsx';
import * as wjcCore from 'wijmo/wijmo';
import * as wjcGridDetail from 'wijmo/wijmo.grid.detail';
import * as wjcGridMultirow from 'wijmo/wijmo.grid.multirow';

function tryGetModuleWijmoGridDetail(): typeof wjcGridDetail {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['detail'];
}
function tryGetModuleWijmoGridMultirow(): typeof wjcGridMultirow {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['multirow'];
}

import * as wjcSelf from 'wijmo/wijmo.grid.xlsx';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['grid'] = window['wijmo']['grid'] || {};
window['wijmo']['grid']['xlsx'] = wjcSelf;

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
///<wijmo-soft-import from="wijmo.grid.multirow"/>
///<wijmo-soft-import from="wijmo.grid.detail"/>

/**
 * Extension that defines the @see:FlexGridXlsxConverter class that provides
 * client-side Excel xlsx file save/load capabilities for the
 * @see:FlexGrid control.
 */

    'use strict';

    /**
     * This class provides static <b>load</b> and <b>save</b> methods for loading
     * and saving @see:FlexGrid controls from and to Excel xlsx files.
     */
    export class FlexGridXlsxConverter {
        /**
         * Save the @see:FlexGrid instance to the @see:Workbook instance.
         * This method works with JSZip 2.5.
         *
         * For example:
         * <pre>// This sample exports FlexGrid content to an xlsx file.
         * // click.
         * &nbsp;
         * // HTML
         * &lt;button 
         *     onclick="saveXlsx('FlexGrid.xlsx')"&gt;
         *     Save
         * &lt;/button&gt;
         * &nbsp;
         * // JavaScript
         * function saveXlsx(fileName) {
         *     // Save the flexGrid to xlsx file.
         *     wijmo.grid.xlsx.FlexGridXlsxConverter.save(flexGrid,
         *             { includeColumnHeaders: true }, fileName);
         * }</pre>
         *
         * @param grid FlexGrid that will be saved.
         * @param options @see:IFlexGridXlsxOptions object specifying the save options.
         * @param fileName Name of the file that will be generated.
         * @return A @see:Workbook object that can be used to customize the workbook
         * before saving it (with the Workbook.save method).
         */
        static save(grid: wjcGrid.FlexGrid, options?: IFlexGridXlsxOptions, fileName?: string): wjcXlsx.Workbook {
            //window['xlsxTime'] = Date.now();
            var workbook = this._saveFlexGridToWorkbook(grid, options);

            //console.log(`Workbook created in ${(Date.now() - window['xlsxTime']) / 1000} seconds`);
            //window['xlsxTime'] = Date.now();

            if (fileName) {
                workbook.save(fileName);
            }

            return workbook;
        }

        /**
         * Asynchronously saves the content of a @see:FlexGrid to a file.
         *
         * This method requires JSZip 3.0.
         *
         * @param grid FlexGrid that will be saved.
         * @param options @see:IFlexGridXlsxOptions object specifying the save options.
         * @param fileName Name of the file that will be generated.
         * @param onSaved Callback invoked when the method finishes executing.
         * The callback provides access to the content of the saved workbook
         * (encoded as a base-64 string and passed as a parameter to the callback).
         * @param onError Callback invoked when there are errors saving the file.
         * The error is passed as a parameter to the callback.
         *
         * For example:
         * <pre>
         * wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(flexGrid,
         *     { includeColumnHeaders: true }, // options
         *     'FlexGrid.xlsx', // filename
         *     function (base64) { // onSaved
         *         // User can access the base64 string in this callback.
         *         document.getElementByID('export').href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' + 'base64,' + base64;
         *     },
         *     function (reason) { // onError
         *         // User can catch the failure reason in this callback.
         *         console.log('The reason of save failure is ' + reason);
         *     }
         *  );</pre>
         */
        static saveAsync(grid: wjcGrid.FlexGrid, options?: IFlexGridXlsxOptions, fileName?: string, onSaved?: (base64: string) => any, onError?: (reason?: any) => any): wjcXlsx.Workbook {
            //window['xlsxTime'] = Date.now();
            var workbook = this._saveFlexGridToWorkbook(grid, options);
            //console.log(`Workbook created in ${(Date.now() - window['xlsxTime']) / 1000} seconds`);
            //window['xlsxTime'] = Date.now();

            workbook.saveAsync(fileName, onSaved, onError);
            return workbook
        }

        /**
         * Loads a @see:Workbook instance or a Blob object containing xlsx 
         * file content to the @see:FlexGrid instance.
         * This method works with JSZip 2.5.
         *
         * For example:
         * <pre>// This sample opens an xlsx file chosen through Open File
         * // dialog and fills FlexGrid with the content of the first
         * // sheet.
         * &nbsp;
         * // HTML
         * &lt;input type="file" 
         *     id="importFile" 
         *     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
         * /&gt;
         * &lt;div id="flexHost"&gt;&lt;/&gt;
         * &nbsp;
         * // JavaScript
         * var flexGrid = new wijmo.grid.FlexGrid("#flexHost"),
         *     importFile = document.getElementById('importFile');
         * &nbsp;
         * importFile.addEventListener('change', function () {
         *     loadWorkbook();
         * });
         * &nbsp;
         * function loadWorkbook() {
         *     var reader,
         *         file = importFile.files[0];
         *     if (file) {
         *         reader = new FileReader();
         *         reader.onload = function (e) {
         *             wijmo.grid.xlsx.FlexGridXlsxConverter.load(flexGrid, reader.result,
         *                 { includeColumnHeaders: true });
         *         };
         *         reader.readAsArrayBuffer(file);
         *     }
         * }</pre>
         * 
         * @param grid @see:FlexGrid that loads the @see:Workbook object.
         * @param workbook A @see:Workbook, Blob, base-64 string, or ArrayBuffer
         * containing the xlsx file content.
         * @param options @see:IFlexGridXlsxOptions object specifying the load options.
         */
        static load(grid: wjcGrid.FlexGrid, workbook: any, options?: IFlexGridXlsxOptions) {
            if (workbook instanceof Blob) {
                var reader = new FileReader();
                reader.onload = () => {
                    var fileContent = wjcXlsx.Workbook._base64EncArr(new Uint8Array(reader.result));
                    var wb = new wjcXlsx.Workbook();
                    //var begin = Date.now();
                    wb.load(fileContent);
                    fileContent = null;
                    //console.log(`xlsx loaded in ${(Date.now() - begin) / 1000} seconds`);
                    //begin = Date.now();
                    grid.deferUpdate(() => {
                        this._loadToFlexGrid(grid, wb, options);
                        wb = null;
                        //console.log(`FlexGrid loaded in ${(Date.now() - begin) / 1000} seconds`);
                    });
                }
                reader.readAsArrayBuffer(workbook);
            } else if (workbook instanceof wjcXlsx.Workbook) {
                grid.deferUpdate(() => {
                    this._loadToFlexGrid(grid, workbook, options);
                    workbook = null;
                });
            } else {
                if (workbook instanceof ArrayBuffer) {
                    workbook = wjcXlsx.Workbook._base64EncArr(new Uint8Array(workbook));
                } else if (!wjcCore.isString(workbook)) {
                    throw 'Invalid workbook.';
                }
                var wb = new wjcXlsx.Workbook();
                wb.load(workbook);
                workbook = null;
                grid.deferUpdate(() => {
                    this._loadToFlexGrid(grid, wb, options);
                    wb = null;
                });
            }
        }

        /**
         * Asynchronously loads a @see:Workbook or a Blob representing an xlsx file
         * into a @see:FlexGrid.
         *
         * This method requires JSZip 3.0.
         *
         * @param grid @see:FlexGrid that loads the @see:Workbook object.
         * @param workbook @see:Workbook, Blob, base-64 string, or ArrayBuffer
         * representing the xlsx file content.
         * @param options @see:IFlexGridXlsxOptions object specifying the load options.
         * @param onLoaded Callback invoked when the method finishes executing.
         * The callback provides access to the workbook that was loaded
         * (passed as a parameter to the callback).
         * @param onError Callback invoked when there are errors saving the file.
         * The error is passed as a parameter to the callback.
         *
         * For example:
         * <pre>
         * wijmo.grid.xlsx.FlexGridXlsxConverter.loadAsync(grid, blob, null, function (workbook) {
         *      // user can access the loaded workbook instance in this callback.
         *      var app = worksheet.application ;
         *      ...
         * }, function (reason) {
         *      // User can catch the failure reason in this callback.
         *      console.log('The reason of save failure is ' + reason);
         * });
         * </pre>
         */
        static loadAsync(grid: wjcGrid.FlexGrid, workbook: any, options?: IFlexGridXlsxOptions, onLoaded?: (workbook: wjcXlsx.Workbook) => void, onError?: (reason?: any) => any) {
            if (workbook instanceof Blob) {
                var reader = new FileReader();
                reader.onload = () => {
                    var fileContent = wjcXlsx.Workbook._base64EncArr(new Uint8Array(reader.result));
                    var wb = new wjcXlsx.Workbook();
                    //var begin = Date.now();
                    wb.loadAsync(fileContent, (loadedWorkbook: wjcXlsx.Workbook) => {
                        fileContent = null;
                        wb = null;
                        //console.log(`xlsx loaded in ${(Date.now() - begin) / 1000} seconds`);
                        //begin = Date.now();
                        grid.deferUpdate(() => {
                            this._loadToFlexGrid(grid, loadedWorkbook, options);
                            //console.log(`FlexGrid loaded in ${(Date.now() - begin) / 1000} seconds`);
                            if (onLoaded) {
                                onLoaded(loadedWorkbook);
                            }
                            loadedWorkbook = null;
                        });
                    }, onError);
                }
                reader.readAsArrayBuffer(workbook);
            } else if (workbook instanceof wjcXlsx.Workbook) {
                grid.deferUpdate(() => {
                    this._loadToFlexGrid(grid, workbook, options);
                    if (onLoaded) {
                        onLoaded(workbook);
                    }
                    workbook = null;
                });
            } else {
                if (workbook instanceof ArrayBuffer) {
                    workbook = wjcXlsx.Workbook._base64EncArr(new Uint8Array(workbook));
                } else if (!wjcCore.isString(workbook)) {
                    throw 'Invalid workbook.';
                }
                var wb = new wjcXlsx.Workbook();
                wb.loadAsync(workbook, (loadedWorkbook: wjcXlsx.Workbook) => {
                    workbook = null;
                    grid.deferUpdate(() => {
                        this._loadToFlexGrid(grid, loadedWorkbook, options);
                        if (onLoaded) {
                            onLoaded(loadedWorkbook);
                        }
                        loadedWorkbook = null;
                    });
                }, onError);
            }
        }

        // Save the flexgrid to workbook instance.
        private static _saveFlexGridToWorkbook(grid: wjcGrid.FlexGrid, options?: IFlexGridXlsxOptions): wjcXlsx.Workbook {
            var workbook = new wjcXlsx.Workbook(),
                workSheet = new wjcXlsx.WorkSheet(),
                sheetStyle = new wjcXlsx.WorkbookStyle(),
                workbookFrozenPane = new wjcXlsx.WorkbookFrozenPane(),
                includeColumnHeaders = options && options.includeColumnHeaders != null ? options.includeColumnHeaders : true,
                includeRowHeaders = options && options.includeRowHeaders != null ? options.includeRowHeaders : false,
                includeCellStyles = options && options.includeCellStyles != null ? options.includeCellStyles : true,
                activeWorksheet = options ? options.activeWorksheet : null,
                includeColumns = options ? options.includeColumns : null,
                formatItem = options ? options.formatItem : null,
                workbookRowOM: wjcXlsx.IWorkbookRow,
                workbookRow: wjcXlsx.WorkbookRow,
                column: wjcGrid.Column,
                workbookColumnOM: wjcXlsx.IWorkbookColumn,
                workbookColumn: wjcXlsx.WorkbookColumn,
                columnSettings: wjcXlsx.IWorkbookColumn[],
                sheetStyleOM: wjcXlsx.IWorkbookStyle,
                ri: number,
                headerRi: number,
                ci: number,
                sheetInfo: IExtendedSheetInfo,
                fakeCell: HTMLDivElement,
                row: wjcGrid.Row,
                groupRow: wjcGrid.GroupRow,
                isGroupRow: boolean,
                groupLevel: number = 0,
                columnHeaderRowCnt: number = 0,
                cellsRowCnt: number = 0,
                rowHeaderColumnCnt: number = 0;

            // Set sheet name for the exporting sheet.
            sheetInfo = <IExtendedSheetInfo>grid['wj_sheetInfo'];
            workSheet.name = options ? options.sheetName : '';
            workSheet.visible = options ? (options.sheetVisible !== false) : true;
            // Since the fill color will extends the border of cells in excel. https://answers.microsoft.com/en-us/msoffice/forum/msoffice_excel-mso_other/gridlines-in-excel-2007-disappear-when-cell/10e54382-67d8-4dca-abb8-05e9a6ad390d
            // add the default border setting to the work sheet in case of the default border disappear in excel. (TFS 257902)
            sheetStyleOM = {
                borders: {
                    top: {
                        style: wjcXlsx.BorderStyle.Thin,
                        color: '#C6C6C6'
                    },
                    left: {
                        style: wjcXlsx.BorderStyle.Thin,
                        color: '#C6C6C6'
                    },
                    bottom: {
                        style: wjcXlsx.BorderStyle.Thin,
                        color: '#C6C6C6'
                    },
                    right: {
                        style: wjcXlsx.BorderStyle.Thin,
                        color: '#C6C6C6'
                    }
                }
            }
            sheetStyle._deserialize(sheetStyleOM);
            workSheet.style = sheetStyle;
            columnSettings = [];

            if (!sheetInfo && (includeCellStyles || formatItem)) {
                fakeCell = document.createElement('div');
                fakeCell.style.visibility = 'hidden';
                fakeCell.setAttribute(wjcGrid.FlexGrid._WJS_MEASURE, 'true');
                grid.hostElement.appendChild(fakeCell);
            }

            // Add the column settings of the row header.
            if (includeRowHeaders) {
                headerRi = 0;
                for (ri = 0; ri < grid.rowHeaders.rows.length; ri++) {
                    if (grid.rowHeaders.rows[ri].renderSize <= 0) {
                        continue;
                    }
                    columnSettings[headerRi] = [];
                    for (ci = 0; ci < grid.rowHeaders.columns.length; ci++) {
                        column = grid._getBindingColumn(grid.rowHeaders, ri, grid.rowHeaders.columns[ci]);
                        workbookColumnOM = this._getColumnSetting(column, grid.columnHeaders.columns.defaultSize);
                        columnSettings[headerRi][ci] = workbookColumnOM;
                        if (headerRi === 0) {
                            workbookColumn = new wjcXlsx.WorkbookColumn();
                            workbookColumn._deserialize(workbookColumnOM);
                            workSheet._addWorkbookColumn(workbookColumn, ci);
                        }
                    }
                    headerRi++;
                }
                rowHeaderColumnCnt = ci;
            }

            // add the headers in the worksheet.
            if (includeColumnHeaders && grid.columnHeaders.rows.length > 0) {
                headerRi = 0;
                for (ri = 0; ri < grid.columnHeaders.rows.length; ri++) {
                    if (grid.columnHeaders.rows[ri].renderSize <= 0) {
                        continue;
                    }
                    if (!columnSettings[headerRi]) {
                        columnSettings[headerRi] = [];
                    }
                    for (ci = 0; ci < grid.columnHeaders.columns.length; ci++) {
                        column = grid._getBindingColumn(grid.columnHeaders, ri, grid.columnHeaders.columns[ci]);
                        workbookColumnOM = this._getColumnSetting(column, grid.columnHeaders.columns.defaultSize);
                        columnSettings[headerRi][rowHeaderColumnCnt + ci] = workbookColumnOM;
                        if (headerRi === 0) {
                            if (!includeColumns || includeColumns(column)) {
                                workbookColumn = new wjcXlsx.WorkbookColumn();
                                workbookColumn._deserialize(workbookColumnOM);
                                workSheet._addWorkbookColumn(workbookColumn);
                            }
                        }
                    }

                    rowHeaderColumnCnt = 0;
                    workbookRowOM = {};
                    workbookRow = new wjcXlsx.WorkbookRow();
                    if (includeRowHeaders) {
                        rowHeaderColumnCnt = this._parseFlexGridRowToSheetRow(grid.topLeftCells, workbookRowOM, ri, 0, columnSettings, includeCellStyles, fakeCell, false, 0, includeColumns);
                    }
                    this._parseFlexGridRowToSheetRow(grid.columnHeaders, workbookRowOM, ri, rowHeaderColumnCnt, columnSettings, includeCellStyles, fakeCell, false, 0, includeColumns);

                    // Only the row contains cells need be added into the Workbook Object Model.
                    if (workbookRowOM.cells.length > 0) {
                        workbookRow._deserialize(workbookRowOM);
                        workSheet._addWorkbookRow(workbookRow, headerRi);
                    }

                    headerRi++;
                }
                columnHeaderRowCnt = headerRi;
            } else {
                if (!columnSettings[0]) {
                    columnSettings[0] = [];
                }
                for (ci = 0; ci < grid.columnHeaders.columns.length; ci++) {
                    column = grid._getBindingColumn(grid.columnHeaders, 0, grid.columnHeaders.columns[ci]);
                    workbookColumnOM = this._getColumnSetting(column, grid.columnHeaders.columns.defaultSize);
                    columnSettings[0][rowHeaderColumnCnt + ci] = workbookColumnOM;
                    if (!includeColumns || includeColumns(column)) {
                        workbookColumn = new wjcXlsx.WorkbookColumn();
                        workbookColumn._deserialize(workbookColumnOM);
                        workSheet._addWorkbookColumn(workbookColumn);
                    }
                }
            }

            // add the content in the worksheet.
            for (ri = 0; ri < grid.cells.rows.length; ri++) {
                rowHeaderColumnCnt = 0;
                workbookRowOM = {};
                workbookRow = new wjcXlsx.WorkbookRow();

                row = grid.rows[ri];
                if (row instanceof wjcGrid._NewRowTemplate) {
                    continue;
                }
                isGroupRow = row instanceof wjcGrid.GroupRow;

                if (isGroupRow) {
                    groupRow = wjcCore.tryCast(row, wjcGrid.GroupRow);
                    groupLevel = groupRow.level + 1;
                }

                if (includeRowHeaders) {
                    rowHeaderColumnCnt = this._parseFlexGridRowToSheetRow(grid.rowHeaders, workbookRowOM, ri, 0, columnSettings, includeCellStyles, fakeCell, isGroupRow, groupLevel, includeColumns, formatItem);
                }
                this._parseFlexGridRowToSheetRow(grid.cells, workbookRowOM, ri, rowHeaderColumnCnt, columnSettings, includeCellStyles, fakeCell, isGroupRow, groupLevel, includeColumns, formatItem);

                // Only the row contains cells need be added into the Workbook Object Model.
                if (workbookRowOM.cells.length > 0) {
                    workbookRow._deserialize(workbookRowOM);
                    workSheet._addWorkbookRow(workbookRow, columnHeaderRowCnt + ri);
                }
            }
            cellsRowCnt = grid.cells.rows.length;

            for (ri = 0; ri < grid.columnFooters.rows.length; ri++) {
                rowHeaderColumnCnt = 0;
                workbookRowOM = {};
                workbookRow = new wjcXlsx.WorkbookRow();

                row = grid.columnFooters.rows[ri];
                isGroupRow = row instanceof wjcGrid.GroupRow;
                if (includeRowHeaders) {
                    rowHeaderColumnCnt = this._parseFlexGridRowToSheetRow(grid.rowHeaders, workbookRowOM, ri, 0, columnSettings, includeCellStyles, fakeCell, isGroupRow, 0, includeColumns, formatItem);
                }
                this._parseFlexGridRowToSheetRow(grid.columnFooters, workbookRowOM, ri, rowHeaderColumnCnt, columnSettings, includeCellStyles, fakeCell, isGroupRow, 0, includeColumns, formatItem);

                // Only the row contains cells need be added into the Workbook Object Model.
                if (workbookRowOM.cells.length > 0) {
                    workbookRow._deserialize(workbookRowOM);
                    workSheet._addWorkbookRow(workbookRow, columnHeaderRowCnt + cellsRowCnt + ri);
                }
            }

            workbookFrozenPane.rows = includeColumnHeaders ? (grid.frozenRows + columnHeaderRowCnt) : grid.frozenRows;
            workbookFrozenPane.columns = includeRowHeaders ? (grid.frozenColumns + rowHeaderColumnCnt) : grid.frozenColumns;
            workSheet.frozenPane = workbookFrozenPane;

            workbook._addWorkSheet(workSheet);

            if (!sheetInfo && (includeCellStyles || formatItem)) {
                // done with style element
                grid.hostElement.removeChild(fakeCell);
            }

            workbook.activeWorksheet = activeWorksheet;

            return workbook;
        }

        // Load the workbook instance to flexgrid
        private static _loadToFlexGrid(grid: wjcGrid.FlexGrid, workbook: wjcXlsx.Workbook, options: IFlexGridXlsxOptions) {
            var includeColumnHeaders = options && options.includeColumnHeaders != null ? options.includeColumnHeaders : true,
                currentIncludeRowHeaders = options && options.includeColumnHeaders != null ? options.includeColumnHeaders : true,
                sheetIndex = options && options.sheetIndex != null && !isNaN(options.sheetIndex) ? options.sheetIndex : 0,
                sheetName = options ? options.sheetName : null,
                sheetVisible = options ? options.sheetVisible : true,
                isFlexSheet = grid['wj_sheetInfo'] != null,
                c = 0,
                r = 0,
                i: number,
                j: number,
                columnSettings: wjcXlsx.WorkbookColumn[],
                columns: IColumn[],
                columnSetting: IColumn,
                column: wjcGrid.Column,
                columnHeader: string,
                sheetHeaders: wjcXlsx.WorkbookRow,
                sheetHeader: wjcXlsx.WorkbookCell,
                headerForamt: string,
                row: wjcXlsx.WorkbookRow,
                currentSheet: wjcXlsx.WorkSheet,
                rowCount: number,
                columnCount: number,
                isGroupHeader: boolean,
                item: wjcXlsx.WorkbookCell,
                nextRowIdx: number,
                nextRow: wjcXlsx.WorkbookRow,
                summaryBelow: boolean,
                commonRow: wjcGrid.Row,
                groupRow: wjcGrid.GroupRow,
                frozenColumns: number,
                frozenRows: number,
                formula: string,
                flexHostElement: HTMLElement,
                cellIndex: number,
                cellStyle: wjcXlsx.WorkbookStyle,
                styledCells: any,
                mergedRanges: any,
                fonts: string[],
                cellFormat: string,
                valType: wjcCore.DataType,
                textAlign: string,
                groupCollapsed: boolean = false,
                groupCollapsedSettings: any = {},
                rowWordWrap: boolean;

            grid.itemsSource = null;
            grid.columns.clear();
            grid.rows.clear();
            grid.frozenColumns = 0;
            grid.frozenRows = 0;

            styledCells = {};
            mergedRanges = {};
            r = 0;
            columns = [];
            fonts = [];

            if (sheetIndex < 0 || sheetIndex >= workbook.sheets.length) {
                throw 'The sheet index option is out of the sheet range of current workbook.';
            }

            if (sheetName != null) {
                for (i = 0; i < workbook.sheets.length; i++) {
                    if (sheetName === workbook.sheets[i].name) {
                        currentSheet = workbook.sheets[i];
                        break;
                    }
                }
            } 
            currentSheet = currentSheet || workbook.sheets[sheetIndex];

            if (currentSheet.rows == null) {
                return;
            }

            if (includeColumnHeaders) {
                r = 1;
                if (currentSheet.rows.length <= 1) {
                    currentIncludeRowHeaders = false;
                    r = 0;
                }
                sheetHeaders = currentSheet.rows[0];
            }
            columnCount = this._getColumnCount(currentSheet.rows);
            rowCount = this._getRowCount(currentSheet.rows, columnCount);
            summaryBelow = currentSheet.summaryBelow;

            columnSettings = currentSheet.columns;
            for (c = 0; c < columnCount; c++) {
                grid.columns.push(new wjcGrid.Column());
                if (!!columnSettings[c]) {
                    if (!isNaN(+columnSettings[c].width)) {
                        grid.columns[c].width = +columnSettings[c].width;
                    }

                    if (!columnSettings[c].visible && columnSettings[c].visible != undefined) {
                        grid.columns[c].visible = !!columnSettings[c].visible;
                    }

                    if (columnSettings[c].style && !!columnSettings[c].style.wordWrap) {
                        grid.columns[c].wordWrap = columnSettings[c].style.wordWrap;
                    }
                }
            }

            //var begin = Date.now();
            for (; r < rowCount; r++) {
                isGroupHeader = false;
                rowWordWrap = true;
                row = currentSheet.rows[r];

                //if (r % 1000 === 0 && r !== 0) {
                //    console.log(`${r} rows loaded in ${(Date.now() - begin) / 1000} seconds`);
                //    begin = Date.now();
                //}
                if (row) {
                    nextRowIdx = r + 1;
                    while (nextRowIdx < currentSheet.rows.length) {
                        nextRow = currentSheet.rows[nextRowIdx];
                        if (nextRow) {
                            if ((isNaN(row.groupLevel) && !isNaN(nextRow.groupLevel))
                                || (!isNaN(row.groupLevel) && row.groupLevel < nextRow.groupLevel)) {
                                isGroupHeader = true;
                            }
                            break;
                        } else {
                            nextRowIdx++;
                        }
                    }
                }

                if (isGroupHeader && !summaryBelow) {
                    if (groupRow) {
                        groupRow.isCollapsed = groupCollapsed;
                    }
                    groupRow = new wjcGrid.GroupRow();
                    groupRow.isReadOnly = false;
                    groupCollapsed = row.collapsed == null ? false : row.collapsed;
                    groupRow.level = isNaN(row.groupLevel) ? 0 : row.groupLevel;
                    groupCollapsedSettings[groupRow.level] = groupCollapsed;
                    if (this._checkParentCollapsed(groupCollapsedSettings, groupRow.level)) {
                        groupRow._setFlag(wjcGrid.RowColFlags.ParentCollapsed, true);
                    }
                    grid.rows.push(groupRow);
                } else {
                    commonRow = new wjcGrid.Row();
                    if (row && this._checkParentCollapsed(groupCollapsedSettings, row.groupLevel)) {
                        commonRow._setFlag(wjcGrid.RowColFlags.ParentCollapsed, true);
                    }
                    grid.rows.push(commonRow);
                }

                if (row && !!row.height && !isNaN(row.height)) {
                    grid.rows[currentIncludeRowHeaders ? r - 1 : r].height = row.height;
                }

                for (c = 0; c < columnCount; c++) {
                    if (!row) {
                        grid.setCellData(currentIncludeRowHeaders ? r - 1 : r, c, '');
                        this._setColumn(columns, c, undefined);
                    } else {
                        item = row.cells[c];
                        formula = item ? item.formula : undefined;
                        if (formula && formula[0] !== '=') {
                            formula = '=' + formula;
                        }
                        formula = formula ? this._parseToFlexSheetFormula(formula) : undefined;
                        grid.setCellData(currentIncludeRowHeaders ? r - 1 : r, c, formula && isFlexSheet ? formula : this._getItemValue(item));
                        if (!isGroupHeader) {
                            this._setColumn(columns, c, item);
                        }

                        // Set styles for the cell in current processing sheet.
                        cellIndex = r * columnCount + c;
                        cellStyle = item ? item.style : undefined;
                        cellFormat = wjcXlsx.Workbook._parseExcelFormat(item);
                        if (cellStyle) {
                            rowWordWrap = rowWordWrap && !!cellStyle.wordWrap;
                            valType = this._getItemType(item);
                            if (cellStyle.hAlign) {
                                textAlign = wjcXlsx.Workbook._parseHAlignToString(wjcCore.asEnum(cellStyle.hAlign, wjcXlsx.HAlign));
                            } else {
                                switch (valType) {
                                    case wjcCore.DataType.Number:
                                        textAlign = 'right';
                                        break;
                                    case wjcCore.DataType.Boolean:
                                        textAlign = 'center';
                                        break;
                                    default:
                                        if (cellFormat && cellFormat.search(/[n,c,p]/i) === 0) {
                                            textAlign = 'right';
                                        } else {
                                            textAlign = 'left';
                                        }
                                        break;
                                }
                            }

                            styledCells[cellIndex] = {
                                fontWeight: cellStyle.font && cellStyle.font.bold ? 'bold' : 'none',
                                fontStyle: cellStyle.font && cellStyle.font.italic ? 'italic' : 'none',
                                textDecoration: cellStyle.font && cellStyle.font.underline ? 'underline' : 'none',
                                textAlign: textAlign,
                                fontFamily: cellStyle.font && cellStyle.font.family ? cellStyle.font.family : '',
                                fontSize: cellStyle.font && cellStyle.font.size ? cellStyle.font.size + 'px' : '',
                                color: cellStyle.font && cellStyle.font.color ? cellStyle.font.color : '',
                                backgroundColor: cellStyle.fill && cellStyle.fill.color ? cellStyle.fill.color : '',
                                whiteSpace: cellStyle.wordWrap ? 'pre-wrap' : 'normal',
                                format: cellFormat
                            }
                            if (cellStyle.borders) {
                                if (cellStyle.borders.left) {
                                    this._parseBorderStyle(cellStyle.borders.left.style, 'Left', styledCells[cellIndex]);
                                    styledCells[cellIndex].borderLeftColor = cellStyle.borders.left.color;
                                }
                                if (cellStyle.borders.right) {
                                    this._parseBorderStyle(cellStyle.borders.right.style, 'Right', styledCells[cellIndex]);
                                    styledCells[cellIndex].borderRightColor = cellStyle.borders.right.color;
                                }
                                if (cellStyle.borders.top) {
                                    this._parseBorderStyle(cellStyle.borders.top.style, 'Top', styledCells[cellIndex]);
                                    styledCells[cellIndex].borderTopColor = cellStyle.borders.top.color;
                                }
                                if (cellStyle.borders.bottom) {
                                    this._parseBorderStyle(cellStyle.borders.bottom.style, 'Bottom', styledCells[cellIndex]);
                                    styledCells[cellIndex].borderBottomColor = cellStyle.borders.bottom.color;
                                }
                            }
                            if (cellStyle.font && fonts.indexOf(cellStyle.font.family) === -1) {
                                fonts.push(cellStyle.font.family);
                            }
                        }

                        // Get merged cell ranges.
                        if (item && (wjcCore.isNumber(item.rowSpan) && item.rowSpan > 0)
                            && (wjcCore.isNumber(item.colSpan) && item.colSpan > 0)
                            && (item.rowSpan > 1 || item.colSpan > 1)) {
                            for (i = r; i < r + item.rowSpan; i++) {
                                for (j = c; j < c + item.colSpan; j++) {
                                    cellIndex = i * columnCount + j;
                                    mergedRanges[cellIndex] = new wjcGrid.CellRange(r, c, r + item.rowSpan - 1, c + item.colSpan - 1);
                                }
                            }
                        }
                    }
                }

                if (row) {
                    if (!this._checkParentCollapsed(groupCollapsedSettings, row.groupLevel) && !row.visible && row.visible != undefined) {
                        grid.rows[currentIncludeRowHeaders ? r - 1 : r].visible = row.visible;
                    }
                    grid.rows[currentIncludeRowHeaders ? r - 1 : r].wordWrap = (!!row.style && !!row.style.wordWrap) || rowWordWrap;
                }
            }

            // Set isCollapsed property for the last group row (TFS #139848 case 1)
            if (groupRow) {
                groupRow.isCollapsed = groupCollapsed;
            }

            if (currentSheet.frozenPane) {
                frozenColumns = currentSheet.frozenPane.columns;
                if (wjcCore.isNumber(frozenColumns) && !isNaN(frozenColumns)) {
                    grid.frozenColumns = frozenColumns;
                }

                frozenRows = currentSheet.frozenPane.rows;
                if (wjcCore.isNumber(frozenRows) && !isNaN(frozenRows)) {
                    grid.frozenRows = currentIncludeRowHeaders && frozenRows > 0 ? frozenRows - 1 : frozenRows;
                }
            }

            // set columns for column header.
            for (c = 0; c < grid.columnHeaders.columns.length; c++) {
                columnSetting = columns[c];
                column = grid.columns[c];
                // Setting the required property of the column to false for the imported sheet.
                // TFS #126125
                column.isRequired = false;
                if (currentIncludeRowHeaders) {
                    sheetHeader = sheetHeaders ? sheetHeaders.cells[c] : undefined;
                    if (sheetHeader && sheetHeader.value) {
                        headerForamt = wjcXlsx.Workbook._parseExcelFormat(sheetHeader);
                        columnHeader = wjcCore.Globalize.format(sheetHeader.value, headerForamt);
                    } else {
                        columnHeader = this._numAlpha(c);
                    }
                } else {
                    columnHeader = this._numAlpha(c);
                }
                column.header = columnHeader;
                if (columnSetting) {
                    if (columnSetting.dataType === wjcCore.DataType.Boolean) {
                        column.dataType = columnSetting.dataType;
                    }
                    column.format = columnSetting.format;
                    column.align = columnSetting.hAlign;
                    column.wordWrap = column.wordWrap || columnSetting.wordWrap;
                }
            }

            // Set sheet related info for importing.
            // This property contains the name, style of cells, merge cells and used fonts of current sheet.
            if (isFlexSheet) {
                grid['wj_sheetInfo'].name = currentSheet.name;
                grid['wj_sheetInfo'].visible = sheetVisible === true ? true : currentSheet.visible !== false;
                grid['wj_sheetInfo'].styledCells = styledCells;
                grid['wj_sheetInfo'].mergedRanges = mergedRanges;
                grid['wj_sheetInfo'].fonts = fonts;
            }
        }

        // Parse the row data of flex grid to a sheet row
        private static _parseFlexGridRowToSheetRow(panel: wjcGrid.GridPanel, workbookRow: wjcXlsx.IWorkbookRow, rowIndex: number, startColIndex: number, columnSettings: wjcXlsx.IWorkbookColumn[], includeCellStyles: boolean, fakeCell: HTMLDivElement, isGroupRow: boolean, groupLevel: number, includeColumns: (column: wjcGrid.Column) => boolean, formatItem?: (agrs: XlsxFormatItemEventArgs) => void): number {
            var flex: wjcGrid.FlexGrid,
                row: wjcGrid.Row,
                columnSetting: wjcXlsx.IWorkbookColumn,
                ci: number,
                orgFormat: string,
                format: string,
                val: any,
                unformattedVal: any,
                groupHeader: any,
                isFormula: boolean,
                formula: string,
                cellIndex: number,
                cellStyle: any,
                mergedCells: wjcGrid.CellRange,
                rowSpan: number,
                colSpan: number,
                sheetInfo: IExtendedSheetInfo,
                valIsDate: boolean,
                isCommonRow: boolean = false,
                bcol: wjcGrid.Column,
                isStartMergedCell: boolean,
                recordIndex: number,
                xlsxCell: wjcXlsx.IWorkbookCell,
                getFormattedCell: () => HTMLElement,
                xlsxFormatItemArgs: XlsxFormatItemEventArgs,
                cloneFakeCell: HTMLDivElement,
                parsedCellStyle: wjcXlsx.IWorkbookStyle,
                hAlign: wjcXlsx.HAlign;
            
            flex = panel.grid;
            sheetInfo = <IExtendedSheetInfo>flex['wj_sheetInfo'];

            row = panel.rows[rowIndex];
            recordIndex = row['recordIndex'] != null ? row['recordIndex'] : 0;

            if (!workbookRow.cells) {
                workbookRow.cells = [];
            }
            workbookRow.visible = row.isVisible;
            workbookRow.height = row.renderHeight || panel.rows.defaultSize;
            workbookRow.groupLevel = isGroupRow ? (groupLevel - 1) : groupLevel;
            if (isGroupRow) {
                workbookRow.collapsed = (<wjcGrid.GroupRow>row).isCollapsed;
            }
            if (row.wordWrap) {
                workbookRow.style = {
                    wordWrap: row.wordWrap
                };
            }

            if (row.constructor === wjcGrid.Row
                || row.constructor === wjcGrid._NewRowTemplate
                || ((tryGetModuleWijmoGridDetail()) && row.constructor === (tryGetModuleWijmoGridDetail()).DetailRow)
                || ((tryGetModuleWijmoGridMultirow()) && row.constructor === (tryGetModuleWijmoGridMultirow())._MultiRow)) {
                isCommonRow = true;
            }

            for (ci = 0; ci < panel.columns.length; ci++) {
                orgFormat = null;
                colSpan = 1;
                rowSpan = 1;
                isStartMergedCell = false;
                cellStyle = null;
                parsedCellStyle = null;
                bcol = flex._getBindingColumn(panel, rowIndex, panel.columns[ci]);

                mergedCells = null;
                if (sheetInfo && panel === flex.cells) {
                    cellIndex = rowIndex * panel.columns.length + ci;
                    // Get merge range for cell.
                    if (sheetInfo.mergedRanges) {
                        mergedCells = sheetInfo.mergedRanges[cellIndex];
                    }
                    // Get style for cell.
                    if (sheetInfo.styledCells) {
                        cellStyle = sheetInfo.styledCells[cellIndex];
                    }
                } else if (includeCellStyles/* || formatItem*/) {
                    cloneFakeCell = <HTMLDivElement>fakeCell.cloneNode();
                    fakeCell.parentElement.appendChild(cloneFakeCell);
                    mergedCells = flex.getMergedRange(panel, rowIndex, ci, false);
                    if (mergedCells) {
                        cellStyle = this._getCellStyle(panel, cloneFakeCell, rowIndex + mergedCells.rowSpan - 1, ci + mergedCells.columnSpan - 1) || {};
                    } else {
                        cellStyle = this._getCellStyle(panel, cloneFakeCell, rowIndex, ci) || {};
                    }
                }

                if (!mergedCells) {
                    mergedCells = flex.getMergedRange(panel, rowIndex, ci, false);
                }

                if (mergedCells) {
                    if (rowIndex === mergedCells.topRow && ci === mergedCells.leftCol) {
                        rowSpan = mergedCells.bottomRow - mergedCells.topRow + 1;
                        colSpan = this._getColSpan(panel, mergedCells, includeColumns);
                        isStartMergedCell = true;
                    }
                } else {
                    isStartMergedCell = true;
                }

                if (!!includeColumns && !includeColumns(bcol)) {
                    continue;
                }
                columnSetting = columnSettings[recordIndex][ci + startColIndex];
                if (isCommonRow || isGroupRow) {
                    val = isStartMergedCell ? panel.getCellData(rowIndex, ci, true) : null;
                    unformattedVal = isStartMergedCell ? panel.getCellData(rowIndex, ci, false) : null;
                    isFormula = false;
                    if (val && wjcCore.isString(val) && val.length > 1 && val[0] === '=') {
                        isFormula = true;
                    }
                    valIsDate = wjcCore.isDate(unformattedVal);
                    if (cellStyle && cellStyle.format) {
                        orgFormat = cellStyle.format;
                        format = wjcXlsx.Workbook._parseCellFormat(cellStyle.format, valIsDate);
                    } else if (columnSetting && columnSetting.style && columnSetting.style.format) {
                        orgFormat = bcol.format;
                        format = columnSetting.style.format;
                    } else {
                        format = null;
                    }
                    if (!format) {
                        if (valIsDate) {
                            format = 'm/d/yyyy';
                        } else if (wjcCore.isNumber(unformattedVal) && !bcol.dataMap) {
                            format = wjcCore.isInt(unformattedVal) ? '#,##0' : '#,##0.00';
                        } else if (isFormula) {
                            formula = (<string>val).toLowerCase();
                            if (formula === '=now()') {
                                format = 'm/d/yyyy h:mm';
                                valIsDate = true;
                            } else if (formula === '=today()' || formula.substring(0, formula.indexOf('(')) === '=date') {
                                format = 'm/d/yyyy';
                                valIsDate = true;
                            } else if (formula.substring(0, formula.indexOf('(')) === '=time') {
                                format = 'h:mm AM/PM';
                                valIsDate = true;
                            }
                        } else {
                            format = 'General';
                        }
                    }
                } else {
                    val = isStartMergedCell ? flex.columnHeaders.getCellData(0, ci, true) : null;
                    format = 'General';
                }

                parsedCellStyle = this._parseCellStyle(cellStyle) || {};
                if (panel === flex.cells && isGroupRow && row['hasChildren'] && ci === flex.columns.firstVisibleIndex) {
                    // Process the group header of the flex grid.
                    if (val) {
                        groupHeader = val;
                    } else if (isStartMergedCell) {
                        groupHeader = (<wjcGrid.GroupRow>row).getGroupHeader().replace(/<\/?\w+>/g, '');
                    }

                    // If the formatted value, unformatted value and style of the cell is null, we should ignore this empty cell in the Workbook Object Model.
                    if (groupHeader == null && !cellStyle) {
                        continue;
                    }

                    valIsDate = wjcCore.isDate(groupHeader);
                    if (!valIsDate && orgFormat && orgFormat.toLowerCase() === 'd' && wjcCore.isInt(groupHeader)) {
                        format = '0';
                    }
                    groupHeader = typeof groupHeader === 'string' ? wjcXlsx.Workbook._unescapeXML(groupHeader) : groupHeader;
                    xlsxCell = {
                        value: groupHeader,
                        isDate: valIsDate,
                        formula: isFormula ? this._parseToExcelFormula(val, valIsDate) : null,
                        colSpan: colSpan,
                        rowSpan: rowSpan,
                        style: this._extend(parsedCellStyle, {
                            format: format,
                            font: {
                                bold: true
                            },
                            hAlign: wjcXlsx.HAlign.Left,
                            indent: groupLevel - 1
                        })
                    };
                } else {
                    // Add the cell content
                    val = typeof val === 'string' ? wjcXlsx.Workbook._unescapeXML(val) : val;
                    unformattedVal = typeof unformattedVal === 'string' ? wjcXlsx.Workbook._unescapeXML(unformattedVal) : unformattedVal;
                    if (!valIsDate && orgFormat && orgFormat.toLowerCase() === 'd' && wjcCore.isInt(unformattedVal)) {
                        format = '0';
                    }
                    if (parsedCellStyle && parsedCellStyle.hAlign) {
                        hAlign = parsedCellStyle.hAlign;
                    } else if (columnSetting && columnSetting.style && columnSetting.style.hAlign != null) {
                        hAlign = wjcCore.asEnum(columnSetting.style.hAlign, wjcXlsx.HAlign, true);
                    } else {
                        if (wjcCore.isDate(unformattedVal)) {
                            hAlign = wjcXlsx.HAlign.Left;
                        } else {
                            hAlign = wjcXlsx.HAlign.General;
                        }
                    }
                    xlsxCell = {
                        value: isFormula ? undefined : format === 'General' ? val : unformattedVal,
                        isDate: valIsDate,
                        formula: isFormula ? this._parseToExcelFormula(val, valIsDate) : null,
                        colSpan: ci < flex.columns.firstVisibleIndex ? 1 : colSpan,
                        rowSpan: rowSpan,
                        style: this._extend(parsedCellStyle, {
                            format: format,
                            hAlign: hAlign,
                            vAlign: rowSpan > 1 ? (panel === flex.cells ? wjcXlsx.VAlign.Top : wjcXlsx.VAlign.Center) : null
                        })
                    };
                }

                //if (formatItem) {
                //    getFormattedCell = () => {
                //        try {
                //            if (!includeCellStyles) {
                //                panel.grid.cellFactory.updateCell(panel, rowIndex, ci, cloneFakeCell);
                //            } 
                //        } catch (ex) {
                //            return null;
                //        }
                //        return cloneFakeCell;
                //    };
                //    if (includeCellStyles) {
                //        cell = getFormattedCell();
                //    }
                //    xlsxFormatItemArgs = new XlsxFormatItemEventArgs(panel, new CellRange(rowIndex, ci), cell, xlsxCell, () => {
                //        return cell || getFormattedCell();
                //    });
                //    formatItem(xlsxFormatItemArgs);
                //}

                if (formatItem) {
                    xlsxFormatItemArgs = new XlsxFormatItemEventArgs(panel, new wjcGrid.CellRange(rowIndex, ci),
                        cloneFakeCell, fakeCell, xlsxCell);
                    formatItem(xlsxFormatItemArgs);
                    // If xlsxFormatItemArgs.getFormattedCell was called then a new cloned cell was created and
                    // assigned to xlsxFormatItemArgs.cell, We assign it to cloneFakeCell to remove it from DOM
                    // in the code below.
                    cloneFakeCell = <HTMLDivElement>xlsxFormatItemArgs.cell;
                }

                //if (!sheetInfo && (includeCellStyles/* || formatItem*/)) {
                if (cloneFakeCell) {
                    cloneFakeCell.parentElement.removeChild(cloneFakeCell);
                    cloneFakeCell = null;
                }

                workbookRow.cells.push(xlsxCell);
            }
            return startColIndex + ci;
        }

        // Parse CSS style to Excel style.
        private static _parseCellStyle(cellStyle: any): wjcXlsx.IWorkbookStyle {
            if (cellStyle == null) {
                return null;
            }

            var fontSize = cellStyle.fontSize;
            fontSize = fontSize ? +fontSize.substring(0, fontSize.indexOf('px')) : null;

            // We should parse the font size from pixel to point for exporting.
            if (isNaN(fontSize)) {
                fontSize = null;
            }
            var fontWeight = cellStyle.fontWeight;
            fontWeight = fontWeight === 'bold' || +fontWeight >= 700;
            var fontStyle = cellStyle.fontStyle === 'italic';
            var textDecoration = cellStyle.textDecorationStyle;
            if (textDecoration == null) {
                textDecoration = cellStyle.textDecoration;
            }
            textDecoration = textDecoration === 'underline';
            var wordWrap = cellStyle.whiteSpace;
            wordWrap = wordWrap ? (wordWrap.indexOf('pre') > -1 ? true : false) : false;

            return {
                font: {
                    bold: fontWeight,
                    italic: fontStyle,
                    underline: textDecoration,
                    family: this._parseToExcelFontFamily(cellStyle.fontFamily),
                    size: fontSize,
                    color: cellStyle.color,
                },
                fill: {
                    color: cellStyle.backgroundColor
                },
                borders: this._parseBorder(cellStyle),
                hAlign: wjcXlsx.Workbook._parseStringToHAlign(cellStyle.textAlign),
                wordWrap: wordWrap
            };
        }

        // Parse the border style.
        private static _parseBorder(cellStyle: any): wjcXlsx.IWorkbookBorder {
            var border: wjcXlsx.IWorkbookBorder = {};
            border['left'] = this._parseEgdeBorder(cellStyle, 'Left');
            border['right'] = this._parseEgdeBorder(cellStyle, 'Right');
            border['top'] = this._parseEgdeBorder(cellStyle, 'Top');
            border['bottom'] = this._parseEgdeBorder(cellStyle, 'Bottom');
            return border;
        }

        // Parse the egde of the borders
        private static _parseEgdeBorder(cellStyle: any, edge: string): wjcXlsx.IWorkbookBorderSetting {
            var edgeBorder: wjcXlsx.IWorkbookBorderSetting,
                style = cellStyle['border' + edge + 'Style'];

            if (style && style !== 'none' && style !== 'hidden') {
                edgeBorder = {};
                style = style.toLowerCase();
                switch (style) {
                    case 'dotted':
                        edgeBorder.style = wjcXlsx.BorderStyle.Dotted;
                        break;
                    case 'dashed':
                        edgeBorder.style = wjcXlsx.BorderStyle.Dashed;
                        break;
                    case 'double':
                        edgeBorder.style = wjcXlsx.BorderStyle.Double;
                        break;
                    default:
                        edgeBorder.style = wjcXlsx.BorderStyle.Thin;
                        break;
                }
                edgeBorder.color = cellStyle['border' + edge + 'Color'];
            }

            return edgeBorder;
        }

        // Parse the border style to css style.
        private static _parseBorderStyle(borderStyle: wjcXlsx.BorderStyle, edge: string, cellStyle: any) {
            var edgeStyle = 'border' + edge + 'Style',
                edgeWidth = 'border' + edge + 'Width';
            switch (borderStyle) {
                case wjcXlsx.BorderStyle.Dotted:
                case wjcXlsx.BorderStyle.Hair:
                    cellStyle[edgeStyle] = 'dotted';
                    cellStyle[edgeWidth] = '1px';
                    break;
                case wjcXlsx.BorderStyle.Dashed:
                case wjcXlsx.BorderStyle.ThinDashDotDotted:
                case wjcXlsx.BorderStyle.ThinDashDotted:
                    cellStyle[edgeStyle] = 'dashed';
                    cellStyle[edgeWidth] = '1px';
                    break;
                case wjcXlsx.BorderStyle.MediumDashed:
                case wjcXlsx.BorderStyle.MediumDashDotDotted:
                case wjcXlsx.BorderStyle.MediumDashDotted:
                case wjcXlsx.BorderStyle.SlantedMediumDashDotted:
                    cellStyle[edgeStyle] = 'dashed';
                    cellStyle[edgeWidth] = '2px';
                    break;
                case wjcXlsx.BorderStyle.Double:
                    cellStyle[edgeStyle] = 'double';
                    cellStyle[edgeWidth] = '3px';
                    break;
                case wjcXlsx.BorderStyle.Medium:
                    cellStyle[edgeStyle] = 'solid';
                    cellStyle[edgeWidth] = '2px';
                    break;
                default:
                    cellStyle[edgeStyle] = 'solid';
                    cellStyle[edgeWidth] = '1px';
                    break;
            }
        }

        // Parse the CSS font family to excel font family.
        private static _parseToExcelFontFamily(fontFamily: string): string {
            var fonts: string[];

            if (fontFamily) {
                fonts = fontFamily.split(',');
                if (fonts && fonts.length > 0) {
                    fontFamily = fonts[0].replace(/\"|\'/g, '');
                }
            }
            return fontFamily;
        }

        // Parse the formula to excel formula.
        private static _parseToExcelFormula(formula: string, isDate: boolean): string {
            var func = formula.substring(1, formula.indexOf('(')).toLowerCase(),
                format: string,
                formatIndex: number;

            switch (func) {
                case 'ceiling':
                case 'floor':
                    formula = formula.substring(0, formula.lastIndexOf(')')) + ', 1)';
                    break;
                case 'text':
                    formatIndex = formula.search(/\,\s*\"/);
                    format = formula.substring(formatIndex, formula.lastIndexOf('\"'));
                    format = wjcXlsx.Workbook._parseCellFormat(format.substring(format.lastIndexOf('\"') + 1), isDate);
                    formula = formula.substring(0, formatIndex) + ', \"' + format + '\")';
                    break;
            }
            return formula;
        }

        // Parse the excel formula to flexsheet formula.
        private static _parseToFlexSheetFormula(excelFormula: string): string {
            var match = excelFormula.substring(1).match(/\W+(\w+)\(/),
                func: string,
                funcName: string,
                funcIndex: number,
                value: any,
                oriFormat: string,
                format: string;

            if (match && match.length === 2) {
                funcName = match[1];
            } else {
                funcName = excelFormula.substring(1, excelFormula.indexOf('('));
            }
            funcIndex = excelFormula.indexOf(funcName);

            switch (funcName.toLowerCase()) {
                case 'ceiling':
                case 'floor':
                    excelFormula = excelFormula.substring(0, excelFormula.lastIndexOf(',')) + ')';
                    break;
                case 'text':
                    func = excelFormula.substring(funcIndex);
                    oriFormat = func.substring(func.indexOf('\"'), func.lastIndexOf('\"'));
                    // Fix TFS issue 122648
                    oriFormat = oriFormat.substring(oriFormat.lastIndexOf('\"') + 1);
                    if (oriFormat.indexOf('0') > -1) {
                        // For processing number format
                        value = 0;
                    } else {
                        // For processing string format 
                        value = '';
                    }
                    format = wjcXlsx.Workbook._parseExcelFormat({
                        value: value,
                        style: {
                            format: oriFormat
                        }
                    });
                    format = format.replace(/m+/g, (str: string) => {
                        return str.toUpperCase();
                    }).replace(/Y+/g, (str: string) => {
                        return str.toLowerCase();
                    }).replace(/M+:?|:?M+/gi, (str: string) => {
                        if (str.indexOf(':') > -1) {
                            return str.toLowerCase();
                        } else {
                            return str;
                        }
                    });
                    excelFormula = excelFormula.substring(0, funcIndex) + func.substring(0, func.indexOf('\"') + 1) + format + excelFormula.substring(excelFormula.indexOf(oriFormat) + oriFormat.length);
                    break;
            }

            return excelFormula;
        }

        // Gets the column setting, include width, visible, format and alignment
        private static _getColumnSetting(column: wjcGrid.Column, defaultWidth: number): wjcXlsx.IWorkbookColumn {
            var width = column.renderWidth;

            width = width || defaultWidth;

            return {
                autoWidth: true,
                width: width,
                visible: column.visible,
                style: {
                    format: column.format ? wjcXlsx.Workbook._parseCellFormat(column.format, column.dataType === wjcCore.DataType.Date) : '',
                    hAlign: wjcXlsx.Workbook._parseStringToHAlign(this._toExcelHAlign(column.getAlignment())),
                    wordWrap: column.wordWrap
                }
            };
        }

        // Parse the CSS alignment to excel hAlign.
        private static _toExcelHAlign(value: string): string {
            value = value ? value.trim().toLowerCase() : value;
            if (!value)
                return value;

            if (value.indexOf('center') > -1) {
                return 'center';
            }

            if (value.indexOf('right') > -1 || value.indexOf('end') > -1) {
                return 'right';
            }

            if (value.indexOf('justify') > -1) {
                return 'justify';
            }

            return 'left';
        }

        // gets column count for specific row
        private static _getColumnCount(sheetData: any[]): number {
            var columnCount = 0,
                currentColCnt = 0,
                data: any[];

            for (var i = 0; i < sheetData.length; i++) {
                data = sheetData[i] && sheetData[i].cells ? sheetData[i].cells : [];
                if (data && data.length > 0) {
                    currentColCnt = data.length;
                    if (wjcCore.isInt(data[currentColCnt - 1].colSpan) && data[currentColCnt - 1].colSpan > 1) {
                        currentColCnt = currentColCnt + data[currentColCnt - 1].colSpan - 1
                    }
                    if (currentColCnt > columnCount) {
                        columnCount = currentColCnt;
                    }
                }
            }

            return columnCount;
        }

        // gets row count for specified sheet
        private static _getRowCount(sheetData: any[], columnCnt: number): number {
            var rowCount = sheetData.length,
                rowIndex = rowCount - 1,
                colIndex = 0,
                lastRow: any,
                data: any[],
                cell: any;

            for (; colIndex < columnCnt; colIndex++) {
                rowLoop:
                for (; rowIndex >= 0; rowIndex--) {
                    lastRow = sheetData[rowIndex];
                    data = lastRow && lastRow.cells ? lastRow.cells : [];
                    cell = data[colIndex];
                    if (cell && ((cell.value != null && cell.value !== '') || (wjcCore.isInt(cell.rowSpan) && cell.rowSpan > 1))) {
                        if (wjcCore.isInt(cell.rowSpan) && cell.rowSpan > 1 && (rowIndex + cell.rowSpan > rowCount)) {
                            rowCount = rowIndex + cell.rowSpan;
                        }
                        break rowLoop;
                    }
                }
            }

            return rowCount;
        }

        // convert the column index to alphabet
        private static _numAlpha(i: number): string {
            var t = Math.floor(i / 26) - 1; return (t > -1 ? this._numAlpha(t) : '') + String.fromCharCode(65 + i % 26);
        }

        // Get DataType for value of the specific excel item
        private static _getItemType(item: any): wjcCore.DataType {
            if (item === undefined || item === null
                || item.value === undefined || item.value === null
                || isNaN(item.value)) {
                return undefined;
            }

            return wjcCore.getType(item.value);
        }

        // Set column definition for the Flex Grid
        private static _setColumn(columns: IColumn[], columnIndex: number, item: any) {
            var dataType,
                format,
                hAlign,
                columnSetting = columns[columnIndex];

            if (!columnSetting) {
                columns[columnIndex] = {
                    dataType: this._getItemType(item),
                    format: wjcXlsx.Workbook._parseExcelFormat(item),
                    hAlign: '',
                    wordWrap: true
                };
            } else {
                dataType = this._getItemType(item);
                if (columnSetting.dataType !== dataType &&
                    columnSetting.dataType === wjcCore.DataType.Boolean && dataType !== wjcCore.DataType.Boolean) {
                    columnSetting.dataType = dataType;
                }

                if (item && item.value != null && item.value !== '') {
                    format = wjcXlsx.Workbook._parseExcelFormat(item);
                    if (format && columnSetting.format !== format && format !== 'General') {
                        columnSetting.format = format;
                    }
                }

                if (item && item.style) {
                    if (item.style.hAlign) {
                        hAlign = wjcXlsx.Workbook._parseHAlignToString(wjcCore.asEnum(item.style.hAlign, wjcXlsx.HAlign));
                    }
                    columnSetting.wordWrap = columnSetting.wordWrap && !!item.style.wordWrap;
                }
                if (!hAlign && dataType === wjcCore.DataType.Number) {
                    hAlign = 'right';
                }
                columnSetting.hAlign = hAlign;
            }
        }

        // Get value from the excel cell item
        private static _getItemValue(item: any): any {
            if (item === undefined || item === null
                || item.value === undefined || item.value === null) {
                return undefined;
            }

            var val = item.value;

            if (wjcCore.isNumber(val) && isNaN(val)) {
                return '';
            } else if (val instanceof Date && isNaN(val.getTime())) {
                return '';
            } else {
                return val;
            }
        }

        // Get style of cell.
        static _getCellStyle(panel: wjcGrid.GridPanel, fakeCell: HTMLDivElement, r: number, c: number): any {
            // create element to get styles
            var theStyle: CSSStyleDeclaration;

            //let fakeCellClone = fakeCell;
            try {
                //AlexI
                //this._resetCellStyle(fakeCell);
                // get styles for any panel, row, column
                panel.grid.cellFactory.updateCell(panel, r, c, fakeCell);
                fakeCell.className = fakeCell.className.replace('wj-state-selected', '');
                fakeCell.className = fakeCell.className.replace('wj-state-multi-selected', '');
            } catch (ex) {
                return null;
            }

            theStyle = window.getComputedStyle(fakeCell);
            
            return theStyle;
        }

        // reset the style of the cell
        //private static _resetCellStyle(cell: HTMLElement) {
        //    for (var stylePro in cell.style) {
        //        if (typeof cell.style[stylePro] === 'string' && isNaN(+stylePro)) {
        //            cell.style[stylePro] = '';
        //        }
        //    }
        //}

        // extends the source hash to destination hash
        private static _extend(dst: any, src: any) {
            for (var key in src) {
                var value = src[key];
                if (wjcCore.isObject(value) && dst[key]) {
                    wjcCore.copy(dst[key], value); // copy sub-objects
                } else {
                    dst[key] = value; // assign values
                }
            }
            return dst;
        }

        // check the parent group collapsed setting.
        private static _checkParentCollapsed(groupCollapsedSettings: any, groupLevel: number): boolean {
            var parentCollapsed = false;
            Object.keys(groupCollapsedSettings).forEach((key) => {
                if (groupCollapsedSettings[key] === true && parentCollapsed === false && !isNaN(groupLevel) && +key < groupLevel) {
                    parentCollapsed = true;
                }
            });
            return parentCollapsed;
        }

        // Get the col span for the merged cells.
        private static _getColSpan(p: wjcGrid.GridPanel, mergedRange: wjcGrid.CellRange, includeColumns: (column: wjcGrid.Column) => boolean): number {
            var colSpan = 0;
            for (var i = mergedRange.leftCol; i <= mergedRange.rightCol; i++) {
                if (!includeColumns || includeColumns(p.columns[i])) {
                    colSpan++;
                }
            }
            return colSpan;
        }
    }

    /**
     * Represents arguments of the IFlexGridXlsxOptions.formatItem callback.
     */
    export class XlsxFormatItemEventArgs extends wjcGrid.CellRangeEventArgs {
        private _cell: HTMLDivElement;
        private _patternCell: HTMLDivElement;
        private _xlsxCell: wjcXlsx.IWorkbookCell;

        constructor(panel: wjcGrid.GridPanel, rng: wjcGrid.CellRange, cell: HTMLDivElement, patternCell: HTMLDivElement,
                xlsxCell: wjcXlsx.IWorkbookCell) {
            super(panel, rng);

            this._cell = cell;
            this._patternCell = patternCell;
            this._xlsxCell = xlsxCell;
        }
        /**
         * If IFlexGridXlsxOptions.includeCellStyles is set to true then contains a
         * reference to the element that represents the formatted grid cell; otherwise, a null value.
         * 
         */
        get cell(): HTMLElement {
            return this._cell;
        }

        /**
         * Contains an exporting cell representation. Initially it contains a default cell representation created
         * by FlexGrid export, and can be modified by the event handler to customize its final content. For example,
         * the xlsxCell.value property can be updated to modify a cell content, xlsxCell.style to modify cell's style,
         * and so on.
         */
        get xlsxCell(): wjcXlsx.IWorkbookCell {
            return this._xlsxCell;
        }
        set xlsxCell(value: wjcXlsx.IWorkbookCell) {
            this._xlsxCell = value;
        }

        /**
         * Returns a cell with a custom formatting applied (formatItem event, cell templates).
         * This method is useful when export of custom formatting is disabled
         * (IFlexGridXlsxOptions.includeCellStyles=false), but you need
         * to export a custom content and/or style for a certain cells.
         */
        getFormattedCell(): HTMLElement {
            if (!this._cell) {
                this._cell = <HTMLDivElement>this._patternCell.cloneNode();
                this._patternCell.parentElement.appendChild(this._cell);
                FlexGridXlsxConverter._getCellStyle(this.panel, this._cell, this.range.row, this.range.col);
            }
            return this._cell
        }
    }

    /*
     * Column Definition for Flex Grid
     */
    interface IColumn {
        /*
         * Data Type
         */
        dataType: wjcCore.DataType;
        /*
         * Format
         */
        format: string;
        /*
         * Horizontal alignment
         */
        hAlign: string;
        /*
         * Word wrap setting
         */
        wordWrap: boolean;
    }
    /**
     * Defines additional worksheet properties that can be accesses via the dynamic <b>wj_sheetInfo</b> property
     * of the @see:FlexGrid instance.
     */
    export interface IExtendedSheetInfo {
        /**
         * The sheet name.
         */
        name: string;
        /**
         * Sheet visibility.
         */
        visible: boolean;
        /**
         * Styled cells in the sheet
         */
        styledCells: any;
        /**
         * Merged ranges in the sheet
         */
        mergedRanges: any;
        /**
         * Contains an array of font names used in the sheet.
         */
        fonts: string[];
    }
    /**
     * FlexGrid Xlsx conversion options
     */
    export interface IFlexGridXlsxOptions {
        /**
         * The index of the sheet in the workbook.  It indicates to import which sheet.
         */
        sheetIndex?: number; // import only
        /**
         * The name of the sheet.
         * It indicates to import which sheet for importing.  If the sheetIndex and sheetName are both setting, the priority of sheetName is higher than sheetIndex.
         * It sets the name of worksheet for exporting.
         */
        sheetName?: string; //import-export
        /**
         * The visible of the sheet.
         */
        sheetVisible?: boolean; //import-export
        /**
         * Indicates whether to include column headers as first rows in the generated xlsx file.
         */
        includeColumnHeaders?: boolean; //import-export
        /**
         * Indicates whether to include column headers as first rows in the generated xlsx file.
         */
        includeRowHeaders?: boolean; //import-export
        /**
         * Indicates whether cells styling should be included in the generated xlsx file.
         */
        includeCellStyles?: boolean; //export only
        /**
         * Index or name of the active sheet in the xlsx file.
         */
        activeWorksheet?: any; // [[ changed type to 'any'; could be an index or a name ]]; export only
        /**
         * A callback to indicate which columns of FlexGrid need be included or omitted during exporting.
         *
         * For example:
         * <pre>// This sample excludes the 'country' column from export.
         * &nbsp;
         * // JavaScript
         * wijmo.grid.xlsx.FlexGridXlsxConverter.save(grid, {
         *   includeColumns: function(column) {
         *      return column.binding !== 'country';
         *   }
         * }</pre>
         */
        includeColumns?: (column: wjcGrid.Column) => boolean; //export only
        /**
         * An optional callback which is called for every exported cell and allows to perform transformations
         * of exported cell value and style.
         * The callback is called irrespectively of the 'includeCellStyles' property value.
         */
        formatItem?: (args: XlsxFormatItemEventArgs) => void; //export only
    }


