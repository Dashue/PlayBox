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
* Contains Angular 2 components for the <b>wijmo.nav</b> module.
*
* <b>wijmo.angular2.nav</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjNav from 'wijmo/wijmo.angular2.nav';
* &nbsp;
* &#64;Component({
*     directives: [wjNav.WjTreeView],
*     template: `
*       &lt;wj-tree-view [itemsSource]="items" [displayMemberPath]="'header'" [childItemsPath]="'items'"&gt;
*       &lt;/wj-tree-view;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.nav'/>
System.register("wijmo/wijmo.angular2.nav", ["@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1, wjTreeViewMeta, WjTreeView, moduleExports, WjNavModule, WjTreeView_1;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
                core_3 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (wijmo_angular2_directiveBase_1_1) {
                wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1;
            }
        ],
        execute: function () {
            /**
            * Contains Angular 2 components for the <b>wijmo.nav</b> module.
            *
            * <b>wijmo.angular2.nav</b> is an external TypeScript module that can be imported to your code
            * using its ambient module name. For example:
            *
            * <pre>import * as wjNav from 'wijmo/wijmo.angular2.nav';
            * &nbsp;
            * &#64;Component({
            *     directives: [wjNav.WjTreeView],
            *     template: `
            *       &lt;wj-tree-view [itemsSource]="items" [displayMemberPath]="'header'" [childItemsPath]="'items'"&gt;
            *       &lt;/wj-tree-view;`,
            *     selector: 'my-cmp',
            * })
            * export class MyCmp {
            *     data: any[];
            * }</pre>
            *
            */
            ///<amd-module name='wijmo/wijmo.angular2.nav'/>
            exports_1("wjTreeViewMeta", wjTreeViewMeta = {
                selector: 'wj-tree-view',
                template: "",
                inputs: [
                    'wjModelProperty',
                    'isDisabled',
                    'childItemsPath',
                    'displayMemberPath',
                    'imageMemberPath',
                    'isContentHtml',
                    'showCheckboxes',
                    'autoCollapse',
                    'isAnimated',
                    'isReadOnly',
                    'allowDragging',
                    'expandOnClick',
                    'lazyLoadFunction',
                    'itemsSource',
                    'selectedItem',
                    'selectedNode',
                    'checkedItems',
                ],
                outputs: [
                    'initialized',
                    'gotFocusNg: gotFocus',
                    'lostFocusNg: lostFocus',
                    'itemsSourceChangedNg: itemsSourceChanged',
                    'loadingItemsNg: loadingItems',
                    'loadedItemsNg: loadedItems',
                    'itemClickedNg: itemClicked',
                    'selectedItemChangedNg: selectedItemChanged',
                    'selectedItemChangePC: selectedItemChange',
                    'selectedNodeChangePC: selectedNodeChange',
                    'checkedItemsChangedNg: checkedItemsChanged',
                    'checkedItemsChangePC: checkedItemsChange',
                    'isCollapsedChangingNg: isCollapsedChanging',
                    'isCollapsedChangedNg: isCollapsedChanged',
                    'isCheckedChangingNg: isCheckedChanging',
                    'isCheckedChangedNg: isCheckedChanged',
                    'formatItemNg: formatItem',
                    'dragStartNg: dragStart',
                    'dragOverNg: dragOver',
                    'dropNg: drop',
                    'dragEndNg: dragEnd',
                    'nodeEditStartingNg: nodeEditStarting',
                    'nodeEditStartedNg: nodeEditStarted',
                    'nodeEditEndingNg: nodeEditEnding',
                    'nodeEditEndedNg: nodeEditEnded',
                ],
                providers: [
                    {
                        provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                        deps: ['WjComponent']
                    }
                ]
            });
            WjTreeView = WjTreeView_1 = (function (_super) {
                __extends(WjTreeView, _super);
                function WjTreeView(elRef, injector, parentCmp) {
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
                     * Angular (EventEmitter) version of the Wijmo <b>itemsSourceChanged</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>itemsSourceChanged</b> Wijmo event name.
                     */
                    _this.itemsSourceChangedNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>loadingItems</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>loadingItems</b> Wijmo event name.
                     */
                    _this.loadingItemsNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>loadedItems</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>loadedItems</b> Wijmo event name.
                     */
                    _this.loadedItemsNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>itemClicked</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>itemClicked</b> Wijmo event name.
                     */
                    _this.itemClickedNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>selectedItemChanged</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>selectedItemChanged</b> Wijmo event name.
                     */
                    _this.selectedItemChangedNg = new core_1.EventEmitter(false);
                    _this.selectedItemChangePC = new core_1.EventEmitter(false);
                    _this.selectedNodeChangePC = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>checkedItemsChanged</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>checkedItemsChanged</b> Wijmo event name.
                     */
                    _this.checkedItemsChangedNg = new core_1.EventEmitter(false);
                    _this.checkedItemsChangePC = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>isCollapsedChanging</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>isCollapsedChanging</b> Wijmo event name.
                     */
                    _this.isCollapsedChangingNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>isCollapsedChanged</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>isCollapsedChanged</b> Wijmo event name.
                     */
                    _this.isCollapsedChangedNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>isCheckedChanging</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>isCheckedChanging</b> Wijmo event name.
                     */
                    _this.isCheckedChangingNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>isCheckedChanged</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>isCheckedChanged</b> Wijmo event name.
                     */
                    _this.isCheckedChangedNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
                     */
                    _this.formatItemNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>dragStart</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>dragStart</b> Wijmo event name.
                     */
                    _this.dragStartNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>dragOver</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>dragOver</b> Wijmo event name.
                     */
                    _this.dragOverNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>drop</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>drop</b> Wijmo event name.
                     */
                    _this.dropNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>dragEnd</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>dragEnd</b> Wijmo event name.
                     */
                    _this.dragEndNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>nodeEditStarting</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>nodeEditStarting</b> Wijmo event name.
                     */
                    _this.nodeEditStartingNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>nodeEditStarted</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>nodeEditStarted</b> Wijmo event name.
                     */
                    _this.nodeEditStartedNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>nodeEditEnding</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>nodeEditEnding</b> Wijmo event name.
                     */
                    _this.nodeEditEndingNg = new core_1.EventEmitter(false);
                    /**
                     * Angular (EventEmitter) version of the Wijmo <b>nodeEditEnded</b> event for programmatic access.
                     * Use this event name if you want to subscribe to the Angular version of the event in code.
                     * In template bindings use the conventional <b>nodeEditEnded</b> Wijmo event name.
                     */
                    _this.nodeEditEndedNg = new core_1.EventEmitter(false);
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
                WjTreeView.prototype.created = function () {
                };
                WjTreeView.prototype.ngOnInit = function () {
                    this._wjBehaviour.ngOnInit();
                };
                WjTreeView.prototype.ngAfterViewInit = function () {
                    this._wjBehaviour.ngAfterViewInit();
                };
                WjTreeView.prototype.ngOnDestroy = function () {
                    this._wjBehaviour.ngOnDestroy();
                };
                return WjTreeView;
            }(wijmo.nav.TreeView));
            WjTreeView.meta = {
                outputs: wjTreeViewMeta.outputs,
                changeEvents: {
                    'selectedItemChanged': ['selectedItem', 'selectedNode'],
                    'checkedItemsChanged': ['checkedItems']
                },
            };
            WjTreeView = WjTreeView_1 = __decorate([
                core_1.Component({
                    selector: wjTreeViewMeta.selector,
                    template: wjTreeViewMeta.template,
                    inputs: wjTreeViewMeta.inputs,
                    outputs: wjTreeViewMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjTreeView_1; }) }
                    ].concat(wjTreeViewMeta.providers)
                }),
                __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
            ], WjTreeView);
            exports_1("WjTreeView", WjTreeView);
            moduleExports = [
                WjTreeView
            ];
            WjNavModule = (function () {
                function WjNavModule() {
                }
                return WjNavModule;
            }());
            WjNavModule = __decorate([
                core_1.NgModule({
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                })
            ], WjNavModule);
            exports_1("WjNavModule", WjNavModule);
        }
    };
});
