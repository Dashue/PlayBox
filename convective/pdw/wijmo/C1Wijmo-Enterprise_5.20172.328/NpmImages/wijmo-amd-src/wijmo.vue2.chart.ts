

import * as wjcVue2Base from 'wijmo/wijmo.vue2.base';
import * as wjcChart from 'wijmo/wijmo.chart';


import * as wjcSelf from 'wijmo/wijmo.vue2.chart';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
window['wijmo']['vue2']['chart'] = wjcSelf;

/*
    *
    * Wijmo Library 5.20172.328
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */

import VueModuleDefault from 'vue';
import * as VueModule from 'vue';
export var Vue: any = VueModuleDefault || VueModule;


///<wijmo-soft-import from="wijmo.chart.finance"/>
///<wijmo-soft-import from="wijmo.chart.analytics"/>
///<wijmo-soft-import from="wijmo.chart.animation"/>
///<wijmo-soft-import from="wijmo.chart.annotation"/>
///<wijmo-soft-import from="wijmo.chart.finance.analytics"/>
///<wijmo-soft-import from="wijmo.chart.hierarchical"/>
///<wijmo-soft-import from="wijmo.chart.interaction"/>
///<wijmo-soft-import from="wijmo.chart.radar"/>


/**
 * Wijmo interop module for <a href="https://vuejs.org/2016/04/27/announcing-2.0/">Vue 2</a>.
 *
 * This module provides Vue 2 components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the Vue 2
 * framework (RC6 or later), as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to Vue pages, include the appropriate
 * tags in your HTML files. For example, the code below adds
 * an @see:InputNumber control to a Vue page:
 *
 * <pre>&lt;wj-input-number
 *   format="c2"
 *   placeholder="Sales"
 *   :value="sales"
 *   :value-changed="salesChanged"
 *   :min="0"
 *   :max="10000"
 *   :step="100"
 *   :is-required="false"&gt;
 * &lt;/wj-input-number&gt;</pre>
 *
 * <pre>// Wijmo event handler
 * // update "sales" value to match the InputNumber value 
 * function salesChanged(sender, eventArgs) {
 *   this.sales = sender.value;
 * }</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "wj" prefix, followed by
 *      the control name using lower-case and hyphen separators.</li>
 *   <li>
 *      The tag attribute names match the control's properties and events.</li>
 *   <li>
 *      Colons before attribute names indicate the attribute value should be
 *      interpreted as JavaScript expressions (e.g. <code>:min="0"</code>).</li>
 *   <li>
 *      Event handlers are specified the same way as regular properties
 *      (e.g. <code>:value-changed="salesChanged"</code>).</li>
 *   <li>
 *      In Vue2, all bindings are one-way. In the example above, the "salesChanged"
 *      event handler is responsible for updating the value of the "sales"
 *      property in the model. This is a change from Vue 1, where two-way bindings
 *      could be created by adding the ".sync" suffix to any attribute.</li>
 * </ol>
 *
 * All Wijmo Vue components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;wj-flex-grid :initialized="initGrid"&gt;
 * &lt;/wj-flex-grid&gt;</pre>

 * <pre>// Vue application
 * var app = new Vue({
 *   el: '#app',
 *   methods: {
 *     initGrid: function(s, e) {
 *       // assign a custom MergeManager to the grid
 *       s.mergeManager = new CustomMergeManager(s);
 *     }
 *   }
 * });</pre>
 */
 	
    /**
     * Vue component that encapsulates the @see:wijmo.chart.FlexChart control.
     *
     * The example below shows how to instantiate and initialize a
     * @see:wijmo.chart.FlexChart control using Vue markup:
     *
     * <pre>&lt;wj-flex-chart
     *     :items-source="data"
     *     binding-x="country"
     *     :header="props.header"
     *     :footer="props.footer"&gt;
     *
     *     &lt;wj-flex-chart-legend :position="props.legendPosition"&gt;
     *     &lt;/wj-flex-chart-legend&gt;
     *     &lt;wj-flex-chart-axis wj-property="axisX" :title="props.titleX"&gt;
     *     &lt;/wj-flex-chart-axis&gt;
     *     &lt;wj-flex-chart-axis wj-property="axisY" :title="props.titleY"&gt;
     *     &lt;/wj-flex-chart-axis&gt;
     *
     *     &lt;wj-flex-chart-series name="Sales" binding="sales"&gt;
     *     &lt;/wj-flex-chart-series&gt;
     *     &lt;wj-flex-chart-series name="Expenses" binding="expenses"&gt;
     *     &lt;/wj-flex-chart-series&gt;
     *     &lt;wj-flex-chart-series name="Downloads" binding="downloads"&gt;
     *     &lt;/wj-flex-chart-series&gt;
     * &lt;/wj-flex-chart&gt;</pre>
     *
     * The code sets the <b>itemsSource</b> property to a collection that contains the chart
     * data and the <b>bindingX</b> property to the data property that contains the chart X values.
     * It also sets the chart's <b>header</b> and <b>footer</b> properties to define titles to
     * show above and below the chart.
     *
     * The <b>wj-flex-chart-legend</b> and <b>wj-flex-chart-axis</b> components are used to
     * customize the chart's legend and axes.
     *
     * Finally, three <b>wj-flex-chart-series</b> components are used to specify the data
     * properties to be shown on the chart. 
     */
    export var WjFlexChart = Vue.component('wj-flex-chart', {
        template: '<div><slot/></div>',
        props: wjcVue2Base._getProps('wijmo.chart.FlexChart', [ 'tooltipContent' ]),		
        mounted: function() {// instantiate the control
            var ctl = new wjcChart.FlexChart(this.$el);

            // add series, axes, legend
            this.$children.forEach((item) => {
                switch (item.$options.name) {
                    case 'wj-flex-chart-series':
                        var series = wjcVue2Base._initialize(item, new wjcChart.Series());
                        // special case: get 'style' property from series host element
                        // note: can't simply assign the style because that won't work in Chrome
                        if (item.$el.style.cssText.length) {
                            var style = {};
                            item.$el.style.cssText.split(';').forEach((prop) => {
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
                        } else {
                            ctl.axes.push(axis);
                        }
                        break;
                }
                this.$el.removeChild(item.$el);
            });

            // add tooltip
            if (this.tooltipContent) {
                ctl.tooltip.content = this.tooltipContent;
            }
            // initialize the control
            wjcVue2Base._initialize(this, ctl);
        }
    });
 
 	
    /**
     * Vue component that represents a @see:wijmo.chart.Axis in one of the following components:
     * @see:wijmo.vue2.WjFlexChart
     * , @see:wijmo.vue2.WjFlexChartSeries
     * , @see:wijmo.vue2.WjFinancialChart
     *  or @see:wijmo.vue2.WjFinancialChartSeries. 
     */
    export var WjFlexChartAxis = Vue.component('wj-flex-chart-axis', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.chart.Axis', [ 'wjProperty' ])
    });
 
 	
    /**
     * Vue component that represents a @see:wijmo.chart.Legend in one of the following components:
     * @see:wijmo.vue2.WjFlexChart
     * , @see:wijmo.vue2.WjFlexPie
     * , @see:wijmo.vue2.WjFinancialChart
     * , @see:wijmo.vue2.WjFlexRadar
     *  or @see:wijmo.vue2.WjSunburst. 
     */
    export var WjFlexChartLegend = Vue.component('wj-flex-chart-legend', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.chart.Legend')
    });
 
 	
    /**
     * Vue component that represents a @see:wijmo.chart.Series in a @see:wijmo.vue2.WjFlexChart. 
     */
    export var WjFlexChartSeries = Vue.component('wj-flex-chart-series', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.chart.Series')
    });
 
 
