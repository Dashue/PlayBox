define(["require", "exports", "wijmo/wijmo.vue2.base", "wijmo/wijmo.grid", "wijmo/wijmo.grid.filter", "wijmo/wijmo.vue2.grid", "vue", "vue"], function (require, exports, wjcVue2Base, wjcGrid, wjcGridFilter, wjcSelf, vue_1, VueModule) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window['wijmo'] = window['wijmo'] || {};
    window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
    window['wijmo']['vue2']['grid'] = wjcSelf;
    exports.Vue = vue_1.default || VueModule;
    exports.WjFlexGrid = exports.Vue.component('wj-flex-grid', {
        template: '<div><slot/></div>',
        props: wjcVue2Base._getProps('wijmo.grid.FlexGrid'),
        mounted: function () {
            var _this = this;
            var autoGenerateColumns = true;
            this.$children.forEach(function (item) {
                switch (item.$options.name) {
                    case 'wj-flex-grid-column':
                        autoGenerateColumns = false;
                        break;
                }
            });
            var ctl = new wjcGrid.FlexGrid(this.$el, {
                autoGenerateColumns: autoGenerateColumns
            });
            this.$children.forEach(function (item) {
                switch (item.$options.name) {
                    case 'wj-flex-grid-column':
                        var col = wjcVue2Base._initialize(item, new wjcGrid.Column());
                        ctl.columns.push(col);
                        break;
                    case 'wj-flex-grid-filter':
                        var filter = wjcVue2Base._initialize(item, new wjcGridFilter.FlexGridFilter(ctl));
                        break;
                }
                _this.$el.removeChild(item.$el);
            });
            wjcVue2Base._initialize(this, ctl);
        }
    });
    exports.WjFlexGridColumn = exports.Vue.component('wj-flex-grid-column', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.grid.Column')
    });
});
//# sourceMappingURL=wijmo.vue2.grid.js.map