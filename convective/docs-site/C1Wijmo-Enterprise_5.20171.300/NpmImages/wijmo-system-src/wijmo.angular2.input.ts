

import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcCore from 'wijmo/wijmo';



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


import { Component, EventEmitter, NgModule, AfterViewInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ElementRef, Injector, Directive, ViewContainerRef, TemplateRef, Optional, forwardRef, Renderer } from '@angular/core';
import { Input, Output, Injectable, Inject, OnInit, OnChanges, OnDestroy, AfterContentInit, SimpleChange, 
    ChangeDetectorRef, SkipSelf } from '@angular/core';
import { ChangeDetectionStrategy, Type, ViewEncapsulation, ComponentFactory, TypeDecorator } from '@angular/core';
import * as ngCore from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { WjDirectiveBehavior, WjDirectiveBaseModule, WjValueAccessorFactory, IWjComponentMetadata,
    IWjComponentMeta, IWjDirectiveMeta } from 'wijmo/wijmo.angular2.directiveBase';





export var wjComboBoxMeta: IWjComponentMeta = {
    selector: 'wj-combo-box',
    template: `<div><ng-content></ng-content></div>`,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjComboBoxMeta.selector,
    template: wjComboBoxMeta.template,
    inputs: wjComboBoxMeta.inputs,
    outputs: wjComboBoxMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjComboBox)},
        ...wjComboBoxMeta.providers
    ]
})
export class WjComboBox extends wjcInput.ComboBox implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjComboBoxMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'], 
            'textChanged': ['text'], 
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'selectedValue'.
     */
    wjModelProperty: string = 'selectedValue';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
     */
    isDroppedDownChangingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
     */
    isDroppedDownChangedNg = new EventEmitter(false);
    isDroppedDownChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
     */
    textChangedNg = new EventEmitter(false);
    textChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
     */
    formatItemNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
     */
    selectedIndexChangedNg = new EventEmitter(false);
    selectedIndexChangePC = new EventEmitter(false);
    selectedItemChangePC = new EventEmitter(false);
    selectedValueChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjAutoCompleteMeta: IWjComponentMeta = {
    selector: 'wj-auto-complete',
    template: ``,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjAutoCompleteMeta.selector,
    template: wjAutoCompleteMeta.template,
    inputs: wjAutoCompleteMeta.inputs,
    outputs: wjAutoCompleteMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjAutoComplete)},
        ...wjAutoCompleteMeta.providers
    ]
})
export class WjAutoComplete extends wjcInput.AutoComplete implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjAutoCompleteMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'], 
            'textChanged': ['text'], 
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'selectedValue'.
     */
    wjModelProperty: string = 'selectedValue';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
     */
    isDroppedDownChangingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
     */
    isDroppedDownChangedNg = new EventEmitter(false);
    isDroppedDownChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
     */
    textChangedNg = new EventEmitter(false);
    textChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
     */
    formatItemNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
     */
    selectedIndexChangedNg = new EventEmitter(false);
    selectedIndexChangePC = new EventEmitter(false);
    selectedItemChangePC = new EventEmitter(false);
    selectedValueChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjCalendarMeta: IWjComponentMeta = {
    selector: 'wj-calendar',
    template: ``,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjCalendarMeta.selector,
    template: wjCalendarMeta.template,
    inputs: wjCalendarMeta.inputs,
    outputs: wjCalendarMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjCalendar)},
        ...wjCalendarMeta.providers
    ]
})
export class WjCalendar extends wjcInput.Calendar implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjCalendarMeta.outputs,
        changeEvents: {
            'valueChanged': ['value'], 
            'displayMonthChanged': ['displayMonth']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'value'.
     */
    wjModelProperty: string = 'value';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
     */
    valueChangedNg = new EventEmitter(false);
    valueChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>displayMonthChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>displayMonthChanged</b> Wijmo event name.
     */
    displayMonthChangedNg = new EventEmitter(false);
    displayMonthChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
     */
    formatItemNg = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjColorPickerMeta: IWjComponentMeta = {
    selector: 'wj-color-picker',
    template: ``,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjColorPickerMeta.selector,
    template: wjColorPickerMeta.template,
    inputs: wjColorPickerMeta.inputs,
    outputs: wjColorPickerMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjColorPicker)},
        ...wjColorPickerMeta.providers
    ]
})
export class WjColorPicker extends wjcInput.ColorPicker implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjColorPickerMeta.outputs,
        changeEvents: {
            'valueChanged': ['value']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'value'.
     */
    wjModelProperty: string = 'value';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
     */
    valueChangedNg = new EventEmitter(false);
    valueChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjInputMaskMeta: IWjComponentMeta = {
    selector: 'wj-input-mask',
    template: ``,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjInputMaskMeta.selector,
    template: wjInputMaskMeta.template,
    inputs: wjInputMaskMeta.inputs,
    outputs: wjInputMaskMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjInputMask)},
        ...wjInputMaskMeta.providers
    ]
})
export class WjInputMask extends wjcInput.InputMask implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjInputMaskMeta.outputs,
        changeEvents: {
            'valueChanged': ['rawValue', 'value']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'value'.
     */
    wjModelProperty: string = 'value';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
     */
    valueChangedNg = new EventEmitter(false);
    rawValueChangePC = new EventEmitter(false);
    valueChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjInputColorMeta: IWjComponentMeta = {
    selector: 'wj-input-color',
    template: ``,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjInputColorMeta.selector,
    template: wjInputColorMeta.template,
    inputs: wjInputColorMeta.inputs,
    outputs: wjInputColorMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjInputColor)},
        ...wjInputColorMeta.providers
    ]
})
export class WjInputColor extends wjcInput.InputColor implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjInputColorMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'], 
            'textChanged': ['text'], 
            'valueChanged': ['value']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'value'.
     */
    wjModelProperty: string = 'value';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
     */
    isDroppedDownChangingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
     */
    isDroppedDownChangedNg = new EventEmitter(false);
    isDroppedDownChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
     */
    textChangedNg = new EventEmitter(false);
    textChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
     */
    valueChangedNg = new EventEmitter(false);
    valueChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjMultiSelectMeta: IWjComponentMeta = {
    selector: 'wj-multi-select',
    template: `<div><ng-content></ng-content></div>`,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjMultiSelectMeta.selector,
    template: wjMultiSelectMeta.template,
    inputs: wjMultiSelectMeta.inputs,
    outputs: wjMultiSelectMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjMultiSelect)},
        ...wjMultiSelectMeta.providers
    ]
})
export class WjMultiSelect extends wjcInput.MultiSelect implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjMultiSelectMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'], 
            'textChanged': ['text'], 
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'], 
            'checkedItemsChanged': ['checkedItems']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'checkedItems'.
     */
    wjModelProperty: string = 'checkedItems';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
     */
    isDroppedDownChangingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
     */
    isDroppedDownChangedNg = new EventEmitter(false);
    isDroppedDownChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
     */
    textChangedNg = new EventEmitter(false);
    textChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
     */
    formatItemNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
     */
    selectedIndexChangedNg = new EventEmitter(false);
    selectedIndexChangePC = new EventEmitter(false);
    selectedItemChangePC = new EventEmitter(false);
    selectedValueChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>checkedItemsChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>checkedItemsChanged</b> Wijmo event name.
     */
    checkedItemsChangedNg = new EventEmitter(false);
    checkedItemsChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjMultiAutoCompleteMeta: IWjComponentMeta = {
    selector: 'wj-multi-auto-complete',
    template: ``,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjMultiAutoCompleteMeta.selector,
    template: wjMultiAutoCompleteMeta.template,
    inputs: wjMultiAutoCompleteMeta.inputs,
    outputs: wjMultiAutoCompleteMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjMultiAutoComplete)},
        ...wjMultiAutoCompleteMeta.providers
    ]
})
export class WjMultiAutoComplete extends wjcInput.MultiAutoComplete implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjMultiAutoCompleteMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'], 
            'textChanged': ['text'], 
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'], 
            'selectedItemsChanged': ['selectedItems']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'selectedItems'.
     */
    wjModelProperty: string = 'selectedItems';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
     */
    isDroppedDownChangingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
     */
    isDroppedDownChangedNg = new EventEmitter(false);
    isDroppedDownChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
     */
    textChangedNg = new EventEmitter(false);
    textChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
     */
    formatItemNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
     */
    selectedIndexChangedNg = new EventEmitter(false);
    selectedIndexChangePC = new EventEmitter(false);
    selectedItemChangePC = new EventEmitter(false);
    selectedValueChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectedItemsChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectedItemsChanged</b> Wijmo event name.
     */
    selectedItemsChangedNg = new EventEmitter(false);
    selectedItemsChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjInputNumberMeta: IWjComponentMeta = {
    selector: 'wj-input-number',
    template: ``,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjInputNumberMeta.selector,
    template: wjInputNumberMeta.template,
    inputs: wjInputNumberMeta.inputs,
    outputs: wjInputNumberMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjInputNumber)},
        ...wjInputNumberMeta.providers
    ]
})
export class WjInputNumber extends wjcInput.InputNumber implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjInputNumberMeta.outputs,
        changeEvents: {
            'valueChanged': ['value'], 
            'textChanged': ['text']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'value'.
     */
    wjModelProperty: string = 'value';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
     */
    valueChangedNg = new EventEmitter(false);
    valueChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
     */
    textChangedNg = new EventEmitter(false);
    textChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjInputDateMeta: IWjComponentMeta = {
    selector: 'wj-input-date',
    template: ``,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjInputDateMeta.selector,
    template: wjInputDateMeta.template,
    inputs: wjInputDateMeta.inputs,
    outputs: wjInputDateMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjInputDate)},
        ...wjInputDateMeta.providers
    ]
})
export class WjInputDate extends wjcInput.InputDate implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjInputDateMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'], 
            'textChanged': ['text'], 
            'valueChanged': ['value']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'value'.
     */
    wjModelProperty: string = 'value';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
     */
    isDroppedDownChangingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
     */
    isDroppedDownChangedNg = new EventEmitter(false);
    isDroppedDownChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
     */
    textChangedNg = new EventEmitter(false);
    textChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
     */
    valueChangedNg = new EventEmitter(false);
    valueChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjInputTimeMeta: IWjComponentMeta = {
    selector: 'wj-input-time',
    template: ``,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjInputTimeMeta.selector,
    template: wjInputTimeMeta.template,
    inputs: wjInputTimeMeta.inputs,
    outputs: wjInputTimeMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjInputTime)},
        ...wjInputTimeMeta.providers
    ]
})
export class WjInputTime extends wjcInput.InputTime implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjInputTimeMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'], 
            'textChanged': ['text'], 
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'], 
            'valueChanged': ['value']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'value'.
     */
    wjModelProperty: string = 'value';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
     */
    isDroppedDownChangingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
     */
    isDroppedDownChangedNg = new EventEmitter(false);
    isDroppedDownChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
     */
    textChangedNg = new EventEmitter(false);
    textChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
     */
    formatItemNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
     */
    selectedIndexChangedNg = new EventEmitter(false);
    selectedIndexChangePC = new EventEmitter(false);
    selectedItemChangePC = new EventEmitter(false);
    selectedValueChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
     */
    valueChangedNg = new EventEmitter(false);
    valueChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjInputDateTimeMeta: IWjComponentMeta = {
    selector: 'wj-input-date-time',
    template: ``,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjInputDateTimeMeta.selector,
    template: wjInputDateTimeMeta.template,
    inputs: wjInputDateTimeMeta.inputs,
    outputs: wjInputDateTimeMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjInputDateTime)},
        ...wjInputDateTimeMeta.providers
    ]
})
export class WjInputDateTime extends wjcInput.InputDateTime implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjInputDateTimeMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'], 
            'textChanged': ['text'], 
            'valueChanged': ['value']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'value'.
     */
    wjModelProperty: string = 'value';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
     */
    isDroppedDownChangingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
     */
    isDroppedDownChangedNg = new EventEmitter(false);
    isDroppedDownChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
     */
    textChangedNg = new EventEmitter(false);
    textChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
     */
    valueChangedNg = new EventEmitter(false);
    valueChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjListBoxMeta: IWjComponentMeta = {
    selector: 'wj-list-box',
    template: `<div><ng-content></ng-content></div>`,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjListBoxMeta.selector,
    template: wjListBoxMeta.template,
    inputs: wjListBoxMeta.inputs,
    outputs: wjListBoxMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjListBox)},
        ...wjListBoxMeta.providers
    ]
})
export class WjListBox extends wjcInput.ListBox implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjListBoxMeta.outputs,
        changeEvents: {
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'], 
            'checkedItemsChanged': ['checkedItems']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'selectedValue'.
     */
    wjModelProperty: string = 'selectedValue';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
     */
    formatItemNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>itemsChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>itemsChanged</b> Wijmo event name.
     */
    itemsChangedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>itemChecked</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>itemChecked</b> Wijmo event name.
     */
    itemCheckedNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
     */
    selectedIndexChangedNg = new EventEmitter(false);
    selectedIndexChangePC = new EventEmitter(false);
    selectedItemChangePC = new EventEmitter(false);
    selectedValueChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>checkedItemsChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>checkedItemsChanged</b> Wijmo event name.
     */
    checkedItemsChangedNg = new EventEmitter(false);
    checkedItemsChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



export var wjMenuMeta: IWjComponentMeta = {
    selector: 'wj-menu',
    template: `<div><ng-content></ng-content></div>`,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjMenuMeta.selector,
    template: wjMenuMeta.template,
    inputs: wjMenuMeta.inputs,
    outputs: wjMenuMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjMenu)},
        ...wjMenuMeta.providers
    ]
})
export class WjMenu extends wjcInput.Menu implements OnInit, OnDestroy, AfterViewInit, OnChanges, AfterContentInit {
    private _value: any;
    private _definedHeader;

    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjMenuMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'], 
            'textChanged': ['text'], 
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'], 
            'itemClicked': ['value']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is 'selectedValue'.
     */
    wjModelProperty: string = 'selectedValue';
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
     */
    isDroppedDownChangingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
     */
    isDroppedDownChangedNg = new EventEmitter(false);
    isDroppedDownChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
     */
    textChangedNg = new EventEmitter(false);
    textChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
     */
    formatItemNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
     */
    selectedIndexChangedNg = new EventEmitter(false);
    selectedIndexChangePC = new EventEmitter(false);
    selectedItemChangePC = new EventEmitter(false);
    selectedValueChangePC = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>itemClicked</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>itemClicked</b> Wijmo event name.
     */
    itemClickedNg = new EventEmitter(false);
    valueChangePC = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.itemsSource = new wjcCore.ObservableArray();
        this.selectedIndex = 0;
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        
        this._wjBehaviour.ngOnInit();
        this._attachToControl();
        this._updateHeader();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        
        this._wjBehaviour.ngOnDestroy();
        this.listBox.formatItem.removeHandler(this._fmtItem, this);
        this.listBox.loadingItems.removeHandler(this._loadingItems, this);
    }

    get value(): any {
        return this._value;
    }
    set value(value: any) {
        //if (this._value != value) {
            this._value = value;
            if (value != null) {
                this.selectedValue = value;
                this._updateHeader();
            }
            //this._cdRef.markForCheck();
            //this._appRef.tick();
        //}
    }

    ngOnChanges(changes: { [key: string]: ngCore.SimpleChange }) {
        var headerChange = changes['header'];
        if (headerChange) {
            this._definedHeader = headerChange.currentValue;
            this._updateHeader();
        }
    }

    ngAfterContentInit() {
        // to force correct selectedValue and header update
        this.value = this.value;
        //this._updateHeader();

        ////this.itemClicked.addHandler(() => {
        //this.selectedIndexChanged.addHandler(() => {
        //    this.value = this.selectedValue;
        //});
    }

    onItemClicked(e?: wjcCore.EventArgs) {
        // assign value before triggering the event, otherwise Ng 'valueChange' will be called with an
        // old 'value' value and two-way binding's source will receive an old value.
        this.value = this.selectedValue;
        super.onItemClicked(e);
    }

    refresh(fullUpdate = true) {
        super.refresh(fullUpdate);
        this._updateHeader();
    }

    private _attachToControl(): void {
        this.listBox.formatItem.addHandler(this._fmtItem, this);
        this.listBox.loadingItems.addHandler(this._loadingItems, this);

        //if (this.parent._isInitialized) {
        //    ownerControl.invalidate();
        this.invalidate();
    }

    private _loadingItems(s: wjcCore.Control) {
        //TBD: will this destroy Wijmo directives in templates?
        //this.viewContainerRef.clear();
        var items = s.hostElement.getElementsByClassName('wj-listbox-item');
        for (let i = items.length - 1; i >= 0; i--) {
            let itemEl = items[i];
            itemEl.textContent = '';
        }
    }

    private _fmtItem(s: wjcCore.Control, e: wjcInput.FormatItemEventArgs) {
        if (!(e.data instanceof WjMenuItem)) {
            return;
        }
        let itemEl = e.item;
        itemEl.textContent = '';
        let menuItem = <WjMenuItem>e.data,
            contentRoot = menuItem.contentRoot;
        if (contentRoot) {
            itemEl.appendChild(contentRoot);
            menuItem.added(itemEl);
        }
    }

    // if the scope has a value, show it in the header
    private _updateHeader() {
        this.header = this._definedHeader || '';
        var selItem = this.selectedItem;
        if (this.value != null && selItem && this.displayMemberPath) {
            let currentValue = null;
            if (selItem instanceof WjMenuItem) {
                let contentRoot = (<WjMenuItem>selItem).contentRoot;
                if (contentRoot) {
                    currentValue = contentRoot.innerHTML;
                } else {
                    currentValue = selItem[this.displayMemberPath];
                }
            }
            if (currentValue != null) {
                this.header += ': <b>' + currentValue + '</b>';
            }
        }
    }
 
}




