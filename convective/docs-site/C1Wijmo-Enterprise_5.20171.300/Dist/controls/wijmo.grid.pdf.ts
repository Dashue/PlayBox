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
///<wijmo-soft-import from="wijmo.grid.multirow"/>
///<wijmo-soft-import from="wijmo.grid.sheet"/>

/**
* Defines the @see:FlexGridPdfConverter class used to export the @see:FlexGrid to PDF.
*/
module wijmo.grid.pdf {
	'use strict';

	/**
	* Specifies how the grid content should be scaled to fit the page.
	*/
	export enum ScaleMode {
		/**
		* Render the grid in actual size, breaking into pages as needed.
		*/
		ActualSize,

		/**
		* Scale the grid, so that it fits the page width.
		*/
		PageWidth,

		/**
		* Scale the grid, so that it fits on a single page.
		*/
		SinglePage
	}

	/**
	* Specifies whether the whole grid or just a section should be rendered.
	*/
	export enum ExportMode {
		/**
		* Exports all the data from grid.
		*/
		All,

		/**
		* Exports the current selection only.
		*/
		Selection
	}

	/**
	* Represents the look and feel of a cell.
	*/
	export interface ICellStyle {
		/**
		* Represents the background color of a cell.
		*/
		backgroundColor?: string;

		/**
		* Represents the border color of a cell.
		*/
		borderColor?: string,

		/**
		* Represents the text color of a cell.
		*/
		color?: string;

		/**
		* Represents the font of a cell.
		*/
		font?: wijmo.pdf.PdfFont;
	}

	/**
	* Represents the look and feel of the @see:FlexGrid being exported.
	*/
	export interface IFlexGridStyle {
		/**
		* Specifies the cell style applied to cells within a @see:FlexGrid.
		*/
		cellStyle?: ICellStyle;

		/**
		* Represents the cell style applied to odd-numbered rows of the @see:FlexGrid.
		*/
		altCellStyle?: ICellStyle;

		/**
		* Represents the cell style applied to grouped rows of the @see:FlexGrid.
		*/
		groupCellStyle?: ICellStyle;

		/**
		* Represents the cell style applied to row headers and column headers of 
		* the @see:FlexGrid.
		*/
		headerCellStyle?: ICellStyle;

		/**
		* Represents the cell style applied to column footers of the @see:FlexGrid.
		*/
		footerCellStyle?: ICellStyle;
	}

	/**
	* Represents the settings used by the @see:FlexGridPdfConverter.draw and 
	* @see:FlexGridPdfConverter.drawToPosition methods.
	*/
	export interface IFlexGridDrawSettings {
		/**
		* Indicates whether custom cell content and style should be evaluated and exported.
		* If set to true then export logic will retrieve cell content using cell.textContent property,
		* and cell style using getComputedStyle(cell).
		* Default is 'undefined' (i.e. false).
		*/
		customCellContent?: boolean;

		/**
		* Represents an array of custom fonts that will be embedded into the document.
		*
		* This sample illustrates how to setup the FlexGridPdfConverter to use two custom
		* fonts, Cuprum-Bold.ttf and Cuprum-Regular.ttf. The first one is applied to the 
		* header cells only, while the second one is applied to all the remaining cells.
		*
		* <pre>
		* wijmo.grid.pdf.FlexGridPdfConverter.export(flex, fileName, {
		*    embeddedFonts: [{
		*       source: 'resources/ttf/Cuprum-Bold.ttf',
		*       name: 'cuprum',
		*       style: 'normal',
		*       weight: 'bold'
		*    }, {
		*       source: 'resources/ttf/Cuprum-Regular.ttf',
		*       name: 'cuprum',
		*       style: 'normal',
		*       weight: 'normal'
		*    }],
		*    styles: {
		*       cellStyle: {
		*          font: {
		*             family: 'cuprum'
		*          }
		*       },
		*       headerCellStyle: {
		*          font: {
		*             weight: 'bold'
		*          }
		*       }
		*    }
		* });
		* </pre>
		*/
		embeddedFonts?: wijmo.pdf.IPdfFontFile[];

		/**
		* Determines the export mode.
		*/
		exportMode?: ExportMode;

		/**
		* An optional callback function called for every exported cell that allows to perform transformations of exported
		* cell value and style, or perform a custom drawing.
		*
		* The function accepts the @see:PdfFormatItemEventArgs class instance as the first argument.
		*
		* In case of custom drawing the @see:PdfFormatItemEventArgs.cancel property should be set to true to cancel the default cell content drawing, and
		* the @see:PdfFormatItemEventArgs.cancelBorders property should be set to true to cancel the default cell borders drawing.
		*
		* <pre>
		* wijmo.grid.pdf.FlexGridPdfConverter.export(flex, fileName, {
		*    formatItem: function(args) {
		*        // Change the background color of the regular cells of "Country" column.
		*        if (args.panel.cellType === wijmo.grid.CellType.Cell && args.panel.columns[args.col].binding === "country") {
		*            args.style.backgroundColor = 'blue';
		*        }
		*    }
		* });</pre>
		*/
		formatItem?: Function;

		/**
		* Determines the maximum number of pages to export.
		*/
		maxPages?: number;

		/**
		* Indicates whether merged values should be repeated across pages when the merged range
		* is split on multiple pages.
		*/
		repeatMergedValuesAcrossPages?: boolean;

		/**
		* Indicates whether star-sized columns widths should be recalculated against the PDF page
		* width instead of using the grid's width.
		*/
		recalculateStarWidths?: boolean;

		/**
		* Represents the look and feel of an exported @see:FlexGrid.
		*/
		styles?: IFlexGridStyle;
	}

	/**
	* Represents the settings used by the @see:FlexGridPdfConverter.export method.
	*/
	export interface IFlexGridExportSettings extends IFlexGridDrawSettings {
		/**
		* Determines the scale mode.
		*/
		scaleMode?: ScaleMode;

		/**
		* Represents the options of the underlying @see:PdfDocument.
		*/
		documentOptions?: any;
	}

	/**
	* Represents arguments of the IFlexGridDrawSettings.formatItem callback.
	*/
	export class PdfFormatItemEventArgs extends wijmo.grid.CellRangeEventArgs {
		private _canvas: wijmo.pdf.PdfPageArea;
		private _cell: HTMLElement;
		private _clientRect: Rect;
		private _contentRect: Rect;
		private _textTop: number;
		private _style: ICellStyle;
		private _getFormattedCell: Function;

		/**
		* Initializes a new instance of the @see:PdfFormatItemEventArgs class.
		*
		* @param p @see:GridPanel that contains the range.
		* @param rng Range of cells affected by the event.
		* @param cell Element that represents the grid cell to be rendered.
		* @param canvas Canvas to perform the custom painting on.
		* @param clientRect	Object that represents the client rectangle of the grid cell to be rendered in canvas coordinates.
		* @param contentRect Object that represents the content rectangle of the grid cell to be rendered in canvas coordinates.
		* @param textTop Object that represents the top position of the text in canvas coordinates.
		* @param style Object that represents the style of the grid cell to be rendered.
		* @param getFormattedCell Callback function that should return the grid cell when the getFormattedCell method is called.
		*/
		constructor(p: GridPanel, rng: CellRange, cell: HTMLElement, canvas: wijmo.pdf.PdfPageArea, clientRect: Rect, contentRect: Rect, textTop: number, style: ICellStyle, getFormattedCell?: Function) {
			super(p, rng);

			this._cell = asType(cell, HTMLElement, true);
			this._canvas = canvas;
			this._clientRect = clientRect;
			this._contentRect = contentRect;
			this._textTop = textTop;
			this._style = style;
			this._getFormattedCell = getFormattedCell;
		}

		/**
        * Gets or sets a value that indicates that default cell borders drawing should be canceled.
        */
		public cancelBorders = false;

		/**
		* Gets the canvas to perform the custom painting on.
		*/
		get canvas(): wijmo.pdf.PdfPageArea {
			return this._canvas;
		}

		/**
		* Gets a reference to the element that represents the grid cell being rendered.
		* If IFlexGridDrawSettings.customCellContent is set to true then contains
		* reference to the element that represents the formatted grid cell; otherwise, a null value.
		*/
		get cell(): HTMLElement {
			return this._cell;
		}

		/**
		* Gets the client rectangle of the cell being rendered in canvas coordinates.
		*/
		get clientRect(): Rect {
			return this._clientRect;
		}

		/**
		* Gets the content rectangle of the cell being rendered in canvas coordinates.
		*/
		get contentRect(): Rect {
			return this._contentRect;
		}

