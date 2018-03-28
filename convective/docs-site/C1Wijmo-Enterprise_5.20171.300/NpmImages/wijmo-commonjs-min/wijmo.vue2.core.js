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
var wjcCore,
wjcSelf,
vue_1,
VueModule;
Object.defineProperty(exports, "__esModule", {value: !0});
wjcCore = require("wijmo/wijmo");
wjcSelf = require("wijmo/wijmo.vue2.core");
window.wijmo = window.wijmo || {};
window.wijmo.vue2 = window.wijmo.vue2 || {};
window.wijmo.vue2.core = wjcSelf;
vue_1 = require("vue");
VueModule = require("vue");
exports.Vue = vue_1.default || VueModule;
exports.WjInclude = exports.Vue.component('wj-include', {
template: '<div/>', props: ['src'], mounted: function()
{
var _this=this;
wjcCore.httpRequest(this.src, {success: function(xhr)
{
_this.$el.innerHTML = xhr.response
}})
}
});
exports.WjFormat = exports.Vue.filter('wj-format', function(value, format)
{
return wjcCore.Globalize.format(value, format)
})