export var wjMenuItemMeta: IWjComponentMeta = {
    selector: 'wj-menu-item',
    template: 
`<div *wjMenuItemTemplateDir><ng-content></ng-content></div>`,
    inputs: [
        'wjProperty',
        'value',
        'cmd',
        'cmdParam',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
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
@Component({
    selector: wjMenuItemMeta.selector,
    template: wjMenuItemMeta.template,
    inputs: wjMenuItemMeta.inputs,
    outputs: wjMenuItemMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjMenuItem)},
        ...wjMenuItemMeta.providers
    ]
})
export class WjMenuItem implements OnInit, OnDestroy, AfterViewInit {
    value: string;
    cmd: string;
    cmdParam: string;
    header: string;
    _ownerMenu: wjcInput.Menu;
    templateDir: WjMenuItemTemplateDir;
    contentRoot: HTMLElement;

    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjMenuItemMeta.outputs,
        siblingId: 'menuItemDir',
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Gets or sets a name of a property that this component is assigned to. 
     * Default value is 'itemsSource'.
     */
    wjProperty: string = 'itemsSource';

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any, 
            @Inject(ViewContainerRef) private viewContainerRef: ViewContainerRef, 
            @Inject(Renderer) private domRenderer: Renderer) {
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this._ownerMenu = <wjcInput.Menu>behavior.parentBehavior.directive;
        this.created();
    }
    

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        
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
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    }

    added(toItem: HTMLElement) {
    }
 
}

