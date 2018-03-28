System.register(["wijmo/wijmo.react.base", "wijmo/wijmo.nav", "wijmo/wijmo.react.nav"], function (exports_1, context_1) {
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
    var wjcReactBase, wjcNav, wjcSelf, TreeView, Wj;
    return {
        setters: [
            function (wjcReactBase_1) {
                wjcReactBase = wjcReactBase_1;
            },
            function (wjcNav_1) {
                wjcNav = wjcNav_1;
            },
            function (wjcSelf_1) {
                wjcSelf = wjcSelf_1;
            }
        ],
        execute: function () {
            window['wijmo'] = window['wijmo'] || {};
            window['wijmo']['react'] = window['wijmo']['react'] || {};
            window['wijmo']['react']['nav'] = wjcSelf;
            TreeView = (function (_super) {
                __extends(TreeView, _super);
                function TreeView(props) {
                    return _super.call(this, props, wjcNav.TreeView) || this;
                }
                return TreeView;
            }(wjcReactBase.ComponentBase));
            exports_1("TreeView", TreeView);
            Wj = wjcReactBase;
        }
    };
});
//# sourceMappingURL=wijmo.react.nav.js.map