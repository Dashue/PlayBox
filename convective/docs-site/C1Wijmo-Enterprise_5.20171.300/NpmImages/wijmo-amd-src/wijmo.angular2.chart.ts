

import * as wjcChart from 'wijmo/wijmo.chart';



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


///<wijmo-soft-import from="wijmo.chart.finance"/>
///<wijmo-soft-import from="wijmo.chart.analytics"/>
///<wijmo-soft-import from="wijmo.chart.animation"/>
///<wijmo-soft-import from="wijmo.chart.annotation"/>
///<wijmo-soft-import from="wijmo.chart.finance.analytics"/>
///<wijmo-soft-import from="wijmo.chart.hierarchical"/>
///<wijmo-soft-import from="wijmo.chart.interaction"/>
///<wijmo-soft-import from="wijmo.chart.radar"/>

/**
* Contains Angular 2 components for the <b>wijmo.chart</b> module.
*
* <b>wijmo.angular2.chart</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjChart from 'wijmo/wijmo.angular2.chart';
* &nbsp;
* &#64;Component({
*     directives: [wjChart.WjFlexChart, wjChart.WjFlexChartSeries],
*     template: `
*       &lt;wj-flex-chart [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-flex-chart-series [binding]="'y'"&gt;&lt;/wj-flex-chart-series&gt;
*       &lt;/wj-flex-chart&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart'/>


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





export var wjFlexChartMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart',
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
        'rotated',
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
 * Angular 2 component for the @see:wijmo.chart.FlexChart control.
 *
 * Use the <b>wj-flex-chart</b> component to add <b>FlexChart</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexChart</b> component is derived from the <b>FlexChart</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-chart</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartTrendLine
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartMovingAverage
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartYFunctionSeries
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartParametricFunctionSeries
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartWaterfall
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartBoxWhisker
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartErrorBar
 * , @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer
 * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartRangeSelector
 * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartGestures
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartDataLabel
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartSeries
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLineMarker
 *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartPlotArea.
*/
@Component({
    selector: wjFlexChartMeta.selector,
    template: wjFlexChartMeta.template,
    inputs: wjFlexChartMeta.inputs,
    outputs: wjFlexChartMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChart)},
        ...wjFlexChartMeta.providers
    ]
})
export class WjFlexChart extends wjcChart.FlexChart implements OnInit, OnDestroy, AfterViewInit {
    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartMeta.outputs,
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



export var wjFlexPieMeta: IWjComponentMeta = {
    selector: 'wj-flex-pie',
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
        'bindingName',
        'innerRadius',
        'isAnimated',
        'offset',
        'reversed',
        'startAngle',
        'selectedItemPosition',
        'selectedItemOffset',
        'itemFormatter',
        'labelContent',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'selectionChangedNg: selectionChanged',
    ],
	providers: [
        {
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.FlexPie control.
 *
 * Use the <b>wj-flex-pie</b> component to add <b>FlexPie</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexPie</b> component is derived from the <b>FlexPie</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-pie</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
 *  and @see:wijmo/wijmo.angular2.chart.WjFlexPieDataLabel.
*/
@Component({
    selector: wjFlexPieMeta.selector,
    template: wjFlexPieMeta.template,
    inputs: wjFlexPieMeta.inputs,
    outputs: wjFlexPieMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexPie)},
        ...wjFlexPieMeta.providers
    ]
})
export class WjFlexPie extends wjcChart.FlexPie implements OnInit, OnDestroy, AfterViewInit {
    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexPieMeta.outputs,
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



export var wjFlexChartAxisMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-axis',
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
 * Angular 2 component for the @see:wijmo.chart.Axis control. 
 * 
 * The <b>wj-flex-chart-axis</b> component must be 
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartSeries
 * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChartSeries.
 *
 * Use the <b>wj-flex-chart-axis</b> component to add <b>Axis</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexChartAxis</b> component is derived from the <b>Axis</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjFlexChartAxisMeta.selector,
    template: wjFlexChartAxisMeta.template,
    inputs: wjFlexChartAxisMeta.inputs,
    outputs: wjFlexChartAxisMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartAxis)},
        ...wjFlexChartAxisMeta.providers
    ]
})
export class WjFlexChartAxis extends wjcChart.Axis implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartAxisMeta.outputs,
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