@Directive({
    selector: '[wjMenuItemTemplateDir]',
    inputs: ['wjMenuItemTemplateDir']
})
export class WjMenuItemTemplateDir implements ngCore.AfterContentInit {
    wjMenuItemTemplateDir: any;
    ownerItem: WjMenuItem;
    contentRoot: HTMLElement;

    constructor( @Inject(ViewContainerRef) public viewContainerRef: ViewContainerRef,
        @Inject(TemplateRef) @Optional() public templateRef: TemplateRef<any>,
        @Inject(ElementRef) public elRef: ElementRef,
        @Inject(Injector) injector: Injector,
        @Inject(Renderer) private domRenderer: Renderer,
        @Inject(WjMenuItem) @Optional() menuItem: WjMenuItem,
        @Inject(forwardRef(()=> WjMenuSeparator)) @Optional() menuSeparator: WjMenuSeparator) {

        this.ownerItem = menuItem || menuSeparator;
        this.ownerItem.templateDir = this;
    }

    ngAfterContentInit() {
        var self = this;
        //Without timeout, we get "LifeCycle.tick is called recursively" exception.
        //this.ngZone.run(() => {
            setTimeout(() => {
                var rootEl = WjDirectiveBehavior.instantiateTemplate(null, self.viewContainerRef, self.templateRef,
                    self.domRenderer, true).rootElement;
                self.contentRoot = <HTMLElement>rootEl;
                self.ownerItem.contentRoot = <HTMLElement>rootEl;
                self.ownerItem._ownerMenu.listBox.invalidate();
                self.ownerItem._ownerMenu.invalidate();
            }, 0);
        //});
    }
}




