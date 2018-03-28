

import * as wjcVue2Base from 'wijmo/wijmo.vue2.base';
import * as wjcInput from 'wijmo/wijmo.input';


import * as wjcSelf from 'wijmo/wijmo.vue2.input';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
window['wijmo']['vue2']['input'] = wjcSelf;

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
     * Vue component that encapsulates the @see:wijmo.input.ComboBox control. 
     */
    export var WjComboBox = Vue.component('wj-combo-box', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.ComboBox'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.ComboBox(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.AutoComplete control. 
     */
    export var WjAutoComplete = Vue.component('wj-auto-complete', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.AutoComplete'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.AutoComplete(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.Calendar control. 
     */
    export var WjCalendar = Vue.component('wj-calendar', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.Calendar'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.Calendar(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.ColorPicker control. 
     */
    export var WjColorPicker = Vue.component('wj-color-picker', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.ColorPicker'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.ColorPicker(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.InputMask control. 
     */
    export var WjInputMask = Vue.component('wj-input-mask', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.InputMask'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.InputMask(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.InputColor control. 
     */
    export var WjInputColor = Vue.component('wj-input-color', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.InputColor'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.InputColor(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.MultiSelect control. 
     */
    export var WjMultiSelect = Vue.component('wj-multi-select', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.MultiSelect'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.MultiSelect(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.MultiAutoComplete control. 
     */
    export var WjMultiAutoComplete = Vue.component('wj-multi-auto-complete', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.MultiAutoComplete'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.MultiAutoComplete(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.InputNumber control. 
     */
    export var WjInputNumber = Vue.component('wj-input-number', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.InputNumber'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.InputNumber(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.InputDate control. 
     */
    export var WjInputDate = Vue.component('wj-input-date', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.InputDate'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.InputDate(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.InputTime control. 
     */
    export var WjInputTime = Vue.component('wj-input-time', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.InputTime'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.InputTime(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.InputDateTime control. 
     */
    export var WjInputDateTime = Vue.component('wj-input-date-time', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.InputDateTime'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.InputDateTime(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.ListBox control. 
     */
    export var WjListBox = Vue.component('wj-list-box', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.ListBox'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.ListBox(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.Menu control. 
     */
    export var WjMenu = Vue.component('wj-menu', {
        template: '<div/>',
        props: wjcVue2Base._getProps('wijmo.input.Menu'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.Menu(this.$el));
        }
    });
 
 	
    /**
     * Vue component that encapsulates the @see:wijmo.input.Popup control. 
     */
    export var WjPopup = Vue.component('wj-popup', {
        template: '<div><slot/></div>',
        props: wjcVue2Base._getProps('wijmo.input.Popup'),		
        mounted: function() {
                wjcVue2Base._initialize(this, new wjcInput.Popup(this.$el));
        }
    });
 
 
