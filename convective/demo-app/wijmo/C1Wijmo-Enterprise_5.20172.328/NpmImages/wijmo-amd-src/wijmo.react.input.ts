

import * as wjcReactBase from 'wijmo/wijmo.react.base';
import * as wjcInput from 'wijmo/wijmo.input';


import * as wjcSelf from 'wijmo/wijmo.react.input';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['react'] = window['wijmo']['react'] || {};
window['wijmo']['react']['input'] = wjcSelf;

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
     * React component that encapsulates the @see:wijmo.input.ComboBox control. 
     */
    export class ComboBox extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.ComboBox);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.AutoComplete control. 
     */
    export class AutoComplete extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.AutoComplete);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.Calendar control. 
     */
    export class Calendar extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.Calendar);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.ColorPicker control. 
     */
    export class ColorPicker extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.ColorPicker);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.InputMask control. 
     */
    export class InputMask extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.InputMask);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.InputColor control. 
     */
    export class InputColor extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.InputColor);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.MultiSelect control. 
     */
    export class MultiSelect extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.MultiSelect);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.MultiAutoComplete control. 
     */
    export class MultiAutoComplete extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.MultiAutoComplete);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.InputNumber control. 
     */
    export class InputNumber extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.InputNumber);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.InputDate control. 
     */
    export class InputDate extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.InputDate);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.InputTime control. 
     */
    export class InputTime extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.InputTime);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.InputDateTime control. 
     */
    export class InputDateTime extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.InputDateTime);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.ListBox control. 
     */
    export class ListBox extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.ListBox);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.Menu control. 
     */
    export class Menu extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.Menu);
        } 
    }

    /**
     * React component that encapsulates the @see:wijmo.input.Popup control. 
     */
    export class Popup extends wjcReactBase.ComponentBase {
        constructor(props) {
            super(props, wjcInput.Popup);
        }
        render() {
            return React.createElement('div', null, this.props.children); 
        } 
    }

// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wjcReactBase;
