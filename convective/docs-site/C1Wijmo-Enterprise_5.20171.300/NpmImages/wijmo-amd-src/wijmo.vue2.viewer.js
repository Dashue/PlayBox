define(["require", "exports", "wijmo/wijmo.vue2.base", "wijmo/wijmo.viewer", "wijmo/wijmo.vue2.viewer", "vue", "vue"], function (require, exports, wjcVue2Base, wjcViewer, wjcSelf, vue_1, VueModule) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window['wijmo'] = window['wijmo'] || {};
    window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
    window['wijmo']['vue2']['viewer'] = wjcSelf;
    exports.Vue = vue_1.default || VueModule;
    exports.WjReportViewer = exports.Vue.component('wj-report-viewer', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.viewer.ReportViewer'),
        mounted: function () {
            wjcVue2Base._initialize(this, new wjcViewer.ReportViewer(this.$el));
        }
    });
    exports.WjPdfViewer = exports.Vue.component('wj-pdf-viewer', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.viewer.PdfViewer'),
        mounted: function () {
            wjcVue2Base._initialize(this, new wjcViewer.PdfViewer(this.$el));
        }
    });
});
//# sourceMappingURL=wijmo.vue2.viewer.js.map