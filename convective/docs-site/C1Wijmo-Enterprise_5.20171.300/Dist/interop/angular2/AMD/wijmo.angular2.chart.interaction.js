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
define("wijmo/wijmo.angular2.chart.interaction", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartRangeSelectorMeta = {
        selector: 'wj-flex-chart-range-selector',
        template: "",
        inputs: [
            'wjProperty',
            'isVisible',
            'min',
            'max',
            'orientation',
            'seamless',
            'minScale',
            'maxScale',
        ],
        outputs: [
            'initialized',
            'rangeChangedNg: rangeChanged',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.interaction.RangeSelector control.
     *
     * The <b>wj-flex-chart-range-selector</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-range-selector</b> component to add <b>RangeSelector</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartRangeSelector</b> component is derived from the <b>RangeSelector</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartRangeSelector = WjFlexChartRangeSelector_1 = (function (_super) {
        __extends(WjFlexChartRangeSelector, _super);
        function WjFlexChartRangeSelector(elRef, injector, parentCmp) {
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
        WjFlexChartRangeSelector.prototype.created = function () {
        };
        WjFlexChartRangeSelector.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartRangeSelector.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartRangeSelector.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartRangeSelector;
    }(wijmo.chart.interaction.RangeSelector));
    WjFlexChartRangeSelector.meta = {
        outputs: exports.wjFlexChartRangeSelectorMeta.outputs,
    };
    WjFlexChartRangeSelector = WjFlexChartRangeSelector_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartRangeSelectorMeta.selector,
            template: exports.wjFlexChartRangeSelectorMeta.template,
            inputs: exports.wjFlexChartRangeSelectorMeta.inputs,
            outputs: exports.wjFlexChartRangeSelectorMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartRangeSelector_1; }) }
            ].concat(exports.wjFlexChartRangeSelectorMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartRangeSelector);
    exports.WjFlexChartRangeSelector = WjFlexChartRangeSelector;
    exports.wjFlexChartGesturesMeta = {
        selector: 'wj-flex-chart-gestures',
        template: "",
        inputs: [
            'wjProperty',
            'mouseAction',
            'interactiveAxes',
            'enable',
            'scaleX',
            'scaleY',
            'posX',
            'posY',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.interaction.ChartGestures control.
     *
     * The <b>wj-flex-chart-gestures</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-gestures</b> component to add <b>ChartGestures</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartGestures</b> component is derived from the <b>ChartGestures</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartGestures = WjFlexChartGestures_1 = (function (_super) {
        __extends(WjFlexChartGestures, _super);
        function WjFlexChartGestures(elRef, injector, parentCmp) {
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
        WjFlexChartGestures.prototype.created = function () {
        };
        WjFlexChartGestures.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartGestures.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartGestures.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartGestures;
    }(wijmo.chart.interaction.ChartGestures));
    WjFlexChartGestures.meta = {
        outputs: exports.wjFlexChartGesturesMeta.outputs,
    };
    WjFlexChartGestures = WjFlexChartGestures_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartGesturesMeta.selector,
            template: exports.wjFlexChartGesturesMeta.template,
            inputs: exports.wjFlexChartGesturesMeta.inputs,
            outputs: exports.wjFlexChartGesturesMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartGestures_1; }) }
            ].concat(exports.wjFlexChartGesturesMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartGestures);
    exports.WjFlexChartGestures = WjFlexChartGestures;
    var moduleExports = [
        WjFlexChartRangeSelector,
        WjFlexChartGestures
    ];
    var WjChartInteractionModule = (function () {
        function WjChartInteractionModule() {
        }
        return WjChartInteractionModule;
    }());
    WjChartInteractionModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjChartInteractionModule);
    exports.WjChartInteractionModule = WjChartInteractionModule;
    var WjFlexChartRangeSelector_1, WjFlexChartGestures_1;
});