		/**
		* Returns a reference to the element that represents the grid cell being rendered.
		* This method is useful when export of custom formatting is disabled, but you need
		* to export custom content for certain cells.
		*/
		getFormattedCell(): HTMLElement {
			return wijmo.asFunction(this._getFormattedCell)();
		}

		/**
		* Gets an object that represents the style of the cell being rendered.
		* If IFlexGridDrawSettings.customCellContent is set to true then the style is inferred
		* from the cell style; othwerwise it contains a combination of the IFlexGridDrawSettings.styles export
		* setting, according to the row type of exported cell.
		*/
		get style(): wijmo.grid.pdf.ICellStyle {
			return this._style;
		}

		/**
		* Gets the value that represents the top position of the text of the cell being rendered in canvas coordinates.
		*/
		get textTop(): number {
			return this._textTop;
		}
	}

	/*
	* Merges the content of the source object with the destination object.
	*
	* @param dst The destination object.
	* @param src The source object.
	* @param overwrite Indicates whether the existing properties should be overwritten.
	* @return The modified destination object. 
	*/
	function _merge(dst: any, src: any, overwrite = false): any {
		if (src && dst) {
			for (var key in src) {
				var srcProp = src[key],
					dstProp = dst[key];

				if (!isObject(srcProp)) {
					if (dstProp === undefined || (overwrite && srcProp !== undefined)) {
						dst[key] = srcProp;
					}
				} else {
					if (dstProp === undefined || !isObject(dstProp) && overwrite) {
						if (isFunction(srcProp.clone)) {
							dst[key] = dstProp = srcProp.clone();
							continue;
						} else {
							dst[key] = dstProp = {};
						}
					}

					if (isObject(dstProp)) {
						_merge(dst[key], srcProp, overwrite);
					}
				}
			}
		}

		return dst;
	}

	var globCell: HTMLElement;

	/**
	* Provides a functionality to export the @see:FlexGrid to PDF.
	*/
	export class FlexGridPdfConverter {
		private static BorderWidth = 1; // pt, hardcoded because of border collapsing.
		private static DefaultDrawSettings: IFlexGridDrawSettings = {
			maxPages: Number.MAX_VALUE,
			exportMode: ExportMode.All,
			repeatMergedValuesAcrossPages: true,
			recalculateStarWidths: true,
			styles: {
				cellStyle: <any>{
					font: new wijmo.pdf.PdfFont(),
					padding: 1.5,
					verticalAlign: 'middle'
				},
				headerCellStyle: <any>{
					font: { weight: 'bold' } // Don't use PdfFont. It's necessary to specify exclusive properties only, no default values (in order to merge cell styles properly).
				}
			}
		};
		private static DefaultExportSettings: IFlexGridExportSettings = _merge({
			scaleMode: ScaleMode.PageWidth,
			documentOptions: {
				compress: false, // turn off by default to improve performance
				pageSettings: {
					margins: {
						left: 36,
						right: 36,
						top: 18,
						bottom: 18
					}
				}
			}
		}, FlexGridPdfConverter.DefaultDrawSettings);

		/**
		* Draws the @see:FlexGrid to an existing @see:PdfDocument at the
		* (0, @wijmo.pdf.PdfDocument.y) coordinates.
		*
		* If width is not specified, then grid will be rendered in actual size, 
		* breaking into pages as needed. If height is not specified, then grid will be
		* scaled to fit the width, breaking into pages vertically as needed.
		* If both, width and height are determined, then grid will be scaled to fit
		* the specified rectangle without any page breaks.
		*
		* <pre>
		* var doc = new wijmo.pdf.PdfDocument({
		*    ended: function (sender, args) {
		*       wijmo.pdf.saveBlob(args.blob, 'FlexGrid.pdf');
		*    }
		* });
		*
		* wijmo.grid.pdf.FlexGridPdfConverter.draw(grid, doc, null, null, {
		*    maxPages: 10,
		*    styles: {
		*       cellStyle: {
		*          backgroundColor: '#ffffff',
		*          borderColor: '#c6c6c6'
		*       },
		*       headerCellStyle: {
		*          backgroundColor: '#eaeaea'
		*       }
		*    }
		* });
		* </pre>
		*
		* @param flex The @see:FlexGrid instance to export.
		* @param doc The @see:PdfDocument instance to draw in.
		* @param width The width of the drawing area in points.
		* @param height The height of the drawing area in points.
		* @param settings The draw settings.
		*/
		static draw(flex: wijmo.grid.FlexGrid, doc: wijmo.pdf.PdfDocument, width?: number, height?: number, settings?: IFlexGridDrawSettings): void {
			wijmo.assert(!!flex, 'The flex argument cannot be null.');
			wijmo.assert(!!doc, 'The doc argument cannot be null.');

			var options = <IFlexGridExportSettings>_merge({}, settings); // clone
			_merge(options, this.DefaultDrawSettings);

			if (width == null) {
				options.scaleMode = ScaleMode.ActualSize;
			} else {
				options.scaleMode = height == null ? ScaleMode.PageWidth : ScaleMode.SinglePage;
			}

			try {
				if (options.recalculateStarWidths) { // Recalculate to get a lesser scale factor.
					flex.columns._updateStarSizes(wijmo.pdf.ptToPx(doc.width));
				}
				this._draw(flex, doc, null, width, height, options);
			} finally {
				if (options.recalculateStarWidths) {
					flex.invalidate(true); // Rollback changes.
				}
			}
		}

		/**
		* Draws the @see:FlexGrid to an existing @see:PdfDocument instance at the
		* specified coordinates.
		*
		* If width is not specified, then grid will be rendered in actual size
		* without any page breaks.
		* If height is not specified, then grid will be scaled to fit the width
		* without any page breaks.
		* If both, width and height are determined, then grid will be scaled to fit
		* the specified rectangle without any page breaks.
		*
		* <pre>
		* var doc = new wijmo.pdf.PdfDocument({
		*    ended: function (sender, args) {
		*       wijmo.pdf.saveBlob(args.blob, 'FlexGrid.pdf');
		*    }
		* });
		*
		* wijmo.grid.pdf.FlexGridPdfConverter.drawToPosition(grid, doc, new wijmo.Point(0, 0), null, null, {
		*    maxPages: 10,
		*    styles: {
		*       cellStyle: {
		*          backgroundColor: '#ffffff',
		*          borderColor: '#c6c6c6'
		*       },
		*       headerCellStyle: {
		*          backgroundColor: '#eaeaea'
		*       }
		*    }
		* });
		* </pre>
		*
		* @param flex The @see:FlexGrid instance to export.
		* @param doc The @see:PdfDocument instance to draw in.
		* @param point The position to draw at, in points.
		* @param width The width of the drawing area in points.
		* @param height The height of the drawing area in points.
		* @param settings The draw settings.
		*/
		static drawToPosition(flex: wijmo.grid.FlexGrid, doc: wijmo.pdf.PdfDocument, point: Point, width?: number, height?: number, settings?: IFlexGridDrawSettings): void {
			wijmo.assert(!!flex, 'The flex argument cannot be null.');
			wijmo.assert(!!doc, 'The doc argument cannot be null.');
			wijmo.assert(!!point, 'The point argument cannot be null.');

			var options = <IFlexGridExportSettings>_merge({}, settings); // clone
			_merge(options, this.DefaultDrawSettings);

			if (width == null) {
				options.scaleMode = ScaleMode.ActualSize;
			} else {
				options.scaleMode = height == null ? ScaleMode.PageWidth : ScaleMode.SinglePage;
			}

			try {
				if (options.recalculateStarWidths) { // Recalculate to get a lesser scale factor.
					flex.columns._updateStarSizes(wijmo.pdf.ptToPx(doc.width));
				}
				this._draw(flex, doc, point, width, height, options);
			} finally {
				if (options.recalculateStarWidths) {
					flex.invalidate(true); // Rollback changes.
				}
			}
		}

