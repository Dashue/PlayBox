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
wjcCore,
wjcSelf;
Object.defineProperty(exports, "__esModule", {value: !0});
wjcCore = require("wijmo/wijmo");
wjcSelf = require("wijmo/wijmo.react.base");
window.wijmo = window.wijmo || {};
window.wijmo.react = window.wijmo.react || {};
window.wijmo.react.base = wjcSelf;
var ReactDOM=require("react-dom"),
React=require("react"),
ComponentBase=function(_super)
{
function ComponentBase(props, controlType)
{
var _this=_super.call(this, props) || this;
return _this.props = props, _this.controlType = controlType, _this
}
return __extends(ComponentBase, _super), ComponentBase.prototype.render = function()
{
return React.createElement('div')
}, ComponentBase.prototype.componentDidMount = function()
{
var host=ReactDOM.findDOMNode(this),
control=new this.controlType(host),
cprops=this.props,
props={};
for (var prop in cprops)
if (prop in control)
props[prop] = cprops[prop];
else
switch (prop)
{
case'className':
wjcCore.addClass(host, cprops.className);
break;
case'style':
wjcCore.setCss(host, cprops.style);
break;
default:
host[prop] != null && (host[prop] = cprops[prop])
}
return control.initialize(props), wjcCore.isFunction(cprops.initialized) && cprops.initialized(control), control
}, ComponentBase.prototype.componentWillUnmount = function()
{
this._getControl(this).dispose()
}, ComponentBase.prototype.shouldComponentUpdate = function(nextProps)
{
var ctl=this._getControl(this);
return this._copy(ctl, nextProps), !0
}, ComponentBase.prototype._getControl = function(component)
{
var host=ReactDOM.findDOMNode(component);
return wjcCore.Control.getControl(host)
}, ComponentBase.prototype._copy = function(dst, src)
{
var p,
value,
i;
for (p in src)
if (value = src[p], p in src && p != 'itemsSource' && !this._sameValue(dst[p], value))
if (p == 'className')
dst.hostElement && wjcCore.addClass(dst.hostElement, src[p]);
else if (p == 'style')
dst.hostElement && wjcCore.setCss(dst.hostElement, src[p]);
else if (wjcCore.isPrimitive(value))
dst[p] = value;
else if (wjcCore.isObject(value))
this._copy(dst[p], src[p]);
else if (wjcCore.isArray(value) && wjcCore.isArray(dst[p]) && (dst = dst[p], src = value, src.length == dst.length))
for (i = 0; i < src.length; i++)
this._copy(dst[i], src[i])
}, ComponentBase.prototype._sameValue = function(v1, v2)
{
return v1 == v2 || wjcCore.DateTime.equals(v1, v2)
}, ComponentBase
}(React.Component);
exports.ComponentBase = ComponentBase