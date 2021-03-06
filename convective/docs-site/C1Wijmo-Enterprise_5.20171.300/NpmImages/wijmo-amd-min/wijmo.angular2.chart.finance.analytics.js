﻿/*
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
var __extends=this && this.__extends || function()
{
var extendStatics=Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d, b)
{
d.__proto__ = b
} || function(d, b)
{
for (var p in b)
b.hasOwnProperty(p) && (d[p] = b[p])
};
return function(d, b)
{
function __()
{
this.constructor = d
}
extendStatics(d, b);
d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __)
}
}();
define(["require", "exports", "wijmo/wijmo.chart.finance.analytics", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function(require, exports, wjcChartFinanceAnalytics, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1)
{
"use strict";
var WjFlexChartFibonacci,
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
WjFlexChartEnvelopes,
moduleExports,
WjChartFinanceAnalyticsModule;
Object.defineProperty(exports, "__esModule", {value: !0});
exports.wjFlexChartFibonacciMeta = {
selector: 'wj-flex-chart-fibonacci', template: "", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'high', 'low', 'labelPosition', 'levels', 'minX', 'maxX', 'uptrend', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
};
WjFlexChartFibonacci = function(_super)
{
function WjFlexChartFibonacci(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartFibonacci, _super), WjFlexChartFibonacci.prototype.created = function(){}, WjFlexChartFibonacci.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartFibonacci.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartFibonacci.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartFibonacci
}(wjcChartFinanceAnalytics.Fibonacci);
WjFlexChartFibonacci.meta = {
outputs: exports.wjFlexChartFibonacciMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartFibonacci.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjFlexChartFibonacciMeta.selector, template: exports.wjFlexChartFibonacciMeta.template, inputs: exports.wjFlexChartFibonacciMeta.inputs, outputs: exports.wjFlexChartFibonacciMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartFibonacci
})
}].concat(exports.wjFlexChartFibonacciMeta.providers)
}, ]
}, ];
WjFlexChartFibonacci.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports.WjFlexChartFibonacci = WjFlexChartFibonacci;
exports.wjFlexChartFibonacciArcsMeta = {
selector: 'wj-flex-chart-fibonacci-arcs', template: "", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'start', 'end', 'labelPosition', 'levels', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
};
WjFlexChartFibonacciArcs = function(_super)
{
function WjFlexChartFibonacciArcs(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartFibonacciArcs, _super), WjFlexChartFibonacciArcs.prototype.created = function(){}, WjFlexChartFibonacciArcs.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartFibonacciArcs.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartFibonacciArcs.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartFibonacciArcs
}(wjcChartFinanceAnalytics.FibonacciArcs);
WjFlexChartFibonacciArcs.meta = {
outputs: exports.wjFlexChartFibonacciArcsMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartFibonacciArcs.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjFlexChartFibonacciArcsMeta.selector, template: exports.wjFlexChartFibonacciArcsMeta.template, inputs: exports.wjFlexChartFibonacciArcsMeta.inputs, outputs: exports.wjFlexChartFibonacciArcsMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartFibonacciArcs
})
}].concat(exports.wjFlexChartFibonacciArcsMeta.providers)
}, ]
}, ];
WjFlexChartFibonacciArcs.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports.WjFlexChartFibonacciArcs = WjFlexChartFibonacciArcs;
exports.wjFlexChartFibonacciFansMeta = {
selector: 'wj-flex-chart-fibonacci-fans', template: "", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'start', 'end', 'labelPosition', 'levels', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
};
WjFlexChartFibonacciFans = function(_super)
{
function WjFlexChartFibonacciFans(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartFibonacciFans, _super), WjFlexChartFibonacciFans.prototype.created = function(){}, WjFlexChartFibonacciFans.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartFibonacciFans.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartFibonacciFans.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartFibonacciFans
}(wjcChartFinanceAnalytics.FibonacciFans);
WjFlexChartFibonacciFans.meta = {
outputs: exports.wjFlexChartFibonacciFansMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartFibonacciFans.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjFlexChartFibonacciFansMeta.selector, template: exports.wjFlexChartFibonacciFansMeta.template, inputs: exports.wjFlexChartFibonacciFansMeta.inputs, outputs: exports.wjFlexChartFibonacciFansMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartFibonacciFans
})
}].concat(exports.wjFlexChartFibonacciFansMeta.providers)
}, ]
}, ];
WjFlexChartFibonacciFans.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports.WjFlexChartFibonacciFans = WjFlexChartFibonacciFans;
exports.wjFlexChartFibonacciTimeZonesMeta = {
selector: 'wj-flex-chart-fibonacci-time-zones', template: "", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'startX', 'endX', 'labelPosition', 'levels', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
};
WjFlexChartFibonacciTimeZones = function(_super)
{
function WjFlexChartFibonacciTimeZones(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartFibonacciTimeZones, _super), WjFlexChartFibonacciTimeZones.prototype.created = function(){}, WjFlexChartFibonacciTimeZones.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartFibonacciTimeZones.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartFibonacciTimeZones.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartFibonacciTimeZones
}(wjcChartFinanceAnalytics.FibonacciTimeZones);
WjFlexChartFibonacciTimeZones.meta = {
outputs: exports.wjFlexChartFibonacciTimeZonesMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartFibonacciTimeZones.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjFlexChartFibonacciTimeZonesMeta.selector, template: exports.wjFlexChartFibonacciTimeZonesMeta.template, inputs: exports.wjFlexChartFibonacciTimeZonesMeta.inputs, outputs: exports.wjFlexChartFibonacciTimeZonesMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartFibonacciTimeZones
})
}].concat(exports.wjFlexChartFibonacciTimeZonesMeta.providers)
}, ]
}, ];
WjFlexChartFibonacciTimeZones.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports.WjFlexChartFibonacciTimeZones = WjFlexChartFibonacciTimeZones;
exports.wjFlexChartAtrMeta = {
selector: 'wj-flex-chart-atr', template: "", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'period', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
};
WjFlexChartAtr = function(_super)
{
function WjFlexChartAtr(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartAtr, _super), WjFlexChartAtr.prototype.created = function(){}, WjFlexChartAtr.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartAtr.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartAtr.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartAtr
}(wjcChartFinanceAnalytics.ATR);
WjFlexChartAtr.meta = {
outputs: exports.wjFlexChartAtrMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartAtr.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjFlexChartAtrMeta.selector, template: exports.wjFlexChartAtrMeta.template, inputs: exports.wjFlexChartAtrMeta.inputs, outputs: exports.wjFlexChartAtrMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartAtr
})
}].concat(exports.wjFlexChartAtrMeta.providers)
}, ]
}, ];
WjFlexChartAtr.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports.WjFlexChartAtr = WjFlexChartAtr;
exports.wjFlexChartCciMeta = {
selector: 'wj-flex-chart-cci', template: "", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'period', 'constant', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
};
WjFlexChartCci = function(_super)
{
function WjFlexChartCci(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartCci, _super), WjFlexChartCci.prototype.created = function(){}, WjFlexChartCci.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartCci.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartCci.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartCci
}(wjcChartFinanceAnalytics.CCI);
WjFlexChartCci.meta = {
outputs: exports.wjFlexChartCciMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartCci.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjFlexChartCciMeta.selector, template: exports.wjFlexChartCciMeta.template, inputs: exports.wjFlexChartCciMeta.inputs, outputs: exports.wjFlexChartCciMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartCci
})
}].concat(exports.wjFlexChartCciMeta.providers)
}, ]
}, ];
WjFlexChartCci.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports.WjFlexChartCci = WjFlexChartCci;
exports.wjFlexChartRsiMeta = {
selector: 'wj-flex-chart-rsi', template: "", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'period', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
};
WjFlexChartRsi = function(_super)
{
function WjFlexChartRsi(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartRsi, _super), WjFlexChartRsi.prototype.created = function(){}, WjFlexChartRsi.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartRsi.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartRsi.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartRsi
}(wjcChartFinanceAnalytics.RSI);
WjFlexChartRsi.meta = {
outputs: exports.wjFlexChartRsiMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartRsi.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjFlexChartRsiMeta.selector, template: exports.wjFlexChartRsiMeta.template, inputs: exports.wjFlexChartRsiMeta.inputs, outputs: exports.wjFlexChartRsiMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartRsi
})
}].concat(exports.wjFlexChartRsiMeta.providers)
}, ]
}, ];
WjFlexChartRsi.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports.WjFlexChartRsi = WjFlexChartRsi;
exports.wjFlexChartWilliamsRMeta = {
selector: 'wj-flex-chart-williams-r', template: "", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'period', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
};
WjFlexChartWilliamsR = function(_super)
{
function WjFlexChartWilliamsR(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartWilliamsR, _super), WjFlexChartWilliamsR.prototype.created = function(){}, WjFlexChartWilliamsR.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartWilliamsR.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartWilliamsR.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartWilliamsR
}(wjcChartFinanceAnalytics.WilliamsR);
WjFlexChartWilliamsR.meta = {
outputs: exports.wjFlexChartWilliamsRMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartWilliamsR.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjFlexChartWilliamsRMeta.selector, template: exports.wjFlexChartWilliamsRMeta.template, inputs: exports.wjFlexChartWilliamsRMeta.inputs, outputs: exports.wjFlexChartWilliamsRMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartWilliamsR
})
}].concat(exports.wjFlexChartWilliamsRMeta.providers)
}, ]
}, ];
WjFlexChartWilliamsR.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports.WjFlexChartWilliamsR = WjFlexChartWilliamsR;
exports.wjFlexChartMacdMeta = {
selector: 'wj-flex-chart-macd', template: "", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'fastPeriod', 'slowPeriod', 'smoothingPeriod', 'styles', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
};
WjFlexChartMacd = function(_super)
{
function WjFlexChartMacd(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartMacd, _super), WjFlexChartMacd.prototype.created = function(){}, WjFlexChartMacd.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartMacd.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartMacd.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartMacd
}(wjcChartFinanceAnalytics.Macd);
WjFlexChartMacd.meta = {
outputs: exports.wjFlexChartMacdMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartMacd.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjFlexChartMacdMeta.selector, template: exports.wjFlexChartMacdMeta.template, inputs: exports.wjFlexChartMacdMeta.inputs, outputs: exports.wjFlexChartMacdMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartMacd
})
}].concat(exports.wjFlexChartMacdMeta.providers)
}, ]
}, ];
WjFlexChartMacd.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports.WjFlexChartMacd = WjFlexChartMacd;
exports.wjFlexChartMacdHistogramMeta = {
selector: 'wj-flex-chart-macd-histogram', template: "", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'fastPeriod', 'slowPeriod', 'smoothingPeriod', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
};
WjFlexChartMacdHistogram = function(_super)
{
function WjFlexChartMacdHistogram(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartMacdHistogram, _super), WjFlexChartMacdHistogram.prototype.created = function(){}, WjFlexChartMacdHistogram.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartMacdHistogram.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartMacdHistogram.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartMacdHistogram
}(wjcChartFinanceAnalytics.MacdHistogram);
WjFlexChartMacdHistogram.meta = {
outputs: exports.wjFlexChartMacdHistogramMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartMacdHistogram.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjFlexChartMacdHistogramMeta.selector, template: exports.wjFlexChartMacdHistogramMeta.template, inputs: exports.wjFlexChartMacdHistogramMeta.inputs, outputs: exports.wjFlexChartMacdHistogramMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartMacdHistogram
})
}].concat(exports.wjFlexChartMacdHistogramMeta.providers)
}, ]
}, ];
WjFlexChartMacdHistogram.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports.WjFlexChartMacdHistogram = WjFlexChartMacdHistogram;
exports.wjFlexChartStochasticMeta = {
selector: 'wj-flex-chart-stochastic', template: "", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'dPeriod', 'kPeriod', 'smoothingPeriod', 'styles', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
};
WjFlexChartStochastic = function(_super)
{
function WjFlexChartStochastic(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartStochastic, _super), WjFlexChartStochastic.prototype.created = function(){}, WjFlexChartStochastic.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartStochastic.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartStochastic.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartStochastic
}(wjcChartFinanceAnalytics.Stochastic);
WjFlexChartStochastic.meta = {
outputs: exports.wjFlexChartStochasticMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartStochastic.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjFlexChartStochasticMeta.selector, template: exports.wjFlexChartStochasticMeta.template, inputs: exports.wjFlexChartStochasticMeta.inputs, outputs: exports.wjFlexChartStochasticMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartStochastic
})
}].concat(exports.wjFlexChartStochasticMeta.providers)
}, ]
}, ];
WjFlexChartStochastic.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports.WjFlexChartStochastic = WjFlexChartStochastic;
exports.wjFlexChartBollingerBandsMeta = {
selector: 'wj-flex-chart-bollinger-bands', template: "", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'period', 'multiplier', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
};
WjFlexChartBollingerBands = function(_super)
{
function WjFlexChartBollingerBands(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartBollingerBands, _super), WjFlexChartBollingerBands.prototype.created = function(){}, WjFlexChartBollingerBands.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartBollingerBands.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartBollingerBands.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartBollingerBands
}(wjcChartFinanceAnalytics.BollingerBands);
WjFlexChartBollingerBands.meta = {
outputs: exports.wjFlexChartBollingerBandsMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartBollingerBands.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjFlexChartBollingerBandsMeta.selector, template: exports.wjFlexChartBollingerBandsMeta.template, inputs: exports.wjFlexChartBollingerBandsMeta.inputs, outputs: exports.wjFlexChartBollingerBandsMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartBollingerBands
})
}].concat(exports.wjFlexChartBollingerBandsMeta.providers)
}, ]
}, ];
WjFlexChartBollingerBands.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports.WjFlexChartBollingerBands = WjFlexChartBollingerBands;
exports.wjFlexChartEnvelopesMeta = {
selector: 'wj-flex-chart-envelopes', template: "", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'period', 'size', 'type', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
};
WjFlexChartEnvelopes = function(_super)
{
function WjFlexChartEnvelopes(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartEnvelopes, _super), WjFlexChartEnvelopes.prototype.created = function(){}, WjFlexChartEnvelopes.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartEnvelopes.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartEnvelopes.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartEnvelopes
}(wjcChartFinanceAnalytics.Envelopes);
WjFlexChartEnvelopes.meta = {
outputs: exports.wjFlexChartEnvelopesMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartEnvelopes.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjFlexChartEnvelopesMeta.selector, template: exports.wjFlexChartEnvelopesMeta.template, inputs: exports.wjFlexChartEnvelopesMeta.inputs, outputs: exports.wjFlexChartEnvelopesMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartEnvelopes
})
}].concat(exports.wjFlexChartEnvelopesMeta.providers)
}, ]
}, ];
WjFlexChartEnvelopes.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports.WjFlexChartEnvelopes = WjFlexChartEnvelopes;
moduleExports = [WjFlexChartFibonacci, WjFlexChartFibonacciArcs, WjFlexChartFibonacciFans, WjFlexChartFibonacciTimeZones, WjFlexChartAtr, WjFlexChartCci, WjFlexChartRsi, WjFlexChartWilliamsR, WjFlexChartMacd, WjFlexChartMacdHistogram, WjFlexChartStochastic, WjFlexChartBollingerBands, WjFlexChartEnvelopes];
WjChartFinanceAnalyticsModule = function()
{
function WjChartFinanceAnalyticsModule(){}
return WjChartFinanceAnalyticsModule
}();
WjChartFinanceAnalyticsModule.decorators = [{
type: core_1.NgModule, args: [{
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
}, ]
}, ];
WjChartFinanceAnalyticsModule.ctorParameters = function()
{
return []
};
exports.WjChartFinanceAnalyticsModule = WjChartFinanceAnalyticsModule
})