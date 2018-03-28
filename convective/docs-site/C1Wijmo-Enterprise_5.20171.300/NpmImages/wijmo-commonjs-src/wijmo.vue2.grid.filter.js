"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wjcVue2Base = require("wijmo/wijmo.vue2.base");
var wjcSelf = require("wijmo/wijmo.vue2.grid.filter");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
window['wijmo']['vue2']['grid'] = window['wijmo']['vue2']['grid'] || {};
window['wijmo']['vue2']['grid']['filter'] = wjcSelf;
var vue_1 = require("vue");
var VueModule = require("vue");
exports.Vue = vue_1.default || VueModule;
exports.WjFlexGridFilter = exports.Vue.component('wj-flex-grid-filter', {
    template: '<div/>',
    props: wjcVue2Base._getProps('wijmo.grid.filter.FlexGridFilter')
});
//# sourceMappingURL=wijmo.vue2.grid.filter.js.map