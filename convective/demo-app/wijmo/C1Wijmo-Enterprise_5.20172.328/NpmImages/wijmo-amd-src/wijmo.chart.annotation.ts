

import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcCore from 'wijmo/wijmo';


import * as wjcSelf from 'wijmo/wijmo.chart.annotation';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['chart'] = window['wijmo']['chart'] || {};
window['wijmo']['chart']['annotation'] = wjcSelf;

/*
    *
    * Wijmo Library 5.20172.328
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */

    'use strict';
    
    /**
     * Specifies the attachment of the annotation.
     */
    export enum AnnotationAttachment {
        /** 
        * Coordinates of the annotation point are defined by the data series index and 
        * the data point index. */
        DataIndex,
        /** Annotation point is specified in data coordinates. */
        DataCoordinate,
        /** Annotation point is specified as a relative position inside the control where
        * (0,0) is the top left corner and (1,1) is the bottom right corner.*/
        Relative,
        /** The annotation point is specified in control's pixel coordinates.  */
        Absolute
    }
    
    /**
     * Specifies the position of the annotation.
     */
    export enum AnnotationPosition {
        /** The annotation appears at the Center of the target point. */
        Center = 0,
        /** The annotation appears at the Top of the target point. */
        Top = 1,
        /** The annotation appears at the Bottom of the target point. */
        Bottom = 2,
        /** The annotation appears at the Left of the target point. */
        Left = 4,
        /** The annotation appears at the Right of the target point. */
        Right = 8
    }
    
    /**
     * Represents the base class of annotations for the @see:AnnotationLayer.
     */
    export class AnnotationBase {
        static _DATA_KEY = 'wj-chart-annotation';    // key used to store annotation reference in host element
        static _CSS_ANNOTATION = 'wjchart-annotation';
        static _CSS_ANNO_TEXT = 'anno-text';
        static _CSS_ANNO_SHAPE = 'anno-shape';

        private _attachment: AnnotationAttachment;
        private _point: wjcChart.DataPoint;
        private _seriesIndex: number;
        private _pointIndex: number;
        private _position: AnnotationPosition;
        private _offset: wjcCore.Point;
        private _style: any;
        private _isVisible: boolean;
        private _tooltip: string;
        private _name: string;
        _element: SVGElement;
        _layer: AnnotationLayer;

        /**
         * Initializes a new instance of the @see:AnnotationBase class.
         * 
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any) {
            this._resetDefaultValue();
            if (options) {
                this._copy(this, options);
            }
        }

        /**
         * Gets or sets the attachment of the annotation.
         */
        get attachment(): AnnotationAttachment {
            return this._attachment;
        }
        set attachment(value: AnnotationAttachment) {
            value = wjcCore.asEnum(value, AnnotationAttachment);
            if (value != this._attachment) {
                this._attachment = value;
                this._repaint();
            }
        }
        /**
         * Gets or sets the point of the annotation.
         * The coordinates of points depends on the @see:attachment property. 
         * See @see:AnnotationAttachment for further description.
         */
        get point(): wjcChart.DataPoint {
            return this._point;
        }
        set point(value: wjcChart.DataPoint) {
            if (value.x == null || value.y == null) {
                return;
            }
            if (value.x === this._point.x && value.y === this._point.y) {
                return;
            }
            this._point = value;
            this._repaint();
        }
        /**
         * Gets or sets the data series index of the annotation.
         * Applies only when the <b>attachment</b> property is set to DataIndex.
         */
        get seriesIndex(): number {
            return this._seriesIndex;
        }
        set seriesIndex(value: number) {
            value = wjcCore.asNumber(value, false, true);
            if (value != this._seriesIndex) {
                this._seriesIndex = value;
                this._repaint();
            }
        }
        /**
         * Gets or sets the data point index of the annotation.
         * Applies only when the <b>attachment</b> property is set to DataIndex.
         */
        get pointIndex(): number {
            return this._pointIndex;
        }
        set pointIndex(value: number) {
            if (value === this._pointIndex) {
                return;
            }
            this._pointIndex = wjcCore.asNumber(value, false, true);
            this._repaint();
        }
        /**
         * Gets or sets the position of the annotation.
         * The position is relative to the @see:point.
         */
        get position(): AnnotationPosition {
            return this._position;
        }
        set position(value: AnnotationPosition) {
            //value could be AnnotationPosition.Right | AnnotationPosition.Top
            //value = asEnum(value, AnnotationPosition);
            if (value != this._position) {
                this._position = value;
                this._repaint();
            }
        }
        /**
         * Gets or sets the offset of the annotation from the @see:point.
         */
        get offset(): wjcCore.Point {
            return this._offset;
        }
        set offset(value: wjcCore.Point) {
            if (value.x == null || value.y == null) {
                return;
            }
            if (value.x === this._offset.x && value.y === this._offset.y) {
                return;
            }
            this._offset = value;
            this._repaint();
        }
        /**
         * Gets or sets the style of the annotation.
         */
        get style(): any {
            if (this._style == null) {
                this._style = {};
            }
            return this._style;
        }
        set style(value: any) {
            if (value != this._style) {
                this._style = value;
                this._repaint();
            }
        }
        /**
         * Gets or sets the visibility of the annotation.
         */
        get isVisible(): boolean {
            return this._isVisible;
        }
        set isVisible(value: boolean) {
            value = wjcCore.asBoolean(value, false);
            if (value != this._isVisible) {
                this._isVisible = value;
                this._toggleVisibility(value);
            }
        }
        /**
         * Gets or sets the tooltip of the annotation.
         */
        get tooltip(): string {
            return this._tooltip;
        }
        set tooltip(value: string) {
            this._tooltip = value;
        }
        /**
         * Gets or sets the name of the annotation.
         */
        get name(): string {
            return this._name;
        }
        set name(value: string) {
            this._name = value;
        }

        /**
         * Render this annotation.
         * 
         * @param engine The engine to render annotation.
         */
        render(engine: wjcChart.IRenderEngine) {
            var self = this,
                series: wjcChart.SeriesBase;

            self._element = engine.startGroup(self._getCSSClass());
            engine.fill = '#88bde6';
            engine.strokeWidth = 1;
            engine.stroke = '#000000';
            self._render(engine);
            engine.endGroup();
            self._element[AnnotationBase._DATA_KEY] = this;
            if (!self._isVisible) {
                self._toggleVisibility(false);
            } else if (self._attachment === AnnotationAttachment.DataIndex) {
                series = self._layer._chart.series[self._seriesIndex];
                if (series && (series.visibility === wjcChart.SeriesVisibility.Legend || series.visibility === wjcChart.SeriesVisibility.Hidden)) {
                    self._toggleVisibility(false);
                }
            }
        }

        /**
         * Destroy this annotation
         */
        destroy() {
        }

        // ** private stuff

        _copy(dst: any, src: any) {
            for (var key in src) {
                if (key in dst) {
                    this._processOptions(key, dst, src);
                }
            }
        }
        _processOptions(key, dst, src) {
            dst[key] = src[key];
        }
        _resetDefaultValue() {
            var self = this;
            self._attachment = AnnotationAttachment.Absolute;
            self._point = new wjcChart.DataPoint(0, 0);
            self._seriesIndex = 0;
            self._pointIndex = 0;
            self._position = AnnotationPosition.Center;
            self._offset = new wjcCore.Point(0, 0);
            self._isVisible = true;
            self._tooltip = '';
        }

        _toggleVisibility(visible: boolean) {
            var str = visible ? 'visible' : 'hidden';

            if (this._element) {
                this._element.setAttribute('visibility', str);
            }
        }

        _getCSSClass() {
            return AnnotationBase._CSS_ANNOTATION;
        }

        _render(engine: wjcChart.IRenderEngine) {
            this._element = null;
        }

        _repaint() {
            if (this._layer) {
                this._layer._renderAnnotation(this);
            }
        }

        _convertPoint(pt?: wjcChart.DataPoint): wjcCore.Point {
            var self = this,
                att = self._attachment,
                newPt = new wjcCore.Point(),
                chart,
                rect: wjcCore.Rect,
                aX: wjcChart.Axis, aY: wjcChart.Axis, data,
                series: wjcChart.Series, item,
                xVal;

            if (self._layer && self._layer._chart) {
                chart = self._layer._chart;
                rect = chart._plotRect;
            }
            switch (att) {
                case AnnotationAttachment.DataIndex:
                    if (!chart.series || chart.series.length <= self.seriesIndex) {
                        break;
                    }
                    series = chart.series[self.seriesIndex];
                    item = series._getItem(self.pointIndex);
                    if (!item) {
                        break;
                    }
                    aX = series.axisX || chart.axisX;
                    aY = series.axisY || chart.axisY;
                    xVal = item[series.bindingX] || item['x'];
                    if (typeof xVal === 'string') {
                        xVal = self.pointIndex;
                    }
                    newPt.x = self._convertDataToLen(rect.width, aX, xVal);
                    newPt.y = self._convertDataToLen(rect.height, aY, item[series._getBinding(0)] || aY.actualMin + 0.25, true);
                    break;
                case AnnotationAttachment.DataCoordinate:
                    aX = chart.axisX;
                    aY = chart.axisY;
                    newPt.x = self._convertDataToLen(rect.width, aX, pt.x);
                    newPt.y = self._convertDataToLen(rect.height, aY, pt.y, true);
                    break;
                case AnnotationAttachment.Relative:
                    newPt.x = rect.width * pt.x;
                    newPt.y = rect.height * pt.y;
                    break;
                case AnnotationAttachment.Absolute:
                default:
                    newPt.x = pt.x;
                    newPt.y = pt.y;
                    break;
            }
            return newPt;
        }

        _convertDataToLen(total: number, axis: wjcChart.Axis, val, converted = false): number {
            var min = axis.min == null ? axis.actualMin : axis.min,
                max = axis.max == null ? axis.actualMax : axis.max;

            if (converted) {
                return total * (1 - (val - min) / (max - min));
            } else {
                return total * (val - min) / (max - min);
            }
        }

        _renderCenteredText(content: string, engine: wjcChart.IRenderEngine, point: wjcCore.Point, className?: string, angle?: number, style?: any) {
            var text: SVGTextElement,
                box: SVGRect;


            if (!this._isValidPoint(point)) {
                return;
            }
            if (angle) {
                engine.drawStringRotated(content, point, point, angle, className, style);
            } else {
                engine.drawString(content, point, className, style);
            }
            text = <SVGTextElement>this._element.querySelector('text');
            if (text) {
                box = text.getBBox();
                text.setAttribute('x', (point.x - box.width / 2).toFixed(1));
                text.setAttribute('y', (point.y + box.height / 6).toFixed(1));
            }
        }

        _adjustOffset(pt: wjcCore.Point, offset: wjcCore.Point) {
            pt.x = pt.x + offset.x;
            pt.y = pt.y + offset.y;
        }

        _getOffset(engine?: wjcChart.IRenderEngine): wjcCore.Point {
            var posOffset = this._getPositionOffset(engine);
            return new wjcCore.Point(this._offset.x + posOffset.x, this._offset.y + posOffset.y);
        }

        _getPositionOffset(engine?: wjcChart.IRenderEngine): wjcCore.Point {
            var posOffset = new wjcCore.Point(0, 0),
                pos = this.position,
                size = this._getSize(engine);

            if ((pos & AnnotationPosition.Top) === AnnotationPosition.Top) {
                //top
                posOffset.y -= size.height / 2;
            } else if ((pos & AnnotationPosition.Bottom) === AnnotationPosition.Bottom) {
                //bottom
                posOffset.y += size.height / 2;
            }
            if ((pos & AnnotationPosition.Left) === AnnotationPosition.Left) {
                //left
                posOffset.x -= size.width / 2;
            } else if ((pos & AnnotationPosition.Right) === AnnotationPosition.Right) {
                //right
                posOffset.x += size.width / 2;
            }
            return posOffset;
        }

        _getSize(engine?: wjcChart.IRenderEngine): wjcCore.Size {
            return new wjcCore.Size();
        }

        _isValidPoint(pt: wjcCore.Point): boolean {
            return isFinite(pt.x) && isFinite(pt.y);
        }

        // SVGRenderEngine will remove _textGroup element from _svg element after endRender is invoked.
        // Exception will be thrown when invoking measureString in FF because the element is not in Dom tree.
        _measureString(engine: wjcChart.IRenderEngine, text: string, className: string): wjcCore.Size {
            var e = <any>engine,
                size: wjcCore.Size;
            if (e._textGroup && e._textGroup.parentNode == null) {
                e._svg.appendChild(e._textGroup);
                size = e.measureString(text, className, null, this.style);
                e.endRender();
            } else {
                size = e.measureString(text, className, null, this.style);
            }
            return size;
        }
    }

    /**
     * Represents a text annotation for the @see:AnnotationLayer.
     */
    export class Text extends AnnotationBase {
        static _CSS_TEXT = 'wjchart-anno-text';
        private _text: string;

        /**
         * Initializes a new instance of the @see:Text annotation class.
         * 
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any) {
            super(options);
        }

        _resetDefaultValue() {
            super._resetDefaultValue();
            this._text = '';
            this.position = AnnotationPosition.Top;
        }

        _getCSSClass() {
            return super._getCSSClass() + ' ' + Text._CSS_TEXT;
        }

        /**
         * Gets or sets the text of the annotation.
         */
        get text(): string {
            return this._text;
        }
        set text(value: string) {
            var self = this;

            if (value === self._text) {
                return;
            }
            self._text = value;
            self._repaint();
        }

        _render(engine: wjcChart.IRenderEngine) {
            var self = this,
                pt = self._convertPoint(self.point),
                offset: wjcCore.Point;

            offset = self._getOffset(engine);
            self._adjustOffset(pt, offset);
            self._renderCenteredText(self._text, engine, pt, AnnotationBase._CSS_ANNO_TEXT, null, self.style);
        }

        _getSize(engine?: wjcChart.IRenderEngine): wjcCore.Size {
            if (engine) {
                return this._measureString(engine, this._text, AnnotationBase._CSS_ANNO_TEXT);
            } else {
                return new wjcCore.Size();
            }
        }
    }

    /**
     * Represents a base class of shape annotations for the @see:AnnotationLayer.
     */
    export class Shape extends AnnotationBase {
        //Shape type: Line, Polygon, Ellipse, Rectangle, Circle, Square, Image
        static _CSS_SHAPE = 'wjchart-anno-shape';
        private _content: string;
        _shapeContainer: SVGGElement;

        /**
         * Initializes a new instance of the @see:Shape annotation class.
         * 
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any) {
            super(options);
        }

        _resetDefaultValue() {
            super._resetDefaultValue();
            this._content = '';
        }

        _getCSSClass() {
            return super._getCSSClass() + ' ' + Shape._CSS_SHAPE;
        }

        /**
         * Gets or sets the text of the annotation.
         */
        get content(): string {
            return this._content;
        }
        set content(value: string) {
            var self = this;

            if (value === self._content) {
                return;
            }
            self._content = value;
            self._repaint();
        }

        _render(engine: wjcChart.IRenderEngine) {
            var self = this;

            self._shapeContainer = engine.startGroup();
            engine.stroke = '#000';
            self._renderShape(engine);
            engine.stroke = null;
            engine.endGroup();

            if (self._content) {
                self._renderText(engine);
            }
        }

        _getContentCenter(): wjcChart.DataPoint {
            return this.point;
        }

        _renderShape(engine: wjcChart.IRenderEngine) {
        }

        _renderText(engine: wjcChart.IRenderEngine) {
            var self = this,
                contentCenter: wjcCore.Point,
                offset: wjcCore.Point;

            contentCenter = self._convertPoint(self._getContentCenter());
            if (!self._isValidPoint(contentCenter)) {
                return;
            }
            offset = self._getOffset();
            self._adjustOffset(contentCenter, offset);
            self._renderCenteredText(self._content, engine, contentCenter, AnnotationBase._CSS_ANNO_TEXT);
        }
    }

    /**
     * Represents an ellipse annotation for @see:AnnotationLayer.
     */
    export class Ellipse extends Shape {
        static _CSS_ELLIPSE = 'wjchart-anno-ellipse';

        private _width: number;
        private _height: number;

        /**
         * Initializes a new instance of the @see:Ellipse annotation class.
         * 
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any) {
            super(options);
        }

        /**
         * Gets or sets the width of the @see:Ellipse annotation.
         */
        get width(): number {
            return this._width;
        }
        set width(value: number) {
            if (value === this._width) {
                return;
            }
            this._width = wjcCore.asNumber(value, false, true);
            this._repaint();
        }

        /**
         * Gets or sets the height of the @see:Ellipse annotation.
         */
        get height(): number {
            return this._height;
        }
        set height(value: number) {
            if (value === this._height) {
                return;
            }
            this._height = wjcCore.asNumber(value, false, true);
            this._repaint();
        }

        _resetDefaultValue() {
            super._resetDefaultValue();
            this._width = 100;
            this._height = 80;
        }

        _getCSSClass() {
            return super._getCSSClass() + ' ' + Ellipse._CSS_ELLIPSE;
        }

        _renderShape(engine: wjcChart.IRenderEngine) {
            super._renderShape(engine);
            var self = this,
                pt = self._convertPoint(self.point),
                w = self._width,
                h = self._height,
                offset = self._getOffset();

            self._adjustOffset(pt, offset);
            if(self._isValidPoint(pt)) {
                engine.drawEllipse(pt.x, pt.y, w / 2, h / 2, AnnotationBase._CSS_ANNO_SHAPE, self.style);
            }
        }

        _getSize(): wjcCore.Size {
            return new wjcCore.Size(this.width, this.height);
        }
    }

    /**
     * Represents a rectangle annotation for @see:AnnotationLayer.
     */
    export class Rectangle extends Shape {
        static _CSS_RECTANGLE = 'wjchart-anno-rectangle';

        private _width: number;
        private _height: number;

        /**
         * Initializes a new instance of the @see:Rectangle annotation class.
         * 
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any) {
            super(options);
        }

        /**
         * Gets or sets the width of the @see:Rectangle annotation.
         */
        get width(): number {
            return this._width;
        }
        set width(value: number) {
            if (value === this._width) {
                return;
            }
            this._width = wjcCore.asNumber(value, false, true);
            this._repaint();
        }

        /**
         * Gets or sets the height of the @see:Rectangle annotation.
         */
        get height(): number {
            return this._height;
        }
        set height(value: number) {
            if (value === this._height) {
                return;
            }
            this._height = wjcCore.asNumber(value, false, true);
            this._repaint();
        }

        _resetDefaultValue() {
            super._resetDefaultValue();
            this._width = 100;
            this._height = 80;
        }

        _getCSSClass() {
            return super._getCSSClass() + ' ' + Rectangle._CSS_RECTANGLE;
        }

        _renderShape(engine: wjcChart.IRenderEngine) {
            super._renderShape(engine);

            var self = this,
                pt = self._convertPoint(self.point),
                w = self._width,
                h = self._height,
                offset = self._getOffset();

            self._adjustOffset(pt, offset);
            if (self._isValidPoint(pt)) {
                engine.drawRect(pt.x - w / 2, pt.y - h / 2, self._width, self._height, AnnotationBase._CSS_ANNO_SHAPE, self.style);
            }
        }

        _getSize(): wjcCore.Size {
            return new wjcCore.Size(this.width, this.height);
        }
    }

    /**
     * Represents a line annotation for @see:AnnotationLayer.
     */
    export class Line extends Shape {
        static _CSS_LINE = 'wjchart-anno-line';

        private _start: wjcChart.DataPoint;
        private _end: wjcChart.DataPoint;
        //converted start and end.
        private _cS: wjcCore.Point;
        private _cE: wjcCore.Point;

        /**
         * Initializes a new instance of the @see:Line annotation class.
         * 
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any) {
            super(options);
        }

        /**
         * Gets or sets the start point of the @see:Line annotation.
         */
        get start(): wjcChart.DataPoint {
            return this._start;
        }
        set start(value: wjcChart.DataPoint) {
            var self = this;

            if (value.x == null || value.y == null) {
                return;
            }
            if (value.x === self._start.x && value.y === self._start.y) {
                return;
            }
            self._start = value;
            self._repaint();
        }

        /**
         * Gets or sets the end point of the Line annotation.
         */
        get end(): wjcChart.DataPoint {
            return this._end;
        }
        set end(value: wjcChart.DataPoint) {
            var self = this;

            if (value.x == null || value.y == null) {
                return;
            }
            if (value.x === self._end.x && value.y === self._end.y) {
                return;
            }
            self._end = value;
            self._repaint();
        }

        _resetDefaultValue() {
            super._resetDefaultValue();
            this._start = new wjcChart.DataPoint(0, 0);
            this._end = new wjcChart.DataPoint(0, 0);
            this.position = AnnotationPosition.Top;
        }

        _getCSSClass() {
            return super._getCSSClass() + ' ' + Line._CSS_LINE;
        }

        _getContentCenter(): wjcChart.DataPoint {
            var start = this.start,
                end = this.end;
            return new wjcChart.DataPoint((start.x + end.x) / 2, (start.y + end.y) / 2);
        }

        _renderShape(engine: wjcChart.IRenderEngine) {
            super._renderShape(engine);

            var self = this,
                start = self._convertPoint(self._start),
                end = self._convertPoint(self._end),
                offset;

            self._cS = start;
            self._cE = end;
            offset = self._getOffset();
            self._adjustOffset(start, offset);
            self._adjustOffset(end, offset);
            if (self._isValidPoint(start) && self._isValidPoint(end)) {
                engine.drawLine(start.x, start.y, end.x, end.y, AnnotationBase._CSS_ANNO_SHAPE, self.style);
            }
        }

        _getSize(): wjcCore.Size {
            var start = this._cS,
                end = this._cE;
            return new wjcCore.Size(Math.abs(start.x - end.x), Math.abs(start.y - end.y));
        }

        _renderText(engine: wjcChart.IRenderEngine) {
            var self = this,
                contentCenter: wjcCore.Point,
                offset: wjcCore.Point,
                start = self._cS,
                end = self._cE,
                angle;

            contentCenter = self._convertPoint(self._getContentCenter());
            offset = self._getOffset();
            self._adjustOffset(contentCenter, offset);
            if (!self._isValidPoint(contentCenter)) {
                return;
            }
            angle = Math.atan2((end.y - start.y), (end.x - start.x)) * 180 / Math.PI;
            angle = angle < -90 ? angle + 180 : (angle > 90 ? angle - 180 : angle);
            self._renderCenteredText(self.content, engine, contentCenter, AnnotationBase._CSS_ANNO_TEXT, angle);
        }

        _renderCenteredText(content: string, engine: wjcChart.IRenderEngine, point: wjcCore.Point, className?: string, angle?: number, style?: any) {
            if (angle != null) {
                //text on top of line.
                var offsetX, offsetY, len, radian;

                len = this._measureString(engine, content, className).height / 2;
                radian = angle * Math.PI / 180;
                offsetX = len * Math.sin(radian);
                offsetY = len * Math.cos(radian);
                point.x = point.x + offsetX;
                point.y = point.y - offsetY;
            }
            super._renderCenteredText(content, engine, point, className, angle, style);
        }
    }

    /**
     * Represents a polygon annotation for @see:AnnotationLayer.
     */
    export class Polygon extends Shape {
        static _CSS_POLYGON = 'wjchart-anno-polygon';

        private _points: wjcCore.ObservableArray;

        /**
         * Initializes a new instance of the @see:Polygon annotation class.
         * 
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any) {
            super(options);
        }

        _processOptions(key, dst, src) {
            if (key === 'points') {
                var val = src[key];
                if(wjcCore.isArray(val)) {
                    val.forEach(v => {
                        this.points.push(v);
                    });
                }
            } else {
                super._processOptions(key, dst, src);
            }
        }

        /**
         * Gets the collection of points of the @see:Polygon annotation.
         */
        get points(): wjcCore.ObservableArray {
            return this._points;
        }

        _resetDefaultValue() {
            var self = this;
            super._resetDefaultValue();
            self._points = new wjcCore.ObservableArray();
            self._points.collectionChanged.addHandler(function () {
                if (self._element) {
                    self._repaint();
                }
            });
        }

        _getCSSClass() {
            return super._getCSSClass() + ' ' + Polygon._CSS_POLYGON;
        }

        _getContentCenter(): wjcChart.DataPoint {
            var pts = this.points,
                len = pts.length,
                x: number = 0, y: number = 0, i: number;

            for (i = 0; i < len; i++) {
                x += pts[i].x;
                y += pts[i].y;
            }
            return new wjcChart.DataPoint(x / len, y / len);
        }

        _renderShape(engine: wjcChart.IRenderEngine) {
            super._renderShape(engine);

            var self = this,
                xs = [], ys = [],
                pts = self._points,
                len = pts.length,
                i, pt,
                offset = self._getOffset();

            for (i = 0; i < len; i++) {
                pt = self._convertPoint(pts[i]);
                if (!self._isValidPoint(pt)) {
                    return;
                }
                self._adjustOffset(pt, offset);
                xs.push(pt.x);
                ys.push(pt.y);
            }
            engine.drawPolygon(xs, ys, AnnotationBase._CSS_ANNO_SHAPE, self.style);
        }

        _getSize(): wjcCore.Size {
            var self = this,
                xMin, xMax, yMin, yMax, i, pt,
                len = self._points.length,
                pts;

            pts = [].map.call(self._points, function (pt) {
                return self._convertPoint(pt);
            });

            for (i = 0; i < len; i++) {
                pt = pts[i];
                if (i === 0) {
                    xMin = xMax = pt.x;
                    yMin = yMax = pt.y;
                    continue;
                }
                if (pt.x < xMin) {
                    xMin = pt.x;
                } else if (pt.x > xMax) {
                    xMax = pt.x;
                }
                if (pt.y < yMin) {
                    yMin = pt.y;
                } else if (pt.y > yMax) {
                    yMax = pt.y;
                }
            }
            return new wjcCore.Size(xMax - xMin, yMax - yMin);
        }
    }

    /**
     * Represents a circle annotation for @see:AnnotationLayer.
     */
    export class Circle extends Shape {
        static _CSS_CIRCLE = 'wjchart-anno-circle';

        private _radius: number;

        /**
         * Initializes a new instance of the @see:Circle annotation class.
         * 
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any) {
            super(options);
        }

        /**
         * Gets or sets the radius of the @see:Circle annotation.
         */
        get radius(): number {
            return this._radius;
        }
        set radius(value: number) {
            if (value === this._radius) {
                return;
            }
            this._radius = wjcCore.asNumber(value, false, true);
            this._repaint();
        }

        _resetDefaultValue() {
            super._resetDefaultValue();
            this._radius = 100;
        }

        _getCSSClass() {
            return super._getCSSClass() + ' ' + Circle._CSS_CIRCLE;
        }

        _renderShape(engine: wjcChart.IRenderEngine) {
            super._renderShape(engine);

            var self = this,
                pt = self._convertPoint(self.point),
                offset = self._getOffset();
            self._adjustOffset(pt, offset);
            if (self._isValidPoint(pt)) {
                engine.drawPieSegment(pt.x, pt.y, self.radius, 0, 360, AnnotationBase._CSS_ANNO_SHAPE, self.style);
            }
        }

        _getSize(): wjcCore.Size {
            var d = this.radius * 2;

            return new wjcCore.Size(d, d);
        }
    }

    /**
     * Represents a square annotation for the @see:AnnotationLayer.
     */
    export class Square extends Shape {
        static _CSS_SQUARE = 'wjchart-anno-square';

        private _length: number;

        /**
         * Initializes a new instance of the @see:Square annotation class.
         * 
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any) {
            super(options);
        }

        /**
         * Gets or sets the length of the @see:Square annotation.
         */
        get length(): number {
            return this._length;
        }
        set length(value: number) {
            if (value === this._length) {
                return;
            }
            this._length = wjcCore.asNumber(value, false, true);
            this._repaint();
        }

        _resetDefaultValue() {
            super._resetDefaultValue();
            this._length = 100;
        }

        _getCSSClass() {
            return super._getCSSClass() + ' ' + Square._CSS_SQUARE;
        }

        _renderShape(engine: wjcChart.IRenderEngine) {
            super._renderShape(engine);

            var self = this,
                pt = self._convertPoint(self.point),
                len = self.length,
                offset = self._getOffset();
            self._adjustOffset(pt, offset);
            if (self._isValidPoint(pt)) {
                engine.drawRect(pt.x - len / 2, pt.y - len / 2, len, len, AnnotationBase._CSS_ANNO_SHAPE, self.style);
            }
        }

        _getSize(): wjcCore.Size {
            return new wjcCore.Size(this.length, this.length);
        }
    }

    /**
     * Represents an image annotation for @see:AnnotationLayer.
     */
    export class Image extends Shape {
        static _CSS_IMAGE = 'wjchart-anno-image';

        private _width: number;
        private _height: number;
        private _href: string;

        /**
         * Initializes a new instance of the @see:Image annotation class.
         * 
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any) {
            super(options);
        }

        /**
         * Gets or sets the width of the @see:Image annotation.
         */
        get width(): number {
            return this._width;
        }
        set width(value: number) {
            if (value === this._width) {
                return;
            }
            this._width = wjcCore.asNumber(value, false, true);
            this._repaint();
        }

        /**
         * Gets or sets the height of the @see:Image annotation.
         */
        get height(): number {
            return this._height;
        }
        set height(value: number) {
            if (value === this._height) {
                return;
            }
            this._height = wjcCore.asNumber(value, false, true);
            this._repaint();
        }

        /**
         * Gets or sets the href of the @see:Image annotation.
         */
        get href(): string {
            return this._href;
        }
        set href(value: string) {
            if (value === this._href) {
                return;
            }
            this._href = value;
            this._repaint();
        }

        _resetDefaultValue() {
            super._resetDefaultValue();
            this._width = 100;
            this._height = 100;
            this._href = '';
        }

        _getCSSClass() {
            return super._getCSSClass() + ' ' + Image._CSS_IMAGE;
        }

        _renderShape(engine: wjcChart.IRenderEngine) {
            super._renderShape(engine);

            var self = this,
                pt = self._convertPoint(self.point),
                href = self._href,
                w = self.width,
                h = self.height,
                offset = self._getOffset();

            if (href.length > 0 && self._isValidPoint(pt)) {
                self._adjustOffset(pt, offset);
                engine.drawImage(href, pt.x - w / 2, pt.y - h / 2, w, h);
            }
            self._applyStyle(self._element, self.style);
        }

        _getSize(): wjcCore.Size {
            return new wjcCore.Size(this.width, this.height);
        }


        private _applyStyle(el: SVGElement, style: any) {
            if (style) {
                for (var key in style) {
                    el.setAttribute(this._deCase(key), style[key]);
                }
            }
        }

        private _deCase(s: string): string {
            return s.replace(/[A-Z]/g, function (a) {return '-' + a.toLowerCase() });
        }

    }

 
