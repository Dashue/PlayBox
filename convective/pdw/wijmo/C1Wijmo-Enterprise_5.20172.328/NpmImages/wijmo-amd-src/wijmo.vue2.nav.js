define(["require", "exports", "wijmo/wijmo.vue2.base", "wijmo/wijmo.nav", "wijmo/wijmo.vue2.nav", "vue", "vue"], function (require, exports, wjcVue2Base, wjcNav, wjcSelf, vue_1, VueModule) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window['wijmo'] = window['wijmo'] || {};
    window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
    window['wijmo']['vue2']['nav'] = wjcSelf;
    exports.Vue = vue_1.default || VueModule;
    exports.WjTreeView = exports.Vue.component('wj-tree-view', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.nav.TreeView'),
        mounted: function () {
            wjcVue2Base._initialize(this, new wjcNav.TreeView(this.$el));
        }
    });
});
//# sourceMappingURL=wijmo.vue2.nav.js.map