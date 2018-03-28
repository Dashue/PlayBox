

import * as wjcCore from 'wijmo/wijmo';


import * as wjcSelf from 'wijmo/wijmo.vue2.base';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
window['wijmo']['vue2']['base'] = wjcSelf;

/*
    *
    * Wijmo Library 5.20171.300
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */



    // get an array with a control's properties and events
     export function _getProps(ctlClass: string, extraProps?: string[]) {

        // resolve control class (in case the module hasn't been loaded)
        var cls: any = window,
            ns = ctlClass.split('.');
        for (var i = 0; i < ns.length && cls != null; i++) {
            cls = cls[ns[i]];
        }
        if (!cls) return null;

        // start with 'special' members
        var p = ['control', 'initialized'];

        // add properties and events on this class and all ancestors
        for (var proto = cls.prototype; proto != Object.prototype; proto = Object.getPrototypeOf(proto)) {
            var props = Object.getOwnPropertyNames(proto);
            for (var i = 0; i < props.length; i++) {
                var prop = props[i],
                    pd = Object.getOwnPropertyDescriptor(proto, prop),
                    eventRaiser = prop.match(/^on[A-Z]/);
                if (pd.set || eventRaiser) {
                    if (eventRaiser) {
                        prop = prop[2].toLowerCase() + prop.substr(3);
                    }
                    if (p.indexOf(prop) < 0 && !prop.match(/disabled|required/)) {
                        p.push(prop);
                    }
                }
            }
        }

        // add extra properties
        if (extraProps) {
            Array.prototype.push.apply(p, extraProps);
        }

        // done
        return p;
    }

    // initialize control properties from component, add watchers to keep the control in sync
     export function _initialize(component: any, ctl: any): any {

        // build list of sorted property names
        // do this so itemsSource is set before selectedItem, text, value, etc.
        // it would be better if Vue allowed us to use the argument order, 
        // but it doesn't seem to allow that...
        var props: string[] = [];
        for (var prop in component.$options.propsData) {
            props.push(prop);
        }
        props.sort();

        // initialize properties (before setting up event handlers)
        props.forEach((prop) => {
            if (prop in ctl && !(ctl[prop] instanceof wjcCore.Event) && !wjcCore.isUndefined(component[prop])) {
                ctl[prop] = component[prop];
                component.$watch(prop, _updateControl.bind({ ctl: ctl, prop: prop }));
            }
        });
        function _updateControl(newValue) {
            this.ctl[this.prop] = newValue;
        }

        // hook up event handlers
        props.forEach((prop) => {
            if (ctl[prop] instanceof wjcCore.Event) {
                var event = ctl[prop];
                if (wjcCore.isFunction(component[prop])) {
                    event.addHandler(component[prop], ctl);
                }
            }
        });

        // set 'control' pseudo-property so it's accessible to parent component
        if (component.control && component.$parent) {
            component.$parent[component.control] = ctl;
        }

        // invoke 'initialized' event
        if (wjcCore.isFunction(component.initialized)) {
            component.initialized(ctl);
        }

        // done, return a reference to the control
        return ctl;
    }


