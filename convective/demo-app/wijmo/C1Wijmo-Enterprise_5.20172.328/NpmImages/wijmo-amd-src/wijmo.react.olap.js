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
define(["require", "exports", "wijmo/wijmo.react.base", "wijmo/wijmo.olap", "wijmo/wijmo.react.olap"], function (require, exports, wjcReactBase, wjcOlap, wjcSelf) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window['wijmo'] = window['wijmo'] || {};
    window['wijmo']['react'] = window['wijmo']['react'] || {};
    window['wijmo']['react']['olap'] = wjcSelf;
    var PivotGrid = (function (_super) {
        __extends(PivotGrid, _super);
        function PivotGrid(props) {
            return _super.call(this, props, wjcOlap.PivotGrid) || this;
        }
        return PivotGrid;
    }(wjcReactBase.ComponentBase));
    exports.PivotGrid = PivotGrid;
    var PivotChart = (function (_super) {
        __extends(PivotChart, _super);
        function PivotChart(props) {
            return _super.call(this, props, wjcOlap.PivotChart) || this;
        }
        return PivotChart;
    }(wjcReactBase.ComponentBase));
    exports.PivotChart = PivotChart;
    var PivotPanel = (function (_super) {
        __extends(PivotPanel, _super);
        function PivotPanel(props) {
            return _super.call(this, props, wjcOlap.PivotPanel) || this;
        }
        return PivotPanel;
    }(wjcReactBase.ComponentBase));
    exports.PivotPanel = PivotPanel;
    var Wj = wjcReactBase;
});
//# sourceMappingURL=wijmo.react.olap.js.map