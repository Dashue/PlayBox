

import * as wjcChartInteraction from 'wijmo/wijmo.chart.interaction';



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


///<wijmo-soft-import from="wijmo.chart.finance"/>

/**
* Contains Angular 2 components for the <b>wijmo.chart.interaction</b> module.
*
* <b>wijmo.angular2.chart.interaction</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjInteraction from 'wijmo/wijmo.angular2.chart.interaction';
* import * as wjChart from 'wijmo/wijmo.angular2.chart';
* &nbsp;
* &#64;Component({
*     directives: [wjChart.WjFlexChart, wjInteraction.WjFlexChartRangeSelector, wjChart.WjFlexChartSeries],
*     template: `
*       &lt;wj-flex-chart [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-flex-chart-range-selector&gt;&lt;/wj-flex-chart-range-selector&gt;
*           &lt;wj-flex-chart-series [binding]="'y'"&gt;&lt;/wj-flex-chart-series&gt;
*       &lt;/wj-flex-chart&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.interaction'/>


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





export var wjFlexChartRangeSelectorMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-range-selector',
    template: ``,
    inputs: [
        'wjProperty',
        'isVisible',
        'min',
        'max',
        'orientation',
        'seamless',
        'minScale',
        'maxScale',
    ],
    outputs: [
        'initialized',
        'rangeChangedNg: rangeChanged',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.interaction.RangeSelector control. 
 * 
 * The <b>wj-flex-chart-range-selector</b> component must be 
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-range-selector</b> component to add <b>RangeSelector</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexChartRangeSelector</b> component is derived from the <b>RangeSelector</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjFlexChartRangeSelectorMeta.selector,
    template: wjFlexChartRangeSelectorMeta.template,
    inputs: wjFlexChartRangeSelectorMeta.inputs,
    outputs: wjFlexChartRangeSelectorMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartRangeSelector)},
        ...wjFlexChartRangeSelectorMeta.providers
    ]
})
export class WjFlexChartRangeSelector extends wjcChartInteraction.RangeSelector implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartRangeSelectorMeta.outputs,
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
     * Default value is ''.
     */
    wjProperty: string;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rangeChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rangeChanged</b> Wijmo event name.
     */
    rangeChangedNg = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(parentCmp);
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



export var wjFlexChartGesturesMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-gestures',
    template: ``,
    inputs: [
        'wjProperty',
        'mouseAction',
        'interactiveAxes',
        'enable',
        'scaleX',
        'scaleY',
        'posX',
        'posY',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.interaction.ChartGestures control. 
 * 
 * The <b>wj-flex-chart-gestures</b> component must be 
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-gestures</b> component to add <b>ChartGestures</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexChartGestures</b> component is derived from the <b>ChartGestures</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjFlexChartGesturesMeta.selector,
    template: wjFlexChartGesturesMeta.template,
    inputs: wjFlexChartGesturesMeta.inputs,
    outputs: wjFlexChartGesturesMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartGestures)},
        ...wjFlexChartGesturesMeta.providers
    ]
})
export class WjFlexChartGestures extends wjcChartInteraction.ChartGestures implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartGesturesMeta.outputs,
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
     * Default value is ''.
     */
    wjProperty: string;

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(parentCmp);
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
    WjFlexChartRangeSelector,
    WjFlexChartGestures];
@NgModule({
    imports: [WjDirectiveBaseModule, CommonModule],
    declarations: [...moduleExports,],
    exports: [...moduleExports],
})
export class WjChartInteractionModule {
}
