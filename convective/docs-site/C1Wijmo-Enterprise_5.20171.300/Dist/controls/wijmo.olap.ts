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
module wijmo.olap {
    'use strict';

    /**
     * Accumulates observations and returns aggregate statistics.
     */
    export class _Tally {
        _cnt = 0;
        _cntn = 0;
        _sum = 0;
        _sum2 = 0;
        _min = null;
        _max = null;
        _first = null;
        _last = null;

        /**
         * Adds a value to the tally.
         *
         * @param value Value to be added to the tally.
         * @param weight Weight to be attributed to the value.
         */
        add(value: any, weight?: number) {
            if (value instanceof _Tally) {

                // add a tally
                this._sum += value._sum;
                this._sum2 += value._sum2;
                this._max = this._max && value._max ? Math.max(this._max, value._max) : (this._max || value._max);
                this._min = this._min && value._min ? Math.min(this._min, value._min) : (this._min || value._min);
                this._cnt += value._cnt;
                this._cntn += value._cntn;

            } else if (value != null) {

                // add a value
                this._cnt++;
                if (isBoolean(value)) { // Booleans aggregate like 1/0
                    value = value ? 1 : 0;
                }
                if (this._min == null || value < this._min) {
                    this._min = value;
                }
                if (this._max == null || value > this._max) {
                    this._max = value;
                }
                if (this._first == null) {
                    this._first = value;
                }
                this._last = value;
                if (isNumber(value) && !isNaN(value)) {
                    if (isNumber(weight)) {
                        value *= weight;
                    }
                    this._cntn++;
                    this._sum += value;
                    this._sum2 += value * value;
                }
            }
        }
        /**
         * Gets an aggregate statistic from the tally.
         *
         * @param aggregate Type of aggregate statistic to get.
         */
        getAggregate(aggregate: Aggregate): number {

            // for compatibility with Excel PivotTables
            if (this._cnt == 0) {
                return null;
            }

            var avg = this._cntn == 0 ? 0 : this._sum / this._cntn;
            switch (aggregate) {
                case Aggregate.Avg:
                    return avg;
                case Aggregate.Cnt:
                    return this._cnt;
                case Aggregate.Max:
                    return this._max;
                case Aggregate.Min:
                    return this._min;
                case Aggregate.Rng:
                    return this._max - this._min;
                case Aggregate.Sum:
                    return this._sum;
                case Aggregate.VarPop:
                    return this._cntn <= 1 ? 0 : this._sum2 / this._cntn - avg * avg;
                case Aggregate.StdPop:
                    return this._cntn <= 1 ? 0 : Math.sqrt(this._sum2 / this._cntn - avg * avg);
                case Aggregate.Var:
                    return this._cntn <= 1 ? 0 : (this._sum2 / this._cntn - avg * avg) * this._cntn / (this._cntn - 1);
                case Aggregate.Std:
                    return this._cntn <= 1 ? 0 : Math.sqrt((this._sum2 / this._cntn - avg * avg) * this._cntn / (this._cntn - 1));
                case Aggregate.First:
                    return this._first;
                case Aggregate.Last:
                    return this._last;
            }

            // should never get here...
            throw 'Invalid aggregate type.';
        }
    }
}
module wijmo.olap {
    'use strict';

    /**
     * Represents a combination of @see:PivotField objects and their values.
     *
     * Each row and column on the output view is defined by a unique @see:PivotKey.
     * The values in the output cells represent an aggregation of the value field 
     * for all items that match the row and column keys.
     *
     * For example, if a column key is set to 'Country:UK;Customer:Joe' and 
     * the row key is set to 'Category:Desserts;Product:Pie', then the corresponding 
     * cell contains the aggregate for all items with the following properties:
     *
     * <pre>{ Country: 'UK', Customer: 'Joe', Category: 'Desserts', Product: 'Pie' };</pre>
     */
    export class _PivotKey {
        _fields: PivotFieldCollection;
        _fieldCount: number;
        _valueFields: PivotFieldCollection;
        _valueFieldIndex: number;
        _item: any;
        _key: string;
        _vals: any[];
        _names: string[];

        // name of the output field that contains the row's pivot key
        static _ROW_KEY_NAME = '$rowKey';

        /**
         * Initializes a new instance of the @see:PivotKey class.
         *
         * @param fields @see:PivotFieldCollection that owns this key.
         * @param fieldCount Number of fields to take into account for this key.
         * @param valueFields @see:PivotFieldCollection that contains the values for this key.
         * @param valueFieldIndex Index of the value to take into account for this key.
         * @param item First data item represented by this key.
         */
        constructor(fields: PivotFieldCollection, fieldCount: number, valueFields: PivotFieldCollection, valueFieldIndex: number, item: any) {
            this._fields = fields;
            this._fieldCount = fieldCount;
            this._valueFields = valueFields;
            this._valueFieldIndex = valueFieldIndex;
            this._item = item;
        }

        /**
         * Gets the @see:PivotFieldCollection that owns this key.
         */
        get fields(): PivotFieldCollection {
            return this._fields;
        }
        /**
         * Gets the @see:PivotFieldCollection that contains the values for this key.
         */
        get valueFields(): PivotFieldCollection {
            return this._valueFields;
        }
        /**
         * Gets an array with the values used to create this key.
         */
        get values(): any[] {
            if (this._vals == null) {
                this._vals = new Array(this._fieldCount);
                for (var i = 0; i < this._fieldCount; i++) {
                    var fld = <PivotField>this._fields[i];
                    this._vals[i] = fld._getValue(this._item, false);
                }
            }
            return this._vals;
        }
        /**
         * Gets an array with the names of the fields in this key.
         */
        get fieldNames(): string[] {
            if (!this._names) {
                this._names = [];
                for (var i = 0; i < this.fields.length; i++) {
                    var pf = this._fields[i];
                    this._names.push(pf._getName());
                }
            }
            return this._names;
        }
        /**
         * Gets the type of aggregate represented by this key.
         */
        get aggregate(): Aggregate {
            var vf = this._valueFields,
                idx = this._valueFieldIndex;
            assert(vf && idx > -1 && idx < vf.length, 'aggregate not available for this key');
            return (<PivotField>vf[idx]).aggregate;
        }
        /**
         * Gets the value for this key at a given index.
         *
         * @param index Index of the field to be retrieved.
         * @param formatted Whether to return a formatted string or the raw value.
         */
        getValue(index: number, formatted: boolean) {
            if (this.values.length == 0) {
                return culture.olap.PivotEngine.grandTotal;
            }
            if (index > this.values.length - 1) {
                return culture.olap.PivotEngine.subTotal;
            }
            var val = this.values[index];
            if (formatted && !isString(val)) {
                val = Globalize.format(this.values[index], this.fields[index].format);
            }
            return val;
        }
        /**
         * Comparer function used to sort arrays of @see:_PivotKey objects.
         *
         * @param key @see:_PivotKey to compare to this one.
         */
        compareTo(key: _PivotKey): number {
            var cmp = 0;
            if (key != null && key._fields == this._fields) {

                // compare values
                var vals = this.values,
                    kvals = key.values,
                    count = Math.min(vals.length, kvals.length);
                for (var i = 0; i < count; i++) {
            
                    // get types and value to compare
                    var type = vals[i] != null ? getType(vals[i]) : null,
                        ic1 = vals[i],
                        ic2 = kvals[i];

                    // Dates are hard because the format used may affect the sort order: 
                    // for example, 'MMMM' shows only months, so the year should not be taken into account when sorting.
                    if (type == DataType.Date) {
                        var fld = <PivotField>this._fields[i],
                            fmt = fld.format;
                        if (fmt && fmt != 'd' && fmt != 'D') {
                            var s1 = fld._getValue(this._item, true),
                                s2 = fld._getValue(key._item, true),
                                d1 = Globalize.parseDate(s1, fmt),
                                d2 = Globalize.parseDate(s2, fmt);
                            if (d1 && d2) { // parsed OK, compare parsed dates
                                ic1 = d1;
                                ic2 = d2;
                            } else { // parsing failed, compare as strings (e.g. "ddd")
                                ic1 = s1;
                                ic2 = s2;
                            }
                        }
                    }

                    // different values? we're done! (careful when comparing dates: TFS 190950)
                    var equal = (ic1 == ic2) || DateTime.equals(ic1, ic2);
                    if (!equal) {
                        if (ic1 == null) return +1; // can't compare nulls to non-nulls:
                        if (ic2 == null) return -1; // show nulls at the bottom!
                        cmp = ic1 < ic2 ? -1 : +1;
                        return this._fields[i].descending ? -cmp : cmp;
                    }
                }

                // compare value fields by index
                // for example, if this view has two value fields "Sales" and "Downloads",
                // then order the value fields by their position in the Values list.
                if (vals.length == kvals.length) {
                    cmp = this._valueFieldIndex - key._valueFieldIndex;
                    if (cmp != 0) {
                        return cmp;
                    }
                }

                // all values match, compare key length 
                // (so subtotals come at the bottom)
                cmp = kvals.length - vals.length;
                if (cmp != 0) {
                    return cmp * (this.fields.engine.totalsBeforeData ? -1 : +1);
                }
            }

            // keys are the same
            return 0;
        }
        /**
         * Gets a value that determines whether a given data object matches
         * this @see:_PivotKey.
         * 
         * The match is determined by comparing the formatted values for each
         * @see:PivotField in the key to the formatted values in the given item. 
         * Therefore, matches may occur even if the raw values are different.
         *
         * @param item Item to check for a match.
         */
        matchesItem(item: any): boolean {
            for (var i = 0; i < this._vals.length; i++) {
                var s1 = this.getValue(i, true),
                    s2 = this._fields[i]._getValue(item, true);
                if (s1 != s2) {
                    return false;
                }
            }
            return true;
        }

        // overridden to return a unique string for the key
        toString(): string {
            if (!this._key) {
                var key = '';

                // save pivot fields
                for (var i = 0; i < this._fieldCount; i++) {
                    var pf = this._fields[i];
                    key += pf._getName() + ':' + pf._getValue(this._item, true) + ';';
                }

                // save value field
                if (this._valueFields) {
                    var vf = this._valueFields[this._valueFieldIndex];
                    key += vf._getName() + ':0;';
                } else {
                    key += '{total}';
                }

                // cache the key
                this._key = key;
            }
            return this._key;
        }
   }
}
module wijmo.olap {
    'use strict';

    /**
     * Represents a tree of @see:_PivotField objects.
     *
     * This class is used only for optimization. It reduces the number of
     * @see:_PivotKey objects that have to be created while aggregating the
     * data.
     *
     * The optimization cuts the time required to summarize the data
     * to about half.
     */
    export class _PivotNode {
        _key: _PivotKey;
        _nodes: any;
        _tree: _PivotNode;
        _parent: _PivotNode;

        /**
         * Initializes a new instance of the @see:PivotNode class.
         *
         * @param fields @see:PivotFieldCollection that owns this node.
         * @param fieldCount Number of fields to take into account for this node.
         * @param valueFields @see:PivotFieldCollection that contains the values for this node.
         * @param valueFieldIndex Index of the value to take into account for this node.
         * @param item First data item represented by this node.
         * @param parent Parent @see:_PivotField.
         */
        constructor(fields: PivotFieldCollection, fieldCount: number, valueFields: PivotFieldCollection, valueFieldIndex: number, item: any, parent?: _PivotNode) {
            this._key = new _PivotKey(fields, fieldCount, valueFields, valueFieldIndex, item);
            this._nodes = {};
            this._parent = parent;
        }
        /**
         * Gets a child node from a parent node.
         *
         * @param fields @see:PivotFieldCollection that owns this node.
         * @param fieldCount Number of fields to take into account for this node.
         * @param valueFields @see:PivotFieldCollection that contains the values for this node.
         * @param valueFieldIndex Index of the value to take into account for this node.
         * @param item First data item represented by this node.
         */
        getNode(fields: PivotFieldCollection, fieldCount: number, valueFields: PivotFieldCollection, valueFieldIndex: number, item: any): _PivotNode {
            var nd = this;
            for (var i = 0; i < fieldCount; i++) {
                var key = fields[i]._getValue(item, true),
                    child = nd._nodes[key];
                if (!child) {
                    child = new _PivotNode(fields, i + 1, valueFields, valueFieldIndex, item, nd);
                    nd._nodes[key] = child;
                }
                nd = child;
            }
            if (valueFields && valueFieldIndex > -1) {
                var key = valueFields[valueFieldIndex].header,
                    child = nd._nodes[key];
                if (!child) {
                    child = new _PivotNode(fields, fieldCount, valueFields, valueFieldIndex, item, nd);
                    nd._nodes[key] = child;
                }
                nd = child;
            }
            return nd;
        }
        /**
         * Gets the @see:_PivotKey represented by this @see:_PivotNode.
         */
        get key(): _PivotKey {
            return this._key;
        }
        /**
         * Gets the parent node of this node.
         */
        get parent(): _PivotNode {
            return this._parent;
        }
        /**
         * Gets the child items of this node.
         */
        get tree(): _PivotNode {
            if (!this._tree) {
                this._tree = new _PivotNode(null, 0, null, -1, null);
            }
            return this._tree;
        }
    }
}
module wijmo.olap {
    'use strict';

    /**
     * Extends the @see:CollectionView class to preserve the position of subtotal rows
     * when sorting.
     */
    export class PivotCollectionView extends collections.CollectionView {
        private _ng: PivotEngine;

        /**
         * Initializes a new instance of the @see:PivotCollectionView class.
         * 
         * @param engine @see:PivotEngine that owns this collection.
         */
        constructor(engine: PivotEngine) {
            super();
            this._ng = asType(engine, PivotEngine, false);
        }

        //** object model

        /**
         * Gets a reference to the @see:PivotEngine that owns this view.
         */
        get engine(): PivotEngine {
            return this._ng;
        }

        // ** overrides

        // sorts items between subtotals
        _performSort(items: any[]) {
            var ng = this._ng;

            // scan all items
            for (var start = 0; start < items.length; start++) {

                // skip totals
                if (ng._getRowLevel(start) > -1) {
                    continue;
                }

                // find last item that is not a total
                var end = start;
                for (; end < items.length - 1; end++) {
                    if (ng._getRowLevel(end + 1) > -1) {
                        break;
                    }
                }

                // sort items between start and end
                if (end > start) {
                    var arr = items.slice(start, end + 1);
                    super._performSort(arr);
                    for (var i = 0; i < arr.length; i++) {
                        items[start + i] = arr[i];
                    }
                }

                // move on to next item
                start = end;
            }
        }
    }
}
module wijmo.olap {
    'use strict';

    /**
     * Represents a property of the items in the wijmo.olap data source.
     */
    export class PivotField {
        private _ng: PivotEngine;
        /*private*/ _header: string;
        /*private*/ _binding: Binding;
        /*private*/ _autoGenerated: boolean;
        private _aggregate: Aggregate;
        private _showAs: ShowAs;
        private _weightField: PivotField;
        private _format: string;
        private _width: number;
        private _wordWrap: boolean;
        private _dataType: DataType;
        private _filter: PivotFilter;
        private _descending: boolean;
        private _isContentHtml: boolean;
        private _parent: PivotField;

        // serializable properties
        static _props = [
            'dataType',
            'format',
            'width',
            'wordWrap',
            'aggregate',
            'showAs',
            'descending',
            'isContentHtml'
        ];

        /**
         * Initializes a new instance of the @see:PivotField class.
         *
         * @param engine @see:PivotEngine that owns this field.
         * @param binding Property that this field is bound to.
         * @param header Header shown to identify this field (defaults to the binding).
         * @param options JavaScript object containing initialization data for the field.
         */
        constructor(engine: PivotEngine, binding: string, header?: string, options?: any) {
            this._ng = engine;
            this._binding = new Binding(binding);
            this._header = header ? header : toHeaderCase(binding);
            this._aggregate = Aggregate.Sum;
            this._showAs = ShowAs.NoCalculation;
            this._isContentHtml = false;
            this._format = '';
            this._filter = new PivotFilter(this);
            if (options) {
                copy(this, options);
            }
        }

        // ** object model

        /**
         * Gets or sets the name of the property the field is bound to.
         */
        get binding(): string {
            return this._binding ? this._binding.path : null;
        }
        set binding(value: string) {
            if (value != this.binding) {
                var oldValue = this.binding,
                    path = asString(value);
                this._binding = path ? new Binding(path) : null;
                if (!this._dataType && this._ng && this._binding) {
                    var cv = this._ng.collectionView;
                    if (cv && cv.sourceCollection && cv.sourceCollection.length) {
                        var item = cv.sourceCollection[0];
                        this._dataType = getType(this._binding.getValue(item));
                    }
                }
                var e = new PropertyChangedEventArgs('binding', oldValue, value);
                this.onPropertyChanged(e);
            }
        }
        /**
         * Gets or sets a string used to represent this field in the user interface.
         */
        get header(): string {
            return this._header;
        }
        set header(value: string) {
            value = asString(value, false);
            var fld = this._ng.fields.getField(value);
            if (!value || (fld && fld != this)) {
                assert(false, 'field headers must be unique and non-empty.');
            } else {
                this._setProp('_header', asString(value));
            }
        }
        /**
         * Gets a reference to the @see:PivotFilter used to filter values for this field.
         */
        get filter(): PivotFilter {
            return this._filter;
        }
        /**
         * Gets or sets how the field should be summarized.
         */
        get aggregate(): Aggregate {
            return this._aggregate;
        }
        set aggregate(value: Aggregate) {
            this._setProp('_aggregate', asEnum(value, Aggregate));
        }
        /**
         * Gets or sets how the field results should be formatted.
         */
        get showAs(): ShowAs {
            return this._showAs;
        }
        set showAs(value: ShowAs) {
            this._setProp('_showAs', asEnum(value, ShowAs));
        }
        /**
         * Gets or sets the @see:PivotField used as a weight for calculating
         * aggregates on this field.
         *
         * If this property is set to null, all values are assumed to have weight one.
         *
         * This property allows you to calculate weighted averages and totals. 
         * For example, if the data contains a 'Quantity' field and a 'Price' field,
         * you could use the 'Price' field as a value field and the 'Quantity' field as
         * a weight. The output would contain a weighted average of the data.
         */
        get weightField(): PivotField {
            return this._weightField;
        }
        set weightField(value: PivotField) {
            this._setProp('_weightField', asType(value, PivotField, true));
        }
        /**
         * Gets or sets the data type of the field.
         */
        get dataType(): DataType {
            return this._dataType;
        }
        set dataType(value: DataType) {
            this._setProp('_dataType', asEnum(value, DataType));
        }
        /**
         * Gets or sets the format to use when displaying field values.
         */
        get format(): string {
            return this._format;
        }
        set format(value: string) {
            this._setProp('_format', asString(value));
        }
        /**
         * Gets or sets the preferred width to be used for showing this field in the 
         * user interface.
         */
        get width(): number {
            return this._width;
        }
        set width(value: number) {
            this._setProp('_width', asNumber(value, true, true));
        }
        /**
         * Gets or sets a value that indicates whether the content of this field should
         * be allowed to wrap within cells.
         */
        get wordWrap(): boolean {
            return this._wordWrap;
        }
        set wordWrap(value: boolean) {
            this._setProp('_wordWrap', asBoolean(value));
        }
        /**
         * Gets or sets a value that determines whether keys should be sorted 
         * in descending order for this field.
         */
        get descending(): boolean {
            return this._descending ? true : false;
        }
        set descending(value: boolean) {
            this._setProp('_descending', asBoolean(value));
        }
        /**
         * Gets or sets a value indicating whether items in this field 
         * contain HTML content rather than plain text.
         */
        get isContentHtml(): boolean {
            return this._isContentHtml;
        }
        set isContentHtml(value: boolean) {
            this._setProp('_isContentHtml', asBoolean(value));
        }
        /**
         * Gets a reference to the @see:PivotEngine that owns this @see:PivotField.
         */
        get engine(): PivotEngine {
            return this._ng;
        }
        /**
         * Gets the @see:ICollectionView bound to this field.
         */
        get collectionView(): collections.ICollectionView {
            return this.engine ? this.engine.collectionView : null;
        }
        /**
         * Gets or sets a value that determines whether this field is
         * currently being used in the view.
         *
         * Setting this property to true causes the field to be added to the
         * view's @see:PivotEngine.rowFields or @see:PivotEngine.valueFields, 
         * depending on the field's data type.
         */
        get isActive(): boolean {
            return this._getIsActive();
        }
        set isActive(value: boolean) {
            this._setIsActive(value);
        }
        /**
         * Gets this field's parent field.
         *
         * When you drag the same field into the Values list multiple
         * times, copies of the field are created so you can use the
         * same binding with different parameters. The copies keep a
         * reference to their parent fields.
         */
        get parentField(): PivotField {
            return this._parent;
        }
        /**
         * Gets the key for this @see:PivotField.
         *
         * For regular fields, the key is the field's @see:header;
         * for @see:CubePivotField instances, the key is the
         * field's @see:binding.
         */
        get key(): string {
            return this.header;
        }

        // ** events

        /**
         * Occurs when the value of a property in this @see:Range changes.
         */
        propertyChanged = new Event();
        /**
         * Raises the @see:propertyChanged event.
         *
         * @param e @see:PropertyChangedEventArgs that contains the property
         * name, old, and new values.
         */
        onPropertyChanged(e: PropertyChangedEventArgs) {
            this.propertyChanged.raise(this, e);
            this._ng._fieldPropertyChanged(this, e);
        }

        // ** implementation

