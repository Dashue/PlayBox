define(["require", "exports", "wijmo/wijmo.vue2.base", "wijmo/wijmo.chart", "wijmo/wijmo.vue2.chart", "vue", "vue"], function (require, exports, wjcVue2Base, wjcChart, wjcSelf, vue_1, VueModule) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window['wijmo'] = window['wijmo'] || {};
    window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
    window['wijmo']['vue2']['chart'] = wjcSelf;
    exports.Vue = vue_1.default || VueModule;
    exports.WjFlexChart = exports.Vue.component('wj-flex-chart', {
        template: '<div><slot/></div>',
        props: wjcVue2Base._getProps('wijmo.chart.FlexChart', ['tooltipContent']),
        mounted: function () {
            var _this = this;
            var ctl = new wjcChart.FlexChart(this.$el);
            this.$children.forEach(function (item) {
                switch (item.$options.name) {
                    case 'wj-flex-chart-series':
                        var series = wjcVue2Base._initialize(item, new wjcChart.Series());
                        if (item.$el.style.cssText.length) {
                            var style = {};
                            item.$el.style.cssText.split(';').forEach(function (prop) {
                                var kv = prop.split(':');
                                if (kv.length == 2) {
                                    style[kv[0].trim()] = kv[1].trim();
                                }
                            });
                            series.style = style;
                        }
                        ctl.series.push(series);
                        break;
                    case 'wj-flex-chart-legend':
                        var legend = wjcVue2Base._initialize(item, new wjcChart.Legend(null));
                        ctl.legend = legend;
                        break;
                    case 'wj-flex-chart-axis':
                        var axis = wjcVue2Base._initialize(item, new wjcChart.Axis());
                        if (item.wjProperty) {
                            ctl[item.wjProperty] = axis;
                        }
                        else {
                            ctl.axes.push(axis);
                        }
                        break;
                }
                _this.$el.removeChild(item.$el);
            });
            if (this.tooltipContent) {
                ctl.tooltip.content = this.tooltipContent;
            }
            wjcVue2Base._initialize(this, ctl);
        }
    });
    exports.WjFlexChartAxis = exports.Vue.component('wj-flex-chart-axis', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.chart.Axis', ['wjProperty'])
    });
    exports.WjFlexChartLegend = exports.Vue.component('wj-flex-chart-legend', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.chart.Legend')
    });
    exports.WjFlexChartSeries = exports.Vue.component('wj-flex-chart-series', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.chart.Series')
    });
});
//# sourceMappingURL=wijmo.vue2.chart.js.map