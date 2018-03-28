System.register(["wijmo/wijmo.vue2.base", "wijmo/wijmo.viewer", "wijmo/wijmo.vue2.viewer", "vue"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var wjcVue2Base, wjcViewer, wjcSelf, vue_1, VueModule, Vue, WjReportViewer, WjPdfViewer;
    return {
        setters: [
            function (wjcVue2Base_1) {
                wjcVue2Base = wjcVue2Base_1;
            },
            function (wjcViewer_1) {
                wjcViewer = wjcViewer_1;
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
            window['wijmo']['vue2']['viewer'] = wjcSelf;
            exports_1("Vue", Vue = vue_1.default || VueModule);
            exports_1("WjReportViewer", WjReportViewer = Vue.component('wj-report-viewer', {
                template: '<div/>',
                props: wjcVue2Base._getProps('wijmo.viewer.ReportViewer'),
                mounted: function () {
                    wjcVue2Base._initialize(this, new wjcViewer.ReportViewer(this.$el));
                }
            }));
            exports_1("WjPdfViewer", WjPdfViewer = Vue.component('wj-pdf-viewer', {
                template: '<div/>',
                props: wjcVue2Base._getProps('wijmo.viewer.PdfViewer'),
                mounted: function () {
                    wjcVue2Base._initialize(this, new wjcViewer.PdfViewer(this.$el));
                }
            }));
        }
    };
});
//# sourceMappingURL=wijmo.vue2.viewer.js.map