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
//---------------------------------------------------------
//
// Change log.
//
// 1.  Add row height / column width support for exporting.
//     We add the height property in the worksheet.row for exporting row height.
//     We add the width property in the worksheet.col for exporting column width.
// 2.  Add row/column visible support for exporting.
//     We add the rowVisible property in the first cell of each row to supporting the row visible feature.
//     We add the visible property in the cells for supporting the column visible feature.
// 3.  Add group header support for exporting/importing.
//     We add the groupLevel property in the cells for exporting group.
//     We read the outlineLevel property of the excel row for importing group.
// 4.  Add indent property for nested group for exporting.
//     We add the indent property in the cells of the group row for exporting the indentation for the nested groups.
// 5.  Modify the excel built-in format 'mm-dd-yy' to 'm/d/yyyy'.
// 6.  Add excel built-in format '$#,##0.00_);($#,##0.00)'.
// 7.  Fix issue that couldn't read rich text content of excel cell.
// 8.  Fix issue that couldn't read the excel cell content processed by the string processing function.
// 9.  Fix issue exporting empty sheet 'dimension ref' property incorrect.
// 10. Add frozen rows and columns supporting for exporting/importing.
//     We add frozenPane property that includes rows and columns sub properties in each worksheet.
// 11. Add 'ca' attribute for the cellFormula element for exporting.
// 12. Add formula supporting for importing.
// 13. escapeXML for the formula of the cell.
// 14. Add font color and fill color processing for exporting.
// 15. Add font and fill color processing for importing.
// 16. Add horizontal alignment processing for importing.
// 17. Add column width and row height processing for importing.
// 18. Update merge cells processing for exporting.
// 19. Add merge cells processing for importing.
// 20. Packed cell styles into the style property of cell for exporting.
// 21. Fixed convert excel date value to JS Date object issue.
// 22. Parse the merge cell info to rowSpan and colSpan property of cell.
// 23. Add row collapsed processing for importing.
// 24. Fixed the getting type of cell issue when there is shared formula in the cell.
// 25. Rename the method name from xlsx to _xlsx.
// 26. Add isDate property for cell to indicated whether the value of the cell is date or not.
// 27. Add parsePixelToCharWidth method and parseCharWidthToPixel method.
// 28. Just get the display string for importing.
// 29. Add inheritance style parsing for exporting.
// 30. Fixed the issue that the string like number pattern won't be exported as string.
// 31. Added parse indexed color processing.
// 32. Added parse theme color processing.
// 33. Added row style supporting.
// 34. Added column style supporting.
// 35. Added check empty object function.
// 36. Added hidden worksheet supporting for importing\exporting.
// 37. Parse the different color pattern to Hex pattern like #RRGGBB for exporting.
// 38. Add vertical alignment processing for exporting.
// 39. Add shared formula importing.
// 40. Add macro importing\exporting.
// 41. Add border style exporting.
// 42. Add processing for worksheet style.
//
//----------------------------------------------------------
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
var JSZip = window['JSZip'];
if ((typeof JSZip === 'undefined' || !JSZip) && typeof window['require'] === 'function') {
    JSZip = window['require']('node-zip');
}
/*
 * Defines the xlsx exporting\importing related class and methods.
 */
