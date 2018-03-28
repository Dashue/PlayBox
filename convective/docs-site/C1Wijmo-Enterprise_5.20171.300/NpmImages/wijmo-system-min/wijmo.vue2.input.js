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
System.register(["wijmo/wijmo.vue2.base", "wijmo/wijmo.input", "wijmo/wijmo.vue2.input", "vue"], function(exports_1, context_1)
{
"use strict";
var __moduleName=context_1 && context_1.id,
wjcVue2Base,
wjcInput,
wjcSelf,
vue_1,
VueModule,
Vue,
WjComboBox,
WjAutoComplete,
WjCalendar,
WjColorPicker,
WjInputMask,
WjInputColor,
WjMultiSelect,
WjMultiAutoComplete,
WjInputNumber,
WjInputDate,
WjInputTime,
WjInputDateTime,
WjListBox,
WjMenu,
WjPopup;
return {
setters: [function(wjcVue2Base_1)
{
wjcVue2Base = wjcVue2Base_1
}, function(wjcInput_1)
{
wjcInput = wjcInput_1
}, function(wjcSelf_1)
{
wjcSelf = wjcSelf_1
}, function(vue_1_1)
{
vue_1 = vue_1_1;
VueModule = vue_1_1
}], execute: function()
{
window.wijmo = window.wijmo || {};
window.wijmo.vue2 = window.wijmo.vue2 || {};
window.wijmo.vue2.input = wjcSelf;
exports_1("Vue", Vue = vue_1.default || VueModule);
exports_1("WjComboBox", WjComboBox = Vue.component('wj-combo-box', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.ComboBox'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.ComboBox(this.$el))
}
}));
exports_1("WjAutoComplete", WjAutoComplete = Vue.component('wj-auto-complete', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.AutoComplete'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.AutoComplete(this.$el))
}
}));
exports_1("WjCalendar", WjCalendar = Vue.component('wj-calendar', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.Calendar'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.Calendar(this.$el))
}
}));
exports_1("WjColorPicker", WjColorPicker = Vue.component('wj-color-picker', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.ColorPicker'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.ColorPicker(this.$el))
}
}));
exports_1("WjInputMask", WjInputMask = Vue.component('wj-input-mask', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.InputMask'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.InputMask(this.$el))
}
}));
exports_1("WjInputColor", WjInputColor = Vue.component('wj-input-color', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.InputColor'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.InputColor(this.$el))
}
}));
exports_1("WjMultiSelect", WjMultiSelect = Vue.component('wj-multi-select', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.MultiSelect'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.MultiSelect(this.$el))
}
}));
exports_1("WjMultiAutoComplete", WjMultiAutoComplete = Vue.component('wj-multi-auto-complete', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.MultiAutoComplete'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.MultiAutoComplete(this.$el))
}
}));
exports_1("WjInputNumber", WjInputNumber = Vue.component('wj-input-number', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.InputNumber'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.InputNumber(this.$el))
}
}));
exports_1("WjInputDate", WjInputDate = Vue.component('wj-input-date', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.InputDate'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.InputDate(this.$el))
}
}));
exports_1("WjInputTime", WjInputTime = Vue.component('wj-input-time', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.InputTime'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.InputTime(this.$el))
}
}));
exports_1("WjInputDateTime", WjInputDateTime = Vue.component('wj-input-date-time', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.InputDateTime'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.InputDateTime(this.$el))
}
}));
exports_1("WjListBox", WjListBox = Vue.component('wj-list-box', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.ListBox'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.ListBox(this.$el))
}
}));
exports_1("WjMenu", WjMenu = Vue.component('wj-menu', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.input.Menu'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.Menu(this.$el))
}
}));
exports_1("WjPopup", WjPopup = Vue.component('wj-popup', {
template: '<div><slot/></div>', props: wjcVue2Base._getProps('wijmo.input.Popup'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcInput.Popup(this.$el))
}
}))
}
}
})