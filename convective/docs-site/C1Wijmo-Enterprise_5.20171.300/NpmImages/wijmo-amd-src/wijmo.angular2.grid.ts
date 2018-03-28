

import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';
import * as wjcInput from 'wijmo/wijmo.input';

function tryGetModuleWijmoInput(): typeof wjcInput {
    let m1;
    return (m1 = window['wijmo']) && m1['input'];
}


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


///<wijmo-soft-import from="wijmo.input"/>

/**
* Contains Angular 2 components for the <b>wijmo.grid</b> module.
*
* <b>wijmo.angular2.grid</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>&lt;p&gt;Here is a data bound FlexGrid control with four columns:&lt;/p&gt;
* &lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;wj-flex-grid-column 
*     [header]="'Country'" 
*     [binding]="'country'"&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column 
*     [header]="'Sales'" 
*     [binding]="'sales'"&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column 
*     [header]="'Expenses'" 
*     [binding]="'expenses'"&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column 
*     [header]="'Downloads'" 
*     [binding]="'downloads'"&gt;
*   &lt;/wj-flex-grid-column&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid'/>


import { Component, EventEmitter, NgModule, AfterViewInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ElementRef, Injector, Directive, ViewContainerRef, TemplateRef, Optional, forwardRef, Renderer } from '@angular/core';
import { Input, Output, Injectable, Inject, OnInit, OnChanges, OnDestroy, AfterContentInit, SimpleChange, 
    ChangeDetectorRef, SkipSelf } from '@angular/core';
import { ChangeDetectionStrategy, Type, ViewEncapsulation, ComponentFactory, TypeDecorator } from '@angular/core';
import * as ngCore from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { WjDirectiveBehavior, WjDirectiveBaseModule, WjValueAccessorFactory, IWjComponentMetadata,
    IWjComponentMeta, IWjDirectiveMeta } from 'wijmo/wijmo.angular2.directiveBase';





export var wjFlexGridMeta: IWjComponentMeta = {
    selector: 'wj-flex-grid',
    template: `<div><ng-content></ng-content></div>`,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.grid.FlexGrid control.
 *
 * Use the <b>wj-flex-grid</b> component to add <b>FlexGrid</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>. For example:
 *
 * <pre>&lt;p&gt;Here is a data bound FlexGrid control with four columns:&lt;/p&gt;
 * &lt;wj-flex-grid [itemsSource]="data"&gt;
 *   &lt;wj-flex-grid-column 
 *     [header]="'Country'" 
 *     [binding]="'country'"&gt;
 *   &lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-column 
 *     [header]="'Sales'" 
 *     [binding]="'sales'"&gt;
 *   &lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-column 
 *     [header]="'Expenses'" 
 *     [binding]="'expenses'"&gt;
 *   &lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-column 
 *     [header]="'Downloads'" 
 *     [binding]="'downloads'"&gt;
 *   &lt;/wj-flex-grid-column&gt;
 * &lt;/wj-flex-grid&gt;</pre> 
 *

 * The <b>WjFlexGrid</b> component is derived from the <b>FlexGrid</b> control and
 * inherits all its properties, events and methods.
 * The following properties are not available for binding in templates:
 * <b>scrollPosition</b>, <b>selection</b> and <b>columnLayout</b> properties. 
 * 
 * The <b>wj-flex-grid</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.grid.detail.WjFlexGridDetail
 * , @see:wijmo/wijmo.angular2.grid.filter.WjFlexGridFilter
 * , @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn
 *  and @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate.
*/
@Component({
    selector: wjFlexGridMeta.selector,
    template: wjFlexGridMeta.template,
    inputs: wjFlexGridMeta.inputs,
    outputs: wjFlexGridMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexGrid)},
        ...wjFlexGridMeta.providers
    ]
})
export class WjFlexGrid extends wjcGrid.FlexGrid implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexGridMeta.outputs,
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is ''.
     */
    wjModelProperty: string;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>beginningEdit</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>beginningEdit</b> Wijmo event name.
     */
    beginningEditNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>cellEditEnded</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>cellEditEnded</b> Wijmo event name.
     */
    cellEditEndedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>cellEditEnding</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>cellEditEnding</b> Wijmo event name.
     */
    cellEditEndingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>prepareCellForEdit</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>prepareCellForEdit</b> Wijmo event name.
     */
    prepareCellForEditNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
     */
    formatItemNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>resizingColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>resizingColumn</b> Wijmo event name.
     */
    resizingColumnNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>resizedColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>resizedColumn</b> Wijmo event name.
     */
    resizedColumnNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>autoSizingColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>autoSizingColumn</b> Wijmo event name.
     */
    autoSizingColumnNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>autoSizedColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>autoSizedColumn</b> Wijmo event name.
     */
    autoSizedColumnNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>draggingColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>draggingColumn</b> Wijmo event name.
     */
    draggingColumnNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>draggingColumnOver</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>draggingColumnOver</b> Wijmo event name.
     */
    draggingColumnOverNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>draggedColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>draggedColumn</b> Wijmo event name.
     */
    draggedColumnNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>sortingColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>sortingColumn</b> Wijmo event name.
     */
    sortingColumnNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>sortedColumn</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>sortedColumn</b> Wijmo event name.
     */
    sortedColumnNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>resizingRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>resizingRow</b> Wijmo event name.
     */
    resizingRowNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>resizedRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>resizedRow</b> Wijmo event name.
     */
    resizedRowNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>autoSizingRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>autoSizingRow</b> Wijmo event name.
     */
    autoSizingRowNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>autoSizedRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>autoSizedRow</b> Wijmo event name.
     */
    autoSizedRowNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>draggingRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>draggingRow</b> Wijmo event name.
     */
    draggingRowNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>draggingRowOver</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>draggingRowOver</b> Wijmo event name.
     */
    draggingRowOverNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>draggedRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>draggedRow</b> Wijmo event name.
     */
    draggedRowNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>deletingRow</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>deletingRow</b> Wijmo event name.
     */
    deletingRowNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>loadingRows</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>loadingRows</b> Wijmo event name.
     */
    loadingRowsNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>loadedRows</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>loadedRows</b> Wijmo event name.
     */
    loadedRowsNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rowEditStarting</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rowEditStarting</b> Wijmo event name.
     */
    rowEditStartingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rowEditStarted</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rowEditStarted</b> Wijmo event name.
     */
    rowEditStartedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rowEditEnding</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rowEditEnding</b> Wijmo event name.
     */
    rowEditEndingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rowEditEnded</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rowEditEnded</b> Wijmo event name.
     */
    rowEditEndedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rowAdded</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rowAdded</b> Wijmo event name.
     */
    rowAddedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>groupCollapsedChanged</b> Wijmo event name.
     */
    groupCollapsedChangedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>groupCollapsedChanging</b> Wijmo event name.
     */
    groupCollapsedChangingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>itemsSourceChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>itemsSourceChanged</b> Wijmo event name.
     */
    itemsSourceChangedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectionChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectionChanging</b> Wijmo event name.
     */
    selectionChangingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
     */
    selectionChangedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>scrollPositionChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>scrollPositionChanged</b> Wijmo event name.
     */
    scrollPositionChangedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>updatingView</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>updatingView</b> Wijmo event name.
     */
    updatingViewNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>updatedView</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>updatedView</b> Wijmo event name.
     */
    updatedViewNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>updatingLayout</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>updatingLayout</b> Wijmo event name.
     */
    updatingLayoutNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>updatedLayout</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>updatedLayout</b> Wijmo event name.
     */
    updatedLayoutNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>pasting</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>pasting</b> Wijmo event name.
     */
    pastingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>pasted</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>pasted</b> Wijmo event name.
     */
    pastedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>pastingCell</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>pastingCell</b> Wijmo event name.
     */
    pastingCellNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>pastedCell</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>pastedCell</b> Wijmo event name.
     */
    pastedCellNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>copying</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>copying</b> Wijmo event name.
     */
    copyingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>copied</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>copied</b> Wijmo event name.
     */
    copiedNg = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any, 
            @Inject(ChangeDetectorRef) cdRef: ChangeDetectorRef) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        
        new DirectiveCellFactory(this, cdRef);
        //TBD: patch: default row height, remove after the issue will be fixed in grid
        this.deferUpdate(() => {
            if (this.rows.defaultSize < 10) {
                let e = this.hostElement,
                    csh = getComputedStyle(e),
                    csb = getComputedStyle(document.body),
                    defRowHei = parseInt(csh.fontSize && wjcCore.contains(document.body, e) ? csh.fontSize : csb.fontSize) * 2;
                this.rows.defaultSize = defRowHei;
                this.columns.defaultSize = defRowHei * 4;
                this.columnHeaders.rows.defaultSize = defRowHei;
                this.rowHeaders.columns.defaultSize = Math.round(defRowHei * 1.25);
            }
        });
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjFlexGridColumnMeta: IWjComponentMeta = {
    selector: 'wj-flex-grid-column',
    template: `<div><ng-content></ng-content></div>`,
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
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.grid.Column control. 
 * 
 * The <b>wj-flex-grid-column</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
 *
 * Use the <b>wj-flex-grid-column</b> component to add <b>Column</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
* The <b>WjFlexGridColumn</b> component is derived from the <b>Column</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-grid-column</b> component may contain a @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate child directive.
*/
@Component({
    selector: wjFlexGridColumnMeta.selector,
    template: wjFlexGridColumnMeta.template,
    inputs: wjFlexGridColumnMeta.inputs,
    outputs: wjFlexGridColumnMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexGridColumn)},
        ...wjFlexGridColumnMeta.providers
    ]
})
export class WjFlexGridColumn extends wjcGrid.Column implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexGridColumnMeta.outputs,
        changeEvents: {
            'grid.selectionChanged': ['isSelected']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Gets or sets a name of a property that this component is assigned to. 
     * Default value is 'columns'.
     */
    wjProperty: string = 'columns';
    isSelectedChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super();
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        
        let gridCmp = <wjcGrid.FlexGrid>behavior.parentBehavior.directive;
        if (gridCmp.autoGenerateColumns) {
            gridCmp.autoGenerateColumns = false;
            gridCmp.columns.clear();
        }
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}