var wijmo;
(function (wijmo) {
    var xlsx;
    (function (xlsx) {
        'use strict';
        /*
         * This class provides static <b>load</b> and <b>save</b> methods for loading and saving of the Workbook object model
         * from/to Excel xlsx files.
         */
        var _xlsx = (function () {
            function _xlsx() {
            }
            /*
             * Loads the xlsx file to the Workbook object model.
             * This method works with JSZip 3.0.
             *
             * @param base64 the base64 string that contains the xlsx file content.
             */
            _xlsx.load = function (base64) {
                var zipTime = Date.now();
                var zip = new JSZip();
                var result = { sheets: [], zipTime: Date.now() - zipTime };
                var processTime = Date.now();
                var s;
                var text;
                //var begin;
                wijmo.assert(zip.loadAsync == null, "Please use JSZip 2.5 to load excel files synchronously.");
                zip = zip.load(base64, { base64: true });
                base64 = null;
                if (s = zip.file('xl/sharedStrings.xml')) {
                    //begin = Date.now();
                    this._getSharedString(s.asText());
                    //console.log(`Shared String loaded in ${(Date.now() - begin) / 1000} seconds`);
                }
                if (s = zip.file('docProps/core.xml')) {
                    this._getCoreSetting(s.asText(), result);
                }
                if (s = zip.file('xl/workbook.xml')) {
                    this._getWorkbook(s.asText(), result);
                }
                if (s = zip.file('xl/theme/theme1.xml')) {
                    this._getTheme(s.asText());
                }
                if (s = zip.file('xl/styles.xml')) {
                    this._getStyle(s.asText());
                }
                result.styles = this._styles;
                // Get the macro of the xlsx file into workbook object model.
                if (s = zip.file('xl/vbaProject.bin')) {
                    if (result.reservedContent == null) {
                        result.reservedContent = {};
                    }
                    result.reservedContent.macros = s.asUint8Array();
                }
                // Get worksheet info from "xl/worksheets/sheetX.xml"
                var i = result.sheets.length;
                while (i--) {
                    s = zip.file('xl/worksheets/sheet' + (i + 1) + '.xml');
                    //begin = Date.now();
                    this._getSheet(s.asText(), i, result);
                    //console.log(`WorkSheet loaded in ${(Date.now() - begin) / 1000} seconds`);
                }
                result.processTime = Date.now() - processTime;
                zip = null;
                return result;
            };
            /*
             * Loads the xlsx file to the Workbook object model asynchronously.
             * This method works with JSZip 3.0.
             *
             * @param base64 the base64 string that contains the xlsx file content.
             */
            _xlsx.loadAsync = function (base64) {
                var self = this;
                var processTime = Date.now();
                var promise = new _Promise();
                var zip = new JSZip();
                var result = { sheets: [] };
                wijmo.assert(zip.loadAsync != null, "Please use JSZip 3.0 to load excel files asynchrounously.");
                zip.loadAsync(base64, { base64: true }).then(function (zip) {
                    var preProcessings = [];
                    base64 = null;
                    var file = zip.file('xl/sharedStrings.xml');
                    if (file) {
                        // Process sharedStrings
                        preProcessings.push(file.async('string').then(function (content) {
                            //var begin = Date.now();
                            self._getSharedString(content);
                            //console.log(`Shared String loaded in ${(Date.now() - begin) / 1000} seconds`);
                        }));
                    }
                    file = zip.file('xl/theme/theme1.xml');
                    if (file) {
                        // Get color theme from "xl/theme/theme1.xml".
                        preProcessings.push(file.async('string').then(function (content) {
                            self._getTheme(content);
                            var file = zip.file('xl/styles.xml');
                            if (file) {
                                // Get style info from "xl/styles.xml".
                                file.async('string').then(function (content) {
                                    self._getStyle(content);
                                    result.styles = self._styles;
                                });
                            }
                        }));
                    }
                    else {
                        file = zip.file('xl/styles.xml');
                        if (file) {
                            // Get style info from "xl/styles.xml".
                            preProcessings.push(file.async('string').then(function (content) {
                                self._getStyle(content);
                                result.styles = self._styles;
                            }));
                        }
                    }
                    file = zip.file('xl/workbook.xml');
                    if (file) {
                        // Get workbook info from "xl/workbook.xml".
                        preProcessings.push(file.async('string').then(function (content) {
                            self._getWorkbook(content, result);
                        }));
                    }
                    var preProcessing = new _CompositedPromise(preProcessings);
                    preProcessing.then(function (_) {
                        var processings = [];
                        // Get file info from "docProps/core.xml"
                        var getCore = zip.file('docProps/core.xml');
                        if (getCore) {
                            processings.push(getCore.async('string').then(function (content) {
                                self._getCoreSetting(content, result);
                            }));
                        }
                        // Get the macro of the xlsx file into workbook object model.
                        var getMacros = zip.file('xl/vbaProject.bin');
                        if (getMacros) {
                            processings.push(getMacros.async('uint8array').then(function (content) {
                                if (result.reservedContent == null) {
                                    result.reservedContent = {};
                                }
                                result.reservedContent.macros = content;
                            }));
                        }
                        // Get worksheet info from "xl/worksheets/sheetX.xml".
                        zip.folder('xl/worksheets').forEach(function (relativePath, file) {
                            var index = self._getSheetIndex(file.name);
                            processings.push(file.async('string').then(function (content) {
                                //var begin = Date.now();
                                self._getSheet(content, index - 1, result);
                                //console.log(`WorkSheet loaded in ${(Date.now() - begin) / 1000} seconds`);
                            }));
                        });
                        var afterProcessings = new _CompositedPromise(processings);
                        afterProcessings.then(function (_) {
                            result.processTime = Date.now() - processTime;
                            zip = null;
                            promise.resolve(result);
                        });
                    });
                });
                return promise;
            };
            /*
             * Saves the workbook object model to a base-64 string representation of the workbook object model.
             * This method works with JSZip 2.5.
             *
             * @param workbook the workbook object model.
             */
            _xlsx.save = function (workbook) {
                var processTime = Date.now();
                var zip = this._saveWorkbookToZip(workbook);
                //console.log(`Zip OM created (includes xmlSerializer) in ${(Date.now() - window['xlsxTime']) / 1000} seconds`);
                //window['xlsxTime'] = Date.now();
                processTime = Date.now() - processTime;
                var applicationType = '';
                if (this._macroEnabled) {
                    applicationType = 'application/vnd.ms-excel.sheet.macroEnabled.12;';
                }
                else {
                    applicationType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;';
                }
                var zipTime = Date.now();
                var base64 = zip.generate({ compression: 'DEFLATE' });
                //console.log('zip.generate');
                return {
                    base64: base64,
                    zipTime: Date.now() - zipTime,
                    processTime: processTime,
                    href: function () {
                        return 'data:' + applicationType + 'base64,' + base64;
                    }
                };
            };
            /*
             * Saves the workbook object model to a base-64 string representation of the workbook object model asynchronously.
             * This method works with JSZip 3.0.
             *
             * @param workbook the workbook object model.
             * @param onError this callback user can catche error information when loading.
             */
            _xlsx.saveAsync = function (workbook, onError) {
                var zip = this._saveWorkbookToZip(workbook, true);
                //console.log(`Zip OM created (includes xmlSerializer) in ${(Date.now() - window['xlsxTime']) / 1000} seconds`);
                //window['xlsxTime'] = Date.now();
                var result = zip.generateAsync({ type: 'base64', compression: 'DEFLATE' });
                //console.log('zip.generateAsync');
                if (onError) {
                    result.catch(onError);
                }
                return result;
            };
            // Save the workbook object model to zip.
            _xlsx._saveWorkbookToZip = function (workbook, isAsync) {
                if (isAsync === void 0) { isAsync = false; }
                var processTime = Date.now();
                var zip = new JSZip();
                if (isAsync) {
                    wijmo.assert(zip.generateAsync != null, "Please use JSZip 3.0 to save excel files asynchrounously.");
                }
                else {
                    wijmo.assert(zip.generateAsync == null, "Please use JSZip 2.5 to save excel files synchronously.");
                }
                zip.folder('_rels').file('.rels', this._xmlDescription + this._generateRelsDoc());
                var docProps = zip.folder('docProps');
                var xl = zip.folder('xl');
                xl.folder('theme').file('theme1.xml', this._xmlDescription + this._generateThemeDoc());
                // Export the macro to xlsx file.
                this._macroEnabled = !!(workbook.reservedContent && workbook.reservedContent.macros);
                if (this._macroEnabled) {
                    xl.file('vbaProject.bin', workbook.reservedContent.macros);
                }
                var xlWorksheets = xl.folder('worksheets');
                // Not content dependent
                docProps.file('core.xml', this._xmlDescription + this._generateCoreDoc(workbook));
                // Content dependent
                this._sharedStrings = [[], 0];
                this._styles = new Array(1);
                this._borders = new Array(1);
                this._fonts = new Array(1);
                this._fills = new Array(2);
                this._contentTypes = [];
                this._props = [];
                this._xlRels = [];
                this._worksheets = [];
                var w = workbook.sheets.length;
                while (w--) {
                    this._generateWorkSheet(w, workbook, xlWorksheets);
                }
                // xl/styles.xml
                xl.file('styles.xml', this._xmlDescription + this._generateStyleDoc());
                // [Content_Types].xml
                zip.file('[Content_Types].xml', this._xmlDescription + this._generateContentTypesDoc());
                // docProps/app.xml
                docProps.file('app.xml', this._xmlDescription + this._generateAppDoc(workbook));
                // xl/_rels/workbook.xml.rels
                xl.folder('_rels').file('workbook.xml.rels', this._xmlDescription + this._generateWorkbookRels());
                // xl/sharedStrings.xml
                var strSharedStringDoc = this._xmlDescription + this._generateSharedStringsDoc();
                this._sharedStrings = [[], 0];
                xl.file('sharedStrings.xml', strSharedStringDoc);
                strSharedStringDoc = null;
                // xl/workbook.xml
                xl.file('workbook.xml', this._xmlDescription + this._generateWorkbook(workbook));
                return zip;
            };
            // Get shared strings
            _xlsx._getSharedString = function (sharedString) {
                var s = sharedString.split(/<si.*?>/g), i = s.length, j, content, contentResult;
                this._sharedStrings = [];
                while (--i) {
                    j = 1;
                    if (s[i].search(/<r>/gi) > -1) {
                        // GrapeCity: Handle the rich text run.
                        content = s[i].split(/<r>/g);
                    }
                    else {
                        // GrapeCity: We just need the display string for importing. 
                        s[i] = s[i].substring(0, s[i].indexOf('</t>'));
                        content = s[i].split(/<t.*?>/g);
                    }
                    this._sharedStrings[i - 1] = '';
                    while (j < content.length) {
                        if (content[j].search(/<t.*?>/g) > -1) {
                            // GrapeCity: Get the text for the rich text run.
                            contentResult = content[j].match(/(<t.*?>)(.*)/);
                            if (contentResult && contentResult.length === 3 && contentResult[2] != null) {
                                content[j] = contentResult[2].substring(0, contentResult[2].indexOf('</t>'));
                            }
                        }
                        this._sharedStrings[i - 1] += xlsx.Workbook._unescapeXML(content[j]);
                        j++;
                    }
                }
            };
            // Get inline strings
            _xlsx._getInlineString = function (cell) {
                var content = cell.split('<t>'), i = content.length, inlineStr = '';
                while (--i) {
                    inlineStr += content[i].substring(0, content[i].indexOf('</t>'));
                }
                return inlineStr;
            };
            // Get core setting.
            _xlsx._getCoreSetting = function (coreSetting, result) {
                var s, index;
                index = coreSetting.indexOf('<dc:creator>');
                if (index >= 0) {
                    s = coreSetting.substr(index + 12);
                    result.creator = s.substring(0, s.indexOf('</dc:creator>'));
                }
                index = coreSetting.indexOf('<cp:lastModifiedBy>');
                if (index >= 0) {
                    s = coreSetting.substr(index + 19);
                    result.lastModifiedBy = s.substring(0, s.indexOf('</cp:lastModifiedBy>'));
                }
                index = coreSetting.indexOf('<dcterms:created xsi:type="dcterms:W3CDTF">');
                if (index >= 0) {
                    s = coreSetting.substr(index + 43);
                    result.created = new Date(s.substring(0, s.indexOf('</dcterms:created>')));
                }
                index = coreSetting.indexOf('<dcterms:modified xsi:type="dcterms:W3CDTF">');
                if (index >= 0) {
                    s = coreSetting.substr(index + 44);
                    result.modified = new Date(s.substring(0, s.indexOf('</dcterms:modified>')));
                }
            };
            // Get workbook setting.
            _xlsx._getWorkbook = function (workbook, result) {
                var bookView = workbook.substring(workbook.indexOf('<bookViews>'), workbook.indexOf('</bookViews>')), activeSheet = '', s, i, name, worksheetVisible;
                if (bookView) {
                    activeSheet = this._getAttr(bookView, 'activeTab');
                }
                result.activeWorksheet = +activeSheet;
                s = workbook.split('<sheet ');
                i = s.length;
                while (--i) {
                    name = this._getAttr(s[i], 'name');
                    // GrapeCity Begin: Gets the worksheet visible property.
                    worksheetVisible = this._getAttr(s[i], 'state') !== 'hidden';
                    result.sheets.unshift({ name: name, visible: worksheetVisible, columns: [], rows: [] });
                    // GrapeCity End
                }
            };
            // Get themes.
            _xlsx._getTheme = function (theme) {
                theme = theme.substring(theme.indexOf('<a:clrScheme'), theme.indexOf('</a:clrScheme>'));
                this._colorThemes = [];
                this._colorThemes[0] = this._getAttr(theme.substring(theme.indexOf('a:lt1'), theme.indexOf('</a:lt1>')), 'lastClr');
                this._colorThemes[1] = this._getAttr(theme.substring(theme.indexOf('a:dk1'), theme.indexOf('</a:dk1>')), 'lastClr');
                this._colorThemes[2] = this._getAttr(theme.substring(theme.indexOf('a:lt2'), theme.indexOf('</a:lt2>')), 'val');
                this._colorThemes[3] = this._getAttr(theme.substring(theme.indexOf('a:dk2'), theme.indexOf('</a:dk2>')), 'val');
                var accentThemes = theme.substring(theme.indexOf('<a:accent1'), theme.indexOf('</a:accent6>')).split('<a:accent');
                var i = accentThemes.length;
                while (--i) {
                    this._colorThemes[i + 3] = this._getAttr(accentThemes[i], 'val');
                }
            };
            // Get styles.
            _xlsx._getStyle = function (styleSheet) {
                var i, item, index, size, fonts = [], fills = [], borders = [];
                this._styles = [];
                index = styleSheet.indexOf('<numFmts');
                if (index >= 0) {
                    var numFmtArray = styleSheet.substring(index + 8, styleSheet.indexOf('</numFmts>')).split('<numFmt');
                    i = numFmtArray.length;
                    while (--i) {
                        item = item = numFmtArray[i];
                        this._numFmts[+this._getAttr(item, 'numFmtId')] = this._getAttr(item, 'formatCode');
                    }
                }
                index = styleSheet.indexOf('<fonts');
                if (index >= 0) {
                    var fontArray = styleSheet.substring(index, styleSheet.indexOf('</fonts>')).split('<font>');
                    i = fontArray.length;
                    while (--i) {
                        item = fontArray[i];
                        size = this._getChildNodeValue(item, "sz");
                        fonts[i - 1] = {
                            bold: item.indexOf('<b/>') >= 0,
                            italic: item.indexOf('<i/>') >= 0,
                            underline: item.indexOf('<u/>') >= 0,
                            size: Math.round(size ? +size * 96 / 72 : 11),
                            family: this._getChildNodeValue(item, "name"),
                            color: this._getColor(item, false)
                        };
                        size = null;
                    }
                }
                index = styleSheet.indexOf('<fills');
                if (index >= 0) {
                    var fillArray = styleSheet.substring(index, styleSheet.indexOf('</fills>')).split('<fill>');
                    i = fillArray.length;
                    while (--i) {
                        fills[i - 1] = this._getColor(fillArray[i], true);
                    }
                }
                index = styleSheet.indexOf('<borders');
                if (index >= 0) {
                    var borderArray = styleSheet.substring(index, styleSheet.indexOf('</borders>')).split('<border>');
                    i = borderArray.length;
                    while (--i) {
                        item = borderArray[i];
                        borders[i - 1] = {
                            left: this._getEdgeBorder(item, 'left'),
                            right: this._getEdgeBorder(item, 'right'),
                            top: this._getEdgeBorder(item, 'top'),
                            bottom: this._getEdgeBorder(item, 'bottom'),
                        };
                    }
                }
                index = styleSheet.indexOf('<cellXfs');
                if (index >= 0) {
                    var xfs = styleSheet.substring(index, styleSheet.indexOf('</cellXfs>')).split('<xf');
                    i = xfs.length;
                    var format, type, id, font, fill, border;
                    while (--i) {
                        item = xfs[i];
                        id = +this._getAttr(item, 'numFmtId');
                        format = this._numFmts[id];
                        if (!!format) {
                            if (/[hsmy\:]/i.test(format)) {
                                type = 'date';
                            }
                            else if (format.indexOf('0') > -1) {
                                type = 'number';
                            }
                            else if (format === '@') {
                                type = 'string';
                            }
                            else {
                                type = 'unknown';
                            }
                        }
                        else {
                            type = 'unknown';
                        }
                        id = +this._getAttr(item, 'fontId');
                        font = id > 0 ? fonts[id] : null;
                        id = +this._getAttr(item, 'fillId');
                        fill = id > 1 ? fills[id] : null;
                        id = +this._getAttr(item, 'borderId');
                        border = id > 0 ? borders[id] : null;
                        index = item.indexOf('<alignment');
                        this._styles.unshift({
                            formatCode: format,
                            type: type,
                            font: font,
                            fillColor: fill,
                            borders: border,
                            hAlign: index >= 0 ? xlsx.Workbook._parseStringToHAlign(this._getAttr(item, 'horizontal')) : null,
                            wordWrap: index >= 0 ? this._getAttr(item, 'wrapText') === '1' : null,
                        });
                    }
                }
            };
            // Get border style of specific edge.
            _xlsx._getEdgeBorder = function (strBorder, edge) {
                var border, edgeBorder, borderStyle, borderColor, beginIndex = strBorder.indexOf('<' + edge), endIndex = strBorder.indexOf('</' + edge + '>');
                if (beginIndex >= 0) {
                    edgeBorder = strBorder.substring(beginIndex);
                    if (endIndex >= 0) {
                        edgeBorder = edgeBorder.substring(0, endIndex);
                    }
                    else {
                        edgeBorder = edgeBorder.substring(0, edgeBorder.indexOf('/>'));
                    }
                    var style = this._getAttr(edgeBorder, 'style');
                    if (style) {
                        borderStyle = xlsx.Workbook._parseStringToBorderType(style);
                        borderColor = this._getColor(edgeBorder, false);
                        // Ignore the default border setting for importing.
                        if (borderStyle !== xlsx.BorderStyle.Thin || !(borderColor && borderColor.toLowerCase() === '#d4d4d4')) {
                            border = {};
                            border['style'] = borderStyle;
                            border['color'] = borderColor;
                        }
                    }
                }
                return border;
            };
            // Get worksheet.
            _xlsx._getSheet = function (sheet, index, result) {
                var mergeCells = [];
                var mergeRange;
                if (sheet.indexOf('<mergeCells') > -1) {
                    var mergeCellArray = sheet.substring(sheet.indexOf('<mergeCells'), sheet.indexOf('</mergeCells>')).split('<mergeCell ');
                    var j = mergeCellArray.length;
                    while (--j) {
                        mergeRange = this._getAttr(mergeCellArray[j], 'ref').split(':');
                        if (mergeRange.length === 2) {
                            mergeCells.unshift({
                                topRow: +mergeRange[0].match(/\d*/g).join('') - 1,
                                leftCol: this._alphaNum(mergeRange[0].match(/[a-zA-Z]*/g)[0]),
                                bottomRow: +mergeRange[1].match(/\d*/g).join('') - 1,
                                rightCol: this._alphaNum(mergeRange[1].match(/[a-zA-Z]*/g)[0])
                            });
                        }
                    }
                }
                // GrapeCity End
                // GrapeCity Begin: Gets tha base shared formula for current sheet.
                this._getsBaseSharedFormulas(sheet);
                // GrapeCity End
                var rows = sheet.split('<row ');
                var w = result.sheets[index];
                var dimensionIndex = rows[0].indexOf('<dimension');
                if (dimensionIndex >= 0) {
                    var dimension = this._getAttr(rows[0].substr(rows[0].indexOf('<dimension')), 'ref');
                    if (!!dimension) {
                        dimension = dimension.substr(dimension.indexOf(':') + 1);
                        w.maxCol = this._alphaNum(dimension.match(/[a-zA-Z]*/g)[0]) + 1;
                        w.maxRow = +dimension.match(/\d*/g).join('');
                    }
                }
                // GrapeCity Begin: Add hidden column and column width processing. 
                var cols = [];
                var colsSetting = [];
                var hiddenColumns = [];
                var style = null;
                var f = null;
                if (rows.length > 0 && rows[0].indexOf('<cols>') > -1) {
                    cols = rows[0].substring(rows[0].indexOf('<cols>') + 6, rows[0].indexOf('</cols>')).split('<col ');
                    for (var idx = cols.length - 1; idx > 0; idx--) {
                        var colWidth = this._parseCharWidthToPixel(+this._getAttr(cols[idx], 'width'));
                        f = null;
                        if (cols[idx].indexOf('style') > -1) {
                            f = this._styles[+this._getAttr(cols[idx], 'style')] || { type: 'General', formatCode: null };
                        }
                        style = null;
                        if (f && (f.font || f.fillColor || f.hAlign || f.wordWrap || f.borders || (f.formatCode && f.formatCode !== 'General'))) {
                            style = {
                                format: !f.formatCode || f.formatCode === 'General' ? null : f.formatCode,
                                font: f.font,
                                fill: {
                                    color: f.fillColor
                                },
                                borders: f.borders,
                                hAlign: f.hAlign,
                                wordWrap: f.wordWrap
                            };
                        }
                        for (var colIndex = +this._getAttr(cols[idx], 'min') - 1; colIndex < +this._getAttr(cols[idx], 'max'); colIndex++) {
                            colsSetting[colIndex] = {
                                visible: this._getAttr(cols[idx], 'hidden') !== '1',
                                autoWidth: this._getAttr(cols[idx], 'bestFit') === '1',
                                width: colWidth,
                                style: style
                            };
                        }
                    }
                }
                w.columns = colsSetting;
                // GrapeCity End
                // GrapeCity Begin: Add frozen cols/rows processing. 
                if (rows.length > 0 && rows[0].indexOf('<pane') > -1) {
                    if (this._getAttr(rows[0].substr(rows[0].indexOf('<pane')), 'state') === 'frozen') {
                        var frozenRows = this._getAttr(rows[0].substr(rows[0].indexOf('<pane')), 'ySplit');
                        var frozenCols = this._getAttr(rows[0].substr(rows[0].indexOf('<pane')), 'xSplit');
                        w.frozenPane = {
                            rows: frozenRows ? +frozenRows : NaN,
                            columns: frozenCols ? +frozenCols : NaN
                        };
                    }
                }
                // GrapeCity End
                // GrapeCity Begin: Check whether the Group Header is below the group content.
                w.summaryBelow = this._getAttr(rows[0], 'summaryBelow') !== '0';
                // GrapeCity End
                j = rows.length;
                while (--j) {
                    var row = w.rows[+this._getAttr(rows[j], 'r') - 1] = { visible: true, groupLevel: NaN, cells: [] };
                    // GrapeCity Begin: Check the visibility of the row.
                    if (rows[j].substring(0, rows[j].indexOf('>')).indexOf('hidden') > -1 && this._getAttr(rows[j], 'hidden') === '1') {
                        row.visible = false;
                    }
                    // GrapeCity End
                    // GrapeCity Begin: Get the row height setting for the custom Height row.
                    if (this._getAttr(rows[j], 'customHeight') === '1') {
                        var height = +this._getAttr(rows[j].substring(0, rows[j].indexOf('>')).replace('customHeight', ''), 'ht');
                        row.height = height * 96 / 72;
                    }
                    style = null;
                    f = null;
                    if (this._getAttr(rows[j], 'customFormat') === '1') {
                        f = this._styles[+this._getAttr(rows[j].substring(rows[j].indexOf(' s=')), 's')] || { type: 'General', formatCode: null };
                        if (f.font || f.fillColor || f.hAlign || f.wordWrap || f.borders || (f.formatCode && f.formatCode !== 'General')) {
                            style = {
                                format: !f.formatCode || f.formatCode === 'General' ? null : f.formatCode,
                                font: f.font,
                                fill: {
                                    color: f.fillColor
                                },
                                borders: f.borders,
                                hAlign: f.hAlign,
                                wordWrap: f.wordWrap
                            };
                        }
                        else {
                            style = null;
                        }
                    }
                    row.style = style;
                    // GrapeCity End
                    // GrapeCity Begin: Get the group level.
                    var groupLevel = this._getAttr(rows[j], 'outlineLevel');
                    row.groupLevel = groupLevel && groupLevel !== '' ? +groupLevel : NaN;
                    // GrapeCity End
                    // GrapeCity Begin: Get the collapsed attribute of the row.
                    row.collapsed = this._getAttr(rows[j], 'collapsed') === '1';
                    // GrapeCity End
                    var columns = rows[j].split('<c ');
                    var k = columns.length;
                    while (--k) {
                        var cell = columns[k];
                        f = this._styles[+this._getAttr(cell, 's')] || { type: 'General', formatCode: null };
                        // GrapeCity Begin: set font setting, fill setting and horizontal alignment into the style property.
                        if (f.font || f.fillColor || f.hAlign || f.wordWrap || f.borders || (f.formatCode && f.formatCode !== 'General')) {
                            style = {
                                format: !f.formatCode || f.formatCode === 'General' ? null : f.formatCode,
                                font: f.font,
                                fill: {
                                    color: f.fillColor
                                },
                                borders: f.borders,
                                hAlign: f.hAlign,
                                wordWrap: f.wordWrap
                            };
                        }
                        else {
                            style = null;
                        }
                        // GrapeCity End
                        var t = this._getAttr(cell.substring(0, cell.indexOf('>')), 't') || f.type;
                        var val = null;
                        var isInlineString = t === 'inlineStr' || cell.indexOf('<is>') >= 0;
                        if (isInlineString) {
                            val = this._getInlineString(cell);
                        }
                        else {
                            if (cell.indexOf('<v>') > -1) {
                                val = cell.substring(cell.indexOf('<v>') + 3, cell.indexOf('</v>'));
                            }
                        }
                        // GrapeCity Begin: Add formula processing. 
                        var formula = null;
                        var si = null;
                        var cellRef = null;
                        if (cell.indexOf('<f') > -1) {
                            if (cell.indexOf('</f>') > -1) {
                                formula = cell.match(/<f.*>.+(?=<\/f>)/);
                                if (formula) {
                                    formula = formula[0].replace(/(\<f.*>)(.+)/, "$2");
                                }
                            }
                            else {
                                si = this._getAttr(cell, 'si');
                                if (si) {
                                    cellRef = this._getAttr(cell, 'r');
                                    formula = this._getSharedFormula(si, cellRef);
                                }
                            }
                        }
                        // GrapeCity End
                        // GrapeCity Begin: Fix issue that couldn't read the excel cell content processed by the string processing function.
                        if (t !== 'str' && !isInlineString) {
                            val = val ? +val : '';
                        } // turn non-zero into number when the type of the cell is not 'str'
                        // GrapeCity End
                        colIndex = this._alphaNum(this._getAttr(cell, 'r').match(/[a-zA-Z]*/g)[0]);
                        switch (t) {
                            case 's':
                                val = this._sharedStrings[val];
                                break;
                            case 'b':
                                val = val === 1;
                                break;
                            case 'date':
                                val = val ? this._convertDate(val) : '';
                                break;
                        }
                        row.cells[colIndex] = {
                            value: val,
                            isDate: t === 'date',
                            formula: xlsx.Workbook._unescapeXML(formula) /* GrapeCity: Add formula property.*/,
                            style: style,
                            visible: hiddenColumns.indexOf(colIndex) === -1 /* Add visible property for the cell */
                        };
                    }
                }
                // Check the visible row/column count in the fronze pane. (TFS 238470)
                if (w.frozenPane) {
                    if (!isNaN(w.frozenPane.rows)) {
                        for (j = 0; j < w.rows.length; j++) {
                            if (j < w.frozenPane.rows) {
                                if (w.rows[j] && !w.rows[j].visible) {
                                    w.frozenPane.rows++;
                                }
                            }
                            else {
                                break;
                            }
                        }
                    }
                    if (!isNaN(w.frozenPane.columns)) {
                        for (j = 0; j < colsSetting.length; j++) {
                            if (j < w.frozenPane.columns) {
                                if (colsSetting[j] && !colsSetting[j].visible) {
                                    w.frozenPane.columns++;
                                }
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
                // GrapeCity Begin: Parse the merge cell info to rowSpan and colSpan property of cell.
                var mergeCell;
                for (k = 0; k < mergeCells.length; k++) {
                    mergeCell = mergeCells[k];
                    w.rows[mergeCell.topRow].cells[mergeCell.leftCol].rowSpan = mergeCell.bottomRow - mergeCell.topRow + 1;
                    w.rows[mergeCell.topRow].cells[mergeCell.leftCol].colSpan = mergeCell.rightCol - mergeCell.leftCol + 1;
                }
                // GrapeCity End.
            };
            // Generate the _rels doc.
            _xlsx._generateRelsDoc = function () {
                var rels = '<Relationships xmlns="' + this._relationshipsNS + '">' +
                    '<Relationship Target="docProps/app.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Id="rId3"/>' +
                    '<Relationship Target="docProps/core.xml" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Id="rId2"/>' +
                    '<Relationship Target="xl/workbook.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Id="rId1"/>' +
                    '</Relationships>';
                return rels;
            };
            // Generate the theme doc.
            _xlsx._generateThemeDoc = function () {
                var theme = '<a:theme name="Office Theme" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">' +
                    '<a:themeElements>' +
                    this._generateClrScheme() +
                    this._generateFontScheme() +
                    this._generateFmtScheme() +
                    '</a:themeElements>' +
                    '<a:objectDefaults/><a:extraClrSchemeLst/>' +
                    '</a:theme>';
                return theme;
            };
            // Generate ClrScheme element for theme doc.
            _xlsx._generateClrScheme = function () {
                var clrScheme = '<clrScheme name="Office">' +
                    '<a:dk1><a:sysClr lastClr="000000" val="windowText"/></a:dk1>' +
                    '<a:lt1><a:sysClr lastClr="FFFFFF" val="window"/></a:lt1>' +
                    '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>' +
                    '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>' +
                    '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>' +
                    '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>' +
                    '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>' +
                    '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>' +
                    '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>' +
                    '<a:accent6><a:srgbClr val="F79646"/></a:accent6>' +
                    '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>' +
                    '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>' +
                    '</clrScheme>';
                return clrScheme;
            };
            // Generate fontScheme element for theme doc.
            _xlsx._generateFontScheme = function () {
                var fontScheme = '<a:fontScheme name="Office"><a:majorFont>' +
                    '<a:latin typeface="Cambria"/>' +
                    '<a:ea typeface=""/>' +
                    '<a:cs typeface=""/>' +
                    '<a:font typeface="ＭＳ Ｐゴシック" script="Jpan"/>' +
                    '<a:font typeface="맑은 고딕" script="Hang"/>' +
                    '<a:font typeface="宋体" script="Hans"/>' +
                    '<a:font typeface="新細明體" script="Hant"/>' +
                    '<a:font typeface="Times New Roman" script="Arab"/>' +
                    '<a:font typeface="Times New Roman" script="Hebr"/>' +
                    '<a:font typeface="Tahoma" script="Thai"/>' +
                    '<a:font typeface="Nyala" script="Ethi"/>' +
                    '<a:font typeface="Vrinda" script="Beng"/>' +
                    '<a:font typeface="Shruti" script="Gujr"/>' +
                    '<a:font typeface="MoolBoran" script="Khmr"/>' +
                    '<a:font typeface="Tunga" script="Knda"/>' +
                    '<a:font typeface="Raavi" script="Guru"/>' +
                    '<a:font typeface="Euphemia" script="Cans"/>' +
                    '<a:font typeface="Plantagenet Cherokee" script="Cher"/>' +
                    '<a:font typeface="Microsoft Yi Baiti" script="Yiii"/>' +
                    '<a:font typeface="Microsoft Himalaya" script="Tibt"/>' +
                    '<a:font typeface="MV Boli" script="Thaa"/>' +
                    '<a:font typeface="Mangal" script="Deva"/>' +
                    '<a:font typeface="Gautami" script="Telu"/>' +
                    '<a:font typeface="Latha" script="Taml"/>' +
                    '<a:font typeface="Estrangelo Edessa" script="Syrc"/>' +
                    '<a:font typeface="Kalinga" script="Orya"/>' +
                    '<a:font typeface="Kartika" script="Mlym"/>' +
                    '<a:font typeface="DokChampa" script="Laoo"/>' +
                    '<a:font typeface="Iskoola Pota" script="Sinh"/>' +
                    '<a:font typeface="Mongolian Baiti" script="Mong"/>' +
                    '<a:font typeface="Times New Roman" script="Viet"/>' +
                    '<a:font typeface="Microsoft Uighur" script="Uigh"/>' +
                    '<a:font typeface="Sylfaen" script="Geor"/>' +
                    '</a:majorFont>' +
                    '<a:minorFont>' +
                    '<a:latin typeface="Calibri"/>' +
                    '<a:ea typeface=""/>' +
                    '<a:cs typeface=""/>' +
                    '<a:font typeface="ＭＳ Ｐゴシック" script="Jpan"/>' +
                    '<a:font typeface="맑은 고딕" script="Hang"/>' +
                    '<a:font typeface="宋体" script="Hans"/>' +
                    '<a:font typeface="新細明體" script="Hant"/>' +
                    '<a:font typeface="Arial" script="Arab"/>' +
                    '<a:font typeface="Arial" script="Hebr"/>' +
                    '<a:font typeface="Tahoma" script="Thai"/>' +
                    '<a:font typeface="Nyala" script="Ethi"/>' +
                    '<a:font typeface="Vrinda" script="Beng"/>' +
                    '<a:font typeface="Shruti" script="Gujr"/>' +
                    '<a:font typeface="DaunPenh" script="Khmr"/>' +
                    '<a:font typeface="Tunga" script="Knda"/>' +
                    '<a:font typeface="Raavi" script="Guru"/>' +
                    '<a:font typeface="Euphemia" script="Cans"/>' +
                    '<a:font typeface="Plantagenet Cherokee" script="Cher"/>' +
                    '<a:font typeface="Microsoft Yi Baiti" script="Yiii"/>' +
                    '<a:font typeface="Microsoft Himalaya" script="Tibt"/>' +
                    '<a:font typeface="MV Boli" script="Thaa"/>' +
                    '<a:font typeface="Mangal" script="Deva"/>' +
                    '<a:font typeface="Gautami" script="Telu"/>' +
                    '<a:font typeface="Latha" script="Taml"/>' +
                    '<a:font typeface="Estrangelo Edessa" script="Syrc"/>' +
                    '<a:font typeface="Kalinga" script="Orya"/>' +
                    '<a:font typeface="Kartika" script="Mlym"/>' +
                    '<a:font typeface="DokChampa" script="Laoo"/>' +
                    '<a:font typeface="Iskoola Pota" script="Sinh"/>' +
                    '<a:font typeface="Mongolian Baiti" script="Mong"/>' +
                    '<a:font typeface="Arial" script="Viet"/>' +
                    '<a:font typeface="Microsoft Uighur" script="Uigh"/>' +
                    '<a:font typeface="Sylfaen" script="Geor"/>' +
                    '</a:minorFont>' +
                    '</a:fontScheme>';
                return fontScheme;
            };
            // Generate fmtScheme element for theme doc.
            _xlsx._generateFmtScheme = function () {
                var fmtScheme = '<a:fmtScheme name="Office">' +
                    this._generateFillScheme() +
                    this._generateLineStyles() +
                    this._generateEffectScheme() +
                    this._generateBgFillScheme() +
                    '</a:fmtScheme>';
                return fmtScheme;
            };
            // Generate fillStyles element for fmtScheme element.
            _xlsx._generateFillScheme = function () {
                var fillStyles = '<a:fillStyleLst>' +
                    '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>' +
                    '<a:gradFill rotWithShape="1">' +
                    '<a:gsLst>' +
                    '<a:gs pos="0"><a:schemeClr val="phClr">' +
                    '<a:tint val="50000"/>' +
                    '<a:satMod val="300000"/>' +
                    '</a:schemeClr></a:gs>' +
                    '<a:gs pos="35000"><a:schemeClr val="phClr">' +
                    '<a:tint val="37000"/>' +
                    '<a:satMod val="300000"/>' +
                    '</a:schemeClr></a:gs>' +
                    '<a:gs pos="100000"><a:schemeClr val="phClr">' +
                    '<a:satMod val="350000"/>' +
                    '</a:schemeClr></a:gs>' +
                    '</a:gsLst>' +
                    '<a:lin scaled="1" ang="16200000"/>' +
                    '</a:gradFill>' +
                    '<a:gradFill rotWithShape="1">' +
                    '<a:gsLst>' +
                    '<a:gs pos="0"><a:schemeClr val="phClr">' +
                    '<a:tint val="51000"/>' +
                    '<a:satMod val="130000"/>' +
                    '</a:schemeClr></a:gs>' +
                    '<a:gs pos="80000"><a:schemeClr val="phClr">' +
                    '<a:tint val="15000"/>' +
                    '<a:satMod val="130000"/>' +
                    '</a:schemeClr></a:gs>' +
                    '<a:gs pos="100000"><a:schemeClr val="phClr">' +
                    '<a:tint val="94000"/>' +
                    '<a:satMod val="135000"/>' +
                    '</a:schemeClr></a:gs>' +
                    '</a:gsLst>' +
                    '<a:lin scaled="1" ang="16200000"/>' +
                    '</a:gradFill>' +
                    '</a:fillStyleLst>';
                return fillStyles;
            };
            // Generate lineStyles element for fmtScheme element.
            _xlsx._generateLineStyles = function () {
                var lineStyles = '<a:lnStyleLst>' +
                    '<a:ln algn="ctr" cmpd="sng" cap="flat" w="9525">' +
                    '<a:solidFill><a:schemeClr val="phClr">' +
                    '<a:shade val="9500"/>' +
                    '<a:satMod val="105000"/>' +
                    '</a:schemeClr></a:solidFill>' +
                    '<a:prstDash val="solid"/>' +
                    '</a:ln>' +
                    '<a:ln algn="ctr" cmpd="sng" cap="flat" w="25400">' +
                    '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>' +
                    '<a:prstDash val="solid"/>' +
                    '</a:ln>' +
                    '<a:ln algn="ctr" cmpd="sng" cap="flat" w="38100">' +
                    '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>' +
                    '<a:prstDash val="solid"/>' +
                    '</a:ln>' +
                    '</a:lnStyleLst>';
                return lineStyles;
            };
            // Generate effectStyles element for fmtScheme element.
            _xlsx._generateEffectScheme = function () {
                var effectStyles = '<a:effectStyleLst>' +
                    '<a:effectStyle><a:effectLst>' +
                    '<a:outerShdw dir="5400000" rotWithShape="0" dist="23000" blurRad="40000">' +
                    '<a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr>' +
                    '</a:outerShdw>' +
                    '</a:effectLst></a:effectStyle>' +
                    '<a:effectStyle><a:effectLst>' +
                    '<a:outerShdw dir="5400000" rotWithShape="0" dist="23000" blurRad="40000">' +
                    '<a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr>' +
                    '</a:outerShdw>' +
                    '</a:effectLst></a:effectStyle>' +
                    '<a:effectStyle><a:effectLst>' +
                    '<a:outerShdw dir="5400000" rotWithShape="0" dist="23000" blurRad="40000">' +
                    '<a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr>' +
                    '</a:outerShdw>' +
                    '</a:effectLst>' +
                    '<a:scene3d>' +
                    '<a:camera prst="orthographicFront">' +
                    '<a:rot rev="0" lon="0" lat="0"/>' +
                    '</a:camera>' +
                    '<a:lightRig dir="t" rig="threePt">' +
                    '<a:rot rev="1200000" lon="0" lat="0"/>' +
                    '</a:lightRig>' +
                    '</a:scene3d>' +
                    '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>' +
                    '</a:effectStyle>' +
                    '</a:effectStyleLst>';
                return effectStyles;
            };
            // Generate bgFillStyles element for fmtScheme element.
            _xlsx._generateBgFillScheme = function () {
                var bgFillStyles = '<a:bgFillStyleLst>' +
                    '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>' +
                    '<a:gradFill rotWithShape="1">' +
                    '<a:gsLst>' +
                    '<a:gs pos="0"><a:schemeClr val="phClr">' +
                    '<a:tint val="40000"/>' +
                    '<a:satMod val="350000"/>' +
                    '</a:schemeClr></a:gs>' +
                    '<a:gs pos="40000"><a:schemeClr val="phClr">' +
                    '<a:tint val="45000"/>' +
                    '<a:shade val="99000"/>' +
                    '<a:satMod val="350000"/>' +
                    '</a:schemeClr></a:gs>' +
                    '<a:gs pos="100000"><a:schemeClr val="phClr">' +
                    '<a:tint val="20000"/>' +
                    '<a:satMod val="255000"/>' +
                    '</a:schemeClr></a:gs>' +
                    '</a:gsLst>' +
                    '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>' +
                    '</a:gradFill>' +
                    '<a:gradFill rotWithShape="1">' +
                    '<a:gsLst>' +
                    '<a:gs pos="0"><a:schemeClr val="phClr">' +
                    '<a:satMod val="300000"/>' +
                    '</a:schemeClr></a:gs>' +
                    '<a:gs pos="100000"><a:schemeClr val="phClr">' +
                    '<a:tint val="80000"/>' +
                    '<a:satMod val="200000"/>' +
                    '</a:schemeClr></a:gs>' +
                    '</a:gsLst>' +
                    '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>' +
                    '</a:gradFill>' +
                    '</a:bgFillStyleLst>';
                return bgFillStyles;
            };
            // Generate core doc.
            _xlsx._generateCoreDoc = function (file) {
                var coreProperties = '<cp:coreProperties ' +
                    'xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" ' +
                    'xmlns:dc="http://purl.org/dc/elements/1.1/" ' +
                    'xmlns:dcterms="http://purl.org/dc/terms/" ' +
                    'xmlns:dcmitype="http://purl.org/dc/dcmitype/" ' +
                    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
                if (!!file.creator) {
                    coreProperties += '<dc:creator>' + file.creator + '</dc:creator>';
                }
                else {
                    coreProperties += '<dc:creator/>';
                }
                if (!!file.lastModifiedBy) {
                    coreProperties += '<cp:lastModifiedBy>' + file.lastModifiedBy + '</cp:lastModifiedBy>';
                }
                else {
                    coreProperties += '<cp:lastModifiedBy/>';
                }
                coreProperties += '<dcterms:created xsi:type="dcterms:W3CDTF">' + (file.created || new Date()).toISOString() + '</dcterms:created>' +
                    '<dcterms:modified xsi:type="dcterms:W3CDTF">' + (file.modified || new Date()).toISOString() + '</dcterms:modified>' +
                    '</cp:coreProperties>';
                return coreProperties;
            };
            // Generate sheet global settings.
            _xlsx._generateSheetGlobalSetting = function (index, worksheet, file) {
                var l = worksheet.rows && worksheet.rows[0] && worksheet.rows[0].cells ? worksheet.rows[0].cells.length : 0;
                var ret = ' xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"' +
                    ' xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"' +
                    ' mc:Ignorable="x14ac"' +
                    ' xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">';
                ret += '<sheetPr><outlinePr summaryBelow="0"/></sheetPr>';
                ret += '<dimension ref="A1' + (l > 0 ? ':' + this._numAlpha(l - 1) + (worksheet.rows.length) : '') + '"/>';
                ret += '<sheetViews><sheetView workbookViewId="0"';
                if (index === file.activeWorksheet) {
                    ret += ' tabSelected="1"';
                }
                if (worksheet.frozenPane && (worksheet.frozenPane.rows !== 0 || worksheet.frozenPane.columns !== 0)) {
                    ret += '>'; // sheetView
                    ret += '<pane state="frozen"' +
                        ' activePane="' + (worksheet.frozenPane.rows !== 0 && worksheet.frozenPane.columns !== 0 ? 'bottomRight' : (worksheet.frozenPane.rows !== 0 ? 'bottomLeft' : 'topRight')) +
                        '" topLeftCell="' + (this._numAlpha(worksheet.frozenPane.columns) + (worksheet.frozenPane.rows + 1)) +
                        '" ySplit="' + worksheet.frozenPane.rows.toString() +
                        '" xSplit="' + worksheet.frozenPane.columns.toString() +
                        '"/>';
                    ret += '</sheetView>';
                }
                else {
                    ret += '/>'; // sheetView
                }
                ret += '</sheetViews>';
                ret += '<sheetFormatPr defaultRowHeight="15" x14ac:dyDescent="0.25"/>';
                return ret;
            };
            // Generate cell element.
            _xlsx._generateCell = function (rowIndex, colIndex, styleIndex, type, val, formula) {
                var ret = '<c r="' + this._numAlpha(colIndex) + (rowIndex + 1) +
                    '" s="' + styleIndex.toString() + '"';
                if (!!type) {
                    ret += ' t="' + type + '"';
                }
                var children = '';
                if (!!formula) {
                    children += '<f ca="1">' + xlsx.Workbook._escapeXML(formula) + '</f>';
                }
                if (val != null) {
                    children += '<v>' + val + '</v>';
                }
                //return cell;
                return ret + (children ? '>' + children + '</c>' : '/>');
            };
            // Generate merge cell setting.
            _xlsx._generateMergeSetting = function (merges) {
                var ret = '<mergeCells count="' + merges.length.toString() + '">';
                for (var i = 0; i < merges.length; i++) {
                    ret += '<mergeCell ref="' + merges[i].join(':') + '"/>';
                }
                return ret + '</mergeCells>';
            };
            // Generate style doc
            _xlsx._generateStyleDoc = function () {
                var styleSheet = '<styleSheet ' +
                    'xmlns="' + this._workbookNS + '" ' +
                    'xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" ' +
                    'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" ' +
                    'mc:Ignorable="x14ac">';
                var numFmts = '';
                var numFmt = '';
                var customNumFmts = [];
                var i = 0;
                var newFormatIndex = 0;
                var fonts = '';
                var fontEle = '';
                fontEle = this._generateFontStyle({}, true);
                var fills = '';
                var fillEle = '';
                fillEle += this._generateFillStyle('none', null);
                fillEle += this._generateFillStyle('gray125', null);
                var borders = '';
                var borderEle = '';
                borderEle += this._generateBorderStyle({});
                var cellXfs = '';
                var cellXf = '';
                cellXf += this._generateCellXfs(0, 0, 0, 0, {});
                while (i < this._styles.length) {
                    var style = this._styles[i];
                    if (!!style) {
                        style = JSON.parse(style);
                        // cell formatting, refer to it if necessary
                        var formatIndex = 0;
                        if (style.format && style.format !== 'General') {
                            formatIndex = this._numFmts.indexOf(style.format);
                            if (formatIndex < 0) {
                                var cusFmtIdx = customNumFmts.indexOf(style.format);
                                if (cusFmtIdx === -1) {
                                    customNumFmts.push(style.format);
                                    formatIndex = 164 + newFormatIndex;
                                    numFmt += '<numFmt numFmtId="' + formatIndex.toString() + '" formatCode="' + style.format + '"/>';
                                    newFormatIndex++;
                                }
                                else {
                                    formatIndex = 164 + cusFmtIdx;
                                }
                            }
                        }
                        // border declaration: add a new declaration and refer to it in style
                        var borderIndex = 0;
                        if (style.borders) {
                            // try to reuse existing border
                            var border = JSON.stringify(style.borders);
                            borderIndex = this._borders.indexOf(border);
                            if (borderIndex < 0) {
                                borderIndex = this._borders.push(border) - 1;
                                borderEle += this._generateBorderStyle(style.borders);
                            }
                        }
                        // font declaration: add a new declaration and refer to it in style
                        var fontIndex = 0;
                        if (style.font) {
                            var font = JSON.stringify(style.font);
                            // try to reuse existing font
                            fontIndex = this._fonts.indexOf(font);
                            if (fontIndex < 0) {
                                fontIndex = this._fonts.push(font) - 1;
                                fontEle += this._generateFontStyle(style.font);
                            }
                        }
                        // Add fill color property
                        var fillIndex = 0;
                        if (style.fill && style.fill.color) {
                            var fill = JSON.stringify(style.fill);
                            ;
                            fillIndex = this._fills.indexOf(fill);
                            if (fillIndex < 0) {
                                fillIndex = this._fills.push(fill) - 1;
                                fillEle += this._generateFillStyle('solid', style.fill.color);
                            }
                        }
                        cellXf += this._generateCellXfs(formatIndex, borderIndex, fontIndex, fillIndex, style);
                    }
                    i++;
                }
                customNumFmts = null;
                if (newFormatIndex > 0) {
                    numFmts = '<numFmts count="' + newFormatIndex + '">';
                    numFmts += numFmt;
                    numFmts += '</numFmts>';
                }
                else {
                    numFmts = '<numFmts count="0"/>';
                }
                styleSheet += numFmts;
                fonts = '<fonts count="' + this._fonts.length + '" x14ac:knownFonts="1">';
                fonts += fontEle;
                fonts += '</fonts>';
                styleSheet += fonts;
                fills = '<fills count="' + this._fills.length + '">';
                fills += fillEle;
                fills += '</fills>';
                styleSheet += fills;
                borders = '<borders count="' + this._borders.length + '">';
                borders += borderEle;
                borders += '</borders>';
                styleSheet += borders;
                styleSheet += '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';
                cellXfs = '<cellXfs count="' + this._styles.length + '">';
                cellXfs += cellXf;
                cellXfs += '</cellXfs>';
                styleSheet += cellXfs +
                    '<cellStyles count="1"><cellStyle xfId="0" builtinId="0" name="Normal"/></cellStyles>' +
                    '<dxfs count="0"/>' +
                    '<tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/>' +
                    '<extLst><ext uri="{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}">' +
                    '<x14ac:slicerStyles defaultSlicerStyle="SlicerStyleLight1" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"/>' +
                    '</ext></extLst>' +
                    '</styleSheet>';
                return styleSheet;
            };
            // Generate border style element.
            _xlsx._generateBorderStyle = function (borders) {
                var border = '<border>';
                for (var edge in { left: 0, right: 0, top: 0, bottom: 0, diagonal: 0 }) {
                    var edgeEle = '<' + edge;
                    if (borders[edge]) {
                        var edgeEle = '<' + edge;
                        var color = borders[edge].color;
                        color = color ? (color[0] === '#' ? color.substring(1) : color) : '';
                        // add transparency if missing
                        if (color.length === 6) {
                            color = 'FF' + color;
                        }
                        if (!color) {
                            color = 'FF000000';
                        }
                        edgeEle += ' style="' + borders[edge].style + '">';
                        var colorEle = '<color rgb="' + color + '"/>';
                        edgeEle += colorEle;
                        edgeEle += '</' + edge + '>';
                    }
                    else {
                        edgeEle += '/>';
                    }
                    border += edgeEle;
                }
                border += '</border>';
                return border;
            };
            // Generate font style element.
            _xlsx._generateFontStyle = function (fontStyle, needScheme) {
                if (needScheme === void 0) { needScheme = false; }
                var font = '<font>';
                if (fontStyle.bold) {
                    font += '<b/>';
                }
                if (fontStyle.italic) {
                    font += '<i/>';
                }
                if (fontStyle.underline) {
                    font += '<u/>';
                }
                var value = fontStyle.size ? Math.round(fontStyle.size * 72 / 96) : this._defaultFontSize;
                font += '<sz val="' + value + '"/>';
                if (!!fontStyle.color) {
                    font += '<color rgb="FF' + (fontStyle.color[0] === '#' ? fontStyle.color.substring(1) : fontStyle.color) + '"/>';
                }
                else {
                    font += '<color theme="1"/>';
                }
                font += '<name val="' + (fontStyle.family || this._defaultFontName) + '"/>';
                font += '<family val="2"/>';
                if (needScheme) {
                    font += '<scheme val="minor"/>';
                }
                font += '</font>';
                return font;
            };
            // Generate fill style element
            _xlsx._generateFillStyle = function (patternType, fillColor) {
                var fillEle = '<fill><patternFill patternType="' + patternType + '">';
                if (!!fillColor) {
                    fillEle += '<fgColor rgb="FF' + (fillColor[0] === '#' ? fillColor.substring(1) : fillColor) + '"/>' +
                        '<bgColor indexed="64"/>';
                }
                fillEle += '</patternFill></fill>';
                return fillEle;
            };
            // Generate xf element
            _xlsx._generateCellXfs = function (numFmtId, borderId, fontId, fillId, style) {
                var cellXf = '<xf xfId="0" ';
                cellXf += 'numFmtId="' + numFmtId.toString() + '" ';
                if (numFmtId > 0) {
                    cellXf += 'applyNumberFormat="1" ';
                }
                cellXf += 'borderId="' + borderId.toString() + '" ';
                if (borderId > 0) {
                    cellXf += 'applyBorder="1" ';
                }
                cellXf += 'fontId="' + fontId.toString() + '" ';
                if (fontId > 0) {
                    cellXf += 'applyFont="1" ';
                }
                cellXf += 'fillId="' + fillId.toString() + '" ';
                if (fillId > 0) {
                    cellXf += 'applyFill="1" ';
                }
                if (style.hAlign || style.vAlign || style.indent || style.wordWrap) {
                    cellXf += 'applyAlignment="1">';
                    var alignment = '<alignment ';
                    if (style.hAlign) {
                        alignment += 'horizontal="' + style.hAlign + '" ';
                    }
                    if (style.vAlign) {
                        alignment += 'vertical="' + style.vAlign + '" ';
                    }
                    if (style.indent) {
                        alignment += 'indent="' + style.indent + '" ';
                    }
                    if (style.wordWrap) {
                        alignment += 'wrapText="1"';
                    }
                    alignment += '/>';
                    cellXf += alignment;
                    cellXf += '</xf>';
                }
                else {
                    cellXf += '/>';
                }
                return cellXf;
            };
            // Generate content types doc
            _xlsx._generateContentTypesDoc = function () {
                var types = '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">';
                if (this._macroEnabled) {
                    types += '<Default ContentType="application/vnd.ms-office.vbaProject" Extension="bin"/>';
                }
                types += '<Default ContentType="application/vnd.openxmlformats-package.relationships+xml" Extension="rels"/>' +
                    '<Default ContentType="application/xml" Extension="xml"/>' +
                    '<Override ContentType="' + (this._macroEnabled ? 'application/vnd.ms-excel.sheet.macroEnabled.main+xml' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml') + '" PartName="/xl/workbook.xml"/>';
                for (var i = 0; i < this._contentTypes.length; i++) {
                    types += this._contentTypes[i];
                }
                types += '<Override ContentType="application/vnd.openxmlformats-officedocument.theme+xml" PartName="/xl/theme/theme1.xml"/>' +
                    '<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" PartName="/xl/styles.xml"/>' +
                    '<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml" PartName="/xl/sharedStrings.xml"/>' +
                    '<Override ContentType="application/vnd.openxmlformats-package.core-properties+xml" PartName="/docProps/core.xml"/>' +
                    '<Override ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml" PartName="/docProps/app.xml"/>' +
                    '</Types>';
                return types;
            };
            // Generate app doc
            _xlsx._generateAppDoc = function (file) {
                var props = '<Properties xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes" xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">' +
                    '<Application>' + (file.application || 'wijmo.xlsx') + '</Application>' +
                    '<DocSecurity>0</DocSecurity>' +
                    '<ScaleCrop>false</ScaleCrop>' +
                    '<HeadingPairs><vt:vector baseType="variant" size="2">' +
                    '<vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant>' +
                    '<vt:variant><vt:i4>' + this._props.length + '</vt:i4></vt:variant>' +
                    '</vt:vector></HeadingPairs>' +
                    '<TitlesOfParts><vt:vector baseType="lpstr" size="' + this._props.length + '">';
                for (var i = 0; i < this._props.length; i++) {
                    props += '<vt:lpstr>' + this._props[i] + '</vt:lpstr>';
                }
                props += '</vt:vector></TitlesOfParts>' +
                    '<Manager/>' +
                    '<Company>' + (file.company || 'GrapeCity, Inc.') + '</Company>' +
                    '<LinksUpToDate>false</LinksUpToDate>' +
                    '<SharedDoc>false</SharedDoc>' +
                    '<HyperlinksChanged>false</HyperlinksChanged>' +
                    '<AppVersion>1.0</AppVersion>' +
                    '</Properties>';
                return props;
            };
            // Generate workbook relationships doc
            _xlsx._generateWorkbookRels = function () {
                var rels = '<Relationships xmlns="' + this._relationshipsNS + '">';
                for (var i = 0; i < this._xlRels.length; i++) {
                    rels += this._xlRels[i];
                }
                rels += '<Relationship Target="sharedStrings.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Id="rId' + (this._xlRels.length + 1) + '"/>' +
                    '<Relationship Target="styles.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Id="rId' + (this._xlRels.length + 2) + '"/>' +
                    '<Relationship Target="theme/theme1.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Id="rId' + (this._xlRels.length + 3) + '"/>';
                if (this._macroEnabled) {
                    rels += '<Relationship Target="vbaProject.bin" Type="http://schemas.microsoft.com/office/2006/relationships/vbaProject" Id="rId' + (this._xlRels.length + 4) + '"/>';
                }
                rels += '</Relationships>';
                return rels;
            };
            // Generate workbook doc
            _xlsx._generateWorkbook = function (file) {
                var workbook = '<workbook xmlns="' + this._workbookNS + '" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
                    '<fileVersion rupBuild="9303" lowestEdited="5" lastEdited="5" appName="xl"/>' +
                    '<workbookPr defaultThemeVersion="124226"/>' +
                    '<bookViews><workbookView xWindow="480" yWindow="60" windowWidth="18195" windowHeight="8505"' + (file.activeWorksheet != null ? ' activeTab="' + file.activeWorksheet.toString() + '"' : '') + '/></bookViews>' +
                    '<sheets>';
                for (var i = 0; i < this._worksheets.length; i++) {
                    workbook += this._worksheets[i];
                }
                workbook += '</sheets>' +
                    '<calcPr fullCalcOnLoad="1"/>' +
                    '</workbook>';
                return workbook;
            };
            // Generate WorkSheet.
            _xlsx._generateWorkSheet = function (sheetIndex, file, xlWorksheets) {
                var id, worksheet, columnSettings, columnsStyle, sheetStyle, data, s, columns, merges, i, l, j, k, rowStyle, strStyle, styleIndex, cell, val, style, t, index, columnStyle, colWidth;
                // Generate worksheet (gather sharedStrings) then generate entries for constant files below
                id = sheetIndex + 1;
                worksheet = file.sheets[sheetIndex];
                columnSettings = worksheet.columns;
                columnsStyle = this._cloneColumnsStyle(columnSettings);
                if (!worksheet) {
                    throw 'Worksheet should not be empty!';
                }
                //console.log(`Came to WorkSheet generation in ${(Date.now() - window['xlsxTime']) / 1000} seconds`);
                //window['xlsxTime'] = Date.now();
                var sheetDoc = '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"';
                sheetDoc += this._generateSheetGlobalSetting(sheetIndex, worksheet, file);
                var sheetData = '<sheetData>';
                sheetStyle = worksheet.style ? this._cloneStyle(worksheet.style) : null;
                data = worksheet.rows;
                s = '';
                columns = [];
                merges = [];
                i = -1;
                l = data ? data.length : 0;
                while (++i < l) {
                    j = -1;
                    k = data[i] && data[i].cells ? data[i].cells.length : 0;
                    // Add row visibility, row height and group level for current excel row.
                    rowStyle = null;
                    sheetData += '<row x14ac:dyDescent="0.25" r="' + (i + 1).toString() + '"';
                    if (!!data[i]) {
                        if (data[i].height) {
                            sheetData += ' customHeight="1" ht="' + (+data[i].height * 72 / 96).toString() + '"';
                        }
                        if (data[i].groupLevel) {
                            sheetData += ' outlineLevel="' + (data[i].groupLevel).toString() + '"';
                        }
                        rowStyle = data[i].style ? this._cloneStyle(data[i].style) : null;
                        if (rowStyle) {
                            rowStyle = this._resolveStyleInheritance(rowStyle);
                            if (rowStyle.font && rowStyle.font.color) {
                                rowStyle.font.color = this._parseColor(rowStyle.font.color);
                            }
                            if (rowStyle.fill && rowStyle.fill.color) {
                                rowStyle.fill.color = this._parseColor(rowStyle.fill.color);
                            }
                            if (rowStyle.hAlign != null && !wijmo.isString(rowStyle.hAlign)) {
                                rowStyle.hAlign = xlsx.Workbook._parseHAlignToString(wijmo.asEnum(rowStyle.hAlign, xlsx.HAlign));
                            }
                            if (rowStyle.vAlign != null && !wijmo.isString(rowStyle.vAlign)) {
                                rowStyle.vAlign = xlsx.Workbook._parseVAlignToString(wijmo.asEnum(rowStyle.vAlign, xlsx.VAlign));
                            }
                            strStyle = JSON.stringify(rowStyle);
                            styleIndex = this._styles.indexOf(strStyle);
                            if (styleIndex < 0) {
                                styleIndex = this._styles.push(strStyle) - 1;
                            }
                            sheetData += ' customFormat="1" s="' + styleIndex.toString() + '"';
                        }
                    }
                    if (data[i] && data[i].visible === false) {
                        sheetData += ' hidden="1"';
                    }
                    if (data[i] && data[i].collapsed === true) {
                        sheetData += ' collapsed="1"';
                    }
                    sheetData += '>'; // <row>
                    while (++j < k) {
                        cell = data[i].cells[j];
                        val = null;
                        style = null;
                        t = '';
                        index = -1;
                        val = cell && cell.hasOwnProperty('value') ? cell.value : cell;
                        style = cell && cell.style ? this._cloneStyle(cell.style) : {};
                        // GrapeCity: remove the isFinite checking for the string value.  If the value is string, it will always be exported as string.
                        if (val && typeof val === 'string' && (+val).toString() !== val) {
                            // If value is string, and not string of just a number, place a sharedString reference instead of the value
                            this._sharedStrings[1]++; // Increment total count, unique count derived from sharedStrings[0].length
                            val = xlsx.Workbook._unescapeXML(val);
                            index = this._sharedStrings[0].indexOf(val);
                            if (index < 0) {
                                index = this._sharedStrings[0].push(val) - 1;
                            }
                            val = index;
                            t = 's';
                        }
                        else if (typeof val === 'boolean') {
                            val = (val ? 1 : 0);
                            t = 'b';
                        }
                        else if (this._typeOf(val) === 'date' || (cell && cell.isDate)) {
                            val = this._convertDate(val);
                            style.format = style.format || 'mm-dd-yy';
                        }
                        else if (typeof val === 'object') {
                            val = null;
                        } // unsupported value
                        // Resolve the inheritance style.
                        style = this._resolveStyleInheritance(style);
                        // Extends the cell style with worksheet style, column style and row style.
                        columnStyle = columnsStyle[j];
                        if (columnStyle) {
                            columnStyle = this._resolveStyleInheritance(columnStyle);
                            style = this._extend(style, columnStyle);
                        }
                        if (rowStyle) {
                            style = this._extend(style, rowStyle);
                        }
                        if (sheetStyle) {
                            sheetStyle = this._resolveStyleInheritance(sheetStyle);
                            style = this._extend(style, sheetStyle);
                        }
                        // Parse the hAlign/vAlign from enum to string.
                        if (style.hAlign != null && !wijmo.isString(style.hAlign)) {
                            style.hAlign = xlsx.Workbook._parseHAlignToString(wijmo.asEnum(style.hAlign, xlsx.HAlign));
                        }
                        if (style.vAlign != null && !wijmo.isString(style.vAlign)) {
                            style.vAlign = xlsx.Workbook._parseVAlignToString(wijmo.asEnum(style.vAlign, xlsx.VAlign));
                        }
                        // Parse the different color pattern to Hex pattern like #RRGGBB for the font color and fill color.
                        if (style.font && style.font.color) {
                            style.font.color = this._parseColor(style.font.color);
                        }
                        if (style.fill && style.fill.color) {
                            style.fill.color = this._parseColor(style.fill.color);
                        }
                        // Parse the border setting incluing border color and border style for each border.
                        if (style.borders) {
                            this._parseBorder(style.borders);
                        }
                        // use stringified version as unique and reproducible style signature
                        style = JSON.stringify(style);
                        styleIndex = this._styles.indexOf(style);
                        if (styleIndex < 0) {
                            styleIndex = this._styles.push(style) - 1;
                        }
                        // store merges if needed and add missing cells. Cannot have rowSpan AND colSpan
                        // Update for merge cells processing.
                        if (cell) {
                            if ((cell.colSpan != null && cell.colSpan > 1) || (cell.rowSpan != null && cell.rowSpan > 1)) {
                                cell.colSpan = cell.colSpan || 1;
                                cell.rowSpan = cell.rowSpan || 1;
                                if (this._checkValidMergeCell(merges, i, cell.rowSpan, j, cell.colSpan)) {
                                    merges.push([this._numAlpha(j) + (i + 1), this._numAlpha(j + cell.colSpan - 1) + (i + cell.rowSpan)]);
                                }
                            }
                        }
                        style = null;
                        sheetData += this._generateCell(i, j, styleIndex, t, val, cell && cell.formula ? cell.formula : null);
                    }
                    sheetData += '</row>';
                }
                sheetData += '</sheetData>';
                //cols = null;
                if (columnSettings && columnSettings.length > 0) {
                    sheetDoc += '<cols>';
                    for (i = 0; i < columnSettings.length; i++) {
                        styleIndex = -1;
                        // Add the column visibilty for the excel column
                        if (!this._isEmpty(columnSettings[i])) {
                            columnStyle = columnSettings[i].style;
                            if (columnStyle) {
                                columnStyle = this._resolveStyleInheritance(columnStyle);
                                if (columnStyle.font && columnStyle.font.color) {
                                    columnStyle.font.color = this._parseColor(columnStyle.font.color);
                                }
                                if (columnStyle.fill && columnStyle.fill.color) {
                                    columnStyle.fill.color = this._parseColor(columnStyle.fill.color);
                                }
                                if (columnStyle.hAlign != null && !wijmo.isString(columnStyle.hAlign)) {
                                    columnStyle.hAlign = xlsx.Workbook._parseHAlignToString(wijmo.asEnum(columnStyle.hAlign, xlsx.HAlign));
                                }
                                if (columnStyle.vAlign != null && !wijmo.isString(columnStyle.vAlign)) {
                                    columnStyle.vAlign = xlsx.Workbook._parseVAlignToString(wijmo.asEnum(columnStyle.vAlign, xlsx.VAlign));
                                }
                                columnStyle = JSON.stringify(columnStyle);
                                styleIndex = this._styles.indexOf(columnStyle);
                                if (styleIndex < 0) {
                                    styleIndex = this._styles.push(columnStyle) - 1;
                                }
                            }
                            colWidth = columnSettings[i].width;
                            if (colWidth != null) {
                                if (typeof colWidth === 'string' && colWidth.indexOf('ch') > -1) {
                                    colWidth = this._parseCharCountToCharWidth(colWidth.substring(0, colWidth.indexOf('ch')));
                                }
                                else {
                                    colWidth = this._parsePixelToCharWidth(colWidth);
                                }
                            }
                            else {
                                colWidth = 8.43;
                            }
                            var colIdxStr = (i + 1).toString();
                            sheetDoc += '<col min="' + colIdxStr + '" max="' + colIdxStr + '"';
                            if (styleIndex >= 0) {
                                sheetDoc += ' style="' + styleIndex.toString() + '"';
                            }
                            if (!!colWidth) {
                                sheetDoc += ' width="' + colWidth + '" customWidth="1"';
                            }
                            if (columnSettings[i].autoWidth !== false) {
                                sheetDoc += ' bestFit="1"';
                            }
                            if (columnSettings[i].visible === false) {
                                sheetDoc += ' hidden="1"';
                            }
                            sheetDoc += '/>'; // <col .../>
                        }
                    }
                    sheetDoc += '</cols>';
                }
                sheetData = sheetDoc + sheetData;
                sheetDoc = sheetData;
                sheetData = null;
                if (merges.length > 0) {
                    sheetDoc += this._generateMergeSetting(merges);
                }
                sheetDoc += '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/></worksheet>';
                //console.log(`sheetDoc.length = ${sheetDoc.length}`);
                //console.log(`WorkSheet xml string created in ${(Date.now() - window['xlsxTime']) / 1000} seconds`);
                //window['xlsxTime'] = Date.now();
                xlWorksheets.file('sheet' + id + '.xml', this._xmlDescription + sheetDoc);
                sheetDoc = null; // free memory
                var contentType = '<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" PartName="/xl/worksheets/sheet' + id + '.xml"/>';
                this._contentTypes.unshift(contentType);
                this._props.unshift(xlsx.Workbook._escapeXML(worksheet.name) || 'Sheet' + id);
                var xlRel = '<Relationship Target="worksheets/sheet' + id + '.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Id="rId' + id + '"/>';
                this._xlRels.unshift(xlRel);
                var sheetEle = '<sheet r:id="rId' + id + '" sheetId="' + id + '" name="' + (xlsx.Workbook._escapeXML(worksheet.name) || 'Sheet' + id) + '"' + (worksheet.visible === false ? ' state="hidden"' : '') + '/>';
                this._worksheets.unshift(sheetEle);
            };
            // Generate shared strings doc.
            _xlsx._generateSharedStringsDoc = function () {
                var ret = '<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="' +
                    this._sharedStrings[1] + '" uniqueCount="' + this._sharedStrings[0].length + '">';
                for (var i = 0; i < this._sharedStrings[0].length; i++) {
                    ret += '<si><t';
                    var val = this._sharedStrings[0][i];
                    if (wijmo.isNullOrWhiteSpace(val) || /^\s+\w*|\w*\s+$/.test(val)) {
                        ret += ' xml:space="preserve"';
                    }
                    ret += '>' + xlsx.Workbook._escapeXML(val) + '</t></si>';
                }
                return ret + '</sst>';
            };
            _xlsx._getColor = function (s, isFillColor) {
                var isThemeColor, theme, index, value;
                if ((s.search(/fgcolor/i) === -1 && isFillColor)
                    || (s.search(/color/i) === -1 && !isFillColor)) {
                    return null;
                }
                s = isFillColor ? s.substring(s.indexOf('<fgColor'), s.indexOf('/>')) : s.substring(s.indexOf('<color'));
                if (s.indexOf('rgb=') !== -1) {
                    value = this._getAttr(s, 'rgb');
                    if (value && value.length === 8) {
                        value = value.substring(2);
                    }
                }
                else if (s.indexOf('indexed') !== -1) {
                    index = +this._getAttr(s, 'indexed');
                    value = this._indexedColors[index] || '';
                }
                else {
                    isThemeColor = true;
                    theme = +this._getAttr(s, 'theme');
                    if (s.indexOf('tint') !== -1) {
                        value = +this._getAttr(s, 'tint');
                    }
                    value = this._getThemeColor(theme, value);
                }
                return value && value[0] === '#' ? value : '#' + value;
            };
            _xlsx._getThemeColor = function (theme, tint) {
                var themeColor = this._colorThemes[theme], color, hslArray;
                if (tint != null) {
                    color = new wijmo.Color('#' + themeColor);
                    hslArray = color.getHsl();
                    // About the tint value and theme color convert to rgb color, 
                    // please refer https://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.color.aspx
                    if (tint < 0) {
                        hslArray[2] = hslArray[2] * (1.0 + tint);
                    }
                    else {
                        hslArray[2] = hslArray[2] * (1.0 - tint) + (1 - 1 * (1.0 - tint));
                    }
                    color = wijmo.Color.fromHsl(hslArray[0], hslArray[1], hslArray[2]);
                    return color.toString().substring(1);
                }
                // if the color value is undefined, we should return the themeColor (TFS 121712)
                return themeColor;
            };
            // Parse the different color pattern to Hex pattern like #RRGGBB for exporting.
            _xlsx._parseColor = function (color) {
                var parsedColor = new wijmo.Color(color);
                // Because excel doesn't support transparency, we have to make the color closer to white to simulate the transparency.
                if (parsedColor.a < 1) {
                    parsedColor = wijmo.Color.toOpaque(parsedColor);
                }
                return parsedColor.toString();
            };
            _xlsx._getsBaseSharedFormulas = function (/*sheet: Document*/ sheet) {
                var formulas = sheet.match(/\<f[^<]*ref[^<]*>[^<]+(?=\<\/f>)/g), formula, sharedIndex, cellRef;
                this._sharedFormulas = [];
                if (formulas && formulas.length > 0) {
                    for (var i = 0; i < formulas.length; i++) {
                        formula = formulas[i];
                        sharedIndex = this._getAttr(formula, 'si');
                        cellRef = this._getAttr(formula, 'ref');
                        cellRef = cellRef ? cellRef.substring(0, cellRef.indexOf(':')) : '';
                        formula = formula.replace(/(\<f.*>)(.+)/, "$2");
                        this._sharedFormulas[+sharedIndex] = this._parseSharedFormulaInfo(cellRef, formula);
                    }
                }
            };
            // Parse the base shared formula to shared formula info that contains the cell reference, formula and the formula cell references of the shared formula.
            _xlsx._parseSharedFormulaInfo = function (cellRef, formula) {
                var formulaRefs = formula.match(/(\'?\w+\'?\!)?(\$?[A-Za-z]+)(\$?\d+)/g), formulaRef, formulaRefCellIndex, sheetRef, cellRefAddress, formulaRefsAddress;
                cellRefAddress = xlsx.Workbook.tableAddress(cellRef);
                if (formulaRefs && formulaRefs.length > 0) {
                    formulaRefsAddress = [];
                    for (var i = 0; i < formulaRefs.length; i++) {
                        formulaRef = formulaRefs[i];
                        formula = formula.replace(formulaRef, '{' + i + '}');
                        formulaRefCellIndex = formulaRef.indexOf('!');
                        if (formulaRefCellIndex > 0) {
                            sheetRef = formulaRef.substring(0, formulaRefCellIndex);
                            formulaRef = formulaRef.substring(formulaRefCellIndex + 1);
                        }
                        formulaRefsAddress[i] = {
                            cellAddress: xlsx.Workbook.tableAddress(formulaRef),
                            sheetRef: sheetRef
                        };
                    }
                }
                return {
                    cellRef: cellRefAddress,
                    formula: formula,
                    formulaRefs: formulaRefsAddress
                };
            };
            // Gets the shared formula via the si and cell reference.
            _xlsx._getSharedFormula = function (si, cellRef) {
                var sharedFormulaInfo, cellAddress, rowDiff, colDiff, rowIndex, colIndex, srcRow, srcCol, formula, formulaRefs, formulaRef, formulaCell;
                if (this._sharedFormulas && this._sharedFormulas.length > 0) {
                    sharedFormulaInfo = this._sharedFormulas[+si];
                    if (sharedFormulaInfo) {
                        formula = sharedFormulaInfo.formula;
                        formulaRefs = sharedFormulaInfo.formulaRefs;
                        if (formulaRefs && formulaRefs.length > 0) {
                            cellAddress = xlsx.Workbook.tableAddress(cellRef);
                            srcRow = sharedFormulaInfo.cellRef ? sharedFormulaInfo.cellRef.row : 0;
                            srcCol = sharedFormulaInfo.cellRef ? sharedFormulaInfo.cellRef.col : 0;
                            rowDiff = cellAddress.row - srcRow;
                            colDiff = cellAddress.col - srcCol;
                            for (var i = 0; i < formulaRefs.length; i++) {
                                formulaRef = formulaRefs[i];
                                rowIndex = formulaRef.cellAddress.row + (formulaRef.cellAddress.absRow ? 0 : rowDiff);
                                colIndex = formulaRef.cellAddress.col + (formulaRef.cellAddress.absCol ? 0 : colDiff);
                                formulaCell = xlsx.Workbook.xlsxAddress(rowIndex, colIndex, formulaRef.cellAddress.absRow, formulaRef.cellAddress.absCol);
                                if (formulaRef.sheetRef != null && formulaRef.sheetRef !== '') {
                                    formulaCell = formulaRef.sheetRef + '!' + formulaCell;
                                }
                                formula = formula.replace('{' + i + '}', formulaCell);
                            }
                        }
                        return formula;
                    }
                }
                return '';
            };
            // Convert excel UTC date to JS date.
            _xlsx._convertDate = function (input) {
                var d = new Date(1900, 0, 0), isDateObject = Object.prototype.toString.call(input) === "[object Date]", offset = ((isDateObject ? input.getTimezoneOffset() : (new Date()).getTimezoneOffset()) - d.getTimezoneOffset()) * 60000, dateOffset, inputDate;
                if (isDateObject) {
                    return ((input.getTime() - d.getTime() - offset) / 86400000) + 1;
                }
                else if (wijmo.isNumber(input)) {
                    dateOffset = input > 59 ? 1 : 0;
                    inputDate = new Date(Math.round((+d + (input - dateOffset) * 86400000) / 1000) * 1000);
                    offset = (inputDate.getTimezoneOffset() - d.getTimezoneOffset()) * 60000;
                    if (offset !== 0) {
                        return new Date(Math.round((+d + offset + (input - dateOffset) * 86400000) / 1000) * 1000);
                    }
                    return inputDate;
                }
                else {
                    return null;
                }
            };
            // Parse border setting for exporting.
            _xlsx._parseBorder = function (border) {
                for (var edge in { left: 0, right: 0, top: 0, bottom: 0, diagonal: 0 }) {
                    var egdeBorder = border[edge];
                    if (egdeBorder) {
                        if (egdeBorder.color) {
                            egdeBorder.color = this._parseColor(egdeBorder.color);
                        }
                        if (egdeBorder.style != null && !wijmo.isString(egdeBorder.style)) {
                            egdeBorder.style = xlsx.Workbook._parseBorderTypeToString(wijmo.asEnum(egdeBorder.style, xlsx.BorderStyle, false));
                        }
                    }
                }
            };
            // Parse inheritance style
            _xlsx._resolveStyleInheritance = function (style) {
                var resolvedStyle;
                // no inheritance? save some time
                if (!style.basedOn) {
                    return style;
                }
                // resolve inheritance
                for (var key in style.basedOn) {
                    if (key === 'basedOn') {
                        resolvedStyle = this._resolveStyleInheritance(style.basedOn);
                        for (key in resolvedStyle) {
                            var val = resolvedStyle[key];
                            style[key] = style[key] == null ? val : this._extend(style[key], val);
                        }
                    }
                    else {
                        var val = style.basedOn[key];
                        style[key] = style[key] == null ? val : this._extend(style[key], val);
                    }
                }
                delete style.basedOn;
                // return resolved style
                return style;
            };
            // Parse the pixel width to character width for exporting
            _xlsx._parsePixelToCharWidth = function (pixels) {
                if (pixels == null || isNaN(+pixels)) {
                    return null;
                }
                // The calculation is =Truncate(({pixels}-5)/{Maximum Digit Width} * 100+0.5)/100
                // Please refer https://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.column(v=office.14).aspx
                return ((+pixels - 5) / 7 * 100 + 0.5) / 100;
            };
            // Parse the character width to pixel width for importing
            _xlsx._parseCharWidthToPixel = function (charWidth) {
                if (charWidth == null || isNaN(+charWidth)) {
                    return null;
                }
                // The calculation is =Truncate(((256 * {width} + Truncate(128/{Maximum Digit Width}))/256)*{Maximum Digit Width})
                // Please refer https://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.column(v=office.14).aspx
                return ((256 * (+charWidth) + (128 / 7)) / 256) * 7;
            };
            // Parse the chart count to char width
            _xlsx._parseCharCountToCharWidth = function (charCnt) {
                if (charCnt == null || isNaN(+charCnt)) {
                    return null;
                }
                // The calculation is =Truncate([{Number of Characters} * {Maximum Digit Width} + {5 pixel padding}]/{Maximum Digit Width}*256)/256
                // Please refer https://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.column(v=office.14).aspx
                return (((+charCnt) * 7 + 5) / 7 * 256) / 256;
            };
            _xlsx._numAlpha = function (i) {
                var t = Math.floor(i / 26) - 1;
                return (t > -1 ? this._numAlpha(t) : '') + this._alphabet.charAt(i % 26);
            };
            _xlsx._alphaNum = function (s) {
                var t = 0;
                if (s.length === 2) {
                    t = this._alphaNum(s.charAt(0)) + 1;
                }
                return t * 26 + this._alphabet.indexOf(s.substr(-1));
            };
            _xlsx._typeOf = function (obj) {
                return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
            // extends the source hash to destination hash
            _xlsx._extend = function (dst, src) {
                if (wijmo.isObject(dst) && wijmo.isObject(src)) {
                    for (var key in src) {
                        var value = src[key];
                        if (wijmo.isObject(value) && dst[key] != null) {
                            this._extend(dst[key], value); // extend sub-objects
                        }
                        else if (value != null && dst[key] == null) {
                            dst[key] = value; // assign values
                        }
                    }
                    return dst;
                }
                else {
                    return src;
                }
            };
            _xlsx._isEmpty = function (obj) {
                // Speed up calls to hasOwnProperty
                var hasOwnProperty = Object.prototype.hasOwnProperty;
                // null and undefined are "empty"
                if (obj == null) {
                    return true;
                }
                // Assume if it has a length property with a non-zero value
                // that that property is correct.
                if (obj.length > 0) {
                    return false;
                }
                if (obj.length === 0) {
                    return true;
                }
                // Otherwise, does it have any properties of its own?
                // Note that this doesn't handle
                // toString and valueOf enumeration bugs in IE < 9
                for (var key in obj) {
                    if (hasOwnProperty.call(obj, key)) {
                        return false;
                    }
                }
                return true;
            };
            // _clone the object.
            _xlsx._cloneStyle = function (src) {
                var clone;
                // Handle the 3 simple types, and null or undefined
                if (null == src || "object" !== typeof src) {
                    return src;
                }
                // Handle Object
                clone = {};
                for (var attr in src) {
                    if (src.hasOwnProperty(attr)) {
                        clone[attr] = this._cloneStyle(src[attr]);
                    }
                }
                return clone;
            };
            // Clone the styles of columns.
            _xlsx._cloneColumnsStyle = function (columns) {
                var cloneStyles = [], column;
                for (var i = 0; i < columns.length; i++) {
                    column = columns[i];
                    if (column && column.style) {
                        cloneStyles[i] = this._cloneStyle(column.style);
                    }
                }
                return cloneStyles;
            };
            // Get the index of the sheet.
            _xlsx._getSheetIndex = function (fileName) {
                var index = -1;
                fileName = fileName.substring(0, fileName.lastIndexOf('.xml'));
                index = +fileName.substring(fileName.lastIndexOf('sheet') + 5);
                return index;
            };
            // Check whether the merge cell is valid.
            _xlsx._checkValidMergeCell = function (merges, startRow, rowSpan, startCol, colSpan) {
                for (var i = 0; i < merges.length; i++) {
                    var mergeEle = merges[i];
                    var topRow = +mergeEle[0].match(/\d*/g).join('') - 1;
                    var leftCol = this._alphaNum(mergeEle[0].match(/[a-zA-Z]*/g)[0]);
                    var bottomRow = +mergeEle[1].match(/\d*/g).join('') - 1;
                    var rightCol = this._alphaNum(mergeEle[1].match(/[a-zA-Z]*/g)[0]);
                    if (!(startRow > bottomRow || (startRow + rowSpan - 1) < topRow) && !(startCol > rightCol || (startCol + colSpan - 1) < leftCol)) {
                        return false;
                    }
                }
                return true;
            };
            _xlsx._getAttr = function (s, attr) {
                var attrIndex = s.indexOf(attr + '="');
                if (attrIndex >= 0) {
                    s = s.substr(attrIndex + attr.length + 2);
                    return s.substring(0, s.indexOf('"'));
                }
                return '';
            };
            // GrapeCity Begin: Add the function to get the value of child node 
            _xlsx._getChildNodeValue = function (s, child) {
                var childIndex = s.indexOf(child + ' val="');
                if (childIndex >= 0) {
                    s = s.substr(childIndex + child.length + 6);
                    return s.substring(0, s.indexOf('"'));
                }
                return '';
            };
            return _xlsx;
        }());
        _xlsx._alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // The mapping for the indexed colors please refer
        // https://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.indexedcolors(v=office.14).aspx
        _xlsx._indexedColors = ['000000', 'FFFFFF', 'FF0000', '00FF00', '0000FF', 'FFFF00', 'FF00FF', '00FFFF',
            '000000', 'FFFFFF', 'FF0000', '00FF00', '0000FF', 'FFFF00', 'FF00FF', '00FFFF',
            '800000', '008000', '000080', '808000', '800080', '008080', 'C0C0C0', '808080',
            '9999FF', '993366', 'FFFFCC', 'CCFFFF', '660066', 'FF8080', '0066CC', 'CCCCFF',
            '000080', 'FF00FF', 'FFFF00', '00FFFF', '800080', '800000', '008080', '0000FF',
            '00CCFF', 'CCFFFF', 'CCFFCC', 'FFFF99', '99CCFF', 'FF99CC', 'CC99FF', 'FFCC99',
            '3366FF', '33CCCC', '99CC00', 'FFCC00', 'FF9900', 'FF6600', '666699', '969696',
            '003366', '339966', '003300', '333300', '993300', '993366', '333399', '333333',
            '000000', 'FFFFFF'];
        _xlsx._numFmts = ['General', '0', '0.00', '#,##0', '#,##0.00', , , '$#,##0.00_);($#,##0.00)', , '0%', '0.00%', '0.00E+00', '# ?/?', '# ??/??', 'm/d/yyyy', 'd-mmm-yy', 'd-mmm', 'mmm-yy', 'h:mm AM/PM', 'h:mm:ss AM/PM',
            'h:mm', 'h:mm:ss', 'm/d/yy h:mm', , , , , , , , , , , , , , , '#,##0 ;(#,##0)', '#,##0 ;[Red](#,##0)', '#,##0.00;(#,##0.00)', '#,##0.00;[Red](#,##0.00)', , , , , 'mm:ss', '[h]:mm:ss', 'mmss.0', '##0.0E+0', '@'];
        _xlsx._xmlDescription = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
        _xlsx._workbookNS = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
        _xlsx._relationshipsNS = 'http://schemas.openxmlformats.org/package/2006/relationships';
        _xlsx._defaultFontName = 'Calibri';
        _xlsx._defaultFontSize = 11;
        _xlsx._macroEnabled = false;
        xlsx._xlsx = _xlsx;
        var _Promise = (function () {
            function _Promise() {
                this._callbacks = [];
            }
            _Promise.prototype.then = function (onFulfilled, onRejected) {
                this._callbacks.push({ onFulfilled: onFulfilled, onRejected: onRejected });
                return this;
            };
            _Promise.prototype.catch = function (onRejected) {
                return this.then(null, onRejected);
            };
            _Promise.prototype.resolve = function (value) {
                var _this = this;
                setTimeout(function () {
                    try {
                        _this._onFulfilled(value);
                    }
                    catch (e) {
                        _this._onRejected(e);
                    }
                }, 0);
            };
            _Promise.prototype.reject = function (reason) {
                var _this = this;
                setTimeout(function () {
                    _this._onRejected(reason);
                }, 0);
            };
            _Promise.prototype._onFulfilled = function (value) {
                var callback;
                while (callback = this._callbacks.shift()) {
                    if (callback.onFulfilled) {
                        var newValue = callback.onFulfilled(value);
                        if (newValue !== undefined) {
                            value = newValue;
                        }
                    }
                }
            };
            _Promise.prototype._onRejected = function (reason) {
                var callback;
                while (callback = this._callbacks.shift()) {
                    if (callback.onRejected) {
                        var value = callback.onRejected(reason);
                        this._onFulfilled(value);
                        return;
                    }
                }
                throw reason;
            };
            return _Promise;
        }());
        xlsx._Promise = _Promise;
        var _CompositedPromise = (function (_super) {
            __extends(_CompositedPromise, _super);
            function _CompositedPromise(promises) {
                var _this = _super.call(this) || this;
                _this._promises = promises;
                _this._init();
                return _this;
            }
            _CompositedPromise.prototype._init = function () {
                var _this = this;
                if (!this._promises || !this._promises.length) {
                    this.reject('No promises in current composited promise.');
                    return;
                }
                var length = this._promises.length, i = 0, values = [], isRejected = false;
                this._promises.some(function (p) {
                    p.then(function (v) {
                        if (isRejected) {
                            return;
                        }
                        values.push(v);
                        if (++i >= length) {
                            _this.resolve(values);
                        }
                    }).catch(function (r) {
                        isRejected = true;
                        _this.reject(r);
                    });
                    return isRejected;
                });
            };
            return _CompositedPromise;
        }(_Promise));
        xlsx._CompositedPromise = _CompositedPromise;
    })(xlsx = wijmo.xlsx || (wijmo.xlsx = {}));
})(wijmo || (wijmo = {}));

/**
 * The module has a dependency on the <a href="https://stuk.github.io/jszip" target="_blank">JSZip</a>
 * library which can be referenced as follows:
 * <ul>
 * <li>In order to invoke the synchronous save and load methods, JSZip2 library should be
 * referenced in html page with the markup like this:
 * <pre>&lt;script src="http://cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"&gt;&lt;/script&gt;</pre></li>
 * <li>In order to invoke the asynchronous save and load methods, JSZip3 library should be
 * referenced in html page with the markup like this:
 * <pre>&lt;script src="http://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"&gt;&lt;/script&gt;</pre></li></ul>
*/
var wijmo;
(function (wijmo) {
    var xlsx;
    (function (xlsx) {
        'use strict';
        /**
         * Represents an Excel workbook.
         */
        var Workbook = (function () {
            /**
             * Initializes a new instance of the @see:Workbook class.
             */
            function Workbook() {
            }
            Object.defineProperty(Workbook.prototype, "sheets", {
                /**
                 * Gets the WorkSheet array of the workbook.
                 */
                get: function () {
                    if (this._sheets == null) {
                        this._sheets = [];
                    }
                    return this._sheets;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Workbook.prototype, "styles", {
                /**
                 * Gets the styles table of the workbook.
                 */
                get: function () {
                    if (this._styles == null) {
                        this._styles = [];
                    }
                    return this._styles;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Workbook.prototype, "reservedContent", {
                /**
                 * Gets or sets the reserved content from xlsx file that flexgrid or flexsheet doesn't support yet.
                 */
                get: function () {
                    if (this._reservedContent == null) {
                        this._reservedContent = {};
                    }
                    return this._reservedContent;
                },
                set: function (value) {
                    this._reservedContent = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Saves the book to a file and returns a base-64 string representation of
             * the book.
             * This method works with JSZip 2.5.
             *
             * For example, this sample creates an xlsx file with a single cell:
             *
             * <pre>function exportXlsx(fileName) {
             *     var book = new wijmo.xlsx.Workbook(),
             *         sheet = new wijmo.xlsx.WorkSheet(),
             *         bookRow = new wijmo.xlsx.WorkbookRow(),
             *         bookCell = new wijmo.xlsx.WorkbookCell();
             *     bookCell.value = 'Hello, Excel!';
             *     bookRow.cells.push(bookCell);
             *     sheet.rows.push(bookRow);
             *     book.sheets.push(sheet);
             *     book.save(fileName);
             * }</pre>
             *
             * The file name is optional. If not provided, the method still returns
             * a base-64 string representing the book. This string can be used for
             * further processing on the client or on the server.
             *
             * @param fileName Name of the xlsx file to save.
             * @return A base-64 string that represents the content of the file.
             */
            Workbook.prototype.save = function (fileName) {
                var result = xlsx._xlsx.save(this);
                if (fileName) {
                    //console.log(`Zip string created in ${(Date.now() - window['xlsxTime']) / 1000} seconds`);
                    //window['xlsxTime'] = Date.now();
                    this._saveToFile(result.base64, fileName);
                }
                return result.base64;
            };
            /**
             * Saves the book to a file asynchronously.
             * This method works with JSZip 3.0.
             *
             * @param fileName Name of the xlsx file to save.
             * @param onSaved This callback provides an approach to get the base-64 string
             * that represents the content of the saved workbook. Since this method is an
             * asynchronous method, user does not get the base-64 string immediately.
             * User has to get the base-64 string via this callback.
             * This has a single parameter, the base-64 string of the saved workbook.
             * It will be passed to user.
             * @param onError This callback catches error information when saving.
             * This has a single parameter, the failure reason.
             * Return value will be passed to user, if he wants to catch the save failure reason.
             *
             * For example:
             * <pre>
             * workbook.saveAsync('', function (base64){
             *      // User can access the base64 string in this callback.
             *      document.getElementByID('export').href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' + 'base64,' + base64;
             * }, function (reason){
             *      // User can catch the failure reason in this callback.
             *      console.log('The reason of save failure is ' + reason);
             * });
             * </pre>
             */
            Workbook.prototype.saveAsync = function (fileName, onSaved, onError) {
                var self = this, result = xlsx._xlsx.saveAsync(self, onError);
                if (fileName) {
                    //console.log('Waiting for zip to save file');
                    result.then(function (value) {
                        //console.log(`Zip string created in ${(Date.now() - window['xlsxTime']) / 1000} seconds`);
                        //window['xlsxTime'] = Date.now();
                        self._saveToFile(value, fileName);
                        if (onSaved) {
                            onSaved(value);
                        }
                    });
                }
            };
            /**
             * Loads from base-64 string or data url.
             * This method works with JSZip 2.5.
             *
             * For example:
             * <pre>// This sample opens an xlsx file chosen from Open File
             * // dialog and creates a workbook instance to load the file.
             * &nbsp;
             * // HTML
             * &lt;input type="file"
             *     id="importFile"
             *     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
             * /&gt;
             * &nbsp;
             * // JavaScript
             * var workbook, // receives imported IWorkbook
             *     importFile = document.getElementById('importFile');
             * &nbsp;
             * importFile.addEventListener('change', function () {
             *     loadWorkbook();
             * });
             * &nbsp;
             * function loadWorkbook() {
             *     var reader,
             *         workbook,
             *         file = importFile.files[0];
             *     if (file) {
             *         reader = new FileReader();
             *         reader.onload = function (e) {
             *            workbook = new wijmo.xlsx.Workbook(),
             *            workbook.load(reader.result);
             *         };
             *         reader.readAsDataURL(file);
             *     }
             * }</pre>
             *
             * @param base64 The base-64 string that contains the xlsx file content.
             */
            Workbook.prototype.load = function (base64) {
                //var begin = Date.now();
                var workbookOM = xlsx._xlsx.load(this._getBase64String(base64));
                //console.log(`Workbook loaded in ${(Date.now() - begin) / 1000} seconds`);
                this._deserialize(workbookOM);
                workbookOM = null;
            };
            /**
             * Loads from base-64 string or data url asynchronously.
             * This method works with JSZip 3.0.
             *
             * @param base64 base64 string that contains the xlsx file content.
             * @param onLoaded This callback provides an approach to get an instance of the loaded workbook.
             * Since this method is an asynchronous method, user is not able to get instance of
             * the loaded workbook immediately. User has to get the instance through this callback.
             * This has a single parameter, instance of the loaded workbook. It will be passed to user.
             * @param onError This callback catches error information when loading.
             * This has a single parameter, the failure reason. Return value is
             * be passed to user, if he wants to catch the load failure reason.
             *
             * For example:
             * <pre>
             * workbook.loadAsync(base64, function (workbook) {
             *      // User can access the loaded workbook instance in this callback.
             *      var app = worksheet.application ;
             *      ...
             * }, function (reason) {
             *      // User can catch the failure reason in this callback.
             *      console.log('The reason of load failure is ' + reason);
             * });
             * </pre>
             */
            Workbook.prototype.loadAsync = function (base64, onLoaded, onError) {
                var self = this;
                //var begin = Date.now();
                xlsx._xlsx.loadAsync(self._getBase64String(base64)).then(function (result) {
                    //console.log(`Workbook loaded in ${(Date.now() - begin) / 1000} seconds`);
                    self._deserialize(result);
                    result = null;
                    onLoaded(self);
                }).catch(onError);
            };
            // Serializes the workbook instance to workbook object model. 
            Workbook.prototype._serialize = function () {
                var workbookOM = { sheets: [] };
                workbookOM.sheets = this._serializeWorkSheets();
                if (this._styles && this._styles.length > 0) {
                    workbookOM.styles = this._serializeWorkbookStyles();
                }
                if (this._reservedContent) {
                    workbookOM.reservedContent = this._reservedContent;
                }
                if (this.activeWorksheet != null && !isNaN(this.activeWorksheet) && this.activeWorksheet >= 0) {
                    workbookOM.activeWorksheet = this.activeWorksheet;
                }
                if (this.application) {
                    workbookOM.application = this.application;
                }
                if (this.company) {
                    workbookOM.company = this.company;
                }
                if (this.created != null) {
                    workbookOM.created = this.created;
                }
                if (this.creator) {
                    workbookOM.creator = this.creator;
                }
                if (this.lastModifiedBy) {
                    workbookOM.lastModifiedBy = this.lastModifiedBy;
                }
                if (this.modified != null) {
                    workbookOM.modified = this.modified;
                }
                return workbookOM;
            };
            // Deserializes the workbook object model to workbook instance.
            Workbook.prototype._deserialize = function (workbookOM) {
                this._deserializeWorkSheets(workbookOM.sheets);
                if (workbookOM.styles && workbookOM.styles.length > 0) {
                    this._deserializeWorkbookStyles(workbookOM.styles);
                }
                this.activeWorksheet = workbookOM.activeWorksheet;
                this.application = workbookOM.application;
                this.company = workbookOM.company;
                this.created = workbookOM.created;
                this.creator = workbookOM.creator;
                this.lastModifiedBy = workbookOM.lastModifiedBy;
                this.modified = workbookOM.modified;
                this.reservedContent = workbookOM.reservedContent;
            };
            // add worksheet instance into the _sheets array of the workbook.
            Workbook.prototype._addWorkSheet = function (workSheet, sheetIndex) {
                if (this._sheets == null) {
                    this._sheets = [];
                }
                if (sheetIndex != null && !isNaN(sheetIndex)) {
                    this._sheets[sheetIndex] = workSheet;
                }
                else {
                    this._sheets.push(workSheet);
                }
            };
            // Save the blob object generated by the workbook instance to xlsx file.
            Workbook.prototype._saveToFile = function (base64, fileName) {
                var document = window.document; // AlexI
                var suffix, suffixIndex, nameSuffix = this._reservedContent && this._reservedContent.macros ? 'xlsm' : 'xlsx', applicationType = nameSuffix === 'xlsm' ? 'application/vnd.ms-excel.sheet.macroEnabled.12' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', blob, reader, link, click;
                suffixIndex = fileName.lastIndexOf('.');
                if (suffixIndex < 0) {
                    fileName += '.' + nameSuffix;
                }
                else if (suffixIndex === 0) {
                    throw 'Invalid file name.';
                }
                else {
                    suffix = fileName.substring(suffixIndex + 1);
                    if (suffix === '') {
                        fileName += '.' + nameSuffix;
                    }
                    else if (suffix !== nameSuffix) {
                        fileName += '.' + nameSuffix;
                    }
                }
                blob = new Blob([Workbook._base64DecToArr(base64)], { type: applicationType });
                //console.log(`Blob created in ${(Date.now() - window['xlsxTime']) / 1000} seconds`);
                //window['xlsxTime'] = Date.now();
                if (navigator.msSaveBlob) {
                    // Saving the xlsx file using Blob and msSaveBlob in IE.
                    navigator.msSaveBlob(blob, fileName);
                    //console.log(`File saved (msSaveBlob) in ${(Date.now() - window['xlsxTime']) / 1000} seconds`);
                    //window['xlsxTime'] = Date.now();
                }
                else if (URL.createObjectURL) {
                    link = document.createElement('a');
                    click = function (element) {
                        var evnt = document.createEvent('MouseEvents');
                        evnt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        element.dispatchEvent(evnt);
                    };
                    link.download = fileName;
                    link.href = URL.createObjectURL(blob);
                    click(link);
                    link = null;
                    //console.log(`File saved (createObjectURL) in ${(Date.now() - window['xlsxTime']) / 1000} seconds`);
                    //window['xlsxTime'] = Date.now();
                }
                else {
                    reader = new FileReader();
                    link = document.createElement('a');
                    click = function (element) {
                        var evnt = document.createEvent('MouseEvents');
                        evnt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        element.dispatchEvent(evnt);
                    };
                    reader.onload = function () {
                        link.download = fileName;
                        link.href = reader.result;
                        click(link);
                        link = null;
                    };
                    reader.readAsDataURL(blob);
                }
            };
            // Get base64 string.
            Workbook.prototype._getBase64String = function (base64) {
                var dataPrefixIndex;
                if (base64 == null || base64.length === 0) {
                    throw 'Invalid xlsx file content.';
                }
                dataPrefixIndex = base64.search(/base64,/i);
                if (dataPrefixIndex !== -1) {
                    base64 = base64.substring(dataPrefixIndex + 7);
                }
                return base64;
            };
            /**
             * Converts the wijmo date format to Excel format.
             *
             * @param format The wijmo date format.
             * @return Excel format representation.
             */
            Workbook.toXlsxDateFormat = function (format) {
                var xlsxFormat;
                if (format.length === 1) {
                    switch (format) {
                        case 'r':
                        case 'R':
                            return 'ddd, dd MMM yyyy HH:mm:ss &quot;GMT&quot;';
                        case 'u':
                            return 'yyyy-MM-dd&quot;T&quot;HH:mm:ss&quot;Z&quot;';
                        case 'o':
                        case 'O':
                            xlsxFormat = wijmo.culture.Globalize.calendar.patterns[format];
                            xlsxFormat = xlsxFormat.replace(/f+k/gi, '000');
                            break;
                        default:
                            xlsxFormat = wijmo.culture.Globalize.calendar.patterns[format];
                            break;
                    }
                }
                if (!xlsxFormat) {
                    xlsxFormat = format;
                }
                xlsxFormat = xlsxFormat.replace(/"/g, '')
                    .replace(/tt/, 'AM/PM')
                    .replace(/t/, 'A/P')
                    .replace(/M+/gi, function (str) {
                    return str.toLowerCase();
                }).replace(/g+y+/gi, function (str) {
                    return str.substring(0, str.indexOf('y')) + 'e';
                });
                if (/FY|Q/i.test(xlsxFormat)) {
                    return 'General';
                }
                return xlsxFormat;
            };
            /**
             * Converts the wijmo number format to xlsx format.
             *
             * @param format The wijmo number format.
             * @return Excel format representation.
             */
            Workbook.toXlsxNumberFormat = function (format) {
                var dec = -1, wijmoFormat = format ? format.toLowerCase() : '', fisrtFormatChar = wijmoFormat[0], mapFormat = this._formatMap[fisrtFormatChar], currencySymbol = wijmo.culture.Globalize.numberFormat.currency.symbol, commaArray = wijmoFormat.split(','), decimalArray = [], xlsxFormat, i;
                if (mapFormat) {
                    if (fisrtFormatChar === 'c') {
                        mapFormat = mapFormat.replace(/\{1\}/g, currencySymbol);
                    }
                    if (wijmoFormat.length > 1) {
                        dec = parseInt(commaArray[0].substr(1));
                    }
                    else {
                        dec = 2;
                    }
                    if (!isNaN(dec)) {
                        for (i = 0; i < dec; i++) {
                            decimalArray.push(0);
                        }
                    }
                    for (i = 0; i < commaArray.length - 1; i++) {
                        decimalArray.push(',');
                    }
                    if (decimalArray.length > 0) {
                        if (fisrtFormatChar === 'd') {
                            xlsxFormat = mapFormat.replace(/\{0\}/g, decimalArray.join(''));
                        }
                        else {
                            xlsxFormat = mapFormat.replace(/\{0\}/g, (!isNaN(dec) && dec > 0 ? '.' : '') + decimalArray.join(''));
                        }
                    }
                    else {
                        if (fisrtFormatChar === 'd') {
                            xlsxFormat = mapFormat.replace(/\{0\}/g, '0');
                        }
                        else {
                            xlsxFormat = mapFormat.replace(/\{0\}/g, '');
                        }
                    }
                }
                else {
                    xlsxFormat = wijmoFormat;
                }
                return xlsxFormat;
            };
            /**
             * Converts the xlsx multi-section format string to an array of corresponding wijmo formats.
             *
             * @param xlsxFormat The Excel format string, that may contain multiple format sections
             * separated by a semicolon.
             * @return An array of .Net format strings where each element corresponds to a separate
             * Excel format section.
             * The returning array always contains at least one element. It can be an empty string
             * in case the passed Excel format is empty.
             */
            Workbook.fromXlsxFormat = function (xlsxFormat) {
                var wijmoFormats = [], wijmoFormat, formats, currentFormat, i, j, lastDotIndex, lastZeroIndex, lastCommaIndex, commaArray, currencySymbol = wijmo.culture.Globalize.numberFormat.currency.symbol;
                if (!xlsxFormat || xlsxFormat === 'General') {
                    return [''];
                }
                xlsxFormat = xlsxFormat.replace(/;@/g, '')
                    .replace(/&quot;?/g, '');
                formats = xlsxFormat.split(';');
                for (i = 0; i < formats.length; i++) {
                    currentFormat = formats[i];
                    if (/[hsmy\:]/i.test(currentFormat)) {
                        wijmoFormat = currentFormat.replace(/\[\$\-.+\]/g, '')
                            .replace(/(\\)(.)/g, '$2')
                            .replace(/H+/g, function (str) {
                            return str.toLowerCase();
                        }).replace(/m+/g, function (str) {
                            return str.toUpperCase();
                        }).replace(/S+/g, function (str) {
                            return str.toLowerCase();
                        }).replace(/AM\/PM/gi, 'tt')
                            .replace(/A\/P/gi, 't')
                            .replace(/\.000/g, '.fff')
                            .replace(/\.00/g, '.ff')
                            .replace(/\.0/g, '.f')
                            .replace(/\\[\-\s,]/g, function (str) {
                            return str.substring(1);
                        }).replace(/Y+/g, function (str) {
                            return str.toLowerCase();
                        }).replace(/D+/g, function (str) {
                            return str.toLowerCase();
                        }).replace(/M+:?|:?M+/gi, function (str) {
                            if (str.indexOf(':') > -1) {
                                return str.toLowerCase();
                            }
                            else {
                                return str;
                            }
                        }).replace(/g+e/gi, function (str) {
                            return str.substring(0, str.length - 1) + 'yy';
                        });
                    }
                    else {
                        lastDotIndex = currentFormat.lastIndexOf('.');
                        lastZeroIndex = currentFormat.lastIndexOf('0');
                        lastCommaIndex = currentFormat.lastIndexOf(',');
                        if (currentFormat.search(/\[\$([^\-\]]+)[^\]]*\]/) > -1 ||
                            (currentFormat.indexOf(currencySymbol) > -1 && currentFormat.search(/\[\$([\-\]]+)[^\]]*\]/) === -1)) {
                            wijmoFormat = 'c';
                        }
                        else if (currentFormat[xlsxFormat.length - 1] === '%') {
                            wijmoFormat = 'p';
                        }
                        else {
                            wijmoFormat = 'n';
                        }
                        if (lastDotIndex > -1 && lastDotIndex < lastZeroIndex) {
                            wijmoFormat += currentFormat.substring(lastDotIndex, lastZeroIndex).length;
                        }
                        else {
                            wijmoFormat += '0';
                        }
                        if (/^0+,*$/.test(currentFormat)) {
                            lastZeroIndex = currentFormat.lastIndexOf('0');
                            wijmoFormat = 'd' + (lastZeroIndex + 1);
                        }
                        if (lastCommaIndex > -1 && lastZeroIndex > -1 && lastZeroIndex < lastCommaIndex) {
                            commaArray = currentFormat.substring(lastZeroIndex + 1, lastCommaIndex + 1).split('');
                            for (j = 0; j < commaArray.length; j++) {
                                wijmoFormat += ',';
                            }
                        }
                    }
                    wijmoFormats.push(wijmoFormat);
                }
                return wijmoFormats;
            };
            // Parse the cell format of flex grid to excel format.
            Workbook._parseCellFormat = function (format, isDate) {
                if (isDate) {
                    return this.toXlsxDateFormat(format);
                }
                return this.toXlsxNumberFormat(format);
            };
            // parse the basic excel format to js format
            Workbook._parseExcelFormat = function (item) {
                if (item === undefined || item === null
                    || item.value === undefined || item.value === null
                    || isNaN(item.value)) {
                    return undefined;
                }
                var formatCode = item.style && item.style.format ? item.style.format : '', format = '';
                if (item.isDate || wijmo.isDate(item.value)) {
                    format = this.fromXlsxFormat(formatCode)[0];
                }
                else {
                    if (wijmo.isNumber(item.value) && (!formatCode || formatCode === 'General')) {
                        format = wijmo.isInt(item.value) ? 'd' : 'f2';
                    }
                    else if (wijmo.isNumber(item.value) || item.value === '') {
                        format = this.fromXlsxFormat(formatCode)[0];
                    }
                    else {
                        format = formatCode;
                    }
                }
                return format;
            };
            /**
             * Converts zero-based cell, row or column index to Excel alphanumeric representation.
             *
             * @param row The zero-based row index or a null value if only column index
             * is to be converted.
             * @param col The zero-based column index or a null value if only row index
             * is to be converted.
             * @param absolute True value indicates that absolute indices is to be returned
             * for both, row and column (like $D$7). The <b>absoluteCol</b> parameter allows
             * to redefine this value for the column index.
             * @param absoluteCol True value indicates that column index is absolute.
             * @return The alphanumeric Excel index representation.
            */
            Workbook.xlsxAddress = function (row, col, absolute, absoluteCol) {
                var absRow = absolute ? '$' : '', absCol = absoluteCol == null ? absRow : (absoluteCol ? '$' : '');
                return (isNaN(col) ? '' : absCol + this._numAlpha(col)) + (isNaN(row) ? '' : absRow + (row + 1).toString());
            };
            /**
             * Convert Excel's alphanumeric cell, row or column index to the zero-based
             * row/column indices pair.
             *
             * @param xlsxIndex The alphanumeric Excel index that may include alphabetic A-based
             * column index and/or numeric 1-based row index, like "D15", "D" or "15". The
             * alphabetic column index can be in lower or upper case.
             * @return The object with <b>row</b> and <b>col</b> properties containing zero-based
             * row and/or column indices.
             * If row or column component is not specified in the alphanumeric index, then
             * corresponding returning property is undefined.
             */
            Workbook.tableAddress = function (xlsxIndex) {
                var patt = /^((\$?)([A-Za-z]+))?((\$?)(\d+))?$/, m = xlsxIndex && patt.exec(xlsxIndex), ret = {};
                if (!m) {
                    return null;
                }
                if (m[3]) {
                    ret.col = this._alphaNum(m[3]);
                    ret.absCol = !!m[2];
                }
                if (m[6]) {
                    ret.row = +m[6] - 1;
                    ret.absRow = !!m[5];
                }
                return ret;
            };
            // Parse the horizontal alignment enum to string.
            Workbook._parseHAlignToString = function (hAlign) {
                switch (hAlign) {
                    case HAlign.Left:
                        return 'left';
                    case HAlign.Center:
                        return 'center';
                    case HAlign.Right:
                        return 'right';
                    default:
                        return null;
                }
            };
            // Parse the horizontal alignment string to enum.
            Workbook._parseStringToHAlign = function (hAlign) {
                var strAlign = hAlign ? hAlign.toLowerCase() : '';
                if (strAlign === 'left') {
                    return HAlign.Left;
                }
                if (strAlign === 'center') {
                    return HAlign.Center;
                }
                if (strAlign === 'right') {
                    return HAlign.Right;
                }
                return null;
            };
            // Parse the vartical alignment enum to string.
            Workbook._parseVAlignToString = function (vAlign) {
                switch (vAlign) {
                    case VAlign.Bottom:
                        return 'bottom';
                    case VAlign.Center:
                        return 'center';
                    case VAlign.Top:
                        return 'top';
                    default:
                        return null;
                }
            };
            // Parse the vartical alignment string to enum.
            Workbook._parseStringToVAlign = function (vAlign) {
                var strAlign = vAlign ? vAlign.toLowerCase() : '';
                if (strAlign === 'top') {
                    return VAlign.Top;
                }
                if (strAlign === 'center') {
                    return VAlign.Center;
                }
                if (strAlign === 'bottom') {
                    return VAlign.Bottom;
                }
                return null;
            };
            // Parse the border type enum to string.
            Workbook._parseBorderTypeToString = function (type) {
                switch (type) {
                    case BorderStyle.Dashed:
                        return 'dashed';
                    case BorderStyle.Dotted:
                        return 'dotted';
                    case BorderStyle.Double:
                        return 'double';
                    case BorderStyle.Hair:
                        return 'hair';
                    case BorderStyle.Medium:
                        return 'medium';
                    case BorderStyle.MediumDashDotDotted:
                        return 'mediumDashDotDot';
                    case BorderStyle.MediumDashDotted:
                        return 'mediumDashDot';
                    case BorderStyle.MediumDashed:
                        return 'mediumDashed';
                    case BorderStyle.SlantedMediumDashDotted:
                        return 'slantDashDot';
                    case BorderStyle.Thick:
                        return 'thick';
                    case BorderStyle.Thin:
                        return 'thin';
                    case BorderStyle.ThinDashDotDotted:
                        return 'dashDotDot';
                    case BorderStyle.ThinDashDotted:
                        return 'dashDot';
                    case BorderStyle.None:
                    default:
                        return 'none';
                }
            };
            // Parse border type string to border type enum.
            Workbook._parseStringToBorderType = function (type) {
                if (type === 'dashed') {
                    return BorderStyle.Dashed;
                }
                if (type === 'dotted') {
                    return BorderStyle.Dotted;
                }
                if (type === 'double') {
                    return BorderStyle.Double;
                }
                if (type === 'hair') {
                    return BorderStyle.Hair;
                }
                if (type === 'medium') {
                    return BorderStyle.Medium;
                }
                if (type === 'mediumDashDotDot') {
                    return BorderStyle.MediumDashDotDotted;
                }
                if (type === 'mediumDashDot') {
                    return BorderStyle.MediumDashDotted;
                }
                if (type === 'mediumDashed') {
                    return BorderStyle.MediumDashed;
                }
                if (type === 'slantDashDot') {
                    return BorderStyle.SlantedMediumDashDotted;
                }
                if (type === 'thick') {
                    return BorderStyle.Thick;
                }
                if (type === 'thin') {
                    return BorderStyle.Thin;
                }
                if (type === 'dashDotDot') {
                    return BorderStyle.ThinDashDotDotted;
                }
                if (type === 'dashDot') {
                    return BorderStyle.ThinDashDotted;
                }
                return null;
            };
            Workbook._escapeXML = function (s) {
                return typeof s === 'string' ? s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;') : '';
            };
            Workbook._unescapeXML = function (val) {
                return typeof val === 'string' ? val.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, '\'').replace(/&#x2F;/g, '/') : '';
            };
            //TBD: make these functions accessible from c1xlsx.ts and reference them there.
            // Parse the number to alphat
            // For e.g. 5 will be converted to 'E'.
            Workbook._numAlpha = function (i) {
                var t = Math.floor(i / 26) - 1;
                return (t > -1 ? this._numAlpha(t) : '') + this._alphabet.charAt(i % 26);
            };
            Workbook._alphaNum = function (s) {
                var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', t = 0;
                if (!!s) {
                    s = s.toUpperCase();
                }
                if (s.length === 2) {
                    t = this._alphaNum(s.charAt(0)) + 1;
                }
                return t * 26 + this._alphabet.indexOf(s.substr(-1));
            };
            // taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding#The_.22Unicode_Problem.22
            Workbook._b64ToUint6 = function (nChr) {
                return nChr > 64 && nChr < 91 ?
                    nChr - 65
                    : nChr > 96 && nChr < 123 ?
                        nChr - 71
                        : nChr > 47 && nChr < 58 ?
                            nChr + 4
                            : nChr === 43 ?
                                62
                                : nChr === 47 ?
                                    63
                                    :
                                        0;
            };
            // decode the base64 string to int array
            Workbook._base64DecToArr = function (sBase64, nBlocksSize) {
                var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length, nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);
                for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
                    nMod4 = nInIdx & 3;
                    nUint24 |= this._b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
                    if (nMod4 === 3 || nInLen - nInIdx === 1) {
                        for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                            taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
                        }
                        nUint24 = 0;
                    }
                }
                return taBytes;
            };
            // taken from https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
            /* Base64 string to array encoding */
            Workbook._uint6ToB64 = function (nUint6) {
                return nUint6 < 26 ?
                    nUint6 + 65
                    : nUint6 < 52 ?
                        nUint6 + 71
                        : nUint6 < 62 ?
                            nUint6 - 4
                            : nUint6 === 62 ?
                                43
                                : nUint6 === 63 ?
                                    47
                                    :
                                        65;
            };
            Workbook._base64EncArr = function (aBytes) {
                var nMod3 = 2, sB64Enc = "";
                for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
                    nMod3 = nIdx % 3;
                    if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0) {
                        sB64Enc += "\r\n";
                    }
                    nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
                    if (nMod3 === 2 || aBytes.length - nIdx === 1) {
                        sB64Enc += String.fromCharCode(this._uint6ToB64(nUint24 >>> 18 & 63), this._uint6ToB64(nUint24 >>> 12 & 63), this._uint6ToB64(nUint24 >>> 6 & 63), this._uint6ToB64(nUint24 & 63));
                        nUint24 = 0;
                    }
                }
                return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) + (nMod3 === 2 ? '' : nMod3 === 1 ? '=' : '==');
            };
            // Serializes the array of worksheet instance to the array of worksheet object model. 
            Workbook.prototype._serializeWorkSheets = function () {
                var sheetOMs = [], workSheet, i;
                for (i = 0; i < this._sheets.length; i++) {
                    workSheet = this._sheets[i];
                    if (workSheet) {
                        sheetOMs[i] = workSheet._serialize();
                    }
                }
                return sheetOMs;
            };
            //Serializes the array of workbookstyle instance to the array of workbookstyle object model.
            Workbook.prototype._serializeWorkbookStyles = function () {
                var styleOMs = [], style, i;
                for (i = 0; i < this._styles.length; i++) {
                    style = this._styles[i];
                    if (style) {
                        styleOMs[i] = style._serialize();
                    }
                }
                return styleOMs;
            };
            // Deserializes the array of worksheet object model to the array of worksheet instance.
            Workbook.prototype._deserializeWorkSheets = function (workSheets) {
                var sheet, sheetOM, i;
                this._sheets = [];
                for (i = 0; i < workSheets.length; i++) {
                    sheetOM = workSheets[i];
                    if (sheetOM) {
                        sheet = new WorkSheet();
                        sheet._deserialize(sheetOM);
                        this._sheets[i] = sheet;
                    }
                }
            };
            // Deserializes the array of workbookstyle object model to the array of the workbookstyle instance.
            Workbook.prototype._deserializeWorkbookStyles = function (workbookStyles) {
                var style, styleOM, i;
                this._styles = [];
                for (i = 0; i < workbookStyles.length; i++) {
                    styleOM = workbookStyles[i];
                    if (styleOM) {
                        style = new WorkbookStyle();
                        style._deserialize(styleOM);
                        this._styles[i] = style;
                    }
                }
            };
            return Workbook;
        }());
        Workbook._alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        Workbook._formatMap = {
            n: '#,##0{0}',
            c: '{1}#,##0{0}_);({1}#,##0{0})',
            p: '0{0}%',
            f: '0{0}',
            d: '{0}',
            g: '0{0}'
        };
        xlsx.Workbook = Workbook;
        /**
         * Represents the Workbook Object Model sheet definition that includes sheet
         * properties and data.
         *
         * The sheet cells are stored in row objects and are accessible using JavaScript
         * expressions like <b>sheet.rows[i].cells[j]</b>.
         */
        var WorkSheet = (function () {
            /**
             * Initializes a new instance of the @see:WorkSheet class.
             */
            function WorkSheet() {
            }
            Object.defineProperty(WorkSheet.prototype, "columns", {
                /**
                 * Gets or sets an array of sheet columns definitions.
                 *
                 * Each @see:WorkbookColumn object in the array describes a column
                 * at the corresponding position in xlsx sheet, i.e. the column with index 0
                 * corresponds to xlsx sheet column with index A, object with
                 * index 1 defines sheet column with index B, and so on. If certain column
                 * has no description in xlsx file, then corresponding array element
                 * is undefined for both export and import operations.
                 *
                 * If @see:WorkbookColumn object in the array doesn't specify the
                 * <b>width</b> property value, then the default column width is applied.
                 */
                get: function () {
                    if (this._columns == null) {
                        this._columns = [];
                    }
                    return this._columns;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WorkSheet.prototype, "rows", {
                /**
                 * Gets an array of sheet rows definition.
                 *
                 * Each @see:WorkbookRow object in the array describes a row at the corresponding
                 * position in xlsx sheet, i.e. the row with index 0 corresponds to excel sheet
                 * row with index 1, object with index 1 defines sheet row with index 2, and so on.
                 * If certain row has no properties and data in xlsx file, then corresponding array
                 * element is undefined for both export and import operations.
                 *
                 * If @see:WorkbookRow object in the array doesn't specify the <b>height</b> property
                 * value, then the default row height is applied.
                 */
                get: function () {
                    if (this._rows == null) {
                        this._rows = [];
                    }
                    return this._rows;
                },
                enumerable: true,
                configurable: true
            });
            // Serializes the worksheet instance to worksheet object model.
            WorkSheet.prototype._serialize = function () {
                var workSheetOM;
                if (this._checkEmptyWorkSheet()) {
                    return null;
                }
                workSheetOM = {};
                if (this.style) {
                    workSheetOM.style = this.style._serialize();
                }
                if (this._columns && this._columns.length > 0) {
                    workSheetOM.columns = this._serializeWorkbookColumns();
                }
                if (this._rows && this._rows.length > 0) {
                    workSheetOM.rows = this._serializeWorkbookRows();
                }
                if (this.frozenPane) {
                    workSheetOM.frozenPane = this.frozenPane._serialize();
                }
                if (this.name) {
                    workSheetOM.name = this.name;
                }
                if (this.summaryBelow != null) {
                    workSheetOM.summaryBelow = this.summaryBelow;
                }
                if (this.visible != null) {
                    workSheetOM.visible = this.visible;
                }
                return workSheetOM;
            };
            // Deserializes the worksheet object model to worksheet instance.
            WorkSheet.prototype._deserialize = function (workSheetOM) {
                var frozenPane, style;
                if (workSheetOM.style) {
                    style = new WorkbookStyle();
                    style._deserialize(workSheetOM.style);
                    this.style = style;
                }
                if (workSheetOM.columns && workSheetOM.columns.length > 0) {
                    this._deserializeWorkbookColumns(workSheetOM.columns);
                }
                if (workSheetOM.rows && workSheetOM.rows.length > 0) {
                    this._deserializeWorkbookRows(workSheetOM.rows);
                }
                if (workSheetOM.frozenPane) {
                    frozenPane = new WorkbookFrozenPane();
                    frozenPane._deserialize(workSheetOM.frozenPane);
                    this.frozenPane = frozenPane;
                }
                this.name = workSheetOM.name;
                this.summaryBelow = workSheetOM.summaryBelow;
                this.visible = workSheetOM.visible;
            };
            // Add the workbookcolumn instance into the _columns array.
            WorkSheet.prototype._addWorkbookColumn = function (column, columnIndex) {
                if (this._columns == null) {
                    this._columns = [];
                }
                if (columnIndex != null && !isNaN(columnIndex)) {
                    this._columns[columnIndex] = column;
                }
                else {
                    this._columns.push(column);
                }
            };
            // Add the workbookrow instance into the _rows array.
            WorkSheet.prototype._addWorkbookRow = function (row, rowIndex) {
                if (this._rows == null) {
                    this._rows = [];
                }
                if (rowIndex != null && !isNaN(rowIndex)) {
                    this._rows[rowIndex] = row;
                }
                else {
                    this._rows.push(row);
                }
            };
            // Serializes the array of the workbookcolumn instance to the array of the workbookcolumn object model.
            WorkSheet.prototype._serializeWorkbookColumns = function () {
                var columnOMs = [], column, i;
                for (i = 0; i < this._columns.length; i++) {
                    column = this._columns[i];
                    if (column) {
                        columnOMs[i] = column._serialize();
                    }
                }
                return columnOMs;
            };
            // Serializes the array of workbookrow instance to the array of the workbookrow object model.
            WorkSheet.prototype._serializeWorkbookRows = function () {
                var rowOMs = [], row, i;
                for (i = 0; i < this._rows.length; i++) {
                    row = this._rows[i];
                    if (row) {
                        rowOMs[i] = row._serialize();
                    }
                }
                return rowOMs;
            };
            // Deserializes the arry of the workbookcolumn object model to the array of the workbookcolumn instance.
            WorkSheet.prototype._deserializeWorkbookColumns = function (workbookColumns) {
                var columnOM, column, i;
                this._columns = [];
                for (i = 0; i < workbookColumns.length; i++) {
                    columnOM = workbookColumns[i];
                    if (columnOM) {
                        column = new WorkbookColumn();
                        column._deserialize(columnOM);
                        this._columns[i] = column;
                    }
                }
            };
            // Deserializes the array of the workbookrow object model to the array of the workbookrow instance.
            WorkSheet.prototype._deserializeWorkbookRows = function (workbookRows) {
                var rowOM, row, i;
                this._rows = [];
                for (i = 0; i < workbookRows.length; i++) {
                    rowOM = workbookRows[i];
                    if (rowOM) {
                        row = new WorkbookRow();
                        row._deserialize(rowOM);
                        this._rows[i] = row;
                    }
                }
            };
            // Checks whether the worksheet instance is empty.
            WorkSheet.prototype._checkEmptyWorkSheet = function () {
                return this._rows == null && this._columns == null && this.visible == null && this.summaryBelow == null && this.frozenPane == null && this.style == null
                    && (this.name == null || this.name === '');
            };
            return WorkSheet;
        }());
        xlsx.WorkSheet = WorkSheet;
        /**
         * Represents the Workbook Object Model column definition.
         */
        var WorkbookColumn = (function () {
            /**
             * Initializes a new instance of the @see:WorkbookColumn class.
             */
            function WorkbookColumn() {
            }
            // Serializes the workbookcolumn instance to workbookcolumn object model.
            WorkbookColumn.prototype._serialize = function () {
                var workbookColumnOM;
                if (this._checkEmptyWorkbookColumn()) {
                    return null;
                }
                workbookColumnOM = {};
                if (this.style) {
                    workbookColumnOM.style = this.style._serialize();
                }
                if (this.autoWidth != null) {
                    workbookColumnOM.autoWidth = this.autoWidth;
                }
                if (this.width != null) {
                    workbookColumnOM.width = this.width;
                }
                if (this.visible != null) {
                    workbookColumnOM.visible = this.visible;
                }
                return workbookColumnOM;
            };
            // Deserializes the workbookColummn object model to workbookcolumn instance.
            WorkbookColumn.prototype._deserialize = function (workbookColumnOM) {
                var style;
                if (workbookColumnOM.style) {
                    style = new WorkbookStyle();
                    style._deserialize(workbookColumnOM.style);
                    this.style = style;
                }
                this.autoWidth = workbookColumnOM.autoWidth;
                this.visible = workbookColumnOM.visible;
                this.width = workbookColumnOM.width;
            };
            // Checks whether the workbookcolumn instance is empty.
            WorkbookColumn.prototype._checkEmptyWorkbookColumn = function () {
                return this.style == null && this.width == null && this.autoWidth == null && this.visible == null;
            };
            return WorkbookColumn;
        }());
        xlsx.WorkbookColumn = WorkbookColumn;
        /**
         * Represents the Workbook Object Model row definition.
         */
        var WorkbookRow = (function () {
            /**
             * Initializes a new instance of the @see:WorkbookRow class.
             */
            function WorkbookRow() {
            }
            Object.defineProperty(WorkbookRow.prototype, "cells", {
                /**
                 * Gets or sets an array of cells in the row.
                 *
                 * Each @see:WorkbookCell object in the array describes a cell
                 * at the corresponding position in the row, i.e. a cell with
                 * index 0 pertains to column with index A, a cell with index 1
                 * defines cell pertaining to column with index B, and so on.
                 * If a certain cell has no definition (empty) in xlsx file,
                 * then corresponding array element is undefined for both export
                 * and import operations.
                 */
                get: function () {
                    if (this._cells == null) {
                        this._cells = [];
                    }
                    return this._cells;
                },
                enumerable: true,
                configurable: true
            });
            // Serializes the workbookrow instance to workbookrow object model.
            WorkbookRow.prototype._serialize = function () {
                var workbookRowOM;
                if (this._checkEmptyWorkbookRow()) {
                    return null;
                }
                workbookRowOM = {};
                if (this._cells && this._cells.length > 0) {
                    workbookRowOM.cells = this._serializeWorkbookCells();
                }
                if (this.style) {
                    workbookRowOM.style = this.style._serialize();
                }
                if (this.collapsed != null) {
                    workbookRowOM.collapsed = this.collapsed;
                }
                if (this.groupLevel != null && !isNaN(this.groupLevel)) {
                    workbookRowOM.groupLevel = this.groupLevel;
                }
                if (this.height != null && !isNaN(this.height)) {
                    workbookRowOM.height = this.height;
                }
                if (this.visible != null) {
                    workbookRowOM.visible = this.visible;
                }
                return workbookRowOM;
            };
            // Deserializes the workbookrow object model to workbookrow instance.
            WorkbookRow.prototype._deserialize = function (workbookRowOM) {
                var style;
                if (workbookRowOM.cells && workbookRowOM.cells.length > 0) {
                    this._deserializeWorkbookCells(workbookRowOM.cells);
                }
                if (workbookRowOM.style) {
                    style = new WorkbookStyle();
                    style._deserialize(workbookRowOM.style);
                    this.style = style;
                }
                this.collapsed = workbookRowOM.collapsed;
                this.groupLevel = workbookRowOM.groupLevel;
                this.height = workbookRowOM.height;
                this.visible = workbookRowOM.visible;
            };
            // Add the workbook cell instance into the _cells array.
            WorkbookRow.prototype._addWorkbookCell = function (cell, cellIndex) {
                if (this._cells == null) {
                    this._cells = [];
                }
                if (cellIndex != null && !isNaN(cellIndex)) {
                    this._cells[cellIndex] = cell;
                }
                else {
                    this._cells.push(cell);
                }
            };
            // Serializes the array of the workbookcell instance to workbookcell object model.
            WorkbookRow.prototype._serializeWorkbookCells = function () {
                var cellOMs = [], cell, i;
                for (i = 0; i < this._cells.length; i++) {
                    cell = this._cells[i];
                    if (cell) {
                        cellOMs[i] = cell._serialize();
                    }
                }
                return cellOMs;
            };
            // Deserializes the array of the workbookcell object model to workbookcell instance. 
            WorkbookRow.prototype._deserializeWorkbookCells = function (workbookCells) {
                var cellOM, cell, i;
                this._cells = [];
                for (i = 0; i < workbookCells.length; i++) {
                    cellOM = workbookCells[i];
                    if (cellOM) {
                        cell = new WorkbookCell();
                        cell._deserialize(cellOM);
                        this._cells[i] = cell;
                    }
                }
            };
            // Checks whether the workbookcell instance is empty.
            WorkbookRow.prototype._checkEmptyWorkbookRow = function () {
                return this._cells == null && this.style == null && this.collapsed == null && this.visible == null
                    && (this.height == null || isNaN(this.height))
                    && (this.groupLevel == null || isNaN(this.groupLevel));
            };
            return WorkbookRow;
        }());
        xlsx.WorkbookRow = WorkbookRow;
        /**
         * Represents the Workbook Object Model cell definition.
         */
        var WorkbookCell = (function () {
            /**
             * Initializes a new instance of the @see:WorkbookCell class.
             */
            function WorkbookCell() {
            }
            // Serializes the workbookcell instance to workbookcell object model.
            WorkbookCell.prototype._serialize = function () {
                var workbookCellOM;
                if (this._checkEmptyWorkbookCell()) {
                    return null;
                }
                workbookCellOM = {};
                if (this.style) {
                    workbookCellOM.style = this.style._serialize();
                }
                if (this.value != null) {
                    workbookCellOM.value = this.value;
                }
                if (this.formula) {
                    workbookCellOM.formula = this.formula;
                }
                if (this.isDate != null) {
                    workbookCellOM.isDate = this.isDate;
                }
                if (this.colSpan != null && !isNaN(this.colSpan) && this.colSpan > 1) {
                    workbookCellOM.colSpan = this.colSpan;
                }
                if (this.rowSpan != null && !isNaN(this.rowSpan) && this.rowSpan > 1) {
                    workbookCellOM.rowSpan = this.rowSpan;
                }
                return workbookCellOM;
            };
            // Deserializes the workbookcell object model to workbookcell instance.
            WorkbookCell.prototype._deserialize = function (workbookCellOM) {
                var style;
                if (workbookCellOM.style) {
                    style = new WorkbookStyle();
                    style._deserialize(workbookCellOM.style);
                    this.style = style;
                }
                this.value = workbookCellOM.value;
                this.formula = workbookCellOM.formula;
                this.isDate = workbookCellOM.isDate;
                this.colSpan = workbookCellOM.colSpan;
                this.rowSpan = workbookCellOM.rowSpan;
            };
            // Checks whether the workbookcell instance is empty.
            WorkbookCell.prototype._checkEmptyWorkbookCell = function () {
                return this.style == null && this.value == null && this.isDate == null
                    && (this.formula == null || this.formula === '')
                    && (this.colSpan == null || isNaN(this.colSpan) || this.colSpan <= 1)
                    && (this.rowSpan == null || isNaN(this.rowSpan) || this.rowSpan <= 1);
            };
            return WorkbookCell;
        }());
        xlsx.WorkbookCell = WorkbookCell;
        /**
         * Workbook frozen pane definition
         */
        var WorkbookFrozenPane = (function () {
            /**
             * Initializes a new instance of the @see:WorkbookFrozenPane class.
             */
            function WorkbookFrozenPane() {
            }
            // Serializes the workbookfrozenpane instance to the workbookfrozenpane object model.
            WorkbookFrozenPane.prototype._serialize = function () {
                if ((this.columns == null || isNaN(this.columns) || this.columns === 0)
                    && (this.rows == null || isNaN(this.rows) || this.rows === 0)) {
                    return null;
                }
                else {
                    return {
                        columns: this.columns,
                        rows: this.rows
                    };
                }
            };
            // Deserializes the workbookfrozenpane object model to workbookfrozenpane instance.
            WorkbookFrozenPane.prototype._deserialize = function (workbookFrozenPaneOM) {
                this.columns = workbookFrozenPaneOM.columns;
                this.rows = workbookFrozenPaneOM.rows;
            };
            return WorkbookFrozenPane;
        }());
        xlsx.WorkbookFrozenPane = WorkbookFrozenPane;
        /**
         * Represents the Workbook Object Model style definition used
         * to style Excel cells, columns and rows.
         */
        var WorkbookStyle = (function () {
            /**
             * Initializes a new instance of the @see:WorkbookStyle class.
             */
            function WorkbookStyle() {
            }
            // Serializes the workbookstyle instance to the workbookstyle object model.
            WorkbookStyle.prototype._serialize = function () {
                var workbookStyleOM;
                if (this._checkEmptyWorkbookStyle()) {
                    return null;
                }
                workbookStyleOM = {};
                if (this.basedOn) {
                    workbookStyleOM.basedOn = this.basedOn._serialize();
                }
                if (this.fill) {
                    workbookStyleOM.fill = this.fill._serialize();
                }
                if (this.font) {
                    workbookStyleOM.font = this.font._serialize();
                }
                if (this.borders) {
                    workbookStyleOM.borders = this.borders._serialize();
                }
                if (this.format) {
                    workbookStyleOM.format = this.format;
                }
                if (this.hAlign != null) {
                    workbookStyleOM.hAlign = wijmo.asEnum(this.hAlign, HAlign, false);
                }
                if (this.vAlign != null) {
                    workbookStyleOM.vAlign = wijmo.asEnum(this.vAlign, VAlign, false);
                }
                if (this.indent != null && !isNaN(this.indent)) {
                    workbookStyleOM.indent = this.indent;
                }
                if (!!this.wordWrap) {
                    workbookStyleOM.wordWrap = this.wordWrap;
                }
                return workbookStyleOM;
            };
            // Deserializes the workbookstyle object model to workbookstyle instance.
            WorkbookStyle.prototype._deserialize = function (workbookStyleOM) {
                var baseStyle, fill, font, borders;
                if (workbookStyleOM.basedOn) {
                    baseStyle = new WorkbookStyle();
                    baseStyle._deserialize(workbookStyleOM.basedOn);
                    this.basedOn = baseStyle;
                }
                if (workbookStyleOM.fill) {
                    fill = new WorkbookFill();
                    fill._deserialize(workbookStyleOM.fill);
                    this.fill = fill;
                }
                if (workbookStyleOM.font) {
                    font = new WorkbookFont();
                    font._deserialize(workbookStyleOM.font);
                    this.font = font;
                }
                if (workbookStyleOM.borders) {
                    borders = new WorkbookBorder();
                    borders._deserialize(workbookStyleOM.borders);
                    this.borders = borders;
                }
                this.format = workbookStyleOM.format;
                if (workbookStyleOM.hAlign != null) {
                    this.hAlign = wijmo.asEnum(workbookStyleOM.hAlign, HAlign, false);
                }
                if (workbookStyleOM.vAlign != null) {
                    this.vAlign = wijmo.asEnum(workbookStyleOM.vAlign, VAlign, false);
                }
                if (workbookStyleOM.indent != null && !isNaN(workbookStyleOM.indent)) {
                    this.indent = workbookStyleOM.indent;
                }
                if (!!workbookStyleOM.wordWrap) {
                    this.wordWrap = workbookStyleOM.wordWrap;
                }
            };
            // Checks whether the workbookstyle instance is empty.
            WorkbookStyle.prototype._checkEmptyWorkbookStyle = function () {
                return this.basedOn == null && this.fill == null
                    && this.font == null && this.borders == null
                    && (this.format == null || this.format === '')
                    && this.hAlign == null && this.vAlign == null
                    && this.wordWrap == null;
            };
            return WorkbookStyle;
        }());
        xlsx.WorkbookStyle = WorkbookStyle;
        /**
         * Represents the Workbook Object Model font definition.
         */
        var WorkbookFont = (function () {
            /**
             * Initializes a new instance of the @see:WorkbookFont class.
             */
            function WorkbookFont() {
            }
            //Serializes the workbookfont instance to the workbookfont object model.
            WorkbookFont.prototype._serialize = function () {
                var workbookFontOM;
                if (this._checkEmptyWorkbookFont()) {
                    return null;
                }
                workbookFontOM = {};
                if (this.bold != null) {
                    workbookFontOM.bold = this.bold;
                }
                if (this.italic != null) {
                    workbookFontOM.italic = this.italic;
                }
                if (this.underline != null) {
                    workbookFontOM.underline = this.underline;
                }
                if (this.color) {
                    workbookFontOM.color = this.color;
                }
                if (this.family) {
                    workbookFontOM.family = this.family;
                }
                if (this.size != null && !isNaN(this.size)) {
                    workbookFontOM.size = this.size;
                }
                return workbookFontOM;
            };
            // Deserializes the workbookfotn object model to the workbookfont instance.
            WorkbookFont.prototype._deserialize = function (workbookFontOM) {
                this.bold = workbookFontOM.bold;
                this.color = workbookFontOM.color;
                this.family = workbookFontOM.family;
                this.italic = workbookFontOM.italic;
                this.size = workbookFontOM.size;
                this.underline = workbookFontOM.underline;
            };
            // Checks whether the workbookfont instance is empty.
            WorkbookFont.prototype._checkEmptyWorkbookFont = function () {
                return this.bold == null && this.italic == null && this.underline == null
                    && (this.color == null || this.color === '')
                    && (this.family == null || this.family === '')
                    && (this.size == null || isNaN(this.size));
            };
            return WorkbookFont;
        }());
        xlsx.WorkbookFont = WorkbookFont;
        /**
         * Represents the Workbook Object Model background fill definition.
         */
        var WorkbookFill = (function () {
            /**
             * Initializes a new instance of the @see:WorkbookFill class.
             */
            function WorkbookFill() {
            }
            // Serializes the workbookfill instance to the workbookfill object model.
            WorkbookFill.prototype._serialize = function () {
                var workbookFillOM;
                if (this.color) {
                    return {
                        color: this.color
                    };
                }
                else {
                    return null;
                }
            };
            // Deserializes the workbookfill object model to workbookfill instance.
            WorkbookFill.prototype._deserialize = function (workbookFillOM) {
                this.color = workbookFillOM.color;
            };
            return WorkbookFill;
        }());
        xlsx.WorkbookFill = WorkbookFill;
        /**
         * Represents the Workbook Object Model border definition.
         */
        var WorkbookBorder = (function () {
            /**
             * Initializes a new instance of the @see:WorkbookBorder class.
             */
            function WorkbookBorder() {
            }
            // Serializes the workbookborder instance to the workbookborder object model.
            WorkbookBorder.prototype._serialize = function () {
                var workbookBorderOM;
                if (this._checkEmptyWorkbookBorder()) {
                    return null;
                }
                workbookBorderOM = {};
                if (this.top) {
                    workbookBorderOM.top = this.top._serialize();
                }
                if (this.bottom) {
                    workbookBorderOM.bottom = this.bottom._serialize();
                }
                if (this.left) {
                    workbookBorderOM.left = this.left._serialize();
                }
                if (this.right) {
                    workbookBorderOM.right = this.right._serialize();
                }
                if (this.diagonal) {
                    workbookBorderOM.diagonal = this.diagonal._serialize();
                }
                return workbookBorderOM;
            };
            // Deserializes the workbookborder object model to workbookborder instance.
            WorkbookBorder.prototype._deserialize = function (workbookBorderOM) {
                var top, bottom, left, right, diagonal;
                if (workbookBorderOM.top) {
                    top = new WorkbookBorderSetting();
                    top._deserialize(workbookBorderOM.top);
                    this.top = top;
                }
                if (workbookBorderOM.bottom) {
                    bottom = new WorkbookBorderSetting();
                    bottom._deserialize(workbookBorderOM.bottom);
                    this.bottom = bottom;
                }
                if (workbookBorderOM.left) {
                    left = new WorkbookBorderSetting();
                    left._deserialize(workbookBorderOM.left);
                    this.left = left;
                }
                if (workbookBorderOM.right) {
                    right = new WorkbookBorderSetting();
                    right._deserialize(workbookBorderOM.right);
                    this.right = right;
                }
                if (workbookBorderOM.diagonal) {
                    diagonal = new WorkbookBorderSetting();
                    diagonal._deserialize(workbookBorderOM.diagonal);
                    this.diagonal = diagonal;
                }
            };
            // Checks whether the workbookborder instance is empty.
            WorkbookBorder.prototype._checkEmptyWorkbookBorder = function () {
                return this.top == null && this.bottom == null
                    && this.left == null && this.right == null && this.diagonal == null;
            };
            return WorkbookBorder;
        }());
        xlsx.WorkbookBorder = WorkbookBorder;
        /**
         * Represents the Workbook Object Model background setting definition.
         */
        var WorkbookBorderSetting = (function () {
            /**
             * Initializes a new instance of the @see:WorkbookBorderSetting class.
             */
            function WorkbookBorderSetting() {
            }
            // Serializes the workbookbordersetting instance to the workbookbordersetting object model.
            WorkbookBorderSetting.prototype._serialize = function () {
                var workbookBorderSettingOM;
                if ((this.color == null || this.color === '') && this.style == null) {
                    return null;
                }
                workbookBorderSettingOM = {};
                if (this.color) {
                    workbookBorderSettingOM.color = this.color;
                }
                if (this.style != null) {
                    workbookBorderSettingOM.style = wijmo.asEnum(this.style, BorderStyle, false);
                }
                return workbookBorderSettingOM;
            };
            // Deserializes the workbookbordersetting object model to workbookbordersetting instance.
            WorkbookBorderSetting.prototype._deserialize = function (workbookBorderSettingOM) {
                this.color = workbookBorderSettingOM.color;
                if (workbookBorderSettingOM.style != null) {
                    this.style = wijmo.asEnum(workbookBorderSettingOM.style, BorderStyle, false);
                }
            };
            return WorkbookBorderSetting;
        }());
        xlsx.WorkbookBorderSetting = WorkbookBorderSetting;
        /**
         * Defines the Workbook Object Model horizontal text alignment.
         */
        var HAlign;
        (function (HAlign) {
            /** Alignment depends on the cell value type. */
            HAlign[HAlign["General"] = 0] = "General";
            /** Text is aligned to the left. */
            HAlign[HAlign["Left"] = 1] = "Left";
            /** Text is centered. */
            HAlign[HAlign["Center"] = 2] = "Center";
            /** Text is aligned to the right. */
            HAlign[HAlign["Right"] = 3] = "Right";
            /** Text is replicated to fill the whole cell width. */
            HAlign[HAlign["Fill"] = 4] = "Fill";
            /** Text is justified. */
            HAlign[HAlign["Justify"] = 5] = "Justify";
        })(HAlign = xlsx.HAlign || (xlsx.HAlign = {}));
        /**
         * Vertical alignment
         */
        var VAlign;
        (function (VAlign) {
            /** Top vertical alignment */
            VAlign[VAlign["Top"] = 0] = "Top";
            /** Center vertical alignment */
            VAlign[VAlign["Center"] = 1] = "Center";
            /** Bottom vertical alignment */
            VAlign[VAlign["Bottom"] = 2] = "Bottom";
            /** Justified vertical alignment */
            VAlign[VAlign["Justify"] = 3] = "Justify";
        })(VAlign = xlsx.VAlign || (xlsx.VAlign = {}));
        ///**
        // * Text direction
        // */
        //export enum TextDirection {
        //	/** Context */
        //	Context = 0,
        //	/** Left to right */
        //	LeftToRight = 1,
        //	/** Right to left */
        //	RightToLeft = 2
        //}
        ///**
        // * Fill Pattern 
        // */
        //export enum FillPattern {
        //	/** No fill */
        //	None = 0,
        //	/** Solid fill */
        //	Solid = 1,
        //	/** Medium gray fill */
        //	Gray50 = 2,
        //	/** Dark gray fill */
        //	Gray75 = 3,
        //	/** Light gray fill */
        //	Gray25 = 4,
        //	/** Horizontal stripe fill */
        //	HorizontalStripe = 5,
        //	/** Vertical stripe fill */
        //	VerticalStripe = 6,
        //	/** Reverse diagonal stripe fill */
        //	ReverseDiagonalStripe = 7,
        //	/** Diagonal stripe fill */
        //	DiagonalStripe = 8,
        //	/** Diagonal crosshatch fill */
        //	DiagonalCrosshatch = 9,
        //	/** Thick diagonal crosshatch fill */
        //	ThickDiagonalCrosshatch = 10,
        //	/** Thin horizontal stripe fill */
        //	ThinHorizontalStripe = 11,
        //	/** Thin vertical stripe fill */
        //	ThinVerticalStripe = 12,
        //	/** Thin reverse diagonal stripe fill */
        //	ThinReverseDiagonalStripe = 13,
        //	/** Thin diagonal stripe fill */
        //	ThinDiagonalStripe = 14,
        //	/** Thin horizontal crosshatch fill */
        //	ThinHorizontalCrosshatch = 15,
        //	/** Thin diagonal crosshatch fill */
        //	ThinDiagonalCrosshatch = 16,
        //	/** Gray 125 fill */
        //	Gray12 = 17,
        //	/** Gray 0.0625 fill */
        //	Gray06 = 18
        //}
        /**
         * Border line style
         */
        var BorderStyle;
        (function (BorderStyle) {
            /** No border */
            BorderStyle[BorderStyle["None"] = 0] = "None";
            /** Thin border */
            BorderStyle[BorderStyle["Thin"] = 1] = "Thin";
            /** Medium border */
            BorderStyle[BorderStyle["Medium"] = 2] = "Medium";
            /** Dashed border */
            BorderStyle[BorderStyle["Dashed"] = 3] = "Dashed";
            /** Dotted border */
            BorderStyle[BorderStyle["Dotted"] = 4] = "Dotted";
            /** Thick line border */
            BorderStyle[BorderStyle["Thick"] = 5] = "Thick";
            /** Double line border */
            BorderStyle[BorderStyle["Double"] = 6] = "Double";
            /** Hair line border */
            BorderStyle[BorderStyle["Hair"] = 7] = "Hair";
            /** Medium dashed border */
            BorderStyle[BorderStyle["MediumDashed"] = 8] = "MediumDashed";
            /** Thin dash dotted border */
            BorderStyle[BorderStyle["ThinDashDotted"] = 9] = "ThinDashDotted";
            /** Medium dash dotted border */
            BorderStyle[BorderStyle["MediumDashDotted"] = 10] = "MediumDashDotted";
            /** Thin dash dot dotted border */
            BorderStyle[BorderStyle["ThinDashDotDotted"] = 11] = "ThinDashDotDotted";
            /** Medium dash dot dotted border */
            BorderStyle[BorderStyle["MediumDashDotDotted"] = 12] = "MediumDashDotDotted";
            /** Slanted medium dash dotted border */
            BorderStyle[BorderStyle["SlantedMediumDashDotted"] = 13] = "SlantedMediumDashDotted";
        })(BorderStyle = xlsx.BorderStyle || (xlsx.BorderStyle = {}));
    })(xlsx = wijmo.xlsx || (wijmo.xlsx = {}));
})(wijmo || (wijmo = {}));

