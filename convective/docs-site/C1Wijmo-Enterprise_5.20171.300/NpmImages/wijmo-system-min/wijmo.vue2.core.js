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
System.register(["wijmo/wijmo", "wijmo/wijmo.vue2.core", "vue"], function(exports_1, context_1)
{
"use strict";
var __moduleName=context_1 && context_1.id,
wjcCore,
wjcSelf,
vue_1,
VueModule,
Vue,
WjInclude,
WjFormat;
return {
setters: [function(wjcCore_1)
{
wjcCore = wjcCore_1
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
window.wijmo.vue2.core = wjcSelf;
exports_1("Vue", Vue = vue_1.default || VueModule);
exports_1("WjInclude", WjInclude = Vue.component('wj-include', {
template: '<div/>', props: ['src'], mounted: function()
{
var _this=this;
wjcCore.httpRequest(this.src, {success: function(xhr)
{
_this.$el.innerHTML = xhr.response
}})
}
}));
exports_1("WjFormat", WjFormat = Vue.filter('wj-format', function(value, format)
{
return wjcCore.Globalize.format(value, format)
}))
}
}
})