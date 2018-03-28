

import * as wjcGridDetail from 'wijmo/wijmo.grid.detail';
import * as wjcGrid from 'wijmo/wijmo.grid';



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
* Contains Angular 2 components for the <b>wijmo.grid.detail</b> module.
*
* <b>wijmo.angular2.grid.detail</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjDetail from 'wijmo/wijmo.angular2.grid.detail';
* import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjDetail.WjFlexGridDetail],
*     template: `
*       &lt;wj-flex-grid [itemsSource]="data"&gt;
*           &lt;template wjFlexGridDetail&gt;
*               Detail row content here...
*           &lt;/template&gt;
*       &lt;/wj-flex-grid&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.detail'/>


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





export var wjFlexGridDetailMeta: IWjDirectiveMeta = {
    selector: '[wjFlexGridDetail]',
    inputs: [
        'wjFlexGridDetail',
        'maxHeight',
        'detailVisibilityMode',
        'rowHasDetail',
        'isAnimated',
    ],
    outputs: [
        'initialized',
    ],
    exportAs: 'wjFlexGridDetail',
	providers: [
    ]
};
/**
    * Angular 2 directive for @see:FlexGrid @see:DetailRow templates.
    *
    * The <b>wj-flex-grid-detail</b> directive must be specified on a <b>&lt;template&gt;</b> 
    * template element contained in a <b>wj-flex-grid</b> component.
    * 
    * The <b>wj-flex-grid-detail</b> directive is derived from the @see:FlexGridDetailProvider
    * class that maintains detail rows visibility, with detail rows content defined as
    * an arbitrary HTML fragment within the directive tag. The fragment may contain 
    * Angular 2 bindings, components and directives. 
    * The <b>row</b> and 
    * <b>item</b> template variables can be used in Angular 2 bindings that refer to 
    * the detail row's parent @see:Row and <b>Row.dataItem</b> objects. 
    * 
    */
@Directive({
    selector: wjFlexGridDetailMeta.selector,
    inputs: wjFlexGridDetailMeta.inputs,
    outputs: wjFlexGridDetailMeta.outputs,
    exportAs: wjFlexGridDetailMeta.exportAs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexGridDetail)},
        ...wjFlexGridDetailMeta.providers
    ]
})
export class WjFlexGridDetail extends wjcGridDetail.FlexGridDetailProvider implements OnInit, OnDestroy, AfterViewInit {
    private static _viewRefProp = '__wj_viewRef';
    wjFlexGridDetail: any;
    _viewContainerRef: ViewContainerRef;
    _templateRef: TemplateRef<any>;
    _domRenderer: Renderer;

    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexGridDetailMeta.outputs,
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

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any, 
            @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef, 
			@Inject(TemplateRef) templateRef: TemplateRef<any>,
            @Inject(Renderer) domRenderer: Renderer) {
        super(parentCmp);
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this._viewContainerRef = viewContainerRef;
        this._templateRef = templateRef;
        this._domRenderer = domRenderer;
        this._init();
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

    private _init() {
        // show detail when asked to
        this.createDetailCell = (row: wjcGrid.Row, col: wjcGrid.Column) => {
            let templ = WjDirectiveBehavior.instantiateTemplate(this.grid.hostElement, this._viewContainerRef,
                    this._templateRef, this._domRenderer),
                viewRef = templ.viewRef,
                templRoot = templ.rootElement;
            //viewRef.setLocal('row', row);
            //viewRef.setLocal('col', col);
            //viewRef.setLocal('item', row.dataItem);
            viewRef.context.row = row;
            viewRef.context.col = col;
            viewRef.context.item = row.dataItem;

            templRoot.parentElement.removeChild(templRoot);
            templRoot[WjFlexGridDetail._viewRefProp] = viewRef;
            return templRoot;
        }

        // dispose detail scope when asked to
        this.disposeDetailCell = (row: wjcGridDetail.DetailRow) => {
            let viewRef: ngCore.EmbeddedViewRef<any>;
            if (row.detail && (viewRef = row.detail[WjFlexGridDetail._viewRefProp])) {
                row.detail[WjFlexGridDetail._viewRefProp] = null;
                let idx = this._viewContainerRef.indexOf(viewRef);
                if (idx > -1) {
                    this._viewContainerRef.remove(idx);
                }
            }
        }
    }
 
}



let moduleExports = [
    WjFlexGridDetail];
@NgModule({
    imports: [WjDirectiveBaseModule, CommonModule],
    declarations: [...moduleExports,],
    exports: [...moduleExports],
})
export class WjGridDetailModule {
}