		/**
		* Exports the @see:FlexGrid to PDF.
		*
		* <pre>
		* wijmo.grid.pdf.FlexGridPdfConverter.export(grid, 'FlexGrid.pdf', {
		*    scaleMode: wijmo.grid.pdf.ScaleMode.PageWidth,
		*    maxPages: 10,
		*    styles: {
		*       cellStyle: {
		*          backgroundColor: '#ffffff',
		*          borderColor: '#c6c6c6'
		*       },
		*       headerCellStyle: {
		*          backgroundColor: '#eaeaea'
		*       }
		*    },
		*    documentOptions: {
		*       info: {
		*          title: 'Sample'
		*       }
		*    }
		* });
		* </pre>
		*
		* @param flex The @see:FlexGrid instance to export.
		* @param fileName Name of the file to export.
		* @param settings The export settings.
		*/
		static export(flex: wijmo.grid.FlexGrid, fileName: string, settings?: IFlexGridExportSettings): void {
			wijmo.assert(!!flex, 'The flex argument cannot be null.');
			wijmo.assert(!!fileName, 'The fileName argument cannot be empty.');

			settings = _merge({}, settings); // clone
			_merge(settings, this.DefaultExportSettings);

			var originalEnded = settings.documentOptions.ended;

			settings.documentOptions.ended = (sender, args: wijmo.pdf.PdfDocumentEndedEventArgs) => {
				if (!originalEnded || (originalEnded.apply(doc, [sender, args]) !== false)) {
					wijmo.pdf.saveBlob(args.blob, fileName);
				}
			};

			var doc = new wijmo.pdf.PdfDocument(settings.documentOptions);
			try {
				if (settings.recalculateStarWidths) { // Recalculate to get a lesser scale factor.
					flex.columns._updateStarSizes(wijmo.pdf.ptToPx(doc.width));
				}
				this._draw(flex, doc, null, null, null, settings);
				doc.end();
			} finally {
				if (settings.recalculateStarWidths) {
					flex.invalidate(true); // Rollback changes.
				}
			}
		}

		private static _draw(flex: wijmo.grid.FlexGrid, doc: wijmo.pdf.PdfDocument, point: Point, width: number, height: number, settings: IFlexGridExportSettings): void {
			var isPositionedMode = point != null,
				clSize = new Size(doc.width, doc.height);

			if (!point) {
				point = new Point(0, doc.y);
				//point = new Point(doc.x, doc.y); // use current position
			}

			if (wijmo.isArray(settings.embeddedFonts)) {
				settings.embeddedFonts.forEach((font) => {
					doc.registerFont(font);
				});
			}

			// ** initialize
			var range = RowRange.getSelection(flex, settings.exportMode),
				gr = this._getGridRenderer(flex, range, false, this.BorderWidth, null, true),
				rect = new Rect(point.x || 0, point.y || 0, width || clSize.width, height || clSize.height),
				scaleFactor = this._getScaleFactor(gr, settings.scaleMode, rect),
				pages = this._getPages(gr, range, rect, settings, isPositionedMode, scaleFactor);

			// create an element to calculate FlexGrid's cell style.
			globCell = document.createElement('div');
			globCell.setAttribute(FlexGrid._WJS_MEASURE, 'true');
			globCell.style.visibility = 'hidden';
			flex.hostElement.appendChild(globCell);

			try {
				// ** render
				for (var i = 0; i < pages.length; i++) {
					if (i > 0) { // PDFKit adds first page automatically
						doc.addPage();
					}

					var page = pages[i],
						x = page.pageCol === 0 ? rect.left : 0,
						y = page.pageRow === 0 ? rect.top : 0;

					doc.saveState();

					doc.paths.rect(0, 0, clSize.width, clSize.height).clip();
					doc.scale(scaleFactor, scaleFactor, new Point(x, y));
					doc.translate(x, y);

					var gridPage = this._getGridRenderer(flex, page.range, settings.repeatMergedValuesAcrossPages, this.BorderWidth, settings.styles, i === pages.length - 1);
					gridPage.render(doc, settings);

					doc.restoreState();

					// move document cursor to the grid's left bottom corner.
					doc.x = x;
					doc.y = y + gr.renderSize.height * scaleFactor;
				}
			} finally {
				if (globCell) {
					globCell.parentElement.removeChild(globCell);
					globCell = null;
				}
			}
		}

		private static _getScaleFactor(gr: FlexGridRenderer<FlexGrid>, scaleMode: ScaleMode, rect: Rect): number {
			var factor = 1;

			if (scaleMode === ScaleMode.ActualSize) {
				return factor;
			}

			var size = gr.renderSize;

			if (scaleMode === ScaleMode.SinglePage) {
				var f = Math.min(rect.width / size.width, rect.height / size.height);

				if (f < 1) {
					factor = f;
				}
			} else { // pageWidth
				var f = rect.width / size.width;

				if (f < 1) {
					factor = f;
				}
			}

			return factor;
		}

		private static _getPages(gr: FlexGridRenderer<FlexGrid>, ranges: RowRange, rect: Rect, settings: IFlexGridExportSettings, isPositionedMode: boolean, scaleFactor: number): PdfPageRowRange[] {
			var rowBreaks: number[] = [],
				colBreaks: number[] = [],
				p2u = wijmo.pdf.pxToPt,

				flex = gr.flex,
				showColumnHeader = gr.showColumnHeader,
				showRowHeader = gr.showRowHeader,

				colHeaderHeight = showColumnHeader ? p2u(flex.columnHeaders.height) : 0,
				rowHeaderWidth = showRowHeader ? p2u(flex.rowHeaders.width) : 0,

				breakRows = settings.scaleMode === ScaleMode.ActualSize || settings.scaleMode === ScaleMode.PageWidth,
				breakColumns = settings.scaleMode === ScaleMode.ActualSize,
				zeroColWidth = (rect.width - rect.left) * (1 / scaleFactor), // the width of the leftmost grids
				zeroRowHeight = (rect.height - rect.top) * (1 / scaleFactor), // the height of the topmost grids
				rectWidth = rect.width * (1 / scaleFactor),
				rectHeight = rect.height * (1 / scaleFactor),

				totalHeight = colHeaderHeight,
				totalWidth = rowHeaderWidth,

				// Normally in ActualSize mode we are inserting page breaks before partially visible columns\ rows to display them completely.
				// But there is no page breaks in positioned mode, so we need to omit this to fit the maximum amount of content in a drawing area.
				dontBreakBeforePartiallyVisibleElements = isPositionedMode && (settings.scaleMode == ScaleMode.ActualSize);

			if (breakRows) {
				var visibleRowsCnt = 0;

				ranges.forEach(flex.cells, (row, rng, rIdx, sIdx) => {
					var renderAreaHeight = rowBreaks.length ? rectHeight : zeroRowHeight;

					if (PanelSection.isRenderableRow(row)) {
						var rowHeight = p2u(row.renderHeight);

						visibleRowsCnt++;
						totalHeight += rowHeight;

						if (showColumnHeader || visibleRowsCnt > 1) {
							totalHeight -= this.BorderWidth; // border collapse
						}

						if (totalHeight > renderAreaHeight) {
							if (colHeaderHeight + rowHeight > renderAreaHeight || dontBreakBeforePartiallyVisibleElements) { // current row is too big, break on it
								rowBreaks.push(sIdx);
								totalHeight = colHeaderHeight;
							} else { // break on previous row
								rowBreaks.push(sIdx - 1);
								totalHeight = colHeaderHeight + rowHeight;
							}

							if (showColumnHeader) {
								totalHeight -= this.BorderWidth; // border collapse
							}
						}
					}
				});
			}

			var len = ranges.length() - 1;
			if (len < 0) {
				len = 0;
			}
			if (!rowBreaks.length || (rowBreaks[rowBreaks.length - 1] !== len)) {
				rowBreaks.push(len);
			}

			if (breakColumns) {
				var visibleColumnsCnt = 0;

				for (var i = ranges.leftCol; i <= ranges.rightCol; i++) {
					var col = <Column>flex.columns[i];

					if (col.isVisible) {
						var colWidth = p2u(col.renderWidth),
							renderAreaWidth = colBreaks.length ? rectWidth : zeroColWidth;

						visibleColumnsCnt++;
						totalWidth += colWidth;

						if (showRowHeader || visibleColumnsCnt > 1) {
							totalWidth -= this.BorderWidth; // border collapse
						}

						if (totalWidth > renderAreaWidth) {
							if (rowHeaderWidth + colWidth > renderAreaWidth || dontBreakBeforePartiallyVisibleElements) { // current columns is too big, break on it
								colBreaks.push(i);
								totalWidth = rowHeaderWidth;
							} else { // break on previous column
								colBreaks.push(i - 1);
								totalWidth = rowHeaderWidth + colWidth;
							}

							if (showRowHeader) {
								totalWidth -= this.BorderWidth; // border collapse
							}
						}
					}
				}
			}

			if (!colBreaks.length || (colBreaks[colBreaks.length - 1] !== ranges.rightCol)) {
				colBreaks.push(ranges.rightCol);
			}

			var pages: PdfPageRowRange[] = [],
				flag = false,
				pageCount = 1,
				maxPages = isPositionedMode && (settings.maxPages > 0) ? 1 : settings.maxPages;

			for (var i = 0; i < rowBreaks.length && !flag; i++) {
				for (var j = 0; j < colBreaks.length && !flag; j++, pageCount++) {

					if (!(flag = pageCount > maxPages)) {
						var r = i == 0 ? 0 : rowBreaks[i - 1] + 1,
							c = j == 0 ? ranges.leftCol : colBreaks[j - 1] + 1;

						pages.push(new PdfPageRowRange(ranges.subrange(r, rowBreaks[i] - r + 1, c, colBreaks[j]), j, i));
					}
				}
			}

			return pages;
		}