/**
* Angular 2 directive for the @see:FlexGrid cell templates.
*
* The <b>wjFlexGridCellTemplate</b> directive defines a template for a certain
* cell type in @see:FlexGrid. The template should be defined on a <b>&lt;template&gt;</b> element
* and must contain a <b>cellType</b> attribute that
* specifies the @see:wijmo/wijmo.angular2.grid.CellTemplateType. Depending on the template's cell type,
* the <b>&lt;template&gt;</b> element with the <b>wjFlexGridCellTemplate</b> directive must be a child
* of either @see:wijmo/wijmo.angular2.grid.WjFlexGrid
* or @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn directives.
*
* Column-specific cell templates must be contained in <b>wj-flex-grid-column</b>
* components, and cells that are not column-specific (like row header or top left cells)
* must be contained in the <b>wj-flex-grid</b> component.
*
* The <b>&lt;template&gt;</b> element with the <b>wjFlexGridCellTemplate</b> directive
* may contain an arbitrary HTML fragment with Angular 2 interpolation expressions and
* other components and directives.
*
* Bindings in HTML fragment can use the <b>cell</b> local template variable containing the cell context object, 
* with <b>col</b>, <b>row</b>, and <b>item</b> properties that refer to the @see:Column,
* @see:Row, and <b>Row.dataItem</b> objects pertaining to the cell.
*
* For cell types like <b>Group</b> and <b>CellEdit</b>, an additional <b>value</b> 
* property containing an unformatted cell value is provided. For example, here is a 
* @see:FlexGrid control with templates for row header cells and, regular
* and column header cells of the Country column:
*
* <pre>import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjGrid.WjFlexGridColumn, wjGrid.WjFlexGridCellTemplate],
*     template: `
* &lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeader'" let-cell="cell"&gt;
*     {&#8203;{cell.row.index}}
*   &lt;/template&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
*     ...
*   &lt;/template&gt;
* &nbsp;
*   &lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
*     &lt;template wjFlexGridCellTemplate [cellType]="'ColumnHeader'" let-cell="cell"&gt;
*       &lt;img src="resources/globe.png" /&gt;
*         {&#8203;{cell.col.header}}
*     &lt;/template&gt;
*     &lt;template wjFlexGridCellTemplate [cellType]="'Cell'" let-cell="cell"&gt;
*       &lt;img src="resources/{&#8203;{cell.item.country}}.png" /&gt;
*       {&#8203;{cell.item.country}}
*     &lt;/template&gt;
*   &lt;/wj-flex-grid-column&gt;
*   &lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'"&gt;&lt;/wj-flex-grid-column&gt;
* &lt;/wj-flex-grid&gt;
* `,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
* For more detailed information on specific cell type templates, refer to the 
* documentation for @see:wijmo/wijmo.angular2.grid.CellTemplateType enumeration.
*
* The <b>wjFlexGridCellTemplate</b> directive supports the following attributes:
*
* <dl class="dl-horizontal">
*   <dt>cellType</dt>
*   <dd>
*     The <b>CellTemplateType</b> value defining the type of cell to which the template is applied. 
*   </dd>
*   <dt>cellOverflow</dt>
*   <dd>
*     Defines the <b>style.overflow</b> property value for cells.
*   </dd>
* </dl>
*
* The <b>cellType</b> attribute takes any of the following enumerated values:
*
* <b>Cell</b>
*
* Defines a regular (data) cell template. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
* For example, this cell template shows flags in the cells of Country column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'Cell'" let-cell="cell"&gt;
*     &lt;img src="resources/{&#8203;{cell.item.country}}.png" /&gt;
*     {&#8203;{cell.item.country}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* If <b>Group</b> template is not provided for a hierarchical @see:FlexGrid (that is, one with the <b>childItemsPath</b> property 
* specified), non-header cells in group rows of 
* this @see:Column also use this template.
*
* <b>CellEdit</b>
*
* Defines a template for a cell in edit mode. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
* This cell type has an additional <b>cell.value</b> property available for binding. It contains the
* original cell value before editing, and the updated value after editing.

* For example, here is a template that uses the Wijmo @see:InputNumber control as an editor
* for the "Sales" column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'CellEdit'"&gt;
*     &lt;wj-input-number [(value)]="cell.value" [step]="1"&gt;&lt;/wj-input-number&gt;
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>ColumnHeader</b>
*
* Defines a template for a column header cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
* For example, this template adds an image to the header of the "Country" column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'ColumnHeader'" let-cell="cell"&gt;
*     &lt;img src="resources/globe.png" /&gt;
*       {&#8203;{cell.col.header}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>RowHeader</b>
*
* Defines a template for a row header cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
* For example, this template shows row indices in the row headers:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeader'" let-cell="cell"&gt;
*     {&#8203;{cell.row.index + 1}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* Note that this template is applied to a row header cell, even if it is in a row that is 
* in edit mode. In order to provide an edit-mode version of a row header cell with alternate 
* content, define the <b>RowHeaderEdit</b> template.
*
* <b>RowHeaderEdit</b>
*
* Defines a template for a row header cell in edit mode. Must be a child of the 
* @see:wijmo/wijmo.angular2.grid.WjFlexGrid component. For example, this template shows dots in the header
* of rows being edited:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
*     ...
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* Use the following <b>RowHeaderEdit</b> template to add the standard edit-mode indicator to cells where the <b>RowHeader</b> template 
* applies:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
*     {&#8203;{&amp;#x270e;}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* <b>TopLeft</b>
*
* Defines a template for the top left cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
* For example, this template shows a down/right glyph in the top-left cell of the grid:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'TopLeft'"&gt;
*     &lt;span class="wj-glyph-down-right"&gt;&lt;/span&gt;
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* <b>GroupHeader</b>
*
* Defines a template for a group header cell in a @see:GroupRow, Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
*
* The <b>cell.row</b> property contains an instance of the <b>GroupRow</b> class. If the grouping comes 
* from @see:CollectionView, the <b>cell.item</b> property references the @see:CollectionViewGroup object.
*
* For example, this template uses a checkbox element as an expand/collapse toggle:
*
* <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'GroupHeader'" let-cell="cell"&gt;
*     &lt;input type="checkbox" [(ngModel)]="cell.row.isCollapsed"/&gt; 
*     {&#8203;{cell.item.name}} ({&#8203;{cell.item.items.length}} items)
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>Group</b>
*
* Defines a template for a regular cell (not a group header) in a @see:GroupRow. Must be a child of the 
* @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component. This cell type has an additional <b>cell.value</b> property available for
* binding. In cases where columns have the <b>aggregate</b> property specified, it contains the unformatted 
* aggregate value.
*
* For example, this template shows aggregate's value and kind for group row cells in the "Sales"
* column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'" [aggregate]="'Avg'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'Group'" let-cell="cell"&gt;
*     Average: {&#8203;{cell.value | number:'1.0-0'}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>ColumnFooter</b>
*
* Defines a template for a regular cell in a <b>columnFooters</b> panel. Must be a child of the
* @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component. This cell type has an additional <b>cell.value</b>
* property available for binding that contains a cell value.
*
* For example, this template shows aggregate's value and kind for a footer cell in the "Sales"
* column:
*
* <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'" [aggregate]="'Avg'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'ColumnFooter'" let-cell="cell"&gt;
*     Average: {&#8203;{cell.value | number:'1.0-0'}}
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>BottomLeft</b>
*
* Defines a template for the bottom left cells (at the intersection of the row header and column footer cells).
* Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
* For example, this template shows a sigma glyph in the bottom-left cell of the grid:
*
* <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'BottomLeft'"&gt;
*     &amp;#931;
*   &lt;/template&gt;
* &lt;/wj-flex-grid&gt;</pre>
*
* <b>NewCellTemplate</b>
* 
* Defines a cell in a new row template. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
* Note that the <b>cell.item</b> property is undefined for this type of a cell.
* For example, this cell template shows a placeholder in the Date column's cell in the "new row" item:
*
* <pre>&lt;wj-flex-grid-column [header]="'Date'" [binding]="'date'"&gt;
*   &lt;template wjFlexGridCellTemplate [cellType]="'NewCellTemplate'"&gt;
*     Enter a date here
*   &lt;/template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*/
@Directive({
    selector: '[wjFlexGridCellTemplate]',
    inputs: ['wjFlexGridCellTemplate', 'cellTypeStr: cellType', 'cellOverflow', 'valuePaths',
        'autoSizeRows'],
    exportAs: 'wjFlexGridCellTemplate',
	providers: [{ provide: 'WjComponent', useExisting: forwardRef(() => WjFlexGridCellTemplate)}]
})
export class WjFlexGridCellTemplate implements ngCore.OnInit, ngCore.OnDestroy {
    wjFlexGridCellTemplate: any;
    cellTypeStr: string;
    cellOverflow: string;
    cellType: CellTemplateType;
    // name-path pairs, paths relative to the object in the 'cell' template variable.
    valuePaths: Object;
    autoSizeRows = true;
    grid: WjFlexGrid;
    column: WjFlexGridColumn;
    // column or grid
    ownerControl: any;

