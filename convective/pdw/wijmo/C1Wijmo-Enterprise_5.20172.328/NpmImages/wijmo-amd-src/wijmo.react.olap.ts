

import * as wjcReactBase from 'wijmo/wijmo.react.base';
import * as wjcOlap from 'wijmo/wijmo.olap';


import * as wjcSelf from 'wijmo/wijmo.react.olap';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['react'] = window['wijmo']['react'] || {};
window['wijmo']['react']['olap'] = wjcSelf;

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

import * as React from 'react';



/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and 
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to 
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
	
    /**
     * React component that encapsulates the @see:wijmo.olap.PivotGrid control. 
     */
    export class PivotGrid extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcOlap.PivotGrid);
        }
    }


    /**
     * React component that encapsulates the @see:wijmo.olap.PivotChart control. 
     */
    export class PivotChart extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcOlap.PivotChart);
        }
    }


    /**
     * React component that encapsulates the @see:wijmo.olap.PivotPanel control. 
     */
    export class PivotPanel extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcOlap.PivotPanel);
        }
    }


// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wjcReactBase;