        // checks whether the field is currently in any view lists
        _getIsActive(): boolean {
            if (this._ng) {
                var lists = this._ng._viewLists;
                for (var i = 0; i < lists.length; i++) {
                    var list = lists[i];
                    for (var j = 0; j < list.length; j++) {
                        if (list[j].binding == this.binding) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        // adds or removes the field to a view list
        _setIsActive(value: boolean) {
            if (this._ng) {
                var isActive = this.isActive;
                value = asBoolean(value);
                if (value != isActive) {

                    // add numeric fields to value list, others to row fields
                    if (value) {
                        if (this.dataType == DataType.Number) {
                            this._ng.valueFields.push(this); 
                        } else {
                            this._ng.rowFields.push(this);
                        }
                    } else {

                        // remove from view lists
                        var lists = this._ng._viewLists;
                        for (var i = 0; i < lists.length; i++) {
                            var list = lists[i];
                            for (var f = 0; f < list.length; f++) {
                                var fld = <PivotField>list[f];
                                if (fld == this || fld.parentField == this) {
                                    list.removeAt(f);
                                    f--;
                                }
                            }
                        }

                        // remove any copies from main list
                        var list = this._ng.fields;
                        for (var f = list.length - 1; f >= 0; f--) {
                            var fld = <PivotField>list[f];
                            if (fld.parentField == this) {
                                list.removeAt(f);
                                f--;
                            }
                        }
                    }
                }
            }
        }

        // creates a clone with the same binding/properties and a unique header
        _clone(): PivotField {

            // create clone
            var clone = new PivotField(this._ng, this.binding);
            this._ng._copyProps(clone, this, PivotField._props);
            clone._autoGenerated = true;
            clone._parent = this;

            // give it a unique header
            var hdr = this.header.replace(/\d+$/, '');
            for (var i = 2; ; i++) {
                var hdrn = hdr + i.toString();
                if (this._ng.fields.getField(hdrn) == null) {
                    clone._header = hdrn;
                    break;
                }
            }

            // done
            return clone;
        }

        // sets property value and notifies about the change
        _setProp(name: string, value: any, member?: string) {
            var oldValue = this[name];
            if (value != oldValue) {
                this[name] = value;
                var e = new PropertyChangedEventArgs(name.substr(1), oldValue, value);
                this.onPropertyChanged(e);
            }
        }

        // get field name (used for display)
        _getName(): string {
            return this.header || this.binding;
        }

        // get field value
        _getValue(item: any, formatted: boolean): any {
            var value = this._binding._key
                ? item[this._binding._key] // optimization
                : this._binding.getValue(item);
            return !formatted || typeof (value) == 'string' // optimization
                ? value
                : Globalize.format(value, this._format);
        }

        // get field weight
        _getWeight(item: any): number {
            var value = this._weightField ? this._weightField._getValue(item, false) : null;
            return isNumber(value) ? value : null;
        }
    }

    /**
     * Extends the @see:PivotField class to represent a field in a server-based
     * cube data source.
     */
    export class CubePivotField extends PivotField {
        private _subFields: CubePivotField[];
        private _dimensionType: DimensionType;

        /**
         * Initializes a new instance of the @see:PivotField class.
         *
         * @param engine @see:PivotEngine that owns this field.
         * @param binding Property that this field is bound to.
         * @param header Header shown to identify this field (defaults to the binding).
         * @param options JavaScript object containing initialization data for the field.
         */
        constructor(engine: PivotEngine, binding: string, header?: string, options?: any) {
            super(engine, binding, header, options);

            // sanity: fields should have a key and EITHER have bindings OR subfields
            var hasBinding = this.binding != null && binding.length > 0;
            if (this.subFields != null && this.subFields.length > 0) {
                assert(!hasBinding, 'Fields with sub-fields should not have bindings.')
            } else {
                assert(hasBinding, 'Fields without sub-fields should have bindings.')
            }

        }

        /**
         * Gets or sets a string used to represent this field in the user interface.
         */
        get header(): string {
            return this._header;
        }
        set header(value: string) {
            this._setProp('_header', asString(value));
        }
        /**
         * Gets or sets the dimension type of the field.
         */
        get dimensionType(): DimensionType {
            return this._dimensionType;
        }
        set dimensionType(value: DimensionType) {
            this._setProp('_dimensionType', asEnum(value, DimensionType, false));
        }
        /**
         * Gets this field's child fields.
         */
        get subFields(): CubePivotField[] {
            return this._subFields;
        }
        /**
         * Gets the key for this @see:CubePivotField.
         *
         * For this type of field, the key is the field's @see:binding.
         */
        get key(): string {
            return this.binding;
        }

        // ** implementation

        // cube fields cannot be cloned
        _clone(): PivotField {
            throw 'CubePivotField objects cannot be cloned';
        }

        // extend _copy to handle subFields
        _copy(key: string, value: any): boolean {
            if (key == 'subFields') {
                if (!this._subFields) {
                    this._subFields = [];
                } else {
                    this._subFields.splice(0, this._subFields.length);
                }
                if (value && value.length) {
                    value.forEach((subField) => {
                        var fld = <CubePivotField>this.engine._createField(subField, this._autoGenerated);
                        this._subFields.push(fld);
                    });
                }
                return true;
            }
            return false;
        }

        // cube fields with child fields cannot be appended to the view
        // (isActive is always false.)
        _getIsActive(): boolean {
            if (this.subFields && this.subFields.length) {
                return false;
            }
            return super._getIsActive();
        }
        _setIsActive(value: boolean) {
            if (this.subFields && this.subFields.length) {
                return;
            }
            super._setIsActive(value);
        }
    }

    /**
     * Defines the dimension type of a @see:CubePivotField.
     */
    export enum DimensionType {
        /** Fields that contain categories used to summarize data. */
        Dimension,
        /** Fields that contain quantitative, numerical information. */
        Measure,
        /** Calculations associated with a measure group used to evaluate business success. */
        Kpi,
        /** Multidimensional Expression (MDX) that returns a set of dimension members. */
        NameSet,
        /** Provide supplementary information about dimension members. */
        Attribute,
        /** Used to categorize measures and improve the user browsing experience. */
        Folder,
        /** Metadata that define relationships between two or more columns in a table. */
        Hierarchy,
        /** Dimension with time-based levels of granularity for analysis and reporting. */
        Date,
        /** Dimension whose attributes represent a list of currencies for financial reporting purposes. */
        Currency
    }
}
module wijmo.olap {
    'use strict';

    /**
     * Represents a collection of @see:PivotField objects.
     */
    export class PivotFieldCollection extends collections.ObservableArray {
        private _ng: PivotEngine;
        private _maxItems: number;

        /**
         * Initializes a new instance of the @see:PivotFieldCollection class.
         *
         * @param engine @see:PivotEngine that owns this @see:PivotFieldCollection.
         */
        constructor(engine: PivotEngine) {
            super();
            this._ng = engine;
        }

        //** object model

        /**
         * Gets or sets the maximum number of fields allowed in this collection.
         *
         * This property is set to null by default, which means any number of items is allowed.
         */
        get maxItems(): number {
            return this._maxItems;
        }
        set maxItems(value: number) {
            this._maxItems = asInt(value, true, true);
        }
        /**
         * Gets a reference to the @see:PivotEngine that owns this @see:PivotFieldCollection.
         */
        get engine(): PivotEngine {
            return this._ng;
        }
        /**
         * Gets a field by key.
         *
         * @param key @see:PivotField.key to look for.
         */
        getField(key: string): PivotField {
            return this._getField(this, key);
        }
        _getField(fields: any, key: string): PivotField {
            for (var i = 0; i < fields.length; i++) {

                // looking in main fields
                var field = fields[i];
                if (field.key == key) {
                    return field;
                }

                // and in subfields if present
                if (field instanceof CubePivotField && field.subFields) {
                    field = this._getField(field.subFields, key);
                    if (field) {
                        return field;
                    }
                }
            }

            // not found
            return null;
        }
        /**
         * Overridden to allow pushing fields by header.
         *
         * @param ...item One or more @see:PivotField objects to add to the array.
         * @return The new length of the array.
         */
        push(...item: any[]): number {
            var ng = this._ng;

            // loop through items adding them one by one
            for (var i = 0; item && i < item.length; i++) {
                var fld = item[i];

                // add fields by binding
                if (isString(fld)) {
                    fld = this == ng.fields
                        ? new PivotField(ng, fld)
                        : ng.fields.getField(fld);
                }

                // should be a field now...
                assert(fld instanceof PivotField, 'This collection must contain PivotField objects only.');

                // field keys must be unique
                // REVIEW: cube fields with children have no key...
                if (fld.key && this.getField(fld.key)) {
                    assert(false, 'PivotField keys must be unique.');
                    return -1;
                }

                // honor maxItems
                if (this._maxItems != null && this.length >= this._maxItems) {
                    break;
                }

                // add to collection
                super.push(fld);
            }

            // done
            return this.length;
        }
    }
}
module wijmo.olap {
    'use strict';

    /**
     * Represents a filter used to select values for a @see:PivotField.
     */
    export class PivotFilter {
        private _fld: PivotField;
        private _valueFilter: grid.filter.ValueFilter;
        private _conditionFilter: grid.filter.ConditionFilter;
        private _filterType: grid.filter.FilterType;

        /**
         * Initializes a new instance of the @see:PivotFilter class.
         *
         * @param field @see:PivotField that owns this filter.
         */
        constructor(field: PivotField) {
            this._fld = field;

            // REVIEW
            // use the field as a 'pseudo-column' to build value and condition filters;
            // properties in common:
            //   binding, format, dataType, isContentHtml, collectionView
            var col = <any>field;

            this._valueFilter = new grid.filter.ValueFilter(col);
            this._conditionFilter = new grid.filter.ConditionFilter(col);
        }

        // ** object model

        /**
         * Gets or sets the types of filtering provided by this filter.
         *
         * Setting this property to null causes the filter to use the value
         * defined by the owner filter's @see:FlexGridFilter.defaultFilterType
         * property.
         */
        get filterType(): grid.filter.FilterType {
            return this._filterType != null ? this._filterType : this._fld.engine.defaultFilterType;
        }
        set filterType(value: grid.filter.FilterType) {
            if (value != this._filterType) {
                this._filterType = asEnum(value, grid.filter.FilterType, true);
                this.clear();
            }
        }
        /**
         * Gets a value that indicates whether a value passes the filter.
         *
         * @param value The value to test.
         */
        apply(value): boolean {
            return this._conditionFilter.apply(value) && this._valueFilter.apply(value);
        }
        /**
         * Gets a value that indicates whether the filter is active.
         */
        get isActive(): boolean {
            return this._conditionFilter.isActive || this._valueFilter.isActive;
        }
        /**
         * Clears the filter.
         */
        clear(): void {
            var changed = false;
            if (this._valueFilter.isActive) {
                this._valueFilter.clear();
                changed = true;
            }
            if (this._conditionFilter.isActive) {
                this._valueFilter.clear();
                changed = true;
            }
            if (changed) {
                this._fld.onPropertyChanged(new PropertyChangedEventArgs('filter', null, null));
            }
        }
        /**
         * Gets the @see:ValueFilter in this @see:PivotFilter.
         */
        get valueFilter(): grid.filter.ValueFilter {
            return this._valueFilter;
        }
        /**
         * Gets the @see:ConditionFilter in this @see:PivotFilter.
         */
        get conditionFilter(): grid.filter.ConditionFilter {
            return this._conditionFilter;
        }
    }
}
module wijmo.olap {
    'use strict';

    // globalization
    wijmo.culture.olap = wijmo.culture.olap || {};
    wijmo.culture.olap.PivotFieldEditor = window['wijmo'].culture.olap.PivotFieldEditor || {
        dialogHeader: 'Field settings:',
        header: 'Header:',
        summary: 'Summary:',
        showAs: 'Show As:',
        weighBy: 'Weigh by:',
        sort: 'Sort:',
        filter: 'Filter:',
        format: 'Format:',
        sample: 'Sample:',
        edit: 'Edit...',
        clear: 'Clear',
        ok: 'OK',
        cancel: 'Cancel',
        none: '(none)',
        sorts: {
            asc: 'Ascending',
            desc: 'Descending'
        },
        aggs: {
            sum: 'Sum',
            cnt: 'Count',
            avg: 'Average',
            max: 'Max',
            min: 'Min',
            rng: 'Range',
            std: 'StdDev',
            var: 'Var',
            stdp: 'StdDevPop',
            varp: 'VarPop',
            first: 'First',
            last: 'Last'
        },
        calcs: {
            noCalc: 'No calculation',
            dRow: 'Difference from previous row',
            dRowPct: '% Difference from previous row',
            dCol: 'Difference from previous column',
            dColPct: '% Difference from previous column',
            dPctGrand: '% of grand total',
            dPctRow: '% of row total',
            dPctCol: '% of column total',
            dRunTot: 'Running total',
            dRunTotPct: '% running total'
        },
        formats: {
            n0: 'Integer (n0)',
            n2: 'Float (n2)',
            c: 'Currency (c)',
            p0: 'Percentage (p0)',
            p2: 'Percentage (p2)', 
            n2c: 'Thousands (n2,)',
            n2cc: 'Millions (n2,,)',
            n2ccc: 'Billions (n2,,,)',
            d: 'Date (d)',
            MMMMddyyyy: 'Month Day Year (MMMM dd, yyyy)',
            dMyy: 'Day Month Year (d/M/yy)',
            ddMyy: 'Day Month Year (dd/M/yy)',
            dMyyyy: 'Day Month Year (dd/M/yyyy)',
            MMMyyyy: 'Month Year (MMM yyyy)',
            MMMMyyyy: 'Month Year (MMMM yyyy)',
            yyyy: 'Year (yyyy)',
            yyyyQq: 'Year Quarter (yyyy "Q"q)',
            FYEEEEQU: 'Fiscal Year Quarter ("FY"EEEE "Q"U)'
        }
    };

    /**
     * Editor for @see:PivotField objects.
     */
    export class PivotFieldEditor extends Control {

        // property storage
        private _fld: PivotField;
        private _pvDate: Date;

        // child elements
        private _dBnd: HTMLElement;
        private _dHdr: HTMLElement;
        private _dAgg: HTMLElement;
        private _dShw: HTMLElement;
        private _dWFl: HTMLElement;
        private _dSrt: HTMLElement;
        private _dFmt: HTMLElement;
        private _dSmp: HTMLElement;
        private _dFlt: HTMLElement;
        private _btnFltEdt: HTMLElement;
        private _btnFltClr: HTMLElement;
        private _btnApply: HTMLElement;
        private _btnCancel: HTMLElement;

        // child controls
        private _cmbHdr: input.ComboBox;
        private _cmbAgg: input.ComboBox;
        private _cmbShw: input.ComboBox;
        private _cmbWFl: input.ComboBox;
        private _cmbSrt: input.ComboBox;
        private _cmbFmt: input.ComboBox;
        private _cmbSmp: input.ComboBox;
        private _eFlt: PivotFilterEditor;

        // globalizable elements
        private _gDlg: HTMLElement;
        private _gHdr: HTMLElement;
        private _gAgg: HTMLElement;
        private _gShw: HTMLElement;
        private _gWfl: HTMLElement;
        private _gSrt: HTMLElement;
        private _gFlt: HTMLElement;
        private _gFmt: HTMLElement;
        private _gSmp: HTMLElement;

        /**
         * Gets or sets the template used to instantiate @see:PivotFieldEditor controls.
         */
        static controlTemplate = '<div>' +

            // header
            '<div class="wj-dialog-header">' +
              '<span wj-part="g-dlg"></span> <span wj-part="sp-bnd"></span>' +
            '</div>' +

            // body
            '<div class="wj-dialog-body">' +

              // content
              '<table style="table-layout:fixed">' +
                '<tr>' +
                  '<td wj-part="g-hdr"></td>' +
                  '<td><div wj-part="div-hdr"></div></td>' +
                '</tr>' +
                '<tr class="wj-separator">' +
                  '<td wj-part="g-agg"></td>' +
                  '<td><div wj-part="div-agg"></div></td>' +
                '</tr>' +
                '<tr class="wj-separator">' +
                  '<td wj-part="g-shw"></td>' +
                  '<td><div wj-part="div-shw"></div></td>' +
                '</tr>' +
                '<tr>' +
                  '<td wj-part="g-wfl"></td>' +
                  '<td><div wj-part="div-wfl"></div></td>' +
                '</tr>' +
                '<tr>' +
                  '<td wj-part="g-srt"></td>' +
                  '<td><div wj-part="div-srt"></div></td>' +
                '</tr>' +
                '<tr class="wj-separator">' +
                  '<td wj-part="g-flt"></td>' +
                  '<td>' +
                    '<a wj-part="btn-flt-edt" href= "" draggable="false"></a>&nbsp;&nbsp;' +
                    '<a wj-part="btn-flt-clr" href= "" draggable="false"></a>' +
                  '</td>' +
                '</tr>' +
                '<tr class="wj-separator">' +
                  '<td wj-part="g-fmt"></td>' +
                  '<td><div wj-part="div-fmt"></div></td>' +
                '</tr>' +
                '<tr>' +
                  '<td wj-part="g-smp"></td>' +
                    '<td><div wj-part="div-smp" readonly disabled tabindex="-1"></div></td>' +
                  '</tr>' +
                '</table>' +
              '</div>' +

              // footer
              '<div class="wj-dialog-footer">' +
                '<a class="wj-hide" wj-part="btn-apply" href="" draggable="false"></a>&nbsp;&nbsp;' +
                '<a class="wj-hide" wj-part="btn-cancel" href="" draggable="false"></a>' +
              '</div>' +
            '</div>';

        /**
         * Initializes a new instance of the @see:PivotFieldEditor class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element, null, true);

            // check dependencies
            var depErr = 'Missing dependency: PivotFieldEditor requires ';
            assert(input != null, depErr + 'wijmo.input.');

            // date to use for preview
            this._pvDate = new Date();

            // instantiate and apply template
            var tpl = this.getTemplate();
            this.applyTemplate('wj-control wj-content wj-pivotfieldeditor', tpl, {
                _dBnd: 'sp-bnd',
                _dHdr: 'div-hdr',
                _dAgg: 'div-agg',
                _dShw: 'div-shw',
                _dWFl: 'div-wfl',
                _dSrt: 'div-srt',
                _btnFltEdt: 'btn-flt-edt',
                _btnFltClr: 'btn-flt-clr',
                _dFmt: 'div-fmt',
                _dSmp: 'div-smp',
                _btnApply: 'btn-apply',
                _btnCancel: 'btn-cancel',
                _gDlg: 'g-dlg',
                _gHdr: 'g-hdr',
                _gAgg: 'g-agg',
                _gShw: 'g-shw',
                _gWfl: 'g-wfl',
                _gSrt: 'g-srt',
                _gFlt: 'g-flt',
                _gFmt: 'g-fmt',
                _gSmp: 'g-smp'
            });

            // globalization
            var g = wijmo.culture.olap.PivotFieldEditor;
            this._gDlg.textContent = g.dialogHeader;
            this._gHdr.textContent = g.header;
            this._gAgg.textContent = g.summary;
            this._gShw.textContent = g.showAs,
            this._gWfl.textContent = g.weighBy;
            this._gSrt.textContent = g.sort;
            this._gFlt.textContent = g.filter;
            this._gFmt.textContent = g.format;
            this._gSmp.textContent = g.sample;
            this._btnFltEdt.textContent = g.edit;
            this._btnFltClr.textContent = g.clear;
            this._btnApply.textContent = g.ok;
            this._btnCancel.textContent = g.cancel;

            // create inner controls
            this._cmbHdr = new input.ComboBox(this._dHdr);
            this._cmbAgg = new input.ComboBox(this._dAgg);
            this._cmbShw = new input.ComboBox(this._dShw);
            this._cmbWFl = new input.ComboBox(this._dWFl);
            this._cmbSrt = new input.ComboBox(this._dSrt);
            this._cmbFmt = new input.ComboBox(this._dFmt);
            this._cmbSmp = new input.ComboBox(this._dSmp);

            // initialize inner controls
            this._initAggregateOptions();
            this._initShowAsOptions();
            this._initFormatOptions();
            this._initSortOptions();

            // handle events
            this._cmbShw.textChanged.addHandler(this._updateFormat, this);
            this._cmbFmt.textChanged.addHandler(this._updatePreview, this);
            this.addEventListener(this._btnFltEdt, 'click', (e) => {
                this._editFilter();
                e.preventDefault();
            });
            this.addEventListener(this._btnFltClr, 'click', (e) => {
                enable(this._btnFltClr, false);
                this._createFilterEditor();
                setTimeout(() => { // editor populates list in a timeOut (TFS 238727)
                    this._eFlt.clearEditor();
                });
                e.preventDefault();
            });
            this.addEventListener(this._btnApply, 'click', (e) => {
                this.updateField();
            });

            // apply options
            this.initialize(options);
        }

        // ** object model

        /**
         * Gets or sets a reference to the @see:PivotField being edited.
         */
        get field(): PivotField {
            return this._fld;
        }
        set field(value: PivotField) {
            if (value != this._fld) {
                this._fld = asType(value, PivotField);
                this.updateEditor();
            }
        }
        /**
         * Updates editor to reflect the current field values.
         */
        updateEditor() {
            if (this._fld) {

                // binding, header
                this._dBnd.textContent = this._fld.binding;
                this._cmbHdr.text = this._fld.header;

                // aggregate, weigh by, sort
                this._cmbAgg.collectionView.refresh();
                this._cmbAgg.selectedValue = this._fld.aggregate;
                this._cmbSrt.selectedValue = this._fld.descending;
                this._cmbShw.selectedValue = this._fld.showAs;
                this._initWeighByOptions();

                // filter
                enable(this._btnFltClr, this._fld.filter.isActive);

                // format, sample
                this._cmbFmt.collectionView.refresh();
                this._cmbFmt.selectedValue = this._fld.format;
                if (!this._cmbFmt.selectedValue) {
                    this._cmbFmt.text = this._fld.format;
                }

                // disable items not supported by cube fields
                var isCube = this._fld instanceof CubePivotField;
                this._cmbAgg.isDisabled = isCube;
                this._cmbWFl.isDisabled = isCube;
            }
        }
        /**
         * Updates field to reflect the current editor values.
         */
        updateField() {
            if (this._fld) {

                // save header
                var hdr = this._cmbHdr.text.trim();
                this._fld.header = hdr ? hdr : toHeaderCase(this._fld.binding);

                // save aggregate, weigh by, sort
                this._fld.aggregate = this._cmbAgg.selectedValue;
                this._fld.showAs = this._cmbShw.selectedValue;
                this._fld.weightField = this._cmbWFl.selectedValue;
                this._fld.descending = this._cmbSrt.selectedValue;

                // save filter
                if (this._eFlt) {
                    this._eFlt.updateFilter();
                }
                
                // save format
                this._fld.format = this._cmbFmt.selectedValue || this._cmbFmt.text;
            }
        }

        // ** overrides

        // check whether this control or its drop-down contain the focused element.
        containsFocus(): boolean {
            return super.containsFocus() || contains(this._dFlt, getActiveElement());
        }

        // ** implementation

        // initialize aggregate options
        _initAggregateOptions() {
            var g = wijmo.culture.olap.PivotFieldEditor.aggs,
                list = [
                    { key: g.sum, val: Aggregate.Sum, all: false },
                    { key: g.cnt, val: Aggregate.Cnt, all: true },
                    { key: g.avg, val: Aggregate.Avg, all: false },
                    { key: g.max, val: Aggregate.Max, all: true },
                    { key: g.min, val: Aggregate.Min, all: true },
                    { key: g.rng, val: Aggregate.Rng, all: false },
                    { key: g.std, val: Aggregate.Std, all: false },
                    { key: g.var, val: Aggregate.Var, all: false },
                    { key: g.stdp, val: Aggregate.StdPop, all: false },
                    { key: g.varp, val: Aggregate.VarPop, all: false },
                    { key: g.first, val: Aggregate.First, all: true },
                    { key: g.last, val: Aggregate.Last, all: true },
                ];
            this._cmbAgg.itemsSource = list;
            this._cmbAgg.collectionView.filter = (item) => {
                if (item && item.all) { // all data types
                    return true;
                }
                if (this._fld) { // numbers and Booleans (avg, range, stdev, etc)
                    var dt = this._fld.dataType;
                    return dt == DataType.Number || dt == DataType.Boolean;
                }
                return false; // strings, dates (count, min/max)
            };
            this._cmbAgg.initialize({
                displayMemberPath: 'key',
                selectedValuePath: 'val'
            });
        }

        // initialize showAs options
        _initShowAsOptions() {
            var g = wijmo.culture.olap.PivotFieldEditor.calcs,
                list = [
                    { key: g.noCalc, val: ShowAs.NoCalculation },
                    { key: g.dRow, val: ShowAs.DiffRow },
                    { key: g.dRowPct, val: ShowAs.DiffRowPct },
                    { key: g.dCol, val: ShowAs.DiffCol },
                    { key: g.dColPct, val: ShowAs.DiffColPct },
                    { key: g.dPctGrand, val: ShowAs.PctGrand },
                    { key: g.dPctRow, val: ShowAs.PctRow },
                    { key: g.dPctCol, val: ShowAs.PctCol },
                    { key: g.dRunTot, val: ShowAs.RunTot },
                    { key: g.dRunTotPct, val: ShowAs.RunTotPct }
                ];
            this._cmbShw.itemsSource = list;
            this._cmbShw.initialize({
                displayMemberPath: 'key',
                selectedValuePath: 'val'
            });
        }

        // initialize format options
        _initFormatOptions() {
            var g = wijmo.culture.olap.PivotFieldEditor.formats,
                list = [

                    // numbers (numeric dimensions and measures/aggregates)
                    { key: g.n0, val: 'n0', all: true },
                    { key: g.n2, val: 'n2', all: true },
                    { key: g.c, val: 'c', all: true },
                    { key: g.p0, val: 'p0', all: true },
                    { key: g.p2, val: 'p2', all: true },
                    { key: g.n2c, val: 'n2,', all: true },
                    { key: g.n2cc, val: 'n2,,', all: true },
                    { key: g.n2ccc, val: 'n2,,,', all: true },

                    // dates (date dimensions)
                    { key: g.d, val: 'd', all: false },
                    { key: g.MMMMddyyyy, val: 'MMMM dd, yyyy', all: false },
                    { key: g.dMyy, val: 'd/M/yy', all: false },
                    { key: g.ddMyy, val: 'dd/M/yy', all: false },
                    { key: g.ddMyyyy, val: 'dd/M/yyyy', all: false },
                    { key: g.MMMyyyy, val: 'MMM yyyy', all: false },
                    { key: g.MMMMyyyy, val: 'MMMM yyyy', all: false },
                    { key: g.yyyy, val: 'yyyy', all: false },
                    { key: g.yyyyQq, val: 'yyyy "Q"q', all: false },
                    { key: g.FYEEEEQU, val: '"FY"EEEE "Q"U', all: false }
                ];
            this._cmbFmt.itemsSource = list;
            this._cmbFmt.isEditable = true;
            this._cmbFmt.isRequired = false;
            this._cmbFmt.collectionView.filter = (item) => {
                if (item && item.all) {
                    return true;
                }
                if (this._fld) {
                    return this._fld.dataType == DataType.Date;
                }
                return false;
            };
            this._cmbFmt.initialize({
                displayMemberPath: 'key',
                selectedValuePath: 'val'
            });
        }

        // initialize weight by options/value
        _initWeighByOptions() {
            var list = [
                { key: culture.olap.PivotFieldEditor.none, val: null }
            ];
            if (this._fld) {
                var ng = this._fld.engine;
                for (var i = 0; i < ng.fields.length; i++) {
                    var wbf = ng.fields[i];
                    if (wbf != this._fld && wbf.dataType == DataType.Number) {
                        list.push({ key: wbf.header, val: wbf });
                    }
                }
            }
            this._cmbWFl.initialize({
                displayMemberPath: 'key',
                selectedValuePath: 'val',
                itemsSource: list,
                selectedValue: this._fld.weightField
            });
        }

        // initialize sort options
        _initSortOptions() {
            var g = culture.olap.PivotFieldEditor.sorts,
                list = [
                    { key: g.asc, val: false },
                    { key: g.desc, val: true }
                ];
            this._cmbSrt.itemsSource = list;
            this._cmbSrt.initialize({
                displayMemberPath: 'key',
                selectedValuePath: 'val'
            });
        }

        // update the format to match the 'showAs' setting
        _updateFormat() {
            switch (this._cmbShw.selectedValue) {
                case ShowAs.DiffRowPct:
                case ShowAs.DiffColPct:
                    this._cmbFmt.selectedValue = 'p0';
                    break;
                default:
                    this._cmbFmt.selectedValue = 'n0';
                    break;
            }
        }

        // update the preview field to show the effect of the current settings
        _updatePreview() {
            var format = this._cmbFmt.selectedValue || this._cmbFmt.text,
                sample = '';
            if (format) {
                var ft = format[0].toLowerCase(),
                    nf = 'nfgxc';
                if (nf.indexOf(ft) > -1) { // number
                    sample = Globalize.format(123.456, format);
                } else if (ft == 'p') { // percentage
                    sample = Globalize.format(0.1234, format);
                } else { // date
                    sample = Globalize.format(this._pvDate, format);
                }
            }
            this._cmbSmp.text = sample;
        }

         // show the filter editor for this field
        _editFilter() {
            this._createFilterEditor();
            showPopup(this._dFlt, this._btnFltEdt, false, false, false);
            moveFocus(this._dFlt, 0);
        }

        // create filter editor
        _createFilterEditor() {
            if (!this._dFlt) {

                // create filter
                this._dFlt = document.createElement('div');
                this._eFlt = new PivotFilterEditor(this._dFlt, this._fld);
                addClass(this._dFlt, 'wj-dropdown-panel');

                // close editor when it loses focus (changes are not applied)
                this._eFlt.lostFocus.addHandler(() => {
                    setTimeout(() => {
                        var ctl = Control.getControl(this._dFlt);
                        if (ctl && !ctl.containsFocus()) {
                            this._closeFilter();
                        }
                    }, 10);
                });

                // close the filter when the user finishes editing
                this._eFlt.finishEditing.addHandler(() => {
                    this._closeFilter();
                    enable(this._btnFltClr, true);
                });
            }
        }

        // close filter editor
        _closeFilter() {
            if (this._dFlt) {
                hidePopup(this._dFlt, true);
                this.focus();
            }
        }
    }
}
module wijmo.olap {
    'use strict';

    /**
     * Editor for @see:PivotFilter objects.
     */
    export class PivotFilterEditor extends Control {

        // property storage
        private _fld: PivotField;

        // child elements
        private _divType: HTMLInputElement;
        private _aCnd: HTMLLinkElement;
        private _aVal: HTMLLinkElement;
        private _divEdtVal: HTMLElement;
        private _divEdtCnd: HTMLElement;
        private _btnOk: HTMLLinkElement;

        // child controls
        private _edtVal: grid.filter.ValueFilterEditor;
        private _edtCnd: grid.filter.ConditionFilterEditor;

        /**
         * Gets or sets the template used to instantiate @see:PivotFilterEditor controls.
         */
        static controlTemplate = '<div>' +
          '<div wj-part="div-type" style="text-align:center;margin-bottom:12px;font-size:80%">' +
            '<a wj-part="a-cnd" href="" tabindex="-1" draggable="false"></a>' +
            '&nbsp;|&nbsp;' +
            '<a wj-part="a-val" href="" tabindex="-1" draggable="false"></a>' +
          '</div>' +
          '<div wj-part="div-edt-val"></div>' +
          '<div wj-part="div-edt-cnd"></div>' +
          '<div style="text-align:right;margin-top:10px">' +
            '<a wj-part="btn-ok" href="" tabindex="-1" draggable="false"></a>' +
          '</div>';
        '</div>';

        /**
         * Initializes a new instance of the @see:ColumnFilterEditor class.
         *
         * @param element The DOM element that hosts the control, or a selector 
         * for the host element (e.g. '#theCtrl').
         * @param field The @see:PivotField to edit.
         * @param options JavaScript object containing initialization data for the editor.
         */
        constructor(element: any, field: PivotField, options?: any) {
            super(element);

            // instantiate and apply template
            var tpl = this.getTemplate();
            this.applyTemplate('wj-control wj-pivotfiltereditor wj-content', tpl, {
                _divType: 'div-type',
                _aVal: 'a-val',
                _aCnd: 'a-cnd',
                _divEdtVal: 'div-edt-val',
                _divEdtCnd: 'div-edt-cnd',
                _btnOk: 'btn-ok'
            });

            // localization
            this._aVal.textContent = culture.FlexGridFilter.values;
            this._aCnd.textContent = culture.FlexGridFilter.conditions;
            this._btnOk.textContent = culture.olap.PivotFieldEditor.ok;

            // handle button clicks
            var bnd = this._btnClicked.bind(this);
            this._btnOk.addEventListener('click', bnd);
            this._aVal.addEventListener('click', bnd);
            this._aCnd.addEventListener('click', bnd);

            // commit/dismiss on Enter/Esc
            this.hostElement.addEventListener('keydown',(e) => {
                switch (e.keyCode) {
                    case Key.Enter:
                        switch ((<HTMLElement>e.target).tagName) {
                            case 'A':
                            case 'BUTTON':
                                this._btnClicked(e);
                                break;
                            default:
                                this.onFinishEditing(new CancelEventArgs());
                                break;
                        }
                        e.preventDefault();
                        break;
                    case Key.Escape:
                        this.onFinishEditing(new CancelEventArgs());
                        e.preventDefault();
                        break;
                }
            });

            // field being edited
            this._fld = field;

            // apply options
            this.initialize(options);

            // initialize all values
            this.updateEditor();
        }

        // ** object model

        /**
         * Gets a reference to the @see:PivotField whose filter is being edited.
         */
        get field(): PivotField {
            return this._fld;
        }
        /**
         * Gets a reference to the @see:PivotFilter being edited.
         */
        get filter(): PivotFilter {
            return this._fld ? this._fld.filter : null;
        }
        /**
         * Updates the editor with current filter settings.
         */
        updateEditor() {
            
            // show/hide filter editors
            var ft = grid.filter.FilterType.None;
            if (this.filter) {
                ft = (this.filter.conditionFilter.isActive || (this.filter.filterType & grid.filter.FilterType.Value) == 0)
                    ? grid.filter.FilterType.Condition
                    : grid.filter.FilterType.Value;
                this._showFilter(ft);
            }

            // update filter editors
            if (this._edtVal) {
                this._edtVal.updateEditor();
            }
            if (this._edtCnd) {
                this._edtCnd.updateEditor();
            }
        }
        /**
         * Updates the filter to reflect the current editor values.
         */
        updateFilter() {

            // update the filter
            switch (this._getFilterType()) {
                case grid.filter.FilterType.Value:
                    this._edtVal.updateFilter();
                    this.filter.conditionFilter.clear();
                    break;
                case grid.filter.FilterType.Condition:
                    this._edtCnd.updateFilter();
                    this.filter.valueFilter.clear();
                    break;
            }

            // refresh the view
            this.field.onPropertyChanged(new PropertyChangedEventArgs('filter', null, null));
        }
        /**
         * Clears the editor fields without applying changes to the filter.
         */
        clearEditor() {
            if (this._edtVal) {
                this._edtVal.clearEditor();
            }
            if (this._edtCnd) {
                this._edtCnd.clearEditor();
            }
        }

        /**
         * Occurs when the user finishes editing the filter.
         */
        finishEditing = new Event();
        /**
         * Raises the @see:finishEditing event.
         */
        onFinishEditing(e?: CancelEventArgs) {
            this.finishEditing.raise(this, e);
            return !e.cancel;
        }

        // ** implementation

        // shows the value or filter editor
        private _showFilter(filterType: grid.filter.FilterType) {

            // create editor if we have to
            if (filterType == grid.filter.FilterType.Value && this._edtVal == null) {
                this._edtVal = new grid.filter.ValueFilterEditor(this._divEdtVal, this.filter.valueFilter);
            }
            if (filterType == grid.filter.FilterType.Condition && this._edtCnd == null) {
                this._edtCnd = new grid.filter.ConditionFilterEditor(this._divEdtCnd, this.filter.conditionFilter);
            }

            // show selected editor
            if ((filterType & this.filter.filterType) != 0) {
                if (filterType == grid.filter.FilterType.Value) {
                    this._divEdtVal.style.display = '';
                    this._divEdtCnd.style.display = 'none';
                    this._enableLink(this._aVal, false);
                    this._enableLink(this._aCnd, true);
                } else {
                    this._divEdtVal.style.display = 'none';
                    this._divEdtCnd.style.display = '';
                    this._enableLink(this._aVal, true);
                    this._enableLink(this._aCnd, false);
                }
            }

            // hide switch button if only one filter type is supported
            switch (this.filter.filterType) {
                case grid.filter.FilterType.None:
                case grid.filter.FilterType.Condition:
                case grid.filter.FilterType.Value:
                    this._divType.style.display = 'none';
                    break;
                default:
                    this._divType.style.display = '';
                    break;
            }
        }

        // enable/disable filter switch links
        _enableLink(a: HTMLLinkElement, enable: boolean) {
            a.style.textDecoration = enable ? '' : 'none';
            a.style.fontWeight = enable ? '' : 'bold';
            setAttribute(a, 'href', enable ? '' : null);
        }

        // gets the type of filter currently being edited
        private _getFilterType(): grid.filter.FilterType {
            return this._divEdtVal.style.display != 'none'
                ? grid.filter.FilterType.Value
                : grid.filter.FilterType.Condition;
        }

        // handle buttons
        private _btnClicked(e) {
            e.preventDefault();
            e.stopPropagation();

            // ignore disabled elements
            if (hasClass(e.target, 'wj-state-disabled')) {
                return;
            }

            // switch filters
            if (e.target == this._aVal) {
                this._showFilter(grid.filter.FilterType.Value);
                moveFocus(this._edtVal.hostElement, 0);
                //this._edtVal.focus();
                return;
            }
            if (e.target == this._aCnd) {
                this._showFilter(grid.filter.FilterType.Condition);
                moveFocus(this._edtCnd.hostElement, 0);
                //this._edtCnd.focus();
                return;
            }

            // finish editing
            this.onFinishEditing(new CancelEventArgs());
        }
    }
}
/**
 * Contains components that provide OLAP functionality such as 
 * pivot tables and charts.
 *
 * The @see:PivotEngine class is responsible for summarizing 
 * raw data into pivot views.
 *
 * The @see:PivotPanel control provides a UI for editing the
 * pivot views by dragging fields into view lists and editing
 * their properties.
 *
 * The @see:PivotGrid control extends the @see:FlexGrid to 
 * display pivot tables with collapsible row and column 
 * groups.
 *
 * The @see:PivotChart control provides visual representations
 * of pivot tables with hierarchical axes.
 */
module wijmo.olap {
    'use strict';

    // globalization
    wijmo.culture.olap = wijmo.culture.olap || {};
    wijmo.culture.olap.PivotEngine = window['wijmo'].culture.olap.PivotEngine || {
        grandTotal: 'Grand Total',
        subTotal: 'Subtotal'
    }

    /**
     * Specifies constants that define whether to include totals in the output table.
     */
    export enum ShowTotals {
        /**
         * Do not show any totals.
         */
        None,
        /**
         * Show grand totals.
         */
        GrandTotals,
        /**
         * Show subtotals and grand totals.
         */
        Subtotals
    }
    /**
     * Specifies constants that define calculations to be applied to cells in the output view.
     */
    export enum ShowAs {
        /**
         * Show plain aggregated values.
         */
        NoCalculation,
        /**
         * Show differences between each item and the item in the previous row.
         */
        DiffRow,
        /**
         * Show differences between each item and the item in the previous row as a percentage.
         */
        DiffRowPct,
        /**
         * Show differences between each item and the item in the previous column.
         */
        DiffCol,
        /**
         * Show differences between each item and the item in the previous column as a percentage.
         */
        DiffColPct,
        /**
         * Show values as a percentage of the grand totals for the field.
         */
        PctGrand,
        /**
         * Show values as a percentage of the row totals for the field.
         */
        PctRow,
        /**
         * Show values as a percentage of the column totals for the field.
         */
        PctCol,
        /**
         * Show values as running totals.
         */
        RunTot,
        /**
         * Show values as percentage running totals.
         */
        RunTotPct
    }

    /**
     * Provides a user interface for interactively transforming regular data tables into Olap
     * pivot tables.
     *
     * Tabulates data in the @see:itemsSource collection according to lists of fields and 
     * creates the @see:pivotView collection containing the aggregated data.
     *
     * Pivot tables group data into one or more dimensions. The dimensions are represented
     * by rows and columns on a grid, and the data is stored in the grid cells.
     */
    export class PivotEngine {

        // property storage
        private _items: any; // any[] or ICollectionView
        private _cv: collections.ICollectionView;
        private _server: _ServerConnection;
        private _autoGenFields = true;
        private _allowFieldEditing = true;
        private _showRowTotals = ShowTotals.GrandTotals;
        private _showColTotals = ShowTotals.GrandTotals;
        private _totalsBefore: boolean;
        private _showZeros: boolean;
        private _updating = 0;
        private _dirty: boolean;
        private _toInv;
        private _cntTotal = 0;
        private _cntFiltered = 0;
        private _colBindings: string[];
        private _pivotView: collections.ICollectionView;
        private _defaultFilterType: grid.filter.FilterType;
        private _async = true;
        private _batchStart: number;
        private _toUpdateTallies: any;
        private _activeFilterFields: PivotField[];
        /*private*/ _tallies: any;
        /*private*/ _keys: any;

        // pivot field collections
        private _fields: PivotFieldCollection;
        private _rowFields: PivotFieldCollection;
        private _columnFields: PivotFieldCollection;
        private _valueFields: PivotFieldCollection;
        private _filterFields: PivotFieldCollection;
        /*private*/ _viewLists: PivotFieldCollection[];

        // batch size/delay for async processing
        static _BATCH_SIZE = 10000;
        static _BATCH_TIMEOUT = 0;
        static _BATCH_DELAY = 100;

        // serializable properties
        static _props = [
            'showZeros',
            'showRowTotals',
            'showColumnTotals',
            'totalsBeforeData',
            'defaultFilterType'
        ];

        /**
         * Initializes a new instance of the @see:PivotEngine class.
         *
         * @param options JavaScript object containing initialization data for the field.
         */
        constructor(options?: any) {

            // create output view
            this._pivotView = new PivotCollectionView(this);

            // create main field list
            this._fields = new PivotFieldCollection(this);

            // create pivot field lists
            this._rowFields = new PivotFieldCollection(this);
            this._columnFields = new PivotFieldCollection(this);
            this._valueFields = new PivotFieldCollection(this);
            this._filterFields = new PivotFieldCollection(this);

            // create array of pivot field lists
            this._viewLists = [
                this._rowFields, this._columnFields, this._valueFields, this._filterFields
            ];

            // listen to changes in the field lists
            var handler = this._fieldListChanged.bind(this);
            this._fields.collectionChanged.addHandler(handler);
            for (var i = 0; i < this._viewLists.length; i++) {
                this._viewLists[i].collectionChanged.addHandler(handler);
            }

            // let the component choose the filter type automatically
            this._defaultFilterType = null;

            // apply initialization options
            if (options) {
                copy(this, options);
            }
        }

        // ** object model

        /**
         * Gets or sets the array or @see:ICollectionView that contains the
         * data to be analyzed, or a string containing the URL for a
         * ComponentOne DataEngine service.
         *
         * ComponentOne DataEngine services allow you to analyze large
         * datasets on a server without downloading the raw data to the
         * client. You can use our high-performance FlexPivot services
         * or interface with Microsoft's SQL Server Analysis Services
         * OLAP Cubes.
         *
         * The @see:PivotEngine sends view definitions to the server,
         * where summaries are calculated and returned to the client.
         *
         * For more information about the ComponentOne DataEngine
         * services please refer to the
         * <a href="http://helpcentral.componentone.com/nethelp/C1WebAPI/APIDataEngine.html">online documentation</a>.
         */
        get itemsSource(): any {
            return this._items;
        }
        set itemsSource(value: any) {
            if (this._items != value) {

                // unbind current collection view
                if (this._cv) {
                    this._cv.collectionChanged.removeHandler(this._cvCollectionChanged, this);
                    this._cv = null;
                }

                // dispose of server
                if (this._server) {
                    this._server.clearPendingRequests();
                    this._server = null;
                }

                // save new data source and collection view (or server url)
                this._items = value;
                if (isString(value)) {
                    this._server = new _ServerConnection(this, value);
                } else {
                    this._cv = asCollectionView(value);
                }

                // bind new collection view
                if (this._cv != null) {
                    this._cv.collectionChanged.addHandler(this._cvCollectionChanged, this);
                }

                // auto-generate fields and refresh
                this.deferUpdate(() => {
                    if (this.autoGenerateFields) {
                        this._generateFields();
                    }
                });

                // raise itemsSourceChanged
                this.onItemsSourceChanged();
            }
        }
        /**
         * Gets the @see:ICollectionView that contains the raw data.
         */
        get collectionView(): collections.ICollectionView {
            return this._cv;
        }
        /**
         * Gets the @see:ICollectionView containing the output pivot view.
         */
        get pivotView(): collections.ICollectionView {
            return this._pivotView;
        }
        /**
         * Gets or sets a value that determines whether the output @see:pivotView
         * should include rows containing subtotals or grand totals.
         */
        get showRowTotals(): ShowTotals {
            return this._showRowTotals;
        }
        set showRowTotals(value: ShowTotals) {
            if (value != this.showRowTotals) {
                this._showRowTotals = asEnum(value, ShowTotals);
                this.onViewDefinitionChanged();
                this.invalidate();
            }
        }
        /**
         * Gets or sets a value that determines whether the output @see:pivotView
         * should include columns containing subtotals or grand totals.
         */
        get showColumnTotals(): ShowTotals {
            return this._showColTotals;
        }
        set showColumnTotals(value: ShowTotals) {
            if (value != this.showColumnTotals) {
                this._showColTotals = asEnum(value, ShowTotals);
                this.onViewDefinitionChanged();
                this.invalidate();
            }
        }
        /**
         * Gets or sets a value that determines whether row and column totals
         * should be displayed before or after regular data rows and columns.
         *
         * If this value is set to true, total rows appear above data rows
         * and total columns appear on the left of regular data columns.
         */
        get totalsBeforeData(): boolean {
            return this._totalsBefore;    
        }
        set totalsBeforeData(value: boolean) {
            if (value != this._totalsBefore) {
                this._totalsBefore = asBoolean(value);
                this.onViewDefinitionChanged();
                this._updatePivotView();
            }
        }
        /**
         * Gets or sets a value that determines whether the Olap output table
         * should use zeros to indicate the missing values.
         */
        get showZeros(): boolean {
            return this._showZeros;
        }
        set showZeros(value: boolean) {
            if (value != this._showZeros) {
                this._showZeros = asBoolean(value);
                this.onViewDefinitionChanged();
                this._updatePivotView();
            }
        }
        /**
         * Gets or sets the default filter type (by value or by condition).
         */
        get defaultFilterType(): grid.filter.FilterType {

            // honor explicitly set defaultFilterType
            if (this._defaultFilterType != null) {
                return this._defaultFilterType;
            }

            // REVIEW
            // limitation: FlexPivotEngine supports only Condition filters
            return this._server
                ? grid.filter.FilterType.Condition
                : grid.filter.FilterType.Both;
        }
        set defaultFilterType(value: grid.filter.FilterType) {
            this._defaultFilterType = asEnum(value, grid.filter.FilterType);
        }
        /**
         * Gets or sets a value that determines whether the engine should generate fields 
         * automatically based on the @see:itemsSource.
         */
        get autoGenerateFields(): boolean {
            return this._autoGenFields;
        }
        set autoGenerateFields(value: boolean) {
            this._autoGenFields = asBoolean(value);
        }
        /**
         * Gets or sets a value that determines whether users should be allowed to edit
         * the properties of the @see:PivotField objects owned by this @see:PivotEngine.
         */
        get allowFieldEditing(): boolean {
            return this._allowFieldEditing;
        }
        set allowFieldEditing(value: boolean) {
            this._allowFieldEditing = asBoolean(value);
        }
        /**
         * Gets the list of @see:PivotField objects exposed by the data source.
         *
         * This list is created automatically whenever the @see:itemsSource property is set.
         *
         * Pivot views are defined by copying fields from this list to the lists that define 
         * the view: @see:valueFields, @see:rowFields, @see:columnFields, and @see:filterFields.
         *
         * For example, the code below assigns a data source to the @see:PivotEngine and 
         * then defines a view by adding fields to the @see:rowFields, @see:columnFields, and 
         * @see:valueFields lists.
         *
         * <pre>// create pivot engine
         * var pe = new wijmo.olap.PivotEngine();
         *
         * // set data source (populates fields list)
         * pe.itemsSource = this.getRawData();
         *
         * // prevent updates while building Olap view
         * pe.beginUpdate();
         *
         * // show countries in rows
         * pe.rowFields.push('Country');
         *
         * // show categories and products in columns
         * pe.columnFields.push('Category');
         * pe.columnFields.push('Product');
         *
         * // show total sales in cells
         * pe.valueFields.push('Sales');
         *
         * // done defining the view
         * pe.endUpdate();</pre>
         */
        get fields(): PivotFieldCollection {
            return this._fields;
        }
        /**
         * Gets the list of @see:PivotField objects that define the fields shown as rows in the output table.
         */
        get rowFields(): PivotFieldCollection {
            return this._rowFields;
        }
        /**
         * Gets the list of @see:PivotField objects that define the fields shown as columns in the output table.
         */
        get columnFields(): PivotFieldCollection {
            return this._columnFields;
        }
        /**
         * Gets the list of @see:PivotField objects that define the fields used as filters.
         * 
         * Fields on this list do not appear in the output table, but are still used for filtering the input data.
         */
        get filterFields(): PivotFieldCollection {
            return this._filterFields;
        }
        /**
         * Gets the list of @see:PivotField objects that define the fields summarized in the output table.
         */
        get valueFields(): PivotFieldCollection {
            return this._valueFields;
        }
        /**
         * Gets or sets the current pivot view definition as a JSON string.
         *
         * This property is typically used to persist the current view as 
         * an application setting.
         *
         * For example, the code below implements two functions that save
         * and load view definitions using local storage:
         *
         * <pre>// save/load views
         * function saveView() {
         *   localStorage.viewDefinition = pivotEngine.viewDefinition;
         * }
         * function loadView() {
         *   pivotEngine.viewDefinition = localStorage.viewDefinition;
         * }</pre>
         */
        get viewDefinition(): string {

            // save options and view
            var viewDef = {
                showZeros: this.showZeros,
                showColumnTotals: this.showColumnTotals,
                showRowTotals: this.showRowTotals,
                defaultFilterType: this.defaultFilterType,
                totalsBeforeData: this.totalsBeforeData,
                fields: [],
                rowFields: this._getFieldCollectionProxy(this.rowFields),
                columnFields: this._getFieldCollectionProxy(this.columnFields),
                filterFields: this._getFieldCollectionProxy(this.filterFields),
                valueFields: this._getFieldCollectionProxy(this.valueFields)
            };

            // save field definitions
            for (var i = 0; i < this.fields.length; i++) {
                var fld = <PivotField>this.fields[i],
                    fieldDef: any = {
                        binding: fld.binding,
                        header: fld.header,
                        dataType: fld.dataType,
                        aggregate: fld.aggregate,
                        showAs: fld.showAs,
                        descending: fld.descending,
                        format: fld.format,
                        width: fld.width,
                        isContentHtml: fld.isContentHtml
                    };
                if (fld.weightField) {
                    fieldDef.weightField = fld.weightField._getName();
                }
                if (fld.key) {
                    fieldDef.key = fld.key;
                }
                if (fld.filter.isActive) {
                    fieldDef.filter = this._getFilterProxy(fld);
                }
                viewDef.fields.push(fieldDef);
            }

            // done
            return JSON.stringify(viewDef);
        }
        set viewDefinition(value: string) {
            var viewDef = JSON.parse(value);
            if (viewDef) {
                this.deferUpdate(() => {

                    // load options
                    this._copyProps(this, viewDef, PivotEngine._props);

                    // load fields
                    this.fields.clear();
                    for (var i = 0; i < viewDef.fields.length; i++) {
                        var fldDef: any = viewDef.fields[i],
                            f = new PivotField(this, fldDef.binding, fldDef.header);
                        f._autoGenerated = true; // treat as auto-generated (delete when auto-generating next batch)
                        this._copyProps(f, fldDef, PivotField._props);
                        if (fldDef.filter) {
                            this._setFilterProxy(f, fldDef.filter);
                        }
                        this.fields.push(f);
                    }

                    // load field weights
                    for (var i = 0; i < viewDef.fields.length; i++) {
                        var fldDef: any = viewDef.fields[i];
                        if (isString(fldDef.weightField)) {
                            this.fields[i].weightField = this.fields.getField(fldDef.weightField);
                        }
                    }

                    // load view fields
                    this._setFieldCollectionProxy(this.rowFields, viewDef.rowFields);
                    this._setFieldCollectionProxy(this.columnFields, viewDef.columnFields);
                    this._setFieldCollectionProxy(this.filterFields, viewDef.filterFields);
                    this._setFieldCollectionProxy(this.valueFields, viewDef.valueFields);
                });
            }
        }
        /**
         * Gets a value that determines whether a pivot view is currently defined.
         *
         * A pivot view is defined if the @see:valueFields list is not empty and 
         * either the @see:rowFields or @see:columnFields lists are not empty.
         */
        get isViewDefined(): boolean {
            return this._valueFields.length > 0 && (this._rowFields.length > 0 || this._columnFields.length > 0);
        }
        /**
         * Suspends the refresh processes until next call to the @see:endUpdate.
         */
        beginUpdate() {
            this.cancelPendingUpdates();
            this._updating++;
        }
        /**
         * Resumes refresh processes suspended by calls to @see:beginUpdate.
         */
        endUpdate() {
            this._updating--;
            if (this._updating <= 0) {
                this.onViewDefinitionChanged();
                this.refresh();
            }
        }
        /**
         * Gets a value that indicates whether the engine is currently being updated.
         */
        get isUpdating(): boolean {
            return this._updating > 0;
        }
        /**
         * Executes a function within a @see:beginUpdate/@see:endUpdate block.
         *
         * The control will not be updated until the function has been executed.
         * This method ensures @see:endUpdate is called even if the function throws
         * an exception.
         *
         * @param fn Function to be executed. 
         */
        deferUpdate(fn: Function) {
            try {
                this.beginUpdate();
                fn();
            } finally {
                this.endUpdate();
            }
        }
        /**
         * Summarizes the data and updates the output @see:pivotView.
         *
         * @param force Refresh even while updating (see @see:beginUpdate).
         */
        refresh(force = false) {
            if (!this.isUpdating || force) {
                this._updateView();
            }
        }
        /**
         * Invalidates the view causing an asynchronous refresh.
         */
        invalidate() {
            if (this._toInv) {
                this._toInv = clearTimeout(this._toInv);
            }
            if (!this.isUpdating) {
                this._toInv = setTimeout(() => {
                    this.refresh();
                }, 10);
            }
        }
        /** 
         * Gets or sets a value that determines whether view updates should be generated asynchronously.
         * 
         * This property is set to true by default, so summaries over large data sets are performed
         * asynchronously to prevent stopping the UI thread.
         */
        get async(): boolean {
            return this._async;
        }
        set async(value: boolean) {
            if (value != this._async) {
                this.cancelPendingUpdates();
                this._async = asBoolean(value);
            }
        }
        /**
         * Cancels any pending asynchronous view updates.
         */
        cancelPendingUpdates() {
            if (this._toUpdateTallies) {
                clearTimeout(this._toUpdateTallies);
                this._toUpdateTallies = null;
            }
        }
        /**
         * Gets an array containing the records summarized by a property in the
         * @see:pivotView list.
         *
         * If the engine is connected to a PivotEngine server, the value returned
         * is an @see:ObservableArray that is populated asynchronously.
         *
         * @param item Data item in the @see:pivotView list.
         * @param binding Name of the property being summarized.
         */
        getDetail(item: any, binding: string): any[] {
            var rowKey = item ? <_PivotKey>item[_PivotKey._ROW_KEY_NAME] : null,
                colKey = this._getKey(binding);

            // get detail items on server
            if (this._server) {
                return this._server.getDetail(rowKey, colKey);
            }

            // get detail items on client
            var items = this.collectionView.items,
                arr = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (this._applyFilter(item) &&
                    (rowKey == null || rowKey.matchesItem(item)) &&
                    (colKey == null || colKey.matchesItem(item))) {
                    arr.push(item);
                }
            }
            return arr;
        }
        /**
         * Gets an @see:collections.ICollectionView containing the records summarized
         * by a property in the @see:pivotView list.
         *
         * @param item Data item in the @see:pivotView list.
         * @param binding Name of the property being summarized.
         */
        getDetailView(item: any, binding: string): wijmo.collections.ICollectionView {
            var arr = this.getDetail(item, binding);
            return new collections.CollectionView(arr);
        }
        /**
         * Gets an object with information about a property in the @see:pivotView list.
         *
         * The object returned has two properties, 'rowKey' and 'colKey'. Each of
         * these contains two arrays, 'fields' and 'values'. Together, this information
         * uniquely identifies a value summarized by the @see:PivotEngine.
         *
         * For example, calling @see:getKeys against a pivot view with two row fields
         * 'Product' and 'Country', and a single column field 'Active' would return an
         * object such as this one:
         *
         * <pre>{
         *     rowKey: {
         *         fields: [ 'Product', 'Country'],
         *         values: [ 'Aoba', 'Japan' ]
         *     },
         *     colKey: {
         *         fields: [ 'Active' ],
         *         values: [ true ]
         *     }
         * }</pre>
         *
         * The object identifies the subset of data used to obtain one summary value.
         * In this case, this value represents all data items for product 'Aoba' sold
         * in Japan with active state set to true.
         *
         * @param item Data item in the @see:pivotView list.
         * @param binding Name of the property being summarized.
         */
        getKeys(item: any, binding: string): any {
            var rowKey = item ? <_PivotKey>item[_PivotKey._ROW_KEY_NAME] : null,
                colKey = this._getKey(binding);
            return {
                rowKey: {
                    fields: rowKey.fieldNames,
                    values: rowKey.values
                },
                colKey: {
                    fields: colKey.fieldNames,
                    values: colKey.values
                }
            }
        }
        /**
         * Shows a settings dialog where users can edit a field's settings.
         *
         * @param field @see:PivotField to be edited.
         */
        editField(field: PivotField) {
            if (this.allowFieldEditing) {
                var edt = new PivotFieldEditor(document.createElement('div'), {
                    field: field
                });
                var dlg = new input.Popup(document.createElement('div'), {
                    content: edt.hostElement
                });
                dlg.show(true);
            }
        }
        /**
         * Removes a field from the current view.
         *
         * @param field @see:PivotField to be removed.
         */
        removeField(field: PivotField) {
            for (var i = 0; i < this._viewLists.length; i++) {
                var list = this._viewLists[i],
                    index = list.indexOf(field);
                if (index > -1) {
                    list.removeAt(index);
                    return;
                }
            }
        }

        /**
         * Occurs after the value of the @see:itemsSource property changes.
         */
        itemsSourceChanged = new Event();
        /**
         * Raises the @see:itemsSourceChanged event.
         */
        onItemsSourceChanged(e?: EventArgs) {
            this.itemsSourceChanged.raise(this, e);
        }
        /**
         * Occurs after the view definition changes.
         */
        viewDefinitionChanged = new Event();
        /**
         * Raises the @see:viewDefinitionChanged event.
         */
        onViewDefinitionChanged(e?: EventArgs) {
            if (!this._updating) {
                this.viewDefinitionChanged.raise(this, e);
            }
        }
        /**
         * Occurs when the engine starts updating the @see:pivotView list.
         */
        updatingView = new Event();
        /**
         * Raises the @see:updatingView event.
         * 
         * @param e @see:ProgressEventArgs that provides the event data.
         */
        onUpdatingView(e: ProgressEventArgs) {
            this.updatingView.raise(this, e);
        }
        /**
         * Occurs after the engine has finished updating the @see:pivotView list.
         */
        updatedView = new Event();
        /**
         * Raises the @see:updatedView event.
         */
        onUpdatedView(e?: EventArgs) {
            this.updatedView.raise(this, e);
        }
        /**
         * Occurs when there is an error getting data from the server.
         */
        error = new Event();
        /**
         * Raises the @see:error event.
         *
         * @param e @see:RequestErrorEventArgs that contains information about the error.
         */
        onError(e: RequestErrorEventArgs): boolean {
            this.error.raise(this, e);
            return !e.cancel;
        }

        // ** implementation

        // method used in JSON-style initialization
        _copy(key: string, value: any): boolean {
            switch (key) {
                case 'fields':
                    this.fields.clear();
                    for (var i = 0; i < this._viewLists.length; i++) {
                        this._viewLists[i].clear();
                    }
                    var arr = asArray(value);
                    for (var i = 0; i < arr.length; i++) {
                        var fld = this._createField(arr[i], false);
                        this.fields.push(fld);
                    }
                    return true;
                case 'rowFields':
                case 'columnFields':
                case 'valueFields':
                case 'filterFields':
                    this[key].clear();

                    // handle objects with maxItems/items
                    if (!isArray(value)) {
                        this[key].maxItems = value.maxItems;
                        value = value.items;
                    }

                    // handle regular arrays
                    var arr = asArray(value);
                    for (var i = 0; i < arr.length; i++) {
                        var fld = this.fields.getField(arr[i]);
                        this[key].push(fld);
                    }
                    return true;
            }
            return false;
        }

        // get a pivot key from its string representation
        _getKey(keyString: string): _PivotKey {
            return <_PivotKey>this._keys[keyString];
        }

        // get the subtotal level of a row based on its key or item index
        _getRowLevel(key: any): number {

            // convert index into row key
            if (isNumber(key)) {
                var item = this._pivotView.items[key];
                key = item ? item[_PivotKey._ROW_KEY_NAME] : null;
            }

            // return subtotal level
            return !key || key._fieldCount == this.rowFields.length
                ? -1 // not a subtotal
                : key._fieldCount; // level 0 is grand total, etc
        }

        // get the subtotal level of a column based on its key, binding, or column index
        _getColLevel(key: any): number {

            // convert column index into column key
            if (isNumber(key)) {
                key = this._colBindings[key];
            }

            // convert binding into column key
            if (isString(key)) {
                key = this._getKey(key);
            }

            // sanity
            assert(key == null || key instanceof _PivotKey, 'invalid parameter in call to _getColLevel');

            // return subtotal level
            return !key || key._fieldCount == this.columnFields.length
                ? -1 // not a subtotal
                : key._fieldCount; // level 0 is grand total, etc
        }

        // apply filter to a given object
        private _applyFilter(item: any) {

            // scan all fields that have active filters
            var fields = this._activeFilterFields;
            for (var i = 0; i < fields.length; i++) {
                var f = (<PivotField>fields[i]).filter;
                if (!f.apply(item)) {
                    return false;
                }
            }

            // value passed all filters
            return true;
        }

        // refresh _tallies object used to build the output pivotView
        private _updateView() {

            // benchmark
            //console.time('view update');

            // clear any on-going updates
            this.cancelPendingUpdates();

            // count items and filtered items
            this._cntTotal = this._cntFiltered = 0;

            // clear tallies and active filter fields
            this._tallies = {};
            this._keys = {};
            this._activeFilterFields = [];

            // update view from server
            if (this._server) {
                if (this.isViewDefined) {
                    this._server.getOutputView((result) => {
                        if (this.isViewDefined) { // the view might be gone by now: TFS 250028
                            this._server.updateTallies(result);
                            this._updatePivotView();
                        }
                    });
                    return;
                }
            }

            // keep track of active filter fields (optimization)
            var lists = this._viewLists;
            for (var i = 0; i < lists.length; i++) {
                var list = lists[i];
                for (var j = 0; j < list.length; j++) {
                    var f = <PivotField>list[j];
                    if (f.filter.isActive) {
                        this._activeFilterFields.push(f);
                    }
                }
            }

            // tally all objects in data source
            if (this.isViewDefined && this._cv && this._cv.items) {
                this._batchStart = Date.now();
                this._updateTallies(this._cv.items, 0);
            } else {
                this._updatePivotView();
            }
        }

        // async tally update
        private _updateTallies(arr: any[], startIndex: number) {
            var arrLen = arr.length,
                rowNodes = new _PivotNode(this._rowFields, 0, null, -1, null);

            // set loop start and step variables to control key size and subtotal creation
            var rkLen = this._rowFields.length,
                rkStart = this._showRowTotals == ShowTotals.None ? rkLen : 0,
                rkStep = this._showRowTotals == ShowTotals.GrandTotals ? Math.max(1, rkLen) : 1,
                ckLen = this._columnFields.length,
                ckStart = this._showColTotals == ShowTotals.None ? ckLen : 0,
                ckStep = this._showColTotals == ShowTotals.GrandTotals ? Math.max(1, ckLen) : 1,
                vfLen = this._valueFields.length;

            // scan through the items
            for (var index = startIndex; index < arrLen; index++) {

                // let go of the thread for a while
                if (this._async &&
                    index - startIndex >= PivotEngine._BATCH_SIZE &&
                    Date.now() - this._batchStart > PivotEngine._BATCH_DELAY) {
                    this._toUpdateTallies = setTimeout(() => {
                        this.onUpdatingView(new ProgressEventArgs(Math.round(index / arr.length * 100)));
                        this._batchStart = Date.now();
                        this._updateTallies(arr, index);
                    }, PivotEngine._BATCH_TIMEOUT);
                    return;
                }

                // count elements
                this._cntTotal++;

                // apply filter
                var item = arr[index];
                if (!this._activeFilterFields.length || this._applyFilter(item)) {

                    // count filtered items from raw data source
                    this._cntFiltered++;

                    // get/create row tallies
                    for (var i = rkStart; i <= rkLen; i += rkStep, nd = nd.parent) {
                        var nd = rowNodes.getNode(this._rowFields, i, null, -1, item),
                            rowKey = nd.key,
                            //rowKey = new _PivotKey(this._rowFields, i, null, -1, item),
                            rowKeyId = rowKey.toString(),
                            rowTallies = this._tallies[rowKeyId];
                        if (!rowTallies) {
                            this._keys[rowKeyId] = rowKey;
                            this._tallies[rowKeyId] = rowTallies = {};
                        }

                        // get/create column tallies
                        for (var j = ckStart; j <= ckLen; j += ckStep) {
                            for (var k = 0; k < vfLen; k++) {
                                var colNodes = nd.tree.getNode(this._columnFields, j, this._valueFields, k, item),
                                    colKey = colNodes.key,
                                    //colKey = new _PivotKey(this._columnFields, j, this._valueFields, k, item),
                                    colKeyId = colKey.toString(),
                                    tally = rowTallies[colKeyId];
                                if (!tally) {
                                    this._keys[colKeyId] = colKey;
                                    tally = rowTallies[colKeyId] = new _Tally();
                                }

                                // get values
                                var vf = this._valueFields[k],
                                    value = vf._getValue(item, false),
                                    weight = vf._weightField ? vf._getWeight(item) : null;

                                // update tally
                                tally.add(value, weight);
                            }
                        }
                    }
                }
            }

            // done with tallies, update view
            this._toUpdateTallies = null;
            this._updatePivotView();
        }

        // refresh the output pivotView from the tallies
        private _updatePivotView() {
            this._pivotView.deferUpdate(() => {

                // start updating the view
                this.onUpdatingView(new ProgressEventArgs(100));

                // clear table and sort
                var arr = this._pivotView.sourceCollection;
                arr.length = 0;

                // get sorted row keys
                var rowKeys = {};
                for (var rk in this._tallies) {
                    rowKeys[rk] = true;
                }

                // get sorted column keys
                var colKeys = {};
                for (var rk in this._tallies) {
                    var row = this._tallies[rk];
                    for (var ck in row) {
                        colKeys[ck] = true;
                    }
                }

                // build output items
                var sortedRowKeys = this._getSortedKeys(rowKeys),
                    sortedColKeys = this._getSortedKeys(colKeys);
                for (var r = 0; r < sortedRowKeys.length; r++) {
                    var rowKey = sortedRowKeys[r],
                        row = this._tallies[rowKey],
                        item = {};
                    item[_PivotKey._ROW_KEY_NAME] = this._getKey(rowKey);// rowKey;
                    for (var c = 0; c < sortedColKeys.length; c++) {

                        // get the value
                        var colKey = sortedColKeys[c],
                            tally = <_Tally>row[colKey],
                            pk = this._getKey(colKey),
                            value = tally ? tally.getAggregate(pk.aggregate) : null;

                        // hide zeros if 'showZeros' is true
                        if (value == 0 && !this._showZeros) {
                            value = null;
                        }

                        // store the value
                        item[colKey] = value;
                    }
                    arr.push(item);
                }

                // save column keys so we can access them by index
                this._colBindings = sortedColKeys;

                // honor 'showAs' settings
                this._updateFieldValues(arr);

                // remove any sorts
                this._pivotView.sortDescriptions.clear();

                // done updating the view
                this.onUpdatedView();
                
                // benchmark
                //console.timeEnd('view update');
            });
        }

        // gets a sorted array of PivotKey ids
        private _getSortedKeys(obj: any): string[] {
            return Object.keys(obj).sort((id1, id2) => {
                return this._keys[id1].compareTo(this._keys[id2]);
            });
        }

        // update field values to honor showAs property
        private _updateFieldValues(arr: any[]) {

            // scan value fields
            var vfl = this.valueFields.length;
            for (var vf = 0; vf < vfl; vf++) {
                var fld = this.valueFields[vf];
                switch (fld.showAs) {

                    // running totals
                    case ShowAs.RunTot:
                    case ShowAs.RunTotPct:
                        for (var col = vf; col < this._colBindings.length; col += vfl) {

                            // calculate running totals
                            for (var row = 0; row < arr.length; row++) {
                                var item = arr[row],
                                    binding = this._colBindings[col];
                                item[binding] = this._getRunningTotal(arr, row, col, fld.showAs);
                            }

                            // convert running totals to percentages
                            if (fld.showAs == ShowAs.RunTotPct) {
                                for (var row = 0; row < arr.length; row++) {
                                    var item = arr[row],
                                        binding = this._colBindings[col],
                                        val = item[binding];
                                    if (isNumber(val)) {
                                        var max = this._getLastValueInRowGroup(arr, row, col);
                                        if (max != 0) {
                                            item[binding] = val / max;
                                        }
                                    }
                                }
                            }
                        }
                        break;

                    // percentages
                    case ShowAs.PctGrand:
                    case ShowAs.PctCol:

                        // calculate grand total
                        var total = 0;
                        if (fld.showAs == ShowAs.PctGrand) {
                            for (var col = vf; col < this._colBindings.length; col += vfl) {
                                if (this._getColLevel(col) == -1) {
                                    total += this._getColTotal(arr, col);
                                }
                            }
                        }

                        // convert columns to percentages
                        for (var col = vf; col < this._colBindings.length; col += vfl) {

                            // calculate column total
                            if (fld.showAs == ShowAs.PctCol) {
                                total = this._getColTotal(arr, col);
                            }

                            // convert column values to percentages
                            var binding = this._colBindings[col];
                            for (var row = 0; row < arr.length; row++) {
                                var item = arr[row],
                                    value = item[binding];
                                if (isNumber(value)) {
                                    item[binding] = total != 0 ? value / total : null;
                                }
                            }
                        }
                        break;

                    case ShowAs.PctRow:
                        for (var row = 0; row < arr.length; row++) {

                            // calculate total for this row
                            var item = arr[row],
                                total = 0;
                            for (var col = vf; col < this._colBindings.length; col += vfl) {
                                if (this._getColLevel(col) == -1) {
                                    var binding = this._colBindings[col],
                                        value = item[binding];
                                    if (isNumber(value)) {
                                        total += value;
                                    }
                                }
                            }

                            // convert row values to percentages
                            for (var col = vf; col < this._colBindings.length; col += vfl) {
                                var binding = this._colBindings[col],
                                    value = item[binding];
                                if (isNumber(value)) {
                                    item[binding] = total != 0 ? value / total : null;
                                }
                            }
                        }
                        break;

                    // row differences
                    case ShowAs.DiffRow:
                    case ShowAs.DiffRowPct:
                        for (var col = vf; col < this._colBindings.length; col += vfl) {
                            for (var row = arr.length - 1; row >= 0; row--) {
                                var item = arr[row],
                                    binding = this._colBindings[col];
                                item[binding] = this._getRowDifference(arr, row, col, fld.showAs);
                            }
                        }
                        break;

                    // column differences
                    case ShowAs.DiffCol:
                    case ShowAs.DiffColPct:
                        for (var row = 0; row < arr.length; row++) {
                            for (var col = this._colBindings.length - vfl + vf; col >= 0; col -= vfl) {
                                var item = arr[row],
                                    binding = this._colBindings[col];
                                item[binding] = this._getColDifference(arr, row, col, fld.showAs);
                            }
                        }
                        break;
                }
            }
        }

        // gets a total for all non-group values in a column
        private _getColTotal(arr: any[], col: number): number {
            var binding = this._colBindings[col],
                total = 0;
            for (var row = 0; row < arr.length; row++) {
                if (this._getRowLevel(row) == -1) {
                    var val = arr[row][binding];
                    if (isNumber(val)) {
                        total += val;
                    }
                }
            }
            return total;
        }

        // gets the a running total for an item by adding its value to the value in the previous row
        private _getRunningTotal(arr: any[], row: number, col: number, showAs: ShowAs): number {

            // grand total? no running total (as in Excel).
            var level = this._getRowLevel(row);
            if (level == 0) {
                return null;
            }

            // get binding and cell value
            var binding = this._colBindings[col],
                runTot = arr[row][binding];

            // get previous item at the same level
            var grpFld = this.rowFields.length - 2;
            for (var p = row - 1; p >= 0; p--) {
                var plevel = this._getRowLevel(p);
                if (plevel == level) {

                    // honor groups even without subtotals 
                    if (grpFld > -1 && level < 0 && this._showRowTotals != ShowTotals.Subtotals) {
                        var k = arr[row].$rowKey,
                            kp = arr[p].$rowKey;
                        if (k.values[grpFld] != kp.values[grpFld]) {
                            return null;
                        }
                    }

                    // compute running total
                    var pval = arr[p][binding];
                    runTot += pval;
                    break;
                }

                // not found...
                if (plevel > level) break;
            }

            // return running total (percentages to be calculated later)
            return runTot;
        }

        // gets the last value in a row group (used to calculate running total percentages)
        private _getLastValueInRowGroup(arr: any[], row: number, col: number): number {

            // get binding and cell value
            var binding = this._colBindings[col],
                lastVal = arr[row][binding];

            // get next item at the same level
            var level = this._getRowLevel(row),
                grpFld = this.rowFields.length - 2;
            for (var p = row + 1; p < arr.length; p++) {
                var plevel = this._getRowLevel(p);
                if (plevel == level) {

                    // honor groups even without subtotals 
                    if (grpFld > -1 && level < 0 && this._showRowTotals != ShowTotals.Subtotals) {
                        var k = arr[row].$rowKey,
                            kp = arr[p].$rowKey;
                        if (k.values[grpFld] != kp.values[grpFld]) {
                            return lastVal;
                        }
                    }

                    // compute running total
                    lastVal = arr[p][binding];
                }

                // not found...
                if (plevel > level) break;
            }

            // return running total (percentages to be calculated later)
            return lastVal;
        }

        // gets the difference between an item and the item in the previous row
        private _getRowDifference(arr: any[], row: number, col: number, showAs: ShowAs): number {
            
            // grand total? no previous item, no diff.
            var level = this._getRowLevel(row);
            if (level == 0) {
                return null;
            }

            // get previous item at the same level
            var grpFld = this.rowFields.length - 2;
            for (var p = row - 1; p >= 0; p--) {
                var plevel = this._getRowLevel(p);
                if (plevel == level) {

                    // honor groups even without subtotals 
                    if (grpFld > -1 && level < 0 && this._showRowTotals != ShowTotals.Subtotals) {
                        var k = arr[row].$rowKey,
                            kp = arr[p].$rowKey;
                        if (k.values[grpFld] != kp.values[grpFld]) {
                            return null;
                        }
                    }

                    // compute difference
                    var binding = this._colBindings[col],
                        val = arr[row][binding],
                        pval = arr[p][binding],
                        diff = val - pval;
                    if (showAs == ShowAs.DiffRowPct) {
                        diff /= pval;
                    }

                    // done
                    return diff;
                }

                // not found...
                if (plevel > level) break;
            }

            // no previous item? null
            return null;
        }

        // gets the difference between an item and the item in the previous column
        private _getColDifference(arr: any[], row: number, col: number, showAs: ShowAs): number {

            // grand total? no previous item, no diff.
            var level = this._getColLevel(col);
            if (level == 0) {
                return null;
            }

            // get previous item at the same level
            var vfl = this.valueFields.length,
                grpFld = this.columnFields.length - 2
            for (var p = col - vfl; p >= 0; p -= vfl) {
                var plevel = this._getColLevel(p);
                if (plevel == level) {

                    // honor groups even without subtotals
                    if (grpFld > -1 && level < 0 && this._showColTotals != ShowTotals.Subtotals) {
                        var k = this._getKey(this._colBindings[col]),
                            kp = this._getKey(this._colBindings[p]);
                        if (k.values[grpFld] != kp.values[grpFld]) {
                            return null;
                        }
                    }

                    // compute difference
                    var item = arr[row],
                        val = item[this._colBindings[col]],
                        pval = item[this._colBindings[p]],
                        diff = val - pval;
                    if (showAs == ShowAs.DiffColPct) {
                        diff /= pval;
                    }

                    // done
                    return diff;
                }

                // not found...
                if (plevel > level) break;
            }

            // no previous item? null
            return null;
        }

        // generate fields for the current itemsSource
        private _generateFields() {
            var field: PivotField;

            // empty view lists
            for (var i = 0; i < this._viewLists.length; i++) {
                this._viewLists[i].clear();
            }

            // remove old auto-generated columns
            for (var i = 0; i < this.fields.length; i++) {
                field = this.fields[i];
                if (field._autoGenerated) {
                    this.fields.removeAt(i);
                    i--;
                }
            }

            // get field list from server
            if (this._server) {
                var fields = this._server.getFields();
                for (var i = 0; i < fields.length; i++) {
                    field = this._createField(fields[i], true);
                    this.fields.push(field);
                }
                return;
            }

            // get first item to infer data types
            var item = null,
                cv = this.collectionView;
            if (cv && cv.sourceCollection && cv.sourceCollection.length) {
                item = cv.sourceCollection[0];
            }

            // auto-generate new fields
            // (skipping unwanted types: array and object)
            if (item && this.autoGenerateFields) {
                for (var key in item) {
                    if (isPrimitive(item[key])) {
                        field = this._createField({
                            binding: key,
                            header: toHeaderCase(key),
                            dataType: getType(item[key])
                        }, true);
                        this.fields.push(field);
                    }
                }
            }

            // update missing column types
            if (item) {
                for (var i = 0; i < this.fields.length; i++) {
                    field = this.fields[i];
                    if (field.dataType == null && field._binding) {
                        field.dataType = getType(field._binding.getValue(item));
                    }
                }
            }
        }

        // create the field according to options.
        _createField(options: any, autoGenerated: boolean): PivotField {

            // create cube or regular field
            var field: PivotField;
            if (isString(options)) {
                field = new PivotField(this, options);
            } else if (options.dimensionType != null) {
                field = new CubePivotField(this, options.binding, options.header, options);
            } else {
                field = new PivotField(this, options.binding, options.header, options);
            }

            // remember if this was auto generated
            field._autoGenerated = autoGenerated;

            // set defaults if auto-generating
            if (autoGenerated || isString(options)) {
                switch (field.dataType) {
                    case DataType.Number:
                        field.aggregate = Aggregate.Sum;
                        field.format = 'n0';
                        break;
                    case DataType.Date:
                        field.aggregate = Aggregate.Cnt;
                        field.format = 'd';
                        break;
                    default:
                        field.aggregate = Aggregate.Cnt;
                        break;
                }
            }

            // all done
            return field;
        }

        // handle changes to data source
        private _cvCollectionChanged(sender, e: collections.NotifyCollectionChangedEventArgs) {
            this.invalidate();
        }

        // handle changes to field lists
        private _fieldListChanged(s: any, e: collections.NotifyCollectionChangedEventArgs) {
            if (e.action == collections.NotifyCollectionChangedAction.Add) {
                var arr = <PivotFieldCollection>s;
            
                // rule 1: prevent duplicate items within a list
                for (var i = 0; i < arr.length - 1; i++) {
                    if (arr[i].key) { // REVIEW: cube fields with children have no key...
                        for (var j = i + 1; j < arr.length; j++) {
                            if (arr[i].key == arr[j].key) {
                                arr.removeAt(j);
                                j--;
                            }
                        }
                    }
                }

                // rule 2: if a field was added to one of the view lists, 
                // make sure it is also on the main list
                // and that it only appears once in the view lists
                if (arr != this._fields) {
                    if (!this._fields.getField(e.item.key)) {
                        arr.removeAt(e.index); // not on the main list, remove from view list
                    } else { // remove duplicates
                        for (var i = 0; i < this._viewLists.length; i++) {
                            if (this._viewLists[i] != arr) {
                                var list = this._viewLists[i];
                                var index = list.indexOf(e.item);
                                if (index > -1) {
                                    list.removeAt(index);
                                }
                            }
                        }
                    }
                }

                // rule 3: honor maxItems
                if (isNumber(arr.maxItems) && arr.maxItems > -1) {
                    while (arr.length > arr.maxItems) {
                        var index = arr.length - 1;
                        if (arr[index] == e.item && index > 0) {
                            index--;
                        }
                        arr.removeAt(index);
                    }
                }
            }

            // notify and be done
            this.onViewDefinitionChanged();
            this.invalidate();
        }

        // handle changes to field properties
        /*private*/ _fieldPropertyChanged(field: PivotField, e: PropertyChangedEventArgs) {

            // raise viewDefinitionChanged
            this.onViewDefinitionChanged();

            // if the field is not active, we're done
            if (!field.isActive) {
                return;
            }

            // take action depending on the property that changed
            var prop = e.propertyName;

            // changing width, wordWrap or isContentHtml only requires a view refresh
            // (no need to re-summarize)
            if (prop == 'width' || prop == 'wordWrap' || prop == 'isContentHtml') {
                this._pivotView.refresh();
                return;
            }

            // changing the format of a value field only requires a view refresh 
            // (no need to re-summarize)
            if (prop == 'format' && this.valueFields.indexOf(field) > -1) {
                this._pivotView.refresh();
                return;
            }

            // changing the showAs property requires view update
            // (no need to re- summarize)
            if (prop == 'showAs') {
                if (this.valueFields.indexOf(field) > -1 && !this.isUpdating) {
                    this._updatePivotView();
                }
                return;
            }

            // changing the descending property requires view update 
            // (no need to re- summarize)
            if (prop == 'descending') {
                this._updatePivotView();
                return;
            }

            // changing the aggregate property requires re-generation
            // on the server, view update on the client
            if (prop == 'aggregate') {
                if (this.valueFields.indexOf(field) > -1 && !this.isUpdating) {
                    if (this._server) {
                        this._updateView(); // update the summaries
                    } else {
                        this._updatePivotView(); // update the view
                    }
                }
                return;
            }

            // refresh the whole view (summarize and regenerate)
            this.invalidate();
        }

        // copy properties from a source object to a destination object
        /*private*/ _copyProps(dst: any, src: any, props: string[]) {
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (src[prop] != null) {
                    dst[prop] = src[prop];
                }
            }
        }

        // persist view field collections
        private _getFieldCollectionProxy(arr: PivotFieldCollection) {
            var proxy: any = {
                items: []
            };
            if (isNumber(arr.maxItems) && arr.maxItems > -1) {
                proxy.maxItems = arr.maxItems;
            }
            for (var i = 0; i < arr.length; i++) {
                var fld = <PivotField>arr[i];
                proxy.items.push(fld.key);
            }
            return proxy;
        }
        private _setFieldCollectionProxy(arr: PivotFieldCollection, proxy: any) {
            arr.clear();
            arr.maxItems = isNumber(proxy.maxItems) ? proxy.maxItems : null;
            for (var i = 0; i < proxy.items.length; i++) {
                arr.push(proxy.items[i]);
            }
        }

        // persist field filters
        private _getFilterProxy(fld: PivotField): any {
            var flt = fld.filter;

            // condition filter (without inactive conditions)
            if (flt.conditionFilter.isActive) {
                var cf = flt.conditionFilter,
                    proxy = {
                        type: 'condition',
                        condition1: { operator: cf.condition1.operator, value: cf.condition1.value },
                        and: cf.and,
                        condition2: { operator: cf.condition2.operator, value: cf.condition2.value }
                    };
                if (!cf.condition1.isActive) {
                    delete proxy.condition1;
                }
                if (!cf.condition2.isActive) {
                    delete proxy.condition2;
                }
                return proxy;
            }

            // value filter
            if (flt.valueFilter.isActive) {
                var vf = flt.valueFilter;
                return {
                    type: 'value',
                    filterText: vf.filterText,
                    showValues: vf.showValues
                }
            }

            // no filter!
            assert(false, 'inactive filters shouldn\'t be persisted.');
            return null;
        }
        private _setFilterProxy(fld: PivotField, proxy: any) {
            var flt = fld.filter;
            flt.clear();
            switch (proxy.type) {
                case 'condition':
                    var cf = flt.conditionFilter;
                    if (proxy.condition1) {
                        var val = changeType(proxy.condition1.value, fld.dataType, fld.format);
                        cf.condition1.value = val ? val : proxy.condition1.value;
                        cf.condition1.operator = proxy.condition1.operator;
                    }
                    if (isBoolean(proxy.and)) {
                        cf.and = proxy.and;
                    }
                    if (proxy.condition2) {
                        var val = changeType(proxy.condition2.value, fld.dataType, fld.format);
                        cf.condition2.value = val ? val : proxy.condition2.value;
                        cf.condition2.operator = proxy.condition2.operator;
                    }
                    break;
                case 'value':
                    var vf = flt.valueFilter;
                    vf.filterText = proxy.filterText;
                    vf.showValues = proxy.showValues;
                    break;
            }
        }
    }

    /**
     * Provides arguments for progress events.
     */
    export class ProgressEventArgs extends EventArgs {
        _progress: number;

        /**
         * Initializes a new instance of the @see:ProgressEventArgs class.
         *  
         * @param progress Number between 0 and 100 that represents the progress.
         */
        constructor(progress: number) {
            super();
            this._progress = asNumber(progress);
        }

        /**
         * Gets the current progress as a number between 0 and 100.
         */
        get progress(): number {
            return this._progress;
        }
    }
}
module wijmo.olap {
    'use strict';

