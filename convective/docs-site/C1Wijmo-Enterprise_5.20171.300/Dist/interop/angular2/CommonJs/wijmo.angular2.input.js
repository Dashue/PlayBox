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
/**
* Contains Angular 2 components for the <b>wijmo.input</b> module.
*
* <b>wijmo.angular2.input</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjInput from 'wijmo/wijmo.angular2.input';
* &nbsp;
* &#64;Component({
*     directives: [wjInput.WjInputNumber],
*     template: '&lt;wj-input-number [(value)]="amount"&gt;&lt;/wj-input-number&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     amount = 0;
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.input'/>
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjComboBoxMeta = {
    selector: 'wj-combo-box',
    template: "<div><ng-content></ng-content></div>",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'isDroppedDown',
        'showDropDownButton',
        'autoExpandSelection',
        'placeholder',
        'dropDownCssClass',
        'isAnimated',
        'isReadOnly',
        'isRequired',
        'displayMemberPath',
        'selectedValuePath',
        'headerPath',
        'isContentHtml',
        'isEditable',
        'maxDropDownHeight',
        'maxDropDownWidth',
        'itemFormatter',
        'itemsSource',
        'text',
        'selectedIndex',
        'selectedItem',
        'selectedValue',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'isDroppedDownChangingNg: isDroppedDownChanging',
        'isDroppedDownChangedNg: isDroppedDownChanged',
        'isDroppedDownChangePC: isDroppedDownChange',
        'textChangedNg: textChanged',
        'textChangePC: textChange',
        'formatItemNg: formatItem',
        'selectedIndexChangedNg: selectedIndexChanged',
        'selectedIndexChangePC: selectedIndexChange',
        'selectedItemChangePC: selectedItemChange',
        'selectedValueChangePC: selectedValueChange',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.ComboBox control.
 *
 * Use the <b>wj-combo-box</b> component to add <b>ComboBox</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjComboBox</b> component is derived from the <b>ComboBox</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-combo-box</b> component may contain a @see:wijmo/wijmo.angular2.input.WjItemTemplate child directive.
*/
var WjComboBox = WjComboBox_1 = (function (_super) {
    __extends(WjComboBox, _super);
    function WjComboBox(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'selectedValue'.
         */
        _this.wjModelProperty = 'selectedValue';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
         */
        _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
         */
        _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
        _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
         */
        _this.textChangedNg = new core_1.EventEmitter(false);
        _this.textChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
         */
        _this.formatItemNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
         */
        _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
        _this.selectedIndexChangePC = new core_1.EventEmitter(false);
        _this.selectedItemChangePC = new core_1.EventEmitter(false);
        _this.selectedValueChangePC = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjComboBox.prototype.created = function () {
    };
    WjComboBox.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjComboBox.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjComboBox.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjComboBox;
}(wijmo.input.ComboBox));
WjComboBox.meta = {
    outputs: exports.wjComboBoxMeta.outputs,
    changeEvents: {
        'isDroppedDownChanged': ['isDroppedDown'],
        'textChanged': ['text'],
        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue']
    },
};
WjComboBox = WjComboBox_1 = __decorate([
    core_1.Component({
        selector: exports.wjComboBoxMeta.selector,
        template: exports.wjComboBoxMeta.template,
        inputs: exports.wjComboBoxMeta.inputs,
        outputs: exports.wjComboBoxMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjComboBox_1; }) }
        ].concat(exports.wjComboBoxMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjComboBox);
exports.WjComboBox = WjComboBox;
exports.wjAutoCompleteMeta = {
    selector: 'wj-auto-complete',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'isDroppedDown',
        'showDropDownButton',
        'autoExpandSelection',
        'placeholder',
        'dropDownCssClass',
        'isAnimated',
        'isReadOnly',
        'isRequired',
        'displayMemberPath',
        'selectedValuePath',
        'headerPath',
        'isContentHtml',
        'isEditable',
        'maxDropDownHeight',
        'maxDropDownWidth',
        'itemFormatter',
        'delay',
        'maxItems',
        'minLength',
        'cssMatch',
        'itemsSourceFunction',
        'searchMemberPath',
        'itemsSource',
        'text',
        'selectedIndex',
        'selectedItem',
        'selectedValue',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'isDroppedDownChangingNg: isDroppedDownChanging',
        'isDroppedDownChangedNg: isDroppedDownChanged',
        'isDroppedDownChangePC: isDroppedDownChange',
        'textChangedNg: textChanged',
        'textChangePC: textChange',
        'formatItemNg: formatItem',
        'selectedIndexChangedNg: selectedIndexChanged',
        'selectedIndexChangePC: selectedIndexChange',
        'selectedItemChangePC: selectedItemChange',
        'selectedValueChangePC: selectedValueChange',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.AutoComplete control.
 *
 * Use the <b>wj-auto-complete</b> component to add <b>AutoComplete</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjAutoComplete</b> component is derived from the <b>AutoComplete</b> control and
 * inherits all its properties, events and methods.
*/
var WjAutoComplete = WjAutoComplete_1 = (function (_super) {
    __extends(WjAutoComplete, _super);
    function WjAutoComplete(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'selectedValue'.
         */
        _this.wjModelProperty = 'selectedValue';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
         */
        _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
         */
        _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
        _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
         */
        _this.textChangedNg = new core_1.EventEmitter(false);
        _this.textChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
         */
        _this.formatItemNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
         */
        _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
        _this.selectedIndexChangePC = new core_1.EventEmitter(false);
        _this.selectedItemChangePC = new core_1.EventEmitter(false);
        _this.selectedValueChangePC = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjAutoComplete.prototype.created = function () {
    };
    WjAutoComplete.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjAutoComplete.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjAutoComplete.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjAutoComplete;
}(wijmo.input.AutoComplete));
WjAutoComplete.meta = {
    outputs: exports.wjAutoCompleteMeta.outputs,
    changeEvents: {
        'isDroppedDownChanged': ['isDroppedDown'],
        'textChanged': ['text'],
        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue']
    },
};
WjAutoComplete = WjAutoComplete_1 = __decorate([
    core_1.Component({
        selector: exports.wjAutoCompleteMeta.selector,
        template: exports.wjAutoCompleteMeta.template,
        inputs: exports.wjAutoCompleteMeta.inputs,
        outputs: exports.wjAutoCompleteMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjAutoComplete_1; }) }
        ].concat(exports.wjAutoCompleteMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjAutoComplete);
exports.WjAutoComplete = WjAutoComplete;
exports.wjCalendarMeta = {
    selector: 'wj-calendar',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'monthView',
        'showHeader',
        'itemFormatter',
        'itemValidator',
        'firstDayOfWeek',
        'max',
        'min',
        'selectionMode',
        'isReadOnly',
        'value',
        'displayMonth',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'valueChangedNg: valueChanged',
        'valueChangePC: valueChange',
        'displayMonthChangedNg: displayMonthChanged',
        'displayMonthChangePC: displayMonthChange',
        'formatItemNg: formatItem',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.Calendar control.
 *
 * Use the <b>wj-calendar</b> component to add <b>Calendar</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjCalendar</b> component is derived from the <b>Calendar</b> control and
 * inherits all its properties, events and methods.
*/
var WjCalendar = WjCalendar_1 = (function (_super) {
    __extends(WjCalendar, _super);
    function WjCalendar(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'value'.
         */
        _this.wjModelProperty = 'value';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
         */
        _this.valueChangedNg = new core_1.EventEmitter(false);
        _this.valueChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>displayMonthChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>displayMonthChanged</b> Wijmo event name.
         */
        _this.displayMonthChangedNg = new core_1.EventEmitter(false);
        _this.displayMonthChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
         */
        _this.formatItemNg = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjCalendar.prototype.created = function () {
    };
    WjCalendar.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjCalendar.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjCalendar.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjCalendar;
}(wijmo.input.Calendar));
WjCalendar.meta = {
    outputs: exports.wjCalendarMeta.outputs,
    changeEvents: {
        'valueChanged': ['value'],
        'displayMonthChanged': ['displayMonth']
    },
};
WjCalendar = WjCalendar_1 = __decorate([
    core_1.Component({
        selector: exports.wjCalendarMeta.selector,
        template: exports.wjCalendarMeta.template,
        inputs: exports.wjCalendarMeta.inputs,
        outputs: exports.wjCalendarMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjCalendar_1; }) }
        ].concat(exports.wjCalendarMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjCalendar);
exports.WjCalendar = WjCalendar;
exports.wjColorPickerMeta = {
    selector: 'wj-color-picker',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'showAlphaChannel',
        'showColorString',
        'palette',
        'value',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'valueChangedNg: valueChanged',
        'valueChangePC: valueChange',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.ColorPicker control.
 *
 * Use the <b>wj-color-picker</b> component to add <b>ColorPicker</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjColorPicker</b> component is derived from the <b>ColorPicker</b> control and
 * inherits all its properties, events and methods.
*/
var WjColorPicker = WjColorPicker_1 = (function (_super) {
    __extends(WjColorPicker, _super);
    function WjColorPicker(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'value'.
         */
        _this.wjModelProperty = 'value';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
         */
        _this.valueChangedNg = new core_1.EventEmitter(false);
        _this.valueChangePC = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjColorPicker.prototype.created = function () {
    };
    WjColorPicker.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjColorPicker.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjColorPicker.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjColorPicker;
}(wijmo.input.ColorPicker));
WjColorPicker.meta = {
    outputs: exports.wjColorPickerMeta.outputs,
    changeEvents: {
        'valueChanged': ['value']
    },
};
WjColorPicker = WjColorPicker_1 = __decorate([
    core_1.Component({
        selector: exports.wjColorPickerMeta.selector,
        template: exports.wjColorPickerMeta.template,
        inputs: exports.wjColorPickerMeta.inputs,
        outputs: exports.wjColorPickerMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjColorPicker_1; }) }
        ].concat(exports.wjColorPickerMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjColorPicker);
exports.WjColorPicker = WjColorPicker;
exports.wjInputMaskMeta = {
    selector: 'wj-input-mask',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'mask',
        'isRequired',
        'promptChar',
        'placeholder',
        'rawValue',
        'value',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'valueChangedNg: valueChanged',
        'rawValueChangePC: rawValueChange',
        'valueChangePC: valueChange',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.InputMask control.
 *
 * Use the <b>wj-input-mask</b> component to add <b>InputMask</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjInputMask</b> component is derived from the <b>InputMask</b> control and
 * inherits all its properties, events and methods.
*/
var WjInputMask = WjInputMask_1 = (function (_super) {
    __extends(WjInputMask, _super);
    function WjInputMask(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'value'.
         */
        _this.wjModelProperty = 'value';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
         */
        _this.valueChangedNg = new core_1.EventEmitter(false);
        _this.rawValueChangePC = new core_1.EventEmitter(false);
        _this.valueChangePC = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjInputMask.prototype.created = function () {
    };
    WjInputMask.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjInputMask.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjInputMask.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjInputMask;
}(wijmo.input.InputMask));
WjInputMask.meta = {
    outputs: exports.wjInputMaskMeta.outputs,
    changeEvents: {
        'valueChanged': ['rawValue', 'value']
    },
};
WjInputMask = WjInputMask_1 = __decorate([
    core_1.Component({
        selector: exports.wjInputMaskMeta.selector,
        template: exports.wjInputMaskMeta.template,
        inputs: exports.wjInputMaskMeta.inputs,
        outputs: exports.wjInputMaskMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputMask_1; }) }
        ].concat(exports.wjInputMaskMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjInputMask);
exports.WjInputMask = WjInputMask;
exports.wjInputColorMeta = {
    selector: 'wj-input-color',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'isDroppedDown',
        'showDropDownButton',
        'autoExpandSelection',
        'placeholder',
        'dropDownCssClass',
        'isAnimated',
        'isReadOnly',
        'isRequired',
        'showAlphaChannel',
        'value',
        'text',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'isDroppedDownChangingNg: isDroppedDownChanging',
        'isDroppedDownChangedNg: isDroppedDownChanged',
        'isDroppedDownChangePC: isDroppedDownChange',
        'textChangedNg: textChanged',
        'textChangePC: textChange',
        'valueChangedNg: valueChanged',
        'valueChangePC: valueChange',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.InputColor control.
 *
 * Use the <b>wj-input-color</b> component to add <b>InputColor</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjInputColor</b> component is derived from the <b>InputColor</b> control and
 * inherits all its properties, events and methods.
*/
var WjInputColor = WjInputColor_1 = (function (_super) {
    __extends(WjInputColor, _super);
    function WjInputColor(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'value'.
         */
        _this.wjModelProperty = 'value';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
         */
        _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
         */
        _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
        _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
         */
        _this.textChangedNg = new core_1.EventEmitter(false);
        _this.textChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
         */
        _this.valueChangedNg = new core_1.EventEmitter(false);
        _this.valueChangePC = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjInputColor.prototype.created = function () {
    };
    WjInputColor.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjInputColor.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjInputColor.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjInputColor;
}(wijmo.input.InputColor));
WjInputColor.meta = {
    outputs: exports.wjInputColorMeta.outputs,
    changeEvents: {
        'isDroppedDownChanged': ['isDroppedDown'],
        'textChanged': ['text'],
        'valueChanged': ['value']
    },
};
WjInputColor = WjInputColor_1 = __decorate([
    core_1.Component({
        selector: exports.wjInputColorMeta.selector,
        template: exports.wjInputColorMeta.template,
        inputs: exports.wjInputColorMeta.inputs,
        outputs: exports.wjInputColorMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputColor_1; }) }
        ].concat(exports.wjInputColorMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjInputColor);
exports.WjInputColor = WjInputColor;
exports.wjMultiSelectMeta = {
    selector: 'wj-multi-select',
    template: "<div><ng-content></ng-content></div>",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'isDroppedDown',
        'showDropDownButton',
        'autoExpandSelection',
        'placeholder',
        'dropDownCssClass',
        'isAnimated',
        'isReadOnly',
        'isRequired',
        'displayMemberPath',
        'selectedValuePath',
        'headerPath',
        'isContentHtml',
        'isEditable',
        'maxDropDownHeight',
        'maxDropDownWidth',
        'itemFormatter',
        'checkedMemberPath',
        'maxHeaderItems',
        'headerFormat',
        'headerFormatter',
        'itemsSource',
        'checkedItems',
        'text',
        'selectedIndex',
        'selectedItem',
        'selectedValue',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'isDroppedDownChangingNg: isDroppedDownChanging',
        'isDroppedDownChangedNg: isDroppedDownChanged',
        'isDroppedDownChangePC: isDroppedDownChange',
        'textChangedNg: textChanged',
        'textChangePC: textChange',
        'formatItemNg: formatItem',
        'selectedIndexChangedNg: selectedIndexChanged',
        'selectedIndexChangePC: selectedIndexChange',
        'selectedItemChangePC: selectedItemChange',
        'selectedValueChangePC: selectedValueChange',
        'checkedItemsChangedNg: checkedItemsChanged',
        'checkedItemsChangePC: checkedItemsChange',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.MultiSelect control.
 *
 * Use the <b>wj-multi-select</b> component to add <b>MultiSelect</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjMultiSelect</b> component is derived from the <b>MultiSelect</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-multi-select</b> component may contain a @see:wijmo/wijmo.angular2.input.WjItemTemplate child directive.
*/
var WjMultiSelect = WjMultiSelect_1 = (function (_super) {
    __extends(WjMultiSelect, _super);
    function WjMultiSelect(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'checkedItems'.
         */
        _this.wjModelProperty = 'checkedItems';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
         */
        _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
         */
        _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
        _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
         */
        _this.textChangedNg = new core_1.EventEmitter(false);
        _this.textChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
         */
        _this.formatItemNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
         */
        _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
        _this.selectedIndexChangePC = new core_1.EventEmitter(false);
        _this.selectedItemChangePC = new core_1.EventEmitter(false);
        _this.selectedValueChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>checkedItemsChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>checkedItemsChanged</b> Wijmo event name.
         */
        _this.checkedItemsChangedNg = new core_1.EventEmitter(false);
        _this.checkedItemsChangePC = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjMultiSelect.prototype.created = function () {
    };
    WjMultiSelect.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjMultiSelect.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjMultiSelect.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjMultiSelect;
}(wijmo.input.MultiSelect));
WjMultiSelect.meta = {
    outputs: exports.wjMultiSelectMeta.outputs,
    changeEvents: {
        'isDroppedDownChanged': ['isDroppedDown'],
        'textChanged': ['text'],
        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
        'checkedItemsChanged': ['checkedItems']
    },
};
WjMultiSelect = WjMultiSelect_1 = __decorate([
    core_1.Component({
        selector: exports.wjMultiSelectMeta.selector,
        template: exports.wjMultiSelectMeta.template,
        inputs: exports.wjMultiSelectMeta.inputs,
        outputs: exports.wjMultiSelectMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMultiSelect_1; }) }
        ].concat(exports.wjMultiSelectMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjMultiSelect);
exports.WjMultiSelect = WjMultiSelect;
exports.wjMultiAutoCompleteMeta = {
    selector: 'wj-multi-auto-complete',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'isDroppedDown',
        'showDropDownButton',
        'autoExpandSelection',
        'placeholder',
        'dropDownCssClass',
        'isAnimated',
        'isReadOnly',
        'isRequired',
        'displayMemberPath',
        'selectedValuePath',
        'headerPath',
        'isContentHtml',
        'isEditable',
        'maxDropDownHeight',
        'maxDropDownWidth',
        'itemFormatter',
        'delay',
        'maxItems',
        'minLength',
        'cssMatch',
        'itemsSourceFunction',
        'searchMemberPath',
        'maxSelectedItems',
        'selectedItems',
        'itemsSource',
        'selectedMemberPath',
        'text',
        'selectedIndex',
        'selectedItem',
        'selectedValue',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'isDroppedDownChangingNg: isDroppedDownChanging',
        'isDroppedDownChangedNg: isDroppedDownChanged',
        'isDroppedDownChangePC: isDroppedDownChange',
        'textChangedNg: textChanged',
        'textChangePC: textChange',
        'formatItemNg: formatItem',
        'selectedIndexChangedNg: selectedIndexChanged',
        'selectedIndexChangePC: selectedIndexChange',
        'selectedItemChangePC: selectedItemChange',
        'selectedValueChangePC: selectedValueChange',
        'selectedItemsChangedNg: selectedItemsChanged',
        'selectedItemsChangePC: selectedItemsChange',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.MultiAutoComplete control.
 *
 * Use the <b>wj-multi-auto-complete</b> component to add <b>MultiAutoComplete</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjMultiAutoComplete</b> component is derived from the <b>MultiAutoComplete</b> control and
 * inherits all its properties, events and methods.
*/
var WjMultiAutoComplete = WjMultiAutoComplete_1 = (function (_super) {
    __extends(WjMultiAutoComplete, _super);
    function WjMultiAutoComplete(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'selectedItems'.
         */
        _this.wjModelProperty = 'selectedItems';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
         */
        _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
         */
        _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
        _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
         */
        _this.textChangedNg = new core_1.EventEmitter(false);
        _this.textChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
         */
        _this.formatItemNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
         */
        _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
        _this.selectedIndexChangePC = new core_1.EventEmitter(false);
        _this.selectedItemChangePC = new core_1.EventEmitter(false);
        _this.selectedValueChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>selectedItemsChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>selectedItemsChanged</b> Wijmo event name.
         */
        _this.selectedItemsChangedNg = new core_1.EventEmitter(false);
        _this.selectedItemsChangePC = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjMultiAutoComplete.prototype.created = function () {
    };
    WjMultiAutoComplete.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjMultiAutoComplete.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjMultiAutoComplete.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjMultiAutoComplete;
}(wijmo.input.MultiAutoComplete));
WjMultiAutoComplete.meta = {
    outputs: exports.wjMultiAutoCompleteMeta.outputs,
    changeEvents: {
        'isDroppedDownChanged': ['isDroppedDown'],
        'textChanged': ['text'],
        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
        'selectedItemsChanged': ['selectedItems']
    },
};
WjMultiAutoComplete = WjMultiAutoComplete_1 = __decorate([
    core_1.Component({
        selector: exports.wjMultiAutoCompleteMeta.selector,
        template: exports.wjMultiAutoCompleteMeta.template,
        inputs: exports.wjMultiAutoCompleteMeta.inputs,
        outputs: exports.wjMultiAutoCompleteMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMultiAutoComplete_1; }) }
        ].concat(exports.wjMultiAutoCompleteMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjMultiAutoComplete);
exports.WjMultiAutoComplete = WjMultiAutoComplete;
exports.wjInputNumberMeta = {
    selector: 'wj-input-number',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'showSpinner',
        'max',
        'min',
        'step',
        'isRequired',
        'placeholder',
        'inputType',
        'format',
        'isReadOnly',
        'value',
        'text',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'valueChangedNg: valueChanged',
        'valueChangePC: valueChange',
        'textChangedNg: textChanged',
        'textChangePC: textChange',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.InputNumber control.
 *
 * Use the <b>wj-input-number</b> component to add <b>InputNumber</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjInputNumber</b> component is derived from the <b>InputNumber</b> control and
 * inherits all its properties, events and methods.
*/
var WjInputNumber = WjInputNumber_1 = (function (_super) {
    __extends(WjInputNumber, _super);
    function WjInputNumber(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'value'.
         */
        _this.wjModelProperty = 'value';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
         */
        _this.valueChangedNg = new core_1.EventEmitter(false);
        _this.valueChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
         */
        _this.textChangedNg = new core_1.EventEmitter(false);
        _this.textChangePC = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjInputNumber.prototype.created = function () {
    };
    WjInputNumber.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjInputNumber.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjInputNumber.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjInputNumber;
}(wijmo.input.InputNumber));
WjInputNumber.meta = {
    outputs: exports.wjInputNumberMeta.outputs,
    changeEvents: {
        'valueChanged': ['value'],
        'textChanged': ['text']
    },
};
WjInputNumber = WjInputNumber_1 = __decorate([
    core_1.Component({
        selector: exports.wjInputNumberMeta.selector,
        template: exports.wjInputNumberMeta.template,
        inputs: exports.wjInputNumberMeta.inputs,
        outputs: exports.wjInputNumberMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputNumber_1; }) }
        ].concat(exports.wjInputNumberMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjInputNumber);
exports.WjInputNumber = WjInputNumber;
exports.wjInputDateMeta = {
    selector: 'wj-input-date',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'isDroppedDown',
        'showDropDownButton',
        'autoExpandSelection',
        'placeholder',
        'dropDownCssClass',
        'isAnimated',
        'isReadOnly',
        'isRequired',
        'selectionMode',
        'format',
        'mask',
        'max',
        'min',
        'inputType',
        'itemValidator',
        'itemFormatter',
        'text',
        'value',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'isDroppedDownChangingNg: isDroppedDownChanging',
        'isDroppedDownChangedNg: isDroppedDownChanged',
        'isDroppedDownChangePC: isDroppedDownChange',
        'textChangedNg: textChanged',
        'textChangePC: textChange',
        'valueChangedNg: valueChanged',
        'valueChangePC: valueChange',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.InputDate control.
 *
 * Use the <b>wj-input-date</b> component to add <b>InputDate</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjInputDate</b> component is derived from the <b>InputDate</b> control and
 * inherits all its properties, events and methods.
*/
var WjInputDate = WjInputDate_1 = (function (_super) {
    __extends(WjInputDate, _super);
    function WjInputDate(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'value'.
         */
        _this.wjModelProperty = 'value';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
         */
        _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
         */
        _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
        _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
         */
        _this.textChangedNg = new core_1.EventEmitter(false);
        _this.textChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
         */
        _this.valueChangedNg = new core_1.EventEmitter(false);
        _this.valueChangePC = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjInputDate.prototype.created = function () {
    };
    WjInputDate.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjInputDate.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjInputDate.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjInputDate;
}(wijmo.input.InputDate));
WjInputDate.meta = {
    outputs: exports.wjInputDateMeta.outputs,
    changeEvents: {
        'isDroppedDownChanged': ['isDroppedDown'],
        'textChanged': ['text'],
        'valueChanged': ['value']
    },
};
WjInputDate = WjInputDate_1 = __decorate([
    core_1.Component({
        selector: exports.wjInputDateMeta.selector,
        template: exports.wjInputDateMeta.template,
        inputs: exports.wjInputDateMeta.inputs,
        outputs: exports.wjInputDateMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputDate_1; }) }
        ].concat(exports.wjInputDateMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjInputDate);
exports.WjInputDate = WjInputDate;
exports.wjInputTimeMeta = {
    selector: 'wj-input-time',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'isDroppedDown',
        'showDropDownButton',
        'autoExpandSelection',
        'placeholder',
        'dropDownCssClass',
        'isAnimated',
        'isReadOnly',
        'isRequired',
        'displayMemberPath',
        'selectedValuePath',
        'headerPath',
        'isContentHtml',
        'isEditable',
        'maxDropDownHeight',
        'maxDropDownWidth',
        'itemFormatter',
        'max',
        'min',
        'step',
        'format',
        'mask',
        'inputType',
        'itemsSource',
        'text',
        'selectedIndex',
        'selectedItem',
        'selectedValue',
        'value',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'isDroppedDownChangingNg: isDroppedDownChanging',
        'isDroppedDownChangedNg: isDroppedDownChanged',
        'isDroppedDownChangePC: isDroppedDownChange',
        'textChangedNg: textChanged',
        'textChangePC: textChange',
        'formatItemNg: formatItem',
        'selectedIndexChangedNg: selectedIndexChanged',
        'selectedIndexChangePC: selectedIndexChange',
        'selectedItemChangePC: selectedItemChange',
        'selectedValueChangePC: selectedValueChange',
        'valueChangedNg: valueChanged',
        'valueChangePC: valueChange',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.InputTime control.
 *
 * Use the <b>wj-input-time</b> component to add <b>InputTime</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjInputTime</b> component is derived from the <b>InputTime</b> control and
 * inherits all its properties, events and methods.
*/
var WjInputTime = WjInputTime_1 = (function (_super) {
    __extends(WjInputTime, _super);
    function WjInputTime(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'value'.
         */
        _this.wjModelProperty = 'value';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
         */
        _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
         */
        _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
        _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
         */
        _this.textChangedNg = new core_1.EventEmitter(false);
        _this.textChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
         */
        _this.formatItemNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
         */
        _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
        _this.selectedIndexChangePC = new core_1.EventEmitter(false);
        _this.selectedItemChangePC = new core_1.EventEmitter(false);
        _this.selectedValueChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
         */
        _this.valueChangedNg = new core_1.EventEmitter(false);
        _this.valueChangePC = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjInputTime.prototype.created = function () {
    };
    WjInputTime.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjInputTime.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjInputTime.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjInputTime;
}(wijmo.input.InputTime));
WjInputTime.meta = {
    outputs: exports.wjInputTimeMeta.outputs,
    changeEvents: {
        'isDroppedDownChanged': ['isDroppedDown'],
        'textChanged': ['text'],
        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
        'valueChanged': ['value']
    },
};
WjInputTime = WjInputTime_1 = __decorate([
    core_1.Component({
        selector: exports.wjInputTimeMeta.selector,
        template: exports.wjInputTimeMeta.template,
        inputs: exports.wjInputTimeMeta.inputs,
        outputs: exports.wjInputTimeMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputTime_1; }) }
        ].concat(exports.wjInputTimeMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjInputTime);
exports.WjInputTime = WjInputTime;
exports.wjInputDateTimeMeta = {
    selector: 'wj-input-date-time',
    template: "",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'isDroppedDown',
        'showDropDownButton',
        'autoExpandSelection',
        'placeholder',
        'dropDownCssClass',
        'isAnimated',
        'isReadOnly',
        'isRequired',
        'selectionMode',
        'format',
        'mask',
        'max',
        'min',
        'inputType',
        'itemValidator',
        'itemFormatter',
        'timeMax',
        'timeMin',
        'timeStep',
        'timeFormat',
        'text',
        'value',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'isDroppedDownChangingNg: isDroppedDownChanging',
        'isDroppedDownChangedNg: isDroppedDownChanged',
        'isDroppedDownChangePC: isDroppedDownChange',
        'textChangedNg: textChanged',
        'textChangePC: textChange',
        'valueChangedNg: valueChanged',
        'valueChangePC: valueChange',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.InputDateTime control.
 *
 * Use the <b>wj-input-date-time</b> component to add <b>InputDateTime</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjInputDateTime</b> component is derived from the <b>InputDateTime</b> control and
 * inherits all its properties, events and methods.
*/
var WjInputDateTime = WjInputDateTime_1 = (function (_super) {
    __extends(WjInputDateTime, _super);
    function WjInputDateTime(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'value'.
         */
        _this.wjModelProperty = 'value';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
         */
        _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
         */
        _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
        _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
         */
        _this.textChangedNg = new core_1.EventEmitter(false);
        _this.textChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
         */
        _this.valueChangedNg = new core_1.EventEmitter(false);
        _this.valueChangePC = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjInputDateTime.prototype.created = function () {
    };
    WjInputDateTime.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjInputDateTime.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjInputDateTime.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjInputDateTime;
}(wijmo.input.InputDateTime));
WjInputDateTime.meta = {
    outputs: exports.wjInputDateTimeMeta.outputs,
    changeEvents: {
        'isDroppedDownChanged': ['isDroppedDown'],
        'textChanged': ['text'],
        'valueChanged': ['value']
    },
};
WjInputDateTime = WjInputDateTime_1 = __decorate([
    core_1.Component({
        selector: exports.wjInputDateTimeMeta.selector,
        template: exports.wjInputDateTimeMeta.template,
        inputs: exports.wjInputDateTimeMeta.inputs,
        outputs: exports.wjInputDateTimeMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputDateTime_1; }) }
        ].concat(exports.wjInputDateTimeMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjInputDateTime);
exports.WjInputDateTime = WjInputDateTime;
exports.wjListBoxMeta = {
    selector: 'wj-list-box',
    template: "<div><ng-content></ng-content></div>",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'isContentHtml',
        'maxHeight',
        'selectedValuePath',
        'itemFormatter',
        'displayMemberPath',
        'checkedMemberPath',
        'itemsSource',
        'selectedIndex',
        'selectedItem',
        'selectedValue',
        'checkedItems',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'formatItemNg: formatItem',
        'itemsChangedNg: itemsChanged',
        'itemCheckedNg: itemChecked',
        'selectedIndexChangedNg: selectedIndexChanged',
        'selectedIndexChangePC: selectedIndexChange',
        'selectedItemChangePC: selectedItemChange',
        'selectedValueChangePC: selectedValueChange',
        'checkedItemsChangedNg: checkedItemsChanged',
        'checkedItemsChangePC: checkedItemsChange',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.ListBox control.
 *
 * Use the <b>wj-list-box</b> component to add <b>ListBox</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjListBox</b> component is derived from the <b>ListBox</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-list-box</b> component may contain a @see:wijmo/wijmo.angular2.input.WjItemTemplate child directive.
*/
var WjListBox = WjListBox_1 = (function (_super) {
    __extends(WjListBox, _super);
    function WjListBox(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'selectedValue'.
         */
        _this.wjModelProperty = 'selectedValue';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
         */
        _this.formatItemNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>itemsChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>itemsChanged</b> Wijmo event name.
         */
        _this.itemsChangedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>itemChecked</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>itemChecked</b> Wijmo event name.
         */
        _this.itemCheckedNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
         */
        _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
        _this.selectedIndexChangePC = new core_1.EventEmitter(false);
        _this.selectedItemChangePC = new core_1.EventEmitter(false);
        _this.selectedValueChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>checkedItemsChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>checkedItemsChanged</b> Wijmo event name.
         */
        _this.checkedItemsChangedNg = new core_1.EventEmitter(false);
        _this.checkedItemsChangePC = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjListBox.prototype.created = function () {
    };
    WjListBox.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjListBox.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjListBox.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjListBox;
}(wijmo.input.ListBox));
WjListBox.meta = {
    outputs: exports.wjListBoxMeta.outputs,
    changeEvents: {
        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
        'checkedItemsChanged': ['checkedItems']
    },
};
WjListBox = WjListBox_1 = __decorate([
    core_1.Component({
        selector: exports.wjListBoxMeta.selector,
        template: exports.wjListBoxMeta.template,
        inputs: exports.wjListBoxMeta.inputs,
        outputs: exports.wjListBoxMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjListBox_1; }) }
        ].concat(exports.wjListBoxMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjListBox);
exports.WjListBox = WjListBox;
exports.wjMenuMeta = {
    selector: 'wj-menu',
    template: "<div><ng-content></ng-content></div>",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'isDroppedDown',
        'showDropDownButton',
        'autoExpandSelection',
        'placeholder',
        'dropDownCssClass',
        'isAnimated',
        'isReadOnly',
        'isRequired',
        'displayMemberPath',
        'selectedValuePath',
        'headerPath',
        'isContentHtml',
        'isEditable',
        'maxDropDownHeight',
        'maxDropDownWidth',
        'itemFormatter',
        'header',
        'commandParameterPath',
        'commandPath',
        'isButton',
        'itemsSource',
        'text',
        'selectedIndex',
        'selectedItem',
        'selectedValue',
        'value',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'isDroppedDownChangingNg: isDroppedDownChanging',
        'isDroppedDownChangedNg: isDroppedDownChanged',
        'isDroppedDownChangePC: isDroppedDownChange',
        'textChangedNg: textChanged',
        'textChangePC: textChange',
        'formatItemNg: formatItem',
        'selectedIndexChangedNg: selectedIndexChanged',
        'selectedIndexChangePC: selectedIndexChange',
        'selectedItemChangePC: selectedItemChange',
        'selectedValueChangePC: selectedValueChange',
        'itemClickedNg: itemClicked',
        'valueChangePC: valueChange',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.Menu control.
 *
 * Use the <b>wj-menu</b> component to add <b>Menu</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjMenu</b> component is derived from the <b>Menu</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-menu</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.input.WjMenuItem
 * , @see:wijmo/wijmo.angular2.input.WjMenuSeparator
 *  and @see:wijmo/wijmo.angular2.input.WjItemTemplate.
*/
var WjMenu = WjMenu_1 = (function (_super) {
    __extends(WjMenu, _super);
    function WjMenu(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Defines a name of a property represented by [(ngModel)] directive (if specified).
         * Default value is 'selectedValue'.
         */
        _this.wjModelProperty = 'selectedValue';
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
         */
        _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
         */
        _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
        _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
         */
        _this.textChangedNg = new core_1.EventEmitter(false);
        _this.textChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
         */
        _this.formatItemNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
         */
        _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
        _this.selectedIndexChangePC = new core_1.EventEmitter(false);
        _this.selectedItemChangePC = new core_1.EventEmitter(false);
        _this.selectedValueChangePC = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>itemClicked</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>itemClicked</b> Wijmo event name.
         */
        _this.itemClickedNg = new core_1.EventEmitter(false);
        _this.valueChangePC = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.itemsSource = new wijmo.collections.ObservableArray();
        _this.selectedIndex = 0;
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjMenu.prototype.created = function () {
    };
    WjMenu.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
        this._attachToControl();
        this._updateHeader();
    };
    WjMenu.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjMenu.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
        this.listBox.formatItem.removeHandler(this._fmtItem, this);
        this.listBox.loadingItems.removeHandler(this._loadingItems, this);
    };
    Object.defineProperty(WjMenu.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            //if (this._value != value) {
            this._value = value;
            if (value != null) {
                this.selectedValue = value;
                this._updateHeader();
            }
            //this._cdRef.markForCheck();
            //this._appRef.tick();
            //}
        },
        enumerable: true,
        configurable: true
    });
    WjMenu.prototype.ngOnChanges = function (changes) {
        var headerChange = changes['header'];
        if (headerChange) {
            this._definedHeader = headerChange.currentValue;
            this._updateHeader();
        }
    };
    WjMenu.prototype.ngAfterContentInit = function () {
        // to force correct selectedValue and header update
        this.value = this.value;
        //this._updateHeader();
        ////this.itemClicked.addHandler(() => {
        //this.selectedIndexChanged.addHandler(() => {
        //    this.value = this.selectedValue;
        //});
    };
    WjMenu.prototype.onItemClicked = function (e) {
        // assign value before triggering the event, otherwise Ng 'valueChange' will be called with an
        // old 'value' value and two-way binding's source will receive an old value.
        this.value = this.selectedValue;
        _super.prototype.onItemClicked.call(this, e);
    };
    WjMenu.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        this._updateHeader();
    };
    WjMenu.prototype._attachToControl = function () {
        this.listBox.formatItem.addHandler(this._fmtItem, this);
        this.listBox.loadingItems.addHandler(this._loadingItems, this);
        //if (this.parent._isInitialized) {
        //    ownerControl.invalidate();
        this.invalidate();
    };
    WjMenu.prototype._loadingItems = function (s) {
        //TBD: will this destroy Wijmo directives in templates?
        //this.viewContainerRef.clear();
        var items = s.hostElement.getElementsByClassName('wj-listbox-item');
        for (var i = items.length - 1; i >= 0; i--) {
            var itemEl = items[i];
            itemEl.textContent = '';
        }
    };
    WjMenu.prototype._fmtItem = function (s, e) {
        if (!(e.data instanceof WjMenuItem)) {
            return;
        }
        var itemEl = e.item;
        itemEl.textContent = '';
        var menuItem = e.data, contentRoot = menuItem.contentRoot;
        if (contentRoot) {
            itemEl.appendChild(contentRoot);
            menuItem.added(itemEl);
        }
    };
    // if the scope has a value, show it in the header
    WjMenu.prototype._updateHeader = function () {
        this.header = this._definedHeader || '';
        var selItem = this.selectedItem;
        if (this.value != null && selItem && this.displayMemberPath) {
            var currentValue = null;
            if (selItem instanceof WjMenuItem) {
                var contentRoot = selItem.contentRoot;
                if (contentRoot) {
                    currentValue = contentRoot.innerHTML;
                }
                else {
                    currentValue = selItem[this.displayMemberPath];
                }
            }
            if (currentValue != null) {
                this.header += ': <b>' + currentValue + '</b>';
            }
        }
    };
    return WjMenu;
}(wijmo.input.Menu));
WjMenu.meta = {
    outputs: exports.wjMenuMeta.outputs,
    changeEvents: {
        'isDroppedDownChanged': ['isDroppedDown'],
        'textChanged': ['text'],
        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
        'itemClicked': ['value']
    },
};
WjMenu = WjMenu_1 = __decorate([
    core_1.Component({
        selector: exports.wjMenuMeta.selector,
        template: exports.wjMenuMeta.template,
        inputs: exports.wjMenuMeta.inputs,
        outputs: exports.wjMenuMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMenu_1; }) }
        ].concat(exports.wjMenuMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjMenu);
exports.WjMenu = WjMenu;
exports.wjMenuItemMeta = {
    selector: 'wj-menu-item',
    template: "<div *wjMenuItemTemplateDir><ng-content></ng-content></div>",
    inputs: [
        'wjProperty',
        'value',
        'cmd',
        'cmdParam',
    ],
    outputs: [
        'initialized',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see: control.
 *
 * The <b>wj-menu-item</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.input.WjMenu component.
 *
 * Use the <b>wj-menu-item</b> component to add <b></b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
*/
var WjMenuItem = WjMenuItem_1 = (function () {
    function WjMenuItem(elRef, injector, parentCmp, viewContainerRef, domRenderer) {
        this.viewContainerRef = viewContainerRef;
        this.domRenderer = domRenderer;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        this.initialized = new core_1.EventEmitter(true);
        /**
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'itemsSource'.
         */
        this.wjProperty = 'itemsSource';
        var behavior = this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this._ownerMenu = behavior.parentBehavior.directive;
        this.created();
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjMenuItem.prototype.created = function () {
    };
    WjMenuItem.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
        var ownerMenu = this._ownerMenu;
        if (ownerMenu.itemsSource.length == 1 && ownerMenu.selectedIndex < 0) {
            ownerMenu.selectedIndex = 0;
        }
        if (!ownerMenu.displayMemberPath) {
            ownerMenu.displayMemberPath = 'header';
        }
        if (!ownerMenu.selectedValuePath) {
            ownerMenu.selectedValuePath = 'value';
        }
        if (!ownerMenu.commandPath) {
            ownerMenu.commandPath = 'cmd';
        }
        if (!ownerMenu.commandParameterPath) {
            ownerMenu.commandParameterPath = 'cmdParam';
        }
        //ownerMenu.invalidate();
    };
    WjMenuItem.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjMenuItem.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjMenuItem.prototype.added = function (toItem) {
    };
    return WjMenuItem;
}());
WjMenuItem.meta = {
    outputs: exports.wjMenuItemMeta.outputs,
    siblingId: 'menuItemDir',
};
WjMenuItem = WjMenuItem_1 = __decorate([
    core_1.Component({
        selector: exports.wjMenuItemMeta.selector,
        template: exports.wjMenuItemMeta.template,
        inputs: exports.wjMenuItemMeta.inputs,
        outputs: exports.wjMenuItemMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMenuItem_1; }) }
        ].concat(exports.wjMenuItemMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
    __param(3, core_3.Inject(core_2.ViewContainerRef)),
    __param(4, core_3.Inject(core_2.Renderer))
], WjMenuItem);
exports.WjMenuItem = WjMenuItem;
var WjMenuItemTemplateDir = (function () {
    function WjMenuItemTemplateDir(viewContainerRef, templateRef, elRef, injector, domRenderer, menuItem, menuSeparator) {
        this.viewContainerRef = viewContainerRef;
        this.templateRef = templateRef;
        this.elRef = elRef;
        this.domRenderer = domRenderer;
        this.ownerItem = menuItem || menuSeparator;
        this.ownerItem.templateDir = this;
    }
    WjMenuItemTemplateDir.prototype.ngAfterContentInit = function () {
        var self = this;
        //Without timeout, we get "LifeCycle.tick is called recursively" exception.
        //this.ngZone.run(() => {
        setTimeout(function () {
            var rootEl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(null, self.viewContainerRef, self.templateRef, self.domRenderer, true).rootElement;
            self.contentRoot = rootEl;
            self.ownerItem.contentRoot = rootEl;
            self.ownerItem._ownerMenu.listBox.invalidate();
            self.ownerItem._ownerMenu.invalidate();
        }, 0);
        //});
    };
    return WjMenuItemTemplateDir;
}());
WjMenuItemTemplateDir = __decorate([
    core_2.Directive({
        selector: '[wjMenuItemTemplateDir]',
        inputs: ['wjMenuItemTemplateDir']
    }),
    __param(0, core_3.Inject(core_2.ViewContainerRef)),
    __param(1, core_3.Inject(core_2.TemplateRef)), __param(1, core_2.Optional()),
    __param(2, core_3.Inject(core_2.ElementRef)),
    __param(3, core_3.Inject(core_2.Injector)),
    __param(4, core_3.Inject(core_2.Renderer)),
    __param(5, core_3.Inject(WjMenuItem)), __param(5, core_2.Optional()),
    __param(6, core_3.Inject(core_2.forwardRef(function () { return WjMenuSeparator; }))), __param(6, core_2.Optional())
], WjMenuItemTemplateDir);
exports.WjMenuItemTemplateDir = WjMenuItemTemplateDir;
exports.wjMenuSeparatorMeta = {
    selector: 'wj-menu-separator',
    template: "<div *wjMenuItemTemplateDir class=\"wj-state-disabled\" style=\"width:100%;height:1px;background-color:lightgray\"></div>",
    inputs: [
        'wjProperty',
    ],
    outputs: [
        'initialized',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see: control.
 *
 * The <b>wj-menu-separator</b> component must be
 * contained in a @see:wijmo/wijmo.angular2.input.WjMenu component.
 *
 * Use the <b>wj-menu-separator</b> component to add <b></b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
*/
var WjMenuSeparator = WjMenuSeparator_1 = (function (_super) {
    __extends(WjMenuSeparator, _super);
    function WjMenuSeparator(elRef, injector, parentCmp, viewContainerRef, domRenderer) {
        var _this = _super.call(this, elRef, injector, parentCmp, viewContainerRef, domRenderer) || this;
        _this.created();
        return _this;
    }
    WjMenuSeparator.prototype.added = function (toItem) {
        // prevent item selection
        wijmo.addClass(toItem, 'wj-state-disabled');
    };
    return WjMenuSeparator;
}(WjMenuItem));
WjMenuSeparator = WjMenuSeparator_1 = __decorate([
    core_1.Component({
        selector: exports.wjMenuSeparatorMeta.selector,
        template: exports.wjMenuSeparatorMeta.template,
        inputs: exports.wjMenuSeparatorMeta.inputs,
        outputs: exports.wjMenuSeparatorMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMenuSeparator_1; }) }
        ].concat(exports.wjMenuSeparatorMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
    __param(3, core_3.Inject(core_2.ViewContainerRef)),
    __param(4, core_3.Inject(core_2.Renderer))
], WjMenuSeparator);
exports.WjMenuSeparator = WjMenuSeparator;
exports.wjItemTemplateMeta = {
    selector: '[wjItemTemplate]',
    inputs: [
        'wjItemTemplate',
    ],
    outputs: [
        'initialized',
    ],
    exportAs: 'wjItemTemplate',
    providers: []
};
/**
 * Angular 2 component for the @see: control.
 *
 * The <b>[wjItemTemplate]</b> directive must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.input.WjListBox
 * , @see:wijmo/wijmo.angular2.input.WjMenu
 * , @see:wijmo/wijmo.angular2.input.WjComboBox
 *  or @see:wijmo/wijmo.angular2.input.WjMultiSelect.
 *
 * The <b>[wjItemTemplate]</b> directive defines a template for items of a component
 * that it's nested in.
 * The template may contain an arbitrary HTML fragment with Angular 2 bindings and directives.
 * The local <b>item</b>, <b>itemIndex</b> and <b>control</b> template variables can be used in Angular 2
 * bindings that refer to the data item, its index, and the owner control. For example:
 *
 *<pre>&lt;wj-list-box style="max-height:300px;width:250px;"
 *             [itemsSource]="musicians"&gt;
 *   &lt;template wjItemTemplate let-item="item" let-itemIndex="itemIndex"&gt;
 *       {&#8203;{itemIndex + 1}}. &lt;b&gt;{&#8203;{item.name}}&lt;/b&gt;
 *       &lt;div *ngIf="item.photo"&gt;
 *           &lt;img [src]="item.photo" height="100" /&gt;
 *           &lt;br /&gt;
 *           &lt;a href="https://www.google.com/#newwindow=1&q=The+Beatles+"
 *              target="_blank"
 *              style="color:red"&gt;go there!&lt;/a&gt;
 *       &lt;/div&gt;
 *   &lt;/template&gt;
 * &lt;/wj-list-box&gt;</pre>
*/
var WjItemTemplate = WjItemTemplate_1 = (function () {
    function WjItemTemplate(elRef, injector, parentCmp, viewContainerRef, templateRef, domRenderer, cdRef) {
        this.viewContainerRef = viewContainerRef;
        this.templateRef = templateRef;
        this.domRenderer = domRenderer;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        this.initialized = new core_1.EventEmitter(true);
        var behavior = this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.ownerControl = behavior.parentBehavior.directive;
        this.listBox = WjItemTemplate_1._getListBox(this.ownerControl);
        this._cdRef = cdRef;
        this.created();
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjItemTemplate.prototype.created = function () {
    };
    WjItemTemplate.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
        this._attachToControl();
    };
    WjItemTemplate.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjItemTemplate.prototype.ngOnDestroy = function () {
        var ownerControl = this.ownerControl, listBox = this.listBox;
        if (listBox) {
            listBox.formatItem.removeHandler(this._fmtItem, this);
            listBox.loadingItems.removeHandler(this._loadingItems, this);
        }
        if (ownerControl) {
            ownerControl.invalidate();
        }
    };
    WjItemTemplate.prototype._attachToControl = function () {
        this.listBox.formatItem.addHandler(this._fmtItem, this);
        this.listBox.loadingItems.addHandler(this._loadingItems, this);
        //if (this.parent._isInitialized) {
        //    ownerControl.invalidate();
        this.ownerControl.invalidate();
    };
    WjItemTemplate.prototype._loadingItems = function (s) {
        //TBD: will this destroy Wijmo directives in templates?
        this.viewContainerRef.clear();
    };
    WjItemTemplate.prototype._fmtItem = function (s, e) {
        var itemEl = e.item;
        itemEl.textContent = '';
        var viewRef = this._instantiateTemplate(itemEl);
        //viewRef.setLocal('control', s);
        //viewRef.setLocal('item', e.data);
        //viewRef.setLocal('itemIndex', e.index);
        viewRef.context.control = s;
        viewRef.context.item = e.data;
        viewRef.context.itemIndex = e.index;
        // Force change detection before itemsLoaded==>selectedIndexChanged, in order
        // to provide ComboBox with a consistent display text for its item search
        // functionality.
        if (e.index === (this.listBox.collectionView.items.length - 1)) {
            this._cdRef.detectChanges();
        }
    };
    WjItemTemplate.prototype._instantiateTemplate = function (parent) {
        return wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(parent, this.viewContainerRef, this.templateRef, this.domRenderer).viewRef;
    };
    // Gets a ListBox control whose items are templated, it maybe the control itself or internal ListBox used by controls like
    // ComboBox.
    WjItemTemplate._getListBox = function (ownerControl) {
        if (ownerControl) {
            return ownerControl instanceof wijmo.input.ListBox ? ownerControl : ownerControl.listBox;
        }
        return null;
    };
    return WjItemTemplate;
}());
WjItemTemplate.meta = {
    outputs: exports.wjItemTemplateMeta.outputs,
    parentRefProperty: 'owner',
};
WjItemTemplate = WjItemTemplate_1 = __decorate([
    core_2.Directive({
        selector: exports.wjItemTemplateMeta.selector,
        inputs: exports.wjItemTemplateMeta.inputs,
        outputs: exports.wjItemTemplateMeta.outputs,
        exportAs: exports.wjItemTemplateMeta.exportAs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjItemTemplate_1; }) }
        ].concat(exports.wjItemTemplateMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
    __param(3, core_3.Inject(core_2.ViewContainerRef)),
    __param(4, core_3.Inject(core_2.TemplateRef)), __param(4, core_2.Optional()),
    __param(5, core_3.Inject(core_2.Renderer)),
    __param(6, core_3.Inject(core_3.ChangeDetectorRef))
], WjItemTemplate);
exports.WjItemTemplate = WjItemTemplate;
exports.wjPopupMeta = {
    selector: 'wj-popup',
    template: "<div><ng-content></ng-content></div>",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'owner',
        'showTrigger',
        'hideTrigger',
        'fadeIn',
        'fadeOut',
        'dialogResultEnter',
        'modal',
    ],
    outputs: [
        'initialized',
        'gotFocusNg: gotFocus',
        'lostFocusNg: lostFocus',
        'showingNg: showing',
        'shownNg: shown',
        'hidingNg: hiding',
        'hiddenNg: hidden',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.input.Popup control.
 *
 * Use the <b>wj-popup</b> component to add <b>Popup</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjPopup</b> component is derived from the <b>Popup</b> control and
 * inherits all its properties, events and methods.
*/
var WjPopup = WjPopup_1 = (function (_super) {
    __extends(WjPopup, _super);
    function WjPopup(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        _this.initialized = new core_1.EventEmitter(true);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
         */
        _this.gotFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
         */
        _this.lostFocusNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>showing</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>showing</b> Wijmo event name.
         */
        _this.showingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>shown</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>shown</b> Wijmo event name.
         */
        _this.shownNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>hiding</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>hiding</b> Wijmo event name.
         */
        _this.hidingNg = new core_1.EventEmitter(false);
        /**
         * Angular (EventEmitter) version of the Wijmo <b>hidden</b> event for programmatic access.
         * Use this event name if you want to subscribe to the Angular version of the event in code.
         * In template bindings use the conventional <b>hidden</b> Wijmo event name.
         */
        _this.hiddenNg = new core_1.EventEmitter(false);
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjPopup.prototype.created = function () {
    };
    WjPopup.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjPopup.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjPopup.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjPopup.prototype.ngOnChanges = function (changes) {
        var ownerChange = changes['owner'];
        if (ownerChange) {
            if (this.modal == null) {
                this.modal = this.owner ? false : true;
            }
        }
    };
    WjPopup.prototype.dispose = function () {
        //TBD: patch, should be fixed in the base class
        // hide if visible
        if (this.isVisible) {
            this.hiding.removeAllHandlers();
            // don't use this trick, it prevents popup's DOM tree from removal
            //(<HTMLElement>this._elRef.nativeElement).style.display = "none";
            // suppress fade animation because it may cause weird effects in some scenarious (e.g. in cell editor)
            this.fadeOut = false;
            this.hide();
            //if (this._modal) {
            //    wijmo.hidePopup(this._bkdrop);
            //}
            //wijmo.hidePopup(this.hostElement);
        }
        // release owner
        //this._owner = null;
        // dispose as usual
        _super.prototype.dispose.call(this);
    };
    return WjPopup;
}(wijmo.input.Popup));
WjPopup.meta = {
    outputs: exports.wjPopupMeta.outputs,
};
WjPopup = WjPopup_1 = __decorate([
    core_1.Component({
        selector: exports.wjPopupMeta.selector,
        template: exports.wjPopupMeta.template,
        inputs: exports.wjPopupMeta.inputs,
        outputs: exports.wjPopupMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPopup_1; }) }
        ].concat(exports.wjPopupMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjPopup);
exports.WjPopup = WjPopup;
/**
    * Angular 2 directive for context menus.
    *
    * Use the <b>wjContextMenu</b> directive to add context menus to elements
    * on the page. The wjContextMenu directive is based on the <b>wj-menu</b>
    * component; it displays a popup menu when the user performs a context menu
    * request on an element (usually a right-click).
    *
    * The wjContextMenu directive is specified as a parameter added to the
    * element that the context menu applies to. The parameter value is a
    * reference to the <b>wj-menu</b> component. For example:
    *
    * <pre>&lt;!-- paragraph with a context menu --&gt;
    *&lt;p [wjContextMenu]="menu" &gt;
    *  This paragraph has a context menu.&lt;/p&gt;
    *
    *&lt;!-- define the context menu (hidden and with an id) --&gt;
    *&lt;wj-menu #menu style="display:none"&gt;
    *  &lt;wj-menu-item [cmd]="cmdOpen" [cmdParam] ="1"&gt;Open...&lt;/wj-menu-item&gt;
    *  &lt;wj-menu-item [cmd]="cmdSave" [cmdParam]="2"&gt;Save &lt;/wj-menu-item&gt;
    *  &lt;wj-menu-item [cmd]="cmdSave" [cmdParam]="3"&gt;Save As...&lt;/wj-menu-item&gt;
    *  &lt;wj-menu-item [cmd]="cmdNew" [cmdParam] ="4"&gt;New...&lt;/wj-menu-item&gt;
    *  &lt;wj-menu-separator&gt;&lt;/wj-menu-separator&gt;
    *  &lt;wj-menu-item [cmd]="cmdExit" [cmdParam]="5"&gt;Exit&lt;/wj-menu-item&gt;
    *&lt;/wj-menu &gt;</pre>
    */
var WjContextMenu = (function () {
    function WjContextMenu(elRef) {
        this.elRef = elRef;
    }
    WjContextMenu.prototype.onContextMenu = function (e) {
        var menu = this.wjContextMenu, dropDown = menu.dropDown;
        if (menu && dropDown && !wijmo.closest(e.target, '[disabled]')) {
            e.preventDefault();
            menu.owner = this.elRef.nativeElement;
            menu.selectedIndex = -1;
            if (menu.onIsDroppedDownChanging(new wijmo.CancelEventArgs())) {
                wijmo.showPopup(dropDown, e);
                menu.onIsDroppedDownChanged();
                dropDown.focus();
            }
        }
    };
    return WjContextMenu;
}());
WjContextMenu = __decorate([
    core_2.Directive({
        selector: '[wjContextMenu]',
        inputs: ['wjContextMenu'],
        exportAs: 'wjContextMenu',
        host: { '(contextmenu)': 'onContextMenu($event)' }
    }),
    __param(0, core_3.Inject(core_2.ElementRef))
], WjContextMenu);
exports.WjContextMenu = WjContextMenu;
exports.wjCollectionViewNavigatorMeta = {
    selector: 'wj-collection-view-navigator',
    template: "<div class=\"wj-control wj-content wj-pager\">\n                <div class=\"wj-input-group\">\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                           (click)=\"cv.moveCurrentToFirst()\"\n                           [disabled]=\"!cv || cv?.currentPosition <= 0\">\n                            <span class=\"wj-glyph-left\" style=\"margin-right: -4px;\"></span>\n                            <span class=\"wj-glyph-left\"></span>\n                         </button>\n                    </span>\n                    <span class=\"wj-input-group-btn\" >\n                       <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                           (click)=\"cv.moveCurrentToPrevious()\"\n                           [disabled]=\"!cv || cv?.currentPosition <= 0\">\n                            <span class=\"wj-glyph-left\"></span>\n                       </button>\n                    </span>\n                    <input type=\"text\" class=\"wj-form-control\" \n                           value=\"{{cv?.currentPosition + 1 | number}} / {{cv?.itemCount | number}}\" \n                           disabled />\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                           (click)=\"cv.moveCurrentToNext()\"\n                           [disabled]=\"!cv || cv?.currentPosition >= cv?.itemCount - 1\">\n                            <span class=\"wj-glyph-right\"></span>\n                        </button>\n                    </span>\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                           (click)=\"cv.moveCurrentToLast()\"\n                           [disabled]=\"!cv || cv?.currentPosition >= cv?.itemCount - 1\">\n                            <span class=\"wj-glyph-right\"></span>\n                            <span class=\"wj-glyph-right\" style=\"margin-left: -4px;\"></span>\n                        </button>\n                    </span>\n                </div>\n            </div>",
    inputs: [
        'wjModelProperty',
        'cv',
    ],
    outputs: [
        'initialized',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
    * Angular 2 component for an @see:ICollectionView navigator element.
    *
    * Use the <b>wj-collection-view-navigator</b> component to add an element
    * that allows users to navigate through the items in an @see:ICollectionView.
    * For details about Angular 2 markup syntax, see
    * <a href="static/angular2Markup.html">Angular 2 Markup</a>. For example:
    *
    * <pre>&lt;wj-collection-view-navigator
    *   [cv]="myCollectionView"&gt;
    * &lt;/wj-collection-view-navigator&gt;</pre>
    */
var WjCollectionViewNavigator = WjCollectionViewNavigator_1 = (function () {
    function WjCollectionViewNavigator(elRef, injector, parentCmp) {
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        this.initialized = new core_1.EventEmitter(true);
        var behavior = this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjCollectionViewNavigator.prototype.created = function () {
    };
    WjCollectionViewNavigator.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjCollectionViewNavigator.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjCollectionViewNavigator.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjCollectionViewNavigator;
}());
WjCollectionViewNavigator.meta = {
    outputs: exports.wjCollectionViewNavigatorMeta.outputs,
};
WjCollectionViewNavigator = WjCollectionViewNavigator_1 = __decorate([
    core_1.Component({
        selector: exports.wjCollectionViewNavigatorMeta.selector,
        template: exports.wjCollectionViewNavigatorMeta.template,
        inputs: exports.wjCollectionViewNavigatorMeta.inputs,
        outputs: exports.wjCollectionViewNavigatorMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjCollectionViewNavigator_1; }) }
        ].concat(exports.wjCollectionViewNavigatorMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjCollectionViewNavigator);
exports.WjCollectionViewNavigator = WjCollectionViewNavigator;
exports.wjCollectionViewPagerMeta = {
    selector: 'wj-collection-view-pager',
    template: "<div class=\"wj-control wj-content wj-pager\" >\n                <div class=\"wj-input-group\">\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                            (click)=\"cv.moveToFirstPage()\"\n                            [disabled]=\"!cv || cv?.pageIndex <= 0\">\n                            <span class=\"wj-glyph-left\" style=\"margin-right: -4px;\"></span>\n                            <span class=\"wj-glyph-left\"></span>\n                        </button>\n                    </span>\n                    <span class=\"wj-input-group-btn\" >\n                    <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                            (click)=\"cv.moveToPreviousPage()\"\n                            [disabled]=\"!cv || cv?.pageIndex <= 0\">\n                            <span class=\"wj-glyph-left\"></span>\n                        </button>\n                    </span>\n                    <input type=\"text\" class=\"wj-form-control\" \n                           value=\"{{cv?.pageIndex + 1 | number}} / {{cv?.pageCount | number}}\" \n                           disabled />\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                            (click)=\"cv.moveToNextPage()\"\n                            [disabled]=\"!cv || cv?.pageIndex >= cv?.pageCount - 1\">\n                            <span class=\"wj-glyph-right\"></span>\n                        </button>\n                    </span>\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                            (click)=\"cv.moveToLastPage()\"\n                            [disabled]=\"!cv || cv?.pageIndex >= cv?.pageCount - 1\">\n                            <span class=\"wj-glyph-right\"></span>\n                            <span class=\"wj-glyph-right\" style=\"margin-left: -4px;\"></span>\n                        </button>\n                    </span>\n                </div>\n            </div>",
    inputs: [
        'wjModelProperty',
        'cv',
    ],
    outputs: [
        'initialized',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
    * Angular 2 component for an @see:ICollectionView pager element.
    *
    * Use the <b>wj-collection-view-pager</b> component to add an element
    * that allows users to navigate through the pages in a paged @see:ICollectionView.
    * For details about Angular 2 markup syntax, see
    * <a href="static/angular2Markup.html">Angular 2 Markup</a>. For example:
    *
    * <pre>&lt;wj-collection-view-pager
    *   [cv]="myCollectionView"&gt;
    * &lt;/wj-collection-view-pager&gt;</pre>
    */
var WjCollectionViewPager = WjCollectionViewPager_1 = (function () {
    function WjCollectionViewPager(elRef, injector, parentCmp) {
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        this.isInitialized = false;
        /**
         * This event is triggered after the component has been initialized by Angular, that is
         * all bound properties have been assigned and child components (if any) have been initialized.
         */
        this.initialized = new core_1.EventEmitter(true);
        var behavior = this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjCollectionViewPager.prototype.created = function () {
    };
    WjCollectionViewPager.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjCollectionViewPager.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjCollectionViewPager.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjCollectionViewPager;
}());
WjCollectionViewPager.meta = {
    outputs: exports.wjCollectionViewPagerMeta.outputs,
};
WjCollectionViewPager = WjCollectionViewPager_1 = __decorate([
    core_1.Component({
        selector: exports.wjCollectionViewPagerMeta.selector,
        template: exports.wjCollectionViewPagerMeta.template,
        inputs: exports.wjCollectionViewPagerMeta.inputs,
        outputs: exports.wjCollectionViewPagerMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjCollectionViewPager_1; }) }
        ].concat(exports.wjCollectionViewPagerMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjCollectionViewPager);
exports.WjCollectionViewPager = WjCollectionViewPager;
var moduleExports = [
    WjComboBox,
    WjAutoComplete,
    WjCalendar,
    WjColorPicker,
    WjInputMask,
    WjInputColor,
    WjMultiSelect,
    WjMultiAutoComplete,
    WjInputNumber,
    WjInputDate,
    WjInputTime,
    WjInputDateTime,
    WjListBox,
    WjMenu,
    WjMenuItem,
    WjMenuSeparator,
    WjItemTemplate,
    WjPopup,
    WjContextMenu,
    WjCollectionViewNavigator,
    WjCollectionViewPager
];
var WjInputModule = (function () {
    function WjInputModule() {
    }
    return WjInputModule;
}());
WjInputModule = __decorate([
    core_1.NgModule({
        imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
        declarations: moduleExports.concat([WjMenuItemTemplateDir]),
        exports: moduleExports.slice(),
    })
], WjInputModule);
exports.WjInputModule = WjInputModule;
var WjComboBox_1, WjAutoComplete_1, WjCalendar_1, WjColorPicker_1, WjInputMask_1, WjInputColor_1, WjMultiSelect_1, WjMultiAutoComplete_1, WjInputNumber_1, WjInputDate_1, WjInputTime_1, WjInputDateTime_1, WjListBox_1, WjMenu_1, WjMenuItem_1, WjMenuSeparator_1, WjItemTemplate_1, WjPopup_1, WjCollectionViewNavigator_1, WjCollectionViewPager_1;
