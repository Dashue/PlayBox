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
define("wijmo/wijmo.angular2.chart.annotation", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartAnnotationLayerMeta = {
        selector: 'wj-flex-chart-annotation-layer',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
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
    var WjFlexChartAnnotationLayer = WjFlexChartAnnotationLayer_1 = (function (_super) {
        __extends(WjFlexChartAnnotationLayer, _super);
        function WjFlexChartAnnotationLayer(elRef, injector, parentCmp) {
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
        WjFlexChartAnnotationLayer.prototype.created = function () {
        };
        WjFlexChartAnnotationLayer.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationLayer.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationLayer.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationLayer;
    }(wijmo.chart.annotation.AnnotationLayer));
    WjFlexChartAnnotationLayer.meta = {
        outputs: exports.wjFlexChartAnnotationLayerMeta.outputs,
    };
    WjFlexChartAnnotationLayer = WjFlexChartAnnotationLayer_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationLayerMeta.selector,
            template: exports.wjFlexChartAnnotationLayerMeta.template,
            inputs: exports.wjFlexChartAnnotationLayerMeta.inputs,
            outputs: exports.wjFlexChartAnnotationLayerMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationLayer_1; }) }
            ].concat(exports.wjFlexChartAnnotationLayerMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationLayer);
    exports.WjFlexChartAnnotationLayer = WjFlexChartAnnotationLayer;
    exports.wjFlexChartAnnotationTextMeta = {
        selector: 'wj-flex-chart-annotation-text',
        template: "<div><ng-content></ng-content></div>",
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
        providers: []
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
    var WjFlexChartAnnotationText = WjFlexChartAnnotationText_1 = (function (_super) {
        __extends(WjFlexChartAnnotationText, _super);
        function WjFlexChartAnnotationText(elRef, injector, parentCmp) {
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
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationText.prototype.created = function () {
        };
        WjFlexChartAnnotationText.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationText.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationText.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationText;
    }(wijmo.chart.annotation.Text));
    WjFlexChartAnnotationText.meta = {
        outputs: exports.wjFlexChartAnnotationTextMeta.outputs,
    };
    WjFlexChartAnnotationText = WjFlexChartAnnotationText_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationTextMeta.selector,
            template: exports.wjFlexChartAnnotationTextMeta.template,
            inputs: exports.wjFlexChartAnnotationTextMeta.inputs,
            outputs: exports.wjFlexChartAnnotationTextMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationText_1; }) }
            ].concat(exports.wjFlexChartAnnotationTextMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationText);
    exports.WjFlexChartAnnotationText = WjFlexChartAnnotationText;
    exports.wjFlexChartAnnotationEllipseMeta = {
        selector: 'wj-flex-chart-annotation-ellipse',
        template: "<div><ng-content></ng-content></div>",
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
        providers: []
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
    var WjFlexChartAnnotationEllipse = WjFlexChartAnnotationEllipse_1 = (function (_super) {
        __extends(WjFlexChartAnnotationEllipse, _super);
        function WjFlexChartAnnotationEllipse(elRef, injector, parentCmp) {
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
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationEllipse.prototype.created = function () {
        };
        WjFlexChartAnnotationEllipse.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationEllipse.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationEllipse.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationEllipse;
    }(wijmo.chart.annotation.Ellipse));
    WjFlexChartAnnotationEllipse.meta = {
        outputs: exports.wjFlexChartAnnotationEllipseMeta.outputs,
    };
    WjFlexChartAnnotationEllipse = WjFlexChartAnnotationEllipse_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationEllipseMeta.selector,
            template: exports.wjFlexChartAnnotationEllipseMeta.template,
            inputs: exports.wjFlexChartAnnotationEllipseMeta.inputs,
            outputs: exports.wjFlexChartAnnotationEllipseMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationEllipse_1; }) }
            ].concat(exports.wjFlexChartAnnotationEllipseMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationEllipse);
    exports.WjFlexChartAnnotationEllipse = WjFlexChartAnnotationEllipse;
    exports.wjFlexChartAnnotationRectangleMeta = {
        selector: 'wj-flex-chart-annotation-rectangle',
        template: "<div><ng-content></ng-content></div>",
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
        providers: []
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
    var WjFlexChartAnnotationRectangle = WjFlexChartAnnotationRectangle_1 = (function (_super) {
        __extends(WjFlexChartAnnotationRectangle, _super);
        function WjFlexChartAnnotationRectangle(elRef, injector, parentCmp) {
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
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationRectangle.prototype.created = function () {
        };
        WjFlexChartAnnotationRectangle.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationRectangle.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationRectangle.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationRectangle;
    }(wijmo.chart.annotation.Rectangle));
    WjFlexChartAnnotationRectangle.meta = {
        outputs: exports.wjFlexChartAnnotationRectangleMeta.outputs,
    };
    WjFlexChartAnnotationRectangle = WjFlexChartAnnotationRectangle_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationRectangleMeta.selector,
            template: exports.wjFlexChartAnnotationRectangleMeta.template,
            inputs: exports.wjFlexChartAnnotationRectangleMeta.inputs,
            outputs: exports.wjFlexChartAnnotationRectangleMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationRectangle_1; }) }
            ].concat(exports.wjFlexChartAnnotationRectangleMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationRectangle);
    exports.WjFlexChartAnnotationRectangle = WjFlexChartAnnotationRectangle;
    exports.wjFlexChartAnnotationLineMeta = {
        selector: 'wj-flex-chart-annotation-line',
        template: "<div><ng-content></ng-content></div>",
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
        providers: []
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
    var WjFlexChartAnnotationLine = WjFlexChartAnnotationLine_1 = (function (_super) {
        __extends(WjFlexChartAnnotationLine, _super);
        function WjFlexChartAnnotationLine(elRef, injector, parentCmp) {
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
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationLine.prototype.created = function () {
        };
        WjFlexChartAnnotationLine.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationLine.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationLine.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationLine;
    }(wijmo.chart.annotation.Line));
    WjFlexChartAnnotationLine.meta = {
        outputs: exports.wjFlexChartAnnotationLineMeta.outputs,
    };
    WjFlexChartAnnotationLine = WjFlexChartAnnotationLine_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationLineMeta.selector,
            template: exports.wjFlexChartAnnotationLineMeta.template,
            inputs: exports.wjFlexChartAnnotationLineMeta.inputs,
            outputs: exports.wjFlexChartAnnotationLineMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationLine_1; }) }
            ].concat(exports.wjFlexChartAnnotationLineMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationLine);
    exports.WjFlexChartAnnotationLine = WjFlexChartAnnotationLine;
    exports.wjFlexChartAnnotationPolygonMeta = {
        selector: 'wj-flex-chart-annotation-polygon',
        template: "<div><ng-content></ng-content></div>",
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
        providers: []
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
    var WjFlexChartAnnotationPolygon = WjFlexChartAnnotationPolygon_1 = (function (_super) {
        __extends(WjFlexChartAnnotationPolygon, _super);
        function WjFlexChartAnnotationPolygon(elRef, injector, parentCmp) {
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
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationPolygon.prototype.created = function () {
        };
        WjFlexChartAnnotationPolygon.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationPolygon.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationPolygon.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationPolygon;
    }(wijmo.chart.annotation.Polygon));
    WjFlexChartAnnotationPolygon.meta = {
        outputs: exports.wjFlexChartAnnotationPolygonMeta.outputs,
    };
    WjFlexChartAnnotationPolygon = WjFlexChartAnnotationPolygon_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationPolygonMeta.selector,
            template: exports.wjFlexChartAnnotationPolygonMeta.template,
            inputs: exports.wjFlexChartAnnotationPolygonMeta.inputs,
            outputs: exports.wjFlexChartAnnotationPolygonMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationPolygon_1; }) }
            ].concat(exports.wjFlexChartAnnotationPolygonMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationPolygon);
    exports.WjFlexChartAnnotationPolygon = WjFlexChartAnnotationPolygon;
    exports.wjFlexChartAnnotationCircleMeta = {
        selector: 'wj-flex-chart-annotation-circle',
        template: "<div><ng-content></ng-content></div>",
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
        providers: []
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
    var WjFlexChartAnnotationCircle = WjFlexChartAnnotationCircle_1 = (function (_super) {
        __extends(WjFlexChartAnnotationCircle, _super);
        function WjFlexChartAnnotationCircle(elRef, injector, parentCmp) {
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
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationCircle.prototype.created = function () {
        };
        WjFlexChartAnnotationCircle.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationCircle.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationCircle.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationCircle;
    }(wijmo.chart.annotation.Circle));
    WjFlexChartAnnotationCircle.meta = {
        outputs: exports.wjFlexChartAnnotationCircleMeta.outputs,
    };
    WjFlexChartAnnotationCircle = WjFlexChartAnnotationCircle_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationCircleMeta.selector,
            template: exports.wjFlexChartAnnotationCircleMeta.template,
            inputs: exports.wjFlexChartAnnotationCircleMeta.inputs,
            outputs: exports.wjFlexChartAnnotationCircleMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationCircle_1; }) }
            ].concat(exports.wjFlexChartAnnotationCircleMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationCircle);
    exports.WjFlexChartAnnotationCircle = WjFlexChartAnnotationCircle;
    exports.wjFlexChartAnnotationSquareMeta = {
        selector: 'wj-flex-chart-annotation-square',
        template: "<div><ng-content></ng-content></div>",
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
        providers: []
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
    var WjFlexChartAnnotationSquare = WjFlexChartAnnotationSquare_1 = (function (_super) {
        __extends(WjFlexChartAnnotationSquare, _super);
        function WjFlexChartAnnotationSquare(elRef, injector, parentCmp) {
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
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationSquare.prototype.created = function () {
        };
        WjFlexChartAnnotationSquare.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationSquare.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationSquare.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationSquare;
    }(wijmo.chart.annotation.Square));
    WjFlexChartAnnotationSquare.meta = {
        outputs: exports.wjFlexChartAnnotationSquareMeta.outputs,
    };
    WjFlexChartAnnotationSquare = WjFlexChartAnnotationSquare_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationSquareMeta.selector,
            template: exports.wjFlexChartAnnotationSquareMeta.template,
            inputs: exports.wjFlexChartAnnotationSquareMeta.inputs,
            outputs: exports.wjFlexChartAnnotationSquareMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationSquare_1; }) }
            ].concat(exports.wjFlexChartAnnotationSquareMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationSquare);
    exports.WjFlexChartAnnotationSquare = WjFlexChartAnnotationSquare;
    exports.wjFlexChartAnnotationImageMeta = {
        selector: 'wj-flex-chart-annotation-image',
        template: "<div><ng-content></ng-content></div>",
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
        providers: []
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
    var WjFlexChartAnnotationImage = WjFlexChartAnnotationImage_1 = (function (_super) {
        __extends(WjFlexChartAnnotationImage, _super);
        function WjFlexChartAnnotationImage(elRef, injector, parentCmp) {
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
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationImage.prototype.created = function () {
        };
        WjFlexChartAnnotationImage.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationImage.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationImage.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationImage;
    }(wijmo.chart.annotation.Image));
    WjFlexChartAnnotationImage.meta = {
        outputs: exports.wjFlexChartAnnotationImageMeta.outputs,
    };
    WjFlexChartAnnotationImage = WjFlexChartAnnotationImage_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationImageMeta.selector,
            template: exports.wjFlexChartAnnotationImageMeta.template,
            inputs: exports.wjFlexChartAnnotationImageMeta.inputs,
            outputs: exports.wjFlexChartAnnotationImageMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationImage_1; }) }
            ].concat(exports.wjFlexChartAnnotationImageMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationImage);
    exports.WjFlexChartAnnotationImage = WjFlexChartAnnotationImage;
    var moduleExports = [
        WjFlexChartAnnotationLayer,
        WjFlexChartAnnotationText,
        WjFlexChartAnnotationEllipse,
        WjFlexChartAnnotationRectangle,
        WjFlexChartAnnotationLine,
        WjFlexChartAnnotationPolygon,
        WjFlexChartAnnotationCircle,
        WjFlexChartAnnotationSquare,
        WjFlexChartAnnotationImage
    ];
    var WjChartAnnotationModule = (function () {
        function WjChartAnnotationModule() {
        }
        return WjChartAnnotationModule;
    }());
    WjChartAnnotationModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjChartAnnotationModule);
    exports.WjChartAnnotationModule = WjChartAnnotationModule;
    var WjFlexChartAnnotationLayer_1, WjFlexChartAnnotationText_1, WjFlexChartAnnotationEllipse_1, WjFlexChartAnnotationRectangle_1, WjFlexChartAnnotationLine_1, WjFlexChartAnnotationPolygon_1, WjFlexChartAnnotationCircle_1, WjFlexChartAnnotationSquare_1, WjFlexChartAnnotationImage_1;
});
