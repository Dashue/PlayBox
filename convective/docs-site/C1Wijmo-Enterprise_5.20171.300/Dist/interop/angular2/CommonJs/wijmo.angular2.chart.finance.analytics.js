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
* Contains Angular 2 components for the <b>wijmo.chart.finance.analytics</b> module.
*
* <b>wijmo.angular2.chart.finance.analytics</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjFinanceAnalitics from 'wijmo/wijmo.angular2.chart.finance.analytics';</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.finance.analytics'/>
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
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjFlexChartFibonacciMeta = {
    selector: 'wj-flex-chart-fibonacci',
    template: "",
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
        'high',
        'low',
        'labelPosition',
        'levels',
        'minX',
        'maxX',
        'uptrend',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.Fibonacci control.
 *
 * The <b>wj-flex-chart-fibonacci</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-fibonacci</b> component to add <b>Fibonacci</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartFibonacci</b> component is derived from the <b>Fibonacci</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartFibonacci = WjFlexChartFibonacci_1 = (function (_super) {
    __extends(WjFlexChartFibonacci, _super);
    function WjFlexChartFibonacci(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendering</b> Wijmo event name.
         */
        _this.renderingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendered</b> Wijmo event name.
         */
        _this.renderedNg = new core_1.EventEmitter(false);
        _this.visibilityChangePC = new core_1.EventEmitter(false);
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
    WjFlexChartFibonacci.prototype.created = function () {
    };
    WjFlexChartFibonacci.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartFibonacci.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartFibonacci.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartFibonacci;
}(wijmo.chart.finance.analytics.Fibonacci));
WjFlexChartFibonacci.meta = {
    outputs: exports.wjFlexChartFibonacciMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartFibonacci = WjFlexChartFibonacci_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartFibonacciMeta.selector,
        template: exports.wjFlexChartFibonacciMeta.template,
        inputs: exports.wjFlexChartFibonacciMeta.inputs,
        outputs: exports.wjFlexChartFibonacciMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacci_1; }) }
        ].concat(exports.wjFlexChartFibonacciMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartFibonacci);
exports.WjFlexChartFibonacci = WjFlexChartFibonacci;
exports.wjFlexChartFibonacciArcsMeta = {
    selector: 'wj-flex-chart-fibonacci-arcs',
    template: "",
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
        'start',
        'end',
        'labelPosition',
        'levels',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.FibonacciArcs control.
 *
 * The <b>wj-flex-chart-fibonacci-arcs</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-fibonacci-arcs</b> component to add <b>FibonacciArcs</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartFibonacciArcs</b> component is derived from the <b>FibonacciArcs</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartFibonacciArcs = WjFlexChartFibonacciArcs_1 = (function (_super) {
    __extends(WjFlexChartFibonacciArcs, _super);
    function WjFlexChartFibonacciArcs(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendering</b> Wijmo event name.
         */
        _this.renderingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendered</b> Wijmo event name.
         */
        _this.renderedNg = new core_1.EventEmitter(false);
        _this.visibilityChangePC = new core_1.EventEmitter(false);
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
    WjFlexChartFibonacciArcs.prototype.created = function () {
    };
    WjFlexChartFibonacciArcs.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartFibonacciArcs.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartFibonacciArcs.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartFibonacciArcs;
}(wijmo.chart.finance.analytics.FibonacciArcs));
WjFlexChartFibonacciArcs.meta = {
    outputs: exports.wjFlexChartFibonacciArcsMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartFibonacciArcs = WjFlexChartFibonacciArcs_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartFibonacciArcsMeta.selector,
        template: exports.wjFlexChartFibonacciArcsMeta.template,
        inputs: exports.wjFlexChartFibonacciArcsMeta.inputs,
        outputs: exports.wjFlexChartFibonacciArcsMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciArcs_1; }) }
        ].concat(exports.wjFlexChartFibonacciArcsMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartFibonacciArcs);