/**
 * Defines the @see:AnnotationLayer and various annotations for @see:FlexChart and 
 * @see:FinancialChart.
 */

    'use strict';

    /**
     * Represents an annotation layer for @see:FlexChart and @see:FinancialChart.
     *
     * The AnnotationLayer contains a collection of various annotation elements: texts, 
     * lines, images, rectangles etc.
     * To use the @see:AnnotationLayer, create annotations and push them to the layer's 
     * items property.
     */
    export class AnnotationLayer {
        static _CSS_Layer = 'wj-chart-annotationlayer';

        private _items: wjcCore.ObservableArray;
        private _engine: wjcChart.IRenderEngine;
        _layerEle: SVGGElement;
        private _plotrectId: string;
        private _tooltip: wjcChart.ChartTooltip;
        //prevent others from closing annotation's tooltip.
        private _forceTTShowing: boolean;
        //prevent annotation from closing others tooltip.
        private _annoTTShowing: boolean;
        _chart: wjcChart.FlexChartCore;

        /**
         * Initializes a new instance of the @see:AnnotationLayer class.
         * 
         * @param chart A chart to which the @see:AnnotationLayer is attached.
         * @param options A JavaScript object containing initialization data for 
         * @see:AnnotationLayer.  
         */
        constructor(chart: wjcChart.FlexChartCore, options?) {
            var self = this;

            self._init(chart);
            self._renderGroup();
            self._bindTooltip();
            if (options && wjcCore.isArray(options)) {
                options.forEach( val => {
                    var type = val['type'] || 'Circle',
                        annotation;
                    if (wjcSelf[type]) {
                        annotation = new wjcSelf[type](val);
                        self._items.push(annotation);
                    }
                });
            }
        }

        _init(chart: wjcChart.FlexChartCore) {
            var self = this;
            self._items = new wjcCore.ObservableArray();
            self._items.collectionChanged.addHandler(self._itemsChanged, self);
            self._chart = chart;
            self._forceTTShowing = false;
            self._annoTTShowing = false;
            self._engine = chart._currentRenderEngine;
            chart.rendered.addHandler(self._renderAnnotations, self);
            chart.lostFocus.addHandler(self._lostFocus, self);
        }

        private _lostFocus(evt) {
            this._toggleTooltip(this._tooltip, evt, this._chart.hostElement);
        }

        /**
         * Gets the collection of annotation elements in the @see:AnnotationLayer.
         */
        get items(): wjcCore.ObservableArray {
            return this._items;
        }

        /**
         * Gets an annotation element by name in the @see:AnnotationLayer.
         * @param name The annotation's name.
         */
        getItem(name: string): AnnotationBase {
            var items = this.getItems(name);

            if (items.length > 0) {
                return items[0];
            } else {
                return null;
            }
        }

        /**
         * Gets the annotation elements by name in the @see:AnnotationLayer.
         * @param name The annotations' name.
         */
        getItems(name: string): Array<AnnotationBase> {
            var items = [];
            if (this._items.length === 0 || !name || name === '') {
                return items;
            }

            for (var i = 0; i < this._items.length; i++) {
                if (name === this._items[i].name) {
                    items.push(this._items[i]);
                }
            }
            return items;
        }


        private _bindTooltip() {
            var self = this,
                ele = self._chart.hostElement,
                tooltip = self._tooltip,
                ttHide: Function;

            if (!tooltip) {
                tooltip = self._tooltip = new wjcChart.ChartTooltip();
                ttHide = wjcCore.Tooltip.prototype.hide;
                wjcCore.Tooltip.prototype.hide = function () {
                    if (self._forceTTShowing) {
                        return;
                    }
                    ttHide.call(tooltip);
                }
            }

            if (ele) {
                ele.addEventListener('click', function (evt) {
                    self._toggleTooltip(tooltip, evt, ele);
                });
                ele.addEventListener('mousemove', function (evt) {
                    if (self._showTooltip()) {
                        self._toggleTooltip(tooltip, evt, ele);
                    }
                });
            }
        }

        _showTooltip() {
            return !this._chart.isTouching;
        }

        private _toggleTooltip(tooltip, evt, parentNode) {
            var self = this,
                annotation = self._getAnnotation(evt.target, parentNode);
            if (annotation && annotation.tooltip) {
                self._forceTTShowing = true;
                self._annoTTShowing = true;
                tooltip.show(self._layerEle, annotation.tooltip, new wjcCore.Rect(evt.clientX, evt.clientY, 5, 5));
            } else {
                if (!self._annoTTShowing) {
                    return;
                }
                self._annoTTShowing = false;
                self._forceTTShowing = false;
                tooltip.hide();
            }
        }

        _getAnnotation(ele, parentNode): AnnotationBase {
            var node = this._getAnnotationElement(ele, parentNode);
            if (node == null) {
                return null;
            }
            return node[AnnotationBase._DATA_KEY];
        }

        private _getAnnotationElement(ele, pNode): SVGGElement {
            if (!ele || !pNode) {
                return null;
            }
            var parentNode = ele.parentNode;
            if (wjcCore.hasClass(ele, AnnotationBase._CSS_ANNOTATION)) {
                return ele;
            } else if (parentNode == null || parentNode === document.body || parentNode === document || parentNode === pNode) {
                return null;
            } else {
                return this._getAnnotationElement(parentNode, pNode);
            }
        }

        private _itemsChanged(items, e: wjcCore.NotifyCollectionChangedEventArgs) {
            var action = e.action,
                item: AnnotationBase = e.item;

            switch (action) {
                case wjcCore.NotifyCollectionChangedAction.Add:
                case wjcCore.NotifyCollectionChangedAction.Change:
                    item._layer = this;
                    this._renderAnnotation(item);
                    break;
                case wjcCore.NotifyCollectionChangedAction.Remove:
                    this._destroyAnnotation(item);
                    break;
                default:
                    break;
            }
        }

        private _renderAnnotations() {
            var items = this.items,
                len = items.length,
                i;

            this._renderGroup();
            for (i = 0; i < len; i++) {
                this._renderAnnotation(items[i]);
            }
        }

        _renderGroup() {
            var self = this,
                engine = <any>self._engine,
                rect = self._chart._plotRect,
                parent;

            if (!rect) {
                return;
            }

            if (!self._layerEle || self._layerEle.parentNode == null) {

                self._plotrectId = 'plotRect' + (1000000 * Math.random()).toFixed();
                //set rect.left/top to 0 because clippath will translate with g element together.
                engine.addClipRect({
                    left: 0,
                    top: 0,
                    width: rect.width,
                    height: rect.height
                }, self._plotrectId);

                self._layerEle = engine.startGroup(AnnotationLayer._CSS_Layer, self._plotrectId);
                self._layerEle.setAttribute('transform', 'translate(' + rect.left + ', ' + rect.top + ')');
                engine.endGroup();
            }
        }

        _renderAnnotation(item: AnnotationBase) {
            if (!this._layerEle || this._layerEle.parentNode == null) {
                return;
            }
            if (item._element && item._element.parentNode == this._layerEle) {
                this._layerEle.removeChild(item._element);
            }
            item.render(this._engine);
            this._layerEle.appendChild(item._element);
        }

        private _destroyAnnotations() {
            var items = this.items,
                len = items.length,
                i;

            for (i = 0; i < len; i++) {
                this._destroyAnnotation(items[i]);
            }
        }

        private _destroyAnnotation(item: AnnotationBase) {
            if (this._layerEle) {
                this._layerEle.removeChild(item._element);
            }
            item.destroy();
        }

        //TODO: hitTest method.
        //HitTestInfo in chart is not suitable for this, because annotation is not only x/y data coordinate.
    }
 

