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
System.register(["wijmo/wijmo.vue2.base", "wijmo/wijmo.grid", "wijmo/wijmo.grid.filter", "wijmo/wijmo.vue2.grid", "vue"], function(exports_1, context_1)
{
"use strict";
var __moduleName=context_1 && context_1.id,
wjcVue2Base,
wjcGrid,
wjcGridFilter,
wjcSelf,
vue_1,
VueModule,
Vue,
WjFlexGrid,
WjFlexGridColumn;
return {
setters: [function(wjcVue2Base_1)
{
wjcVue2Base = wjcVue2Base_1
}, function(wjcGrid_1)
{
wjcGrid = wjcGrid_1
}, function(wjcGridFilter_1)
{
wjcGridFilter = wjcGridFilter_1
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
window.wijmo.vue2.grid = wjcSelf;
exports_1("Vue", Vue = vue_1.default || VueModule);
exports_1("WjFlexGrid", WjFlexGrid = Vue.component('wj-flex-grid', {
template: '<div><slot/></div>', props: wjcVue2Base._getProps('wijmo.grid.FlexGrid'), mounted: function()
{
var _this=this,
autoGenerateColumns=!0,
ctl;
this.$children.forEach(function(item)
{
switch (item.$options.name)
{
case'wj-flex-grid-column':
autoGenerateColumns = !1
}
});
ctl = new wjcGrid.FlexGrid(this.$el, {autoGenerateColumns: autoGenerateColumns});
this.$children.forEach(function(item)
{
var col,
filter;
switch (item.$options.name)
{
case'wj-flex-grid-column':
col = wjcVue2Base._initialize(item, new wjcGrid.Column);
ctl.columns.push(col);
break;
case'wj-flex-grid-filter':
filter = wjcVue2Base._initialize(item, new wjcGridFilter.FlexGridFilter(ctl))
}
_this.$el.removeChild(item.$el)
});
wjcVue2Base._initialize(this, ctl)
}
}));
exports_1("WjFlexGridColumn", WjFlexGridColumn = Vue.component('wj-flex-grid-column', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.grid.Column')
}))
}
}
})