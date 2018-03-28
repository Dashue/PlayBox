define(["require", "exports", "wijmo/wijmo.vue2.base", "wijmo/wijmo.olap", "wijmo/wijmo.vue2.olap", "vue", "vue"], function (require, exports, wjcVue2Base, wjcOlap, wjcSelf, vue_1, VueModule) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window['wijmo'] = window['wijmo'] || {};
    window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
    window['wijmo']['vue2']['olap'] = wjcSelf;
    exports.Vue = vue_1.default || VueModule;
    exports.WjPivotGrid = exports.Vue.component('wj-pivot-grid', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.olap.PivotGrid'),
        mounted: function () {
            wjcVue2Base._initialize(this, new wjcOlap.PivotGrid(this.$el));
        }
    });
    exports.WjPivotChart = exports.Vue.component('wj-pivot-chart', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.olap.PivotChart'),
        mounted: function () {
            wjcVue2Base._initialize(this, new wjcOlap.PivotChart(this.$el));
        }
    });
    exports.WjPivotPanel = exports.Vue.component('wj-pivot-panel', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.olap.PivotPanel'),
        mounted: function () {
            wjcVue2Base._initialize(this, new wjcOlap.PivotPanel(this.$el));
        }
    });
});
//# sourceMappingURL=wijmo.vue2.olap.js.map