    /**
     * Represents a connection to a Pivot service.
     */
    export class _ServerConnection {
        private _ng: PivotEngine;           // engine that owns this connection
        private _token: string;             // server token for the current analysis
        private _start: number;             // start time for the current analysis
        private _progress: number;          // current progress
        private _request: XMLHttpRequest;   // current http request
        private _toGetStatus: any;       // timeout object for getting the analysis status

        static _POLL_INTERVAL = 500;        // poll state every 500ms
        static _TIMEOUT = 1000 * 60;        // quit after 60 seconds (server hung?)
        static _MAXDETAIL = 1000;           // show up to 1k detail records

        /**
         * Initializes a new instance of the @see:_ServerConnection class.
         *
         * @param engine @see:PivotEngine that owns this field.
         * @param url Url used to communicate with the server.
         */
        constructor(engine: PivotEngine, url: string) {
            this._ng = asType(engine, PivotEngine);
            assert(this._isValidUrl(url), 'Invalid service Url: ' + url + ')')
        }

        /**
         * Gets a list of fields available on the server.
         */
        getFields(): PivotField[] {

            // get fields from the server (TFS 253052)
            var xhr = httpRequest(this._getUrl('Fields'), { async: false });
            if (!xhr.responseText || xhr.status > 200) {
                this._handleError('Getting Fields', xhr);
                return;
            }

            // parse and return result
            var result = JSON.parse(xhr.responseText);
            if (!isArray(result)) {
                console.error('Failed to get fields from server: ' + xhr.responseText);
                return null;
            }
            return result;
        }
        /**
         * Gets the output view for the current view definition.
         *
         * @param callBack function invoked to handle the results.
         */
        getOutputView(callBack: Function) {
            this.clearPendingRequests();
            this._sendHttpRequest('Analyses', {
                method: 'POST',
                data: {
                    view: this._ng.viewDefinition
                },
                success: (xhr) => {
                    var result = <_IAnalysis>JSON.parse(xhr.responseText);
                    this._token = result.token;
                    this._start = Date.now();
                    this._handleResult(result.status, callBack);
                },
                error: (xhr) => {
                    this._handleError('Analyses', xhr);
                }
            });
        }
        /**
         * Gets an array containing the data items that were used to calculate
         * an aggregated cell.
         *
         * @param rowKey Identifies the row that contains the aggregated cell.
         * @param colKey Identifies the column that contains the aggregated cell.
         */
        getDetail(rowKey, colKey): any[] {
            var arr: any,
                keys = [],
                count = this._ng.rowFields.length,
                valueCount = rowKey ? rowKey.values.length : 0;

            // prepare the keys for rowFields.
            for (var i = 0; i < count; i++) {
                if (i < valueCount) {
                    keys.push(rowKey.values[i]);
                } else {
                    keys.push(null);
                }
            }

            // prepare the keys for columnFields.
            count = this._ng.columnFields.length;
            valueCount = colKey ? colKey.values.length : 0;
            for (var i = 0; i < count; i++) {
                if (i < valueCount) {
                    keys.push(colKey.values[i]);
                } else {
                    keys.push(null);
                }
            }

            // get details from server
            arr = new collections.ObservableArray();
            this._loadArray('Detail', arr, {
                method: 'POST',
                view: this._ng.viewDefinition,
                keys: keys,
                max: _ServerConnection._MAXDETAIL
            });

            // return ObservableArray (will be filled when the request returns)
            return arr;
        }
        /**
         * Cancels any pending requests.
         */
        clearPendingRequests() {
            this._clearRequest();
            this._clearTimeout();
            this._clearToken(); // must be last to avoid aborting the clear command
        }
        /**
         * Creates fake tallies based on aggregated data returned from the server
         *
         * @param aggregatedData Array containing the data aggregates returned
         * by the server.
         */
        updateTallies(aggregatedData: any[]) {
            var ng = this._ng,
                rfCount = ng.rowFields.length,
                cfCount = ng.columnFields.length,
                vfCount = ng.valueFields.length,
                rowNodes = new _PivotNode(ng.rowFields, 0, null, -1, null);

            aggregatedData.forEach((item, index, arr) => {
                var count = this._getAggregatedFieldCount(item, ng.rowFields),
                    nd = rowNodes.getNode(ng.rowFields, rfCount - count, null, -1, item),
                    rowKey = nd.key,
                    rowKeyId = rowKey.toString(),
                    rowTallies = ng._tallies[rowKeyId];
                if (!rowTallies) {
                    ng._keys[rowKeyId] = rowKey;
                    ng._tallies[rowKeyId] = rowTallies = {};
                }

                count = this._getAggregatedFieldCount(item, ng.columnFields);
                for (var k = 0; k < vfCount; k++) {
                    var colNodes = nd.tree.getNode(ng.columnFields, cfCount - count, ng.valueFields, k, item),
                        colKey = colNodes.key,
                        colKeyId = colKey.toString(),
                        vf = ng.valueFields[k];

                    // because the response data is already aggregated,
                    // the tally must be unique, and the cell values
                    // must be retrieved from the header rather than 
                    // from the binding.
                    var tally = <_ServerTally>rowTallies[colKeyId];
                    if (!tally) {
                        ng._keys[colKeyId] = colKey;
                        tally = rowTallies[colKeyId] = new _ServerTally();
                        tally.add(this._getFieldValue(vf, item, false));
                    } else {
                        assert(false, 'Server tallies have a single value.');
                    }
                }
            });
        }

