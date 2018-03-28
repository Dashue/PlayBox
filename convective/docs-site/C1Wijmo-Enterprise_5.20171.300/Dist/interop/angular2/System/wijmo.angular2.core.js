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
* Contains Angular 2 components for the <b>wijmo</b> module.
*
* <b>wijmo.angular2.core</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjCore from 'wijmo/wijmo.angular2.core';
* &nbsp;
* &#64;Component({
*     directives: [wjCore.WjTooltip],
*     template: '&lt;span [wjTooltip]="'Greeting'"&gt;Hello&lt;/span&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.core'/>
System.register("wijmo/wijmo.angular2.core", ["@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, core_2, core_3, ngCore, common_1, wijmo_angular2_directiveBase_1, wjTooltipMeta, WjTooltip, WjComponentLoader, moduleExports, WjCoreModule, WjTooltip_1;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
                core_3 = core_1_1;
                ngCore = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (wijmo_angular2_directiveBase_1_1) {
                wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1;
            }
        ],
        execute: function () {
            /**
            * Contains Angular 2 components for the <b>wijmo</b> module.
            *
            * <b>wijmo.angular2.core</b> is an external TypeScript module that can be imported to your code
            * using its ambient module name. For example:
            *
            * <pre>import * as wjCore from 'wijmo/wijmo.angular2.core';
            * &nbsp;
            * &#64;Component({
            *     directives: [wjCore.WjTooltip],
            *     template: '&lt;span [wjTooltip]="'Greeting'"&gt;Hello&lt;/span&gt;',
            *     selector: 'my-cmp',
            * })
            * export class MyCmp {
            * }</pre>
            *
            */
            ///<amd-module name='wijmo/wijmo.angular2.core'/>
            exports_1("wjTooltipMeta", wjTooltipMeta = {
                selector: '[wjTooltip]',
                inputs: [],
                outputs: [
                    'initialized',
                ],
                exportAs: 'wjTooltip',
                providers: []
            });
            WjTooltip = WjTooltip_1 = (function () {
                function WjTooltip(elRef, injector, parentCmp) {
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
                    this._elRef = elRef;
                    if (!WjTooltip_1._toolTip) {
                        WjTooltip_1._toolTip = new wijmo.Tooltip();
                    }
                    this.created();
                }
                /**
                 * If you create a custom component inherited from a Wijmo component, you can override this
                 * method and perform necessary initializations that you usually do in a class constructor.
                 * This method is called in the last line of a Wijmo component constructor and allows you
                 * to not declare your custom component's constructor at all, thus preventing you from a necessity
                 * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
                 */
                WjTooltip.prototype.created = function () {
                };
                WjTooltip.prototype.ngOnInit = function () {
                    this._wjBehaviour.ngOnInit();
                };
                WjTooltip.prototype.ngAfterViewInit = function () {
                    this._wjBehaviour.ngAfterViewInit();
                };
                WjTooltip.prototype.ngOnDestroy = function () {
                    this._wjBehaviour.ngOnDestroy();
                    this.wjTooltip = null;
                };
                Object.defineProperty(WjTooltip.prototype, "wjTooltip", {
                    get: function () {
                        return this._toolTipText;
                    },
                    set: function (value) {
                        if (this._toolTipText != value) {
                            this._toolTipText != value;
                            WjTooltip_1._toolTip.setTooltip(this._elRef.nativeElement, value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return WjTooltip;
            }());
            WjTooltip.meta = {
                outputs: wjTooltipMeta.outputs,
            };
            __decorate([
                core_3.Input()
            ], WjTooltip.prototype, "wjTooltip", null);
            WjTooltip = WjTooltip_1 = __decorate([
                core_2.Directive({
                    selector: wjTooltipMeta.selector,
                    inputs: wjTooltipMeta.inputs,
                    outputs: wjTooltipMeta.outputs,
                    exportAs: wjTooltipMeta.exportAs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjTooltip_1; }) }
                    ].concat(wjTooltipMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjTooltip);
            exports_1("WjTooltip", WjTooltip);
            WjComponentLoader = (function () {
                function WjComponentLoader(/*@Inject(DynamicComponentLoader) private _dcl: DynamicComponentLoader,*/ _cmpResolver, _elementRef) {
                    this._cmpResolver = _cmpResolver;
                    this._elementRef = _elementRef;
                    this._isViewInit = false;
                    this.propertiesChange = new ngCore.EventEmitter();
                }
                Object.defineProperty(WjComponentLoader.prototype, "component", {
                    get: function () {
                        return this._component;
                    },
                    set: function (value) {
                        if (this._component !== value) {
                            this._component = value;
                            this._createComponent();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WjComponentLoader.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    set: function (value) {
                        this._properties = value;
                        this._updateProperties();
                    },
                    enumerable: true,
                    configurable: true
                });
                WjComponentLoader.prototype.ngAfterViewInit = function () {
                    this._isViewInit = true;
                    this._createComponent();
                };
                WjComponentLoader.prototype._createComponent = function () {
                    if (this._isViewInit) {
                        if (this._cmpRef) {
                            this._cmpRef.destroy();
                            this._cmpRef = null;
                        }
                        var value = this._component;
                        if (value && this._anchor) {
                            //this._dcl.loadNextToLocation(value, this._anchor).then((cmpRef) => {
                            //    this._cmpRef = cmpRef;
                            //    this._updateProperties();
                            //});
                            this._cmpRef = this._anchor.createComponent(this._cmpResolver.resolveComponentFactory(value));
                            this._updateProperties();
                        }
                    }
                };
                WjComponentLoader.prototype._updateProperties = function () {
                    var cmp = this._cmpRef && this._cmpRef.instance, properties = this.properties;
                    if (cmp && properties) {
                        var propNames = Object.getOwnPropertyNames(properties);
                        for (var _i = 0, propNames_1 = propNames; _i < propNames_1.length; _i++) {
                            var pName = propNames_1[_i];
                            cmp[pName] = properties[pName];
                            var propChange = cmp[pName + 'Change'];
                            if (propChange instanceof core_1.EventEmitter) {
                                //TBD: unsubscribe
                                this._addPropListener(cmp, pName, propChange);
                            }
                        }
                    }
                };
                WjComponentLoader.prototype._addPropListener = function (component, propName, propChange) {
                    var _this = this;
                    propChange.subscribe(function (data) {
                        _this.properties[propName] =
                            _this.properties[propName] = component[propName];
                        _this.propertiesChange.next(_this.properties);
                    });
                };
                return WjComponentLoader;
            }());
            __decorate([
                core_1.ViewChild('anchor', { read: core_2.ViewContainerRef })
            ], WjComponentLoader.prototype, "_anchor", void 0);
            WjComponentLoader = __decorate([
                core_1.Component({
                    selector: 'wj-component-loader',
                    template: "<div #anchor></div>",
                    inputs: ['component', 'properties'],
                    outputs: ['propertiesChange']
                }),
                __param(0, core_3.Inject(core_1.ComponentFactoryResolver)),
                __param(1, core_3.Inject(core_2.ElementRef))
            ], WjComponentLoader);
            exports_1("WjComponentLoader", WjComponentLoader);
            moduleExports = [
                WjTooltip, WjComponentLoader
            ];
            WjCoreModule = (function () {
                function WjCoreModule() {
                }
                return WjCoreModule;
            }());
            WjCoreModule = __decorate([
                core_1.NgModule({
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                })
            ], WjCoreModule);
            exports_1("WjCoreModule", WjCoreModule);
        }
    };
});
