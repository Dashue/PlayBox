System.register(["wijmo/wijmo.react.base", "wijmo/wijmo.input", "wijmo/wijmo.react.input", "react"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var wjcReactBase, wjcInput, wjcSelf, React, ComboBox, AutoComplete, Calendar, ColorPicker, InputMask, InputColor, MultiSelect, MultiAutoComplete, InputNumber, InputDate, InputTime, InputDateTime, ListBox, Menu, Popup, Wj;
    return {
        setters: [
            function (wjcReactBase_1) {
                wjcReactBase = wjcReactBase_1;
            },
            function (wjcInput_1) {
                wjcInput = wjcInput_1;
            },
            function (wjcSelf_1) {
                wjcSelf = wjcSelf_1;
            },
            function (React_1) {
                React = React_1;
            }
        ],
        execute: function () {
            window['wijmo'] = window['wijmo'] || {};
            window['wijmo']['react'] = window['wijmo']['react'] || {};
            window['wijmo']['react']['input'] = wjcSelf;
            ComboBox = (function (_super) {
                __extends(ComboBox, _super);
                function ComboBox(props) {
                    return _super.call(this, props, wjcInput.ComboBox) || this;
                }
                return ComboBox;
            }(wjcReactBase.ComponentBase));
            exports_1("ComboBox", ComboBox);
            AutoComplete = (function (_super) {
                __extends(AutoComplete, _super);
                function AutoComplete(props) {
                    return _super.call(this, props, wjcInput.AutoComplete) || this;
                }
                return AutoComplete;
            }(wjcReactBase.ComponentBase));
            exports_1("AutoComplete", AutoComplete);
            Calendar = (function (_super) {
                __extends(Calendar, _super);
                function Calendar(props) {
                    return _super.call(this, props, wjcInput.Calendar) || this;
                }
                return Calendar;
            }(wjcReactBase.ComponentBase));
            exports_1("Calendar", Calendar);
            ColorPicker = (function (_super) {
                __extends(ColorPicker, _super);
                function ColorPicker(props) {
                    return _super.call(this, props, wjcInput.ColorPicker) || this;
                }
                return ColorPicker;
            }(wjcReactBase.ComponentBase));
            exports_1("ColorPicker", ColorPicker);
            InputMask = (function (_super) {
                __extends(InputMask, _super);
                function InputMask(props) {
                    return _super.call(this, props, wjcInput.InputMask) || this;
                }
                return InputMask;
            }(wjcReactBase.ComponentBase));
            exports_1("InputMask", InputMask);
            InputColor = (function (_super) {
                __extends(InputColor, _super);
                function InputColor(props) {
                    return _super.call(this, props, wjcInput.InputColor) || this;
                }
                return InputColor;
            }(wjcReactBase.ComponentBase));
            exports_1("InputColor", InputColor);
            MultiSelect = (function (_super) {
                __extends(MultiSelect, _super);
                function MultiSelect(props) {
                    return _super.call(this, props, wjcInput.MultiSelect) || this;
                }
                return MultiSelect;
            }(wjcReactBase.ComponentBase));
            exports_1("MultiSelect", MultiSelect);
            MultiAutoComplete = (function (_super) {
                __extends(MultiAutoComplete, _super);
                function MultiAutoComplete(props) {
                    return _super.call(this, props, wjcInput.MultiAutoComplete) || this;
                }
                return MultiAutoComplete;
            }(wjcReactBase.ComponentBase));
            exports_1("MultiAutoComplete", MultiAutoComplete);
            InputNumber = (function (_super) {
                __extends(InputNumber, _super);
                function InputNumber(props) {
                    return _super.call(this, props, wjcInput.InputNumber) || this;
                }
                return InputNumber;
            }(wjcReactBase.ComponentBase));
            exports_1("InputNumber", InputNumber);
            InputDate = (function (_super) {
                __extends(InputDate, _super);
                function InputDate(props) {
                    return _super.call(this, props, wjcInput.InputDate) || this;
                }
                return InputDate;
            }(wjcReactBase.ComponentBase));
            exports_1("InputDate", InputDate);
            InputTime = (function (_super) {
                __extends(InputTime, _super);
                function InputTime(props) {
                    return _super.call(this, props, wjcInput.InputTime) || this;
                }
                return InputTime;
            }(wjcReactBase.ComponentBase));
            exports_1("InputTime", InputTime);
            InputDateTime = (function (_super) {
                __extends(InputDateTime, _super);
                function InputDateTime(props) {
                    return _super.call(this, props, wjcInput.InputDateTime) || this;
                }
                return InputDateTime;
            }(wjcReactBase.ComponentBase));
            exports_1("InputDateTime", InputDateTime);
            ListBox = (function (_super) {
                __extends(ListBox, _super);
                function ListBox(props) {
                    return _super.call(this, props, wjcInput.ListBox) || this;
                }
                return ListBox;
            }(wjcReactBase.ComponentBase));
            exports_1("ListBox", ListBox);
            Menu = (function (_super) {
                __extends(Menu, _super);
                function Menu(props) {
                    return _super.call(this, props, wjcInput.Menu) || this;
                }
                return Menu;
            }(wjcReactBase.ComponentBase));
            exports_1("Menu", Menu);
            Popup = (function (_super) {
                __extends(Popup, _super);
                function Popup(props) {
                    return _super.call(this, props, wjcInput.Popup) || this;
                }
                Popup.prototype.render = function () {
                    return React.createElement('div', null, this.props.children);
                };
                return Popup;
            }(wjcReactBase.ComponentBase));
            exports_1("Popup", Popup);
            Wj = wjcReactBase;
        }
    };
});
//# sourceMappingURL=wijmo.react.input.js.map