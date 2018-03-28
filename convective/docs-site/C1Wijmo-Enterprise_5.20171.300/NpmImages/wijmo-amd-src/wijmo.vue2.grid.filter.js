define(["require", "exports", "wijmo/wijmo.vue2.base", "wijmo/wijmo.vue2.grid.filter", "vue", "vue"], function (require, exports, wjcVue2Base, wjcSelf, vue_1, VueModule) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window['wijmo'] = window['wijmo'] || {};
    window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
    window['wijmo']['vue2']['grid'] = window['wijmo']['vue2']['grid'] || {};
    window['wijmo']['vue2']['grid']['filter'] = wjcSelf;
    exports.Vue = vue_1.default || VueModule;
    exports.WjFlexGridFilter = exports.Vue.component('wj-flex-grid-filter', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.grid.filter.FlexGridFilter')
    });
});
//# sourceMappingURL=wijmo.vue2.grid.filter.js.map