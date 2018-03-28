System.register(["wijmo/wijmo.react.base", "wijmo/wijmo.gauge", "wijmo/wijmo.react.gauge"], function (exports_1, context_1) {
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
    var wjcReactBase, wjcGauge, wjcSelf, LinearGauge, BulletGraph, RadialGauge, Wj;
    return {
        setters: [
            function (wjcReactBase_1) {
                wjcReactBase = wjcReactBase_1;
            },
            function (wjcGauge_1) {
                wjcGauge = wjcGauge_1;
            },
            function (wjcSelf_1) {
                wjcSelf = wjcSelf_1;
            }
        ],
        execute: function () {
            window['wijmo'] = window['wijmo'] || {};
            window['wijmo']['react'] = window['wijmo']['react'] || {};
            window['wijmo']['react']['gauge'] = wjcSelf;
            LinearGauge = (function (_super) {
                __extends(LinearGauge, _super);
                function LinearGauge(props) {
                    return _super.call(this, props, wjcGauge.LinearGauge) || this;
                }
                return LinearGauge;
            }(wjcReactBase.ComponentBase));
            exports_1("LinearGauge", LinearGauge);
            BulletGraph = (function (_super) {
                __extends(BulletGraph, _super);
                function BulletGraph(props) {
                    return _super.call(this, props, wjcGauge.BulletGraph) || this;
                }
                return BulletGraph;
            }(wjcReactBase.ComponentBase));
            exports_1("BulletGraph", BulletGraph);
            RadialGauge = (function (_super) {
                __extends(RadialGauge, _super);
                function RadialGauge(props) {
                    return _super.call(this, props, wjcGauge.RadialGauge) || this;
                }
                return RadialGauge;
            }(wjcReactBase.ComponentBase));
            exports_1("RadialGauge", RadialGauge);
            Wj = wjcReactBase;
        }
    };
});
//# sourceMappingURL=wijmo.react.gauge.js.map