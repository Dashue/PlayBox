

import * as wjcCore from 'wijmo/wijmo';
import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';
import * as wjcGridGrouppanel from 'wijmo/wijmo.grid.grouppanel';
import * as wjcGridDetail from 'wijmo/wijmo.grid.detail';
import * as wjcGridSheet from 'wijmo/wijmo.grid.sheet';
import * as wjcGridMultirow from 'wijmo/wijmo.grid.multirow';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcChartHierarchical from 'wijmo/wijmo.chart.hierarchical';
import * as wjcChartAnnotation from 'wijmo/wijmo.chart.annotation';
import * as wjcChartInteraction from 'wijmo/wijmo.chart.interaction';
import * as wjcChartAnimation from 'wijmo/wijmo.chart.animation';
import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import * as wjcChartRadar from 'wijmo/wijmo.chart.radar';
import * as wjcChartAnalytics from 'wijmo/wijmo.chart.analytics';
import * as wjcChartFinanceAnalytics from 'wijmo/wijmo.chart.finance.analytics';
import * as wjcGauge from 'wijmo/wijmo.gauge';
import * as wjcOlap from 'wijmo/wijmo.olap';
import * as wjcViewer from 'wijmo/wijmo.viewer';
import * as wjcNav from 'wijmo/wijmo.nav';

