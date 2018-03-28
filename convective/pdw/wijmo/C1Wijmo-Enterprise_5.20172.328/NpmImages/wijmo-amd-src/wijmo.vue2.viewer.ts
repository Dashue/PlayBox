

import * as wjcVue2Base from 'wijmo/wijmo.vue2.base';
import * as wjcViewer from 'wijmo/wijmo.viewer';


import * as wjcSelf from 'wijmo/wijmo.vue2.viewer';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
window['wijmo']['vue2']['viewer'] = wjcSelf;

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
     * Vue component that encapsulates the @see:wijmo.viewer.ReportViewer control. 
     */
    export var WjReportViewer = Vue.component('wj-report-viewer', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.viewer.ReportViewer'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcViewer.ReportViewer(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.viewer.PdfViewer control. 
     */
    export var WjPdfViewer = Vue.component('wj-pdf-viewer', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.viewer.PdfViewer'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcViewer.PdfViewer(this.$el));
        }
    });
 
 
