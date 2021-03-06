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
System.register(["wijmo/wijmo.chart", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function(exports_1, context_1)
{
"use strict";
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
}(),
__moduleName=context_1 && context_1.id,
wjcChart,
core_1,
core_2,
core_3,
common_1,
forms_1,
wijmo_angular2_directiveBase_1,
wjFlexChartMeta,
WjFlexChart,
wjFlexPieMeta,
WjFlexPie,
wjFlexChartAxisMeta,
WjFlexChartAxis,
wjFlexChartLegendMeta,
WjFlexChartLegend,
wjFlexChartDataLabelMeta,
WjFlexChartDataLabel,
wjFlexPieDataLabelMeta,
WjFlexPieDataLabel,
wjFlexChartSeriesMeta,
WjFlexChartSeries,
wjFlexChartLineMarkerMeta,
WjFlexChartLineMarker,
wjFlexChartDataPointMeta,
WjFlexChartDataPoint,
wjFlexChartPlotAreaMeta,
WjFlexChartPlotArea,
moduleExports,
WjChartModule;
return {
setters: [function(wjcChart_1)
{
wjcChart = wjcChart_1
}, function(core_1_1)
{
core_1 = core_1_1;
core_2 = core_1_1;
core_3 = core_1_1
}, function(common_1_1)
{
common_1 = common_1_1
}, function(forms_1_1)
{
forms_1 = forms_1_1
}, function(wijmo_angular2_directiveBase_1_1)
{
wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1
}], execute: function()
{
exports_1("wjFlexChartMeta", wjFlexChartMeta = {
selector: 'wj-flex-chart', template: "<div><ng-content></ng-content></div>", inputs: ['wjModelProperty', 'isDisabled', 'binding', 'footer', 'header', 'selectionMode', 'palette', 'plotMargin', 'footerStyle', 'headerStyle', 'tooltipContent', 'itemsSource', 'bindingX', 'interpolateNulls', 'legendToggle', 'symbolSize', 'options', 'selection', 'itemFormatter', 'labelContent', 'chartType', 'rotated', 'stacking', ], outputs: ['initialized', 'gotFocusNg: gotFocus', 'lostFocusNg: lostFocus', 'renderingNg: rendering', 'renderedNg: rendered', 'selectionChangedNg: selectionChanged', 'selectionChangePC: selectionChange', 'seriesVisibilityChangedNg: seriesVisibilityChanged', ], providers: [{
provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: !0, deps: ['WjComponent']
}]
});
WjFlexChart = function(_super)
{
function WjFlexChart(elRef, injector, parentCmp)
{
var _this=_super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.gotFocusNg = new core_1.EventEmitter(!1), _this.lostFocusNg = new core_1.EventEmitter(!1), _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.selectionChangedNg = new core_1.EventEmitter(!1), _this.selectionChangePC = new core_1.EventEmitter(!1), _this.seriesVisibilityChangedNg = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChart, _super), WjFlexChart.prototype.created = function(){}, WjFlexChart.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChart.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChart.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, Object.defineProperty(WjFlexChart.prototype, "tooltipContent", {
get: function()
{
return this.tooltip.content
}, set: function(value)
{
this.tooltip.content = value
}, enumerable: !0, configurable: !0
}), Object.defineProperty(WjFlexChart.prototype, "labelContent", {
get: function()
{
return this.dataLabel.content
}, set: function(value)
{
this.dataLabel.content = value
}, enumerable: !0, configurable: !0
}), WjFlexChart
}(wjcChart.FlexChart);
WjFlexChart.meta = {
outputs: wjFlexChartMeta.outputs, changeEvents: {selectionChanged: ['selection']}
};
WjFlexChart.decorators = [{
type: core_1.Component, args: [{
selector: wjFlexChartMeta.selector, template: wjFlexChartMeta.template, inputs: wjFlexChartMeta.inputs, outputs: wjFlexChartMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChart
})
}].concat(wjFlexChartMeta.providers)
}, ]
}, ];
WjFlexChart.ctorParameters = function()
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
exports_1("WjFlexChart", WjFlexChart);
exports_1("wjFlexPieMeta", wjFlexPieMeta = {
selector: 'wj-flex-pie', template: "<div><ng-content></ng-content></div>", inputs: ['wjModelProperty', 'isDisabled', 'binding', 'footer', 'header', 'selectionMode', 'palette', 'plotMargin', 'footerStyle', 'headerStyle', 'tooltipContent', 'itemsSource', 'bindingName', 'innerRadius', 'isAnimated', 'offset', 'reversed', 'startAngle', 'selectedItemPosition', 'selectedItemOffset', 'itemFormatter', 'labelContent', ], outputs: ['initialized', 'gotFocusNg: gotFocus', 'lostFocusNg: lostFocus', 'renderingNg: rendering', 'renderedNg: rendered', 'selectionChangedNg: selectionChanged', ], providers: [{
provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: !0, deps: ['WjComponent']
}]
});
WjFlexPie = function(_super)
{
function WjFlexPie(elRef, injector, parentCmp)
{
var _this=_super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.gotFocusNg = new core_1.EventEmitter(!1), _this.lostFocusNg = new core_1.EventEmitter(!1), _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.selectionChangedNg = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexPie, _super), WjFlexPie.prototype.created = function(){}, WjFlexPie.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexPie.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexPie.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, Object.defineProperty(WjFlexPie.prototype, "tooltipContent", {
get: function()
{
return this.tooltip.content
}, set: function(value)
{
this.tooltip.content = value
}, enumerable: !0, configurable: !0
}), Object.defineProperty(WjFlexPie.prototype, "labelContent", {
get: function()
{
return this.dataLabel.content
}, set: function(value)
{
this.dataLabel.content = value
}, enumerable: !0, configurable: !0
}), WjFlexPie
}(wjcChart.FlexPie);
WjFlexPie.meta = {outputs: wjFlexPieMeta.outputs};
WjFlexPie.decorators = [{
type: core_1.Component, args: [{
selector: wjFlexPieMeta.selector, template: wjFlexPieMeta.template, inputs: wjFlexPieMeta.inputs, outputs: wjFlexPieMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexPie
})
}].concat(wjFlexPieMeta.providers)
}, ]
}, ];
WjFlexPie.ctorParameters = function()
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
exports_1("WjFlexPie", WjFlexPie);
exports_1("wjFlexChartAxisMeta", wjFlexChartAxisMeta = {
selector: 'wj-flex-chart-axis', template: "", inputs: ['wjProperty', 'axisLine', 'format', 'labels', 'majorGrid', 'majorTickMarks', 'majorUnit', 'max', 'min', 'position', 'reversed', 'title', 'labelAngle', 'minorGrid', 'minorTickMarks', 'minorUnit', 'origin', 'logBase', 'plotArea', 'labelAlign', 'name', 'overlappingLabels', 'labelPadding', 'itemFormatter', 'itemsSource', 'binding', ], outputs: ['initialized', 'rangeChangedNg: rangeChanged', ], providers: []
});
WjFlexChartAxis = function(_super)
{
function WjFlexChartAxis(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'axes', _this.rangeChangedNg = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartAxis, _super), WjFlexChartAxis.prototype.created = function(){}, WjFlexChartAxis.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartAxis.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartAxis.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartAxis
}(wjcChart.Axis);
WjFlexChartAxis.meta = {outputs: wjFlexChartAxisMeta.outputs};
WjFlexChartAxis.decorators = [{
type: core_1.Component, args: [{
selector: wjFlexChartAxisMeta.selector, template: wjFlexChartAxisMeta.template, inputs: wjFlexChartAxisMeta.inputs, outputs: wjFlexChartAxisMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartAxis
})
}].concat(wjFlexChartAxisMeta.providers)
}, ]
}, ];
WjFlexChartAxis.ctorParameters = function()
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
exports_1("WjFlexChartAxis", WjFlexChartAxis);
exports_1("wjFlexChartLegendMeta", wjFlexChartLegendMeta = {
selector: 'wj-flex-chart-legend', template: "", inputs: ['wjProperty', 'position', ], outputs: ['initialized', ], providers: []
});
WjFlexChartLegend = function(_super)
{
function WjFlexChartLegend(elRef, injector, parentCmp)
{
var _this=_super.call(this, parentCmp) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'legend', behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartLegend, _super), WjFlexChartLegend.prototype.created = function(){}, WjFlexChartLegend.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartLegend.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartLegend.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartLegend
}(wjcChart.Legend);
WjFlexChartLegend.meta = {outputs: wjFlexChartLegendMeta.outputs};
WjFlexChartLegend.decorators = [{
type: core_1.Component, args: [{
selector: wjFlexChartLegendMeta.selector, template: wjFlexChartLegendMeta.template, inputs: wjFlexChartLegendMeta.inputs, outputs: wjFlexChartLegendMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartLegend
})
}].concat(wjFlexChartLegendMeta.providers)
}, ]
}, ];
WjFlexChartLegend.ctorParameters = function()
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
exports_1("WjFlexChartLegend", WjFlexChartLegend);
exports_1("wjFlexChartDataLabelMeta", wjFlexChartDataLabelMeta = {
selector: 'wj-flex-chart-data-label', template: "", inputs: ['wjProperty', 'content', 'border', 'position', ], outputs: ['initialized', ], providers: []
});
WjFlexChartDataLabel = function(_super)
{
function WjFlexChartDataLabel(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'dataLabel', behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartDataLabel, _super), WjFlexChartDataLabel.prototype.created = function(){}, WjFlexChartDataLabel.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartDataLabel.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartDataLabel.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartDataLabel
}(wjcChart.DataLabel);
WjFlexChartDataLabel.meta = {outputs: wjFlexChartDataLabelMeta.outputs};
WjFlexChartDataLabel.decorators = [{
type: core_1.Component, args: [{
selector: wjFlexChartDataLabelMeta.selector, template: wjFlexChartDataLabelMeta.template, inputs: wjFlexChartDataLabelMeta.inputs, outputs: wjFlexChartDataLabelMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartDataLabel
})
}].concat(wjFlexChartDataLabelMeta.providers)
}, ]
}, ];
WjFlexChartDataLabel.ctorParameters = function()
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
exports_1("WjFlexChartDataLabel", WjFlexChartDataLabel);
exports_1("wjFlexPieDataLabelMeta", wjFlexPieDataLabelMeta = {
selector: 'wj-flex-pie-data-label', template: "", inputs: ['wjProperty', 'content', 'border', 'position', ], outputs: ['initialized', ], providers: []
});
WjFlexPieDataLabel = function(_super)
{
function WjFlexPieDataLabel(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'dataLabel', behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexPieDataLabel, _super), WjFlexPieDataLabel.prototype.created = function(){}, WjFlexPieDataLabel.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexPieDataLabel.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexPieDataLabel.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexPieDataLabel
}(wjcChart.PieDataLabel);
WjFlexPieDataLabel.meta = {outputs: wjFlexPieDataLabelMeta.outputs};
WjFlexPieDataLabel.decorators = [{
type: core_1.Component, args: [{
selector: wjFlexPieDataLabelMeta.selector, template: wjFlexPieDataLabelMeta.template, inputs: wjFlexPieDataLabelMeta.inputs, outputs: wjFlexPieDataLabelMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexPieDataLabel
})
}].concat(wjFlexPieDataLabelMeta.providers)
}, ]
}, ];
WjFlexPieDataLabel.ctorParameters = function()
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
exports_1("WjFlexPieDataLabel", WjFlexPieDataLabel);
exports_1("wjFlexChartSeriesMeta", wjFlexChartSeriesMeta = {
selector: 'wj-flex-chart-series', template: "<div><ng-content></ng-content></div>", inputs: ['wjProperty', 'axisX', 'axisY', 'binding', 'bindingX', 'cssClass', 'name', 'style', 'altStyle', 'symbolMarker', 'symbolSize', 'symbolStyle', 'visibility', 'itemsSource', 'chartType', ], outputs: ['initialized', 'renderingNg: rendering', 'renderedNg: rendered', 'visibilityChangePC: visibilityChange', ], providers: []
});
WjFlexChartSeries = function(_super)
{
function WjFlexChartSeries(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'series', _this.renderingNg = new core_1.EventEmitter(!1), _this.renderedNg = new core_1.EventEmitter(!1), _this.visibilityChangePC = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartSeries, _super), WjFlexChartSeries.prototype.created = function(){}, WjFlexChartSeries.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartSeries.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartSeries.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartSeries
}(wjcChart.Series);
WjFlexChartSeries.meta = {
outputs: wjFlexChartSeriesMeta.outputs, changeEvents: {'chart.seriesVisibilityChanged': ['visibility']}, siblingId: 'series'
};
WjFlexChartSeries.decorators = [{
type: core_1.Component, args: [{
selector: wjFlexChartSeriesMeta.selector, template: wjFlexChartSeriesMeta.template, inputs: wjFlexChartSeriesMeta.inputs, outputs: wjFlexChartSeriesMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartSeries
})
}].concat(wjFlexChartSeriesMeta.providers)
}, ]
}, ];
WjFlexChartSeries.ctorParameters = function()
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
exports_1("WjFlexChartSeries", WjFlexChartSeries);
exports_1("wjFlexChartLineMarkerMeta", wjFlexChartLineMarkerMeta = {
selector: 'wj-flex-line-marker', template: "", inputs: ['wjProperty', 'isVisible', 'seriesIndex', 'horizontalPosition', 'content', 'verticalPosition', 'alignment', 'lines', 'interaction', 'dragLines', 'dragThreshold', 'dragContent', ], outputs: ['initialized', 'positionChangedNg: positionChanged', ], providers: []
});
WjFlexChartLineMarker = function(_super)
{
function WjFlexChartLineMarker(elRef, injector, parentCmp)
{
var _this=_super.call(this, parentCmp) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.positionChangedNg = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartLineMarker, _super), WjFlexChartLineMarker.prototype.created = function(){}, WjFlexChartLineMarker.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartLineMarker.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartLineMarker.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartLineMarker
}(wjcChart.LineMarker);
WjFlexChartLineMarker.meta = {outputs: wjFlexChartLineMarkerMeta.outputs};
WjFlexChartLineMarker.decorators = [{
type: core_1.Component, args: [{
selector: wjFlexChartLineMarkerMeta.selector, template: wjFlexChartLineMarkerMeta.template, inputs: wjFlexChartLineMarkerMeta.inputs, outputs: wjFlexChartLineMarkerMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartLineMarker
})
}].concat(wjFlexChartLineMarkerMeta.providers)
}, ]
}, ];
WjFlexChartLineMarker.ctorParameters = function()
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
exports_1("WjFlexChartLineMarker", WjFlexChartLineMarker);
exports_1("wjFlexChartDataPointMeta", wjFlexChartDataPointMeta = {
selector: 'wj-flex-chart-data-point', template: "", inputs: ['wjProperty', 'x', 'y', ], outputs: ['initialized', ], providers: []
});
WjFlexChartDataPoint = function(_super)
{
function WjFlexChartDataPoint(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = '', behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartDataPoint, _super), WjFlexChartDataPoint.prototype.created = function(){}, WjFlexChartDataPoint.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartDataPoint.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartDataPoint.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartDataPoint
}(wjcChart.DataPoint);
WjFlexChartDataPoint.meta = {outputs: wjFlexChartDataPointMeta.outputs};
WjFlexChartDataPoint.decorators = [{
type: core_1.Component, args: [{
selector: wjFlexChartDataPointMeta.selector, template: wjFlexChartDataPointMeta.template, inputs: wjFlexChartDataPointMeta.inputs, outputs: wjFlexChartDataPointMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartDataPoint
})
}].concat(wjFlexChartDataPointMeta.providers)
}, ]
}, ];
WjFlexChartDataPoint.ctorParameters = function()
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
exports_1("WjFlexChartDataPoint", WjFlexChartDataPoint);
exports_1("wjFlexChartPlotAreaMeta", wjFlexChartPlotAreaMeta = {
selector: 'wj-flex-chart-plot-area', template: "", inputs: ['wjProperty', 'column', 'height', 'name', 'row', 'style', 'width', ], outputs: ['initialized', ], providers: []
});
WjFlexChartPlotArea = function(_super)
{
function WjFlexChartPlotArea(elRef, injector, parentCmp)
{
var _this=_super.call(this) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.wjProperty = 'plotAreas', behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartPlotArea, _super), WjFlexChartPlotArea.prototype.created = function(){}, WjFlexChartPlotArea.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartPlotArea.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartPlotArea.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartPlotArea
}(wjcChart.PlotArea);
WjFlexChartPlotArea.meta = {outputs: wjFlexChartPlotAreaMeta.outputs};
WjFlexChartPlotArea.decorators = [{
type: core_1.Component, args: [{
selector: wjFlexChartPlotAreaMeta.selector, template: wjFlexChartPlotAreaMeta.template, inputs: wjFlexChartPlotAreaMeta.inputs, outputs: wjFlexChartPlotAreaMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartPlotArea
})
}].concat(wjFlexChartPlotAreaMeta.providers)
}, ]
}, ];
WjFlexChartPlotArea.ctorParameters = function()
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
exports_1("WjFlexChartPlotArea", WjFlexChartPlotArea);
moduleExports = [WjFlexChart, WjFlexPie, WjFlexChartAxis, WjFlexChartLegend, WjFlexChartDataLabel, WjFlexPieDataLabel, WjFlexChartSeries, WjFlexChartLineMarker, WjFlexChartDataPoint, WjFlexChartPlotArea];
WjChartModule = function()
{
function WjChartModule(){}
return WjChartModule
}();
WjChartModule.decorators = [{
type: core_1.NgModule, args: [{
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
}, ]
}, ];
WjChartModule.ctorParameters = function()
{
return []
};
exports_1("WjChartModule", WjChartModule)
}
}
})