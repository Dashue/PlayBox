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
/**
* Contains Angular 2 components for the <b>wijmo.chart.analytics</b> module.
*
* <b>wijmo.angular2.chart.analytics</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjAnalitics from 'wijmo/wijmo.angular2.chart.analytics';</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.analytics'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjFlexChartTrendLineMeta = {
    selector: 'wj-flex-chart-trend-line',
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
        'sampleCount',
        'order',
        'fitType',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.TrendLine control.
 *
 * The <b>wj-flex-chart-trend-line</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-trend-line</b> component to add <b>TrendLine</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartTrendLine</b> component is derived from the <b>TrendLine</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartTrendLine = WjFlexChartTrendLine_1 = (function (_super) {
    __extends(WjFlexChartTrendLine, _super);
    function WjFlexChartTrendLine(elRef, injector, parentCmp) {
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
    WjFlexChartTrendLine.prototype.created = function () {
    };
    WjFlexChartTrendLine.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartTrendLine.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartTrendLine.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartTrendLine;
}(wijmo.chart.analytics.TrendLine));
WjFlexChartTrendLine.meta = {
    outputs: exports.wjFlexChartTrendLineMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartTrendLine = WjFlexChartTrendLine_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartTrendLineMeta.selector,
        template: exports.wjFlexChartTrendLineMeta.template,
        inputs: exports.wjFlexChartTrendLineMeta.inputs,
        outputs: exports.wjFlexChartTrendLineMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartTrendLine_1; }) }
        ].concat(exports.wjFlexChartTrendLineMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartTrendLine);
exports.WjFlexChartTrendLine = WjFlexChartTrendLine;
exports.wjFlexChartMovingAverageMeta = {
    selector: 'wj-flex-chart-moving-average',
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
        'sampleCount',
        'period',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.MovingAverage control.
 *
 * The <b>wj-flex-chart-moving-average</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-moving-average</b> component to add <b>MovingAverage</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartMovingAverage</b> component is derived from the <b>MovingAverage</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartMovingAverage = WjFlexChartMovingAverage_1 = (function (_super) {
    __extends(WjFlexChartMovingAverage, _super);
    function WjFlexChartMovingAverage(elRef, injector, parentCmp) {
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
    WjFlexChartMovingAverage.prototype.created = function () {
    };
    WjFlexChartMovingAverage.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartMovingAverage.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartMovingAverage.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartMovingAverage;
}(wijmo.chart.analytics.MovingAverage));
WjFlexChartMovingAverage.meta = {
    outputs: exports.wjFlexChartMovingAverageMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartMovingAverage = WjFlexChartMovingAverage_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartMovingAverageMeta.selector,
        template: exports.wjFlexChartMovingAverageMeta.template,
        inputs: exports.wjFlexChartMovingAverageMeta.inputs,
        outputs: exports.wjFlexChartMovingAverageMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMovingAverage_1; }) }
        ].concat(exports.wjFlexChartMovingAverageMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartMovingAverage);
exports.WjFlexChartMovingAverage = WjFlexChartMovingAverage;
exports.wjFlexChartYFunctionSeriesMeta = {
    selector: 'wj-flex-chart-y-function-series',
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
        'sampleCount',
        'min',
        'max',
        'func',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.YFunctionSeries control.
 *
 * The <b>wj-flex-chart-y-function-series</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-y-function-series</b> component to add <b>YFunctionSeries</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartYFunctionSeries</b> component is derived from the <b>YFunctionSeries</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartYFunctionSeries = WjFlexChartYFunctionSeries_1 = (function (_super) {
    __extends(WjFlexChartYFunctionSeries, _super);
    function WjFlexChartYFunctionSeries(elRef, injector, parentCmp) {
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
    WjFlexChartYFunctionSeries.prototype.created = function () {
    };
    WjFlexChartYFunctionSeries.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartYFunctionSeries.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartYFunctionSeries.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartYFunctionSeries;
}(wijmo.chart.analytics.YFunctionSeries));
WjFlexChartYFunctionSeries.meta = {
    outputs: exports.wjFlexChartYFunctionSeriesMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartYFunctionSeries = WjFlexChartYFunctionSeries_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartYFunctionSeriesMeta.selector,
        template: exports.wjFlexChartYFunctionSeriesMeta.template,
        inputs: exports.wjFlexChartYFunctionSeriesMeta.inputs,
        outputs: exports.wjFlexChartYFunctionSeriesMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartYFunctionSeries_1; }) }
        ].concat(exports.wjFlexChartYFunctionSeriesMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartYFunctionSeries);
exports.WjFlexChartYFunctionSeries = WjFlexChartYFunctionSeries;
exports.wjFlexChartParametricFunctionSeriesMeta = {
    selector: 'wj-flex-chart-parametric-function-series',
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
        'sampleCount',
        'min',
        'max',
        'func',
        'xFunc',
        'yFunc',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.ParametricFunctionSeries control.
 *
 * The <b>wj-flex-chart-parametric-function-series</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-parametric-function-series</b> component to add <b>ParametricFunctionSeries</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartParametricFunctionSeries</b> component is derived from the <b>ParametricFunctionSeries</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartParametricFunctionSeries = WjFlexChartParametricFunctionSeries_1 = (function (_super) {
    __extends(WjFlexChartParametricFunctionSeries, _super);
    function WjFlexChartParametricFunctionSeries(elRef, injector, parentCmp) {
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
    WjFlexChartParametricFunctionSeries.prototype.created = function () {
    };
    WjFlexChartParametricFunctionSeries.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartParametricFunctionSeries.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartParametricFunctionSeries.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartParametricFunctionSeries;
}(wijmo.chart.analytics.ParametricFunctionSeries));
WjFlexChartParametricFunctionSeries.meta = {
    outputs: exports.wjFlexChartParametricFunctionSeriesMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartParametricFunctionSeries = WjFlexChartParametricFunctionSeries_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartParametricFunctionSeriesMeta.selector,
        template: exports.wjFlexChartParametricFunctionSeriesMeta.template,
        inputs: exports.wjFlexChartParametricFunctionSeriesMeta.inputs,
        outputs: exports.wjFlexChartParametricFunctionSeriesMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartParametricFunctionSeries_1; }) }
        ].concat(exports.wjFlexChartParametricFunctionSeriesMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartParametricFunctionSeries);
exports.WjFlexChartParametricFunctionSeries = WjFlexChartParametricFunctionSeries;
exports.wjFlexChartWaterfallMeta = {
    selector: 'wj-flex-chart-waterfall',
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
        'relativeData',
        'start',
        'startLabel',
        'showTotal',
        'totalLabel',
        'showIntermediateTotal',
        'intermediateTotalPositions',
        'intermediateTotalLabels',
        'connectorLines',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.Waterfall control.
 *
 * The <b>wj-flex-chart-waterfall</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-waterfall</b> component to add <b>Waterfall</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartWaterfall</b> component is derived from the <b>Waterfall</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartWaterfall = WjFlexChartWaterfall_1 = (function (_super) {
    __extends(WjFlexChartWaterfall, _super);
    function WjFlexChartWaterfall(elRef, injector, parentCmp) {
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
    WjFlexChartWaterfall.prototype.created = function () {
    };
    WjFlexChartWaterfall.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartWaterfall.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartWaterfall.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartWaterfall;
}(wijmo.chart.analytics.Waterfall));
WjFlexChartWaterfall.meta = {
    outputs: exports.wjFlexChartWaterfallMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartWaterfall = WjFlexChartWaterfall_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartWaterfallMeta.selector,
        template: exports.wjFlexChartWaterfallMeta.template,
        inputs: exports.wjFlexChartWaterfallMeta.inputs,
        outputs: exports.wjFlexChartWaterfallMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartWaterfall_1; }) }
        ].concat(exports.wjFlexChartWaterfallMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartWaterfall);
exports.WjFlexChartWaterfall = WjFlexChartWaterfall;
exports.wjFlexChartBoxWhiskerMeta = {
    selector: 'wj-flex-chart-box-whisker',
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
        'quartileCalculation',
        'groupWidth',
        'gapWidth',
        'showMeanLine',
        'meanLineStyle',
        'showMeanMarker',
        'meanMarkerStyle',
        'showInnerPoints',
        'showOutliers',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.BoxWhisker control.
 *
 * The <b>wj-flex-chart-box-whisker</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.chart.WjFlexChart
 *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
 *
 * Use the <b>wj-flex-chart-box-whisker</b> component to add <b>BoxWhisker</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartBoxWhisker</b> component is derived from the <b>BoxWhisker</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartBoxWhisker = WjFlexChartBoxWhisker_1 = (function (_super) {
    __extends(WjFlexChartBoxWhisker, _super);
    function WjFlexChartBoxWhisker(elRef, injector, parentCmp) {
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
    WjFlexChartBoxWhisker.prototype.created = function () {
    };
    WjFlexChartBoxWhisker.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartBoxWhisker.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartBoxWhisker.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartBoxWhisker;
}(wijmo.chart.analytics.BoxWhisker));
WjFlexChartBoxWhisker.meta = {
    outputs: exports.wjFlexChartBoxWhiskerMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartBoxWhisker = WjFlexChartBoxWhisker_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartBoxWhiskerMeta.selector,
        template: exports.wjFlexChartBoxWhiskerMeta.template,
        inputs: exports.wjFlexChartBoxWhiskerMeta.inputs,
        outputs: exports.wjFlexChartBoxWhiskerMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartBoxWhisker_1; }) }
        ].concat(exports.wjFlexChartBoxWhiskerMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartBoxWhisker);
exports.WjFlexChartBoxWhisker = WjFlexChartBoxWhisker;
exports.wjFlexChartErrorBarMeta = {
    selector: 'wj-flex-chart-error-bar',
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
        'chartType',
        'errorBarStyle',
        'value',
        'errorAmount',
        'endStyle',
        'direction',
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
 * Angular 2 component for the @see:wijmo.chart.analytics.ErrorBar control.
 *
 * The <b>wj-flex-chart-error-bar</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
 *
 * Use the <b>wj-flex-chart-error-bar</b> component to add <b>ErrorBar</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjFlexChartErrorBar</b> component is derived from the <b>ErrorBar</b> control and
 * inherits all its properties, events and methods.
*/
var WjFlexChartErrorBar = WjFlexChartErrorBar_1 = (function (_super) {
    __extends(WjFlexChartErrorBar, _super);
    function WjFlexChartErrorBar(elRef, injector, parentCmp) {
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
    WjFlexChartErrorBar.prototype.created = function () {
    };
    WjFlexChartErrorBar.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjFlexChartErrorBar.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjFlexChartErrorBar.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjFlexChartErrorBar;
}(wijmo.chart.analytics.ErrorBar));
WjFlexChartErrorBar.meta = {
    outputs: exports.wjFlexChartErrorBarMeta.outputs,
    changeEvents: {
        'chart.seriesVisibilityChanged': ['visibility']
    },
    siblingId: 'series',
};
WjFlexChartErrorBar = WjFlexChartErrorBar_1 = __decorate([
    core_1.Component({
        selector: exports.wjFlexChartErrorBarMeta.selector,
        template: exports.wjFlexChartErrorBarMeta.template,
        inputs: exports.wjFlexChartErrorBarMeta.inputs,
        outputs: exports.wjFlexChartErrorBarMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartErrorBar_1; }) }
        ].concat(exports.wjFlexChartErrorBarMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjFlexChartErrorBar);
exports.WjFlexChartErrorBar = WjFlexChartErrorBar;
var moduleExports = [
    WjFlexChartTrendLine,
    WjFlexChartMovingAverage,
    WjFlexChartYFunctionSeries,
    WjFlexChartParametricFunctionSeries,
    WjFlexChartWaterfall,
    WjFlexChartBoxWhisker,
    WjFlexChartErrorBar
];
var WjChartAnalyticsModule = (function () {
    function WjChartAnalyticsModule() {
    }
    return WjChartAnalyticsModule;
}());
WjChartAnalyticsModule = __decorate([
    core_1.NgModule({
        imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
        declarations: moduleExports.slice(),
        exports: moduleExports.slice(),
    })
], WjChartAnalyticsModule);
exports.WjChartAnalyticsModule = WjChartAnalyticsModule;
var WjFlexChartTrendLine_1, WjFlexChartMovingAverage_1, WjFlexChartYFunctionSeries_1, WjFlexChartParametricFunctionSeries_1, WjFlexChartWaterfall_1, WjFlexChartBoxWhisker_1, WjFlexChartErrorBar_1;
