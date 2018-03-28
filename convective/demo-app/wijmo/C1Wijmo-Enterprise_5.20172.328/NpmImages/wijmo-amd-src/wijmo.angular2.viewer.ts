

import * as wjcViewer from 'wijmo/wijmo.viewer';
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
* Contains Angular 2 components for the <b>wijmo.viewer</b> module.
*
* <b>wijmo.angular2.viewer</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjViewer from 'wijmo/wijmo.angular2.viewer';
* &nbsp;
* &#64;Component({
*     directives: [wjViewer.WjReportViewer, wjViewer.WjPdfViewer],
*     template: `
*       &lt;wj-report-viewer [reportName]="sales" [serviceUrl]="'webserviceApi'"&gt;
*       &lt;/wj-report-viewer;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.viewer'/>


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





export var wjReportViewerMeta: IWjComponentMeta = {
    selector: 'wj-report-viewer',
    template: ``,
    inputs: [
        'wjModelProperty',
        'serviceUrl',
        'filePath',
        'fullScreen',
        'zoomFactor',
        'mouseMode',
        'selectMouseMode',
        'viewMode',
        'paginated',
        'reportName',
    ],
    outputs: [
        'initialized',
        'pageIndexChangedNg: pageIndexChanged',
        'viewModeChangedNg: viewModeChanged',
        'viewModeChangePC: viewModeChange',
        'mouseModeChangedNg: mouseModeChanged',
        'mouseModeChangePC: mouseModeChange',
        'selectMouseModeChangedNg: selectMouseModeChanged',
        'selectMouseModeChangePC: selectMouseModeChange',
        'fullScreenChangedNg: fullScreenChanged',
        'fullScreenChangePC: fullScreenChange',
        'zoomFactorChangedNg: zoomFactorChanged',
        'zoomFactorChangePC: zoomFactorChange',
        'queryLoadingDataNg: queryLoadingData',
    ],
	providers: [
        {
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.viewer.ReportViewer control.
 *
 * Use the <b>wj-report-viewer</b> component to add <b>ReportViewer</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
* The <b>WjReportViewer</b> component is derived from the <b>ReportViewer</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjReportViewerMeta.selector,
    template: wjReportViewerMeta.template,
    inputs: wjReportViewerMeta.inputs,
    outputs: wjReportViewerMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjReportViewer)},
        ...wjReportViewerMeta.providers
    ]
})
export class WjReportViewer extends wjcViewer.ReportViewer implements OnInit, OnDestroy, AfterViewInit {
    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjReportViewerMeta.outputs,
        changeEvents: {
            'viewModeChanged': ['viewMode'], 
            'mouseModeChanged': ['mouseMode'], 
            'selectMouseModeChanged': ['selectMouseMode'], 
            'fullScreenChanged': ['fullScreen'], 
            'zoomFactorChanged': ['zoomFactor']            
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
     * Angular (EventEmitter) version of the Wijmo <b>pageIndexChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>pageIndexChanged</b> Wijmo event name.
     */
    pageIndexChangedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>viewModeChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>viewModeChanged</b> Wijmo event name.
     */
    viewModeChangedNg = new EventEmitter(false);
    viewModeChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>mouseModeChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>mouseModeChanged</b> Wijmo event name.
     */
    mouseModeChangedNg = new EventEmitter(false);
    mouseModeChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectMouseModeChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectMouseModeChanged</b> Wijmo event name.
     */
    selectMouseModeChangedNg = new EventEmitter(false);
    selectMouseModeChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>fullScreenChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>fullScreenChanged</b> Wijmo event name.
     */
    fullScreenChangedNg = new EventEmitter(false);
    fullScreenChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>zoomFactorChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>zoomFactorChanged</b> Wijmo event name.
     */
    zoomFactorChangedNg = new EventEmitter(false);
    zoomFactorChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>queryLoadingData</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>queryLoadingData</b> Wijmo event name.
     */
    queryLoadingDataNg = new EventEmitter(false);

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

    onSelectMouseModeChanged(e?: wjcCore.EventArgs) {
        // Wijmo interop always subscribes to any event, so we issue a deprecated warning
        // only if there are more than one subscriber. 
        if ((<any[]>this.selectMouseModeChanged['_handlers']).length > 1 ||
                this.selectMouseModeChangedNg.observers.length > 0) {
            wjcCore._deprecated('selectMouseModeChanged', 'mouseModeChanged');
        }
        this.selectMouseModeChanged.raise(this, e);
    }
 
}



export var wjPdfViewerMeta: IWjComponentMeta = {
    selector: 'wj-pdf-viewer',
    template: ``,
    inputs: [
        'wjModelProperty',
        'serviceUrl',
        'filePath',
        'fullScreen',
        'zoomFactor',
        'mouseMode',
        'selectMouseMode',
        'viewMode',
    ],
    outputs: [
        'initialized',
        'pageIndexChangedNg: pageIndexChanged',
        'viewModeChangedNg: viewModeChanged',
        'viewModeChangePC: viewModeChange',
        'mouseModeChangedNg: mouseModeChanged',
        'mouseModeChangePC: mouseModeChange',
        'selectMouseModeChangedNg: selectMouseModeChanged',
        'selectMouseModeChangePC: selectMouseModeChange',
        'fullScreenChangedNg: fullScreenChanged',
        'fullScreenChangePC: fullScreenChange',
        'zoomFactorChangedNg: zoomFactorChanged',
        'zoomFactorChangePC: zoomFactorChange',
        'queryLoadingDataNg: queryLoadingData',
    ],
	providers: [
        {
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.viewer.PdfViewer control.
 *
 * Use the <b>wj-pdf-viewer</b> component to add <b>PdfViewer</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
* The <b>WjPdfViewer</b> component is derived from the <b>PdfViewer</b> control and
 * inherits all its properties, events and methods.
*/
@Component({
    selector: wjPdfViewerMeta.selector,
    template: wjPdfViewerMeta.template,
    inputs: wjPdfViewerMeta.inputs,
    outputs: wjPdfViewerMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjPdfViewer)},
        ...wjPdfViewerMeta.providers
    ]
})
export class WjPdfViewer extends wjcViewer.PdfViewer implements OnInit, OnDestroy, AfterViewInit {
    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjPdfViewerMeta.outputs,
        changeEvents: {
            'viewModeChanged': ['viewMode'], 
            'mouseModeChanged': ['mouseMode'], 
            'selectMouseModeChanged': ['selectMouseMode'], 
            'fullScreenChanged': ['fullScreen'], 
            'zoomFactorChanged': ['zoomFactor']            
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
     * Angular (EventEmitter) version of the Wijmo <b>pageIndexChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>pageIndexChanged</b> Wijmo event name.
     */
    pageIndexChangedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>viewModeChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>viewModeChanged</b> Wijmo event name.
     */
    viewModeChangedNg = new EventEmitter(false);
    viewModeChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>mouseModeChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>mouseModeChanged</b> Wijmo event name.
     */
    mouseModeChangedNg = new EventEmitter(false);
    mouseModeChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectMouseModeChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectMouseModeChanged</b> Wijmo event name.
     */
    selectMouseModeChangedNg = new EventEmitter(false);
    selectMouseModeChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>fullScreenChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>fullScreenChanged</b> Wijmo event name.
     */
    fullScreenChangedNg = new EventEmitter(false);
    fullScreenChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>zoomFactorChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>zoomFactorChanged</b> Wijmo event name.
     */
    zoomFactorChangedNg = new EventEmitter(false);
    zoomFactorChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>queryLoadingData</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>queryLoadingData</b> Wijmo event name.
     */
    queryLoadingDataNg = new EventEmitter(false);

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

    onSelectMouseModeChanged(e?: wjcCore.EventArgs) {
        // Wijmo interop always subscribes to any event, so we issue a deprecated warning
        // only if there are more than one subscriber. 
        if ((<any[]>this.selectMouseModeChanged['_handlers']).length > 1 ||
                this.selectMouseModeChangedNg.observers.length > 0) {
            wjcCore._deprecated('selectMouseModeChanged', 'mouseModeChanged');
        }
        this.selectMouseModeChanged.raise(this, e);
    }
 
}



let moduleExports = [
    WjReportViewer,
    WjPdfViewer];
@NgModule({
    imports: [WjDirectiveBaseModule, CommonModule],
    declarations: [...moduleExports,],
    exports: [...moduleExports],
})
export class WjViewerModule {
}
