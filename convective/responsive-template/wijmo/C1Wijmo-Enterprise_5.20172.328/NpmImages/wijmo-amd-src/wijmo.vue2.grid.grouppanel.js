define(["require", "exports", "wijmo/wijmo.vue2.base", "wijmo/wijmo.grid.grouppanel", "wijmo/wijmo.vue2.grid.grouppanel", "vue", "vue"], function (require, exports, wjcVue2Base, wjcGridGrouppanel, wjcSelf, vue_1, VueModule) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window['wijmo'] = window['wijmo'] || {};
    window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
    window['wijmo']['vue2']['grid'] = window['wijmo']['vue2']['grid'] || {};
    window['wijmo']['vue2']['grid']['grouppanel'] = wjcSelf;
    exports.Vue = vue_1.default || VueModule;
    exports.WjGroupPanel = exports.Vue.component('wj-group-panel', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.grid.grouppanel.GroupPanel'),
        mounted: function () {
            wjcVue2Base._initialize(this, new wjcGridGrouppanel.GroupPanel(this.$el));
        }
    });
});
//# sourceMappingURL=wijmo.vue2.grid.grouppanel.js.map