export var wjMenuSeparatorMeta: IWjComponentMeta = {
    selector: 'wj-menu-separator',
    template: 
`<div *wjMenuItemTemplateDir class="wj-state-disabled" style="width:100%;height:1px;background-color:lightgray"></div>`,
    inputs: [
        'wjProperty',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
    ]
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
@Component({
    selector: wjMenuSeparatorMeta.selector,
    template: wjMenuSeparatorMeta.template,
    inputs: wjMenuSeparatorMeta.inputs,
    outputs: wjMenuSeparatorMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjMenuSeparator)},
        ...wjMenuSeparatorMeta.providers
    ]
})
export class WjMenuSeparator extends WjMenuItem implements OnInit, OnDestroy, AfterViewInit {

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any, 
            @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef, 
            @Inject(Renderer) domRenderer: Renderer) {
        super(elRef, injector, parentCmp, viewContainerRef, domRenderer);
        this.created();
    }

    added(toItem: HTMLElement) {
        // prevent item selection
        wjcCore.addClass(toItem, 'wj-state-disabled');
    } 
}



export var wjItemTemplateMeta: IWjDirectiveMeta = {
    selector: '[wjItemTemplate]',
    inputs: [
        'wjItemTemplate',
    ],
    outputs: [
        'initialized',
    ],
    exportAs: 'wjItemTemplate',
	providers: [
    ]
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
@Directive({
    selector: wjItemTemplateMeta.selector,
    inputs: wjItemTemplateMeta.inputs,
    outputs: wjItemTemplateMeta.outputs,
    exportAs: wjItemTemplateMeta.exportAs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjItemTemplate)},
        ...wjItemTemplateMeta.providers
    ]
})
export class WjItemTemplate implements OnInit, OnDestroy, AfterViewInit {
    wjItemTemplate: any;
    ownerControl: wjcCore.Control;
    listBox: wjcInput.ListBox;
    private _cdRef: ChangeDetectorRef;

    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjItemTemplateMeta.outputs,
        parentRefProperty: 'owner',
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any, 
            @Inject(ViewContainerRef) public viewContainerRef: ViewContainerRef,
            @Inject(TemplateRef) @Optional() public templateRef: TemplateRef<any>,
            @Inject(Renderer) private domRenderer: Renderer,
            @Inject(ChangeDetectorRef) cdRef: ChangeDetectorRef) {
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.ownerControl = <wjcCore.Control>behavior.parentBehavior.directive;
        this.listBox = WjItemTemplate._getListBox(this.ownerControl);
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
    created() {
    }
    
    ngOnInit() {
        
        this._wjBehaviour.ngOnInit();
        this._attachToControl();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        var ownerControl = this.ownerControl,
            listBox = this.listBox;
        if (listBox) {
            listBox.formatItem.removeHandler(this._fmtItem, this);
            listBox.loadingItems.removeHandler(this._loadingItems, this);
        }
        if (ownerControl) {
            ownerControl.invalidate();
        }
    }

    private _attachToControl(): void {
        this.listBox.formatItem.addHandler(this._fmtItem, this);
        this.listBox.loadingItems.addHandler(this._loadingItems, this);

        //if (this.parent._isInitialized) {
        //    ownerControl.invalidate();
        this.ownerControl.invalidate();
    }

    private _loadingItems(s: wjcCore.Control) {
        //TBD: will this destroy Wijmo directives in templates?
        this.viewContainerRef.clear();
    }

    private _fmtItem(s: wjcCore.Control, e: wjcInput.FormatItemEventArgs) {
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
    }

    private _instantiateTemplate(parent: HTMLElement): ngCore.EmbeddedViewRef<any> {
        return WjDirectiveBehavior.instantiateTemplate(parent, this.viewContainerRef, this.templateRef,
            this.domRenderer).viewRef;
    }

    // Gets a ListBox control whose items are templated, it maybe the control itself or internal ListBox used by controls like
    // ComboBox.
    private static _getListBox(ownerControl: any): wjcInput.ListBox {
        if (ownerControl) {
            return ownerControl instanceof wjcInput.ListBox ? ownerControl : ownerControl.listBox;
        }
        return null;
    }
 
}