exports.WjFlexChartFibonacciArcs = WjFlexChartFibonacciArcs;
exports.wjFlexChartFibonacciFansMeta = {
    selector: 'wj-flex-chart-fibonacci-fans',
    template: "",
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
        'start',
        'end',
        'labelPosition',
        'levels',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.FibonacciFans control.
 *
 * The <b>wj-flex-chart-fibonacci-fans</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-fibonacci-fans</b> component to add <b>FibonacciFans</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartFibonacciFans</b> component is derived from the <b>FibonacciFans</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartFibonacciFans = WjFlexChartFibonacciFans_1 = (function (_super) {
    __extends(WjFlexChartFibonacciFans, _super);
    function WjFlexChartFibonacciFans(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendering</b> Wijmo event name.
         */
        _this.renderingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendered</b> Wijmo event name.
         */
        _this.renderedNg = new core_1.EventEmitter(false);
        _this.visibilityChangePC = new core_1.EventEmitter(false);
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
    WjFlexChartFibonacciFans.prototype.created = function () {
    };
    WjFlexChartFibonacciFans.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartFibonacciFans.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartFibonacciFans.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartFibonacciFans;
}(wijmo.chart.finance.analytics.FibonacciFans));
WjFlexChartFibonacciFans.meta = {
    outputs: exports.wjFlexChartFibonacciFansMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartFibonacciFans = WjFlexChartFibonacciFans_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartFibonacciFansMeta.selector,
        template: exports.wjFlexChartFibonacciFansMeta.template,
        inputs: exports.wjFlexChartFibonacciFansMeta.inputs,
        outputs: exports.wjFlexChartFibonacciFansMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciFans_1; }) }
        ].concat(exports.wjFlexChartFibonacciFansMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartFibonacciFans);
exports.WjFlexChartFibonacciFans = WjFlexChartFibonacciFans;
exports.wjFlexChartFibonacciTimeZonesMeta = {
    selector: 'wj-flex-chart-fibonacci-time-zones',
    template: "",
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
        'startX',
        'endX',
        'labelPosition',
        'levels',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.FibonacciTimeZones control.
 *
 * The <b>wj-flex-chart-fibonacci-time-zones</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-fibonacci-time-zones</b> component to add <b>FibonacciTimeZones</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartFibonacciTimeZones</b> component is derived from the <b>FibonacciTimeZones</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartFibonacciTimeZones = WjFlexChartFibonacciTimeZones_1 = (function (_super) {
    __extends(WjFlexChartFibonacciTimeZones, _super);
    function WjFlexChartFibonacciTimeZones(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendering</b> Wijmo event name.
         */
        _this.renderingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendered</b> Wijmo event name.
         */
        _this.renderedNg = new core_1.EventEmitter(false);
        _this.visibilityChangePC = new core_1.EventEmitter(false);
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
    WjFlexChartFibonacciTimeZones.prototype.created = function () {
    };
    WjFlexChartFibonacciTimeZones.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartFibonacciTimeZones.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartFibonacciTimeZones.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartFibonacciTimeZones;
}(wijmo.chart.finance.analytics.FibonacciTimeZones));
WjFlexChartFibonacciTimeZones.meta = {
    outputs: exports.wjFlexChartFibonacciTimeZonesMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartFibonacciTimeZones = WjFlexChartFibonacciTimeZones_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartFibonacciTimeZonesMeta.selector,
        template: exports.wjFlexChartFibonacciTimeZonesMeta.template,
        inputs: exports.wjFlexChartFibonacciTimeZonesMeta.inputs,
        outputs: exports.wjFlexChartFibonacciTimeZonesMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciTimeZones_1; }) }
        ].concat(exports.wjFlexChartFibonacciTimeZonesMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartFibonacciTimeZones);
