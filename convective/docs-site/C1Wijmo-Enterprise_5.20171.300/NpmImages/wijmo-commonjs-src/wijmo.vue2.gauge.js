"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wjcVue2Base = require("wijmo/wijmo.vue2.base");
var wjcGauge = require("wijmo/wijmo.gauge");
var wjcSelf = require("wijmo/wijmo.vue2.gauge");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
window['wijmo']['vue2']['gauge'] = wjcSelf;
var vue_1 = require("vue");
var VueModule = require("vue");
exports.Vue = vue_1.default || VueModule;
exports.WjLinearGauge = exports.Vue.component('wj-linear-gauge', {
    template: '<div><slot/></div>',
    props: wjcVue2Base._getProps('wijmo.gauge.LinearGauge'),
    mounted: function () {
        var ctl = new wjcGauge.LinearGauge(this.$el);
        _addRanges(this, ctl);
        wjcVue2Base._initialize(this, ctl);
    }
});
exports.WjBulletGraph = exports.Vue.component('wj-bullet-graph', {
    template: '<div><slot/></div>',
    props: wjcVue2Base._getProps('wijmo.gauge.BulletGraph'),
    mounted: function () {
        var ctl = new wjcGauge.BulletGraph(this.$el);
        _addRanges(this, ctl);
        wjcVue2Base._initialize(this, ctl);
    }
});
exports.WjRadialGauge = exports.Vue.component('wj-radial-gauge', {
    template: '<div><slot/></div>',
    props: wjcVue2Base._getProps('wijmo.gauge.RadialGauge'),
    mounted: function () {
        var ctl = new wjcGauge.RadialGauge(this.$el);
        _addRanges(this, ctl);
        wjcVue2Base._initialize(this, ctl);
    }
});
exports.WjRange = exports.Vue.component('wj-range', {
    template: '<div/>',
    props: wjcVue2Base._getProps('wijmo.gauge.Range', ['wjProperty'])
});
function _addRanges(component, ctl) {
    component.$children.forEach(function (item) {
        switch (item.$options.name) {
            case 'wj-range':
                var range = wjcVue2Base._initialize(item, new wjcGauge.Range());
                if (item.wjProperty) {
                    ctl[item.wjProperty] = range;
                }
                else {
                    ctl.ranges.push(range);
                }
                break;
        }
        component.$el.removeChild(item.$el);
    });
}
//# sourceMappingURL=wijmo.vue2.gauge.js.map