export var wjPopupMeta: IWjComponentMeta = {
    selector: 'wj-popup',
    template: 
`<div><ng-content></ng-content></div>`,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjPopupMeta.selector,
    template: wjPopupMeta.template,
    inputs: wjPopupMeta.inputs,
    outputs: wjPopupMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjPopup)},
        ...wjPopupMeta.providers
    ]
})
export class WjPopup extends wjcInput.Popup implements OnInit, OnDestroy, AfterViewInit, OnChanges {
    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjPopupMeta.outputs,
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is ''.
     */
    wjModelProperty: string;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>showing</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>showing</b> Wijmo event name.
     */
    showingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>shown</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>shown</b> Wijmo event name.
     */
    shownNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>hiding</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>hiding</b> Wijmo event name.
     */
    hidingNg = new EventEmitter(false);
    /**
     * Angular (EventEmitter) version of the Wijmo <b>hidden</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>hidden</b> Wijmo event name.
     */
    hiddenNg = new EventEmitter(false);

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    }

    ngOnChanges(changes: { [key: string]: ngCore.SimpleChange }) {
        var ownerChange = changes['owner'];
        if (ownerChange) {
            if (this.modal == null) {
                this.modal = this.owner ? false : true;
            }
        }
    }

    dispose() {
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
        super.dispose();
    }
 
}


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
@Directive({
    selector: '[wjContextMenu]',
    inputs: ['wjContextMenu'],
    exportAs: 'wjContextMenu',
    host: { '(contextmenu)': 'onContextMenu($event)' }
})
export class WjContextMenu {
    wjContextMenu: wjcInput.Menu;

