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
System.register("wijmo/wijmo.angular2.chart.annotation", ["@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1, wjFlexChartAnnotationLayerMeta, WjFlexChartAnnotationLayer, wjFlexChartAnnotationTextMeta, WjFlexChartAnnotationText, wjFlexChartAnnotationEllipseMeta, WjFlexChartAnnotationEllipse, wjFlexChartAnnotationRectangleMeta, WjFlexChartAnnotationRectangle, wjFlexChartAnnotationLineMeta, WjFlexChartAnnotationLine, wjFlexChartAnnotationPolygonMeta, WjFlexChartAnnotationPolygon, wjFlexChartAnnotationCircleMeta, WjFlexChartAnnotationCircle, wjFlexChartAnnotationSquareMeta, WjFlexChartAnnotationSquare, wjFlexChartAnnotationImageMeta, WjFlexChartAnnotationImage, moduleExports, WjChartAnnotationModule, WjFlexChartAnnotationLayer_1, WjFlexChartAnnotationText_1, WjFlexChartAnnotationEllipse_1, WjFlexChartAnnotationRectangle_1, WjFlexChartAnnotationLine_1, WjFlexChartAnnotationPolygon_1, WjFlexChartAnnotationCircle_1, WjFlexChartAnnotationSquare_1, WjFlexChartAnnotationImage_1;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
                core_3 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (wijmo_angular2_directiveBase_1_1) {
                wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1;
            }
        ],
        execute: function () {
            ///<wijmo-soft-import from="wijmo.chart.finance"/>
            exports_1("wjFlexChartAnnotationLayerMeta", wjFlexChartAnnotationLayerMeta = {
                selector: 'wj-flex-chart-annotation-layer',
                template: "<div><ng-content></ng-content></div>",
                inputs: [
                    'wjProperty',
                ],
                outputs: [
                    'initialized',
                ],
                providers: []
            });
            WjFlexChartAnnotationLayer = WjFlexChartAnnotationLayer_1 = (function (_super) {
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
                outputs: wjFlexChartAnnotationLayerMeta.outputs,
            };
            WjFlexChartAnnotationLayer = WjFlexChartAnnotationLayer_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartAnnotationLayerMeta.selector,
                    template: wjFlexChartAnnotationLayerMeta.template,
                    inputs: wjFlexChartAnnotationLayerMeta.inputs,
                    outputs: wjFlexChartAnnotationLayerMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationLayer_1; }) }
                    ].concat(wjFlexChartAnnotationLayerMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartAnnotationLayer);
            exports_1("WjFlexChartAnnotationLayer", WjFlexChartAnnotationLayer);
            exports_1("wjFlexChartAnnotationTextMeta", wjFlexChartAnnotationTextMeta = {
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
            });
            WjFlexChartAnnotationText = WjFlexChartAnnotationText_1 = (function (_super) {
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
                outputs: wjFlexChartAnnotationTextMeta.outputs,
            };
            WjFlexChartAnnotationText = WjFlexChartAnnotationText_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartAnnotationTextMeta.selector,
                    template: wjFlexChartAnnotationTextMeta.template,
                    inputs: wjFlexChartAnnotationTextMeta.inputs,
                    outputs: wjFlexChartAnnotationTextMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationText_1; }) }
                    ].concat(wjFlexChartAnnotationTextMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartAnnotationText);
            exports_1("WjFlexChartAnnotationText", WjFlexChartAnnotationText);
            exports_1("wjFlexChartAnnotationEllipseMeta", wjFlexChartAnnotationEllipseMeta = {
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
            });
            WjFlexChartAnnotationEllipse = WjFlexChartAnnotationEllipse_1 = (function (_super) {
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
                outputs: wjFlexChartAnnotationEllipseMeta.outputs,
            };
            WjFlexChartAnnotationEllipse = WjFlexChartAnnotationEllipse_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartAnnotationEllipseMeta.selector,
                    template: wjFlexChartAnnotationEllipseMeta.template,
                    inputs: wjFlexChartAnnotationEllipseMeta.inputs,
                    outputs: wjFlexChartAnnotationEllipseMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationEllipse_1; }) }
                    ].concat(wjFlexChartAnnotationEllipseMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartAnnotationEllipse);
            exports_1("WjFlexChartAnnotationEllipse", WjFlexChartAnnotationEllipse);
            exports_1("wjFlexChartAnnotationRectangleMeta", wjFlexChartAnnotationRectangleMeta = {
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
            });
            WjFlexChartAnnotationRectangle = WjFlexChartAnnotationRectangle_1 = (function (_super) {
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
                outputs: wjFlexChartAnnotationRectangleMeta.outputs,
            };
            WjFlexChartAnnotationRectangle = WjFlexChartAnnotationRectangle_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartAnnotationRectangleMeta.selector,
                    template: wjFlexChartAnnotationRectangleMeta.template,
                    inputs: wjFlexChartAnnotationRectangleMeta.inputs,
                    outputs: wjFlexChartAnnotationRectangleMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationRectangle_1; }) }
                    ].concat(wjFlexChartAnnotationRectangleMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartAnnotationRectangle);
            exports_1("WjFlexChartAnnotationRectangle", WjFlexChartAnnotationRectangle);
            exports_1("wjFlexChartAnnotationLineMeta", wjFlexChartAnnotationLineMeta = {
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
            });
            WjFlexChartAnnotationLine = WjFlexChartAnnotationLine_1 = (function (_super) {
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
                outputs: wjFlexChartAnnotationLineMeta.outputs,
            };
            WjFlexChartAnnotationLine = WjFlexChartAnnotationLine_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartAnnotationLineMeta.selector,
                    template: wjFlexChartAnnotationLineMeta.template,
                    inputs: wjFlexChartAnnotationLineMeta.inputs,
                    outputs: wjFlexChartAnnotationLineMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationLine_1; }) }
                    ].concat(wjFlexChartAnnotationLineMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartAnnotationLine);
            exports_1("WjFlexChartAnnotationLine", WjFlexChartAnnotationLine);
            exports_1("wjFlexChartAnnotationPolygonMeta", wjFlexChartAnnotationPolygonMeta = {
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
            });
            WjFlexChartAnnotationPolygon = WjFlexChartAnnotationPolygon_1 = (function (_super) {
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
                outputs: wjFlexChartAnnotationPolygonMeta.outputs,
            };
            WjFlexChartAnnotationPolygon = WjFlexChartAnnotationPolygon_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartAnnotationPolygonMeta.selector,
                    template: wjFlexChartAnnotationPolygonMeta.template,
                    inputs: wjFlexChartAnnotationPolygonMeta.inputs,
                    outputs: wjFlexChartAnnotationPolygonMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationPolygon_1; }) }
                    ].concat(wjFlexChartAnnotationPolygonMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartAnnotationPolygon);
            exports_1("WjFlexChartAnnotationPolygon", WjFlexChartAnnotationPolygon);
            exports_1("wjFlexChartAnnotationCircleMeta", wjFlexChartAnnotationCircleMeta = {
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
            });
            WjFlexChartAnnotationCircle = WjFlexChartAnnotationCircle_1 = (function (_super) {
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
                outputs: wjFlexChartAnnotationCircleMeta.outputs,
            };
            WjFlexChartAnnotationCircle = WjFlexChartAnnotationCircle_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartAnnotationCircleMeta.selector,
                    template: wjFlexChartAnnotationCircleMeta.template,
                    inputs: wjFlexChartAnnotationCircleMeta.inputs,
                    outputs: wjFlexChartAnnotationCircleMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationCircle_1; }) }
                    ].concat(wjFlexChartAnnotationCircleMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartAnnotationCircle);
            exports_1("WjFlexChartAnnotationCircle", WjFlexChartAnnotationCircle);
            exports_1("wjFlexChartAnnotationSquareMeta", wjFlexChartAnnotationSquareMeta = {
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
            });
            WjFlexChartAnnotationSquare = WjFlexChartAnnotationSquare_1 = (function (_super) {
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
                outputs: wjFlexChartAnnotationSquareMeta.outputs,
            };
            WjFlexChartAnnotationSquare = WjFlexChartAnnotationSquare_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartAnnotationSquareMeta.selector,
                    template: wjFlexChartAnnotationSquareMeta.template,
                    inputs: wjFlexChartAnnotationSquareMeta.inputs,
                    outputs: wjFlexChartAnnotationSquareMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationSquare_1; }) }
                    ].concat(wjFlexChartAnnotationSquareMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartAnnotationSquare);
            exports_1("WjFlexChartAnnotationSquare", WjFlexChartAnnotationSquare);
            exports_1("wjFlexChartAnnotationImageMeta", wjFlexChartAnnotationImageMeta = {
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
            });
            WjFlexChartAnnotationImage = WjFlexChartAnnotationImage_1 = (function (_super) {
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
                outputs: wjFlexChartAnnotationImageMeta.outputs,
            };
            WjFlexChartAnnotationImage = WjFlexChartAnnotationImage_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartAnnotationImageMeta.selector,
                    template: wjFlexChartAnnotationImageMeta.template,
                    inputs: wjFlexChartAnnotationImageMeta.inputs,
                    outputs: wjFlexChartAnnotationImageMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationImage_1; }) }
                    ].concat(wjFlexChartAnnotationImageMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartAnnotationImage);
            exports_1("WjFlexChartAnnotationImage", WjFlexChartAnnotationImage);
            moduleExports = [
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
            WjChartAnnotationModule = (function () {
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
            exports_1("WjChartAnnotationModule", WjChartAnnotationModule);
        }
    };
});
