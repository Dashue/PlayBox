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
System.register(["wijmo/wijmo.grid.detail", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function(exports_1, context_1)
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
wjcGridDetail,
core_1,
core_2,
core_3,
common_1,
wijmo_angular2_directiveBase_1,
wjFlexGridDetailMeta,
WjFlexGridDetail,
moduleExports,
WjGridDetailModule;
return {
setters: [function(wjcGridDetail_1)
{
wjcGridDetail = wjcGridDetail_1
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
exports_1("wjFlexGridDetailMeta", wjFlexGridDetailMeta = {
selector: '[wjFlexGridDetail]', inputs: ['wjFlexGridDetail', 'maxHeight', 'detailVisibilityMode', 'rowHasDetail', 'isAnimated', ], outputs: ['initialized', ], exportAs: 'wjFlexGridDetail', providers: []
});
WjFlexGridDetail = function(_super)
{
function WjFlexGridDetail(elRef, injector, parentCmp, viewContainerRef, templateRef, domRenderer)
{
var _this=_super.call(this, parentCmp) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this._viewContainerRef = viewContainerRef, _this._templateRef = templateRef, _this._domRenderer = domRenderer, _this._init(), _this.created(), _this
}
return __extends(WjFlexGridDetail, _super), WjFlexGridDetail.prototype.created = function(){}, WjFlexGridDetail.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjFlexGridDetail.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjFlexGridDetail.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjFlexGridDetail.prototype._init = function()
{
var _this=this;
this.createDetailCell = function(row, col)
{
var templ=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(_this.grid.hostElement, _this._viewContainerRef, _this._templateRef, _this._domRenderer),
viewRef=templ.viewRef,
templRoot=templ.rootElement;
return viewRef.context.row = row, viewRef.context.col = col, viewRef.context.item = row.dataItem, templRoot.parentElement.removeChild(templRoot), templRoot[WjFlexGridDetail._viewRefProp] = viewRef, templRoot
};
this.disposeDetailCell = function(row)
{
var viewRef,
idx;
row.detail && (viewRef = row.detail[WjFlexGridDetail._viewRefProp]) && (row.detail[WjFlexGridDetail._viewRefProp] = null, idx = _this._viewContainerRef.indexOf(viewRef), idx > -1 && _this._viewContainerRef.remove(idx))
}
}, WjFlexGridDetail
}(wjcGridDetail.FlexGridDetailProvider);
WjFlexGridDetail._viewRefProp = '__wj_viewRef';
WjFlexGridDetail.meta = {outputs: wjFlexGridDetailMeta.outputs};
WjFlexGridDetail.decorators = [{
type: core_2.Directive, args: [{
selector: wjFlexGridDetailMeta.selector, inputs: wjFlexGridDetailMeta.inputs, outputs: wjFlexGridDetailMeta.outputs, exportAs: wjFlexGridDetailMeta.exportAs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjFlexGridDetail
})
}].concat(wjFlexGridDetailMeta.providers)
}, ]
}, ];
WjFlexGridDetail.ctorParameters = function()
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
}, {
type: core_2.ViewContainerRef, decorators: [{
type: core_3.Inject, args: [core_2.ViewContainerRef, ]
}, ]
}, {
type: core_2.TemplateRef, decorators: [{
type: core_3.Inject, args: [core_2.TemplateRef, ]
}, ]
}, {
type: core_2.Renderer, decorators: [{
type: core_3.Inject, args: [core_2.Renderer, ]
}, ]
}, ]
};
exports_1("WjFlexGridDetail", WjFlexGridDetail);
moduleExports = [WjFlexGridDetail];
WjGridDetailModule = function()
{
function WjGridDetailModule(){}
return WjGridDetailModule
}();
WjGridDetailModule.decorators = [{
type: core_1.NgModule, args: [{
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
}, ]
}, ];
WjGridDetailModule.ctorParameters = function()
{
return []
};
exports_1("WjGridDetailModule", WjGridDetailModule)
}
}
})