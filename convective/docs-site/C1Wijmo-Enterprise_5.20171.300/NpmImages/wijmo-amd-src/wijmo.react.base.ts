

import * as wjcCore from 'wijmo/wijmo';


import * as wjcSelf from 'wijmo/wijmo.react.base';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['react'] = window['wijmo']['react'] || {};
window['wijmo']['react']['base'] = wjcSelf;

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

import * as ReactDOM from 'react-dom';
import * as  React from 'react';





    /**
     * ComponentBase inherit from  React.Component
     */
    export class ComponentBase extends (<ObjectConstructor>React.Component) {
        controlType: any;
        props: any;
        constructor(props: any, controlType: any) {
            super(props);
            this.props = props;
            this.controlType = controlType;
        }

        render() {
            return React.createElement('div');
        }

        //mounts a new control onto a component
        componentDidMount() {
            // instantiate the control
            var host = ReactDOM.findDOMNode(this),
                control = new this.controlType(host),
                cprops = this.props;

            // initialize the control with properties and event handlers,
            // and the host element with the regular HTML properties
            var props = {};
            for (var prop in cprops) {
                if (prop in control) {

                    // save property to assign to control later
                    props[prop] = cprops[prop];

                } else {

                    // assign property to host element
                    switch (prop) {
                        case 'className':
                            wjcCore.addClass(host, cprops.className);
                            break;
                        case 'style':
                            wjcCore.setCss(host, cprops.style);
                            break;
                        default: // id, title, name, etc...
                            if (host[prop] != null) {
                                host[prop] = cprops[prop];
                            }
                            break;
                    }
                }
            }

            // apply saved props to control
            control.initialize(props);

            // fire initialize event
            if (wjcCore.isFunction(cprops.initialized)) {
                cprops.initialized(control);
            }

            // done creating the control
            return control;

        }

        // disposes of the control associated with a component
        componentWillUnmount() {
            this._getControl(this).dispose();
        }

        // updates the control properties to match its associated component
        shouldComponentUpdate(nextProps) {
            var ctl = this._getControl(this);
            this._copy(ctl, nextProps);
            return true;
        }

        private _getControl(component): any {
            var host = ReactDOM.findDOMNode(component);
            return wjcCore.Control.getControl(host);
        }

        private _copy(dst, src) {
            for (var p in src) {
                var value = src[p];
                if (p in src && p != 'itemsSource' && !this._sameValue(dst[p], value)) {

                    // special handling for class/style
                    if (p == 'className') {
                        if (dst.hostElement) {
                            wjcCore.addClass(dst.hostElement, src[p]);
                        }
                    } else if (p == 'style') {
                        if (dst.hostElement) {
                            wjcCore.setCss(dst.hostElement, src[p]);
                        }

                    // copy simple values
                    } else if (wjcCore.isPrimitive(value)) {
                        dst[p] = value;

                    // copy objects
                    } else if (wjcCore.isObject(value)) {
                        this._copy(dst[p], src[p]);

                        // copy arrays
                    } else if (wjcCore.isArray(value) && wjcCore.isArray(dst[p])) {
                        dst = dst[p];
                        src = value;
                        if (src.length == dst.length) {
                            for (var i = 0; i < src.length; i++) {
                                this._copy(dst[i], src[i]);
                            }
                        }
                    }
                }
            }
        }

        // compares two objects by value
        private _sameValue(v1, v2): boolean {
            return v1 == v2 || wjcCore.DateTime.equals(v1, v2);
        }
    }


