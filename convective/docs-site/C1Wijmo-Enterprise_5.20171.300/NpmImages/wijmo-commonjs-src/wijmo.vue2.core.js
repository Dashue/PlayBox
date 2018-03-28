"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var wjcSelf = require("wijmo/wijmo.vue2.core");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
window['wijmo']['vue2']['core'] = wjcSelf;
var vue_1 = require("vue");
var VueModule = require("vue");
exports.Vue = vue_1.default || VueModule;
exports.WjInclude = exports.Vue.component('wj-include', {
    template: '<div/>',
    props: ['src'],
    mounted: function () {
        var _this = this;
        wjcCore.httpRequest(this.src, {
            success: function (xhr) {
                _this.$el.innerHTML = xhr.response;
            }
        });
    }
});
exports.WjFormat = exports.Vue.filter('wj-format', function (value, format) {
    return wjcCore.Globalize.format(value, format);
});
//# sourceMappingURL=wijmo.vue2.core.js.map