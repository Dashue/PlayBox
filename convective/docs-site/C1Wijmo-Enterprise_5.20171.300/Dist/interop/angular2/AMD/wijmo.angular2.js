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
///<amd-module name='wijmo/wijmo.metaFactory'/>
define("wijmo/wijmo.metaFactory", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<wijmo-soft-import from="wijmo.chart.analytics"/>
    ///<wijmo-soft-import from="wijmo.chart.animation"/>
    ///<wijmo-soft-import from="wijmo.chart.annotation"/>
    ///<wijmo-soft-import from="wijmo.chart.finance.analytics"/>
    ///<wijmo-soft-import from="wijmo.chart.finance"/>
    ///<wijmo-soft-import from="wijmo.chart.hierarchical"/>
    ///<wijmo-soft-import from="wijmo.chart.interaction"/>
    ///<wijmo-soft-import from="wijmo.chart.radar"/>
    ///<wijmo-soft-import from="wijmo.chart"/>
    ///<wijmo-soft-import from="wijmo.gauge"/>
    ///<wijmo-soft-import from="wijmo.grid.detail"/>
    ///<wijmo-soft-import from="wijmo.grid.filter"/>
    ///<wijmo-soft-import from="wijmo.grid.grouppanel"/>
    ///<wijmo-soft-import from="wijmo.grid.multirow"/>
    ///<wijmo-soft-import from="wijmo.grid.pdf"/>
    ///<wijmo-soft-import from="wijmo.grid.sheet"/>
    ///<wijmo-soft-import from="wijmo.grid"/>
    ///<wijmo-soft-import from="wijmo.grid.xlsx"/>
    ///<wijmo-soft-import from="wijmo.input"/>
    ///<wijmo-soft-import from="wijmo.metaFactory"/>
    ///<wijmo-soft-import from="wijmo.odata"/>
    ///<wijmo-soft-import from="wijmo.olap"/>
    ///<wijmo-soft-import from="wijmo.pdf"/>
    ///<wijmo-soft-import from="wijmo.xlsx"/>
    ///<wijmo-soft-import from="wijmo.viewer"/>
    ///<wijmo-soft-import from="wijmo.nav"/>
    var wj;
    (function (wj) {
        // prevent double loading
        //if (wijmo && wijmo.interop) {
        //    return;
        //}
        var interop;
        (function (interop) {
            /*
                Represents shared metadata (control properties/events descriptions) used by interop services like
                Angular directives and Knockout custom bindings.
    
                Control metadata is retrieved using the getMetaData method by passing the control's metaDataId (see the
                method description for details).
    
                Descriptor objects are created using the CreateProp, CreateEvent and CreateComplexProp static methods.
    
                The specific interop service should create a class derived from ControlMetaFactory and override these methods to
                create descriptors of the platform specific types (see the wijmo.angular.MetaFactory class as an example).
    
                To initialize platform specific properties of the descriptors an interop services can use the findProp, findEvent and
                findComplexProp methods to find a necessary descriptor object by name.
            */
            var ControlMetaFactory = (function () {
                function ControlMetaFactory() {
                }
                // Creates a property descriptor object. A specific interop service should override this method in the derived
                // metadata factory class to create platform specific descriptor object.
                ControlMetaFactory.CreateProp = function (propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority) {
                    return new PropDescBase(propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority);
                };
                // Creates an event descriptor object. A specific interop service should override this method in the derived
                // metadata factory class to create platform specific descriptor object.
                ControlMetaFactory.CreateEvent = function (eventName, isPropChanged) {
                    return new EventDescBase(eventName, isPropChanged);
                };
                // Creates a complex property descriptor object. A specific interop service should override this method in the derived
                // metadata factory class to create platform specific descriptor object.
                ControlMetaFactory.CreateComplexProp = function (propertyName, isArray, ownsObject) {
                    return new ComplexPropDescBase(propertyName, isArray, ownsObject);
                };
                // Finds a property descriptor by the property name in the specified array.
                ControlMetaFactory.findProp = function (propName, props) {
                    return this.findInArr(props, 'propertyName', propName);
                };
                // Finds an event descriptor by the event name in the specified array.
                ControlMetaFactory.findEvent = function (eventName, events) {
                    return this.findInArr(events, 'eventName', eventName);
                };
                // Finds a complex property descriptor by the property name in the specified array.
                ControlMetaFactory.findComplexProp = function (propName, props) {
                    return this.findInArr(props, 'propertyName', propName);
                };
                /*
                    Returns metadata for the control by its metadata ID.In the most cases the control type (constructor function)
                    is used as metadata ID. In cases where this is not applicable an arbitrary object can be used as an ID, e.g.
                    'MenuItem' string is used as the ID for Menu Item.
    
                    The sets of descriptors returned for the specific metadata ID take into account the controls inheritance chain
                    and include metadata defined for the control's base classes.
                    In case of a control that has no a base class metadata you create its metadata object with a constructor:
                    return new MetaDataBase(... descriptor arrays ...);
    
                    If the control has the base control metadata then you create its metadata object by a recursive call to
                    the getMetaData method with the base control's metadata ID passed, and add the controls own metadata to
                    the returned object using the 'add' method. E.g. for the ComboBox derived from the DropDown this looks like:
                    return this.getMetaData(wijmo.input.DropDown).add(... descriptor arrays ...);
    
                    The specific platforms provide the following implementations of the metadata ID support:
    
                    Angular
                    =======
                    The WjDirective._getMetaDataId method returns a metadata ID. By default it returns a value of the
                    WjDirective._controlConstructor property. Because of this approach it's reasonable to override the
                    _controlConstructor property even in the abstract classes like WjDropDown, in this case it's not necessary
                    to override the _getMetaDataId method itself.
                    ----------------
                    WARNING: if you override the _getMetaDataId method, don't forget to override it in the derived classes!
                    ----------------
                    You usually need to override the _getMetaDataId method only for classes like WjMenuItem and WjCollectionViewNavigator
                    for which the _controlConstructor as an ID approach doesn't work.
    
                    Knockout
                    ========
                    TBD
                */
                ControlMetaFactory.getMetaData = function (metaDataId) {
                    switch (metaDataId) {
                        // wijmo.Control *************************************************************
                        case wijmo.Control:
                            return new MetaDataBase([
                                this.CreateProp('isDisabled', PropertyType.Boolean),
                            ], [
                                this.CreateEvent('gotFocus'),
                                this.CreateEvent('lostFocus')
                            ]);
                        // wijmo.input *************************************************************
                        case wijmo.input && wijmo.input.DropDown:
                            return this.getMetaData(wijmo.Control).add([
                                this.CreateProp('isDroppedDown', PropertyType.Boolean, 'isDroppedDownChanged'),
                                this.CreateProp('showDropDownButton', PropertyType.Boolean),
                                this.CreateProp('autoExpandSelection', PropertyType.Boolean),
                                this.CreateProp('placeholder', PropertyType.String),
                                this.CreateProp('dropDownCssClass', PropertyType.String),
                                this.CreateProp('isAnimated', PropertyType.Boolean),
                                this.CreateProp('isReadOnly', PropertyType.Boolean),
                                this.CreateProp('isRequired', PropertyType.Boolean),
                                this.CreateProp('text', PropertyType.String, 'textChanged', null, true, 1000) // textChanged
                            ], [
                                this.CreateEvent('isDroppedDownChanging'),
                                this.CreateEvent('isDroppedDownChanged', true),
                                this.CreateEvent('textChanged', true)
                            ]);
                        case wijmo.input && wijmo.input.ComboBox:
                            return this.getMetaData(wijmo.input.DropDown).add([
                                this.CreateProp('displayMemberPath', PropertyType.String),
                                this.CreateProp('selectedValuePath', PropertyType.String),
                                this.CreateProp('headerPath', PropertyType.String),
                                this.CreateProp('isContentHtml', PropertyType.Boolean),
                                this.CreateProp('isEditable', PropertyType.Boolean),
                                this.CreateProp('maxDropDownHeight', PropertyType.Number),
                                this.CreateProp('maxDropDownWidth', PropertyType.Number),
                                this.CreateProp('itemFormatter', PropertyType.Function),
                                this.CreateProp('itemsSource', PropertyType.Any, '', null, true, 900),
                                this.CreateProp('selectedIndex', PropertyType.Number, 'selectedIndexChanged', null, true, 1000),
                                this.CreateProp('selectedItem', PropertyType.Any, 'selectedIndexChanged', null, true, 1000),
                                this.CreateProp('selectedValue', PropertyType.Any, 'selectedIndexChanged', null, true, 1000),
                            ], [
                                this.CreateEvent('formatItem'),
                                this.CreateEvent('selectedIndexChanged', true)
                            ])
                                .addOptions({ ngModelProperty: 'selectedValue' });
                        case wijmo.input && wijmo.input.AutoComplete:
                            return this.getMetaData(wijmo.input.ComboBox).add([
                                this.CreateProp('delay', PropertyType.Number),
                                this.CreateProp('maxItems', PropertyType.Number),
                                this.CreateProp('minLength', PropertyType.Number),
                                this.CreateProp('cssMatch', PropertyType.String),
                                this.CreateProp('itemsSourceFunction', PropertyType.Function),
                                this.CreateProp('searchMemberPath', PropertyType.String)
                            ]);
                        case wijmo.input && wijmo.input.Calendar:
                            return this.getMetaData(wijmo.Control).add([
                                this.CreateProp('monthView', PropertyType.Boolean),
                                this.CreateProp('showHeader', PropertyType.Boolean),
                                this.CreateProp('itemFormatter', PropertyType.Function),
                                this.CreateProp('itemValidator', PropertyType.Function),
                                this.CreateProp('firstDayOfWeek', PropertyType.Number),
                                this.CreateProp('max', PropertyType.Date),
                                this.CreateProp('min', PropertyType.Date),
                                this.CreateProp('selectionMode', PropertyType.Enum, '', wijmo.input.DateSelectionMode),
                                this.CreateProp('isReadOnly', PropertyType.Boolean),
                                this.CreateProp('value', PropertyType.Date, 'valueChanged'),
                                // displayMonth should go after 'value'!
                                this.CreateProp('displayMonth', PropertyType.Date, 'displayMonthChanged'),
                            ], [
                                this.CreateEvent('valueChanged', true),
                                this.CreateEvent('displayMonthChanged', true),
                                this.CreateEvent('formatItem', false)
                            ])
                                .addOptions({ ngModelProperty: 'value' });
                        case wijmo.input && wijmo.input.ColorPicker:
                            return this.getMetaData(wijmo.Control).add([
                                this.CreateProp('showAlphaChannel', PropertyType.Boolean),
                                this.CreateProp('showColorString', PropertyType.Boolean),
                                this.CreateProp('palette', PropertyType.Any),
                                this.CreateProp('value', PropertyType.String, 'valueChanged')
                            ], [
                                this.CreateEvent('valueChanged', true)
                            ])
                                .addOptions({ ngModelProperty: 'value' });
                        case wijmo.input && wijmo.input.ListBox:
                            return this.getMetaData(wijmo.Control).add([
                                this.CreateProp('isContentHtml', PropertyType.Boolean),
                                this.CreateProp('maxHeight', PropertyType.Number),
                                this.CreateProp('selectedValuePath', PropertyType.String),
                                this.CreateProp('itemFormatter', PropertyType.Function),
                                this.CreateProp('displayMemberPath', PropertyType.String),
                                this.CreateProp('checkedMemberPath', PropertyType.String),
                                this.CreateProp('itemsSource', PropertyType.Any),
                                this.CreateProp('selectedIndex', PropertyType.Number, 'selectedIndexChanged'),
                                this.CreateProp('selectedItem', PropertyType.Any, 'selectedIndexChanged'),
                                this.CreateProp('selectedValue', PropertyType.Any, 'selectedIndexChanged'),
                                this.CreateProp('checkedItems', PropertyType.Any, 'checkedItemsChanged'),
                            ], [
                                this.CreateEvent('formatItem', false),
                                this.CreateEvent('itemsChanged', true),
                                //AlexI: isPropChanged must be true, in order to run a digest and update bound expressions
                                this.CreateEvent('itemChecked', true),
                                this.CreateEvent('selectedIndexChanged', true),
                                this.CreateEvent('checkedItemsChanged', true),
                            ])
                                .addOptions({ ngModelProperty: 'selectedValue' });
                        case 'ItemTemplate':
                            return new MetaDataBase([], [], [], undefined, undefined, undefined, 'owner');
                        case wijmo.input && wijmo.input.Menu:
                            return this.getMetaData(wijmo.input.ComboBox).add([
                                this.CreateProp('header', PropertyType.String),
                                this.CreateProp('commandParameterPath', PropertyType.String),
                                this.CreateProp('commandPath', PropertyType.String),
                                this.CreateProp('isButton', PropertyType.Boolean),
                                //this.CreateProp('value', PropertyType.Any, 'selectedIndexChanged', null, false, 1000)
                                this.CreateProp('value', PropertyType.Any, 'itemClicked', null, false, 1000)
                            ], [
                                this.CreateEvent('itemClicked')
                            ]);
                        case 'MenuItem':
                            return new MetaDataBase([
                                //TBD: check whether they should be two-way
                                //this.CreateProp('value', PropertyType.String, BindingMode.TwoWay),
                                //this.CreateProp('cmd', PropertyType.String, BindingMode.TwoWay),
                                //this.CreateProp('cmdParam', PropertyType.String, BindingMode.TwoWay)
                                this.CreateProp('value', PropertyType.Any, ''),
                                this.CreateProp('cmd', PropertyType.Any, ''),
                                this.CreateProp('cmdParam', PropertyType.Any, '')
                            ], [], [], 'itemsSource', true);
                        case 'MenuSeparator':
                            return new MetaDataBase([], [], [], 'itemsSource', true);
                        case wijmo.input && wijmo.input.InputDate:
                            return this.getMetaData(wijmo.input.DropDown).add([
                                this.CreateProp('selectionMode', PropertyType.Enum, '', wijmo.input.DateSelectionMode),
                                this.CreateProp('format', PropertyType.String),
                                this.CreateProp('mask', PropertyType.String),
                                this.CreateProp('max', PropertyType.Date),
                                this.CreateProp('min', PropertyType.Date),
                                this.CreateProp('inputType', PropertyType.String),
                                this.CreateProp('value', PropertyType.Date, 'valueChanged', null, true, 1000),
                                this.CreateProp('itemValidator', PropertyType.Function),
                                this.CreateProp('itemFormatter', PropertyType.Function)
                            ], [
                                this.CreateEvent('valueChanged', true)
                            ])
                                .addOptions({ ngModelProperty: 'value' });
                        case wijmo.input && wijmo.input.InputDateTime:
                            return this.getMetaData(wijmo.input.InputDate).add([
                                this.CreateProp('timeMax', PropertyType.Date),
                                this.CreateProp('timeMin', PropertyType.Date),
                                this.CreateProp('timeStep', PropertyType.Number),
                                this.CreateProp('timeFormat', PropertyType.String),
                            ])
                                .addOptions({ ngModelProperty: 'value' });
                        case wijmo.input && wijmo.input.InputNumber:
                            return this.getMetaData(wijmo.Control).add([
                                this.CreateProp('showSpinner', PropertyType.Boolean),
                                this.CreateProp('max', PropertyType.Number),
                                this.CreateProp('min', PropertyType.Number),
                                this.CreateProp('step', PropertyType.Number),
                                this.CreateProp('isRequired', PropertyType.Boolean),
                                this.CreateProp('placeholder', PropertyType.String),
                                this.CreateProp('inputType', PropertyType.String),
                                this.CreateProp('format', PropertyType.String),
                                this.CreateProp('isReadOnly', PropertyType.Boolean),
                                this.CreateProp('value', PropertyType.Number, 'valueChanged'),
                                this.CreateProp('text', PropertyType.String, 'textChanged')
                            ], [
                                this.CreateEvent('valueChanged', true),
                                this.CreateEvent('textChanged', true)
                            ])
                                .addOptions({ ngModelProperty: 'value' });
                        case wijmo.input && wijmo.input.InputMask:
                            return this.getMetaData(wijmo.Control).add([
                                this.CreateProp('mask', PropertyType.String),
                                this.CreateProp('isRequired', PropertyType.Boolean),
                                this.CreateProp('promptChar', PropertyType.String),
                                this.CreateProp('placeholder', PropertyType.String),
                                this.CreateProp('rawValue', PropertyType.String, 'valueChanged'),
                                this.CreateProp('value', PropertyType.String, 'valueChanged')
                            ], [
                                this.CreateEvent('valueChanged', true),
                            ])
                                .addOptions({ ngModelProperty: 'value' });
                        case wijmo.input && wijmo.input.InputTime:
                            return this.getMetaData(wijmo.input.ComboBox).add([
                                this.CreateProp('max', PropertyType.Date),
                                this.CreateProp('min', PropertyType.Date),
                                this.CreateProp('step', PropertyType.Number),
                                this.CreateProp('format', PropertyType.String),
                                this.CreateProp('mask', PropertyType.String),
                                this.CreateProp('inputType', PropertyType.String),
                                this.CreateProp('value', PropertyType.Date, 'valueChanged', null, true, 1000),
                            ], [
                                this.CreateEvent('valueChanged', true)
                            ])
                                .addOptions({ ngModelProperty: 'value' });
                        case wijmo.input && wijmo.input.InputColor:
                            return this.getMetaData(wijmo.input.DropDown).add([
                                this.CreateProp('showAlphaChannel', PropertyType.Boolean),
                                this.CreateProp('value', PropertyType.String, 'valueChanged')
                            ], [
                                this.CreateEvent('valueChanged', true)
                            ])
                                .addOptions({ ngModelProperty: 'value' });
                        case wijmo.input && wijmo.input.Popup:
                            return this.getMetaData(wijmo.Control).add([
                                this.CreateProp('owner', PropertyType.String),
                                this.CreateProp('showTrigger', PropertyType.Enum, '', wijmo.input.PopupTrigger),
                                this.CreateProp('hideTrigger', PropertyType.Enum, '', wijmo.input.PopupTrigger),
                                this.CreateProp('fadeIn', PropertyType.Boolean),
                                this.CreateProp('fadeOut', PropertyType.Boolean),
                                this.CreateProp('dialogResultEnter', PropertyType.String),
                                this.CreateProp('modal', PropertyType.Boolean),
                            ], [
                                this.CreateEvent('showing'),
                                this.CreateEvent('shown'),
                                this.CreateEvent('hiding'),
                                this.CreateEvent('hidden'),
                            ]);
                        case wijmo.input && wijmo.input.MultiSelect:
                            return this.getMetaData(wijmo.input.ComboBox).add([
                                this.CreateProp('checkedMemberPath', PropertyType.String),
                                this.CreateProp('maxHeaderItems', PropertyType.Number),
                                this.CreateProp('headerFormat', PropertyType.String),
                                this.CreateProp('headerFormatter', PropertyType.Function),
                                // initialized after itemsSource but before selectedXXX
                                this.CreateProp('checkedItems', PropertyType.Any, 'checkedItemsChanged', BindingMode.TwoWay, true, 950),
                            ], [
                                this.CreateEvent('checkedItemsChanged', true)
                            ])
                                .addOptions({ ngModelProperty: 'checkedItems' });
                        case 'CollectionViewNavigator':
                            return new MetaDataBase([
                                this.CreateProp('cv', PropertyType.Any)
                            ]);
                        case 'CollectionViewPager':
                            return new MetaDataBase([
                                this.CreateProp('cv', PropertyType.Any)
                            ]);
                        case wijmo.input && wijmo.input.MultiAutoComplete:
                            return this.getMetaData(wijmo.input.AutoComplete).add([
                                this.CreateProp('maxSelectedItems', PropertyType.Number),
                                this.CreateProp('selectedMemberPath', PropertyType.String, '', null, true, 950),
                                this.CreateProp('selectedItems', PropertyType.Any, 'selectedItemsChanged'),
                            ], [
                                this.CreateEvent('selectedItemsChanged', true)
                            ])
                                .addOptions({ ngModelProperty: 'selectedItems' });
                        // wijmo.grid *************************************************************
                        case wijmo.grid && wijmo.grid.FlexGrid:
                            return this.getMetaData(wijmo.Control).add([
                                this.CreateProp('newRowAtTop', PropertyType.Boolean),
                                this.CreateProp('allowAddNew', PropertyType.Boolean),
                                this.CreateProp('allowDelete', PropertyType.Boolean),
                                this.CreateProp('allowDragging', PropertyType.Enum, '', wijmo.grid.AllowDragging),
                                this.CreateProp('allowMerging', PropertyType.Enum, '', wijmo.grid.AllowMerging),
                                this.CreateProp('allowResizing', PropertyType.Enum, '', wijmo.grid.AllowResizing),
                                this.CreateProp('allowSorting', PropertyType.Boolean),
                                this.CreateProp('autoSizeMode', PropertyType.Enum, '', wijmo.grid.AutoSizeMode),
                                this.CreateProp('autoGenerateColumns', PropertyType.Boolean),
                                this.CreateProp('childItemsPath', PropertyType.Any),
                                this.CreateProp('groupHeaderFormat', PropertyType.String),
                                this.CreateProp('headersVisibility', PropertyType.Enum, '', wijmo.grid.HeadersVisibility),
                                this.CreateProp('showSelectedHeaders', PropertyType.Enum, '', wijmo.grid.HeadersVisibility),
                                this.CreateProp('showMarquee', PropertyType.Boolean),
                                this.CreateProp('itemFormatter', PropertyType.Function),
                                this.CreateProp('isReadOnly', PropertyType.Boolean),
                                this.CreateProp('imeEnabled', PropertyType.Boolean),
                                this.CreateProp('mergeManager', PropertyType.Any),
                                // REVIEW: This breaks the grid too, see TFS 82636
                                //this.CreateProp('scrollPosition', PropertyType.Any, '='),
                                // REVIEW: this screws up the grid when selectionMode == ListBox.
                                // When the directive applies a selection to the grid and selectionMode == ListBox,
                                // the grid clears the row[x].isSelected properties of rows that are not in the selection.
                                // I think a possible fix would be for the directive to not set the grid's selection if it
                                // is the same range as the current selection property. I cannot do that in the grid because
                                // when the user does it, this side-effect is expected.
                                //this.CreateProp('selection', PropertyType.Any, '='),
                                //this.CreateProp('columnLayout', ...),
                                this.CreateProp('selectionMode', PropertyType.Enum, '', wijmo.grid.SelectionMode),
                                this.CreateProp('showGroups', PropertyType.Boolean),
                                this.CreateProp('showSort', PropertyType.Boolean),
                                this.CreateProp('showAlternatingRows', PropertyType.Boolean),
                                this.CreateProp('showErrors', PropertyType.Boolean),
                                this.CreateProp('validateEdits', PropertyType.Boolean),
                                this.CreateProp('treeIndent', PropertyType.Number),
                                this.CreateProp('itemsSource', PropertyType.Any),
                                this.CreateProp('autoClipboard', PropertyType.Boolean),
                                this.CreateProp('frozenRows', PropertyType.Number),
                                this.CreateProp('frozenColumns', PropertyType.Number),
                                this.CreateProp('deferResizing', PropertyType.Boolean),
                                this.CreateProp('sortRowIndex', PropertyType.Number),
                                this.CreateProp('stickyHeaders', PropertyType.Boolean),
                                this.CreateProp('preserveSelectedState', PropertyType.Boolean),
                                this.CreateProp('preserveOutlineState', PropertyType.Boolean)
                            ], [
                                // Cell events
                                this.CreateEvent('beginningEdit'),
                                this.CreateEvent('cellEditEnded'),
                                this.CreateEvent('cellEditEnding'),
                                this.CreateEvent('prepareCellForEdit'),
                                this.CreateEvent('formatItem'),
                                // Column events
                                this.CreateEvent('resizingColumn'),
                                this.CreateEvent('resizedColumn'),
                                this.CreateEvent('autoSizingColumn'),
                                this.CreateEvent('autoSizedColumn'),
                                this.CreateEvent('draggingColumn'),
                                this.CreateEvent('draggingColumnOver'),
                                this.CreateEvent('draggedColumn'),
                                this.CreateEvent('sortingColumn'),
                                this.CreateEvent('sortedColumn'),
                                // Row Events
                                this.CreateEvent('resizingRow'),
                                this.CreateEvent('resizedRow'),
                                this.CreateEvent('autoSizingRow'),
                                this.CreateEvent('autoSizedRow'),
                                this.CreateEvent('draggingRow'),
                                this.CreateEvent('draggingRowOver'),
                                this.CreateEvent('draggedRow'),
                                this.CreateEvent('deletingRow'),
                                this.CreateEvent('loadingRows'),
                                this.CreateEvent('loadedRows'),
                                this.CreateEvent('rowEditStarting'),
                                this.CreateEvent('rowEditStarted'),
                                this.CreateEvent('rowEditEnding'),
                                this.CreateEvent('rowEditEnded'),
                                this.CreateEvent('rowAdded'),
                                this.CreateEvent('groupCollapsedChanged'),
                                this.CreateEvent('groupCollapsedChanging'),
                                this.CreateEvent('itemsSourceChanged', true),
                                this.CreateEvent('selectionChanging'),
                                this.CreateEvent('selectionChanged', true),
                                this.CreateEvent('scrollPositionChanged', false),
                                this.CreateEvent('updatingView'),
                                this.CreateEvent('updatedView'),
                                this.CreateEvent('updatingLayout'),
                                this.CreateEvent('updatedLayout'),
                                // Clipboard events
                                this.CreateEvent('pasting'),
                                this.CreateEvent('pasted'),
                                this.CreateEvent('pastingCell'),
                                this.CreateEvent('pastedCell'),
                                this.CreateEvent('copying'),
                                this.CreateEvent('copied')
                            ]);
                        case wijmo.grid && wijmo.grid.Column:
                            return new MetaDataBase([
                                this.CreateProp('name', PropertyType.String),
                                this.CreateProp('dataMap', PropertyType.Any),
                                this.CreateProp('dataType', PropertyType.Enum, '', wijmo.DataType),
                                this.CreateProp('binding', PropertyType.String),
                                this.CreateProp('sortMemberPath', PropertyType.String),
                                this.CreateProp('format', PropertyType.String),
                                this.CreateProp('header', PropertyType.String),
                                this.CreateProp('width', PropertyType.Number),
                                this.CreateProp('minWidth', PropertyType.Number),
                                this.CreateProp('maxWidth', PropertyType.Number),
                                this.CreateProp('align', PropertyType.String),
                                this.CreateProp('allowDragging', PropertyType.Boolean),
                                this.CreateProp('allowSorting', PropertyType.Boolean),
                                this.CreateProp('allowResizing', PropertyType.Boolean),
                                this.CreateProp('allowMerging', PropertyType.Boolean),
                                this.CreateProp('aggregate', PropertyType.Enum, '', wijmo.Aggregate),
                                this.CreateProp('isReadOnly', PropertyType.Boolean),
                                this.CreateProp('cssClass', PropertyType.String),
                                this.CreateProp('isContentHtml', PropertyType.Boolean),
                                this.CreateProp('isSelected', PropertyType.Boolean, 'grid.selectionChanged'),
                                this.CreateProp('visible', PropertyType.Boolean),
                                this.CreateProp('wordWrap', PropertyType.Boolean),
                                this.CreateProp('mask', PropertyType.String),
                                this.CreateProp('inputType', PropertyType.String),
                                this.CreateProp('isRequired', PropertyType.Boolean),
                                this.CreateProp('showDropDown', PropertyType.Boolean),
                                this.CreateProp('dropDownCssClass', PropertyType.String),
                            ], [], [], 'columns', true);
                        case 'FlexGridCellTemplate':
                            return new MetaDataBase([
                                this.CreateProp('cellType', PropertyType.String, '', null, false),
                                this.CreateProp('cellOverflow', PropertyType.String, ''),
                            ], [], [], undefined, undefined, undefined, 'owner');
                        case wijmo.grid && wijmo.grid.filter && wijmo.grid.filter.FlexGridFilter:
                            return new MetaDataBase([
                                this.CreateProp('showFilterIcons', PropertyType.Boolean),
                                this.CreateProp('showSortButtons', PropertyType.Boolean),
                                this.CreateProp('defaultFilterType', PropertyType.Enum, '', wijmo.grid.filter.FilterType),
                                this.CreateProp('filterColumns', PropertyType.Any),
                            ], [
                                this.CreateEvent('filterChanging'),
                                this.CreateEvent('filterChanged'),
                                this.CreateEvent('filterApplied')
                            ], [], undefined, undefined, undefined, '');
                        case wijmo.grid && wijmo.grid.grouppanel && wijmo.grid.grouppanel.GroupPanel:
                            return this.getMetaData(wijmo.Control).add([
                                this.CreateProp('hideGroupedColumns', PropertyType.Boolean),
                                this.CreateProp('maxGroups', PropertyType.Number),
                                this.CreateProp('placeholder', PropertyType.String),
                                this.CreateProp('grid', PropertyType.Any),
                            ]);
                        case wijmo.grid && wijmo.grid.detail && wijmo.grid.detail.FlexGridDetailProvider:
                            return new MetaDataBase([
                                this.CreateProp('maxHeight', PropertyType.Number),
                                this.CreateProp('detailVisibilityMode', PropertyType.Enum, '', wijmo.grid.detail.DetailVisibilityMode),
                                this.CreateProp('rowHasDetail', PropertyType.Function),
                                this.CreateProp('isAnimated', PropertyType.Boolean),
                            ], [], [], undefined, undefined, undefined, '');
                        case wijmo.grid && wijmo.grid.sheet && wijmo.grid.sheet.FlexSheet:
                            return this.getMetaData(wijmo.grid.FlexGrid).add([
                                this.CreateProp('isTabHolderVisible', PropertyType.Boolean),
                                this.CreateProp('selectedSheetIndex', PropertyType.Number, 'selectedSheetChanged'),
                            ], [
                                this.CreateEvent('selectedSheetChanged', true),
                                this.CreateEvent('draggingRowColumn'),
                                this.CreateEvent('droppingRowColumn'),
                                this.CreateEvent('loaded'),
                                this.CreateEvent('unknownFunction'),
                                this.CreateEvent('sheetCleared')
                            ]);
                        case wijmo.grid && wijmo.grid.sheet && wijmo.grid.sheet.Sheet:
                            return new MetaDataBase([
                                this.CreateProp('name', PropertyType.String),
                                this.CreateProp('itemsSource', PropertyType.Any),
                                this.CreateProp('visible', PropertyType.Boolean),
                                this.CreateProp('rowCount', PropertyType.Number, '', null, false),
                                this.CreateProp('columnCount', PropertyType.Number, '', null, false)
                            ], [
                                this.CreateEvent('nameChanged'),
                            ])
                                .addOptions({ parentReferenceProperty: '' });
                        case wijmo.grid && wijmo.grid.multirow && wijmo.grid.multirow.MultiRow:
                            return this.getMetaData(wijmo.grid.FlexGrid).add([
                                this.CreateProp('layoutDefinition', PropertyType.Any),
                                this.CreateProp('centerHeadersVertically', PropertyType.Boolean),
                                this.CreateProp('collapsedHeaders', PropertyType.Boolean),
                                this.CreateProp('showHeaderCollapseButton', PropertyType.Boolean)
                            ]);
                        // Chart *************************************************************
                        case wijmo.chart && wijmo.chart.FlexChartBase:
                            return this.getMetaData(wijmo.Control).add([
                                this.CreateProp('binding', PropertyType.String),
                                this.CreateProp('footer', PropertyType.String),
                                this.CreateProp('header', PropertyType.String),
                                this.CreateProp('selectionMode', PropertyType.Enum, '', wijmo.chart.SelectionMode),
                                this.CreateProp('palette', PropertyType.Any),
                                this.CreateProp('plotMargin', PropertyType.Any),
                                this.CreateProp('footerStyle', PropertyType.Any),
                                this.CreateProp('headerStyle', PropertyType.Any),
                                this.CreateProp('tooltipContent', PropertyType.String, '', null, false),
                                this.CreateProp('itemsSource', PropertyType.Any)
                            ], [
                                this.CreateEvent('rendering'),
                                this.CreateEvent('rendered'),
                                this.CreateEvent('selectionChanged', true),
                            ]);
                        case wijmo.chart && wijmo.chart.FlexChartCore:
                            return this.getMetaData(wijmo.chart.FlexChartBase).add([
                                this.CreateProp('bindingX', PropertyType.String),
                                // this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.ChartType),
                                this.CreateProp('interpolateNulls', PropertyType.Boolean),
                                this.CreateProp('legendToggle', PropertyType.Boolean),
                                this.CreateProp('symbolSize', PropertyType.Number),
                                this.CreateProp('options', PropertyType.Any),
                                this.CreateProp('selection', PropertyType.Any, 'selectionChanged'),
                                this.CreateProp('itemFormatter', PropertyType.Function),
                                this.CreateProp('labelContent', PropertyType.String, '', null, false),
                            ], [
                                this.CreateEvent('seriesVisibilityChanged'),
                            ], [
                                this.CreateComplexProp('axisX', false, false),
                                this.CreateComplexProp('axisY', false, false),
                                this.CreateComplexProp('axes', true),
                                this.CreateComplexProp('plotAreas', true)
                            ]);
                        case wijmo.chart && wijmo.chart.FlexChart:
                            return this.getMetaData(wijmo.chart.FlexChartCore).add([
                                this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.ChartType),
                                this.CreateProp('rotated', PropertyType.Boolean),
                                this.CreateProp('stacking', PropertyType.Enum, '', wijmo.chart.Stacking),
                            ]);
                        case wijmo.chart && wijmo.chart.FlexPie:
                            return this.getMetaData(wijmo.chart.FlexChartBase).add([
                                this.CreateProp('bindingName', PropertyType.String),
                                this.CreateProp('innerRadius', PropertyType.Number),
                                this.CreateProp('isAnimated', PropertyType.Boolean),
                                this.CreateProp('offset', PropertyType.Number),
                                this.CreateProp('reversed', PropertyType.Boolean),
                                this.CreateProp('startAngle', PropertyType.Number),
                                this.CreateProp('selectedItemPosition', PropertyType.Enum, '', wijmo.chart.Position),
                                this.CreateProp('selectedItemOffset', PropertyType.Number),
                                this.CreateProp('itemFormatter', PropertyType.Function),
                                this.CreateProp('labelContent', PropertyType.String, '', null, false),
                            ]);
                        case wijmo.chart && wijmo.chart.FlexPie && wijmo.chart.hierarchical && wijmo.chart.hierarchical.Sunburst:
                            return this.getMetaData(wijmo.chart.FlexChartBase).add([
                                this.CreateProp('bindingName', PropertyType.Any),
                                this.CreateProp('innerRadius', PropertyType.Number),
                                this.CreateProp('isAnimated', PropertyType.Boolean),
                                this.CreateProp('offset', PropertyType.Number),
                                this.CreateProp('reversed', PropertyType.Boolean),
                                this.CreateProp('startAngle', PropertyType.Number),
                                this.CreateProp('selectedItemPosition', PropertyType.Enum, '', wijmo.chart.Position),
                                this.CreateProp('selectedItemOffset', PropertyType.Number),
                                this.CreateProp('itemFormatter', PropertyType.Function),
                                this.CreateProp('labelContent', PropertyType.String, '', null, false),
                                this.CreateProp('childItemsPath', PropertyType.Any)
                            ]);
                        case wijmo.chart && wijmo.chart.hierarchical && wijmo.chart.hierarchical.TreeMap:
                            return this.getMetaData(wijmo.chart.FlexChartBase).add([
                                this.CreateProp('bindingName', PropertyType.Any),
                                this.CreateProp('maxDepth', PropertyType.Number),
                                this.CreateProp('type', PropertyType.Enum, '', wijmo.chart.hierarchical.TreeMapType),
                                this.CreateProp('labelContent', PropertyType.String, '', null, false),
                                this.CreateProp('childItemsPath', PropertyType.Any)
                            ]);
                        case wijmo.chart && wijmo.chart.Axis:
                            return new MetaDataBase([
                                this.CreateProp('axisLine', PropertyType.Boolean),
                                this.CreateProp('format', PropertyType.String),
                                this.CreateProp('labels', PropertyType.Boolean),
                                this.CreateProp('majorGrid', PropertyType.Boolean),
                                this.CreateProp('majorTickMarks', PropertyType.Enum, '', wijmo.chart.TickMark),
                                this.CreateProp('majorUnit', PropertyType.Number),
                                this.CreateProp('max', PropertyType.Number),
                                this.CreateProp('min', PropertyType.Number),
                                this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.Position),
                                this.CreateProp('reversed', PropertyType.Boolean),
                                this.CreateProp('title', PropertyType.String),
                                this.CreateProp('labelAngle', PropertyType.Number),
                                this.CreateProp('minorGrid', PropertyType.Boolean),
                                this.CreateProp('minorTickMarks', PropertyType.Enum, '', wijmo.chart.TickMark),
                                this.CreateProp('minorUnit', PropertyType.Number),
                                this.CreateProp('origin', PropertyType.Number),
                                this.CreateProp('logBase', PropertyType.Number),
                                this.CreateProp('plotArea', PropertyType.Any),
                                this.CreateProp('labelAlign', PropertyType.String),
                                this.CreateProp('name', PropertyType.String),
                                this.CreateProp('overlappingLabels', PropertyType.Enum, '', wijmo.chart.OverlappingLabels),
                                this.CreateProp('labelPadding', PropertyType.Number),
                                this.CreateProp('itemFormatter', PropertyType.Function),
                                this.CreateProp('itemsSource', PropertyType.Any),
                                this.CreateProp('binding', PropertyType.String),
                            ], [
                                this.CreateEvent('rangeChanged'),
                            ], [], 'axes', true); //use wj-property attribute on directive to define axisX or axisY
                        case wijmo.chart && wijmo.chart.Legend:
                            return new MetaDataBase([
                                this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.Position)
                            ], [], [], 'legend', false, false, '');
                        case wijmo.chart && wijmo.chart.DataLabelBase:
                            return new MetaDataBase([
                                this.CreateProp('content', PropertyType.Any, ''),
                                this.CreateProp('border', PropertyType.Boolean),
                            ], [], [], 'dataLabel', false, false);
                        case wijmo.chart && wijmo.chart.DataLabel:
                            return this.getMetaData(wijmo.chart.DataLabelBase).add([
                                this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.LabelPosition),
                            ]);
                        case wijmo.chart && wijmo.chart.PieDataLabel:
                            return this.getMetaData(wijmo.chart.DataLabelBase).add([
                                this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.PieLabelPosition),
                            ]);
                        case wijmo.chart && wijmo.chart.SeriesBase:
                            return new MetaDataBase([
                                this.CreateProp('axisX', PropertyType.Any),
                                this.CreateProp('axisY', PropertyType.Any),
                                this.CreateProp('binding', PropertyType.String),
                                this.CreateProp('bindingX', PropertyType.String),
                                this.CreateProp('cssClass', PropertyType.String),
                                this.CreateProp('name', PropertyType.String),
                                this.CreateProp('style', PropertyType.Any),
                                this.CreateProp('altStyle', PropertyType.Any),
                                this.CreateProp('symbolMarker', PropertyType.Enum, '', wijmo.chart.Marker),
                                this.CreateProp('symbolSize', PropertyType.Number),
                                this.CreateProp('symbolStyle', PropertyType.Any),
                                this.CreateProp('visibility', PropertyType.Enum, 'chart.seriesVisibilityChanged', wijmo.chart.SeriesVisibility),
                                this.CreateProp('itemsSource', PropertyType.Any),
                            ], [
                                this.CreateEvent('rendering'),
                                this.CreateEvent('rendered')
                            ], [
                                this.CreateComplexProp('axisX', false, true),
                                this.CreateComplexProp('axisY', false, true),
                            ], 'series', true);
                        case wijmo.chart && wijmo.chart.Series:
                            return this.getMetaData(wijmo.chart.SeriesBase).add([
                                this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.ChartType)
                            ]);
                        case wijmo.chart && wijmo.chart.LineMarker:
                            return new MetaDataBase([
                                this.CreateProp('isVisible', PropertyType.Boolean),
                                this.CreateProp('seriesIndex', PropertyType.Number),
                                this.CreateProp('horizontalPosition', PropertyType.Number),
                                this.CreateProp('content', PropertyType.Function),
                                this.CreateProp('verticalPosition', PropertyType.Number),
                                this.CreateProp('alignment', PropertyType.Enum, '', wijmo.chart.LineMarkerAlignment),
                                this.CreateProp('lines', PropertyType.Enum, '', wijmo.chart.LineMarkerLines),
                                this.CreateProp('interaction', PropertyType.Enum, '', wijmo.chart.LineMarkerInteraction),
                                this.CreateProp('dragLines', PropertyType.Boolean),
                                this.CreateProp('dragThreshold', PropertyType.Number),
                                this.CreateProp('dragContent', PropertyType.Boolean),
                            ], [
                                this.CreateEvent('positionChanged'),
                            ], [], undefined, undefined, undefined, '');
                        case wijmo.chart && wijmo.chart.DataPoint:
                            return new MetaDataBase([
                                this.CreateProp('x', PropertyType.AnyPrimitive),
                                this.CreateProp('y', PropertyType.AnyPrimitive)
                            ], [], [], '');
                        case wijmo.chart && wijmo.chart.annotation && wijmo.chart.annotation.AnnotationLayer:
                            return new MetaDataBase([], [], [], undefined, undefined, undefined, '');
                        case 'FlexChartAnnotation':
                            return new MetaDataBase([
                                this.CreateProp('type', PropertyType.String, '', null, false),
                                this.CreateProp('attachment', PropertyType.Enum, '', wijmo.chart.annotation.AnnotationAttachment),
                                this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.annotation.AnnotationPosition),
                                this.CreateProp('point', PropertyType.Any),
                                this.CreateProp('seriesIndex', PropertyType.Number),
                                this.CreateProp('pointIndex', PropertyType.Number),
                                this.CreateProp('offset', PropertyType.Any),
                                this.CreateProp('style', PropertyType.Any),
                                this.CreateProp('isVisible', PropertyType.Boolean),
                                this.CreateProp('tooltip', PropertyType.String),
                                this.CreateProp('text', PropertyType.String),
                                this.CreateProp('content', PropertyType.String),
                                this.CreateProp('name', PropertyType.String),
                                this.CreateProp('width', PropertyType.Number),
                                this.CreateProp('height', PropertyType.Number),
                                this.CreateProp('start', PropertyType.Any),
                                this.CreateProp('end', PropertyType.Any),
                                this.CreateProp('radius', PropertyType.Number),
                                this.CreateProp('length', PropertyType.Number),
                                this.CreateProp('href', PropertyType.String)
                            ], [], [
                                this.CreateComplexProp('point', false, true),
                                this.CreateComplexProp('start', false, true),
                                this.CreateComplexProp('end', false, true),
                                this.CreateComplexProp('points', true),
                            ], 'items', true);
                        case wijmo.chart && wijmo.chart.interaction && wijmo.chart.interaction.RangeSelector:
                            return new MetaDataBase([
                                this.CreateProp('isVisible', PropertyType.Boolean),
                                this.CreateProp('min', PropertyType.Number),
                                this.CreateProp('max', PropertyType.Number),
                                this.CreateProp('orientation', PropertyType.Enum, '', wijmo.chart.interaction.Orientation),
                                this.CreateProp('seamless', PropertyType.Boolean),
                                this.CreateProp('minScale', PropertyType.Number),
                                this.CreateProp('maxScale', PropertyType.Number),
                            ], [
                                this.CreateEvent('rangeChanged'),
                            ], [], undefined, undefined, undefined, '');
                        case wijmo.chart && wijmo.chart.interaction && wijmo.chart.interaction.ChartGestures:
                            return new MetaDataBase([
                                this.CreateProp('mouseAction', PropertyType.Enum, '', wijmo.chart.interaction.MouseAction),
                                this.CreateProp('interactiveAxes', PropertyType.Enum, '', wijmo.chart.interaction.InteractiveAxes),
                                this.CreateProp('enable', PropertyType.Boolean),
                                this.CreateProp('scaleX', PropertyType.Number),
                                this.CreateProp('scaleY', PropertyType.Number),
                                this.CreateProp('posX', PropertyType.Number),
                                this.CreateProp('posY', PropertyType.Number),
                            ], [], [], undefined, undefined, undefined, '');
                        case wijmo.chart && wijmo.chart.animation && wijmo.chart.animation.ChartAnimation:
                            return new MetaDataBase([
                                this.CreateProp('animationMode', PropertyType.Enum, '', wijmo.chart.animation.AnimationMode),
                                this.CreateProp('easing', PropertyType.Enum, '', wijmo.chart.animation.Easing),
                                this.CreateProp('duration', PropertyType.Number),
                                this.CreateProp('axisAnimation', PropertyType.Boolean)
                            ], [], [], undefined, undefined, undefined, '');
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.FinancialChart:
                            return this.getMetaData(wijmo.chart.FlexChartCore).add([
                                this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.finance.FinancialChartType),
                            ]);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.FinancialSeries:
                            return this.getMetaData(wijmo.chart.SeriesBase).add([
                                this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.finance.FinancialChartType)
                            ]);
                        case wijmo.chart && wijmo.chart.radar && wijmo.chart.radar.FlexRadar:
                            return this.getMetaData(wijmo.chart.FlexChartCore).add([
                                this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.radar.RadarChartType),
                                this.CreateProp('startAngle', PropertyType.Number),
                                this.CreateProp('totalAngle', PropertyType.Number),
                                this.CreateProp('reversed', PropertyType.Boolean),
                                this.CreateProp('stacking', PropertyType.Enum, '', wijmo.chart.Stacking)
                            ]);
                        case wijmo.chart && wijmo.chart.radar && wijmo.chart.radar.FlexRadarSeries:
                            return this.getMetaData(wijmo.chart.SeriesBase).add([
                                this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.radar.RadarChartType)
                            ]);
                        case wijmo.chart && wijmo.chart.radar && wijmo.chart.radar.FlexRadarAxis:
                            return this.getMetaData(wijmo.chart.Axis);
                        case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.TrendLineBase:
                            return this.getMetaData(wijmo.chart.SeriesBase).add([
                                this.CreateProp('sampleCount', PropertyType.Number)
                            ]);
                        case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.TrendLine:
                            return this.getMetaData(wijmo.chart.analytics.TrendLineBase).add([
                                this.CreateProp('order', PropertyType.Number),
                                this.CreateProp('fitType', PropertyType.Enum, '', wijmo.chart.analytics.TrendLineFitType)
                            ]);
                        case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.MovingAverage:
                            return this.getMetaData(wijmo.chart.analytics.TrendLineBase).add([
                                this.CreateProp('period', PropertyType.Number),
                                this.CreateProp('type', PropertyType.Enum, '', wijmo.chart.analytics.MovingAverageType)
                            ]);
                        case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.FunctionSeries:
                            return this.getMetaData(wijmo.chart.analytics.TrendLineBase).add([
                                this.CreateProp('min', PropertyType.Number),
                                this.CreateProp('max', PropertyType.Number),
                            ]);
                        case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.YFunctionSeries:
                            return this.getMetaData(wijmo.chart.analytics.FunctionSeries).add([
                                this.CreateProp('func', PropertyType.Function),
                            ]);
                        case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.ParametricFunctionSeries:
                            return this.getMetaData(wijmo.chart.analytics.FunctionSeries).add([
                                //Add func property for xFunc property in angular1.
                                //Attribute names beginning with "x-" is reserved for user agent use, 'x-func' is parsed to 'func'
                                //Set func value to xFunc property in WjFlexChartParametricFunctionSeries._initProps function in wijmo.angular.chart.ts file.
                                this.CreateProp('func', PropertyType.Function),
                                this.CreateProp('xFunc', PropertyType.Function),
                                this.CreateProp('yFunc', PropertyType.Function),
                            ]);
                        case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.Waterfall:
                            return this.getMetaData(wijmo.chart.SeriesBase).add([
                                this.CreateProp('relativeData', PropertyType.Boolean),
                                this.CreateProp('start', PropertyType.Number),
                                this.CreateProp('startLabel', PropertyType.String),
                                this.CreateProp('showTotal', PropertyType.Boolean),
                                this.CreateProp('totalLabel', PropertyType.String),
                                this.CreateProp('showIntermediateTotal', PropertyType.Boolean),
                                this.CreateProp('intermediateTotalPositions', PropertyType.Any),
                                this.CreateProp('intermediateTotalLabels', PropertyType.Any),
                                this.CreateProp('connectorLines', PropertyType.Boolean),
                                this.CreateProp('styles', PropertyType.Any)
                            ]);
                        case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.BoxWhisker:
                            return this.getMetaData(wijmo.chart.SeriesBase).add([
                                this.CreateProp('quartileCalculation', PropertyType.Enum, '', wijmo.chart.analytics.QuartileCalculation),
                                this.CreateProp('groupWidth', PropertyType.Number),
                                this.CreateProp('gapWidth', PropertyType.Number),
                                this.CreateProp('showMeanLine', PropertyType.Boolean),
                                this.CreateProp('meanLineStyle', PropertyType.Any),
                                this.CreateProp('showMeanMarker', PropertyType.Boolean),
                                this.CreateProp('meanMarkerStyle', PropertyType.Any),
                                this.CreateProp('showInnerPoints', PropertyType.Boolean),
                                this.CreateProp('showOutliers', PropertyType.Boolean)
                            ]);
                        case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.ErrorBar:
                            return this.getMetaData(wijmo.chart.Series).add([
                                this.CreateProp('errorBarStyle', PropertyType.Any),
                                this.CreateProp('value', PropertyType.Any),
                                this.CreateProp('errorAmount', PropertyType.Enum, '', wijmo.chart.analytics.ErrorAmount),
                                this.CreateProp('endStyle', PropertyType.Enum, '', wijmo.chart.analytics.ErrorBarEndStyle),
                                this.CreateProp('direction', PropertyType.Enum, '', wijmo.chart.analytics.ErrorBarDirection)
                            ]);
                        case wijmo.chart && wijmo.chart.PlotArea:
                            return new MetaDataBase([
                                this.CreateProp('column', PropertyType.Number),
                                this.CreateProp('height', PropertyType.String),
                                this.CreateProp('name', PropertyType.String),
                                this.CreateProp('row', PropertyType.Number),
                                this.CreateProp('style', PropertyType.Any),
                                this.CreateProp('width', PropertyType.String),
                            ], [], [], 'plotAreas', true);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.Fibonacci:
                            return this.getMetaData(wijmo.chart.SeriesBase).add([
                                this.CreateProp('high', PropertyType.Number),
                                this.CreateProp('low', PropertyType.Number),
                                this.CreateProp('labelPosition', PropertyType.Enum, '', wijmo.chart.LabelPosition),
                                this.CreateProp('levels', PropertyType.Any),
                                this.CreateProp('minX', PropertyType.AnyPrimitive),
                                this.CreateProp('maxX', PropertyType.AnyPrimitive),
                                this.CreateProp('uptrend', PropertyType.Boolean)
                            ]);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.FibonacciTimeZones:
                            return this.getMetaData(wijmo.chart.SeriesBase).add([
                                this.CreateProp('startX', PropertyType.Any),
                                this.CreateProp('endX', PropertyType.Any),
                                this.CreateProp('labelPosition', PropertyType.Enum, '', wijmo.chart.LabelPosition),
                                this.CreateProp('levels', PropertyType.Any)
                            ]);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.FibonacciArcs:
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.FibonacciFans:
                            return this.getMetaData(wijmo.chart.SeriesBase).add([
                                this.CreateProp('start', PropertyType.Any),
                                this.CreateProp('end', PropertyType.Any),
                                this.CreateProp('labelPosition', PropertyType.Enum, '', wijmo.chart.LabelPosition),
                                this.CreateProp('levels', PropertyType.Any)
                            ]);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.OverlayIndicatorBase:
                            return this.getMetaData(wijmo.chart.SeriesBase);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.SingleOverlayIndicatorBase:
                            return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                                this.CreateProp('period', PropertyType.Number)
                            ]);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.MacdBase:
                            return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                                this.CreateProp('fastPeriod', PropertyType.Number),
                                this.CreateProp('slowPeriod', PropertyType.Number),
                                this.CreateProp('smoothingPeriod', PropertyType.Number)
                            ]);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.Macd:
                            return this.getMetaData(wijmo.chart.finance.analytics.MacdBase).add([
                                this.CreateProp('styles', PropertyType.Any)
                            ]);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.MacdHistogram:
                            return this.getMetaData(wijmo.chart.finance.analytics.MacdBase);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.ATR:
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.RSI:
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.WilliamsR:
                            return this.getMetaData(wijmo.chart.finance.analytics.SingleOverlayIndicatorBase);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.CCI:
                            return this.getMetaData(wijmo.chart.finance.analytics.SingleOverlayIndicatorBase).add([
                                this.CreateProp('constant', PropertyType.Number)
                            ]);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.Stochastic:
                            return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                                this.CreateProp('dPeriod', PropertyType.Number),
                                this.CreateProp('kPeriod', PropertyType.Number),
                                this.CreateProp('smoothingPeriod', PropertyType.Number),
                                this.CreateProp('styles', PropertyType.Any)
                            ]);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.Envelopes:
                            return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                                this.CreateProp('period', PropertyType.Number),
                                this.CreateProp('size', PropertyType.Number),
                                this.CreateProp('type', PropertyType.Enum, '', wijmo.chart.finance.analytics.MovingAverageType)
                            ]);
                        case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.BollingerBands:
                            return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                                this.CreateProp('period', PropertyType.Number),
                                this.CreateProp('multiplier', PropertyType.Number)
                            ]);
                        // *************************** Gauge *************************************************************
                        //case 'Gauge':
                        case wijmo.gauge && wijmo.gauge.Gauge:
                            return this.getMetaData(wijmo.Control).add([
                                this.CreateProp('value', PropertyType.Number, 'valueChanged'),
                                this.CreateProp('min', PropertyType.Number),
                                this.CreateProp('max', PropertyType.Number),
                                this.CreateProp('origin', PropertyType.Number),
                                this.CreateProp('isReadOnly', PropertyType.Boolean),
                                this.CreateProp('step', PropertyType.Number),
                                this.CreateProp('format', PropertyType.String),
                                this.CreateProp('thickness', PropertyType.Number),
                                this.CreateProp('hasShadow', PropertyType.Boolean),
                                this.CreateProp('isAnimated', PropertyType.Boolean),
                                this.CreateProp('showText', PropertyType.Enum, '', wijmo.gauge.ShowText),
                                this.CreateProp('showTicks', PropertyType.Boolean),
                                this.CreateProp('showRanges', PropertyType.Boolean),
                                this.CreateProp('thumbSize', PropertyType.Number),
                                this.CreateProp('tickSpacing', PropertyType.Number),
                                this.CreateProp('getText', PropertyType.Function)
                            ], [
                                this.CreateEvent('valueChanged', true)
                            ], [
                                this.CreateComplexProp('ranges', true),
                                this.CreateComplexProp('pointer', false, false),
                                this.CreateComplexProp('face', false, false)
                            ])
                                .addOptions({ ngModelProperty: 'value' });
                        //case 'LinearGauge':
                        case wijmo.gauge && wijmo.gauge.LinearGauge:
                            return this.getMetaData(wijmo.gauge.Gauge).add([
                                this.CreateProp('direction', PropertyType.Enum, '', wijmo.gauge.GaugeDirection)
                            ]);
                        case wijmo.gauge && wijmo.gauge.BulletGraph:
                            return this.getMetaData(wijmo.gauge.LinearGauge).add([
                                this.CreateProp('target', PropertyType.Number),
                                this.CreateProp('good', PropertyType.Number),
                                this.CreateProp('bad', PropertyType.Number)
                            ]);
                        case wijmo.gauge && wijmo.gauge.RadialGauge:
                            return this.getMetaData(wijmo.gauge.Gauge).add([
                                this.CreateProp('autoScale', PropertyType.Boolean),
                                this.CreateProp('startAngle', PropertyType.Number),
                                this.CreateProp('sweepAngle', PropertyType.Number)
                            ]);
                        case wijmo.gauge && wijmo.gauge.Range:
                            return new MetaDataBase([
                                this.CreateProp('color', PropertyType.String),
                                this.CreateProp('min', PropertyType.Number),
                                this.CreateProp('max', PropertyType.Number),
                                this.CreateProp('name', PropertyType.String),
                                this.CreateProp('thickness', PropertyType.Number)
                            ], [], [], 'ranges', true);
                        // *************************** Olap *************************************************************
                        case wijmo.olap && wijmo.olap.PivotGrid:
                            return this.getMetaData(wijmo.grid.FlexGrid).add([
                                this.CreateProp('showDetailOnDoubleClick', PropertyType.Boolean),
                                this.CreateProp('customContextMenu', PropertyType.Boolean),
                                this.CreateProp('collapsibleSubtotals', PropertyType.Boolean),
                                this.CreateProp('centerHeadersVertically', PropertyType.Boolean),
                            ]);
                        case wijmo.olap && wijmo.olap.PivotChart:
                            return new MetaDataBase([
                                this.CreateProp('chartType', PropertyType.Enum, '', wijmo.olap.PivotChartType),
                                this.CreateProp('showHierarchicalAxes', PropertyType.Boolean),
                                this.CreateProp('showTotals', PropertyType.Boolean),
                                this.CreateProp('showTitle', PropertyType.Boolean),
                                this.CreateProp('showLegend', PropertyType.Enum, '', wijmo.olap.LegendVisibility),
                                this.CreateProp('legendPosition', PropertyType.Enum, '', wijmo.chart.Position),
                                this.CreateProp('stacking', PropertyType.Enum, '', wijmo.chart.Stacking),
                                this.CreateProp('maxSeries', PropertyType.Number),
                                this.CreateProp('maxPoints', PropertyType.Number),
                                this.CreateProp('itemsSource', PropertyType.Any),
                            ]);
                        case wijmo.olap && wijmo.olap.PivotPanel:
                            return new MetaDataBase([
                                this.CreateProp('autoGenerateFields', PropertyType.Boolean),
                                this.CreateProp('viewDefinition', PropertyType.String),
                                this.CreateProp('engine', PropertyType.Any),
                                this.CreateProp('itemsSource', PropertyType.Any),
                            ], [
                                this.CreateEvent('itemsSourceChanged'),
                                this.CreateEvent('viewDefinitionChanged'),
                                this.CreateEvent('updatingView'),
                                this.CreateEvent('updatedView')
                            ]);
                        case wijmo.olap && wijmo.olap.PivotField:
                            return new MetaDataBase([
                                this.CreateProp('binding', PropertyType.String),
                                this.CreateProp('header', PropertyType.String),
                                this.CreateProp('dataType', PropertyType.Enum, '', wijmo.DataType),
                            ], [], [], '', true, true, '');
                        // *************************** ReportViewer *************************************************************
                        case wijmo.viewer && wijmo.viewer.ViewerBase:
                            return new MetaDataBase([
                                this.CreateProp('serviceUrl', PropertyType.String),
                                this.CreateProp('filePath', PropertyType.String),
                                this.CreateProp('fullScreen', PropertyType.Boolean, 'fullScreenChanged'),
                                this.CreateProp('zoomFactor', PropertyType.Number, 'zoomFactorChanged'),
                                this.CreateProp('mouseMode', PropertyType.Enum, 'mouseModeChanged', wijmo.viewer.MouseMode),
                                this.CreateProp('selectMouseMode', PropertyType.Boolean, 'selectMouseModeChanged'),
                                this.CreateProp('viewMode', PropertyType.Enum, 'viewModeChanged', wijmo.viewer.ViewMode),
                            ], [
                                this.CreateEvent('pageIndexChanged'),
                                this.CreateEvent('viewModeChanged'),
                                this.CreateEvent('mouseModeChanged'),
                                this.CreateEvent('selectMouseModeChanged'),
                                this.CreateEvent('fullScreenChanged'),
                                this.CreateEvent('zoomFactorChanged', true),
                                this.CreateEvent('queryLoadingData')
                            ]);
                        case wijmo.viewer && wijmo.viewer.ReportViewer:
                            return this.getMetaData(wijmo.viewer.ViewerBase).add([
                                this.CreateProp('paginated', PropertyType.Boolean),
                                this.CreateProp('reportName', PropertyType.String),
                            ]);
                        // *************************** PdfViewer *************************************************************
                        case wijmo.viewer && wijmo.viewer.PdfViewer:
                            return this.getMetaData(wijmo.viewer.ViewerBase);
                        // *************************** TreeView *************************************************************
                        case wijmo.nav && wijmo.nav.TreeView:
                            return this.getMetaData(wijmo.Control).add([
                                this.CreateProp('childItemsPath', PropertyType.Any),
                                this.CreateProp('displayMemberPath', PropertyType.Any),
                                this.CreateProp('imageMemberPath', PropertyType.Any),
                                this.CreateProp('isContentHtml', PropertyType.Boolean),
                                this.CreateProp('showCheckboxes', PropertyType.Boolean),
                                this.CreateProp('autoCollapse', PropertyType.Boolean),
                                this.CreateProp('isAnimated', PropertyType.Boolean),
                                this.CreateProp('isReadOnly', PropertyType.Boolean),
                                this.CreateProp('allowDragging', PropertyType.Boolean),
                                this.CreateProp('expandOnClick', PropertyType.Boolean),
                                this.CreateProp('lazyLoadFunction', PropertyType.Function),
                                this.CreateProp('itemsSource', PropertyType.Any),
                                this.CreateProp('selectedItem', PropertyType.Any, 'selectedItemChanged'),
                                this.CreateProp('selectedNode', PropertyType.Any, 'selectedItemChanged'),
                                this.CreateProp('checkedItems', PropertyType.Any, 'checkedItemsChanged'),
                            ], [
                                this.CreateEvent('itemsSourceChanged', true),
                                this.CreateEvent('loadingItems'),
                                this.CreateEvent('loadedItems'),
                                this.CreateEvent('itemClicked'),
                                this.CreateEvent('selectedItemChanged'),
                                this.CreateEvent('checkedItemsChanged', true),
                                this.CreateEvent('isCollapsedChanging'),
                                this.CreateEvent('isCollapsedChanged'),
                                this.CreateEvent('isCheckedChanging'),
                                this.CreateEvent('isCheckedChanged'),
                                this.CreateEvent('formatItem'),
                                this.CreateEvent('dragStart'),
                                this.CreateEvent('dragOver'),
                                this.CreateEvent('drop'),
                                this.CreateEvent('dragEnd'),
                                this.CreateEvent('nodeEditStarting'),
                                this.CreateEvent('nodeEditStarted'),
                                this.CreateEvent('nodeEditEnding'),
                                this.CreateEvent('nodeEditEnded')
                            ]);
                    }
                    return new MetaDataBase([]);
                };
                // For the specified class reference returns its name as a string, e.g.
                // getClassName(wijmo.input.ComboBox) returns 'ComboBox'.
                ControlMetaFactory.getClassName = function (classRef) {
                    return (classRef.toString().match(/function (.+?)\(/) || [, ''])[1];
                };
                // Returns a camel case representation of the dash delimited name.
                ControlMetaFactory.toCamelCase = function (s) {
                    return s.toLowerCase().replace(/-(.)/g, function (match, group1) {
                        return group1.toUpperCase();
                    });
                };
                ControlMetaFactory.findInArr = function (arr, propName, value) {
                    for (var i in arr) {
                        if (arr[i][propName] === value) {
                            return arr[i];
                        }
                    }
                    return null;
                };
                return ControlMetaFactory;
            }());
            interop.ControlMetaFactory = ControlMetaFactory;
            // Describes a scope property: name, type, binding mode.
            // Also defines enum type and custom watcher function extender
            var PropDescBase = (function () {
                // Initializes a new instance of a PropDesc
                function PropDescBase(propertyName, propertyType, /*bindingMode: BindingMode = BindingMode.OneWay*/ changeEvent, enumType, isNativeControlProperty, priority) {
                    if (isNativeControlProperty === void 0) { isNativeControlProperty = true; }
                    if (priority === void 0) { priority = 0; }
                    this._priority = 0;
                    this._propertyName = propertyName;
                    this._propertyType = propertyType;
                    //this._bindingMode = bindingMode;
                    this._changeEvent = changeEvent;
                    this._enumType = enumType;
                    this._isNativeControlProperty = isNativeControlProperty;
                    this._priority = priority;
                }
                Object.defineProperty(PropDescBase.prototype, "propertyName", {
                    // Gets the property name
                    get: function () {
                        return this._propertyName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PropDescBase.prototype, "propertyType", {
                    // Gets the property type (number, string, boolean, enum, or any)
                    get: function () {
                        return this._propertyType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PropDescBase.prototype, "changeEvent", {
                    get: function () {
                        return this._changeEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PropDescBase.prototype, "enumType", {
                    // Gets the property enum type
                    get: function () { return this._enumType; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PropDescBase.prototype, "bindingMode", {
                    // Gets the property binding mode
                    get: function () {
                        //return this._bindingMode;
                        return this.changeEvent ? BindingMode.TwoWay : BindingMode.OneWay;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PropDescBase.prototype, "isNativeControlProperty", {
                    // Gets whether the property belongs to the control is just to the directive
                    get: function () {
                        return this._isNativeControlProperty;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PropDescBase.prototype, "priority", {
                    // Gets an initialization priority. Properties with higher priority are assigned to directive's underlying control
                    // property later than properties with lower priority. Properties with the same priority are assigned in the order of
                    // their index in the _props collection.
                    get: function () {
                        return this._priority;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PropDescBase.prototype, "shouldUpdateSource", {
                    // Indicates whether a bound 'controller' property should be updated on this property change (i.e. two-way binding).
                    get: function () {
                        return this.bindingMode === BindingMode.TwoWay && this.propertyType != PropertyType.EventHandler;
                    },
                    enumerable: true,
                    configurable: true
                });
                PropDescBase.prototype.initialize = function (options) {
                    wijmo.copy(this, options);
                };
                // Casts value to the property type
                PropDescBase.prototype.castValueToType = function (value) {
                    if (value == undefined) {
                        return value;
                    }
                    var type = this.propertyType, pt = PropertyType;
                    if (type === pt.AnyPrimitive) {
                        if (!wijmo.isString(value)) {
                            return value;
                        }
                        if (value === 'true' || value === 'false') {
                            type = pt.Boolean;
                        }
                        else {
                            castVal = +value;
                            if (!isNaN(castVal)) {
                                return castVal;
                            }
                            var castVal = this._parseDate(value);
                            if (!wijmo.isString(castVal)) {
                                return castVal;
                            }
                            return value;
                        }
                    }
                    switch (type) {
                        case pt.Number:
                            if (typeof value == 'string') {
                                if (value.indexOf('*') >= 0) {
                                    return value;
                                }
                                if (value.trim() === '') {
                                    return null;
                                }
                            }
                            return +value; // cast to number
                        case pt.Boolean:
                            if (value === 'true') {
                                return true;
                            }
                            if (value === 'false') {
                                return false;
                            }
                            return !!value; // cast to bool
                        case pt.String:
                            return value + ''; // cast to string
                        case pt.Date:
                            return this._parseDate(value);
                        case pt.Enum:
                            if (typeof value === 'number') {
                                return value;
                            }
                            return this.enumType[value];
                        default:
                            return value;
                    }
                };
                // Parsing DateTime values from string
                PropDescBase.prototype._parseDate = function (value) {
                    if (value && wijmo.isString(value)) {
                        // For by-val attributes Angular converts a Date object to a
                        // string wrapped in quotation marks, so we strip them.
                        value = value.replace(/["']/g, '');
                        // parse date/time using RFC 3339 pattern
                        var dt = wijmo.changeType(value, wijmo.DataType.Date, 'r');
                        if (wijmo.isDate(dt)) {
                            return dt;
                        }
                    }
                    return value;
                };
                return PropDescBase;
            }());
            interop.PropDescBase = PropDescBase;
            // Property types as used in the PropDesc class.
            var PropertyType;
            (function (PropertyType) {
                PropertyType[PropertyType["Boolean"] = 0] = "Boolean";
                PropertyType[PropertyType["Number"] = 1] = "Number";
                PropertyType[PropertyType["Date"] = 2] = "Date";
                PropertyType[PropertyType["String"] = 3] = "String";
                // Allows a value of any primitive type above, that can be parsed from string
                PropertyType[PropertyType["AnyPrimitive"] = 4] = "AnyPrimitive";
                PropertyType[PropertyType["Enum"] = 5] = "Enum";
                PropertyType[PropertyType["Function"] = 6] = "Function";
                PropertyType[PropertyType["EventHandler"] = 7] = "EventHandler";
                PropertyType[PropertyType["Any"] = 8] = "Any";
            })(PropertyType = interop.PropertyType || (interop.PropertyType = {}));
            // Gets a value that indicates whether the specified type is simple (true) or complex (false).
            function isSimpleType(type) {
                return type <= PropertyType.Enum;
            }
            interop.isSimpleType = isSimpleType;
            var BindingMode;
            (function (BindingMode) {
                BindingMode[BindingMode["OneWay"] = 0] = "OneWay";
                BindingMode[BindingMode["TwoWay"] = 1] = "TwoWay";
            })(BindingMode = interop.BindingMode || (interop.BindingMode = {}));
            // Describes a scope event
            var EventDescBase = (function () {
                // Initializes a new instance of an EventDesc
                function EventDescBase(eventName, isPropChanged) {
                    this._eventName = eventName;
                    this._isPropChanged = isPropChanged;
                }
                Object.defineProperty(EventDescBase.prototype, "eventName", {
                    // Gets the event name
                    get: function () {
                        return this._eventName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EventDescBase.prototype, "isPropChanged", {
                    // Gets whether this event is a property change notification
                    get: function () {
                        return this._isPropChanged === true;
                    },
                    enumerable: true,
                    configurable: true
                });
                return EventDescBase;
            }());
            interop.EventDescBase = EventDescBase;
            // Describe property info for nested directives.
            var ComplexPropDescBase = (function () {
                function ComplexPropDescBase(propertyName, isArray, ownsObject) {
                    if (ownsObject === void 0) { ownsObject = false; }
                    this.isArray = false;
                    this._ownsObject = false;
                    this.propertyName = propertyName;
                    this.isArray = isArray;
                    this._ownsObject = ownsObject;
                }
                Object.defineProperty(ComplexPropDescBase.prototype, "ownsObject", {
                    get: function () {
                        return this.isArray || this._ownsObject;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ComplexPropDescBase;
            }());
            interop.ComplexPropDescBase = ComplexPropDescBase;
            // Stores a control metadata as arrays of property, event and complex property descriptors.
            var MetaDataBase = (function () {
                function MetaDataBase(props, events, complexProps, parentProperty, isParentPropertyArray, ownsObject, parentReferenceProperty, ngModelProperty) {
                    this._props = [];
                    this._events = [];
                    this._complexProps = [];
                    this.props = props;
                    this.events = events;
                    this.complexProps = complexProps;
                    this.parentProperty = parentProperty;
                    this.isParentPropertyArray = isParentPropertyArray;
                    this.ownsObject = ownsObject;
                    this.parentReferenceProperty = parentReferenceProperty;
                    this.ngModelProperty = ngModelProperty;
                }
                Object.defineProperty(MetaDataBase.prototype, "props", {
                    get: function () {
                        return this._props;
                    },
                    set: function (value) {
                        this._props = value || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MetaDataBase.prototype, "events", {
                    get: function () {
                        return this._events;
                    },
                    set: function (value) {
                        this._events = value || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MetaDataBase.prototype, "complexProps", {
                    get: function () {
                        return this._complexProps;
                    },
                    set: function (value) {
                        this._complexProps = value || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                // Adds the specified arrays to the end of corresponding arrays of this object, and overwrite the simple properties
                // if specified. Returns 'this'.
                MetaDataBase.prototype.add = function (props, events, complexProps, parentProperty, isParentPropertyArray, ownsObject, parentReferenceProperty, ngModelProperty) {
                    return this.addOptions({
                        props: props,
                        events: events,
                        complexProps: complexProps,
                        parentProperty: parentProperty,
                        isParentPropertyArray: isParentPropertyArray,
                        ownsObject: ownsObject,
                        parentReferenceProperty: parentReferenceProperty,
                        ngModelProperty: ngModelProperty
                    });
                    //this._props = this._props.concat(props || []);
                    //this._events = this._events.concat(events || []);
                    //this._complexProps = this._complexProps.concat(complexProps || []);
                    //if (parentProperty !== undefined) {
                    //    this.parentProperty = parentProperty;
                    //}
                    //if (isParentPropertyArray !== undefined) {
                    //    this.isParentPropertyArray = isParentPropertyArray;
                    //}
                    //if (ownsObject !== undefined) {
                    //    this.ownsObject = ownsObject;
                    //}
                    //if (parentReferenceProperty !== undefined) {
                    //    this.parentReferenceProperty = parentReferenceProperty;
                    //}
                    //if (ngModelProperty !== undefined) {
                    //    this.ngModelProperty = ngModelProperty;
                    //}
                    //return this;
                };
                MetaDataBase.prototype.addOptions = function (options) {
                    for (var prop in options) {
                        var thisValue = this[prop], optionsValue = options[prop];
                        if (thisValue instanceof Array) {
                            this[prop] = thisValue.concat(optionsValue || []);
                        }
                        else if (optionsValue !== undefined) {
                            this[prop] = optionsValue;
                        }
                    }
                    return this;
                };
                // Prepares a raw defined metadata for a usage, for example sorts the props array on priority.
                MetaDataBase.prototype.prepare = function () {
                    // stable sort of props on priority
                    var baseArr = [].concat(this._props);
                    this._props.sort(function (a, b) {
                        var ret = a.priority - b.priority;
                        if (!ret) {
                            ret = baseArr.indexOf(a) - baseArr.indexOf(b);
                        }
                        return ret;
                    });
                };
                return MetaDataBase;
            }());
            interop.MetaDataBase = MetaDataBase;
        })(interop = wj.interop || (wj.interop = {}));
    })(wj = exports.wj || (exports.wj = {}));
});
//export { wj as wjMetaBase };

///<amd-module name='wijmo/wijmo.angular2.metaFactory'/>
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
define("wijmo/wijmo.angular2.metaFactory", ["require", "exports", "wijmo/wijmo.metaFactory"], function (require, exports, wjMetaBase) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //export module wj.angular2 {
    'use strict';
    var MetaFactory = (function (_super) {
        __extends(MetaFactory, _super);
        function MetaFactory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // Override to return wijmo.knockout.PropDesc
        MetaFactory.CreateProp = function (propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority) {
            return new PropDesc(propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority);
        };
        // Override to return wijmo.knockout.EventDesc
        MetaFactory.CreateEvent = function (eventName, isPropChanged) {
            return new EventDesc(eventName, isPropChanged);
        };
        // Override to return wijmo.knockout.ComplexPropDesc
        MetaFactory.CreateComplexProp = function (propertyName, isArray, ownsObject) {
            return new ComplexPropDesc(propertyName, isArray, ownsObject);
        };
        // Typecasted override.
        MetaFactory.findProp = function (propName, props) {
            return wjMetaBase.wj.interop.ControlMetaFactory.findProp(propName, props);
        };
        // Typecasted override.
        MetaFactory.findEvent = function (eventName, events) {
            return wjMetaBase.wj.interop.ControlMetaFactory.findEvent(eventName, events);
        };
        // Typecasted override.
        MetaFactory.findComplexProp = function (propName, props) {
            return wjMetaBase.wj.interop.ControlMetaFactory.findComplexProp(propName, props);
        };
        return MetaFactory;
    }(wjMetaBase.wj.interop.ControlMetaFactory));
    exports.MetaFactory = MetaFactory;
    var PropDesc = (function (_super) {
        __extends(PropDesc, _super);
        function PropDesc() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PropDesc;
    }(wjMetaBase.wj.interop.PropDescBase));
    exports.PropDesc = PropDesc;
    // Describes a scope event
    var EventDesc = (function (_super) {
        __extends(EventDesc, _super);
        function EventDesc() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventDesc;
    }(wjMetaBase.wj.interop.EventDescBase));
    exports.EventDesc = EventDesc;
    // Describe property info for nested directives.
    var ComplexPropDesc = (function (_super) {
        __extends(ComplexPropDesc, _super);
        function ComplexPropDesc() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ComplexPropDesc;
    }(wjMetaBase.wj.interop.ComplexPropDescBase));
    exports.ComplexPropDesc = ComplexPropDesc;
});
//}
//export var wjNg2Meta = wj.angular2;
//export type ComplexPropDesc = wj.angular2.ComplexPropDesc;

///<amd-module name='wijmo/wijmo.angular2.directiveBase'/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("wijmo/wijmo.angular2.directiveBase", ["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    'use strict';
    var WjComponentResolvedMetadata = (function () {
        function WjComponentResolvedMetadata(rawMeta) {
            this.changeEventMap = [];
            this.resolveChangeEventMap(rawMeta);
        }
        WjComponentResolvedMetadata.prototype.resolveChangeEventMap = function (rawMeta) {
            var map = this.changeEventMap, outputs = rawMeta.outputs, changeEvents = rawMeta.changeEvents || {};
            map.splice(0, map.length);
            if (!(outputs && outputs.length)) {
                return;
            }
            // Creates array of { implName, exposeName } objects, with both properties defined.
            var outputPairs = outputs.map(function (strPair) { return strPair.split(':'); })
                .filter(function (arrPair) { return arrPair.length === 2 && arrPair[0] && arrPair[1]; })
                .map(function (arrPair) { return { implName: arrPair[0].trim(), exposeName: arrPair[1].trim() }; });
            for (var _i = 0, outputPairs_1 = outputPairs; _i < outputPairs_1.length; _i++) {
                var pair = outputPairs_1[_i];
                var wjEvent = Ng2Utils.getWjEventName(pair.implName);
                if (wjEvent) {
                    var eventItem = {
                        eventImpl: pair.implName, event: pair.exposeName
                    };
                    var changeProps = changeEvents[pair.exposeName];
                    if (changeProps && changeProps.length) {
                        eventItem.props = changeProps.map(function (prop) {
                            var ret = {
                                prop: prop,
                                evExposed: Ng2Utils.getChangeEventNameExposed(prop),
                                evImpl: Ng2Utils.getChangeEventNameImplemented(prop)
                            };
                            return ret;
                        });
                    }
                    map.push(eventItem);
                }
            }
            // add parent path ("dot") prop change events
            for (var propChangeEvent in changeEvents) {
                if (propChangeEvent.indexOf('.') > -1) {
                    var eventItem = {
                        eventImpl: null,
                        event: propChangeEvent,
                        props: changeEvents[propChangeEvent].map(function (prop) {
                            var ret = {
                                prop: prop,
                                evExposed: Ng2Utils.getChangeEventNameExposed(prop),
                                evImpl: Ng2Utils.getChangeEventNameImplemented(prop)
                            };
                            return ret;
                        })
                    };
                    map.push(eventItem);
                }
            }
        };
        return WjComponentResolvedMetadata;
    }());
    exports.WjComponentResolvedMetadata = WjComponentResolvedMetadata;
    var WjDirectiveBehavior = (function () {
        function WjDirectiveBehavior(directive, elementRef, injector, injectedParent) {
            this.isInitialized = false;
            this.isDestroyed = false;
            this.directive = directive;
            this.elementRef = elementRef;
            this.injector = injector;
            this.injectedParent = injectedParent;
            var typeData = this.typeData =
                directive.constructor[WjDirectiveBehavior.directiveTypeDataProp];
            if (typeData.siblingId == null) {
                typeData.siblingId = (++WjDirectiveBehavior.siblingDirId) + '';
            }
            var resolvedTypeData = directive.constructor[WjDirectiveBehavior.directiveResolvedTypeDataProp];
            if (resolvedTypeData) {
                this.resolvedTypeData = resolvedTypeData;
            }
            else {
                directive.constructor[WjDirectiveBehavior.directiveResolvedTypeDataProp] =
                    resolvedTypeData = this.resolvedTypeData = new WjComponentResolvedMetadata(typeData);
            }
            directive[WjDirectiveBehavior.BehaviourRefProp] = this;
            injector[WjDirectiveBehavior.BehaviourRefProp] = this;
            directive[WjDirectiveBehavior.isInitializedPropAttr] = false;
            this._setupAsChild();
            if (this._isHostElement()) {
                elementRef.nativeElement.setAttribute(WjDirectiveBehavior.siblingDirIdAttr, typeData.siblingId);
            }
            // We can subscribe only to 'own' (without '.' in event name) events here. Handlers to foreign
            // events will be added in ngOnInit.
            this.subscribeToEvents(false);
        }
        WjDirectiveBehavior.getHostElement = function (ngHostElRef) {
            return ngHostElRef.nativeElement;
        };
        WjDirectiveBehavior.attach = function (directive, elementRef, injector, injectedParent) {
            //console.log('ctor: ' + directive.constructor['name']);
            return new WjDirectiveBehavior(directive, elementRef, injector, injectedParent);
        };
        WjDirectiveBehavior.prototype.ngOnInit = function () {
            this.isInitialized = true;
            this._initParent();
            // subscribe to foreign events here (like Column's 'grid.selectionChanged').
            this.subscribeToEvents(true);
        };
        WjDirectiveBehavior.prototype.ngAfterViewInit = function () {
            this.directive[WjDirectiveBehavior.isInitializedPropAttr] = true;
            this.directive[WjDirectiveBehavior.initializedEventAttr].emit(undefined);
            //console.log('dirAfterViewInit: ' + this.directive.constructor['name']);
        };
        WjDirectiveBehavior.prototype.ngOnDestroy = function () {
            if (this.isDestroyed) {
                return;
            }
            this.isDestroyed = true;
            var control = this.directive;
            if (this._siblingInsertedEH) {
                this.elementRef.nativeElement.removeEventListener('DOMNodeInserted', this._siblingInsertedEH);
            }
            if (this._isChild() && this.parentBehavior) {
                var parControl = this.parentBehavior.directive, parProp = this._getParentProp();
                if (!this.parentBehavior.isDestroyed && parControl && parProp && control) {
                    var parArr = parControl[parProp];
                    if (wijmo.isArray(parArr)) {
                        if (parArr) {
                            var idx = parArr.indexOf(control);
                            if (idx >= 0) {
                                parArr.splice(idx, 1);
                            }
                        }
                    }
                }
            }
            if (control instanceof wijmo.Control) {
                // We call dispose() with a delay, to get directives such as ng-if/ng-repeat a chance to remove its child subtree
                // berore the control will be disposed. Otherwise, Control.dispose() replaces its host element with an assignment 
                // to outerHTML, that creates an element clone in its parent with a different pointer, not the one that
                // ng-if stores locally, so this clone is out of ng-if control and stays in DOM forever.
                // TBD: do we need this delay in Ng2?
                // Answer: no, it breaks controls in templates, because Ng2 reuses control's host elements.
                //setTimeout(function () {
                if (control.hostElement) {
                    // control.dispose() kills current host element (by outerHTML=... assignment), while Ng2 reuses it,
                    // so we need to keep it in its correct position after call to control.dispose().
                    var host = this.elementRef.nativeElement, hostParent = host && host.parentNode, hostIdx = hostParent ? Array.prototype.indexOf.call(hostParent.childNodes, host) : -1;
                    //TBD: !!! control.dispose() will dispose all child controls, we need to dispose all directives before it!!!
                    control.dispose();
                    if (hostIdx > -1 && Array.prototype.indexOf.call(hostParent.childNodes, host) < 0) {
                        host.textContent = '';
                        if (hostIdx < hostParent.childNodes.length) {
                            hostParent.replaceChild(host, hostParent.childNodes[hostIdx]);
                        }
                        //else {
                        //    hostParent.appendChild(host);
                        //}
                    }
                }
                //}, 0);
            }
            this.injector[WjDirectiveBehavior.BehaviourRefProp] = null;
        };
        WjDirectiveBehavior.instantiateTemplate = function (parent, viewContainerRef, templateRef, domRenderer, useTemplateRoot) {
            if (useTemplateRoot === void 0) { useTemplateRoot = false; }
            var viewRef = viewContainerRef.createEmbeddedView(templateRef, {}, viewContainerRef.length);
            var nodes = viewRef.rootNodes, rootEl;
            if (useTemplateRoot && nodes.length === 1) {
                rootEl = nodes[0];
            }
            else {
                rootEl = document.createElement('div');
                for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                    var curNode = nodes_1[_i];
                    rootEl.appendChild(curNode);
                }
            }
            if (parent) {
                parent.appendChild(rootEl);
            }
            return { viewRef: viewRef, rootElement: rootEl };
        };
        WjDirectiveBehavior.prototype.getPropChangeEvent = function (propName) {
            var evToProps = this.typeData.changeEvents;
            if (evToProps) {
                for (var event_1 in evToProps) {
                    if (evToProps[event_1].indexOf(propName) > -1) {
                        return event_1;
                    }
                }
            }
            return null;
        };
        // afterInit - indicates the phase (constructor (false) or ngOnInit (true))
        WjDirectiveBehavior.prototype.subscribeToEvents = function (afterInit) {
            var changeEvents = this.resolvedTypeData.changeEventMap;
            afterInit = !!afterInit;
            // Add handlers
            for (var _i = 0, changeEvents_1 = changeEvents; _i < changeEvents_1.length; _i++) {
                var curEventMap = changeEvents_1[_i];
                if (afterInit !== (curEventMap.event.indexOf(".") < 0)) {
                    this.addHandlers(curEventMap);
                }
            }
            if (afterInit) {
                // update two-way bindings in the target-to-source direction
                for (var _a = 0, changeEvents_2 = changeEvents; _a < changeEvents_2.length; _a++) {
                    var curEventMap = changeEvents_2[_a];
                    this.triggerPropChangeEvents(curEventMap);
                }
            }
        };
        WjDirectiveBehavior.prototype.addHandlers = function (eventMap) {
            var _this = this;
            var directive = this.directive;
            WjDirectiveBehavior.evaluatePath(directive, eventMap.event).addHandler(function (s, e) {
                // Trigger property change events
                if (_this.isInitialized) {
                    _this.triggerPropChangeEvents(eventMap);
                }
                // Trigger Wijmo event
                if (eventMap.eventImpl) {
                    directive[eventMap.eventImpl].next(e);
                }
            });
        };
        WjDirectiveBehavior.prototype.triggerPropChangeEvents = function (eventMap) {
            var directive = this.directive;
            if (eventMap.props && eventMap.props.length) {
                // Trigger property change events
                for (var _i = 0, _a = eventMap.props; _i < _a.length; _i++) {
                    var curChangeProp = _a[_i];
                    directive[curChangeProp.evImpl].next(directive[curChangeProp.prop]);
                }
            }
        };
        WjDirectiveBehavior.prototype._setupAsChild = function () {
            if (!this._isChild()) {
                return;
            }
            if (this._isHostElement()) {
                this.elementRef.nativeElement.style.display = 'none';
            }
            this.parentBehavior = WjDirectiveBehavior.getBehavior(this.injectedParent);
        };
        // --------------------- Child directive ------------------------
        //Determines whether this is a child link.
        //NOTE: functionality is *not* based on _parentPropDesc
        WjDirectiveBehavior.prototype._isChild = function () {
            return this._isParentInitializer() || this._isParentReferencer();
        };
        // Indicates whether this directictive operates as a child directictive that initializes a property of its parent.
        WjDirectiveBehavior.prototype._isParentInitializer = function () {
            return this.directive[WjDirectiveBehavior.parPropAttr] != null;
        };
        // Indicates whether this directictive operates as a child directictive that references a parent in its property or
        // a constructor.
        WjDirectiveBehavior.prototype._isParentReferencer = function () {
            // only non-empty string resolves to true
            return !!this.typeData.parentRefProperty;
        };
        //For the child directives returns parent's property name that it services. Property name defined via
        //the wjProperty attribute of directive tag has priority over the directive._property definition.
        //NOTE: functionality is *not* based on _parentPropDesc
        WjDirectiveBehavior.prototype._getParentProp = function () {
            return this.directive[WjDirectiveBehavior.parPropAttr];
        };
        // For a child directive, the name of the property of the directive's underlying object that receives the reference
        // to the parent, or an empty string that indicates that the reference to the parent should be passed as the 
        // underlying object's constructor parameter.
        WjDirectiveBehavior.prototype._getParentReferenceProperty = function () {
            //return this.typeData.metaData.parentReferenceProperty;
            return this.typeData.parentRefProperty;
        };
        // Determines whether the child link uses an object created by the parent property, instead of creating it by
        // itself, and thus object's initialization should be delayed until parent link's control is created.
        //IMPORTANT: functionality is *based* on _parentPropDesc
        WjDirectiveBehavior.prototype._useParentObj = function () {
            // we can't support this, all affected properties should be read-write
            return false;
        };
        // For the child referencer directive, indicates whether the parent should be passed as a parameter the object
        // constructor.
        WjDirectiveBehavior.prototype._parentInCtor = function () {
            return this._isParentReferencer() && this._getParentReferenceProperty() == '';
        };
        WjDirectiveBehavior.prototype._initParent = function () {
            if (!this.parentBehavior || this._useParentObj()) {
                return;
            }
            var parDir = this.parentBehavior.directive, propName = this._getParentProp(), control = this.directive;
            if (this._isParentInitializer()) {
                var parProp = this._getParentProp();
                var parArr = parDir[propName];
                if (wijmo.isArray(parArr)) {
                    // insert child at correct index, which is the same as an index of the directive element amid sibling directives
                    // of the same type
                    var isHostElement = this._isHostElement(), linkIdx = isHostElement ? this._getSiblingIndex() : -1;
                    if (linkIdx < 0 || linkIdx >= parArr.length) {
                        linkIdx = parArr.length;
                    }
                    parArr.splice(linkIdx, 0, control);
                    if (isHostElement) {
                        this._siblingInsertedEH = this._siblingInserted.bind(this);
                        this.elementRef.nativeElement.addEventListener('DOMNodeInserted', this._siblingInsertedEH);
                    }
                }
                else {
                    parDir[propName] = control;
                }
            }
            if (this._isParentReferencer() && !this._parentInCtor()) {
                control[this._getParentReferenceProperty()] = parDir;
            }
        };
        // Gets an index of this directive host element among another host elements pertain to the same directive type.
        WjDirectiveBehavior.prototype._getSiblingIndex = function () {
            var thisEl = this.elementRef.nativeElement, parEl = thisEl.parentElement;
            // If parentElement is null, e.g. because this element is temporary in DocumentFragment, the index
            // of the element isn't relevant to the item's position in the array, so we return -1 and thus force
            // a calling code to not reposition the item in the array at all.  
            if (!parEl) {
                return -1;
            }
            var siblings = parEl.childNodes, idx = -1, dirId = this.typeData.siblingId;
            for (var i = 0; i < siblings.length; i++) {
                var curEl = siblings[i];
                if (curEl.nodeType == 1 && curEl.getAttribute(WjDirectiveBehavior.siblingDirIdAttr) == dirId) {
                    ++idx;
                    if (curEl === thisEl) {
                        return idx;
                    }
                }
            }
            return -1;
        };
        WjDirectiveBehavior.prototype._siblingInserted = function (e) {
            if (e.target === this.elementRef.nativeElement) {
                var lIdx = this._getSiblingIndex(), parArr = this.parentBehavior.directive[this._getParentProp()], directive = this.directive, arrIdx = parArr.indexOf(directive);
                if (lIdx >= 0 && arrIdx >= 0 && lIdx !== arrIdx) {
                    parArr.splice(arrIdx, 1);
                    lIdx = Math.min(lIdx, parArr.length);
                    parArr.splice(lIdx, 0, directive);
                }
            }
        };
        // Indicates whether the host node is HTMLElement. E.g. for template directive a host node is comment.
        WjDirectiveBehavior.prototype._isHostElement = function () {
            return this.elementRef.nativeElement.nodeType === Node.ELEMENT_NODE;
        };
        // --- end of Child directive ------------------------
        // ----- Utility methods
        WjDirectiveBehavior.evaluatePath = function (obj, path) {
            this._pathBinding.path = path;
            return this._pathBinding.getValue(obj);
        };
        // Gets WjDirectiveBehavior associated with specified directive.
        WjDirectiveBehavior.getBehavior = function (directive) {
            return directive ? directive[WjDirectiveBehavior.BehaviourRefProp] : null;
        };
        return WjDirectiveBehavior;
    }());
    // Name of the property created on directive and Injector instances that references this behavior
    WjDirectiveBehavior.directiveTypeDataProp = 'meta';
    WjDirectiveBehavior.directiveResolvedTypeDataProp = '_wjResolvedMeta';
    WjDirectiveBehavior.BehaviourRefProp = '_wjBehaviour';
    WjDirectiveBehavior.parPropAttr = 'wjProperty';
    WjDirectiveBehavior.wjModelPropAttr = 'wjModelProperty';
    WjDirectiveBehavior.initializedEventAttr = 'initialized';
    WjDirectiveBehavior.isInitializedPropAttr = 'isInitialized';
    WjDirectiveBehavior.siblingDirIdAttr = 'wj-directive-id';
    WjDirectiveBehavior.siblingDirId = 0;
    WjDirectiveBehavior.wijmoComponentProviderId = 'WjComponent';
    WjDirectiveBehavior._pathBinding = new wijmo.Binding('');
    exports.WjDirectiveBehavior = WjDirectiveBehavior;
    var Ng2Utils = (function () {
        function Ng2Utils() {
        }
        // Returns an array for the @Component 'outputs' property.
        Ng2Utils.initEvents = function (directiveType, changeEvents) {
            var ret = [];
            for (var _i = 0, changeEvents_3 = changeEvents; _i < changeEvents_3.length; _i++) {
                var curEventMap = changeEvents_3[_i];
                var changeProps = curEventMap.props;
                if (curEventMap.event && curEventMap.eventImpl) {
                    ret.push(curEventMap.eventImpl + ':' + curEventMap.event);
                }
                if (changeProps && changeProps.length) {
                    for (var _a = 0, changeProps_1 = changeProps; _a < changeProps_1.length; _a++) {
                        var curChangeProp = changeProps_1[_a];
                        ret.push(curChangeProp.evImpl + ':' + curChangeProp.evExposed);
                    }
                }
            }
            return ret;
        };
        Ng2Utils.getChangeEventNameImplemented = function (propertyName) {
            //return Ng2Utils.getChangeEventNameExposed(propertyName) + 'Ng';
            return Ng2Utils.getChangeEventNameExposed(propertyName) + Ng2Utils.changeEventImplementSuffix; //'PC';
        };
        Ng2Utils.getChangeEventNameExposed = function (propertyName) {
            return propertyName + 'Change';
        };
        Ng2Utils.getWjEventNameImplemented = function (eventName) {
            //return eventName + 'Wj';
            return eventName + Ng2Utils.wjEventImplementSuffix; //'Ng';
        };
        Ng2Utils.getWjEventName = function (ngEventName) {
            if (ngEventName) {
                var ngSuffix = Ng2Utils.wjEventImplementSuffix;
                var suffixIdx = ngEventName.length - ngSuffix.length;
                if (suffixIdx > 0 && ngEventName.substr(suffixIdx) === ngSuffix) {
                    return ngEventName.substr(0, suffixIdx);
                }
            }
            return null;
        };
        // Gets the base type for the specified type.
        Ng2Utils.getBaseType = function (type) {
            var proto;
            return type && (proto = Object.getPrototypeOf(type.prototype)) && proto.constructor;
        };
        Ng2Utils.getAnnotations = function (type) {
            //return type && reflector.annotations(type);
            return Reflect.getMetadata('annotations', type);
        };
        Ng2Utils.getAnnotation = function (annotations, annotationType) {
            if (annotationType && annotations) {
                for (var _i = 0, annotations_1 = annotations; _i < annotations_1.length; _i++) {
                    var curAnno = annotations_1[_i];
                    if (curAnno instanceof annotationType) {
                        return curAnno;
                    }
                }
            }
            return null;
        };
        // Gets the annotation of the specified annotationType defined on the specified 'type'. 
        // If 'own' is true then method will traverse up the type inheritance hierarchy to find the requested
        // annotation type.
        Ng2Utils.getTypeAnnotation = function (type, annotationType, own) {
            for (var curType = type; curType; curType = own ? null : Ng2Utils.getBaseType(curType)) {
                var anno = Ng2Utils.getAnnotation(Ng2Utils.getAnnotations(curType), annotationType);
                if (anno) {
                    return anno;
                }
            }
            return null;
        };
        // override - if true then array property values will be replaced; otherwise, concatenated.
        // includePrivate - if true then properties whose names start with '_' will be copied.
        // filter - function(name, value): boolean
        Ng2Utils._copy = function (dst, src, override, includePrivate, filter) {
            if (dst && src) {
                for (var prop in src) {
                    if (includePrivate || prop[0] !== '_') {
                        var val = src[prop];
                        if (!filter || filter(prop, val)) {
                            var dstVal = dst[prop];
                            if (wijmo.isArray(val)) {
                                dst[prop] = (!wijmo.isArray(dstVal) || override ? [] : dstVal)
                                    .concat(val);
                            }
                            else if (val !== undefined) {
                                dst[prop] = val;
                            }
                        }
                    }
                }
            }
        };
        return Ng2Utils;
    }());
    Ng2Utils.changeEventImplementSuffix = 'PC';
    Ng2Utils.wjEventImplementSuffix = 'Ng';
    exports.Ng2Utils = Ng2Utils;
    var WjValueAccessor = (function () {
        function WjValueAccessor(/*@Inject(Injector) injector: Injector*/ directive) {
            this._isFirstChange = true;
            this._isSubscribed = false;
            this._onChange = function (_) { };
            this._onTouched = function () { };
            //this._injector = injector;
            this._directive = directive;
            this._behavior = WjDirectiveBehavior.getBehavior(directive);
        }
        WjValueAccessor.prototype.writeValue = function (value) {
            var _this = this;
            //this._ensureDirective();
            this._modelValue = value;
            // the directive can be not initialized yet during this call, so we wait for its initialization
            // and assign the value only after it
            if (this._directive.isInitialized) {
                this._ensureInitEhUnsubscribed();
                this._updateDirective();
                this._isFirstChange = false; //see _updateDirective()
            }
            else {
                if (this._dirInitEh) {
                    this._isFirstChange = false; //see _updateDirective()
                }
                else {
                    var initEvent = this._directive.initialized;
                    this._dirInitEh = initEvent.subscribe(function () {
                        _this._updateDirective();
                        _this._ensureInitEhUnsubscribed();
                    });
                }
            }
        };
        WjValueAccessor.prototype.registerOnChange = function (fn) { this._onChange = fn; };
        WjValueAccessor.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
        WjValueAccessor.prototype._updateDirective = function () {
            // patch: seems a bug introduced in RC.4 - ngModel always writes a null during initialization,
            // though the source value is not a null, so we avoid value propagation during the first call
            // using _notFirstChange.
            // Note that this is not the issue when accessors is initialized by the FormControlName->FormGroupDirective
            // (in scenarios like in Ng2 DynamicForms sample).
            if (!this._isFirstChange || this._modelValue != null) {
                this._ensureNgModelProp();
                if (this._directive && this._ngModelProp) {
                    var normValue = this._modelValue;
                    // Ng2 converts nulls/indefined to '', we have to convert them back.
                    if (normValue === '') {
                        normValue = null;
                    }
                    this._directive[this._ngModelProp] = normValue;
                }
                this._ensureSubscribed();
            }
        };
        WjValueAccessor.prototype._ensureSubscribed = function () {
            if (this._isSubscribed) {
                return;
            }
            var directive = this._directive;
            if (directive) {
                this._ensureNgModelProp();
                var ngModelProp = this._ngModelProp = directive[WjDirectiveBehavior.wjModelPropAttr];
                if (ngModelProp) {
                    var changeEvent = this._behavior.getPropChangeEvent(ngModelProp);
                    if (changeEvent) {
                        directive[changeEvent].addHandler(this._dirValChgEh, this);
                    }
                }
                if (directive instanceof wijmo.Control) {
                    directive.lostFocus.addHandler(this._dirLostFocusEh, this);
                }
                this._isSubscribed = true;
            }
        };
        WjValueAccessor.prototype._ensureNgModelProp = function () {
            if (!this._ngModelProp && this._directive) {
                this._ngModelProp = this._directive[WjDirectiveBehavior.wjModelPropAttr];
            }
        };
        WjValueAccessor.prototype._ensureInitEhUnsubscribed = function () {
            if (this._dirInitEh) {
                this._dirInitEh.unsubscribe();
                this._dirInitEh = null;
            }
        };
        WjValueAccessor.prototype._dirValChgEh = function (s, e) {
            if (this._onChange && this._directive && this._ngModelProp) {
                var dirValue = this._directive[this._ngModelProp];
                if (this._modelValue !== dirValue) {
                    this._modelValue = dirValue;
                    this._onChange(dirValue);
                }
            }
        };
        WjValueAccessor.prototype._dirLostFocusEh = function (s, e) {
            if (this._onTouched) {
                this._onTouched();
            }
        };
        return WjValueAccessor;
    }());
    WjValueAccessor = __decorate([
        core_1.Injectable()
    ], WjValueAccessor);
    exports.WjValueAccessor = WjValueAccessor;
    function WjValueAccessorFactory(/*injector: Injector*/ directive) {
        return new WjValueAccessor(/*injector*/ directive);
    }
    exports.WjValueAccessorFactory = WjValueAccessorFactory;
    var moduleExports = [];
    var WjDirectiveBaseModule = (function () {
        function WjDirectiveBaseModule() {
        }
        return WjDirectiveBaseModule;
    }());
    WjDirectiveBaseModule = __decorate([
        core_1.NgModule({})
    ], WjDirectiveBaseModule);
    exports.WjDirectiveBaseModule = WjDirectiveBaseModule;
});

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.core", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, ngCore, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjTooltipMeta = {
        selector: '[wjTooltip]',
        inputs: [],
        outputs: [
            'initialized',
        ],
        exportAs: 'wjTooltip',
        providers: []
    };
    /**
        * Angular 2 directive for the @see:Tooltip class.
        *
        * Use the <b>wjTooltip</b> directive to add tooltips to elements on the page.
        * The wjTooltip directive supports HTML content, smart positioning, and touch.
        *
        * The wjTooltip directive is specified as a parameter added to the
        * element that the tooltip applies to. The parameter value is the tooltip
        * text or the id of an element that contains the text. For example:
        *
        * <pre>&lt;p [wjTooltip]="'#fineprint'" &gt;
        *     Regular paragraph content...&lt;/p&gt;
        * ...
        * &lt;div id="fineprint" style="display:none"&gt;
        *   &lt;h3&gt;Important Note&lt;/h3&gt;
        *   &lt;p&gt;
        *     Data for the current quarter is estimated
        *     by pro-rating etc.&lt;/p&gt;
        * &lt;/div&gt;</pre>
        */
    var WjTooltip = WjTooltip_1 = (function () {
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
        outputs: exports.wjTooltipMeta.outputs,
    };
    __decorate([
        core_3.Input()
    ], WjTooltip.prototype, "wjTooltip", null);
    WjTooltip = WjTooltip_1 = __decorate([
        core_2.Directive({
            selector: exports.wjTooltipMeta.selector,
            inputs: exports.wjTooltipMeta.inputs,
            outputs: exports.wjTooltipMeta.outputs,
            exportAs: exports.wjTooltipMeta.exportAs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjTooltip_1; }) }
            ].concat(exports.wjTooltipMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjTooltip);
    exports.WjTooltip = WjTooltip;
    /**
        * TBD
        */
    var WjComponentLoader = (function () {
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
    exports.WjComponentLoader = WjComponentLoader;
    var moduleExports = [
        WjTooltip, WjComponentLoader
    ];
    var WjCoreModule = (function () {
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
    exports.WjCoreModule = WjCoreModule;
    var WjTooltip_1;
});

/**
* Contains Angular 2 components for the <b>wijmo.input</b> module.
*
* <b>wijmo.angular2.input</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjInput from 'wijmo/wijmo.angular2.input';
* &nbsp;
* &#64;Component({
*     directives: [wjInput.WjInputNumber],
*     template: '&lt;wj-input-number [(value)]="amount"&gt;&lt;/wj-input-number&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     amount = 0;
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.input'/>
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
define("wijmo/wijmo.angular2.input", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjComboBoxMeta = {
        selector: 'wj-combo-box',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'displayMemberPath',
            'selectedValuePath',
            'headerPath',
            'isContentHtml',
            'isEditable',
            'maxDropDownHeight',
            'maxDropDownWidth',
            'itemFormatter',
            'itemsSource',
            'text',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'formatItemNg: formatItem',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.ComboBox control.
     *
     * Use the <b>wj-combo-box</b> component to add <b>ComboBox</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjComboBox</b> component is derived from the <b>ComboBox</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-combo-box</b> component may contain a @see:wijmo/wijmo.angular2.input.WjItemTemplate child directive.
    */
    var WjComboBox = WjComboBox_1 = (function (_super) {
        __extends(WjComboBox, _super);
        function WjComboBox(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'selectedValue'.
             */
            _this.wjModelProperty = 'selectedValue';
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
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
             */
            _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
             */
            _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
            _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
             */
            _this.textChangedNg = new core_1.EventEmitter(false);
            _this.textChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
             */
            _this.formatItemNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
             */
            _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
            _this.selectedIndexChangePC = new core_1.EventEmitter(false);
            _this.selectedItemChangePC = new core_1.EventEmitter(false);
            _this.selectedValueChangePC = new core_1.EventEmitter(false);
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
        WjComboBox.prototype.created = function () {
        };
        WjComboBox.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjComboBox.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjComboBox.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjComboBox;
    }(wijmo.input.ComboBox));
    WjComboBox.meta = {
        outputs: exports.wjComboBoxMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'],
            'textChanged': ['text'],
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue']
        },
    };
    WjComboBox = WjComboBox_1 = __decorate([
        core_1.Component({
            selector: exports.wjComboBoxMeta.selector,
            template: exports.wjComboBoxMeta.template,
            inputs: exports.wjComboBoxMeta.inputs,
            outputs: exports.wjComboBoxMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjComboBox_1; }) }
            ].concat(exports.wjComboBoxMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjComboBox);
    exports.WjComboBox = WjComboBox;
    exports.wjAutoCompleteMeta = {
        selector: 'wj-auto-complete',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'displayMemberPath',
            'selectedValuePath',
            'headerPath',
            'isContentHtml',
            'isEditable',
            'maxDropDownHeight',
            'maxDropDownWidth',
            'itemFormatter',
            'delay',
            'maxItems',
            'minLength',
            'cssMatch',
            'itemsSourceFunction',
            'searchMemberPath',
            'itemsSource',
            'text',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'formatItemNg: formatItem',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.AutoComplete control.
     *
     * Use the <b>wj-auto-complete</b> component to add <b>AutoComplete</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjAutoComplete</b> component is derived from the <b>AutoComplete</b> control and
     * inherits all its properties, events and methods.
    */
    var WjAutoComplete = WjAutoComplete_1 = (function (_super) {
        __extends(WjAutoComplete, _super);
        function WjAutoComplete(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'selectedValue'.
             */
            _this.wjModelProperty = 'selectedValue';
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
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
             */
            _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
             */
            _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
            _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
             */
            _this.textChangedNg = new core_1.EventEmitter(false);
            _this.textChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
             */
            _this.formatItemNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
             */
            _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
            _this.selectedIndexChangePC = new core_1.EventEmitter(false);
            _this.selectedItemChangePC = new core_1.EventEmitter(false);
            _this.selectedValueChangePC = new core_1.EventEmitter(false);
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
        WjAutoComplete.prototype.created = function () {
        };
        WjAutoComplete.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjAutoComplete.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjAutoComplete.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjAutoComplete;
    }(wijmo.input.AutoComplete));
    WjAutoComplete.meta = {
        outputs: exports.wjAutoCompleteMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'],
            'textChanged': ['text'],
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue']
        },
    };
    WjAutoComplete = WjAutoComplete_1 = __decorate([
        core_1.Component({
            selector: exports.wjAutoCompleteMeta.selector,
            template: exports.wjAutoCompleteMeta.template,
            inputs: exports.wjAutoCompleteMeta.inputs,
            outputs: exports.wjAutoCompleteMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjAutoComplete_1; }) }
            ].concat(exports.wjAutoCompleteMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjAutoComplete);
    exports.WjAutoComplete = WjAutoComplete;
    exports.wjCalendarMeta = {
        selector: 'wj-calendar',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'monthView',
            'showHeader',
            'itemFormatter',
            'itemValidator',
            'firstDayOfWeek',
            'max',
            'min',
            'selectionMode',
            'isReadOnly',
            'value',
            'displayMonth',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
            'displayMonthChangedNg: displayMonthChanged',
            'displayMonthChangePC: displayMonthChange',
            'formatItemNg: formatItem',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.Calendar control.
     *
     * Use the <b>wj-calendar</b> component to add <b>Calendar</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjCalendar</b> component is derived from the <b>Calendar</b> control and
     * inherits all its properties, events and methods.
    */
    var WjCalendar = WjCalendar_1 = (function (_super) {
        __extends(WjCalendar, _super);
        function WjCalendar(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
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
             * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
             */
            _this.valueChangedNg = new core_1.EventEmitter(false);
            _this.valueChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>displayMonthChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>displayMonthChanged</b> Wijmo event name.
             */
            _this.displayMonthChangedNg = new core_1.EventEmitter(false);
            _this.displayMonthChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
             */
            _this.formatItemNg = new core_1.EventEmitter(false);
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
        WjCalendar.prototype.created = function () {
        };
        WjCalendar.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjCalendar.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjCalendar.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjCalendar;
    }(wijmo.input.Calendar));
    WjCalendar.meta = {
        outputs: exports.wjCalendarMeta.outputs,
        changeEvents: {
            'valueChanged': ['value'],
            'displayMonthChanged': ['displayMonth']
        },
    };
    WjCalendar = WjCalendar_1 = __decorate([
        core_1.Component({
            selector: exports.wjCalendarMeta.selector,
            template: exports.wjCalendarMeta.template,
            inputs: exports.wjCalendarMeta.inputs,
            outputs: exports.wjCalendarMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjCalendar_1; }) }
            ].concat(exports.wjCalendarMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjCalendar);
    exports.WjCalendar = WjCalendar;
    exports.wjColorPickerMeta = {
        selector: 'wj-color-picker',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'showAlphaChannel',
            'showColorString',
            'palette',
            'value',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.ColorPicker control.
     *
     * Use the <b>wj-color-picker</b> component to add <b>ColorPicker</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjColorPicker</b> component is derived from the <b>ColorPicker</b> control and
     * inherits all its properties, events and methods.
    */
    var WjColorPicker = WjColorPicker_1 = (function (_super) {
        __extends(WjColorPicker, _super);
        function WjColorPicker(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
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
             * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
             */
            _this.valueChangedNg = new core_1.EventEmitter(false);
            _this.valueChangePC = new core_1.EventEmitter(false);
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
        WjColorPicker.prototype.created = function () {
        };
        WjColorPicker.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjColorPicker.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjColorPicker.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjColorPicker;
    }(wijmo.input.ColorPicker));
    WjColorPicker.meta = {
        outputs: exports.wjColorPickerMeta.outputs,
        changeEvents: {
            'valueChanged': ['value']
        },
    };
    WjColorPicker = WjColorPicker_1 = __decorate([
        core_1.Component({
            selector: exports.wjColorPickerMeta.selector,
            template: exports.wjColorPickerMeta.template,
            inputs: exports.wjColorPickerMeta.inputs,
            outputs: exports.wjColorPickerMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjColorPicker_1; }) }
            ].concat(exports.wjColorPickerMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjColorPicker);
    exports.WjColorPicker = WjColorPicker;
    exports.wjInputMaskMeta = {
        selector: 'wj-input-mask',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'mask',
            'isRequired',
            'promptChar',
            'placeholder',
            'rawValue',
            'value',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'rawValueChangePC: rawValueChange',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.InputMask control.
     *
     * Use the <b>wj-input-mask</b> component to add <b>InputMask</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjInputMask</b> component is derived from the <b>InputMask</b> control and
     * inherits all its properties, events and methods.
    */
    var WjInputMask = WjInputMask_1 = (function (_super) {
        __extends(WjInputMask, _super);
        function WjInputMask(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
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
             * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
             */
            _this.valueChangedNg = new core_1.EventEmitter(false);
            _this.rawValueChangePC = new core_1.EventEmitter(false);
            _this.valueChangePC = new core_1.EventEmitter(false);
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
        WjInputMask.prototype.created = function () {
        };
        WjInputMask.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjInputMask.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjInputMask.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjInputMask;
    }(wijmo.input.InputMask));
    WjInputMask.meta = {
        outputs: exports.wjInputMaskMeta.outputs,
        changeEvents: {
            'valueChanged': ['rawValue', 'value']
        },
    };
    WjInputMask = WjInputMask_1 = __decorate([
        core_1.Component({
            selector: exports.wjInputMaskMeta.selector,
            template: exports.wjInputMaskMeta.template,
            inputs: exports.wjInputMaskMeta.inputs,
            outputs: exports.wjInputMaskMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputMask_1; }) }
            ].concat(exports.wjInputMaskMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjInputMask);
    exports.WjInputMask = WjInputMask;
    exports.wjInputColorMeta = {
        selector: 'wj-input-color',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'showAlphaChannel',
            'value',
            'text',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.InputColor control.
     *
     * Use the <b>wj-input-color</b> component to add <b>InputColor</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjInputColor</b> component is derived from the <b>InputColor</b> control and
     * inherits all its properties, events and methods.
    */
    var WjInputColor = WjInputColor_1 = (function (_super) {
        __extends(WjInputColor, _super);
        function WjInputColor(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
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
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
             */
            _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
             */
            _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
            _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
             */
            _this.textChangedNg = new core_1.EventEmitter(false);
            _this.textChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
             */
            _this.valueChangedNg = new core_1.EventEmitter(false);
            _this.valueChangePC = new core_1.EventEmitter(false);
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
        WjInputColor.prototype.created = function () {
        };
        WjInputColor.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjInputColor.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjInputColor.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjInputColor;
    }(wijmo.input.InputColor));
    WjInputColor.meta = {
        outputs: exports.wjInputColorMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'],
            'textChanged': ['text'],
            'valueChanged': ['value']
        },
    };
    WjInputColor = WjInputColor_1 = __decorate([
        core_1.Component({
            selector: exports.wjInputColorMeta.selector,
            template: exports.wjInputColorMeta.template,
            inputs: exports.wjInputColorMeta.inputs,
            outputs: exports.wjInputColorMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputColor_1; }) }
            ].concat(exports.wjInputColorMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjInputColor);
    exports.WjInputColor = WjInputColor;
    exports.wjMultiSelectMeta = {
        selector: 'wj-multi-select',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'displayMemberPath',
            'selectedValuePath',
            'headerPath',
            'isContentHtml',
            'isEditable',
            'maxDropDownHeight',
            'maxDropDownWidth',
            'itemFormatter',
            'checkedMemberPath',
            'maxHeaderItems',
            'headerFormat',
            'headerFormatter',
            'itemsSource',
            'checkedItems',
            'text',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'formatItemNg: formatItem',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
            'checkedItemsChangedNg: checkedItemsChanged',
            'checkedItemsChangePC: checkedItemsChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.MultiSelect control.
     *
     * Use the <b>wj-multi-select</b> component to add <b>MultiSelect</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjMultiSelect</b> component is derived from the <b>MultiSelect</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-multi-select</b> component may contain a @see:wijmo/wijmo.angular2.input.WjItemTemplate child directive.
    */
    var WjMultiSelect = WjMultiSelect_1 = (function (_super) {
        __extends(WjMultiSelect, _super);
        function WjMultiSelect(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'checkedItems'.
             */
            _this.wjModelProperty = 'checkedItems';
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
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
             */
            _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
             */
            _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
            _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
             */
            _this.textChangedNg = new core_1.EventEmitter(false);
            _this.textChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
             */
            _this.formatItemNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
             */
            _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
            _this.selectedIndexChangePC = new core_1.EventEmitter(false);
            _this.selectedItemChangePC = new core_1.EventEmitter(false);
            _this.selectedValueChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>checkedItemsChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>checkedItemsChanged</b> Wijmo event name.
             */
            _this.checkedItemsChangedNg = new core_1.EventEmitter(false);
            _this.checkedItemsChangePC = new core_1.EventEmitter(false);
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
        WjMultiSelect.prototype.created = function () {
        };
        WjMultiSelect.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjMultiSelect.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjMultiSelect.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjMultiSelect;
    }(wijmo.input.MultiSelect));
    WjMultiSelect.meta = {
        outputs: exports.wjMultiSelectMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'],
            'textChanged': ['text'],
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
            'checkedItemsChanged': ['checkedItems']
        },
    };
    WjMultiSelect = WjMultiSelect_1 = __decorate([
        core_1.Component({
            selector: exports.wjMultiSelectMeta.selector,
            template: exports.wjMultiSelectMeta.template,
            inputs: exports.wjMultiSelectMeta.inputs,
            outputs: exports.wjMultiSelectMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMultiSelect_1; }) }
            ].concat(exports.wjMultiSelectMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjMultiSelect);
    exports.WjMultiSelect = WjMultiSelect;
    exports.wjMultiAutoCompleteMeta = {
        selector: 'wj-multi-auto-complete',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'displayMemberPath',
            'selectedValuePath',
            'headerPath',
            'isContentHtml',
            'isEditable',
            'maxDropDownHeight',
            'maxDropDownWidth',
            'itemFormatter',
            'delay',
            'maxItems',
            'minLength',
            'cssMatch',
            'itemsSourceFunction',
            'searchMemberPath',
            'maxSelectedItems',
            'selectedItems',
            'itemsSource',
            'selectedMemberPath',
            'text',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'formatItemNg: formatItem',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
            'selectedItemsChangedNg: selectedItemsChanged',
            'selectedItemsChangePC: selectedItemsChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.MultiAutoComplete control.
     *
     * Use the <b>wj-multi-auto-complete</b> component to add <b>MultiAutoComplete</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjMultiAutoComplete</b> component is derived from the <b>MultiAutoComplete</b> control and
     * inherits all its properties, events and methods.
    */
    var WjMultiAutoComplete = WjMultiAutoComplete_1 = (function (_super) {
        __extends(WjMultiAutoComplete, _super);
        function WjMultiAutoComplete(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'selectedItems'.
             */
            _this.wjModelProperty = 'selectedItems';
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
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
             */
            _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
             */
            _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
            _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
             */
            _this.textChangedNg = new core_1.EventEmitter(false);
            _this.textChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
             */
            _this.formatItemNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
             */
            _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
            _this.selectedIndexChangePC = new core_1.EventEmitter(false);
            _this.selectedItemChangePC = new core_1.EventEmitter(false);
            _this.selectedValueChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectedItemsChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectedItemsChanged</b> Wijmo event name.
             */
            _this.selectedItemsChangedNg = new core_1.EventEmitter(false);
            _this.selectedItemsChangePC = new core_1.EventEmitter(false);
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
        WjMultiAutoComplete.prototype.created = function () {
        };
        WjMultiAutoComplete.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjMultiAutoComplete.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjMultiAutoComplete.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjMultiAutoComplete;
    }(wijmo.input.MultiAutoComplete));
    WjMultiAutoComplete.meta = {
        outputs: exports.wjMultiAutoCompleteMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'],
            'textChanged': ['text'],
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
            'selectedItemsChanged': ['selectedItems']
        },
    };
    WjMultiAutoComplete = WjMultiAutoComplete_1 = __decorate([
        core_1.Component({
            selector: exports.wjMultiAutoCompleteMeta.selector,
            template: exports.wjMultiAutoCompleteMeta.template,
            inputs: exports.wjMultiAutoCompleteMeta.inputs,
            outputs: exports.wjMultiAutoCompleteMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMultiAutoComplete_1; }) }
            ].concat(exports.wjMultiAutoCompleteMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjMultiAutoComplete);
    exports.WjMultiAutoComplete = WjMultiAutoComplete;
    exports.wjInputNumberMeta = {
        selector: 'wj-input-number',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'showSpinner',
            'max',
            'min',
            'step',
            'isRequired',
            'placeholder',
            'inputType',
            'format',
            'isReadOnly',
            'value',
            'text',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.InputNumber control.
     *
     * Use the <b>wj-input-number</b> component to add <b>InputNumber</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjInputNumber</b> component is derived from the <b>InputNumber</b> control and
     * inherits all its properties, events and methods.
    */
    var WjInputNumber = WjInputNumber_1 = (function (_super) {
        __extends(WjInputNumber, _super);
        function WjInputNumber(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
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
             * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
             */
            _this.valueChangedNg = new core_1.EventEmitter(false);
            _this.valueChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
             */
            _this.textChangedNg = new core_1.EventEmitter(false);
            _this.textChangePC = new core_1.EventEmitter(false);
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
        WjInputNumber.prototype.created = function () {
        };
        WjInputNumber.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjInputNumber.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjInputNumber.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjInputNumber;
    }(wijmo.input.InputNumber));
    WjInputNumber.meta = {
        outputs: exports.wjInputNumberMeta.outputs,
        changeEvents: {
            'valueChanged': ['value'],
            'textChanged': ['text']
        },
    };
    WjInputNumber = WjInputNumber_1 = __decorate([
        core_1.Component({
            selector: exports.wjInputNumberMeta.selector,
            template: exports.wjInputNumberMeta.template,
            inputs: exports.wjInputNumberMeta.inputs,
            outputs: exports.wjInputNumberMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputNumber_1; }) }
            ].concat(exports.wjInputNumberMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjInputNumber);
    exports.WjInputNumber = WjInputNumber;
    exports.wjInputDateMeta = {
        selector: 'wj-input-date',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'selectionMode',
            'format',
            'mask',
            'max',
            'min',
            'inputType',
            'itemValidator',
            'itemFormatter',
            'text',
            'value',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.InputDate control.
     *
     * Use the <b>wj-input-date</b> component to add <b>InputDate</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjInputDate</b> component is derived from the <b>InputDate</b> control and
     * inherits all its properties, events and methods.
    */
    var WjInputDate = WjInputDate_1 = (function (_super) {
        __extends(WjInputDate, _super);
        function WjInputDate(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
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
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
             */
            _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
             */
            _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
            _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
             */
            _this.textChangedNg = new core_1.EventEmitter(false);
            _this.textChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
             */
            _this.valueChangedNg = new core_1.EventEmitter(false);
            _this.valueChangePC = new core_1.EventEmitter(false);
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
        WjInputDate.prototype.created = function () {
        };
        WjInputDate.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjInputDate.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjInputDate.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjInputDate;
    }(wijmo.input.InputDate));
    WjInputDate.meta = {
        outputs: exports.wjInputDateMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'],
            'textChanged': ['text'],
            'valueChanged': ['value']
        },
    };
    WjInputDate = WjInputDate_1 = __decorate([
        core_1.Component({
            selector: exports.wjInputDateMeta.selector,
            template: exports.wjInputDateMeta.template,
            inputs: exports.wjInputDateMeta.inputs,
            outputs: exports.wjInputDateMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputDate_1; }) }
            ].concat(exports.wjInputDateMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjInputDate);
    exports.WjInputDate = WjInputDate;
    exports.wjInputTimeMeta = {
        selector: 'wj-input-time',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'displayMemberPath',
            'selectedValuePath',
            'headerPath',
            'isContentHtml',
            'isEditable',
            'maxDropDownHeight',
            'maxDropDownWidth',
            'itemFormatter',
            'max',
            'min',
            'step',
            'format',
            'mask',
            'inputType',
            'itemsSource',
            'text',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
            'value',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'formatItemNg: formatItem',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.InputTime control.
     *
     * Use the <b>wj-input-time</b> component to add <b>InputTime</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjInputTime</b> component is derived from the <b>InputTime</b> control and
     * inherits all its properties, events and methods.
    */
    var WjInputTime = WjInputTime_1 = (function (_super) {
        __extends(WjInputTime, _super);
        function WjInputTime(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
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
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
             */
            _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
             */
            _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
            _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
             */
            _this.textChangedNg = new core_1.EventEmitter(false);
            _this.textChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
             */
            _this.formatItemNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
             */
            _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
            _this.selectedIndexChangePC = new core_1.EventEmitter(false);
            _this.selectedItemChangePC = new core_1.EventEmitter(false);
            _this.selectedValueChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
             */
            _this.valueChangedNg = new core_1.EventEmitter(false);
            _this.valueChangePC = new core_1.EventEmitter(false);
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
        WjInputTime.prototype.created = function () {
        };
        WjInputTime.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjInputTime.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjInputTime.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjInputTime;
    }(wijmo.input.InputTime));
    WjInputTime.meta = {
        outputs: exports.wjInputTimeMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'],
            'textChanged': ['text'],
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
            'valueChanged': ['value']
        },
    };
    WjInputTime = WjInputTime_1 = __decorate([
        core_1.Component({
            selector: exports.wjInputTimeMeta.selector,
            template: exports.wjInputTimeMeta.template,
            inputs: exports.wjInputTimeMeta.inputs,
            outputs: exports.wjInputTimeMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputTime_1; }) }
            ].concat(exports.wjInputTimeMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjInputTime);
    exports.WjInputTime = WjInputTime;
    exports.wjInputDateTimeMeta = {
        selector: 'wj-input-date-time',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'selectionMode',
            'format',
            'mask',
            'max',
            'min',
            'inputType',
            'itemValidator',
            'itemFormatter',
            'timeMax',
            'timeMin',
            'timeStep',
            'timeFormat',
            'text',
            'value',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.InputDateTime control.
     *
     * Use the <b>wj-input-date-time</b> component to add <b>InputDateTime</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjInputDateTime</b> component is derived from the <b>InputDateTime</b> control and
     * inherits all its properties, events and methods.
    */
    var WjInputDateTime = WjInputDateTime_1 = (function (_super) {
        __extends(WjInputDateTime, _super);
        function WjInputDateTime(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
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
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
             */
            _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
             */
            _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
            _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
             */
            _this.textChangedNg = new core_1.EventEmitter(false);
            _this.textChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
             */
            _this.valueChangedNg = new core_1.EventEmitter(false);
            _this.valueChangePC = new core_1.EventEmitter(false);
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
        WjInputDateTime.prototype.created = function () {
        };
        WjInputDateTime.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjInputDateTime.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjInputDateTime.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjInputDateTime;
    }(wijmo.input.InputDateTime));
    WjInputDateTime.meta = {
        outputs: exports.wjInputDateTimeMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'],
            'textChanged': ['text'],
            'valueChanged': ['value']
        },
    };
    WjInputDateTime = WjInputDateTime_1 = __decorate([
        core_1.Component({
            selector: exports.wjInputDateTimeMeta.selector,
            template: exports.wjInputDateTimeMeta.template,
            inputs: exports.wjInputDateTimeMeta.inputs,
            outputs: exports.wjInputDateTimeMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputDateTime_1; }) }
            ].concat(exports.wjInputDateTimeMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjInputDateTime);
    exports.WjInputDateTime = WjInputDateTime;
    exports.wjListBoxMeta = {
        selector: 'wj-list-box',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'isContentHtml',
            'maxHeight',
            'selectedValuePath',
            'itemFormatter',
            'displayMemberPath',
            'checkedMemberPath',
            'itemsSource',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
            'checkedItems',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'formatItemNg: formatItem',
            'itemsChangedNg: itemsChanged',
            'itemCheckedNg: itemChecked',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
            'checkedItemsChangedNg: checkedItemsChanged',
            'checkedItemsChangePC: checkedItemsChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.ListBox control.
     *
     * Use the <b>wj-list-box</b> component to add <b>ListBox</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjListBox</b> component is derived from the <b>ListBox</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-list-box</b> component may contain a @see:wijmo/wijmo.angular2.input.WjItemTemplate child directive.
    */
    var WjListBox = WjListBox_1 = (function (_super) {
        __extends(WjListBox, _super);
        function WjListBox(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'selectedValue'.
             */
            _this.wjModelProperty = 'selectedValue';
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
             * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
             */
            _this.formatItemNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>itemsChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>itemsChanged</b> Wijmo event name.
             */
            _this.itemsChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>itemChecked</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>itemChecked</b> Wijmo event name.
             */
            _this.itemCheckedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
             */
            _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
            _this.selectedIndexChangePC = new core_1.EventEmitter(false);
            _this.selectedItemChangePC = new core_1.EventEmitter(false);
            _this.selectedValueChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>checkedItemsChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>checkedItemsChanged</b> Wijmo event name.
             */
            _this.checkedItemsChangedNg = new core_1.EventEmitter(false);
            _this.checkedItemsChangePC = new core_1.EventEmitter(false);
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
        WjListBox.prototype.created = function () {
        };
        WjListBox.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjListBox.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjListBox.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjListBox;
    }(wijmo.input.ListBox));
    WjListBox.meta = {
        outputs: exports.wjListBoxMeta.outputs,
        changeEvents: {
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
            'checkedItemsChanged': ['checkedItems']
        },
    };
    WjListBox = WjListBox_1 = __decorate([
        core_1.Component({
            selector: exports.wjListBoxMeta.selector,
            template: exports.wjListBoxMeta.template,
            inputs: exports.wjListBoxMeta.inputs,
            outputs: exports.wjListBoxMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjListBox_1; }) }
            ].concat(exports.wjListBoxMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjListBox);
    exports.WjListBox = WjListBox;
    exports.wjMenuMeta = {
        selector: 'wj-menu',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'displayMemberPath',
            'selectedValuePath',
            'headerPath',
            'isContentHtml',
            'isEditable',
            'maxDropDownHeight',
            'maxDropDownWidth',
            'itemFormatter',
            'header',
            'commandParameterPath',
            'commandPath',
            'isButton',
            'itemsSource',
            'text',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
            'value',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'formatItemNg: formatItem',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
            'itemClickedNg: itemClicked',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.Menu control.
     *
     * Use the <b>wj-menu</b> component to add <b>Menu</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjMenu</b> component is derived from the <b>Menu</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-menu</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.input.WjMenuItem
     * , @see:wijmo/wijmo.angular2.input.WjMenuSeparator
     *  and @see:wijmo/wijmo.angular2.input.WjItemTemplate.
    */
    var WjMenu = WjMenu_1 = (function (_super) {
        __extends(WjMenu, _super);
        function WjMenu(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'selectedValue'.
             */
            _this.wjModelProperty = 'selectedValue';
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
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanging</b> Wijmo event name.
             */
            _this.isDroppedDownChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>isDroppedDownChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>isDroppedDownChanged</b> Wijmo event name.
             */
            _this.isDroppedDownChangedNg = new core_1.EventEmitter(false);
            _this.isDroppedDownChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>textChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>textChanged</b> Wijmo event name.
             */
            _this.textChangedNg = new core_1.EventEmitter(false);
            _this.textChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
             */
            _this.formatItemNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectedIndexChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectedIndexChanged</b> Wijmo event name.
             */
            _this.selectedIndexChangedNg = new core_1.EventEmitter(false);
            _this.selectedIndexChangePC = new core_1.EventEmitter(false);
            _this.selectedItemChangePC = new core_1.EventEmitter(false);
            _this.selectedValueChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>itemClicked</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>itemClicked</b> Wijmo event name.
             */
            _this.itemClickedNg = new core_1.EventEmitter(false);
            _this.valueChangePC = new core_1.EventEmitter(false);
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.itemsSource = new wijmo.collections.ObservableArray();
            _this.selectedIndex = 0;
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
        WjMenu.prototype.created = function () {
        };
        WjMenu.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
            this._attachToControl();
            this._updateHeader();
        };
        WjMenu.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjMenu.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
            this.listBox.formatItem.removeHandler(this._fmtItem, this);
            this.listBox.loadingItems.removeHandler(this._loadingItems, this);
        };
        Object.defineProperty(WjMenu.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                //if (this._value != value) {
                this._value = value;
                if (value != null) {
                    this.selectedValue = value;
                    this._updateHeader();
                }
                //this._cdRef.markForCheck();
                //this._appRef.tick();
                //}
            },
            enumerable: true,
            configurable: true
        });
        WjMenu.prototype.ngOnChanges = function (changes) {
            var headerChange = changes['header'];
            if (headerChange) {
                this._definedHeader = headerChange.currentValue;
                this._updateHeader();
            }
        };
        WjMenu.prototype.ngAfterContentInit = function () {
            // to force correct selectedValue and header update
            this.value = this.value;
            //this._updateHeader();
            ////this.itemClicked.addHandler(() => {
            //this.selectedIndexChanged.addHandler(() => {
            //    this.value = this.selectedValue;
            //});
        };
        WjMenu.prototype.onItemClicked = function (e) {
            // assign value before triggering the event, otherwise Ng 'valueChange' will be called with an
            // old 'value' value and two-way binding's source will receive an old value.
            this.value = this.selectedValue;
            _super.prototype.onItemClicked.call(this, e);
        };
        WjMenu.prototype.refresh = function (fullUpdate) {
            if (fullUpdate === void 0) { fullUpdate = true; }
            _super.prototype.refresh.call(this, fullUpdate);
            this._updateHeader();
        };
        WjMenu.prototype._attachToControl = function () {
            this.listBox.formatItem.addHandler(this._fmtItem, this);
            this.listBox.loadingItems.addHandler(this._loadingItems, this);
            //if (this.parent._isInitialized) {
            //    ownerControl.invalidate();
            this.invalidate();
        };
        WjMenu.prototype._loadingItems = function (s) {
            //TBD: will this destroy Wijmo directives in templates?
            //this.viewContainerRef.clear();
            var items = s.hostElement.getElementsByClassName('wj-listbox-item');
            for (var i = items.length - 1; i >= 0; i--) {
                var itemEl = items[i];
                itemEl.textContent = '';
            }
        };
        WjMenu.prototype._fmtItem = function (s, e) {
            if (!(e.data instanceof WjMenuItem)) {
                return;
            }
            var itemEl = e.item;
            itemEl.textContent = '';
            var menuItem = e.data, contentRoot = menuItem.contentRoot;
            if (contentRoot) {
                itemEl.appendChild(contentRoot);
                menuItem.added(itemEl);
            }
        };
        // if the scope has a value, show it in the header
        WjMenu.prototype._updateHeader = function () {
            this.header = this._definedHeader || '';
            var selItem = this.selectedItem;
            if (this.value != null && selItem && this.displayMemberPath) {
                var currentValue = null;
                if (selItem instanceof WjMenuItem) {
                    var contentRoot = selItem.contentRoot;
                    if (contentRoot) {
                        currentValue = contentRoot.innerHTML;
                    }
                    else {
                        currentValue = selItem[this.displayMemberPath];
                    }
                }
                if (currentValue != null) {
                    this.header += ': <b>' + currentValue + '</b>';
                }
            }
        };
        return WjMenu;
    }(wijmo.input.Menu));
    WjMenu.meta = {
        outputs: exports.wjMenuMeta.outputs,
        changeEvents: {
            'isDroppedDownChanged': ['isDroppedDown'],
            'textChanged': ['text'],
            'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
            'itemClicked': ['value']
        },
    };
    WjMenu = WjMenu_1 = __decorate([
        core_1.Component({
            selector: exports.wjMenuMeta.selector,
            template: exports.wjMenuMeta.template,
            inputs: exports.wjMenuMeta.inputs,
            outputs: exports.wjMenuMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMenu_1; }) }
            ].concat(exports.wjMenuMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjMenu);
    exports.WjMenu = WjMenu;
    exports.wjMenuItemMeta = {
        selector: 'wj-menu-item',
        template: "<div *wjMenuItemTemplateDir><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'value',
            'cmd',
            'cmdParam',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see: control.
     *
     * The <b>wj-menu-item</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.input.WjMenu component.
     *
     * Use the <b>wj-menu-item</b> component to add <b></b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
    */
    var WjMenuItem = WjMenuItem_1 = (function () {
        function WjMenuItem(elRef, injector, parentCmp, viewContainerRef, domRenderer) {
            this.viewContainerRef = viewContainerRef;
            this.domRenderer = domRenderer;
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
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'itemsSource'.
             */
            this.wjProperty = 'itemsSource';
            var behavior = this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
            this._ownerMenu = behavior.parentBehavior.directive;
            this.created();
        }
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjMenuItem.prototype.created = function () {
        };
        WjMenuItem.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
            var ownerMenu = this._ownerMenu;
            if (ownerMenu.itemsSource.length == 1 && ownerMenu.selectedIndex < 0) {
                ownerMenu.selectedIndex = 0;
            }
            if (!ownerMenu.displayMemberPath) {
                ownerMenu.displayMemberPath = 'header';
            }
            if (!ownerMenu.selectedValuePath) {
                ownerMenu.selectedValuePath = 'value';
            }
            if (!ownerMenu.commandPath) {
                ownerMenu.commandPath = 'cmd';
            }
            if (!ownerMenu.commandParameterPath) {
                ownerMenu.commandParameterPath = 'cmdParam';
            }
            //ownerMenu.invalidate();
        };
        WjMenuItem.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjMenuItem.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjMenuItem.prototype.added = function (toItem) {
        };
        return WjMenuItem;
    }());
    WjMenuItem.meta = {
        outputs: exports.wjMenuItemMeta.outputs,
        siblingId: 'menuItemDir',
    };
    WjMenuItem = WjMenuItem_1 = __decorate([
        core_1.Component({
            selector: exports.wjMenuItemMeta.selector,
            template: exports.wjMenuItemMeta.template,
            inputs: exports.wjMenuItemMeta.inputs,
            outputs: exports.wjMenuItemMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMenuItem_1; }) }
            ].concat(exports.wjMenuItemMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
        __param(3, core_3.Inject(core_2.ViewContainerRef)),
        __param(4, core_3.Inject(core_2.Renderer))
    ], WjMenuItem);
    exports.WjMenuItem = WjMenuItem;
    var WjMenuItemTemplateDir = (function () {
        function WjMenuItemTemplateDir(viewContainerRef, templateRef, elRef, injector, domRenderer, menuItem, menuSeparator) {
            this.viewContainerRef = viewContainerRef;
            this.templateRef = templateRef;
            this.elRef = elRef;
            this.domRenderer = domRenderer;
            this.ownerItem = menuItem || menuSeparator;
            this.ownerItem.templateDir = this;
        }
        WjMenuItemTemplateDir.prototype.ngAfterContentInit = function () {
            var self = this;
            //Without timeout, we get "LifeCycle.tick is called recursively" exception.
            //this.ngZone.run(() => {
            setTimeout(function () {
                var rootEl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(null, self.viewContainerRef, self.templateRef, self.domRenderer, true).rootElement;
                self.contentRoot = rootEl;
                self.ownerItem.contentRoot = rootEl;
                self.ownerItem._ownerMenu.listBox.invalidate();
                self.ownerItem._ownerMenu.invalidate();
            }, 0);
            //});
        };
        return WjMenuItemTemplateDir;
    }());
    WjMenuItemTemplateDir = __decorate([
        core_2.Directive({
            selector: '[wjMenuItemTemplateDir]',
            inputs: ['wjMenuItemTemplateDir']
        }),
        __param(0, core_3.Inject(core_2.ViewContainerRef)),
        __param(1, core_3.Inject(core_2.TemplateRef)), __param(1, core_2.Optional()),
        __param(2, core_3.Inject(core_2.ElementRef)),
        __param(3, core_3.Inject(core_2.Injector)),
        __param(4, core_3.Inject(core_2.Renderer)),
        __param(5, core_3.Inject(WjMenuItem)), __param(5, core_2.Optional()),
        __param(6, core_3.Inject(core_2.forwardRef(function () { return WjMenuSeparator; }))), __param(6, core_2.Optional())
    ], WjMenuItemTemplateDir);
    exports.WjMenuItemTemplateDir = WjMenuItemTemplateDir;
    exports.wjMenuSeparatorMeta = {
        selector: 'wj-menu-separator',
        template: "<div *wjMenuItemTemplateDir class=\"wj-state-disabled\" style=\"width:100%;height:1px;background-color:lightgray\"></div>",
        inputs: [
            'wjProperty',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see: control.
     *
     * The <b>wj-menu-separator</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.input.WjMenu component.
     *
     * Use the <b>wj-menu-separator</b> component to add <b></b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
    */
    var WjMenuSeparator = WjMenuSeparator_1 = (function (_super) {
        __extends(WjMenuSeparator, _super);
        function WjMenuSeparator(elRef, injector, parentCmp, viewContainerRef, domRenderer) {
            var _this = _super.call(this, elRef, injector, parentCmp, viewContainerRef, domRenderer) || this;
            _this.created();
            return _this;
        }
        WjMenuSeparator.prototype.added = function (toItem) {
            // prevent item selection
            wijmo.addClass(toItem, 'wj-state-disabled');
        };
        return WjMenuSeparator;
    }(WjMenuItem));
    WjMenuSeparator = WjMenuSeparator_1 = __decorate([
        core_1.Component({
            selector: exports.wjMenuSeparatorMeta.selector,
            template: exports.wjMenuSeparatorMeta.template,
            inputs: exports.wjMenuSeparatorMeta.inputs,
            outputs: exports.wjMenuSeparatorMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMenuSeparator_1; }) }
            ].concat(exports.wjMenuSeparatorMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
        __param(3, core_3.Inject(core_2.ViewContainerRef)),
        __param(4, core_3.Inject(core_2.Renderer))
    ], WjMenuSeparator);
    exports.WjMenuSeparator = WjMenuSeparator;
    exports.wjItemTemplateMeta = {
        selector: '[wjItemTemplate]',
        inputs: [
            'wjItemTemplate',
        ],
        outputs: [
            'initialized',
        ],
        exportAs: 'wjItemTemplate',
        providers: []
    };
    /**
     * Angular 2 component for the @see: control.
     *
     * The <b>[wjItemTemplate]</b> directive must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.input.WjListBox
     * , @see:wijmo/wijmo.angular2.input.WjMenu
     * , @see:wijmo/wijmo.angular2.input.WjComboBox
     *  or @see:wijmo/wijmo.angular2.input.WjMultiSelect.
     *
     * The <b>[wjItemTemplate]</b> directive defines a template for items of a component
     * that it's nested in.
     * The template may contain an arbitrary HTML fragment with Angular 2 bindings and directives.
     * The local <b>item</b>, <b>itemIndex</b> and <b>control</b> template variables can be used in Angular 2
     * bindings that refer to the data item, its index, and the owner control. For example:
     *
     *<pre>&lt;wj-list-box style="max-height:300px;width:250px;"
     *             [itemsSource]="musicians"&gt;
     *   &lt;template wjItemTemplate let-item="item" let-itemIndex="itemIndex"&gt;
     *       {&#8203;{itemIndex + 1}}. &lt;b&gt;{&#8203;{item.name}}&lt;/b&gt;
     *       &lt;div *ngIf="item.photo"&gt;
     *           &lt;img [src]="item.photo" height="100" /&gt;
     *           &lt;br /&gt;
     *           &lt;a href="https://www.google.com/#newwindow=1&q=The+Beatles+"
     *              target="_blank"
     *              style="color:red"&gt;go there!&lt;/a&gt;
     *       &lt;/div&gt;
     *   &lt;/template&gt;
     * &lt;/wj-list-box&gt;</pre>
    */
    var WjItemTemplate = WjItemTemplate_1 = (function () {
        function WjItemTemplate(elRef, injector, parentCmp, viewContainerRef, templateRef, domRenderer, cdRef) {
            this.viewContainerRef = viewContainerRef;
            this.templateRef = templateRef;
            this.domRenderer = domRenderer;
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
            this.ownerControl = behavior.parentBehavior.directive;
            this.listBox = WjItemTemplate_1._getListBox(this.ownerControl);
            this._cdRef = cdRef;
            this.created();
        }
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjItemTemplate.prototype.created = function () {
        };
        WjItemTemplate.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
            this._attachToControl();
        };
        WjItemTemplate.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjItemTemplate.prototype.ngOnDestroy = function () {
            var ownerControl = this.ownerControl, listBox = this.listBox;
            if (listBox) {
                listBox.formatItem.removeHandler(this._fmtItem, this);
                listBox.loadingItems.removeHandler(this._loadingItems, this);
            }
            if (ownerControl) {
                ownerControl.invalidate();
            }
        };
        WjItemTemplate.prototype._attachToControl = function () {
            this.listBox.formatItem.addHandler(this._fmtItem, this);
            this.listBox.loadingItems.addHandler(this._loadingItems, this);
            //if (this.parent._isInitialized) {
            //    ownerControl.invalidate();
            this.ownerControl.invalidate();
        };
        WjItemTemplate.prototype._loadingItems = function (s) {
            //TBD: will this destroy Wijmo directives in templates?
            this.viewContainerRef.clear();
        };
        WjItemTemplate.prototype._fmtItem = function (s, e) {
            var itemEl = e.item;
            itemEl.textContent = '';
            var viewRef = this._instantiateTemplate(itemEl);
            //viewRef.setLocal('control', s);
            //viewRef.setLocal('item', e.data);
            //viewRef.setLocal('itemIndex', e.index);
            viewRef.context.control = s;
            viewRef.context.item = e.data;
            viewRef.context.itemIndex = e.index;
            // Force change detection before itemsLoaded==>selectedIndexChanged, in order
            // to provide ComboBox with a consistent display text for its item search
            // functionality.
            if (e.index === (this.listBox.collectionView.items.length - 1)) {
                this._cdRef.detectChanges();
            }
        };
        WjItemTemplate.prototype._instantiateTemplate = function (parent) {
            return wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(parent, this.viewContainerRef, this.templateRef, this.domRenderer).viewRef;
        };
        // Gets a ListBox control whose items are templated, it maybe the control itself or internal ListBox used by controls like
        // ComboBox.
        WjItemTemplate._getListBox = function (ownerControl) {
            if (ownerControl) {
                return ownerControl instanceof wijmo.input.ListBox ? ownerControl : ownerControl.listBox;
            }
            return null;
        };
        return WjItemTemplate;
    }());
    WjItemTemplate.meta = {
        outputs: exports.wjItemTemplateMeta.outputs,
        parentRefProperty: 'owner',
    };
    WjItemTemplate = WjItemTemplate_1 = __decorate([
        core_2.Directive({
            selector: exports.wjItemTemplateMeta.selector,
            inputs: exports.wjItemTemplateMeta.inputs,
            outputs: exports.wjItemTemplateMeta.outputs,
            exportAs: exports.wjItemTemplateMeta.exportAs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjItemTemplate_1; }) }
            ].concat(exports.wjItemTemplateMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
        __param(3, core_3.Inject(core_2.ViewContainerRef)),
        __param(4, core_3.Inject(core_2.TemplateRef)), __param(4, core_2.Optional()),
        __param(5, core_3.Inject(core_2.Renderer)),
        __param(6, core_3.Inject(core_3.ChangeDetectorRef))
    ], WjItemTemplate);
    exports.WjItemTemplate = WjItemTemplate;
    exports.wjPopupMeta = {
        selector: 'wj-popup',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'owner',
            'showTrigger',
            'hideTrigger',
            'fadeIn',
            'fadeOut',
            'dialogResultEnter',
            'modal',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'showingNg: showing',
            'shownNg: shown',
            'hidingNg: hiding',
            'hiddenNg: hidden',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.Popup control.
     *
     * Use the <b>wj-popup</b> component to add <b>Popup</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjPopup</b> component is derived from the <b>Popup</b> control and
     * inherits all its properties, events and methods.
    */
    var WjPopup = WjPopup_1 = (function (_super) {
        __extends(WjPopup, _super);
        function WjPopup(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>showing</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>showing</b> Wijmo event name.
             */
            _this.showingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>shown</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>shown</b> Wijmo event name.
             */
            _this.shownNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>hiding</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>hiding</b> Wijmo event name.
             */
            _this.hidingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>hidden</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>hidden</b> Wijmo event name.
             */
            _this.hiddenNg = new core_1.EventEmitter(false);
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
        WjPopup.prototype.created = function () {
        };
        WjPopup.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjPopup.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjPopup.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjPopup.prototype.ngOnChanges = function (changes) {
            var ownerChange = changes['owner'];
            if (ownerChange) {
                if (this.modal == null) {
                    this.modal = this.owner ? false : true;
                }
            }
        };
        WjPopup.prototype.dispose = function () {
            //TBD: patch, should be fixed in the base class
            // hide if visible
            if (this.isVisible) {
                this.hiding.removeAllHandlers();
                // don't use this trick, it prevents popup's DOM tree from removal
                //(<HTMLElement>this._elRef.nativeElement).style.display = "none";
                // suppress fade animation because it may cause weird effects in some scenarious (e.g. in cell editor)
                this.fadeOut = false;
                this.hide();
                //if (this._modal) {
                //    wijmo.hidePopup(this._bkdrop);
                //}
                //wijmo.hidePopup(this.hostElement);
            }
            // release owner
            //this._owner = null;
            // dispose as usual
            _super.prototype.dispose.call(this);
        };
        return WjPopup;
    }(wijmo.input.Popup));
    WjPopup.meta = {
        outputs: exports.wjPopupMeta.outputs,
    };
    WjPopup = WjPopup_1 = __decorate([
        core_1.Component({
            selector: exports.wjPopupMeta.selector,
            template: exports.wjPopupMeta.template,
            inputs: exports.wjPopupMeta.inputs,
            outputs: exports.wjPopupMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPopup_1; }) }
            ].concat(exports.wjPopupMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjPopup);
    exports.WjPopup = WjPopup;
    /**
        * Angular 2 directive for context menus.
        *
        * Use the <b>wjContextMenu</b> directive to add context menus to elements
        * on the page. The wjContextMenu directive is based on the <b>wj-menu</b>
        * component; it displays a popup menu when the user performs a context menu
        * request on an element (usually a right-click).
        *
        * The wjContextMenu directive is specified as a parameter added to the
        * element that the context menu applies to. The parameter value is a
        * reference to the <b>wj-menu</b> component. For example:
        *
        * <pre>&lt;!-- paragraph with a context menu --&gt;
        *&lt;p [wjContextMenu]="menu" &gt;
        *  This paragraph has a context menu.&lt;/p&gt;
        *
        *&lt;!-- define the context menu (hidden and with an id) --&gt;
        *&lt;wj-menu #menu style="display:none"&gt;
        *  &lt;wj-menu-item [cmd]="cmdOpen" [cmdParam] ="1"&gt;Open...&lt;/wj-menu-item&gt;
        *  &lt;wj-menu-item [cmd]="cmdSave" [cmdParam]="2"&gt;Save &lt;/wj-menu-item&gt;
        *  &lt;wj-menu-item [cmd]="cmdSave" [cmdParam]="3"&gt;Save As...&lt;/wj-menu-item&gt;
        *  &lt;wj-menu-item [cmd]="cmdNew" [cmdParam] ="4"&gt;New...&lt;/wj-menu-item&gt;
        *  &lt;wj-menu-separator&gt;&lt;/wj-menu-separator&gt;
        *  &lt;wj-menu-item [cmd]="cmdExit" [cmdParam]="5"&gt;Exit&lt;/wj-menu-item&gt;
        *&lt;/wj-menu &gt;</pre>
        */
    var WjContextMenu = (function () {
        function WjContextMenu(elRef) {
            this.elRef = elRef;
        }
        WjContextMenu.prototype.onContextMenu = function (e) {
            var menu = this.wjContextMenu, dropDown = menu.dropDown;
            if (menu && dropDown && !wijmo.closest(e.target, '[disabled]')) {
                e.preventDefault();
                menu.owner = this.elRef.nativeElement;
                menu.selectedIndex = -1;
                if (menu.onIsDroppedDownChanging(new wijmo.CancelEventArgs())) {
                    wijmo.showPopup(dropDown, e);
                    menu.onIsDroppedDownChanged();
                    dropDown.focus();
                }
            }
        };
        return WjContextMenu;
    }());
    WjContextMenu = __decorate([
        core_2.Directive({
            selector: '[wjContextMenu]',
            inputs: ['wjContextMenu'],
            exportAs: 'wjContextMenu',
            host: { '(contextmenu)': 'onContextMenu($event)' }
        }),
        __param(0, core_3.Inject(core_2.ElementRef))
    ], WjContextMenu);
    exports.WjContextMenu = WjContextMenu;
    exports.wjCollectionViewNavigatorMeta = {
        selector: 'wj-collection-view-navigator',
        template: "<div class=\"wj-control wj-content wj-pager\">\n                <div class=\"wj-input-group\">\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                           (click)=\"cv.moveCurrentToFirst()\"\n                           [disabled]=\"!cv || cv?.currentPosition <= 0\">\n                            <span class=\"wj-glyph-left\" style=\"margin-right: -4px;\"></span>\n                            <span class=\"wj-glyph-left\"></span>\n                         </button>\n                    </span>\n                    <span class=\"wj-input-group-btn\" >\n                       <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                           (click)=\"cv.moveCurrentToPrevious()\"\n                           [disabled]=\"!cv || cv?.currentPosition <= 0\">\n                            <span class=\"wj-glyph-left\"></span>\n                       </button>\n                    </span>\n                    <input type=\"text\" class=\"wj-form-control\" \n                           value=\"{{cv?.currentPosition + 1 | number}} / {{cv?.itemCount | number}}\" \n                           disabled />\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                           (click)=\"cv.moveCurrentToNext()\"\n                           [disabled]=\"!cv || cv?.currentPosition >= cv?.itemCount - 1\">\n                            <span class=\"wj-glyph-right\"></span>\n                        </button>\n                    </span>\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                           (click)=\"cv.moveCurrentToLast()\"\n                           [disabled]=\"!cv || cv?.currentPosition >= cv?.itemCount - 1\">\n                            <span class=\"wj-glyph-right\"></span>\n                            <span class=\"wj-glyph-right\" style=\"margin-left: -4px;\"></span>\n                        </button>\n                    </span>\n                </div>\n            </div>",
        inputs: [
            'wjModelProperty',
            'cv',
        ],
        outputs: [
            'initialized',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
        * Angular 2 component for an @see:ICollectionView navigator element.
        *
        * Use the <b>wj-collection-view-navigator</b> component to add an element
        * that allows users to navigate through the items in an @see:ICollectionView.
        * For details about Angular 2 markup syntax, see
        * <a href="static/angular2Markup.html">Angular 2 Markup</a>. For example:
        *
        * <pre>&lt;wj-collection-view-navigator
        *   [cv]="myCollectionView"&gt;
        * &lt;/wj-collection-view-navigator&gt;</pre>
        */
    var WjCollectionViewNavigator = WjCollectionViewNavigator_1 = (function () {
        function WjCollectionViewNavigator(elRef, injector, parentCmp) {
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
            this.created();
        }
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjCollectionViewNavigator.prototype.created = function () {
        };
        WjCollectionViewNavigator.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjCollectionViewNavigator.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjCollectionViewNavigator.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjCollectionViewNavigator;
    }());
    WjCollectionViewNavigator.meta = {
        outputs: exports.wjCollectionViewNavigatorMeta.outputs,
    };
    WjCollectionViewNavigator = WjCollectionViewNavigator_1 = __decorate([
        core_1.Component({
            selector: exports.wjCollectionViewNavigatorMeta.selector,
            template: exports.wjCollectionViewNavigatorMeta.template,
            inputs: exports.wjCollectionViewNavigatorMeta.inputs,
            outputs: exports.wjCollectionViewNavigatorMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjCollectionViewNavigator_1; }) }
            ].concat(exports.wjCollectionViewNavigatorMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjCollectionViewNavigator);
    exports.WjCollectionViewNavigator = WjCollectionViewNavigator;
    exports.wjCollectionViewPagerMeta = {
        selector: 'wj-collection-view-pager',
        template: "<div class=\"wj-control wj-content wj-pager\" >\n                <div class=\"wj-input-group\">\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                            (click)=\"cv.moveToFirstPage()\"\n                            [disabled]=\"!cv || cv?.pageIndex <= 0\">\n                            <span class=\"wj-glyph-left\" style=\"margin-right: -4px;\"></span>\n                            <span class=\"wj-glyph-left\"></span>\n                        </button>\n                    </span>\n                    <span class=\"wj-input-group-btn\" >\n                    <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                            (click)=\"cv.moveToPreviousPage()\"\n                            [disabled]=\"!cv || cv?.pageIndex <= 0\">\n                            <span class=\"wj-glyph-left\"></span>\n                        </button>\n                    </span>\n                    <input type=\"text\" class=\"wj-form-control\" \n                           value=\"{{cv?.pageIndex + 1 | number}} / {{cv?.pageCount | number}}\" \n                           disabled />\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                            (click)=\"cv.moveToNextPage()\"\n                            [disabled]=\"!cv || cv?.pageIndex >= cv?.pageCount - 1\">\n                            <span class=\"wj-glyph-right\"></span>\n                        </button>\n                    </span>\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                            (click)=\"cv.moveToLastPage()\"\n                            [disabled]=\"!cv || cv?.pageIndex >= cv?.pageCount - 1\">\n                            <span class=\"wj-glyph-right\"></span>\n                            <span class=\"wj-glyph-right\" style=\"margin-left: -4px;\"></span>\n                        </button>\n                    </span>\n                </div>\n            </div>",
        inputs: [
            'wjModelProperty',
            'cv',
        ],
        outputs: [
            'initialized',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
        * Angular 2 component for an @see:ICollectionView pager element.
        *
        * Use the <b>wj-collection-view-pager</b> component to add an element
        * that allows users to navigate through the pages in a paged @see:ICollectionView.
        * For details about Angular 2 markup syntax, see
        * <a href="static/angular2Markup.html">Angular 2 Markup</a>. For example:
        *
        * <pre>&lt;wj-collection-view-pager
        *   [cv]="myCollectionView"&gt;
        * &lt;/wj-collection-view-pager&gt;</pre>
        */
    var WjCollectionViewPager = WjCollectionViewPager_1 = (function () {
        function WjCollectionViewPager(elRef, injector, parentCmp) {
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
            this.created();
        }
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjCollectionViewPager.prototype.created = function () {
        };
        WjCollectionViewPager.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjCollectionViewPager.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjCollectionViewPager.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjCollectionViewPager;
    }());
    WjCollectionViewPager.meta = {
        outputs: exports.wjCollectionViewPagerMeta.outputs,
    };
    WjCollectionViewPager = WjCollectionViewPager_1 = __decorate([
        core_1.Component({
            selector: exports.wjCollectionViewPagerMeta.selector,
            template: exports.wjCollectionViewPagerMeta.template,
            inputs: exports.wjCollectionViewPagerMeta.inputs,
            outputs: exports.wjCollectionViewPagerMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjCollectionViewPager_1; }) }
            ].concat(exports.wjCollectionViewPagerMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjCollectionViewPager);
    exports.WjCollectionViewPager = WjCollectionViewPager;
    var moduleExports = [
        WjComboBox,
        WjAutoComplete,
        WjCalendar,
        WjColorPicker,
        WjInputMask,
        WjInputColor,
        WjMultiSelect,
        WjMultiAutoComplete,
        WjInputNumber,
        WjInputDate,
        WjInputTime,
        WjInputDateTime,
        WjListBox,
        WjMenu,
        WjMenuItem,
        WjMenuSeparator,
        WjItemTemplate,
        WjPopup,
        WjContextMenu,
        WjCollectionViewNavigator,
        WjCollectionViewPager
    ];
    var WjInputModule = (function () {
        function WjInputModule() {
        }
        return WjInputModule;
    }());
    WjInputModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.concat([WjMenuItemTemplateDir]),
            exports: moduleExports.slice(),
        })
    ], WjInputModule);
    exports.WjInputModule = WjInputModule;
    var WjComboBox_1, WjAutoComplete_1, WjCalendar_1, WjColorPicker_1, WjInputMask_1, WjInputColor_1, WjMultiSelect_1, WjMultiAutoComplete_1, WjInputNumber_1, WjInputDate_1, WjInputTime_1, WjInputDateTime_1, WjListBox_1, WjMenu_1, WjMenuItem_1, WjMenuSeparator_1, WjItemTemplate_1, WjPopup_1, WjCollectionViewNavigator_1, WjCollectionViewPager_1;
});

///<wijmo-soft-import from="wijmo.input"/>
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
define("wijmo/wijmo.angular2.grid", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexGridMeta = {
        selector: 'wj-flex-grid',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'newRowAtTop',
            'allowAddNew',
            'allowDelete',
            'allowDragging',
            'allowMerging',
            'allowResizing',
            'allowSorting',
            'autoSizeMode',
            'autoGenerateColumns',
            'childItemsPath',
            'groupHeaderFormat',
            'headersVisibility',
            'showSelectedHeaders',
            'showMarquee',
            'itemFormatter',
            'isReadOnly',
            'imeEnabled',
            'mergeManager',
            'selectionMode',
            'showGroups',
            'showSort',
            'showAlternatingRows',
            'showErrors',
            'validateEdits',
            'treeIndent',
            'itemsSource',
            'autoClipboard',
            'frozenRows',
            'frozenColumns',
            'deferResizing',
            'sortRowIndex',
            'stickyHeaders',
            'preserveSelectedState',
            'preserveOutlineState',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'beginningEditNg: beginningEdit',
            'cellEditEndedNg: cellEditEnded',
            'cellEditEndingNg: cellEditEnding',
            'prepareCellForEditNg: prepareCellForEdit',
            'formatItemNg: formatItem',
            'resizingColumnNg: resizingColumn',
            'resizedColumnNg: resizedColumn',
            'autoSizingColumnNg: autoSizingColumn',
            'autoSizedColumnNg: autoSizedColumn',
            'draggingColumnNg: draggingColumn',
            'draggingColumnOverNg: draggingColumnOver',
            'draggedColumnNg: draggedColumn',
            'sortingColumnNg: sortingColumn',
            'sortedColumnNg: sortedColumn',
            'resizingRowNg: resizingRow',
            'resizedRowNg: resizedRow',
            'autoSizingRowNg: autoSizingRow',
            'autoSizedRowNg: autoSizedRow',
            'draggingRowNg: draggingRow',
            'draggingRowOverNg: draggingRowOver',
            'draggedRowNg: draggedRow',
            'deletingRowNg: deletingRow',
            'loadingRowsNg: loadingRows',
            'loadedRowsNg: loadedRows',
            'rowEditStartingNg: rowEditStarting',
            'rowEditStartedNg: rowEditStarted',
            'rowEditEndingNg: rowEditEnding',
            'rowEditEndedNg: rowEditEnded',
            'rowAddedNg: rowAdded',
            'groupCollapsedChangedNg: groupCollapsedChanged',
            'groupCollapsedChangingNg: groupCollapsedChanging',
            'itemsSourceChangedNg: itemsSourceChanged',
            'selectionChangingNg: selectionChanging',
            'selectionChangedNg: selectionChanged',
            'scrollPositionChangedNg: scrollPositionChanged',
            'updatingViewNg: updatingView',
            'updatedViewNg: updatedView',
            'updatingLayoutNg: updatingLayout',
            'updatedLayoutNg: updatedLayout',
            'pastingNg: pasting',
            'pastedNg: pasted',
            'pastingCellNg: pastingCell',
            'pastedCellNg: pastedCell',
            'copyingNg: copying',
            'copiedNg: copied',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.FlexGrid control.
     *
     * Use the <b>wj-flex-grid</b> component to add <b>FlexGrid</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>. For example:
     *
     * <pre>&lt;p&gt;Here is a data bound FlexGrid control with four columns:&lt;/p&gt;
     * &lt;wj-flex-grid [itemsSource]="data"&gt;
     *   &lt;wj-flex-grid-column
     *     [header]="'Country'"
     *     [binding]="'country'"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column
     *     [header]="'Sales'"
     *     [binding]="'sales'"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column
     *     [header]="'Expenses'"
     *     [binding]="'expenses'"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column
     *     [header]="'Downloads'"
     *     [binding]="'downloads'"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     * &lt;/wj-flex-grid&gt;</pre>
     *
    
     * The <b>WjFlexGrid</b> component is derived from the <b>FlexGrid</b> control and
     * inherits all its properties, events and methods.
     * The following properties are not available for binding in templates:
     * <b>scrollPosition</b>, <b>selection</b> and <b>columnLayout</b> properties.
     *
     * The <b>wj-flex-grid</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.grid.detail.WjFlexGridDetail
     * , @see:wijmo/wijmo.angular2.grid.filter.WjFlexGridFilter
     * , @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn
     *  and @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate.
    */
    var WjFlexGrid = WjFlexGrid_1 = (function (_super) {
        __extends(WjFlexGrid, _super);
        function WjFlexGrid(elRef, injector, parentCmp, cdRef) {
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
             * Angular (EventEmitter) version of the Wijmo <b>beginningEdit</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>beginningEdit</b> Wijmo event name.
             */
            _this.beginningEditNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>cellEditEnded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>cellEditEnded</b> Wijmo event name.
             */
            _this.cellEditEndedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>cellEditEnding</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>cellEditEnding</b> Wijmo event name.
             */
            _this.cellEditEndingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>prepareCellForEdit</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>prepareCellForEdit</b> Wijmo event name.
             */
            _this.prepareCellForEditNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
             */
            _this.formatItemNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizingColumn</b> Wijmo event name.
             */
            _this.resizingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizedColumn</b> Wijmo event name.
             */
            _this.resizedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizingColumn</b> Wijmo event name.
             */
            _this.autoSizingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizedColumn</b> Wijmo event name.
             */
            _this.autoSizedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingColumn</b> Wijmo event name.
             */
            _this.draggingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingColumnOver</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingColumnOver</b> Wijmo event name.
             */
            _this.draggingColumnOverNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggedColumn</b> Wijmo event name.
             */
            _this.draggedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>sortingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>sortingColumn</b> Wijmo event name.
             */
            _this.sortingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>sortedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>sortedColumn</b> Wijmo event name.
             */
            _this.sortedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizingRow</b> Wijmo event name.
             */
            _this.resizingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizedRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizedRow</b> Wijmo event name.
             */
            _this.resizedRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizingRow</b> Wijmo event name.
             */
            _this.autoSizingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizedRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizedRow</b> Wijmo event name.
             */
            _this.autoSizedRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingRow</b> Wijmo event name.
             */
            _this.draggingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingRowOver</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingRowOver</b> Wijmo event name.
             */
            _this.draggingRowOverNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggedRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggedRow</b> Wijmo event name.
             */
            _this.draggedRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>deletingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>deletingRow</b> Wijmo event name.
             */
            _this.deletingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>loadingRows</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>loadingRows</b> Wijmo event name.
             */
            _this.loadingRowsNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>loadedRows</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>loadedRows</b> Wijmo event name.
             */
            _this.loadedRowsNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditStarting</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditStarting</b> Wijmo event name.
             */
            _this.rowEditStartingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditStarted</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditStarted</b> Wijmo event name.
             */
            _this.rowEditStartedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditEnding</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditEnding</b> Wijmo event name.
             */
            _this.rowEditEndingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditEnded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditEnded</b> Wijmo event name.
             */
            _this.rowEditEndedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowAdded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowAdded</b> Wijmo event name.
             */
            _this.rowAddedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>groupCollapsedChanged</b> Wijmo event name.
             */
            _this.groupCollapsedChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>groupCollapsedChanging</b> Wijmo event name.
             */
            _this.groupCollapsedChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>itemsSourceChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>itemsSourceChanged</b> Wijmo event name.
             */
            _this.itemsSourceChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanging</b> Wijmo event name.
             */
            _this.selectionChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
             */
            _this.selectionChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>scrollPositionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>scrollPositionChanged</b> Wijmo event name.
             */
            _this.scrollPositionChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatingView</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatingView</b> Wijmo event name.
             */
            _this.updatingViewNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatedView</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatedView</b> Wijmo event name.
             */
            _this.updatedViewNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatingLayout</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatingLayout</b> Wijmo event name.
             */
            _this.updatingLayoutNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatedLayout</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatedLayout</b> Wijmo event name.
             */
            _this.updatedLayoutNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pasting</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pasting</b> Wijmo event name.
             */
            _this.pastingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pasted</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pasted</b> Wijmo event name.
             */
            _this.pastedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pastingCell</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pastingCell</b> Wijmo event name.
             */
            _this.pastingCellNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pastedCell</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pastedCell</b> Wijmo event name.
             */
            _this.pastedCellNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>copying</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>copying</b> Wijmo event name.
             */
            _this.copyingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>copied</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>copied</b> Wijmo event name.
             */
            _this.copiedNg = new core_1.EventEmitter(false);
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            new DirectiveCellFactory(_this, cdRef);
            //TBD: patch: default row height, remove after the issue will be fixed in grid
            _this.deferUpdate(function () {
                if (_this.rows.defaultSize < 10) {
                    var e = _this.hostElement, csh = getComputedStyle(e), csb = getComputedStyle(document.body), defRowHei = parseInt(csh.fontSize && wijmo.contains(document.body, e) ? csh.fontSize : csb.fontSize) * 2;
                    _this.rows.defaultSize = defRowHei;
                    _this.columns.defaultSize = defRowHei * 4;
                    _this.columnHeaders.rows.defaultSize = defRowHei;
                    _this.rowHeaders.columns.defaultSize = Math.round(defRowHei * 1.25);
                }
            });
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
        WjFlexGrid.prototype.created = function () {
        };
        WjFlexGrid.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexGrid.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexGrid.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexGrid;
    }(wijmo.grid.FlexGrid));
    WjFlexGrid.meta = {
        outputs: exports.wjFlexGridMeta.outputs,
    };
    WjFlexGrid = WjFlexGrid_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexGridMeta.selector,
            template: exports.wjFlexGridMeta.template,
            inputs: exports.wjFlexGridMeta.inputs,
            outputs: exports.wjFlexGridMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGrid_1; }) }
            ].concat(exports.wjFlexGridMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
        __param(3, core_3.Inject(core_3.ChangeDetectorRef))
    ], WjFlexGrid);
    exports.WjFlexGrid = WjFlexGrid;
    exports.wjFlexGridColumnMeta = {
        selector: 'wj-flex-grid-column',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'name',
            'dataMap',
            'dataType',
            'binding',
            'sortMemberPath',
            'format',
            'header',
            'width',
            'minWidth',
            'maxWidth',
            'align',
            'allowDragging',
            'allowSorting',
            'allowResizing',
            'allowMerging',
            'aggregate',
            'isReadOnly',
            'cssClass',
            'isContentHtml',
            'isSelected',
            'visible',
            'wordWrap',
            'mask',
            'inputType',
            'isRequired',
            'showDropDown',
            'dropDownCssClass',
        ],
        outputs: [
            'initialized',
            'isSelectedChangePC: isSelectedChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.Column control.
     *
     * The <b>wj-flex-grid-column</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
     *
     * Use the <b>wj-flex-grid-column</b> component to add <b>Column</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexGridColumn</b> component is derived from the <b>Column</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-grid-column</b> component may contain a @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate child directive.
    */
    var WjFlexGridColumn = WjFlexGridColumn_1 = (function (_super) {
        __extends(WjFlexGridColumn, _super);
        function WjFlexGridColumn(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'columns'.
             */
            _this.wjProperty = 'columns';
            _this.isSelectedChangePC = new core_1.EventEmitter(false);
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            var gridCmp = behavior.parentBehavior.directive;
            if (gridCmp.autoGenerateColumns) {
                gridCmp.autoGenerateColumns = false;
                gridCmp.columns.clear();
            }
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
        WjFlexGridColumn.prototype.created = function () {
        };
        WjFlexGridColumn.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexGridColumn.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexGridColumn.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexGridColumn;
    }(wijmo.grid.Column));
    WjFlexGridColumn.meta = {
        outputs: exports.wjFlexGridColumnMeta.outputs,
        changeEvents: {
            'grid.selectionChanged': ['isSelected']
        },
    };
    WjFlexGridColumn = WjFlexGridColumn_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexGridColumnMeta.selector,
            template: exports.wjFlexGridColumnMeta.template,
            inputs: exports.wjFlexGridColumnMeta.inputs,
            outputs: exports.wjFlexGridColumnMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridColumn_1; }) }
            ].concat(exports.wjFlexGridColumnMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexGridColumn);
    exports.WjFlexGridColumn = WjFlexGridColumn;
    /**
    * Angular 2 directive for the @see:FlexGrid cell templates.
    *
    * The <b>wjFlexGridCellTemplate</b> directive defines a template for a certain
    * cell type in @see:FlexGrid. The template should be defined on a <b>&lt;template&gt;</b> element
    * and must contain a <b>cellType</b> attribute that
    * specifies the @see:wijmo/wijmo.angular2.grid.CellTemplateType. Depending on the template's cell type,
    * the <b>&lt;template&gt;</b> element with the <b>wjFlexGridCellTemplate</b> directive must be a child
    * of either @see:wijmo/wijmo.angular2.grid.WjFlexGrid
    * or @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn directives.
    *
    * Column-specific cell templates must be contained in <b>wj-flex-grid-column</b>
    * components, and cells that are not column-specific (like row header or top left cells)
    * must be contained in the <b>wj-flex-grid</b> component.
    *
    * The <b>&lt;template&gt;</b> element with the <b>wjFlexGridCellTemplate</b> directive
    * may contain an arbitrary HTML fragment with Angular 2 interpolation expressions and
    * other components and directives.
    *
    * Bindings in HTML fragment can use the <b>cell</b> local template variable containing the cell context object,
    * with <b>col</b>, <b>row</b>, and <b>item</b> properties that refer to the @see:Column,
    * @see:Row, and <b>Row.dataItem</b> objects pertaining to the cell.
    *
    * For cell types like <b>Group</b> and <b>CellEdit</b>, an additional <b>value</b>
    * property containing an unformatted cell value is provided. For example, here is a
    * @see:FlexGrid control with templates for row header cells and, regular
    * and column header cells of the Country column:
    *
    * <pre>import * as wjGrid from 'wijmo/wijmo.angular2.grid';
    * &nbsp;
    * &#64;Component({
    *     directives: [wjGrid.WjFlexGrid, wjGrid.WjFlexGridColumn, wjGrid.WjFlexGridCellTemplate],
    *     template: `
    * &lt;wj-flex-grid [itemsSource]="data"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeader'" let-cell="cell"&gt;
    *     {&#8203;{cell.row.index}}
    *   &lt;/template&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
    *     ...
    *   &lt;/template&gt;
    * &nbsp;
    *   &lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
    *     &lt;template wjFlexGridCellTemplate [cellType]="'ColumnHeader'" let-cell="cell"&gt;
    *       &lt;img src="resources/globe.png" /&gt;
    *         {&#8203;{cell.col.header}}
    *     &lt;/template&gt;
    *     &lt;template wjFlexGridCellTemplate [cellType]="'Cell'" let-cell="cell"&gt;
    *       &lt;img src="resources/{&#8203;{cell.item.country}}.png" /&gt;
    *       {&#8203;{cell.item.country}}
    *     &lt;/template&gt;
    *   &lt;/wj-flex-grid-column&gt;
    *   &lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'"&gt;&lt;/wj-flex-grid-column&gt;
    * &lt;/wj-flex-grid&gt;
    * `,
    *     selector: 'my-cmp',
    * })
    * export class MyCmp {
    *     data: any[];
    * }</pre>
    *
    * For more detailed information on specific cell type templates, refer to the
    * documentation for @see:wijmo/wijmo.angular2.grid.CellTemplateType enumeration.
    *
    * The <b>wjFlexGridCellTemplate</b> directive supports the following attributes:
    *
    * <dl class="dl-horizontal">
    *   <dt>cellType</dt>
    *   <dd>
    *     The <b>CellTemplateType</b> value defining the type of cell to which the template is applied.
    *   </dd>
    *   <dt>cellOverflow</dt>
    *   <dd>
    *     Defines the <b>style.overflow</b> property value for cells.
    *   </dd>
    * </dl>
    *
    * The <b>cellType</b> attribute takes any of the following enumerated values:
    *
    * <b>Cell</b>
    *
    * Defines a regular (data) cell template. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
    * For example, this cell template shows flags in the cells of Country column:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'Cell'" let-cell="cell"&gt;
    *     &lt;img src="resources/{&#8203;{cell.item.country}}.png" /&gt;
    *     {&#8203;{cell.item.country}}
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * If <b>Group</b> template is not provided for a hierarchical @see:FlexGrid (that is, one with the <b>childItemsPath</b> property
    * specified), non-header cells in group rows of
    * this @see:Column also use this template.
    *
    * <b>CellEdit</b>
    *
    * Defines a template for a cell in edit mode. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
    * This cell type has an additional <b>cell.value</b> property available for binding. It contains the
    * original cell value before editing, and the updated value after editing.
    
    * For example, here is a template that uses the Wijmo @see:InputNumber control as an editor
    * for the "Sales" column:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'CellEdit'"&gt;
    *     &lt;wj-input-number [(value)]="cell.value" [step]="1"&gt;&lt;/wj-input-number&gt;
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>ColumnHeader</b>
    *
    * Defines a template for a column header cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
    * For example, this template adds an image to the header of the "Country" column:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'ColumnHeader'" let-cell="cell"&gt;
    *     &lt;img src="resources/globe.png" /&gt;
    *       {&#8203;{cell.col.header}}
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>RowHeader</b>
    *
    * Defines a template for a row header cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
    * For example, this template shows row indices in the row headers:
    *
    * <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeader'" let-cell="cell"&gt;
    *     {&#8203;{cell.row.index + 1}}
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * Note that this template is applied to a row header cell, even if it is in a row that is
    * in edit mode. In order to provide an edit-mode version of a row header cell with alternate
    * content, define the <b>RowHeaderEdit</b> template.
    *
    * <b>RowHeaderEdit</b>
    *
    * Defines a template for a row header cell in edit mode. Must be a child of the
    * @see:wijmo/wijmo.angular2.grid.WjFlexGrid component. For example, this template shows dots in the header
    * of rows being edited:
    *
    * <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
    *     ...
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * Use the following <b>RowHeaderEdit</b> template to add the standard edit-mode indicator to cells where the <b>RowHeader</b> template
    * applies:
    *
    * <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
    *     {&#8203;{&amp;#x270e;}}
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * <b>TopLeft</b>
    *
    * Defines a template for the top left cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
    * For example, this template shows a down/right glyph in the top-left cell of the grid:
    *
    * <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'TopLeft'"&gt;
    *     &lt;span class="wj-glyph-down-right"&gt;&lt;/span&gt;
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * <b>GroupHeader</b>
    *
    * Defines a template for a group header cell in a @see:GroupRow, Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
    *
    * The <b>cell.row</b> property contains an instance of the <b>GroupRow</b> class. If the grouping comes
    * from @see:CollectionView, the <b>cell.item</b> property references the @see:CollectionViewGroup object.
    *
    * For example, this template uses a checkbox element as an expand/collapse toggle:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'GroupHeader'" let-cell="cell"&gt;
    *     &lt;input type="checkbox" [(ngModel)]="cell.row.isCollapsed"/&gt;
    *     {&#8203;{cell.item.name}} ({&#8203;{cell.item.items.length}} items)
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>Group</b>
    *
    * Defines a template for a regular cell (not a group header) in a @see:GroupRow. Must be a child of the
    * @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component. This cell type has an additional <b>cell.value</b> property available for
    * binding. In cases where columns have the <b>aggregate</b> property specified, it contains the unformatted
    * aggregate value.
    *
    * For example, this template shows aggregate's value and kind for group row cells in the "Sales"
    * column:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'" [aggregate]="'Avg'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'Group'" let-cell="cell"&gt;
    *     Average: {&#8203;{cell.value | number:'1.0-0'}}
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>ColumnFooter</b>
    *
    * Defines a template for a regular cell in a <b>columnFooters</b> panel. Must be a child of the
    * @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component. This cell type has an additional <b>cell.value</b>
    * property available for binding that contains a cell value.
    *
    * For example, this template shows aggregate's value and kind for a footer cell in the "Sales"
    * column:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'" [aggregate]="'Avg'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'ColumnFooter'" let-cell="cell"&gt;
    *     Average: {&#8203;{cell.value | number:'1.0-0'}}
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>BottomLeft</b>
    *
    * Defines a template for the bottom left cells (at the intersection of the row header and column footer cells).
    * Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
    * For example, this template shows a sigma glyph in the bottom-left cell of the grid:
    *
    * <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'BottomLeft'"&gt;
    *     &amp;#931;
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * <b>NewCellTemplate</b>
    *
    * Defines a cell in a new row template. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
    * Note that the <b>cell.item</b> property is undefined for this type of a cell.
    * For example, this cell template shows a placeholder in the Date column's cell in the "new row" item:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Date'" [binding]="'date'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'NewCellTemplate'"&gt;
    *     Enter a date here
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    */
    var WjFlexGridCellTemplate = WjFlexGridCellTemplate_1 = (function () {
        function WjFlexGridCellTemplate(viewContainerRef, templateRef, elRef, parentCmp, domRenderer, injector, cdRef) {
            this.viewContainerRef = viewContainerRef;
            this.templateRef = templateRef;
            this.elRef = elRef;
            this.domRenderer = domRenderer;
            this.cdRef = cdRef;
            this.autoSizeRows = true;
            if (parentCmp instanceof WjFlexGrid) {
                this.grid = parentCmp;
            }
            else if (parentCmp instanceof WjFlexGridColumn) {
                this.column = parentCmp;
                this.grid = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getBehavior(parentCmp).parentBehavior.directive;
            }
        }
        // returns the name of the property on control instance that stores info for the specified cell template type.
        WjFlexGridCellTemplate._getTemplContextProp = function (templateType) {
            return '$__cellTempl' + CellTemplateType[templateType];
        };
        WjFlexGridCellTemplate.prototype.ngOnInit = function () {
            this.ownerControl = this.column && this.column.grid === this.grid ? this.column : this.grid;
            this._attachToControl();
        };
        WjFlexGridCellTemplate.prototype.ngOnDestroy = function () {
            if (this.cellTypeStr) {
                this.viewContainerRef.clear();
                this.ownerControl[WjFlexGridCellTemplate_1._getTemplContextProp(this.cellType)] = null;
                this.grid.invalidate();
            }
        };
        WjFlexGridCellTemplate.prototype._instantiateTemplate = function (parent) {
            return wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(parent, this.viewContainerRef, this.templateRef, this.domRenderer);
        };
        WjFlexGridCellTemplate.prototype._attachToControl = function () {
            if (!this.cellTypeStr) {
                return;
            }
            this.cellType = wijmo.asEnum(this.cellTypeStr, CellTemplateType);
            this.ownerControl[WjFlexGridCellTemplate_1._getTemplContextProp(this.cellType)] = this;
            this.grid.invalidate();
        };
        return WjFlexGridCellTemplate;
    }());
    WjFlexGridCellTemplate = WjFlexGridCellTemplate_1 = __decorate([
        core_2.Directive({
            selector: '[wjFlexGridCellTemplate]',
            inputs: ['wjFlexGridCellTemplate', 'cellTypeStr: cellType', 'cellOverflow', 'valuePaths',
                'autoSizeRows'],
            exportAs: 'wjFlexGridCellTemplate',
            providers: [{ provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridCellTemplate_1; }) }]
        }),
        __param(0, core_3.Inject(core_2.ViewContainerRef)),
        __param(1, core_3.Inject(core_2.TemplateRef)), __param(1, core_2.Optional()),
        __param(2, core_3.Inject(core_2.ElementRef)),
        __param(3, core_3.Inject('WjComponent')), __param(3, core_3.SkipSelf()), __param(3, core_2.Optional()),
        __param(4, core_3.Inject(core_2.Renderer)),
        __param(5, core_3.Inject(core_2.Injector)),
        __param(6, core_3.Inject(core_3.ChangeDetectorRef))
    ], WjFlexGridCellTemplate);
    exports.WjFlexGridCellTemplate = WjFlexGridCellTemplate;
    /**
    * Defines the type of cell on which a template is to be applied. This value is specified in the <b>cellType</b> attribute
    * of the @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate directive.
    */
    var CellTemplateType;
    (function (CellTemplateType) {
        /** Defines a regular (data) cell. */
        CellTemplateType[CellTemplateType["Cell"] = 0] = "Cell";
        /** Defines a cell in edit mode. */
        CellTemplateType[CellTemplateType["CellEdit"] = 1] = "CellEdit";
        /** Defines a column header cell. */
        CellTemplateType[CellTemplateType["ColumnHeader"] = 2] = "ColumnHeader";
        /** Defines a row header cell. */
        CellTemplateType[CellTemplateType["RowHeader"] = 3] = "RowHeader";
        /** Defines a row header cell in edit mode. */
        CellTemplateType[CellTemplateType["RowHeaderEdit"] = 4] = "RowHeaderEdit";
        /** Defines a top left cell. */
        CellTemplateType[CellTemplateType["TopLeft"] = 5] = "TopLeft";
        /** Defines a group header cell in a group row. */
        CellTemplateType[CellTemplateType["GroupHeader"] = 6] = "GroupHeader";
        /** Defines a regular cell in a group row. */
        CellTemplateType[CellTemplateType["Group"] = 7] = "Group";
        /** Defines a cell in a new row template. */
        CellTemplateType[CellTemplateType["NewCellTemplate"] = 8] = "NewCellTemplate";
        /** Defines a column footer cell. */
        CellTemplateType[CellTemplateType["ColumnFooter"] = 9] = "ColumnFooter";
        /** Defines a bottom left cell (at the intersection of the row header and column footer cells). **/
        CellTemplateType[CellTemplateType["BottomLeft"] = 10] = "BottomLeft";
    })(CellTemplateType = exports.CellTemplateType || (exports.CellTemplateType = {}));
    var DirectiveCellFactory = (function (_super) {
        __extends(DirectiveCellFactory, _super);
        function DirectiveCellFactory(grid, gridCdRef) {
            var _this = _super.call(this) || this;
            _this._needsCdCheck = false;
            _this._lastApplyTimeStamp = 0;
            _this._noApplyLag = false;
            _this._startingEditing = false;
            _this._cellStampCounter = 0;
            _this.grid = grid;
            _this._gridCdRef = gridCdRef;
            // init _templateTypes
            if (!DirectiveCellFactory._templateTypes) {
                DirectiveCellFactory._templateTypes = [];
                for (var templateType in CellTemplateType) {
                    if (isNaN(templateType)) {
                        DirectiveCellFactory._templateTypes.push(templateType);
                    }
                }
            }
            var self = _this;
            _this._baseCf = grid.cellFactory;
            grid.cellFactory = _this;
            // initialize input event dispatcher
            _this._evtInput = document.createEvent('HTMLEvents');
            _this._evtInput.initEvent('input', true, false);
            // initialize blur event dispatcher
            _this._evtBlur = document.createEvent('HTMLEvents');
            _this._evtBlur.initEvent('blur', false, false);
            // no $apply() lag while editing
            grid.prepareCellForEdit.addHandler(function (s, e) {
                self._noApplyLag = true;
            });
            grid.cellEditEnded.addHandler(function (s, e) {
                // If column has no cell edit template, clear _editChar buffer.
                if (e.range.col < 0 || e.range.col < grid.columns.length &&
                    !grid.columns[e.range.col][WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType.CellEdit)]) {
                    self._editChar = null;
                }
                setTimeout(function () {
                    self._noApplyLag = false;
                }, 300);
            });
            grid.beginningEdit.addHandler(function (s, e) {
                self._startingEditing = true;
            });
            grid.hostElement.addEventListener('keydown', function (e) {
                self._startingEditing = false;
            }, true);
            grid.hostElement.addEventListener('keypress', function (e) {
                var char = e.charCode > 32 ? String.fromCharCode(e.charCode) : null;
                if (char) {
                    // Grid's _KeyboardHandler may receive 'keypress' before or after this handler (observed at least in IE,
                    // not clear why this happens). So both grid.activeEditor and _startingEditing (the latter is initialized in
                    // beginningEdit and cleared in 'keydown') participate in detecting whether this char has initialized a cell
                    // editing.
                    if (!grid.activeEditor || self._startingEditing) {
                        self._editChar = char;
                    }
                    else if (self._editChar) {
                        self._editChar += char;
                    }
                }
            }, true);
            // If host component uses OnPush change detection, we need to markForCheck; otherwise,
            // cell template bindings will not be updated.
            grid.updatedView.addHandler(function () {
                if (_this._needsCdCheck) {
                    _this._needsCdCheck = false;
                    _this._gridCdRef.markForCheck();
                }
            }, _this);
            return _this;
        }
        DirectiveCellFactory.prototype.updateCell = function (panel, rowIndex, colIndex, cell, rng) {
            this._cellStampCounter = (this._cellStampCounter + 1) % 10000000;
            var cellStamp = cell[DirectiveCellFactory._cellStampProp] = this._cellStampCounter;
            // restore overflow for any cell
            if (cell.style.overflow) {
                cell.style.overflow = '';
            }
            var self = this, grid = panel.grid, editRange = grid.editRange, templateType, row = panel.rows[rowIndex], dataItem = row.dataItem, isGridCtx = false, needCellValue = false, isEdit = false, isCvGroup = false;
            // determine template type
            switch (panel.cellType) {
                case wijmo.grid.CellType.Cell:
                    if (editRange && editRange.row === rowIndex && editRange.col === colIndex) {
                        templateType = CellTemplateType.CellEdit;
                        needCellValue = isEdit = true;
                    }
                    else if (row instanceof wijmo.grid.GroupRow) {
                        isCvGroup = dataItem instanceof wijmo.collections.CollectionViewGroup;
                        var isHierNonGroup = !(isCvGroup || row.hasChildren);
                        if (colIndex == panel.columns.firstVisibleIndex) {
                            templateType = isHierNonGroup ? CellTemplateType.Cell : CellTemplateType.GroupHeader;
                        }
                        else {
                            templateType = isHierNonGroup ? CellTemplateType.Cell : CellTemplateType.Group;
                            needCellValue = true;
                        }
                    }
                    else if (row instanceof wijmo.grid._NewRowTemplate) {
                        templateType = CellTemplateType.NewCellTemplate;
                    }
                    else if (!(wijmo.grid['detail'] && wijmo.grid['detail'].DetailRow &&
                        (row instanceof wijmo.grid['detail'].DetailRow))) {
                        templateType = CellTemplateType.Cell;
                    }
                    break;
                case wijmo.grid.CellType.ColumnHeader:
                    templateType = CellTemplateType.ColumnHeader;
                    break;
                case wijmo.grid.CellType.RowHeader:
                    templateType = grid.collectionView &&
                        grid.collectionView.currentEditItem === dataItem
                        ? CellTemplateType.RowHeaderEdit
                        : CellTemplateType.RowHeader;
                    isGridCtx = true;
                    break;
                case wijmo.grid.CellType.TopLeft:
                    templateType = CellTemplateType.TopLeft;
                    isGridCtx = true;
                    break;
                case wijmo.grid.CellType.ColumnFooter:
                    templateType = CellTemplateType.ColumnFooter;
                    needCellValue = true;
                    break;
                case wijmo.grid.CellType.BottomLeft:
                    templateType = CellTemplateType.BottomLeft;
                    isGridCtx = true;
                    break;
            }
            var isUpdated = false;
            if (templateType != null) {
                var col = (isCvGroup && templateType == CellTemplateType.GroupHeader ?
                    grid.columns.getColumn(dataItem.groupDescription['propertyName']) :
                    (colIndex >= 0 && colIndex < panel.columns.length ? panel.columns[colIndex] : null));
                if (col) {
                    var templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType), templContext = (isGridCtx ? grid : col)[templContextProp];
                    // maintain template inheritance
                    if (!templContext) {
                        if (templateType === CellTemplateType.RowHeaderEdit) {
                            templateType = CellTemplateType.RowHeader;
                            templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType);
                            templContext = grid[templContextProp];
                        }
                        else if (templateType === CellTemplateType.Group || templateType === CellTemplateType.GroupHeader) {
                            if (!isCvGroup) {
                                templateType = CellTemplateType.Cell;
                                templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType);
                                templContext = col[templContextProp];
                            }
                        }
                    }
                    if (templContext) {
                        // apply directive template and style
                        var isTpl = true, cellValue;
                        if (needCellValue) {
                            cellValue = panel.getCellData(rowIndex, colIndex, false);
                        }
                        // apply cell template
                        if (isTpl) {
                            isUpdated = true;
                            var measureAttr = cell.getAttribute(wijmo.grid.FlexGrid._WJS_MEASURE), isMeasuring = measureAttr && measureAttr.toLowerCase() === 'true';
                            if (isEdit) {
                                this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng, true);
                            }
                            // if this is false then we can't reuse previously cached scope and linked tree.
                            var cellContext = (cell[templContextProp] || {}), isForeignCell = cellContext.column !== col || !cellContext.viewRef ||
                                cellContext.templateContextProperty !== templContextProp ||
                                cell.firstChild != cellContext.rootElement;
                            if (isForeignCell) {
                                if (isEdit) {
                                    var rootEl = cell.firstElementChild;
                                    if (rootEl) {
                                        // set focus to cell, because hiding a focused element may move focus to a page body
                                        // that will force Grid to finish editing.
                                        cell.focus();
                                        rootEl.style.display = 'none';
                                    }
                                }
                                else {
                                    cell.textContent = '';
                                }
                                //
                                //console.log('updateCell - instantiate');
                                this._doDisposeCell(cell);
                                //if (templContext && cellContext && cellContext.viewRef) {
                                //    let viewIdx = templContext.viewContainerRef.indexOf(cellContext.viewRef);
                                //    if (viewIdx > -1) {
                                //        console.log('updateCell - remove View');
                                //        templContext.viewContainerRef.remove(viewIdx);
                                //    }
                                //}
                                //
                                var templInstance = templContext._instantiateTemplate(cell);
                                //console.log('Cell Templ: ' + cell.outerHTML);
                                cellContext.column = col;
                                cellContext.viewRef = templInstance.viewRef;
                                cellContext.rootElement = templInstance.rootElement;
                                cellContext.templateContextProperty = templContextProp;
                                cell[templContextProp] = cellContext;
                            }
                            var cellInfo_1 = this._setViewRefVars(cellContext.viewRef, row, col, dataItem, cellValue, templContext.valuePaths);
                            if (templContext.cellOverflow) {
                                cell.style.overflow = templContext.cellOverflow;
                            }
                            if (isMeasuring) {
                                //force local template 'cell' var values to be applied immediately
                                templContext.cdRef.detectChanges();
                            }
                            else if (templContext.autoSizeRows) {
                                // increase row height if cell doesn't fit in the current row height.
                                setTimeout(function () {
                                    // ignore the cell if it is already obsolete at this moment
                                    if (cellStamp !== cell[DirectiveCellFactory._cellStampProp]) {
                                        //console.log('!!!!!!!!!!!!!!!!!!!! Bad cell stamp');
                                        return;
                                    }
                                    var cellHeight = cell.scrollHeight, panelRows = panel.rows, rowSpan = rng && rng.rowSpan || 1;
                                    // TBD: it's not clear why we need (cellHeight - 1), but without it may get to an 
                                    // infinite loop. It's not the issue in Ng2 Explorer.
                                    if (rowIndex < panelRows.length &&
                                        (panelRows[rowIndex].renderHeight * rowSpan) < (cellHeight - 1)) {
                                        //if (cellHeight > 45) {
                                        //    throw "Infinite row expand loop!!!";
                                        //}
                                        //console.log('row.renderHeight = ' + panelRows[rowIndex].renderHeight + '; panelRows.defaultSize = ' + panelRows.defaultSize + ';cell.scrollHeight = ' + cellHeight + '; cell.offsetHeight = ' + cell.offsetHeight + '; cell.clientHeight = ' + cell.clientHeight + '; cell.height = ' + cell.style.height + '; rowSpan = ' + rowSpan);
                                        //console.log('range: ' + JSON.stringify(rng));
                                        //console.log('ID: ' + dataItem.id);
                                        //console.log(cell.outerHTML);
                                        panelRows.defaultSize = cellHeight / rowSpan;
                                        if (isEdit) {
                                            grid.refresh();
                                            //grid.refreshCells(false, true, false);
                                            grid.startEditing();
                                            return;
                                        }
                                        //} else if (isEdit && !wijmo.contains(cellContext.rootElement, wijmo.getActiveElement())) {
                                    }
                                    else if (isEdit) {
                                        // Find first visible input element and focus it. Make it only if editing
                                        // was not interrupted by row height change performed above, because it may finally
                                        // results in calling setSelectionRange on detached input, which causes crash in IE.
                                        //let inputs = cellContext.rootElement.querySelectorAll('input');
                                        var inputs = cellContext && cellContext.rootElement
                                            && cellContext.rootElement.querySelectorAll('input');
                                        if (inputs) {
                                            for (var i = 0; i < inputs.length; i++) {
                                                var input = inputs[i], inpSt = window.getComputedStyle(input);
                                                if (inpSt.display !== 'none' && inpSt.visibility === 'visible') {
                                                    var inpFocusEh = function () {
                                                        input.removeEventListener('focus', inpFocusEh);
                                                        setTimeout(function () {
                                                            // at this moment control had to select the whole content
                                                            if (self._editChar) {
                                                                var caretPos_1 = input.selectionStart + self._editChar.length;
                                                                input.value = self._editChar;
                                                                self._editChar = null;
                                                                input.dispatchEvent(self._evtInput);
                                                                setTimeout(function () {
                                                                    // at this moment control had to process 'input' event,
                                                                    // even if it happens asynchronously 
                                                                    setTimeout(function () {
                                                                        wijmo.setSelectionRange(input, Math.min(caretPos_1, input.value.length));
                                                                    }, 0);
                                                                }, 0);
                                                            }
                                                        }, 0);
                                                    };
                                                    input.addEventListener('focus', inpFocusEh);
                                                    input.focus();
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }, 0);
                            }
                            if (isEdit) {
                                self._cellEditorVars = cellInfo_1.localVars;
                                var editEndingEH = function (s, e) {
                                    grid.cellEditEnding.removeHandler(editEndingEH);
                                    // Move focus out of the current input element, in order to let it to save
                                    // its value (necessary for controls like InputDate that can't update value immediately
                                    // as user typing).
                                    // We do it via event emulation, instead of moving focus to another element,
                                    // because in IE an element doesn't fit in time to receive the 'blur' event.
                                    if (!e.stayInEditMode) {
                                        var activeElement = wijmo.getActiveElement();
                                        if (activeElement) {
                                            activeElement.dispatchEvent(self._evtBlur);
                                        }
                                        // We need to move focus nevertheless, because without this grid may lose focus at all in IE.
                                        cell.focus();
                                    }
                                    if (!(e.cancel || e.stayInEditMode)) {
                                        e.cancel = true;
                                        var cellVar = cellInfo_1.localVars, newVal = cellVar.value, bindNames = Object.getOwnPropertyNames(cellInfo_1.bindings);
                                        // set cell value
                                        panel.grid.setCellData(rowIndex, colIndex, newVal);
                                        // set values for valuePaths
                                        for (var _i = 0, bindNames_1 = bindNames; _i < bindNames_1.length; _i++) {
                                            var curName = bindNames_1[_i];
                                            cellInfo_1.bindings[curName].setValue(cellVar, cellInfo_1.localVars.values[curName]);
                                        }
                                    }
                                    // close all open dropdowns 
                                    var dropDowns = cell.querySelectorAll('.wj-dropdown');
                                    [].forEach.call(dropDowns, function (el) {
                                        var ctrl = wijmo.Control.getControl(el);
                                        if (ctrl && wijmo.input && ctrl instanceof wijmo.input.DropDown) {
                                            ctrl.isDroppedDown = false;
                                        }
                                    });
                                };
                                // subscribe the handler to the cellEditEnding event
                                grid.cellEditEnding.addHandler(editEndingEH);
                                grid.cellEditEnded.addHandler(function () {
                                    self._cellEditorVars = null;
                                });
                            }
                            else {
                                this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng, false);
                                //console.log('ID: ' + dataItem.id + '; exit cell.height = ' + cell.style.height);
                            }
                        }
                    }
                }
            }
            if (!isUpdated) {
                this._doDisposeCell(cell);
                this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng);
            }
        };
        DirectiveCellFactory.prototype.getEditorValue = function (g) {
            if (this._cellEditorVars) {
                return this._cellEditorVars.value;
            }
            else {
                return _super.prototype.getEditorValue.call(this, g);
            }
        };
        DirectiveCellFactory.prototype.disposeCell = function (cell) {
            //console.log('disposeCell');
            //this.cellCounter--;
            //console.log('disposeCell cellCounter = ' + this.cellCounter);
            this._doDisposeCell(cell);
        };
        DirectiveCellFactory.prototype._doDisposeCell = function (cell) {
            var ttm = DirectiveCellFactory._templateTypes;
            for (var i = 0; i < ttm.length; i++) {
                var templContextProp = WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[ttm[i]]), cellContext = (cell[templContextProp]);
                if (cellContext && cellContext.viewRef) {
                    var templateOwner = cellContext.column || this.grid, templateContext = templateOwner[templContextProp];
                    if (templateContext) {
                        var viewIdx = templateContext.viewContainerRef.indexOf(cellContext.viewRef);
                        if (viewIdx > -1) {
                            //console.log('disposeCell - remove View');
                            templateContext.viewContainerRef.remove(viewIdx);
                        }
                    }
                    cellContext.viewRef = null;
                    cellContext.rootElement = null;
                    cellContext.column = null;
                    cellContext.templateContextProperty = null;
                    cell[templContextProp] = null;
                }
            }
        };
        DirectiveCellFactory.prototype._setViewRefVars = function (viewRef, row, col, dataItem, cellValue, valuePaths) {
            this._needsCdCheck = true;
            viewRef.context.row = row;
            viewRef.context.col = col;
            viewRef.context.item = dataItem;
            var values = {}, 
            //cellCtx = { row: row, col: col, item: dataItem, value: cellValue, values: values },
            cellCtx = viewRef.context.cell || {}, bindings = {}, ret = { localVars: cellCtx, bindings: bindings };
            cellCtx.row = row;
            cellCtx.col = col;
            cellCtx.item = dataItem;
            cellCtx.value = cellValue;
            cellCtx.values = values;
            if (valuePaths) {
                var pathNames = Object.getOwnPropertyNames(valuePaths);
                for (var _i = 0, pathNames_1 = pathNames; _i < pathNames_1.length; _i++) {
                    var pName = pathNames_1[_i];
                    var binding = new wijmo.Binding(valuePaths[pName]);
                    bindings[pName] = binding;
                    values[pName] = binding.getValue(cellCtx);
                }
            }
            if (viewRef.context.cell !== cellCtx) {
                viewRef.context.cell = cellCtx;
            }
            return ret;
        };
        return DirectiveCellFactory;
    }(wijmo.grid.CellFactory));
    DirectiveCellFactory._cellStampProp = '__wjCellStamp';
    var moduleExports = [
        WjFlexGrid,
        WjFlexGridColumn,
        WjFlexGridCellTemplate
    ];
    var WjGridModule = (function () {
        function WjGridModule() {
        }
        return WjGridModule;
    }());
    WjGridModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjGridModule);
    exports.WjGridModule = WjGridModule;
    var WjFlexGrid_1, WjFlexGridColumn_1, WjFlexGridCellTemplate_1;
});

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

/**
* Contains Angular 2 components for the <b>wijmo.grid.grouppanel</b> module.
*
* <b>wijmo.angular2.grid.grouppanel</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjPanel from 'wijmo/wijmo.angular2.grid.grouppanel';
* import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjPanel.WjGroupPanel],
*     template: `
*       &lt;wj-group-panel
*           [grid]="flex"
*           [placeholder]="'Drag columns here to create groups.'"&gt;
*       &lt;/wj-group-panel&gt;
*       &lt;wj-flex-grid #flex [itemsSource]="data"&gt;
*       &lt;/wj-flex-grid&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.grouppanel'/>
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
define("wijmo/wijmo.angular2.grid.grouppanel", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjGroupPanelMeta = {
        selector: 'wj-group-panel',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'hideGroupedColumns',
            'maxGroups',
            'placeholder',
            'grid',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.grouppanel.GroupPanel control.
     *
     * Use the <b>wj-group-panel</b> component to add <b>GroupPanel</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjGroupPanel</b> component is derived from the <b>GroupPanel</b> control and
     * inherits all its properties, events and methods.
    */
    var WjGroupPanel = WjGroupPanel_1 = (function (_super) {
        __extends(WjGroupPanel, _super);
        function WjGroupPanel(elRef, injector, parentCmp) {
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
        WjGroupPanel.prototype.created = function () {
        };
        WjGroupPanel.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjGroupPanel.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjGroupPanel.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjGroupPanel;
    }(wijmo.grid.grouppanel.GroupPanel));
    WjGroupPanel.meta = {
        outputs: exports.wjGroupPanelMeta.outputs,
    };
    WjGroupPanel = WjGroupPanel_1 = __decorate([
        core_1.Component({
            selector: exports.wjGroupPanelMeta.selector,
            template: exports.wjGroupPanelMeta.template,
            inputs: exports.wjGroupPanelMeta.inputs,
            outputs: exports.wjGroupPanelMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjGroupPanel_1; }) }
            ].concat(exports.wjGroupPanelMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjGroupPanel);
    exports.WjGroupPanel = WjGroupPanel;
    var moduleExports = [
        WjGroupPanel
    ];
    var WjGridGrouppanelModule = (function () {
        function WjGridGrouppanelModule() {
        }
        return WjGridGrouppanelModule;
    }());
    WjGridGrouppanelModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjGridGrouppanelModule);
    exports.WjGridGrouppanelModule = WjGridGrouppanelModule;
    var WjGroupPanel_1;
});

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

/**
* Contains Angular 2 components for the <b>wijmo.grid.multirow</b> module.
*
* <b>wijmo.angular2.grid.multirow</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjMultiRow from 'wijmo/wijmo.angular2.grid.multirow';
* &nbsp;
* &#64;Component({
*     directives: [wjMultiRow.WjMultiRow],
*     template: `&lt;wj-multi-row&gt;&lt;/wj-multi-row&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.multirow'/>
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
define("wijmo/wijmo.angular2.grid.multirow", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjMultiRowMeta = {
        selector: 'wj-multi-row',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'newRowAtTop',
            'allowAddNew',
            'allowDelete',
            'allowDragging',
            'allowMerging',
            'allowResizing',
            'allowSorting',
            'autoSizeMode',
            'autoGenerateColumns',
            'childItemsPath',
            'groupHeaderFormat',
            'headersVisibility',
            'showSelectedHeaders',
            'showMarquee',
            'itemFormatter',
            'isReadOnly',
            'imeEnabled',
            'mergeManager',
            'selectionMode',
            'showGroups',
            'showSort',
            'showAlternatingRows',
            'showErrors',
            'validateEdits',
            'treeIndent',
            'itemsSource',
            'autoClipboard',
            'frozenRows',
            'frozenColumns',
            'deferResizing',
            'sortRowIndex',
            'stickyHeaders',
            'preserveSelectedState',
            'preserveOutlineState',
            'layoutDefinition',
            'centerHeadersVertically',
            'collapsedHeaders',
            'showHeaderCollapseButton',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'beginningEditNg: beginningEdit',
            'cellEditEndedNg: cellEditEnded',
            'cellEditEndingNg: cellEditEnding',
            'prepareCellForEditNg: prepareCellForEdit',
            'formatItemNg: formatItem',
            'resizingColumnNg: resizingColumn',
            'resizedColumnNg: resizedColumn',
            'autoSizingColumnNg: autoSizingColumn',
            'autoSizedColumnNg: autoSizedColumn',
            'draggingColumnNg: draggingColumn',
            'draggingColumnOverNg: draggingColumnOver',
            'draggedColumnNg: draggedColumn',
            'sortingColumnNg: sortingColumn',
            'sortedColumnNg: sortedColumn',
            'resizingRowNg: resizingRow',
            'resizedRowNg: resizedRow',
            'autoSizingRowNg: autoSizingRow',
            'autoSizedRowNg: autoSizedRow',
            'draggingRowNg: draggingRow',
            'draggingRowOverNg: draggingRowOver',
            'draggedRowNg: draggedRow',
            'deletingRowNg: deletingRow',
            'loadingRowsNg: loadingRows',
            'loadedRowsNg: loadedRows',
            'rowEditStartingNg: rowEditStarting',
            'rowEditStartedNg: rowEditStarted',
            'rowEditEndingNg: rowEditEnding',
            'rowEditEndedNg: rowEditEnded',
            'rowAddedNg: rowAdded',
            'groupCollapsedChangedNg: groupCollapsedChanged',
            'groupCollapsedChangingNg: groupCollapsedChanging',
            'itemsSourceChangedNg: itemsSourceChanged',
            'selectionChangingNg: selectionChanging',
            'selectionChangedNg: selectionChanged',
            'scrollPositionChangedNg: scrollPositionChanged',
            'updatingViewNg: updatingView',
            'updatedViewNg: updatedView',
            'updatingLayoutNg: updatingLayout',
            'updatedLayoutNg: updatedLayout',
            'pastingNg: pasting',
            'pastedNg: pasted',
            'pastingCellNg: pastingCell',
            'pastedCellNg: pastedCell',
            'copyingNg: copying',
            'copiedNg: copied',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.multirow.MultiRow control.
     *
     * Use the <b>wj-multi-row</b> component to add <b>MultiRow</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjMultiRow</b> component is derived from the <b>MultiRow</b> control and
     * inherits all its properties, events and methods.
    */
    var WjMultiRow = WjMultiRow_1 = (function (_super) {
        __extends(WjMultiRow, _super);
        function WjMultiRow(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>beginningEdit</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>beginningEdit</b> Wijmo event name.
             */
            _this.beginningEditNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>cellEditEnded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>cellEditEnded</b> Wijmo event name.
             */
            _this.cellEditEndedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>cellEditEnding</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>cellEditEnding</b> Wijmo event name.
             */
            _this.cellEditEndingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>prepareCellForEdit</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>prepareCellForEdit</b> Wijmo event name.
             */
            _this.prepareCellForEditNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
             */
            _this.formatItemNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizingColumn</b> Wijmo event name.
             */
            _this.resizingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizedColumn</b> Wijmo event name.
             */
            _this.resizedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizingColumn</b> Wijmo event name.
             */
            _this.autoSizingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizedColumn</b> Wijmo event name.
             */
            _this.autoSizedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingColumn</b> Wijmo event name.
             */
            _this.draggingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingColumnOver</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingColumnOver</b> Wijmo event name.
             */
            _this.draggingColumnOverNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggedColumn</b> Wijmo event name.
             */
            _this.draggedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>sortingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>sortingColumn</b> Wijmo event name.
             */
            _this.sortingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>sortedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>sortedColumn</b> Wijmo event name.
             */
            _this.sortedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizingRow</b> Wijmo event name.
             */
            _this.resizingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizedRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizedRow</b> Wijmo event name.
             */
            _this.resizedRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizingRow</b> Wijmo event name.
             */
            _this.autoSizingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizedRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizedRow</b> Wijmo event name.
             */
            _this.autoSizedRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingRow</b> Wijmo event name.
             */
            _this.draggingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingRowOver</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingRowOver</b> Wijmo event name.
             */
            _this.draggingRowOverNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggedRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggedRow</b> Wijmo event name.
             */
            _this.draggedRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>deletingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>deletingRow</b> Wijmo event name.
             */
            _this.deletingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>loadingRows</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>loadingRows</b> Wijmo event name.
             */
            _this.loadingRowsNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>loadedRows</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>loadedRows</b> Wijmo event name.
             */
            _this.loadedRowsNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditStarting</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditStarting</b> Wijmo event name.
             */
            _this.rowEditStartingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditStarted</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditStarted</b> Wijmo event name.
             */
            _this.rowEditStartedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditEnding</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditEnding</b> Wijmo event name.
             */
            _this.rowEditEndingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditEnded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditEnded</b> Wijmo event name.
             */
            _this.rowEditEndedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowAdded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowAdded</b> Wijmo event name.
             */
            _this.rowAddedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>groupCollapsedChanged</b> Wijmo event name.
             */
            _this.groupCollapsedChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>groupCollapsedChanging</b> Wijmo event name.
             */
            _this.groupCollapsedChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>itemsSourceChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>itemsSourceChanged</b> Wijmo event name.
             */
            _this.itemsSourceChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanging</b> Wijmo event name.
             */
            _this.selectionChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
             */
            _this.selectionChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>scrollPositionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>scrollPositionChanged</b> Wijmo event name.
             */
            _this.scrollPositionChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatingView</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatingView</b> Wijmo event name.
             */
            _this.updatingViewNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatedView</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatedView</b> Wijmo event name.
             */
            _this.updatedViewNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatingLayout</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatingLayout</b> Wijmo event name.
             */
            _this.updatingLayoutNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatedLayout</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatedLayout</b> Wijmo event name.
             */
            _this.updatedLayoutNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pasting</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pasting</b> Wijmo event name.
             */
            _this.pastingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pasted</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pasted</b> Wijmo event name.
             */
            _this.pastedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pastingCell</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pastingCell</b> Wijmo event name.
             */
            _this.pastingCellNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pastedCell</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pastedCell</b> Wijmo event name.
             */
            _this.pastedCellNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>copying</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>copying</b> Wijmo event name.
             */
            _this.copyingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>copied</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>copied</b> Wijmo event name.
             */
            _this.copiedNg = new core_1.EventEmitter(false);
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
        WjMultiRow.prototype.created = function () {
        };
        WjMultiRow.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjMultiRow.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjMultiRow.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjMultiRow;
    }(wijmo.grid.multirow.MultiRow));
    WjMultiRow.meta = {
        outputs: exports.wjMultiRowMeta.outputs,
    };
    WjMultiRow = WjMultiRow_1 = __decorate([
        core_1.Component({
            selector: exports.wjMultiRowMeta.selector,
            template: exports.wjMultiRowMeta.template,
            inputs: exports.wjMultiRowMeta.inputs,
            outputs: exports.wjMultiRowMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMultiRow_1; }) }
            ].concat(exports.wjMultiRowMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjMultiRow);
    exports.WjMultiRow = WjMultiRow;
    var moduleExports = [
        WjMultiRow
    ];
    var WjGridMultirowModule = (function () {
        function WjGridMultirowModule() {
        }
        return WjGridMultirowModule;
    }());
    WjGridMultirowModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjGridMultirowModule);
    exports.WjGridMultirowModule = WjGridMultirowModule;
    var WjMultiRow_1;
});

/**
* Contains Angular 2 components for the <b>wijmo.grid.sheet</b> module.
*
* <b>wijmo.angular2.grid.sheet</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjSheet from 'wijmo/wijmo.angular2.grid.sheet';
* &nbsp;
* &#64;Component({
*     directives: [wjSheet.WjFlexSheet],
*     template: `&lt;wj-flex-sheet&gt;&lt;/wj-flex-sheet&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.sheet'/>
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
define("wijmo/wijmo.angular2.grid.sheet", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexSheetMeta = {
        selector: 'wj-flex-sheet',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'newRowAtTop',
            'allowAddNew',
            'allowDelete',
            'allowDragging',
            'allowMerging',
            'allowResizing',
            'allowSorting',
            'autoSizeMode',
            'autoGenerateColumns',
            'childItemsPath',
            'groupHeaderFormat',
            'headersVisibility',
            'showSelectedHeaders',
            'showMarquee',
            'itemFormatter',
            'isReadOnly',
            'imeEnabled',
            'mergeManager',
            'selectionMode',
            'showGroups',
            'showSort',
            'showAlternatingRows',
            'showErrors',
            'validateEdits',
            'treeIndent',
            'itemsSource',
            'autoClipboard',
            'frozenRows',
            'frozenColumns',
            'deferResizing',
            'sortRowIndex',
            'stickyHeaders',
            'preserveSelectedState',
            'preserveOutlineState',
            'isTabHolderVisible',
            'selectedSheetIndex',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'beginningEditNg: beginningEdit',
            'cellEditEndedNg: cellEditEnded',
            'cellEditEndingNg: cellEditEnding',
            'prepareCellForEditNg: prepareCellForEdit',
            'formatItemNg: formatItem',
            'resizingColumnNg: resizingColumn',
            'resizedColumnNg: resizedColumn',
            'autoSizingColumnNg: autoSizingColumn',
            'autoSizedColumnNg: autoSizedColumn',
            'draggingColumnNg: draggingColumn',
            'draggingColumnOverNg: draggingColumnOver',
            'draggedColumnNg: draggedColumn',
            'sortingColumnNg: sortingColumn',
            'sortedColumnNg: sortedColumn',
            'resizingRowNg: resizingRow',
            'resizedRowNg: resizedRow',
            'autoSizingRowNg: autoSizingRow',
            'autoSizedRowNg: autoSizedRow',
            'draggingRowNg: draggingRow',
            'draggingRowOverNg: draggingRowOver',
            'draggedRowNg: draggedRow',
            'deletingRowNg: deletingRow',
            'loadingRowsNg: loadingRows',
            'loadedRowsNg: loadedRows',
            'rowEditStartingNg: rowEditStarting',
            'rowEditStartedNg: rowEditStarted',
            'rowEditEndingNg: rowEditEnding',
            'rowEditEndedNg: rowEditEnded',
            'rowAddedNg: rowAdded',
            'groupCollapsedChangedNg: groupCollapsedChanged',
            'groupCollapsedChangingNg: groupCollapsedChanging',
            'itemsSourceChangedNg: itemsSourceChanged',
            'selectionChangingNg: selectionChanging',
            'selectionChangedNg: selectionChanged',
            'scrollPositionChangedNg: scrollPositionChanged',
            'updatingViewNg: updatingView',
            'updatedViewNg: updatedView',
            'updatingLayoutNg: updatingLayout',
            'updatedLayoutNg: updatedLayout',
            'pastingNg: pasting',
            'pastedNg: pasted',
            'pastingCellNg: pastingCell',
            'pastedCellNg: pastedCell',
            'copyingNg: copying',
            'copiedNg: copied',
            'selectedSheetChangedNg: selectedSheetChanged',
            'selectedSheetIndexChangePC: selectedSheetIndexChange',
            'draggingRowColumnNg: draggingRowColumn',
            'droppingRowColumnNg: droppingRowColumn',
            'loadedNg: loaded',
            'unknownFunctionNg: unknownFunction',
            'sheetClearedNg: sheetCleared',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.sheet.FlexSheet control.
     *
     * Use the <b>wj-flex-sheet</b> component to add <b>FlexSheet</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexSheet</b> component is derived from the <b>FlexSheet</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-sheet</b> component may contain a @see:wijmo/wijmo.angular2.grid.sheet.WjSheet child component.
    */
    var WjFlexSheet = WjFlexSheet_1 = (function (_super) {
        __extends(WjFlexSheet, _super);
        function WjFlexSheet(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>beginningEdit</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>beginningEdit</b> Wijmo event name.
             */
            _this.beginningEditNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>cellEditEnded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>cellEditEnded</b> Wijmo event name.
             */
            _this.cellEditEndedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>cellEditEnding</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>cellEditEnding</b> Wijmo event name.
             */
            _this.cellEditEndingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>prepareCellForEdit</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>prepareCellForEdit</b> Wijmo event name.
             */
            _this.prepareCellForEditNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
             */
            _this.formatItemNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizingColumn</b> Wijmo event name.
             */
            _this.resizingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizedColumn</b> Wijmo event name.
             */
            _this.resizedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizingColumn</b> Wijmo event name.
             */
            _this.autoSizingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizedColumn</b> Wijmo event name.
             */
            _this.autoSizedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingColumn</b> Wijmo event name.
             */
            _this.draggingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingColumnOver</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingColumnOver</b> Wijmo event name.
             */
            _this.draggingColumnOverNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggedColumn</b> Wijmo event name.
             */
            _this.draggedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>sortingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>sortingColumn</b> Wijmo event name.
             */
            _this.sortingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>sortedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>sortedColumn</b> Wijmo event name.
             */
            _this.sortedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizingRow</b> Wijmo event name.
             */
            _this.resizingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizedRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizedRow</b> Wijmo event name.
             */
            _this.resizedRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizingRow</b> Wijmo event name.
             */
            _this.autoSizingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizedRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizedRow</b> Wijmo event name.
             */
            _this.autoSizedRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingRow</b> Wijmo event name.
             */
            _this.draggingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingRowOver</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingRowOver</b> Wijmo event name.
             */
            _this.draggingRowOverNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggedRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggedRow</b> Wijmo event name.
             */
            _this.draggedRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>deletingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>deletingRow</b> Wijmo event name.
             */
            _this.deletingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>loadingRows</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>loadingRows</b> Wijmo event name.
             */
            _this.loadingRowsNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>loadedRows</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>loadedRows</b> Wijmo event name.
             */
            _this.loadedRowsNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditStarting</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditStarting</b> Wijmo event name.
             */
            _this.rowEditStartingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditStarted</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditStarted</b> Wijmo event name.
             */
            _this.rowEditStartedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditEnding</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditEnding</b> Wijmo event name.
             */
            _this.rowEditEndingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditEnded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditEnded</b> Wijmo event name.
             */
            _this.rowEditEndedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowAdded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowAdded</b> Wijmo event name.
             */
            _this.rowAddedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>groupCollapsedChanged</b> Wijmo event name.
             */
            _this.groupCollapsedChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>groupCollapsedChanging</b> Wijmo event name.
             */
            _this.groupCollapsedChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>itemsSourceChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>itemsSourceChanged</b> Wijmo event name.
             */
            _this.itemsSourceChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanging</b> Wijmo event name.
             */
            _this.selectionChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
             */
            _this.selectionChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>scrollPositionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>scrollPositionChanged</b> Wijmo event name.
             */
            _this.scrollPositionChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatingView</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatingView</b> Wijmo event name.
             */
            _this.updatingViewNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatedView</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatedView</b> Wijmo event name.
             */
            _this.updatedViewNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatingLayout</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatingLayout</b> Wijmo event name.
             */
            _this.updatingLayoutNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatedLayout</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatedLayout</b> Wijmo event name.
             */
            _this.updatedLayoutNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pasting</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pasting</b> Wijmo event name.
             */
            _this.pastingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pasted</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pasted</b> Wijmo event name.
             */
            _this.pastedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pastingCell</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pastingCell</b> Wijmo event name.
             */
            _this.pastingCellNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pastedCell</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pastedCell</b> Wijmo event name.
             */
            _this.pastedCellNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>copying</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>copying</b> Wijmo event name.
             */
            _this.copyingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>copied</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>copied</b> Wijmo event name.
             */
            _this.copiedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectedSheetChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectedSheetChanged</b> Wijmo event name.
             */
            _this.selectedSheetChangedNg = new core_1.EventEmitter(false);
            _this.selectedSheetIndexChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingRowColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingRowColumn</b> Wijmo event name.
             */
            _this.draggingRowColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>droppingRowColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>droppingRowColumn</b> Wijmo event name.
             */
            _this.droppingRowColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>loaded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>loaded</b> Wijmo event name.
             */
            _this.loadedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>unknownFunction</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>unknownFunction</b> Wijmo event name.
             */
            _this.unknownFunctionNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>sheetCleared</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>sheetCleared</b> Wijmo event name.
             */
            _this.sheetClearedNg = new core_1.EventEmitter(false);
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
        WjFlexSheet.prototype.created = function () {
        };
        WjFlexSheet.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexSheet.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexSheet.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexSheet;
    }(wijmo.grid.sheet.FlexSheet));
    WjFlexSheet.meta = {
        outputs: exports.wjFlexSheetMeta.outputs,
        changeEvents: {
            'selectedSheetChanged': ['selectedSheetIndex']
        },
    };
    WjFlexSheet = WjFlexSheet_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexSheetMeta.selector,
            template: exports.wjFlexSheetMeta.template,
            inputs: exports.wjFlexSheetMeta.inputs,
            outputs: exports.wjFlexSheetMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexSheet_1; }) }
            ].concat(exports.wjFlexSheetMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexSheet);
    exports.WjFlexSheet = WjFlexSheet;
    exports.wjSheetMeta = {
        selector: 'wj-sheet',
        template: "",
        inputs: [
            'wjProperty',
            'name',
            'itemsSource',
            'visible',
            'rowCount',
            'columnCount',
        ],
        outputs: [
            'initialized',
            'nameChangedNg: nameChanged',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.sheet.Sheet control.
     *
     * The <b>wj-sheet</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.grid.sheet.WjFlexSheet component.
     *
     * Use the <b>wj-sheet</b> component to add <b>Sheet</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjSheet</b> component is derived from the <b>Sheet</b> control and
     * inherits all its properties, events and methods.
    */
    var WjSheet = WjSheet_1 = (function (_super) {
        __extends(WjSheet, _super);
        function WjSheet(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>nameChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>nameChanged</b> Wijmo event name.
             */
            _this.nameChangedNg = new core_1.EventEmitter(false);
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this._flexSheet = parentCmp;
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
        WjSheet.prototype.created = function () {
        };
        WjSheet.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
            //TBD: it should add itself to FlexSheet
            if (this.itemsSource) {
                return this._flexSheet.addBoundSheet(this.name, this.itemsSource);
            }
            else {
                return this._flexSheet.addUnboundSheet(this.name, this.boundRowCount != null ? +this.boundRowCount : null, this.boundColumnCount != null ? +this.boundColumnCount : null);
            }
        };
        WjSheet.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjSheet.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjSheet.prototype.ngOnChanges = function (changes) {
            var chg;
            if ((chg = changes['rowCount']) && chg.isFirstChange) {
                this.boundRowCount = chg.currentValue;
            }
            if ((chg = changes['columnCount']) && chg.isFirstChange) {
                this.boundColumnCount = chg.currentValue;
            }
        };
        return WjSheet;
    }(wijmo.grid.sheet.Sheet));
    WjSheet.meta = {
        outputs: exports.wjSheetMeta.outputs,
    };
    WjSheet = WjSheet_1 = __decorate([
        core_1.Component({
            selector: exports.wjSheetMeta.selector,
            template: exports.wjSheetMeta.template,
            inputs: exports.wjSheetMeta.inputs,
            outputs: exports.wjSheetMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjSheet_1; }) }
            ].concat(exports.wjSheetMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjSheet);
    exports.WjSheet = WjSheet;
    var moduleExports = [
        WjFlexSheet,
        WjSheet
    ];
    var WjGridSheetModule = (function () {
        function WjGridSheetModule() {
        }
        return WjGridSheetModule;
    }());
    WjGridSheetModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjGridSheetModule);
    exports.WjGridSheetModule = WjGridSheetModule;
    var WjFlexSheet_1, WjSheet_1;
});

///<wijmo-soft-import from="wijmo.chart.finance"/>
///<wijmo-soft-import from="wijmo.chart.analytics"/>
///<wijmo-soft-import from="wijmo.chart.animation"/>
///<wijmo-soft-import from="wijmo.chart.annotation"/>
///<wijmo-soft-import from="wijmo.chart.finance.analytics"/>
///<wijmo-soft-import from="wijmo.chart.hierarchical"/>
///<wijmo-soft-import from="wijmo.chart.interaction"/>
///<wijmo-soft-import from="wijmo.chart.radar"/>
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
define("wijmo/wijmo.angular2.chart", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartMeta = {
        selector: 'wj-flex-chart',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'binding',
            'footer',
            'header',
            'selectionMode',
            'palette',
            'plotMargin',
            'footerStyle',
            'headerStyle',
            'tooltipContent',
            'itemsSource',
            'bindingX',
            'interpolateNulls',
            'legendToggle',
            'symbolSize',
            'options',
            'selection',
            'itemFormatter',
            'labelContent',
            'chartType',
            'rotated',
            'stacking',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'selectionChangedNg: selectionChanged',
            'selectionChangePC: selectionChange',
            'seriesVisibilityChangedNg: seriesVisibilityChanged',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.FlexChart control.
     *
     * Use the <b>wj-flex-chart</b> component to add <b>FlexChart</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChart</b> component is derived from the <b>FlexChart</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartTrendLine
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartMovingAverage
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartYFunctionSeries
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartParametricFunctionSeries
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartWaterfall
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartBoxWhisker
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartErrorBar
     * , @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer
     * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartRangeSelector
     * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartGestures
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartDataLabel
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartSeries
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLineMarker
     *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartPlotArea.
    */
    var WjFlexChart = WjFlexChart_1 = (function (_super) {
        __extends(WjFlexChart, _super);
        function WjFlexChart(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
             */
            _this.selectionChangedNg = new core_1.EventEmitter(false);
            _this.selectionChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>seriesVisibilityChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>seriesVisibilityChanged</b> Wijmo event name.
             */
            _this.seriesVisibilityChangedNg = new core_1.EventEmitter(false);
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
        WjFlexChart.prototype.created = function () {
        };
        WjFlexChart.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChart.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChart.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        Object.defineProperty(WjFlexChart.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjFlexChart.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        return WjFlexChart;
    }(wijmo.chart.FlexChart));
    WjFlexChart.meta = {
        outputs: exports.wjFlexChartMeta.outputs,
        changeEvents: {
            'selectionChanged': ['selection']
        },
    };
    WjFlexChart = WjFlexChart_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartMeta.selector,
            template: exports.wjFlexChartMeta.template,
            inputs: exports.wjFlexChartMeta.inputs,
            outputs: exports.wjFlexChartMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChart_1; }) }
            ].concat(exports.wjFlexChartMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChart);
    exports.WjFlexChart = WjFlexChart;
    exports.wjFlexPieMeta = {
        selector: 'wj-flex-pie',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'binding',
            'footer',
            'header',
            'selectionMode',
            'palette',
            'plotMargin',
            'footerStyle',
            'headerStyle',
            'tooltipContent',
            'itemsSource',
            'bindingName',
            'innerRadius',
            'isAnimated',
            'offset',
            'reversed',
            'startAngle',
            'selectedItemPosition',
            'selectedItemOffset',
            'itemFormatter',
            'labelContent',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'selectionChangedNg: selectionChanged',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.FlexPie control.
     *
     * Use the <b>wj-flex-pie</b> component to add <b>FlexPie</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexPie</b> component is derived from the <b>FlexPie</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-pie</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
     *  and @see:wijmo/wijmo.angular2.chart.WjFlexPieDataLabel.
    */
    var WjFlexPie = WjFlexPie_1 = (function (_super) {
        __extends(WjFlexPie, _super);
        function WjFlexPie(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
             */
            _this.selectionChangedNg = new core_1.EventEmitter(false);
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
        WjFlexPie.prototype.created = function () {
        };
        WjFlexPie.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexPie.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexPie.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        Object.defineProperty(WjFlexPie.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjFlexPie.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        return WjFlexPie;
    }(wijmo.chart.FlexPie));
    WjFlexPie.meta = {
        outputs: exports.wjFlexPieMeta.outputs,
    };
    WjFlexPie = WjFlexPie_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexPieMeta.selector,
            template: exports.wjFlexPieMeta.template,
            inputs: exports.wjFlexPieMeta.inputs,
            outputs: exports.wjFlexPieMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexPie_1; }) }
            ].concat(exports.wjFlexPieMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexPie);
    exports.WjFlexPie = WjFlexPie;
    exports.wjFlexChartAxisMeta = {
        selector: 'wj-flex-chart-axis',
        template: "",
        inputs: [
            'wjProperty',
            'axisLine',
            'format',
            'labels',
            'majorGrid',
            'majorTickMarks',
            'majorUnit',
            'max',
            'min',
            'position',
            'reversed',
            'title',
            'labelAngle',
            'minorGrid',
            'minorTickMarks',
            'minorUnit',
            'origin',
            'logBase',
            'plotArea',
            'labelAlign',
            'name',
            'overlappingLabels',
            'labelPadding',
            'itemFormatter',
            'itemsSource',
            'binding',
        ],
        outputs: [
            'initialized',
            'rangeChangedNg: rangeChanged',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.Axis control.
     *
     * The <b>wj-flex-chart-axis</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartSeries
     * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChartSeries.
     *
     * Use the <b>wj-flex-chart-axis</b> component to add <b>Axis</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartAxis</b> component is derived from the <b>Axis</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartAxis = WjFlexChartAxis_1 = (function (_super) {
        __extends(WjFlexChartAxis, _super);
        function WjFlexChartAxis(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'axes'.
             */
            _this.wjProperty = 'axes';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rangeChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rangeChanged</b> Wijmo event name.
             */
            _this.rangeChangedNg = new core_1.EventEmitter(false);
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
        WjFlexChartAxis.prototype.created = function () {
        };
        WjFlexChartAxis.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAxis.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAxis.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAxis;
    }(wijmo.chart.Axis));
    WjFlexChartAxis.meta = {
        outputs: exports.wjFlexChartAxisMeta.outputs,
    };
    WjFlexChartAxis = WjFlexChartAxis_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAxisMeta.selector,
            template: exports.wjFlexChartAxisMeta.template,
            inputs: exports.wjFlexChartAxisMeta.inputs,
            outputs: exports.wjFlexChartAxisMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAxis_1; }) }
            ].concat(exports.wjFlexChartAxisMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAxis);
    exports.WjFlexChartAxis = WjFlexChartAxis;
    exports.wjFlexChartLegendMeta = {
        selector: 'wj-flex-chart-legend',
        template: "",
        inputs: [
            'wjProperty',
            'position',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.Legend control.
     *
     * The <b>wj-flex-chart-legend</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     * , @see:wijmo/wijmo.angular2.chart.WjFlexPie
     * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
     * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar
     *  or @see:wijmo/wijmo.angular2.chart.hierarchical.WjSunburst.
     *
     * Use the <b>wj-flex-chart-legend</b> component to add <b>Legend</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartLegend</b> component is derived from the <b>Legend</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartLegend = WjFlexChartLegend_1 = (function (_super) {
        __extends(WjFlexChartLegend, _super);
        function WjFlexChartLegend(elRef, injector, parentCmp) {
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'legend'.
             */
            _this.wjProperty = 'legend';
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
        WjFlexChartLegend.prototype.created = function () {
        };
        WjFlexChartLegend.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartLegend.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartLegend.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartLegend;
    }(wijmo.chart.Legend));
    WjFlexChartLegend.meta = {
        outputs: exports.wjFlexChartLegendMeta.outputs,
    };
    WjFlexChartLegend = WjFlexChartLegend_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartLegendMeta.selector,
            template: exports.wjFlexChartLegendMeta.template,
            inputs: exports.wjFlexChartLegendMeta.inputs,
            outputs: exports.wjFlexChartLegendMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartLegend_1; }) }
            ].concat(exports.wjFlexChartLegendMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartLegend);
    exports.WjFlexChartLegend = WjFlexChartLegend;
    exports.wjFlexChartDataLabelMeta = {
        selector: 'wj-flex-chart-data-label',
        template: "",
        inputs: [
            'wjProperty',
            'content',
            'border',
            'position',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.DataLabel control.
     *
     * The <b>wj-flex-chart-data-label</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
     *
     * Use the <b>wj-flex-chart-data-label</b> component to add <b>DataLabel</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartDataLabel</b> component is derived from the <b>DataLabel</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartDataLabel = WjFlexChartDataLabel_1 = (function (_super) {
        __extends(WjFlexChartDataLabel, _super);
        function WjFlexChartDataLabel(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'dataLabel'.
             */
            _this.wjProperty = 'dataLabel';
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
        WjFlexChartDataLabel.prototype.created = function () {
        };
        WjFlexChartDataLabel.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartDataLabel.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartDataLabel.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartDataLabel;
    }(wijmo.chart.DataLabel));
    WjFlexChartDataLabel.meta = {
        outputs: exports.wjFlexChartDataLabelMeta.outputs,
    };
    WjFlexChartDataLabel = WjFlexChartDataLabel_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartDataLabelMeta.selector,
            template: exports.wjFlexChartDataLabelMeta.template,
            inputs: exports.wjFlexChartDataLabelMeta.inputs,
            outputs: exports.wjFlexChartDataLabelMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartDataLabel_1; }) }
            ].concat(exports.wjFlexChartDataLabelMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartDataLabel);
    exports.WjFlexChartDataLabel = WjFlexChartDataLabel;
    exports.wjFlexPieDataLabelMeta = {
        selector: 'wj-flex-pie-data-label',
        template: "",
        inputs: [
            'wjProperty',
            'content',
            'border',
            'position',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.PieDataLabel control.
     *
     * The <b>wj-flex-pie-data-label</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexPie component.
     *
     * Use the <b>wj-flex-pie-data-label</b> component to add <b>PieDataLabel</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexPieDataLabel</b> component is derived from the <b>PieDataLabel</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexPieDataLabel = WjFlexPieDataLabel_1 = (function (_super) {
        __extends(WjFlexPieDataLabel, _super);
        function WjFlexPieDataLabel(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'dataLabel'.
             */
            _this.wjProperty = 'dataLabel';
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
        WjFlexPieDataLabel.prototype.created = function () {
        };
        WjFlexPieDataLabel.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexPieDataLabel.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexPieDataLabel.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexPieDataLabel;
    }(wijmo.chart.PieDataLabel));
    WjFlexPieDataLabel.meta = {
        outputs: exports.wjFlexPieDataLabelMeta.outputs,
    };
    WjFlexPieDataLabel = WjFlexPieDataLabel_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexPieDataLabelMeta.selector,
            template: exports.wjFlexPieDataLabelMeta.template,
            inputs: exports.wjFlexPieDataLabelMeta.inputs,
            outputs: exports.wjFlexPieDataLabelMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexPieDataLabel_1; }) }
            ].concat(exports.wjFlexPieDataLabelMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexPieDataLabel);
    exports.WjFlexPieDataLabel = WjFlexPieDataLabel;
    exports.wjFlexChartSeriesMeta = {
        selector: 'wj-flex-chart-series',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'chartType',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.Series control.
     *
     * The <b>wj-flex-chart-series</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
     *
     * Use the <b>wj-flex-chart-series</b> component to add <b>Series</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartSeries</b> component is derived from the <b>Series</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis child component.
    */
    var WjFlexChartSeries = WjFlexChartSeries_1 = (function (_super) {
        __extends(WjFlexChartSeries, _super);
        function WjFlexChartSeries(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartSeries.prototype.created = function () {
        };
        WjFlexChartSeries.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartSeries.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartSeries.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartSeries;
    }(wijmo.chart.Series));
    WjFlexChartSeries.meta = {
        outputs: exports.wjFlexChartSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartSeries = WjFlexChartSeries_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartSeriesMeta.selector,
            template: exports.wjFlexChartSeriesMeta.template,
            inputs: exports.wjFlexChartSeriesMeta.inputs,
            outputs: exports.wjFlexChartSeriesMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartSeries_1; }) }
            ].concat(exports.wjFlexChartSeriesMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartSeries);
    exports.WjFlexChartSeries = WjFlexChartSeries;
    exports.wjFlexChartLineMarkerMeta = {
        selector: 'wj-flex-line-marker',
        template: "",
        inputs: [
            'wjProperty',
            'isVisible',
            'seriesIndex',
            'horizontalPosition',
            'content',
            'verticalPosition',
            'alignment',
            'lines',
            'interaction',
            'dragLines',
            'dragThreshold',
            'dragContent',
        ],
        outputs: [
            'initialized',
            'positionChangedNg: positionChanged',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.LineMarker control.
     *
     * The <b>wj-flex-line-marker</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-line-marker</b> component to add <b>LineMarker</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartLineMarker</b> component is derived from the <b>LineMarker</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartLineMarker = WjFlexChartLineMarker_1 = (function (_super) {
        __extends(WjFlexChartLineMarker, _super);
        function WjFlexChartLineMarker(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>positionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>positionChanged</b> Wijmo event name.
             */
            _this.positionChangedNg = new core_1.EventEmitter(false);
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
        WjFlexChartLineMarker.prototype.created = function () {
        };
        WjFlexChartLineMarker.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartLineMarker.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartLineMarker.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartLineMarker;
    }(wijmo.chart.LineMarker));
    WjFlexChartLineMarker.meta = {
        outputs: exports.wjFlexChartLineMarkerMeta.outputs,
    };
    WjFlexChartLineMarker = WjFlexChartLineMarker_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartLineMarkerMeta.selector,
            template: exports.wjFlexChartLineMarkerMeta.template,
            inputs: exports.wjFlexChartLineMarkerMeta.inputs,
            outputs: exports.wjFlexChartLineMarkerMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartLineMarker_1; }) }
            ].concat(exports.wjFlexChartLineMarkerMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartLineMarker);
    exports.WjFlexChartLineMarker = WjFlexChartLineMarker;
    exports.wjFlexChartDataPointMeta = {
        selector: 'wj-flex-chart-data-point',
        template: "",
        inputs: [
            'wjProperty',
            'x',
            'y',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.DataPoint control.
     *
     * The <b>wj-flex-chart-data-point</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationText
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationEllipse
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationRectangle
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLine
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationPolygon
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationCircle
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationSquare
     *  or @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationImage.
     *
     * Use the <b>wj-flex-chart-data-point</b> component to add <b>DataPoint</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartDataPoint</b> component is derived from the <b>DataPoint</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartDataPoint = WjFlexChartDataPoint_1 = (function (_super) {
        __extends(WjFlexChartDataPoint, _super);
        function WjFlexChartDataPoint(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is ''.
             */
            _this.wjProperty = '';
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
        WjFlexChartDataPoint.prototype.created = function () {
        };
        WjFlexChartDataPoint.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartDataPoint.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartDataPoint.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartDataPoint;
    }(wijmo.chart.DataPoint));
    WjFlexChartDataPoint.meta = {
        outputs: exports.wjFlexChartDataPointMeta.outputs,
    };
    WjFlexChartDataPoint = WjFlexChartDataPoint_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartDataPointMeta.selector,
            template: exports.wjFlexChartDataPointMeta.template,
            inputs: exports.wjFlexChartDataPointMeta.inputs,
            outputs: exports.wjFlexChartDataPointMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartDataPoint_1; }) }
            ].concat(exports.wjFlexChartDataPointMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartDataPoint);
    exports.WjFlexChartDataPoint = WjFlexChartDataPoint;
    exports.wjFlexChartPlotAreaMeta = {
        selector: 'wj-flex-chart-plot-area',
        template: "",
        inputs: [
            'wjProperty',
            'column',
            'height',
            'name',
            'row',
            'style',
            'width',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.PlotArea control.
     *
     * The <b>wj-flex-chart-plot-area</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-plot-area</b> component to add <b>PlotArea</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartPlotArea</b> component is derived from the <b>PlotArea</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartPlotArea = WjFlexChartPlotArea_1 = (function (_super) {
        __extends(WjFlexChartPlotArea, _super);
        function WjFlexChartPlotArea(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'plotAreas'.
             */
            _this.wjProperty = 'plotAreas';
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
        WjFlexChartPlotArea.prototype.created = function () {
        };
        WjFlexChartPlotArea.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartPlotArea.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartPlotArea.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartPlotArea;
    }(wijmo.chart.PlotArea));
    WjFlexChartPlotArea.meta = {
        outputs: exports.wjFlexChartPlotAreaMeta.outputs,
    };
    WjFlexChartPlotArea = WjFlexChartPlotArea_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartPlotAreaMeta.selector,
            template: exports.wjFlexChartPlotAreaMeta.template,
            inputs: exports.wjFlexChartPlotAreaMeta.inputs,
            outputs: exports.wjFlexChartPlotAreaMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartPlotArea_1; }) }
            ].concat(exports.wjFlexChartPlotAreaMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartPlotArea);
    exports.WjFlexChartPlotArea = WjFlexChartPlotArea;
    var moduleExports = [
        WjFlexChart,
        WjFlexPie,
        WjFlexChartAxis,
        WjFlexChartLegend,
        WjFlexChartDataLabel,
        WjFlexPieDataLabel,
        WjFlexChartSeries,
        WjFlexChartLineMarker,
        WjFlexChartDataPoint,
        WjFlexChartPlotArea
    ];
    var WjChartModule = (function () {
        function WjChartModule() {
        }
        return WjChartModule;
    }());
    WjChartModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjChartModule);
    exports.WjChartModule = WjChartModule;
    var WjFlexChart_1, WjFlexPie_1, WjFlexChartAxis_1, WjFlexChartLegend_1, WjFlexChartDataLabel_1, WjFlexPieDataLabel_1, WjFlexChartSeries_1, WjFlexChartLineMarker_1, WjFlexChartDataPoint_1, WjFlexChartPlotArea_1;
});

///<wijmo-soft-import from="wijmo.chart.finance"/>
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
define("wijmo/wijmo.angular2.chart.interaction", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartRangeSelectorMeta = {
        selector: 'wj-flex-chart-range-selector',
        template: "",
        inputs: [
            'wjProperty',
            'isVisible',
            'min',
            'max',
            'orientation',
            'seamless',
            'minScale',
            'maxScale',
        ],
        outputs: [
            'initialized',
            'rangeChangedNg: rangeChanged',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.interaction.RangeSelector control.
     *
     * The <b>wj-flex-chart-range-selector</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-range-selector</b> component to add <b>RangeSelector</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartRangeSelector</b> component is derived from the <b>RangeSelector</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartRangeSelector = WjFlexChartRangeSelector_1 = (function (_super) {
        __extends(WjFlexChartRangeSelector, _super);
        function WjFlexChartRangeSelector(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>rangeChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rangeChanged</b> Wijmo event name.
             */
            _this.rangeChangedNg = new core_1.EventEmitter(false);
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
        WjFlexChartRangeSelector.prototype.created = function () {
        };
        WjFlexChartRangeSelector.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartRangeSelector.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartRangeSelector.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartRangeSelector;
    }(wijmo.chart.interaction.RangeSelector));
    WjFlexChartRangeSelector.meta = {
        outputs: exports.wjFlexChartRangeSelectorMeta.outputs,
    };
    WjFlexChartRangeSelector = WjFlexChartRangeSelector_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartRangeSelectorMeta.selector,
            template: exports.wjFlexChartRangeSelectorMeta.template,
            inputs: exports.wjFlexChartRangeSelectorMeta.inputs,
            outputs: exports.wjFlexChartRangeSelectorMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartRangeSelector_1; }) }
            ].concat(exports.wjFlexChartRangeSelectorMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartRangeSelector);
    exports.WjFlexChartRangeSelector = WjFlexChartRangeSelector;
    exports.wjFlexChartGesturesMeta = {
        selector: 'wj-flex-chart-gestures',
        template: "",
        inputs: [
            'wjProperty',
            'mouseAction',
            'interactiveAxes',
            'enable',
            'scaleX',
            'scaleY',
            'posX',
            'posY',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.interaction.ChartGestures control.
     *
     * The <b>wj-flex-chart-gestures</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-gestures</b> component to add <b>ChartGestures</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartGestures</b> component is derived from the <b>ChartGestures</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartGestures = WjFlexChartGestures_1 = (function (_super) {
        __extends(WjFlexChartGestures, _super);
        function WjFlexChartGestures(elRef, injector, parentCmp) {
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
        WjFlexChartGestures.prototype.created = function () {
        };
        WjFlexChartGestures.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartGestures.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartGestures.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartGestures;
    }(wijmo.chart.interaction.ChartGestures));
    WjFlexChartGestures.meta = {
        outputs: exports.wjFlexChartGesturesMeta.outputs,
    };
    WjFlexChartGestures = WjFlexChartGestures_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartGesturesMeta.selector,
            template: exports.wjFlexChartGesturesMeta.template,
            inputs: exports.wjFlexChartGesturesMeta.inputs,
            outputs: exports.wjFlexChartGesturesMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartGestures_1; }) }
            ].concat(exports.wjFlexChartGesturesMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartGestures);
    exports.WjFlexChartGestures = WjFlexChartGestures;
    var moduleExports = [
        WjFlexChartRangeSelector,
        WjFlexChartGestures
    ];
    var WjChartInteractionModule = (function () {
        function WjChartInteractionModule() {
        }
        return WjChartInteractionModule;
    }());
    WjChartInteractionModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjChartInteractionModule);
    exports.WjChartInteractionModule = WjChartInteractionModule;
    var WjFlexChartRangeSelector_1, WjFlexChartGestures_1;
});

///<wijmo-soft-import from="wijmo.chart.finance"/>
///<wijmo-soft-import from="wijmo.chart.radar"/>
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
define("wijmo/wijmo.angular2.chart.animation", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartAnimationMeta = {
        selector: 'wj-flex-chart-animation',
        template: "",
        inputs: [
            'wjProperty',
            'animationMode',
            'easing',
            'duration',
            'axisAnimation',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.animation.ChartAnimation control.
     *
     * The <b>wj-flex-chart-animation</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     * , @see:wijmo/wijmo.angular2.chart.WjFlexPie
     * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
     *  or @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar.
     *
     * Use the <b>wj-flex-chart-animation</b> component to add <b>ChartAnimation</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartAnimation</b> component is derived from the <b>ChartAnimation</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartAnimation = WjFlexChartAnimation_1 = (function (_super) {
        __extends(WjFlexChartAnimation, _super);
        function WjFlexChartAnimation(elRef, injector, parentCmp) {
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
        WjFlexChartAnimation.prototype.created = function () {
        };
        WjFlexChartAnimation.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnimation.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnimation.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnimation;
    }(wijmo.chart.animation.ChartAnimation));
    WjFlexChartAnimation.meta = {
        outputs: exports.wjFlexChartAnimationMeta.outputs,
    };
    WjFlexChartAnimation = WjFlexChartAnimation_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnimationMeta.selector,
            template: exports.wjFlexChartAnimationMeta.template,
            inputs: exports.wjFlexChartAnimationMeta.inputs,
            outputs: exports.wjFlexChartAnimationMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnimation_1; }) }
            ].concat(exports.wjFlexChartAnimationMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnimation);
    exports.WjFlexChartAnimation = WjFlexChartAnimation;
    var moduleExports = [
        WjFlexChartAnimation
    ];
    var WjChartAnimationModule = (function () {
        function WjChartAnimationModule() {
        }
        return WjChartAnimationModule;
    }());
    WjChartAnimationModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjChartAnimationModule);
    exports.WjChartAnimationModule = WjChartAnimationModule;
    var WjFlexChartAnimation_1;
});

///<wijmo-soft-import from="wijmo.chart.finance"/>
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
define("wijmo/wijmo.angular2.chart.analytics", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartTrendLineMeta = {
        selector: 'wj-flex-chart-trend-line',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'sampleCount',
            'order',
            'fitType',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.TrendLine control.
     *
     * The <b>wj-flex-chart-trend-line</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-trend-line</b> component to add <b>TrendLine</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartTrendLine</b> component is derived from the <b>TrendLine</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartTrendLine = WjFlexChartTrendLine_1 = (function (_super) {
        __extends(WjFlexChartTrendLine, _super);
        function WjFlexChartTrendLine(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartTrendLine.prototype.created = function () {
        };
        WjFlexChartTrendLine.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartTrendLine.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartTrendLine.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartTrendLine;
    }(wijmo.chart.analytics.TrendLine));
    WjFlexChartTrendLine.meta = {
        outputs: exports.wjFlexChartTrendLineMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartTrendLine = WjFlexChartTrendLine_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartTrendLineMeta.selector,
            template: exports.wjFlexChartTrendLineMeta.template,
            inputs: exports.wjFlexChartTrendLineMeta.inputs,
            outputs: exports.wjFlexChartTrendLineMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartTrendLine_1; }) }
            ].concat(exports.wjFlexChartTrendLineMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartTrendLine);
    exports.WjFlexChartTrendLine = WjFlexChartTrendLine;
    exports.wjFlexChartMovingAverageMeta = {
        selector: 'wj-flex-chart-moving-average',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'sampleCount',
            'period',
            'type',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.MovingAverage control.
     *
     * The <b>wj-flex-chart-moving-average</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-moving-average</b> component to add <b>MovingAverage</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartMovingAverage</b> component is derived from the <b>MovingAverage</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartMovingAverage = WjFlexChartMovingAverage_1 = (function (_super) {
        __extends(WjFlexChartMovingAverage, _super);
        function WjFlexChartMovingAverage(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartMovingAverage.prototype.created = function () {
        };
        WjFlexChartMovingAverage.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartMovingAverage.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartMovingAverage.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartMovingAverage;
    }(wijmo.chart.analytics.MovingAverage));
    WjFlexChartMovingAverage.meta = {
        outputs: exports.wjFlexChartMovingAverageMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartMovingAverage = WjFlexChartMovingAverage_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartMovingAverageMeta.selector,
            template: exports.wjFlexChartMovingAverageMeta.template,
            inputs: exports.wjFlexChartMovingAverageMeta.inputs,
            outputs: exports.wjFlexChartMovingAverageMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMovingAverage_1; }) }
            ].concat(exports.wjFlexChartMovingAverageMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartMovingAverage);
    exports.WjFlexChartMovingAverage = WjFlexChartMovingAverage;
    exports.wjFlexChartYFunctionSeriesMeta = {
        selector: 'wj-flex-chart-y-function-series',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'sampleCount',
            'min',
            'max',
            'func',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.YFunctionSeries control.
     *
     * The <b>wj-flex-chart-y-function-series</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-y-function-series</b> component to add <b>YFunctionSeries</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartYFunctionSeries</b> component is derived from the <b>YFunctionSeries</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartYFunctionSeries = WjFlexChartYFunctionSeries_1 = (function (_super) {
        __extends(WjFlexChartYFunctionSeries, _super);
        function WjFlexChartYFunctionSeries(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartYFunctionSeries.prototype.created = function () {
        };
        WjFlexChartYFunctionSeries.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartYFunctionSeries.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartYFunctionSeries.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartYFunctionSeries;
    }(wijmo.chart.analytics.YFunctionSeries));
    WjFlexChartYFunctionSeries.meta = {
        outputs: exports.wjFlexChartYFunctionSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartYFunctionSeries = WjFlexChartYFunctionSeries_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartYFunctionSeriesMeta.selector,
            template: exports.wjFlexChartYFunctionSeriesMeta.template,
            inputs: exports.wjFlexChartYFunctionSeriesMeta.inputs,
            outputs: exports.wjFlexChartYFunctionSeriesMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartYFunctionSeries_1; }) }
            ].concat(exports.wjFlexChartYFunctionSeriesMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartYFunctionSeries);
    exports.WjFlexChartYFunctionSeries = WjFlexChartYFunctionSeries;
    exports.wjFlexChartParametricFunctionSeriesMeta = {
        selector: 'wj-flex-chart-parametric-function-series',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'sampleCount',
            'min',
            'max',
            'func',
            'xFunc',
            'yFunc',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.ParametricFunctionSeries control.
     *
     * The <b>wj-flex-chart-parametric-function-series</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-parametric-function-series</b> component to add <b>ParametricFunctionSeries</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartParametricFunctionSeries</b> component is derived from the <b>ParametricFunctionSeries</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartParametricFunctionSeries = WjFlexChartParametricFunctionSeries_1 = (function (_super) {
        __extends(WjFlexChartParametricFunctionSeries, _super);
        function WjFlexChartParametricFunctionSeries(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartParametricFunctionSeries.prototype.created = function () {
        };
        WjFlexChartParametricFunctionSeries.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartParametricFunctionSeries.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartParametricFunctionSeries.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartParametricFunctionSeries;
    }(wijmo.chart.analytics.ParametricFunctionSeries));
    WjFlexChartParametricFunctionSeries.meta = {
        outputs: exports.wjFlexChartParametricFunctionSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartParametricFunctionSeries = WjFlexChartParametricFunctionSeries_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartParametricFunctionSeriesMeta.selector,
            template: exports.wjFlexChartParametricFunctionSeriesMeta.template,
            inputs: exports.wjFlexChartParametricFunctionSeriesMeta.inputs,
            outputs: exports.wjFlexChartParametricFunctionSeriesMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartParametricFunctionSeries_1; }) }
            ].concat(exports.wjFlexChartParametricFunctionSeriesMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartParametricFunctionSeries);
    exports.WjFlexChartParametricFunctionSeries = WjFlexChartParametricFunctionSeries;
    exports.wjFlexChartWaterfallMeta = {
        selector: 'wj-flex-chart-waterfall',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'relativeData',
            'start',
            'startLabel',
            'showTotal',
            'totalLabel',
            'showIntermediateTotal',
            'intermediateTotalPositions',
            'intermediateTotalLabels',
            'connectorLines',
            'styles',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.Waterfall control.
     *
     * The <b>wj-flex-chart-waterfall</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-waterfall</b> component to add <b>Waterfall</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartWaterfall</b> component is derived from the <b>Waterfall</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartWaterfall = WjFlexChartWaterfall_1 = (function (_super) {
        __extends(WjFlexChartWaterfall, _super);
        function WjFlexChartWaterfall(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartWaterfall.prototype.created = function () {
        };
        WjFlexChartWaterfall.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartWaterfall.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartWaterfall.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartWaterfall;
    }(wijmo.chart.analytics.Waterfall));
    WjFlexChartWaterfall.meta = {
        outputs: exports.wjFlexChartWaterfallMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartWaterfall = WjFlexChartWaterfall_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartWaterfallMeta.selector,
            template: exports.wjFlexChartWaterfallMeta.template,
            inputs: exports.wjFlexChartWaterfallMeta.inputs,
            outputs: exports.wjFlexChartWaterfallMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartWaterfall_1; }) }
            ].concat(exports.wjFlexChartWaterfallMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartWaterfall);
    exports.WjFlexChartWaterfall = WjFlexChartWaterfall;
    exports.wjFlexChartBoxWhiskerMeta = {
        selector: 'wj-flex-chart-box-whisker',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'quartileCalculation',
            'groupWidth',
            'gapWidth',
            'showMeanLine',
            'meanLineStyle',
            'showMeanMarker',
            'meanMarkerStyle',
            'showInnerPoints',
            'showOutliers',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.BoxWhisker control.
     *
     * The <b>wj-flex-chart-box-whisker</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-box-whisker</b> component to add <b>BoxWhisker</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartBoxWhisker</b> component is derived from the <b>BoxWhisker</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartBoxWhisker = WjFlexChartBoxWhisker_1 = (function (_super) {
        __extends(WjFlexChartBoxWhisker, _super);
        function WjFlexChartBoxWhisker(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartBoxWhisker.prototype.created = function () {
        };
        WjFlexChartBoxWhisker.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartBoxWhisker.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartBoxWhisker.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartBoxWhisker;
    }(wijmo.chart.analytics.BoxWhisker));
    WjFlexChartBoxWhisker.meta = {
        outputs: exports.wjFlexChartBoxWhiskerMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartBoxWhisker = WjFlexChartBoxWhisker_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartBoxWhiskerMeta.selector,
            template: exports.wjFlexChartBoxWhiskerMeta.template,
            inputs: exports.wjFlexChartBoxWhiskerMeta.inputs,
            outputs: exports.wjFlexChartBoxWhiskerMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartBoxWhisker_1; }) }
            ].concat(exports.wjFlexChartBoxWhiskerMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartBoxWhisker);
    exports.WjFlexChartBoxWhisker = WjFlexChartBoxWhisker;
    exports.wjFlexChartErrorBarMeta = {
        selector: 'wj-flex-chart-error-bar',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'chartType',
            'errorBarStyle',
            'value',
            'errorAmount',
            'endStyle',
            'direction',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.ErrorBar control.
     *
     * The <b>wj-flex-chart-error-bar</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
     *
     * Use the <b>wj-flex-chart-error-bar</b> component to add <b>ErrorBar</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartErrorBar</b> component is derived from the <b>ErrorBar</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartErrorBar = WjFlexChartErrorBar_1 = (function (_super) {
        __extends(WjFlexChartErrorBar, _super);
        function WjFlexChartErrorBar(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartErrorBar.prototype.created = function () {
        };
        WjFlexChartErrorBar.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartErrorBar.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartErrorBar.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartErrorBar;
    }(wijmo.chart.analytics.ErrorBar));
    WjFlexChartErrorBar.meta = {
        outputs: exports.wjFlexChartErrorBarMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartErrorBar = WjFlexChartErrorBar_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartErrorBarMeta.selector,
            template: exports.wjFlexChartErrorBarMeta.template,
            inputs: exports.wjFlexChartErrorBarMeta.inputs,
            outputs: exports.wjFlexChartErrorBarMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartErrorBar_1; }) }
            ].concat(exports.wjFlexChartErrorBarMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartErrorBar);
    exports.WjFlexChartErrorBar = WjFlexChartErrorBar;
    var moduleExports = [
        WjFlexChartTrendLine,
        WjFlexChartMovingAverage,
        WjFlexChartYFunctionSeries,
        WjFlexChartParametricFunctionSeries,
        WjFlexChartWaterfall,
        WjFlexChartBoxWhisker,
        WjFlexChartErrorBar
    ];
    var WjChartAnalyticsModule = (function () {
        function WjChartAnalyticsModule() {
        }
        return WjChartAnalyticsModule;
    }());
    WjChartAnalyticsModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjChartAnalyticsModule);
    exports.WjChartAnalyticsModule = WjChartAnalyticsModule;
    var WjFlexChartTrendLine_1, WjFlexChartMovingAverage_1, WjFlexChartYFunctionSeries_1, WjFlexChartParametricFunctionSeries_1, WjFlexChartWaterfall_1, WjFlexChartBoxWhisker_1, WjFlexChartErrorBar_1;
});

///<wijmo-soft-import from="wijmo.chart.finance"/>
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
define("wijmo/wijmo.angular2.chart.annotation", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartAnnotationLayerMeta = {
        selector: 'wj-flex-chart-annotation-layer',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.AnnotationLayer control.
     *
     * The <b>wj-flex-chart-annotation-layer</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-annotation-layer</b> component to add <b>AnnotationLayer</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     ** The <b>WjFlexChartAnnotationLayer</b> component is derived from the <b>AnnotationLayer</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-layer</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationText
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationEllipse
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationRectangle
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLine
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationPolygon
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationCircle
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationSquare
     *  and @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationImage.
    */
    var WjFlexChartAnnotationLayer = WjFlexChartAnnotationLayer_1 = (function (_super) {
        __extends(WjFlexChartAnnotationLayer, _super);
        function WjFlexChartAnnotationLayer(elRef, injector, parentCmp) {
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
        WjFlexChartAnnotationLayer.prototype.created = function () {
        };
        WjFlexChartAnnotationLayer.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationLayer.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationLayer.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationLayer;
    }(wijmo.chart.annotation.AnnotationLayer));
    WjFlexChartAnnotationLayer.meta = {
        outputs: exports.wjFlexChartAnnotationLayerMeta.outputs,
    };
    WjFlexChartAnnotationLayer = WjFlexChartAnnotationLayer_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationLayerMeta.selector,
            template: exports.wjFlexChartAnnotationLayerMeta.template,
            inputs: exports.wjFlexChartAnnotationLayerMeta.inputs,
            outputs: exports.wjFlexChartAnnotationLayerMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationLayer_1; }) }
            ].concat(exports.wjFlexChartAnnotationLayerMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationLayer);
    exports.WjFlexChartAnnotationLayer = WjFlexChartAnnotationLayer;
    exports.wjFlexChartAnnotationTextMeta = {
        selector: 'wj-flex-chart-annotation-text',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Text control.
     *
     * The <b>wj-flex-chart-annotation-text</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-text</b> component to add <b>Text</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     ** The <b>WjFlexChartAnnotationText</b> component is derived from the <b>Text</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-text</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationText = WjFlexChartAnnotationText_1 = (function (_super) {
        __extends(WjFlexChartAnnotationText, _super);
        function WjFlexChartAnnotationText(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationText.prototype.created = function () {
        };
        WjFlexChartAnnotationText.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationText.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationText.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationText;
    }(wijmo.chart.annotation.Text));
    WjFlexChartAnnotationText.meta = {
        outputs: exports.wjFlexChartAnnotationTextMeta.outputs,
    };
    WjFlexChartAnnotationText = WjFlexChartAnnotationText_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationTextMeta.selector,
            template: exports.wjFlexChartAnnotationTextMeta.template,
            inputs: exports.wjFlexChartAnnotationTextMeta.inputs,
            outputs: exports.wjFlexChartAnnotationTextMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationText_1; }) }
            ].concat(exports.wjFlexChartAnnotationTextMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationText);
    exports.WjFlexChartAnnotationText = WjFlexChartAnnotationText;
    exports.wjFlexChartAnnotationEllipseMeta = {
        selector: 'wj-flex-chart-annotation-ellipse',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Ellipse control.
     *
     * The <b>wj-flex-chart-annotation-ellipse</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-ellipse</b> component to add <b>Ellipse</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     ** The <b>WjFlexChartAnnotationEllipse</b> component is derived from the <b>Ellipse</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-ellipse</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationEllipse = WjFlexChartAnnotationEllipse_1 = (function (_super) {
        __extends(WjFlexChartAnnotationEllipse, _super);
        function WjFlexChartAnnotationEllipse(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationEllipse.prototype.created = function () {
        };
        WjFlexChartAnnotationEllipse.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationEllipse.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationEllipse.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationEllipse;
    }(wijmo.chart.annotation.Ellipse));
    WjFlexChartAnnotationEllipse.meta = {
        outputs: exports.wjFlexChartAnnotationEllipseMeta.outputs,
    };
    WjFlexChartAnnotationEllipse = WjFlexChartAnnotationEllipse_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationEllipseMeta.selector,
            template: exports.wjFlexChartAnnotationEllipseMeta.template,
            inputs: exports.wjFlexChartAnnotationEllipseMeta.inputs,
            outputs: exports.wjFlexChartAnnotationEllipseMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationEllipse_1; }) }
            ].concat(exports.wjFlexChartAnnotationEllipseMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationEllipse);
    exports.WjFlexChartAnnotationEllipse = WjFlexChartAnnotationEllipse;
    exports.wjFlexChartAnnotationRectangleMeta = {
        selector: 'wj-flex-chart-annotation-rectangle',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Rectangle control.
     *
     * The <b>wj-flex-chart-annotation-rectangle</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-rectangle</b> component to add <b>Rectangle</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     ** The <b>WjFlexChartAnnotationRectangle</b> component is derived from the <b>Rectangle</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-rectangle</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationRectangle = WjFlexChartAnnotationRectangle_1 = (function (_super) {
        __extends(WjFlexChartAnnotationRectangle, _super);
        function WjFlexChartAnnotationRectangle(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationRectangle.prototype.created = function () {
        };
        WjFlexChartAnnotationRectangle.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationRectangle.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationRectangle.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationRectangle;
    }(wijmo.chart.annotation.Rectangle));
    WjFlexChartAnnotationRectangle.meta = {
        outputs: exports.wjFlexChartAnnotationRectangleMeta.outputs,
    };
    WjFlexChartAnnotationRectangle = WjFlexChartAnnotationRectangle_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationRectangleMeta.selector,
            template: exports.wjFlexChartAnnotationRectangleMeta.template,
            inputs: exports.wjFlexChartAnnotationRectangleMeta.inputs,
            outputs: exports.wjFlexChartAnnotationRectangleMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationRectangle_1; }) }
            ].concat(exports.wjFlexChartAnnotationRectangleMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationRectangle);
    exports.WjFlexChartAnnotationRectangle = WjFlexChartAnnotationRectangle;
    exports.wjFlexChartAnnotationLineMeta = {
        selector: 'wj-flex-chart-annotation-line',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Line control.
     *
     * The <b>wj-flex-chart-annotation-line</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-line</b> component to add <b>Line</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     ** The <b>WjFlexChartAnnotationLine</b> component is derived from the <b>Line</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-line</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationLine = WjFlexChartAnnotationLine_1 = (function (_super) {
        __extends(WjFlexChartAnnotationLine, _super);
        function WjFlexChartAnnotationLine(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationLine.prototype.created = function () {
        };
        WjFlexChartAnnotationLine.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationLine.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationLine.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationLine;
    }(wijmo.chart.annotation.Line));
    WjFlexChartAnnotationLine.meta = {
        outputs: exports.wjFlexChartAnnotationLineMeta.outputs,
    };
    WjFlexChartAnnotationLine = WjFlexChartAnnotationLine_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationLineMeta.selector,
            template: exports.wjFlexChartAnnotationLineMeta.template,
            inputs: exports.wjFlexChartAnnotationLineMeta.inputs,
            outputs: exports.wjFlexChartAnnotationLineMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationLine_1; }) }
            ].concat(exports.wjFlexChartAnnotationLineMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationLine);
    exports.WjFlexChartAnnotationLine = WjFlexChartAnnotationLine;
    exports.wjFlexChartAnnotationPolygonMeta = {
        selector: 'wj-flex-chart-annotation-polygon',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Polygon control.
     *
     * The <b>wj-flex-chart-annotation-polygon</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-polygon</b> component to add <b>Polygon</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     ** The <b>WjFlexChartAnnotationPolygon</b> component is derived from the <b>Polygon</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-polygon</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationPolygon = WjFlexChartAnnotationPolygon_1 = (function (_super) {
        __extends(WjFlexChartAnnotationPolygon, _super);
        function WjFlexChartAnnotationPolygon(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationPolygon.prototype.created = function () {
        };
        WjFlexChartAnnotationPolygon.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationPolygon.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationPolygon.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationPolygon;
    }(wijmo.chart.annotation.Polygon));
    WjFlexChartAnnotationPolygon.meta = {
        outputs: exports.wjFlexChartAnnotationPolygonMeta.outputs,
    };
    WjFlexChartAnnotationPolygon = WjFlexChartAnnotationPolygon_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationPolygonMeta.selector,
            template: exports.wjFlexChartAnnotationPolygonMeta.template,
            inputs: exports.wjFlexChartAnnotationPolygonMeta.inputs,
            outputs: exports.wjFlexChartAnnotationPolygonMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationPolygon_1; }) }
            ].concat(exports.wjFlexChartAnnotationPolygonMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationPolygon);
    exports.WjFlexChartAnnotationPolygon = WjFlexChartAnnotationPolygon;
    exports.wjFlexChartAnnotationCircleMeta = {
        selector: 'wj-flex-chart-annotation-circle',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Circle control.
     *
     * The <b>wj-flex-chart-annotation-circle</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-circle</b> component to add <b>Circle</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     ** The <b>WjFlexChartAnnotationCircle</b> component is derived from the <b>Circle</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-circle</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationCircle = WjFlexChartAnnotationCircle_1 = (function (_super) {
        __extends(WjFlexChartAnnotationCircle, _super);
        function WjFlexChartAnnotationCircle(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationCircle.prototype.created = function () {
        };
        WjFlexChartAnnotationCircle.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationCircle.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationCircle.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationCircle;
    }(wijmo.chart.annotation.Circle));
    WjFlexChartAnnotationCircle.meta = {
        outputs: exports.wjFlexChartAnnotationCircleMeta.outputs,
    };
    WjFlexChartAnnotationCircle = WjFlexChartAnnotationCircle_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationCircleMeta.selector,
            template: exports.wjFlexChartAnnotationCircleMeta.template,
            inputs: exports.wjFlexChartAnnotationCircleMeta.inputs,
            outputs: exports.wjFlexChartAnnotationCircleMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationCircle_1; }) }
            ].concat(exports.wjFlexChartAnnotationCircleMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationCircle);
    exports.WjFlexChartAnnotationCircle = WjFlexChartAnnotationCircle;
    exports.wjFlexChartAnnotationSquareMeta = {
        selector: 'wj-flex-chart-annotation-square',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Square control.
     *
     * The <b>wj-flex-chart-annotation-square</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-square</b> component to add <b>Square</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     ** The <b>WjFlexChartAnnotationSquare</b> component is derived from the <b>Square</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-square</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationSquare = WjFlexChartAnnotationSquare_1 = (function (_super) {
        __extends(WjFlexChartAnnotationSquare, _super);
        function WjFlexChartAnnotationSquare(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationSquare.prototype.created = function () {
        };
        WjFlexChartAnnotationSquare.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationSquare.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationSquare.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationSquare;
    }(wijmo.chart.annotation.Square));
    WjFlexChartAnnotationSquare.meta = {
        outputs: exports.wjFlexChartAnnotationSquareMeta.outputs,
    };
    WjFlexChartAnnotationSquare = WjFlexChartAnnotationSquare_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationSquareMeta.selector,
            template: exports.wjFlexChartAnnotationSquareMeta.template,
            inputs: exports.wjFlexChartAnnotationSquareMeta.inputs,
            outputs: exports.wjFlexChartAnnotationSquareMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationSquare_1; }) }
            ].concat(exports.wjFlexChartAnnotationSquareMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationSquare);
    exports.WjFlexChartAnnotationSquare = WjFlexChartAnnotationSquare;
    exports.wjFlexChartAnnotationImageMeta = {
        selector: 'wj-flex-chart-annotation-image',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Image control.
     *
     * The <b>wj-flex-chart-annotation-image</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-image</b> component to add <b>Image</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     ** The <b>WjFlexChartAnnotationImage</b> component is derived from the <b>Image</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-image</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationImage = WjFlexChartAnnotationImage_1 = (function (_super) {
        __extends(WjFlexChartAnnotationImage, _super);
        function WjFlexChartAnnotationImage(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
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
        WjFlexChartAnnotationImage.prototype.created = function () {
        };
        WjFlexChartAnnotationImage.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationImage.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationImage.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAnnotationImage;
    }(wijmo.chart.annotation.Image));
    WjFlexChartAnnotationImage.meta = {
        outputs: exports.wjFlexChartAnnotationImageMeta.outputs,
    };
    WjFlexChartAnnotationImage = WjFlexChartAnnotationImage_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAnnotationImageMeta.selector,
            template: exports.wjFlexChartAnnotationImageMeta.template,
            inputs: exports.wjFlexChartAnnotationImageMeta.inputs,
            outputs: exports.wjFlexChartAnnotationImageMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationImage_1; }) }
            ].concat(exports.wjFlexChartAnnotationImageMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAnnotationImage);
    exports.WjFlexChartAnnotationImage = WjFlexChartAnnotationImage;
    var moduleExports = [
        WjFlexChartAnnotationLayer,
        WjFlexChartAnnotationText,
        WjFlexChartAnnotationEllipse,
        WjFlexChartAnnotationRectangle,
        WjFlexChartAnnotationLine,
        WjFlexChartAnnotationPolygon,
        WjFlexChartAnnotationCircle,
        WjFlexChartAnnotationSquare,
        WjFlexChartAnnotationImage
    ];
    var WjChartAnnotationModule = (function () {
        function WjChartAnnotationModule() {
        }
        return WjChartAnnotationModule;
    }());
    WjChartAnnotationModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjChartAnnotationModule);
    exports.WjChartAnnotationModule = WjChartAnnotationModule;
    var WjFlexChartAnnotationLayer_1, WjFlexChartAnnotationText_1, WjFlexChartAnnotationEllipse_1, WjFlexChartAnnotationRectangle_1, WjFlexChartAnnotationLine_1, WjFlexChartAnnotationPolygon_1, WjFlexChartAnnotationCircle_1, WjFlexChartAnnotationSquare_1, WjFlexChartAnnotationImage_1;
});

/**
* Contains Angular 2 components for the <b>wijmo.chart.finance</b> module.
*
* <b>wijmo.angular2.chart.finance</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjFinance from 'wijmo/wijmo.angular2.chart.finance';
* &nbsp;
* &#64;Component({
*     directives: [wjFinance.WjFinancialChart, wjFinance.WjFinancialChartSeries],
*     template: `
*       &lt;wj-financial-chart [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-financial-chart-series [binding]="'y'"&gt;&lt;/wj-financial-chart-series&gt;
*       &lt;/wj-financial-chart&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.finance'/>
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
define("wijmo/wijmo.angular2.chart.finance", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFinancialChartMeta = {
        selector: 'wj-financial-chart',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'binding',
            'footer',
            'header',
            'selectionMode',
            'palette',
            'plotMargin',
            'footerStyle',
            'headerStyle',
            'tooltipContent',
            'itemsSource',
            'bindingX',
            'interpolateNulls',
            'legendToggle',
            'symbolSize',
            'options',
            'selection',
            'itemFormatter',
            'labelContent',
            'chartType',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'selectionChangedNg: selectionChanged',
            'selectionChangePC: selectionChange',
            'seriesVisibilityChangedNg: seriesVisibilityChanged',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.FinancialChart control.
     *
     * Use the <b>wj-financial-chart</b> component to add <b>FinancialChart</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFinancialChart</b> component is derived from the <b>FinancialChart</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-financial-chart</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartTrendLine
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartMovingAverage
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartYFunctionSeries
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartParametricFunctionSeries
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartWaterfall
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartBoxWhisker
     * , @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacci
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciArcs
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciFans
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciTimeZones
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartAtr
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartCci
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartRsi
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartWilliamsR
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartMacd
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartMacdHistogram
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartStochastic
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartBollingerBands
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartEnvelopes
     * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChartSeries
     * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartRangeSelector
     * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartGestures
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLineMarker
     *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartPlotArea.
    */
    var WjFinancialChart = WjFinancialChart_1 = (function (_super) {
        __extends(WjFinancialChart, _super);
        function WjFinancialChart(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
             */
            _this.selectionChangedNg = new core_1.EventEmitter(false);
            _this.selectionChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>seriesVisibilityChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>seriesVisibilityChanged</b> Wijmo event name.
             */
            _this.seriesVisibilityChangedNg = new core_1.EventEmitter(false);
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
        WjFinancialChart.prototype.created = function () {
        };
        WjFinancialChart.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFinancialChart.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFinancialChart.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        Object.defineProperty(WjFinancialChart.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjFinancialChart.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        return WjFinancialChart;
    }(wijmo.chart.finance.FinancialChart));
    WjFinancialChart.meta = {
        outputs: exports.wjFinancialChartMeta.outputs,
        changeEvents: {
            'selectionChanged': ['selection']
        },
    };
    WjFinancialChart = WjFinancialChart_1 = __decorate([
        core_1.Component({
            selector: exports.wjFinancialChartMeta.selector,
            template: exports.wjFinancialChartMeta.template,
            inputs: exports.wjFinancialChartMeta.inputs,
            outputs: exports.wjFinancialChartMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFinancialChart_1; }) }
            ].concat(exports.wjFinancialChartMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFinancialChart);
    exports.WjFinancialChart = WjFinancialChart;
    exports.wjFinancialChartSeriesMeta = {
        selector: 'wj-financial-chart-series',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'chartType',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.FinancialSeries control.
     *
     * The <b>wj-financial-chart-series</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-financial-chart-series</b> component to add <b>FinancialSeries</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFinancialChartSeries</b> component is derived from the <b>FinancialSeries</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-financial-chart-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis child component.
    */
    var WjFinancialChartSeries = WjFinancialChartSeries_1 = (function (_super) {
        __extends(WjFinancialChartSeries, _super);
        function WjFinancialChartSeries(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFinancialChartSeries.prototype.created = function () {
        };
        WjFinancialChartSeries.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFinancialChartSeries.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFinancialChartSeries.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFinancialChartSeries;
    }(wijmo.chart.finance.FinancialSeries));
    WjFinancialChartSeries.meta = {
        outputs: exports.wjFinancialChartSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFinancialChartSeries = WjFinancialChartSeries_1 = __decorate([
        core_1.Component({
            selector: exports.wjFinancialChartSeriesMeta.selector,
            template: exports.wjFinancialChartSeriesMeta.template,
            inputs: exports.wjFinancialChartSeriesMeta.inputs,
            outputs: exports.wjFinancialChartSeriesMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFinancialChartSeries_1; }) }
            ].concat(exports.wjFinancialChartSeriesMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFinancialChartSeries);
    exports.WjFinancialChartSeries = WjFinancialChartSeries;
    var moduleExports = [
        WjFinancialChart,
        WjFinancialChartSeries
    ];
    var WjChartFinanceModule = (function () {
        function WjChartFinanceModule() {
        }
        return WjChartFinanceModule;
    }());
    WjChartFinanceModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjChartFinanceModule);
    exports.WjChartFinanceModule = WjChartFinanceModule;
    var WjFinancialChart_1, WjFinancialChartSeries_1;
});

/**
* Contains Angular 2 components for the <b>wijmo.chart.finance.analytics</b> module.
*
* <b>wijmo.angular2.chart.finance.analytics</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjFinanceAnalitics from 'wijmo/wijmo.angular2.chart.finance.analytics';</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.finance.analytics'/>
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
define("wijmo/wijmo.angular2.chart.finance.analytics", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartFibonacciMeta = {
        selector: 'wj-flex-chart-fibonacci',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'high',
            'low',
            'labelPosition',
            'levels',
            'minX',
            'maxX',
            'uptrend',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.Fibonacci control.
     *
     * The <b>wj-flex-chart-fibonacci</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-fibonacci</b> component to add <b>Fibonacci</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartFibonacci</b> component is derived from the <b>Fibonacci</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartFibonacci = WjFlexChartFibonacci_1 = (function (_super) {
        __extends(WjFlexChartFibonacci, _super);
        function WjFlexChartFibonacci(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartFibonacci.prototype.created = function () {
        };
        WjFlexChartFibonacci.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartFibonacci.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartFibonacci.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartFibonacci;
    }(wijmo.chart.finance.analytics.Fibonacci));
    WjFlexChartFibonacci.meta = {
        outputs: exports.wjFlexChartFibonacciMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartFibonacci = WjFlexChartFibonacci_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartFibonacciMeta.selector,
            template: exports.wjFlexChartFibonacciMeta.template,
            inputs: exports.wjFlexChartFibonacciMeta.inputs,
            outputs: exports.wjFlexChartFibonacciMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacci_1; }) }
            ].concat(exports.wjFlexChartFibonacciMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartFibonacci);
    exports.WjFlexChartFibonacci = WjFlexChartFibonacci;
    exports.wjFlexChartFibonacciArcsMeta = {
        selector: 'wj-flex-chart-fibonacci-arcs',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'start',
            'end',
            'labelPosition',
            'levels',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.FibonacciArcs control.
     *
     * The <b>wj-flex-chart-fibonacci-arcs</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-fibonacci-arcs</b> component to add <b>FibonacciArcs</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartFibonacciArcs</b> component is derived from the <b>FibonacciArcs</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartFibonacciArcs = WjFlexChartFibonacciArcs_1 = (function (_super) {
        __extends(WjFlexChartFibonacciArcs, _super);
        function WjFlexChartFibonacciArcs(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartFibonacciArcs.prototype.created = function () {
        };
        WjFlexChartFibonacciArcs.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartFibonacciArcs.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartFibonacciArcs.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartFibonacciArcs;
    }(wijmo.chart.finance.analytics.FibonacciArcs));
    WjFlexChartFibonacciArcs.meta = {
        outputs: exports.wjFlexChartFibonacciArcsMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartFibonacciArcs = WjFlexChartFibonacciArcs_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartFibonacciArcsMeta.selector,
            template: exports.wjFlexChartFibonacciArcsMeta.template,
            inputs: exports.wjFlexChartFibonacciArcsMeta.inputs,
            outputs: exports.wjFlexChartFibonacciArcsMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciArcs_1; }) }
            ].concat(exports.wjFlexChartFibonacciArcsMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartFibonacciArcs);
    exports.WjFlexChartFibonacciArcs = WjFlexChartFibonacciArcs;
    exports.wjFlexChartFibonacciFansMeta = {
        selector: 'wj-flex-chart-fibonacci-fans',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'start',
            'end',
            'labelPosition',
            'levels',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.FibonacciFans control.
     *
     * The <b>wj-flex-chart-fibonacci-fans</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-fibonacci-fans</b> component to add <b>FibonacciFans</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartFibonacciFans</b> component is derived from the <b>FibonacciFans</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartFibonacciFans = WjFlexChartFibonacciFans_1 = (function (_super) {
        __extends(WjFlexChartFibonacciFans, _super);
        function WjFlexChartFibonacciFans(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartFibonacciFans.prototype.created = function () {
        };
        WjFlexChartFibonacciFans.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartFibonacciFans.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartFibonacciFans.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartFibonacciFans;
    }(wijmo.chart.finance.analytics.FibonacciFans));
    WjFlexChartFibonacciFans.meta = {
        outputs: exports.wjFlexChartFibonacciFansMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartFibonacciFans = WjFlexChartFibonacciFans_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartFibonacciFansMeta.selector,
            template: exports.wjFlexChartFibonacciFansMeta.template,
            inputs: exports.wjFlexChartFibonacciFansMeta.inputs,
            outputs: exports.wjFlexChartFibonacciFansMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciFans_1; }) }
            ].concat(exports.wjFlexChartFibonacciFansMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartFibonacciFans);
    exports.WjFlexChartFibonacciFans = WjFlexChartFibonacciFans;
    exports.wjFlexChartFibonacciTimeZonesMeta = {
        selector: 'wj-flex-chart-fibonacci-time-zones',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'startX',
            'endX',
            'labelPosition',
            'levels',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.FibonacciTimeZones control.
     *
     * The <b>wj-flex-chart-fibonacci-time-zones</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-fibonacci-time-zones</b> component to add <b>FibonacciTimeZones</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartFibonacciTimeZones</b> component is derived from the <b>FibonacciTimeZones</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartFibonacciTimeZones = WjFlexChartFibonacciTimeZones_1 = (function (_super) {
        __extends(WjFlexChartFibonacciTimeZones, _super);
        function WjFlexChartFibonacciTimeZones(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartFibonacciTimeZones.prototype.created = function () {
        };
        WjFlexChartFibonacciTimeZones.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartFibonacciTimeZones.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartFibonacciTimeZones.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartFibonacciTimeZones;
    }(wijmo.chart.finance.analytics.FibonacciTimeZones));
    WjFlexChartFibonacciTimeZones.meta = {
        outputs: exports.wjFlexChartFibonacciTimeZonesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartFibonacciTimeZones = WjFlexChartFibonacciTimeZones_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartFibonacciTimeZonesMeta.selector,
            template: exports.wjFlexChartFibonacciTimeZonesMeta.template,
            inputs: exports.wjFlexChartFibonacciTimeZonesMeta.inputs,
            outputs: exports.wjFlexChartFibonacciTimeZonesMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciTimeZones_1; }) }
            ].concat(exports.wjFlexChartFibonacciTimeZonesMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartFibonacciTimeZones);
    exports.WjFlexChartFibonacciTimeZones = WjFlexChartFibonacciTimeZones;
    exports.wjFlexChartAtrMeta = {
        selector: 'wj-flex-chart-atr',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'period',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.ATR control.
     *
     * The <b>wj-flex-chart-atr</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-atr</b> component to add <b>ATR</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartAtr</b> component is derived from the <b>ATR</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartAtr = WjFlexChartAtr_1 = (function (_super) {
        __extends(WjFlexChartAtr, _super);
        function WjFlexChartAtr(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartAtr.prototype.created = function () {
        };
        WjFlexChartAtr.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAtr.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAtr.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartAtr;
    }(wijmo.chart.finance.analytics.ATR));
    WjFlexChartAtr.meta = {
        outputs: exports.wjFlexChartAtrMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartAtr = WjFlexChartAtr_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartAtrMeta.selector,
            template: exports.wjFlexChartAtrMeta.template,
            inputs: exports.wjFlexChartAtrMeta.inputs,
            outputs: exports.wjFlexChartAtrMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAtr_1; }) }
            ].concat(exports.wjFlexChartAtrMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartAtr);
    exports.WjFlexChartAtr = WjFlexChartAtr;
    exports.wjFlexChartCciMeta = {
        selector: 'wj-flex-chart-cci',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'period',
            'constant',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.CCI control.
     *
     * The <b>wj-flex-chart-cci</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-cci</b> component to add <b>CCI</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartCci</b> component is derived from the <b>CCI</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartCci = WjFlexChartCci_1 = (function (_super) {
        __extends(WjFlexChartCci, _super);
        function WjFlexChartCci(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartCci.prototype.created = function () {
        };
        WjFlexChartCci.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartCci.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartCci.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartCci;
    }(wijmo.chart.finance.analytics.CCI));
    WjFlexChartCci.meta = {
        outputs: exports.wjFlexChartCciMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartCci = WjFlexChartCci_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartCciMeta.selector,
            template: exports.wjFlexChartCciMeta.template,
            inputs: exports.wjFlexChartCciMeta.inputs,
            outputs: exports.wjFlexChartCciMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartCci_1; }) }
            ].concat(exports.wjFlexChartCciMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartCci);
    exports.WjFlexChartCci = WjFlexChartCci;
    exports.wjFlexChartRsiMeta = {
        selector: 'wj-flex-chart-rsi',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'period',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.RSI control.
     *
     * The <b>wj-flex-chart-rsi</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-rsi</b> component to add <b>RSI</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartRsi</b> component is derived from the <b>RSI</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartRsi = WjFlexChartRsi_1 = (function (_super) {
        __extends(WjFlexChartRsi, _super);
        function WjFlexChartRsi(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartRsi.prototype.created = function () {
        };
        WjFlexChartRsi.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartRsi.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartRsi.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartRsi;
    }(wijmo.chart.finance.analytics.RSI));
    WjFlexChartRsi.meta = {
        outputs: exports.wjFlexChartRsiMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartRsi = WjFlexChartRsi_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartRsiMeta.selector,
            template: exports.wjFlexChartRsiMeta.template,
            inputs: exports.wjFlexChartRsiMeta.inputs,
            outputs: exports.wjFlexChartRsiMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartRsi_1; }) }
            ].concat(exports.wjFlexChartRsiMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartRsi);
    exports.WjFlexChartRsi = WjFlexChartRsi;
    exports.wjFlexChartWilliamsRMeta = {
        selector: 'wj-flex-chart-williams-r',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'period',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.WilliamsR control.
     *
     * The <b>wj-flex-chart-williams-r</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-williams-r</b> component to add <b>WilliamsR</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartWilliamsR</b> component is derived from the <b>WilliamsR</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartWilliamsR = WjFlexChartWilliamsR_1 = (function (_super) {
        __extends(WjFlexChartWilliamsR, _super);
        function WjFlexChartWilliamsR(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartWilliamsR.prototype.created = function () {
        };
        WjFlexChartWilliamsR.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartWilliamsR.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartWilliamsR.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartWilliamsR;
    }(wijmo.chart.finance.analytics.WilliamsR));
    WjFlexChartWilliamsR.meta = {
        outputs: exports.wjFlexChartWilliamsRMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartWilliamsR = WjFlexChartWilliamsR_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartWilliamsRMeta.selector,
            template: exports.wjFlexChartWilliamsRMeta.template,
            inputs: exports.wjFlexChartWilliamsRMeta.inputs,
            outputs: exports.wjFlexChartWilliamsRMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartWilliamsR_1; }) }
            ].concat(exports.wjFlexChartWilliamsRMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartWilliamsR);
    exports.WjFlexChartWilliamsR = WjFlexChartWilliamsR;
    exports.wjFlexChartMacdMeta = {
        selector: 'wj-flex-chart-macd',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'fastPeriod',
            'slowPeriod',
            'smoothingPeriod',
            'styles',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.Macd control.
     *
     * The <b>wj-flex-chart-macd</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-macd</b> component to add <b>Macd</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartMacd</b> component is derived from the <b>Macd</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartMacd = WjFlexChartMacd_1 = (function (_super) {
        __extends(WjFlexChartMacd, _super);
        function WjFlexChartMacd(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartMacd.prototype.created = function () {
        };
        WjFlexChartMacd.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartMacd.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartMacd.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartMacd;
    }(wijmo.chart.finance.analytics.Macd));
    WjFlexChartMacd.meta = {
        outputs: exports.wjFlexChartMacdMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartMacd = WjFlexChartMacd_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartMacdMeta.selector,
            template: exports.wjFlexChartMacdMeta.template,
            inputs: exports.wjFlexChartMacdMeta.inputs,
            outputs: exports.wjFlexChartMacdMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMacd_1; }) }
            ].concat(exports.wjFlexChartMacdMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartMacd);
    exports.WjFlexChartMacd = WjFlexChartMacd;
    exports.wjFlexChartMacdHistogramMeta = {
        selector: 'wj-flex-chart-macd-histogram',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'fastPeriod',
            'slowPeriod',
            'smoothingPeriod',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.MacdHistogram control.
     *
     * The <b>wj-flex-chart-macd-histogram</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-macd-histogram</b> component to add <b>MacdHistogram</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartMacdHistogram</b> component is derived from the <b>MacdHistogram</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartMacdHistogram = WjFlexChartMacdHistogram_1 = (function (_super) {
        __extends(WjFlexChartMacdHistogram, _super);
        function WjFlexChartMacdHistogram(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartMacdHistogram.prototype.created = function () {
        };
        WjFlexChartMacdHistogram.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartMacdHistogram.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartMacdHistogram.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartMacdHistogram;
    }(wijmo.chart.finance.analytics.MacdHistogram));
    WjFlexChartMacdHistogram.meta = {
        outputs: exports.wjFlexChartMacdHistogramMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartMacdHistogram = WjFlexChartMacdHistogram_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartMacdHistogramMeta.selector,
            template: exports.wjFlexChartMacdHistogramMeta.template,
            inputs: exports.wjFlexChartMacdHistogramMeta.inputs,
            outputs: exports.wjFlexChartMacdHistogramMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMacdHistogram_1; }) }
            ].concat(exports.wjFlexChartMacdHistogramMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartMacdHistogram);
    exports.WjFlexChartMacdHistogram = WjFlexChartMacdHistogram;
    exports.wjFlexChartStochasticMeta = {
        selector: 'wj-flex-chart-stochastic',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'dPeriod',
            'kPeriod',
            'smoothingPeriod',
            'styles',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.Stochastic control.
     *
     * The <b>wj-flex-chart-stochastic</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-stochastic</b> component to add <b>Stochastic</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartStochastic</b> component is derived from the <b>Stochastic</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartStochastic = WjFlexChartStochastic_1 = (function (_super) {
        __extends(WjFlexChartStochastic, _super);
        function WjFlexChartStochastic(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartStochastic.prototype.created = function () {
        };
        WjFlexChartStochastic.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartStochastic.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartStochastic.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartStochastic;
    }(wijmo.chart.finance.analytics.Stochastic));
    WjFlexChartStochastic.meta = {
        outputs: exports.wjFlexChartStochasticMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartStochastic = WjFlexChartStochastic_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartStochasticMeta.selector,
            template: exports.wjFlexChartStochasticMeta.template,
            inputs: exports.wjFlexChartStochasticMeta.inputs,
            outputs: exports.wjFlexChartStochasticMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartStochastic_1; }) }
            ].concat(exports.wjFlexChartStochasticMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartStochastic);
    exports.WjFlexChartStochastic = WjFlexChartStochastic;
    exports.wjFlexChartBollingerBandsMeta = {
        selector: 'wj-flex-chart-bollinger-bands',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'period',
            'multiplier',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.BollingerBands control.
     *
     * The <b>wj-flex-chart-bollinger-bands</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-bollinger-bands</b> component to add <b>BollingerBands</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartBollingerBands</b> component is derived from the <b>BollingerBands</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartBollingerBands = WjFlexChartBollingerBands_1 = (function (_super) {
        __extends(WjFlexChartBollingerBands, _super);
        function WjFlexChartBollingerBands(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartBollingerBands.prototype.created = function () {
        };
        WjFlexChartBollingerBands.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartBollingerBands.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartBollingerBands.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartBollingerBands;
    }(wijmo.chart.finance.analytics.BollingerBands));
    WjFlexChartBollingerBands.meta = {
        outputs: exports.wjFlexChartBollingerBandsMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartBollingerBands = WjFlexChartBollingerBands_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartBollingerBandsMeta.selector,
            template: exports.wjFlexChartBollingerBandsMeta.template,
            inputs: exports.wjFlexChartBollingerBandsMeta.inputs,
            outputs: exports.wjFlexChartBollingerBandsMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartBollingerBands_1; }) }
            ].concat(exports.wjFlexChartBollingerBandsMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartBollingerBands);
    exports.WjFlexChartBollingerBands = WjFlexChartBollingerBands;
    exports.wjFlexChartEnvelopesMeta = {
        selector: 'wj-flex-chart-envelopes',
        template: "",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'period',
            'size',
            'type',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.Envelopes control.
     *
     * The <b>wj-flex-chart-envelopes</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-envelopes</b> component to add <b>Envelopes</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexChartEnvelopes</b> component is derived from the <b>Envelopes</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartEnvelopes = WjFlexChartEnvelopes_1 = (function (_super) {
        __extends(WjFlexChartEnvelopes, _super);
        function WjFlexChartEnvelopes(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexChartEnvelopes.prototype.created = function () {
        };
        WjFlexChartEnvelopes.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartEnvelopes.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartEnvelopes.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexChartEnvelopes;
    }(wijmo.chart.finance.analytics.Envelopes));
    WjFlexChartEnvelopes.meta = {
        outputs: exports.wjFlexChartEnvelopesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexChartEnvelopes = WjFlexChartEnvelopes_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexChartEnvelopesMeta.selector,
            template: exports.wjFlexChartEnvelopesMeta.template,
            inputs: exports.wjFlexChartEnvelopesMeta.inputs,
            outputs: exports.wjFlexChartEnvelopesMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartEnvelopes_1; }) }
            ].concat(exports.wjFlexChartEnvelopesMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexChartEnvelopes);
    exports.WjFlexChartEnvelopes = WjFlexChartEnvelopes;
    var moduleExports = [
        WjFlexChartFibonacci,
        WjFlexChartFibonacciArcs,
        WjFlexChartFibonacciFans,
        WjFlexChartFibonacciTimeZones,
        WjFlexChartAtr,
        WjFlexChartCci,
        WjFlexChartRsi,
        WjFlexChartWilliamsR,
        WjFlexChartMacd,
        WjFlexChartMacdHistogram,
        WjFlexChartStochastic,
        WjFlexChartBollingerBands,
        WjFlexChartEnvelopes
    ];
    var WjChartFinanceAnalyticsModule = (function () {
        function WjChartFinanceAnalyticsModule() {
        }
        return WjChartFinanceAnalyticsModule;
    }());
    WjChartFinanceAnalyticsModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjChartFinanceAnalyticsModule);
    exports.WjChartFinanceAnalyticsModule = WjChartFinanceAnalyticsModule;
    var WjFlexChartFibonacci_1, WjFlexChartFibonacciArcs_1, WjFlexChartFibonacciFans_1, WjFlexChartFibonacciTimeZones_1, WjFlexChartAtr_1, WjFlexChartCci_1, WjFlexChartRsi_1, WjFlexChartWilliamsR_1, WjFlexChartMacd_1, WjFlexChartMacdHistogram_1, WjFlexChartStochastic_1, WjFlexChartBollingerBands_1, WjFlexChartEnvelopes_1;
});

/**
* Contains Angular 2 components for the <b>wijmo.chart.hierarchical</b> module.
*
* <b>wijmo.angular2.chart.hierarchical</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjHierarchical from 'wijmo/wijmo.angular2.chart.hierarchical';
* &nbsp;
* &#64;Component({
*     directives: [wjHierarchical.WjSunburst],
*     template: `
*       &lt;wj-sunburst [itemsSource]="data" [binding]="'y'" [bindingX]="'x'"&gt;
*       &lt;/wj-sunburst&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.hierarchical'/>
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
define("wijmo/wijmo.angular2.chart.hierarchical", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjSunburstMeta = {
        selector: 'wj-sunburst',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'binding',
            'footer',
            'header',
            'selectionMode',
            'palette',
            'plotMargin',
            'footerStyle',
            'headerStyle',
            'tooltipContent',
            'itemsSource',
            'bindingName',
            'innerRadius',
            'isAnimated',
            'offset',
            'reversed',
            'startAngle',
            'selectedItemPosition',
            'selectedItemOffset',
            'itemFormatter',
            'labelContent',
            'childItemsPath',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'selectionChangedNg: selectionChanged',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.hierarchical.Sunburst control.
     *
     * Use the <b>wj-sunburst</b> component to add <b>Sunburst</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     ** The <b>WjSunburst</b> component is derived from the <b>Sunburst</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-sunburst</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend child component.
    */
    var WjSunburst = WjSunburst_1 = (function (_super) {
        __extends(WjSunburst, _super);
        function WjSunburst(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
             */
            _this.selectionChangedNg = new core_1.EventEmitter(false);
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
        WjSunburst.prototype.created = function () {
        };
        WjSunburst.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjSunburst.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjSunburst.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        Object.defineProperty(WjSunburst.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjSunburst.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        return WjSunburst;
    }(wijmo.chart.hierarchical.Sunburst));
    WjSunburst.meta = {
        outputs: exports.wjSunburstMeta.outputs,
    };
    WjSunburst = WjSunburst_1 = __decorate([
        core_1.Component({
            selector: exports.wjSunburstMeta.selector,
            template: exports.wjSunburstMeta.template,
            inputs: exports.wjSunburstMeta.inputs,
            outputs: exports.wjSunburstMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjSunburst_1; }) }
            ].concat(exports.wjSunburstMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjSunburst);
    exports.WjSunburst = WjSunburst;
    exports.wjTreeMapMeta = {
        selector: 'wj-tree-map',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'binding',
            'footer',
            'header',
            'selectionMode',
            'palette',
            'plotMargin',
            'footerStyle',
            'headerStyle',
            'tooltipContent',
            'itemsSource',
            'bindingName',
            'maxDepth',
            'type',
            'labelContent',
            'childItemsPath',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'selectionChangedNg: selectionChanged',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.hierarchical.TreeMap control.
     *
     * Use the <b>wj-tree-map</b> component to add <b>TreeMap</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     ** The <b>WjTreeMap</b> component is derived from the <b>TreeMap</b> control and
     * inherits all its properties, events and methods.
    */
    var WjTreeMap = WjTreeMap_1 = (function (_super) {
        __extends(WjTreeMap, _super);
        function WjTreeMap(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
             */
            _this.selectionChangedNg = new core_1.EventEmitter(false);
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
        WjTreeMap.prototype.created = function () {
        };
        WjTreeMap.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjTreeMap.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjTreeMap.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        Object.defineProperty(WjTreeMap.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjTreeMap.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        return WjTreeMap;
    }(wijmo.chart.hierarchical.TreeMap));
    WjTreeMap.meta = {
        outputs: exports.wjTreeMapMeta.outputs,
    };
    WjTreeMap = WjTreeMap_1 = __decorate([
        core_1.Component({
            selector: exports.wjTreeMapMeta.selector,
            template: exports.wjTreeMapMeta.template,
            inputs: exports.wjTreeMapMeta.inputs,
            outputs: exports.wjTreeMapMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjTreeMap_1; }) }
            ].concat(exports.wjTreeMapMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjTreeMap);
    exports.WjTreeMap = WjTreeMap;
    var moduleExports = [
        WjSunburst,
        WjTreeMap
    ];
    var WjChartHierarchicalModule = (function () {
        function WjChartHierarchicalModule() {
        }
        return WjChartHierarchicalModule;
    }());
    WjChartHierarchicalModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjChartHierarchicalModule);
    exports.WjChartHierarchicalModule = WjChartHierarchicalModule;
    var WjSunburst_1, WjTreeMap_1;
});

/**
* Contains Angular 2 components for the <b>wijmo.chart.radar</b> module.
*
* <b>wijmo.angular2.chart.radar</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjRadar from 'wijmo/wijmo.angular2.chart.radar';
* &nbsp;
* &#64;Component({
*     directives: [wjRadar.WjFlexRadar, wjRadar.WjFlexRadarSeries],
*     template: `
*       &lt;wj-flex-radar [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-flex-radar-series [binding]="'y'"&gt;&lt;/wj-flex-radar-series&gt;
*       &lt;/wj-flex-radar&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.radar'/>
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
define("wijmo/wijmo.angular2.chart.radar", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexRadarMeta = {
        selector: 'wj-flex-radar',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'binding',
            'footer',
            'header',
            'selectionMode',
            'palette',
            'plotMargin',
            'footerStyle',
            'headerStyle',
            'tooltipContent',
            'itemsSource',
            'bindingX',
            'interpolateNulls',
            'legendToggle',
            'symbolSize',
            'options',
            'selection',
            'itemFormatter',
            'labelContent',
            'chartType',
            'startAngle',
            'totalAngle',
            'reversed',
            'stacking',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'selectionChangedNg: selectionChanged',
            'selectionChangePC: selectionChange',
            'seriesVisibilityChangedNg: seriesVisibilityChanged',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.radar.FlexRadar control.
     *
     * Use the <b>wj-flex-radar</b> component to add <b>FlexRadar</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexRadar</b> component is derived from the <b>FlexRadar</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-radar</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
     * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarAxis
     * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarSeries
     *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend.
    */
    var WjFlexRadar = WjFlexRadar_1 = (function (_super) {
        __extends(WjFlexRadar, _super);
        function WjFlexRadar(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
             */
            _this.selectionChangedNg = new core_1.EventEmitter(false);
            _this.selectionChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>seriesVisibilityChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>seriesVisibilityChanged</b> Wijmo event name.
             */
            _this.seriesVisibilityChangedNg = new core_1.EventEmitter(false);
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
        WjFlexRadar.prototype.created = function () {
        };
        WjFlexRadar.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexRadar.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexRadar.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        Object.defineProperty(WjFlexRadar.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjFlexRadar.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        return WjFlexRadar;
    }(wijmo.chart.radar.FlexRadar));
    WjFlexRadar.meta = {
        outputs: exports.wjFlexRadarMeta.outputs,
        changeEvents: {
            'selectionChanged': ['selection']
        },
    };
    WjFlexRadar = WjFlexRadar_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexRadarMeta.selector,
            template: exports.wjFlexRadarMeta.template,
            inputs: exports.wjFlexRadarMeta.inputs,
            outputs: exports.wjFlexRadarMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexRadar_1; }) }
            ].concat(exports.wjFlexRadarMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexRadar);
    exports.WjFlexRadar = WjFlexRadar;
    exports.wjFlexRadarAxisMeta = {
        selector: 'wj-flex-radar-axis',
        template: "",
        inputs: [
            'wjProperty',
            'axisLine',
            'format',
            'labels',
            'majorGrid',
            'majorTickMarks',
            'majorUnit',
            'max',
            'min',
            'position',
            'reversed',
            'title',
            'labelAngle',
            'minorGrid',
            'minorTickMarks',
            'minorUnit',
            'origin',
            'logBase',
            'plotArea',
            'labelAlign',
            'name',
            'overlappingLabels',
            'labelPadding',
            'itemFormatter',
            'itemsSource',
            'binding',
        ],
        outputs: [
            'initialized',
            'rangeChangedNg: rangeChanged',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.radar.FlexRadarAxis control.
     *
     * The <b>wj-flex-radar-axis</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar
     *  or @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarSeries.
     *
     * Use the <b>wj-flex-radar-axis</b> component to add <b>FlexRadarAxis</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexRadarAxis</b> component is derived from the <b>FlexRadarAxis</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexRadarAxis = WjFlexRadarAxis_1 = (function (_super) {
        __extends(WjFlexRadarAxis, _super);
        function WjFlexRadarAxis(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'axes'.
             */
            _this.wjProperty = 'axes';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rangeChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rangeChanged</b> Wijmo event name.
             */
            _this.rangeChangedNg = new core_1.EventEmitter(false);
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
        WjFlexRadarAxis.prototype.created = function () {
        };
        WjFlexRadarAxis.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexRadarAxis.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexRadarAxis.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexRadarAxis;
    }(wijmo.chart.radar.FlexRadarAxis));
    WjFlexRadarAxis.meta = {
        outputs: exports.wjFlexRadarAxisMeta.outputs,
    };
    WjFlexRadarAxis = WjFlexRadarAxis_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexRadarAxisMeta.selector,
            template: exports.wjFlexRadarAxisMeta.template,
            inputs: exports.wjFlexRadarAxisMeta.inputs,
            outputs: exports.wjFlexRadarAxisMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexRadarAxis_1; }) }
            ].concat(exports.wjFlexRadarAxisMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexRadarAxis);
    exports.WjFlexRadarAxis = WjFlexRadarAxis;
    exports.wjFlexRadarSeriesMeta = {
        selector: 'wj-flex-radar-series',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'chartType',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.radar.FlexRadarSeries control.
     *
     * The <b>wj-flex-radar-series</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar component.
     *
     * Use the <b>wj-flex-radar-series</b> component to add <b>FlexRadarSeries</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjFlexRadarSeries</b> component is derived from the <b>FlexRadarSeries</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-radar-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarAxis child component.
    */
    var WjFlexRadarSeries = WjFlexRadarSeries_1 = (function (_super) {
        __extends(WjFlexRadarSeries, _super);
        function WjFlexRadarSeries(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendering</b> Wijmo event name.
             */
            _this.renderingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rendered</b> Wijmo event name.
             */
            _this.renderedNg = new core_1.EventEmitter(false);
            _this.visibilityChangePC = new core_1.EventEmitter(false);
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
        WjFlexRadarSeries.prototype.created = function () {
        };
        WjFlexRadarSeries.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexRadarSeries.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexRadarSeries.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjFlexRadarSeries;
    }(wijmo.chart.radar.FlexRadarSeries));
    WjFlexRadarSeries.meta = {
        outputs: exports.wjFlexRadarSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']
        },
        siblingId: 'series',
    };
    WjFlexRadarSeries = WjFlexRadarSeries_1 = __decorate([
        core_1.Component({
            selector: exports.wjFlexRadarSeriesMeta.selector,
            template: exports.wjFlexRadarSeriesMeta.template,
            inputs: exports.wjFlexRadarSeriesMeta.inputs,
            outputs: exports.wjFlexRadarSeriesMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexRadarSeries_1; }) }
            ].concat(exports.wjFlexRadarSeriesMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjFlexRadarSeries);
    exports.WjFlexRadarSeries = WjFlexRadarSeries;
    var moduleExports = [
        WjFlexRadar,
        WjFlexRadarAxis,
        WjFlexRadarSeries
    ];
    var WjChartRadarModule = (function () {
        function WjChartRadarModule() {
        }
        return WjChartRadarModule;
    }());
    WjChartRadarModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjChartRadarModule);
    exports.WjChartRadarModule = WjChartRadarModule;
    var WjFlexRadar_1, WjFlexRadarAxis_1, WjFlexRadarSeries_1;
});

/**
* Contains Angular 2 components for the <b>wijmo.gauge</b> module.
*
* <b>wijmo.angular2.gauge</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjGauge from 'wijmo/wijmo.angular2.gauge';
* &nbsp;
* &#64;Component({
*     directives: [wjGauge.WjLinearGauge],
*     template: '&lt;wj-linear-gauge [(value)]="amount" [isReadOnly]="false"&gt;&lt;/wj-linear-gauge&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     amount = 0;
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.gauge'/>
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
define("wijmo/wijmo.angular2.gauge", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjLinearGaugeMeta = {
        selector: 'wj-linear-gauge',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'value',
            'min',
            'max',
            'origin',
            'isReadOnly',
            'step',
            'format',
            'thickness',
            'hasShadow',
            'isAnimated',
            'showText',
            'showTicks',
            'showRanges',
            'thumbSize',
            'tickSpacing',
            'getText',
            'direction',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.gauge.LinearGauge control.
     *
     * Use the <b>wj-linear-gauge</b> component to add <b>LinearGauge</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjLinearGauge</b> component is derived from the <b>LinearGauge</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-linear-gauge</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
    */
    var WjLinearGauge = WjLinearGauge_1 = (function (_super) {
        __extends(WjLinearGauge, _super);
        function WjLinearGauge(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
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
             * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
             */
            _this.valueChangedNg = new core_1.EventEmitter(false);
            _this.valueChangePC = new core_1.EventEmitter(false);
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
        WjLinearGauge.prototype.created = function () {
        };
        WjLinearGauge.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjLinearGauge.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjLinearGauge.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjLinearGauge;
    }(wijmo.gauge.LinearGauge));
    WjLinearGauge.meta = {
        outputs: exports.wjLinearGaugeMeta.outputs,
        changeEvents: {
            'valueChanged': ['value']
        },
    };
    WjLinearGauge = WjLinearGauge_1 = __decorate([
        core_1.Component({
            selector: exports.wjLinearGaugeMeta.selector,
            template: exports.wjLinearGaugeMeta.template,
            inputs: exports.wjLinearGaugeMeta.inputs,
            outputs: exports.wjLinearGaugeMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjLinearGauge_1; }) }
            ].concat(exports.wjLinearGaugeMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjLinearGauge);
    exports.WjLinearGauge = WjLinearGauge;
    exports.wjBulletGraphMeta = {
        selector: 'wj-bullet-graph',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'value',
            'min',
            'max',
            'origin',
            'isReadOnly',
            'step',
            'format',
            'thickness',
            'hasShadow',
            'isAnimated',
            'showText',
            'showTicks',
            'showRanges',
            'thumbSize',
            'tickSpacing',
            'getText',
            'direction',
            'target',
            'good',
            'bad',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.gauge.BulletGraph control.
     *
     * Use the <b>wj-bullet-graph</b> component to add <b>BulletGraph</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjBulletGraph</b> component is derived from the <b>BulletGraph</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-bullet-graph</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
    */
    var WjBulletGraph = WjBulletGraph_1 = (function (_super) {
        __extends(WjBulletGraph, _super);
        function WjBulletGraph(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
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
             * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
             */
            _this.valueChangedNg = new core_1.EventEmitter(false);
            _this.valueChangePC = new core_1.EventEmitter(false);
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
        WjBulletGraph.prototype.created = function () {
        };
        WjBulletGraph.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjBulletGraph.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjBulletGraph.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjBulletGraph;
    }(wijmo.gauge.BulletGraph));
    WjBulletGraph.meta = {
        outputs: exports.wjBulletGraphMeta.outputs,
        changeEvents: {
            'valueChanged': ['value']
        },
    };
    WjBulletGraph = WjBulletGraph_1 = __decorate([
        core_1.Component({
            selector: exports.wjBulletGraphMeta.selector,
            template: exports.wjBulletGraphMeta.template,
            inputs: exports.wjBulletGraphMeta.inputs,
            outputs: exports.wjBulletGraphMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjBulletGraph_1; }) }
            ].concat(exports.wjBulletGraphMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjBulletGraph);
    exports.WjBulletGraph = WjBulletGraph;
    exports.wjRadialGaugeMeta = {
        selector: 'wj-radial-gauge',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'value',
            'min',
            'max',
            'origin',
            'isReadOnly',
            'step',
            'format',
            'thickness',
            'hasShadow',
            'isAnimated',
            'showText',
            'showTicks',
            'showRanges',
            'thumbSize',
            'tickSpacing',
            'getText',
            'autoScale',
            'startAngle',
            'sweepAngle',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.gauge.RadialGauge control.
     *
     * Use the <b>wj-radial-gauge</b> component to add <b>RadialGauge</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjRadialGauge</b> component is derived from the <b>RadialGauge</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-radial-gauge</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
    */
    var WjRadialGauge = WjRadialGauge_1 = (function (_super) {
        __extends(WjRadialGauge, _super);
        function WjRadialGauge(elRef, injector, parentCmp) {
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
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
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
             * Angular (EventEmitter) version of the Wijmo <b>valueChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>valueChanged</b> Wijmo event name.
             */
            _this.valueChangedNg = new core_1.EventEmitter(false);
            _this.valueChangePC = new core_1.EventEmitter(false);
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
        WjRadialGauge.prototype.created = function () {
        };
        WjRadialGauge.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjRadialGauge.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjRadialGauge.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjRadialGauge;
    }(wijmo.gauge.RadialGauge));
    WjRadialGauge.meta = {
        outputs: exports.wjRadialGaugeMeta.outputs,
        changeEvents: {
            'valueChanged': ['value']
        },
    };
    WjRadialGauge = WjRadialGauge_1 = __decorate([
        core_1.Component({
            selector: exports.wjRadialGaugeMeta.selector,
            template: exports.wjRadialGaugeMeta.template,
            inputs: exports.wjRadialGaugeMeta.inputs,
            outputs: exports.wjRadialGaugeMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjRadialGauge_1; }) }
            ].concat(exports.wjRadialGaugeMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjRadialGauge);
    exports.WjRadialGauge = WjRadialGauge;
    exports.wjRangeMeta = {
        selector: 'wj-range',
        template: "",
        inputs: [
            'wjProperty',
            'color',
            'min',
            'max',
            'name',
            'thickness',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.gauge.Range control.
     *
     * The <b>wj-range</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.gauge.WjLinearGauge
     * , @see:wijmo/wijmo.angular2.gauge.WjBulletGraph
     *  or @see:wijmo/wijmo.angular2.gauge.WjRadialGauge.
     *
     * Use the <b>wj-range</b> component to add <b>Range</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjRange</b> component is derived from the <b>Range</b> control and
     * inherits all its properties, events and methods.
    */
    var WjRange = WjRange_1 = (function (_super) {
        __extends(WjRange, _super);
        function WjRange(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
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
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'ranges'.
             */
            _this.wjProperty = 'ranges';
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
        WjRange.prototype.created = function () {
        };
        WjRange.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjRange.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjRange.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjRange;
    }(wijmo.gauge.Range));
    WjRange.meta = {
        outputs: exports.wjRangeMeta.outputs,
    };
    WjRange = WjRange_1 = __decorate([
        core_1.Component({
            selector: exports.wjRangeMeta.selector,
            template: exports.wjRangeMeta.template,
            inputs: exports.wjRangeMeta.inputs,
            outputs: exports.wjRangeMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjRange_1; }) }
            ].concat(exports.wjRangeMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjRange);
    exports.WjRange = WjRange;
    var moduleExports = [
        WjLinearGauge,
        WjBulletGraph,
        WjRadialGauge,
        WjRange
    ];
    var WjGaugeModule = (function () {
        function WjGaugeModule() {
        }
        return WjGaugeModule;
    }());
    WjGaugeModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjGaugeModule);
    exports.WjGaugeModule = WjGaugeModule;
    var WjLinearGauge_1, WjBulletGraph_1, WjRadialGauge_1, WjRange_1;
});

/**
* Contains Angular 2 components for the <b>wijmo.olap</b> module.
*
* <b>wijmo.angular2.olap</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjOlap from 'wijmo/wijmo.angular2.olap';
* &nbsp;
* &#64;Component({
*     directives: [wjOlap.WjPivotGrid],
*     template: '&lt;wj-pivot-grid [itemsSource]="data"&gt;&lt;/wj-pivot-grid&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.olap'/>
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
define("wijmo/wijmo.angular2.olap", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjPivotGridMeta = {
        selector: 'wj-pivot-grid',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'newRowAtTop',
            'allowAddNew',
            'allowDelete',
            'allowDragging',
            'allowMerging',
            'allowResizing',
            'allowSorting',
            'autoSizeMode',
            'autoGenerateColumns',
            'childItemsPath',
            'groupHeaderFormat',
            'headersVisibility',
            'showSelectedHeaders',
            'showMarquee',
            'itemFormatter',
            'isReadOnly',
            'imeEnabled',
            'mergeManager',
            'selectionMode',
            'showGroups',
            'showSort',
            'showAlternatingRows',
            'showErrors',
            'validateEdits',
            'treeIndent',
            'itemsSource',
            'autoClipboard',
            'frozenRows',
            'frozenColumns',
            'deferResizing',
            'sortRowIndex',
            'stickyHeaders',
            'preserveSelectedState',
            'preserveOutlineState',
            'showDetailOnDoubleClick',
            'customContextMenu',
            'collapsibleSubtotals',
            'centerHeadersVertically',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'beginningEditNg: beginningEdit',
            'cellEditEndedNg: cellEditEnded',
            'cellEditEndingNg: cellEditEnding',
            'prepareCellForEditNg: prepareCellForEdit',
            'formatItemNg: formatItem',
            'resizingColumnNg: resizingColumn',
            'resizedColumnNg: resizedColumn',
            'autoSizingColumnNg: autoSizingColumn',
            'autoSizedColumnNg: autoSizedColumn',
            'draggingColumnNg: draggingColumn',
            'draggingColumnOverNg: draggingColumnOver',
            'draggedColumnNg: draggedColumn',
            'sortingColumnNg: sortingColumn',
            'sortedColumnNg: sortedColumn',
            'resizingRowNg: resizingRow',
            'resizedRowNg: resizedRow',
            'autoSizingRowNg: autoSizingRow',
            'autoSizedRowNg: autoSizedRow',
            'draggingRowNg: draggingRow',
            'draggingRowOverNg: draggingRowOver',
            'draggedRowNg: draggedRow',
            'deletingRowNg: deletingRow',
            'loadingRowsNg: loadingRows',
            'loadedRowsNg: loadedRows',
            'rowEditStartingNg: rowEditStarting',
            'rowEditStartedNg: rowEditStarted',
            'rowEditEndingNg: rowEditEnding',
            'rowEditEndedNg: rowEditEnded',
            'rowAddedNg: rowAdded',
            'groupCollapsedChangedNg: groupCollapsedChanged',
            'groupCollapsedChangingNg: groupCollapsedChanging',
            'itemsSourceChangedNg: itemsSourceChanged',
            'selectionChangingNg: selectionChanging',
            'selectionChangedNg: selectionChanged',
            'scrollPositionChangedNg: scrollPositionChanged',
            'updatingViewNg: updatingView',
            'updatedViewNg: updatedView',
            'updatingLayoutNg: updatingLayout',
            'updatedLayoutNg: updatedLayout',
            'pastingNg: pasting',
            'pastedNg: pasted',
            'pastingCellNg: pastingCell',
            'pastedCellNg: pastedCell',
            'copyingNg: copying',
            'copiedNg: copied',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.olap.PivotGrid control.
     *
     * Use the <b>wj-pivot-grid</b> component to add <b>PivotGrid</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjPivotGrid</b> component is derived from the <b>PivotGrid</b> control and
     * inherits all its properties, events and methods.
    */
    var WjPivotGrid = WjPivotGrid_1 = (function (_super) {
        __extends(WjPivotGrid, _super);
        function WjPivotGrid(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>beginningEdit</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>beginningEdit</b> Wijmo event name.
             */
            _this.beginningEditNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>cellEditEnded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>cellEditEnded</b> Wijmo event name.
             */
            _this.cellEditEndedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>cellEditEnding</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>cellEditEnding</b> Wijmo event name.
             */
            _this.cellEditEndingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>prepareCellForEdit</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>prepareCellForEdit</b> Wijmo event name.
             */
            _this.prepareCellForEditNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>formatItem</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>formatItem</b> Wijmo event name.
             */
            _this.formatItemNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizingColumn</b> Wijmo event name.
             */
            _this.resizingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizedColumn</b> Wijmo event name.
             */
            _this.resizedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizingColumn</b> Wijmo event name.
             */
            _this.autoSizingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizedColumn</b> Wijmo event name.
             */
            _this.autoSizedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingColumn</b> Wijmo event name.
             */
            _this.draggingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingColumnOver</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingColumnOver</b> Wijmo event name.
             */
            _this.draggingColumnOverNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggedColumn</b> Wijmo event name.
             */
            _this.draggedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>sortingColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>sortingColumn</b> Wijmo event name.
             */
            _this.sortingColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>sortedColumn</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>sortedColumn</b> Wijmo event name.
             */
            _this.sortedColumnNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizingRow</b> Wijmo event name.
             */
            _this.resizingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>resizedRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>resizedRow</b> Wijmo event name.
             */
            _this.resizedRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizingRow</b> Wijmo event name.
             */
            _this.autoSizingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>autoSizedRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>autoSizedRow</b> Wijmo event name.
             */
            _this.autoSizedRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingRow</b> Wijmo event name.
             */
            _this.draggingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggingRowOver</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggingRowOver</b> Wijmo event name.
             */
            _this.draggingRowOverNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>draggedRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>draggedRow</b> Wijmo event name.
             */
            _this.draggedRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>deletingRow</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>deletingRow</b> Wijmo event name.
             */
            _this.deletingRowNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>loadingRows</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>loadingRows</b> Wijmo event name.
             */
            _this.loadingRowsNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>loadedRows</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>loadedRows</b> Wijmo event name.
             */
            _this.loadedRowsNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditStarting</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditStarting</b> Wijmo event name.
             */
            _this.rowEditStartingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditStarted</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditStarted</b> Wijmo event name.
             */
            _this.rowEditStartedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditEnding</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditEnding</b> Wijmo event name.
             */
            _this.rowEditEndingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowEditEnded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowEditEnded</b> Wijmo event name.
             */
            _this.rowEditEndedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>rowAdded</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>rowAdded</b> Wijmo event name.
             */
            _this.rowAddedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>groupCollapsedChanged</b> Wijmo event name.
             */
            _this.groupCollapsedChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>groupCollapsedChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>groupCollapsedChanging</b> Wijmo event name.
             */
            _this.groupCollapsedChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>itemsSourceChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>itemsSourceChanged</b> Wijmo event name.
             */
            _this.itemsSourceChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanging</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanging</b> Wijmo event name.
             */
            _this.selectionChangingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
             */
            _this.selectionChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>scrollPositionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>scrollPositionChanged</b> Wijmo event name.
             */
            _this.scrollPositionChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatingView</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatingView</b> Wijmo event name.
             */
            _this.updatingViewNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatedView</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatedView</b> Wijmo event name.
             */
            _this.updatedViewNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatingLayout</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatingLayout</b> Wijmo event name.
             */
            _this.updatingLayoutNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatedLayout</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatedLayout</b> Wijmo event name.
             */
            _this.updatedLayoutNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pasting</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pasting</b> Wijmo event name.
             */
            _this.pastingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pasted</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pasted</b> Wijmo event name.
             */
            _this.pastedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pastingCell</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pastingCell</b> Wijmo event name.
             */
            _this.pastingCellNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>pastedCell</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pastedCell</b> Wijmo event name.
             */
            _this.pastedCellNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>copying</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>copying</b> Wijmo event name.
             */
            _this.copyingNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>copied</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>copied</b> Wijmo event name.
             */
            _this.copiedNg = new core_1.EventEmitter(false);
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
        WjPivotGrid.prototype.created = function () {
        };
        WjPivotGrid.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjPivotGrid.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjPivotGrid.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjPivotGrid;
    }(wijmo.olap.PivotGrid));
    WjPivotGrid.meta = {
        outputs: exports.wjPivotGridMeta.outputs,
    };
    WjPivotGrid = WjPivotGrid_1 = __decorate([
        core_1.Component({
            selector: exports.wjPivotGridMeta.selector,
            template: exports.wjPivotGridMeta.template,
            inputs: exports.wjPivotGridMeta.inputs,
            outputs: exports.wjPivotGridMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotGrid_1; }) }
            ].concat(exports.wjPivotGridMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjPivotGrid);
    exports.WjPivotGrid = WjPivotGrid;
    exports.wjPivotChartMeta = {
        selector: 'wj-pivot-chart',
        template: "",
        inputs: [
            'wjModelProperty',
            'chartType',
            'showHierarchicalAxes',
            'showTotals',
            'stacking',
            'maxSeries',
            'maxPoints',
            'itemsSource',
        ],
        outputs: [
            'initialized',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.olap.PivotChart control.
     *
     * Use the <b>wj-pivot-chart</b> component to add <b>PivotChart</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjPivotChart</b> component is derived from the <b>PivotChart</b> control and
     * inherits all its properties, events and methods.
    */
    var WjPivotChart = WjPivotChart_1 = (function (_super) {
        __extends(WjPivotChart, _super);
        function WjPivotChart(elRef, injector, parentCmp) {
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
        WjPivotChart.prototype.created = function () {
        };
        WjPivotChart.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjPivotChart.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjPivotChart.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjPivotChart;
    }(wijmo.olap.PivotChart));
    WjPivotChart.meta = {
        outputs: exports.wjPivotChartMeta.outputs,
    };
    WjPivotChart = WjPivotChart_1 = __decorate([
        core_1.Component({
            selector: exports.wjPivotChartMeta.selector,
            template: exports.wjPivotChartMeta.template,
            inputs: exports.wjPivotChartMeta.inputs,
            outputs: exports.wjPivotChartMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotChart_1; }) }
            ].concat(exports.wjPivotChartMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjPivotChart);
    exports.WjPivotChart = WjPivotChart;
    exports.wjPivotPanelMeta = {
        selector: 'wj-pivot-panel',
        template: "",
        inputs: [
            'wjModelProperty',
            'autoGenerateFields',
            'viewDefinition',
            'engine',
            'itemsSource',
        ],
        outputs: [
            'initialized',
            'itemsSourceChangedNg: itemsSourceChanged',
            'viewDefinitionChangedNg: viewDefinitionChanged',
            'updatingViewNg: updatingView',
            'updatedViewNg: updatedView',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.olap.PivotPanel control.
     *
     * Use the <b>wj-pivot-panel</b> component to add <b>PivotPanel</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjPivotPanel</b> component is derived from the <b>PivotPanel</b> control and
     * inherits all its properties, events and methods.
    */
    var WjPivotPanel = WjPivotPanel_1 = (function (_super) {
        __extends(WjPivotPanel, _super);
        function WjPivotPanel(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>itemsSourceChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>itemsSourceChanged</b> Wijmo event name.
             */
            _this.itemsSourceChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>viewDefinitionChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>viewDefinitionChanged</b> Wijmo event name.
             */
            _this.viewDefinitionChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatingView</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatingView</b> Wijmo event name.
             */
            _this.updatingViewNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>updatedView</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>updatedView</b> Wijmo event name.
             */
            _this.updatedViewNg = new core_1.EventEmitter(false);
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
        WjPivotPanel.prototype.created = function () {
        };
        WjPivotPanel.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjPivotPanel.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjPivotPanel.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        return WjPivotPanel;
    }(wijmo.olap.PivotPanel));
    WjPivotPanel.meta = {
        outputs: exports.wjPivotPanelMeta.outputs,
    };
    WjPivotPanel = WjPivotPanel_1 = __decorate([
        core_1.Component({
            selector: exports.wjPivotPanelMeta.selector,
            template: exports.wjPivotPanelMeta.template,
            inputs: exports.wjPivotPanelMeta.inputs,
            outputs: exports.wjPivotPanelMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotPanel_1; }) }
            ].concat(exports.wjPivotPanelMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjPivotPanel);
    exports.WjPivotPanel = WjPivotPanel;
    var moduleExports = [
        WjPivotGrid,
        WjPivotChart,
        WjPivotPanel
    ];
    var WjOlapModule = (function () {
        function WjOlapModule() {
        }
        return WjOlapModule;
    }());
    WjOlapModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjOlapModule);
    exports.WjOlapModule = WjOlapModule;
    var WjPivotGrid_1, WjPivotChart_1, WjPivotPanel_1;
});

/**
* Contains Angular 2 components for the <b>wijmo.viewer</b> module.
*
* <b>wijmo.angular2.viewer</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjViewer from 'wijmo/wijmo.angular2.viewer';
* &nbsp;
* &#64;Component({
*     directives: [wjViewer.WjReportViewer, wjViewer.WjPdfViewer],
*     template: `
*       &lt;wj-report-viewer [reportName]="sales" [serviceUrl]="'webserviceApi'"&gt;
*       &lt;/wj-report-viewer;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.viewer'/>
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
define("wijmo/wijmo.angular2.viewer", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjReportViewerMeta = {
        selector: 'wj-report-viewer',
        template: "",
        inputs: [
            'wjModelProperty',
            'serviceUrl',
            'filePath',
            'fullScreen',
            'zoomFactor',
            'mouseMode',
            'selectMouseMode',
            'viewMode',
            'paginated',
            'reportName',
        ],
        outputs: [
            'initialized',
            'pageIndexChangedNg: pageIndexChanged',
            'viewModeChangedNg: viewModeChanged',
            'viewModeChangePC: viewModeChange',
            'mouseModeChangedNg: mouseModeChanged',
            'mouseModeChangePC: mouseModeChange',
            'selectMouseModeChangedNg: selectMouseModeChanged',
            'selectMouseModeChangePC: selectMouseModeChange',
            'fullScreenChangedNg: fullScreenChanged',
            'fullScreenChangePC: fullScreenChange',
            'zoomFactorChangedNg: zoomFactorChanged',
            'zoomFactorChangePC: zoomFactorChange',
            'queryLoadingDataNg: queryLoadingData',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.viewer.ReportViewer control.
     *
     * Use the <b>wj-report-viewer</b> component to add <b>ReportViewer</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjReportViewer</b> component is derived from the <b>ReportViewer</b> control and
     * inherits all its properties, events and methods.
    */
    var WjReportViewer = WjReportViewer_1 = (function (_super) {
        __extends(WjReportViewer, _super);
        function WjReportViewer(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>pageIndexChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pageIndexChanged</b> Wijmo event name.
             */
            _this.pageIndexChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>viewModeChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>viewModeChanged</b> Wijmo event name.
             */
            _this.viewModeChangedNg = new core_1.EventEmitter(false);
            _this.viewModeChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>mouseModeChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>mouseModeChanged</b> Wijmo event name.
             */
            _this.mouseModeChangedNg = new core_1.EventEmitter(false);
            _this.mouseModeChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectMouseModeChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectMouseModeChanged</b> Wijmo event name.
             */
            _this.selectMouseModeChangedNg = new core_1.EventEmitter(false);
            _this.selectMouseModeChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>fullScreenChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>fullScreenChanged</b> Wijmo event name.
             */
            _this.fullScreenChangedNg = new core_1.EventEmitter(false);
            _this.fullScreenChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>zoomFactorChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>zoomFactorChanged</b> Wijmo event name.
             */
            _this.zoomFactorChangedNg = new core_1.EventEmitter(false);
            _this.zoomFactorChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>queryLoadingData</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>queryLoadingData</b> Wijmo event name.
             */
            _this.queryLoadingDataNg = new core_1.EventEmitter(false);
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
        WjReportViewer.prototype.created = function () {
        };
        WjReportViewer.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjReportViewer.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjReportViewer.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjReportViewer.prototype.onSelectMouseModeChanged = function (e) {
            // Wijmo interop always subscribes to any event, so we issue a deprecated warning
            // only if there are more than one subscriber. 
            if (this.selectMouseModeChanged['_handlers'].length > 1 ||
                this.selectMouseModeChangedNg.observers.length > 0) {
                wijmo._deprecated('selectMouseModeChanged', 'mouseModeChanged');
            }
            this.selectMouseModeChanged.raise(this, e);
        };
        return WjReportViewer;
    }(wijmo.viewer.ReportViewer));
    WjReportViewer.meta = {
        outputs: exports.wjReportViewerMeta.outputs,
        changeEvents: {
            'viewModeChanged': ['viewMode'],
            'mouseModeChanged': ['mouseMode'],
            'selectMouseModeChanged': ['selectMouseMode'],
            'fullScreenChanged': ['fullScreen'],
            'zoomFactorChanged': ['zoomFactor']
        },
    };
    WjReportViewer = WjReportViewer_1 = __decorate([
        core_1.Component({
            selector: exports.wjReportViewerMeta.selector,
            template: exports.wjReportViewerMeta.template,
            inputs: exports.wjReportViewerMeta.inputs,
            outputs: exports.wjReportViewerMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjReportViewer_1; }) }
            ].concat(exports.wjReportViewerMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjReportViewer);
    exports.WjReportViewer = WjReportViewer;
    exports.wjPdfViewerMeta = {
        selector: 'wj-pdf-viewer',
        template: "",
        inputs: [
            'wjModelProperty',
            'serviceUrl',
            'filePath',
            'fullScreen',
            'zoomFactor',
            'mouseMode',
            'selectMouseMode',
            'viewMode',
        ],
        outputs: [
            'initialized',
            'pageIndexChangedNg: pageIndexChanged',
            'viewModeChangedNg: viewModeChanged',
            'viewModeChangePC: viewModeChange',
            'mouseModeChangedNg: mouseModeChanged',
            'mouseModeChangePC: mouseModeChange',
            'selectMouseModeChangedNg: selectMouseModeChanged',
            'selectMouseModeChangePC: selectMouseModeChange',
            'fullScreenChangedNg: fullScreenChanged',
            'fullScreenChangePC: fullScreenChange',
            'zoomFactorChangedNg: zoomFactorChanged',
            'zoomFactorChangePC: zoomFactorChange',
            'queryLoadingDataNg: queryLoadingData',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.viewer.PdfViewer control.
     *
     * Use the <b>wj-pdf-viewer</b> component to add <b>PdfViewer</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjPdfViewer</b> component is derived from the <b>PdfViewer</b> control and
     * inherits all its properties, events and methods.
    */
    var WjPdfViewer = WjPdfViewer_1 = (function (_super) {
        __extends(WjPdfViewer, _super);
        function WjPdfViewer(elRef, injector, parentCmp) {
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
             * Angular (EventEmitter) version of the Wijmo <b>pageIndexChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>pageIndexChanged</b> Wijmo event name.
             */
            _this.pageIndexChangedNg = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>viewModeChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>viewModeChanged</b> Wijmo event name.
             */
            _this.viewModeChangedNg = new core_1.EventEmitter(false);
            _this.viewModeChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>mouseModeChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>mouseModeChanged</b> Wijmo event name.
             */
            _this.mouseModeChangedNg = new core_1.EventEmitter(false);
            _this.mouseModeChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>selectMouseModeChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>selectMouseModeChanged</b> Wijmo event name.
             */
            _this.selectMouseModeChangedNg = new core_1.EventEmitter(false);
            _this.selectMouseModeChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>fullScreenChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>fullScreenChanged</b> Wijmo event name.
             */
            _this.fullScreenChangedNg = new core_1.EventEmitter(false);
            _this.fullScreenChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>zoomFactorChanged</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>zoomFactorChanged</b> Wijmo event name.
             */
            _this.zoomFactorChangedNg = new core_1.EventEmitter(false);
            _this.zoomFactorChangePC = new core_1.EventEmitter(false);
            /**
             * Angular (EventEmitter) version of the Wijmo <b>queryLoadingData</b> event for programmatic access.
             * Use this event name if you want to subscribe to the Angular version of the event in code.
             * In template bindings use the conventional <b>queryLoadingData</b> Wijmo event name.
             */
            _this.queryLoadingDataNg = new core_1.EventEmitter(false);
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
        WjPdfViewer.prototype.created = function () {
        };
        WjPdfViewer.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjPdfViewer.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjPdfViewer.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjPdfViewer.prototype.onSelectMouseModeChanged = function (e) {
            // Wijmo interop always subscribes to any event, so we issue a deprecated warning
            // only if there are more than one subscriber. 
            if (this.selectMouseModeChanged['_handlers'].length > 1 ||
                this.selectMouseModeChangedNg.observers.length > 0) {
                wijmo._deprecated('selectMouseModeChanged', 'mouseModeChanged');
            }
            this.selectMouseModeChanged.raise(this, e);
        };
        return WjPdfViewer;
    }(wijmo.viewer.PdfViewer));
    WjPdfViewer.meta = {
        outputs: exports.wjPdfViewerMeta.outputs,
        changeEvents: {
            'viewModeChanged': ['viewMode'],
            'mouseModeChanged': ['mouseMode'],
            'selectMouseModeChanged': ['selectMouseMode'],
            'fullScreenChanged': ['fullScreen'],
            'zoomFactorChanged': ['zoomFactor']
        },
    };
    WjPdfViewer = WjPdfViewer_1 = __decorate([
        core_1.Component({
            selector: exports.wjPdfViewerMeta.selector,
            template: exports.wjPdfViewerMeta.template,
            inputs: exports.wjPdfViewerMeta.inputs,
            outputs: exports.wjPdfViewerMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPdfViewer_1; }) }
            ].concat(exports.wjPdfViewerMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjPdfViewer);
    exports.WjPdfViewer = WjPdfViewer;
    var moduleExports = [
        WjReportViewer,
        WjPdfViewer
    ];
    var WjViewerModule = (function () {
        function WjViewerModule() {
        }
        return WjViewerModule;
    }());
    WjViewerModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
            declarations: moduleExports.slice(),
            exports: moduleExports.slice(),
        })
    ], WjViewerModule);
    exports.WjViewerModule = WjViewerModule;
    var WjReportViewer_1, WjPdfViewer_1;
});

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
define("wijmo/wijmo.angular2.nav", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjTreeViewMeta = {
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
    };
    /**
     * Angular 2 component for the @see:wijmo.nav.TreeView control.
     *
     * Use the <b>wj-tree-view</b> component to add <b>TreeView</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
     * The <b>WjTreeView</b> component is derived from the <b>TreeView</b> control and
     * inherits all its properties, events and methods.
    */
    var WjTreeView = WjTreeView_1 = (function (_super) {
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
        outputs: exports.wjTreeViewMeta.outputs,
        changeEvents: {
            'selectedItemChanged': ['selectedItem', 'selectedNode'],
            'checkedItemsChanged': ['checkedItems']
        },
    };
    WjTreeView = WjTreeView_1 = __decorate([
        core_1.Component({
            selector: exports.wjTreeViewMeta.selector,
            template: exports.wjTreeViewMeta.template,
            inputs: exports.wjTreeViewMeta.inputs,
            outputs: exports.wjTreeViewMeta.outputs,
            providers: [
                { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjTreeView_1; }) }
            ].concat(exports.wjTreeViewMeta.providers)
        }),
        __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
        __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
    ], WjTreeView);
    exports.WjTreeView = WjTreeView;
    var moduleExports = [
        WjTreeView
    ];
    var WjNavModule = (function () {
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
    exports.WjNavModule = WjNavModule;
    var WjTreeView_1;
});

///<amd-module name='wijmo/wijmo.angular2.all'/>
define("wijmo/wijmo.angular2.all", ["require", "exports", "wijmo/wijmo.angular2.input", "wijmo/wijmo.angular2.grid", "wijmo/wijmo.angular2.chart", "wijmo/wijmo.angular2.gauge", "wijmo/wijmo.angular2.core", "wijmo/wijmo.angular2.viewer"], function (require, exports, wjNg2Input, wjNg2Grid, wjNg2Chart, wjNg2Gauge, wjNg2Core, wjNg2Viewer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjNg2Input = wjNg2Input;
    exports.wjNg2Grid = wjNg2Grid;
    exports.wjNg2Chart = wjNg2Chart;
    exports.wjNg2Gauge = wjNg2Gauge;
    exports.wjNg2Core = wjNg2Core;
    exports.wjNg2Viewer = wjNg2Viewer;
});
//export module wj.angular2 {
//} 