    constructor( @Inject(ElementRef) private elRef: ElementRef) {
    }

    onContextMenu(e: MouseEvent) {
        var menu = this.wjContextMenu,
            dropDown = menu.dropDown;
        if (menu && dropDown && !wjcCore.closest(e.target, '[disabled]')) {
            e.preventDefault();
            menu.owner = this.elRef.nativeElement;
            menu.selectedIndex = -1;
            if (menu.onIsDroppedDownChanging(new wjcCore.CancelEventArgs())) {
                wjcCore.showPopup(dropDown, e);
                menu.onIsDroppedDownChanged();
                dropDown.focus();
            }
        }
    }
}




export var wjCollectionViewNavigatorMeta: IWjComponentMeta = {
    selector: 'wj-collection-view-navigator',
    template: 
           `<div class="wj-control wj-content wj-pager">
                <div class="wj-input-group">
                    <span class="wj-input-group-btn" >
                        <button class="wj-btn wj-btn-default" type="button"
                           (click)="cv.moveCurrentToFirst()"
                           [disabled]="!cv || cv?.currentPosition <= 0">
                            <span class="wj-glyph-left" style="margin-right: -4px;"></span>
                            <span class="wj-glyph-left"></span>
                         </button>
                    </span>
                    <span class="wj-input-group-btn" >
                       <button class="wj-btn wj-btn-default" type="button"
                           (click)="cv.moveCurrentToPrevious()"
                           [disabled]="!cv || cv?.currentPosition <= 0">
                            <span class="wj-glyph-left"></span>
                       </button>
                    </span>
                    <input type="text" class="wj-form-control" 
                           value="{{cv?.currentPosition + 1 | number}} / {{cv?.itemCount | number}}" 
                           disabled />
                    <span class="wj-input-group-btn" >
                        <button class="wj-btn wj-btn-default" type="button"
                           (click)="cv.moveCurrentToNext()"
                           [disabled]="!cv || cv?.currentPosition >= cv?.itemCount - 1">
                            <span class="wj-glyph-right"></span>
                        </button>
                    </span>
                    <span class="wj-input-group-btn" >
                        <button class="wj-btn wj-btn-default" type="button"
                           (click)="cv.moveCurrentToLast()"
                           [disabled]="!cv || cv?.currentPosition >= cv?.itemCount - 1">
                            <span class="wj-glyph-right"></span>
                            <span class="wj-glyph-right" style="margin-left: -4px;"></span>
                        </button>
                    </span>
                </div>
            </div>`
,
    inputs: [
        'wjModelProperty',
        'cv',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
        {
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjCollectionViewNavigatorMeta.selector,
    template: wjCollectionViewNavigatorMeta.template,
    inputs: wjCollectionViewNavigatorMeta.inputs,
    outputs: wjCollectionViewNavigatorMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjCollectionViewNavigator)},
        ...wjCollectionViewNavigatorMeta.providers
    ]
})
export class WjCollectionViewNavigator implements OnInit, OnDestroy, AfterViewInit {
    cv: wjcCore.CollectionView;

    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjCollectionViewNavigatorMeta.outputs,
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is ''.
     */
    wjModelProperty: string;

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    }
 
}



