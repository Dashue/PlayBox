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
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjReportViewerMeta = {
    selector: 'wj-report-viewer',
    template: "",
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
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
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
var WjReportViewer = WjReportViewer_1 = (function (_super) {
    __extends(WjReportViewer, _super);
    function WjReportViewer(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>pageIndexChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>pageIndexChanged</b> Wijmo event name.
         */
        _this.pageIndexChangedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>viewModeChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>viewModeChanged</b> Wijmo event name.
         */
        _this.viewModeChangedNg = new core_1.EventEmitter(false);
        _this.viewModeChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>mouseModeChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>mouseModeChanged</b> Wijmo event name.
         */
        _this.mouseModeChangedNg = new core_1.EventEmitter(false);
        _this.mouseModeChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>selectMouseModeChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>selectMouseModeChanged</b> Wijmo event name.
         */
        _this.selectMouseModeChangedNg = new core_1.EventEmitter(false);
        _this.selectMouseModeChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>fullScreenChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>fullScreenChanged</b> Wijmo event name.
         */
        _this.fullScreenChangedNg = new core_1.EventEmitter(false);
        _this.fullScreenChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>zoomFactorChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>zoomFactorChanged</b> Wijmo event name.
         */
        _this.zoomFactorChangedNg = new core_1.EventEmitter(false);
        _this.zoomFactorChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>queryLoadingData</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>queryLoadingData</b> Wijmo event name.
         */
        _this.queryLoadingDataNg = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjReportViewer.prototype.created = function () {
    };
    WjReportViewer.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjReportViewer.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjReportViewer.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjReportViewer.prototype.onSelectMouseModeChanged = function (e) {
        // Wijmo interop always subscribes to any event, so we issue a deprecated warning
        // only if there are more than one subscriber. 
        if (this.selectMouseModeChanged['_handlers'].length > 1 ||
            this.selectMouseModeChangedNg.observers.length > 0) {
            wijmo._deprecated('selectMouseModeChanged', 'mouseModeChanged');
        }
        this.selectMouseModeChanged.raise(this, e);
    };
    return WjReportViewer;
}(wijmo.viewer.ReportViewer));
WjReportViewer.meta = {
    outputs: exports.wjReportViewerMeta.outputs,
    changeEvents: {
        'viewModeChanged': ['viewMode'],
        'mouseModeChanged': ['mouseMode'],
        'selectMouseModeChanged': ['selectMouseMode'],
        'fullScreenChanged': ['fullScreen'],
        'zoomFactorChanged': ['zoomFactor']
    },
};
WjReportViewer = WjReportViewer_1 = __decorate([
    core_1.Component({
        selector: exports.wjReportViewerMeta.selector,
        template: exports.wjReportViewerMeta.template,
        inputs: exports.wjReportViewerMeta.inputs,
        outputs: exports.wjReportViewerMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjReportViewer_1; }) }
        ].concat(exports.wjReportViewerMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjReportViewer);
exports.WjReportViewer = WjReportViewer;
exports.wjPdfViewerMeta = {
    selector: 'wj-pdf-viewer',
    template: "",
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
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
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
var WjPdfViewer = WjPdfViewer_1 = (function (_super) {
    __extends(WjPdfViewer, _super);
    function WjPdfViewer(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>pageIndexChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>pageIndexChanged</b> Wijmo event name.
         */
        _this.pageIndexChangedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>viewModeChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>viewModeChanged</b> Wijmo event name.
         */
        _this.viewModeChangedNg = new core_1.EventEmitter(false);
        _this.viewModeChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>mouseModeChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>mouseModeChanged</b> Wijmo event name.
         */
        _this.mouseModeChangedNg = new core_1.EventEmitter(false);
        _this.mouseModeChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>selectMouseModeChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>selectMouseModeChanged</b> Wijmo event name.
         */
        _this.selectMouseModeChangedNg = new core_1.EventEmitter(false);
        _this.selectMouseModeChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>fullScreenChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>fullScreenChanged</b> Wijmo event name.
         */
        _this.fullScreenChangedNg = new core_1.EventEmitter(false);
        _this.fullScreenChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>zoomFactorChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>zoomFactorChanged</b> Wijmo event name.
         */
        _this.zoomFactorChangedNg = new core_1.EventEmitter(false);
        _this.zoomFactorChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>queryLoadingData</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>queryLoadingData</b> Wijmo event name.
         */
        _this.queryLoadingDataNg = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjPdfViewer.prototype.created = function () {
    };
    WjPdfViewer.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjPdfViewer.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjPdfViewer.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjPdfViewer.prototype.onSelectMouseModeChanged = function (e) {
        // Wijmo interop always subscribes to any event, so we issue a deprecated warning
        // only if there are more than one subscriber. 
        if (this.selectMouseModeChanged['_handlers'].length > 1 ||
            this.selectMouseModeChangedNg.observers.length > 0) {
            wijmo._deprecated('selectMouseModeChanged', 'mouseModeChanged');
        }
        this.selectMouseModeChanged.raise(this, e);
    };
    return WjPdfViewer;
}(wijmo.viewer.PdfViewer));
WjPdfViewer.meta = {
    outputs: exports.wjPdfViewerMeta.outputs,
    changeEvents: {
        'viewModeChanged': ['viewMode'],
        'mouseModeChanged': ['mouseMode'],
        'selectMouseModeChanged': ['selectMouseMode'],
        'fullScreenChanged': ['fullScreen'],
        'zoomFactorChanged': ['zoomFactor']
    },
};
WjPdfViewer = WjPdfViewer_1 = __decorate([
    core_1.Component({
        selector: exports.wjPdfViewerMeta.selector,
        template: exports.wjPdfViewerMeta.template,
        inputs: exports.wjPdfViewerMeta.inputs,
        outputs: exports.wjPdfViewerMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPdfViewer_1; }) }
        ].concat(exports.wjPdfViewerMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjPdfViewer);
exports.WjPdfViewer = WjPdfViewer;
var moduleExports = [
    WjReportViewer,
    WjPdfViewer
];
var WjViewerModule = (function () {
    function WjViewerModule() {
    }
    return WjViewerModule;
}());
WjViewerModule = __decorate([
    core_1.NgModule({
        imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
        declarations: moduleExports.slice(),
        exports: moduleExports.slice(),
    })
], WjViewerModule);
exports.WjViewerModule = WjViewerModule;
var WjReportViewer_1, WjPdfViewer_1;