export var wjFlexChartLegendMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-legend',
    template: ``,
    inputs: [
        'wjProperty',
        'position',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.Legend control. 
 * 
 * The <b>wj-flex-chart-legend</b> component must be 
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 * , @see:wijmo/wijmo.angular2.chart.WjFlexPie
 * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
 * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar
 *  or @see:wijmo/wijmo.angular2.chart.hierarchical.WjSunburst.
 *
 * Use the <b>wj-flex-chart-legend</b> component to add <b>Legend</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexChartLegend</b> component is derived from the <b>Legend</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjFlexChartLegendMeta.selector,
    template: wjFlexChartLegendMeta.template,
    inputs: wjFlexChartLegendMeta.inputs,
    outputs: wjFlexChartLegendMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartLegend)},
        ...wjFlexChartLegendMeta.providers
    ]
})
export class WjFlexChartLegend extends wjcChart.Legend implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartLegendMeta.outputs,
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
     * Default value is 'legend'.
     */
    wjProperty: string = 'legend';

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



export var wjFlexChartDataLabelMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-data-label',
    template: ``,
    inputs: [
        'wjProperty',
        'content',
        'border',
        'position',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.DataLabel control. 
 * 
 * The <b>wj-flex-chart-data-label</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
 *
 * Use the <b>wj-flex-chart-data-label</b> component to add <b>DataLabel</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexChartDataLabel</b> component is derived from the <b>DataLabel</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjFlexChartDataLabelMeta.selector,
    template: wjFlexChartDataLabelMeta.template,
    inputs: wjFlexChartDataLabelMeta.inputs,
    outputs: wjFlexChartDataLabelMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartDataLabel)},
        ...wjFlexChartDataLabelMeta.providers
    ]
})
export class WjFlexChartDataLabel extends wjcChart.DataLabel implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartDataLabelMeta.outputs,
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
     * Default value is 'dataLabel'.
     */
    wjProperty: string = 'dataLabel';

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



export var wjFlexPieDataLabelMeta: IWjComponentMeta = {
    selector: 'wj-flex-pie-data-label',
    template: ``,
    inputs: [
        'wjProperty',
        'content',
        'border',
        'position',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.PieDataLabel control. 
 * 
 * The <b>wj-flex-pie-data-label</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexPie component.
 *
 * Use the <b>wj-flex-pie-data-label</b> component to add <b>PieDataLabel</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexPieDataLabel</b> component is derived from the <b>PieDataLabel</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjFlexPieDataLabelMeta.selector,
    template: wjFlexPieDataLabelMeta.template,
    inputs: wjFlexPieDataLabelMeta.inputs,
    outputs: wjFlexPieDataLabelMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexPieDataLabel)},
        ...wjFlexPieDataLabelMeta.providers
    ]
})
export class WjFlexPieDataLabel extends wjcChart.PieDataLabel implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexPieDataLabelMeta.outputs,
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
     * Default value is 'dataLabel'.
     */
    wjProperty: string = 'dataLabel';

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



export var wjFlexChartSeriesMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-series',
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
 * Angular 2 component for the @see:wijmo.chart.Series control. 
 * 
 * The <b>wj-flex-chart-series</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
 *
 * Use the <b>wj-flex-chart-series</b> component to add <b>Series</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexChartSeries</b> component is derived from the <b>Series</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-chart-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis child component.
*/
@Component({
    selector: wjFlexChartSeriesMeta.selector,
    template: wjFlexChartSeriesMeta.template,
    inputs: wjFlexChartSeriesMeta.inputs,
    outputs: wjFlexChartSeriesMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartSeries)},
        ...wjFlexChartSeriesMeta.providers
    ]
})
export class WjFlexChartSeries extends wjcChart.Series implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartSeriesMeta.outputs,
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