        // get value based on header rather than value
        private _getFieldValue(vf: PivotField, item: any, formatted?: boolean): any {
            var value = item[vf.key];
            return !formatted || typeof (value) == 'string' // optimization
                ? value
                : Globalize.format(value, vf.format);
        }

        // ** implementation

        // count null properties in an item (to determine subtotal level)
        private _getAggregatedFieldCount(item: any, fields: PivotFieldCollection): number {
            var fieldCount = fields.length,
                count = 0;
            for (var i = 0; i < fieldCount; i++) {
                var field = <PivotField>fields[i];
                if (this._getFieldValue(field, item, false) == null) {
                    count++;
                }
            }
            return count;
        }

        // load an array in chunks
        _loadArray(command: string, arr: any, data?: any) {

            // load the first 100 items by default
            if (!data) {
                data = {};
            }
            if (data.skip == null) {
                data.skip = 0;
            }
            if (data.top == null) {
                data.top = 100;
            }
            var max = isNumber(data.max) ? data.max : 1000000;

            // make the request
            httpRequest(this._getUrl(command), {
                data: data,
                method: data.method || 'GET',
                success: (xhr) => {
                    var result = JSON.parse(xhr.responseText);

                    // add results to the array
                    arr.deferUpdate(() => {
                        result.value.forEach((item) => {
                            arr.push(item);
                        });
                    });

                    // continue loading
                    if (result.value.length == data.top && arr.length < max) {
                        data.skip += data.top;
                        this._loadArray(command, arr, data);
                    }
                },
                error: (xhr) => {
                    this._handleError(command, xhr);
                }
            });
        }