		private static _getGridRenderer(flex: FlexGrid, range: RowRange, repeatMergedValues: boolean, borderWidth: number, styles: IFlexGridStyle, lastPage: boolean): FlexGridRenderer<FlexGrid> {
			var t = (multirow && (flex instanceof multirow.MultiRow) && MultiRowRenderer) || // MultiRow
				(sheet && (flex instanceof sheet.FlexSheet) && FlexSheetRenderer) || // FlexSheet
				FlexGridRenderer; // Finally a regular FlexGrid

			return new t(flex, range, repeatMergedValues, borderWidth, styles, lastPage);
		}
	}

	class FlexGridRenderer<G extends FlexGrid>  {
		private _flex: G;
		private _borderWidth: number;
		private _lastPage: boolean;

		private _topLeft: PanelSectionRenderer<G>;
		private _rowHeader: PanelSectionRenderer<G>;
		private _columnHeader: PanelSectionRenderer<G>;
		private _cells: PanelSectionRenderer<G>;

		private _bottomLeft: PanelSectionRenderer<G>;
		private _columnFooter: PanelSectionRenderer<G>;

		constructor(flex: G, range: RowRange, repeatMergedValues: boolean, borderWidth: number, styles: IFlexGridStyle, lastPage: boolean) {
			this._flex = flex;
			this._borderWidth = borderWidth;
			this._lastPage = lastPage;

			this._topLeft = new PanelSectionRenderer(this, flex.topLeftCells,
				this.showRowHeader && this.showColumnHeader
					? new RowRange(flex, [new CellRange(0, 0, flex.topLeftCells.rows.length - 1, flex.topLeftCells.columns.length - 1)])
					: new RowRange(flex, []),
				repeatMergedValues,
				borderWidth,
				styles);

			this._rowHeader = new PanelSectionRenderer(this, flex.rowHeaders,
				this.showRowHeader
					? range.clone(0, flex.rowHeaders.columns.length - 1)
					: new RowRange(flex, []),
				repeatMergedValues,
				borderWidth,
				styles);

			this._columnHeader = new PanelSectionRenderer(this, flex.columnHeaders,
				this.showColumnHeader
					? new RowRange(flex, [new CellRange(0, range.leftCol, flex.columnHeaders.rows.length - 1, range.rightCol)])
					: new RowRange(flex, []),
				repeatMergedValues,
				borderWidth,
				styles);

			this._cells = new PanelSectionRenderer(this, flex.cells, range, repeatMergedValues, borderWidth, styles);

			this._bottomLeft = new PanelSectionRenderer(this, flex.bottomLeftCells,
				this.showRowHeader && this.showColumnFooter
					? new RowRange(flex, [new CellRange(0, 0, flex.bottomLeftCells.rows.length - 1, flex.bottomLeftCells.columns.length - 1)])
					: new RowRange(flex, []),
				repeatMergedValues,
				borderWidth,
				styles);

			this._columnFooter = new PanelSectionRenderer(this, flex.columnFooters,
				this.showColumnFooter
					? new RowRange(flex, [new CellRange(0, range.leftCol, flex.columnFooters.rows.length - 1, range.rightCol)])
					: new RowRange(flex, []),
				repeatMergedValues,
				borderWidth,
				styles);
		}

		public render(doc: wijmo.pdf.PdfDocument, settings: IFlexGridDrawSettings) {
			var offsetX = Math.max(0, Math.max(this._topLeft.renderSize.width, this._rowHeader.renderSize.width) - this._borderWidth), // left section width
				offsetY = Math.max(0, Math.max(this._topLeft.renderSize.height, this._columnHeader.renderSize.height) - this._borderWidth); // top section height

			this._topLeft.render(doc, 0, 0, settings);
			this._rowHeader.render(doc, 0, offsetY, settings);
			this._columnHeader.render(doc, offsetX, 0, settings);
			this._cells.render(doc, offsetX, offsetY, settings);

			// bottomLeft + columnFooter
			offsetY = Math.max(0, offsetY + this._cells.renderSize.height - this._borderWidth);
			this._bottomLeft.render(doc, 0, offsetY, settings);
			this._columnFooter.render(doc, offsetX, offsetY, settings);
		}

		public get flex(): G {
			return this._flex;
		}

		public get renderSize(): Size {
			var height = Math.max(this._topLeft.renderSize.height, this._columnHeader.renderSize.height) // top section height
				+ Math.max(this._rowHeader.renderSize.height, this._cells.renderSize.height) // middle section height
				+ Math.max(this._bottomLeft.renderSize.height, this._columnFooter.renderSize.height), // bottom section height

				width = Math.max(this._topLeft.renderSize.width, this._rowHeader.renderSize.width) // left section width
					+ Math.max(this._columnHeader.renderSize.width, this._cells.renderSize.width); // right section width

			if (this._columnHeader.visibleRows > 0) {
				height -= this._borderWidth;
			}

			if (this._columnFooter.visibleRows > 0) {
				height -= this._borderWidth;
			}

			if (this._rowHeader.visibleColumns > 0) {
				width -= this._borderWidth;
			}

			return new Size(width, height);
		}

		public get showColumnHeader(): boolean {
			return !!(this._flex.headersVisibility & HeadersVisibility.Column);
		}

		public get showRowHeader(): boolean {
			return !!(this._flex.headersVisibility & HeadersVisibility.Row);
		}

		public get showColumnFooter(): boolean {
			return this._lastPage && this._flex.columnFooters.rows.length > 0;
		}

		public getCellValue(panel: GridPanel, col: number, row: number): string {
			return panel.getCellData(row, col, true);
		}

		public getColumn(panel: GridPanel, col: number, row: number): Column {
			return panel.columns[col];
		}

		public isAlternatingRow(row: Row): boolean {
			return row.index % 2 != 0;
		}

		public isMergeableCell(col: Column, row: Row): boolean {
			return row.allowMerging || col.allowMerging || row instanceof GroupRow;
		}
	}

	class FlexSheetRenderer extends FlexGridRenderer<sheet.FlexSheet> {
		constructor(flex: sheet.FlexSheet, range: RowRange, repeatMergedValues: boolean, borderWidth: number, styles: IFlexGridStyle, lastPage: boolean) {
			super(flex, range, repeatMergedValues, borderWidth, styles, lastPage);
		}

		//#region override

		public getCellValue(panel: GridPanel, col: number, row: number): string {
			if (panel.cellType === CellType.Cell) {
				// Treat the data row as a column header row 
				if (panel.rows[row] instanceof sheet.HeaderRow) { // will be true for the first row of a data-bound sheet only
					return this.flex.columnHeaders.getCellData(row, col, true);
				}

				return this.flex.getCellValue(row, col, true); // formula evaluation
			}

			return super.getCellValue(panel, col, row);
		}

		// hide all headers\ footers

		public get showColumnHeader(): boolean {
			return false;
		}

		public get showRowHeader(): boolean {
			return false;
		}

		public get showColumnFooter(): boolean {
			return false;
		}

		//#endregion
	}

	class MultiRowRenderer extends FlexGridRenderer<multirow.MultiRow> {
		constructor(multirow: multirow.MultiRow, range: RowRange, repeatMergedValues: boolean, borderWidth: number, styles: IFlexGridStyle, lastPage: boolean) {
			super(multirow, range, repeatMergedValues, borderWidth, styles, lastPage);
		}

		//#region override

		public getColumn(panel: GridPanel, col: number, row: number): Column {
			return this.flex.getBindingColumn(panel, row, col);
		}

		public isAlternatingRow(row: Row): boolean {
			if (row instanceof multirow._MultiRow) {
				return (<multirow._MultiRow>row).dataIndex % 2 != 0;
			}

			return super.isAlternatingRow(row);
		}

		public isMergeableCell(col: Column, row: Row): boolean {
			return true;
		}

		//#endregion
	}

	class PanelSection {
		public static isRenderableRow(row: Row): boolean {
			return row.isVisible && !(row instanceof _NewRowTemplate);
		}

		private _range: RowRange;
		private _panel: GridPanel;

		private _visibleRows: number;
		private _visibleColumns: number;
		private _size: Size;

		constructor(panel: GridPanel, range: RowRange) {
			this._panel = panel;
			this._range = range.clone();
		}

