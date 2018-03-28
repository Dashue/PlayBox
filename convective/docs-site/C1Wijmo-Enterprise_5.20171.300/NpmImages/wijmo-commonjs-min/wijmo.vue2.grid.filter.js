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
var wjcVue2Base,
wjcSelf,
vue_1,
VueModule;
Object.defineProperty(exports, "__esModule", {value: !0});
wjcVue2Base = require("wijmo/wijmo.vue2.base");
wjcSelf = require("wijmo/wijmo.vue2.grid.filter");
window.wijmo = window.wijmo || {};
window.wijmo.vue2 = window.wijmo.vue2 || {};
window.wijmo.vue2.grid = window.wijmo.vue2.grid || {};
window.wijmo.vue2.grid.filter = wjcSelf;
vue_1 = require("vue");
VueModule = require("vue");
exports.Vue = vue_1.default || VueModule;
exports.WjFlexGridFilter = exports.Vue.component('wj-flex-grid-filter', {
template: '<div/>', props: wjcVue2Base._getProps('wijmo.grid.filter.FlexGridFilter')
})