        // gets a URL with a FlexPivotEngine command request
        private _getUrl(command: string, token = this._token, fieldName?: string): string {
            var url = this._ng.itemsSource.toString(),
                pos = url.lastIndexOf('/'),
                urlStart = url.substr(0, pos);
            command = command.toLowerCase();
            switch (command) {
                case 'rawdata':
                case 'detail':
                    return url;
                case 'fields':
                case 'analyses':
                    return url + '/' + command;
                case 'clear':
                    return url + '/analyses/' + token + '/';
                case 'result':
                case 'status':
                    return url + '/analyses/' + token + '/' + command;
                case 'uniquevalues':
                    return url + '/fields/' + fieldName + '/' + command;
            }
            assert(false, 'Unrecognized command');
        }

        // tests whether a string looks like a valid itemsSource url
        private _isValidUrl(url: string): boolean {
            var a = document.createElement('a');
            a.href = asString(url);
            a.href = a.href; // resolve protocol if using partial URLs in IE11
            return a.protocol && a.hostname && a.pathname && // need these
                url[url.length - 1] != '/'; // should end with table name
        }

        // handle result of analysis status
        private _handleResult(result: _IStatus, callBack) {
            switch (result.executingStatus.toLowerCase()) {

                // executing? wait and try again
                case 'executing':
                case 'notset':

                    // enforce timeout
                    if (Date.now() - this._start > _ServerConnection._TIMEOUT) {
                        this._clearToken();
                        console.error('*** Connection timed out after ' + _ServerConnection._TIMEOUT + 'ms...');
                        return;
                    }

                    // progress report
                    this._progress = result.progress;
                    this._ng.onUpdatingView(new ProgressEventArgs(this._progress));

                    // repeat...
                    this._clearTimeout();
                    this._toGetStatus = setTimeout(() => {
                        this._waitUntilComplete(callBack);
                    }, _ServerConnection._POLL_INTERVAL);
                    break;

                // completed? get the data
                case 'completed':
                    this._progress = 100;
                    this._ng.onUpdatingView(new ProgressEventArgs(this._progress));
                    this._getResults(callBack);
                    break;

                // anything else is an error...
                default:
                    assert(false, 'Unexpected result...');
                    break;
            }
        }

        // keep calling the server until the current task is complete,
        // then invoke the given callBack
        private _waitUntilComplete(callBack) {
            this._sendHttpRequest('Status', {
                success: (xhr) => {
                    var result = <_IStatus>JSON.parse(xhr.responseText);
                    this._handleResult(result, callBack);
                },
                error: (xhr) => {
                    this._handleError('Status', xhr);
                }
            });
        }

        // get results when server is ready
        private _getResults(callBack) {
            this._sendHttpRequest('Result', {
                success: (xhr) => {

                    // once the aggregated result is returned,
                    // the analysis is removed as it is useless.
                    this._clearToken();

                    var result = JSON.parse(xhr.responseText);
                    assert(isArray(result), 'Result array Expected.')

                    // parse date/time strings in row and column field collections
                    var dateFields = this._ng.columnFields.filter((item) => {
                                return item.dataType == wijmo.DataType.Date;
                            }).concat(this._ng.rowFields.filter((item) => {
                                return item.dataType == wijmo.DataType.Date;
                            }));
                    if (dateFields.length > 0) {
                        result.forEach((dataItem) => {
                            dateFields.forEach((dateField) => {
                                var bnd = dateField._binding,
                                    value = bnd.getValue(dataItem);
                                if (isString(value)) {
                                    bnd.setValue(dataItem, new Date(value));
                                }
                            });
                        });
                    }

                    // go handle the results
                    asFunction(callBack)(result);
                },
                error: (xhr) => {
                    this._handleError('Result', xhr);
                }
            });
        }

        // raise error event and throw if not handled
        private _handleError(msg: string, xhr: XMLHttpRequest) {
            msg = '** HttpRequest error on command "' + msg + '"';
            if (this._ng.onError(new RequestErrorEventArgs(xhr, msg))) {
                throw msg + '\r\n' +
                    xhr.status + '\r\n' +
                    xhr.statusText;
            }
        }

        // make httpRequest and save the request object so we can cancel it
        private _sendHttpRequest(command: string, settings?: any) {
            var url = this._getUrl(command);
            this._request = httpRequest(url, settings);
        }

        // clear the analysis token
        private _clearToken() {
            if (this._token) {
                this._clearRequest();
                this._clearTimeout();
                this._sendHttpRequest('Clear', {
                    method: 'DELETE'
                });
                this._token = null;
            }
        }

        // abort and clear the http request
        private _clearRequest() {
            if (this._request && this._request.readyState != 4) {
                this._request.abort();
                this._request = null;
            }
        }

        // clear the timer object
        private _clearTimeout() {
            if (this._toGetStatus) {
                clearTimeout(this._toGetStatus);
                this._toGetStatus = null;
            }
        }
    }

    // fake tally to report server aggregates
    class _ServerTally extends _Tally {
        add(value: any, weight?: number) {
            assert(this._cnt == 0, 'Server tallies have a single value.');
            super.add(value, weight);
        }
        getAggregate(aggregate: Aggregate) {
            return this._sum; // server tallies have a single value
        }
    }

    // interface for 'Analyses' command response objects
    interface _IAnalysis {
        token: string;
        status: _IStatus;
        result?: any[];
    }

    // interface for 'Status' commands response objects
    interface _IStatus {
        executingStatus?: string;
        progress?: number;
    }
}
module wijmo.olap {
    'use strict';

    // globalization
    wijmo.culture.olap = wijmo.culture.olap || {};
    wijmo.culture.olap._ListContextMenu = window['wijmo'].culture.olap._ListContextMenu || {
        up: 'Move Up',
        down: 'Move Down',
        first: 'Move to Beginning',
        last: 'Move to End',
        filter: 'Move to Report Filter',
        rows: 'Move to Row Labels',
        cols: 'Move to Column Labels',
        vals: 'Move to Values',
        remove: 'Remove Field',
        edit: 'Field Settings...',
        detail: 'Show Detail...'
    }

    /**
     * Context Menu for @see:ListBox controls containing @see:PivotField objects. 
     */
    export class _ListContextMenu extends input.Menu {
        _full: boolean;

        /**
         * Initializes a new instance of the @see:_ListContextMenu class.
         * 
         * @param full Whether to include all commands or only the ones that apply to the main field list.
         */
        constructor(full: boolean) {

            // initialize the menu
            super(document.createElement('div'), {
                header: 'Field Context Menu',
                displayMemberPath: 'text',
                commandParameterPath: 'parm',
                command: {
                    executeCommand: (parm: string) => {
                        this._execute(parm);
                    },
                    canExecuteCommand: (parm: string) => {
                        return this._canExecute(parm);
                    }
                }
            });

            // finish initializing (after call to super)
            this._full = full;
            this.itemsSource = this._getMenuItems(full)

            // add a class to allow CSS customization
            addClass(this.dropDown, 'context-menu');
        }

        // refresh menu items in case culture changed
        refresh(fullUpdate = true) {
            this.itemsSource = this._getMenuItems(this._full);
            super.refresh(fullUpdate);
        }

        /**
         * Attaches this context menu to a @see:FlexGrid control.
         *
         * @param grid @see:FlexGrid control to attach this menu to.
         */
        attach(grid: grid.FlexGrid) {
            assert(grid instanceof wijmo.grid.FlexGrid, 'Expecting a FlexGrid control...');
            var owner = grid.hostElement;
            owner.addEventListener('contextmenu', (e) => {

                // select the item that was clicked
                if (this._selectField(grid, e)) {

                    // prevent default context menu
                    e.preventDefault();

                    // show the menu
                    this.owner = owner;
                    this.show(e);
                }
            });
        }

        // ** implementation

        // select the field that was clicked before showing the context menu
        _selectField(grid: wijmo.grid.FlexGrid, e: MouseEvent): boolean {

            // check that this is a valid cell
            var ht = grid.hitTest(e);
            if (ht.panel != grid.cells || !ht.range.isValid) {
                return false;
            }

            // no context menu for parent fields
            var fld = grid.rows[ht.row].dataItem;
            if (fld instanceof CubePivotField && fld.subFields && fld.subFields.length) {
                return false;
            }

            // select field and return true to show the menu
            grid.select(ht.range, true);
            return true;
        }

        // get the items used to populate the menu
        _getMenuItems(full: boolean): any[] {
            var items: any[];

            // build list (asterisks represent text that will be localized)
            if (full) {
                items = [
                    { text: '<div class="menu-icon"></div>*', parm: 'up' },
                    { text: '<div class="menu-icon"></div>*', parm: 'down' },
                    { text: '<div class="menu-icon"></div>*', parm: 'first' },
                    { text: '<div class="menu-icon"></div>*', parm: 'last' },
                    { text: '<div class="wj-separator"></div>' },
                    { text: '<div class="menu-icon"><span class="wj-glyph-filter"></span></div>*', parm: 'filter' },
                    { text: '<div class="menu-icon">&#8801;</div>*', parm: 'rows' },
                    { text: '<div class="menu-icon">&#10996;</div>*', parm: 'cols' },
                    { text: '<div class="menu-icon">&#931;</div>*', parm: 'vals' },
                    { text: '<div class="wj-separator"></div>' },
                    { text: '<div class="menu-icon menu-icon-remove">&#10006;</div>*', parm: 'remove' },
                    { text: '<div class="wj-separator"></div>' },
                    { text: '<div class="menu-icon">&#9965;</div>*', parm: 'edit' }
                ];
            } else {
                items = [
                    { text: '<div class="menu-icon"><span class="wj-glyph-filter"></span></div>*', parm: 'filter' },
                    { text: '<div class="menu-icon">&#8801;</div>*', parm: 'rows' },
                    { text: '<div class="menu-icon">&#10996;</div>*', parm: 'cols' },
                    { text: '<div class="menu-icon">&#931;</div>*', parm: 'vals' },
                    { text: '<div class="wj-separator"></div>' },
                    { text: '<div class="menu-icon">&#9965;</div>*', parm: 'edit' }
                ];
            }

            // localize items
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.parm) {
                    var text = culture.olap._ListContextMenu[item.parm];
                    assert(text, 'missing localized text for item ' + item.parm);
                    item.text = item.text.replace(/([^>]+$)/, text);
                }
            }

            // return localized items
            return items;
        }

        // execute the menu commands
        _execute(parm) {
            var grid = <grid.FlexGrid>Control.getControl(this.owner),
                flds = grid.itemsSource,
                row = grid.selection.row,
                fld = <PivotField>grid.rows[row].dataItem,
                ng = fld ? fld.engine : null,
                target = this._getTargetList(ng, parm);

            switch (parm) {

                // move field within the list
                case 'up':
                case 'first':
                case 'down':
                case 'last':
                    if (ng) {
                        var index = flds.indexOf(fld),
                            newIndex =
                                parm == 'up' ? index - 1 :
                                parm == 'first' ? 0 :
                                parm == 'down' ? index + 1 :
                                parm == 'last' ? flds.length :
                                -1;
                        ng.deferUpdate(() => {
                            flds.removeAt(index);
                            flds.insert(newIndex, fld);
                        });
                    }
                    break;

                // move/copy field to a different list
                case 'filter':
                case 'rows':
                case 'cols':
                case 'vals':
                    if (target && fld) {
                        target.push(fld);
                    }
                    break;

                // remove this field from the list
                case 'remove':
                    if (fld) {
                        ng.removeField(fld);
                    }
                    break;

                // edit this field's settings
                case 'edit':
                    if (fld) {
                        ng.editField(fld);
                    }
                    break;
            }
        }
        _canExecute(parm): boolean {
            var grid = <grid.FlexGrid>Control.getControl(this.owner),
                row = grid.selection.row,
                fld = <PivotField>grid.rows[row].dataItem,
                ng = fld ? fld.engine : null,
                target = this._getTargetList(ng, parm);

            // check whether the command can be executed in the current context
            switch (parm) {

                // disable moving first item up/first
                case 'up':
                case 'first':
                    return row > 0;

                // disable moving last item down/last
                case 'down':
                case 'last':
                    return row < grid.rows.length - 1;

                // disable moving to lists that contain the target
                case 'filter':
                case 'rows':
                case 'cols':
                case 'vals':
                    return target && target.indexOf(fld) < 0;

                // edit fields only if the engine allows it
                case 'edit':
                    return ng && ng.allowFieldEditing;

                // cubes don't show details...
                case 'detail':
                    return fld && !(fld instanceof CubePivotField);
            }

            // all else is OK
            return true;
        }

        // get target list for a command
        _getTargetList(engine: PivotEngine, parm: string) {
            if (engine) {
                switch (parm) {
                    case 'filter':
                        return engine.filterFields;
                    case 'rows':
                        return engine.rowFields;
                    case 'cols':
                        return engine.columnFields;
                    case 'vals':
                        return engine.valueFields;
                }
            }
            return null;
        }
    }
}
module wijmo.olap {
    'use strict';

    // globalization
    wijmo.culture.olap = wijmo.culture.olap || {};
    wijmo.culture.olap.PivotPanel = window['wijmo'].culture.olap.PivotPanel || {
        fields: 'Choose fields to add to report:',
        drag: 'Drag fields between areas below:',
        filters: 'Filters',
        cols: 'Columns',
        rows: 'Rows',
        vals: 'Values',
        defer: 'Defer Updates',
        update: 'Update'
    };

    /**
     * Provides a user interface for interactively transforming regular data tables into Olap
     * pivot tables.
     *
     * Olap pivot tables group data into one or more dimensions. The dimensions are represented
     * by rows and columns on a grid, and the summarized data is stored in the grid cells.
     *
     * Use the @see:itemsSource property to set the source data, and the @see:pivotView
     * property to get the output table containing the summarized data.
     */
    export class PivotPanel extends Control {

        // pivot engine driven by this panel
        private _ng: PivotEngine;

        // child elements
        private _dFields: HTMLElement;
        private _dFilters: HTMLElement;
        private _dRows: HTMLElement;
        private _dCols: HTMLElement;
        private _dVals: HTMLElement;
        private _dMarker: HTMLElement;
        private _dProgress: HTMLElement;
        private _chkDefer: HTMLInputElement;
        private _btnUpdate: HTMLElement;

        // grids with field lists
        private _lbFields: wijmo.grid.FlexGrid;
        private _lbFilters: wijmo.grid.FlexGrid;
        private _lbRows: wijmo.grid.FlexGrid;
        private _lbCols: wijmo.grid.FlexGrid;
        private _lbVals: wijmo.grid.FlexGrid;

        // globalizable elements
        private _gFlds: HTMLElement;
        private _gDrag: HTMLElement;
        private _gFlt: HTMLElement;
        private _gCols: HTMLElement;
        private _gRows: HTMLElement;
        private _gVals: HTMLElement;
        private _gDefer: HTMLElement;

        // context menus
        _ctxMenuShort: _ListContextMenu;
        _ctxMenuFull: _ListContextMenu;

        // drag/drop stuff
        private _dragSource: HTMLElement;
        private _dragField: PivotField;
        private _dropIndex: number;

        /**
         * Gets or sets the template used to instantiate @see:PivotPanel controls.
         */
        static controlTemplate = '<div>' +

          // fields
          '<label wj-part="g-flds"></label>' +
          '<div wj-part="d-fields"></div>' +

          // drag/drop area
          '<label wj-part="g-drag"></label>' +
          '<table>' +
            '<tr>' +
              '<td width="50%">' +
                '<label><span class="wj-glyph wj-glyph-filter"></span> <span wj-part="g-flt"></span></label>' +
                '<div wj-part="d-filters"></div>' +
              '</td>' +
              '<td width= "50%" style= "border-left-style:solid">' +
                '<label><span class="wj-glyph">&#10996;</span> <span wj-part="g-cols"></span></label>' +
                '<div wj-part="d-cols"></div>' +
              '</td>' +
            '</tr>' +
            '<tr style= "border-top-style:solid">' +
              '<td width="50%">' +
                '<label><span class="wj-glyph">&#8801;</span> <span wj-part="g-rows"></span></label>' +
                '<div wj-part="d-rows"></div>' +
              '</td>' +
              '<td width= "50%" style= "border-left-style:solid">' +
                '<label><span class="wj-glyph">&#931;</span> <span wj-part="g-vals"></span></label>' +
                '<div wj-part="d-vals"></div>' +
              '</td>' +
            '</tr>' +
          '</table>' +

          // progress indicator
          '<div wj-part="d-prog" class="wj-state-selected" style="width:0px;height:3px"></div>' +

          // update panel
          '<div style="display:table">' +
            '<label style="display:table-cell;vertical-align:middle">' +
              '<input wj-part="chk-defer" type="checkbox"/> <span wj-part="g-defer"></span>' +
            '</label>' +
            '<a wj-part="btn-update" href="" draggable="false" disabled class="wj-state-disabled"></a>' +
          '</div>' +
        '</div>';

