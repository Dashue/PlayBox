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
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var wjcSelf = require("wijmo/wijmo.input");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['input'] = wjcSelf;
'use strict';
var DropDown = (function (_super) {
    __extends(DropDown, _super);
    function DropDown(element, options) {
        var _this = _super.call(this, element, null, true) || this;
        _this._showBtn = true;
        _this._autoExpand = true;
        _this._animate = false;
        _this.textChanged = new wjcCore.Event();
        _this.isDroppedDownChanging = new wjcCore.Event();
        _this.isDroppedDownChanged = new wjcCore.Event();
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-dropdown wj-content', tpl, {
            _tbx: 'input',
            _btn: 'btn',
            _dropDown: 'dropdown'
        }, 'input');
        _this._elRef = _this._tbx;
        _this._createDropDown();
        _this._updateBtn();
        var dd = _this._dropDown;
        if (dd && dd.parentElement) {
            dd.parentElement.removeChild(dd);
        }
        wjcCore.addClass(_this.hostElement, 'wj-state-collapsed');
        var fs = _this._updateFocusState.bind(_this);
        _this.addEventListener(_this.dropDown, 'blur', fs, true);
        _this.addEventListener(_this.dropDown, 'focus', fs);
        var kd = _this._keydown.bind(_this);
        _this.addEventListener(_this.hostElement, 'keydown', kd);
        _this.addEventListener(_this.dropDown, 'keydown', kd);
        _this.addEventListener(_this._tbx, 'keypress', function (e) {
            if (e.keyCode == 9787 && _this._altDown) {
                e.preventDefault();
            }
        });
        _this.addEventListener(_this._tbx, 'input', function () {
            _this._setText(_this.text, false);
        });
        _this.addEventListener(_this._tbx, 'click', function () {
            if (_this._autoExpand) {
                _this._expandSelection();
            }
        });
        if (wjcCore.isIE9()) {
            _this.addEventListener(_this._tbx, 'keyup', function () {
                _this._setText(_this.text, false);
            });
        }
        _this.addEventListener(_this._btn, 'click', _this._btnclick.bind(_this));
        _this.addEventListener(_this._dropDown, 'click', function (e) {
            e.stopPropagation();
        });
        return _this;
    }
    Object.defineProperty(DropDown.prototype, "text", {
        get: function () {
            return this._tbx.value;
        },
        set: function (value) {
            if (value != this.text) {
                this._setText(value, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "inputElement", {
        get: function () {
            return this._tbx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "isReadOnly", {
        get: function () {
            return this._tbx.readOnly;
        },
        set: function (value) {
            this._tbx.readOnly = wjcCore.asBoolean(value);
            wjcCore.toggleClass(this.hostElement, 'wj-state-readonly', this.isReadOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "isRequired", {
        get: function () {
            return this._tbx.required;
        },
        set: function (value) {
            this._tbx.required = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "placeholder", {
        get: function () {
            return this._tbx.placeholder;
        },
        set: function (value) {
            this._tbx.placeholder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "isDroppedDown", {
        get: function () {
            return this._dropDown.style.display != 'none';
        },
        set: function (value) {
            value = wjcCore.asBoolean(value) && !this.isDisabled && !this.isReadOnly;
            if (value != this.isDroppedDown && this.onIsDroppedDownChanging(new wjcCore.CancelEventArgs())) {
                var host = this.hostElement, dd = this._dropDown;
                if (value) {
                    if (!dd.style.minWidth) {
                        dd.style.minWidth = host.getBoundingClientRect().width + 'px';
                    }
                    dd.style.display = 'block';
                    this._updateDropDown();
                }
                else {
                    if (this.containsFocus()) {
                        if (!this.isTouching || !this.showDropDownButton) {
                            this.selectAll();
                        }
                        else {
                            this.focus();
                        }
                    }
                    wjcCore.hidePopup(dd);
                }
                this._updateFocusState();
                wjcCore.toggleClass(host, 'wj-state-collapsed', !this.isDroppedDown);
                this.onIsDroppedDownChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "dropDown", {
        get: function () {
            return this._dropDown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "dropDownCssClass", {
        get: function () {
            return this._cssClass;
        },
        set: function (value) {
            if (value != this._cssClass) {
                wjcCore.removeClass(this._dropDown, this._cssClass);
                this._cssClass = wjcCore.asString(value);
                wjcCore.addClass(this._dropDown, this._cssClass);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "showDropDownButton", {
        get: function () {
            return this._showBtn;
        },
        set: function (value) {
            this._showBtn = wjcCore.asBoolean(value);
            this._updateBtn();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "autoExpandSelection", {
        get: function () {
            return this._autoExpand;
        },
        set: function (value) {
            this._autoExpand = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "isAnimated", {
        get: function () {
            return this._animate;
        },
        set: function (value) {
            this._animate = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    DropDown.prototype.selectAll = function () {
        if (this._elRef == this._tbx) {
            wjcCore.setSelectionRange(this._tbx, 0, this.text.length);
        }
        else {
            this.focus();
        }
    };
    DropDown.prototype.onTextChanged = function (e) {
        this.textChanged.raise(this, e);
        this._updateState();
    };
    DropDown.prototype.onIsDroppedDownChanging = function (e) {
        this.isDroppedDownChanging.raise(this, e);
        return !e.cancel;
    };
    DropDown.prototype.onIsDroppedDownChanged = function (e) {
        var _this = this;
        this.removeEventListener(document, 'mousedown');
        this.removeEventListener(document, 'keydown');
        if (this.isDroppedDown && !this.containsFocus()) {
            this.addEventListener(document, 'mousedown', function (e) {
                if (!wjcCore.contains(_this.dropDown, e.target) && !wjcCore.contains(_this.hostElement, e.target)) {
                    _this.isDroppedDown = false;
                }
            });
            this.addEventListener(document, 'keydown', function (e) {
                if (!_this.containsFocus()) {
                    _this.isDroppedDown = false;
                }
            });
        }
        this.isDroppedDownChanged.raise(this, e);
    };
    DropDown.prototype.onGotFocus = function (e) {
        if (!this.isTouching) {
            this.selectAll();
        }
        _super.prototype.onGotFocus.call(this, e);
    };
    DropDown.prototype.onLostFocus = function (e) {
        this._commitText();
        if (!this.containsFocus()) {
            this.isDroppedDown = false;
        }
        _super.prototype.onLostFocus.call(this, e);
    };
    DropDown.prototype.containsFocus = function () {
        return _super.prototype.containsFocus.call(this) || wjcCore.contains(this._dropDown, wjcCore.getActiveElement());
    };
    DropDown.prototype.dispose = function () {
        this.isDroppedDown = false;
        var dd = this.dropDown;
        if (dd) {
            var ctl = wjcCore.Control.getControl(dd);
            if (ctl) {
                ctl.dispose();
            }
            else if (dd.parentElement) {
                dd.parentElement.removeChild(dd);
            }
        }
        _super.prototype.dispose.call(this);
    };
    DropDown.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        if (this.isDroppedDown) {
            if (getComputedStyle(this.hostElement).display != 'none') {
                var ae = wjcCore.getActiveElement();
                wjcCore.showPopup(this._dropDown, this.hostElement, false, false, this.dropDownCssClass == null);
                if (ae instanceof HTMLElement && ae != wjcCore.getActiveElement()) {
                    ae.focus();
                }
            }
        }
    };
    DropDown.prototype._handleResize = function () {
        if (this.isDroppedDown) {
            this.refresh();
        }
    };
    DropDown.prototype._expandSelection = function () {
        var tbx = this._tbx, val = tbx.value, start = tbx.selectionStart, end = tbx.selectionEnd;
        if (val && start == end) {
            var ct = this._getCharType(val, start);
            if (ct > -1) {
                for (; end < val.length; end++) {
                    if (this._getCharType(val, end) != ct) {
                        break;
                    }
                }
                for (; start > 0; start--) {
                    if (this._getCharType(val, start - 1) != ct) {
                        break;
                    }
                }
                if (start != end) {
                    tbx.setSelectionRange(start, end);
                }
            }
        }
    };
    DropDown.prototype._getCharType = function (text, pos) {
        var chr = text[pos];
        if (chr >= '0' && chr <= '9')
            return 0;
        if ((chr >= 'a' && chr <= 'z') || (chr >= 'A' && chr <= 'Z'))
            return 1;
        return -1;
    };
    DropDown.prototype._keydown = function (e) {
        if (e.defaultPrevented)
            return;
        this._altDown = e.altKey;
        switch (e.keyCode) {
            case wjcCore.Key.Tab:
            case wjcCore.Key.Escape:
            case wjcCore.Key.Enter:
                if (this.isDroppedDown) {
                    this.isDroppedDown = false;
                    if (e.keyCode != wjcCore.Key.Tab && !this.containsFocus()) {
                        this.focus();
                    }
                    e.preventDefault();
                }
                break;
            case wjcCore.Key.F4:
            case wjcCore.Key.Up:
            case wjcCore.Key.Down:
                if (e.keyCode == wjcCore.Key.F4 || e.altKey) {
                    if (wjcCore.contains(document.body, this.hostElement)) {
                        this.isDroppedDown = !this.isDroppedDown;
                        e.preventDefault();
                    }
                }
                break;
        }
    };
    DropDown.prototype._btnclick = function (e) {
        this.isDroppedDown = !this.isDroppedDown;
    };
    DropDown.prototype._setText = function (text, fullMatch) {
        if (text == null)
            text = '';
        text = text.toString();
        if (text != this._tbx.value) {
            this._tbx.value = text;
        }
        if (text != this._oldText) {
            this._oldText = text;
            this.onTextChanged();
        }
    };
    DropDown.prototype._updateBtn = function () {
        this._btn.tabIndex = -1;
        this._btn.style.display = this._showBtn ? '' : 'none';
    };
    DropDown.prototype._createDropDown = function () {
    };
    DropDown.prototype._commitText = function () {
    };
    DropDown.prototype._updateDropDown = function () {
        if (this.isDroppedDown) {
            this._commitText();
            wjcCore.showPopup(this._dropDown, this.hostElement, false, this._animate, this.dropDownCssClass == null);
        }
    };
    return DropDown;
}(wjcCore.Control));
DropDown.controlTemplate = '<div style="position:relative" class="wj-template">' +
    '<div class="wj-input">' +
    '<div class="wj-input-group wj-input-btn-visible">' +
    '<input wj-part="input" type="text" class="wj-form-control" />' +
    '<span wj-part="btn" class="wj-input-group-btn" tabindex="-1">' +
    '<button class="wj-btn wj-btn-default" type="button" tabindex="-1">' +
    '<span class="wj-glyph-down"></span>' +
    '</button>' +
    '</span>' +
    '</div>' +
    '</div>' +
    '<div wj-part="dropdown" class="wj-content wj-dropdown-panel" ' +
    'style="display:none;position:absolute;z-index:100">' +
    '</div>' +
    '</div>';
exports.DropDown = DropDown;
'use strict';
var DateSelectionMode;
(function (DateSelectionMode) {
    DateSelectionMode[DateSelectionMode["None"] = 0] = "None";
    DateSelectionMode[DateSelectionMode["Day"] = 1] = "Day";
    DateSelectionMode[DateSelectionMode["Month"] = 2] = "Month";
})(DateSelectionMode = exports.DateSelectionMode || (exports.DateSelectionMode = {}));
var Calendar = (function (_super) {
    __extends(Calendar, _super);
    function Calendar(element, options) {
        var _this = _super.call(this, element) || this;
        _this._readOnly = false;
        _this._selMode = DateSelectionMode.Day;
        _this.valueChanged = new wjcCore.Event();
        _this.displayMonthChanged = new wjcCore.Event();
        _this.formatItem = new wjcCore.Event();
        _this._value = wjcCore.DateTime.newDate();
        _this._currMonth = _this._getMonth(_this._value);
        _this._createChildren();
        _this.refresh(true);
        _this.addEventListener(_this.hostElement, 'mouseup', _this._click.bind(_this));
        _this.addEventListener(_this.hostElement, 'keydown', _this._keydown.bind(_this));
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(Calendar.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            value = wjcCore.asDate(value, true);
            value = this._clamp(value);
            if (this._valid(value)) {
                this.displayMonth = this._getMonth(value);
                if (!wjcCore.DateTime.equals(this._value, value)) {
                    this._value = value;
                    this.invalidate(false);
                    this.onValueChanged();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (value) {
            if (value != this.min) {
                this._min = wjcCore.asDate(value, true);
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            if (value != this.max) {
                this._max = wjcCore.asDate(value, true);
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "selectionMode", {
        get: function () {
            return this._selMode;
        },
        set: function (value) {
            if (value != this._selMode) {
                this._selMode = wjcCore.asEnum(value, DateSelectionMode);
                var mthMode = this._monthMode();
                if (mthMode)
                    this.monthView = false;
                var mthGlyph = this._btnMth.querySelector('.wj-glyph-down');
                if (mthGlyph)
                    mthGlyph.style.display = mthMode ? 'none' : '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "isReadOnly", {
        get: function () {
            return this._readOnly;
        },
        set: function (value) {
            this._readOnly = wjcCore.asBoolean(value);
            wjcCore.toggleClass(this.hostElement, 'wj-state-readonly', this.isReadOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "firstDayOfWeek", {
        get: function () {
            return this._fdw;
        },
        set: function (value) {
            if (value != this._fdw) {
                value = wjcCore.asNumber(value, true);
                if (value && (value > 6 || value < 0)) {
                    throw 'firstDayOfWeek must be between 0 and 6 (Sunday to Saturday).';
                }
                this._fdw = value;
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "displayMonth", {
        get: function () {
            return this._currMonth;
        },
        set: function (value) {
            if (!wjcCore.DateTime.equals(this.displayMonth, value)) {
                value = wjcCore.asDate(value);
                var valid = this.monthView
                    ? this._monthInValidRange(value)
                    : this._yearInValidRange(value);
                if (valid) {
                    this._currMonth = this._getMonth(this._clamp(value));
                    this.invalidate(true);
                    this.onDisplayMonthChanged();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "showHeader", {
        get: function () {
            return this._tbHdr.style.display != 'none';
        },
        set: function (value) {
            this._tbHdr.style.display = wjcCore.asBoolean(value) ? '' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "monthView", {
        get: function () {
            return this._tbMth.style.display != 'none';
        },
        set: function (value) {
            if (value != this.monthView) {
                this._tbMth.style.display = value ? '' : 'none';
                this._tbYr.style.display = value ? 'none' : '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "itemFormatter", {
        get: function () {
            return this._itemFormatter;
        },
        set: function (value) {
            if (value != this._itemFormatter) {
                this._itemFormatter = wjcCore.asFunction(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "itemValidator", {
        get: function () {
            return this._itemValidator;
        },
        set: function (value) {
            if (value != this._itemValidator) {
                this._itemValidator = wjcCore.asFunction(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Calendar.prototype.onValueChanged = function (e) {
        this.valueChanged.raise(this, e);
    };
    Calendar.prototype.onDisplayMonthChanged = function (e) {
        this.displayMonthChanged.raise(this, e);
    };
    Calendar.prototype.onFormatItem = function (e) {
        this.formatItem.raise(this, e);
    };
    Calendar.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        var cells, cell, day, month = this.displayMonth, fdw = this.firstDayOfWeek != null ? this.firstDayOfWeek : wjcCore.Globalize.getFirstDayOfWeek();
        _super.prototype.refresh.call(this, fullUpdate);
        this._firstDay = wjcCore.DateTime.addDays(month, -(month.getDay() - fdw + 7) % 7);
        wjcCore.setText(this._spMth, wjcCore.Globalize.format(month, 'y'));
        cells = this._tbMth.querySelectorAll('td');
        for (var i = 0; i < 7 && i < cells.length; i++) {
            day = wjcCore.DateTime.addDays(this._firstDay, i);
            wjcCore.setText(cells[i], wjcCore.Globalize.format(day, 'ddd'));
        }
        for (var i = 7; i < cells.length; i++) {
            cell = cells[i];
            day = wjcCore.DateTime.addDays(this._firstDay, i - 7);
            wjcCore.setText(cell, day.getDate().toString());
            cell.className = '';
            var invalid = !this._valid(day);
            wjcCore.toggleClass(cell, 'wj-state-invalid', invalid);
            wjcCore.toggleClass(cell, 'wj-state-selected', wjcCore.DateTime.sameDate(day, this.value));
            wjcCore.toggleClass(cell, 'wj-day-today', wjcCore.DateTime.sameDate(day, new Date()));
            wjcCore.toggleClass(cell, 'wj-day-othermonth', invalid || day.getMonth() != month.getMonth() || !this._inValidRange(day));
            if (this.itemFormatter) {
                this.itemFormatter(day, cell);
            }
            if (this.formatItem.hasHandlers) {
                var e = new FormatItemEventArgs(i, day, cell);
                this.onFormatItem(e);
            }
        }
        var rows = this._tbMth.querySelectorAll('tr');
        if (rows.length) {
            day = wjcCore.DateTime.addDays(this._firstDay, 28);
            rows[rows.length - 2].style.display = (day.getMonth() == month.getMonth()) ? '' : 'none';
            day = wjcCore.DateTime.addDays(this._firstDay, 35);
            rows[rows.length - 1].style.display = (day.getMonth() == month.getMonth()) ? '' : 'none';
        }
        cells = this._tbYr.querySelectorAll('td');
        if (cells.length) {
            wjcCore.setText(cells[0], month.getFullYear().toString());
        }
        for (var i = 1; i < cells.length; i++) {
            cell = cells[i];
            day = new Date(month.getFullYear(), i - 1, 1);
            wjcCore.setText(cell, wjcCore.Globalize.format(day, 'MMM'));
            cell.className = '';
            wjcCore.toggleClass(cell, 'wj-state-disabled', !this._monthInValidRange(day));
            wjcCore.toggleClass(cell, 'wj-state-selected', this._sameMonth(day, this.value));
        }
    };
    Calendar.prototype._canChangeValue = function () {
        return !this._readOnly && this._selMode != DateSelectionMode.None;
    };
    Calendar.prototype._valid = function (date) {
        return this.itemValidator && date
            ? this.itemValidator(date)
            : true;
    };
    Calendar.prototype._inValidRange = function (date) {
        if (this.min && date < wjcCore.DateTime.fromDateTime(this.min, date))
            return false;
        if (this.max && date > wjcCore.DateTime.fromDateTime(this.max, date))
            return false;
        return true;
    };
    Calendar.prototype._monthInValidRange = function (month) {
        if (this.min || this.max) {
            var y = month.getFullYear(), m = month.getMonth(), first = new Date(y, m, 1), last = wjcCore.DateTime.addDays(new Date(y, m + 1), -1);
            if (this.min && this.min > last)
                return false;
            if (this.max && this.max < first)
                return false;
        }
        return true;
    };
    Calendar.prototype._yearInValidRange = function (year) {
        if (this.min || this.max) {
            var y = year.getFullYear(), first = new Date(y, 0), last = wjcCore.DateTime.addDays(new Date(y + 1, 0), -1);
            if (this.min && this.min > last)
                return false;
            if (this.max && this.max < first)
                return false;
        }
        return true;
    };
    Calendar.prototype._sameMonth = function (date, month) {
        return wjcCore.isDate(date) && wjcCore.isDate(month) &&
            date.getMonth() == month.getMonth() &&
            date.getFullYear() == month.getFullYear();
    };
    Calendar.prototype._clamp = function (value) {
        if (value) {
            if (this.min) {
                var min = wjcCore.DateTime.fromDateTime(this.min, value);
                if (value < min) {
                    value = min;
                }
            }
            if (this.max) {
                var max = wjcCore.DateTime.fromDateTime(this.max, value);
                if (value > max) {
                    value = max;
                }
            }
        }
        return value;
    };
    Calendar.prototype._createChildren = function () {
        var tpl = this.getTemplate();
        this.applyTemplate('wj-control wj-calendar', tpl, {
            _tbHdr: 'tbl-header',
            _btnMth: 'btn-month',
            _spMth: 'span-month',
            _btnPrv: 'btn-prev',
            _btnTdy: 'btn-today',
            _btnNxt: 'btn-next',
            _tbMth: 'tbl-month',
            _tbYr: 'tbl-year'
        });
        var tr = this._createElement('tr', this._tbMth, 'wj-header');
        for (var d = 0; d < 7; d++) {
            this._createElement('td', tr);
        }
        for (var w = 0; w < 6; w++) {
            tr = this._createElement('tr', this._tbMth);
            for (var d = 0; d < 7; d++) {
                this._createElement('td', tr);
            }
        }
        tr = this._createElement('tr', this._tbYr, 'wj-header');
        this._createElement('td', tr).setAttribute('colspan', '4');
        for (var i = 0; i < 3; i++) {
            tr = this._createElement('tr', this._tbYr);
            for (var j = 0; j < 4; j++) {
                this._createElement('td', tr);
            }
        }
    };
    Calendar.prototype._createElement = function (tag, parent, className) {
        var el = document.createElement(tag);
        if (parent)
            parent.appendChild(el);
        if (className)
            wjcCore.addClass(el, className);
        return el;
    };
    Calendar.prototype._click = function (e) {
        var handled = false;
        var elem = e.target;
        if (wjcCore.contains(this._btnMth, elem) && !this._monthMode()) {
            this.monthView = !this.monthView;
            handled = true;
        }
        else if (wjcCore.contains(this._btnPrv, elem)) {
            this._navigate(-1);
            handled = true;
        }
        else if (wjcCore.contains(this._btnNxt, elem)) {
            this._navigate(+1);
            handled = true;
        }
        else if (wjcCore.contains(this._btnTdy, elem)) {
            this._navigate(0);
            handled = true;
        }
        if (elem && !handled) {
            elem = wjcCore.closest(elem, 'TD');
            if (elem) {
                if (this.monthView) {
                    var index = this._getCellIndex(this._tbMth, elem);
                    if (index > 6 && this._canChangeValue()) {
                        var value = wjcCore.DateTime.fromDateTime(wjcCore.DateTime.addDays(this._firstDay, index - 7), this.value);
                        if (this._inValidRange(value) && this._valid(value)) {
                            this.value = value;
                        }
                        handled = true;
                    }
                }
                else {
                    var index = this._getCellIndex(this._tbYr, elem);
                    if (index > 0) {
                        this.displayMonth = new Date(this.displayMonth.getFullYear(), index - 1, 1);
                        if (this._monthMode()) {
                            if (this._canChangeValue()) {
                                var value = wjcCore.DateTime.fromDateTime(this.displayMonth, this.value);
                                if (this._inValidRange(value)) {
                                    this.value = value;
                                }
                            }
                        }
                        else {
                            this.monthView = true;
                        }
                        handled = true;
                    }
                }
            }
        }
        if (handled) {
            e.preventDefault();
            this.focus();
        }
    };
    Calendar.prototype._getCellIndex = function (tbl, cell) {
        var cells = tbl.querySelectorAll('TD');
        for (var i = 0; i < cells.length; i++) {
            if (cells[i] == cell)
                return i;
        }
        return -1;
    };
    Calendar.prototype._keydown = function (e) {
        if (e.defaultPrevented)
            return;
        if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)
            return;
        var addDays = 0, addMonths = 0, handled = true;
        if (this.monthView) {
            switch (e.keyCode) {
                case wjcCore.Key.Left:
                    addDays = -1;
                    break;
                case wjcCore.Key.Right:
                    addDays = +1;
                    break;
                case wjcCore.Key.Up:
                    addDays = -7;
                    break;
                case wjcCore.Key.Down:
                    addDays = +7;
                    break;
                case wjcCore.Key.PageDown:
                    addMonths = e.altKey ? +12 : +1;
                    break;
                case wjcCore.Key.PageUp:
                    addMonths = e.altKey ? -12 : -1;
                    break;
                default:
                    handled = false;
                    break;
            }
        }
        else {
            switch (e.keyCode) {
                case wjcCore.Key.Left:
                    addMonths = -1;
                    break;
                case wjcCore.Key.Right:
                    addMonths = +1;
                    break;
                case wjcCore.Key.Up:
                    addMonths = -4;
                    break;
                case wjcCore.Key.Down:
                    addMonths = +4;
                    break;
                case wjcCore.Key.PageDown:
                    addMonths = e.altKey ? +120 : +12;
                    break;
                case wjcCore.Key.PageUp:
                    addMonths = e.altKey ? -120 : -12;
                    break;
                case wjcCore.Key.Enter:
                    if (!this._monthMode()) {
                        this.monthView = true;
                    }
                    else {
                        handled = false;
                    }
                    break;
                default:
                    handled = false;
                    break;
            }
        }
        if (this.value && this._canChangeValue() && (addDays || addMonths)) {
            var dt = this.value;
            dt = wjcCore.DateTime.addDays(dt, addDays);
            dt = wjcCore.DateTime.addMonths(dt, addMonths);
            for (var cnt = 0; !this._valid(dt) && cnt < 31; cnt++) {
                dt = wjcCore.DateTime.addDays(dt, addDays > 0 || addMonths > 0 ? +1 : -1);
            }
            this.value = dt;
        }
        if (handled) {
            e.preventDefault();
        }
    };
    Calendar.prototype._getMonth = function (date) {
        if (!date)
            date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };
    Calendar.prototype._monthMode = function () {
        return this.selectionMode == DateSelectionMode.Month;
    };
    Calendar.prototype._navigate = function (skip) {
        var monthView = this.monthView;
        switch (skip) {
            case 0:
                var today = new Date();
                if (monthView) {
                    if (this._canChangeValue()) {
                        this.value = wjcCore.DateTime.fromDateTime(today, this.value);
                    }
                }
                else {
                    if (this._canChangeValue()) {
                        this.value = this._getMonth(today);
                    }
                }
                this.displayMonth = this._getMonth(today);
                break;
            case +1:
                this.displayMonth = wjcCore.DateTime.addMonths(this.displayMonth, monthView ? +1 : +12);
                break;
            case -1:
                this.displayMonth = wjcCore.DateTime.addMonths(this.displayMonth, monthView ? -1 : -12);
                break;
        }
    };
    return Calendar;
}(wjcCore.Control));
Calendar.controlTemplate = '<div class="wj-calendar-outer wj-content">' +
    '<div wj-part="tbl-header" class="wj-calendar-header">' +
    '<div wj-part="btn-month" class="wj-month-select">' +
    '<span wj-part="span-month"></span> <span class="wj-glyph-down"></span>' +
    '</div>' +
    '<div class="wj-btn-group">' +
    '<button type="button" wj-part="btn-prev" class="wj-btn wj-btn-default"><span class="wj-glyph-left"></span></button>' +
    '<button type="button" wj-part="btn-today" class="wj-btn wj-btn-default"><span class="wj-glyph-circle"></span></button>' +
    '<button type="button" wj-part="btn-next" class="wj-btn wj-btn-default"><span class="wj-glyph-right"></span></button>' +
    '</div>' +
    '</div>' +
    '<table wj-part="tbl-month" class="wj-calendar-month"/>' +
    '<table wj-part="tbl-year" class="wj-calendar-year" style="display:none"/>' +
    '</div>';
exports.Calendar = Calendar;
'use strict';
var ColorPicker = (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker(element, options) {
        var _this = _super.call(this, element) || this;
        _this._hsb = [.5, 1, 1];
        _this._alpha = 1;
        _this.valueChanged = new wjcCore.Event();
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-colorpicker wj-content', tpl, {
            _eSB: 'div-sb',
            _eHue: 'div-hue',
            _eAlpha: 'div-alpha',
            _ePreview: 'div-pv',
            _ePal: 'div-pal',
            _eText: 'div-text'
        });
        _this._palette = '#FFF,#000, #F00,#FFC000,#FFFF00,#92D050,#00B050,#00B0F0,#0070C0,#7030A0'.split(',');
        _this._updatePalette();
        _this._eHue.style.backgroundImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAD4CAIAAACi6hsPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAGvSURBVDhPXdBPaM9xHMfxz4pWaxcmtoOhpdXSVpiyHWxqmVpDjaU5rK34XfypjTJ/p+ZPay6jhsOsRrKwaJElf9IQq03WIkv4FeMwMq221tfje1ByeFzfvd7PEKWGEKWTQRZLySWfVRRTQjmVbKWGOhLsZT+HaeY0bbTTQSfdXOcWffTzmAFeMcwoYyT5ygS/mA5hNgphip98J8kHRnnNSwZ4yH1uc4OrdHGR87RximYO0cgedlLLdqqoYAPrWMtKVrCcJSxiPmnMJUQp/Bsyk2xyyKOAQooopYwKtlDNDur5G7SBJo7RQiv/B+2hl3s84CkvGGKEOOYnxolj/mYmhBmDJ5ngCx95xxsGecYj4pB3iENeoZMO2mmlhaMcpIE4ZII6aqhmM3HMMkooopB88sghm0wySCeVlCjMCVFIYx4LWUwOeRSwhmLWU84mqqihll3sppEmjnOSs5zjEl1c4yZ99POE5wwxwns+840fTDFLFKaZZIJxkozxlmEGGSC+GF++Sy89dHOZC8Rr4lVnOMERDrCPBPXEX22jko2UEn+/mnxyWUYWC0gnNUQh/AEc0HJs6cex0gAAAABJRU5ErkJggg==)';
        _this._eHue.style.backgroundSize = 'contain';
        if (navigator.appVersion.indexOf('MSIE 9') > -1) {
            _this._eSB.children[0].style.filter = 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffffffff,endColorstr=#00ffffff,GradientType=1)';
            _this._eSB.children[1].style.filter = 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#00000000,endColorstr=#ff000000,GradientType=0)';
        }
        tpl = ColorPicker._tplCursor;
        _this._cSB = wjcCore.createElement(tpl);
        _this._cHue = wjcCore.createElement(tpl);
        _this._cHue.style.width = '100%';
        _this._cAlpha = wjcCore.createElement(tpl);
        _this._cAlpha.style.height = '100%';
        _this._eSB.appendChild(_this._cSB);
        _this._eHue.appendChild(_this._cHue);
        _this._eAlpha.appendChild(_this._cAlpha);
        _this.addEventListener(_this.hostElement, 'mousedown', function (e) {
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
            _this._mouseDown(e);
        });
        var mouseMove = function (e) {
            _this._mouseMove(e);
        };
        var mouseUp = function (e) {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            _this._mouseUp(e);
        };
        _this.addEventListener(_this.hostElement, 'click', function (e) {
            var el = e.target;
            if (el && el.tagName == 'DIV' && wjcCore.contains(_this._ePal, el)) {
                var color = el.style.backgroundColor;
                if (color) {
                    _this.value = new wjcCore.Color(color).toString();
                }
            }
        });
        _this.value = '#ffffff';
        _this.initialize(options);
        _this._updatePanels();
        return _this;
    }
    Object.defineProperty(ColorPicker.prototype, "showAlphaChannel", {
        get: function () {
            return this._eAlpha.parentElement.style.display != 'none';
        },
        set: function (value) {
            this._eAlpha.parentElement.style.display = wjcCore.asBoolean(value) ? '' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPicker.prototype, "showColorString", {
        get: function () {
            return this._eText.style.display != 'none';
        },
        set: function (value) {
            this._eText.style.display = wjcCore.asBoolean(value) ? '' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPicker.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (value != this.value) {
                this._value = wjcCore.asString(value);
                this._eText.innerText = this._value;
                var c = new wjcCore.Color(this._value), hsb = c.getHsb();
                if (this._hsb[0] != hsb[0] || this._hsb[1] != hsb[1] ||
                    this._hsb[2] != hsb[2] || this._alpha != c.a) {
                    if (hsb[2] == 0) {
                        hsb[0] = this._hsb[0];
                        hsb[1] = this._hsb[1];
                    }
                    else if (hsb[1] == 0) {
                        hsb[0] = this._hsb[0];
                    }
                    this._hsb = hsb;
                    this._alpha = c.a;
                    this.onValueChanged();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPicker.prototype, "palette", {
        get: function () {
            return this._palette;
        },
        set: function (value) {
            value = wjcCore.asArray(value);
            for (var i = 0; i < value.length && i < this._palette.length; i++) {
                var entry = wjcCore.asString(value[i]);
                this._palette[i] = entry;
            }
            this._updatePalette();
        },
        enumerable: true,
        configurable: true
    });
    ColorPicker.prototype.onValueChanged = function (e) {
        this._updatePanels();
        this.valueChanged.raise(this, e);
    };
    ColorPicker.prototype._mouseDown = function (e) {
        this._htDown = this._getTargetPanel(e);
        if (this._htDown) {
            e.preventDefault();
            this.focus();
            this._mouseMove(e);
        }
    };
    ColorPicker.prototype._mouseMove = function (e) {
        if (this._htDown) {
            var rc = this._htDown.getBoundingClientRect();
            if (this._htDown == this._eHue) {
                this._hsb[0] = wjcCore.clamp((e.clientY - rc.top) / rc.height, 0, .99);
                this._updateColor();
            }
            else if (this._htDown == this._eSB) {
                this._hsb[1] = wjcCore.clamp((e.clientX - rc.left) / rc.width, 0, 1);
                this._hsb[2] = wjcCore.clamp(1 - (e.clientY - rc.top) / rc.height, 0, 1);
                this._updateColor();
            }
            else if (this._htDown == this._eAlpha) {
                this._alpha = wjcCore.clamp((e.clientX - rc.left) / rc.width, 0, 1);
                this._updateColor();
            }
        }
    };
    ColorPicker.prototype._mouseUp = function (e) {
        this._htDown = null;
    };
    ColorPicker.prototype._updateColor = function () {
        var c = wjcCore.Color.fromHsb(this._hsb[0], this._hsb[1], this._hsb[2], this._alpha);
        this.value = c.toString();
        this._updatePanels();
    };
    ColorPicker.prototype._updatePalette = function () {
        var white = new wjcCore.Color('#fff'), black = new wjcCore.Color('#000');
        this._ePal.innerHTML = '';
        for (var i = 0; i < this._palette.length; i++) {
            var div = wjcCore.createElement('<div style="float:left;width:10%;box-sizing:border-box;padding:1px">'), clr = new wjcCore.Color(this._palette[i]), hsb = clr.getHsb();
            div.appendChild(this._makePalEntry(clr, 4));
            for (var r = 0; r < 5; r++) {
                if (hsb[1] == 0) {
                    var pct = r * .1 + (hsb[2] > .5 ? .05 : .55);
                    clr = wjcCore.Color.interpolate(white, black, pct);
                }
                else {
                    clr = wjcCore.Color.fromHsb(hsb[0], 0.1 + r * 0.2, 1 - r * 0.1);
                }
                div.appendChild(this._makePalEntry(clr, 0));
            }
            this._ePal.appendChild(div);
        }
    };
    ColorPicker.prototype._makePalEntry = function (color, margin) {
        var e = document.createElement('div');
        wjcCore.setCss(e, {
            cursor: 'pointer',
            backgroundColor: color.toString(),
            marginBottom: margin ? margin : ''
        });
        e.innerHTML = '&nbsp';
        return e;
    };
    ColorPicker.prototype._updatePanels = function () {
        var clrHue = wjcCore.Color.fromHsb(this._hsb[0], 1, 1, 1), clrSolid = wjcCore.Color.fromHsb(this._hsb[0], this._hsb[1], this._hsb[2], 1);
        this._eSB.style.backgroundColor = clrHue.toString();
        this._eAlpha.style.background = 'linear-gradient(to right, transparent 0%, ' + clrSolid.toString() + ' 100%)';
        if (navigator.appVersion.indexOf('MSIE 9') > -1) {
            this._eAlpha.style.filter = 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#00000000,endColorstr=' + clrSolid.toString() + ', GradientType = 1)';
        }
        this._ePreview.style.backgroundColor = this.value;
        this._cHue.style.top = (this._hsb[0] * 100).toFixed(0) + '%';
        this._cSB.style.left = (this._hsb[1] * 100).toFixed(0) + '%';
        this._cSB.style.top = (100 - this._hsb[2] * 100).toFixed(0) + '%';
        this._cAlpha.style.left = (this._alpha * 100).toFixed(0) + '%';
    };
    ColorPicker.prototype._getTargetPanel = function (e) {
        var target = e.target;
        if (wjcCore.contains(this._eSB, target))
            return this._eSB;
        if (wjcCore.contains(this._eHue, target))
            return this._eHue;
        if (wjcCore.contains(this._eAlpha, target))
            return this._eAlpha;
        return null;
    };
    return ColorPicker;
}(wjcCore.Control));
ColorPicker.controlTemplate = '<div style="position:relative;width:100%;height:100%">' +
    '<div style="float:left;width:50%;height:100%;box-sizing:border-box;padding:2px">' +
    '<div wj-part="div-pal">' +
    '<div style="float:left;width:10%;box-sizing:border-box;padding:2px">' +
    '<div style="background-color:black;width:100%">&nbsp;</div>' +
    '<div style="height:6px"></div>' +
    '</div>' +
    '</div>' +
    '<div wj-part="div-text" style="position:absolute;bottom:0px;display:none"></div>' +
    '</div>' +
    '<div style="float:left;width:50%;height:100%;box-sizing:border-box;padding:2px">' +
    '<div wj-part="div-sb" class="wj-colorbox" style="float:left;width:89%;height:89%">' +
    '<div style="position:absolute;width:100%;height:100%;background:linear-gradient(to right, white 0%,transparent 100%)"></div>' +
    '<div style="position:absolute;width:100%;height:100%;background:linear-gradient(to top, black 0%,transparent 100%)"></div>' +
    '</div>' +
    '<div style="float:left;width:1%;height:89%"></div>' +
    '<div style="float:left;width:10%;height:89%">' +
    '<div wj-part="div-hue" class="wj-colorbox"></div>' +
    '</div>' +
    '<div style="float:left;width:89%;height:1%"></div>' +
    '<div style="float:left;width:89%;height:10%">' +
    '<div style="width:100%;height:100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAAcSURBVBhXY/iPBBYgAWpKQGkwgMqDAdUk/v8HAM7Mm6GatDUYAAAAAElFTkSuQmCC)">' +
    '<div wj-part="div-alpha" class="wj-colorbox"></div>' +
    '</div>' +
    '</div>' +
    '<div style="float:left;width:1%;height:10%"></div>' +
    '<div style="float:left;width:10%;height:10%">' +
    '<div wj-part="div-pv" class="wj-colorbox" style="position:static"></div>' +
    '</div>' +
    '</div>' +
    '</div>';
ColorPicker._tplCursor = '<div style="position:absolute;left:50%;top:50%;width:7px;height:7px;transform:translate(-50%,-50%);border:2px solid #f0f0f0;border-radius:50px;box-shadow:0px 0px 4px 2px #0f0f0f"></div>';
exports.ColorPicker = ColorPicker;
'use strict';
var ListBox = (function (_super) {
    __extends(ListBox, _super);
    function ListBox(element, options) {
        var _this = _super.call(this, element) || this;
        _this._pathDisplay = new wjcCore.Binding(null);
        _this._pathValue = new wjcCore.Binding(null);
        _this._pathChecked = new wjcCore.Binding(null);
        _this._html = false;
        _this._checkedItems = [];
        _this._search = '';
        _this.selectedIndexChanged = new wjcCore.Event();
        _this.itemsChanged = new wjcCore.Event();
        _this.loadingItems = new wjcCore.Event();
        _this.loadedItems = new wjcCore.Event();
        _this.itemChecked = new wjcCore.Event();
        _this.checkedItemsChanged = new wjcCore.Event();
        _this.formatItem = new wjcCore.Event();
        _this.applyTemplate('wj-control wj-listbox wj-content', null, null);
        if (_this._orgTag == 'SELECT') {
            _this._populateSelectElement(_this.hostElement);
        }
        var host = _this.hostElement;
        _this.addEventListener(host, 'click', _this._click.bind(_this));
        _this.addEventListener(host, 'keydown', _this._keydown.bind(_this));
        _this.addEventListener(host, 'keypress', _this._keypress.bind(_this));
        _this.addEventListener(host, 'wheel', function (e) {
            if (host.scrollHeight > host.offsetHeight) {
                if ((e.deltaY < 0 && host.scrollTop == 0) ||
                    (e.deltaY > 0 && host.scrollTop + host.offsetHeight >= host.scrollHeight)) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        });
        _this.initialize(options);
        return _this;
    }
    ListBox.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        if (this.displayMemberPath || !this.checkedMemberPath) {
            this._populateList();
        }
    };
    Object.defineProperty(ListBox.prototype, "itemsSource", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            if (this._items != value) {
                if (this._cv) {
                    this._cv.currentChanged.removeHandler(this._cvCurrentChanged, this);
                    this._cv.collectionChanged.removeHandler(this._cvCollectionChanged, this);
                    this._cv = null;
                }
                this._items = value;
                this._cv = wjcCore.asCollectionView(value);
                if (this._cv != null) {
                    this._cv.currentChanged.addHandler(this._cvCurrentChanged, this);
                    this._cv.collectionChanged.addHandler(this._cvCollectionChanged, this);
                }
                this._populateList();
                this.onItemsChanged();
                this.onSelectedIndexChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListBox.prototype, "collectionView", {
        get: function () {
            return this._cv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListBox.prototype, "isContentHtml", {
        get: function () {
            return this._html;
        },
        set: function (value) {
            if (value != this._html) {
                this._html = wjcCore.asBoolean(value);
                this._populateList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListBox.prototype, "itemFormatter", {
        get: function () {
            return this._itemFormatter;
        },
        set: function (value) {
            if (value != this._itemFormatter) {
                this._itemFormatter = wjcCore.asFunction(value);
                this._populateList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListBox.prototype, "displayMemberPath", {
        get: function () {
            return this._pathDisplay.path;
        },
        set: function (value) {
            if (value != this.displayMemberPath) {
                this._pathDisplay.path = wjcCore.asString(value);
                this._populateList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListBox.prototype, "selectedValuePath", {
        get: function () {
            return this._pathValue.path;
        },
        set: function (value) {
            this._pathValue.path = wjcCore.asString(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListBox.prototype, "checkedMemberPath", {
        get: function () {
            return this._pathChecked.path;
        },
        set: function (value) {
            if (value != this.checkedMemberPath) {
                this._pathChecked.path = wjcCore.asString(value);
                this._populateList();
            }
        },
        enumerable: true,
        configurable: true
    });
    ListBox.prototype.getDisplayValue = function (index) {
        var item = null;
        if (index > -1 && wjcCore.hasItems(this._cv)) {
            item = this._cv.items[index];
            if (this.displayMemberPath) {
                item = this._pathDisplay.getValue(item);
            }
        }
        var text = item != null ? item.toString() : '';
        if (this.itemFormatter) {
            text = this.itemFormatter(index, text);
        }
        return text;
    };
    ListBox.prototype.getDisplayText = function (index) {
        var children = this.hostElement.children, item = index > -1 && index < children.length
            ? children[index]
            : null;
        return item != null ? item.textContent : '';
    };
    Object.defineProperty(ListBox.prototype, "selectedIndex", {
        get: function () {
            return this._cv ? this._cv.currentPosition : -1;
        },
        set: function (value) {
            if (this._cv) {
                this._cv.moveCurrentToPosition(wjcCore.asNumber(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListBox.prototype, "selectedItem", {
        get: function () {
            return this._cv ? this._cv.currentItem : null;
        },
        set: function (value) {
            if (this._cv) {
                this._cv.moveCurrentTo(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListBox.prototype, "selectedValue", {
        get: function () {
            var item = this.selectedItem;
            if (item && this.selectedValuePath) {
                item = this._pathValue.getValue(item);
            }
            return item;
        },
        set: function (value) {
            var path = this.selectedValuePath, index = -1;
            if (this._cv) {
                for (var i = 0; i < this._cv.items.length; i++) {
                    var item = this._cv.items[i];
                    if ((path && this._pathValue.getValue(item) == value) || (!path && item == value)) {
                        index = i;
                        break;
                    }
                }
                this.selectedIndex = index;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListBox.prototype, "maxHeight", {
        get: function () {
            var host = this.hostElement;
            return host ? parseFloat(host.style.maxHeight) : null;
        },
        set: function (value) {
            var host = this.hostElement;
            if (host) {
                host.style.maxHeight = wjcCore.asNumber(value) + 'px';
            }
        },
        enumerable: true,
        configurable: true
    });
    ListBox.prototype.showSelection = function () {
        var index = this.selectedIndex, host = this.hostElement, children = host.children, e;
        for (var i = 0; i < children.length; i++) {
            e = children[i];
            wjcCore.toggleClass(e, 'wj-state-selected', i == index);
        }
        if (index > -1 && index < children.length) {
            e = children[index];
            var rco = e.getBoundingClientRect();
            var rcc = host.getBoundingClientRect();
            if (rco.bottom > rcc.bottom) {
                host.scrollTop += rco.bottom - rcc.bottom;
            }
            else if (rco.top < rcc.top) {
                host.scrollTop -= rcc.top - rco.top;
            }
        }
        if (index > -1 && this.containsFocus()) {
            e = children[index];
            if (e instanceof HTMLElement && !wjcCore.contains(e, wjcCore.getActiveElement())) {
                e.focus();
            }
        }
    };
    ListBox.prototype.getItemChecked = function (index) {
        var item = this._cv.items[index];
        if (wjcCore.isObject(item) && this.checkedMemberPath) {
            return this._pathChecked.getValue(item);
        }
        var cb = this._getCheckbox(index);
        return cb ? cb.checked : false;
    };
    ListBox.prototype.setItemChecked = function (index, checked) {
        this._setItemChecked(index, checked, true);
    };
    ListBox.prototype.toggleItemChecked = function (index) {
        this.setItemChecked(index, !this.getItemChecked(index));
    };
    Object.defineProperty(ListBox.prototype, "checkedItems", {
        get: function () {
            this._checkedItems.splice(0, this._checkedItems.length);
            if (this._cv) {
                for (var i = 0; i < this._cv.items.length; i++) {
                    if (this.getItemChecked(i)) {
                        this._checkedItems.push(this._cv.items[i]);
                    }
                }
            }
            return this._checkedItems;
        },
        set: function (value) {
            var cv = this._cv, host = this.hostElement, arr = wjcCore.asArray(value, false);
            if (cv && arr) {
                var pos = cv.currentPosition, top = host.scrollTop;
                for (var i = 0; i < cv.items.length; i++) {
                    var item = cv.items[i];
                    this._setItemChecked(i, arr.indexOf(item) > -1, false);
                }
                cv.moveCurrentToPosition(pos);
                host.scrollTop = top;
                this.onCheckedItemsChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    ListBox.prototype.onSelectedIndexChanged = function (e) {
        this.selectedIndexChanged.raise(this, e);
    };
    ListBox.prototype.onItemsChanged = function (e) {
        this.itemsChanged.raise(this, e);
    };
    ListBox.prototype.onLoadingItems = function (e) {
        this.loadingItems.raise(this, e);
    };
    ListBox.prototype.onLoadedItems = function (e) {
        this.loadedItems.raise(this, e);
    };
    ListBox.prototype.onItemChecked = function (e) {
        this.itemChecked.raise(this, e);
    };
    ListBox.prototype.onCheckedItemsChanged = function (e) {
        this.checkedItemsChanged.raise(this, e);
    };
    ListBox.prototype.onFormatItem = function (e) {
        this.formatItem.raise(this, e);
    };
    ListBox.prototype._setItemChecked = function (index, checked, notify) {
        if (notify === void 0) { notify = true; }
        var item = this._cv.items[index];
        if (wjcCore.isObject(item)) {
            var ecv = wjcCore.tryCast(this._cv, 'IEditableCollectionView');
            if (this._pathChecked.getValue(item) != checked) {
                this._checking = true;
                if (ecv) {
                    ecv.editItem(item);
                    this._pathChecked.setValue(item, checked);
                    ecv.commitEdit();
                }
                else {
                    this._pathChecked.setValue(item, checked);
                    this._cv.refresh();
                }
                this._checking = false;
            }
        }
        var cb = this._getCheckbox(index);
        if (cb && cb.checked != checked) {
            cb.checked = checked;
        }
        if (notify) {
            this.onItemChecked();
            this.onCheckedItemsChanged();
        }
    };
    ListBox.prototype._cvCollectionChanged = function (sender, e) {
        if (!this._checking) {
            this._populateList();
            this.onItemsChanged();
        }
    };
    ListBox.prototype._cvCurrentChanged = function (sender, e) {
        this.showSelection();
        this.onSelectedIndexChanged();
    };
    ListBox.prototype._populateList = function () {
        var host = this.hostElement;
        if (host) {
            var focus = this.containsFocus();
            this.onLoadingItems();
            host.innerHTML = '';
            if (this._cv) {
                for (var i = 0; i < this._cv.items.length; i++) {
                    var text = this.getDisplayValue(i);
                    if (this._html != true) {
                        text = wjcCore.escapeHtml(text);
                    }
                    if (this.checkedMemberPath) {
                        var checked = this._pathChecked.getValue(this._cv.items[i]);
                        text = '<label><input type="checkbox"' + (checked ? ' checked' : '') + '> ' + text + '</label>';
                    }
                    var item = document.createElement('div');
                    item.innerHTML = text;
                    item.className = 'wj-listbox-item';
                    if (wjcCore.hasClass(item.firstChild, 'wj-separator')) {
                        item.className += ' wj-separator';
                    }
                    if (this.formatItem.hasHandlers) {
                        var e = new FormatItemEventArgs(i, this._cv.items[i], item);
                        this.onFormatItem(e);
                    }
                    host.appendChild(item);
                }
            }
            if (host.children.length == 0) {
                host.appendChild(document.createElement('div'));
            }
            if (focus && !this.containsFocus()) {
                this.focus();
            }
            this.showSelection();
            this.onLoadedItems();
        }
    };
    ListBox.prototype._click = function (e) {
        if (!e.defaultPrevented) {
            var children = this.hostElement.children;
            for (var index = 0; index < children.length; index++) {
                if (wjcCore.contains(children[index], e.target)) {
                    this.selectedIndex = index;
                    break;
                }
            }
            var index = this.selectedIndex;
            if (this.checkedMemberPath && index > -1) {
                var cb = this._getCheckbox(index);
                if (cb == e.target) {
                    this.setItemChecked(index, cb.checked);
                }
            }
        }
    };
    ListBox.prototype._keydown = function (e) {
        var index = this.selectedIndex, host = this.hostElement, children = host.children;
        if (e.defaultPrevented)
            return;
        if (e.keyCode == 65 && (e.ctrlKey || e.metaKey)) {
            if (this.checkedMemberPath && wjcCore.hasItems(this.collectionView)) {
                this.checkedItems = this.getItemChecked(0) ? [] : this.collectionView.items;
                e.preventDefault();
                return;
            }
        }
        if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)
            return;
        switch (e.keyCode) {
            case wjcCore.Key.Down:
                e.preventDefault();
                for (var i = this.selectedIndex + 1; i < children.length; i++) {
                    if (this.getDisplayText(i)) {
                        this.selectedIndex = i;
                        break;
                    }
                }
                break;
            case wjcCore.Key.Up:
                e.preventDefault();
                for (var i = this.selectedIndex - 1; i >= 0; i--) {
                    if (this.getDisplayText(i)) {
                        this.selectedIndex = i;
                        break;
                    }
                }
                break;
            case wjcCore.Key.Home:
                e.preventDefault();
                this.selectedIndex = 0;
                break;
            case wjcCore.Key.End:
                e.preventDefault();
                this.selectedIndex = children.length - 1;
                break;
            case wjcCore.Key.PageDown:
                e.preventDefault();
                if (this.selectedIndex > -1) {
                    var index = this.selectedIndex, height = host.offsetHeight, offset = 0;
                    for (var i = index + 1; i < this._cv.items.length; i++) {
                        var itemHeight = children[i].scrollHeight;
                        if (offset + itemHeight > height) {
                            this.selectedIndex = i;
                            break;
                        }
                        offset += itemHeight;
                    }
                    if (this.selectedIndex == index) {
                        this._cv.moveCurrentToLast();
                    }
                }
                break;
            case wjcCore.Key.PageUp:
                e.preventDefault();
                if (this.selectedIndex > -1) {
                    var index = this.selectedIndex, height = host.offsetHeight, offset = 0;
                    for (var i = index - 1; i > 0; i--) {
                        var itemHeight = children[i].scrollHeight;
                        if (offset + itemHeight > height) {
                            this.selectedIndex = i;
                            break;
                        }
                        offset += itemHeight;
                    }
                    if (this.selectedIndex == index) {
                        this._cv.moveCurrentToFirst();
                    }
                }
                break;
            case wjcCore.Key.Space:
                if (this.checkedMemberPath && this.selectedIndex > -1) {
                    var cb = this._getCheckbox(this.selectedIndex);
                    if (cb) {
                        this.hostElement.focus();
                        this.setItemChecked(this.selectedIndex, !cb.checked);
                        e.preventDefault();
                    }
                }
                break;
        }
    };
    ListBox.prototype._keypress = function (e) {
        var _this = this;
        if (e.defaultPrevented)
            return;
        if (e.target instanceof HTMLInputElement)
            return;
        if (e.charCode > 32 || (e.charCode == 32 && this._search)) {
            e.preventDefault();
            this._search += String.fromCharCode(e.charCode).toLowerCase();
            if (this._toSearch) {
                clearTimeout(this._toSearch);
            }
            this._toSearch = setTimeout(function () {
                _this._toSearch = null;
                _this._search = '';
            }, ListBox._AUTOSEARCH_DELAY);
            var index = this._findNext();
            if (index < 0 && this._search.length > 1) {
                this._search = this._search[this._search.length - 1];
                index = this._findNext();
            }
            if (index > -1) {
                this.selectedIndex = index;
            }
        }
    };
    ListBox.prototype._findNext = function () {
        if (this.hostElement) {
            var cnt = this.hostElement.childElementCount, start = this.selectedIndex;
            if (start < 0 || this._search.length == 1) {
                start++;
            }
            for (var off = 0; off < cnt; off++) {
                var index = (start + off) % cnt, txt = this.getDisplayText(index).trim().toLowerCase();
                if (txt.indexOf(this._search) == 0) {
                    return index;
                }
            }
        }
        return -1;
    };
    ListBox.prototype._getCheckbox = function (index) {
        var host = this.hostElement;
        if (host && index > -1 && index < host.children.length) {
            return host.children[index].querySelector('input[type=checkbox]');
        }
        return null;
    };
    ListBox.prototype._populateSelectElement = function (hostElement) {
        var children = hostElement.children, items = [], selIndex = -1;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.tagName == 'OPTION') {
                if (child.hasAttribute('selected')) {
                    selIndex = items.length;
                }
                if (child.innerHTML) {
                    items.push({
                        hdr: child.innerHTML,
                        val: child.getAttribute('value'),
                        cmdParam: child.getAttribute('cmd-param')
                    });
                }
                else {
                    items.push({
                        hdr: '<div class="wj-separator"/>'
                    });
                }
                hostElement.removeChild(child);
                i--;
            }
        }
        if (items) {
            this.displayMemberPath = 'hdr';
            this.selectedValuePath = 'val';
            this.itemsSource = items;
            this.selectedIndex = selIndex;
        }
    };
    return ListBox;
}(wjcCore.Control));
ListBox._AUTOSEARCH_DELAY = 600;
exports.ListBox = ListBox;
var FormatItemEventArgs = (function (_super) {
    __extends(FormatItemEventArgs, _super);
    function FormatItemEventArgs(index, data, item) {
        var _this = _super.call(this) || this;
        _this._index = wjcCore.asNumber(index);
        _this._data = data;
        _this._item = wjcCore.asType(item, HTMLElement);
        return _this;
    }
    Object.defineProperty(FormatItemEventArgs.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormatItemEventArgs.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormatItemEventArgs.prototype, "item", {
        get: function () {
            return this._item;
        },
        enumerable: true,
        configurable: true
    });
    return FormatItemEventArgs;
}(wjcCore.EventArgs));
exports.FormatItemEventArgs = FormatItemEventArgs;
'use strict';
var ComboBox = (function (_super) {
    __extends(ComboBox, _super);
    function ComboBox(element, options) {
        var _this = _super.call(this, element) || this;
        _this._editable = false;
        _this._delKey = 0;
        _this._composing = false;
        _this._settingText = false;
        _this._pathHdr = new wjcCore.Binding(null);
        _this.selectedIndexChanged = new wjcCore.Event();
        wjcCore.addClass(_this.hostElement, 'wj-combobox');
        _this.autoExpandSelection = false;
        _this.addEventListener(_this._tbx, 'compositionstart', function () {
            _this._composing = true;
        });
        _this.addEventListener(_this._tbx, 'compositionend', function () {
            _this._composing = false;
            setTimeout(function () {
                _this._setText(_this.text, true);
            });
        });
        _this.addEventListener(_this.hostElement, 'wheel', function (e) {
            if (!e.defaultPrevented && !_this.isDroppedDown && !_this.isReadOnly && _this.containsFocus()) {
                if (_this.selectedIndex > -1) {
                    var step = wjcCore.clamp(-e.deltaY, -1, +1);
                    _this.selectedIndex = wjcCore.clamp(_this.selectedIndex - step, 0, _this.collectionView.items.length - 1);
                    e.preventDefault();
                }
            }
        });
        if (_this._orgTag == 'SELECT') {
            _this._lbx._populateSelectElement(_this.hostElement);
        }
        _this._lbx.loadedItems.addHandler(function () {
            if (_this.selectedIndex > -1) {
                _this.selectedIndex = _this._lbx.selectedIndex;
            }
        });
        _this.isRequired = true;
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(ComboBox.prototype, "itemsSource", {
        get: function () {
            return this._lbx.itemsSource;
        },
        set: function (value) {
            this._lbx.itemsSource = value;
            this._updateBtn();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBox.prototype, "collectionView", {
        get: function () {
            return this._lbx.collectionView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBox.prototype, "displayMemberPath", {
        get: function () {
            return this._lbx.displayMemberPath;
        },
        set: function (value) {
            this._lbx.displayMemberPath = value;
            var text = this.getDisplayText();
            if (this.text != text) {
                this._setText(text, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBox.prototype, "headerPath", {
        get: function () {
            return this._pathHdr.path;
        },
        set: function (value) {
            this._pathHdr.path = wjcCore.asString(value);
            var text = this.getDisplayText();
            if (this.text != text) {
                this._setText(text, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBox.prototype, "selectedValuePath", {
        get: function () {
            return this._lbx.selectedValuePath;
        },
        set: function (value) {
            this._lbx.selectedValuePath = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBox.prototype, "isContentHtml", {
        get: function () {
            return this._lbx.isContentHtml;
        },
        set: function (value) {
            if (value != this.isContentHtml) {
                this._lbx.isContentHtml = wjcCore.asBoolean(value);
                var text = this.getDisplayText();
                if (this.text != text) {
                    this._setText(text, true);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBox.prototype, "itemFormatter", {
        get: function () {
            return this._lbx.itemFormatter;
        },
        set: function (value) {
            this._lbx.itemFormatter = wjcCore.asFunction(value);
            this.selectedIndex = this._lbx.selectedIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBox.prototype, "formatItem", {
        get: function () {
            return this.listBox.formatItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBox.prototype, "selectedIndex", {
        get: function () {
            return this._lbx.selectedIndex;
        },
        set: function (value) {
            if (value != this.selectedIndex) {
                this._lbx.selectedIndex = value;
            }
            value = this.selectedIndex;
            var text = this.getDisplayText(value);
            if (this.text != text) {
                this._setText(text, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBox.prototype, "selectedItem", {
        get: function () {
            return this._lbx.selectedItem;
        },
        set: function (value) {
            this._lbx.selectedItem = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBox.prototype, "selectedValue", {
        get: function () {
            return this._lbx.selectedValue;
        },
        set: function (value) {
            this._lbx.selectedValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBox.prototype, "isEditable", {
        get: function () {
            return this._editable;
        },
        set: function (value) {
            this._editable = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBox.prototype, "maxDropDownHeight", {
        get: function () {
            return this._lbx.maxHeight;
        },
        set: function (value) {
            this._lbx.maxHeight = wjcCore.asNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBox.prototype, "maxDropDownWidth", {
        get: function () {
            var lbx = this._dropDown;
            return parseInt(lbx.style.maxWidth);
        },
        set: function (value) {
            var lbx = this._dropDown;
            lbx.style.maxWidth = wjcCore.asNumber(value) + 'px';
        },
        enumerable: true,
        configurable: true
    });
    ComboBox.prototype.getDisplayText = function (index) {
        if (index === void 0) { index = this.selectedIndex; }
        if (this.headerPath && index > -1 && wjcCore.hasItems(this.collectionView)) {
            var item = this.collectionView.items[index], text = item ? this._pathHdr.getValue(item) : null;
            text = text != null ? text.toString() : '';
            if (this.isContentHtml) {
                if (!this._cvt) {
                    this._cvt = document.createElement('div');
                }
                this._cvt.innerHTML = text;
                text = this._cvt.textContent;
            }
            return text.trim();
        }
        return this._lbx.getDisplayText(index).trim();
    };
    ComboBox.prototype.onSelectedIndexChanged = function (e) {
        this._updateBtn();
        this.selectedIndexChanged.raise(this, e);
    };
    ComboBox.prototype.indexOf = function (text, fullMatch) {
        var cv = this.collectionView;
        if (wjcCore.hasItems(cv) && text != null) {
            var index = this.selectedIndex;
            if (fullMatch && text == this.getDisplayText(index)) {
                return index;
            }
            text = text.toString().toLowerCase();
            for (var i = 0; i < cv.items.length; i++) {
                var t = this.getDisplayText(i).toLowerCase();
                if (fullMatch) {
                    if (t == text) {
                        return i;
                    }
                }
                else {
                    if (text && t.indexOf(text) == 0) {
                        return i;
                    }
                }
            }
        }
        return -1;
    };
    Object.defineProperty(ComboBox.prototype, "listBox", {
        get: function () {
            return this._lbx;
        },
        enumerable: true,
        configurable: true
    });
    ComboBox.prototype.refresh = function (fullUpdate) {
        _super.prototype.refresh.call(this, fullUpdate);
        if (wjcCore.hasItems(this.collectionView)) {
            this._lbx.refresh();
            if (this.selectedIndex > -1) {
                this.selectedIndex = this._lbx.selectedIndex;
            }
        }
    };
    ComboBox.prototype.onLostFocus = function (e) {
        if (this._composing) {
            this._composing = false;
            this._setText(this.text, true);
        }
        if (this.isEditable && this.isRequired && !this.text) {
            if (wjcCore.hasItems(this.collectionView)) {
                this.selectedIndex = 0;
            }
        }
        _super.prototype.onLostFocus.call(this, e);
    };
    ComboBox.prototype.onIsDroppedDownChanging = function (e) {
        if (!this.isDroppedDown && !wjcCore.hasItems(this.collectionView)) {
            e.cancel = true;
            return false;
        }
        return _super.prototype.onIsDroppedDownChanging.call(this, e);
    };
    ComboBox.prototype.onIsDroppedDownChanged = function (e) {
        _super.prototype.onIsDroppedDownChanged.call(this, e);
        if (this.isDroppedDown) {
            this._lbx.showSelection();
            if (!this.isTouching) {
                this.selectAll();
            }
        }
    };
    ComboBox.prototype._updateBtn = function () {
        var cv = this.collectionView;
        this._btn.style.display = (this._showBtn && cv != null) ? '' : 'none';
        wjcCore.enable(this._btn, wjcCore.hasItems(cv));
    };
    ComboBox.prototype._createDropDown = function () {
        var _this = this;
        this._lbx = new ListBox(this._dropDown);
        this._lbx.maxHeight = 200;
        this._lbx.selectedIndexChanged.addHandler(function () {
            _this._updateBtn();
            _this.selectedIndex = _this._lbx.selectedIndex;
            _this.onSelectedIndexChanged();
        });
        this._lbx.itemsChanged.addHandler(function () {
            _this._updateBtn();
        });
        this.addEventListener(this._dropDown, 'click', this._dropDownClick.bind(this));
    };
    ComboBox.prototype._dropDownClick = function (e) {
        if (!e.defaultPrevented) {
            if (e.target != this._dropDown) {
                this.isDroppedDown = false;
            }
        }
    };
    ComboBox.prototype._setText = function (text, fullMatch) {
        if (this._composing)
            return;
        if (this._settingText)
            return;
        this._settingText = true;
        if (text == null)
            text = '';
        text = text.toString();
        var index = this.selectedIndex, cv = this.collectionView, start = this._getSelStart(), len = -1;
        if (this._delKey) {
            fullMatch = true;
            if (this._delKey == wjcCore.Key.Back && text.length > 0 && !this.isEditable && wjcCore.hasItems(cv)) {
                start--;
                text = text.substr(0, start);
            }
        }
        if (this._delKey) {
            index = this.indexOf(text, true);
        }
        else {
            index = this.indexOf(text, fullMatch);
            if (index < 0 && fullMatch) {
                index = this.indexOf(text, false);
            }
            if (index < 0 && start > 0) {
                index = this.indexOf(text.substr(0, start), false);
            }
        }
        if (index < 0 && !this.isEditable && wjcCore.hasItems(cv)) {
            if (this.isRequired || text) {
                var oldText = this._oldText || '';
                index = Math.max(0, this.indexOf(oldText, false));
                for (var i = 0; i < text.length && i < oldText.length; i++) {
                    if (text[i] != oldText[i]) {
                        start = i;
                        break;
                    }
                }
            }
        }
        if (index > -1) {
            len = start;
            text = this.getDisplayText(index);
        }
        if (text != this._tbx.value) {
            this._tbx.value = text;
        }
        if (len > -1 && this.containsFocus() && !this.isTouching) {
            this._setSelRange(len, text.length);
        }
        if (cv) {
            cv.moveCurrentToPosition(index);
        }
        _super.prototype._setText.call(this, text, fullMatch);
        this._delKey = 0;
        this._settingText = false;
    };
    ComboBox.prototype._findNext = function (text, step) {
        if (this.collectionView) {
            text = text.toLowerCase();
            var len = this.collectionView.items.length, index, t;
            for (var i = 1; i <= len; i++) {
                index = (this.selectedIndex + i * step + len) % len;
                t = this.getDisplayText(index).toLowerCase();
                if (t && t.indexOf(text) == 0) {
                    var item = this.dropDown.children[index];
                    if (!item || !item.getAttribute('disabled')) {
                        return index;
                    }
                }
            }
        }
        return this.selectedIndex;
    };
    ComboBox.prototype._keydown = function (e) {
        _super.prototype._keydown.call(this, e);
        if (e.defaultPrevented || this.isReadOnly) {
            return;
        }
        if (this._elRef != this._tbx) {
            return;
        }
        if (e.keyCode == wjcCore.Key.Back || e.keyCode == wjcCore.Key.Delete) {
            this._delKey = e.keyCode;
        }
        if (!wjcCore.hasItems(this.collectionView)) {
            return;
        }
        switch (e.keyCode) {
            case wjcCore.Key.Up:
            case wjcCore.Key.Down:
                var start = this._getSelStart();
                if (start == this.text.length) {
                    start = 0;
                }
                ;
                this.selectedIndex = this._findNext(this.text.substr(0, start), e.keyCode == wjcCore.Key.Up ? -1 : +1);
                wjcCore.setSelectionRange(this._tbx, start, this.text.length);
                e.preventDefault();
                break;
        }
    };
    ComboBox.prototype._setSelRange = function (start, end) {
        if (this._elRef == this._tbx) {
            wjcCore.setSelectionRange(this._tbx, start, end);
        }
    };
    ComboBox.prototype._getSelStart = function () {
        return this._tbx && this._tbx.value
            ? this._tbx.selectionStart
            : 0;
    };
    return ComboBox;
}(DropDown));
exports.ComboBox = ComboBox;
'use strict';
var AutoComplete = (function (_super) {
    __extends(AutoComplete, _super);
    function AutoComplete(element, options) {
        var _this = _super.call(this, element) || this;
        _this._cssMatch = 'wj-autocomplete-match';
        _this._minLength = 2;
        _this._maxItems = 6;
        _this._itemCount = 0;
        _this._delay = 500;
        _this._query = '';
        _this._inCallback = false;
        _this._srchProps = [];
        wjcCore.addClass(_this.hostElement, 'wj-autocomplete');
        _this.isEditable = true;
        _this.isRequired = false;
        _this.isContentHtml = true;
        _this.listBox.formatItem.addHandler(_this._formatListItem, _this);
        _this._itemsSourceFnCallBackBnd = _this._itemSourceFunctionCallback.bind(_this);
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(AutoComplete.prototype, "minLength", {
        get: function () {
            return this._minLength;
        },
        set: function (value) {
            this._minLength = wjcCore.asNumber(value, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoComplete.prototype, "maxItems", {
        get: function () {
            return this._maxItems;
        },
        set: function (value) {
            this._maxItems = wjcCore.asNumber(value, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoComplete.prototype, "delay", {
        get: function () {
            return this._delay;
        },
        set: function (value) {
            this._delay = wjcCore.asNumber(value, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoComplete.prototype, "searchMemberPath", {
        get: function () {
            return this._srchProp;
        },
        set: function (value) {
            this._srchProp = wjcCore.asString(value);
            this._srchProps = value ? value.trim().split(/\s*,\s*/) : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoComplete.prototype, "itemsSourceFunction", {
        get: function () {
            return this._itemsSourceFn;
        },
        set: function (value) {
            this._itemsSourceFn = wjcCore.asFunction(value);
            if (wjcCore.isFunction(this._itemsSourceFn)) {
                this.itemsSourceFunction(this.text, this.maxItems, this._itemsSourceFnCallBackBnd);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoComplete.prototype, "cssMatch", {
        get: function () {
            return this._cssMatch;
        },
        set: function (value) {
            this._cssMatch = wjcCore.asString(value);
        },
        enumerable: true,
        configurable: true
    });
    AutoComplete.prototype._keydown = function (e) {
        if (!e.defaultPrevented && this.isDroppedDown) {
            switch (e.keyCode) {
                case wjcCore.Key.Up:
                case wjcCore.Key.Down:
                    this.selectAll();
                    break;
            }
        }
        _super.prototype._keydown.call(this, e);
    };
    AutoComplete.prototype._setText = function (text) {
        var _this = this;
        if (this._inCallback) {
            return;
        }
        if (!text && this.selectedIndex > -1) {
            this.selectedIndex = -1;
        }
        if (text != this._oldText) {
            if (this._tbx.value != text) {
                this._tbx.value = text;
            }
            this._oldText = text;
            this.onTextChanged();
            if (!text && this.collectionView) {
                this.collectionView.filter = this._query = null;
                this.isDroppedDown = false;
                return;
            }
        }
        if (this._toSearch) {
            clearTimeout(this._toSearch);
        }
        if (text != this.getDisplayText()) {
            this._toSearch = setTimeout(function () {
                _this._toSearch = null;
                var terms = _this.text.trim().toLowerCase();
                if (terms.length >= _this._minLength && terms != _this._query) {
                    _this._query = terms;
                    terms = terms.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
                    _this._rxMatch = new RegExp('(?=.*' + terms.replace(/ /g, ')(?=.*') + ')', 'ig');
                    _this._rxHighlight = _this.isContentHtml
                        ? new RegExp('(' + terms.replace(/ /g, '|') + ')(?![^<]*>|[^<>]* </)', 'ig')
                        : new RegExp('(' + terms.replace(/ /g, '|') + ')', 'ig');
                    if (_this.itemsSourceFunction) {
                        _this.itemsSourceFunction(terms, _this.maxItems, _this._itemsSourceFnCallBackBnd);
                    }
                    else {
                        _this._updateItems();
                    }
                }
            }, this._delay);
        }
    };
    AutoComplete.prototype._itemSourceFunctionCallback = function (result) {
        this._inCallback = true;
        var cv = wjcCore.asCollectionView(result);
        if (cv) {
            cv.moveCurrentToPosition(-1);
        }
        this.itemsSource = cv;
        this._inCallback = false;
        if (this.containsFocus()) {
            this.isDroppedDown = true;
            this.refresh();
        }
    };
    AutoComplete.prototype.onIsDroppedDownChanged = function (e) {
        this.isDroppedDownChanged.raise(this, e);
        this._query = '';
        if (this.containsFocus()) {
            if (this.selectedIndex > -1) {
                this._setText(this.getDisplayText());
                if (!this.isTouching) {
                    this.selectAll();
                }
            }
            else if (!this.isTouching) {
                this._tbx.focus();
            }
        }
    };
    AutoComplete.prototype._updateItems = function () {
        var cv = this.collectionView;
        if (cv) {
            this._inCallback = true;
            cv.beginUpdate();
            this._itemCount = 0;
            cv.filter = this._filter.bind(this);
            cv.moveCurrentToPosition(-1);
            cv.endUpdate();
            this._inCallback = false;
            this.isDroppedDown = cv.items.length > 0 && this.containsFocus();
            if (cv.items.length == 0 && !this.isEditable) {
                this.selectedIndex = -1;
            }
            this.refresh();
        }
    };
    AutoComplete.prototype._filter = function (item) {
        if (this._itemCount >= this._maxItems) {
            return false;
        }
        var text = this._getItemText(item, false);
        if (this._srchProps) {
            for (var i = 0; i < this._srchProps.length; i++) {
                text += '\0' + item[this._srchProps[i]];
            }
        }
        if (this.isContentHtml) {
            text = text.replace(/<[^>]*>/g, '');
        }
        if (text.match(this._rxMatch)) {
            this._itemCount++;
            return true;
        }
        return false;
    };
    AutoComplete.prototype._getItemText = function (item, header) {
        var text = item ? item.toString() : '', binding = header && this.headerPath
            ? this._pathHdr
            : this._lbx._pathDisplay;
        if (binding) {
            text = binding.getValue(item);
        }
        return text;
    };
    AutoComplete.prototype._formatListItem = function (sender, e) {
        if (this._cssMatch) {
            var highlight = '<span class="' + this._cssMatch + '">$1</span>';
            e.item.innerHTML = e.item.innerHTML.replace(this._rxHighlight, highlight);
        }
    };
    return AutoComplete;
}(ComboBox));
exports.AutoComplete = AutoComplete;
'use strict';
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu(element, options) {
        var _this = _super.call(this, element) || this;
        _this.itemClicked = new wjcCore.Event();
        wjcCore.addClass(_this.hostElement, 'wj-menu');
        _this._tbx.style.display = 'none';
        var tpl = '<div wj-part="header" class="wj-form-control" style="cursor:default"/>';
        _this._hdr = wjcCore.createElement(tpl);
        _this._tbx.parentElement.insertBefore(_this._hdr, _this._tbx);
        _this._elRef = _this._hdr;
        _this.isRequired = false;
        if (_this._orgTag == 'SELECT') {
            _this.header = _this.hostElement.getAttribute('header');
            if (_this._lbx.itemsSource) {
                _this.commandParameterPath = 'cmdParam';
            }
        }
        _this.isContentHtml = true;
        _this.maxDropDownHeight = 500;
        _this.addEventListener(_this._hdr, 'click', function (e) {
            if (!e.defaultPrevented) {
                if (_this._isButton) {
                    _this.isDroppedDown = false;
                    _this._raiseCommand();
                }
                else {
                    _this.isDroppedDown = !_this.isDroppedDown;
                }
            }
        });
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(Menu.prototype, "header", {
        get: function () {
            return this._hdr.innerHTML;
        },
        set: function (value) {
            this._hdr.innerHTML = wjcCore.asString(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "command", {
        get: function () {
            return this._command;
        },
        set: function (value) {
            this._command = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "commandPath", {
        get: function () {
            return this._cmdPath;
        },
        set: function (value) {
            this._cmdPath = wjcCore.asString(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "commandParameterPath", {
        get: function () {
            return this._cmdParamPath;
        },
        set: function (value) {
            this._cmdParamPath = wjcCore.asString(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "isButton", {
        get: function () {
            return this._isButton;
        },
        set: function (value) {
            this._isButton = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            this._owner = wjcCore.asType(value, HTMLElement, true);
            this._enableDisableItems();
        },
        enumerable: true,
        configurable: true
    });
    Menu.prototype.show = function (position) {
        if (!this.isDroppedDown) {
            var dd = this.dropDown;
            this.selectedIndex = -1;
            if (this.onIsDroppedDownChanging(new wjcCore.CancelEventArgs())) {
                wjcCore.showPopup(dd, position);
                this.onIsDroppedDownChanged();
                dd.focus();
            }
        }
    };
    Menu.prototype.hide = function () {
        if (this.isDroppedDown) {
            if (this.onIsDroppedDownChanging(new wjcCore.CancelEventArgs())) {
                wjcCore.hidePopup(this.dropDown);
                this.onIsDroppedDownChanged();
            }
        }
    };
    Menu.prototype.onItemClicked = function (e) {
        this.itemClicked.raise(this, e);
    };
    Menu.prototype.onIsDroppedDownChanged = function (e) {
        _super.prototype.onIsDroppedDownChanged.call(this, e);
        if (this.isDroppedDown) {
            this._closing = true;
            this._defaultItem = this.selectedItem;
            this.isRequired = false;
            this.selectedIndex = -1;
            this._enableDisableItems();
            this._closing = false;
            this.dropDown.focus();
        }
        else {
            if (!this.selectedItem) {
                this.selectedItem = this._defaultItem;
            }
        }
    };
    Menu.prototype._keydown = function (e) {
        if (!e.defaultPrevented) {
            if (e.keyCode == wjcCore.Key.Enter) {
                if (this.isDroppedDown) {
                    if (this.getDisplayText(this.selectedIndex)) {
                        this._raiseCommand();
                    }
                }
                else {
                    this.isDroppedDown = true;
                    e.preventDefault();
                }
            }
        }
        _super.prototype._keydown.call(this, e);
    };
    Menu.prototype._dropDownClick = function (e) {
        if (!e.defaultPrevented && e.target != this.dropDown) {
            if (this.getDisplayText(this.selectedIndex)) {
                this._raiseCommand();
            }
        }
        _super.prototype._dropDownClick.call(this, e);
    };
    Menu.prototype._raiseCommand = function (e) {
        var item = this.selectedItem, cmd = this._getCommand(item);
        if (cmd) {
            var parm = this._cmdParamPath ? item[this._cmdParamPath] : null;
            if (!this._canExecuteCommand(cmd, parm)) {
                return;
            }
            this._executeCommand(cmd, parm);
        }
        this.onItemClicked(e);
    };
    Menu.prototype._getCommand = function (item) {
        var cmd = item && this.commandPath ? item[this.commandPath] : null;
        return cmd ? cmd : this.command;
    };
    Menu.prototype._executeCommand = function (cmd, parm) {
        if (cmd && !wjcCore.isFunction(cmd)) {
            cmd = cmd['executeCommand'];
        }
        if (wjcCore.isFunction(cmd)) {
            cmd(parm);
        }
    };
    Menu.prototype._canExecuteCommand = function (cmd, parm) {
        if (cmd) {
            var x = cmd['canExecuteCommand'];
            if (wjcCore.isFunction(x)) {
                return x(parm);
            }
        }
        return true;
    };
    Menu.prototype._enableDisableItems = function () {
        if (this.collectionView && (this.command || this.commandPath)) {
            var items = this.collectionView.items;
            for (var i = 0; i < items.length; i++) {
                var cmd = this._getCommand(items[i]), parm = this.commandParameterPath ? items[i][this.commandParameterPath] : null;
                if (cmd) {
                    var el = this._lbx.hostElement.children[i];
                    wjcCore.toggleClass(el, 'wj-state-disabled', !this._canExecuteCommand(cmd, parm));
                }
            }
        }
    };
    return Menu;
}(ComboBox));
exports.Menu = Menu;
wjcCore.culture.MultiSelect = window['wijmo'].culture.MultiSelect || {
    itemsSelected: '{count:n0} items selected'
};
'use strict';
var MultiSelect = (function (_super) {
    __extends(MultiSelect, _super);
    function MultiSelect(element, options) {
        var _this = _super.call(this, element) || this;
        _this._maxHdrItems = 2;
        _this._readOnly = false;
        _this._hdrFmt = wjcCore.culture.MultiSelect.itemsSelected;
        _this.checkedItemsChanged = new wjcCore.Event();
        wjcCore.addClass(_this.hostElement, 'wj-multiselect');
        _this._tbx.readOnly = true;
        _this.checkedMemberPath = null;
        _this.addEventListener(_this.inputElement, 'click', function () {
            _this.isDroppedDown = !_this.isDroppedDown;
        });
        _this.removeEventListener(_this.dropDown, 'click');
        _this._updateHeader();
        _this.listBox.itemsChanged.addHandler(function () {
            _this._updateHeader();
        });
        _this.listBox.checkedItemsChanged.addHandler(function () {
            _this._updateHeader();
            _this.onCheckedItemsChanged();
        });
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(MultiSelect.prototype, "checkedMemberPath", {
        get: function () {
            var p = this.listBox.checkedMemberPath;
            return p != MultiSelect._DEF_CHECKED_PATH ? p : null;
        },
        set: function (value) {
            value = wjcCore.asString(value);
            this.listBox.checkedMemberPath = value ? value : MultiSelect._DEF_CHECKED_PATH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelect.prototype, "maxHeaderItems", {
        get: function () {
            return this._maxHdrItems;
        },
        set: function (value) {
            if (this._maxHdrItems != value) {
                this._maxHdrItems = wjcCore.asNumber(value);
                this._updateHeader();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelect.prototype, "headerFormat", {
        get: function () {
            return this._hdrFmt;
        },
        set: function (value) {
            if (value != this._hdrFmt) {
                this._hdrFmt = wjcCore.asString(value);
                this._updateHeader();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelect.prototype, "headerFormatter", {
        get: function () {
            return this._hdrFormatter;
        },
        set: function (value) {
            if (value != this._hdrFormatter) {
                this._hdrFormatter = wjcCore.asFunction(value);
                this._updateHeader();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelect.prototype, "checkedItems", {
        get: function () {
            return this.listBox.checkedItems;
        },
        set: function (value) {
            this.listBox.checkedItems = wjcCore.asArray(value);
        },
        enumerable: true,
        configurable: true
    });
    MultiSelect.prototype.onCheckedItemsChanged = function (e) {
        this.checkedItemsChanged.raise(this, e);
    };
    Object.defineProperty(MultiSelect.prototype, "isReadOnly", {
        get: function () {
            return this._readOnly;
        },
        set: function (value) {
            this._readOnly = wjcCore.asBoolean(value);
            wjcCore.toggleClass(this.hostElement, 'wj-state-readonly', this.isReadOnly);
        },
        enumerable: true,
        configurable: true
    });
    MultiSelect.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        this._updateHeader();
    };
    MultiSelect.prototype.onIsDroppedDownChanged = function (e) {
        var _this = this;
        _super.prototype.onIsDroppedDownChanged.call(this, e);
        if (this.isDroppedDown && this.containsFocus()) {
            setTimeout(function () {
                _this.dropDown.focus();
            }, 200);
        }
    };
    MultiSelect.prototype._setText = function (text, fullMatch) {
    };
    MultiSelect.prototype._keydown = function (e) {
        _super.prototype._keydown.call(this, e);
        if (!e.defaultPrevented && wjcCore.hasItems(this.collectionView) && e.keyCode > 32) {
            this.isDroppedDown = true;
            this.dropDown.focus();
        }
    };
    MultiSelect.prototype._updateHeader = function () {
        if (this._hdrFormatter) {
            this.inputElement.value = this._hdrFormatter();
        }
        else {
            var items = this.checkedItems;
            var hdr = '';
            if (items.length > 0) {
                if (items.length <= this._maxHdrItems) {
                    if (this.displayMemberPath) {
                        for (var i = 0; i < items.length; i++) {
                            items[i] = items[i][this.displayMemberPath];
                        }
                    }
                    hdr = items.join(', ');
                }
                else {
                    hdr = wjcCore.format(this.headerFormat, {
                        count: items.length
                    });
                }
            }
            this.inputElement.value = hdr;
        }
        this._updateState();
    };
    return MultiSelect;
}(ComboBox));
MultiSelect._DEF_CHECKED_PATH = '$checked';
exports.MultiSelect = MultiSelect;
'use strict';
var MultiAutoComplete = (function (_super) {
    __extends(MultiAutoComplete, _super);
    function MultiAutoComplete(element, options) {
        var _this = _super.call(this, element) || this;
        _this._selItems = [];
        _this._lastInputValue = '';
        _this._selPath = new wjcCore.Binding(null);
        _this._notAddItm = false;
        _this.selectedItemsChanged = new wjcCore.Event();
        wjcCore.addClass(_this.hostElement, 'wj-multi-autocomplete');
        _this.showDropDownButton = false;
        _this.initialize(options);
        _this._wjTpl = _this.hostElement.querySelector('.wj-template');
        _this._wjInput = _this.hostElement.querySelector('.wj-input');
        _this.addEventListener(_this.hostElement, 'keyup', _this._keyup.bind(_this), true);
        _this.addEventListener(window, 'resize', _this._adjustInputWidth.bind(_this));
        _this.addEventListener(_this._tbx, 'focus', function () {
            _this._itemOff();
        });
        _this._addHelperInput();
        _this._initSeltems();
        _this.listBox.itemsChanged.addHandler(function () { return _this.selectedIndex = -1; });
        _this._refreshHeader();
        return _this;
    }
    Object.defineProperty(MultiAutoComplete.prototype, "showDropDownButton", {
        set: function (value) {
            this._showBtn = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAutoComplete.prototype, "maxSelectedItems", {
        get: function () {
            return this._maxtems;
        },
        set: function (value) {
            if (this._maxtems != value) {
                this._maxtems = wjcCore.asNumber(value, true);
                this._updateMaxItems();
                this._refreshHeader();
                this._clearSelIndex();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAutoComplete.prototype, "selectedMemberPath", {
        get: function () {
            return this._selPath.path;
        },
        set: function (value) {
            value = wjcCore.asString(value);
            if (value !== this.selectedMemberPath) {
                this._selPath.path = value;
                this._initSeltems();
                this._refreshHeader();
                this.onSelectedItemsChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiAutoComplete.prototype, "selectedItems", {
        get: function () {
            return this._selItems;
        },
        set: function (value) {
            this._selItems = wjcCore.asArray(value);
            if (this.selectedMemberPath && this.selectedMemberPath !== '') {
                if (this._selItems) {
                    for (var i = 0; i < this._selItems.length; i++) {
                        var item = this._selItems[i];
                        this._setSelItem(item, false);
                    }
                }
            }
            this._updateMaxItems();
            this.onSelectedItemsChanged();
            this._refreshHeader();
            this._clearSelIndex();
        },
        enumerable: true,
        configurable: true
    });
    MultiAutoComplete.prototype.onSelectedItemsChanged = function (e) {
        this.selectedItemsChanged.raise(this, e);
    };
    MultiAutoComplete.prototype.onIsDroppedDownChanged = function (e) {
        if (!this.isDroppedDown && this.selectedIndex > -1
            && !this._notAddItm) {
            this._addItem(true);
        }
        this._notAddItm = false;
        _super.prototype.onIsDroppedDownChanged.call(this, e);
    };
    MultiAutoComplete.prototype.refresh = function (fullUpdate) {
        _super.prototype.refresh.call(this, fullUpdate);
        this._initSeltems();
        if (!this.isDroppedDown) {
            this._refreshHeader();
        }
    };
    MultiAutoComplete.prototype._keydown = function (e) {
        if (this.isReadOnly) {
            return;
        }
        if (!e.defaultPrevented) {
            switch (e.keyCode) {
                case wjcCore.Key.Back:
                    this._lastInputValue = this._tbx.value;
                    break;
                case wjcCore.Key.Enter:
                    this._itemOff();
                    this._addItem(true);
                    if (wjcCore.isIE) {
                        wjcCore.setSelectionRange(this._tbx, 0, 0);
                    }
                    break;
                case wjcCore.Key.Tab:
                    if (this.isDroppedDown) {
                        this._addItem(false);
                        this._tbx.value = '';
                        this._lbx.selectedIndex = -1;
                        e.preventDefault();
                    }
                    else {
                        this._updateFocus();
                    }
                    break;
                case wjcCore.Key.Space:
                    if (this._tbx.value !== '') {
                        return;
                    }
                    if (!this.isDroppedDown && !this._tbx.disabled) {
                        this.isDroppedDown = true;
                        this._clearSelIndex();
                    }
                    break;
                case wjcCore.Key.Escape:
                    if (this.isDroppedDown) {
                        this._notAddItm = true;
                    }
                    break;
                case wjcCore.Key.Left:
                    this._itemOn(true);
                    break;
                case wjcCore.Key.Right:
                    this._itemOn(false);
                    break;
                case wjcCore.Key.Up:
                case wjcCore.Key.Down:
                    var activeEle = wjcCore.getActiveElement();
                    if (e.altKey) {
                        if (this._tbx == activeEle) {
                            this.isDroppedDown = !this.isDroppedDown;
                            if (!this.isDroppedDown) {
                                this._tbx.focus();
                            }
                            e.preventDefault();
                            return;
                        }
                    }
                    else if (this._tbx !== activeEle) {
                        return;
                    }
                default:
                    if (e.keyCode === wjcCore.Key.Back || e.keyCode === wjcCore.Key.Delete) {
                        return;
                    }
                    this._itemOff();
                    if (this._maxtems != null &&
                        this._selItems.length >= this._maxtems) {
                        e.preventDefault();
                    }
                    break;
            }
        }
        _super.prototype._keydown.call(this, e);
    };
    MultiAutoComplete.prototype._updateState = function () {
        _super.prototype._updateState.call(this);
        if (!this._wjTpl) {
            return;
        }
        if (wjcCore.hasClass(this.hostElement, 'wj-state-focused') === false) {
            this._itemOff();
        }
    };
    MultiAutoComplete.prototype._keyup = function (e) {
        if (this.isReadOnly) {
            return;
        }
        if (!e.defaultPrevented) {
            switch (e.keyCode) {
                case wjcCore.Key.Back:
                    if (this._tbx.value.length === 0 &&
                        this._lastInputValue.length === 0) {
                        this._delItem(false);
                    }
                    break;
                case wjcCore.Key.Delete:
                    this._delItem(true);
                    break;
            }
        }
    };
    MultiAutoComplete.prototype._addHelperInput = function () {
        var ipt = document.createElement("input");
        ipt.type = 'text';
        ipt.tabIndex = -1;
        ipt.className = 'wj-token-helper';
        ipt.readOnly = true;
        this._wjTpl.insertBefore(ipt, this._wjInput);
        this._helperInput = ipt;
    };
    MultiAutoComplete.prototype._refreshHeader = function () {
        var tokenFields = this.hostElement.querySelectorAll('.wj-token');
        for (var i = 0; i < tokenFields.length; i++) {
            this._wjTpl.removeChild(tokenFields[i]);
        }
        var selectedItms = this.selectedItems;
        if (!selectedItms || selectedItms.length === 0) {
            return;
        }
        if (this.rightToLeft) {
            for (var i = selectedItms.length - 1; i >= 0; i--) {
                this._insertToken(selectedItms[i]);
            }
        }
        else {
            for (var i = 0; i < selectedItms.length; i++) {
                this._insertToken(selectedItms[i]);
            }
        }
        this._adjustInputWidth();
    };
    MultiAutoComplete.prototype._insertToken = function (item) {
        var tokenTxt = this._getItemText(item, true);
        if (this.isContentHtml) {
            if (!this._cvt) {
                this._cvt = document.createElement('div');
            }
            this._cvt.innerHTML = tokenTxt;
            tokenTxt = this._cvt.textContent.trim();
        }
        else {
            tokenTxt = wjcCore.escapeHtml(tokenTxt);
        }
        this._wjTpl.insertBefore(this._createItem(tokenTxt), this._wjInput);
    };
    MultiAutoComplete.prototype._updateMaxItems = function () {
        if (this._maxtems == null || !this._selItems) {
            return;
        }
        if (this._selItems.length > this._maxtems) {
            this._selItems = this._selItems.slice(0, this._maxtems);
        }
    };
    MultiAutoComplete.prototype._updateFocus = function () {
        var _this = this;
        var activeToken = this._wjTpl.querySelector('.' + MultiAutoComplete._clsActive);
        if (activeToken) {
            wjcCore.removeClass(activeToken, MultiAutoComplete._clsActive);
            setTimeout(function () {
                _this._tbx.focus();
            });
        }
        else {
            this._clearSelIndex();
            wjcCore.removeClass(this.hostElement, 'wj-state-focused');
        }
    };
    MultiAutoComplete.prototype._addItem = function (clearSelected) {
        if (this.selectedItems.indexOf(this.selectedItem) > -1) {
            this._clearSelIndex();
            return;
        }
        if (this.selectedIndex > -1) {
            this._updateSelItems(this.selectedItem, true);
            this._refreshHeader();
            if (clearSelected) {
                this._clearSelIndex();
            }
            this._disableInput(true);
        }
    };
    MultiAutoComplete.prototype._delItem = function (isDelKey) {
        var activeToken = this._wjTpl.querySelector('.' + MultiAutoComplete._clsActive), delItem, curIdx, selectedItmsChanged = false;
        if (isDelKey && !activeToken) {
            return;
        }
        if (activeToken) {
            curIdx = this._getItemIndex(activeToken);
            if (curIdx > -1) {
                curIdx = this.rightToLeft ? this._selItems.length - 1 - curIdx : curIdx;
                delItem = this._selItems[curIdx];
                selectedItmsChanged = true;
            }
        }
        else {
            delItem = this._selItems[this.rightToLeft ? 0 : this._selItems.length - 1];
            selectedItmsChanged = true;
        }
        if (selectedItmsChanged) {
            this._updateSelItems(delItem, false);
            this._refreshHeader();
            this._clearSelIndex();
            this._disableInput(false);
        }
        this._tbx.focus();
    };
    MultiAutoComplete.prototype._updateSelItems = function (itm, isAdd) {
        if (isAdd) {
            if (!this._selItems || this._selItems.length === 0) {
                this._selItems = [];
            }
            if (this._maxtems != null &&
                this._selItems.length >= this._maxtems) {
                return;
            }
            this._selItems.push(itm);
        }
        else {
            var idx = this._selItems.indexOf(itm);
            this._selItems.splice(idx, 1);
        }
        if (this._hasSelectedMemeberPath()) {
            this._setSelItem(itm, isAdd);
        }
        this.onSelectedItemsChanged();
    };
    MultiAutoComplete.prototype._createItem = function (tokenTxt) {
        var _this = this;
        var container = document.createElement("div"), tSpan = document.createElement("span"), closeBtn = document.createElement("a");
        container.appendChild(tSpan);
        container.appendChild(closeBtn);
        container.className = 'wj-token';
        tSpan.className = 'wj-token-label';
        tSpan.innerHTML = tokenTxt;
        closeBtn.className = 'wj-token-close';
        closeBtn.href = '#';
        closeBtn.tabIndex = -1;
        closeBtn.text = '×';
        this.addEventListener(container, 'click', function (e) {
            _this._helperInput.focus();
            var activeToken = _this._wjTpl.querySelector('.' + MultiAutoComplete._clsActive);
            if (activeToken) {
                wjcCore.removeClass(activeToken, MultiAutoComplete._clsActive);
            }
            wjcCore.addClass(container, MultiAutoComplete._clsActive);
            e.stopPropagation();
            e.preventDefault();
        });
        this.addEventListener(closeBtn, 'click', function (e) {
            if (_this.isReadOnly) {
                return;
            }
            var curIdx = _this._getItemIndex(container);
            if (curIdx > -1) {
                var delItem = _this._selItems[_this.rightToLeft ? _this._selItems.length - 1 - curIdx : curIdx];
                _this._updateSelItems(delItem, false);
            }
            _this._wjTpl.removeChild(container);
            _this._adjustInputWidth();
            _this._disableInput(false);
            _this._tbx.focus();
            e.stopPropagation();
            e.preventDefault();
        });
        return container;
    };
    MultiAutoComplete.prototype._itemOn = function (isPrev) {
        var activeElement = wjcCore.getActiveElement(), tokes, activeToken, activeTokenIdx;
        if (this._tbx == activeElement &&
            this._tbx.value.length !== 0) {
            return;
        }
        tokes = this._wjTpl.querySelectorAll('.wj-token');
        if (tokes.length === 0) {
            return;
        }
        activeToken = this._wjTpl.querySelector('.' + MultiAutoComplete._clsActive);
        activeTokenIdx = this._getItemIndex(activeToken);
        if (isPrev) {
            if (activeTokenIdx === 0) {
                return;
            }
            if (activeTokenIdx === -1) {
                wjcCore.addClass(tokes[tokes.length - 1], MultiAutoComplete._clsActive);
                this._helperInput.focus();
            }
            else {
                wjcCore.removeClass(activeToken, MultiAutoComplete._clsActive);
                wjcCore.addClass(tokes[activeTokenIdx - 1], MultiAutoComplete._clsActive);
                this._helperInput.focus();
            }
        }
        else if (!isPrev) {
            if (activeTokenIdx === -1) {
                return;
            }
            if (activeTokenIdx !== tokes.length - 1) {
                wjcCore.removeClass(activeToken, MultiAutoComplete._clsActive);
                wjcCore.addClass(tokes[activeTokenIdx + 1], MultiAutoComplete._clsActive);
                this._helperInput.focus();
            }
            else {
                wjcCore.removeClass(activeToken, MultiAutoComplete._clsActive);
                this._tbx.focus();
            }
        }
    };
    MultiAutoComplete.prototype._itemOff = function () {
        var token = this._wjTpl.querySelector('.' + MultiAutoComplete._clsActive);
        if (token) {
            wjcCore.removeClass(token, MultiAutoComplete._clsActive);
        }
    };
    MultiAutoComplete.prototype._initSeltems = function () {
        if (this.selectedMemberPath && this.selectedMemberPath !== '') {
            var cv = this.itemsSource;
            this._selItems.splice(0, this._selItems.length);
            if (cv) {
                for (var i = 0; i < cv.sourceCollection.length; i++) {
                    if (this._getSelItem(i)) {
                        this._selItems.push(cv.sourceCollection[i]);
                    }
                }
            }
        }
    };
    MultiAutoComplete.prototype._getSelItem = function (index) {
        var cv = this.itemsSource.sourceCollection, item = cv[index];
        if (wjcCore.isObject(item) && this.selectedMemberPath) {
            return this._selPath.getValue(item);
        }
        return false;
    };
    MultiAutoComplete.prototype._setSelItem = function (item, selected) {
        var cv = this.itemsSource;
        if (wjcCore.isObject(item)) {
            if (this._selPath.getValue(item) != selected) {
                this._selPath.setValue(item, selected);
            }
        }
    };
    MultiAutoComplete.prototype._clearSelIndex = function () {
        this.selectedIndex = -1;
    };
    MultiAutoComplete.prototype._hasSelectedMemeberPath = function () {
        return this.selectedMemberPath && this.selectedMemberPath !== '';
    };
    MultiAutoComplete.prototype._disableInput = function (disabled) {
        if (this._maxtems != null) {
            if (this._selItems.length < this._maxtems) {
                this._tbx.disabled = false;
                this._tbx.focus();
            }
            else {
                this._tbx.disabled = true;
                this.hostElement.focus();
            }
        }
    };
    MultiAutoComplete.prototype._adjustInputWidth = function () {
        this._tbx.style.width = '60px';
        var offsetHost = wjcCore.getElementRect(this.hostElement), offsetInput = wjcCore.getElementRect(this._tbx), inputCss = getComputedStyle(this._tbx), inputPaddingLeft = parseInt(inputCss.paddingLeft, 10), inputPaddingRight = parseInt(inputCss.paddingRight, 10);
        var width = offsetHost.left + offsetHost.width - offsetInput.left -
            inputPaddingLeft - inputPaddingRight - 8;
        this._tbx.style.width = width + 'px';
    };
    MultiAutoComplete.prototype._getItemIndex = function (token) {
        var items = this.hostElement.querySelectorAll('.wj-token');
        for (var i = 0; i < items.length; i++) {
            if (token === items[i]) {
                return i;
            }
        }
        return -1;
    };
    return MultiAutoComplete;
}(AutoComplete));
MultiAutoComplete._clsActive = 'wj-token-active';
exports.MultiAutoComplete = MultiAutoComplete;
'use strict';
var PopupTrigger;
(function (PopupTrigger) {
    PopupTrigger[PopupTrigger["None"] = 0] = "None";
    PopupTrigger[PopupTrigger["Click"] = 1] = "Click";
    PopupTrigger[PopupTrigger["Blur"] = 2] = "Blur";
    PopupTrigger[PopupTrigger["ClickOrBlur"] = 3] = "ClickOrBlur";
})(PopupTrigger = exports.PopupTrigger || (exports.PopupTrigger = {}));
var Popup = (function (_super) {
    __extends(Popup, _super);
    function Popup(element, options) {
        var _this = _super.call(this, element, null, true) || this;
        _this._showTrigger = PopupTrigger.Click;
        _this._hideTrigger = PopupTrigger.Blur;
        _this._fadeIn = true;
        _this._fadeOut = true;
        _this._click = _this._handleClick.bind(_this);
        _this._mousedown = _this._handleMouseDown.bind(_this);
        _this._visible = false;
        _this.showing = new wjcCore.Event();
        _this.shown = new wjcCore.Event();
        _this.hiding = new wjcCore.Event();
        _this.hidden = new wjcCore.Event();
        var host = _this.hostElement;
        wjcCore.addClass(host, 'wj-control wj-content wj-popup');
        if (!host.getAttribute('tabindex')) {
            host.tabIndex = 0;
        }
        wjcCore.hidePopup(host, false);
        _this.addEventListener(host, 'keydown', function (e) {
            if (!e.defaultPrevented) {
                if (e.keyCode == wjcCore.Key.Escape) {
                    e.preventDefault();
                    _this.hide();
                }
                if (e.keyCode == wjcCore.Key.Enter) {
                    var result = _this.dialogResultEnter;
                    if (result) {
                        e.preventDefault();
                        _this._validateAndHide(result);
                    }
                }
            }
        });
        _this.addEventListener(host, 'keydown', function (e) {
            if (!e.defaultPrevented && _this.modal && e.keyCode == wjcCore.Key.Tab) {
                e.preventDefault();
                wjcCore.moveFocus(_this.hostElement, e.shiftKey ? -1 : +1);
            }
        });
        _this.addEventListener(host, 'click', function (e) {
            if (e.target instanceof HTMLElement) {
                var target = e.target, match = target.className.match(/\bwj-hide[\S]*\b/);
                if (match && match.length > 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    _this.hide(match[0]);
                }
            }
        });
        _this.addEventListener(document, 'wheel', function (e) {
            if (_this.isVisible && _this._modal) {
                for (var t = e.target; t && t != document.body; t = t.parentElement) {
                    if (t.scrollHeight > t.clientHeight) {
                        return;
                    }
                }
                e.preventDefault();
                e.stopPropagation();
            }
        });
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(Popup.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            if (this._owner) {
                this.removeEventListener(this._owner, 'mousedown');
                this.removeEventListener(this._owner, 'click');
            }
            this._owner = value != null ? wjcCore.getElement(value) : null;
            if (this._owner) {
                this.addEventListener(this._owner, 'mousedown', this._mousedown, true);
                this.addEventListener(this._owner, 'click', this._click, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Popup.prototype, "content", {
        get: function () {
            return this.hostElement.firstElementChild;
        },
        set: function (value) {
            if (value != this.content) {
                this.hostElement.innerHTML = '';
                if (value instanceof HTMLElement) {
                    this.hostElement.appendChild(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Popup.prototype, "showTrigger", {
        get: function () {
            return this._showTrigger;
        },
        set: function (value) {
            this._showTrigger = wjcCore.asEnum(value, PopupTrigger);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Popup.prototype, "hideTrigger", {
        get: function () {
            return this._hideTrigger;
        },
        set: function (value) {
            this._hideTrigger = wjcCore.asEnum(value, PopupTrigger);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Popup.prototype, "fadeIn", {
        get: function () {
            return this._fadeIn;
        },
        set: function (value) {
            this._fadeIn = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Popup.prototype, "fadeOut", {
        get: function () {
            return this._fadeOut;
        },
        set: function (value) {
            this._fadeOut = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Popup.prototype, "modal", {
        get: function () {
            return this._modal;
        },
        set: function (value) {
            this._modal = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Popup.prototype, "dialogResult", {
        get: function () {
            return this._result;
        },
        set: function (value) {
            this._result = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Popup.prototype, "dialogResultEnter", {
        get: function () {
            return this._resultEnter;
        },
        set: function (value) {
            this._resultEnter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Popup.prototype, "isVisible", {
        get: function () {
            var host = this.hostElement;
            return this._visible && host && host.style.display != 'none';
        },
        enumerable: true,
        configurable: true
    });
    Popup.prototype.show = function (modal, handleResult) {
        var _this = this;
        if (!this.isVisible) {
            this.dialogResult = null;
            this._callback = null;
            var e = new wjcCore.CancelEventArgs();
            if (this.onShowing(e)) {
                if (modal != null) {
                    this.modal = wjcCore.asBoolean(modal);
                }
                if (handleResult != null) {
                    this._callback = wjcCore.asFunction(handleResult);
                }
                var ref = this._owner ? this._owner.getBoundingClientRect() : null;
                wjcCore.showPopup(this.hostElement, ref, false, this._fadeIn);
                if (this._modal) {
                    this._showBackdrop();
                }
                this._visible = true;
                this.onShown(e);
                setTimeout(function () {
                    if (!_this.isTouching) {
                        var el = _this.hostElement.querySelector('input[autofocus]');
                        if (el && el.clientHeight > 0 &&
                            !el.disabled && el.tabIndex > -1 &&
                            !wjcCore.closest(el, '[disabled],.wj-state-disabled')) {
                            el.focus();
                            el.select();
                        }
                        else {
                            wjcCore.moveFocus(_this.hostElement, 0);
                        }
                    }
                    if (!_this.containsFocus()) {
                        _this.hostElement.tabIndex = 0;
                        _this.hostElement.focus();
                    }
                }, 200);
            }
        }
    };
    Popup.prototype.hide = function (dialogResult) {
        if (this.isVisible) {
            if (!wjcCore.isUndefined(dialogResult)) {
                this.dialogResult = dialogResult;
            }
            var e = new wjcCore.CancelEventArgs();
            if (this.onHiding(e)) {
                if (this._modal) {
                    wjcCore.hidePopup(this._bkdrop, true, this.fadeOut);
                }
                wjcCore.hidePopup(this.hostElement, true, this.fadeOut);
                this._visible = false;
                this.onHidden(e);
                if (this._callback) {
                    this._callback(this);
                }
            }
        }
    };
    Popup.prototype.onShowing = function (e) {
        this.showing.raise(this, e);
        return !e.cancel;
    };
    Popup.prototype.onShown = function (e) {
        this.shown.raise(this, e);
    };
    Popup.prototype.onHiding = function (e) {
        this.hiding.raise(this, e);
        return !e.cancel;
    };
    Popup.prototype.onHidden = function (e) {
        this.hidden.raise(this, e);
    };
    Popup.prototype.dispose = function () {
        this._owner = null;
        _super.prototype.dispose.call(this);
    };
    Popup.prototype.onLostFocus = function (e) {
        if (this.isVisible && (this._hideTrigger & PopupTrigger.Blur)) {
            if (!this.containsFocus()) {
                this.hide();
            }
        }
        _super.prototype.onLostFocus.call(this, e);
    };
    Popup.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        if (this.isVisible && !this._refreshing) {
            this._refreshing = true;
            var ae = wjcCore.getActiveElement(), ref = this._owner ? this._owner.getBoundingClientRect() : null;
            wjcCore.showPopup(this.hostElement, ref);
            if (this._modal && ae instanceof HTMLElement && ae != wjcCore.getActiveElement()) {
                ae.focus();
            }
            this._refreshing = false;
        }
    };
    Popup.prototype._handleResize = function () {
        if (this.isVisible) {
            this.refresh();
        }
    };
    Popup.prototype._handleClick = function (e) {
        if (this.isVisible) {
            if (this._hideTrigger & PopupTrigger.Click) {
                this.hide();
            }
        }
        else {
            if (this._showTrigger & PopupTrigger.Click) {
                if (!this._wasVisible) {
                    var host = this.hostElement;
                    if (host && host.style.display == 'none') {
                        this.show();
                    }
                }
            }
        }
    };
    Popup.prototype._handleMouseDown = function (e) {
        this._wasVisible = this.isVisible;
    };
    Popup.prototype._showBackdrop = function () {
        var _this = this;
        if (!this._bkdrop) {
            this._bkdrop = document.createElement('div');
            this._bkdrop.tabIndex = -1;
            wjcCore.addClass(this._bkdrop, 'wj-popup-backdrop');
            this.addEventListener(this._bkdrop, 'mousedown', function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this.hostElement.focus();
                if (_this.hideTrigger & PopupTrigger.Blur) {
                    _this.hide();
                }
            });
        }
        this._bkdrop.style.display = '';
        var host = this.hostElement;
        host.parentElement.insertBefore(this._bkdrop, host);
    };
    Popup.prototype._validateAndHide = function (result) {
        var invalid = this.hostElement.querySelector(':invalid');
        if (invalid) {
            invalid.focus();
        }
        else {
            this.hide(result);
        }
    };
    return Popup;
}(wjcCore.Control));
exports.Popup = Popup;
'use strict';
var InputDate = (function (_super) {
    __extends(InputDate, _super);
    function InputDate(element, options) {
        var _this = _super.call(this, element) || this;
        _this._format = 'd';
        _this.valueChanged = new wjcCore.Event();
        wjcCore.addClass(_this.hostElement, 'wj-inputdate');
        _this._msk = new wjcCore._MaskProvider(_this._tbx);
        if (!wjcCore.isIE9()) {
            _this._tbx.type = 'tel';
        }
        _this.addEventListener(_this.hostElement, 'wheel', function (e) {
            if (!e.defaultPrevented && !_this.isDroppedDown && _this.containsFocus()) {
                if (_this.value != null && _this._canChangeValue()) {
                    var step = wjcCore.clamp(-e.deltaY, -1, +1);
                    _this.value = _this.selectionMode == DateSelectionMode.Month
                        ? wjcCore.DateTime.addMonths(_this.value, step)
                        : wjcCore.DateTime.addDays(_this.value, step);
                    _this.selectAll();
                    e.preventDefault();
                }
            }
        });
        _this.value = wjcCore.DateTime.newDate();
        if (_this._orgTag == 'INPUT') {
            var value = _this._tbx.getAttribute('value');
            if (value) {
                _this.value = wjcCore.Globalize.parseDate(value, 'yyyy-MM-dd');
            }
        }
        _this.isRequired = true;
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(InputDate.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (wjcCore.DateTime.equals(this._value, value)) {
                this._tbx.value = wjcCore.Globalize.format(value, this.format);
            }
            else {
                value = wjcCore.asDate(value, !this.isRequired || (value == null && this._value == null));
                value = this._clamp(value);
                if (this._isValidDate(value)) {
                    this._tbx.value = value ? wjcCore.Globalize.format(value, this.format) : '';
                    if (value != this._value && !wjcCore.DateTime.equals(this._value, value)) {
                        this._value = value;
                        this.onValueChanged();
                    }
                }
                else {
                    this._tbx.value = value ? wjcCore.Globalize.format(this.value, this.format) : '';
                }
                if (this.text != this._oldText) {
                    this._oldText = this.text;
                    this.onTextChanged();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDate.prototype, "text", {
        get: function () {
            return this._tbx.value;
        },
        set: function (value) {
            if (value != this.text) {
                this._setText(value, true);
                this._commitText();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDate.prototype, "selectionMode", {
        get: function () {
            return this.calendar.selectionMode;
        },
        set: function (value) {
            this.calendar.selectionMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDate.prototype, "min", {
        get: function () {
            return this._calendar.min;
        },
        set: function (value) {
            this._calendar.min = wjcCore.asDate(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDate.prototype, "max", {
        get: function () {
            return this._calendar.max;
        },
        set: function (value) {
            this._calendar.max = wjcCore.asDate(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDate.prototype, "format", {
        get: function () {
            return this._format;
        },
        set: function (value) {
            if (value != this.format) {
                this._format = wjcCore.asString(value);
                this._tbx.value = wjcCore.Globalize.format(this.value, this.format);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDate.prototype, "mask", {
        get: function () {
            return this._msk.mask;
        },
        set: function (value) {
            this._msk.mask = wjcCore.asString(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDate.prototype, "calendar", {
        get: function () {
            return this._calendar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDate.prototype, "inputElement", {
        get: function () {
            return this._tbx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDate.prototype, "inputType", {
        get: function () {
            return this._tbx.type;
        },
        set: function (value) {
            this._tbx.type = wjcCore.asString(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDate.prototype, "itemValidator", {
        get: function () {
            return this._calendar.itemValidator;
        },
        set: function (value) {
            if (value != this.itemValidator) {
                this._calendar.itemValidator = wjcCore.asFunction(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDate.prototype, "itemFormatter", {
        get: function () {
            return this.calendar.itemFormatter;
        },
        set: function (value) {
            if (value != this.itemFormatter) {
                this.calendar.itemFormatter = wjcCore.asFunction(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    InputDate.prototype.onValueChanged = function (e) {
        this.valueChanged.raise(this, e);
    };
    InputDate.prototype.refresh = function () {
        this.isDroppedDown = false;
        if (this._msk) {
            this._msk.refresh();
        }
        if (this._calendar) {
            this._calendar.refresh();
        }
        this._tbx.value = wjcCore.Globalize.format(this.value, this.format);
    };
    InputDate.prototype.onIsDroppedDownChanged = function (e) {
        _super.prototype.onIsDroppedDownChanged.call(this, e);
        if (this.isDroppedDown) {
            this._calChanged = false;
            this.dropDown.focus();
        }
    };
    InputDate.prototype._createDropDown = function () {
        var _this = this;
        this._calendar = new Calendar(this._dropDown);
        this._dropDown.tabIndex = -1;
        this._calendar.valueChanged.addHandler(function () {
            _this.value = wjcCore.DateTime.fromDateTime(_this._calendar.value, _this.value);
            _this._calChanged = true;
        });
        this.addEventListener(this._dropDown, 'mouseup', function (e) {
            if (_this._calChanged && !wjcCore.closest(e.target, '.wj-calendar-header')) {
                _this.isDroppedDown = false;
            }
            else {
                if (e.target.getAttribute('wj-part') == 'btn-today') {
                    _this.isDroppedDown = false;
                }
            }
        });
    };
    InputDate.prototype._updateDropDown = function () {
        this._commitText();
        var cal = this._calendar;
        cal.value = this.value;
        cal.min = this.min;
        cal.max = this.max;
        if (this.selectionMode != DateSelectionMode.Month) {
            cal.monthView = true;
        }
        var cs = getComputedStyle(this.hostElement);
        this._dropDown.style.minWidth = parseFloat(cs.fontSize) * 18 + 'px';
        this._calendar.refresh();
        _super.prototype._updateDropDown.call(this);
    };
    InputDate.prototype._keydown = function (e) {
        if (!e.defaultPrevented && !e.altKey && !e.ctrlKey && !e.metaKey) {
            switch (e.keyCode) {
                case wjcCore.Key.Enter:
                    this._commitText();
                    this.selectAll();
                    break;
                case wjcCore.Key.Escape:
                    this.text = wjcCore.Globalize.format(this.value, this.format);
                    this.selectAll();
                    break;
                case wjcCore.Key.Up:
                case wjcCore.Key.Down:
                    if (!this.isDroppedDown && this.value && this._canChangeValue()) {
                        var step = e.keyCode == wjcCore.Key.Up ? +1 : -1, value = this.selectionMode == DateSelectionMode.Month
                            ? wjcCore.DateTime.addMonths(this.value, step)
                            : wjcCore.DateTime.addDays(this.value, step);
                        this.value = wjcCore.DateTime.fromDateTime(value, this.value);
                        this.selectAll();
                        e.preventDefault();
                    }
                    break;
            }
        }
        _super.prototype._keydown.call(this, e);
    };
    InputDate.prototype._canChangeValue = function () {
        return !this.isReadOnly && this.selectionMode != DateSelectionMode.None;
    };
    InputDate.prototype._clamp = function (value) {
        return this.calendar._clamp(value);
    };
    InputDate.prototype._commitText = function () {
        var txt = this._tbx.value;
        if (!txt && !this.isRequired) {
            this.value = null;
        }
        else {
            var dt = wjcCore.Globalize.parseDate(txt, this.format);
            if (dt) {
                this.value = wjcCore.DateTime.fromDateTime(dt, this.value);
            }
            else {
                this._tbx.value = wjcCore.Globalize.format(this.value, this.format);
            }
        }
    };
    InputDate.prototype._isValidDate = function (value) {
        if (value) {
            if (this._clamp(value) != value) {
                return false;
            }
            if (this.itemValidator && !this.itemValidator(value)) {
                return false;
            }
        }
        return true;
    };
    return InputDate;
}(DropDown));
exports.InputDate = InputDate;
'use strict';
var InputTime = (function (_super) {
    __extends(InputTime, _super);
    function InputTime(element, options) {
        var _this = _super.call(this, element) || this;
        _this._format = 't';
        _this.valueChanged = new wjcCore.Event();
        wjcCore.addClass(_this.hostElement, 'wj-inputtime');
        _this._value = wjcCore.DateTime.newDate();
        _this._msk = new wjcCore._MaskProvider(_this._tbx);
        if (!wjcCore.isIE9()) {
            _this._tbx.type = 'tel';
        }
        if (_this._orgTag == 'INPUT') {
            var value = _this._tbx.getAttribute('value');
            if (value) {
                _this.value = wjcCore.Globalize.parseDate(value, 'HH:mm:ss');
            }
        }
        _this.step = 15;
        _this.autoExpandSelection = true;
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(InputTime.prototype, "inputElement", {
        get: function () {
            return this._tbx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputTime.prototype, "inputType", {
        get: function () {
            return this._tbx.type;
        },
        set: function (value) {
            this._tbx.type = wjcCore.asString(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputTime.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            value = wjcCore.asDate(value, !this.isRequired);
            if (value) {
                if (this._min != null && this._getTime(value) < this._getTime(this._min)) {
                    value = wjcCore.DateTime.fromDateTime(value, this._min);
                }
                if (this._max != null && this._getTime(value) > this._getTime(this._max)) {
                    value = wjcCore.DateTime.fromDateTime(value, this._max);
                }
            }
            this._setText(value ? wjcCore.Globalize.format(value, this.format) : '', true);
            if (value != this._value && !wjcCore.DateTime.equals(value, this._value)) {
                this._value = value;
                this.onValueChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputTime.prototype, "text", {
        get: function () {
            return this._tbx.value;
        },
        set: function (value) {
            if (value != this.text) {
                this._setText(value, true);
                this._commitText();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputTime.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (value) {
            this._min = wjcCore.asDate(value, true);
            this.isDroppedDown = false;
            this._updateItems();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputTime.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            this._max = wjcCore.asDate(value, true);
            this.isDroppedDown = false;
            this._updateItems();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputTime.prototype, "step", {
        get: function () {
            return this._step;
        },
        set: function (value) {
            this._step = wjcCore.asNumber(value, true);
            this.isDroppedDown = false;
            this._updateItems();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputTime.prototype, "format", {
        get: function () {
            return this._format;
        },
        set: function (value) {
            if (value != this.format) {
                this._format = wjcCore.asString(value);
                this._tbx.value = wjcCore.Globalize.format(this.value, this.format);
                if (this.collectionView && this.collectionView.items.length) {
                    this._updateItems();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputTime.prototype, "mask", {
        get: function () {
            return this._msk.mask;
        },
        set: function (value) {
            this._msk.mask = wjcCore.asString(value);
        },
        enumerable: true,
        configurable: true
    });
    InputTime.prototype.onValueChanged = function (e) {
        this.valueChanged.raise(this, e);
    };
    InputTime.prototype.refresh = function () {
        this.isDroppedDown = false;
        this._msk.refresh();
        this._tbx.value = wjcCore.Globalize.format(this.value, this.format);
        this._updateItems();
    };
    InputTime.prototype.onSelectedIndexChanged = function (e) {
        if (this.selectedIndex > -1) {
            this._commitText();
        }
        _super.prototype.onSelectedIndexChanged.call(this, e);
    };
    InputTime.prototype._updateItems = function () {
        var min = new Date(0, 0, 0, 0, 0), max = new Date(0, 0, 0, 23, 59, 59), items = [];
        if (this.min) {
            min.setHours(this.min.getHours(), this.min.getMinutes(), this.min.getSeconds());
        }
        if (this.max) {
            max.setHours(this.max.getHours(), this.max.getMinutes(), this.max.getSeconds());
        }
        if (wjcCore.isNumber(this.step) && this.step > 0) {
            for (var dt = min; dt <= max; dt = wjcCore.DateTime.addMinutes(dt, this.step)) {
                items.push(wjcCore.Globalize.format(dt, this.format));
            }
        }
        var text = this.text;
        this.itemsSource = items;
        this.text = text;
    };
    InputTime.prototype._getTime = function (value) {
        return value.getHours() * 3600 + value.getMinutes() * 60 + value.getSeconds();
    };
    InputTime.prototype._keydown = function (e) {
        _super.prototype._keydown.call(this, e);
        if (!e.defaultPrevented) {
            switch (e.keyCode) {
                case wjcCore.Key.Enter:
                    if (!this.isDroppedDown) {
                        this._commitText();
                        this.selectAll();
                    }
                    break;
                case wjcCore.Key.Escape:
                    this.text = wjcCore.Globalize.format(this.value, this.format);
                    this.selectAll();
                    break;
            }
        }
    };
    InputTime.prototype._commitText = function () {
        if (!this.text && !this.isRequired) {
            this.value = null;
        }
        else {
            var dt = wjcCore.Globalize.parseDate(this.text, this.format);
            if (dt) {
                this.value = wjcCore.DateTime.fromDateTime(this.value, dt);
            }
            else {
                this._tbx.value = wjcCore.Globalize.format(this.value, this.format);
            }
        }
    };
    return InputTime;
}(ComboBox));
exports.InputTime = InputTime;
'use strict';
var InputDateTime = (function (_super) {
    __extends(InputDateTime, _super);
    function InputDateTime(element, options) {
        var _this = _super.call(this, element) || this;
        wjcCore.addClass(_this.hostElement, 'wj-inputdatetime');
        _this._btnTm = _this.hostElement.querySelector('[wj-part="btn-tm"]');
        _this._format = 'g';
        _this._inputTime = new InputTime(document.createElement('div'));
        _this._inputTime.valueChanged.addHandler(function () {
            _this.value = wjcCore.DateTime.fromDateTime(_this.value, _this._inputTime.value);
            if (_this.containsFocus()) {
                if (!_this.isTouching || !_this.showDropDownButton) {
                    _this.selectAll();
                }
            }
        });
        var tmDropdown = _this._inputTime.dropDown;
        var kd = _this._keydown.bind(_this);
        _this.addEventListener(tmDropdown, 'keydown', kd, true);
        _this.addEventListener(tmDropdown, 'blur', function () {
            _this._updateFocusState();
        }, true);
        _this.addEventListener(_this._btnTm, 'click', _this._btnclick.bind(_this));
        _this.addEventListener(_this._btn, 'mousedown', function () {
            _this._setDropdown(_this.calendar.hostElement);
        });
        _this.addEventListener(_this._btnTm, 'mousedown', function (e) {
            if (_this.isDroppedDown && _this.dropDown == tmDropdown) {
                e.preventDefault();
            }
            _this._inputTime.dropDownCssClass = _this.dropDownCssClass;
            _this._setDropdown(tmDropdown);
        });
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(InputDateTime.prototype, "timeMin", {
        get: function () {
            return this._inputTime.min;
        },
        set: function (value) {
            this._inputTime.min = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDateTime.prototype, "timeMax", {
        get: function () {
            return this._inputTime.max;
        },
        set: function (value) {
            this._inputTime.max = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDateTime.prototype, "timeFormat", {
        get: function () {
            return this._inputTime.format;
        },
        set: function (value) {
            this._inputTime.format = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDateTime.prototype, "timeStep", {
        get: function () {
            return this._inputTime.step;
        },
        set: function (value) {
            this._inputTime.step = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputDateTime.prototype, "inputTime", {
        get: function () {
            return this._inputTime;
        },
        enumerable: true,
        configurable: true
    });
    InputDateTime.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        this._inputTime.refresh();
    };
    InputDateTime.prototype._updateBtn = function () {
        _super.prototype._updateBtn.call(this);
        if (this._btnTm) {
            this._btnTm.tabIndex = this._btn.tabIndex;
            this._btnTm.parentElement.style.display = this._btn.style.display;
        }
    };
    InputDateTime.prototype._clamp = function (value) {
        if (value) {
            if (this.min && value < this.min) {
                value = this.min;
            }
            if (this.max && value > this.max) {
                value = this.max;
            }
        }
        return value;
    };
    InputDateTime.prototype._commitText = function () {
        var txt = this._tbx.value;
        if (!txt && !this.isRequired) {
            this.value = null;
        }
        else {
            var dt = wjcCore.Globalize.parseDate(txt, this.format);
            if (dt) {
                this.value = dt;
            }
            else {
                this._tbx.value = wjcCore.Globalize.format(this.value, this.format);
            }
        }
    };
    InputDateTime.prototype._setDropdown = function (e) {
        if (this._dropDown != e) {
            if (this.isDroppedDown) {
                this.isDroppedDown = false;
            }
            this._dropDown = e;
        }
    };
    InputDateTime.prototype._updateDropDown = function () {
        var tm = this._inputTime;
        if (this._dropDown == tm.dropDown) {
            this._commitText();
            _super.prototype._updateDropDown.call(this);
            tm.isRequired = this.isRequired;
            tm.value = this.value;
            if (this.isDroppedDown) {
                tm.listBox.showSelection();
            }
        }
        else {
            _super.prototype._updateDropDown.call(this);
        }
    };
    return InputDateTime;
}(InputDate));
InputDateTime.controlTemplate = '<div style="position:relative" class="wj-template">' +
    '<div class="wj-input">' +
    '<div class="wj-input-group wj-input-btn-visible">' +
    '<input wj-part="input" type="text" class="wj-form-control" />' +
    '<span class="wj-input-group-btn" tabindex="-1">' +
    '<button wj-part="btn" class="wj-btn wj-btn-default" type="button" tabindex="-1">' +
    '<span class="wj-glyph-calendar"></span>' +
    '</button>' +
    '<button wj-part="btn-tm" class="wj-btn wj-btn-default" type="button" tabindex="-1">' +
    '<span class="wj-glyph-clock"></span>' +
    '</button>' +
    '</span>' +
    '</div>' +
    '</div>' +
    '<div wj-part="dropdown" class="wj-content wj-dropdown-panel" ' +
    'style="display:none;position:absolute;z-index:100;width:auto">' +
    '</div>' +
    '</div>';
exports.InputDateTime = InputDateTime;
'use strict';
var InputNumber = (function (_super) {
    __extends(InputNumber, _super);
    function InputNumber(element, options) {
        var _this = _super.call(this, element) || this;
        _this._showBtn = true;
        _this._readOnly = false;
        _this.textChanged = new wjcCore.Event();
        _this.valueChanged = new wjcCore.Event();
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-inputnumber wj-content', tpl, {
            _tbx: 'input',
            _btnUp: 'btn-inc',
            _btnDn: 'btn-dec'
        }, 'input');
        var tb = _this._tbx;
        tb.autocomplete = 'off';
        tb.spellcheck = false;
        _this._updateSymbols();
        _this.addEventListener(_this._tbx, 'compositionstart', function () {
            _this._composing = true;
        });
        _this.addEventListener(_this._tbx, 'compositionend', function () {
            _this._composing = false;
            setTimeout(function () {
                _this._setText(_this.text);
            });
        });
        _this.addEventListener(tb, 'keypress', _this._keypress.bind(_this));
        _this.addEventListener(tb, 'keydown', _this._keydown.bind(_this));
        _this.addEventListener(tb, 'input', _this._input.bind(_this));
        _this.addEventListener(_this._btnUp, 'click', _this._clickSpinner.bind(_this));
        _this.addEventListener(_this._btnDn, 'click', _this._clickSpinner.bind(_this));
        _this.addEventListener(_this.hostElement, 'wheel', function (e) {
            if (!e.defaultPrevented && !_this.isReadOnly && _this.containsFocus()) {
                if (_this.value != null) {
                    var step = wjcCore.clamp(-e.deltaY, -1, +1);
                    _this._increment((_this.step || 1) * step);
                    setTimeout(function () { return _this.selectAll(); });
                    e.preventDefault();
                }
            }
        });
        _this.value = 0;
        _this.isRequired = true;
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(InputNumber.prototype, "inputElement", {
        get: function () {
            return this._tbx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputNumber.prototype, "inputType", {
        get: function () {
            return this._tbx.type;
        },
        set: function (value) {
            this._tbx.type = wjcCore.asString(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputNumber.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (value != this._value) {
                value = wjcCore.asNumber(value, !this.isRequired || (value == null && this._value == null));
                if (value == null) {
                    this._setText('');
                }
                else if (!isNaN(value)) {
                    var text = wjcCore.Globalize.format(value, this.format);
                    this._setText(text);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputNumber.prototype, "isRequired", {
        get: function () {
            return this._tbx.required;
        },
        set: function (value) {
            this._tbx.required = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputNumber.prototype, "isReadOnly", {
        get: function () {
            return this._readOnly;
        },
        set: function (value) {
            this._readOnly = wjcCore.asBoolean(value);
            this.inputElement.readOnly = this._readOnly;
            wjcCore.toggleClass(this.hostElement, 'wj-state-readonly', this.isReadOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputNumber.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (value) {
            this._min = wjcCore.asNumber(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputNumber.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            this._max = wjcCore.asNumber(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputNumber.prototype, "step", {
        get: function () {
            return this._step;
        },
        set: function (value) {
            this._step = wjcCore.asNumber(value, true);
            this._updateBtn();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputNumber.prototype, "format", {
        get: function () {
            return this._format;
        },
        set: function (value) {
            if (value != this.format) {
                this._format = wjcCore.asString(value);
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputNumber.prototype, "text", {
        get: function () {
            return this._tbx.value;
        },
        set: function (value) {
            if (value != this.text) {
                this._oldText = null;
                this._setText(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputNumber.prototype, "placeholder", {
        get: function () {
            return this._tbx.placeholder;
        },
        set: function (value) {
            this._tbx.placeholder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputNumber.prototype, "showSpinner", {
        get: function () {
            return this._showBtn;
        },
        set: function (value) {
            this._showBtn = wjcCore.asBoolean(value);
            this._updateBtn();
        },
        enumerable: true,
        configurable: true
    });
    InputNumber.prototype.selectAll = function () {
        wjcCore.setSelectionRange(this._tbx, 0, this._tbx.value.length);
    };
    InputNumber.prototype.onTextChanged = function (e) {
        this.textChanged.raise(this, e);
        this._updateState();
    };
    InputNumber.prototype.onValueChanged = function (e) {
        this.valueChanged.raise(this, e);
    };
    InputNumber.prototype.onGotFocus = function (e) {
        if (!this.isTouching) {
            this._tbx.focus();
            this.selectAll();
        }
        _super.prototype.onGotFocus.call(this, e);
    };
    InputNumber.prototype.onLostFocus = function (e) {
        if (this._composing) {
            this._composing = false;
            this._setText(this.text);
        }
        var value = this._clamp(this.value), text = wjcCore.Globalize.format(value, this.format, false, false);
        this._setText(text);
        _super.prototype.onLostFocus.call(this, e);
    };
    InputNumber.prototype.refresh = function (fullUpdate) {
        this._updateSymbols();
        var text = wjcCore.Globalize.format(this.value, this.format);
        this._setText(text);
    };
    InputNumber.prototype._updateSymbols = function () {
        var nf = wjcCore.culture.Globalize.numberFormat;
        this._decChar = nf['.'] || '.';
        this._currChar = nf.currency.symbol || '$';
        this._rxSym = new RegExp('^[%+\\-() ' + this._decChar + this._currChar + ']*$');
        this._rxNegStart = new RegExp('^(\\-|\\()0*' + this._decChar + '?$');
    };
    InputNumber.prototype._clamp = function (value) {
        return wjcCore.clamp(value, this.min, this.max);
    };
    InputNumber.prototype._isNumeric = function (chr, digitsOnly) {
        if (digitsOnly === void 0) { digitsOnly = false; }
        var isNum = (chr == this._decChar) || (chr >= '0' && chr <= '9');
        if (!isNum && !digitsOnly) {
            isNum = '+-()'.indexOf(chr) > -1;
        }
        return isNum;
    };
    InputNumber.prototype._getInputRange = function (digitsOnly) {
        if (digitsOnly === void 0) { digitsOnly = false; }
        var rng = [0, 0], text = this.text, hasStart = false;
        for (var i = 0; i < text.length; i++) {
            if (this._isNumeric(text[i], digitsOnly)) {
                if (!hasStart) {
                    rng[0] = i;
                    hasStart = true;
                }
                rng[1] = i + 1;
            }
        }
        return rng;
    };
    InputNumber.prototype._flipSign = function () {
        var start = this._getSelStartDigits();
        this.value *= -1;
        this._setSelStartDigits(start);
    };
    InputNumber.prototype._getSelStart = function () {
        return this._tbx && this._tbx.value
            ? this._tbx.selectionStart
            : 0;
    };
    InputNumber.prototype._getSelStartDigits = function () {
        var start = 0;
        if (this._tbx) {
            var str = this._tbx.value, selStart = this._getSelStart();
            for (var i = 0; i < str.length && i < selStart; i++) {
                if (str[i] >= '0' && str[i] <= '9') {
                    start++;
                }
            }
        }
        return start;
    };
    InputNumber.prototype._setSelStartDigits = function (start) {
        if (this._tbx) {
            var str = this._tbx.value;
            for (var i = 0; i < str.length; i++) {
                if (!start) {
                    wjcCore.setSelectionRange(this._tbx, i);
                    break;
                }
                if (str[i] >= '0' && str[i] <= '9') {
                    start--;
                }
            }
        }
    };
    InputNumber.prototype._increment = function (step) {
        if (step) {
            var value = this._clamp(this.value + step), text = wjcCore.Globalize.format(value, this.format, false, false);
            this._setText(text);
        }
    };
    InputNumber.prototype._updateBtn = function () {
        if (this.showSpinner && this.step && this.value != null) {
            this._btnUp.style.display = this._btnDn.style.display = '';
            wjcCore.addClass(this.hostElement, 'wj-input-show-spinner');
        }
        else {
            this._btnUp.style.display = this._btnDn.style.display = 'none';
            wjcCore.removeClass(this.hostElement, 'wj-input-show-spinner');
        }
    };
    InputNumber.prototype._setText = function (text) {
        if (this._composing)
            return;
        if (!text) {
            if (!this.isRequired) {
                this._tbx.value = '';
                if (this._value != null) {
                    this._value = null;
                    this.onValueChanged();
                }
                if (this._oldText) {
                    this._oldText = text;
                    this.onTextChanged();
                }
                this._updateBtn();
                return;
            }
            text = '0';
        }
        if (this._rxNegStart.test(text)) {
            this._tbx.value = text;
            wjcCore.setSelectionRange(this._tbx, text.length);
            return;
        }
        if (text == this._decChar && !this._format && !this.isRequired) {
            text = '0' + text;
        }
        if (text.length > 1 && text[text.length - 1] == ')' && text[0] != '(') {
            text = text.substr(0, text.length - 1);
        }
        if (this._rxSym.test(text)) {
            text = '0';
        }
        var fmt = this._format || (text.indexOf(this._decChar) > -1 ? 'n2' : 'n0'), value = wjcCore.Globalize.parseFloat(text, fmt);
        if (isNaN(value)) {
            this._tbx.value = this._oldText;
            return;
        }
        if (text.indexOf('%') < 0 && fmt.toLowerCase().indexOf('p') > -1) {
            value /= 100;
        }
        var truncate = this._oldText && text.length == this._oldText.length + 1, fval = wjcCore.Globalize.format(value, fmt, false, truncate);
        if (fmt == 'n' || fmt[0].toLowerCase() == 'g') {
            if (this._tbx.selectionStart == this._tbx.value.length) {
                if (text == fval + this._decChar || text == fval + this._decChar + '0') {
                    fval = text;
                }
            }
        }
        if (this._tbx.value != fval) {
            this._tbx.value = fval;
            value = wjcCore.Globalize.parseFloat(fval, this.format);
        }
        if (value != this._value) {
            this._value = value;
            this.onValueChanged();
        }
        if (this.text != this._oldText) {
            this._oldText = this.text;
            this.onTextChanged();
        }
        this._updateBtn();
    };
    InputNumber.prototype._keypress = function (e) {
        if (e.defaultPrevented || this._composing || this._readOnly) {
            return;
        }
        if (e.charCode && !e.ctrlKey && !e.metaKey) {
            var chr = String.fromCharCode(e.charCode);
            if (!this._isNumeric(chr)) {
                e.preventDefault();
            }
            else {
                var rng = this._getInputRange(true);
                if (this._getSelStart() < rng[0]) {
                    wjcCore.setSelectionRange(this._tbx, rng[0], rng[1]);
                }
            }
            switch (chr) {
                case '-':
                    if (this.value && this._tbx.selectionStart == this._tbx.selectionEnd) {
                        this._flipSign();
                    }
                    else {
                        this._setText('-');
                    }
                    e.preventDefault();
                    break;
                case '+':
                    if (this.value < 0) {
                        this._flipSign();
                    }
                    e.preventDefault();
                    break;
                case this._decChar:
                    var dec = this._tbx.value.indexOf(chr);
                    if (dec > -1) {
                        if (this._getSelStart() <= dec) {
                            dec++;
                        }
                        wjcCore.setSelectionRange(this._tbx, dec);
                        e.preventDefault();
                    }
                    break;
            }
        }
    };
    InputNumber.prototype._keydown = function (e) {
        var _this = this;
        if (e.defaultPrevented)
            return;
        if (this._composing)
            return;
        switch (e.keyCode) {
            case wjcCore.Key.Up:
            case wjcCore.Key.Down:
                if (this.step) {
                    this._increment(this.step * (e.keyCode == wjcCore.Key.Up ? +1 : -1));
                    setTimeout(function () {
                        _this.selectAll();
                    });
                    e.preventDefault();
                }
                break;
            case wjcCore.Key.Back:
                if (this._tbx && this._tbx.selectionStart == this._tbx.selectionEnd) {
                    var sel = this._getSelStart();
                    if (sel > 0 && this.text[sel - 1] == this._decChar) {
                        setTimeout(function () {
                            wjcCore.setSelectionRange(_this._tbx, sel - 1);
                        });
                        e.preventDefault();
                    }
                }
                break;
            case wjcCore.Key.Delete:
                if (this._tbx && this._tbx.selectionStart == this._tbx.selectionEnd) {
                    var sel = this._getSelStart();
                    if (sel > 0 && this.text[sel] == this._decChar) {
                        setTimeout(function () {
                            wjcCore.setSelectionRange(_this._tbx, sel + 1);
                        });
                        e.preventDefault();
                    }
                }
                break;
        }
    };
    InputNumber.prototype._input = function (e) {
        var _this = this;
        if (this._composing)
            return;
        setTimeout(function () {
            var tbx = _this._tbx, text = tbx.value, sel = _this._getSelStart(), dec = text && text.length > 1 ? text.indexOf(_this._decChar) : -1;
            _this._setText(text);
            if (_this.containsFocus()) {
                var newText = tbx.value, newDec = newText.indexOf(_this._decChar);
                if (text && text[0] == '-' && newText && newText[0] != '-') {
                    text = null;
                }
                if (text) {
                    if (text == _this._decChar && newDec > -1) {
                        sel = newDec + 1;
                    }
                    else if ((sel <= dec && newDec > -1) || (dec < 0 && newDec < 0)) {
                        sel += newText.length - text.length;
                    }
                    else if (sel == text.length && dec < 0 && newDec > -1) {
                        sel = newDec;
                    }
                }
                else {
                    sel = newDec > -1 ? newDec : newText.match(/[^\d]*$/).index;
                }
                var rng = _this._getInputRange();
                if (sel < rng[0])
                    sel = rng[0];
                if (sel > rng[1])
                    sel = rng[1];
                wjcCore.setSelectionRange(tbx, sel);
            }
        });
    };
    InputNumber.prototype._clickSpinner = function (e) {
        var _this = this;
        if (!e.defaultPrevented && !this.isReadOnly && this.step && this.value != null) {
            this._increment(this.step * (wjcCore.contains(this._btnUp, e.target) ? +1 : -1));
            if (!this.isTouching) {
                setTimeout(function () { return _this.selectAll(); });
            }
        }
    };
    return InputNumber;
}(wjcCore.Control));
InputNumber.controlTemplate = '<div class="wj-input">' +
    '<div class="wj-input-group">' +
    '<span wj-part="btn-dec" class="wj-input-group-btn" tabindex="-1">' +
    '<button class="wj-btn wj-btn-default" type="button" tabindex="-1">-</button>' +
    '</span>' +
    '<input type="tel" wj-part="input" class="wj-form-control wj-numeric"/>' +
    '<span wj-part="btn-inc" class="wj-input-group-btn" tabindex="-1">' +
    '<button class="wj-btn wj-btn-default" type="button" tabindex="-1">+</button>' +
    '</span>' +
    '</div>' +
    '</div>';
exports.InputNumber = InputNumber;
'use strict';
var InputMask = (function (_super) {
    __extends(InputMask, _super);
    function InputMask(element, options) {
        var _this = _super.call(this, element) || this;
        _this.valueChanged = new wjcCore.Event();
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-inputmask wj-content', tpl, {
            _tbx: 'input'
        }, 'input');
        if (_this._orgTag == 'INPUT') {
            var value = _this._tbx.getAttribute('value');
            if (value) {
                _this.value = value;
            }
        }
        _this._msk = new wjcCore._MaskProvider(_this._tbx);
        _this.isRequired = true;
        _this.initialize(options);
        _this.addEventListener(_this._tbx, 'input', function () {
            setTimeout(function () {
                _this.onValueChanged();
            });
        });
        return _this;
    }
    Object.defineProperty(InputMask.prototype, "inputElement", {
        get: function () {
            return this._tbx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputMask.prototype, "value", {
        get: function () {
            return this._tbx.value;
        },
        set: function (value) {
            if (value != this.value) {
                this._tbx.value = wjcCore.asString(value);
                var ae = wjcCore.getActiveElement();
                this._tbx.selectionStart = this._tbx.value.length;
                if (ae && ae != wjcCore.getActiveElement()) {
                    ae.focus();
                }
                value = this._msk._applyMask();
                this._tbx.value = value;
                this.onValueChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputMask.prototype, "rawValue", {
        get: function () {
            return this._msk.getRawValue();
        },
        set: function (value) {
            if (value != this.rawValue) {
                this.value = wjcCore.asString(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputMask.prototype, "mask", {
        get: function () {
            return this._msk.mask;
        },
        set: function (value) {
            var oldValue = this.value;
            this._msk.mask = wjcCore.asString(value);
            if (this.value != oldValue) {
                this.onValueChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputMask.prototype, "promptChar", {
        get: function () {
            return this._msk.promptChar;
        },
        set: function (value) {
            var oldValue = this.value;
            this._msk.promptChar = value;
            if (this.value != oldValue) {
                this.onValueChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputMask.prototype, "placeholder", {
        get: function () {
            return this._tbx.placeholder;
        },
        set: function (value) {
            this._tbx.placeholder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputMask.prototype, "maskFull", {
        get: function () {
            return this._msk.maskFull;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputMask.prototype, "isRequired", {
        get: function () {
            return this._tbx.required;
        },
        set: function (value) {
            this._tbx.required = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    InputMask.prototype.selectAll = function () {
        var rng = this._msk.getMaskRange();
        wjcCore.setSelectionRange(this._tbx, rng[0], rng[1] + 1);
    };
    InputMask.prototype.onValueChanged = function (e) {
        this.valueChanged.raise(this, e);
        this._updateState();
    };
    InputMask.prototype.refresh = function (fullUpdate) {
        _super.prototype.refresh.call(this, fullUpdate);
        this._msk.refresh();
    };
    InputMask.prototype.onGotFocus = function (e) {
        _super.prototype.onGotFocus.call(this, e);
        this.selectAll();
    };
    return InputMask;
}(wjcCore.Control));
InputMask.controlTemplate = '<div class="wj-input">' +
    '<div class="wj-input-group">' +
    '<input wj-part="input" class="wj-form-control"/>' +
    '</div>' +
    '</div>';
exports.InputMask = InputMask;
'use strict';
var InputColor = (function (_super) {
    __extends(InputColor, _super);
    function InputColor(element, options) {
        var _this = _super.call(this, element) || this;
        _this.valueChanged = new wjcCore.Event();
        wjcCore.addClass(_this.hostElement, 'wj-inputcolor');
        _this._tbx.style.paddingLeft = '24px';
        _this._ePreview = wjcCore.createElement('<div class="wj-inputcolorbox" style="position:absolute;left:6px;top:6px;width:12px;bottom:6px;border:1px solid black"></div>');
        _this.hostElement.style.position = 'relative';
        _this.hostElement.appendChild(_this._ePreview);
        if (_this._orgTag == 'INPUT') {
            _this._tbx.type = '';
            _this._commitText();
        }
        _this.value = '#ffffff';
        _this.isRequired = true;
        _this.initialize(options);
        _this.addEventListener(_this._colorPicker.hostElement, 'click', function (e) {
            var el = e.target;
            if (el && el.tagName == 'DIV') {
                if (wjcCore.closest(el, '[wj-part="div-pal"]') || wjcCore.closest(el, '[wj-part="div-pv"]')) {
                    var color = el.style.backgroundColor;
                    if (color) {
                        _this.isDroppedDown = false;
                    }
                }
            }
        });
        return _this;
    }
    Object.defineProperty(InputColor.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (value != this.value) {
                if (value || !this.isRequired) {
                    this.text = wjcCore.asString(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputColor.prototype, "text", {
        get: function () {
            return this._tbx.value;
        },
        set: function (value) {
            if (value != this.text) {
                this._setText(wjcCore.asString(value), true);
                this._commitText();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputColor.prototype, "showAlphaChannel", {
        get: function () {
            return this._colorPicker.showAlphaChannel;
        },
        set: function (value) {
            this._colorPicker.showAlphaChannel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputColor.prototype, "palette", {
        get: function () {
            return this._colorPicker.palette;
        },
        set: function (value) {
            this._colorPicker.palette = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputColor.prototype, "colorPicker", {
        get: function () {
            return this._colorPicker;
        },
        enumerable: true,
        configurable: true
    });
    InputColor.prototype.onValueChanged = function (e) {
        this.valueChanged.raise(this, e);
    };
    InputColor.prototype._createDropDown = function () {
        var _this = this;
        this._colorPicker = new ColorPicker(this._dropDown);
        wjcCore.setCss(this._dropDown, {
            minWidth: 420,
            minHeight: 200
        });
        this._colorPicker.valueChanged.addHandler(function () {
            _this.value = _this._colorPicker.value;
        });
    };
    InputColor.prototype._keydown = function (e) {
        if (!e.defaultPrevented) {
            switch (e.keyCode) {
                case wjcCore.Key.Enter:
                    this._commitText();
                    this.selectAll();
                    break;
                case wjcCore.Key.Escape:
                    this.text = this.value;
                    this.selectAll();
                    break;
            }
        }
        _super.prototype._keydown.call(this, e);
    };
    InputColor.prototype._commitText = function () {
        if (this.value != this.text) {
            if (!this.isRequired && !this.text) {
                this._value = this.text;
                this._ePreview.style.backgroundColor = '';
                return;
            }
            var c = wjcCore.Color.fromString(this.text);
            if (c) {
                this._colorPicker.value = this.text;
                this._value = this._colorPicker.value;
                this._ePreview.style.backgroundColor = this.value;
                this.onValueChanged();
            }
            else {
                this.text = this._value ? this._value : '';
            }
        }
    };
    return InputColor;
}(DropDown));
exports.InputColor = InputColor;
//# sourceMappingURL=wijmo.input.js.map