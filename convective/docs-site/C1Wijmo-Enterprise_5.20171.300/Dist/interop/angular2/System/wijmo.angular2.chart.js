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
System.register("wijmo/wijmo.angular2.chart", ["@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
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
    var core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1, wjFlexChartMeta, WjFlexChart, wjFlexPieMeta, WjFlexPie, wjFlexChartAxisMeta, WjFlexChartAxis, wjFlexChartLegendMeta, WjFlexChartLegend, wjFlexChartDataLabelMeta, WjFlexChartDataLabel, wjFlexPieDataLabelMeta, WjFlexPieDataLabel, wjFlexChartSeriesMeta, WjFlexChartSeries, wjFlexChartLineMarkerMeta, WjFlexChartLineMarker, wjFlexChartDataPointMeta, WjFlexChartDataPoint, wjFlexChartPlotAreaMeta, WjFlexChartPlotArea, moduleExports, WjChartModule, WjFlexChart_1, WjFlexPie_1, WjFlexChartAxis_1, WjFlexChartLegend_1, WjFlexChartDataLabel_1, WjFlexPieDataLabel_1, WjFlexChartSeries_1, WjFlexChartLineMarker_1, WjFlexChartDataPoint_1, WjFlexChartPlotArea_1;
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
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (wijmo_angular2_directiveBase_1_1) {
                wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1;
            }
        ],
        execute: function () {
            ///<wijmo-soft-import from="wijmo.chart.finance"/>
            ///<wijmo-soft-import from="wijmo.chart.analytics"/>
            ///<wijmo-soft-import from="wijmo.chart.animation"/>
            ///<wijmo-soft-import from="wijmo.chart.annotation"/>
            ///<wijmo-soft-import from="wijmo.chart.finance.analytics"/>
            ///<wijmo-soft-import from="wijmo.chart.hierarchical"/>
            ///<wijmo-soft-import from="wijmo.chart.interaction"/>
            ///<wijmo-soft-import from="wijmo.chart.radar"/>
            exports_1("wjFlexChartMeta", wjFlexChartMeta = {
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
            });
            WjFlexChart = WjFlexChart_1 = (function (_super) {
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
                outputs: wjFlexChartMeta.outputs,
                changeEvents: {
                    'selectionChanged': ['selection']
                },
            };
            WjFlexChart = WjFlexChart_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartMeta.selector,
                    template: wjFlexChartMeta.template,
                    inputs: wjFlexChartMeta.inputs,
                    outputs: wjFlexChartMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChart_1; }) }
                    ].concat(wjFlexChartMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChart);
            exports_1("WjFlexChart", WjFlexChart);
            exports_1("wjFlexPieMeta", wjFlexPieMeta = {
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
            });
            WjFlexPie = WjFlexPie_1 = (function (_super) {
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
                outputs: wjFlexPieMeta.outputs,
            };
            WjFlexPie = WjFlexPie_1 = __decorate([
                core_1.Component({
                    selector: wjFlexPieMeta.selector,
                    template: wjFlexPieMeta.template,
                    inputs: wjFlexPieMeta.inputs,
                    outputs: wjFlexPieMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexPie_1; }) }
                    ].concat(wjFlexPieMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexPie);
            exports_1("WjFlexPie", WjFlexPie);
            exports_1("wjFlexChartAxisMeta", wjFlexChartAxisMeta = {
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
            });
            WjFlexChartAxis = WjFlexChartAxis_1 = (function (_super) {
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
                outputs: wjFlexChartAxisMeta.outputs,
            };
            WjFlexChartAxis = WjFlexChartAxis_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartAxisMeta.selector,
                    template: wjFlexChartAxisMeta.template,
                    inputs: wjFlexChartAxisMeta.inputs,
                    outputs: wjFlexChartAxisMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAxis_1; }) }
                    ].concat(wjFlexChartAxisMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartAxis);
            exports_1("WjFlexChartAxis", WjFlexChartAxis);
            exports_1("wjFlexChartLegendMeta", wjFlexChartLegendMeta = {
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
            });
            WjFlexChartLegend = WjFlexChartLegend_1 = (function (_super) {
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
                outputs: wjFlexChartLegendMeta.outputs,
            };
            WjFlexChartLegend = WjFlexChartLegend_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartLegendMeta.selector,
                    template: wjFlexChartLegendMeta.template,
                    inputs: wjFlexChartLegendMeta.inputs,
                    outputs: wjFlexChartLegendMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartLegend_1; }) }
                    ].concat(wjFlexChartLegendMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartLegend);
            exports_1("WjFlexChartLegend", WjFlexChartLegend);
            exports_1("wjFlexChartDataLabelMeta", wjFlexChartDataLabelMeta = {
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
            });
            WjFlexChartDataLabel = WjFlexChartDataLabel_1 = (function (_super) {
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
                outputs: wjFlexChartDataLabelMeta.outputs,
            };
            WjFlexChartDataLabel = WjFlexChartDataLabel_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartDataLabelMeta.selector,
                    template: wjFlexChartDataLabelMeta.template,
                    inputs: wjFlexChartDataLabelMeta.inputs,
                    outputs: wjFlexChartDataLabelMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartDataLabel_1; }) }
                    ].concat(wjFlexChartDataLabelMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartDataLabel);
            exports_1("WjFlexChartDataLabel", WjFlexChartDataLabel);
            exports_1("wjFlexPieDataLabelMeta", wjFlexPieDataLabelMeta = {
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
            });
            WjFlexPieDataLabel = WjFlexPieDataLabel_1 = (function (_super) {
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
                outputs: wjFlexPieDataLabelMeta.outputs,
            };
            WjFlexPieDataLabel = WjFlexPieDataLabel_1 = __decorate([
                core_1.Component({
                    selector: wjFlexPieDataLabelMeta.selector,
                    template: wjFlexPieDataLabelMeta.template,
                    inputs: wjFlexPieDataLabelMeta.inputs,
                    outputs: wjFlexPieDataLabelMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexPieDataLabel_1; }) }
                    ].concat(wjFlexPieDataLabelMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexPieDataLabel);
            exports_1("WjFlexPieDataLabel", WjFlexPieDataLabel);
            exports_1("wjFlexChartSeriesMeta", wjFlexChartSeriesMeta = {
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
            });
            WjFlexChartSeries = WjFlexChartSeries_1 = (function (_super) {
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
                outputs: wjFlexChartSeriesMeta.outputs,
                changeEvents: {
                    'chart.seriesVisibilityChanged': ['visibility']
                },
                siblingId: 'series',
            };
            WjFlexChartSeries = WjFlexChartSeries_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartSeriesMeta.selector,
                    template: wjFlexChartSeriesMeta.template,
                    inputs: wjFlexChartSeriesMeta.inputs,
                    outputs: wjFlexChartSeriesMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartSeries_1; }) }
                    ].concat(wjFlexChartSeriesMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartSeries);
            exports_1("WjFlexChartSeries", WjFlexChartSeries);
            exports_1("wjFlexChartLineMarkerMeta", wjFlexChartLineMarkerMeta = {
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
            });
            WjFlexChartLineMarker = WjFlexChartLineMarker_1 = (function (_super) {
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
                outputs: wjFlexChartLineMarkerMeta.outputs,
            };
            WjFlexChartLineMarker = WjFlexChartLineMarker_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartLineMarkerMeta.selector,
                    template: wjFlexChartLineMarkerMeta.template,
                    inputs: wjFlexChartLineMarkerMeta.inputs,
                    outputs: wjFlexChartLineMarkerMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartLineMarker_1; }) }
                    ].concat(wjFlexChartLineMarkerMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartLineMarker);
            exports_1("WjFlexChartLineMarker", WjFlexChartLineMarker);
            exports_1("wjFlexChartDataPointMeta", wjFlexChartDataPointMeta = {
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
            });
            WjFlexChartDataPoint = WjFlexChartDataPoint_1 = (function (_super) {
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
                outputs: wjFlexChartDataPointMeta.outputs,
            };
            WjFlexChartDataPoint = WjFlexChartDataPoint_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartDataPointMeta.selector,
                    template: wjFlexChartDataPointMeta.template,
                    inputs: wjFlexChartDataPointMeta.inputs,
                    outputs: wjFlexChartDataPointMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartDataPoint_1; }) }
                    ].concat(wjFlexChartDataPointMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartDataPoint);
            exports_1("WjFlexChartDataPoint", WjFlexChartDataPoint);
            exports_1("wjFlexChartPlotAreaMeta", wjFlexChartPlotAreaMeta = {
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
            });
            WjFlexChartPlotArea = WjFlexChartPlotArea_1 = (function (_super) {
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
                outputs: wjFlexChartPlotAreaMeta.outputs,
            };
            WjFlexChartPlotArea = WjFlexChartPlotArea_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartPlotAreaMeta.selector,
                    template: wjFlexChartPlotAreaMeta.template,
                    inputs: wjFlexChartPlotAreaMeta.inputs,
                    outputs: wjFlexChartPlotAreaMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartPlotArea_1; }) }
                    ].concat(wjFlexChartPlotAreaMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartPlotArea);
            exports_1("WjFlexChartPlotArea", WjFlexChartPlotArea);
            moduleExports = [
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
            WjChartModule = (function () {
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
            exports_1("WjChartModule", WjChartModule);
        }
    };
});
