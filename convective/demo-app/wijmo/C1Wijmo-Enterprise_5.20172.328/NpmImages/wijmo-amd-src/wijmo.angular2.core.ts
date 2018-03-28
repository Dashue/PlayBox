

import * as wjcCore from 'wijmo/wijmo';



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
* Contains Angular 2 components for the <b>wijmo</b> module.
*
* <b>wijmo.angular2.core</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjCore from 'wijmo/wijmo.angular2.core';
* &nbsp;
* &#64;Component({
*     directives: [wjCore.WjTooltip],
*     template: '&lt;span [wjTooltip]="'Greeting'"&gt;Hello&lt;/span&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.core'/>


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





export var wjTooltipMeta: IWjDirectiveMeta = {
    selector: '[wjTooltip]',
    inputs: [
         
    ],
    outputs: [
        'initialized',
    ],
    exportAs: 'wjTooltip',
	providers: [
    ]
};
/**
    * Angular 2 directive for the @see:Tooltip class.
    *
    * Use the <b>wjTooltip</b> directive to add tooltips to elements on the page. 
    * The wjTooltip directive supports HTML content, smart positioning, and touch.
    *
    * The wjTooltip directive is specified as a parameter added to the 
    * element that the tooltip applies to. The parameter value is the tooltip
    * text or the id of an element that contains the text. For example:
    *
    * <pre>&lt;p [wjTooltip]="'#fineprint'" &gt;
    *     Regular paragraph content...&lt;/p&gt;
    * ...
    * &lt;div id="fineprint" style="display:none"&gt;
    *   &lt;h3&gt;Important Note&lt;/h3&gt;
    *   &lt;p&gt;
    *     Data for the current quarter is estimated 
    *     by pro-rating etc.&lt;/p&gt;
    * &lt;/div&gt;</pre>
    */
@Directive({
    selector: wjTooltipMeta.selector,
    inputs: wjTooltipMeta.inputs,
    outputs: wjTooltipMeta.outputs,
    exportAs: wjTooltipMeta.exportAs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjTooltip)},
        ...wjTooltipMeta.providers
    ]
})
export class WjTooltip implements OnInit, OnDestroy, AfterViewInit {
    private static _toolTip: wjcCore.Tooltip;
    private _toolTipText: string;
	private _elRef: ElementRef;

    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjTooltipMeta.outputs,
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
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);

		this._elRef = elRef;
        if (!WjTooltip._toolTip) {
            WjTooltip._toolTip = new wjcCore.Tooltip();
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
        this.wjTooltip = null;
    }

    @Input()
    get wjTooltip(): string {
        return this._toolTipText;
    }
    set wjTooltip(value: string) {
        if (this._toolTipText != value) {
            this._toolTipText != value;
            WjTooltip._toolTip.setTooltip(this._elRef.nativeElement, value);
        }
    } 
}



/**
    * TBD
    */
@Component({
    selector: 'wj-component-loader',
    template: `<div #anchor></div>`,
    inputs: ['component', 'properties'],
    outputs: ['propertiesChange']
})
export class WjComponentLoader implements AfterViewInit {
    private _component: any;
    private _properties: Object;
    private _cmpRef: ngCore.ComponentRef<any>;
    private _isViewInit = false;
    @ViewChild('anchor', { read: ViewContainerRef }) private _anchor: ViewContainerRef;

    propertiesChange = new ngCore.EventEmitter();

    constructor( /*@Inject(DynamicComponentLoader) private _dcl: DynamicComponentLoader,*/
        @Inject(ComponentFactoryResolver) private _cmpResolver: ComponentFactoryResolver,
        @Inject(ElementRef) private _elementRef: ElementRef) {
    }

    get component(): any {
        return this._component;
    }
    set component(value: any) {
        if (this._component !== value) {
            this._component = value;
            this._createComponent();
        }
    }

    get properties(): Object {
        return this._properties;
    }
    set properties(value: Object) {
        this._properties = value;
        this._updateProperties();
    }

    ngAfterViewInit() {
        this._isViewInit = true;
        this._createComponent();
    }

    private _createComponent() {
        if (this._isViewInit) {
            if (this._cmpRef) {
                this._cmpRef.destroy();
                this._cmpRef = null;
            }
            let value = this._component;
            if (value && this._anchor) {
                //this._dcl.loadNextToLocation(value, this._anchor).then((cmpRef) => {
                //    this._cmpRef = cmpRef;
                //    this._updateProperties();
                //});

                this._cmpRef = this._anchor.createComponent(this._cmpResolver.resolveComponentFactory(value));
                this._updateProperties();
            }
        }
    }

    private _updateProperties() {
        let cmp = this._cmpRef && this._cmpRef.instance,
        properties = this.properties;
        if (cmp && properties) {
            let propNames = Object.getOwnPropertyNames(properties);
            for (let pName of propNames) {
                cmp[pName] = properties[pName];

                let propChange = cmp[pName + 'Change'];
                if (propChange instanceof EventEmitter) {
                    //TBD: unsubscribe
                    this._addPropListener(cmp, pName, <EventEmitter<any>>propChange);
                }
            }
        }
    }

    private _addPropListener(component: any, propName: string, propChange: EventEmitter<any>) {
        propChange.subscribe((data) => {
            this.properties[propName] =
                this.properties[propName] = component[propName];
                this.propertiesChange.next(this.properties);
        });
    }
}



let moduleExports = [
    WjTooltip, WjComponentLoader];
@NgModule({
    imports: [WjDirectiveBaseModule, CommonModule],
    declarations: [...moduleExports,],
    exports: [...moduleExports],
})
export class WjCoreModule {
}
