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
define(["require", "exports", "wijmo/wijmo.react.base", "wijmo/wijmo.grid", "wijmo/wijmo.react.grid"], function (require, exports, wjcReactBase, wjcGrid, wjcSelf) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window['wijmo'] = window['wijmo'] || {};
    window['wijmo']['react'] = window['wijmo']['react'] || {};
    window['wijmo']['react']['grid'] = wjcSelf;
    var FlexGrid = (function (_super) {
        __extends(FlexGrid, _super);
        function FlexGrid(props) {
            return _super.call(this, props, wjcGrid.FlexGrid) || this;
        }
        return FlexGrid;
    }(wjcReactBase.ComponentBase));
    exports.FlexGrid = FlexGrid;
    var Wj = wjcReactBase;
});
//# sourceMappingURL=wijmo.react.grid.js.map