		public get visibleRows(): number {
			if (this._visibleRows == null) {
				this._visibleRows = 0;

				this._range.forEach(this._panel, (row) => {
					if (this.isRenderableRow(row)) {
						this._visibleRows++;
					}
				});
			}

			return this._visibleRows;
		}

		public get visibleColumns(): number {
			if (this._visibleColumns == null) {
				this._visibleColumns = 0;

				if (this._range.isValid) {
					for (var i = this._range.leftCol; i <= this._range.rightCol; i++) {
						if ((<Column>this._panel.columns[i]).isVisible) {
							this._visibleColumns++;
						}
					}
				}
			}

			return this._visibleColumns;
		}

		// pt units
		public get size(): Size {
			if (this._size == null) {
				var sz = this._range.getRenderSize(this._panel);

				this._size = new Size(wijmo.pdf.pxToPt(sz.width), wijmo.pdf.pxToPt(sz.height));
			}

			return this._size;
		}

		public get range(): RowRange {
			return this._range;
		}

		public get panel(): GridPanel {
			return this._panel;
		}

		protected isRenderableRow(row: Row): boolean {
			return PanelSection.isRenderableRow(row);
		}
	}

	class PanelSectionRenderer<G extends FlexGrid> extends PanelSection {
		private _borderWidth: number;
		private _gr: FlexGridRenderer<G>;
		private _renderSize: Size;
		private _repeatMergedValues: boolean;
		private _styles: IFlexGridStyle;

		constructor(gr: FlexGridRenderer<G>, panel: wijmo.grid.GridPanel, range: RowRange, repeatMergedValues: boolean, borderWidth: number, styles: IFlexGridStyle) {
			super(panel, range);
			this._gr = gr;
			this._repeatMergedValues = repeatMergedValues;
			this._borderWidth = borderWidth;
			this._styles = styles;
		}

		public get gr() {
			return this._gr;
		}

		public get styles() {
			return this._styles;
		}

		// pt units
		public get renderSize(): Size {
			if (this._renderSize == null) {
				this._renderSize = this.size.clone();

				if (this.visibleColumns > 1) {
					this._renderSize.width -= this._borderWidth * (this.visibleColumns - 1);
				}

				if (this.visibleRows > 1) {
					this._renderSize.height -= this._borderWidth * (this.visibleRows - 1);
				}
			}

			return this._renderSize;
		}

		public getRangeWidth(leftCol: number, rightCol: number): number {
			var width = 0,
				visibleColumns = 0,
				pnl = this.panel;

			for (var i = leftCol; i <= rightCol; i++) {
				var col = <Column>pnl.columns[i];
				if (col.isVisible) {
					visibleColumns++;
					width += col.renderWidth;
				}
			}

			width = wijmo.pdf.pxToPt(width);

			if (visibleColumns > 1) {
				width -= this._borderWidth * (visibleColumns - 1);
			}

			return width;
		}

		public getRangeHeight(topRow: number, bottomRow: number): number {
			var height = 0,
				visibleRows = 0,
				pnl = this.panel;

			for (var i = topRow; i <= bottomRow; i++) {
				var row = <Row>pnl.rows[i];
				if (this.isRenderableRow(row)) {
					visibleRows++;
					height += row.renderHeight;
				}
			}

			height = wijmo.pdf.pxToPt(height);

			if (visibleRows > 1) {
				height = height - this._borderWidth * (visibleRows - 1);
			}

			return height;
		}

		public render(doc: wijmo.pdf.PdfDocument, x: number, y: number, settings: IFlexGridDrawSettings): void {
			var ranges = this.range,
				pnl = this.panel,
				mngr = new GetMergedRangeProxy(this._gr.flex),
				curCellRange = new CellRange(0, 0, 0, 0),
				cellRenderer = new CellRenderer(this, doc, settings, this._borderWidth);

			if (!ranges.isValid) {
				return;
			}

			var pY: { [key: number]: number } = {}; // tracks the current Y position for each column

			for (var c = ranges.leftCol; c <= ranges.rightCol; c++) {
				pY[c] = y;
			}

			ranges.forEach(pnl, (row, rng, r) => {
				if (!this.isRenderableRow(row)) {
					return;
				}

				var pX = x;

				for (var c = ranges.leftCol; c <= ranges.rightCol; c++) {
					var col = this.gr.getColumn(pnl, c, r),
						height: number = undefined,
						width: number = undefined,
						value: string,
						needRender = false,
						skipC: number = undefined;

					if (!col.isVisible) {
						continue;
					}

					var cellValue = this._getCellValue(c, r),
						mergedRng: CellRangeExt = null;

					if (this.gr.isMergeableCell(col, row) && (mergedRng = mngr.getMergedRange(pnl, r, c))) {
						curCellRange.setRange(mergedRng.topRow, mergedRng.leftCol, mergedRng.bottomRow, mergedRng.rightCol);

						if (mergedRng.topRow !== mergedRng.bottomRow) { // vertical merging
							if (mergedRng.firstVisibleRow /*.topRow*/ === r || r === rng.topRow) { // The very first cell or the remains of the range spreaded between multiple pages
								needRender = true;
								value = this._repeatMergedValues
									? cellValue
									: (mergedRng.firstVisibleRow /*.topRow*/ === r ? cellValue : ''); // set value to the very fist cell of the merged range only
								height = this.getRangeHeight(r, Math.min(mergedRng.bottomRow, rng.bottomRow));
								width = this.getRangeWidth(c, c);
							} else {
								width = this.getRangeWidth(c, c); // an absorbed cell
							}
						} else { // horizontal merging
							// c === mrg.leftCol means the very first cell of the range, otherwise it is the remains of the range spreaded between multiple pages
							needRender = true;
							value = this._repeatMergedValues
								? cellValue
								: (c === mergedRng.leftCol ? cellValue : ''); // set value to the very fist cell of the merged range only
							height = this.getRangeHeight(r, r);
							width = this.getRangeWidth(Math.max(ranges.leftCol, mergedRng.leftCol), Math.min(ranges.rightCol, mergedRng.rightCol));

							// skip absorbed cells until the end of the merged range or page (which comes first)
							skipC = Math.min(ranges.rightCol, mergedRng.rightCol); // to update loop variable later
							for (var t = c + 1; t <= skipC; t++) {
								pY[t] += height - this._borderWidth; // collapse borders
							}
						}
					} else { // an ordinary cell
						curCellRange.setRange(r, c, r, c);

						needRender = true;
						value = cellValue;
						height = this.getRangeHeight(r, r);
						width = this.getRangeWidth(c, c);
					}

					if (needRender) {
						cellRenderer.renderCell(value, row, col, curCellRange, new Rect(pX, pY[c], width, height));
					}

					if (height) {
						pY[c] += height - this._borderWidth; // collapse borders
					}

					if (width) {
						pX += width - this._borderWidth; // collapse borders
					}

					if (skipC) {
						c = skipC;
					}
				}
			});
		}

		private _getCellValue(col: number, row: number): string {
			var pnl = this.panel,
				value = this.gr.getCellValue(pnl, col, row);

			if (!value && pnl.cellType === CellType.Cell) { // then try to get group header text
				var flexRow = <Row>pnl.rows[row];

				// seems that FlexGrid doesn't provide an API for getting group header text, so build it manually
				if (flexRow instanceof GroupRow && flexRow.dataItem && flexRow.dataItem.groupDescription && (col === pnl.columns.firstVisibleIndex)) {
					var propName = flexRow.dataItem.groupDescription.propertyName,
						column = <Column>pnl.columns.getColumn(propName);

					if (column && column.header) {
						propName = column.header;
					}

					value = propName + ': ' + flexRow.dataItem.name + ' (' + flexRow.dataItem.items.length + ' items)';
				}
			}

			return value;
		}
	}

	interface _ICellMeasurements {
		rect: Rect,
		clientRect: Rect,
		contentRect: Rect,
		textRect: Rect
	}

	// Mimics the CSSStyleDeclaration interface
	interface _ICellStyleEx extends ICellStyle {
		borderWidth?: number;
		borderStyle?: string;

		borderLeftColor?: string;
		borderLeftWidth?: number;
		borderLeftStyle?: string;

		borderRightColor?: string;
		borderRightWidth?: number;
		borderRightStyle?: string;

		borderTopColor?: string;
		borderTopWidth?: number;
		borderTopStyle?: string;

		borderBottomColor?: string;
		borderBottomWidth?: number;
		borderBottomStyle?: string;

		boxSizing?: string;

		padding?: number;
		paddingLeft?: number;
		paddingTop?: number;
		paddingBottom?: number;
		paddingRight?: number;

