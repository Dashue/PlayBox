"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wjcVue2Base = require("wijmo/wijmo.vue2.base");
var wjcGridGrouppanel = require("wijmo/wijmo.grid.grouppanel");
var wjcSelf = require("wijmo/wijmo.vue2.grid.grouppanel");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
window['wijmo']['vue2']['grid'] = window['wijmo']['vue2']['grid'] || {};
window['wijmo']['vue2']['grid']['grouppanel'] = wjcSelf;
var vue_1 = require("vue");
var VueModule = require("vue");
exports.Vue = vue_1.default || VueModule;
exports.WjGroupPanel = exports.Vue.component('wj-group-panel', {
    template: '<div/>',
    props: wjcVue2Base._getProps('wijmo.grid.grouppanel.GroupPanel'),
    mounted: function () {
        wjcVue2Base._initialize(this, new wjcGridGrouppanel.GroupPanel(this.$el));
    }
});
//# sourceMappingURL=wijmo.vue2.grid.grouppanel.js.map