System.register(["wijmo/wijmo.vue2.base", "wijmo/wijmo.vue2.grid.filter", "vue"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var wjcVue2Base, wjcSelf, vue_1, VueModule, Vue, WjFlexGridFilter;
    return {
        setters: [
            function (wjcVue2Base_1) {
                wjcVue2Base = wjcVue2Base_1;
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
            window['wijmo']['vue2']['grid'] = window['wijmo']['vue2']['grid'] || {};
            window['wijmo']['vue2']['grid']['filter'] = wjcSelf;
            exports_1("Vue", Vue = vue_1.default || VueModule);
            exports_1("WjFlexGridFilter", WjFlexGridFilter = Vue.component('wj-flex-grid-filter', {
                template: '<div/>',
                props: wjcVue2Base._getProps('wijmo.grid.filter.FlexGridFilter')
            }));
        }
    };
});
//# sourceMappingURL=wijmo.vue2.grid.filter.js.map