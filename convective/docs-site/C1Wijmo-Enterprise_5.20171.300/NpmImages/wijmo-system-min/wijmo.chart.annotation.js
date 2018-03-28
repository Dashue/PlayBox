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
System.register(["wijmo/wijmo.chart","wijmo/wijmo","wijmo/wijmo.chart.annotation"],function(n,t){"use strict";var o=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])};return function(t,i){function r(){this.constructor=t}n(t,i);t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}}(),d=t&&t.id,s,i,h,f,u,r,c,e,l,a,v,y,p,w,b,k;return{setters:[function(n){s=n},function(n){i=n},function(n){h=n}],execute:function(){window.wijmo=window.wijmo||{};window.wijmo.chart=window.wijmo.chart||{};window.wijmo.chart.annotation=h,function(n){n[n.DataIndex=0]="DataIndex";n[n.DataCoordinate=1]="DataCoordinate";n[n.Relative=2]="Relative";n[n.Absolute=3]="Absolute"}(f||(f={}));n("AnnotationAttachment",f),function(n){n[n.Center=0]="Center";n[n.Top=1]="Top";n[n.Bottom=2]="Bottom";n[n.Left=4]="Left";n[n.Right=8]="Right"}(u||(u={}));n("AnnotationPosition",u);r=function(){function n(n){this._resetDefaultValue();n&&this._copy(this,n)}return Object.defineProperty(n.prototype,"attachment",{get:function(){return this._attachment},set:function(n){n=i.asEnum(n,f);n!=this._attachment&&(this._attachment=n,this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"point",{get:function(){return this._point},set:function(n){n.x!=null&&n.y!=null&&(n.x!==this._point.x||n.y!==this._point.y)&&(this._point=n,this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"seriesIndex",{get:function(){return this._seriesIndex},set:function(n){n=i.asNumber(n,!1,!0);n!=this._seriesIndex&&(this._seriesIndex=n,this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"pointIndex",{get:function(){return this._pointIndex},set:function(n){n!==this._pointIndex&&(this._pointIndex=i.asNumber(n,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"position",{get:function(){return this._position},set:function(n){n!=this._position&&(this._position=n,this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"offset",{get:function(){return this._offset},set:function(n){n.x!=null&&n.y!=null&&(n.x!==this._offset.x||n.y!==this._offset.y)&&(this._offset=n,this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"style",{get:function(){return this._style==null&&(this._style={}),this._style},set:function(n){n!=this._style&&(this._style=n,this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"isVisible",{get:function(){return this._isVisible},set:function(n){n=i.asBoolean(n,!1);n!=this._isVisible&&(this._isVisible=n,this._toggleVisibility(n))},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"tooltip",{get:function(){return this._tooltip},set:function(n){this._tooltip=n},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"name",{get:function(){return this._name},set:function(n){this._name=n},enumerable:!0,configurable:!0}),n.prototype.render=function(t){var i=this,r;i._element=t.startGroup(i._getCSSClass());t.fill='#88bde6';t.strokeWidth=1;t.stroke='#000000';i._render(t);t.endGroup();i._element[n._DATA_KEY]=this;i._isVisible?i._attachment===f.DataIndex&&(r=i._layer._chart.series[i._seriesIndex],r&&(r.visibility===s.SeriesVisibility.Legend||r.visibility===s.SeriesVisibility.Hidden)&&i._toggleVisibility(!1)):i._toggleVisibility(!1)},n.prototype.destroy=function(){},n.prototype._copy=function(n,t){for(var i in t)i in n&&this._processOptions(i,n,t)},n.prototype._processOptions=function(n,t,i){t[n]=i[n]},n.prototype._resetDefaultValue=function(){var n=this;n._attachment=f.Absolute;n._point=new s.DataPoint(0,0);n._seriesIndex=0;n._pointIndex=0;n._position=u.Center;n._offset=new i.Point(0,0);n._isVisible=!0;n._tooltip=''},n.prototype._toggleVisibility=function(n){var t=n?'visible':'hidden';this._element&&this._element.setAttribute('visibility',t)},n.prototype._getCSSClass=function(){return n._CSS_ANNOTATION},n.prototype._render=function(){this._element=null},n.prototype._repaint=function(){this._layer&&this._layer._renderAnnotation(this)},n.prototype._convertPoint=function(n){var t=this,a=t._attachment,r=new i.Point,u,e,c,s,o,h,l;t._layer&&t._layer._chart&&(u=t._layer._chart,e=u._plotRect);switch(a){case f.DataIndex:if(!u.series||u.series.length<=t.seriesIndex)break;if(o=u.series[t.seriesIndex],h=o._getItem(t.pointIndex),!h)break;c=o.axisX||u.axisX;s=o.axisY||u.axisY;l=h[o.bindingX]||h.x;typeof l=='string'&&(l=t.pointIndex);r.x=t._convertDataToLen(e.width,c,l);r.y=t._convertDataToLen(e.height,s,h[o._getBinding(0)]||s.actualMin+.25,!0);break;case f.DataCoordinate:c=u.axisX;s=u.axisY;r.x=t._convertDataToLen(e.width,c,n.x);r.y=t._convertDataToLen(e.height,s,n.y,!0);break;case f.Relative:r.x=e.width*n.x;r.y=e.height*n.y;break;case f.Absolute:default:r.x=n.x;r.y=n.y}return r},n.prototype._convertDataToLen=function(n,t,i,r){r===void 0&&(r=!1);var u=t.min==null?t.actualMin:t.min,f=t.max==null?t.actualMax:t.max;return r?n*(1-(i-u)/(f-u)):n*(i-u)/(f-u)},n.prototype._renderCenteredText=function(n,t,i,r,u,f){var e,o;this._isValidPoint(i)&&(u?t.drawStringRotated(n,i,i,u,r,f):t.drawString(n,i,r,f),e=this._element.querySelector('text'),e&&(o=e.getBBox(),e.setAttribute('x',(i.x-o.width/2).toFixed(1)),e.setAttribute('y',(i.y+o.height/6).toFixed(1))))},n.prototype._adjustOffset=function(n,t){n.x=n.x+t.x;n.y=n.y+t.y},n.prototype._getOffset=function(n){var t=this._getPositionOffset(n);return new i.Point(this._offset.x+t.x,this._offset.y+t.y)},n.prototype._getPositionOffset=function(n){var t=new i.Point(0,0),r=this.position,f=this._getSize(n);return(r&u.Top)===u.Top?t.y-=f.height/2:(r&u.Bottom)===u.Bottom&&(t.y+=f.height/2),(r&u.Left)===u.Left?t.x-=f.width/2:(r&u.Right)===u.Right&&(t.x+=f.width/2),t},n.prototype._getSize=function(){return new i.Size},n.prototype._isValidPoint=function(n){return isFinite(n.x)&&isFinite(n.y)},n.prototype._measureString=function(n,t,i){var r=n,u;return r._textGroup&&r._textGroup.parentNode==null?(r._svg.appendChild(r._textGroup),u=r.measureString(t,i,null,this.style),r.endRender()):u=r.measureString(t,i,null,this.style),u},n}();r._DATA_KEY='wj-chart-annotation';r._CSS_ANNOTATION='wjchart-annotation';r._CSS_ANNO_TEXT='anno-text';r._CSS_ANNO_SHAPE='anno-shape';n("AnnotationBase",r);c=function(n){function t(t){return n.call(this,t)||this}return o(t,n),t.prototype._resetDefaultValue=function(){n.prototype._resetDefaultValue.call(this);this._text='';this.position=u.Top},t.prototype._getCSSClass=function(){return n.prototype._getCSSClass.call(this)+' '+t._CSS_TEXT},Object.defineProperty(t.prototype,"text",{get:function(){return this._text},set:function(n){var t=this;n!==t._text&&(t._text=n,t._repaint())},enumerable:!0,configurable:!0}),t.prototype._render=function(n){var t=this,i=t._convertPoint(t.point),u;u=t._getOffset(n);t._adjustOffset(i,u);t._renderCenteredText(t._text,n,i,r._CSS_ANNO_TEXT,null,t.style)},t.prototype._getSize=function(n){return n?this._measureString(n,this._text,r._CSS_ANNO_TEXT):new i.Size},t}(r);c._CSS_TEXT='wjchart-anno-text';n("Text",c);e=function(n){function t(t){return n.call(this,t)||this}return o(t,n),t.prototype._resetDefaultValue=function(){n.prototype._resetDefaultValue.call(this);this._content=''},t.prototype._getCSSClass=function(){return n.prototype._getCSSClass.call(this)+' '+t._CSS_SHAPE},Object.defineProperty(t.prototype,"content",{get:function(){return this._content},set:function(n){var t=this;n!==t._content&&(t._content=n,t._repaint())},enumerable:!0,configurable:!0}),t.prototype._render=function(n){var t=this;t._shapeContainer=n.startGroup();n.stroke='#000';t._renderShape(n);n.stroke=null;n.endGroup();t._content&&t._renderText(n)},t.prototype._getContentCenter=function(){return this.point},t.prototype._renderShape=function(){},t.prototype._renderText=function(n){var t=this,i,u;(i=t._convertPoint(t._getContentCenter()),t._isValidPoint(i))&&(u=t._getOffset(),t._adjustOffset(i,u),t._renderCenteredText(t._content,n,i,r._CSS_ANNO_TEXT))},t}(r);e._CSS_SHAPE='wjchart-anno-shape';n("Shape",e);l=function(n){function t(t){return n.call(this,t)||this}return o(t,n),Object.defineProperty(t.prototype,"width",{get:function(){return this._width},set:function(n){n!==this._width&&(this._width=i.asNumber(n,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this._height},set:function(n){n!==this._height&&(this._height=i.asNumber(n,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),t.prototype._resetDefaultValue=function(){n.prototype._resetDefaultValue.call(this);this._width=100;this._height=80},t.prototype._getCSSClass=function(){return n.prototype._getCSSClass.call(this)+' '+t._CSS_ELLIPSE},t.prototype._renderShape=function(t){n.prototype._renderShape.call(this,t);var i=this,u=i._convertPoint(i.point),f=i._width,e=i._height,o=i._getOffset();i._adjustOffset(u,o);i._isValidPoint(u)&&t.drawEllipse(u.x,u.y,f/2,e/2,r._CSS_ANNO_SHAPE,i.style)},t.prototype._getSize=function(){return new i.Size(this.width,this.height)},t}(e);l._CSS_ELLIPSE='wjchart-anno-ellipse';n("Ellipse",l);a=function(n){function t(t){return n.call(this,t)||this}return o(t,n),Object.defineProperty(t.prototype,"width",{get:function(){return this._width},set:function(n){n!==this._width&&(this._width=i.asNumber(n,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this._height},set:function(n){n!==this._height&&(this._height=i.asNumber(n,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),t.prototype._resetDefaultValue=function(){n.prototype._resetDefaultValue.call(this);this._width=100;this._height=80},t.prototype._getCSSClass=function(){return n.prototype._getCSSClass.call(this)+' '+t._CSS_RECTANGLE},t.prototype._renderShape=function(t){n.prototype._renderShape.call(this,t);var i=this,u=i._convertPoint(i.point),f=i._width,e=i._height,o=i._getOffset();i._adjustOffset(u,o);i._isValidPoint(u)&&t.drawRect(u.x-f/2,u.y-e/2,i._width,i._height,r._CSS_ANNO_SHAPE,i.style)},t.prototype._getSize=function(){return new i.Size(this.width,this.height)},t}(e);a._CSS_RECTANGLE='wjchart-anno-rectangle';n("Rectangle",a);v=function(n){function t(t){return n.call(this,t)||this}return o(t,n),Object.defineProperty(t.prototype,"start",{get:function(){return this._start},set:function(n){var t=this;n.x!=null&&n.y!=null&&(n.x!==t._start.x||n.y!==t._start.y)&&(t._start=n,t._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"end",{get:function(){return this._end},set:function(n){var t=this;n.x!=null&&n.y!=null&&(n.x!==t._end.x||n.y!==t._end.y)&&(t._end=n,t._repaint())},enumerable:!0,configurable:!0}),t.prototype._resetDefaultValue=function(){n.prototype._resetDefaultValue.call(this);this._start=new s.DataPoint(0,0);this._end=new s.DataPoint(0,0);this.position=u.Top},t.prototype._getCSSClass=function(){return n.prototype._getCSSClass.call(this)+' '+t._CSS_LINE},t.prototype._getContentCenter=function(){var n=this.start,t=this.end;return new s.DataPoint((n.x+t.x)/2,(n.y+t.y)/2)},t.prototype._renderShape=function(t){n.prototype._renderShape.call(this,t);var i=this,u=i._convertPoint(i._start),f=i._convertPoint(i._end),e;i._cS=u;i._cE=f;e=i._getOffset();i._adjustOffset(u,e);i._adjustOffset(f,e);i._isValidPoint(u)&&i._isValidPoint(f)&&t.drawLine(u.x,u.y,f.x,f.y,r._CSS_ANNO_SHAPE,i.style)},t.prototype._getSize=function(){var n=this._cS,t=this._cE;return new i.Size(Math.abs(n.x-t.x),Math.abs(n.y-t.y))},t.prototype._renderText=function(n){var t=this,u,f,e=t._cS,o=t._cE,i;(u=t._convertPoint(t._getContentCenter()),f=t._getOffset(),t._adjustOffset(u,f),t._isValidPoint(u))&&(i=Math.atan2(o.y-e.y,o.x-e.x)*180/Math.PI,i=i<-90?i+180:i>90?i-180:i,t._renderCenteredText(t.content,n,u,r._CSS_ANNO_TEXT,i))},t.prototype._renderCenteredText=function(t,i,r,u,f,e){if(f!=null){var h,c,o,s;o=this._measureString(i,t,u).height/2;s=f*Math.PI/180;h=o*Math.sin(s);c=o*Math.cos(s);r.x=r.x+h;r.y=r.y-c}n.prototype._renderCenteredText.call(this,t,i,r,u,f,e)},t}(e);v._CSS_LINE='wjchart-anno-line';n("Line",v);y=function(n){function t(t){return n.call(this,t)||this}return o(t,n),t.prototype._processOptions=function(t,r,u){var e=this,f;t==='points'?(f=u[t],i.isArray(f)&&f.forEach(function(n){e.points.push(n)})):n.prototype._processOptions.call(this,t,r,u)},Object.defineProperty(t.prototype,"points",{get:function(){return this._points},enumerable:!0,configurable:!0}),t.prototype._resetDefaultValue=function(){var t=this;n.prototype._resetDefaultValue.call(this);t._points=new i.ObservableArray;t._points.collectionChanged.addHandler(function(){t._element&&t._repaint()})},t.prototype._getCSSClass=function(){return n.prototype._getCSSClass.call(this)+' '+t._CSS_POLYGON},t.prototype._getContentCenter=function(){for(var t=this.points,i=t.length,r=0,u=0,n=0;n<i;n++)r+=t[n].x,u+=t[n].y;return new s.DataPoint(r/i,u/i)},t.prototype._renderShape=function(t){n.prototype._renderShape.call(this,t);for(var i=this,e=[],o=[],s=i._points,h=s.length,u,c=i._getOffset(),f=0;f<h;f++){if(u=i._convertPoint(s[f]),!i._isValidPoint(u))return;i._adjustOffset(u,c);e.push(u.x);o.push(u.y)}t.drawPolygon(e,o,r._CSS_ANNO_SHAPE,i.style)},t.prototype._getSize=function(){for(var o=this,r,u,f,e,n,h=o._points.length,s=[].map.call(o._points,function(n){return o._convertPoint(n)}),t=0;t<h;t++){if(n=s[t],t===0){r=u=n.x;f=e=n.y;continue}n.x<r?r=n.x:n.x>u&&(u=n.x);n.y<f?f=n.y:n.y>e&&(e=n.y)}return new i.Size(u-r,e-f)},t}(e);y._CSS_POLYGON='wjchart-anno-polygon';n("Polygon",y);p=function(n){function t(t){return n.call(this,t)||this}return o(t,n),Object.defineProperty(t.prototype,"radius",{get:function(){return this._radius},set:function(n){n!==this._radius&&(this._radius=i.asNumber(n,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),t.prototype._resetDefaultValue=function(){n.prototype._resetDefaultValue.call(this);this._radius=100},t.prototype._getCSSClass=function(){return n.prototype._getCSSClass.call(this)+' '+t._CSS_CIRCLE},t.prototype._renderShape=function(t){n.prototype._renderShape.call(this,t);var i=this,u=i._convertPoint(i.point),f=i._getOffset();i._adjustOffset(u,f);i._isValidPoint(u)&&t.drawPieSegment(u.x,u.y,i.radius,0,360,r._CSS_ANNO_SHAPE,i.style)},t.prototype._getSize=function(){var n=this.radius*2;return new i.Size(n,n)},t}(e);p._CSS_CIRCLE='wjchart-anno-circle';n("Circle",p);w=function(n){function t(t){return n.call(this,t)||this}return o(t,n),Object.defineProperty(t.prototype,"length",{get:function(){return this._length},set:function(n){n!==this._length&&(this._length=i.asNumber(n,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),t.prototype._resetDefaultValue=function(){n.prototype._resetDefaultValue.call(this);this._length=100},t.prototype._getCSSClass=function(){return n.prototype._getCSSClass.call(this)+' '+t._CSS_SQUARE},t.prototype._renderShape=function(t){n.prototype._renderShape.call(this,t);var i=this,u=i._convertPoint(i.point),f=i.length,e=i._getOffset();i._adjustOffset(u,e);i._isValidPoint(u)&&t.drawRect(u.x-f/2,u.y-f/2,f,f,r._CSS_ANNO_SHAPE,i.style)},t.prototype._getSize=function(){return new i.Size(this.length,this.length)},t}(e);w._CSS_SQUARE='wjchart-anno-square';n("Square",w);b=function(n){function t(t){return n.call(this,t)||this}return o(t,n),Object.defineProperty(t.prototype,"width",{get:function(){return this._width},set:function(n){n!==this._width&&(this._width=i.asNumber(n,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this._height},set:function(n){n!==this._height&&(this._height=i.asNumber(n,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"href",{get:function(){return this._href},set:function(n){n!==this._href&&(this._href=n,this._repaint())},enumerable:!0,configurable:!0}),t.prototype._resetDefaultValue=function(){n.prototype._resetDefaultValue.call(this);this._width=100;this._height=100;this._href=''},t.prototype._getCSSClass=function(){return n.prototype._getCSSClass.call(this)+' '+t._CSS_IMAGE},t.prototype._renderShape=function(t){n.prototype._renderShape.call(this,t);var i=this,r=i._convertPoint(i.point),u=i._href,f=i.width,e=i.height,o=i._getOffset();u.length>0&&i._isValidPoint(r)&&(i._adjustOffset(r,o),t.drawImage(u,r.x-f/2,r.y-e/2,f,e));i._applyStyle(i._element,i.style)},t.prototype._getSize=function(){return new i.Size(this.width,this.height)},t.prototype._applyStyle=function(n,t){if(t)for(var i in t)n.setAttribute(this._deCase(i),t[i])},t.prototype._deCase=function(n){return n.replace(/[A-Z]/g,function(n){return'-'+n.toLowerCase()})},t}(e);b._CSS_IMAGE='wjchart-anno-image';n("Image",b);k=function(){function n(n,t){var r=this;r._init(n);r._renderGroup();r._bindTooltip();t&&i.isArray(t)&&t.forEach(function(n){var t=n.type||'Circle',i;h[t]&&(i=new h[t](n),r._items.push(i))})}return n.prototype._init=function(n){var t=this;t._items=new i.ObservableArray;t._items.collectionChanged.addHandler(t._itemsChanged,t);t._chart=n;t._forceTTShowing=!1;t._annoTTShowing=!1;t._engine=n._currentRenderEngine;n.rendered.addHandler(t._renderAnnotations,t);n.lostFocus.addHandler(t._lostFocus,t)},n.prototype._lostFocus=function(n){this._toggleTooltip(this._tooltip,n,this._chart.hostElement)},Object.defineProperty(n.prototype,"items",{get:function(){return this._items},enumerable:!0,configurable:!0}),n.prototype.getItem=function(n){var t=this.getItems(n);return t.length>0?t[0]:null},n.prototype.getItems=function(n){var i=[],t;if(this._items.length===0||!n||n==='')return i;for(t=0;t<this._items.length;t++)n===this._items[t].name&&i.push(this._items[t]);return i},n.prototype._bindTooltip=function(){var n=this,t=n._chart.hostElement,r=n._tooltip,u;r||(r=n._tooltip=new s.ChartTooltip,u=i.Tooltip.prototype.hide,i.Tooltip.prototype.hide=function(){n._forceTTShowing||u.call(r)});t&&(t.addEventListener('click',function(i){n._toggleTooltip(r,i,t)}),t.addEventListener('mousemove',function(i){n._showTooltip()&&n._toggleTooltip(r,i,t)}))},n.prototype._showTooltip=function(){return!this._chart.isTouching},n.prototype._toggleTooltip=function(n,t,r){var u=this,f=u._getAnnotation(t.target,r);if(f&&f.tooltip)u._forceTTShowing=!0,u._annoTTShowing=!0,n.show(u._layerEle,f.tooltip,new i.Rect(t.clientX,t.clientY,5,5));else{if(!u._annoTTShowing)return;u._annoTTShowing=!1;u._forceTTShowing=!1;n.hide()}},n.prototype._getAnnotation=function(n,t){var i=this._getAnnotationElement(n,t);return i==null?null:i[r._DATA_KEY]},n.prototype._getAnnotationElement=function(n,t){if(!n||!t)return null;var u=n.parentNode;return i.hasClass(n,r._CSS_ANNOTATION)?n:u==null||u===document.body||u===document||u===t?null:this._getAnnotationElement(u,t)},n.prototype._itemsChanged=function(n,t){var u=t.action,r=t.item;switch(u){case i.NotifyCollectionChangedAction.Add:case i.NotifyCollectionChangedAction.Change:r._layer=this;this._renderAnnotation(r);break;case i.NotifyCollectionChangedAction.Remove:this._destroyAnnotation(r)}},n.prototype._renderAnnotations=function(){var t=this.items,i=t.length,n;for(this._renderGroup(),n=0;n<i;n++)this._renderAnnotation(t[n])},n.prototype._renderGroup=function(){var t=this,r=t._engine,i=t._chart._plotRect;i&&(t._layerEle&&t._layerEle.parentNode!=null||(t._plotrectId='plotRect'+(1e6*Math.random()).toFixed(),r.addClipRect({left:0,top:0,width:i.width,height:i.height},t._plotrectId),t._layerEle=r.startGroup(n._CSS_Layer,t._plotrectId),t._layerEle.setAttribute('transform','translate('+i.left+', '+i.top+')'),r.endGroup()))},n.prototype._renderAnnotation=function(n){this._layerEle&&this._layerEle.parentNode!=null&&(n._element&&n._element.parentNode==this._layerEle&&this._layerEle.removeChild(n._element),n.render(this._engine),this._layerEle.appendChild(n._element))},n.prototype._destroyAnnotations=function(){for(var t=this.items,i=t.length,n=0;n<i;n++)this._destroyAnnotation(t[n])},n.prototype._destroyAnnotation=function(n){this._layerEle&&this._layerEle.removeChild(n._element);n.destroy()},n}();k._CSS_Layer='wj-chart-annotationlayer';n("AnnotationLayer",k)}}})