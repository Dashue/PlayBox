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
System.register(["wijmo/wijmo.nav", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function(exports_1, context_1)
{
"use strict";
var __extends=this && this.__extends || function()
{
var extendStatics=Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d, b)
{
d.__proto__ = b
} || function(d, b)
{
for (var p in b)
b.hasOwnProperty(p) && (d[p] = b[p])
};
return function(d, b)
{
function __()
{
this.constructor = d
}
extendStatics(d, b);
d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __)
}
}(),
__moduleName=context_1 && context_1.id,
wjcNav,
core_1,
core_2,
core_3,
common_1,
forms_1,
wijmo_angular2_directiveBase_1,
wjTreeViewMeta,
WjTreeView,
moduleExports,
WjNavModule;
return {
setters: [function(wjcNav_1)
{
wjcNav = wjcNav_1
}, function(core_1_1)
{
core_1 = core_1_1;
core_2 = core_1_1;
core_3 = core_1_1
}, function(common_1_1)
{
common_1 = common_1_1
}, function(forms_1_1)
{
forms_1 = forms_1_1
}, function(wijmo_angular2_directiveBase_1_1)
{
wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1
}], execute: function()
{
exports_1("wjTreeViewMeta", wjTreeViewMeta = {
selector: 'wj-tree-view', template: "", inputs: ['wjModelProperty', 'isDisabled', 'childItemsPath', 'displayMemberPath', 'imageMemberPath', 'isContentHtml', 'showCheckboxes', 'autoCollapse', 'isAnimated', 'isReadOnly', 'allowDragging', 'expandOnClick', 'lazyLoadFunction', 'itemsSource', 'selectedItem', 'selectedNode', 'checkedItems', ], outputs: ['initialized', 'gotFocusNg: gotFocus', 'lostFocusNg: lostFocus', 'itemsSourceChangedNg: itemsSourceChanged', 'loadingItemsNg: loadingItems', 'loadedItemsNg: loadedItems', 'itemClickedNg: itemClicked', 'selectedItemChangedNg: selectedItemChanged', 'selectedItemChangePC: selectedItemChange', 'selectedNodeChangePC: selectedNodeChange', 'checkedItemsChangedNg: checkedItemsChanged', 'checkedItemsChangePC: checkedItemsChange', 'isCollapsedChangingNg: isCollapsedChanging', 'isCollapsedChangedNg: isCollapsedChanged', 'isCheckedChangingNg: isCheckedChanging', 'isCheckedChangedNg: isCheckedChanged', 'formatItemNg: formatItem', 'dragStartNg: dragStart', 'dragOverNg: dragOver', 'dropNg: drop', 'dragEndNg: dragEnd', 'nodeEditStartingNg: nodeEditStarting', 'nodeEditStartedNg: nodeEditStarted', 'nodeEditEndingNg: nodeEditEnding', 'nodeEditEndedNg: nodeEditEnded', ], providers: [{
provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: !0, deps: ['WjComponent']
}]
});
WjTreeView = function(_super)
{
function WjTreeView(elRef, injector, parentCmp)
{
var _this=_super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef)) || this,
behavior;
return _this.isInitialized = !1, _this.initialized = new core_1.EventEmitter(!0), _this.gotFocusNg = new core_1.EventEmitter(!1), _this.lostFocusNg = new core_1.EventEmitter(!1), _this.itemsSourceChangedNg = new core_1.EventEmitter(!1), _this.loadingItemsNg = new core_1.EventEmitter(!1), _this.loadedItemsNg = new core_1.EventEmitter(!1), _this.itemClickedNg = new core_1.EventEmitter(!1), _this.selectedItemChangedNg = new core_1.EventEmitter(!1), _this.selectedItemChangePC = new core_1.EventEmitter(!1), _this.selectedNodeChangePC = new core_1.EventEmitter(!1), _this.checkedItemsChangedNg = new core_1.EventEmitter(!1), _this.checkedItemsChangePC = new core_1.EventEmitter(!1), _this.isCollapsedChangingNg = new core_1.EventEmitter(!1), _this.isCollapsedChangedNg = new core_1.EventEmitter(!1), _this.isCheckedChangingNg = new core_1.EventEmitter(!1), _this.isCheckedChangedNg = new core_1.EventEmitter(!1), _this.formatItemNg = new core_1.EventEmitter(!1), _this.dragStartNg = new core_1.EventEmitter(!1), _this.dragOverNg = new core_1.EventEmitter(!1), _this.dropNg = new core_1.EventEmitter(!1), _this.dragEndNg = new core_1.EventEmitter(!1), _this.nodeEditStartingNg = new core_1.EventEmitter(!1), _this.nodeEditStartedNg = new core_1.EventEmitter(!1), _this.nodeEditEndingNg = new core_1.EventEmitter(!1), _this.nodeEditEndedNg = new core_1.EventEmitter(!1), behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp), _this.created(), _this
}
return __extends(WjTreeView, _super), WjTreeView.prototype.created = function(){}, WjTreeView.prototype.ngOnInit = function()
{
this._wjBehaviour.ngOnInit()
}, WjTreeView.prototype.ngAfterViewInit = function()
{
this._wjBehaviour.ngAfterViewInit()
}, WjTreeView.prototype.ngOnDestroy = function()
{
this._wjBehaviour.ngOnDestroy()
}, WjTreeView
}(wjcNav.TreeView);
WjTreeView.meta = {
outputs: wjTreeViewMeta.outputs, changeEvents: {
selectedItemChanged: ['selectedItem', 'selectedNode'], checkedItemsChanged: ['checkedItems']
}
};
WjTreeView.decorators = [{
type: core_1.Component, args: [{
selector: wjTreeViewMeta.selector, template: wjTreeViewMeta.template, inputs: wjTreeViewMeta.inputs, outputs: wjTreeViewMeta.outputs, providers: [{
provide: 'WjComponent', useExisting: core_2.forwardRef(function()
{
return WjTreeView
})
}].concat(wjTreeViewMeta.providers)
}, ]
}, ];
WjTreeView.ctorParameters = function()
{
return [{
type: core_2.ElementRef, decorators: [{
type: core_3.Inject, args: [core_2.ElementRef, ]
}, ]
}, {
type: core_2.Injector, decorators: [{
type: core_3.Inject, args: [core_2.Injector, ]
}, ]
}, {
type: undefined, decorators: [{
type: core_3.Inject, args: ['WjComponent', ]
}, {type: core_3.SkipSelf}, {type: core_2.Optional}, ]
}, ]
};
exports_1("WjTreeView", WjTreeView);
moduleExports = [WjTreeView];
WjNavModule = function()
{
function WjNavModule(){}
return WjNavModule
}();
WjNavModule.decorators = [{
type: core_1.NgModule, args: [{
imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule], declarations: moduleExports.slice(), exports: moduleExports.slice()
}, ]
}, ];
WjNavModule.ctorParameters = function()
{
return []
};
exports_1("WjNavModule", WjNavModule)
}
}
})