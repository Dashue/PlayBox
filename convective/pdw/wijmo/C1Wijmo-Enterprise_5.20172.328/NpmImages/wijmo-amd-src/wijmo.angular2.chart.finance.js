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
define(["require", "exports", "wijmo/wijmo.chart.finance", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, wjcChartFinance, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFinancialChartMeta = {
        selector: 'wj-financial-chart',
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
     * Angular 2 component for the @see:wijmo.chart.finance.FinancialChart control.
     *
     * Use the <b>wj-financial-chart</b> component to add <b>FinancialChart</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFinancialChart</b> component is derived from the <b>FinancialChart</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-financial-chart</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartTrendLine
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartMovingAverage
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartYFunctionSeries
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartParametricFunctionSeries
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartWaterfall
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartBoxWhisker
     * , @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacci
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciArcs
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciFans
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciTimeZones
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartAtr
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartCci
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartRsi
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartWilliamsR
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartMacd
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartMacdHistogram
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartStochastic
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartBollingerBands
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartEnvelopes
     * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChartSeries
     * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartRangeSelector
     * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartGestures
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLineMarker
     *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartPlotArea.
    */
    var WjFinancialChart = (function (_super) {
        __extends(WjFinancialChart, _super);
        function WjFinancialChart(elRef, injector, parentCmp) {
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
        WjFinancialChart.prototype.created = function () {
        };
        WjFinancialChart.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFinancialChart.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFinancialChart.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        Object.defineProperty(WjFinancialChart.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjFinancialChart.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        return WjFinancialChart;
    }(wjcChartFinance.FinancialChart));
    WjFinancialChart.meta = {
        outputs: exports.wjFinancialChartMeta.outputs,
        changeEvents: {
            'selectionChanged': ['selection']
        },
    };
    WjFinancialChart.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFinancialChartMeta.selector,
                    template: exports.wjFinancialChartMeta.template,
                    inputs: exports.wjFinancialChartMeta.inputs,
                    outputs: exports.wjFinancialChartMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFinancialChart; }) }
                    ].concat(exports.wjFinancialChartMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFinancialChart.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    exports.WjFinancialChart = WjFinancialChart;
    exports.wjFinancialChartSeriesMeta = {
        selector: 'wj-financial-chart-series',
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
     * Angular 2 component for the @see:wijmo.chart.finance.FinancialSeries control.
     *
     * The <b>wj-financial-chart-series</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-financial-chart-series</b> component to add <b>FinancialSeries</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFinancialChartSeries</b> component is derived from the <b>FinancialSeries</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-financial-chart-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis child component.
    */
    var WjFinancialChartSeries = (function (_super) {
        __extends(WjFinancialChartSeries, _super);
        function WjFinancialChartSeries(elRef, injector, parentCmp) {
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
        WjFinancialChartSeries.prototype.created = function () {
        };
        WjFinancialChartSeries.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFinancialChartSeries.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFinancialChartSeries.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFinancialChartSeries;
    }(wjcChartFinance.FinancialSeries));
    WjFinancialChartSeries.meta = {
        outputs: exports.wjFinancialChartSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFinancialChartSeries.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjFinancialChartSeriesMeta.selector,
                    template: exports.wjFinancialChartSeriesMeta.template,
                    inputs: exports.wjFinancialChartSeriesMeta.inputs,
                    outputs: exports.wjFinancialChartSeriesMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFinancialChartSeries; }) }
                    ].concat(exports.wjFinancialChartSeriesMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjFinancialChartSeries.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    exports.WjFinancialChartSeries = WjFinancialChartSeries;
    var moduleExports = [
        WjFinancialChart,
        WjFinancialChartSeries
    ];
    var WjChartFinanceModule = (function () {
        function WjChartFinanceModule() {
        }
        return WjChartFinanceModule;
    }());
    WjChartFinanceModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjChartFinanceModule.ctorParameters = function () { return []; };
    exports.WjChartFinanceModule = WjChartFinanceModule;
});
//# sourceMappingURL=wijmo.angular2.chart.finance.js.map