"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wjcVue2Base = require("wijmo/wijmo.vue2.base");
var wjcNav = require("wijmo/wijmo.nav");
var wjcSelf = require("wijmo/wijmo.vue2.nav");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
window['wijmo']['vue2']['nav'] = wjcSelf;
var vue_1 = require("vue");
var VueModule = require("vue");
exports.Vue = vue_1.default || VueModule;
exports.WjTreeView = exports.Vue.component('wj-tree-view', {
    template: '<div/>',
    props: wjcVue2Base._getProps('wijmo.nav.TreeView'),
    mounted: function () {
        wjcVue2Base._initialize(this, new wjcNav.TreeView(this.$el));
    }
});
//# sourceMappingURL=wijmo.vue2.nav.js.map