function tryGetModuleWijmoInput(): typeof wjcInput {
    let m1;
    return (m1 = window['wijmo']) && m1['input'];
}
function tryGetModuleWijmoGrid(): typeof wjcGrid {
    let m1;
    return (m1 = window['wijmo']) && m1['grid'];
}
function tryGetModuleWijmoGridFilter(): typeof wjcGridFilter {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['filter'];
}
function tryGetModuleWijmoGridGrouppanel(): typeof wjcGridGrouppanel {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['grouppanel'];
}
function tryGetModuleWijmoGridDetail(): typeof wjcGridDetail {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['detail'];
}
function tryGetModuleWijmoGridSheet(): typeof wjcGridSheet {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['sheet'];
}
function tryGetModuleWijmoGridMultirow(): typeof wjcGridMultirow {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['multirow'];
}
function tryGetModuleWijmoChart(): typeof wjcChart {
    let m1;
    return (m1 = window['wijmo']) && m1['chart'];
}
function tryGetModuleWijmoChartHierarchical(): typeof wjcChartHierarchical {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['chart']) && m2['hierarchical'];
}
function tryGetModuleWijmoChartAnnotation(): typeof wjcChartAnnotation {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['chart']) && m2['annotation'];
}
function tryGetModuleWijmoChartInteraction(): typeof wjcChartInteraction {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['chart']) && m2['interaction'];
}
function tryGetModuleWijmoChartAnimation(): typeof wjcChartAnimation {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['chart']) && m2['animation'];
}
function tryGetModuleWijmoChartFinance(): typeof wjcChartFinance {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['chart']) && m2['finance'];
}
function tryGetModuleWijmoChartRadar(): typeof wjcChartRadar {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['chart']) && m2['radar'];
}
function tryGetModuleWijmoChartAnalytics(): typeof wjcChartAnalytics {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['chart']) && m2['analytics'];
}
function tryGetModuleWijmoChartFinanceAnalytics(): typeof wjcChartFinanceAnalytics {
    let m1, m2, m3;
    return (m1 = window['wijmo']) && (m2 = m1['chart']) && (m3 = m2['finance']) && m3['analytics'];
}
function tryGetModuleWijmoGauge(): typeof wjcGauge {
    let m1;
    return (m1 = window['wijmo']) && m1['gauge'];
}
function tryGetModuleWijmoOlap(): typeof wjcOlap {
    let m1;
    return (m1 = window['wijmo']) && m1['olap'];
}
function tryGetModuleWijmoViewer(): typeof wjcViewer {
    let m1;
    return (m1 = window['wijmo']) && m1['viewer'];
}
function tryGetModuleWijmoNav(): typeof wjcNav {
    let m1;
    return (m1 = window['wijmo']) && m1['nav'];
}


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


    // prevent double loading
    //if (wijmo && wijmo.interop) {
    //    return;
    //}

    
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
        export class ControlMetaFactory {
            // Creates a property descriptor object. A specific interop service should override this method in the derived
            // metadata factory class to create platform specific descriptor object.
            public static CreateProp(propertyName: string, propertyType: PropertyType, changeEvent?: string, enumType?,
                isNativeControlProperty?: boolean, priority?: number): PropDescBase {

                return new PropDescBase(propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority);
            }

            // Creates an event descriptor object. A specific interop service should override this method in the derived
            // metadata factory class to create platform specific descriptor object.
            public static CreateEvent(eventName: string, isPropChanged?: boolean): EventDescBase {
                return new EventDescBase(eventName, isPropChanged);
            }

            // Creates a complex property descriptor object. A specific interop service should override this method in the derived
            // metadata factory class to create platform specific descriptor object.
            public static CreateComplexProp(propertyName: string, isArray: boolean, ownsObject?: boolean): ComplexPropDescBase {
                return new ComplexPropDescBase(propertyName, isArray, ownsObject);
            }

            // Finds a property descriptor by the property name in the specified array.
            public static findProp(propName: string, props: PropDescBase[]): PropDescBase {
                return this.findInArr(props, 'propertyName', propName);
            }

            // Finds an event descriptor by the event name in the specified array.
            public static findEvent(eventName: string, events: EventDescBase[]): EventDescBase {
                return this.findInArr(events, 'eventName', eventName);
            }

            // Finds a complex property descriptor by the property name in the specified array.
            public static findComplexProp(propName: string, props: ComplexPropDescBase[]): ComplexPropDescBase {
                return this.findInArr(props, 'propertyName', propName);
            }

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
            public static getMetaData(metaDataId: any): MetaDataBase {
                switch (metaDataId) {

                    // wijmo.Control *************************************************************
                    case wjcCore.Control:
                        return new MetaDataBase(
                            [
                                this.CreateProp('isDisabled', PropertyType.Boolean),
                            ],
                            [
                                this.CreateEvent('gotFocus'),
                                this.CreateEvent('lostFocus')
                            ]);

                    // wijmo.input *************************************************************
                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).DropDown:
                        return this.getMetaData(wjcCore.Control).add(
                            [
                                this.CreateProp('isDroppedDown', PropertyType.Boolean, 'isDroppedDownChanged'),
                                this.CreateProp('showDropDownButton', PropertyType.Boolean),
                                this.CreateProp('autoExpandSelection', PropertyType.Boolean),
                                this.CreateProp('placeholder', PropertyType.String),
                                this.CreateProp('dropDownCssClass', PropertyType.String),
                                this.CreateProp('isAnimated', PropertyType.Boolean),
                                this.CreateProp('isReadOnly', PropertyType.Boolean),
                                this.CreateProp('isRequired', PropertyType.Boolean),
                                this.CreateProp('text', PropertyType.String, 'textChanged', null, true, 1000) // textChanged
                            ],
                            [
                                this.CreateEvent('isDroppedDownChanging'),
                                this.CreateEvent('isDroppedDownChanged', true),
                                this.CreateEvent('textChanged', true)
                            ]);

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).ComboBox:
                        return this.getMetaData((tryGetModuleWijmoInput()).DropDown).add(
                            [
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
                            ],
                            [
                                this.CreateEvent('formatItem'),
                                this.CreateEvent('selectedIndexChanged', true)
                            ])
                            .addOptions({ ngModelProperty: 'selectedValue' });

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).AutoComplete:
                        return this.getMetaData((tryGetModuleWijmoInput()).ComboBox).add(
                            [
                                this.CreateProp('delay', PropertyType.Number),
                                this.CreateProp('maxItems', PropertyType.Number),
                                this.CreateProp('minLength', PropertyType.Number),
                                this.CreateProp('cssMatch', PropertyType.String),
                                this.CreateProp('itemsSourceFunction', PropertyType.Function),
                                this.CreateProp('searchMemberPath', PropertyType.String)
                            ]);

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).Calendar:
                        return this.getMetaData(wjcCore.Control).add(
                            [
                                this.CreateProp('monthView', PropertyType.Boolean),
                                this.CreateProp('showHeader', PropertyType.Boolean),
                                this.CreateProp('itemFormatter', PropertyType.Function),
                                this.CreateProp('itemValidator', PropertyType.Function),
                                this.CreateProp('firstDayOfWeek', PropertyType.Number),
                                this.CreateProp('max', PropertyType.Date),
                                this.CreateProp('min', PropertyType.Date),
                                this.CreateProp('selectionMode', PropertyType.Enum, '', (tryGetModuleWijmoInput()).DateSelectionMode),
                                this.CreateProp('isReadOnly', PropertyType.Boolean),
                                this.CreateProp('value', PropertyType.Date, 'valueChanged'),
                                // displayMonth should go after 'value'!
                                this.CreateProp('displayMonth', PropertyType.Date, 'displayMonthChanged'),
                            ],
                            [
                                this.CreateEvent('valueChanged', true),
                                this.CreateEvent('displayMonthChanged', true),
                                this.CreateEvent('formatItem', false)
                            ])
                            .addOptions({ ngModelProperty: 'value' });

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).ColorPicker:
                        return this.getMetaData(wjcCore.Control).add(
                            [
                                this.CreateProp('showAlphaChannel', PropertyType.Boolean),
                                this.CreateProp('showColorString', PropertyType.Boolean),
                                this.CreateProp('palette', PropertyType.Any),
                                this.CreateProp('value', PropertyType.String, 'valueChanged')
                            ],
                            [
                                this.CreateEvent('valueChanged', true)
                            ])
                            .addOptions({ ngModelProperty: 'value' });

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).ListBox:
                        return this.getMetaData(wjcCore.Control).add(
                            [
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
                            ],
                            [
                                this.CreateEvent('formatItem', false),
                                this.CreateEvent('itemsChanged', true),
                                //AlexI: isPropChanged must be true, in order to run a digest and update bound expressions
                                this.CreateEvent('itemChecked', true),
                                this.CreateEvent('selectedIndexChanged', true),
                                this.CreateEvent('checkedItemsChanged', true),
                            ])
                            .addOptions({ ngModelProperty: 'selectedValue' });

                    case 'ItemTemplate':
                        return new MetaDataBase(
                            [], [], [], undefined, undefined, undefined, 'owner');

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).Menu:
                        return this.getMetaData((tryGetModuleWijmoInput()).ComboBox).add(
                            [
                                this.CreateProp('header', PropertyType.String),
                                this.CreateProp('commandParameterPath', PropertyType.String),
                                this.CreateProp('commandPath', PropertyType.String),
                                this.CreateProp('isButton', PropertyType.Boolean),
                                //this.CreateProp('value', PropertyType.Any, 'selectedIndexChanged', null, false, 1000)
                                this.CreateProp('value', PropertyType.Any, 'itemClicked', null, false, 1000)
                            ],
                            [
                                this.CreateEvent('itemClicked')
                            ]);

                    case 'MenuItem':
                        return new MetaDataBase(
                            [
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

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).InputDate:
                        return this.getMetaData((tryGetModuleWijmoInput()).DropDown).add(
                            [
                                this.CreateProp('selectionMode', PropertyType.Enum, '', (tryGetModuleWijmoInput()).DateSelectionMode),
                                this.CreateProp('format', PropertyType.String),
                                this.CreateProp('mask', PropertyType.String),
                                this.CreateProp('max', PropertyType.Date),
                                this.CreateProp('min', PropertyType.Date),
                                this.CreateProp('inputType', PropertyType.String),
                                this.CreateProp('value', PropertyType.Date, 'valueChanged', null, true, 1000),
                                this.CreateProp('itemValidator', PropertyType.Function),
                                this.CreateProp('itemFormatter', PropertyType.Function)
                            ],
                            [
                                this.CreateEvent('valueChanged', true)
                            ])
                            .addOptions({ ngModelProperty: 'value' });

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).InputDateTime:
                        return this.getMetaData((tryGetModuleWijmoInput()).InputDate).add(
                            [
                                this.CreateProp('timeMax', PropertyType.Date),
                                this.CreateProp('timeMin', PropertyType.Date),
                                this.CreateProp('timeStep', PropertyType.Number),
                                this.CreateProp('timeFormat', PropertyType.String),
                            ])
                            .addOptions({ ngModelProperty: 'value' });

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).InputNumber:
                        return this.getMetaData(wjcCore.Control).add(
                            [
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
                            ],
                            [
                                this.CreateEvent('valueChanged', true),
                                this.CreateEvent('textChanged', true)
                            ])
                            .addOptions({ ngModelProperty: 'value' });

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).InputMask:
                        return this.getMetaData(wjcCore.Control).add(
                            [
                                this.CreateProp('mask', PropertyType.String),
                                this.CreateProp('isRequired', PropertyType.Boolean),
                                this.CreateProp('promptChar', PropertyType.String),
                                this.CreateProp('placeholder', PropertyType.String),
                                this.CreateProp('rawValue', PropertyType.String, 'valueChanged'),
                                this.CreateProp('value', PropertyType.String, 'valueChanged')
                            ],
                            [
                                this.CreateEvent('valueChanged', true),
                            ])
                            .addOptions({ ngModelProperty: 'value' });

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).InputTime:
                        return this.getMetaData((tryGetModuleWijmoInput()).ComboBox).add(
                            [
                                this.CreateProp('max', PropertyType.Date),
                                this.CreateProp('min', PropertyType.Date),
                                this.CreateProp('step', PropertyType.Number),
                                this.CreateProp('format', PropertyType.String),
                                this.CreateProp('mask', PropertyType.String),
                                this.CreateProp('inputType', PropertyType.String),
                                this.CreateProp('value', PropertyType.Date, 'valueChanged', null, true, 1000),
                            ],
                            [
                                this.CreateEvent('valueChanged', true)
                            ])
                            .addOptions({ ngModelProperty: 'value' });

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).InputColor:
                        return this.getMetaData((tryGetModuleWijmoInput()).DropDown).add(
                            [
                                this.CreateProp('showAlphaChannel', PropertyType.Boolean),
                                this.CreateProp('value', PropertyType.String, 'valueChanged')
                            ],
                            [
                                this.CreateEvent('valueChanged', true)
                            ])
                            .addOptions({ ngModelProperty: 'value' });

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).Popup:
                        return this.getMetaData(wjcCore.Control).add(
                            [
                                this.CreateProp('owner', PropertyType.String),
                                this.CreateProp('showTrigger', PropertyType.Enum, '', (tryGetModuleWijmoInput()).PopupTrigger),
                                this.CreateProp('hideTrigger', PropertyType.Enum, '', (tryGetModuleWijmoInput()).PopupTrigger),
                                this.CreateProp('fadeIn', PropertyType.Boolean),
                                this.CreateProp('fadeOut', PropertyType.Boolean),
                                this.CreateProp('dialogResultEnter', PropertyType.String),
                                this.CreateProp('modal', PropertyType.Boolean),
                            ],
                            [
                                this.CreateEvent('showing'),
                                this.CreateEvent('shown'),
                                this.CreateEvent('hiding'),
                                this.CreateEvent('hidden'),
                            ]);

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).MultiSelect:
                        return this.getMetaData((tryGetModuleWijmoInput()).ComboBox).add(
                            [
                                this.CreateProp('checkedMemberPath', PropertyType.String),
                                this.CreateProp('maxHeaderItems', PropertyType.Number),
                                this.CreateProp('headerFormat', PropertyType.String),
                                this.CreateProp('headerFormatter', PropertyType.Function),
                                // initialized after itemsSource but before selectedXXX
                                this.CreateProp('checkedItems', PropertyType.Any, 'checkedItemsChanged', BindingMode.TwoWay, true, 950),
                            ],
                            [
                                this.CreateEvent('checkedItemsChanged', true)
                            ])
                            .addOptions({ ngModelProperty: 'checkedItems' });

                    case 'CollectionViewNavigator':
                        return new MetaDataBase(
                            [
                                this.CreateProp('cv', PropertyType.Any)
                            ]);

                    case 'CollectionViewPager':
                        return new MetaDataBase(
                            [
                                this.CreateProp('cv', PropertyType.Any)
                            ]);

                    case (tryGetModuleWijmoInput()) && (tryGetModuleWijmoInput()).MultiAutoComplete:
                        return this.getMetaData((tryGetModuleWijmoInput()).AutoComplete).add(
                            [
                                this.CreateProp('maxSelectedItems', PropertyType.Number),
                                this.CreateProp('selectedMemberPath', PropertyType.String,'', null, true, 950),
                                this.CreateProp('selectedItems', PropertyType.Any, 'selectedItemsChanged'),
                            ],
                            [
                                this.CreateEvent('selectedItemsChanged', true)
                            ])
                            .addOptions({ ngModelProperty: 'selectedItems' });


                    // wijmo.grid *************************************************************
                    case (tryGetModuleWijmoGrid()) && (tryGetModuleWijmoGrid()).FlexGrid:
                        return this.getMetaData(wjcCore.Control).add(
                            [
                                this.CreateProp('newRowAtTop', PropertyType.Boolean),
                                this.CreateProp('allowAddNew', PropertyType.Boolean),
                                this.CreateProp('allowDelete', PropertyType.Boolean),
                                this.CreateProp('allowDragging', PropertyType.Enum, '', (tryGetModuleWijmoGrid()).AllowDragging),
                                this.CreateProp('allowMerging', PropertyType.Enum, '', (tryGetModuleWijmoGrid()).AllowMerging),
                                this.CreateProp('allowResizing', PropertyType.Enum, '', (tryGetModuleWijmoGrid()).AllowResizing),
                                this.CreateProp('allowSorting', PropertyType.Boolean),
                                this.CreateProp('autoSizeMode', PropertyType.Enum, '', (tryGetModuleWijmoGrid()).AutoSizeMode),
                                this.CreateProp('autoGenerateColumns', PropertyType.Boolean),
                                this.CreateProp('childItemsPath', PropertyType.Any),
                                this.CreateProp('groupHeaderFormat', PropertyType.String),
                                this.CreateProp('headersVisibility', PropertyType.Enum, '', (tryGetModuleWijmoGrid()).HeadersVisibility),
                                this.CreateProp('showSelectedHeaders', PropertyType.Enum, '', (tryGetModuleWijmoGrid()).HeadersVisibility),
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
                                this.CreateProp('selectionMode', PropertyType.Enum, '', (tryGetModuleWijmoGrid()).SelectionMode),
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
                            ],
                            [
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
                                this.CreateEvent('scrollPositionChanged', false), // AlexI: TBD: true freezes scrolling with mouse wheel
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

                    case (tryGetModuleWijmoGrid()) && (tryGetModuleWijmoGrid()).Column:
                        return new MetaDataBase(
                            [
                                this.CreateProp('name', PropertyType.String),
                                this.CreateProp('dataMap', PropertyType.Any), //Angular converts this to 'map'
                                this.CreateProp('dataType', PropertyType.Enum, '', wjcCore.DataType),
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
                                this.CreateProp('aggregate', PropertyType.Enum, '', wjcCore.Aggregate),
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
                            ],
                            [], [], 'columns', true);

                    case 'FlexGridCellTemplate':
                        return new MetaDataBase(
                            [
                                this.CreateProp('cellType', PropertyType.String, '', null, false),
                                this.CreateProp('cellOverflow', PropertyType.String, ''),
                                //this.CreateProp('editorAutoFocus', PropertyType.Boolean),
                            ],
                            [], [], undefined, undefined, undefined, 'owner');

                    case (tryGetModuleWijmoGrid()) && (tryGetModuleWijmoGridFilter()) && (tryGetModuleWijmoGridFilter()).FlexGridFilter:
                        return new MetaDataBase(
                            [
                                this.CreateProp('showFilterIcons', PropertyType.Boolean),
                                this.CreateProp('showSortButtons', PropertyType.Boolean),
                                this.CreateProp('defaultFilterType', PropertyType.Enum, '', (tryGetModuleWijmoGridFilter()).FilterType),
                                this.CreateProp('filterColumns', PropertyType.Any),
                            ],
                            [
                                this.CreateEvent('filterChanging'),
                                this.CreateEvent('filterChanged'),
                                this.CreateEvent('filterApplied')
                            ],
                            [], undefined, undefined, undefined, '');

                    case (tryGetModuleWijmoGrid()) && (tryGetModuleWijmoGridGrouppanel()) && (tryGetModuleWijmoGridGrouppanel()).GroupPanel:
                        return this.getMetaData(wjcCore.Control).add(
                            [
                                this.CreateProp('hideGroupedColumns', PropertyType.Boolean),
                                this.CreateProp('maxGroups', PropertyType.Number),
                                this.CreateProp('placeholder', PropertyType.String),
                                this.CreateProp('grid', PropertyType.Any),
                            ]);

                    case (tryGetModuleWijmoGrid()) && (tryGetModuleWijmoGridDetail()) && (tryGetModuleWijmoGridDetail()).FlexGridDetailProvider:
                        return new MetaDataBase(
                            [
                                this.CreateProp('maxHeight', PropertyType.Number),
                                this.CreateProp('detailVisibilityMode', PropertyType.Enum, '',
                                    (tryGetModuleWijmoGridDetail()).DetailVisibilityMode),
                                this.CreateProp('rowHasDetail', PropertyType.Function),
                                this.CreateProp('isAnimated', PropertyType.Boolean),
                            ],
                            [], [], undefined, undefined, undefined, '');

                    case (tryGetModuleWijmoGrid()) && (tryGetModuleWijmoGridSheet()) && (tryGetModuleWijmoGridSheet()).FlexSheet:
                        return this.getMetaData((tryGetModuleWijmoGrid()).FlexGrid).add(
                            [
                                this.CreateProp('isTabHolderVisible', PropertyType.Boolean),
                                this.CreateProp('selectedSheetIndex', PropertyType.Number, 'selectedSheetChanged'),
                            ],
                            [
                                this.CreateEvent('selectedSheetChanged', true),
                                this.CreateEvent('draggingRowColumn'),
                                this.CreateEvent('droppingRowColumn'),
                                this.CreateEvent('loaded'),
                                this.CreateEvent('unknownFunction'),
                                this.CreateEvent('sheetCleared')
                            ]);

                    case (tryGetModuleWijmoGrid()) && (tryGetModuleWijmoGridSheet()) && (tryGetModuleWijmoGridSheet()).Sheet:
                        return new MetaDataBase(
                            [
                                this.CreateProp('name', PropertyType.String),
                                this.CreateProp('itemsSource', PropertyType.Any),
                                this.CreateProp('visible', PropertyType.Boolean),
                                this.CreateProp('rowCount', PropertyType.Number, '', null, false),
                                this.CreateProp('columnCount', PropertyType.Number, '', null, false)
                            ],
                            [
                                this.CreateEvent('nameChanged'),
                            ])
                            .addOptions({ parentReferenceProperty: '' });

                    case (tryGetModuleWijmoGrid()) && (tryGetModuleWijmoGridMultirow()) && (tryGetModuleWijmoGridMultirow()).MultiRow:
                        return this.getMetaData((tryGetModuleWijmoGrid()).FlexGrid).add(
                            [
                                this.CreateProp('layoutDefinition', PropertyType.Any),
                                this.CreateProp('centerHeadersVertically', PropertyType.Boolean),
                                this.CreateProp('collapsedHeaders', PropertyType.Boolean),
                                this.CreateProp('showHeaderCollapseButton', PropertyType.Boolean)
                            ]);

                    // Chart *************************************************************
                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).FlexChartBase:
                        return this.getMetaData(wjcCore.Control).add(
                            [
                                this.CreateProp('binding', PropertyType.String),
                                this.CreateProp('footer', PropertyType.String),
                                this.CreateProp('header', PropertyType.String),
                                this.CreateProp('selectionMode', PropertyType.Enum, '', (tryGetModuleWijmoChart()).SelectionMode),
                                this.CreateProp('palette', PropertyType.Any),
                                this.CreateProp('plotMargin', PropertyType.Any),
                                this.CreateProp('footerStyle', PropertyType.Any),
                                this.CreateProp('headerStyle', PropertyType.Any),
                                this.CreateProp('tooltipContent', PropertyType.String, '', null, false),
                                this.CreateProp('itemsSource', PropertyType.Any)
                            ],
                            [
                                this.CreateEvent('rendering'),
                                this.CreateEvent('rendered'),
                                this.CreateEvent('selectionChanged', true),
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).FlexChartCore:
                        return this.getMetaData((tryGetModuleWijmoChart()).FlexChartBase).add(
                            [
                                this.CreateProp('bindingX', PropertyType.String),
                                // this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.ChartType),
                                this.CreateProp('interpolateNulls', PropertyType.Boolean),
                                this.CreateProp('legendToggle', PropertyType.Boolean),
                                this.CreateProp('symbolSize', PropertyType.Number),
                                this.CreateProp('options', PropertyType.Any),
                                this.CreateProp('selection', PropertyType.Any, 'selectionChanged'),
                                this.CreateProp('itemFormatter', PropertyType.Function),
                                this.CreateProp('labelContent', PropertyType.String, '', null, false),
                            ],
                            [
                                this.CreateEvent('seriesVisibilityChanged'),
                            ],
                            [
                                this.CreateComplexProp('axisX', false, false),
                                this.CreateComplexProp('axisY', false, false),
                                this.CreateComplexProp('axes', true),
                                this.CreateComplexProp('plotAreas', true)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).FlexChart:
                        return this.getMetaData((tryGetModuleWijmoChart()).FlexChartCore).add(
                            [
                                this.CreateProp('chartType', PropertyType.Enum, '', (tryGetModuleWijmoChart()).ChartType),
                                this.CreateProp('rotated', PropertyType.Boolean),
                                this.CreateProp('stacking', PropertyType.Enum, '', (tryGetModuleWijmoChart()).Stacking),
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).FlexPie:
                        return this.getMetaData((tryGetModuleWijmoChart()).FlexChartBase).add(
                            [
                                this.CreateProp('bindingName', PropertyType.String),
                                this.CreateProp('innerRadius', PropertyType.Number),
                                this.CreateProp('isAnimated', PropertyType.Boolean),
                                this.CreateProp('offset', PropertyType.Number),
                                this.CreateProp('reversed', PropertyType.Boolean),
                                this.CreateProp('startAngle', PropertyType.Number),
                                this.CreateProp('selectedItemPosition', PropertyType.Enum, '', (tryGetModuleWijmoChart()).Position),
                                this.CreateProp('selectedItemOffset', PropertyType.Number),
                                this.CreateProp('itemFormatter', PropertyType.Function),
                                this.CreateProp('labelContent', PropertyType.String, '', null, false),
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).FlexPie && (tryGetModuleWijmoChartHierarchical()) && (tryGetModuleWijmoChartHierarchical()).Sunburst:
                        return this.getMetaData((tryGetModuleWijmoChart()).FlexChartBase).add(
                            [
                                this.CreateProp('bindingName', PropertyType.Any),
                                this.CreateProp('innerRadius', PropertyType.Number),
                                this.CreateProp('isAnimated', PropertyType.Boolean),
                                this.CreateProp('offset', PropertyType.Number),
                                this.CreateProp('reversed', PropertyType.Boolean),
                                this.CreateProp('startAngle', PropertyType.Number),
                                this.CreateProp('selectedItemPosition', PropertyType.Enum, '', (tryGetModuleWijmoChart()).Position),
                                this.CreateProp('selectedItemOffset', PropertyType.Number),
                                this.CreateProp('itemFormatter', PropertyType.Function),
                                this.CreateProp('labelContent', PropertyType.String, '', null, false),
                                this.CreateProp('childItemsPath', PropertyType.Any)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartHierarchical()) && (tryGetModuleWijmoChartHierarchical()).TreeMap:
                        return this.getMetaData((tryGetModuleWijmoChart()).FlexChartBase).add(
                            [
                                this.CreateProp('bindingName', PropertyType.Any),
                                this.CreateProp('maxDepth', PropertyType.Number),
                                this.CreateProp('type', PropertyType.Enum, '', (tryGetModuleWijmoChartHierarchical()).TreeMapType),
                                this.CreateProp('labelContent', PropertyType.String, '', null, false),
                                this.CreateProp('childItemsPath', PropertyType.Any)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).Axis:
                        return new MetaDataBase(
                            [
                                this.CreateProp('axisLine', PropertyType.Boolean),
                                this.CreateProp('format', PropertyType.String),
                                this.CreateProp('labels', PropertyType.Boolean),
                                this.CreateProp('majorGrid', PropertyType.Boolean),
                                this.CreateProp('majorTickMarks', PropertyType.Enum, '', (tryGetModuleWijmoChart()).TickMark),
                                this.CreateProp('majorUnit', PropertyType.Number),
                                this.CreateProp('max', PropertyType.Number),
                                this.CreateProp('min', PropertyType.Number),
                                this.CreateProp('position', PropertyType.Enum, '', (tryGetModuleWijmoChart()).Position),
                                this.CreateProp('reversed', PropertyType.Boolean),
                                this.CreateProp('title', PropertyType.String),
                                this.CreateProp('labelAngle', PropertyType.Number),
                                this.CreateProp('minorGrid', PropertyType.Boolean),
                                this.CreateProp('minorTickMarks', PropertyType.Enum, '', (tryGetModuleWijmoChart()).TickMark),
                                this.CreateProp('minorUnit', PropertyType.Number),
                                this.CreateProp('origin', PropertyType.Number),
                                this.CreateProp('logBase', PropertyType.Number),
                                this.CreateProp('plotArea', PropertyType.Any),
                                this.CreateProp('labelAlign', PropertyType.String),
                                this.CreateProp('name', PropertyType.String),
                                this.CreateProp('overlappingLabels', PropertyType.Enum, '', (tryGetModuleWijmoChart()).OverlappingLabels),
                                this.CreateProp('labelPadding', PropertyType.Number),
                                this.CreateProp('itemFormatter', PropertyType.Function),
                                this.CreateProp('itemsSource', PropertyType.Any),
                                this.CreateProp('binding', PropertyType.String),
                            ],
                            [
                                this.CreateEvent('rangeChanged'),
                            ], [], 'axes', true); //use wj-property attribute on directive to define axisX or axisY

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).Legend:
                        return new MetaDataBase(
                            [
                                this.CreateProp('position', PropertyType.Enum, '', (tryGetModuleWijmoChart()).Position)
                            ],
                            [], [], 'legend', false, false, '');

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).DataLabelBase:
                        return new MetaDataBase(
                            [
                                this.CreateProp('content', PropertyType.Any, ''),
                                this.CreateProp('border', PropertyType.Boolean),
                            ],
                            [], [], 'dataLabel', false, false);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).DataLabel:
                        return this.getMetaData((tryGetModuleWijmoChart()).DataLabelBase).add(
                            [
                                this.CreateProp('position', PropertyType.Enum, '', (tryGetModuleWijmoChart()).LabelPosition),
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).PieDataLabel:
                        return this.getMetaData((tryGetModuleWijmoChart()).DataLabelBase).add(
                            [
                                this.CreateProp('position', PropertyType.Enum, '', (tryGetModuleWijmoChart()).PieLabelPosition),
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).SeriesBase:
                        return new MetaDataBase(
                            [
                                this.CreateProp('axisX', PropertyType.Any),
                                this.CreateProp('axisY', PropertyType.Any),
                                this.CreateProp('binding', PropertyType.String),
                                this.CreateProp('bindingX', PropertyType.String),
                                this.CreateProp('cssClass', PropertyType.String),
                                this.CreateProp('name', PropertyType.String),
                                this.CreateProp('style', PropertyType.Any),
                                this.CreateProp('altStyle', PropertyType.Any),
                                this.CreateProp('symbolMarker', PropertyType.Enum, '', (tryGetModuleWijmoChart()).Marker),
                                this.CreateProp('symbolSize', PropertyType.Number),
                                this.CreateProp('symbolStyle', PropertyType.Any),
                                this.CreateProp('visibility', PropertyType.Enum, 'chart.seriesVisibilityChanged', (tryGetModuleWijmoChart()).SeriesVisibility),
                                this.CreateProp('itemsSource', PropertyType.Any),
                            ],
                            [
                                this.CreateEvent('rendering'),
                                this.CreateEvent('rendered')
                            ],
                            [
                                this.CreateComplexProp('axisX', false, true),
                                this.CreateComplexProp('axisY', false, true),
                            ],
                            'series', true);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).Series:
                        return this.getMetaData((tryGetModuleWijmoChart()).SeriesBase).add(
                            [
                                this.CreateProp('chartType', PropertyType.Enum, '', (tryGetModuleWijmoChart()).ChartType)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).LineMarker:
                        return new MetaDataBase(
                            [
                                this.CreateProp('isVisible', PropertyType.Boolean),
                                this.CreateProp('seriesIndex', PropertyType.Number),
                                this.CreateProp('horizontalPosition', PropertyType.Number),
                                this.CreateProp('content', PropertyType.Function),
                                this.CreateProp('verticalPosition', PropertyType.Number),
                                this.CreateProp('alignment', PropertyType.Enum, '', (tryGetModuleWijmoChart()).LineMarkerAlignment),
                                this.CreateProp('lines', PropertyType.Enum, '', (tryGetModuleWijmoChart()).LineMarkerLines),
                                this.CreateProp('interaction', PropertyType.Enum, '', (tryGetModuleWijmoChart()).LineMarkerInteraction),
                                this.CreateProp('dragLines', PropertyType.Boolean),
                                this.CreateProp('dragThreshold', PropertyType.Number),
                                this.CreateProp('dragContent', PropertyType.Boolean),
                            ],
                            [
                                this.CreateEvent('positionChanged'),
                            ],
                            [],
                            undefined, undefined, undefined, '');

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).DataPoint:
                        return new MetaDataBase([
                            this.CreateProp('x', PropertyType.AnyPrimitive),
                            this.CreateProp('y', PropertyType.AnyPrimitive)
                        ],
                            [], [], '');

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartAnnotation()) && (tryGetModuleWijmoChartAnnotation()).AnnotationLayer:
                        return new MetaDataBase([], [], [], undefined, undefined, undefined, '');

                    case 'FlexChartAnnotation':
                        return new MetaDataBase([
                            this.CreateProp('type', PropertyType.String, '', null, false),
                            this.CreateProp('attachment', PropertyType.Enum, '', (tryGetModuleWijmoChartAnnotation()).AnnotationAttachment),
                            this.CreateProp('position', PropertyType.Enum, '', (tryGetModuleWijmoChartAnnotation()).AnnotationPosition),
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
                        ], [],
                            [
                                this.CreateComplexProp('point', false, true),
                                this.CreateComplexProp('start', false, true),
                                this.CreateComplexProp('end', false, true),
                                this.CreateComplexProp('points', true),
                            ], 'items', true);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartInteraction()) && (tryGetModuleWijmoChartInteraction()).RangeSelector:
                        return new MetaDataBase(
                            [
                                this.CreateProp('isVisible', PropertyType.Boolean),
                                this.CreateProp('min', PropertyType.Number),
                                this.CreateProp('max', PropertyType.Number),
                                this.CreateProp('orientation', PropertyType.Enum, '', (tryGetModuleWijmoChartInteraction()).Orientation),
                                this.CreateProp('seamless', PropertyType.Boolean),
                                this.CreateProp('minScale', PropertyType.Number),
                                this.CreateProp('maxScale', PropertyType.Number),
                            ],
                            [
                                this.CreateEvent('rangeChanged'),
                            ],
                            [],
                            undefined, undefined, undefined, '');

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartInteraction()) && (tryGetModuleWijmoChartInteraction()).ChartGestures:
                        return new MetaDataBase(
                            [
                                this.CreateProp('mouseAction', PropertyType.Enum, '', (tryGetModuleWijmoChartInteraction()).MouseAction),
                                this.CreateProp('interactiveAxes', PropertyType.Enum, '', (tryGetModuleWijmoChartInteraction()).InteractiveAxes),
                                this.CreateProp('enable', PropertyType.Boolean),
                                this.CreateProp('scaleX', PropertyType.Number),
                                this.CreateProp('scaleY', PropertyType.Number),
                                this.CreateProp('posX', PropertyType.Number),
                                this.CreateProp('posY', PropertyType.Number),
                            ],
                            [],
                            [],
                            undefined, undefined, undefined, '');

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartAnimation()) && (tryGetModuleWijmoChartAnimation()).ChartAnimation:
                        return new MetaDataBase(
                            [
                                this.CreateProp('animationMode', PropertyType.Enum, '', (tryGetModuleWijmoChartAnimation()).AnimationMode),
                                this.CreateProp('easing', PropertyType.Enum, '', (tryGetModuleWijmoChartAnimation()).Easing),
                                this.CreateProp('duration', PropertyType.Number),
                                this.CreateProp('axisAnimation', PropertyType.Boolean)
                            ], [], [], undefined, undefined, undefined, '');

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinance()).FinancialChart:
                        return this.getMetaData((tryGetModuleWijmoChart()).FlexChartCore).add(
                            [
                                this.CreateProp('chartType', PropertyType.Enum, '', (tryGetModuleWijmoChartFinance()).FinancialChartType),
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinance()).FinancialSeries:
                        return this.getMetaData((tryGetModuleWijmoChart()).SeriesBase).add(
                            [
                                this.CreateProp('chartType', PropertyType.Enum, '', (tryGetModuleWijmoChartFinance()).FinancialChartType)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartRadar()) && (tryGetModuleWijmoChartRadar()).FlexRadar:
                        return this.getMetaData((tryGetModuleWijmoChart()).FlexChartCore).add(
                            [
                                this.CreateProp('chartType', PropertyType.Enum, '', (tryGetModuleWijmoChartRadar()).RadarChartType),
                                this.CreateProp('startAngle', PropertyType.Number),
                                this.CreateProp('totalAngle', PropertyType.Number),
                                this.CreateProp('reversed', PropertyType.Boolean),
                                this.CreateProp('stacking', PropertyType.Enum, '', (tryGetModuleWijmoChart()).Stacking)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartRadar()) && (tryGetModuleWijmoChartRadar()).FlexRadarSeries:
                        return this.getMetaData((tryGetModuleWijmoChart()).SeriesBase).add(
                            [
                                this.CreateProp('chartType', PropertyType.Enum, '', (tryGetModuleWijmoChartRadar()).RadarChartType)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartRadar()) && (tryGetModuleWijmoChartRadar()).FlexRadarAxis:
                        return this.getMetaData((tryGetModuleWijmoChart()).Axis);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartAnalytics()) && (tryGetModuleWijmoChartAnalytics()).TrendLineBase:
                        return this.getMetaData((tryGetModuleWijmoChart()).SeriesBase).add(
                            [
                                this.CreateProp('sampleCount', PropertyType.Number)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartAnalytics()) && (tryGetModuleWijmoChartAnalytics()).TrendLine:
                        return this.getMetaData((tryGetModuleWijmoChartAnalytics()).TrendLineBase).add(
                            [
                                this.CreateProp('order', PropertyType.Number),
                                this.CreateProp('fitType', PropertyType.Enum, '', (tryGetModuleWijmoChartAnalytics()).TrendLineFitType)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartAnalytics()) && (tryGetModuleWijmoChartAnalytics()).MovingAverage:
                        return this.getMetaData((tryGetModuleWijmoChartAnalytics()).TrendLineBase).add(
                            [
                                this.CreateProp('period', PropertyType.Number),
                                this.CreateProp('type', PropertyType.Enum, '', (tryGetModuleWijmoChartAnalytics()).MovingAverageType)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartAnalytics()) && (tryGetModuleWijmoChartAnalytics()).FunctionSeries:
                        return this.getMetaData((tryGetModuleWijmoChartAnalytics()).TrendLineBase).add(
                            [
                                this.CreateProp('min', PropertyType.Number),
                                this.CreateProp('max', PropertyType.Number),
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartAnalytics()) && (tryGetModuleWijmoChartAnalytics()).YFunctionSeries:
                        return this.getMetaData((tryGetModuleWijmoChartAnalytics()).FunctionSeries).add(
                            [
                                this.CreateProp('func', PropertyType.Function),
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartAnalytics()) && (tryGetModuleWijmoChartAnalytics()).ParametricFunctionSeries:
                        return this.getMetaData((tryGetModuleWijmoChartAnalytics()).FunctionSeries).add(
                            [
                                //Add func property for xFunc property in angular1.
                                //Attribute names beginning with "x-" is reserved for user agent use, 'x-func' is parsed to 'func'
                                //Set func value to xFunc property in WjFlexChartParametricFunctionSeries._initProps function in wijmo.angular.chart.ts file.
                                this.CreateProp('func', PropertyType.Function),
                                this.CreateProp('xFunc', PropertyType.Function),
                                this.CreateProp('yFunc', PropertyType.Function),
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartAnalytics()) && (tryGetModuleWijmoChartAnalytics()).Waterfall:
                        return this.getMetaData((tryGetModuleWijmoChart()).SeriesBase).add(
                            [
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

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartAnalytics()) && (tryGetModuleWijmoChartAnalytics()).BoxWhisker:
                        return this.getMetaData((tryGetModuleWijmoChart()).SeriesBase).add(
                            [
                                this.CreateProp('quartileCalculation', PropertyType.Enum, '', (tryGetModuleWijmoChartAnalytics()).QuartileCalculation),
                                this.CreateProp('groupWidth', PropertyType.Number),
                                this.CreateProp('gapWidth', PropertyType.Number),
                                this.CreateProp('showMeanLine', PropertyType.Boolean),
                                this.CreateProp('meanLineStyle', PropertyType.Any),
                                this.CreateProp('showMeanMarker', PropertyType.Boolean),
                                this.CreateProp('meanMarkerStyle', PropertyType.Any),
                                this.CreateProp('showInnerPoints', PropertyType.Boolean),
                                this.CreateProp('showOutliers', PropertyType.Boolean)
                            ]);


                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartAnalytics()) && (tryGetModuleWijmoChartAnalytics()).ErrorBar:
                        return this.getMetaData((tryGetModuleWijmoChart()).Series).add(
                            [
                                this.CreateProp('errorBarStyle', PropertyType.Any),
                                this.CreateProp('value', PropertyType.Any),
                                this.CreateProp('errorAmount', PropertyType.Enum, '', (tryGetModuleWijmoChartAnalytics()).ErrorAmount),
                                this.CreateProp('endStyle', PropertyType.Enum, '', (tryGetModuleWijmoChartAnalytics()).ErrorBarEndStyle),
                                this.CreateProp('direction', PropertyType.Enum, '', (tryGetModuleWijmoChartAnalytics()).ErrorBarDirection)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChart()).PlotArea:
                        return new MetaDataBase(
                            [
                                this.CreateProp('column', PropertyType.Number),
                                this.CreateProp('height', PropertyType.String),
                                this.CreateProp('name', PropertyType.String),
                                this.CreateProp('row', PropertyType.Number),
                                this.CreateProp('style', PropertyType.Any),
                                this.CreateProp('width', PropertyType.String),
                            ],
                            [],
                            [],
                            'plotAreas', true);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).Fibonacci:
                        return this.getMetaData((tryGetModuleWijmoChart()).SeriesBase).add(
                            [
                                this.CreateProp('high', PropertyType.Number),
                                this.CreateProp('low', PropertyType.Number),
                                this.CreateProp('labelPosition', PropertyType.Enum, '', (tryGetModuleWijmoChart()).LabelPosition),
                                this.CreateProp('levels', PropertyType.Any),
                                this.CreateProp('minX', PropertyType.AnyPrimitive),
                                this.CreateProp('maxX', PropertyType.AnyPrimitive),
                                this.CreateProp('uptrend', PropertyType.Boolean)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).FibonacciTimeZones:
                        return this.getMetaData((tryGetModuleWijmoChart()).SeriesBase).add(
                            [
                                this.CreateProp('startX', PropertyType.Any),
                                this.CreateProp('endX', PropertyType.Any),
                                this.CreateProp('labelPosition', PropertyType.Enum, '', (tryGetModuleWijmoChart()).LabelPosition),
                                this.CreateProp('levels', PropertyType.Any)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).FibonacciArcs:
                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).FibonacciFans:
                        return this.getMetaData((tryGetModuleWijmoChart()).SeriesBase).add(
                            [
                                this.CreateProp('start', PropertyType.Any),
                                this.CreateProp('end', PropertyType.Any),
                                this.CreateProp('labelPosition', PropertyType.Enum, '', (tryGetModuleWijmoChart()).LabelPosition),
                                this.CreateProp('levels', PropertyType.Any)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).OverlayIndicatorBase:
                        return this.getMetaData((tryGetModuleWijmoChart()).SeriesBase);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).SingleOverlayIndicatorBase:
                        return this.getMetaData((tryGetModuleWijmoChartFinanceAnalytics()).OverlayIndicatorBase).add(
                            [
                                this.CreateProp('period', PropertyType.Number)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).MacdBase:
                        return this.getMetaData((tryGetModuleWijmoChartFinanceAnalytics()).OverlayIndicatorBase).add(
                            [
                                this.CreateProp('fastPeriod', PropertyType.Number),
                                this.CreateProp('slowPeriod', PropertyType.Number),
                                this.CreateProp('smoothingPeriod', PropertyType.Number)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).Macd:
                        return this.getMetaData((tryGetModuleWijmoChartFinanceAnalytics()).MacdBase).add(
                            [
                                this.CreateProp('styles', PropertyType.Any)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).MacdHistogram:
                        return this.getMetaData((tryGetModuleWijmoChartFinanceAnalytics()).MacdBase);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).ATR:
                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).RSI:
                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).WilliamsR:
                        return this.getMetaData((tryGetModuleWijmoChartFinanceAnalytics()).SingleOverlayIndicatorBase);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).CCI:
                        return this.getMetaData((tryGetModuleWijmoChartFinanceAnalytics()).SingleOverlayIndicatorBase).add(
                            [
                                this.CreateProp('constant', PropertyType.Number)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).Stochastic:
                        return this.getMetaData((tryGetModuleWijmoChartFinanceAnalytics()).OverlayIndicatorBase).add(
                            [
                                this.CreateProp('dPeriod', PropertyType.Number),
                                this.CreateProp('kPeriod', PropertyType.Number),
                                this.CreateProp('smoothingPeriod', PropertyType.Number),
                                this.CreateProp('styles', PropertyType.Any)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).Envelopes:
                        return this.getMetaData((tryGetModuleWijmoChartFinanceAnalytics()).OverlayIndicatorBase).add(
                            [
                                this.CreateProp('period', PropertyType.Number),
                                this.CreateProp('size', PropertyType.Number),
                                this.CreateProp('type', PropertyType.Enum, '', (tryGetModuleWijmoChartFinanceAnalytics()).MovingAverageType)
                            ]);

                    case (tryGetModuleWijmoChart()) && (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinanceAnalytics()) && (tryGetModuleWijmoChartFinanceAnalytics()).BollingerBands:
                        return this.getMetaData((tryGetModuleWijmoChartFinanceAnalytics()).OverlayIndicatorBase).add(
                            [
                                this.CreateProp('period', PropertyType.Number),
                                this.CreateProp('multiplier', PropertyType.Number)
                            ]);

                    // *************************** Gauge *************************************************************
                    //case 'Gauge':
                    case (tryGetModuleWijmoGauge()) && (tryGetModuleWijmoGauge()).Gauge:
                        return this.getMetaData(wjcCore.Control).add(
                            [
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
                                this.CreateProp('showText', PropertyType.Enum, '', (tryGetModuleWijmoGauge()).ShowText),
                                this.CreateProp('showTicks', PropertyType.Boolean),
                                this.CreateProp('showRanges', PropertyType.Boolean),
                                this.CreateProp('thumbSize', PropertyType.Number),
                                this.CreateProp('tickSpacing', PropertyType.Number),
                                this.CreateProp('getText', PropertyType.Function)
                            ],
                            [
                                this.CreateEvent('valueChanged', true)
                            ],
                            [
                                this.CreateComplexProp('ranges', true),
                                this.CreateComplexProp('pointer', false, false),
                                this.CreateComplexProp('face', false, false)
                            ])
                            .addOptions({ ngModelProperty: 'value' });

                    //case 'LinearGauge':
                    case (tryGetModuleWijmoGauge()) && (tryGetModuleWijmoGauge()).LinearGauge:
                        return this.getMetaData((tryGetModuleWijmoGauge()).Gauge).add(
                            [
                                this.CreateProp('direction', PropertyType.Enum, '', (tryGetModuleWijmoGauge()).GaugeDirection)
                            ]);

                    case (tryGetModuleWijmoGauge()) && (tryGetModuleWijmoGauge()).BulletGraph:
                        return this.getMetaData((tryGetModuleWijmoGauge()).LinearGauge).add(
                            [
                                this.CreateProp('target', PropertyType.Number),
                                this.CreateProp('good', PropertyType.Number),
                                this.CreateProp('bad', PropertyType.Number)
                            ]);

                    case (tryGetModuleWijmoGauge()) && (tryGetModuleWijmoGauge()).RadialGauge:
                        return this.getMetaData((tryGetModuleWijmoGauge()).Gauge).add(
                            [
                                this.CreateProp('autoScale', PropertyType.Boolean),
                                this.CreateProp('startAngle', PropertyType.Number),
                                this.CreateProp('sweepAngle', PropertyType.Number)
                            ]);

                    case (tryGetModuleWijmoGauge()) && (tryGetModuleWijmoGauge()).Range:
                        return new MetaDataBase(
                            [
                                this.CreateProp('color', PropertyType.String),
                                this.CreateProp('min', PropertyType.Number),
                                this.CreateProp('max', PropertyType.Number),
                                this.CreateProp('name', PropertyType.String),
                                this.CreateProp('thickness', PropertyType.Number)
                            ],
                            [], [], 'ranges', true);

                    // *************************** Olap *************************************************************
                    case (tryGetModuleWijmoOlap()) && (tryGetModuleWijmoOlap()).PivotGrid:
                        return this.getMetaData((tryGetModuleWijmoGrid()).FlexGrid).add(
                            [
                                this.CreateProp('showDetailOnDoubleClick', PropertyType.Boolean),
                                this.CreateProp('customContextMenu', PropertyType.Boolean),
                                this.CreateProp('collapsibleSubtotals', PropertyType.Boolean),
                                this.CreateProp('centerHeadersVertically', PropertyType.Boolean),
                            ]);

                    case (tryGetModuleWijmoOlap()) && (tryGetModuleWijmoOlap()).PivotChart:
                        return new MetaDataBase(
                            [
                                this.CreateProp('chartType', PropertyType.Enum, '', (tryGetModuleWijmoOlap()).PivotChartType),
                                this.CreateProp('showHierarchicalAxes', PropertyType.Boolean),
                                this.CreateProp('showTotals', PropertyType.Boolean),
                                this.CreateProp('showTitle', PropertyType.Boolean),
                                this.CreateProp('showLegend', PropertyType.Enum, '', (tryGetModuleWijmoOlap()).LegendVisibility),
                                this.CreateProp('legendPosition', PropertyType.Enum, '', (tryGetModuleWijmoChart()).Position),
                                this.CreateProp('stacking', PropertyType.Enum, '', (tryGetModuleWijmoChart()).Stacking),
                                this.CreateProp('maxSeries', PropertyType.Number),
                                this.CreateProp('maxPoints', PropertyType.Number),
                                this.CreateProp('itemsSource', PropertyType.Any),
                            ]);

                    case (tryGetModuleWijmoOlap()) && (tryGetModuleWijmoOlap()).PivotPanel:
                        return new MetaDataBase(
                            [
                                this.CreateProp('autoGenerateFields', PropertyType.Boolean),
                                this.CreateProp('viewDefinition', PropertyType.String),
                                this.CreateProp('engine', PropertyType.Any),
                                this.CreateProp('itemsSource', PropertyType.Any),
                            ],
                            [
                                this.CreateEvent('itemsSourceChanged'),
                                this.CreateEvent('viewDefinitionChanged'),
                                this.CreateEvent('updatingView'),
                                this.CreateEvent('updatedView')
                            ]);

                    case (tryGetModuleWijmoOlap()) && (tryGetModuleWijmoOlap()).PivotField:
                        return new MetaDataBase(
                            [
                                this.CreateProp('binding', PropertyType.String),
                                this.CreateProp('header', PropertyType.String),
                                this.CreateProp('dataType', PropertyType.Enum, '', wjcCore.DataType),
                            ],
                            [], [], '', true, true, '');

                    // *************************** ReportViewer *************************************************************
                    case (tryGetModuleWijmoViewer()) && (tryGetModuleWijmoViewer()).ViewerBase:
                        return new MetaDataBase(
                            [
                                this.CreateProp('serviceUrl', PropertyType.String),
                                this.CreateProp('filePath', PropertyType.String),
                                this.CreateProp('fullScreen', PropertyType.Boolean, 'fullScreenChanged'),
								this.CreateProp('zoomFactor', PropertyType.Number, 'zoomFactorChanged'),
								this.CreateProp('mouseMode', PropertyType.Enum, 'mouseModeChanged', (tryGetModuleWijmoViewer()).MouseMode),
                                this.CreateProp('selectMouseMode', PropertyType.Boolean, 'selectMouseModeChanged'), // deprecated
                                this.CreateProp('viewMode', PropertyType.Enum, 'viewModeChanged', (tryGetModuleWijmoViewer()).ViewMode),
                            ],
                            [
                                this.CreateEvent('pageIndexChanged'),
								this.CreateEvent('viewModeChanged'),
								this.CreateEvent('mouseModeChanged'),
								this.CreateEvent('selectMouseModeChanged'), // deprecated
								this.CreateEvent('fullScreenChanged'),
								this.CreateEvent('zoomFactorChanged', true),
                                this.CreateEvent('queryLoadingData')
                            ]);
                    case (tryGetModuleWijmoViewer()) && (tryGetModuleWijmoViewer()).ReportViewer:
                        return this.getMetaData((tryGetModuleWijmoViewer()).ViewerBase).add(
                            [
                               this.CreateProp('paginated', PropertyType.Boolean),
                               this.CreateProp('reportName', PropertyType.String), 
                            ]);
                    // *************************** PdfViewer *************************************************************
                    case (tryGetModuleWijmoViewer()) && (tryGetModuleWijmoViewer()).PdfViewer:
                        return this.getMetaData((tryGetModuleWijmoViewer()).ViewerBase);
                    // *************************** TreeView *************************************************************
                    case (tryGetModuleWijmoNav()) && (tryGetModuleWijmoNav()).TreeView:
                        return this.getMetaData(wjcCore.Control).add(
                            [
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
                            ],
                            [
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
            }

            // For the specified class reference returns its name as a string, e.g.
            // getClassName(wijmo.input.ComboBox) returns 'ComboBox'.
            public static getClassName(classRef: any): string {
                return (classRef.toString().match(/function (.+?)\(/) || [, ''])[1];
            }

            // Returns a camel case representation of the dash delimited name.
            public static toCamelCase(s) {
                return s.toLowerCase().replace(/-(.)/g, function (match, group1) {
                    return group1.toUpperCase();
                });
            }


            private static findInArr(arr: any[], propName: string, value: any): any {
                for (var i in arr) {
                    if (arr[i][propName] === value) {
                        return arr[i];
                    }
                }
                return null;
            }

        }

        // Describes a scope property: name, type, binding mode.
        // Also defines enum type and custom watcher function extender
        export class PropDescBase {
            private _propertyName: string;
            private _propertyType: PropertyType;
            private _changeEvent: string;
            private _enumType: any;
            //private _bindingMode: BindingMode;
            private _isNativeControlProperty: boolean;
            private _priority: number = 0;

            // Initializes a new instance of a PropDesc
            constructor(propertyName: string, propertyType: PropertyType, /*bindingMode: BindingMode = BindingMode.OneWay*/changeEvent?: string,
                enumType?: any, isNativeControlProperty: boolean = true, priority: number = 0) {
                this._propertyName = propertyName;
                this._propertyType = propertyType;
                //this._bindingMode = bindingMode;
                this._changeEvent = changeEvent;
                this._enumType = enumType;
                this._isNativeControlProperty = isNativeControlProperty;
                this._priority = priority;
            }

            // Gets the property name
            get propertyName(): string {
                return this._propertyName;
            }

            // Gets the property type (number, string, boolean, enum, or any)
            get propertyType(): PropertyType {
                return this._propertyType;
            }

            get changeEvent(): string {
                return this._changeEvent;
            }

            // Gets the property enum type
            get enumType(): any { return this._enumType; }

            // Gets the property binding mode
            get bindingMode(): BindingMode {
                //return this._bindingMode;
                return this.changeEvent ? BindingMode.TwoWay : BindingMode.OneWay;
            }

            // Gets whether the property belongs to the control is just to the directive
            get isNativeControlProperty(): boolean {
                return this._isNativeControlProperty;
            }

            // Gets an initialization priority. Properties with higher priority are assigned to directive's underlying control
            // property later than properties with lower priority. Properties with the same priority are assigned in the order of
            // their index in the _props collection.
            get priority(): number {
                return this._priority;
            }

            // Indicates whether a bound 'controller' property should be updated on this property change (i.e. two-way binding).
            get shouldUpdateSource(): boolean {
                return this.bindingMode === BindingMode.TwoWay && this.propertyType != PropertyType.EventHandler;
            }

            initialize(options: any) {
                wjcCore.copy(this, options);
            }

            // Casts value to the property type
            castValueToType(value: any) {
                if (value == undefined) {
                    return value;
                }

                var type = this.propertyType,
                    pt = PropertyType;
                if (type === pt.AnyPrimitive) {
                    if (!wjcCore.isString(value)) {
                        return value;
                    }
                    if (value === 'true' || value === 'false') {
                        type = pt.Boolean;
                    } else {
                        castVal = +value;
                        if (!isNaN(castVal)) {
                            return castVal;
                        }
                        var castVal = this._parseDate(value);
                        if (!wjcCore.isString(castVal)) {
                            return castVal;
                        }
                        return value;
                    }
                }
                switch (type) {
                    case pt.Number:
                        if (typeof value == 'string') {
                            if (value.indexOf('*') >= 0) { // hack for star width ('*', '2*'...)
                                return value;
                            }
                            if (value.trim() === '') { // binding to an empty html input means null
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
            }

            // Parsing DateTime values from string
            private _parseDate(value) {
                if (value && wjcCore.isString(value)) {

                    // For by-val attributes Angular converts a Date object to a
                    // string wrapped in quotation marks, so we strip them.
                    value = value.replace(/["']/g, '');

                    // parse date/time using RFC 3339 pattern
                    var dt = wjcCore.changeType(value, wjcCore.DataType.Date, 'r');
                    if (wjcCore.isDate(dt)) {
                        return dt;
                    }
                }
                return value;
            }

        }

        // Property types as used in the PropDesc class.
        export enum PropertyType {
            Boolean,
            Number,
            Date,
            String,
            // Allows a value of any primitive type above, that can be parsed from string
            AnyPrimitive,
            Enum, // IMPORTANT: All new simple types must be added before Enum, all complex types after Enum.
            Function,
            EventHandler,
            Any
        }

        // Gets a value that indicates whether the specified type is simple (true) or complex (false).
        export function isSimpleType(type: PropertyType): boolean {
            return type <= PropertyType.Enum;
        }

        export enum BindingMode {
            OneWay,
            TwoWay
        }

        // Describes a scope event
        export class EventDescBase {
            private _eventName: string;
            private _isPropChanged: boolean;

            // Initializes a new instance of an EventDesc
            constructor(eventName: string, isPropChanged?: boolean) {
                this._eventName = eventName;
                this._isPropChanged = isPropChanged;
            }

            // Gets the event name
            get eventName(): string {
                return this._eventName;
            }

            // Gets whether this event is a property change notification
            get isPropChanged(): boolean {
                return this._isPropChanged === true;
            }
        }

        // Describe property info for nested directives.
        export class ComplexPropDescBase {
            public propertyName: string;
            public isArray: boolean = false;
            private _ownsObject: boolean = false;

            constructor(propertyName: string, isArray: boolean, ownsObject: boolean = false) {
                this.propertyName = propertyName;
                this.isArray = isArray;
                this._ownsObject = ownsObject;
            }

            get ownsObject(): boolean {
                return this.isArray || this._ownsObject;
            }
        }

        // Stores a control metadata as arrays of property, event and complex property descriptors.
        export class MetaDataBase {
            private _props: PropDescBase[] = [];
            private _events: EventDescBase[] = [];
            private _complexProps: ComplexPropDescBase[] = [];
            // For a child directive, the name of parent's property to assign to. Being assigned indicates that this is a child directive.
            // Begin assigned to an empty string indicates that this is a child directive but parent property name should be defined
            // by the wj-property attribute on directive's tag.
            parentProperty: string;
            // For a child directive indicates whether the parent _property is a collection.
            isParentPropertyArray: boolean;
            // For a child directive which is not a collection item indicates whether it should create an object or retrieve it
            // from parent's _property.
            ownsObject: boolean;
            // For a child directive, the name of the property of the directive's underlying object that receives the reference
            // to the parent, or an empty string that indicates that the reference to the parent should be passed as the
            // underlying object's constructor parameter.
            parentReferenceProperty: string;
            // The name of the control property represented by ng-model directive defined on the control's directive.
            ngModelProperty: string;

            constructor(props: PropDescBase[], events?: EventDescBase[], complexProps?: ComplexPropDescBase[],
                parentProperty?: string, isParentPropertyArray?: boolean, ownsObject?: boolean,
                parentReferenceProperty?: string, ngModelProperty?: string) {
                this.props = props;
                this.events = events;
                this.complexProps = complexProps;
                this.parentProperty = parentProperty;
                this.isParentPropertyArray = isParentPropertyArray;
                this.ownsObject = ownsObject;
                this.parentReferenceProperty = parentReferenceProperty;
                this.ngModelProperty = ngModelProperty;
            }

            get props(): PropDescBase[] {
                return this._props;
            }
            set props(value: PropDescBase[]) {
                this._props = value || [];
            }

            get events(): EventDescBase[] {
                return this._events;
            }
            set events(value: EventDescBase[]) {
                this._events = value || [];
            }

            get complexProps(): ComplexPropDescBase[] {
                return this._complexProps;
            }
            set complexProps(value: ComplexPropDescBase[]) {
                this._complexProps = value || [];
            }

            // Adds the specified arrays to the end of corresponding arrays of this object, and overwrite the simple properties
            // if specified. Returns 'this'.
            add(props: PropDescBase[], events?: EventDescBase[], complexProps?: ComplexPropDescBase[],
                parentProperty?: string, isParentPropertyArray?: boolean, ownsObject?: boolean,
                parentReferenceProperty?: string, ngModelProperty?: string): MetaDataBase {

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
            }

            addOptions(options: any) {
                for (var prop in options) {
                    var thisValue = this[prop],
                        optionsValue = options[prop];
                    if (thisValue instanceof Array) {
                        this[prop] = thisValue.concat(optionsValue || []);
                    }
                    else if (optionsValue !== undefined) {
                        this[prop] = optionsValue;
                    }
                }
                return this;
            }

            // Prepares a raw defined metadata for a usage, for example sorts the props array on priority.
            prepare() {
                // stable sort of props on priority
                var baseArr: PropDescBase[] = [].concat(this._props);
                this._props.sort(function (a: PropDescBase, b: PropDescBase): number {
                    var ret = a.priority - b.priority;
                    if (!ret) {
                        ret = baseArr.indexOf(a) - baseArr.indexOf(b);
                    }
                    return ret;
                });
            }
        }
    

//export { wj as wjMetaBase };

 
