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
var wjcNav = require("wijmo/wijmo.nav");
var wjcSelf = require("wijmo/wijmo.react.nav");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['react'] = window['wijmo']['react'] || {};
window['wijmo']['react']['nav'] = wjcSelf;
var TreeView = (function (_super) {
    __extends(TreeView, _super);
    function TreeView(props) {
        return _super.call(this, props, wjcNav.TreeView) || this;
    }
    return TreeView;
}(wjcReactBase.ComponentBase));
exports.TreeView = TreeView;
var Wj = wjcReactBase;
//# sourceMappingURL=wijmo.react.nav.js.map