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
System.register(["wijmo/wijmo.vue2.base", "wijmo/wijmo.olap", "wijmo/wijmo.vue2.olap", "vue"], function(exports_1, context_1)
{
"use strict";
var __moduleName=context_1 && context_1.id,
wjcVue2Base,
wjcOlap,
wjcSelf,
vue_1,
VueModule,
Vue,
WjPivotGrid,
WjPivotChart,
WjPivotPanel;
return {
setters: [function(wjcVue2Base_1)
{
wjcVue2Base = wjcVue2Base_1
}, function(wjcOlap_1)
{
wjcOlap = wjcOlap_1
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
window.wijmo.vue2.olap = wjcSelf;
exports_1("Vue", Vue = vue_1.default || VueModule);
exports_1("WjPivotGrid", WjPivotGrid = Vue.component('wj-pivot-grid', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.olap.PivotGrid'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcOlap.PivotGrid(this.$el))
}
}));
exports_1("WjPivotChart", WjPivotChart = Vue.component('wj-pivot-chart', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.olap.PivotChart'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcOlap.PivotChart(this.$el))
}
}));
exports_1("WjPivotPanel", WjPivotPanel = Vue.component('wj-pivot-panel', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.olap.PivotPanel'), mounted: function()
{
wjcVue2Base._initialize(this, new wjcOlap.PivotPanel(this.$el))
}
}))
}
}
})