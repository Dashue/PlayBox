System.register(["wijmo/wijmo.react.base", "wijmo/wijmo.chart", "wijmo/wijmo.react.chart"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var wjcReactBase, wjcChart, wjcSelf, FlexChart, Wj;
    return {
        setters: [
            function (wjcReactBase_1) {
                wjcReactBase = wjcReactBase_1;
            },
            function (wjcChart_1) {
                wjcChart = wjcChart_1;
            },
            function (wjcSelf_1) {
                wjcSelf = wjcSelf_1;
            }
        ],
        execute: function () {
            window['wijmo'] = window['wijmo'] || {};
            window['wijmo']['react'] = window['wijmo']['react'] || {};
            window['wijmo']['react']['chart'] = wjcSelf;
            FlexChart = (function (_super) {
                __extends(FlexChart, _super);
                function FlexChart(props) {
                    return _super.call(this, props, wjcChart.FlexChart) || this;
                }
                return FlexChart;
            }(wjcReactBase.ComponentBase));
            exports_1("FlexChart", FlexChart);
            Wj = wjcReactBase;
        }
    };
});
//# sourceMappingURL=wijmo.react.chart.js.map