		textAlign?: string;

		verticalAlign?: string;
	}

	class CellRenderer {
		private _pr: PanelSectionRenderer<FlexGrid>;
		private _area: wijmo.pdf.PdfPageArea;
		private _settings: IFlexGridDrawSettings;
		private _borderWidth: number;

		constructor(panelRenderer: PanelSectionRenderer<FlexGrid>, area: wijmo.pdf.PdfPageArea, settings: IFlexGridDrawSettings, borderWidth: number) {
			this._pr = panelRenderer;
			this._area = area;
			this._settings = settings || {};
			this._borderWidth = borderWidth;
		}

		public renderCell(value: string, row: Row, column: Column, rng: CellRange, r: Rect): void {
			var formatEventArgs: PdfFormatItemEventArgs,
				grid = row.grid,
				panel = this._pr.panel,
				getGridCell = () => {
					globCell.style.cssText = '';
					globCell.className = '';
					grid.cellFactory.updateCell(panel, rng.topRow, rng.leftCol, globCell);
					return globCell;
				},
				getComputedCellStyle = (cell: HTMLElement) => {
					cell.className = cell.className.replace('wj-state-selected', '');
					cell.className = cell.className.replace('wj-state-multi-selected', '');
					return window.getComputedStyle(cell); // live object
				},
				customContent = !!this._settings.customCellContent,
				gridCell: HTMLElement = null,
				style: _ICellStyleEx = this._getMergedCellStyle(row);

			if (customContent) {
				gridCell = getGridCell();
			}

			if (customContent) { // use live cell value
				value = gridCell.textContent.trim(); // remove control characters
			}

			if (customContent) { // compute CSS
				var css = getComputedCellStyle(gridCell);
				// change the exported (public) properties only
				style.color = css.color;
				style.backgroundColor = css.backgroundColor;
				style.borderColor = css.borderColor || css.borderRightColor || css.borderBottomColor || css.borderLeftColor || css.borderTopColor;
				style.font = new wijmo.pdf.PdfFont(css.fontFamily, wijmo.pdf._asPt(css.fontSize, true, undefined), css.fontStyle, css.fontWeight);
			}

			// harcoded border styles
			style.boxSizing = 'border-box';
			style.borderWidth = this._borderWidth;
			style.borderStyle = 'solid';

			// horizontal alignment
			if (!(row instanceof GroupRow && !column.aggregate)) {
				style.textAlign = column.getAlignment();
			}

			// add indent
			if (panel.cellType === CellType.Cell && grid.rows.maxGroupLevel >= 0 && rng.leftCol === grid.columns.firstVisibleIndex) {
				var level = (row instanceof GroupRow)
					? Math.max((<GroupRow>row).level, 0) // group row cell
					: grid.rows.maxGroupLevel + 1; // data cell

				var basePadding = wijmo.pdf._asPt(style.paddingLeft || style.padding),
					levelPadding = wijmo.pdf.pxToPt(level * grid.treeIndent);

				style.paddingLeft = basePadding + levelPadding;
			}

			var m = this._measureCell(value, column, row, panel, style, r);

			if (isFunction(this._settings.formatItem)) {
				formatEventArgs = new PdfFormatItemEventArgs(panel, rng, gridCell, this._area,
					m.rect,
					m.contentRect,
					m.textRect.top,
					style,
					() => {
						return gridCell || getGridCell();
					}
				);

				formatEventArgs.data = value;

				this._settings.formatItem(formatEventArgs);

				if (formatEventArgs.data !== value) {
					value = wijmo.asString(formatEventArgs.data);
					m.textRect = this._calculateTextRect(value, column, row, panel, m.contentRect, style);
				}
			}

			this._renderCell(value, row, column, rng, m, style,
				formatEventArgs ? !formatEventArgs.cancel : true,
				formatEventArgs ? !formatEventArgs.cancelBorders : true
			);
		}

		private _renderCell(value: string, row: Row, column: Column, rng: CellRange, m: _ICellMeasurements, style: _ICellStyleEx, renderContent: boolean, renderBorders: boolean) {
			if (!renderContent && !renderBorders) {
				return;
			}

			var panel = this._pr.panel,
				grid = panel.grid;

			if (this._isBooleanCell(value, column, row, panel)) {
				this._renderBooleanCell(value, m, style, renderContent, renderBorders);
			} else {
				this._renderTextCell(value, m, style, renderContent, renderBorders);
			}
		}

		private _getMergedCellStyle(row: Row): ICellStyle {
			var styles = this._pr.styles,
				result: ICellStyle = _merge({}, styles.cellStyle), // merge cell styles
				panel = this._pr.panel;

			switch (panel.cellType) {
				case CellType.Cell:
					if (this._isGroupRow(row)) {
						_merge(result, styles.groupCellStyle, true);
					} else {
						if (this._pr.gr.isAlternatingRow(row)) { // check row.index value; row.index == rowIndex.
							_merge(result, styles.altCellStyle, true);
						}
					}
					break;

				case CellType.ColumnHeader:
				case CellType.RowHeader:
				case CellType.TopLeft:
				case CellType.BottomLeft:
					_merge(result, styles.headerCellStyle, true);
					break;

				case CellType.ColumnFooter:
					_merge(result, styles.headerCellStyle, true);
					_merge(result, styles.footerCellStyle, true);
					break;
			}

			return result;
		}

		private _isBooleanCell(value: string, column: Column, row: Row, panel: GridPanel): boolean {
			return column.dataType === DataType.Boolean && panel.cellType === CellType.Cell && !this._isGroupRow(row) && this._isBoolean(value);
		}

		private _isBoolean(value: any): boolean {
			var lowerCase = wijmo.isString(value) && (<string>value).toLowerCase();
			return lowerCase === 'true' || lowerCase === 'false' || value === true || value === false;
		}

		private _isGroupRow(row: Row): boolean {
			return row instanceof GroupRow && (<GroupRow>row).hasChildren; // Group row with no children should be treated as a data row (hierarchical grid)
		}

		private _measureCell(value: string, column: Column, row: Row, panel: GridPanel, style: _ICellStyleEx, rect: Rect): _ICellMeasurements {
			this._decompositeStyle(style);

			var x = rect.left, //  wijmo.pdf._asPt(style.left),
				y = rect.top, // wijmo.pdf._asPt(style.top),
				height = rect.height, // wijmo.pdf._asPt(style.height),
				width = rect.width, // wijmo.pdf._asPt(style.width),

				brd = this._parseBorder(style),
				blw = brd.left.width,
				btw = brd.top.width,
				bbw = brd.bottom.width,
				brw = brd.right.width,

				pad = this._parsePadding(style),

				// content + padding
				clientHeight = 0,
				clientWidth = 0,

				// content
				contentHeight = 0,
				contentWidth = 0;

			// setup client and content dimensions depending on boxing model.
			if (style.boxSizing === 'content-box' || style.boxSizing === undefined) {
				clientHeight = pad.top + height + pad.bottom;
				clientWidth = pad.left + width + pad.right;

				contentHeight = height;
				contentWidth = width;
			} else {
				if (style.boxSizing === 'border-box') {
					// Browsers are using different approaches to calculate style.width and style.heigth properties. While Chrome and Firefox returns the total size, IE returns the content size only.
					if (wijmo.pdf._IE && (style instanceof CSSStyleDeclaration)) { // content size: max(0, specifiedSizeValue - (padding + border)). Make sure that this code path will not be executed for the human-generated style object.
						clientHeight = pad.top + pad.bottom + height;
						clientWidth = pad.left + pad.right + width;
					} else { // total size: Max(specifiedSizeValue, padding + border)
						clientHeight = height - btw - bbw;
						clientWidth = width - blw - brw;
					}
				} else {
					// padding-box? It is supported by Mozilla only.
					throw 'Invalid value: ' + style.boxSizing;
				}

				contentHeight = clientHeight - pad.top - pad.bottom;
				contentWidth = clientWidth - pad.left - pad.right;
			}

			var rect = new Rect(x, y, width, height),
				clientRect = new Rect(x + blw, y + btw, clientWidth, clientHeight), // rect - borders
				contentRect = new Rect(x + blw + pad.left, y + btw + pad.top, contentWidth, contentHeight), // rect - borders - padding
				textRect = this._calculateTextRect(value, column, row, panel, contentRect, style);

			return {
				rect: rect,
				clientRect: clientRect, // rect - borders
				contentRect: contentRect,
				textRect: textRect
			};
		}