        constructor( @Inject(ViewContainerRef) public viewContainerRef: ViewContainerRef,
            @Inject(TemplateRef) @Optional() public templateRef: TemplateRef<any>,
            @Inject(ElementRef) public elRef: ElementRef,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any,
            @Inject(Renderer) private domRenderer: Renderer,
            @Inject(Injector) injector: Injector,
            @Inject(ChangeDetectorRef) public cdRef: ChangeDetectorRef) {

            if (parentCmp instanceof WjFlexGrid) {
                this.grid = parentCmp;
            } else if (parentCmp instanceof WjFlexGridColumn) {
                this.column = parentCmp;
                this.grid = <WjFlexGrid>WjDirectiveBehavior.getBehavior(parentCmp).parentBehavior.directive;
            }
    }

    // returns the name of the property on control instance that stores info for the specified cell template type.
    static _getTemplContextProp(templateType: CellTemplateType) {
        return '$__cellTempl' + CellTemplateType[templateType];
    }

    ngOnInit() {
        this.ownerControl = this.column && this.column.grid === this.grid ? this.column : this.grid;
        this._attachToControl();
    }

    ngOnDestroy() {
        if (this.cellTypeStr) {
            this.viewContainerRef.clear();
            this.ownerControl[WjFlexGridCellTemplate._getTemplContextProp(this.cellType)] = null;
            this.grid.invalidate();
        }
    }

