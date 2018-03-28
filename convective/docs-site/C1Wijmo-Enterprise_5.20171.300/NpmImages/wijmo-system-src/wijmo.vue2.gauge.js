System.register(["wijmo/wijmo.vue2.base", "wijmo/wijmo.gauge", "wijmo/wijmo.vue2.gauge", "vue"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var wjcVue2Base, wjcGauge, wjcSelf, vue_1, VueModule, Vue, WjLinearGauge, WjBulletGraph, WjRadialGauge, WjRange;
    return {
        setters: [
            function (wjcVue2Base_1) {
                wjcVue2Base = wjcVue2Base_1;
            },
            function (wjcGauge_1) {
                wjcGauge = wjcGauge_1;
            },
            function (wjcSelf_1) {
                wjcSelf = wjcSelf_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
                VueModule = vue_1_1;
            }
        ],
        execute: function () {
            window['wijmo'] = window['wijmo'] || {};
            window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
            window['wijmo']['vue2']['gauge'] = wjcSelf;
            exports_1("Vue", Vue = vue_1.default || VueModule);
            exports_1("WjLinearGauge", WjLinearGauge = Vue.component('wj-linear-gauge', {
                template: '<div><slot/></div>',
                props: wjcVue2Base._getProps('wijmo.gauge.LinearGauge'),
                mounted: function () {
                    var ctl = new wjcGauge.LinearGauge(this.$el);
                    _addRanges(this, ctl);
                    wjcVue2Base._initialize(this, ctl);
                }
            }));
            exports_1("WjBulletGraph", WjBulletGraph = Vue.component('wj-bullet-graph', {
                template: '<div><slot/></div>',
                props: wjcVue2Base._getProps('wijmo.gauge.BulletGraph'),
                mounted: function () {
                    var ctl = new wjcGauge.BulletGraph(this.$el);
                    _addRanges(this, ctl);
                    wjcVue2Base._initialize(this, ctl);
                }
            }));
            exports_1("WjRadialGauge", WjRadialGauge = Vue.component('wj-radial-gauge', {
                template: '<div><slot/></div>',
                props: wjcVue2Base._getProps('wijmo.gauge.RadialGauge'),
                mounted: function () {
                    var ctl = new wjcGauge.RadialGauge(this.$el);
                    _addRanges(this, ctl);
                    wjcVue2Base._initialize(this, ctl);
                }
            }));
            exports_1("WjRange", WjRange = Vue.component('wj-range', {
                template: '<div/>',
                props: wjcVue2Base._getProps('wijmo.gauge.Range', ['wjProperty'])
            }));
        }
    };
});
//# sourceMappingURL=wijmo.vue2.gauge.js.map