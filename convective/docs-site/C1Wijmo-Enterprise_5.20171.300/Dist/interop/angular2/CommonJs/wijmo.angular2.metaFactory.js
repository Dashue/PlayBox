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
///<amd-module name='wijmo/wijmo.angular2.metaFactory'/>
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//import { wjMetaBase } from "wijmo/wijmo.metaFactory";
var wjMetaBase = require("wijmo/wijmo.metaFactory");
//export module wj.angular2 {
'use strict';
var MetaFactory = (function (_super) {
    __extends(MetaFactory, _super);
    function MetaFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Override to return wijmo.knockout.PropDesc
    MetaFactory.CreateProp = function (propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority) {
        return new PropDesc(propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority);
    };
    // Override to return wijmo.knockout.EventDesc
    MetaFactory.CreateEvent = function (eventName, isPropChanged) {
        return new EventDesc(eventName, isPropChanged);
    };
    // Override to return wijmo.knockout.ComplexPropDesc
    MetaFactory.CreateComplexProp = function (propertyName, isArray, ownsObject) {
        return new ComplexPropDesc(propertyName, isArray, ownsObject);
    };
    // Typecasted override.
    MetaFactory.findProp = function (propName, props) {
        return wjMetaBase.wj.interop.ControlMetaFactory.findProp(propName, props);
    };
    // Typecasted override.
    MetaFactory.findEvent = function (eventName, events) {
        return wjMetaBase.wj.interop.ControlMetaFactory.findEvent(eventName, events);
    };
    // Typecasted override.
    MetaFactory.findComplexProp = function (propName, props) {
        return wjMetaBase.wj.interop.ControlMetaFactory.findComplexProp(propName, props);
    };
    return MetaFactory;
}(wjMetaBase.wj.interop.ControlMetaFactory));
exports.MetaFactory = MetaFactory;
var PropDesc = (function (_super) {
    __extends(PropDesc, _super);
    function PropDesc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PropDesc;
}(wjMetaBase.wj.interop.PropDescBase));
exports.PropDesc = PropDesc;
// Describes a scope event
var EventDesc = (function (_super) {
    __extends(EventDesc, _super);
    function EventDesc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EventDesc;
}(wjMetaBase.wj.interop.EventDescBase));
exports.EventDesc = EventDesc;
// Describe property info for nested directives.
var ComplexPropDesc = (function (_super) {
    __extends(ComplexPropDesc, _super);
    function ComplexPropDesc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ComplexPropDesc;
}(wjMetaBase.wj.interop.ComplexPropDescBase));
exports.ComplexPropDesc = ComplexPropDesc;
//}
//export var wjNg2Meta = wj.angular2;
//export type ComplexPropDesc = wj.angular2.ComplexPropDesc;
