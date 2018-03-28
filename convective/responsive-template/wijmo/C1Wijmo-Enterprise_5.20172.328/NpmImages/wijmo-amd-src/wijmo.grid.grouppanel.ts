

import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';


import * as wjcSelf from 'wijmo/wijmo.grid.grouppanel';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['grid'] = window['wijmo']['grid'] || {};
window['wijmo']['grid']['grouppanel'] = wjcSelf;

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
 * Extension that provides a drag and drop UI for editing 
 * groups in bound @see:FlexGrid controls.
 */

    'use strict';

    /**
     * The @see:GroupPanel control provides a drag and drop UI for editing 
     * groups in a bound @see:FlexGrid control.
     *
     * It allows users to drag columns from the @see:FlexGrid into the
     * panel and to move groups within the panel. Users may click the
     * group markers in the panel to sort based on the group column or to
     * remove groups.
     *
     * In order to use a @see:GroupPanel, add it to a page that contains a
     * @see:FlexGrid control and set the panel's @see:grid property to the 
     * @see:FlexGrid control. For example:
     *
     * <pre>// create a FlexGrid 
     * var flex = new wijmo.grid.FlexGrid('#flex-grid');
     * flex.itemsSource = getData();
     * // add a GroupPanel to edit data groups
     * var groupPanel = new wijmo.grid.grouppanel.GroupPanel('#group-panel');
     * groupPanel.placeholder = "Drag columns here to create groups.";
     * groupPanel.grid = flex;</pre>
     */
    export class GroupPanel extends wjcCore.Control {

        _g: any;//FlexGrid;                         // grid driving the panel
        _gds: wjcCore.ObservableArray;          // groupDescriptions being edited
        _hideGroupedCols = true;                    // hide columns dragged into the panel
        _maxGroups = 6;                             // maximum number of groups allowed
        _dragCol: wjcGrid.Column;                           // column being dragged from the grid
        _dragMarker: HTMLElement;                   // marker being dragged within the panel
        _divMarkers: HTMLElement;                   // element that contains the group markers
        _divPH: HTMLElement;                        // element that contains the placeholder

        /**
         * Gets or sets the template used to instantiate @see:GroupPanel controls.
         */
        static controlTemplate = '<div style="cursor:default;overflow:hidden;height:100%;width:100%;min-height:1em">' +
            '<div wj-part="div-ph"></div>' +
            '<div wj-part="div-markers"></div>' +
        '</div>';

        /**
         * Initializes a new instance of the @see:GroupPanel class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);

            // check dependencies
            var depErr = 'Missing dependency: GroupPanel requires ';
            wjcCore.assert(wjcGrid != null, depErr + 'wijmo.grid.');

            // instantiate and apply template
            var tpl = this.getTemplate();
            this.applyTemplate('wj-grouppanel wj-control', tpl, {
                _divMarkers: 'div-markers',
                _divPH: 'div-ph'
            });

            // drag-drop events
            var e = this.hostElement;
            this.addEventListener(e, 'dragstart', this._dragStart.bind(this));
            this.addEventListener(e, 'dragover', this._dragOver.bind(this));
            this.addEventListener(e, 'drop', this._drop.bind(this));
            this.addEventListener(e, 'dragend', this._dragEnd.bind(this));

            // click markers to sort/delete groups
            this.addEventListener(e, 'click', this._click.bind(this));

            // apply options
            this.initialize(options);
        }
        /**
         * Gets or sets a value indicating whether the panel hides grouped columns in the owner grid.
         *
         * The @see:FlexGrid displays grouping information in row headers, so it is
         * usually a good idea to hide grouped columns since they display redundant 
         * information.
         */
        get hideGroupedColumns() : boolean {
            return this._hideGroupedCols;
        }
        set hideGroupedColumns(value: boolean) {
            if (value != this._hideGroupedCols) {
                this._hideGroupedCols = wjcCore.asBoolean(value);
            }
        }
        /**
         * Gets or sets the maximum number of groups allowed.
         */
        get maxGroups() : number {
            return this._maxGroups;
        }
        set maxGroups(value: number) {
            if (value != this._maxGroups) {
                this._maxGroups = wjcCore.asNumber(value);
            }
        }
        /**
         * Gets or sets a string to display in the control when it contains no groups.
         */
        get placeholder(): string {
            return this._divPH.textContent;
        }
        set placeholder(value: string) {
            this._divPH.textContent = value;
        }
        /**
         * Gets or sets the @see:FlexGrid that is connected to this @see:GroupPanel.
         *
         * Once a grid is connected to the panel, the panel displays the groups
         * defined in the grid's data source. Users can drag grid columns
         * into the panel to create new groups, drag groups within the panel to 
         * re-arrange the groups, or delete items in the panel to remove the groups.
         */
        get grid(): wjcGrid.FlexGrid {
            return this._g;
        }
        set grid(value: wjcGrid.FlexGrid) {
            value = wjcCore.asType(value, wjcGrid.FlexGrid, true) as wjcGrid.FlexGrid;
            if (value != this._g) {

                // unhook event handlers
                if (this._g) {
                    this._g.draggingColumn.removeHandler(this._draggingColumn);
                    this._g.sortedColumn.removeHandler(this.invalidate);
                    this._g.itemsSourceChanged.removeHandler(this._itemsSourceChanged);
                    this._g.columns.collectionChanged.removeHandler(this._itemsSourceChanged); // TFS 125386
                }

                // update grid property
                this._g = value;

                // attach event handlers
                if (this._g) {
                    this._g.draggingColumn.addHandler(this._draggingColumn, this);
                    this._g.sortedColumn.addHandler(this.invalidate, this);
                    this._g.itemsSourceChanged.addHandler(this._itemsSourceChanged, this);
                    this._g.columns.collectionChanged.addHandler(this._itemsSourceChanged, this); // TFS 125386
                }

                // hook up to groupDescriptions.collectionChanged
                this._itemsSourceChanged(this._g, null);
            }
        }

        // ** overrides

        /**
         * Updates the panel to show the current groups.
         */
        refresh() {
            super.refresh();

            // clear div/state
            this._divMarkers.innerHTML = '';
            this._dragMarker = this._dragCol = null;

            // add groups to div
            if (this._gds) {

                // add markers for each group
                for (var i = 0; i < this._gds.length; i++) {
                    var gd = this._gds[i],
                        panel = this._g.columnHeaders,
                        row = -1,
                        col = -1;

                    // find row and column indices to use when generating the markers (e.g. MultiRow)
                    // but start scanning from the last row to handle merged headers (TFS 251887)
                    //for (var rowIndex = 0; rowIndex < panel.rows.length && col < 0; rowIndex++) {
                    for (var rowIndex = panel.rows.length - 1; rowIndex >= 0 && col < 0; rowIndex--) {
                        for (var colIndex = 0; colIndex < panel.columns.length && col < 0; colIndex++) {
                            var bcol = this._g._getBindingColumn(panel, rowIndex, panel.columns[colIndex]);
                            if (bcol && bcol.binding == gd.propertyName) {
                                col = colIndex;
                                row = rowIndex;
                                break;
                            }
                        }
                    }

                    // generate marker
                    if (col > -1 && row > -1) {

                        // create the marker
                        var mk = document.createElement('div');
                        this._g.cellFactory.updateCell(this._g.columnHeaders, row, col, mk);
                        mk.setAttribute('class', 'wj-cell wj-header wj-groupmarker');
                        wjcCore.setCss(mk, {
                            position: 'static',
                            display: 'inline-block',
                            verticalAlign: 'top', // to remove extra space below the element
                            left: '',
                            top: '',
                            right: '',
                            height: 'auto',
                            width: 'auto'
                        });

                        // remove 'filter' glyph
                        var filter = mk.querySelector('.wj-elem-filter');
                        if (filter) {
                            filter.parentElement.removeChild(filter); // parent may not be 'mk'...
                        }

                        // add 'remove group' glyph
                        var remove = wjcCore.createElement('<span wj-remove="" style="font-weight:normal;cursor:pointer;pointer;padding:12px;padding-right:3px">&times;</span>', mk);

                        // add the marker
                        this._divMarkers.appendChild(mk);
                    }
                }

                // update placeholder visibility
                if (this._divMarkers.children.length > 0) {
                    this._divPH.style.display = 'none';
                    this._divMarkers.style.display = '';
                } else {
                    this._divPH.style.display = '';
                    this._divMarkers.style.display = 'none';
                }
            }
        }

        // ** implementation

        // add a group at a specific position
        _addGroup(col: wjcGrid.Column, e: MouseEvent) {

            // get index where the new group will be inserted
            var index = this._getIndex(e),
                gds = this._gds;

            // remove group in case it's already there
            for (var i = 0; i < gds.length; i++) {
                if (gds[i].propertyName == col.binding) {
                    gds.removeAt(i);
                    if (i < index) {
                        index--;
                    }
                    break;
                }
            }

            // remove last groups until we have room
            for (var i = this.maxGroups - 1; i < gds.length; i++) {
                this._removeGroup(i, gds); // TFS 198128
                if (i < index) {
                    index--;
                }
            }

            // add new descriptor at the right place
            gds.deferUpdate(() => {
                var gd = new wjcCore.PropertyGroupDescription(col.binding);
                gds.insert(index, gd);
            });

            // hide the column
            if (col && this.hideGroupedColumns) {
                col.visible = false;
            }

            // show changes
            this.invalidate();
        }

        // move a group to a new position
        _moveGroup(marker: HTMLElement, e: MouseEvent) {

            // get groups, indices
            var gds = this._gds,
                oldIndex = this._getElementIndex(this._dragMarker),
                newIndex = this._getIndex(e);

            // make the move
            if (newIndex > oldIndex) {
                newIndex--;
            }
            if (newIndex >= this._gds.length) {
                newIndex = this._gds.length;
            }
            if (oldIndex != newIndex) {
                gds.deferUpdate(() => {
                    var gd = gds[oldIndex];
                    gds.removeAt(oldIndex);
                    gds.insert(newIndex, gd);
                });
            }
        }

        // removes a given group
        _removeGroup(index: number, groups = this._gds) {
            var binding = groups[index].propertyName,
                col = this._g.columns.getColumn(binding);

            // remove the group
            groups.removeAt(index);

            // and show the column
            if (col) {
                col.visible = true;
            }
        }

        // gets the index of the marker at a given mouse position
        _getIndex(e: MouseEvent): number {
            var arr = this._divMarkers.children;
            for (var i = 0; i < arr.length; i++) {
                var rc = arr[i].getBoundingClientRect();
                if (e.clientX < rc.left + rc.width / 2) {
                    return i;
                }
            }
            return arr.length;
        }

        // gets an element's index within its parent collection
        _getElementIndex(e: HTMLElement): number {
            if (e && e.parentElement) {
                var arr = e.parentElement.children;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == e) {
                        return i;
                    }
                }
            }
            return -1;
        }

        // ** event handlers

        // save reference to column when the user starts dragging it
        _draggingColumn(s: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) {
            var g = this._g,
                col = g._getBindingColumn(e.panel, e.row, g.columns[e.col]);
            this._dragCol = col.binding ? col : null;
        }

        // refresh markers when user changes the data source
        _itemsSourceChanged(s: wjcGrid.FlexGrid, e: wjcCore.EventArgs) {

            // update event handlers for groupDescriptions changes
            if (this._gds) {
                this._gds.collectionChanged.removeHandler(this._groupsChanged);
            }
            this._gds = null;
            if (this._g.collectionView) {
                this._gds = this._g.collectionView.groupDescriptions;
                this._gds.collectionChanged.addHandler(this._groupsChanged, this);
            }

            // and update the panel now
            this.invalidate();
        }

        // refresh markers when groupDescriptions change
        _groupsChanged(s: any, e: wjcCore.EventArgs) {
            this.invalidate();
        }

        // drag a group marker to a new position
        _dragStart(e) {
            wjcCore._startDrag(e.dataTransfer, 'move');
            this._dragMarker = e.target;
            this._dragCol = null;
        }

        // accept grid columns (add group) or group markers (move group)
        _dragOver(e) {

            // check whether we are dragging a column or a marker
            var valid = this._dragCol || this._dragMarker;

            // if valid, prevent default to allow drop
            if (valid) {
                e.dataTransfer.dropEffect = 'move';
                e.preventDefault();
                e.stopPropagation(); // prevent scrolling on Android
            }
        }

        // accept grid columns (add group) or group markers (move group)
        _drop(e: MouseEvent) {
            if (this._dragMarker) {
                this._moveGroup(this._dragMarker, e);
            } else if (this._dragCol) {
                this._addGroup(this._dragCol, e);
            }
        }

        // finish dragging process
        _dragEnd(e) {
             this._dragMarker = this._dragCol = null;
        }

        // click markers to sort/delete groups
        _click(e) {

            // get the element that was clicked
            var element = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;

            // check for remove group glyph
            var remove = element.getAttribute('wj-remove') != null;

            // get marker
            var marker = element;
            while (marker.parentElement && !wjcCore.hasClass(marker, 'wj-cell')) {
                marker = marker.parentElement;
            }

            // if we got the marker, remove group or flip sort
            if (wjcCore.hasClass(marker, 'wj-cell')) {
                var index = this._getElementIndex(marker),
                    cv = this._g.collectionView,
                    sds = cv.sortDescriptions;
                if (remove) { // remove group
                    this._removeGroup(index);
                } else if (e.ctrlKey) { // remove sort
                    sds.clear();
                    this.invalidate();
                } else { // flip sort
                    var gd = this._gds[index],
                        asc = true;
                    for (var i = 0; i < sds.length; i++) {
                        if (sds[i].property == gd.propertyName) {
                            asc = !sds[i].ascending;
                            break;
                        }
                    }
                    var sd = new wjcCore.SortDescription(gd.propertyName, asc);
                    sds.splice(0, sds.length, sd);
                    this.invalidate();
                }
            }
        }
    }


