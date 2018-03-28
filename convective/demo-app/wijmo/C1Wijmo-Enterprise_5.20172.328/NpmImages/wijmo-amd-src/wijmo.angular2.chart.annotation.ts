

import * as wjcChartAnnotation from 'wijmo/wijmo.chart.annotation';



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
* Contains Angular 2 components for the <b>wijmo.chart.annotation</b> module.
*
* <b>wijmo.angular2.chart.annotation</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjAnnotation from 'wijmo/wijmo.angular2.chart.annotation';
* import * as wjChart from 'wijmo/wijmo.angular2.chart';
* &nbsp;
* &#64;Component({
*     directives: [wjChart.WjFlexChart, wjAnnotation.WjFlexChartAnnotationLayer, 
*            wjAnnotation.WjFlexChartAnnotationCircle, wjChart.WjFlexChartSeries],
*     template: `
*       &lt;wj-flex-chart [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-flex-chart-series [binding]="'y'"&gt;&lt;/wj-flex-chart-series&gt;
*           &lt;wj-flex-chart-annotation-layer&gt;
*               &lt;wj-flex-chart-annotation-circle [radius]="40" [point]="{x: 250, y: 150}"&gt;&lt;/wj-flex-chart-annotation-circle&gt;
*           &lt;/wj-flex-chart-annotation-layer&gt;
*       &lt;/wj-flex-chart&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.annotation'/>


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





export var wjFlexChartAnnotationLayerMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-annotation-layer',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjProperty',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.annotation.AnnotationLayer control. 
 * 
 * The <b>wj-flex-chart-annotation-layer</b> component must be 
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-annotation-layer</b> component to add <b>AnnotationLayer</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 ** The <b>WjFlexChartAnnotationLayer</b> component is derived from the <b>AnnotationLayer</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-chart-annotation-layer</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationText
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationEllipse
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationRectangle
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLine
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationPolygon
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationCircle
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationSquare
 *  and @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationImage.
*/
@Component({
    selector: wjFlexChartAnnotationLayerMeta.selector,
    template: wjFlexChartAnnotationLayerMeta.template,
    inputs: wjFlexChartAnnotationLayerMeta.inputs,
    outputs: wjFlexChartAnnotationLayerMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartAnnotationLayer)},
        ...wjFlexChartAnnotationLayerMeta.providers
    ]
})
export class WjFlexChartAnnotationLayer extends wjcChartAnnotation.AnnotationLayer implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartAnnotationLayerMeta.outputs,
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



export var wjFlexChartAnnotationTextMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-annotation-text',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjProperty',
        'type',
        'attachment',
        'position',
        'point',
        'seriesIndex',
        'pointIndex',
        'offset',
        'style',
        'isVisible',
        'tooltip',
        'text',
        'content',
        'name',
        'width',
        'height',
        'start',
        'end',
        'radius',
        'length',
        'href',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.annotation.Text control. 
 * 
 * The <b>wj-flex-chart-annotation-text</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
 *
 * Use the <b>wj-flex-chart-annotation-text</b> component to add <b>Text</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 ** The <b>WjFlexChartAnnotationText</b> component is derived from the <b>Text</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-chart-annotation-text</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
*/
@Component({
    selector: wjFlexChartAnnotationTextMeta.selector,
    template: wjFlexChartAnnotationTextMeta.template,
    inputs: wjFlexChartAnnotationTextMeta.inputs,
    outputs: wjFlexChartAnnotationTextMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartAnnotationText)},
        ...wjFlexChartAnnotationTextMeta.providers
    ]
})
export class WjFlexChartAnnotationText extends wjcChartAnnotation.Text implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartAnnotationTextMeta.outputs,
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
     * Default value is 'items'.
     */
    wjProperty: string = 'items';

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



export var wjFlexChartAnnotationEllipseMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-annotation-ellipse',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjProperty',
        'type',
        'attachment',
        'position',
        'point',
        'seriesIndex',
        'pointIndex',
        'offset',
        'style',
        'isVisible',
        'tooltip',
        'text',
        'content',
        'name',
        'width',
        'height',
        'start',
        'end',
        'radius',
        'length',
        'href',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.annotation.Ellipse control. 
 * 
 * The <b>wj-flex-chart-annotation-ellipse</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
 *
 * Use the <b>wj-flex-chart-annotation-ellipse</b> component to add <b>Ellipse</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 ** The <b>WjFlexChartAnnotationEllipse</b> component is derived from the <b>Ellipse</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-chart-annotation-ellipse</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
*/
@Component({
    selector: wjFlexChartAnnotationEllipseMeta.selector,
    template: wjFlexChartAnnotationEllipseMeta.template,
    inputs: wjFlexChartAnnotationEllipseMeta.inputs,
    outputs: wjFlexChartAnnotationEllipseMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartAnnotationEllipse)},
        ...wjFlexChartAnnotationEllipseMeta.providers
    ]
})
export class WjFlexChartAnnotationEllipse extends wjcChartAnnotation.Ellipse implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartAnnotationEllipseMeta.outputs,
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
     * Default value is 'items'.
     */
    wjProperty: string = 'items';

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



export var wjFlexChartAnnotationRectangleMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-annotation-rectangle',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjProperty',
        'type',
        'attachment',
        'position',
        'point',
        'seriesIndex',
        'pointIndex',
        'offset',
        'style',
        'isVisible',
        'tooltip',
        'text',
        'content',
        'name',
        'width',
        'height',
        'start',
        'end',
        'radius',
        'length',
        'href',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.annotation.Rectangle control. 
 * 
 * The <b>wj-flex-chart-annotation-rectangle</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
 *
 * Use the <b>wj-flex-chart-annotation-rectangle</b> component to add <b>Rectangle</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 ** The <b>WjFlexChartAnnotationRectangle</b> component is derived from the <b>Rectangle</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-chart-annotation-rectangle</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
*/
@Component({
    selector: wjFlexChartAnnotationRectangleMeta.selector,
    template: wjFlexChartAnnotationRectangleMeta.template,
    inputs: wjFlexChartAnnotationRectangleMeta.inputs,
    outputs: wjFlexChartAnnotationRectangleMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartAnnotationRectangle)},
        ...wjFlexChartAnnotationRectangleMeta.providers
    ]
})
export class WjFlexChartAnnotationRectangle extends wjcChartAnnotation.Rectangle implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartAnnotationRectangleMeta.outputs,
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
     * Default value is 'items'.
     */
    wjProperty: string = 'items';

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



export var wjFlexChartAnnotationLineMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-annotation-line',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjProperty',
        'type',
        'attachment',
        'position',
        'point',
        'seriesIndex',
        'pointIndex',
        'offset',
        'style',
        'isVisible',
        'tooltip',
        'text',
        'content',
        'name',
        'width',
        'height',
        'start',
        'end',
        'radius',
        'length',
        'href',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.annotation.Line control. 
 * 
 * The <b>wj-flex-chart-annotation-line</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
 *
 * Use the <b>wj-flex-chart-annotation-line</b> component to add <b>Line</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 ** The <b>WjFlexChartAnnotationLine</b> component is derived from the <b>Line</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-chart-annotation-line</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
*/
@Component({
    selector: wjFlexChartAnnotationLineMeta.selector,
    template: wjFlexChartAnnotationLineMeta.template,
    inputs: wjFlexChartAnnotationLineMeta.inputs,
    outputs: wjFlexChartAnnotationLineMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartAnnotationLine)},
        ...wjFlexChartAnnotationLineMeta.providers
    ]
})
export class WjFlexChartAnnotationLine extends wjcChartAnnotation.Line implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartAnnotationLineMeta.outputs,
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
     * Default value is 'items'.
     */
    wjProperty: string = 'items';

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



export var wjFlexChartAnnotationPolygonMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-annotation-polygon',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjProperty',
        'type',
        'attachment',
        'position',
        'point',
        'seriesIndex',
        'pointIndex',
        'offset',
        'style',
        'isVisible',
        'tooltip',
        'text',
        'content',
        'name',
        'width',
        'height',
        'start',
        'end',
        'radius',
        'length',
        'href',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.annotation.Polygon control. 
 * 
 * The <b>wj-flex-chart-annotation-polygon</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
 *
 * Use the <b>wj-flex-chart-annotation-polygon</b> component to add <b>Polygon</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 ** The <b>WjFlexChartAnnotationPolygon</b> component is derived from the <b>Polygon</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-chart-annotation-polygon</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
*/
@Component({
    selector: wjFlexChartAnnotationPolygonMeta.selector,
    template: wjFlexChartAnnotationPolygonMeta.template,
    inputs: wjFlexChartAnnotationPolygonMeta.inputs,
    outputs: wjFlexChartAnnotationPolygonMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartAnnotationPolygon)},
        ...wjFlexChartAnnotationPolygonMeta.providers
    ]
})
export class WjFlexChartAnnotationPolygon extends wjcChartAnnotation.Polygon implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartAnnotationPolygonMeta.outputs,
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
     * Default value is 'items'.
     */
    wjProperty: string = 'items';

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



export var wjFlexChartAnnotationCircleMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-annotation-circle',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjProperty',
        'type',
        'attachment',
        'position',
        'point',
        'seriesIndex',
        'pointIndex',
        'offset',
        'style',
        'isVisible',
        'tooltip',
        'text',
        'content',
        'name',
        'width',
        'height',
        'start',
        'end',
        'radius',
        'length',
        'href',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.annotation.Circle control. 
 * 
 * The <b>wj-flex-chart-annotation-circle</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
 *
 * Use the <b>wj-flex-chart-annotation-circle</b> component to add <b>Circle</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 ** The <b>WjFlexChartAnnotationCircle</b> component is derived from the <b>Circle</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-chart-annotation-circle</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
*/
@Component({
    selector: wjFlexChartAnnotationCircleMeta.selector,
    template: wjFlexChartAnnotationCircleMeta.template,
    inputs: wjFlexChartAnnotationCircleMeta.inputs,
    outputs: wjFlexChartAnnotationCircleMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartAnnotationCircle)},
        ...wjFlexChartAnnotationCircleMeta.providers
    ]
})
export class WjFlexChartAnnotationCircle extends wjcChartAnnotation.Circle implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartAnnotationCircleMeta.outputs,
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
     * Default value is 'items'.
     */
    wjProperty: string = 'items';

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



export var wjFlexChartAnnotationSquareMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-annotation-square',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjProperty',
        'type',
        'attachment',
        'position',
        'point',
        'seriesIndex',
        'pointIndex',
        'offset',
        'style',
        'isVisible',
        'tooltip',
        'text',
        'content',
        'name',
        'width',
        'height',
        'start',
        'end',
        'radius',
        'length',
        'href',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.annotation.Square control. 
 * 
 * The <b>wj-flex-chart-annotation-square</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
 *
 * Use the <b>wj-flex-chart-annotation-square</b> component to add <b>Square</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 ** The <b>WjFlexChartAnnotationSquare</b> component is derived from the <b>Square</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-chart-annotation-square</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
*/
@Component({
    selector: wjFlexChartAnnotationSquareMeta.selector,
    template: wjFlexChartAnnotationSquareMeta.template,
    inputs: wjFlexChartAnnotationSquareMeta.inputs,
    outputs: wjFlexChartAnnotationSquareMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartAnnotationSquare)},
        ...wjFlexChartAnnotationSquareMeta.providers
    ]
})
export class WjFlexChartAnnotationSquare extends wjcChartAnnotation.Square implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartAnnotationSquareMeta.outputs,
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
     * Default value is 'items'.
     */
    wjProperty: string = 'items';

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



export var wjFlexChartAnnotationImageMeta: IWjComponentMeta = {
    selector: 'wj-flex-chart-annotation-image',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjProperty',
        'type',
        'attachment',
        'position',
        'point',
        'seriesIndex',
        'pointIndex',
        'offset',
        'style',
        'isVisible',
        'tooltip',
        'text',
        'content',
        'name',
        'width',
        'height',
        'start',
        'end',
        'radius',
        'length',
        'href',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.annotation.Image control. 
 * 
 * The <b>wj-flex-chart-annotation-image</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
 *
 * Use the <b>wj-flex-chart-annotation-image</b> component to add <b>Image</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 ** The <b>WjFlexChartAnnotationImage</b> component is derived from the <b>Image</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-flex-chart-annotation-image</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
*/
@Component({
    selector: wjFlexChartAnnotationImageMeta.selector,
    template: wjFlexChartAnnotationImageMeta.template,
    inputs: wjFlexChartAnnotationImageMeta.inputs,
    outputs: wjFlexChartAnnotationImageMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFlexChartAnnotationImage)},
        ...wjFlexChartAnnotationImageMeta.providers
    ]
})
export class WjFlexChartAnnotationImage extends wjcChartAnnotation.Image implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFlexChartAnnotationImageMeta.outputs,
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
     * Default value is 'items'.
     */
    wjProperty: string = 'items';

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
    WjFlexChartAnnotationLayer,
    WjFlexChartAnnotationText,
    WjFlexChartAnnotationEllipse,
    WjFlexChartAnnotationRectangle,
    WjFlexChartAnnotationLine,
    WjFlexChartAnnotationPolygon,
    WjFlexChartAnnotationCircle,
    WjFlexChartAnnotationSquare,
    WjFlexChartAnnotationImage];
@NgModule({
    imports: [WjDirectiveBaseModule, CommonModule],
    declarations: [...moduleExports,],
    exports: [...moduleExports],
})
export class WjChartAnnotationModule {
}