    public _instantiateTemplate(parent: HTMLElement): { viewRef: ngCore.EmbeddedViewRef<any>, rootElement: Element } {
        return WjDirectiveBehavior.instantiateTemplate(parent, this.viewContainerRef, this.templateRef,
            this.domRenderer);
    }


    private _attachToControl(): void {
        if (!this.cellTypeStr) {
            return;
        }

        this.cellType = <CellTemplateType>wjcCore.asEnum(<any>this.cellTypeStr, CellTemplateType);
        this.ownerControl[WjFlexGridCellTemplate._getTemplContextProp(this.cellType)] = this;
        this.grid.invalidate();
    }

}

/**
* Defines the type of cell on which a template is to be applied. This value is specified in the <b>cellType</b> attribute 
* of the @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate directive.
*/
export enum CellTemplateType {
    /** Defines a regular (data) cell. */
    Cell,
    /** Defines a cell in edit mode. */
    CellEdit,
    /** Defines a column header cell. */
    ColumnHeader,
    /** Defines a row header cell. */
    RowHeader,
    /** Defines a row header cell in edit mode. */
    RowHeaderEdit,
    /** Defines a top left cell. */
    TopLeft,
    /** Defines a group header cell in a group row. */
    GroupHeader,
    /** Defines a regular cell in a group row. */
    Group,
    /** Defines a cell in a new row template. */
    NewCellTemplate,
    /** Defines a column footer cell. */
    ColumnFooter,
    /** Defines a bottom left cell (at the intersection of the row header and column footer cells). **/
    BottomLeft

}

