

import * as wjcChartRadar from 'wijmo/wijmo.chart.radar';



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
* Contains Angular 2 components for the <b>wijmo.chart.radar</b> module.
*
* <b>wijmo.angular2.chart.radar</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjRadar from 'wijmo/wijmo.angular2.chart.radar';
* &nbsp;
* &#64;Component({
*     directives: [wjRadar.WjFlexRadar, wjRadar.WjFlexRadarSeries],
*     template: `
*       &lt;wj-flex-radar [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-flex-radar-series [binding]="'y'"&gt;&lt;/wj-flex-radar-series&gt;
*       &lt;/wj-flex-radar&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.radar'/>


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





export var wjFlexRadarMeta: IWjComponentMeta = {
    selector: 'wj-flex-radar',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'binding',
        'footer',
        'header',
        'selectionMode',
        'palette',
        'plotMargin',
        'footerStyle',
        'headerStyle',
        'tooltipContent',
        'itemsSource',
        'bindingX',
        'interpolateNulls',
        'legendToggle',
        'symbolSize',
        'options',
        'selection',
        'itemFormatter',
        'labelContent',
        'chartType',
        'startAngle',
        'totalAngle',
        'reversed',
        'stacking',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'selectionChangedNg: selectionChanged',
        'selectionChangePC: selectionChange',
        'seriesVisibilityChangedNg: seriesVisibilityChanged',
    ],
	providers: [
        {
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.radar.FlexRadar control.
 *
 * Use the <b>wj-flex-radar</b> component to add <b>FlexRadar</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexRadar</b> component is derived from the <b>FlexRadar</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-radar</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
 * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarAxis
 * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarSeries
 *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend.
*/
@Component({
    selector: wjFlexRadarMeta.selector,
    template: wjFlexRadarMeta.template,
    inputs: wjFlexRadarMeta.inputs,
    outputs: wjFlexRadarMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexRadar)},
        ...wjFlexRadarMeta.providers
    ]
})
export class WjFlexRadar extends wjcChartRadar.FlexRadar implements OnInit, OnDestroy, AfterViewInit {
    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexRadarMeta.outputs,
        changeEvents: {
            'selectionChanged': ['selection']            
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
     * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rendering</b> Wijmo event name.
     */
    renderingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rendered</b> Wijmo event name.
     */
    renderedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
     */
    selectionChangedNg = new EventEmitter(false);
    selectionChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>seriesVisibilityChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>seriesVisibilityChanged</b> Wijmo event name.
     */
    seriesVisibilityChangedNg = new EventEmitter(false);

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

    get tooltipContent(): any {
        return this.tooltip.content;
    }
    set tooltipContent(value: any) {
        this.tooltip.content = value;
    }

    get labelContent(): any {
        return this.dataLabel.content;
    }
    set labelContent(value: any) {
        this.dataLabel.content = value;
    }
 
}



export var wjFlexRadarAxisMeta: IWjComponentMeta = {
    selector: 'wj-flex-radar-axis',
    template: ``,
    inputs: [
        'wjProperty',
        'axisLine',
        'format',
        'labels',
        'majorGrid',
        'majorTickMarks',
        'majorUnit',
        'max',
        'min',
        'position',
        'reversed',
        'title',
        'labelAngle',
        'minorGrid',
        'minorTickMarks',
        'minorUnit',
        'origin',
        'logBase',
        'plotArea',
        'labelAlign',
        'name',
        'overlappingLabels',
        'labelPadding',
        'itemFormatter',
        'itemsSource',
        'binding',
    ],
    outputs: [
        'initialized',
        'rangeChangedNg: rangeChanged',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.radar.FlexRadarAxis control. 
 * 
 * The <b>wj-flex-radar-axis</b> component must be 
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar
 *  or @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarSeries.
 *
 * Use the <b>wj-flex-radar-axis</b> component to add <b>FlexRadarAxis</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexRadarAxis</b> component is derived from the <b>FlexRadarAxis</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjFlexRadarAxisMeta.selector,
    template: wjFlexRadarAxisMeta.template,
    inputs: wjFlexRadarAxisMeta.inputs,
    outputs: wjFlexRadarAxisMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexRadarAxis)},
        ...wjFlexRadarAxisMeta.providers
    ]
})
export class WjFlexRadarAxis extends wjcChartRadar.FlexRadarAxis implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexRadarAxisMeta.outputs,
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
     * Default value is 'axes'.
     */
    wjProperty: string = 'axes';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rangeChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rangeChanged</b> Wijmo event name.
     */
    rangeChangedNg = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super();
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



export var wjFlexRadarSeriesMeta: IWjComponentMeta = {
    selector: 'wj-flex-radar-series',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjProperty',
        'axisX',
        'axisY',
        'binding',
        'bindingX',
        'cssClass',
        'name',
        'style',
        'altStyle',
        'symbolMarker',
        'symbolSize',
        'symbolStyle',
        'visibility',
        'itemsSource',
        'chartType',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.radar.FlexRadarSeries control. 
 * 
 * The <b>wj-flex-radar-series</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar component.
 *
 * Use the <b>wj-flex-radar-series</b> component to add <b>FlexRadarSeries</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexRadarSeries</b> component is derived from the <b>FlexRadarSeries</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-radar-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarAxis child component.
*/
@Component({
    selector: wjFlexRadarSeriesMeta.selector,
    template: wjFlexRadarSeriesMeta.template,
    inputs: wjFlexRadarSeriesMeta.inputs,
    outputs: wjFlexRadarSeriesMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexRadarSeries)},
        ...wjFlexRadarSeriesMeta.providers
    ]
})
export class WjFlexRadarSeries extends wjcChartRadar.FlexRadarSeries implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexRadarSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']            
        },
        siblingId: 'series',
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
     * Default value is 'series'.
     */
    wjProperty: string = 'series';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rendering</b> Wijmo event name.
     */
    renderingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rendered</b> Wijmo event name.
     */
    renderedNg = new EventEmitter(false);
    visibilityChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super();
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
    WjFlexRadar,
    WjFlexRadarAxis,
    WjFlexRadarSeries];
@NgModule({
    imports: [WjDirectiveBaseModule, CommonModule],
    declarations: [...moduleExports,],
    exports: [...moduleExports],
})
export class WjChartRadarModule {
}
