System.register(["wijmo/wijmo.vue2.base", "wijmo/wijmo.chart", "wijmo/wijmo.vue2.chart", "vue"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var wjcVue2Base, wjcChart, wjcSelf, vue_1, VueModule, Vue, WjFlexChart, WjFlexChartAxis, WjFlexChartLegend, WjFlexChartSeries;
    return {
        setters: [
            function (wjcVue2Base_1) {
                wjcVue2Base = wjcVue2Base_1;
            },
            function (wjcChart_1) {
                wjcChart = wjcChart_1;
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
            window['wijmo']['vue2']['chart'] = wjcSelf;
            exports_1("Vue", Vue = vue_1.default || VueModule);
            exports_1("WjFlexChart", WjFlexChart = Vue.component('wj-flex-chart', {
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
            }));
            exports_1("WjFlexChartAxis", WjFlexChartAxis = Vue.component('wj-flex-chart-axis', {
                template: '<div/>',
                props: wjcVue2Base._getProps('wijmo.chart.Axis', ['wjProperty'])
            }));
            exports_1("WjFlexChartLegend", WjFlexChartLegend = Vue.component('wj-flex-chart-legend', {
                template: '<div/>',
                props: wjcVue2Base._getProps('wijmo.chart.Legend')
            }));
            exports_1("WjFlexChartSeries", WjFlexChartSeries = Vue.component('wj-flex-chart-series', {
                template: '<div/>',
                props: wjcVue2Base._getProps('wijmo.chart.Series')
            }));
        }
    };
});
//# sourceMappingURL=wijmo.vue2.chart.js.map