export var wjFlexChartLineMarkerMeta: IWjComponentMeta = {
    selector: 'wj-flex-line-marker',
    template: ``,
    inputs: [
        'wjProperty',
        'isVisible',
        'seriesIndex',
        'horizontalPosition',
        'content',
        'verticalPosition',
        'alignment',
        'lines',
        'interaction',
        'dragLines',
        'dragThreshold',
        'dragContent',
    ],
    outputs: [
        'initialized',
        'positionChangedNg: positionChanged',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.LineMarker control. 
 * 
 * The <b>wj-flex-line-marker</b> component must be 
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-line-marker</b> component to add <b>LineMarker</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexChartLineMarker</b> component is derived from the <b>LineMarker</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjFlexChartLineMarkerMeta.selector,
    template: wjFlexChartLineMarkerMeta.template,
    inputs: wjFlexChartLineMarkerMeta.inputs,
    outputs: wjFlexChartLineMarkerMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartLineMarker)},
        ...wjFlexChartLineMarkerMeta.providers
    ]
})
export class WjFlexChartLineMarker extends wjcChart.LineMarker implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartLineMarkerMeta.outputs,
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
     * Angular (EventEmitter) version of the Wijmo <b>positionChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>positionChanged</b> Wijmo event name.
     */
    positionChangedNg = new EventEmitter(false);

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



export var wjFlexChartDataPointMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-data-point',
    template: ``,
    inputs: [
        'wjProperty',
        'x',
        'y',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.DataPoint control. 
 * 
 * The <b>wj-flex-chart-data-point</b> component must be 
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationText
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationEllipse
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationRectangle
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLine
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationPolygon
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationCircle
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationSquare
 *  or @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationImage.
 *
 * Use the <b>wj-flex-chart-data-point</b> component to add <b>DataPoint</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexChartDataPoint</b> component is derived from the <b>DataPoint</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjFlexChartDataPointMeta.selector,
    template: wjFlexChartDataPointMeta.template,
    inputs: wjFlexChartDataPointMeta.inputs,
    outputs: wjFlexChartDataPointMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartDataPoint)},
        ...wjFlexChartDataPointMeta.providers
    ]
})
export class WjFlexChartDataPoint extends wjcChart.DataPoint implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartDataPointMeta.outputs,
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
    wjProperty: string = '';

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



export var wjFlexChartPlotAreaMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-plot-area',
    template: ``,
    inputs: [
        'wjProperty',
        'column',
        'height',
        'name',
        'row',
        'style',
        'width',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.PlotArea control. 
 * 
 * The <b>wj-flex-chart-plot-area</b> component must be 
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-plot-area</b> component to add <b>PlotArea</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjFlexChartPlotArea</b> component is derived from the <b>PlotArea</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjFlexChartPlotAreaMeta.selector,
    template: wjFlexChartPlotAreaMeta.template,
    inputs: wjFlexChartPlotAreaMeta.inputs,
    outputs: wjFlexChartPlotAreaMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartPlotArea)},
        ...wjFlexChartPlotAreaMeta.providers
    ]
})
export class WjFlexChartPlotArea extends wjcChart.PlotArea implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartPlotAreaMeta.outputs,
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
     * Default value is 'plotAreas'.
     */
    wjProperty: string = 'plotAreas';

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
    WjFlexChart,
    WjFlexPie,
    WjFlexChartAxis,
    WjFlexChartLegend,
    WjFlexChartDataLabel,
    WjFlexPieDataLabel,
    WjFlexChartSeries,
    WjFlexChartLineMarker,
    WjFlexChartDataPoint,
    WjFlexChartPlotArea];
@NgModule({
    imports: [WjDirectiveBaseModule, CommonModule],
    declarations: [...moduleExports,],
    exports: [...moduleExports],
})
export class WjChartModule {
}