		//	Decomposites some properties to handle the situation when the style was created manually.
		private _decompositeStyle(style: _ICellStyleEx | CSSStyleDeclaration): void {
			if (style) {
				var val: any;

				if (val = style.borderColor) {
					// honor single properties
					if (!style.borderLeftColor) {
						style.borderLeftColor = val;
					}

					if (!style.borderRightColor) {
						style.borderRightColor = val;
					}

					if (!style.borderTopColor) {
						style.borderTopColor = val;
					}

					if (!style.borderBottomColor) {
						style.borderBottomColor = val;
					}
				}

				if (val = style.borderWidth) {
					// honor single properties
					if (!style.borderLeftWidth) {
						style.borderLeftWidth = val;
					}

					if (!style.borderRightWidth) {
						style.borderRightWidth = val;
					}

					if (!style.borderTopWidth) {
						style.borderTopWidth = val;
					}

					if (!style.borderBottomWidth) {
						style.borderBottomWidth = val;
					}
				}

				if (val = style.borderStyle) {
					// honor single properties
					if (!style.borderLeftStyle) {
						style.borderLeftStyle = val;
					}

					if (!style.borderRightStyle) {
						style.borderRightStyle = val;
					}

					if (!style.borderTopStyle) {
						style.borderTopStyle = val;
					}

					if (!style.borderBottomStyle) {
						style.borderBottomStyle = val;
					}
				}

				if (val = style.padding) {
					// honor single properties
					if (!style.paddingLeft) {
						style.paddingLeft = val;
					}

					if (!style.paddingRight) {
						style.paddingRight = val;
					}

					if (!style.paddingTop) {
						style.paddingTop = val;
					}

					if (!style.paddingBottom) {
						style.paddingBottom = val;
					}
				}
			}
		}

		/*
		* Extracts the border values from the CSSStyleDeclaration object.
		*
		* @param style A value to extract from.
		* @return A @see:_IBorder object.
		*/
		private _parseBorder(style: _ICellStyleEx | CSSStyleDeclaration) {
			var borders: {
				left: { width: number, style?: string, color?: string },
				top: { width: number, style?: string, color?: string },
				bottom: { width: number, style?: string, color?: string },
				right: { width: number, style?: string, color?: string }
			} = {
					left: { width: 0 },
					top: { width: 0 },
					bottom: { width: 0 },
					right: { width: 0 }
				};

			if (style.borderLeftStyle !== 'none') {
				borders.left = {
					width: wijmo.pdf._asPt(style.borderLeftWidth),
					style: style.borderLeftStyle,
					color: style.borderLeftColor
				};
			}

			if (style.borderTopStyle !== 'none') {
				borders.top = {
					width: wijmo.pdf._asPt(style.borderTopWidth),
					style: style.borderTopStyle,
					color: style.borderTopColor
				};
			}

			if (style.borderBottomStyle !== 'none') {
				borders.bottom = {
					width: wijmo.pdf._asPt(style.borderBottomWidth),
					style: style.borderBottomStyle,
					color: style.borderBottomColor
				};
			}

			if (style.borderRightStyle !== 'none') {
				borders.right = {
					width: wijmo.pdf._asPt(style.borderRightWidth),
					style: style.borderRightStyle,
					color: style.borderRightColor
				};
			}

			return borders;
		}

		/*
		* Extracts the padding values from the CSSStyleDeclaration object.
		*
		* @param style Value to extract from.
		* @return The @see:IPadding object.
		*/
		private _parsePadding(style: _ICellStyleEx | CSSStyleDeclaration) {
			return {
				left: wijmo.pdf._asPt(style.paddingLeft),
				top: wijmo.pdf._asPt(style.paddingTop),
				bottom: wijmo.pdf._asPt(style.paddingBottom),
				right: wijmo.pdf._asPt(style.paddingRight)
			};
		}

		/*
		* Renders an empty cell.
		*
		* The following CSSStyleDeclaration properties are supported for now:
		*   left, top
		*   width, height
		*   border<Left \ Right\ Top\ Bottom>Style (if 'none' then no border, otherwise a solid border)
		*   border<Left\ Right\ Top\ Bottom>Width,
		*   border<Left\ Right\ Top\ Bottom>Color
		*   backgroundColor
		*   boxSizing (content-box + border-box)
		*   padding<Left\ Top\ Right\ Bottom>
		*   textAlign
		*   fontFamily, fontStyle, fontWeight, fontSize
		*
		* @param style A CSSStyleDeclaration object that represents the cell style and positioning.
		* @return A ICellInfo object that represents information about the cell's content.
		*/
		private _renderEmptyCell(m: _ICellMeasurements, style: _ICellStyleEx , renderContent: boolean, renderBorders: boolean): void {
			var x = m.rect.left,
				y = m.rect.top,

				clientWidth = m.clientRect.width,
				clientHeight = m.clientRect.height,
				height = m.rect.height,
				width = m.rect.width,

				blw = m.clientRect.left - m.rect.left,
				btw = m.clientRect.top - m.rect.top,
				bbw = (m.rect.top + m.rect.height) - (m.clientRect.top + m.clientRect.height),
				brw = (m.rect.left + m.rect.width) - (m.clientRect.left + m.clientRect.width);

			if (renderBorders && (blw || brw || bbw || btw)) {
				var blc = style.borderLeftColor || style.borderColor,
					brc = style.borderRightColor || style.borderColor,
					btc = style.borderTopColor || style.borderColor,
					bbc = style.borderBottomColor || style.borderColor;

				// all borders has the same width and color, draw a rectangle
				if ((blw && btw && bbw && brw) && (blw === brw && blw === bbw && blw === btw) && (blc === brc && blc === bbc && blc === btc)) {
					var border = blw,
						half = border / 2; // use an adjustment because of center border alignment used by PDFKit.

					this._area.paths
						.rect(x + half, y + half, clientWidth + border, clientHeight + border)
						.stroke(new wijmo.pdf.PdfPen(blc, border));

				} else {
					// use a trapeze for each border
					if (blw) {
						this._area.paths
							.polygon([[x, y], [x + blw, y + btw], [x + blw, y + btw + clientHeight], [x, y + btw + clientHeight + bbw]])
							.fill(blc);
					}

					if (btw) {
						this._area.paths
							.polygon([[x, y], [x + blw, y + btw], [x + blw + clientWidth, y + btw], [x + blw + clientWidth + brw, y]])
							.fill(btc);
					}

					if (brw) {
						this._area.paths
							.polygon([[x + blw + clientWidth + brw, y], [x + blw + clientWidth, y + btw], [x + blw + clientWidth, y + btw + clientHeight], [x + blw + clientWidth + brw, y + btw + clientHeight + bbw]])
							.fill(brc);
					}

					if (bbw) {
						this._area.paths
							.polygon([[x, y + btw + clientHeight + bbw], [x + blw, y + btw + clientHeight], [x + blw + clientWidth, y + btw + clientHeight], [x + blw + clientWidth + brw, y + btw + clientHeight + bbw]])
							.fill(bbc);
					}
				}
			}

			// draw background
			if (renderContent && style.backgroundColor && clientWidth > 0 && clientHeight > 0) {
				this._area.paths
					.rect(x + blw, y + btw, clientWidth, clientHeight)
					.fill(style.backgroundColor);
			}
		}

		/*
		* Renders a cell with a checkbox inside.
		*
		* @param value Boolean value.
		* @param style A CSSStyleDeclaration object that represents the cell style and
		* positioning.
		*
		* @return A reference to the document.
		*/
		public _renderBooleanCell(value: boolean | string, m: _ICellMeasurements, style: _ICellStyleEx, renderContent: boolean, renderBorders: boolean): void {
			this._renderEmptyCell(m, style, renderContent, renderBorders);

			if (!renderContent) {
				return;
			}

			var border = 0.5,
				x = m.textRect.left,
				y = m.textRect.top,
				sz = m.textRect.height; 

			// border and content area
			this._area.paths
				.rect(x, y, sz, sz)
				.fillAndStroke(Color.fromRgba(255, 255, 255), new wijmo.pdf.PdfPen(undefined, border));

			// checkmark
			if (wijmo.changeType(value, DataType.Boolean, '') === true) {
				var space = sz / 20,
					cmRectSize = sz - border - space * 2,
					cmLineWidth = sz / 8;

				this._area._pdfdoc.saveState();

				this._area.translate(x + border / 2 + space, y + border / 2 + space)
					.paths
					.moveTo(cmLineWidth / 2, cmRectSize * 0.6)
					.lineTo(cmRectSize - cmRectSize * 0.6, cmRectSize - cmLineWidth)
					.lineTo(cmRectSize - cmLineWidth / 2, cmLineWidth / 2)
					.stroke(new wijmo.pdf.PdfPen(undefined, cmLineWidth))

				this._area._pdfdoc.restoreState();
			}
		}