exports.WjFlexChartFibonacciTimeZones = WjFlexChartFibonacciTimeZones;
exports.wjFlexChartAtrMeta = {
    selector: 'wj-flex-chart-atr',
    template: "",
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
        'period',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.ATR control.
 *
 * The <b>wj-flex-chart-atr</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-atr</b> component to add <b>ATR</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartAtr</b> component is derived from the <b>ATR</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartAtr = WjFlexChartAtr_1 = (function (_super) {
    __extends(WjFlexChartAtr, _super);
    function WjFlexChartAtr(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendering</b> Wijmo event name.
         */
        _this.renderingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendered</b> Wijmo event name.
         */
        _this.renderedNg = new core_1.EventEmitter(false);
        _this.visibilityChangePC = new core_1.EventEmitter(false);
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
    WjFlexChartAtr.prototype.created = function () {
    };
    WjFlexChartAtr.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartAtr.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartAtr.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartAtr;
}(wijmo.chart.finance.analytics.ATR));
WjFlexChartAtr.meta = {
    outputs: exports.wjFlexChartAtrMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartAtr = WjFlexChartAtr_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartAtrMeta.selector,
        template: exports.wjFlexChartAtrMeta.template,
        inputs: exports.wjFlexChartAtrMeta.inputs,
        outputs: exports.wjFlexChartAtrMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAtr_1; }) }
        ].concat(exports.wjFlexChartAtrMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartAtr);
exports.WjFlexChartAtr = WjFlexChartAtr;
exports.wjFlexChartCciMeta = {
    selector: 'wj-flex-chart-cci',
    template: "",
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
        'period',
        'constant',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.CCI control.
 *
 * The <b>wj-flex-chart-cci</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-cci</b> component to add <b>CCI</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartCci</b> component is derived from the <b>CCI</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartCci = WjFlexChartCci_1 = (function (_super) {
    __extends(WjFlexChartCci, _super);
    function WjFlexChartCci(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendering</b> Wijmo event name.
         */
        _this.renderingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendered</b> Wijmo event name.
         */
        _this.renderedNg = new core_1.EventEmitter(false);
        _this.visibilityChangePC = new core_1.EventEmitter(false);
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
    WjFlexChartCci.prototype.created = function () {
    };
    WjFlexChartCci.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartCci.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartCci.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartCci;
}(wijmo.chart.finance.analytics.CCI));
WjFlexChartCci.meta = {
    outputs: exports.wjFlexChartCciMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartCci = WjFlexChartCci_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartCciMeta.selector,
        template: exports.wjFlexChartCciMeta.template,
        inputs: exports.wjFlexChartCciMeta.inputs,
        outputs: exports.wjFlexChartCciMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartCci_1; }) }
        ].concat(exports.wjFlexChartCciMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartCci);
exports.WjFlexChartCci = WjFlexChartCci;
exports.wjFlexChartRsiMeta = {
    selector: 'wj-flex-chart-rsi',
    template: "",
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
        'period',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.RSI control.
 *
 * The <b>wj-flex-chart-rsi</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-rsi</b> component to add <b>RSI</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartRsi</b> component is derived from the <b>RSI</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartRsi = WjFlexChartRsi_1 = (function (_super) {
    __extends(WjFlexChartRsi, _super);
    function WjFlexChartRsi(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendering</b> Wijmo event name.
         */
        _this.renderingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendered</b> Wijmo event name.
         */
        _this.renderedNg = new core_1.EventEmitter(false);
        _this.visibilityChangePC = new core_1.EventEmitter(false);
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
    WjFlexChartRsi.prototype.created = function () {
    };
    WjFlexChartRsi.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartRsi.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartRsi.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartRsi;
}(wijmo.chart.finance.analytics.RSI));
WjFlexChartRsi.meta = {
    outputs: exports.wjFlexChartRsiMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartRsi = WjFlexChartRsi_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartRsiMeta.selector,
        template: exports.wjFlexChartRsiMeta.template,
        inputs: exports.wjFlexChartRsiMeta.inputs,
        outputs: exports.wjFlexChartRsiMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartRsi_1; }) }
        ].concat(exports.wjFlexChartRsiMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartRsi);