        /**
         * Initializes a new instance of the @see:PivotPanel class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element, null, true);

            // check dependencies
            var depErr = 'Missing dependency: PivotPanel requires ';
            assert(input != null, depErr + 'wijmo.input.');
            assert(grid != null && grid.filter != null, depErr + 'wijmo.grid.filter.');

            // instantiate and apply template
            var tpl = this.getTemplate();
            this.applyTemplate('wj-control wj-content wj-pivotpanel', tpl, {
                _dFields: 'd-fields',
                _dFilters: 'd-filters',
                _dRows: 'd-rows',
                _dCols: 'd-cols',
                _dVals: 'd-vals',
                _dProgress: 'd-prog',
                _btnUpdate: 'btn-update',
                _chkDefer: 'chk-defer',
                _gFlds: 'g-flds',
                _gDrag: 'g-drag',
                _gFlt: 'g-flt',
                _gCols: 'g-cols',
                _gRows: 'g-rows',
                _gVals: 'g-vals',
                _gDefer: 'g-defer'
            });

            // globalization
            this._globalize();

            // enable drag/drop
            var host = this.hostElement;
            this.addEventListener(host, 'dragstart', this._dragstart.bind(this));
            this.addEventListener(host, 'dragover', this._dragover.bind(this));
            this.addEventListener(host, 'dragleave', this._dragover.bind(this));
            this.addEventListener(host, 'drop', this._drop.bind(this));
            this.addEventListener(host, 'dragend', this._dragend.bind(this));

            // create child controls
            this._lbFields = this._createFieldGrid(this._dFields);
            this._lbFilters = this._createFieldGrid(this._dFilters);
            this._lbRows = this._createFieldGrid(this._dRows);
            this._lbCols = this._createFieldGrid(this._dCols);
            this._lbVals = this._createFieldGrid(this._dVals);

            // add context menus to the controls
            var ctx = this._ctxMenuShort = new _ListContextMenu(false);
            ctx.attach(this._lbFields);
            ctx = this._ctxMenuFull = new _ListContextMenu(true);
            ctx.attach(this._lbFilters);
            ctx.attach(this._lbRows);
            ctx.attach(this._lbCols);
            ctx.attach(this._lbVals);

            // create target indicator element
            this._dMarker = createElement('<div class="wj-marker" style="display:none">&nbsp;</div>');
            this.hostElement.appendChild(this._dMarker);

            // handle defer update/update buttons
            this.addEventListener(this._btnUpdate, 'click',(e) => {
                this._ng.refresh(true);
                e.preventDefault();
            });
            this.addEventListener(this._chkDefer, 'click', (e) => {
                enable(this._btnUpdate, this._chkDefer.checked);
                if (this._chkDefer.checked) {
                    this._ng.beginUpdate();
                } else {
                    this._ng.endUpdate();
                }
            });

            // create default engine
            this.engine = new PivotEngine();

            // apply options
            this.initialize(options);
        }

        // ** object model

        /**
         * Gets or sets the @see:PivotEngine being controlled by this @see:PivotPanel.
         */
        get engine(): PivotEngine {
            return this._ng;
        }
        set engine(value: PivotEngine) {

            // remove old handlers
            if (this._ng) {
                this._ng.itemsSourceChanged.removeHandler(this._itemsSourceChanged);
                this._ng.viewDefinitionChanged.removeHandler(this._viewDefinitionChanged);
                this._ng.updatingView.removeHandler(this._updatingView);
                this._ng.updatedView.removeHandler(this._updatedView);
            }

            // save the new value
            value = asType(value, PivotEngine, false);
            this._ng = value;

            // add new handlers
            this._ng.itemsSourceChanged.addHandler(this._itemsSourceChanged, this);
            this._ng.viewDefinitionChanged.addHandler(this._viewDefinitionChanged, this);
            this._ng.updatingView.addHandler(this._updatingView, this);
            this._ng.updatedView.addHandler(this._updatedView, this);

            // update grid data sources
            this._lbFields.itemsSource = value.fields;
            this._lbFilters.itemsSource = value.filterFields;
            this._lbRows.itemsSource = value.rowFields;
            this._lbCols.itemsSource = value.columnFields;
            this._lbVals.itemsSource = value.valueFields;

            // hide field copies in fields list
            this._lbFields.collectionView.filter = (item: PivotField): boolean => {
                return item.parentField == null;
            }
        }
        /**
         * Gets or sets the array or @see:ICollectionView that contains the raw data.
         */
        get itemsSource(): any {
            return this._ng.itemsSource;
        }
        set itemsSource(value: any) {
            this._ng.itemsSource = value;
        }
        /**
         * Gets the @see:ICollectionView that contains the raw data.
         */
        get collectionView(): collections.ICollectionView {
            return this._ng.collectionView;
        }
        /**
         * Gets the @see:ICollectionView containing the output pivot view.
         */
        get pivotView(): collections.ICollectionView {
            return this._ng.pivotView;
        }
        /**
         * Gets or sets a value that determines whether the engine should populate
         * the @see:fields collection automatically based on the @see:itemsSource.
         */
        get autoGenerateFields(): boolean {
            return this.engine.autoGenerateFields;
        }
        set autoGenerateFields(value: boolean) {
            this._ng.autoGenerateFields = value;
        }
        /**
         * Gets the list of fields available for building views.
         */
        get fields(): PivotFieldCollection {
            return this._ng.fields;
        }
        /**
         * Gets the list of fields that define the rows in the output table.
         */
        get rowFields(): PivotFieldCollection {
            return this._ng.rowFields;
        }
        /**
         * Gets the list of fields that define the columns in the output table.
         */
        get columnFields(): PivotFieldCollection {
            return this._ng.columnFields;
        }
        /**
         * Gets the list of fields that define the values shown in the output table.
         */
        get valueFields(): PivotFieldCollection {
            return this._ng.valueFields;
        }
        /**
         * Gets the list of fields that define filters applied while generating the output table.
         */
        get filterFields(): PivotFieldCollection {
            return this._ng.filterFields;
        }
        /**
         * Gets or sets the current pivot view definition as a JSON string.
         *
         * This property is typically used to persist the current view as 
         * an application setting.
         *
         * For example, the code below implements two functions that save
         * and load view definitions using local storage:
         *
         * <pre>// save/load views
         * function saveView() {
         *   localStorage.viewDefinition = pivotPanel.viewDefinition;
         * }
         * function loadView() {
         *   pivotPanel.viewDefinition = localStorage.viewDefinition;
         * }</pre>
         */
        get viewDefinition(): string {
            return this._ng.viewDefinition;
        }
        set viewDefinition(value: string) {
            this._ng.viewDefinition = value;
        }
        /**
         * Gets a value that determines whether a pivot view is currently defined.
         *
         * A pivot view is defined if the @see:valueFields list is not empty and 
         * either the @see:rowFields or @see:columnFields lists are not empty.
         */
        get isViewDefined(): boolean {
            return this._ng.isViewDefined;
        }

        /**
         * Occurs after the value of the @see:itemsSource property changes.
         */
        itemsSourceChanged = new Event();
        /**
         * Raises the @see:itemsSourceChanged event.
         */
        onItemsSourceChanged(e?: EventArgs) {
            this.itemsSourceChanged.raise(this, e);
        }
        /**
         * Occurs after the view definition changes.
         */
        viewDefinitionChanged = new Event();
        /**
         * Raises the @see:viewDefinitionChanged event.
         */
        onViewDefinitionChanged(e?: EventArgs) {
            this.viewDefinitionChanged.raise(this, e);
        }
        /**
         * Occurs when the engine starts updating the @see:pivotView list.
         */
        updatingView = new Event();
        /**
         * Raises the @see:updatingView event.
         * 
         * @param e @see:ProgressEventArgs that provides the event data.
         */
        onUpdatingView(e: ProgressEventArgs) {
            this.updatingView.raise(this, e);
        }
        /**
         * Occurs after the engine has finished updating the @see:pivotView list.
         */
        updatedView = new Event();
        /**
         * Raises the @see:updatedView event.
         */
        onUpdatedView(e?: EventArgs) {
            this.updatedView.raise(this, e);
        }

        // ** overrides

        // refresh field lists and culture strings when refreshing the control
        refresh(fullUpdate = true) {
            this._lbFields.refresh();
            this._lbFilters.refresh();
            this._lbRows.refresh();
            this._lbCols.refresh();
            this._lbVals.refresh();
            if (fullUpdate) {
                this._globalize();
                this._ctxMenuShort.refresh();
                this._ctxMenuFull.refresh();
            }
            super.refresh(fullUpdate);
        }

        // ** implementation

        // method used in JSON-style initialization
        _copy(key: string, value: any): boolean {
            switch (key) {
                case 'engine':
                    this.engine = value;
                    return true;
            }
            return false;
        }

        // apply/refresh culture-specific strings
        _globalize() {
            var g = wijmo.culture.olap.PivotPanel;
            this._gFlds.textContent = g.fields;
            this._gDrag.textContent = g.drag;
            this._gFlt.textContent = g.filters;
            this._gCols.textContent = g.cols;
            this._gRows.textContent = g.rows;
            this._gVals.textContent = g.vals;
            this._gDefer.textContent = g.defer;
            this._btnUpdate.textContent = g.update;
        }

        // handle and forward events raised by the engine
        _itemsSourceChanged(s: PivotEngine, e?: EventArgs) {
            this.onItemsSourceChanged(e);
        }
        _viewDefinitionChanged(s: PivotEngine, e?: EventArgs) {
            if (!s.isUpdating) {
                this.invalidate();
                this.onViewDefinitionChanged(e);
            }
        }
        _updatingView(s: PivotEngine, e: ProgressEventArgs) {
            var pct = clamp(e.progress, 5, 100) % 100; // start from 5, done at 100
            this._dProgress.style.width = pct + '%';
            this.onUpdatingView(e);
        }
        _updatedView(s: PivotEngine, e?: EventArgs) {
            this.onUpdatedView(e);
        }

        // create a FlexGrid for showing olap fields (draggable)
        _createFieldGrid(host: HTMLElement): wijmo.grid.FlexGrid {

            // create the FlexGrid
            var grid = new wijmo.grid.FlexGrid(host, {
                autoGenerateColumns: false,
                childItemsPath: 'subFields',
                columns: [
                    { binding: 'header', width: '*' }
                ],
                headersVisibility: 'None',
                selectionMode: 'Cell',
                showAlternatingRows: false
            });

            // we don't need horizontal scrollbars
            var root = <HTMLElement>host.querySelector('[wj-part=root]');
            root.style.overflowX = 'hidden';

            // make items draggable, show active/filter/aggregate indicators
            grid.formatItem.addHandler((s, e: grid.FormatItemEventArgs) => {

                // get data item
                var fld = <PivotField>s.rows[e.row].dataItem;
                assert(fld instanceof PivotField, 'PivotField expected...');

                // special formatting/dragging behavior for header fields
                var isHeader= fld instanceof CubePivotField &&
                    fld.subFields != null &&
                    fld.subFields.length > 0;
                toggleClass(e.cell, 'wj-header', isHeader);
                e.cell.setAttribute('draggable', (!isHeader).toString());

                // customize content
                var html = e.cell.innerHTML;

                // show filter indicator
                if (fld.filter.isActive) {
                    html += '&nbsp;&nbsp;<span class="wj-glyph-filter"></span>';
                }

                // show aggregate type in value field list
                if (s == this._lbVals) {
                    // no localization here, the names are too long...
                    //var aggs = wijmo.culture.olap.PivotFieldEditor.aggs,
                    //    aggName = aggs[Object.keys(aggs)[fld.aggregate]];
                    html += ' <span class="wj-aggregate">(' + Aggregate[fld.aggregate] + ')</span>';
                }

                // add checkbox to items in the main field list
                if (s == this._lbFields && !isHeader) {
                    html = '<label><input type="checkbox"' +
                        (fld.isActive ? ' checked' : '') +
                        '> ' + html + '</label>';
                }

                // update cell content
                e.cell.innerHTML = html;
            });

            // handle checkboxes
            grid.addEventListener(host, 'click', (e) => {
                var check = e.target;
                if (check instanceof HTMLInputElement && check.type == 'checkbox') {

                    // original code: it can fail in IE because the click event sends
                    // wrong coordinates when the click is on the label (not on the checkbox)
                    // (TFS 247212)
                    //var fld = this._hitTestField(grid, e);

                    // this would be a possible alternative, but doesn't work in cube
                    // child nodes...
                    //var fld = grid.collectionView.currentItem;

                    // this is a little more verbose, but safest
                    var sel = grid.selection,
                        fld = sel && sel.row > -1 ? grid.rows[sel.row].dataItem : null;
                    if (fld instanceof PivotField) {
                        fld.isActive = check.checked;
                    }
                }
            });

            // return the FlexGrid
            return grid;
        }

        // drag/drop event handlers
        _dragstart(e: DragEvent) {
            var target = this._getFlexGridTarget(e);
            if (target) {

                // select field under the mouse, save drag source
                this._dragField = this._hitTestField(target, e);
                this._dragSource = this._dragField instanceof PivotField
                    ? target.hostElement
                    : null;

                // start drag operation
                if (this._dragSource && e.dataTransfer) {
                    _startDrag(e.dataTransfer, 'copyMove');
                    e.stopPropagation();
                }
            }
        }
        _dragover(e: DragEvent) {

            // check whether the move is valid
            var valid = false;

            // get target location
            var target = this._getFlexGridTarget(e);
            if (target && this._dragField) {

                // dragging from main list to view (valid if the target does not contain the item)
                if (this._dragSource == this._dFields && target != this._lbFields) {

                    // check that the target is not full
                    var list = target.itemsSource;
                    if (list.maxItems == null || list.length < list.maxItems) {

                        // check that the target does not contain the item (or is the values list)
                        var fld = this._dragField;
                        if (target.itemsSource.indexOf(fld) < 0) {
                            valid = true;
                        } else if (target == this._lbVals) {
                            valid = fld instanceof CubePivotField ? false : true;
                        }
                    }
                }

                // dragging view to main list (to delete the field) or within view lists
                if (this._dragSource && this._dragSource != this._dFields) {
                    valid = true;
                }
            }

            // update marker and drop effect
            if (valid) {
                this._updateDropMarker(target, e);
                e.dataTransfer.dropEffect = this._dragSource == this._dFields ? 'copy' : 'move';
                e.preventDefault();
                e.stopPropagation();
            } else {
                this._updateDropMarker();
            }
        }
        _drop(e: DragEvent) {

            // perform drop operation
            var target = this._getFlexGridTarget(e);
            if (target && this._dragField) {
                var source = <wijmo.grid.FlexGrid>Control.getControl(this._dragSource),
                    fld = this._dragField;

                // if dragging a duplicate from main list to value list, 
                // make a clone, add it do the main list, and continue as usual
                if (source == this._lbFields && target == this._lbVals) {
                    if (target.itemsSource.indexOf(fld) > -1) {
                        fld = fld._clone();
                        this.engine.fields.push(fld);
                    }
                }

                // if the target is the main list, remove from source
                // otherwise, add to or re-position field in target list
                if (target == this._lbFields) {
                    fld.isActive = false;
                } else {
                    this._ng.deferUpdate(() => {
                        var items = <collections.ObservableArray>target.itemsSource,
                            index = items.indexOf(fld);
                        if (index != this._dropIndex) {
                            if (index > -1) {
                                items.removeAt(index);
                                if (index < this._dropIndex) {
                                    this._dropIndex--;
                                }
                            }
                            items.insert(this._dropIndex, fld);
                        }
                    });
                }
            }

            // always reset the mouse state when done
            this._resetMouseState();
        }
        _dragend(e: DragEvent) {
            this._resetMouseState();
        }

        // select and return the field at the given mouse position
        _hitTestField(grid: wijmo.grid.FlexGrid, e: MouseEvent): PivotField {
            var ht = grid.hitTest(e);
            if (ht.panel == grid.cells && ht.range.isValid) {
                grid.select(ht.range, true);
                return <PivotField>grid.rows[ht.row].dataItem;
            }
            return null;
        }

        // reset the mouse state after a drag operation
        _resetMouseState() {
            this._dragSource = null;
            this._updateDropMarker();
        }

        // gets the FlexGrid that contains the target of a drag event
        _getFlexGridTarget(e: DragEvent): wijmo.grid.FlexGrid {
            var grid = <wijmo.grid.FlexGrid>Control.getControl(closest(e.target, '.wj-flexgrid'));
            return grid instanceof wijmo.grid.FlexGrid
                ? grid
                : null;
        }

        // show the drop marker
        _updateDropMarker(grid?: wijmo.grid.FlexGrid, e?: DragEvent) {

            // hide marker
            if (!e) {
                this._dMarker.style.display = 'none';
                return;
            }

            // get target rect and drop index
            var rc;
            if (!grid.rows.length) {

                // grid is empty, drop at index 0
                rc = Rect.fromBoundingRect(grid.hostElement.getBoundingClientRect());
                rc.top += 4;
                this._dropIndex = 0;

            } else {
                var ht = grid.hitTest(e),
                    row = ht.row;
                if (row > -1) {

                    // dropping before or after a row
                    rc = grid.getCellBoundingRect(row, 0);
                    if (ht.point.y > rc.top + rc.height / 2) {
                        rc.top += rc.height;
                        row++;
                    }
                    this._dropIndex = row;

                } else {

                    // dropping after the last row
                    row = grid.viewRange.bottomRow;
                    rc = grid.getCellBoundingRect(row, 0);
                    rc.top += rc.height;
                    this._dropIndex = row + 1;
                }
            }

            // show the drop marker
            var rcHost = this.hostElement.getBoundingClientRect();
            setCss(this._dMarker, {
                left: Math.round(rc.left - rcHost.left),
                top: Math.round(rc.top - rcHost.top - 2),
                width: Math.round(rc.width),
                height: 4,
                display: ''
            });
        }
    }
}
module wijmo.olap {
    'use strict';

    /**
     * Context Menu for @see:PivotGrid controls. 
     */
    export class _GridContextMenu extends input.Menu {
        private _targetField: PivotField;
        private _htDown: wijmo.grid.HitTestInfo;

        /**
         * Initializes a new instance of the @see:_GridContextMenu class.
         */
        constructor() {

            // initialize the menu
            super(document.createElement('div'), {
                header: 'PivotGrid Context Menu',
                displayMemberPath: 'text',
                commandParameterPath: 'parm',
                command: {
                    executeCommand: (parm: string) => {
                        this._execute(parm);
                    },
                    canExecuteCommand: (parm: string) => {
                        return this._canExecute(parm);
                    }
                }
            });

            // finish initializing (after call to super)
            this.itemsSource = this._getMenuItems();

            // add a class to allow CSS customization
            addClass(this.dropDown, 'context-menu');
        }

        // refresh menu items in case culture changed
        refresh(fullUpdate = true) {
            this.itemsSource = this._getMenuItems();
            super.refresh(fullUpdate);
        }

        /**
         * Attaches this context menu to a @see:PivotGrid control.
         *
         * @param grid @see:PivotGrid to attach this menu to.
         */
        attach(grid: PivotGrid) {
            assert(grid instanceof PivotGrid, 'Expecting a PivotGrid control...');
            var owner = grid.hostElement;
            owner.addEventListener('contextmenu',(e) => {
                if (grid.customContextMenu) {

                    // prevent default context menu
                    e.preventDefault();

                    // select the item that was clicked
                    this.owner = owner;
                    if (this._selectField(e)) {

                        // show the context menu
                        var dropDown = this.dropDown;
                        this.selectedIndex = -1;
                        if (this.onIsDroppedDownChanging(new CancelEventArgs())) {
                            showPopup(dropDown, e);
                            this.onIsDroppedDownChanged();
                            dropDown.focus();
                        }
                    }
                }
            });
        }

        // ** implementation

        // select the item that was clicked before showing the context menu
        _selectField(e: MouseEvent): boolean {

            // assume we have no target field
            this._targetField = null;
            this._htDown = null;

            // find target field based on hit-testing
            var g = <PivotGrid>Control.getControl(this.owner),
                ng = g.engine,
                ht = g.hitTest(e);
            switch (ht.cellType) {
                case wijmo.grid.CellType.Cell:
                    g.select(ht.range);
                    this._targetField = ng.valueFields[ht.col % ng.valueFields.length];
                    this._htDown = ht;
                    break;
                case wijmo.grid.CellType.ColumnHeader:
                    this._targetField = ng.columnFields[ht.row];
                    break;
                case wijmo.grid.CellType.RowHeader:
                    this._targetField = ng.rowFields[ht.col];
                    break;
                case wijmo.grid.CellType.TopLeft:
                    if (ht.row == ht.panel.rows.length - 1) {
                        this._targetField = ng.rowFields[ht.col];
                    }
                    break;
            }

            // show the menu if we have a field
            return this._targetField != null;
        }

        // get the items used to populate the menu
        _getMenuItems(): any[] {

            // get items
            var items: any = [
                { text: '<div class="menu-icon menu-icon-remove">&#10006;</div>Remove Field', parm: 'remove' },
                { text: '<div class="menu-icon">&#9965;</div>Field Settings...', parm: 'edit' },
                { text: '<div class="wj-separator"></div>' },
                { text: '<div class="menu-icon">&#8981;</div>Show Detail...', parm: 'detail' }
            ];

            // localize items
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.parm) {
                    var text = culture.olap._ListContextMenu[item.parm];
                    assert(text, 'missing localized text for item ' + item.parm);
                    item.text = item.text.replace(/([^>]+$)/, text);
                }
            }

            // return localized items
            return items;
        }

        // execute the menu commands
        _execute(parm) {
            var g = <PivotGrid>Control.getControl(this.owner),
                fld = this._targetField,
                ht = this._htDown;
            switch (parm) {
                case 'remove':
                    g.engine.removeField(fld);
                    break;
                case 'edit':
                    g.engine.editField(fld);
                    break;
                case 'detail':
                    g.showDetail(ht.row, ht.col);
                    break;
            }
        }
        _canExecute(parm): boolean {
            var g = <PivotGrid>Control.getControl(this.owner),
                ng = g.engine,
                fld = this._targetField;

            // check whether the command can be executed in the current context
            switch (parm) {
                case 'remove':
                    return fld != null;
                case 'edit':
                    return fld != null && g.engine.allowFieldEditing;
                case 'detail':
                    return this._htDown != null &&
                        fld != null && !(fld instanceof CubePivotField);
            }

            // all else is OK
            return true;
        }
    }
}
module wijmo.olap {
    'use strict';

    /**
     * Provides custom merging for @see:PivotGrid controls.
     */
    export class _PivotMergeManager extends grid.MergeManager {
        private _ng: PivotEngine;

        /**
         * Gets a @see:CellRange that specifies the merged extent of a cell
         * in a @see:GridPanel.
         *
         * @param p The @see:GridPanel that contains the range.
         * @param r The index of the row that contains the cell.
         * @param c The index of the column that contains the cell.
         * @param clip Whether to clip the merged range to the grid's current view range.
         * @return A @see:CellRange that specifies the merged range, or null if the cell is not merged.
         */
        getMergedRange(p: grid.GridPanel, r: number, c: number, clip = true): grid.CellRange {

            // get the engine from the grid
            var view = p.grid.collectionView;
            this._ng = view instanceof PivotCollectionView
                ? (<PivotCollectionView>view).engine
                : null;

            // not connected? use default implementation
            if (!this._ng) {
                return super.getMergedRange(p, r, c, clip);
            }

            // merge row and column headers
            switch (p.cellType) {
                case grid.CellType.TopLeft:
                    return this._getMergedTopLeftRange(p, r, c);
                case grid.CellType.RowHeader:
                    var rng = clip ? p.viewRange : null;
                    return this._getMergedRowHeaderRange(p, r, c, rng);
                case grid.CellType.ColumnHeader:
                    var rng = clip ? p.viewRange : null;
                    return this._getMergedColumnHeaderRange(p, r, c, rng);
            }

            // not merged
            return null;
        }

        // get merged top/left cells
        _getMergedTopLeftRange(p: grid.GridPanel, r: number, c: number): grid.CellRange {

            // start with a single cell
            var rng = new grid.CellRange(r, c);

            // expand left until we get a non-empty cell
            while (rng.col > 0 && !p.getCellData(r, rng.col, true)) {
                rng.col--;
            }

            // expand right to include empty cells
            while (rng.col2 < p.columns.length - 1 && !p.getCellData(r, rng.col2 + 1, true)) {
                rng.col2++;
            }

            // done
            return rng;
        }

        // get merged row header cells
        _getMergedRowHeaderRange(p: grid.GridPanel, r: number, c: number, rng: grid.CellRange): grid.CellRange {
            var val = p.getCellData(r, c, false);

            // expand range left and right (totals)
            var rowLevel = this._ng._getRowLevel(r);
            if (rowLevel > -1 && c >= rowLevel) {
                var c1: number,
                    c2: number,
                    cMin = rng ? rng.col : 0,
                    cMax = rng ? rng.col2 : p.columns.length - 1;
                for (c1 = c; c1 > cMin; c1--) {
                    if (p.getCellData(r, c1 - 1, false) != val) {
                        break;
                    }
                }
                for (c2 = c; c2 < cMax; c2++) {
                    if (p.getCellData(r, c2 + 1, false) != val) {
                        break;
                    }
                }
                return c1 != c2
                    ? new grid.CellRange(r, c1, r, c2) // merged columns
                    : null; // not merged
            }

            // expand range up and down
            var r1: number,
                r2: number,
                rMin = rng ? rng.row : 0,
                rMax = rng ? rng.row2 : p.rows.length - 1;
            for (r1 = r; r1 > rMin; r1--) {
                if (!this._sameColumnValues(p, r, r1 - 1, c)) {
                    break;
                }
            }
            for (r2 = r; r2 < rMax; r2++) {
                if (!this._sameColumnValues(p, r, r2 + 1, c)) {
                    break;
                }
            }
            if (r1 != r2) { // merged rows
                return new grid.CellRange(r1, c, r2, c);
            }

            // not merged
            return null;
        }

        // compare column values to perform restricted merging (TFS 257125)
        _sameColumnValues(p: grid.GridPanel, r1: number, r2: number, c: number): boolean {
            for (; c >= 0; c--) {
                var v1 = p.getCellData(r1, c, false);
                var v2 = p.getCellData(r2, c, false);
                if (v1 != v2) {
                    return false;
                }
            }
            return true;
        }

        // get merged column header cells
        _getMergedColumnHeaderRange(p: grid.GridPanel, r: number, c: number, rng: grid.CellRange): grid.CellRange {
            var key = this._ng._getKey(p.columns[c].binding),
                val = p.getCellData(r, c, false);

            // expand range up and down (totals)
            var colLevel = this._ng._getColLevel(key);
            if (colLevel > -1 && r >= colLevel) {
                var r1: number,
                    r2: number,
                    rMin = rng ? rng.row : 0,
                    rMax = rng ? rng.row2 : p.rows.length - 1;
                for (r1 = r; r1 > rMin; r1--) {
                    if (p.getCellData(r1 - 1, c, false) != val) {
                        break;
                    }
                }
                for (r2 = r; r2 < rMax; r2++) {
                    if (p.getCellData(r2 + 1, c, false) != val) {
                        break;
                    }
                }
                if (r1 != r2) { // merged rows
                    return new grid.CellRange(r1, c, r2, c);
                }
                // fall through to allow merging subtotals over multiple value fields
                //return r1 != r2 ? new grid.CellRange(r1, c, r2, c) : null;
            }

            // expand range left and right
            var c1: number,
                c2: number,
                cMin = rng ? rng.col : 0,
                cMax = rng ? rng.col2 : p.columns.length - 1;
            for (c1 = c; c1 > cMin; c1--) {
                if (!this._sameRowValues(p, r, c, c1 - 1)) {
                    break;
                }
            }
            for (c2 = c; c2 < cMax; c2++) {
                if (!this._sameRowValues(p, r, c, c2 + 1)) {
                    break;
                }
            }
            if (c1 != c2) { // merged columns
                return new grid.CellRange(r, c1, r, c2);
            }

            // not merged
            return null;
        }

        // compare row values to perform restricted merging (TFS 257125)
        _sameRowValues(p: grid.GridPanel, r: number, c1: number, c2: number): boolean {
            for (; r >= 0; r--) {
                var v1 = p.getCellData(r, c1, false);
                var v2 = p.getCellData(r, c2, false);
                if (v1 != v2) {
                    return false;
                }
            }
            return true;
        }
    }
}
module wijmo.olap {
    'use strict';

    /**
     * Extends the @see:FlexGrid control to display pivot tables.
     *
     * To use this control, set its @see:itemsSource property to an instance of a 
     * @see:PivotPanel control or to a @see:PivotEngine.
     */
    export class PivotGrid extends grid.FlexGrid {
        private _ng: PivotEngine;
        private _htDown: grid.HitTestInfo;
        private _showDetailOnDoubleClick = true;
        private _collapsibleSubtotals = true;
        private _customCtxMenu = true;
        private _ctxMenu: _GridContextMenu;
        private _showRowFldSort = false;
        private _showRowFldHdrs = true;
        private _showColFldHdrs = true;
        private _centerVert = true;
        private _docRange: Range;

        static _WJA_COLLAPSE = 'wj-pivot-collapse';