		/*
		* Renders a cell with a text inside.
		*
		* @param text Text inside the cell.
		* @param style A CSSStyleDeclaration object that represents the cell style and positioning.
		*
		* @return A reference to the document.
		*/
		public _renderTextCell(text: string, m: _ICellMeasurements, style: _ICellStyleEx, renderContent: boolean, renderBorders: boolean): void {
			this._renderEmptyCell(m, style, renderContent, renderBorders);

			if (!renderContent) {
				return;
			}

			if (text) {
				this._area.drawText(text, m.textRect.left, m.textRect.top, {
					brush: style.color,
					font: style.font,  //new wijmo.pdf.PdfFont(style.font.family, style.font.size, style.font.style, style.font.weight),
					height: m.textRect.height,
					width: m.textRect.width,
					align: style.textAlign === 'center'
						? wijmo.pdf.PdfTextHorizontalAlign.Center
						: (style.textAlign === 'right'
							? wijmo.pdf.PdfTextHorizontalAlign.Right
							: (style.textAlign === 'justify'
								? wijmo.pdf.PdfTextHorizontalAlign.Justify
								: wijmo.pdf.PdfTextHorizontalAlign.Left)) // default
				});
			}
		}

		private _calculateTextRect(value: any, column: Column, row: Row, panel: GridPanel, content: Rect, style: _ICellStyleEx): Rect {
			var res = content.clone();

			if (this._isBooleanCell(value, column, row, panel)) {
				var szh = this._area.measureText('A', style.font, { width: Infinity }).size.height;

				switch (style.verticalAlign) {
					case 'middle':
						res.top = content.top + content.height / 2 - szh / 2;
						break;

					case 'bottom':
						res.top = content.top + content.height - szh;
						break;
				}

				switch (style.textAlign) {
					case 'justify':
					case 'center':
						res.left = content.left + content.width / 2 - szh / 2;
						break;

					case 'right':
						res.left = content.left + content.width - szh;
						break;
				}

				res.height = res.width = szh;
			} else {
				if (res.height > 0 && res.width > 0) {
					switch (style.verticalAlign) {
						case 'bottom':
							var sz = this._area.measureText(value, style.font, { height: res.height, width: res.width });

							if (sz.size.height < res.height) {
								res.top += res.height - sz.size.height;
								res.height = sz.size.height;
							}
							break;

						case 'middle':
							var sz = this._area.measureText(value, style.font, { height: res.height, width: res.width });

							if (sz.size.height < res.height) {
								res.top += res.height / 2 - sz.size.height / 2;
								res.height = sz.size.height;
							}
							break;

						default: // 'top'
							break;
					}
				}
			}

			return res;
		}
	}

	// A caching proxy for the flex.getMergedRange method, caches last vertical range for each column.
	class GetMergedRangeProxy {
		private _flex: FlexGrid;
		private _columns: { [key: number]: CellRangeExt } = {};

		constructor(flex: FlexGrid) {
			this._flex = flex;
		}

		public getMergedRange(panel: GridPanel, r: number, c: number): CellRangeExt {
			var rng = this._columns[c];

			if (rng && r >= rng.topRow && r <= rng.bottomRow) {
				return rng;
			} else {
				var mergedRange = this._flex.getMergedRange(panel, r, c, false);
				return this._columns[c] = mergedRange ? new CellRangeExt(panel, mergedRange) : null;
			}
		}
	}

	class CellRangeExt extends CellRange {
		public firstVisibleRow = -1;

		constructor(panel: GridPanel, cr: CellRange) {
			super(cr.row, cr.col, cr.row2, cr.col2);

			var tr = this.topRow,
				br = this.bottomRow;

			// find first visible row
			for (var i = tr; i < br; i++) {
				if ((<Row>panel.rows[i]).isVisible) {
					this.firstVisibleRow = i;
					break;
				}
			}
		}
	}

	class RowRange {
		public static getSelection(flex: FlexGrid, exportMode: ExportMode): RowRange {
			var ranges: CellRange[] = [];

			if (exportMode === ExportMode.All) {
				ranges.push(new CellRange(0, 0, flex.rows.length - 1, flex.columns.length - 1));
			} else {
				var selection = flex.selection;

				switch (flex.selectionMode) {
					case SelectionMode.None:
						break;

					case SelectionMode.Cell:
					case SelectionMode.CellRange:
						ranges.push(selection);
						break;

					case SelectionMode.Row:
						ranges.push(new CellRange(selection.topRow, 0, selection.topRow, flex.cells.columns.length - 1));
						break;

					case SelectionMode.RowRange:
						ranges.push(new CellRange(selection.topRow, 0, selection.bottomRow, flex.cells.columns.length - 1));
						break;

					case SelectionMode.ListBox:
						var top = -1;

						for (var r = 0; r < flex.rows.length; r++) {
							var row = <Row>flex.rows[r];

							if (row.isSelected) {
								if (top < 0) {
									top = r;
								}

								if (r === flex.rows.length - 1) {
									ranges.push(new CellRange(top, 0, r, flex.cells.columns.length - 1));
								}
							} else {
								if (top >= 0) {
									ranges.push(new CellRange(top, 0, r - 1, flex.cells.columns.length - 1));
								}

								top = -1;
							}
						}

						break;
				}
			}

			return new RowRange(flex, ranges);
		}

		private _flex: FlexGrid;
		private _ranges: CellRange[];

		constructor(flex: FlexGrid, ranges: CellRange[]) {
			this._flex = flex;
			this._ranges = ranges || [];
		}

		public length(): number {
			var res = 0;

			for (var i = 0; i < this._ranges.length; i++) {
				var r = this._ranges[i];

				if (r.isValid) {
					res += r.bottomRow - r.topRow + 1;
				}
			}

			return res;
		}

		public get isValid(): boolean {
			return this._ranges.length && this._ranges[0].isValid;
		}

		public get leftCol(): number {
			if (this._ranges.length) {
				return this._ranges[0].leftCol;
			}

			return -1;
		}

		public get rightCol(): number {
			if (this._ranges.length) {
				return this._ranges[0].rightCol;
			}

			return -1;
		}

		public clone(leftCol?: number, rightCol?: number): RowRange {
			var ranges: CellRange[] = [];

			for (var i = 0; i < this._ranges.length; i++) {
				var range = this._ranges[i].clone();

				if (arguments.length > 0) {
					range.col = leftCol;
				}

				if (arguments.length > 1) {
					range.col2 = rightCol;
				}

				ranges.push(range);
			}

			return new RowRange(this._flex, ranges);
		}

		public getRenderSize(panel: GridPanel): Size {
			var res = new Size(0, 0);

			for (var i = 0; i < this._ranges.length; i++) {
				var size = this._ranges[i].getRenderSize(panel);

				res.width = Math.max(res.width, size.width);
				res.height += size.height;
			}

			return res;
		}

		public forEach(panel: GridPanel, fn: (row: Row, range?: CellRange, rowIdx?: number, seqIdx?: number) => void): void {
			var idx = 0;

			for (var i = 0; i < this._ranges.length; i++) {
				var range = this._ranges[i];

				if (range.isValid) {
					for (var j = range.topRow; j <= range.bottomRow; j++) {
						fn(panel.rows[j], range, j, idx++);
					}
				}
			}
		}

		public subrange(from: number, count: number, leftCol?: number, rightCol?: number): RowRange {
			var ranges: CellRange[] = [];

			if (from >= 0 && count > 0) {
				var start = 0,
					end = 0;

				for (var i = 0; i < this._ranges.length && count > 0; i++, start = end + 1) {
					var r = this._ranges[i];

					end = start + (r.bottomRow - r.topRow);

					if (from > end) {
						continue;
					}

					var r1 = (from > start) ? r.topRow + (from - start) : r.topRow,
						r2 = Math.min(r.bottomRow, r1 + count - 1),
						lCol = arguments.length > 2 ? leftCol : r.leftCol,
						rCol = arguments.length > 2 ? rightCol : r.rightCol;

					ranges.push(new CellRange(r1, lCol, r2, rCol));

					count -= r2 - r1 + 1;
				}
			}

			return new RowRange(this._flex, ranges);
		}
	}

	class PdfPageRowRange {
		private _range: RowRange;
		private _col: number;
		private _row: number;

		constructor(range: RowRange, col: number, row: number) {
			this._col = col;
			this._row = row;
			this._range = range;
		}

		get range(): RowRange {
			return this._range;
		}

		get pageCol(): number {
			return this._col;
		}

		get pageRow(): number {
			return this._row;
		}
	}
}
