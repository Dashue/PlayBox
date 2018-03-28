

import * as wjcNav from 'wijmo/wijmo.nav';



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
* Contains Angular 2 components for the <b>wijmo.nav</b> module.
*
* <b>wijmo.angular2.nav</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjNav from 'wijmo/wijmo.angular2.nav';
* &nbsp;
* &#64;Component({
*     directives: [wjNav.WjTreeView],
*     template: `
*       &lt;wj-tree-view [itemsSource]="items" [displayMemberPath]="'header'" [childItemsPath]="'items'"&gt;
*       &lt;/wj-tree-view;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.nav'/>


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





export var wjTreeViewMeta: IWjComponentMeta = {
    selector: 'wj-tree-view',
    template: ``,
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'childItemsPath',
        'displayMemberPath',
        'imageMemberPath',
        'isContentHtml',
        'showCheckboxes',
        'autoCollapse',
        'isAnimated',
        'isReadOnly',
        'allowDragging',
        'expandOnClick',
        'lazyLoadFunction',
        'itemsSource',
        'selectedItem',
        'selectedNode',
        'checkedItems',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'itemsSourceChangedNg: itemsSourceChanged',
        'loadingItemsNg: loadingItems',
        'loadedItemsNg: loadedItems',
        'itemClickedNg: itemClicked',
        'selectedItemChangedNg: selectedItemChanged',
        'selectedItemChangePC: selectedItemChange',
        'selectedNodeChangePC: selectedNodeChange',
        'checkedItemsChangedNg: checkedItemsChanged',
        'checkedItemsChangePC: checkedItemsChange',
        'isCollapsedChangingNg: isCollapsedChanging',
        'isCollapsedChangedNg: isCollapsedChanged',
        'isCheckedChangingNg: isCheckedChanging',
        'isCheckedChangedNg: isCheckedChanged',
        'formatItemNg: formatItem',
        'dragStartNg: dragStart',
        'dragOverNg: dragOver',
        'dropNg: drop',
        'dragEndNg: dragEnd',
        'nodeEditStartingNg: nodeEditStarting',
        'nodeEditStartedNg: nodeEditStarted',
        'nodeEditEndingNg: nodeEditEnding',
        'nodeEditEndedNg: nodeEditEnded',
    ],
	providers: [
        {
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.nav.TreeView control.
 *
 * Use the <b>wj-tree-view</b> component to add <b>TreeView</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjTreeView</b> component is derived from the <b>TreeView</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjTreeViewMeta.selector,
    template: wjTreeViewMeta.template,
    inputs: wjTreeViewMeta.inputs,
    outputs: wjTreeViewMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjTreeView)},
        ...wjTreeViewMeta.providers
    ]
})
export class WjTreeView extends wjcNav.TreeView implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjTreeViewMeta.outputs,
        changeEvents: {
            'selectedItemChanged': ['selectedItem', 'selectedNode'], 
            'checkedItemsChanged': ['checkedItems']            
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
     * Angular (EventEmitter) version of the Wijmo <b>itemsSourceChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>itemsSourceChanged</b> Wijmo event name.
     */
    itemsSourceChangedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>loadingItems</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>loadingItems</b> Wijmo event name.
     */
    loadingItemsNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>loadedItems</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>loadedItems</b> Wijmo event name.
     */
    loadedItemsNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>itemClicked</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>itemClicked</b> Wijmo event name.
     */
    itemClickedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectedItemChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectedItemChanged</b> Wijmo event name.
     */
    selectedItemChangedNg = new EventEmitter(false);
    selectedItemChangePC = new EventEmitter(false);
    selectedNodeChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>checkedItemsChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>checkedItemsChanged</b> Wijmo event name.
     */
    checkedItemsChangedNg = new EventEmitter(false);
    checkedItemsChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isCollapsedChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isCollapsedChanging</b> Wijmo event name.
     */
    isCollapsedChangingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isCollapsedChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isCollapsedChanged</b> Wijmo event name.
     */
    isCollapsedChangedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isCheckedChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isCheckedChanging</b> Wijmo event name.
     */
    isCheckedChangingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isCheckedChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isCheckedChanged</b> Wijmo event name.
     */
    isCheckedChangedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
     */
    formatItemNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>dragStart</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>dragStart</b> Wijmo event name.
     */
    dragStartNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>dragOver</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>dragOver</b> Wijmo event name.
     */
    dragOverNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>drop</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>drop</b> Wijmo event name.
     */
    dropNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>dragEnd</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>dragEnd</b> Wijmo event name.
     */
    dragEndNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>nodeEditStarting</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>nodeEditStarting</b> Wijmo event name.
     */
    nodeEditStartingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>nodeEditStarted</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>nodeEditStarted</b> Wijmo event name.
     */
    nodeEditStartedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>nodeEditEnding</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>nodeEditEnding</b> Wijmo event name.
     */
    nodeEditEndingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>nodeEditEnded</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>nodeEditEnded</b> Wijmo event name.
     */
    nodeEditEndedNg = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
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



let moduleExports = [
    WjTreeView];
@NgModule({
    imports: [WjDirectiveBaseModule, CommonModule],
    declarations: [...moduleExports,],
    exports: [...moduleExports],
})
export class WjNavModule {
}
