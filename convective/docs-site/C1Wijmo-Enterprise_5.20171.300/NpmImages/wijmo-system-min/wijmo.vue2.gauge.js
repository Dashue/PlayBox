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
System.register(["wijmo/wijmo.vue2.base", "wijmo/wijmo.gauge", "wijmo/wijmo.vue2.gauge", "vue"], function(exports_1, context_1)
{
"use strict";
function _addRanges(component, ctl)
{
component.$children.forEach(function(item)
{
switch (item.$options.name)
{
case'wj-range':
var range=wjcVue2Base._initialize(item, new wjcGauge.Range);
item.wjProperty ? ctl[item.wjProperty] = range : ctl.ranges.push(range)
}
component.$el.removeChild(item.$el)
})
}
var __moduleName=context_1 && context_1.id,
wjcVue2Base,
wjcGauge,
wjcSelf,
vue_1,
VueModule,
Vue,
WjLinearGauge,
WjBulletGraph,
WjRadialGauge,
WjRange;
return {
setters: [function(wjcVue2Base_1)
{
wjcVue2Base = wjcVue2Base_1
}, function(wjcGauge_1)
{
wjcGauge = wjcGauge_1
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
window.wijmo.vue2.gauge = wjcSelf;
exports_1("Vue", Vue = vue_1.default || VueModule);
exports_1("WjLinearGauge", WjLinearGauge = Vue.component('wj-linear-gauge', {
template: '<div><slot/></div>', props: wjcVue2Base._getProps('wijmo.gauge.LinearGauge'), mounted: function()
{
var ctl=new wjcGauge.LinearGauge(this.$el);
_addRanges(this, ctl);
wjcVue2Base._initialize(this, ctl)
}
}));
exports_1("WjBulletGraph", WjBulletGraph = Vue.component('wj-bullet-graph', {
template: '<div><slot/></div>', props: wjcVue2Base._getProps('wijmo.gauge.BulletGraph'), mounted: function()
{
var ctl=new wjcGauge.BulletGraph(this.$el);
_addRanges(this, ctl);
wjcVue2Base._initialize(this, ctl)
}
}));
exports_1("WjRadialGauge", WjRadialGauge = Vue.component('wj-radial-gauge', {
template: '<div><slot/></div>', props: wjcVue2Base._getProps('wijmo.gauge.RadialGauge'), mounted: function()
{
var ctl=new wjcGauge.RadialGauge(this.$el);
_addRanges(this, ctl);
wjcVue2Base._initialize(this, ctl)
}
}));
exports_1("WjRange", WjRange = Vue.component('wj-range', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.gauge.Range', ['wjProperty'])
}))
}
}
})