export var wjCollectionViewPagerMeta: IWjComponentMeta = {
    selector: 'wj-collection-view-pager',
    template: 
           `<div class="wj-control wj-content wj-pager" >
                <div class="wj-input-group">
                    <span class="wj-input-group-btn" >
                        <button class="wj-btn wj-btn-default" type="button"
                            (click)="cv.moveToFirstPage()"
                            [disabled]="!cv || cv?.pageIndex <= 0">
                            <span class="wj-glyph-left" style="margin-right: -4px;"></span>
                            <span class="wj-glyph-left"></span>
                        </button>
                    </span>
                    <span class="wj-input-group-btn" >
                    <button class="wj-btn wj-btn-default" type="button"
                            (click)="cv.moveToPreviousPage()"
                            [disabled]="!cv || cv?.pageIndex <= 0">
                            <span class="wj-glyph-left"></span>
                        </button>
                    </span>
                    <input type="text" class="wj-form-control" 
                           value="{{cv?.pageIndex + 1 | number}} / {{cv?.pageCount | number}}" 
                           disabled />
                    <span class="wj-input-group-btn" >
                        <button class="wj-btn wj-btn-default" type="button"
                            (click)="cv.moveToNextPage()"
                            [disabled]="!cv || cv?.pageIndex >= cv?.pageCount - 1">
                            <span class="wj-glyph-right"></span>
                        </button>
                    </span>
                    <span class="wj-input-group-btn" >
                        <button class="wj-btn wj-btn-default" type="button"
                            (click)="cv.moveToLastPage()"
                            [disabled]="!cv || cv?.pageIndex >= cv?.pageCount - 1">
                            <span class="wj-glyph-right"></span>
                            <span class="wj-glyph-right" style="margin-left: -4px;"></span>
                        </button>
                    </span>
                </div>
            </div>`
,
    inputs: [
        'wjModelProperty',
        'cv',
    ],
    outputs: [
        'initialized',
    ],
	providers: [
        {
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
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
@Component({
    selector: wjCollectionViewPagerMeta.selector,
    template: wjCollectionViewPagerMeta.template,
    inputs: wjCollectionViewPagerMeta.inputs,
    outputs: wjCollectionViewPagerMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjCollectionViewPager)},
        ...wjCollectionViewPagerMeta.providers
    ]
})
export class WjCollectionViewPager implements OnInit, OnDestroy, AfterViewInit {
    cv: wjcCore.CollectionView;

    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjCollectionViewPagerMeta.outputs,
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized = new EventEmitter(true);
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is ''.
     */
    wjModelProperty: string;

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    }
 
}



let moduleExports = [
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
    WjCollectionViewPager];
@NgModule({
    imports: [WjDirectiveBaseModule, CommonModule],
    declarations: [...moduleExports, WjMenuItemTemplateDir],
    exports: [...moduleExports],
})
export class WjInputModule {
}
