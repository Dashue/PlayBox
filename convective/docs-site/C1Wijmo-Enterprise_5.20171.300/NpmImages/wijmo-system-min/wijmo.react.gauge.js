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
System.register(["wijmo/wijmo.react.base", "wijmo/wijmo.gauge", "wijmo/wijmo.react.gauge"], function(exports_1, context_1)
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
wjcReactBase,
wjcGauge,
wjcSelf,
LinearGauge,
BulletGraph,
RadialGauge,
Wj;
return {
setters: [function(wjcReactBase_1)
{
wjcReactBase = wjcReactBase_1
}, function(wjcGauge_1)
{
wjcGauge = wjcGauge_1
}, function(wjcSelf_1)
{
wjcSelf = wjcSelf_1
}], execute: function()
{
window.wijmo = window.wijmo || {};
window.wijmo.react = window.wijmo.react || {};
window.wijmo.react.gauge = wjcSelf;
LinearGauge = function(_super)
{
function LinearGauge(props)
{
return _super.call(this, props, wjcGauge.LinearGauge) || this
}
return __extends(LinearGauge, _super), LinearGauge
}(wjcReactBase.ComponentBase);
exports_1("LinearGauge", LinearGauge);
BulletGraph = function(_super)
{
function BulletGraph(props)
{
return _super.call(this, props, wjcGauge.BulletGraph) || this
}
return __extends(BulletGraph, _super), BulletGraph
}(wjcReactBase.ComponentBase);
exports_1("BulletGraph", BulletGraph);
RadialGauge = function(_super)
{
function RadialGauge(props)
{
return _super.call(this, props, wjcGauge.RadialGauge) || this
}
return __extends(RadialGauge, _super), RadialGauge
}(wjcReactBase.ComponentBase);
exports_1("RadialGauge", RadialGauge);
Wj = wjcReactBase
}
}
})