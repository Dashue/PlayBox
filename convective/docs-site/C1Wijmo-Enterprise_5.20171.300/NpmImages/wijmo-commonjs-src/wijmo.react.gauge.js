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
var wjcGauge = require("wijmo/wijmo.gauge");
var wjcSelf = require("wijmo/wijmo.react.gauge");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['react'] = window['wijmo']['react'] || {};
window['wijmo']['react']['gauge'] = wjcSelf;
var LinearGauge = (function (_super) {
    __extends(LinearGauge, _super);
    function LinearGauge(props) {
        return _super.call(this, props, wjcGauge.LinearGauge) || this;
    }
    return LinearGauge;
}(wjcReactBase.ComponentBase));
exports.LinearGauge = LinearGauge;
var BulletGraph = (function (_super) {
    __extends(BulletGraph, _super);
    function BulletGraph(props) {
        return _super.call(this, props, wjcGauge.BulletGraph) || this;
    }
    return BulletGraph;
}(wjcReactBase.ComponentBase));
exports.BulletGraph = BulletGraph;
var RadialGauge = (function (_super) {
    __extends(RadialGauge, _super);
    function RadialGauge(props) {
        return _super.call(this, props, wjcGauge.RadialGauge) || this;
    }
    return RadialGauge;
}(wjcReactBase.ComponentBase));
exports.RadialGauge = RadialGauge;
var Wj = wjcReactBase;
//# sourceMappingURL=wijmo.react.gauge.js.map