        /**
         * Initializes a new instance of the @see:PivotGrid class.
         *
         * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);

            // add class name to enable styling
            addClass(this.hostElement, 'wj-pivotgrid');

            // change some defaults
            this.isReadOnly = true;
            this.deferResizing = true;
            this.showAlternatingRows = false;
            this.autoGenerateColumns = false;
            this.allowDragging = grid.AllowDragging.None;
            this.mergeManager = new _PivotMergeManager(this);
            this.customContextMenu = true;

            // apply options
            this.initialize(options);

            // customize cell rendering
            this.formatItem.addHandler(this._formatItem, this);

            // customize mouse handling
            this.addEventListener(this.hostElement, 'mousedown', this._mousedown.bind(this), true);
            this.addEventListener(this.hostElement, 'mouseup', this._mouseup.bind(this), true);
            this.addEventListener(this.hostElement, 'dblclick', this._dblclick.bind(this), true);

            // custom context menu
            this._ctxMenu = new _GridContextMenu();
            this._ctxMenu.attach(this);
        }

        /**
         * Gets a reference to the @see:PivotEngine that owns this @see:PivotGrid.
         */
        get engine(): PivotEngine {
            return this._ng;
        }
        /**
         * Gets or sets a value that determines whether the grid should show a popup containing
         * the detail records when the user double-clicks a cell.
         */
        get showDetailOnDoubleClick(): boolean {
            return this._showDetailOnDoubleClick;
        }
        set showDetailOnDoubleClick(value: boolean) {
            this._showDetailOnDoubleClick = asBoolean(value);
        }
        /**
         * Gets or sets a value that determines whether the grid should
         * display row field headers in its top-left panel.
         */
        get showRowFieldHeaders(): boolean {
            return this._showRowFldHdrs;
        }
        set showRowFieldHeaders(value: boolean) {
            if (value != this._showRowFldHdrs) {
                this._showRowFldHdrs = asBoolean(value);
                this.invalidate();
            }
        }
        /**
         * Gets or sets a value that determines whether the grid should
         * display column field headers in its top-left panel.
         */
        get showColumnFieldHeaders(): boolean {
            return this._showColFldHdrs;
        }
        set showColumnFieldHeaders(value: boolean) {
            if (value != this._showColFldHdrs) {
                this._showColFldHdrs = asBoolean(value);
                this.invalidate();
            }
        }
        /**
         * Gets or sets a value that determines whether the grid should display 
         * sort indicators in the column headers for row fields.
         *
         * Unlike regular column headers, row fields are always sorted, either
         * in ascending or descending order. If you set this property to true,
         * sort icons will always be displayed over any row field headers.
         */
        get showRowFieldSort(): boolean {
            return this._showRowFldSort;
        }
        set showRowFieldSort(value: boolean) {
            if (value != this._showRowFldSort) {
                this._showRowFldSort = asBoolean(value);
                this.invalidate();
            }
        }
        /**
         * Gets or sets a value that determines whether the grid should provide a custom context menu.
         *
         * The custom context menu includes commands for changing field settings, 
         * removing fields, or showing detail records for the grid cells.
         */
        get customContextMenu(): boolean {
            return this._customCtxMenu;
        }
        set customContextMenu(value: boolean) {
            this._customCtxMenu = asBoolean(value);
        }
        /**
         * Gets or sets a value that determines whether the grid should allow users to collapse 
         * and expand subtotal groups of rows and columns. 
         */
        get collapsibleSubtotals(): boolean {
            return this._collapsibleSubtotals;
        }
        set collapsibleSubtotals(value: boolean) {
            if (value != this._collapsibleSubtotals) {
                this._collapsibleSubtotals = asBoolean(value);
                this.invalidate();
            }
        }
        /**
         * Gets or sets a value that determines whether the content of header cells should be 
         * vertically centered.
         */
        get centerHeadersVertically(): boolean {
            return this._centerVert;
        }
        set centerHeadersVertically(value: boolean) {
            if (value != this._centerVert) {
                this._centerVert = asBoolean(value);
                this.invalidate();
            }
        }
        /**
         * Gets an array containing the records summarized by a given grid cell.
         * 
         * @param row Index of the row that contains the cell.
         * @param col Index of the column that contains the cell.
         */
        getDetail(row: number, col: number): any[] {
            var item = this.rows[asInt(row)].dataItem,
                binding = this.columns[asInt(col)].binding;
            return this._ng.getDetail(item, binding);
        }
        /**
         * Gets an object with information about the fields and values
         * being used to summarize a given cell.
         *
         * For more details, see the @PivotEngine.getKeys method.
         *
         * @param row Index of the row that contains the cell.
         * @param col Index of the column that contains the cell.
         */
        getKeys(row: number, col: number): any {
            var item = this.rows[asInt(row)].dataItem,
                binding = this.columns[asInt(col)].binding;
            return this._ng.getKeys(item, binding);
        }
        /**
         * Gets an @see:collections.ICollectionView containing the records summarized
         * by a given grid cell.
         * 
         * @param row Index of the row that contains the cell.
         * @param col Index of the column that contains the cell.
         */
        getDetailView(row: number, col: number): collections.ICollectionView {
            var item = this.rows[asInt(row)].dataItem,
                binding = this.columns[asInt(col)].binding;
            return this._ng.getDetailView(item, binding);
        }
        /**
         * Shows a dialog containing details for a given grid cell.
         * 
         * @param row Index of the row that contains the cell.
         * @param col Index of the column that contains the cell.
         */
        showDetail(row: number, col: number) {
            var dd = new DetailDialog(document.createElement('div'));
            dd.showDetail(this, new wijmo.grid.CellRange(row, col));
            var dlg = new input.Popup(document.createElement('div'));
            dlg.content = dd.hostElement;
            dlg.show(true);
        }
        /**
         * Collapses all rows to a given level.
         *
         * @param level Maximum row level to show. Zero means show only
         * grand totals; one means show only top-level groups; very high
         * levels expand all rows.
         */
        collapseRowsToLevel(level: number) {
            this._collapseRowsToLevel(level);
        }
        /**
         * Collapses all columns to a given level.
         *
         * @param level Maximum column level to show. Zero means show only
         * grand totals; one means show only top-level groups; very high
         * levels expand all columns.
         */
        collapseColumnsToLevel(level: number) {
            this._collapseColsToLevel(level);
        }

        // ** overrides

        // refresh menu items in case culture changed
        refresh(fullUpdate = true) {
            this._ctxMenu.refresh();
            super.refresh(fullUpdate);
        }

        // overridden to accept PivotPanel and PivotEngine as well as ICollectionView sources
        _getCollectionView(value: any): collections.ICollectionView {
            if (value instanceof PivotPanel) {
                value = (<PivotPanel>value).engine.pivotView;
            } else if (value instanceof PivotEngine) {
                value = (<PivotEngine>value).pivotView;
            }
            return asCollectionView(value);
        }

        // overridden to connect to PivotEngine events
        onItemsSourceChanged(e?: EventArgs) {

            // disconnect old engine
            if (this._ng) {
                this._ng.updatedView.removeHandler(this._updatedView, this);
            }

            // get new engine
            var cv = this.collectionView;
            this._ng = cv instanceof PivotCollectionView
                ? (<PivotCollectionView>cv).engine
                : null;

            // connect new engine
            if (this._ng) {
                this._ng.updatedView.addHandler(this._updatedView, this);
            }
            this._updatedView();

            // fire event as usual
            super.onItemsSourceChanged(e);
        }

        // overridden to save column widths into view definition
        onResizedColumn(e: grid.CellRangeEventArgs) {
            var ng = this._ng;
            if (ng) {

                // resized fixed column
                if (e.panel == this.topLeftCells && e.col < ng.rowFields.length) {
                    var fld = <PivotField>ng.rowFields[e.col];
                    fld.width = e.panel.columns[e.col].renderWidth;
                }

                // resized scrollable column
                if (e.panel == this.columnHeaders && ng.valueFields.length > 0) {
                    var fld = <PivotField>ng.valueFields[e.col % ng.valueFields.length];
                    fld.width = e.panel.columns[e.col].renderWidth;
                }
            }

            // raise the event
            super.onResizedColumn(e);
        }

        // ** implementation

        // reset the grid layout/bindings when the pivot view is updated
        _updatedView() {

            // update fixed row/column counts
            this._updateFixedCounts();

            // clear scrollable rows/columns
            this.columns.clear();
            this.rows.clear();
        }

        // update fixed cell content after loading rows
        onLoadedRows(e?: EventArgs) {

            // generate columns and headers if necessary
            if (this.columns.length == 0) {

                // if we have data, generate columns
                var cv = this.collectionView;
                if (cv && cv.items.length) {
                    var item = cv.items[0];
                    for (var key in item) {
                        if (key != _PivotKey._ROW_KEY_NAME) {
                            var col = new grid.Column({
                                binding: key,
                                dataType: item[key] != null ? getType(item[key]) : DataType.Number
                            });
                            this.columns.push(col);
                        }
                    }
                }
            }

            // update row/column headers
            this._updateFixedContent();

            // fire event as usual
            super.onLoadedRows(e);
        }

        // update the number of fixed rows and columns
        _updateFixedCounts() {
            var ng = this._ng,
                hasView = ng && ng.isViewDefined,
                cnt: number;
        
            // fixed columns
            cnt = Math.max(1, hasView ? ng.rowFields.length : 1);
            this._setLength(this.topLeftCells.columns, cnt);

            // fixed rows
            var cnt = Math.max(1, hasView ? ng.columnFields.length : 1);
            if (ng && ng.columnFields.length && ng.valueFields.length > 1) {
                cnt++;
            }
            this._setLength(this.topLeftCells.rows, cnt);
        }
        _setLength(arr: collections.ObservableArray, cnt: number) {
            while (arr.length < cnt) {
                arr.push(arr instanceof grid.ColumnCollection ? new grid.Column() : new grid.Row());
            }
            while (arr.length > cnt) {
                arr.removeAt(arr.length - 1);
            }
        }

        // update the content of the fixed cells
        _updateFixedContent() {
            var ng = this._ng,
                hasView = ng && ng.isViewDefined;

            // if no view, clear top-left (single) cell and be done
            if (!hasView) {
                this.topLeftCells.setCellData(0, 0, null);
                return;
            }

            // populate top-left cells
            var p = this.topLeftCells;
            for (var r = 0; r < p.rows.length; r++) {
                for (var c = 0; c < p.columns.length; c++) {
                    var value = '';

                    // row field headers
                    if (this.showRowFieldHeaders) {
                        if (c < ng.rowFields.length && r == p.rows.length - 1) {
                            value = ng.rowFields[c].header;
                        }
                    }

                    // column field headers
                    if (this.showColumnFieldHeaders) {
                        if (!value && r < ng.columnFields.length && c == 0) {
                            value = ng.columnFields[r].header + ':';
                        }
                    }

                    // set it
                    p.setCellData(r, c, value, false, false);
                }
            }

            // populate row headers
            p = this.rowHeaders;
            for (var r = 0; r < p.rows.length; r++) {
                var k = <_PivotKey>p.rows[r].dataItem[_PivotKey._ROW_KEY_NAME];
                assert(k instanceof _PivotKey, 'missing PivotKey for row...');
                for (var c = 0; c < p.columns.length; c++) {
                    var value = <string>k.getValue(c, true);
                    p.setCellData(r, c, value, false, false);
                }
            }

            // populate column headers
            p = this.columnHeaders;
            for (var c = 0; c < p.columns.length; c++) {
                var k = ng._getKey(p.columns[c].binding);
                assert(k instanceof _PivotKey, 'missing PivotKey for column...');
                for (var r = 0; r < p.rows.length; r++) {
                    var value = (r == p.rows.length - 1 && ng.valueFields.length > 1)
                        ? <string>ng.valueFields[c % ng.valueFields.length].header
                        : <string>k.getValue(r, true);
                    p.setCellData(r, c, value, false, false);
                }
            }

            // set column widths
            p = this.topLeftCells;
            for (var c = 0; c < p.columns.length; c++) {
                var col = <grid.Column>p.columns[c],
                    fld = <PivotField>(c < ng.rowFields.length ? ng.rowFields[c] : null);
                col.width = (fld && isNumber(fld.width)) ? fld.width : this.columns.defaultSize;
                col.wordWrap = fld ? fld.wordWrap : null;
                col.align = null;
            }
            p = this.cells;
            for (var c = 0; c < p.columns.length; c++) {
                var col = <grid.Column>p.columns[c],
                    fld = <PivotField>(ng.valueFields.length ? ng.valueFields[c % ng.valueFields.length] : null);
                col.width = (fld && isNumber(fld.width)) ? fld.width : this.columns.defaultSize;
                col.wordWrap = fld ? fld.wordWrap : null;
                col.format = fld ? fld.format : null;
            }
        }

        // customize the grid display
        _formatItem(s, e: grid.FormatItemEventArgs) {
            var ng = this._ng;

            // make sure we're connected
            if (!ng) {
                return;
            }

            // let CSS align the top-left panel
            if (e.panel == this.topLeftCells) {
                e.cell.style.textAlign = '';
                var isColHdr = e.row < e.panel.rows.length - 1 || ng.rowFields.length == 0
                toggleClass(e.cell, 'wj-col-field-hdr', isColHdr);
                toggleClass(e.cell, 'wj-row-field-hdr', !isColHdr);
            }

            // let CSS align the column headers
            if (e.panel == this.columnHeaders) {
                if (ng.valueFields.length < 2 || e.row < e.panel.rows.length - 1) {
                    e.cell.style.textAlign = '';
                }
            }

            // apply wj-group class name to total rows and columns
            var rowLevel = ng._getRowLevel(e.row),
                colLevel = ng._getColLevel(e.panel.columns[e.col].binding);
            toggleClass(e.cell, 'wj-aggregate', rowLevel > -1 || colLevel > -1);

            // add collapse/expand icons
            if (this._collapsibleSubtotals) {

                // collapsible row
                if (e.panel == this.rowHeaders && ng.showRowTotals == ShowTotals.Subtotals) {
                    var rng = this.getMergedRange(e.panel, e.row, e.col, false) || e.range;
                    if (e.col < ng.rowFields.length - 1 && rng.rowSpan > 1) {
                        e.cell.innerHTML = this._getCollapsedGlyph(this._getRowCollapsed(rng)) + e.cell.innerHTML;
                    }
                }

                // collapsible column
                if (e.panel == this.columnHeaders && ng.showColumnTotals == ShowTotals.Subtotals) {
                    var rng = this.getMergedRange(e.panel, e.row, e.col, false) || e.range;
                    if (e.row < ng.columnFields.length - 1 && rng.columnSpan > 1) {
                        e.cell.innerHTML = this._getCollapsedGlyph(this._getColCollapsed(rng)) + e.cell.innerHTML;
                    }
                }
            }

            // show sort icons on row field headers
            if (e.panel == this.topLeftCells && this.showRowFieldSort &&
                e.col < ng.rowFields.length && e.row == this._getSortRowIndex()) {
                var fld = ng.rowFields[e.col];
                toggleClass(e.cell, 'wj-sort-asc', !fld.descending);
                toggleClass(e.cell, 'wj-sort-desc', fld.descending);
                e.cell.innerHTML += ' <span class="wj-glyph-' + (fld.descending ? 'down' : 'up') + '"></span>';
            }

            // center-align header cells vertically
            if (this._centerVert && e.cell.hasChildNodes) {
                if (e.panel == this.rowHeaders || e.panel == this.columnHeaders) {

                    // surround cell content in a vertically centered table-cell div
                    var div = createElement('<div style="display:table-cell;vertical-align:middle"></div>');
                    if (!this._docRange) {
                        this._docRange = document.createRange();
                    }
                    this._docRange.selectNodeContents(e.cell);
                    this._docRange.surroundContents(div);

                    // make the cell display as a table
                    setCss(e.cell, {
                        display: 'table',
                        tableLayout: 'fixed',
                        paddingTop: 0, // remove top/bottom padding to work around Safari bug
                        paddingBottom: 0
                    });
                }
            }
        }
        _getCollapsedGlyph(collapsed: boolean): string {
            return '<div style="display:inline-block;cursor:pointer" ' + PivotGrid._WJA_COLLAPSE + '>' +
                     '<span class="wj-glyph-' + (collapsed ? 'plus' : 'minus') + '"></span>' +
                   '</div>&nbsp';
        }

        // mouse handling
        _mousedown(e: MouseEvent) {

            // make sure we want this event
            if (e.defaultPrevented || e.button != 0) {
                this._htDown = null;
                return;
            }

            // save mouse down position to use later on mouse up
            this._htDown = this.hitTest(e);

            // collapse/expand on mousedown
            var icon = closest(e.target, '[' + PivotGrid._WJA_COLLAPSE + ']');
            if (icon != null && this._htDown.panel != null) {
                var rng = this._htDown.range;
                switch (this._htDown.panel.cellType) {
                    case grid.CellType.RowHeader:
                        var collapsed = this._getRowCollapsed(rng);
                        if (e.shiftKey || e.ctrlKey) {
                            this._collapseRowsToLevel(rng.col + (collapsed ? 2 : 1));
                        } else {
                            this._setRowCollapsed(rng, !collapsed);
                        }
                        break;
                    case grid.CellType.ColumnHeader:
                        var collapsed = this._getColCollapsed(rng);
                        if (e.shiftKey || e.ctrlKey) {
                            this._collapseColsToLevel(rng.row + (collapsed ? 2 : 1));
                        } else {
                            this._setColCollapsed(rng, !collapsed);
                        }
                        break;
                }
                this._htDown = null;
                e.preventDefault();
            }
        }
        _mouseup(e: MouseEvent) {

            // make sure we want this event
            if (!this._htDown || e.defaultPrevented || this.hostElement.style.cursor == 'col-resize') {
                return;
            }

            // make sure this is the same cell where the mouse was pressed
            var ht = this.hitTest(e);
            if (this._htDown.panel != ht.panel || !ht.range.equals(this._htDown.range)) {
                return;
            }

            // toggle sort direction when user clicks the row field headers
            var ng = this._ng,
                topLeft = this.topLeftCells;
            if (ht.panel == topLeft && ht.row == topLeft.rows.length - 1 && ht.col > -1) {
                if (this.allowSorting && ht.panel.columns[ht.col].allowSorting) {
                    var args = new wijmo.grid.CellRangeEventArgs(ht.panel, ht.range);
                    if (this.onSortingColumn(args)) {
                        ng.pivotView.sortDescriptions.clear();
                        var fld = <PivotField>ng.rowFields[ht.col];
                        fld.descending = !fld.descending;
                        this.onSortedColumn(args)
                    }
                }
                e.preventDefault();
            }
        }
        _dblclick(e: MouseEvent) {

            // check that we have an engine and it's not a cube
            if (this._ng && this._ng.fields.length > 0) {
                if (!(this._ng.fields[0] instanceof CubePivotField)) {

                    // check that we want this event
                    if (!e.defaultPrevented && this._showDetailOnDoubleClick) {
                        var ht = this._htDown;
                        if (ht && ht.panel == this.cells) {

                            // go show the detail
                            this.showDetail(ht.row, ht.col);
                        }
                    }
                }
            }
        }

        // ** row groups
        _getRowLevel(row: number): number {
            return this._ng._getRowLevel(row);
        }
        _getGroupedRows(rng: grid.CellRange): grid.CellRange {
            var level = rng.col + 1,
                start: number,
                end: number;

            if (this._ng.totalsBeforeData) { 

                // expand up to find total row, then down over data rows
                for (start = rng.row; start > 0; start--) {
                    if (this._getRowLevel(start) == level) break;
                }
                for (end = rng.row; end < this.rows.length - 1; end++) {
                    var lvl = this._getRowLevel(end + 1);
                    if (lvl > -1 && lvl <= level) break;
                }

                // exclude totals from group
                start++; 
            } else { 

                // expand down to find total row, then up over data rows
                for (end = rng.row; end < this.rows.length; end++) {
                    if (this._getRowLevel(end) == level) break;
                }
                for (start = rng.row; start > 0; start--) {
                    var lvl = this._getRowLevel(start - 1);
                    if (lvl > -1 && lvl <= level) break;
                }

                // in case this is a paged collectionView (TFS 245118)
                if (end == this.rows.length) {
                    //var pcv = <collections.IPagedCollectionView>tryCast(this.collectionView, 'IPagedCollectionView');
                    //assert(pcv && pcv.pageSize > 0, 'Missing total OK only on paged collection views...');
                    end--;
                }

                // exclude totals from group
                end--;
            }

            return end >= start // TFS 190950
                ? new grid.CellRange(start, rng.col, end, rng.col2)
                : rng;
        }
        _getRowCollapsed(rng: grid.CellRange): boolean {
            rng = this._getGroupedRows(rng);
            for (var r = rng.row; r <= rng.row2; r++) {
                if (this.rows[r].isVisible) {
                    return false;
                }
            }
            return true;
        }
        _setRowCollapsed(rng: grid.CellRange, collapse: boolean) {
            this.deferUpdate(() => {
                rng = this._getGroupedRows(rng);
                for (var r = rng.row; r <= rng.row2; r++) {
                    this.rows[r].visible = !collapse;
                }
            });
        }
        _toggleRowCollapsed(rng: grid.CellRange) {
            this._setRowCollapsed(rng, !this._getRowCollapsed(rng));
        }
        _collapseRowsToLevel(level: number) {
            if (level >= this._ng.rowFields.length) {
                level = -1; // show all
            }
            this.deferUpdate(() => {
                for (var r = 0; r < this.rows.length; r++) {
                    if (level < 0) {
                        this.rows[r].visible = true;
                    } else {
                        var rl = this._getRowLevel(r);
                        this.rows[r].visible = rl > -1 && rl <= level;
                    }
                }
            });
        }

        // ** column groups
        _getColLevel(col: number): number {
            return this._ng._getColLevel(this.columns[col].binding);
        }
        _getGroupedCols(rng: grid.CellRange): grid.CellRange {
            var level = rng.row + 1,
                start: number,
                end: number;

            if (this._ng.totalsBeforeData) { 

                // expand left to find total column, then right over data columns
                for (start = rng.col; start > 0; start--) {
                    if (this._getColLevel(start) == level) break;
                }
                for (end = rng.col; end < this.columns.length - 1; end++) {
                    var lvl = this._getColLevel(end + 1);
                    if (lvl > -1 && lvl <= level) break;
                }

                // exclude totals from group
                start++; 

            } else {

                // expand right to find total column, then left over data columns
                for (end = rng.col; end < this.columns.length; end++) {
                    if (this._getColLevel(end) == level) break;
                }
                for (start = rng.col; start > 0; start--) {
                    var lvl = this._getColLevel(start - 1);
                    if (lvl > -1 && lvl <= level) break;
                }

                // exclude totals from group
                end--; 
            }

            return end >= start // TFS 190950
                ? new grid.CellRange(rng.row, start, rng.row2, end)
                : rng;
        }
        _getColCollapsed(rng: grid.CellRange): boolean {
            rng = this._getGroupedCols(rng);
            for (var c = rng.col; c <= rng.col2; c++) {
                if (this.columns[c].isVisible) {
                    return false;
                }
            }
            return true;
        }
        _setColCollapsed(rng: grid.CellRange, collapse: boolean) {
            this.deferUpdate(() => {
                rng = this._getGroupedCols(rng);
                for (var c = rng.col; c <= rng.col2; c++) {
                    this.columns[c].visible = !collapse;
                }
            });
        }
        _toggleColCollapsed(rng: grid.CellRange) {
            this._setColCollapsed(rng, !this._getColCollapsed(rng));
        }
        _collapseColsToLevel(level: number) {
            if (level >= this._ng.columnFields.length) {
                level = -1; // show all
            }
            this.deferUpdate(() => {
                for (var c = 0; c < this.columns.length; c++) {
                    if (level < 0) {
                        this.columns[c].visible = true;
                    } else {
                        var cl = this._getColLevel(c);
                        this.columns[c].visible = cl > -1 && cl <= level;
                    }
                }
            });
        }
    }
}
module wijmo.olap {
    'use strict';

    // globalization
    wijmo.culture.olap = wijmo.culture.olap || {};
    wijmo.culture.olap.DetailDialog = window['wijmo'].culture.olap.DetailDialog || {
        header: 'Detail View:',
        ok: 'OK',
        items: '{cnt:n0} items',
        item: '{cnt} item',
        row: 'Row',
        col: 'Column'
    }

    /**
     * Represents a dialog used to display details for a grid cell.
     */
    export class DetailDialog extends Control {

        // child grid
        private _g: wijmo.grid.FlexGrid;

        // child elements
        private _sCnt: HTMLElement;
        private _dSummary: HTMLElement;
        private _dGrid: HTMLElement;
        private _btnOK: HTMLElement;
        private _gHdr: HTMLElement;

        /**
         * Gets or sets the template used to instantiate @see:PivotFieldEditor controls.
         */
        static controlTemplate = '<div>' +

          // header
          '<div class="wj-dialog-header">' +
            '<span wj-part="g-hdr">Detail View:</span> <span wj-part="sp-cnt"></span>' +
          '</div>' +

          // body
          '<div class="wj-dialog-body">' +
            '<div wj-part="div-summary"></div>' +
            '<div wj-part="div-grid"></div>' +
          '</div>' +

          // footer
          '<div class="wj-dialog-footer">' +
            '<a class="wj-hide" wj-part="btn-ok" href="" tabindex="-1" draggable="false">OK</a>&nbsp;&nbsp;' +
          '</div>' +
        '</div>';

        /**
         * Initializes a new instance of the @see:DetailDialog class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element, null, true);

            // instantiate and apply template
            var tpl = this.getTemplate();
            this.applyTemplate('wj-control wj-content wj-detaildialog', tpl, {
                _sCnt: 'sp-cnt',
                _dSummary: 'div-summary',
                _dGrid: 'div-grid',
                _btnOK: 'btn-ok',
                _gHdr: 'g-hdr'
            });

            // globalization
            var g = culture.olap.DetailDialog;
            this._gHdr.textContent = g.header;
            this._btnOK.textContent = g.ok;

            // create child grid
            this._g = new wijmo.grid.FlexGrid(this._dGrid, {
                isReadOnly: true
            });

            // apply options
            this.initialize(options);
        }

        // populates the dialog to show the detail for a given cell
        showDetail(ownerGrid: PivotGrid, cell: wijmo.grid.CellRange) {

            // populate child grid
            var view = ownerGrid.getDetailView(cell.row, cell.col);
            this._g.itemsSource = view;

            // update caption
            var pcv = <collections.IPagedCollectionView>tryCast(view, 'IPagedCollectionView');
            this._updateDetailCount(pcv ? pcv.totalItemCount : view.items.length);
            view.collectionChanged.addHandler(() => {
                this._updateDetailCount(view.items.length);
            });

            // update summary
            var ng = ownerGrid.engine,
                fmt = culture.olap.DetailDialog,
                summary = '';

            // row info
            var rowKey = ownerGrid.rows[cell.row].dataItem[_PivotKey._ROW_KEY_NAME],
                rowHdr = this._getHeader(rowKey);
            if (rowHdr) {
                summary += fmt.row + ': <b>' + escapeHtml(rowHdr) + '</b><br>';
            }

            // column info
            var colKey = ng._getKey(ownerGrid.columns[cell.col].binding),
                colHdr = this._getHeader(colKey);
            if (colHdr) {
                summary += fmt.col + ': <b>' + escapeHtml(colHdr) + '</b><br>';
            }

            // value info
            var valFlds = ng.valueFields,
                valFld = valFlds[cell.col % valFlds.length],
                valHdr = valFld.header,
                val = ownerGrid.getCellData(cell.row, cell.col, true);
            summary += escapeHtml(valHdr) + ': <b>' + escapeHtml(val) + '</b>';

            // show it
            this._dSummary.innerHTML = summary;
        }

        // update record count in dialog header
        _updateDetailCount(cnt: number) {
            var fmt = culture.olap.DetailDialog;
            this._sCnt.textContent = format(cnt == 1 ? fmt.item : fmt.items, { cnt: cnt });
        }

        // gets the headers that describe a key
        _getHeader(key: _PivotKey) {
            if (key.values.length) {
                var arr = [];
                for (var i = 0; i < key.values.length; i++) {
                    arr.push(key.getValue(i, true));
                }
                return arr.join(' - ');
            }
            return null;
        }
    }
}
module wijmo.olap {
    'use strict';

    // globalization
    wijmo.culture.olap = wijmo.culture.olap || {};
    wijmo.culture.olap.PivotChart = window['wijmo'].culture.olap.PivotChart || {
        by: 'by',
        and: 'and'
    }

    /**
     * Specifies constants that define the chart type.
     */
    export enum PivotChartType {
        /** Shows vertical bars and allows you to compare values of items across categories. */
        Column,
        /** Shows horizontal bars. */
        Bar,
        /** Shows patterns within the data using X and Y coordinates. */
        Scatter,
        /** Shows trends over a period of time or across categories. */
        Line,
        /** Shows line chart with the area below the line filled with color. */
        Area,
        /** Shows pie chart. */
        Pie
    }

