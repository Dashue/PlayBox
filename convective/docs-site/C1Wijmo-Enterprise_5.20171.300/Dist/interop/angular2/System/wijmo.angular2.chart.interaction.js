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
System.register("wijmo/wijmo.angular2.chart.interaction", ["@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
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
    var core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1, wjFlexChartRangeSelectorMeta, WjFlexChartRangeSelector, wjFlexChartGesturesMeta, WjFlexChartGestures, moduleExports, WjChartInteractionModule, WjFlexChartRangeSelector_1, WjFlexChartGestures_1;
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
            exports_1("wjFlexChartRangeSelectorMeta", wjFlexChartRangeSelectorMeta = {
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
            });
            WjFlexChartRangeSelector = WjFlexChartRangeSelector_1 = (function (_super) {
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
                outputs: wjFlexChartRangeSelectorMeta.outputs,
            };
            WjFlexChartRangeSelector = WjFlexChartRangeSelector_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartRangeSelectorMeta.selector,
                    template: wjFlexChartRangeSelectorMeta.template,
                    inputs: wjFlexChartRangeSelectorMeta.inputs,
                    outputs: wjFlexChartRangeSelectorMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartRangeSelector_1; }) }
                    ].concat(wjFlexChartRangeSelectorMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartRangeSelector);
            exports_1("WjFlexChartRangeSelector", WjFlexChartRangeSelector);
            exports_1("wjFlexChartGesturesMeta", wjFlexChartGesturesMeta = {
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
            });
            WjFlexChartGestures = WjFlexChartGestures_1 = (function (_super) {
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
                outputs: wjFlexChartGesturesMeta.outputs,
            };
            WjFlexChartGestures = WjFlexChartGestures_1 = __decorate([
                core_1.Component({
                    selector: wjFlexChartGesturesMeta.selector,
                    template: wjFlexChartGesturesMeta.template,
                    inputs: wjFlexChartGesturesMeta.inputs,
                    outputs: wjFlexChartGesturesMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartGestures_1; }) }
                    ].concat(wjFlexChartGesturesMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjFlexChartGestures);
            exports_1("WjFlexChartGestures", WjFlexChartGestures);
            moduleExports = [
                WjFlexChartRangeSelector,
                WjFlexChartGestures
            ];
            WjChartInteractionModule = (function () {
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
            exports_1("WjChartInteractionModule", WjChartInteractionModule);
        }
    };
});
