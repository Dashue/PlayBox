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
define(["require", "exports", "wijmo/wijmo.react.base", "wijmo/wijmo.chart", "wijmo/wijmo.react.chart"], function (require, exports, wjcReactBase, wjcChart, wjcSelf) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window['wijmo'] = window['wijmo'] || {};
    window['wijmo']['react'] = window['wijmo']['react'] || {};
    window['wijmo']['react']['chart'] = wjcSelf;
    var FlexChart = (function (_super) {
        __extends(FlexChart, _super);
        function FlexChart(props) {
            return _super.call(this, props, wjcChart.FlexChart) || this;
        }
        return FlexChart;
    }(wjcReactBase.ComponentBase));
    exports.FlexChart = FlexChart;
    var Wj = wjcReactBase;
});
//# sourceMappingURL=wijmo.react.chart.js.map