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
* Contains Angular 2 components for the <b>wijmo.gauge</b> module.
*
* <b>wijmo.angular2.gauge</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjGauge from 'wijmo/wijmo.angular2.gauge';
* &nbsp;
* &#64;Component({
*     directives: [wjGauge.WjLinearGauge],
*     template: '&lt;wj-linear-gauge [(value)]="amount" [isReadOnly]="false"&gt;&lt;/wj-linear-gauge&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     amount = 0;
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.gauge'/>
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
exports.wjLinearGaugeMeta = {
    selector: 'wj-linear-gauge',
    template: "<div><ng-content></ng-content></div>",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'value',
        'min',
        'max',
        'origin',
        'isReadOnly',
        'step',
        'format',
        'thickness',
        'hasShadow',
        'isAnimated',
        'showText',
        'showTicks',
        'showRanges',
        'thumbSize',
        'tickSpacing',
        'getText',
        'direction',
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
 * Angular 2 component for the @see:wijmo.gauge.LinearGauge control.
 *
 * Use the <b>wj-linear-gauge</b> component to add <b>LinearGauge</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjLinearGauge</b> component is derived from the <b>LinearGauge</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-linear-gauge</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
*/
var WjLinearGauge = WjLinearGauge_1 = (function (_super) {
    __extends(WjLinearGauge, _super);
    function WjLinearGauge(elRef, injector, parentCmp) {
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
    WjLinearGauge.prototype.created = function () {
    };
    WjLinearGauge.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjLinearGauge.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjLinearGauge.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjLinearGauge;
}(wijmo.gauge.LinearGauge));
WjLinearGauge.meta = {
    outputs: exports.wjLinearGaugeMeta.outputs,
    changeEvents: {
        'valueChanged': ['value']
    },
};
WjLinearGauge = WjLinearGauge_1 = __decorate([
    core_1.Component({
        selector: exports.wjLinearGaugeMeta.selector,
        template: exports.wjLinearGaugeMeta.template,
        inputs: exports.wjLinearGaugeMeta.inputs,
        outputs: exports.wjLinearGaugeMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjLinearGauge_1; }) }
        ].concat(exports.wjLinearGaugeMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjLinearGauge);
exports.WjLinearGauge = WjLinearGauge;
exports.wjBulletGraphMeta = {
    selector: 'wj-bullet-graph',
    template: "<div><ng-content></ng-content></div>",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'value',
        'min',
        'max',
        'origin',
        'isReadOnly',
        'step',
        'format',
        'thickness',
        'hasShadow',
        'isAnimated',
        'showText',
        'showTicks',
        'showRanges',
        'thumbSize',
        'tickSpacing',
        'getText',
        'direction',
        'target',
        'good',
        'bad',
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
 * Angular 2 component for the @see:wijmo.gauge.BulletGraph control.
 *
 * Use the <b>wj-bullet-graph</b> component to add <b>BulletGraph</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjBulletGraph</b> component is derived from the <b>BulletGraph</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-bullet-graph</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
*/
var WjBulletGraph = WjBulletGraph_1 = (function (_super) {
    __extends(WjBulletGraph, _super);
    function WjBulletGraph(elRef, injector, parentCmp) {
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
    WjBulletGraph.prototype.created = function () {
    };
    WjBulletGraph.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjBulletGraph.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjBulletGraph.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjBulletGraph;
}(wijmo.gauge.BulletGraph));
WjBulletGraph.meta = {
    outputs: exports.wjBulletGraphMeta.outputs,
    changeEvents: {
        'valueChanged': ['value']
    },
};
WjBulletGraph = WjBulletGraph_1 = __decorate([
    core_1.Component({
        selector: exports.wjBulletGraphMeta.selector,
        template: exports.wjBulletGraphMeta.template,
        inputs: exports.wjBulletGraphMeta.inputs,
        outputs: exports.wjBulletGraphMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjBulletGraph_1; }) }
        ].concat(exports.wjBulletGraphMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjBulletGraph);
exports.WjBulletGraph = WjBulletGraph;
exports.wjRadialGaugeMeta = {
    selector: 'wj-radial-gauge',
    template: "<div><ng-content></ng-content></div>",
    inputs: [
        'wjModelProperty',
        'isDisabled',
        'value',
        'min',
        'max',
        'origin',
        'isReadOnly',
        'step',
        'format',
        'thickness',
        'hasShadow',
        'isAnimated',
        'showText',
        'showTicks',
        'showRanges',
        'thumbSize',
        'tickSpacing',
        'getText',
        'autoScale',
        'startAngle',
        'sweepAngle',
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
 * Angular 2 component for the @see:wijmo.gauge.RadialGauge control.
 *
 * Use the <b>wj-radial-gauge</b> component to add <b>RadialGauge</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjRadialGauge</b> component is derived from the <b>RadialGauge</b> control and
 * inherits all its properties, events and methods.
 *
 * The <b>wj-radial-gauge</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
*/
var WjRadialGauge = WjRadialGauge_1 = (function (_super) {
    __extends(WjRadialGauge, _super);
    function WjRadialGauge(elRef, injector, parentCmp) {
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
    WjRadialGauge.prototype.created = function () {
    };
    WjRadialGauge.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjRadialGauge.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjRadialGauge.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjRadialGauge;
}(wijmo.gauge.RadialGauge));
WjRadialGauge.meta = {
    outputs: exports.wjRadialGaugeMeta.outputs,
    changeEvents: {
        'valueChanged': ['value']
    },
};
WjRadialGauge = WjRadialGauge_1 = __decorate([
    core_1.Component({
        selector: exports.wjRadialGaugeMeta.selector,
        template: exports.wjRadialGaugeMeta.template,
        inputs: exports.wjRadialGaugeMeta.inputs,
        outputs: exports.wjRadialGaugeMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjRadialGauge_1; }) }
        ].concat(exports.wjRadialGaugeMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjRadialGauge);
exports.WjRadialGauge = WjRadialGauge;
exports.wjRangeMeta = {
    selector: 'wj-range',
    template: "",
    inputs: [
        'wjProperty',
        'color',
        'min',
        'max',
        'name',
        'thickness',
    ],
    outputs: [
        'initialized',
    ],
    providers: []
};
/**
 * Angular 2 component for the @see:wijmo.gauge.Range control.
 *
 * The <b>wj-range</b> component must be
 * contained in one of the following components:
 * @see:wijmo/wijmo.angular2.gauge.WjLinearGauge
 * , @see:wijmo/wijmo.angular2.gauge.WjBulletGraph
 *  or @see:wijmo/wijmo.angular2.gauge.WjRadialGauge.
 *
 * Use the <b>wj-range</b> component to add <b>Range</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
 * The <b>WjRange</b> component is derived from the <b>Range</b> control and
 * inherits all its properties, events and methods.
*/
var WjRange = WjRange_1 = (function (_super) {
    __extends(WjRange, _super);
    function WjRange(elRef, injector, parentCmp) {
        var _this = _super.call(this) || this;
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
         * Gets or sets a name of a property that this component is assigned to.
         * Default value is 'ranges'.
         */
        _this.wjProperty = 'ranges';
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
    WjRange.prototype.created = function () {
    };
    WjRange.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjRange.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjRange.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    return WjRange;
}(wijmo.gauge.Range));
WjRange.meta = {
    outputs: exports.wjRangeMeta.outputs,
};
WjRange = WjRange_1 = __decorate([
    core_1.Component({
        selector: exports.wjRangeMeta.selector,
        template: exports.wjRangeMeta.template,
        inputs: exports.wjRangeMeta.inputs,
        outputs: exports.wjRangeMeta.outputs,
        providers: [
            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjRange_1; }) }
        ].concat(exports.wjRangeMeta.providers)
    }),
    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
], WjRange);
exports.WjRange = WjRange;
var moduleExports = [
    WjLinearGauge,
    WjBulletGraph,
    WjRadialGauge,
    WjRange
];
var WjGaugeModule = (function () {
    function WjGaugeModule() {
    }
    return WjGaugeModule;
}());
WjGaugeModule = __decorate([
    core_1.NgModule({
        imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
        declarations: moduleExports.slice(),
        exports: moduleExports.slice(),
    })
], WjGaugeModule);
exports.WjGaugeModule = WjGaugeModule;
var WjLinearGauge_1, WjBulletGraph_1, WjRadialGauge_1, WjRange_1;
