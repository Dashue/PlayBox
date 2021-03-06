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
define(["require", "exports", "wijmo/wijmo.grid.grouppanel", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function(require, exports, wjcGridGrouppanel, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1)
{
"use strict";
var WjGroupPanel,
moduleExports,
WjGridGrouppanelModule;
Object.defineProperty(exports, "__esModule", {value: !0});
exports.wjGroupPanelMeta = {
selector: 'wj-group-panel', template: "", inputs: ['wjModelProperty', 'isDisabled', 'hideGroupedColumns', 'maxGroups', 'placeholder', 'grid', ], outputs: ['initialized', 'gotFocusNg: gotFocus', 'lostFocusNg: lostFocus', ], providers: [{
provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: !0, deps: ['WjComponent']
}]
};
WjGroupPanel = function(_super)
{
function WjGroupPanel(elRef, injector, parentCmp)
{
var _this=_super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.gotFocusNg = new core_1.EventEmitter(!1), _this.lostFocusNg = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjGroupPanel, _super), WjGroupPanel.prototype.created = function(){}, WjGroupPanel.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjGroupPanel.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjGroupPanel.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjGroupPanel
}(wjcGridGrouppanel.GroupPanel);
WjGroupPanel.meta = {outputs: exports.wjGroupPanelMeta.outputs};
WjGroupPanel.decorators = [{
type: core_1.Component, args: [{
selector: exports.wjGroupPanelMeta.selector, template: exports.wjGroupPanelMeta.template, inputs: exports.wjGroupPanelMeta.inputs, outputs: exports.wjGroupPanelMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjGroupPanel
})
}].concat(exports.wjGroupPanelMeta.providers)
}, ]
}, ];
WjGroupPanel.ctorParameters = function()
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
exports.WjGroupPanel = WjGroupPanel;
moduleExports = [WjGroupPanel];
WjGridGrouppanelModule = function()
{
function WjGridGrouppanelModule(){}
return WjGridGrouppanelModule
}();
WjGridGrouppanelModule.decorators = [{
type: core_1.NgModule, args: [{
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
}, ]
}, ];
WjGridGrouppanelModule.ctorParameters = function()
{
return []
};
exports.WjGridGrouppanelModule = WjGridGrouppanelModule
})