exports.WjFlexChartRsi = WjFlexChartRsi;
exports.wjFlexChartWilliamsRMeta = {
    selector: 'wj-flex-chart-williams-r',
    template: "",
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
        'period',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.WilliamsR control.
 *
 * The <b>wj-flex-chart-williams-r</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-williams-r</b> component to add <b>WilliamsR</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartWilliamsR</b> component is derived from the <b>WilliamsR</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartWilliamsR = WjFlexChartWilliamsR_1 = (function (_super) {
    __extends(WjFlexChartWilliamsR, _super);
    function WjFlexChartWilliamsR(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendering</b> Wijmo event name.
         */
        _this.renderingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendered</b> Wijmo event name.
         */
        _this.renderedNg = new core_1.EventEmitter(false);
        _this.visibilityChangePC = new core_1.EventEmitter(false);
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
    WjFlexChartWilliamsR.prototype.created = function () {
    };
    WjFlexChartWilliamsR.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartWilliamsR.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartWilliamsR.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartWilliamsR;
}(wijmo.chart.finance.analytics.WilliamsR));
WjFlexChartWilliamsR.meta = {
    outputs: exports.wjFlexChartWilliamsRMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartWilliamsR = WjFlexChartWilliamsR_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartWilliamsRMeta.selector,
        template: exports.wjFlexChartWilliamsRMeta.template,
        inputs: exports.wjFlexChartWilliamsRMeta.inputs,
        outputs: exports.wjFlexChartWilliamsRMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartWilliamsR_1; }) }
        ].concat(exports.wjFlexChartWilliamsRMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartWilliamsR);
exports.WjFlexChartWilliamsR = WjFlexChartWilliamsR;
exports.wjFlexChartMacdMeta = {
    selector: 'wj-flex-chart-macd',
    template: "",
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
        'fastPeriod',
        'slowPeriod',
        'smoothingPeriod',
        'styles',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.Macd control.
 *
 * The <b>wj-flex-chart-macd</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-macd</b> component to add <b>Macd</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartMacd</b> component is derived from the <b>Macd</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartMacd = WjFlexChartMacd_1 = (function (_super) {
    __extends(WjFlexChartMacd, _super);
    function WjFlexChartMacd(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendering</b> Wijmo event name.
         */
        _this.renderingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendered</b> Wijmo event name.
         */
        _this.renderedNg = new core_1.EventEmitter(false);
        _this.visibilityChangePC = new core_1.EventEmitter(false);
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
    WjFlexChartMacd.prototype.created = function () {
    };
    WjFlexChartMacd.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartMacd.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartMacd.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartMacd;
}(wijmo.chart.finance.analytics.Macd));
WjFlexChartMacd.meta = {
    outputs: exports.wjFlexChartMacdMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartMacd = WjFlexChartMacd_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartMacdMeta.selector,
        template: exports.wjFlexChartMacdMeta.template,
        inputs: exports.wjFlexChartMacdMeta.inputs,
        outputs: exports.wjFlexChartMacdMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMacd_1; }) }
        ].concat(exports.wjFlexChartMacdMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartMacd);
