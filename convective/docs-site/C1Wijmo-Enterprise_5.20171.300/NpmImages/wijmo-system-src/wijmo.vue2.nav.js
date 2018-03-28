System.register(["wijmo/wijmo.vue2.base", "wijmo/wijmo.nav", "wijmo/wijmo.vue2.nav", "vue"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var wjcVue2Base, wjcNav, wjcSelf, vue_1, VueModule, Vue, WjTreeView;
    return {
        setters: [
            function (wjcVue2Base_1) {
                wjcVue2Base = wjcVue2Base_1;
            },
            function (wjcNav_1) {
                wjcNav = wjcNav_1;
            },
            function (wjcSelf_1) {
                wjcSelf = wjcSelf_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
                VueModule = vue_1_1;
            }
        ],
        execute: function () {
            window['wijmo'] = window['wijmo'] || {};
            window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
            window['wijmo']['vue2']['nav'] = wjcSelf;
            exports_1("Vue", Vue = vue_1.default || VueModule);
            exports_1("WjTreeView", WjTreeView = Vue.component('wj-tree-view', {
                template: '<div/>',
                props: wjcVue2Base._getProps('wijmo.nav.TreeView'),
                mounted: function () {
                    wjcVue2Base._initialize(this, new wjcNav.TreeView(this.$el));
                }
            }));
        }
    };
});
//# sourceMappingURL=wijmo.vue2.nav.js.map