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
TreeView,
Wj;
Object.defineProperty(exports, "__esModule", {value: !0});
var wjcReactBase=require("wijmo/wijmo.react.base"),
wjcNav=require("wijmo/wijmo.nav"),
wjcSelf=require("wijmo/wijmo.react.nav");
window.wijmo = window.wijmo || {};
window.wijmo.react = window.wijmo.react || {};
window.wijmo.react.nav = wjcSelf;
TreeView = function(_super)
{
function TreeView(props)
{
return _super.call(this, props, wjcNav.TreeView) || this
}
return __extends(TreeView, _super), TreeView
}(wjcReactBase.ComponentBase);
exports.TreeView = TreeView;
Wj = wjcReactBase