exports.WjFlexChartMacd = WjFlexChartMacd;
exports.wjFlexChartMacdHistogramMeta = {
    selector: 'wj-flex-chart-macd-histogram',
    template: "",
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
        'fastPeriod',
        'slowPeriod',
        'smoothingPeriod',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.MacdHistogram control.
 *
 * The <b>wj-flex-chart-macd-histogram</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-macd-histogram</b> component to add <b>MacdHistogram</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartMacdHistogram</b> component is derived from the <b>MacdHistogram</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartMacdHistogram = WjFlexChartMacdHistogram_1 = (function (_super) {
    __extends(WjFlexChartMacdHistogram, _super);
    function WjFlexChartMacdHistogram(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendering</b> Wijmo event name.
         */
        _this.renderingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendered</b> Wijmo event name.
         */
        _this.renderedNg = new core_1.EventEmitter(false);
        _this.visibilityChangePC = new core_1.EventEmitter(false);
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
    WjFlexChartMacdHistogram.prototype.created = function () {
    };
    WjFlexChartMacdHistogram.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartMacdHistogram.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartMacdHistogram.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartMacdHistogram;
}(wijmo.chart.finance.analytics.MacdHistogram));
WjFlexChartMacdHistogram.meta = {
    outputs: exports.wjFlexChartMacdHistogramMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartMacdHistogram = WjFlexChartMacdHistogram_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartMacdHistogramMeta.selector,
        template: exports.wjFlexChartMacdHistogramMeta.template,
        inputs: exports.wjFlexChartMacdHistogramMeta.inputs,
        outputs: exports.wjFlexChartMacdHistogramMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMacdHistogram_1; }) }
        ].concat(exports.wjFlexChartMacdHistogramMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartMacdHistogram);
exports.WjFlexChartMacdHistogram = WjFlexChartMacdHistogram;
exports.wjFlexChartStochasticMeta = {
    selector: 'wj-flex-chart-stochastic',
    template: "",
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
        'dPeriod',
        'kPeriod',
        'smoothingPeriod',
        'styles',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.Stochastic control.
 *
 * The <b>wj-flex-chart-stochastic</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-stochastic</b> component to add <b>Stochastic</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartStochastic</b> component is derived from the <b>Stochastic</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartStochastic = WjFlexChartStochastic_1 = (function (_super) {
    __extends(WjFlexChartStochastic, _super);
    function WjFlexChartStochastic(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendering</b> Wijmo event name.
         */
        _this.renderingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendered</b> Wijmo event name.
         */
        _this.renderedNg = new core_1.EventEmitter(false);
        _this.visibilityChangePC = new core_1.EventEmitter(false);
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
    WjFlexChartStochastic.prototype.created = function () {
    };
    WjFlexChartStochastic.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartStochastic.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartStochastic.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartStochastic;
}(wijmo.chart.finance.analytics.Stochastic));
WjFlexChartStochastic.meta = {
    outputs: exports.wjFlexChartStochasticMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartStochastic = WjFlexChartStochastic_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartStochasticMeta.selector,
        template: exports.wjFlexChartStochasticMeta.template,
        inputs: exports.wjFlexChartStochasticMeta.inputs,
        outputs: exports.wjFlexChartStochasticMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartStochastic_1; }) }
        ].concat(exports.wjFlexChartStochasticMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartStochastic);
exports.WjFlexChartStochastic = WjFlexChartStochastic;
exports.wjFlexChartBollingerBandsMeta = {
    selector: 'wj-flex-chart-bollinger-bands',
    template: "",
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
        'period',
        'multiplier',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.BollingerBands control.
 *
 * The <b>wj-flex-chart-bollinger-bands</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-bollinger-bands</b> component to add <b>BollingerBands</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartBollingerBands</b> component is derived from the <b>BollingerBands</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartBollingerBands = WjFlexChartBollingerBands_1 = (function (_super) {
    __extends(WjFlexChartBollingerBands, _super);
    function WjFlexChartBollingerBands(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendering</b> Wijmo event name.
         */
        _this.renderingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendered</b> Wijmo event name.
         */
        _this.renderedNg = new core_1.EventEmitter(false);
        _this.visibilityChangePC = new core_1.EventEmitter(false);
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
    WjFlexChartBollingerBands.prototype.created = function () {
    };
    WjFlexChartBollingerBands.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartBollingerBands.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartBollingerBands.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartBollingerBands;
}(wijmo.chart.finance.analytics.BollingerBands));
WjFlexChartBollingerBands.meta = {
    outputs: exports.wjFlexChartBollingerBandsMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartBollingerBands = WjFlexChartBollingerBands_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartBollingerBandsMeta.selector,
        template: exports.wjFlexChartBollingerBandsMeta.template,
        inputs: exports.wjFlexChartBollingerBandsMeta.inputs,
        outputs: exports.wjFlexChartBollingerBandsMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartBollingerBands_1; }) }
        ].concat(exports.wjFlexChartBollingerBandsMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartBollingerBands);
