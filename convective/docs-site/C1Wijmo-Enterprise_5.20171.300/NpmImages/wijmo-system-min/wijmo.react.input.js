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
System.register(["wijmo/wijmo.react.base", "wijmo/wijmo.input", "wijmo/wijmo.react.input", "react"], function(exports_1, context_1)
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
wjcInput,
wjcSelf,
React,
ComboBox,
AutoComplete,
Calendar,
ColorPicker,
InputMask,
InputColor,
MultiSelect,
MultiAutoComplete,
InputNumber,
InputDate,
InputTime,
InputDateTime,
ListBox,
Menu,
Popup,
Wj;
return {
setters: [function(wjcReactBase_1)
{
wjcReactBase = wjcReactBase_1
}, function(wjcInput_1)
{
wjcInput = wjcInput_1
}, function(wjcSelf_1)
{
wjcSelf = wjcSelf_1
}, function(React_1)
{
React = React_1
}], execute: function()
{
window.wijmo = window.wijmo || {};
window.wijmo.react = window.wijmo.react || {};
window.wijmo.react.input = wjcSelf;
ComboBox = function(_super)
{
function ComboBox(props)
{
return _super.call(this, props, wjcInput.ComboBox) || this
}
return __extends(ComboBox, _super), ComboBox
}(wjcReactBase.ComponentBase);
exports_1("ComboBox", ComboBox);
AutoComplete = function(_super)
{
function AutoComplete(props)
{
return _super.call(this, props, wjcInput.AutoComplete) || this
}
return __extends(AutoComplete, _super), AutoComplete
}(wjcReactBase.ComponentBase);
exports_1("AutoComplete", AutoComplete);
Calendar = function(_super)
{
function Calendar(props)
{
return _super.call(this, props, wjcInput.Calendar) || this
}
return __extends(Calendar, _super), Calendar
}(wjcReactBase.ComponentBase);
exports_1("Calendar", Calendar);
ColorPicker = function(_super)
{
function ColorPicker(props)
{
return _super.call(this, props, wjcInput.ColorPicker) || this
}
return __extends(ColorPicker, _super), ColorPicker
}(wjcReactBase.ComponentBase);
exports_1("ColorPicker", ColorPicker);
InputMask = function(_super)
{
function InputMask(props)
{
return _super.call(this, props, wjcInput.InputMask) || this
}
return __extends(InputMask, _super), InputMask
}(wjcReactBase.ComponentBase);
exports_1("InputMask", InputMask);
InputColor = function(_super)
{
function InputColor(props)
{
return _super.call(this, props, wjcInput.InputColor) || this
}
return __extends(InputColor, _super), InputColor
}(wjcReactBase.ComponentBase);
exports_1("InputColor", InputColor);
MultiSelect = function(_super)
{
function MultiSelect(props)
{
return _super.call(this, props, wjcInput.MultiSelect) || this
}
return __extends(MultiSelect, _super), MultiSelect
}(wjcReactBase.ComponentBase);
exports_1("MultiSelect", MultiSelect);
MultiAutoComplete = function(_super)
{
function MultiAutoComplete(props)
{
return _super.call(this, props, wjcInput.MultiAutoComplete) || this
}
return __extends(MultiAutoComplete, _super), MultiAutoComplete
}(wjcReactBase.ComponentBase);
exports_1("MultiAutoComplete", MultiAutoComplete);
InputNumber = function(_super)
{
function InputNumber(props)
{
return _super.call(this, props, wjcInput.InputNumber) || this
}
return __extends(InputNumber, _super), InputNumber
}(wjcReactBase.ComponentBase);
exports_1("InputNumber", InputNumber);
InputDate = function(_super)
{
function InputDate(props)
{
return _super.call(this, props, wjcInput.InputDate) || this
}
return __extends(InputDate, _super), InputDate
}(wjcReactBase.ComponentBase);
exports_1("InputDate", InputDate);
InputTime = function(_super)
{
function InputTime(props)
{
return _super.call(this, props, wjcInput.InputTime) || this
}
return __extends(InputTime, _super), InputTime
}(wjcReactBase.ComponentBase);
exports_1("InputTime", InputTime);
InputDateTime = function(_super)
{
function InputDateTime(props)
{
return _super.call(this, props, wjcInput.InputDateTime) || this
}
return __extends(InputDateTime, _super), InputDateTime
}(wjcReactBase.ComponentBase);
exports_1("InputDateTime", InputDateTime);
ListBox = function(_super)
{
function ListBox(props)
{
return _super.call(this, props, wjcInput.ListBox) || this
}
return __extends(ListBox, _super), ListBox
}(wjcReactBase.ComponentBase);
exports_1("ListBox", ListBox);
Menu = function(_super)
{
function Menu(props)
{
return _super.call(this, props, wjcInput.Menu) || this
}
return __extends(Menu, _super), Menu
}(wjcReactBase.ComponentBase);
exports_1("Menu", Menu);
Popup = function(_super)
{
function Popup(props)
{
return _super.call(this, props, wjcInput.Popup) || this
}
return __extends(Popup, _super), Popup.prototype.render = function()
{
return React.createElement('div', null, this.props.children)
}, Popup
}(wjcReactBase.ComponentBase);
exports_1("Popup", Popup);
Wj = wjcReactBase
}
}
})