    /**
     * Specifies constants that define when the chart legend should be displayed.
     */
    export enum LegendVisibility {
        /** Always show the legend. */
        Always,
        /** Never show the legend. */
        Never,
        /** Show the legend if the chart has more than one series. */
        Auto
    }

    /**
     * Provides visual representations of @see:wijmo.olap pivot tables.
     *
     * To use the control, set its @see:itemsSource property to an instance of a 
     * @see:PivotPanel control or to a @see:PivotEngine.
     */
    export class PivotChart extends Control {

        static MAX_SERIES = 100;
        static MAX_POINTS = 100;
        static HRHAXISCSS = 'wj-hierarchicalaxes-line';

        private _ng: PivotEngine;
        private _chartType = PivotChartType.Column;
        private _showHierarchicalAxes = true;
        private _showTotals = false;
        private _showTitle = true;
        private _showLegend = LegendVisibility.Always;
        private _legendPosition = chart.Position.Right;
        private _maxSeries = PivotChart.MAX_SERIES;
        private _maxPoints = PivotChart.MAX_POINTS;
        private _stacking = chart.Stacking.None;

        private _itemsSource: any;
        private _flexChart: chart.FlexChart;
        private _flexPie: chart.FlexPie;
        private _colMenu: input.Menu;

        private _colItms = [];
        private _dataItms = [];
        private _lblsSrc = [];
        private _grpLblsSrc = [];

        /**
         * Initializes a new instance of the @see:PivotChart class.
         *
         * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);

            // add class name to enable styling
            addClass(this.hostElement, 'wj-pivotchart');

            // add flex chart & flex pie
            if (!this._isPieChart()) {
                this._createFlexChart();
            } else {
                this._createFlexPie();
            }
            super.initialize(options);
        }

        /**
         * Gets a reference to the @see:PivotEngine that owns this @see:PivotChart.
         */
        get engine(): PivotEngine {
            return this._ng;
        }
        /**
         * Gets or sets the @see:PivotEngine or @see:PivotPanel that provides data 
         * for this @see:PivotChart.
         */
        get itemsSource(): any {
            return this._itemsSource;
        }
        set itemsSource(value: any) {
            if (value && this._itemsSource !== value) {
                var oldVal = this._itemsSource;
                if (value instanceof PivotPanel) {
                    value = (<PivotPanel>value).engine.pivotView;
                } else if (value instanceof PivotEngine) {
                    value = (<PivotEngine>value).pivotView;
                }
                this._itemsSource = asCollectionView(value);
                this._onItemsSourceChanged(oldVal);
            }
        }
        /**
         * Gets or sets the type of chart to create.
         */
        get chartType(): PivotChartType {
            return this._chartType;
        }
        set chartType(value: PivotChartType) {
            if (value != this._chartType) {
                this._chartType = asEnum(value, PivotChartType);
                this._changeChartType();
                this._updatePivotChart();
            }
        }
        /**
         * Gets or sets a value that determines whether the chart should group axis 
         * annotations for grouped data.
         */
        get showHierarchicalAxes(): boolean {
            return this._showHierarchicalAxes;
        }
        set showHierarchicalAxes(value: boolean) {
            if (value != this._showHierarchicalAxes) {
                this._showHierarchicalAxes = asBoolean(value, true);
                if (!this._isPieChart() && this._flexChart) {
                    this._updateFlexChart(this._dataItms, this._lblsSrc, this._grpLblsSrc);
                }
            }
        }
        /**
         * Gets or sets a value that determines whether the chart should include only totals.
         */
        get showTotals(): boolean {
            return this._showTotals;
        }
        set showTotals(value: boolean) {
            if (value != this._showTotals) {
                this._showTotals = asBoolean(value, true);
                this._updatePivotChart();
            }
        }
        /**
         * Gets or sets a value that determines whether the chart should include a title.
         */
        get showTitle(): boolean {
            return this._showTitle;
        }
        set showTitle(value: boolean) {
            if (value != this._showTitle) {
                this._showTitle = asBoolean(value, true);
                this._updatePivotChart();
            }
        }
        /**
         * Gets or sets a value that determines whether the chart should include a legend.
         */
        get showLegend(): LegendVisibility {
            return this._showLegend;
        }
        set showLegend(value: LegendVisibility) {
            if (value != this.showLegend) {
                this._showLegend = asEnum(value, LegendVisibility);
                this._updatePivotChart();
            }
        }
        /**
         * Gets or sets a value that determines whether and where the legend
         * appears in relation to the plot area.
         */
        get legendPosition(): chart.Position {
            return this._legendPosition;
        }
        set legendPosition(value: chart.Position) {
            if (value != this.legendPosition) {
                this._legendPosition = asEnum(value, chart.Position);
                this._updatePivotChart();
            }
            return ;
        }
        /**
         * Gets or sets a value that determines whether and how the series objects are stacked.
         */
        get stacking(): chart.Stacking {
            return this._stacking;
        }
        set stacking(value: chart.Stacking) {
            if (value != this._stacking) {
                this._stacking = asEnum(value, chart.Stacking);
                if (this._flexChart) {
                    this._flexChart.stacking = this._stacking;
                    this.refresh();
                }
            }
        }
        /**
         * Gets or sets the maximum number of data series to be shown in the chart.
         */
        get maxSeries(): number {
            return this._maxSeries;
        }
        set maxSeries(value: number) {
            if (value != this._maxSeries) {
                this._maxSeries = asNumber(value);
                this._updatePivotChart();
            }
        }
        /**
         * Gets or sets the maximum number of points to be shown in each series.
         */
        get maxPoints(): number {
            return this._maxPoints;
        }
        set maxPoints(value: number) {
            if (value != this._maxPoints) {
                this._maxPoints = asNumber(value);
                this._updatePivotChart();
            }
        }
        /**
         * Gets a reference to the inner <b>FlexChart</b> control.
         */
        get flexChart(): chart.FlexChart {
            return this._flexChart;
        }
        /**
         * Gets a reference to the inner <b>FlexPie</b> control.
         */
        get flexPie(): chart.FlexPie {
            return this._flexPie;
        }
        /**
         * Refreshes the control.
         *
         * @param fullUpdate Whether to update the control layout as well as the content.
         */
        refresh(fullUpdate = true) {
            super.refresh(fullUpdate); // always call the base class
            if (this._isPieChart()) {
                if (this._flexPie) {
                    this._flexPie.refresh(fullUpdate);
                }
            } else {
                if (this._flexChart) {
                    this._flexChart.refresh(fullUpdate);
                }
            }
        }

        // ** implementation

        // occur when items source changed
        private _onItemsSourceChanged(oldItemsSource?) {

            // disconnect old engine
            if (this._ng) {
                this._ng.updatedView.removeHandler(this._updatePivotChart, this);
            }
            if (oldItemsSource) {
                (<PivotCollectionView>oldItemsSource).collectionChanged.removeHandler(this._updatePivotChart, this);
            }

            // get new engine
            var cv = this._itemsSource;
            this._ng = cv instanceof PivotCollectionView
                ? (<PivotCollectionView>cv).engine
                : null;
            // connect new engine
            if (this._ng) {
                this._ng.updatedView.addHandler(this._updatePivotChart, this);
            }
            if (this._itemsSource) {
                (<PivotCollectionView>this._itemsSource).collectionChanged.addHandler(this._updatePivotChart, this);
            }

            this._updatePivotChart();
        }

        // create flex chart
        private _createFlexChart() {
            var hostEle = document.createElement('div');
            this.hostElement.appendChild(hostEle);
            this._flexChart = new wijmo.chart.FlexChart(hostEle);
            this._flexChart._bindingSeparator = null; // don't parse bindings at the commas
            this._flexChart.legend.position = chart.Position.Right;
            this._flexChart.bindingX = _PivotKey._ROW_KEY_NAME;
            this._flexChart.stacking = this._stacking;
            this._flexChart.tooltip.content = (ht) => {
                var content = ht.name
                    ? '<b>' + ht.name + '</b> ' + '<br/>'
                    : '';
                content += this._getLabel(ht.x) + ' ' + ht._yfmt;
                return content;
            }
            this._flexChart.hostElement.style.visibility = 'hidden';
        }

        // create flex pie
        private _createFlexPie() {
            var menuHost = document.createElement('div');
            this.hostElement.appendChild(menuHost);
            this._colMenu = new wijmo.input.Menu(menuHost);
            this._colMenu.displayMemberPath = 'text';
            this._colMenu.selectedValuePath = 'prop';
            this._colMenu.hostElement.style.visibility = 'hidden';

            var hostEle = document.createElement('div');
            this.hostElement.appendChild(hostEle);
            this._flexPie = new wijmo.chart.FlexPie(hostEle);
            this._flexPie.bindingName = _PivotKey._ROW_KEY_NAME;
            this._flexPie.tooltip.content = (ht) => {
                return '<b>' + this._getLabel(this._dataItms[ht.pointIndex][_PivotKey._ROW_KEY_NAME]) + '</b> ' + '<br/>' + ht._yfmt;
            }
            this._flexPie.rendering.addHandler(this._updatePieInfo, this);
        }

        // update chart
        private _updatePivotChart() {
            if (!this._ng || !this._ng.pivotView) {
                return;
            }

            var dataItems = [], lblsSrc = [], grpLblsSrc = [],
                lastLabelIndex = 0, lastRowKey,
                view = this._ng.pivotView,
                rowFields = this._ng.rowFields;

            // prepare data for chart
            for (var i = 0; i < view.items.length; i++) {
                var item = view.items[i],
                    rowKey = item.$rowKey;

                // get columns
                if (i == 0) {
                    this._getColumns(item);
                }

                // max points
                if (dataItems.length >= this._maxPoints) {
                    break;
                }

                // skip total row
                if (!this._isTotalRow(item[_PivotKey._ROW_KEY_NAME])) {
                    dataItems.push(item);

                    // organize the axis label data source
                    // 1. _groupAnnotations  = false;
                    lblsSrc.push({ value: dataItems.length - 1, text: this._getLabel(item[_PivotKey._ROW_KEY_NAME]) });

                    // 2. _groupAnnotations  = true;
                    for (var j = 0; j < rowFields.length; j++) {
                        if (grpLblsSrc.length <= j) {
                            grpLblsSrc.push([]);
                        }
                        var mergeIndex = this._getMergeIndex(rowKey, lastRowKey);
                        if (mergeIndex < j) {

                            // center previous label based on values
                            lastLabelIndex = grpLblsSrc[j].length - 1;
                            var grpLbl = grpLblsSrc[j][lastLabelIndex];

                            // first group label
                            if (lastLabelIndex === 0 && j < rowFields.length - 1) {
                                grpLbl.value = (grpLbl.width - 1) / 2;
                            }
                            if (lastLabelIndex > 0 && j < rowFields.length - 1) {
                                var offsetWidth = this._getOffsetWidth(grpLblsSrc[j]);
                                grpLbl.value = offsetWidth + (grpLbl.width - 1) / 2;
                            }
                            grpLblsSrc[j].push({ value: dataItems.length - 1, text: rowKey.getValue(j, true), width: 1 });
                        } else {

                            // calculate the width
                            lastLabelIndex = grpLblsSrc[j].length - 1;
                            grpLblsSrc[j][lastLabelIndex].width++;
                        }
                    }
                   lastRowKey = rowKey;
                }

                // center last label
                if (i == view.items.length - 1) {
                    for (var j = 0; j < rowFields.length; j++) {
                        if (j < grpLblsSrc.length) { //this._ng.rowFields.length - 1) {
                            lastLabelIndex = grpLblsSrc[j].length - 1;
                            grpLblsSrc[j][lastLabelIndex].value = this._getOffsetWidth(grpLblsSrc[j]) + (grpLblsSrc[j][lastLabelIndex].width - 1) / 2;
                        }
                    }
                }
            }

            this._dataItms = dataItems;
            this._lblsSrc = lblsSrc;
            this._grpLblsSrc = grpLblsSrc;

            this._updateFlexChartOrPie();
        }

        private _updateFlexChartOrPie() {
            var isPie = this._isPieChart();
            if (!isPie && this._flexChart) {
                this._updateFlexChart(this._dataItms, this._lblsSrc, this._grpLblsSrc);
            } else if (isPie && this._flexPie) {
                this._updateFlexPie(this._dataItms, this._lblsSrc);
            }
        }

        // update FlexChart
        private _updateFlexChart(dataItms: any, labelsSource: any, grpLblsSrc: any) {

            if (!this._ng || !this._flexChart) {
                return;
            }
            var chart = this._flexChart, host = chart.hostElement,
                axis: wijmo.chart.Axis;

            chart.beginUpdate();
            chart.itemsSource = dataItms;
            chart.legend.position = this._getLegendPosition(false);
            this._createSeries();

            if (chart.series &&
                chart.series.length > 0 &&
                dataItms.length > 0) {
                host.style.visibility = 'visible';
            } else {
                host.style.visibility = 'hidden';
            }
            chart.header = this._getChartTitle();
            if (this._isBarChart()) {
                if (this._showHierarchicalAxes) {
                    chart.axisY.itemsSource = grpLblsSrc[grpLblsSrc.length - 1];
                    chart.axisX.labelAngle = undefined;
                    if (grpLblsSrc.length >= 2) {
                        for (var i = grpLblsSrc.length - 2; i >= 0; i--) {
                            this._createGroupAxes(grpLblsSrc[i]);
                        }
                    }
                } else {
                    chart.axisY.labelAngle = undefined;
                    chart.axisY.itemsSource = labelsSource;
                }
                chart.axisX.itemsSource = undefined;
            } else {
                if (this._showHierarchicalAxes) {
                    chart.axisX.itemsSource = grpLblsSrc[grpLblsSrc.length - 1];
                    if (grpLblsSrc.length >= 2) {
                        for (var i = grpLblsSrc.length - 2; i >= 0; i--) {
                            this._createGroupAxes(grpLblsSrc[i]);
                        }
                    }
                } else {
                    chart.axisX.labelAngle = undefined;
                    chart.axisX.itemsSource = labelsSource;
                }
                chart.axisY.itemsSource = undefined;
            }
            chart.axisX.labelPadding = 6;
            chart.axisY.labelPadding = 6;
            if (this.chartType === PivotChartType.Bar) {
                axis = chart.axisX;
                chart.axisY.reversed = true;
            } else {
                axis = chart.axisY;
                chart.axisY.reversed = false;
            }
            if (this._ng.valueFields.length > 0 && this._ng.valueFields[0].format) {
                axis.format = this._ng.valueFields[0].format;
            } else {
                axis.format = '';
            }
            chart.endUpdate();
        }

        // update FlexPie
        private _updateFlexPie(dataItms: any, labelsSource: any) {
            var pie, colMenu, headerPrefix, host;
            if (!this._ng || !this._flexPie) {
                return;
            }
            pie = this._flexPie;
            host = pie.hostElement;
            colMenu = this._colMenu;

            if (this._colItms.length > 0 &&
                dataItms.length > 0 ) {
                host.style.visibility = 'visible';
            } else {
                host.style.visibility = 'hidden';
            }

            pie.beginUpdate();

            // updating pie: binding the first column
            pie.legendPosition = this._getLegendPosition(true);
            pie.itemsSource = dataItms;
            pie.bindingName = _PivotKey._ROW_KEY_NAME;
            if (this._colItms && this._colItms.length > 0) {
                pie.binding = this._colItms[0]['prop'];
            }

            pie.header = this._getChartTitle();
            pie.legend.visibility = this.showLegend;
            pie.endUpdate();

            // updating column selection menu
            headerPrefix = this._getTitle(this._ng.columnFields);
            if (headerPrefix !== '') {
                headerPrefix = '<b>' + headerPrefix + ': </b>';
            }
            if (this._colItms && this._colItms.length > 1 && dataItms.length > 0) {
                colMenu.hostElement.style.visibility = 'visible';
                colMenu.header = headerPrefix + this._colItms[0]['text'];
                colMenu.itemsSource = this._colItms;
                colMenu.command = {
                    executeCommand: (arg) => {
                        var selectedItem = colMenu.selectedItem;
                        colMenu.header = headerPrefix + selectedItem['text'];
                        pie.binding = selectedItem['prop'];
                    }
                }
                colMenu.selectedIndex = 0;
                colMenu.invalidate();
                colMenu.listBox.invalidate();
            } else {
                colMenu.hostElement.style.visibility = 'hidden';
            }
        }

        // gets the position for the legend
        private _getLegendPosition(isPie: boolean): chart.Position {
            var pos = this.legendPosition;
            if (this.showLegend == LegendVisibility.Never) {
                pos = chart.Position.None;
            } else if (this.showLegend == LegendVisibility.Auto && !isPie) {
                if (this.flexChart && this.flexChart.series) {
                    var cnt = 0;
                    this.flexChart.series.forEach((series) => {
                        var vis = series.visibility;
                        if (series.name &&
                            vis != chart.SeriesVisibility.Hidden &&
                            vis != chart.SeriesVisibility.Plot) {
                            cnt++;
                        }
                    });
                    if (cnt < 2) {
                        pos = chart.Position.None;
                    }
                }
            }
            return pos;
        }

        // create series
        private _createSeries() {

            // clear the old series
            if (this._flexChart) {
                this._flexChart.series.length = 0;
            }

            // create the new series
            for (var i = 0; i < this._colItms.length; i++) {
                var series = new chart.Series();
                series.binding = this._colItms[i]['prop'];
                series.name = this._colItms[i]['text'];
                this._flexChart.series.push(series);
            }
        }

        // get columns from item
        private _getColumns(itm: any) {
            var sersCount = 0, colKey, colLbl;
            if (!itm) {
                return;
            }
            this._colItms.length = 0;
            for (var prop in itm) {
                if (itm.hasOwnProperty(prop)) {
                    if (prop !== _PivotKey._ROW_KEY_NAME && sersCount < this._maxSeries) {
                        if ((this._showTotals && this._isTotalColumn(prop)) || (
                            (!this._showTotals && !this._isTotalColumn(prop)))) {
                            colKey = this._ng._getKey(prop);
                            colLbl = this._getLabel(colKey);
                            this._colItms.push({ prop: prop, text: this._getLabel(colKey) });
                            sersCount++;
                        }
                    }
                }
            }
        }

        // create group axes
        private _createGroupAxes(groups: any) {
            var chart = this._flexChart,
                rawAxis = this._isBarChart() ? chart.axisY : chart.axisX,
                ax;

            if (!groups) {
                return;
            }

            // create auxiliary series
            ax = new wijmo.chart.Axis();
            ax.labelAngle = 0;
            ax.labelPadding = 6;
            ax.position = this._isBarChart() ? wijmo.chart.Position.Left : wijmo.chart.Position.Bottom;
            ax.majorTickMarks = wijmo.chart.TickMark.None;

            // set axis data source
            ax.itemsSource = groups;
            ax.reversed = rawAxis.reversed;

            // custom item formatting
            ax.itemFormatter = (engine, label) => {

                // find group
                var group = groups.filter(function (obj) {
                    return obj.value == label.val;
                })[0];

                // draw custom decoration
                var w = 0.5 * group.width;
                if (!this._isBarChart()) {
                    var x1 = ax.convert(label.val - w) + 5,
                        x2 = ax.convert(label.val + w) - 5,
                        y = ax._axrect.top;
                    engine.drawLine(x1, y, x2, y, PivotChart.HRHAXISCSS);
                    engine.drawLine(x1, y, x1, y - 5, PivotChart.HRHAXISCSS);
                    engine.drawLine(x2, y, x2, y - 5, PivotChart.HRHAXISCSS);
                    engine.drawLine(label.pos.x, y, label.pos.x, y + 5, PivotChart.HRHAXISCSS);
                } else {
                    var reversed = ax.reversed ? -1 : +1,
                        y1 = ax.convert(label.val + w) + 5 * reversed,
                        y2 = ax.convert(label.val - w) - 5 * reversed,
                        x = ax._axrect.left + ax._axrect.width - 5;
                    engine.drawLine(x, y1, x, y2, PivotChart.HRHAXISCSS);
                    engine.drawLine(x, y1, x + 5, y1, PivotChart.HRHAXISCSS);
                    engine.drawLine(x, y2, x + 5, y2, PivotChart.HRHAXISCSS);
                    engine.drawLine(x, label.pos.y, x - 5, label.pos.y, PivotChart.HRHAXISCSS);
                }
                return label;
            };

            ax.min = rawAxis.actualMin;
            ax.max = rawAxis.actualMax;

            // sync axis limits with main x-axis
            rawAxis.rangeChanged.addHandler(function () {
                ax.min = rawAxis.actualMin;
                ax.max = rawAxis.actualMax;
            });
            var series = new wijmo.chart.Series();
            series.visibility = wijmo.chart.SeriesVisibility.Hidden;
            if (!this._isBarChart()) {
                series.axisX = ax;
            } else {
                series.axisY = ax;
            }
            chart.series.push(series);
        }

        private _updateFlexPieBinding() {
            this._flexPie.binding = this._colMenu.selectedValue;
            this._flexPie.refresh();
        }

        private _updatePieInfo() {
            if (!this._flexPie) {
                return;
            }
            this._flexPie._labels = this._flexPie._labels.map((v, i) => {
                return this._lblsSrc[i].text;
            });
        }

        // change chart type
        private _changeChartType() {
            var ct = null;

            if (this.chartType === PivotChartType.Pie) {
                if (!this._flexPie) {
                    this._createFlexPie();
                }
                this._updateFlexPie(this._dataItms, this._lblsSrc);
                this._swapChartAndPie(false);
            } else {
                switch (this.chartType) {
                    case PivotChartType.Column:
                        ct = chart.ChartType.Column;
                        break;
                    case PivotChartType.Bar:
                        ct = chart.ChartType.Bar;
                        break;
                    case PivotChartType.Scatter:
                        ct = chart.ChartType.Scatter;
                        break;
                    case PivotChartType.Line:
                        ct = chart.ChartType.Line;
                        break;
                    case PivotChartType.Area:
                        ct = chart.ChartType.Area;
                        break;
                }
                if (!this._flexChart) {
                    this._createFlexChart();
                    this._updateFlexChart(this._dataItms, this._lblsSrc, this._grpLblsSrc);
                } else {
                    // 1.from pie to flex chart
                    // 2.switch between bar chart and other flex charts
                    // then rebind the chart.
                    if (this._flexChart.hostElement.style.display === 'none' ||
                        ct === PivotChartType.Bar || this._flexChart.chartType === chart.ChartType.Bar) {
                        this._updateFlexChart(this._dataItms, this._lblsSrc, this._grpLblsSrc);
                    }
                }
                this._flexChart.chartType = ct;
                this._swapChartAndPie(true);
            }
        }

        private _swapChartAndPie(chartshow: boolean) {
            if (this._flexChart) {
                this._flexChart.hostElement.style.display = chartshow ? 'block' : 'none';
            }
            if (this._flexPie) {
                this._flexPie.hostElement.style.display = !chartshow ? 'block' : 'none';;
            }
            if (this._colMenu && this._colMenu.hostElement) {
                this._colMenu.hostElement.style.display = chartshow ? 'none' : 'block';
            }
        }

        private _getLabel(key: _PivotKey) {
            var sb = '';
            if (!key || !key.values) {
                return sb;
            }
            switch (key.values.length) {
                case 0:
                    if (key._valueFields && key._valueFieldIndex < key._valueFields.length) {
                        sb += key.valueFields[key._valueFieldIndex].header;
                    }
                    break;
                case 1:
                    sb += key.getValue(0, true);
                    if (this._ng.valueFields.length > 1 &&
                        key.valueFields && key.valueFields.length > 0) {
                        sb += '; ' + key.valueFields[key._valueFieldIndex].header;
                    }
                    break;
                default:
                    for (var i = 0; i < key.values.length; i++) {
                        if (i > 0) sb += "; ";
                        sb += key.getValue(i, true);
                    }
                    if (this._ng.valueFields.length > 1 &&
                        key.valueFields && key.valueFields.length > 0) {
                        sb += '; ' + key.valueFields[key._valueFieldIndex].header;
                    }
                    break;
            }
            return sb;
        }

        private _getChartTitle() {

            // no title? no work
            if (!this.showTitle) {
                return null;
            }

            // build chart title
            var ng = this._ng,
                value = this._getTitle(ng.valueFields),
                rows = this._getTitle(ng.rowFields),
                cols = this._getTitle(ng.columnFields);

            var title = '';
            if (this._dataItms.length > 0) {
                title = format('{value} {by} {rows}', {
                    value: value,
                    by: culture.olap.PivotChart.by,
                    rows: rows
                });
                if (cols) {
                    title += format(' {and} {cols}', {
                        and: culture.olap.PivotChart.and,
                        cols: cols
                    });
                }
            }
            return title;
        }

        private _getTitle(fields: PivotFieldCollection) {
            var sb = '';
            for (var i = 0; i < fields.length; i++) {
                if (sb.length > 0) sb += '; ';
                sb += fields[i].header;
            }
            return sb;
        }

        private _isTotalColumn(colKey: string): boolean {
            var kVals = colKey.split(';');
            if (kVals && (kVals.length - 2 < this._ng.columnFields.length)) {
                return true;
            }
            return false;
        }

        private _isTotalRow(rowKey: _PivotKey): boolean {
            if (rowKey.values.length < this._ng.rowFields.length) {
                return true;
            }
            return false;
        }

        private _isPieChart(): boolean {
            return this._chartType == PivotChartType.Pie;
        }

        private _isBarChart(): boolean {
            return this._chartType == PivotChartType.Bar;
        }

        private _getMergeIndex(key1: _PivotKey, key2: _PivotKey) {
            var index = -1;
            if (key1 != null && key2 != null &&
                key1.values.length == key2.values.length &&
                key1.values.length == key1.fields.length &&
                key2.values.length == key2.fields.length) {
                for (var i = 0; i < key1.values.length; i++) {
                    var v1 = key1.getValue(i, true);
                    var v2 = key2.getValue(i, true);
                    if (v1 == v2) {
                        index = i;
                    }
                    else {
                        return index;
                    }
                }
            }
            return index;
        }

        private _getOffsetWidth(labels: any): number {
            var offsetWidth = 0;
            if (labels.length <= 1) {
                return offsetWidth;
            }
            for (var i = 0; i < labels.length - 1; i++) {
                offsetWidth += labels[i].width;
            }
            return offsetWidth;
        }
    }
}
