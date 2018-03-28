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
* Contains Angular 2 components for the <b>wijmo.grid.filter</b> module.
*
* <b>wijmo.angular2.grid.filter</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjFilter from 'wijmo/wijmo.angular2.grid.filter';
* import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjFilter.WjFlexGridFilter],
*     template: `
*       &lt;wj-flex-grid [itemsSource]="data"&gt;
*           &lt;wj-flex-grid-filter [filterColumns]="['country', 'expenses']"&gt;&lt;/wj-flex-grid-filter&gt;
*       &lt;/wj-flex-grid&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.filter'/>
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
define("wijmo/wijmo.angular2.grid.filter", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexGridFilterMeta = {
        selector: 'wj-flex-grid-filter',
        template: "",
        inputs: [
            'wjProperty',
            'showFilterIcons',
            'showSortButtons',
            'defaultFilterType',
            'filterColumns',
        ],
        outputs: [
            'initialized',
            'filterChangingNg: filterChanging',
            'filterChangedNg: filterChanged',
            'filterAppliedNg: filterApplied',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.filter.FlexGridFilter control.
     *
     * The <b>wj-flex-grid-filter</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
     *
     * Use the <b>wj-flex-grid-filter</b> component to add <b>FlexGridFilter</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexGridFilter</b> component is derived from the <b>FlexGridFilter</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexGridFilter = WjFlexGridFilter_1 = (function (_super) {
        __extends(WjFlexGridFilter, _super);
        function WjFlexGridFilter(elRef, injector, parentCmp) {
            var _this = _super.call(this, parentCmp) || this;
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
             * Angular (EventEmitter) version of the Wijmo <b>filterChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>filterChanging</b> Wijmo event name.
             */
            _this.filterChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>filterChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>filterChanged</b> Wijmo event name.
             */
            _this.filterChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>filterApplied</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>filterApplied</b> Wijmo event name.
             */
            _this.filterAppliedNg = new core_1.EventEmitter(false);
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
        WjFlexGridFilter.prototype.created = function () {
        };
        WjFlexGridFilter.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexGridFilter.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexGridFilter.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexGridFilter;
    }(wijmo.grid.filter.FlexGridFilter));
    WjFlexGridFilter.meta = {
        outputs: exports.wjFlexGridFilterMeta.outputs,
    };
    WjFlexGridFilter = WjFlexGridFilter_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexGridFilterMeta.selector,
            template: exports.wjFlexGridFilterMeta.template,
            inputs: exports.wjFlexGridFilterMeta.inputs,
            outputs: exports.wjFlexGridFilterMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridFilter_1; }) }
            ].concat(exports.wjFlexGridFilterMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexGridFilter);
    exports.WjFlexGridFilter = WjFlexGridFilter;
    var moduleExports = [
        WjFlexGridFilter
    ];
    var WjGridFilterModule = (function () {
        function WjGridFilterModule() {
        }
        return WjGridFilterModule;
    }());
    WjGridFilterModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjGridFilterModule);
    exports.WjGridFilterModule = WjGridFilterModule;
    var WjFlexGridFilter_1;
});
