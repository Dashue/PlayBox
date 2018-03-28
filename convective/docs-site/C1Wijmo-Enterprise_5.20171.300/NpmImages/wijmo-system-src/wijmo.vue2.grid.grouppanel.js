System.register(["wijmo/wijmo.vue2.base", "wijmo/wijmo.grid.grouppanel", "wijmo/wijmo.vue2.grid.grouppanel", "vue"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var wjcVue2Base, wjcGridGrouppanel, wjcSelf, vue_1, VueModule, Vue, WjGroupPanel;
    return {
        setters: [
            function (wjcVue2Base_1) {
                wjcVue2Base = wjcVue2Base_1;
            },
            function (wjcGridGrouppanel_1) {
                wjcGridGrouppanel = wjcGridGrouppanel_1;
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
            window['wijmo']['vue2']['grid']['grouppanel'] = wjcSelf;
            exports_1("Vue", Vue = vue_1.default || VueModule);
            exports_1("WjGroupPanel", WjGroupPanel = Vue.component('wj-group-panel', {
                template: '<div/>',
                props: wjcVue2Base._getProps('wijmo.grid.grouppanel.GroupPanel'),
                mounted: function () {
                    wjcVue2Base._initialize(this, new wjcGridGrouppanel.GroupPanel(this.$el));
                }
            }));
        }
    };
});
//# sourceMappingURL=wijmo.vue2.grid.grouppanel.js.map