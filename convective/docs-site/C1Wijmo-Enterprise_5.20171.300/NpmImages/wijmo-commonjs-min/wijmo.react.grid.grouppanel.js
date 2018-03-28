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
GroupPanel,
Wj;
Object.defineProperty(exports, "__esModule", {value: !0});
var wjcReactBase=require("wijmo/wijmo.react.base"),
wjcGridGrouppanel=require("wijmo/wijmo.grid.grouppanel"),
wjcSelf=require("wijmo/wijmo.react.grid.grouppanel");
window.wijmo = window.wijmo || {};
window.wijmo.react = window.wijmo.react || {};
window.wijmo.react.grid = window.wijmo.react.grid || {};
window.wijmo.react.grid.grouppanel = wjcSelf;
GroupPanel = function(_super)
{
function GroupPanel(props)
{
return _super.call(this, props, wjcGridGrouppanel.GroupPanel) || this
}
return __extends(GroupPanel, _super), GroupPanel
}(wjcReactBase.ComponentBase);
exports.GroupPanel = GroupPanel;
Wj = wjcReactBase