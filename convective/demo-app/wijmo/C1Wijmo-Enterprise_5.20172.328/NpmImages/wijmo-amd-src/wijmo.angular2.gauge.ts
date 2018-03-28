

import * as wjcGauge from 'wijmo/wijmo.gauge';



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
* Contains Angular 2 components for the <b>wijmo.gauge</b> module.
*
* <b>wijmo.angular2.gauge</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjGauge from 'wijmo/wijmo.angular2.gauge';
* &nbsp;
* &#64;Component({
*     directives: [wjGauge.WjLinearGauge],
*     template: '&lt;wj-linear-gauge [(value)]="amount" [isReadOnly]="false"&gt;&lt;/wj-linear-gauge&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     amount = 0;
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.gauge'/>


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





export var wjLinearGaugeMeta: IWjComponentMeta = {
    selector: 'wj-linear-gauge',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'value',
        'min',
        'max',
        'origin',
        'isReadOnly',
        'step',
        'format',
        'thickness',
        'hasShadow',
        'isAnimated',
        'showText',
        'showTicks',
        'showRanges',
        'thumbSize',
        'tickSpacing',
        'getText',
        'direction',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'valueChangedNg: valueChanged',
        'valueChangePC: valueChange',
    ],
	providers: [
        {
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.gauge.LinearGauge control.
 *
 * Use the <b>wj-linear-gauge</b> component to add <b>LinearGauge</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjLinearGauge</b> component is derived from the <b>LinearGauge</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-linear-gauge</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
*/
@Component({
    selector: wjLinearGaugeMeta.selector,
    template: wjLinearGaugeMeta.template,
    inputs: wjLinearGaugeMeta.inputs,
    outputs: wjLinearGaugeMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjLinearGauge)},
        ...wjLinearGaugeMeta.providers
    ]
})
export class WjLinearGauge extends wjcGauge.LinearGauge implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjLinearGaugeMeta.outputs,
        changeEvents: {
            'valueChanged': ['value']            
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
     * Default value is 'value'.
     */
    wjModelProperty: string = 'value';
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
     * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
     */
    valueChangedNg = new EventEmitter(false);
    valueChangePC = new EventEmitter(false);

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



export var wjBulletGraphMeta: IWjComponentMeta = {
    selector: 'wj-bullet-graph',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'value',
        'min',
        'max',
        'origin',
        'isReadOnly',
        'step',
        'format',
        'thickness',
        'hasShadow',
        'isAnimated',
        'showText',
        'showTicks',
        'showRanges',
        'thumbSize',
        'tickSpacing',
        'getText',
        'direction',
        'target',
        'good',
        'bad',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'valueChangedNg: valueChanged',
        'valueChangePC: valueChange',
    ],
	providers: [
        {
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.gauge.BulletGraph control.
 *
 * Use the <b>wj-bullet-graph</b> component to add <b>BulletGraph</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjBulletGraph</b> component is derived from the <b>BulletGraph</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-bullet-graph</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
*/
@Component({
    selector: wjBulletGraphMeta.selector,
    template: wjBulletGraphMeta.template,
    inputs: wjBulletGraphMeta.inputs,
    outputs: wjBulletGraphMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjBulletGraph)},
        ...wjBulletGraphMeta.providers
    ]
})
export class WjBulletGraph extends wjcGauge.BulletGraph implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjBulletGraphMeta.outputs,
        changeEvents: {
            'valueChanged': ['value']            
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
     * Default value is 'value'.
     */
    wjModelProperty: string = 'value';
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
     * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
     */
    valueChangedNg = new EventEmitter(false);
    valueChangePC = new EventEmitter(false);

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



export var wjRadialGaugeMeta: IWjComponentMeta = {
    selector: 'wj-radial-gauge',
    template: `<div><ng-content></ng-content></div>`,
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'value',
        'min',
        'max',
        'origin',
        'isReadOnly',
        'step',
        'format',
        'thickness',
        'hasShadow',
        'isAnimated',
        'showText',
        'showTicks',
        'showRanges',
        'thumbSize',
        'tickSpacing',
        'getText',
        'autoScale',
        'startAngle',
        'sweepAngle',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'valueChangedNg: valueChanged',
        'valueChangePC: valueChange',
    ],
	providers: [
        {
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.gauge.RadialGauge control.
 *
 * Use the <b>wj-radial-gauge</b> component to add <b>RadialGauge</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjRadialGauge</b> component is derived from the <b>RadialGauge</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-radial-gauge</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
*/
@Component({
    selector: wjRadialGaugeMeta.selector,
    template: wjRadialGaugeMeta.template,
    inputs: wjRadialGaugeMeta.inputs,
    outputs: wjRadialGaugeMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjRadialGauge)},
        ...wjRadialGaugeMeta.providers
    ]
})
export class WjRadialGauge extends wjcGauge.RadialGauge implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjRadialGaugeMeta.outputs,
        changeEvents: {
            'valueChanged': ['value']            
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
     * Default value is 'value'.
     */
    wjModelProperty: string = 'value';
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
     * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
     */
    valueChangedNg = new EventEmitter(false);
    valueChangePC = new EventEmitter(false);

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



export var wjRangeMeta: IWjComponentMeta = {
    selector: 'wj-range',
    template: ``,
    inputs: [
        'wjProperty',
        'color',
        'min',
        'max',
        'name',
        'thickness',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.gauge.Range control. 
 * 
 * The <b>wj-range</b> component must be 
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.gauge.WjLinearGauge
 * , @see:wijmo/wijmo.angular2.gauge.WjBulletGraph
 *  or @see:wijmo/wijmo.angular2.gauge.WjRadialGauge.
 *
 * Use the <b>wj-range</b> component to add <b>Range</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
 * The <b>WjRange</b> component is derived from the <b>Range</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjRangeMeta.selector,
    template: wjRangeMeta.template,
    inputs: wjRangeMeta.inputs,
    outputs: wjRangeMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjRange)},
        ...wjRangeMeta.providers
    ]
})
export class WjRange extends wjcGauge.Range implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjRangeMeta.outputs,
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
     * Default value is 'ranges'.
     */
    wjProperty: string = 'ranges';

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
    WjLinearGauge,
    WjBulletGraph,
    WjRadialGauge,
    WjRange];
@NgModule({
    imports: [WjDirectiveBaseModule, CommonModule],
    declarations: [...moduleExports,],
    exports: [...moduleExports],
})
export class WjGaugeModule {
}
