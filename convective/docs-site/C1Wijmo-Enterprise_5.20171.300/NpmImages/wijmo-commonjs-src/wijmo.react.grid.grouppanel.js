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
Object.defineProperty(exports, "__esModule", { value: true });
var wjcReactBase = require("wijmo/wijmo.react.base");
var wjcGridGrouppanel = require("wijmo/wijmo.grid.grouppanel");
var wjcSelf = require("wijmo/wijmo.react.grid.grouppanel");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['react'] = window['wijmo']['react'] || {};
window['wijmo']['react']['grid'] = window['wijmo']['react']['grid'] || {};
window['wijmo']['react']['grid']['grouppanel'] = wjcSelf;
var GroupPanel = (function (_super) {
    __extends(GroupPanel, _super);
    function GroupPanel(props) {
        return _super.call(this, props, wjcGridGrouppanel.GroupPanel) || this;
    }
    return GroupPanel;
}(wjcReactBase.ComponentBase));
exports.GroupPanel = GroupPanel;
var Wj = wjcReactBase;
//# sourceMappingURL=wijmo.react.grid.grouppanel.js.map