interface _ICellTemplateCache {
    column?: wjcGrid.Column;
    viewRef: ngCore.EmbeddedViewRef<any>;
    rootElement: Element;
    templateContextProperty: string;
}


class DirectiveCellFactory extends wjcGrid.CellFactory {
    // Array of string members of the CellTemplateType enum.
    private static _templateTypes: string[];
    private static _cellStampProp = '__wjCellStamp';

    public grid: wjcGrid.FlexGrid;

    private _baseCf: wjcGrid.CellFactory;
    private _gridCdRef: ChangeDetectorRef;
    private _needsCdCheck = false;

    private _closingApplyTimeOut;
    private _lastApplyTimeStamp = 0;
    private _noApplyLag = false;
    private _editChar: string;
    private _startingEditing = false;
    private _evtInput: any;
    private _evtBlur: any;
    private _cellStampCounter = 0;
    private _cellEditorVars;


    constructor(grid: wjcGrid.FlexGrid, gridCdRef: ChangeDetectorRef) {
        super();
        this.grid = grid;
        this._gridCdRef = gridCdRef;

        // init _templateTypes
        if (!DirectiveCellFactory._templateTypes) {
            DirectiveCellFactory._templateTypes = [];
            for (var templateType in CellTemplateType) {
                if (isNaN(<any>templateType)) {
                    DirectiveCellFactory._templateTypes.push(templateType);
                }
            }
        }

        var self = this;
        this._baseCf = grid.cellFactory;
        grid.cellFactory = this;

        // initialize input event dispatcher
        this._evtInput = document.createEvent('HTMLEvents');
        this._evtInput.initEvent('input', true, false);
        // initialize blur event dispatcher
        this._evtBlur = document.createEvent('HTMLEvents');
        this._evtBlur.initEvent('blur', false, false);

        // no $apply() lag while editing
        grid.prepareCellForEdit.addHandler(function (s, e) {
            self._noApplyLag = true;
        });
        grid.cellEditEnded.addHandler(function (s, e: wjcGrid.CellRangeEventArgs) {
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
                } else if (self._editChar) {
                    self._editChar += char;
                }
            }
        }, true);

        // If host component uses OnPush change detection, we need to markForCheck; otherwise,
        // cell template bindings will not be updated.
        grid.updatedView.addHandler(() => {
            if (this._needsCdCheck) {
                this._needsCdCheck = false;
                this._gridCdRef.markForCheck();
            }
        }, this);
    }

    public updateCell(panel: wjcGrid.GridPanel, rowIndex: number, colIndex: number, cell: HTMLElement, rng?: wjcGrid.CellRange) {

        this._cellStampCounter = (this._cellStampCounter + 1) % 10000000;
        let cellStamp = cell[DirectiveCellFactory._cellStampProp] = this._cellStampCounter;

        // restore overflow for any cell
        if (cell.style.overflow) {
            cell.style.overflow = '';
        }

        var self = this,
            grid = <wjcGrid.FlexGrid>panel.grid,
            editRange = grid.editRange,
            templateType: CellTemplateType,
            row = <wjcGrid.Row>panel.rows[rowIndex],
            dataItem = row.dataItem,
            isGridCtx = false,
            needCellValue = false,
            isEdit = false,
            isCvGroup = false;

            // determine template type
            switch (panel.cellType) {
                case wjcGrid.CellType.Cell:
                    if (editRange && editRange.row === rowIndex && editRange.col === colIndex) {
                        templateType = CellTemplateType.CellEdit;
                        needCellValue = isEdit = true;
                    } else if (row instanceof wjcGrid.GroupRow) {
                        isCvGroup = dataItem instanceof wjcCore.CollectionViewGroup;
                        var isHierNonGroup = !(isCvGroup || (<wjcGrid.GroupRow>row).hasChildren);
                        if (colIndex == panel.columns.firstVisibleIndex) {
                            templateType = isHierNonGroup ? CellTemplateType.Cell : CellTemplateType.GroupHeader;
                        } else {
                            templateType = isHierNonGroup ? CellTemplateType.Cell : CellTemplateType.Group;
                            needCellValue = true;
                        }
                    } else if (row instanceof wjcGrid._NewRowTemplate) {
                        templateType = CellTemplateType.NewCellTemplate;
                    } else if (!(wjcGrid['detail'] && wjcGrid['detail'].DetailRow &&
                        (row instanceof wjcGrid['detail'].DetailRow))) {
                        templateType = CellTemplateType.Cell;
                    }
                    break;
                case wjcGrid.CellType.ColumnHeader:
                    templateType = CellTemplateType.ColumnHeader;
                    break;
                case wjcGrid.CellType.RowHeader:
                    templateType = grid.collectionView &&
                        (<wjcCore.IEditableCollectionView>grid.collectionView).currentEditItem === dataItem
                        ? CellTemplateType.RowHeaderEdit
                        : CellTemplateType.RowHeader;
                    isGridCtx = true;
                    break;
                case wjcGrid.CellType.TopLeft:
                    templateType = CellTemplateType.TopLeft;
                    isGridCtx = true;
                    break;
                case wjcGrid.CellType.ColumnFooter:
                    templateType = CellTemplateType.ColumnFooter;
                    needCellValue = true;
                    break;
                case wjcGrid.CellType.BottomLeft:
                    templateType = CellTemplateType.BottomLeft;
                    isGridCtx = true;
                    break;
            }

        var isUpdated = false;

        if (templateType != null) {

            var col = <wjcGrid.Column>(isCvGroup && templateType == CellTemplateType.GroupHeader ?
                grid.columns.getColumn(dataItem.groupDescription['propertyName']) :
                (colIndex >= 0 && colIndex < panel.columns.length ? panel.columns[colIndex] : null));

            if (col) {
                var templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType),
                    templContext = <WjFlexGridCellTemplate>(isGridCtx ? <any>grid : <any>col)[templContextProp];

                // maintain template inheritance
                if (!templContext) {
                    if (templateType === CellTemplateType.RowHeaderEdit) {
                        templateType = CellTemplateType.RowHeader;
                        templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType);
                        templContext = grid[templContextProp];
                    } else if (templateType === CellTemplateType.Group || templateType === CellTemplateType.GroupHeader) {
                        if (!isCvGroup) {
                            templateType = CellTemplateType.Cell;
                            templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType);
                            templContext = col[templContextProp];
                        }
                    }
                }

                if (templContext) {
                    // apply directive template and style
                    var isTpl = true,
                        cellValue;
                    if (needCellValue) {
                        cellValue = panel.getCellData(rowIndex, colIndex, false);
                    }

                    // apply cell template
                    if (isTpl) {

                            isUpdated = true;
                            let measureAttr = cell.getAttribute(wjcGrid.FlexGrid._WJS_MEASURE),
                                isMeasuring = measureAttr && measureAttr.toLowerCase() === 'true';

                        if (isEdit) {
                            this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng, true);
                        }

                        // if this is false then we can't reuse previously cached scope and linked tree.
                        var cellContext = <_ICellTemplateCache>(cell[templContextProp] || {}),
                            isForeignCell = cellContext.column !== col || !cellContext.viewRef ||
                                cellContext.templateContextProperty !== templContextProp ||
                                cell.firstChild != cellContext.rootElement;

                        if (isForeignCell) {
                            if (isEdit) {
                                var rootEl = cell.firstElementChild;
                                if (rootEl) {
                                    // set focus to cell, because hiding a focused element may move focus to a page body
                                    // that will force Grid to finish editing.
                                    cell.focus();
                                    (<HTMLElement>rootEl).style.display = 'none';
                                }
                            } else {
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


                            let templInstance = templContext._instantiateTemplate(cell);
                            //console.log('Cell Templ: ' + cell.outerHTML);
                            cellContext.column = col;
                            cellContext.viewRef = templInstance.viewRef;
                            cellContext.rootElement = templInstance.rootElement;
                            cellContext.templateContextProperty = templContextProp;
                            cell[templContextProp] = cellContext;
                        }
                        let cellInfo = this._setViewRefVars(cellContext.viewRef, row, col, dataItem, cellValue, templContext.valuePaths);

                        if (templContext.cellOverflow) {
                            cell.style.overflow = templContext.cellOverflow;
                        }

                            if (isMeasuring) {
                                //force local template 'cell' var values to be applied immediately
                                templContext.cdRef.detectChanges();
                            } else if (templContext.autoSizeRows) {
                                // increase row height if cell doesn't fit in the current row height.
                                setTimeout(function () {
                                    // ignore the cell if it is already obsolete at this moment
                                    if (cellStamp !== cell[DirectiveCellFactory._cellStampProp]) {
                                        //console.log('!!!!!!!!!!!!!!!!!!!! Bad cell stamp');
                                        return;
                                    }
                                    var cellHeight = cell.scrollHeight,
                                        panelRows = panel.rows,
                                        rowSpan = rng && rng.rowSpan || 1;
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
                                    } else if (isEdit) {
                                        // Find first visible input element and focus it. Make it only if editing
                                        // was not interrupted by row height change performed above, because it may finally
                                        // results in calling setSelectionRange on detached input, which causes crash in IE.
                                        //let inputs = cellContext.rootElement.querySelectorAll('input');
                                        let inputs = cellContext && cellContext.rootElement
                                            && cellContext.rootElement.querySelectorAll('input');
                                        if (inputs) {
                                            for (var i = 0; i < inputs.length; i++) {
                                                var input = <HTMLInputElement>inputs[i],
                                                    inpSt = window.getComputedStyle(input);
                                                if (inpSt.display !== 'none' && inpSt.visibility === 'visible') {

                                                    var inpFocusEh = function () {
                                                        input.removeEventListener('focus', inpFocusEh);
                                                        setTimeout(function () {
                                                            // at this moment control had to select the whole content
                                                            if (self._editChar) {
                                                                let caretPos = input.selectionStart + self._editChar.length;
                                                                input.value = self._editChar;
                                                                self._editChar = null;
                                                                input.dispatchEvent(self._evtInput);
                                                                setTimeout(function () {
                                                                    // at this moment control had to process 'input' event,
                                                                    // even if it happens asynchronously 
                                                                    setTimeout(() => {
                                                                        wjcCore.setSelectionRange(input,
                                                                            Math.min(caretPos, input.value.length));
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
                            self._cellEditorVars = cellInfo.localVars;
                            var editEndingEH = function (s, e) {
                                grid.cellEditEnding.removeHandler(editEndingEH);
                                // Move focus out of the current input element, in order to let it to save
                                // its value (necessary for controls like InputDate that can't update value immediately
                                // as user typing).
                                // We do it via event emulation, instead of moving focus to another element,
                                // because in IE an element doesn't fit in time to receive the 'blur' event.
                                if (!e.stayInEditMode) {
                                    let activeElement = wjcCore.getActiveElement();
                                    if (activeElement) {
                                        activeElement.dispatchEvent(self._evtBlur);
                                    }
                                    // We need to move focus nevertheless, because without this grid may lose focus at all in IE.
                                    cell.focus();
                                }
                                if (!(e.cancel || e.stayInEditMode)) {
                                    e.cancel = true;
                                    let cellVar = cellInfo.localVars,
                                        newVal = cellVar.value,
                                        bindNames = Object.getOwnPropertyNames(cellInfo.bindings);
                                    // set cell value
                                    panel.grid.setCellData(rowIndex, colIndex, newVal);
                                    // set values for valuePaths
                                    for (let curName of bindNames) {
                                        (<wjcCore.Binding>cellInfo.bindings[curName]).setValue(cellVar,
                                            cellInfo.localVars.values[curName]);
                                    }
                                }

                                // close all open dropdowns 
                                var dropDowns = cell.querySelectorAll('.wj-dropdown');
                                [].forEach.call(dropDowns, function (el) {
                                    var ctrl = wjcCore.Control.getControl(el);
                                    if (ctrl && (tryGetModuleWijmoInput()) && ctrl instanceof (tryGetModuleWijmoInput()).DropDown) {
                                        (<wjcInput.DropDown>ctrl).isDroppedDown = false;
                                    }
                                });
                            };

                            // subscribe the handler to the cellEditEnding event
                            grid.cellEditEnding.addHandler(editEndingEH);
                            grid.cellEditEnded.addHandler(() => {
                                self._cellEditorVars = null;
                            });
                        } else {
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

    }

    public getEditorValue(g: wjcGrid.FlexGrid): any {
        if (this._cellEditorVars) {
            return this._cellEditorVars.value;
        } else {
            return super.getEditorValue(g);
        }
    }
    disposeCell(cell: HTMLElement) {
        //console.log('disposeCell');
        //this.cellCounter--;
        //console.log('disposeCell cellCounter = ' + this.cellCounter);

        this._doDisposeCell(cell);
    }

    private _doDisposeCell(cell: HTMLElement) {
        var ttm = DirectiveCellFactory._templateTypes;
        for (var i = 0; i < ttm.length; i++) {
            var templContextProp = WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[ttm[i]]),
                cellContext = <_ICellTemplateCache>(cell[templContextProp]);
            if (cellContext && cellContext.viewRef) {
                let templateOwner = cellContext.column || this.grid,
                    templateContext = <WjFlexGridCellTemplate>templateOwner[templContextProp];
                if (templateContext) {
                    let viewIdx = templateContext.viewContainerRef.indexOf(cellContext.viewRef);
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
    }

    private _setViewRefVars(viewRef: ngCore.EmbeddedViewRef<any>, row: wjcGrid.Row, col: wjcGrid.Column,
        dataItem, cellValue, valuePaths: Object):
        { localVars: { row: any, col: any, item: any, value: any, values: any }, bindings?: any } {
        this._needsCdCheck = true;
        viewRef.context.row = row;
        viewRef.context.col = col;
        viewRef.context.item = dataItem;
        let values = {},
            //cellCtx = { row: row, col: col, item: dataItem, value: cellValue, values: values },
            cellCtx = viewRef.context.cell || {},
            bindings = {},
            ret = { localVars: cellCtx, bindings: bindings };
        cellCtx.row = row;
        cellCtx.col = col;
        cellCtx.item = dataItem;
        cellCtx.value = cellValue;
        cellCtx.values = values;

        if (valuePaths) {
            let pathNames = Object.getOwnPropertyNames(valuePaths);
            for (let pName of pathNames) {
                let binding = new wjcCore.Binding(valuePaths[pName]);
                bindings[pName] = binding;
                values[pName] = binding.getValue(cellCtx);
            }
        }
        if (viewRef.context.cell !== cellCtx) {
            viewRef.context.cell = cellCtx;
        }
        return ret;
    }

}




let moduleExports = [
    WjFlexGrid,
    WjFlexGridColumn,
    WjFlexGridCellTemplate];
@NgModule({
    imports: [WjDirectiveBaseModule, CommonModule],
    declarations: [...moduleExports,],
    exports: [...moduleExports],
})
export class WjGridModule {
}
