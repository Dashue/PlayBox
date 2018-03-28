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
System.register(["wijmo/wijmo.chart.interaction", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function(exports_1, context_1)
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
wjcChartInteraction,
core_1,
core_2,
core_3,
common_1,
wijmo_angular2_directiveBase_1,
wjFlexChartRangeSelectorMeta,
WjFlexChartRangeSelector,
wjFlexChartGesturesMeta,
WjFlexChartGestures,
moduleExports,
WjChartInteractionModule;
return {
setters: [function(wjcChartInteraction_1)
{
wjcChartInteraction = wjcChartInteraction_1
}, function(core_1_1)
{
core_1 = core_1_1;
core_2 = core_1_1;
core_3 = core_1_1
}, function(common_1_1)
{
common_1 = common_1_1
}, function(wijmo_angular2_directiveBase_1_1)
{
wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1
}], execute: function()
{
exports_1("wjFlexChartRangeSelectorMeta", wjFlexChartRangeSelectorMeta = {
selector: 'wj-flex-chart-range-selector', template: "", inputs: ['wjProperty', 'isVisible', 'min', 'max', 'orientation', 'seamless', 'minScale', 'maxScale', ], outputs: ['initialized', 'rangeChangedNg: rangeChanged', ], providers: []
});
WjFlexChartRangeSelector = function(_super)
{
function WjFlexChartRangeSelector(elRef, injector, parentCmp)
{
var _this=_super.call(this, parentCmp) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.rangeChangedNg = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartRangeSelector, _super), WjFlexChartRangeSelector.prototype.created = function(){}, WjFlexChartRangeSelector.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartRangeSelector.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartRangeSelector.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartRangeSelector
}(wjcChartInteraction.RangeSelector);
WjFlexChartRangeSelector.meta = {outputs: wjFlexChartRangeSelectorMeta.outputs};
WjFlexChartRangeSelector.decorators = [{
type: core_1.Component, args: [{
selector: wjFlexChartRangeSelectorMeta.selector, template: wjFlexChartRangeSelectorMeta.template, inputs: wjFlexChartRangeSelectorMeta.inputs, outputs: wjFlexChartRangeSelectorMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartRangeSelector
})
}].concat(wjFlexChartRangeSelectorMeta.providers)
}, ]
}, ];
WjFlexChartRangeSelector.ctorParameters = function()
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
exports_1("WjFlexChartRangeSelector", WjFlexChartRangeSelector);
exports_1("wjFlexChartGesturesMeta", wjFlexChartGesturesMeta = {
selector: 'wj-flex-chart-gestures', template: "", inputs: ['wjProperty', 'mouseAction', 'interactiveAxes', 'enable', 'scaleX', 'scaleY', 'posX', 'posY', ], outputs: ['initialized', ], providers: []
});
WjFlexChartGestures = function(_super)
{
function WjFlexChartGestures(elRef, injector, parentCmp)
{
var _this=_super.call(this, parentCmp) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjFlexChartGestures, _super), WjFlexChartGestures.prototype.created = function(){}, WjFlexChartGestures.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexChartGestures.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexChartGestures.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexChartGestures
}(wjcChartInteraction.ChartGestures);
WjFlexChartGestures.meta = {outputs: wjFlexChartGesturesMeta.outputs};
WjFlexChartGestures.decorators = [{
type: core_1.Component, args: [{
selector: wjFlexChartGesturesMeta.selector, template: wjFlexChartGesturesMeta.template, inputs: wjFlexChartGesturesMeta.inputs, outputs: wjFlexChartGesturesMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexChartGestures
})
}].concat(wjFlexChartGesturesMeta.providers)
}, ]
}, ];
WjFlexChartGestures.ctorParameters = function()
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
exports_1("WjFlexChartGestures", WjFlexChartGestures);
moduleExports = [WjFlexChartRangeSelector, WjFlexChartGestures];
WjChartInteractionModule = function()
{
function WjChartInteractionModule(){}
return WjChartInteractionModule
}();
WjChartInteractionModule.decorators = [{
type: core_1.NgModule, args: [{
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
}, ]
}, ];
WjChartInteractionModule.ctorParameters = function()
{
return []
};
exports_1("WjChartInteractionModule", WjChartInteractionModule)
}
}
})