exports.WjFlexChartBollingerBands = WjFlexChartBollingerBands;
exports.wjFlexChartEnvelopesMeta = {
    selector: 'wj-flex-chart-envelopes',
    template: "",
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
        'period',
        'size',
        'type',
    ],
    outputs: [
        'initialized',
        'renderingNg: rendering',
        'renderedNg: rendered',
        'visibilityChangePC: visibilityChange',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.analytics.Envelopes control.
 *
 * The <b>wj-flex-chart-envelopes</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-flex-chart-envelopes</b> component to add <b>Envelopes</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartEnvelopes</b> component is derived from the <b>Envelopes</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartEnvelopes = WjFlexChartEnvelopes_1 = (function (_super) {
    __extends(WjFlexChartEnvelopes, _super);
    function WjFlexChartEnvelopes(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'series'.
         */
        _this.wjProperty = 'series';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendering</b> Wijmo event name.
         */
        _this.renderingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>rendered</b> Wijmo event name.
         */
        _this.renderedNg = new core_1.EventEmitter(false);
        _this.visibilityChangePC = new core_1.EventEmitter(false);
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
    WjFlexChartEnvelopes.prototype.created = function () {
    };
    WjFlexChartEnvelopes.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartEnvelopes.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartEnvelopes.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartEnvelopes;
}(wijmo.chart.finance.analytics.Envelopes));
WjFlexChartEnvelopes.meta = {
    outputs: exports.wjFlexChartEnvelopesMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartEnvelopes = WjFlexChartEnvelopes_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartEnvelopesMeta.selector,
        template: exports.wjFlexChartEnvelopesMeta.template,
        inputs: exports.wjFlexChartEnvelopesMeta.inputs,
        outputs: exports.wjFlexChartEnvelopesMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartEnvelopes_1; }) }
        ].concat(exports.wjFlexChartEnvelopesMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartEnvelopes);
exports.WjFlexChartEnvelopes = WjFlexChartEnvelopes;
var moduleExports = [
    WjFlexChartFibonacci,
    WjFlexChartFibonacciArcs,
    WjFlexChartFibonacciFans,
    WjFlexChartFibonacciTimeZones,
    WjFlexChartAtr,
    WjFlexChartCci,
    WjFlexChartRsi,
    WjFlexChartWilliamsR,
    WjFlexChartMacd,
    WjFlexChartMacdHistogram,
    WjFlexChartStochastic,
    WjFlexChartBollingerBands,
    WjFlexChartEnvelopes
];
var WjChartFinanceAnalyticsModule = (function () {
    function WjChartFinanceAnalyticsModule() {
    }
    return WjChartFinanceAnalyticsModule;
}());
WjChartFinanceAnalyticsModule = __decorate([
    core_1.NgModule({
        imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
        declarations: moduleExports.slice(),
        exports: moduleExports.slice(),
    })
], WjChartFinanceAnalyticsModule);
exports.WjChartFinanceAnalyticsModule = WjChartFinanceAnalyticsModule;
var WjFlexChartFibonacci_1, WjFlexChartFibonacciArcs_1, WjFlexChartFibonacciFans_1, WjFlexChartFibonacciTimeZones_1, WjFlexChartAtr_1, WjFlexChartCci_1, WjFlexChartRsi_1, WjFlexChartWilliamsR_1, WjFlexChartMacd_1, WjFlexChartMacdHistogram_1, WjFlexChartStochastic_1, WjFlexChartBollingerBands_1, WjFlexChartEnvelopes_1;
