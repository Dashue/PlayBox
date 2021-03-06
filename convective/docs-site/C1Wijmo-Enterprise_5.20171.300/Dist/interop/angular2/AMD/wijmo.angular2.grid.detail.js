﻿/*
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
* Contains Angular 2 components for the <b>wijmo.grid.detail</b> module.
*
* <b>wijmo.angular2.grid.detail</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjDetail from 'wijmo/wijmo.angular2.grid.detail';
* import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjDetail.WjFlexGridDetail],
*     template: `
*       &lt;wj-flex-grid [itemsSource]="data"&gt;
*           &lt;template wjFlexGridDetail&gt;
*               Detail row content here...
*           &lt;/template&gt;
*       &lt;/wj-flex-grid&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.detail'/>
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
define("wijmo/wijmo.angular2.grid.detail", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexGridDetailMeta = {
        selector: '[wjFlexGridDetail]',
        inputs: [
            'wjFlexGridDetail',
            'maxHeight',
            'detailVisibilityMode',
            'rowHasDetail',
            'isAnimated',
        ],
        outputs: [
            'initialized',
        ],
        exportAs: 'wjFlexGridDetail',
        providers: []
    };
    /**
        * Angular 2 directive for @see:FlexGrid @see:DetailRow templates.
        *
        * The <b>wj-flex-grid-detail</b> directive must be specified on a <b>&lt;template&gt;</b>
        * template element contained in a <b>wj-flex-grid</b> component.
        *
        * The <b>wj-flex-grid-detail</b> directive is derived from the @see:FlexGridDetailProvider
        * class that maintains detail rows visibility, with detail rows content defined as
        * an arbitrary HTML fragment within the directive tag. The fragment may contain
        * Angular 2 bindings, components and directives.
        * The <b>row</b> and
        * <b>item</b> template variables can be used in Angular 2 bindings that refer to
        * the detail row's parent @see:Row and <b>Row.dataItem</b> objects.
        *
        */
    var WjFlexGridDetail = WjFlexGridDetail_1 = (function (_super) {
        __extends(WjFlexGridDetail, _super);
        function WjFlexGridDetail(elRef, injector, parentCmp, viewContainerRef, templateRef, domRenderer) {
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
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this._viewContainerRef = viewContainerRef;
            _this._templateRef = templateRef;
            _this._domRenderer = domRenderer;
            _this._init();
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
        WjFlexGridDetail.prototype.created = function () {
        };
        WjFlexGridDetail.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexGridDetail.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexGridDetail.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexGridDetail.prototype._init = function () {
            var _this = this;
            // show detail when asked to
            this.createDetailCell = function (row, col) {
                var templ = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(_this.grid.hostElement, _this._viewContainerRef, _this._templateRef, _this._domRenderer), viewRef = templ.viewRef, templRoot = templ.rootElement;
                //viewRef.setLocal('row', row);
                //viewRef.setLocal('col', col);
                //viewRef.setLocal('item', row.dataItem);
                viewRef.context.row = row;
                viewRef.context.col = col;
                viewRef.context.item = row.dataItem;
                templRoot.parentElement.removeChild(templRoot);
                templRoot[WjFlexGridDetail_1._viewRefProp] = viewRef;
                return templRoot;
            };
            // dispose detail scope when asked to
            this.disposeDetailCell = function (row) {
                var viewRef;
                if (row.detail && (viewRef = row.detail[WjFlexGridDetail_1._viewRefProp])) {
                    row.detail[WjFlexGridDetail_1._viewRefProp] = null;
                    var idx = _this._viewContainerRef.indexOf(viewRef);
                    if (idx > -1) {
                        _this._viewContainerRef.remove(idx);
                    }
                }
            };
        };
        return WjFlexGridDetail;
    }(wijmo.grid.detail.FlexGridDetailProvider));
    WjFlexGridDetail._viewRefProp = '__wj_viewRef';
    WjFlexGridDetail.meta = {
        outputs: exports.wjFlexGridDetailMeta.outputs,
    };
    WjFlexGridDetail = WjFlexGridDetail_1 = __decorate([
        core_2.Directive({
            selector: exports.wjFlexGridDetailMeta.selector,
            inputs: exports.wjFlexGridDetailMeta.inputs,
            outputs: exports.wjFlexGridDetailMeta.outputs,
            exportAs: exports.wjFlexGridDetailMeta.exportAs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridDetail_1; }) }
            ].concat(exports.wjFlexGridDetailMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
        __param(3, core_3.Inject(core_2.ViewContainerRef)),
        __param(4, core_3.Inject(core_2.TemplateRef)),
        __param(5, core_3.Inject(core_2.Renderer))
    ], WjFlexGridDetail);
    exports.WjFlexGridDetail = WjFlexGridDetail;
    var moduleExports = [
        WjFlexGridDetail
    ];
    var WjGridDetailModule = (function () {
        function WjGridDetailModule() {
        }
        return WjGridDetailModule;
    }());
    WjGridDetailModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjGridDetailModule);
    exports.WjGridDetailModule = WjGridDetailModule;
    var WjFlexGridDetail_1;
});
