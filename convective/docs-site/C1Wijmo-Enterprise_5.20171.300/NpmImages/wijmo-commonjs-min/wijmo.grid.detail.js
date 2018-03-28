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
"use strict";var __extends=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}}(),DetailVisibilityMode,FlexGridDetailProvider,DetailMergeManager,DetailRow;Object.defineProperty(exports,"__esModule",{value:!0});var wjcGrid=require("wijmo/wijmo.grid"),wjcCore=require("wijmo/wijmo"),wjcSelf=require("wijmo/wijmo.grid.detail");window.wijmo=window.wijmo||{};window.wijmo.grid=window.wijmo.grid||{};window.wijmo.grid.detail=wjcSelf,function(n){n[n.Code=0]="Code";n[n.Selection=1]="Selection";n[n.ExpandSingle=2]="ExpandSingle";n[n.ExpandMulti=3]="ExpandMulti"}(DetailVisibilityMode=exports.DetailVisibilityMode||(exports.DetailVisibilityMode={}));FlexGridDetailProvider=function(){function n(n,t){var i=this;this._mode=DetailVisibilityMode.ExpandSingle;this._animated=!1;this._g=n;n.mergeManager=new DetailMergeManager(n);n.rowHeaders.hostElement.addEventListener('click',this._hdrClick.bind(this));n.formatItem.addHandler(this._formatItem,this);n.selectionChanged.addHandler(this._selectionChanged,this);n.resizedRow.addHandler(this._resizedRow,this);n.loadingRows.addHandler(function(){i.hideDetail()});n.draggingRow.addHandler(function(n,t){t.row<n.rows.length-1&&n.rows[t.row+1]instanceof DetailRow&&(t.cancel=!0,i.hideDetail(t.row))});n.formatItem.addHandler(function(n,t){if(t.panel==n.cells){var i=n.rows[t.row];i instanceof DetailRow&&(t.cell.style.left='0')}});t&&wjcCore.copy(this,t)}return Object.defineProperty(n.prototype,"grid",{get:function(){return this._g},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"detailVisibilityMode",{get:function(){return this._mode},set:function(n){n!=this._mode&&(this._mode=wjcCore.asEnum(n,DetailVisibilityMode),this.hideDetail(),this._g.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"maxHeight",{get:function(){return this._maxHeight},set:function(n){this._maxHeight=wjcCore.asNumber(n,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"isAnimated",{get:function(){return this._animated},set:function(n){n!=this._animated&&(this._animated=wjcCore.asBoolean(n))},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"createDetailCell",{get:function(){return this._createDetailCellFn},set:function(n){this._createDetailCellFn=wjcCore.asFunction(n,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"disposeDetailCell",{get:function(){return this._disposeDetailCellFn},set:function(n){this._disposeDetailCellFn=wjcCore.asFunction(n,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"rowHasDetail",{get:function(){return this._rowHasDetailFn},set:function(n){this._rowHasDetailFn=wjcCore.asFunction(n,!0)},enumerable:!0,configurable:!0}),n.prototype.isDetailVisible=function(n){var t=this._g.rows;return(n=this._toIndex(n),t[n]instanceof DetailRow)?!0:n<t.length-1&&t[n+1]instanceof DetailRow?!0:!1},n.prototype.isDetailAvailable=function(n){var t=this._g.rows;return n=this._toIndex(n),this._hasDetail(n)},n.prototype.hideDetail=function(n){var t=this._g.rows,i,r;if(n==null){for(i=0;i<t.length;i++)t[i]instanceof DetailRow&&this.hideDetail(i);return}n=this._toIndex(n);!(t[n]instanceof DetailRow)&&n<t.length-1&&t[n+1]instanceof DetailRow&&n++;r=t[n];r instanceof DetailRow&&(this.disposeDetailCell&&this.disposeDetailCell(r),wjcCore.Control.disposeAll(r.detail),t.removeAt(n))},n.prototype.showDetail=function(n,t){var e,i,o,s,r,u,f;if(t===void 0&&(t=!1),e=this._g,i=e.rows,n=this._toIndex(n),n>0&&i[n]instanceof DetailRow&&n--,t){for(o=e.selection,s=!1,r=0;r<i.length-1;r++)r!=n&&i[r+1]instanceof DetailRow&&(this.hideDetail(r),r<n&&n--,r<o.row&&(o.row--,o.row2--,s=!0));s&&e.select(o,!1)}!this.isDetailVisible(n)&&this._hasDetail(n)&&(u=new DetailRow(i[n]),u.detail=this._createDetailCell(i[n]),u.detail&&(this._animated?(f=u.detail.style,f.transform='translateY(-100%)',f.opacity='0',i.insert(n+1,u),wjcCore.animate(function(t){t<1?(f.transform='translateY('+(-(1-t)*100).toFixed(0)+'%)',f.opacity=(t*t).toString()):(f.transform='',f.opacity='',wjcCore.Control.invalidateAll(u.detail),e.scrollIntoView(n,-1))})):(i.insert(n+1,u),e.scrollIntoView(n,-1))))},n.prototype._toIndex=function(n){return n instanceof wjcGrid.Row&&(n=n.index),wjcCore.asNumber(n,!1,!0)},n.prototype._hdrClick=function(n){var i,t,r;if(!n.defaultPrevented)switch(this._mode){case DetailVisibilityMode.ExpandMulti:case DetailVisibilityMode.ExpandSingle:i=this._g;t=i.hitTest(n);t.row>-1&&(r=i.rows[t.row],this.isDetailVisible(t.row)?this.hideDetail(t.row):(i.select(new wjcGrid.CellRange(t.row,0,t.row,i.columns.length-1)),this.showDetail(t.row,this._mode==DetailVisibilityMode.ExpandSingle)),n.preventDefault())}},n.prototype._selectionChanged=function(n){var t=this;this._mode==DetailVisibilityMode.Selection&&(this._toSel&&clearTimeout(this._toSel),this._toSel=setTimeout(function(){n.selection.row>-1?t.showDetail(n.selection.row,!0):t.hideDetail()},300))},n.prototype._formatItem=function(n,t){var r=this._g,i=t.panel.rows[t.row],e,u,f,o;t.panel==r.cells&&i instanceof DetailRow&&i.detail!=null&&(wjcCore.addClass(t.cell,'wj-detail'),t.cell.textContent='',t.cell.style.textAlign='',t.cell.appendChild(i.detail),i.height==null?(wjcCore.Control.refreshAll(t.cell),e=getComputedStyle(t.cell),u=i.detail.scrollHeight+parseInt(e.paddingTop)+parseInt(e.paddingBottom),this._maxHeight>0&&u>this._maxHeight&&(u=this._maxHeight),i.height=u,i.detail.style.height||(i.detail.style.height='100%'),f=i.detail.querySelector('.wj-flexgrid'),f&&!f.style.height&&(f.style.height='100%')):setTimeout(function(){wjcCore.Control.refreshAll(i.detail)}));(this._mode==DetailVisibilityMode.ExpandMulti||this._mode==DetailVisibilityMode.ExpandSingle)&&t.panel==r.rowHeaders&&t.col==0&&this._hasDetail(t.row)&&(o=t.row<r.rows.length-1&&r.rows[t.row+1]instanceof DetailRow,t.cell.innerHTML=o?'<span class="wj-glyph-minus"></span>':'<span class="wj-glyph-plus"></span>')},n.prototype._resizedRow=function(n,t){var i=t.panel.rows[t.row];i instanceof DetailRow&&i.detail&&wjcCore.Control.refreshAll(i.detail)},n.prototype._hasVisibleDetail=function(n){return n instanceof DetailRow||n instanceof wjcGrid.GroupRow||n instanceof wjcGrid._NewRowTemplate?!1:!0},n.prototype._hasDetail=function(n){return wjcCore.isFunction(this._rowHasDetailFn)?this._rowHasDetailFn(this._g.rows[n]):!0},n.prototype._createDetailCell=function(n,t){return this.createDetailCell?this.createDetailCell(n,t):null},n}();exports.FlexGridDetailProvider=FlexGridDetailProvider;DetailMergeManager=function(n){function t(t){return n.call(this,t)||this}return __extends(t,n),t.prototype.getMergedRange=function(t,i,r,u){u===void 0&&(u=!0);switch(t.cellType){case wjcGrid.CellType.Cell:if(t.rows[i]instanceof DetailRow)return new wjcGrid.CellRange(i,0,i,t.columns.length-1);break;case wjcGrid.CellType.RowHeader:if(t.rows[i]instanceof DetailRow)return new wjcGrid.CellRange(i-1,r,i,r);if(i<t.rows.length-1&&t.rows[i+1]instanceof DetailRow)return new wjcGrid.CellRange(i,r,i+1,r)}return n.prototype.getMergedRange.call(this,t,i,r,u)},t}(wjcGrid.MergeManager);exports.DetailMergeManager=DetailMergeManager;DetailRow=function(n){function t(){var t=n.call(this)||this;return t.isReadOnly=!0,t}return __extends(t,n),Object.defineProperty(t.prototype,"detail",{get:function(){return this._detail},set:function(n){this._detail=n},enumerable:!0,configurable:!0}),t}(wjcGrid.Row);exports.DetailRow=DetailRow