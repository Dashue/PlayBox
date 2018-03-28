System.register(["wijmo/wijmo.react.base", "wijmo/wijmo.grid.grouppanel", "wijmo/wijmo.react.grid.grouppanel"], function (exports_1, context_1) {
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
    var wjcReactBase, wjcGridGrouppanel, wjcSelf, GroupPanel, Wj;
    return {
        setters: [
            function (wjcReactBase_1) {
                wjcReactBase = wjcReactBase_1;
            },
            function (wjcGridGrouppanel_1) {
                wjcGridGrouppanel = wjcGridGrouppanel_1;
            },
            function (wjcSelf_1) {
                wjcSelf = wjcSelf_1;
            }
        ],
        execute: function () {
            window['wijmo'] = window['wijmo'] || {};
            window['wijmo']['react'] = window['wijmo']['react'] || {};
            window['wijmo']['react']['grid'] = window['wijmo']['react']['grid'] || {};
            window['wijmo']['react']['grid']['grouppanel'] = wjcSelf;
            GroupPanel = (function (_super) {
                __extends(GroupPanel, _super);
                function GroupPanel(props) {
                    return _super.call(this, props, wjcGridGrouppanel.GroupPanel) || this;
                }
                return GroupPanel;
            }(wjcReactBase.ComponentBase));
            exports_1("GroupPanel", GroupPanel);
            Wj = wjcReactBase;
        }
    };
});
//# sourceMappingURL=wijmo.react.grid.grouppanel.js.map