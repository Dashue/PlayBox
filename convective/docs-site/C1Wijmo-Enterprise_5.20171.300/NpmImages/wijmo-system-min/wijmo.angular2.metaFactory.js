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
System.register(["wijmo/wijmo.metaFactory"], function(exports_1, context_1)
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
wjcMetafactory,
MetaFactory,
PropDesc,
EventDesc,
ComplexPropDesc;
return {
setters: [function(wjcMetafactory_1)
{
wjcMetafactory = wjcMetafactory_1
}], execute: function()
{
MetaFactory = function(_super)
{
function MetaFactory()
{
return _super !== null && _super.apply(this, arguments) || this
}
return __extends(MetaFactory, _super), MetaFactory.CreateProp = function(propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority)
{
return new PropDesc(propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority)
}, MetaFactory.CreateEvent = function(eventName, isPropChanged)
{
return new EventDesc(eventName, isPropChanged)
}, MetaFactory.CreateComplexProp = function(propertyName, isArray, ownsObject)
{
return new ComplexPropDesc(propertyName, isArray, ownsObject)
}, MetaFactory.findProp = function(propName, props)
{
return wjcMetafactory.ControlMetaFactory.findProp(propName, props)
}, MetaFactory.findEvent = function(eventName, events)
{
return wjcMetafactory.ControlMetaFactory.findEvent(eventName, events)
}, MetaFactory.findComplexProp = function(propName, props)
{
return wjcMetafactory.ControlMetaFactory.findComplexProp(propName, props)
}, MetaFactory
}(wjcMetafactory.ControlMetaFactory);
exports_1("MetaFactory", MetaFactory);
PropDesc = function(_super)
{
function PropDesc()
{
return _super !== null && _super.apply(this, arguments) || this
}
return __extends(PropDesc, _super), PropDesc
}(wjcMetafactory.PropDescBase);
exports_1("PropDesc", PropDesc);
EventDesc = function(_super)
{
function EventDesc()
{
return _super !== null && _super.apply(this, arguments) || this
}
return __extends(EventDesc, _super), EventDesc
}(wjcMetafactory.EventDescBase);
exports_1("EventDesc", EventDesc);
ComplexPropDesc = function(_super)
{
function ComplexPropDesc()
{
return _super !== null && _super.apply(this, arguments) || this
}
return __extends(ComplexPropDesc, _super), ComplexPropDesc
}(wjcMetafactory.ComplexPropDescBase);
exports_1("ComplexPropDesc", ComplexPropDesc)
}
}
})