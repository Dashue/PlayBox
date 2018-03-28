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
"use strict";var __extends=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}}(),ValueFilter,ValueFilterEditor,ConditionFilter,ConditionFilterEditor,FilterCondition,Operator,ColumnFilter,ColumnFilterEditor,FilterType,FlexGridFilter;Object.defineProperty(exports,"__esModule",{value:!0});var wjcGrid=require("wijmo/wijmo.grid"),wjcCore=require("wijmo/wijmo"),wjcInput=require("wijmo/wijmo.input"),wjcSelf=require("wijmo/wijmo.grid.filter");window.wijmo=window.wijmo||{};window.wijmo.grid=window.wijmo.grid||{};window.wijmo.grid.filter=wjcSelf;ValueFilter=function(){function n(n){this._maxValues=250;this._sortValues=!0;this._col=n;this._bnd=n.binding?new wjcCore.Binding(n.binding):null}return Object.defineProperty(n.prototype,"showValues",{get:function(){return this._values},set:function(n){this._values=n},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"filterText",{get:function(){return this._filterText},set:function(n){this._filterText=wjcCore.asString(n)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"maxValues",{get:function(){return this._maxValues},set:function(n){this._maxValues=wjcCore.asNumber(n,!1,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"uniqueValues",{get:function(){return this._uniqueValues},set:function(n){this._uniqueValues=wjcCore.asArray(n)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"sortValues",{get:function(){return this._sortValues},set:function(n){this._sortValues=wjcCore.asBoolean(n)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"dataMap",{get:function(){return this._map},set:function(n){this._map=wjcCore.asType(n,wjcGrid.DataMap,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"column",{get:function(){return this._col},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"isActive",{get:function(){return this._values!=null&&Object.keys(this._values).length>0},enumerable:!0,configurable:!0}),n.prototype.apply=function(n){var t=this.column;return!this._bnd||!this._values||!Object.keys(this._values).length?!0:(n=this._bnd.getValue(n),n=this.dataMap?this.dataMap.getDisplayValue(n):t.dataMap?t.dataMap.getDisplayValue(n):wjcCore.Globalize.format(n,t.format),this._values[n]!=undefined)},n.prototype.clear=function(){this.showValues=null;this.filterText=null},n.prototype.implementsInterface=function(n){return n=='IColumnFilter'},n}();exports.ValueFilter=ValueFilter;ValueFilterEditor=function(n){function t(t,i){var r=n.call(this,t)||this,u,f,e;return r._filter=wjcCore.asType(i,ValueFilter,!1),u=r.getTemplate(),r.applyTemplate('wj-control',u,{_divFilter:'div-filter',_cbSelectAll:'cb-select-all',_spSelectAll:'sp-select-all',_divValues:'div-values'}),r._spSelectAll.textContent=wjcCore.culture.FlexGridFilter.selectAll,r._view=new wjcCore.CollectionView,i.sortValues&&(f=i.column.dataMap||i.dataMap?'text':'value',e=i.column.dataType!=wjcCore.DataType.Boolean,r._view.sortDescriptions.push(new wjcCore.SortDescription(f,e))),r._view.filter=r._filterValues.bind(r),r._view.collectionChanged.addHandler(r._updateSelectAllCheck,r),r._filterText='',r._cmbFilter=new wjcInput.ComboBox(r._divFilter,{placeholder:wjcCore.culture.FlexGridFilter.search}),r._lbValues=new wjcInput.ListBox(r._divValues,{displayMemberPath:'text',checkedMemberPath:'show',itemsSource:r._view,itemFormatter:function(n,t){return t?t:wjcCore.culture.FlexGridFilter.null}}),r._cmbFilter.textChanged.addHandler(r._filterTextChanged,r),r._cbSelectAll.addEventListener('click',r._cbSelectAllClicked.bind(r)),r.updateEditor(),r}return __extends(t,n),Object.defineProperty(t.prototype,"filter",{get:function(){return this._filter},enumerable:!0,configurable:!0}),t.prototype.updateEditor=function(){var n=this;setTimeout(function(){n._updateEditor()})},t.prototype._updateEditor=function(){var i=this._filter.column,t=[],s,l,h,r,e,o,a,n;if(this._lbValues.isContentHtml=i.isContentHtml,this._view.pageSize=this._filter.maxValues,this._view.sourceCollection=t,this._filter.uniqueValues)for(s=this._filter.uniqueValues,n=0;n<s.length;n++)r=s[n],t.push({value:r,text:r.toString()});else{var c={},u=i.collectionView?i.collectionView.sourceCollection:[],f=i.collectionView;if(f&&f.sourceCollection&&f.filter){for(l=this._filter.showValues,this._filter.showValues=null,h=[],n=0;n<u.length;n++)f.filter(u[n])&&h.push(u[n]);u=h;this._filter.showValues=l}for(n=0;n<u.length;n++)r=i._binding.getValue(u[n]),e=this._filter.dataMap?this._filter.dataMap.getDisplayValue(r):i.dataMap?i.dataMap.getDisplayValue(r):wjcCore.Globalize.format(r,i.format),c[e]||(c[e]=!0,t.push({value:r,text:e}),t.length>5&&this._view.items.length==0&&(this._view.refresh(),this._lbValues.refresh()))}if(o=this._filter.showValues,o&&Object.keys(o).length!=0){for(a in o)for(n=0;n<t.length;n++)if(t[n].text==a){t[n].show=!0;break}}else for(n=0;n<t.length;n++)t[n].show=!0;this._cmbFilter.text=this._filter.filterText;this._filterText=this._cmbFilter.text.toLowerCase();this._view.refresh();this._view.moveCurrentToPosition(-1)},t.prototype.clearEditor=function(){var t,n;for(this._cmbFilter.text='',this._filterText='',this._view.refresh(),t=this._view.items,n=0;n<t.length;n++)t[n].show=!1},t.prototype.updateFilter=function(){var t=null,r=this._view.items,n,i;if(this._filterText||this._cbSelectAll.indeterminate)for(t={},n=0;n<r.length;n++)i=r[n],i.show&&(t[i.text]=!0);this._filter.showValues=t;this._filter.filterText=this._filterText},t.prototype._filterTextChanged=function(){var n=this;this._toText&&clearTimeout(this._toText);this._toText=setTimeout(function(){var t=n._cmbFilter.text.toLowerCase();t!=n._filterText&&(n._filterText=t,n._view.refresh(),n._cbSelectAll.checked=!0,n._cbSelectAllClicked())},500)},t.prototype._filterValues=function(n){return this._filterText?n&&n.text?n.text.toLowerCase().indexOf(this._filterText)>-1:!1:!0},t.prototype._cbSelectAllClicked=function(){for(var i=this._cbSelectAll.checked,t=this._view.items,n=0;n<t.length;n++)t[n].show=i;this._view.refresh()},t.prototype._updateSelectAllCheck=function(){for(var n=0,t=this._view.items,i=0;i<t.length;i++)t[i].show&&n++;n==0?(this._cbSelectAll.checked=!1,this._cbSelectAll.indeterminate=!1):n==t.length?(this._cbSelectAll.checked=!0,this._cbSelectAll.indeterminate=!1):this._cbSelectAll.indeterminate=!0},t}(wjcCore.Control);ValueFilterEditor.controlTemplate='<div><div wj-part="div-filter"><\/div><div class="wj-listbox-item"><label><input wj-part="cb-select-all" type="checkbox"> <span wj-part="sp-select-all"><\/span><\/label><\/div><div wj-part="div-values" style="height:150px"><\/div><\/div>';exports.ValueFilterEditor=ValueFilterEditor;ConditionFilter=function(){function n(n){this._c1=new FilterCondition;this._c2=new FilterCondition;this._and=!0;this._col=n;this._bnd=n.binding?new wjcCore.Binding(n.binding):null}return Object.defineProperty(n.prototype,"condition1",{get:function(){return this._c1},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"condition2",{get:function(){return this._c2},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"and",{get:function(){return this._and},set:function(n){this._and=wjcCore.asBoolean(n);this._bnd=this._col&&this._col.binding?new wjcCore.Binding(this._col.binding):null},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"dataMap",{get:function(){return this._map},set:function(n){this._map=wjcCore.asType(n,wjcGrid.DataMap,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"column",{get:function(){return this._col},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"isActive",{get:function(){return this._c1.isActive||this._c2.isActive},enumerable:!0,configurable:!0}),n.prototype.apply=function(n){var t=this._col,i=this._c1,r=this._c2,u,f;return!this._bnd||!this.isActive?!0:(n=this._bnd.getValue(n),t.dataMap?n=t.dataMap.getDisplayValue(n):wjcCore.isDate(n)?(wjcCore.isString(i.value)||wjcCore.isString(r.value))&&(n=wjcCore.Globalize.format(n,t.format)):wjcCore.isNumber(n)&&(n=wjcCore.Globalize.parseFloat(wjcCore.Globalize.format(n,t.format))),u=i.apply(n),f=r.apply(n),i.isActive&&r.isActive?this._and?u&&f:u||f:i.isActive?u:r.isActive?f:!0)},n.prototype.clear=function(){this._c1.clear();this._c2.clear();this.and=!0},n.prototype.implementsInterface=function(n){return n=='IColumnFilter'},n}();exports.ConditionFilter=ConditionFilter;ConditionFilterEditor=function(n){function t(t,i){var r=n.call(this,t)||this,f,u;return r._filter=wjcCore.asType(i,ConditionFilter,!1),f=r.getTemplate(),r.applyTemplate('wj-control',f,{_divHdr:'div-hdr',_divCmb1:'div-cmb1',_divVal1:'div-val1',_btnAnd:'btn-and',_btnOr:'btn-or',_spAnd:'sp-and',_spOr:'sp-or',_divCmb2:'div-cmb2',_divVal2:'div-val2'}),r._divHdr.textContent=wjcCore.culture.FlexGridFilter.header,r._spAnd.textContent=wjcCore.culture.FlexGridFilter.and,r._spOr.textContent=wjcCore.culture.FlexGridFilter.or,r._cmb1=r._createOperatorCombo(r._divCmb1),r._cmb2=r._createOperatorCombo(r._divCmb2),r._val1=r._createValueInput(r._divVal1),r._val2=r._createValueInput(r._divVal2),u=r._btnAndOrChanged.bind(r),r._btnAnd.addEventListener('change',u),r._btnOr.addEventListener('change',u),r.updateEditor(),r}return __extends(t,n),Object.defineProperty(t.prototype,"filter",{get:function(){return this._filter},enumerable:!0,configurable:!0}),t.prototype.updateEditor=function(){var n=this._filter.condition1,t=this._filter.condition2;this._cmb1.selectedValue=n.operator;this._cmb2.selectedValue=t.operator;this._val1 instanceof wjcInput.ComboBox?(this._val1.text=wjcCore.changeType(n.value,wjcCore.DataType.String,null),this._val2.text=wjcCore.changeType(t.value,wjcCore.DataType.String,null)):(this._val1.value=n.value,this._val2.value=t.value);this._btnAnd.checked=this._filter.and;this._btnOr.checked=!this._filter.and},t.prototype.clearEditor=function(){this._cmb1.selectedValue=this._cmb2.selectedValue=null;this._val1.text=this._val2.text=null;this._btnAnd.checked=!0;this._btnOr.checked=!1},t.prototype.updateFilter=function(){var n=this._filter.column,t=this._filter.condition1,i=this._filter.condition2,r;t.operator=this._cmb1.selectedValue;i.operator=this._cmb2.selectedValue;this._val1 instanceof wjcInput.ComboBox?(r=n.dataType==wjcCore.DataType.Date?wjcCore.DataType.String:n.dataType,t.value=wjcCore.changeType(this._val1.text,r,n.format),i.value=wjcCore.changeType(this._val2.text,r,n.format)):(t.value=this._val1.value,i.value=this._val2.value);this._filter.and=this._btnAnd.checked},t.prototype._createOperatorCombo=function(n){var t=this._filter.column,r=wjcCore.culture.FlexGridFilter.stringOperators,i;return t.dataType!=wjcCore.DataType.Date||this._isTimeFormat(t.format)?t.dataType!=wjcCore.DataType.Number||t.dataMap?t.dataType!=wjcCore.DataType.Boolean||t.dataMap||(r=wjcCore.culture.FlexGridFilter.booleanOperators):r=wjcCore.culture.FlexGridFilter.numberOperators:r=wjcCore.culture.FlexGridFilter.dateOperators,i=new wjcInput.ComboBox(n),i.itemsSource=r,i.displayMemberPath='name',i.selectedValuePath='op',i},t.prototype._createValueInput=function(n){var t=this._filter.column,i=null;return t.dataType!=wjcCore.DataType.Date||this._isTimeFormat(t.format)?t.dataType!=wjcCore.DataType.Number||t.dataMap?(i=new wjcInput.ComboBox(n),i.itemsSource=this._filter.dataMap?this._filter.dataMap.getDisplayValues():t.dataMap?t.dataMap.getDisplayValues():t.dataType==wjcCore.DataType.Boolean?[!0,!1]:null):(i=new wjcInput.InputNumber(n),i.format=t.format):(i=new wjcInput.InputDate(n),i.format=t.format),i.isRequired=!1,i},t.prototype._isTimeFormat=function(n){return n?(n=wjcCore.culture.Globalize.calendar.patterns[n]||n,/[Hmst]+/.test(n)):!1},t.prototype._btnAndOrChanged=function(n){this._btnAnd.checked=n.target==this._btnAnd;this._btnOr.checked=n.target==this._btnOr},t}(wjcCore.Control);ConditionFilterEditor.controlTemplate='<div><div wj-part="div-hdr"><\/div><div wj-part="div-cmb1"><\/div><br/><div wj-part="div-val1"><\/div><br/><div style="text-align:center"><label><input wj-part="btn-and" type="radio"> <span wj-part="sp-and"><\/span> <\/label>&nbsp;&nbsp;&nbsp;<label><input wj-part="btn-or" type="radio"> <span wj-part="sp-or"><\/span> <\/label><\/div><div wj-part="div-cmb2"><\/div><br/><div wj-part="div-val2"><\/div><br/><\/div>';exports.ConditionFilterEditor=ConditionFilterEditor;FilterCondition=function(){function n(){this._op=null}return Object.defineProperty(n.prototype,"operator",{get:function(){return this._op},set:function(n){this._op=wjcCore.asEnum(n,Operator,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"value",{get:function(){return this._val},set:function(n){this._val=n;this._strVal=wjcCore.isString(n)?n.toString().toLowerCase():null},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"isActive",{get:function(){switch(this._op){case null:return!1;case Operator.EQ:case Operator.NE:return!0;default:return this._val!=null||this._strVal!=null}},enumerable:!0,configurable:!0}),n.prototype.clear=function(){this.operator=null;this.value=null},n.prototype.apply=function(n){var t=this._strVal||this._val;wjcCore.isString(n)&&(n=n.toLowerCase());switch(this._op){case null:return!0;case Operator.EQ:return wjcCore.isDate(n)&&wjcCore.isDate(t)?wjcCore.DateTime.sameDate(n,t):n==t;case Operator.NE:return n!=t;case Operator.GT:return n>t;case Operator.GE:return n>=t;case Operator.LT:return n<t;case Operator.LE:return n<=t;case Operator.BW:return this._strVal&&wjcCore.isString(n)?n.indexOf(this._strVal)==0:!1;case Operator.EW:return this._strVal&&wjcCore.isString(n)&&n.length>=this._strVal.length?n.substr(n.length-this._strVal.length)==t:!1;case Operator.CT:return this._strVal&&wjcCore.isString(n)?n.indexOf(this._strVal)>-1:!1;case Operator.NC:return this._strVal&&wjcCore.isString(n)?n.indexOf(this._strVal)<0:!1}throw'Unknown operator';},n}();exports.FilterCondition=FilterCondition,function(n){n[n.EQ=0]="EQ";n[n.NE=1]="NE";n[n.GT=2]="GT";n[n.GE=3]="GE";n[n.LT=4]="LT";n[n.LE=5]="LE";n[n.BW=6]="BW";n[n.EW=7]="EW";n[n.CT=8]="CT";n[n.NC=9]="NC"}(Operator=exports.Operator||(exports.Operator={}));ColumnFilter=function(){function n(n,t){this._owner=n;this._col=t;this._valueFilter=new ValueFilter(t);this._conditionFilter=new ConditionFilter(t)}return Object.defineProperty(n.prototype,"filterType",{get:function(){return this._filterType!=null?this._filterType:this._owner.defaultFilterType},set:function(n){if(n!=this._filterType){var t=this.isActive;this.clear();this._filterType=wjcCore.asEnum(n,FilterType,!0);t?this._owner.apply():this._col.grid&&this._col.grid.invalidate()}},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"dataMap",{get:function(){return this.conditionFilter.dataMap||this.valueFilter.dataMap},set:function(n){this.conditionFilter.dataMap=n;this.valueFilter.dataMap=n},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"valueFilter",{get:function(){return this._valueFilter},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"conditionFilter",{get:function(){return this._conditionFilter},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"column",{get:function(){return this._col},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"isActive",{get:function(){return this._conditionFilter.isActive||this._valueFilter.isActive},enumerable:!0,configurable:!0}),n.prototype.apply=function(n){return this._conditionFilter.apply(n)&&this._valueFilter.apply(n)},n.prototype.clear=function(){this._valueFilter.clear();this._conditionFilter.clear()},n.prototype.implementsInterface=function(n){return n=='IColumnFilter'},n}();exports.ColumnFilter=ColumnFilter;wjcCore.culture.FlexGridFilter=window.wijmo.culture.FlexGridFilter||{ascending:'\u2191 Ascending',descending:'\u2193 Descending',apply:'Apply',clear:'Clear',conditions:'Filter by Condition',values:'Filter by Value',search:'Search',selectAll:'Select All',null:'(nothing)',header:'Show items where the value',and:'And',or:'Or',stringOperators:[{name:'(not set)',op:null},{name:'Equals',op:Operator.EQ},{name:'Does not equal',op:Operator.NE},{name:'Begins with',op:Operator.BW},{name:'Ends with',op:Operator.EW},{name:'Contains',op:Operator.CT},{name:'Does not contain',op:Operator.NC}],numberOperators:[{name:'(not set)',op:null},{name:'Equals',op:Operator.EQ},{name:'Does not equal',op:Operator.NE},{name:'Is Greater than',op:Operator.GT},{name:'Is Greater than or equal to',op:Operator.GE},{name:'Is Less than',op:Operator.LT},{name:'Is Less than or equal to',op:Operator.LE}],dateOperators:[{name:'(not set)',op:null},{name:'Equals',op:Operator.EQ},{name:'Is Before',op:Operator.LT},{name:'Is After',op:Operator.GT}],booleanOperators:[{name:'(not set)',op:null},{name:'Equals',op:Operator.EQ},{name:'Does not equal',op:Operator.NE}]};ColumnFilterEditor=function(n){function t(t,i,r){var u,o,s,h,e,f;return r===void 0&&(r=!0),u=n.call(this,t)||this,u.filterChanged=new wjcCore.Event,u.buttonClicked=new wjcCore.Event,u._filter=wjcCore.asType(i,ColumnFilter),o=u.getTemplate(),u.applyTemplate('wj-control wj-columnfiltereditor wj-content',o,{_divSort:'div-sort',_btnAsc:'btn-asc',_btnDsc:'btn-dsc',_divType:'div-type',_aVal:'a-val',_aCnd:'a-cnd',_divEdtVal:'div-edt-val',_divEdtCnd:'div-edt-cnd',_btnApply:'btn-apply',_btnClear:'btn-clear'}),u._btnAsc.textContent=wjcCore.culture.FlexGridFilter.ascending,u._btnDsc.textContent=wjcCore.culture.FlexGridFilter.descending,u._aVal.textContent=wjcCore.culture.FlexGridFilter.values,u._aCnd.textContent=wjcCore.culture.FlexGridFilter.conditions,u._btnApply.textContent=wjcCore.culture.FlexGridFilter.apply,u._btnClear.textContent=wjcCore.culture.FlexGridFilter.clear,s=u.filter.conditionFilter.isActive||(i.filterType&FilterType.Value)==0?FilterType.Condition:FilterType.Value,u._showFilter(s),h=u.filter.column,e=h.grid.collectionView,r&&e&&e.canSort||(u._divSort.style.display='none'),f=u._btnClicked.bind(u),u._btnApply.addEventListener('click',f),u._btnClear.addEventListener('click',f),u._btnAsc.addEventListener('click',f),u._btnDsc.addEventListener('click',f),u._aVal.addEventListener('click',f),u._aCnd.addEventListener('click',f),u.hostElement.addEventListener('keydown',function(n){switch(n.keyCode){case wjcCore.Key.Enter:switch(n.target.tagName){case'A':case'BUTTON':u._btnClicked(n);break;default:u.updateFilter();u.onFilterChanged();u.onButtonClicked()}n.preventDefault();break;case wjcCore.Key.Escape:u.onButtonClicked();n.preventDefault()}}),u}return __extends(t,n),Object.defineProperty(t.prototype,"filter",{get:function(){return this._filter},enumerable:!0,configurable:!0}),t.prototype.updateEditor=function(){this._edtVal&&this._edtVal.updateEditor();this._edtCnd&&this._edtCnd.updateEditor()},t.prototype.updateFilter=function(){switch(this._getFilterType()){case FilterType.Value:this._edtVal.updateFilter();this.filter.conditionFilter.clear();break;case FilterType.Condition:this._edtCnd.updateFilter();this.filter.valueFilter.clear()}},t.prototype.onFilterChanged=function(n){this.filterChanged.raise(this,n)},t.prototype.onButtonClicked=function(n){this.buttonClicked.raise(this,n)},t.prototype._showFilter=function(n){n==FilterType.Value&&this._edtVal==null&&(this._edtVal=new ValueFilterEditor(this._divEdtVal,this.filter.valueFilter));n==FilterType.Condition&&this._edtCnd==null&&(this._edtCnd=new ConditionFilterEditor(this._divEdtCnd,this.filter.conditionFilter));(n&this.filter.filterType)!=0&&(n==FilterType.Value?(this._divEdtVal.style.display='',this._divEdtCnd.style.display='none',this._enableLink(this._aVal,!1),this._enableLink(this._aCnd,!0),this._edtVal.focus()):(this._divEdtVal.style.display='none',this._divEdtCnd.style.display='',this._enableLink(this._aVal,!0),this._enableLink(this._aCnd,!1),this._edtCnd.focus()));switch(this.filter.filterType){case FilterType.None:case FilterType.Condition:case FilterType.Value:this._divType.style.display='none';break;default:this._divType.style.display=''}},t.prototype._enableLink=function(n,t){n.style.textDecoration=t?'':'none';n.style.fontWeight=t?'':'bold';wjcCore.setAttribute(n,'href',t?'':null)},t.prototype._getFilterType=function(){return this._divEdtVal.style.display!='none'?FilterType.Value:FilterType.Condition},t.prototype._btnClicked=function(n){if(n.preventDefault(),n.stopPropagation(),!wjcCore.hasClass(n.target,'wj-state-disabled')){if(n.target==this._aVal){this._showFilter(FilterType.Value);return}if(n.target==this._aCnd){this._showFilter(FilterType.Condition);return}if(n.target==this._btnAsc||n.target==this._btnDsc){var t=this.filter.column,r=t.sortMemberPath?t.sortMemberPath:t.binding,i=t.grid.collectionView,u=new wjcCore.SortDescription(r,n.target==this._btnAsc);i.sortDescriptions.deferUpdate(function(){i.sortDescriptions.clear();i.sortDescriptions.push(u)})}n.target==this._btnApply?(this.updateFilter(),this.onFilterChanged()):n.target==this._btnClear?this.filter.isActive&&(this.filter.clear(),this.onFilterChanged()):this.updateEditor();this.onButtonClicked()}},t}(wjcCore.Control);ColumnFilterEditor.controlTemplate='<div><div wj-part="div-sort"><a wj-part="btn-asc" href="" style="min-width:95px" draggable="false"><\/a>&nbsp;&nbsp;&nbsp;<a wj-part="btn-dsc" href="" style="min-width:95px" draggable="false"><\/a><\/div><div style="text-align:right;margin:10px 0px;font-size:80%"><div wj-part="div-type"><a wj-part="a-cnd" href="" draggable="false"><\/a>&nbsp;|&nbsp;<a wj-part="a-val" href="" draggable="false"><\/a><\/div><\/div><div wj-part="div-edt-val"><\/div><div wj-part="div-edt-cnd"><\/div><div style="text-align:right;margin-top:10px"><a wj-part="btn-apply" href="" draggable="false"><\/a>&nbsp;&nbsp;<a wj-part="btn-clear" href="" draggable="false"><\/a><\/div>';exports.ColumnFilterEditor=ColumnFilterEditor,function(n){n[n.None=0]="None";n[n.Condition=1]="Condition";n[n.Value=2]="Value";n[n.Both=3]="Both"}(FilterType=exports.FilterType||(exports.FilterType={}));FlexGridFilter=function(){function n(n){this._showIcons=!0;this._showSort=!0;this._defFilterType=FilterType.Both;this.filterApplied=new wjcCore.Event;this.filterChanging=new wjcCore.Event;this.filterChanged=new wjcCore.Event;var t='Missing dependency: FlexGridFilter requires ';wjcCore.assert(wjcGrid!=null,t+'wijmo.grid.');wjcCore.assert(wjcInput!=null,t+'wijmo.input.');this._filters=[];this._g=wjcCore.asType(n,wjcGrid.FlexGrid,!1);this._g.formatItem.addHandler(this._formatItem.bind(this));this._g.itemsSourceChanged.addHandler(this.clear.bind(this));this._g.hostElement.addEventListener('mousedown',this._mouseDown.bind(this),!0);this._g.invalidate()}return Object.defineProperty(n.prototype,"grid",{get:function(){return this._g},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"filterColumns",{get:function(){return this._filterColumns},set:function(n){this._filterColumns=wjcCore.asArray(n);this.clear()},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"showFilterIcons",{get:function(){return this._showIcons},set:function(n){n!=this.showFilterIcons&&(this._showIcons=wjcCore.asBoolean(n),this._g&&this._g.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"showSortButtons",{get:function(){return this._showSort},set:function(n){this._showSort=wjcCore.asBoolean(n)},enumerable:!0,configurable:!0}),n.prototype.getColumnFilter=function(n,t){var i,r;for(t===void 0&&(t=!0),wjcCore.isString(n)?n=this._g.getColumn(n):wjcCore.isNumber(n)&&(n=this._g.columns[n]),n=wjcCore.asType(n,wjcGrid.Column),i=0;i<this._filters.length;i++)if(this._filters[i].column==n)return this._filters[i];return t&&n.binding?(r=new ColumnFilter(this,n),this._filters.push(r),r):null},Object.defineProperty(n.prototype,"defaultFilterType",{get:function(){return this._defFilterType},set:function(n){n!=this.defaultFilterType&&(this._defFilterType=wjcCore.asEnum(n,FilterType,!1),this._g.invalidate(),this.clear())},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"filterDefinition",{get:function(){for(var n,t,u,i={defaultFilterType:this.defaultFilterType,filters:[]},r=0;r<this._filters.length;r++)n=this._filters[r],n&&n.column&&n.column.binding&&(n.conditionFilter.isActive?(t=n.conditionFilter,i.filters.push({binding:n.column.binding,type:'condition',condition1:{operator:t.condition1.operator,value:t.condition1.value},and:t.and,condition2:{operator:t.condition2.operator,value:t.condition2.value}})):n.valueFilter.isActive&&(u=n.valueFilter,i.filters.push({binding:n.column.binding,type:'value',filterText:u.filterText,showValues:u.showValues})));return JSON.stringify(i)},set:function(n){var u,f,i,o;if(n=wjcCore.asString(n),this.clear(),n)for(u=JSON.parse(n),this.defaultFilterType=u.defaultFilterType,f=0;f<u.filters.length;f++){var t=u.filters[f],r=this._g.getColumn(t.binding),e=this.getColumnFilter(r,!0);if(e)switch(t.type){case'condition':i=e.conditionFilter;i.condition1.value=r.dataType==wjcCore.DataType.Date?wjcCore.changeType(t.condition1.value,r.dataType,null):t.condition1.value;i.condition1.operator=t.condition1.operator;i.and=t.and;i.condition2.value=r.dataType==wjcCore.DataType.Date?wjcCore.changeType(t.condition2.value,r.dataType,null):t.condition2.value;i.condition2.operator=t.condition2.operator;break;case'value':o=e.valueFilter;o.filterText=t.filterText;o.showValues=t.showValues}}this.apply()},enumerable:!0,configurable:!0}),n.prototype.editColumnFilter=function(n,t){var u=this,i;this.closeEditor();n=wjcCore.isString(n)?this._g.getColumn(n):wjcCore.asType(n,wjcGrid.Column,!1);i=new wjcGrid.CellRangeEventArgs(this._g.cells,new wjcGrid.CellRange(-1,n.index));this.onFilterChanging(i);if(!i.cancel){i.cancel=!0;var r=document.createElement('div'),h=this.getColumnFilter(n),e=new ColumnFilterEditor(r,h,this.showSortButtons);wjcCore.addClass(r,'wj-dropdown-panel');this._g.rightToLeft&&(r.dir='rtl');e.filterChanged.addHandler(function(){i.cancel=!1;setTimeout(function(){i.cancel||u.apply()})});e.buttonClicked.addHandler(function(){u._g.focus();u.onFilterChanged(i)});e.lostFocus.addHandler(function(){setTimeout(function(){var n=wjcCore.Control.getControl(u._divEdt);n&&!n.containsFocus()&&u.closeEditor()},10)});var s=this._g.columnHeaders,c=t?t.row:s.rows.length-1,l=t?t.col:n.index,f=s.getCellBoundingRect(c,l),o=document.elementFromPoint(f.left+f.width/2,f.top+f.height/2);o=wjcCore.closest(o,'.wj-cell');o?wjcCore.showPopup(r,o,!1,!1,!1):wjcCore.showPopup(r,f);e.focus();this._divEdt=r;this._edtCol=n}},n.prototype.closeEditor=function(){if(this._divEdt){wjcCore.hidePopup(this._divEdt,!0);var n=wjcCore.Control.getControl(this._divEdt);n&&n.dispose();this._divEdt=null;this._edtCol=null}},n.prototype.apply=function(){var n=this._g.collectionView,t;n&&(n.filter?n.refresh():n.filter=this._filter.bind(this));t=n?n.updateFilterDefinition:null;wjcCore.isFunction(t)&&t.call(n,this);this.onFilterApplied()},n.prototype.clear=function(){this._filters.length&&(this._filters=[],this.apply())},n.prototype.onFilterApplied=function(n){this.filterApplied.raise(this,n)},n.prototype.onFilterChanging=function(n){this.filterChanging.raise(this,n)},n.prototype.onFilterChanged=function(n){this.filterChanged.raise(this,n)},n.prototype._filter=function(n){for(var t=0;t<this._filters.length;t++)if(!this._filters[t].apply(n))return!1;return!0},n.prototype._formatItem=function(t,i){var r,u,h;if(i.panel.cellType==wjcGrid.CellType.ColumnHeader){var f=this._g,o=f.getMergedRange(i.panel,i.row,i.col)||new wjcGrid.CellRange(i.row,i.col),s=f.columns[o.col],e=f._getBindingColumn(i.panel,i.row,s);(o.row2==i.panel.rows.length-1||s!=e)&&(r=this.getColumnFilter(e,this.defaultFilterType!=FilterType.None),this._filterColumns&&this._filterColumns.indexOf(e.binding)<0&&(r=null),r&&r.filterType!=FilterType.None?(this._showIcons&&(n._filterGlyph||(n._filterGlyph=wjcCore.createElement('<div class="'+n._WJC_FILTER+'"><span class="wj-glyph-filter"></span></div>')),u=i.cell.querySelector('div')||i.cell,h=u.querySelector('.wj-glyph-filter'),h||u.insertBefore(n._filterGlyph.cloneNode(!0),u.firstChild)),wjcCore.toggleClass(i.cell,'wj-filter-on',r.isActive),wjcCore.toggleClass(i.cell,'wj-filter-off',!r.isActive)):(wjcCore.removeClass(i.cell,'wj-filter-on'),wjcCore.removeClass(i.cell,'wj-filter-off')))}},n.prototype._mouseDown=function(t){var e=this,r,i,f,u;t.defaultPrevented||t.button!=0||t.dataTransfer||wjcCore.closest(t.target,'.'+n._WJC_FILTER)&&(r=this._g,i=r.hitTest(t),i.panel==r.columnHeaders&&(f=r.columns[i.col],u=r._getBindingColumn(i.panel,i.row,f),this._divEdt&&this._edtCol==u?this.closeEditor():setTimeout(function(){e.editColumnFilter(u,i)},this._divEdt?100:0),t.stopPropagation(),t.preventDefault()))},n}();FlexGridFilter._WJC_FILTER='wj-elem-filter';exports.FlexGridFilter=FlexGridFilter