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
define("wijmo/wijmo.angular2.chart", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartMeta = {
        selector: 'wj-flex-chart',
        template: "<div><ng-content></ng-content></div>",
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
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
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
    var WjFlexChart = WjFlexChart_1 = (function (_super) {
        __extends(WjFlexChart, _super);
        function WjFlexChart(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
             */
            _this.gotFocusNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
             */
            _this.lostFocusNg = new core_1.EventEmitter(false);
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
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
             */
            _this.selectionChangedNg = new core_1.EventEmitter(false);
            _this.selectionChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>seriesVisibilityChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>seriesVisibilityChanged</b> Wijmo event name.
             */
            _this.seriesVisibilityChangedNg = new core_1.EventEmitter(false);
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
        WjFlexChart.prototype.created = function () {
        };
        WjFlexChart.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChart.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChart.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        Object.defineProperty(WjFlexChart.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjFlexChart.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        return WjFlexChart;
    }(wijmo.chart.FlexChart));
    WjFlexChart.meta = {
        outputs: exports.wjFlexChartMeta.outputs,
        changeEvents: {
            'selectionChanged': ['selection']
        },
    };
    WjFlexChart = WjFlexChart_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartMeta.selector,
            template: exports.wjFlexChartMeta.template,
            inputs: exports.wjFlexChartMeta.inputs,
            outputs: exports.wjFlexChartMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChart_1; }) }
            ].concat(exports.wjFlexChartMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChart);
    exports.WjFlexChart = WjFlexChart;
    exports.wjFlexPieMeta = {
        selector: 'wj-flex-pie',
        template: "<div><ng-content></ng-content></div>",
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
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
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
    var WjFlexPie = WjFlexPie_1 = (function (_super) {
        __extends(WjFlexPie, _super);
        function WjFlexPie(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
             */
            _this.gotFocusNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
             */
            _this.lostFocusNg = new core_1.EventEmitter(false);
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
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
             */
            _this.selectionChangedNg = new core_1.EventEmitter(false);
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
        WjFlexPie.prototype.created = function () {
        };
        WjFlexPie.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexPie.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexPie.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        Object.defineProperty(WjFlexPie.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjFlexPie.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        return WjFlexPie;
    }(wijmo.chart.FlexPie));
    WjFlexPie.meta = {
        outputs: exports.wjFlexPieMeta.outputs,
    };
    WjFlexPie = WjFlexPie_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexPieMeta.selector,
            template: exports.wjFlexPieMeta.template,
            inputs: exports.wjFlexPieMeta.inputs,
            outputs: exports.wjFlexPieMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexPie_1; }) }
            ].concat(exports.wjFlexPieMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexPie);
    exports.WjFlexPie = WjFlexPie;
    exports.wjFlexChartAxisMeta = {
        selector: 'wj-flex-chart-axis',
        template: "",
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
        providers: []
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
    var WjFlexChartAxis = WjFlexChartAxis_1 = (function (_super) {
        __extends(WjFlexChartAxis, _super);
        function WjFlexChartAxis(elRef, injector, parentCmp) {
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
             * Default value is 'axes'.
             */
            _this.wjProperty = 'axes';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rangeChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rangeChanged</b> Wijmo event name.
             */
            _this.rangeChangedNg = new core_1.EventEmitter(false);
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
        WjFlexChartAxis.prototype.created = function () {
        };
        WjFlexChartAxis.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAxis.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAxis.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAxis;
    }(wijmo.chart.Axis));
    WjFlexChartAxis.meta = {
        outputs: exports.wjFlexChartAxisMeta.outputs,
    };
    WjFlexChartAxis = WjFlexChartAxis_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAxisMeta.selector,
            template: exports.wjFlexChartAxisMeta.template,
            inputs: exports.wjFlexChartAxisMeta.inputs,
            outputs: exports.wjFlexChartAxisMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAxis_1; }) }
            ].concat(exports.wjFlexChartAxisMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAxis);
    exports.WjFlexChartAxis = WjFlexChartAxis;
    exports.wjFlexChartLegendMeta = {
        selector: 'wj-flex-chart-legend',
        template: "",
        inputs: [
            'wjProperty',
            'position',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
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
    var WjFlexChartLegend = WjFlexChartLegend_1 = (function (_super) {
        __extends(WjFlexChartLegend, _super);
        function WjFlexChartLegend(elRef, injector, parentCmp) {
            var _this = _super.call(this, parentCmp) || this;
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
             * Default value is 'legend'.
             */
            _this.wjProperty = 'legend';
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
        WjFlexChartLegend.prototype.created = function () {
        };
        WjFlexChartLegend.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartLegend.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartLegend.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartLegend;
    }(wijmo.chart.Legend));
    WjFlexChartLegend.meta = {
        outputs: exports.wjFlexChartLegendMeta.outputs,
    };
    WjFlexChartLegend = WjFlexChartLegend_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartLegendMeta.selector,
            template: exports.wjFlexChartLegendMeta.template,
            inputs: exports.wjFlexChartLegendMeta.inputs,
            outputs: exports.wjFlexChartLegendMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartLegend_1; }) }
            ].concat(exports.wjFlexChartLegendMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartLegend);
    exports.WjFlexChartLegend = WjFlexChartLegend;
    exports.wjFlexChartDataLabelMeta = {
        selector: 'wj-flex-chart-data-label',
        template: "",
        inputs: [
            'wjProperty',
            'content',
            'border',
            'position',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
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
    var WjFlexChartDataLabel = WjFlexChartDataLabel_1 = (function (_super) {
        __extends(WjFlexChartDataLabel, _super);
        function WjFlexChartDataLabel(elRef, injector, parentCmp) {
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
             * Default value is 'dataLabel'.
             */
            _this.wjProperty = 'dataLabel';
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
        WjFlexChartDataLabel.prototype.created = function () {
        };
        WjFlexChartDataLabel.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartDataLabel.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartDataLabel.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartDataLabel;
    }(wijmo.chart.DataLabel));
    WjFlexChartDataLabel.meta = {
        outputs: exports.wjFlexChartDataLabelMeta.outputs,
    };
    WjFlexChartDataLabel = WjFlexChartDataLabel_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartDataLabelMeta.selector,
            template: exports.wjFlexChartDataLabelMeta.template,
            inputs: exports.wjFlexChartDataLabelMeta.inputs,
            outputs: exports.wjFlexChartDataLabelMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartDataLabel_1; }) }
            ].concat(exports.wjFlexChartDataLabelMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartDataLabel);
    exports.WjFlexChartDataLabel = WjFlexChartDataLabel;
    exports.wjFlexPieDataLabelMeta = {
        selector: 'wj-flex-pie-data-label',
        template: "",
        inputs: [
            'wjProperty',
            'content',
            'border',
            'position',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
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
    var WjFlexPieDataLabel = WjFlexPieDataLabel_1 = (function (_super) {
        __extends(WjFlexPieDataLabel, _super);
        function WjFlexPieDataLabel(elRef, injector, parentCmp) {
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
             * Default value is 'dataLabel'.
             */
            _this.wjProperty = 'dataLabel';
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
        WjFlexPieDataLabel.prototype.created = function () {
        };
        WjFlexPieDataLabel.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexPieDataLabel.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexPieDataLabel.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexPieDataLabel;
    }(wijmo.chart.PieDataLabel));
    WjFlexPieDataLabel.meta = {
        outputs: exports.wjFlexPieDataLabelMeta.outputs,
    };
    WjFlexPieDataLabel = WjFlexPieDataLabel_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexPieDataLabelMeta.selector,
            template: exports.wjFlexPieDataLabelMeta.template,
            inputs: exports.wjFlexPieDataLabelMeta.inputs,
            outputs: exports.wjFlexPieDataLabelMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexPieDataLabel_1; }) }
            ].concat(exports.wjFlexPieDataLabelMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexPieDataLabel);
    exports.WjFlexPieDataLabel = WjFlexPieDataLabel;
    exports.wjFlexChartSeriesMeta = {
        selector: 'wj-flex-chart-series',
        template: "<div><ng-content></ng-content></div>",
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
        providers: []
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
    var WjFlexChartSeries = WjFlexChartSeries_1 = (function (_super) {
        __extends(WjFlexChartSeries, _super);
        function WjFlexChartSeries(elRef, injector, parentCmp) {
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
        WjFlexChartSeries.prototype.created = function () {
        };
        WjFlexChartSeries.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartSeries.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartSeries.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartSeries;
    }(wijmo.chart.Series));
    WjFlexChartSeries.meta = {
        outputs: exports.wjFlexChartSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartSeries = WjFlexChartSeries_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartSeriesMeta.selector,
            template: exports.wjFlexChartSeriesMeta.template,
            inputs: exports.wjFlexChartSeriesMeta.inputs,
            outputs: exports.wjFlexChartSeriesMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartSeries_1; }) }
            ].concat(exports.wjFlexChartSeriesMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartSeries);
    exports.WjFlexChartSeries = WjFlexChartSeries;
    exports.wjFlexChartLineMarkerMeta = {
        selector: 'wj-flex-line-marker',
        template: "",
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
        providers: []
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
    var WjFlexChartLineMarker = WjFlexChartLineMarker_1 = (function (_super) {
        __extends(WjFlexChartLineMarker, _super);
        function WjFlexChartLineMarker(elRef, injector, parentCmp) {
            var _this = _super.call(this, parentCmp) || this;
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
             * Angular (EventEmitter) version of the Wijmo <b>positionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>positionChanged</b> Wijmo event name.
             */
            _this.positionChangedNg = new core_1.EventEmitter(false);
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
        WjFlexChartLineMarker.prototype.created = function () {
        };
        WjFlexChartLineMarker.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartLineMarker.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartLineMarker.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartLineMarker;
    }(wijmo.chart.LineMarker));
    WjFlexChartLineMarker.meta = {
        outputs: exports.wjFlexChartLineMarkerMeta.outputs,
    };
    WjFlexChartLineMarker = WjFlexChartLineMarker_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartLineMarkerMeta.selector,
            template: exports.wjFlexChartLineMarkerMeta.template,
            inputs: exports.wjFlexChartLineMarkerMeta.inputs,
            outputs: exports.wjFlexChartLineMarkerMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartLineMarker_1; }) }
            ].concat(exports.wjFlexChartLineMarkerMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartLineMarker);
    exports.WjFlexChartLineMarker = WjFlexChartLineMarker;
    exports.wjFlexChartDataPointMeta = {
        selector: 'wj-flex-chart-data-point',
        template: "",
        inputs: [
            'wjProperty',
            'x',
            'y',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
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
    var WjFlexChartDataPoint = WjFlexChartDataPoint_1 = (function (_super) {
        __extends(WjFlexChartDataPoint, _super);
        function WjFlexChartDataPoint(elRef, injector, parentCmp) {
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
             * Default value is ''.
             */
            _this.wjProperty = '';
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
        WjFlexChartDataPoint.prototype.created = function () {
        };
        WjFlexChartDataPoint.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartDataPoint.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartDataPoint.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartDataPoint;
    }(wijmo.chart.DataPoint));
    WjFlexChartDataPoint.meta = {
        outputs: exports.wjFlexChartDataPointMeta.outputs,
    };
    WjFlexChartDataPoint = WjFlexChartDataPoint_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartDataPointMeta.selector,
            template: exports.wjFlexChartDataPointMeta.template,
            inputs: exports.wjFlexChartDataPointMeta.inputs,
            outputs: exports.wjFlexChartDataPointMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartDataPoint_1; }) }
            ].concat(exports.wjFlexChartDataPointMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartDataPoint);
    exports.WjFlexChartDataPoint = WjFlexChartDataPoint;
    exports.wjFlexChartPlotAreaMeta = {
        selector: 'wj-flex-chart-plot-area',
        template: "",
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
        providers: []
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
    var WjFlexChartPlotArea = WjFlexChartPlotArea_1 = (function (_super) {
        __extends(WjFlexChartPlotArea, _super);
        function WjFlexChartPlotArea(elRef, injector, parentCmp) {
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
             * Default value is 'plotAreas'.
             */
            _this.wjProperty = 'plotAreas';
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
        WjFlexChartPlotArea.prototype.created = function () {
        };
        WjFlexChartPlotArea.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartPlotArea.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartPlotArea.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartPlotArea;
    }(wijmo.chart.PlotArea));
    WjFlexChartPlotArea.meta = {
        outputs: exports.wjFlexChartPlotAreaMeta.outputs,
    };
    WjFlexChartPlotArea = WjFlexChartPlotArea_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartPlotAreaMeta.selector,
            template: exports.wjFlexChartPlotAreaMeta.template,
            inputs: exports.wjFlexChartPlotAreaMeta.inputs,
            outputs: exports.wjFlexChartPlotAreaMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartPlotArea_1; }) }
            ].concat(exports.wjFlexChartPlotAreaMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartPlotArea);
    exports.WjFlexChartPlotArea = WjFlexChartPlotArea;
    var moduleExports = [
        WjFlexChart,
        WjFlexPie,
        WjFlexChartAxis,
        WjFlexChartLegend,
        WjFlexChartDataLabel,
        WjFlexPieDataLabel,
        WjFlexChartSeries,
        WjFlexChartLineMarker,
        WjFlexChartDataPoint,
        WjFlexChartPlotArea
    ];
    var WjChartModule = (function () {
        function WjChartModule() {
        }
        return WjChartModule;
    }());
    WjChartModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjChartModule);
    exports.WjChartModule = WjChartModule;
    var WjFlexChart_1, WjFlexPie_1, WjFlexChartAxis_1, WjFlexChartLegend_1, WjFlexChartDataLabel_1, WjFlexPieDataLabel_1, WjFlexChartSeries_1, WjFlexChartLineMarker_1, WjFlexChartDataPoint_1, WjFlexChartPlotArea_1;
});
