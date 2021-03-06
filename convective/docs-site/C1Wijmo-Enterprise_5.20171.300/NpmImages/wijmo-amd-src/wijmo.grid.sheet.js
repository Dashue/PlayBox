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
define(["require", "exports", "wijmo/wijmo", "wijmo/wijmo.xlsx", "wijmo/wijmo.grid", "wijmo/wijmo.input", "wijmo/wijmo.grid.filter", "wijmo/wijmo.grid.xlsx", "wijmo/wijmo.grid.sheet"], function (require, exports, wjcCore, wjcXlsx, wjcGrid, wjcInput, wjcGridFilter, wjcGridXlsx, wjcSelf) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window['wijmo'] = window['wijmo'] || {};
    window['wijmo']['grid'] = window['wijmo']['grid'] || {};
    window['wijmo']['grid']['sheet'] = wjcSelf;
    'use strict';
    var _CalcEngine = (function () {
        function _CalcEngine(owner) {
            this._expressionCache = {};
            this._idChars = '$:!';
            this._functionTable = {};
            this._cacheSize = 0;
            this.unknownFunction = new wjcCore.Event();
            this._owner = owner;
            this._buildSymbolTable();
            this._registerAggregateFunction();
            this._registerMathFunction();
            this._registerLogicalFunction();
            this._registerTextFunction();
            this._registerDateFunction();
            this._registLookUpReferenceFunction();
            this._registFinacialFunction();
        }
        _CalcEngine.prototype.onUnknownFunction = function (funcName, params) {
            var paramsList, eventArgs;
            if (params && params.length > 0) {
                paramsList = [];
                for (var i = 0; i < params.length; i++) {
                    paramsList[i] = params[i].evaluate();
                }
            }
            eventArgs = new UnknownFunctionEventArgs(funcName, paramsList);
            this.unknownFunction.raise(this, eventArgs);
            if (eventArgs.value != null) {
                return new _Expression(eventArgs.value);
            }
            throw 'The function "' + funcName + '"' + ' has not supported in FlexSheet yet.';
        };
        _CalcEngine.prototype.evaluate = function (expression, format, sheet, rowIndex, columnIndex) {
            var expr, result;
            try {
                if (expression && expression.length > 1 && expression[0] === '=') {
                    expr = this._checkCache(expression);
                    result = expr.evaluate(sheet, rowIndex, columnIndex);
                    while (result instanceof _Expression) {
                        result = result.evaluate(sheet);
                    }
                    if (format && wjcCore.isPrimitive(result)) {
                        return wjcCore.Globalize.format(result, format);
                    }
                    return result;
                }
                return expression ? expression : '';
            }
            catch (e) {
                return "Error: " + e;
            }
        };
        _CalcEngine.prototype.addCustomFunction = function (name, func, minParamsCount, maxParamsCount) {
            var self = this;
            name = name.toLowerCase();
            this._functionTable[name] = new _FunctionDefinition(function (params) {
                var param, paramsList = [];
                if (params.length > 0) {
                    for (var i = 0; i < params.length; i++) {
                        param = params[i];
                        if (param instanceof _CellRangeExpression) {
                            paramsList[i] = param.cells;
                        }
                        else {
                            paramsList[i] = param.evaluate();
                        }
                    }
                }
                return func.apply(self, paramsList);
            }, maxParamsCount, minParamsCount);
        };
        _CalcEngine.prototype.addFunction = function (name, func, minParamsCount, maxParamsCount) {
            var self = this;
            name = name.toLowerCase();
            this._functionTable[name] = new _FunctionDefinition(function (params) {
                var param, paramsList = [];
                if (params.length > 0) {
                    for (var i = 0; i < params.length; i++) {
                        param = params[i];
                        if (param instanceof _CellRangeExpression) {
                            paramsList[i] = param.getValuseWithTwoDimensions();
                        }
                        else {
                            paramsList[i] = [[param.evaluate()]];
                        }
                    }
                }
                return func.apply(self, paramsList);
            }, maxParamsCount, minParamsCount);
        };
        _CalcEngine.prototype._clearExpressionCache = function () {
            this._expressionCache = null;
            this._expressionCache = {};
            this._cacheSize = 0;
        };
        _CalcEngine.prototype._parse = function (expression) {
            this._expression = expression;
            this._expressLength = expression ? expression.length : 0;
            this._pointer = 0;
            if (this._expressLength > 0 && this._expression[0] === '=') {
                this._pointer++;
            }
            return this._parseExpression();
        };
        _CalcEngine.prototype._buildSymbolTable = function () {
            if (!this._tokenTable) {
                this._tokenTable = {};
                this._addToken('+', _TokenID.ADD, _TokenType.ADDSUB);
                this._addToken('-', _TokenID.SUB, _TokenType.ADDSUB);
                this._addToken('(', _TokenID.OPEN, _TokenType.GROUP);
                this._addToken(')', _TokenID.CLOSE, _TokenType.GROUP);
                this._addToken('*', _TokenID.MUL, _TokenType.MULDIV);
                this._addToken(',', _TokenID.COMMA, _TokenType.GROUP);
                this._addToken('.', _TokenID.PERIOD, _TokenType.GROUP);
                this._addToken('/', _TokenID.DIV, _TokenType.MULDIV);
                this._addToken('\\', _TokenID.DIVINT, _TokenType.MULDIV);
                this._addToken('=', _TokenID.EQ, _TokenType.COMPARE);
                this._addToken('>', _TokenID.GT, _TokenType.COMPARE);
                this._addToken('<', _TokenID.LT, _TokenType.COMPARE);
                this._addToken('^', _TokenID.POWER, _TokenType.POWER);
                this._addToken("<>", _TokenID.NE, _TokenType.COMPARE);
                this._addToken(">=", _TokenID.GE, _TokenType.COMPARE);
                this._addToken("<=", _TokenID.LE, _TokenType.COMPARE);
                this._addToken('&', _TokenID.CONCAT, _TokenType.CONCAT);
            }
        };
        _CalcEngine.prototype._registerAggregateFunction = function () {
            var self = this;
            self._functionTable['sum'] = new _FunctionDefinition(function (params, sheet) {
                return self._getAggregateResult(wjcCore.Aggregate.Sum, params, sheet);
            });
            self._functionTable['average'] = new _FunctionDefinition(function (params, sheet) {
                return self._getAggregateResult(wjcCore.Aggregate.Avg, params, sheet);
            });
            self._functionTable['max'] = new _FunctionDefinition(function (params, sheet) {
                return self._getAggregateResult(wjcCore.Aggregate.Max, params, sheet);
            });
            self._functionTable['min'] = new _FunctionDefinition(function (params, sheet) {
                return self._getAggregateResult(wjcCore.Aggregate.Min, params, sheet);
            });
            self._functionTable['var'] = new _FunctionDefinition(function (params, sheet) {
                return self._getAggregateResult(wjcCore.Aggregate.Var, params, sheet);
            });
            self._functionTable['varp'] = new _FunctionDefinition(function (params, sheet) {
                return self._getAggregateResult(wjcCore.Aggregate.VarPop, params, sheet);
            });
            self._functionTable['stdev'] = new _FunctionDefinition(function (params, sheet) {
                return self._getAggregateResult(wjcCore.Aggregate.Std, params, sheet);
            });
            self._functionTable['stdevp'] = new _FunctionDefinition(function (params, sheet) {
                return self._getAggregateResult(wjcCore.Aggregate.StdPop, params, sheet);
            });
            self._functionTable['count'] = new _FunctionDefinition(function (params, sheet) {
                return self._getFlexSheetAggregateResult(_FlexSheetAggregate.Count, params, sheet);
            });
            self._functionTable['counta'] = new _FunctionDefinition(function (params, sheet) {
                return self._getFlexSheetAggregateResult(_FlexSheetAggregate.CountA, params, sheet);
            });
            self._functionTable['countblank'] = new _FunctionDefinition(function (params, sheet) {
                return self._getFlexSheetAggregateResult(_FlexSheetAggregate.ConutBlank, params, sheet);
            });
            self._functionTable['countif'] = new _FunctionDefinition(function (params, sheet) {
                return self._getFlexSheetAggregateResult(_FlexSheetAggregate.CountIf, params, sheet);
            }, 2, 2);
            self._functionTable['countifs'] = new _FunctionDefinition(function (params, sheet) {
                return self._getFlexSheetAggregateResult(_FlexSheetAggregate.CountIfs, params, sheet);
            }, 254, 2);
            self._functionTable['sumif'] = new _FunctionDefinition(function (params, sheet) {
                return self._getFlexSheetAggregateResult(_FlexSheetAggregate.SumIf, params, sheet);
            }, 3, 2);
            self._functionTable['sumifs'] = new _FunctionDefinition(function (params, sheet) {
                return self._getFlexSheetAggregateResult(_FlexSheetAggregate.SumIfs, params, sheet);
            }, 255, 2);
            self._functionTable['rank'] = new _FunctionDefinition(function (params, sheet) {
                return self._getFlexSheetAggregateResult(_FlexSheetAggregate.Rank, params, sheet);
            }, 3, 2);
            self._functionTable['product'] = new _FunctionDefinition(function (params, sheet) {
                return self._getFlexSheetAggregateResult(_FlexSheetAggregate.Product, params, sheet);
            }, 255, 1);
            self._functionTable['subtotal'] = new _FunctionDefinition(function (params, sheet) {
                return self._handleSubtotal(params, sheet);
            }, 255, 2);
            self._functionTable['dcount'] = new _FunctionDefinition(function (params, sheet) {
                return self._handleDCount(params, sheet);
            }, 3, 3);
            self._functionTable['sumproduct'] = new _FunctionDefinition(function (params, sheet) {
                return self._getSumProduct(params, sheet);
            }, 255, 1);
        };
        _CalcEngine.prototype._registerMathFunction = function () {
            var self = this, unaryFuncs = ['abs', 'acos', 'asin', 'atan', 'ceiling', 'cos', 'exp', 'floor', 'ln', 'sin', 'sqrt', 'tan'], roundFuncs = ['round', 'rounddown', 'roundup'];
            self._functionTable['pi'] = new _FunctionDefinition(function () {
                return Math.PI;
            }, 0, 0);
            self._functionTable['rand'] = new _FunctionDefinition(function () {
                return Math.random();
            }, 0, 0);
            self._functionTable['power'] = new _FunctionDefinition(function (params, sheet) {
                return Math.pow(_Expression.toNumber(params[0], sheet), _Expression.toNumber(params[1], sheet));
            }, 2, 2);
            self._functionTable['atan2'] = new _FunctionDefinition(function (params, sheet) {
                var x = _Expression.toNumber(params[0], sheet), y = _Expression.toNumber(params[1], sheet);
                if (x === 0 && y === 0) {
                    throw 'The x number and y number can\'t both be zero for the atan2 function';
                }
                return Math.atan2(y, x);
            }, 2, 2);
            self._functionTable['mod'] = new _FunctionDefinition(function (params, sheet) {
                return _Expression.toNumber(params[0], sheet) % _Expression.toNumber(params[1], sheet);
            }, 2, 2);
            self._functionTable['trunc'] = new _FunctionDefinition(function (params, sheet) {
                var num = _Expression.toNumber(params[0], sheet), precision = params.length === 2 ? _Expression.toNumber(params[1], sheet) : 0, multiple;
                if (precision === 0) {
                    if (num >= 0) {
                        return Math.floor(num);
                    }
                    else {
                        return Math.ceil(num);
                    }
                }
                else {
                    multiple = Math.pow(10, precision);
                    if (num >= 0) {
                        return Math.floor(num * multiple) / multiple;
                    }
                    else {
                        return Math.ceil(num * multiple) / multiple;
                    }
                }
            }, 2, 1);
            roundFuncs.forEach(function (val) {
                self._functionTable[val] = new _FunctionDefinition(function (params, sheet) {
                    var num = _Expression.toNumber(params[0], sheet), precision = _Expression.toNumber(params[1], sheet), result, format, multiple;
                    if (precision === 0) {
                        switch (val) {
                            case 'rounddown':
                                if (num >= 0) {
                                    result = Math.floor(num);
                                }
                                else {
                                    result = Math.ceil(num);
                                }
                                break;
                            case 'roundup':
                                if (num >= 0) {
                                    result = Math.ceil(num);
                                }
                                else {
                                    result = Math.floor(num);
                                }
                                break;
                            case 'round':
                                result = Math.round(num);
                                break;
                            default:
                                result = Math.floor(num);
                                break;
                        }
                        format = 'n0';
                    }
                    else if (precision > 0 && wjcCore.isInt(precision)) {
                        multiple = Math.pow(10, precision);
                        switch (val) {
                            case 'rounddown':
                                if (num >= 0) {
                                    result = Math.floor(num * multiple) / multiple;
                                }
                                else {
                                    result = Math.ceil(num * multiple) / multiple;
                                }
                                break;
                            case 'roundup':
                                if (num >= 0) {
                                    result = Math.ceil(num * multiple) / multiple;
                                }
                                else {
                                    result = Math.floor(num * multiple) / multiple;
                                }
                                break;
                            case 'round':
                                result = Math.round(num * multiple) / multiple;
                                break;
                        }
                        format = 'n' + precision;
                    }
                    if (result != null) {
                        return {
                            value: result,
                            format: format
                        };
                    }
                    throw 'Invalid precision!';
                }, 2, 2);
            });
            unaryFuncs.forEach(function (val) {
                self._functionTable[val] = new _FunctionDefinition(function (params, sheet) {
                    switch (val) {
                        case 'ceiling':
                            return Math.ceil(_Expression.toNumber(params[0], sheet));
                        case 'ln':
                            return Math.log(_Expression.toNumber(params[0], sheet));
                        default:
                            return Math[val](_Expression.toNumber(params[0], sheet));
                    }
                }, 1, 1);
            });
        };
        _CalcEngine.prototype._registerLogicalFunction = function () {
            this._functionTable['and'] = new _FunctionDefinition(function (params, sheet) {
                var result = true, index;
                for (index = 0; index < params.length; index++) {
                    result = result && _Expression.toBoolean(params[index], sheet);
                    if (!result) {
                        break;
                    }
                }
                return result;
            }, Number.MAX_VALUE, 1);
            this._functionTable['or'] = new _FunctionDefinition(function (params, sheet) {
                var result = false, index;
                for (index = 0; index < params.length; index++) {
                    result = result || _Expression.toBoolean(params[index], sheet);
                    if (result) {
                        break;
                    }
                }
                return result;
            }, Number.MAX_VALUE, 1);
            this._functionTable['not'] = new _FunctionDefinition(function (params, sheet) {
                return !_Expression.toBoolean(params[0], sheet);
            }, 1, 1);
            this._functionTable['if'] = new _FunctionDefinition(function (params, sheet) {
                if (params.length === 3) {
                    return _Expression.toBoolean(params[0], sheet) ? params[1].evaluate(sheet) : params[2].evaluate(sheet);
                }
                else {
                    return _Expression.toBoolean(params[0], sheet) ? params[1].evaluate(sheet) : false;
                }
            }, 3, 2);
            this._functionTable['true'] = new _FunctionDefinition(function () {
                return true;
            }, 0, 0);
            this._functionTable['false'] = new _FunctionDefinition(function () {
                return false;
            }, 0, 0);
        };
        _CalcEngine.prototype._registerTextFunction = function () {
            this._functionTable['char'] = new _FunctionDefinition(function (params, sheet) {
                var index, result = '';
                for (index = 0; index < params.length; index++) {
                    result += String.fromCharCode(_Expression.toNumber(params[index], sheet));
                }
                return result;
            }, Number.MAX_VALUE, 1);
            this._functionTable['code'] = new _FunctionDefinition(function (params, sheet) {
                var str = _Expression.toString(params[0], sheet);
                if (str && str.length > 0) {
                    return str.charCodeAt(0);
                }
                return -1;
            }, 1, 1);
            this._functionTable['concatenate'] = new _FunctionDefinition(function (params, sheet) {
                var index, result = '';
                for (index = 0; index < params.length; index++) {
                    result = result.concat(_Expression.toString(params[index], sheet));
                }
                return result;
            }, Number.MAX_VALUE, 1);
            this._functionTable['left'] = new _FunctionDefinition(function (params, sheet) {
                var str = _Expression.toString(params[0], sheet), length = Math.floor(_Expression.toNumber(params[1], sheet));
                if (str && str.length > 0) {
                    return str.slice(0, length);
                }
                return undefined;
            }, 2, 2);
            this._functionTable['right'] = new _FunctionDefinition(function (params, sheet) {
                var str = _Expression.toString(params[0], sheet), length = Math.floor(_Expression.toNumber(params[1], sheet));
                if (str && str.length > 0) {
                    return str.slice(-length);
                }
                return undefined;
            }, 2, 2);
            this._functionTable['find'] = new _FunctionDefinition(function (params, sheet) {
                var search = _Expression.toString(params[0], sheet), text = _Expression.toString(params[1], sheet), startIndex = params[2] != null ? wjcCore.asInt(_Expression.toNumber(params[2])) : 0, result;
                if (text != null && search != null) {
                    if (!isNaN(startIndex) && startIndex > 0 && startIndex < text.length) {
                        result = text.indexOf(search, startIndex);
                    }
                    else {
                        result = text.indexOf(search);
                    }
                    if (result > -1) {
                        return result + 1;
                    }
                }
                return -1;
            }, 3, 2);
            this._functionTable['search'] = new _FunctionDefinition(function (params, sheet) {
                var search = _Expression.toString(params[0], sheet), text = _Expression.toString(params[1], sheet), startIndex = params[2] != null ? wjcCore.asInt(_Expression.toNumber(params[2])) : 0, adjustNum, searchRegExp, result;
                if (text != null && search != null) {
                    searchRegExp = new RegExp(search, 'i');
                    if (!isNaN(startIndex) && startIndex > 0 && startIndex < text.length) {
                        text = text.substring(startIndex);
                        adjustNum = startIndex + 1;
                    }
                    else {
                        adjustNum = 1;
                    }
                    result = text.search(searchRegExp);
                    if (result > -1) {
                        return result + adjustNum;
                    }
                }
                return -1;
            }, 3, 2);
            this._functionTable['len'] = new _FunctionDefinition(function (params, sheet) {
                var str = _Expression.toString(params[0], sheet);
                if (str) {
                    return str.length;
                }
                return -1;
            }, 1, 1);
            this._functionTable['mid'] = new _FunctionDefinition(function (params, sheet) {
                var text = _Expression.toString(params[0], sheet), start = Math.floor(_Expression.toNumber(params[1], sheet)), length = Math.floor(_Expression.toNumber(params[2], sheet));
                if (text && text.length > 0 && start > 0) {
                    return text.substr(start - 1, length);
                }
                return undefined;
            }, 3, 3);
            this._functionTable['lower'] = new _FunctionDefinition(function (params, sheet) {
                var str = _Expression.toString(params[0], sheet);
                if (str && str.length > 0) {
                    return str.toLowerCase();
                }
                return undefined;
            }, 1, 1);
            this._functionTable['upper'] = new _FunctionDefinition(function (params, sheet) {
                var str = _Expression.toString(params[0], sheet);
                if (str && str.length > 0) {
                    return str.toUpperCase();
                }
                return undefined;
            }, 1, 1);
            this._functionTable['proper'] = new _FunctionDefinition(function (params, sheet) {
                var str = _Expression.toString(params[0], sheet);
                if (str && str.length > 0) {
                    return str[0].toUpperCase() + str.substring(1).toLowerCase();
                }
                return undefined;
            }, 1, 1);
            this._functionTable['trim'] = new _FunctionDefinition(function (params, sheet) {
                var str = _Expression.toString(params[0], sheet);
                if (str && str.length > 0) {
                    return str.trim();
                }
                return undefined;
            }, 1, 1);
            this._functionTable['replace'] = new _FunctionDefinition(function (params, sheet) {
                var text = _Expression.toString(params[0], sheet), start = Math.floor(_Expression.toNumber(params[1], sheet)), length = Math.floor(_Expression.toNumber(params[2], sheet)), replaceText = _Expression.toString(params[3], sheet);
                if (text && text.length > 0 && start > 0) {
                    return text.substring(0, start - 1) + replaceText + text.slice(start - 1 + length);
                }
                return undefined;
            }, 4, 4);
            this._functionTable['substitute'] = new _FunctionDefinition(function (params, sheet) {
                var text = _Expression.toString(params[0], sheet), oldText = _Expression.toString(params[1], sheet), newText = _Expression.toString(params[2], sheet), searhRegExp;
                if (text && text.length > 0 && oldText && oldText.length > 0) {
                    searhRegExp = new RegExp(oldText, 'g');
                    return text.replace(searhRegExp, newText);
                }
                return undefined;
            }, 3, 3);
            this._functionTable['rept'] = new _FunctionDefinition(function (params, sheet) {
                var text = _Expression.toString(params[0], sheet), repeatTimes = Math.floor(_Expression.toNumber(params[1], sheet)), result = '', i;
                if (text && text.length > 0 && repeatTimes > 0) {
                    for (i = 0; i < repeatTimes; i++) {
                        result = result.concat(text);
                    }
                }
                return result;
            }, 2, 2);
            this._functionTable['text'] = new _FunctionDefinition(function (params, sheet) {
                var value = params[0].evaluate(), format = _Expression.toString(params[1], sheet);
                if (!!format && format.indexOf('#') > -1) {
                    format = wjcXlsx.Workbook.fromXlsxFormat(format)[0];
                }
                return wjcCore.Globalize.format(value, format);
            }, 2, 2);
            this._functionTable['value'] = new _FunctionDefinition(function (params, sheet) {
                return _Expression.toNumber(params[0], sheet);
            }, 1, 1);
        };
        _CalcEngine.prototype._registerDateFunction = function () {
            this._functionTable['now'] = new _FunctionDefinition(function () {
                return {
                    value: new Date(),
                    format: 'M/d/yyyy h:mm'
                };
            }, 0, 0);
            this._functionTable['today'] = new _FunctionDefinition(function () {
                var now = new Date();
                return {
                    value: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                    format: 'd'
                };
            }, 0, 0);
            this._functionTable['year'] = new _FunctionDefinition(function (params, sheet) {
                var date = _Expression.toDate(params[0], sheet);
                if (!wjcCore.isPrimitive(date) && date) {
                    return date.value;
                }
                if (wjcCore.isDate(date)) {
                    return date.getFullYear();
                }
                return 1900;
            }, 1, 1);
            this._functionTable['month'] = new _FunctionDefinition(function (params, sheet) {
                var date = _Expression.toDate(params[0], sheet);
                if (!wjcCore.isPrimitive(date) && date) {
                    return date.value;
                }
                if (wjcCore.isDate(date)) {
                    return date.getMonth() + 1;
                }
                return 1;
            }, 1, 1);
            this._functionTable['day'] = new _FunctionDefinition(function (params, sheet) {
                var date = _Expression.toDate(params[0], sheet);
                if (!wjcCore.isPrimitive(date) && date) {
                    return date.value;
                }
                if (wjcCore.isDate(date)) {
                    return date.getDate();
                }
                return 0;
            }, 1, 1);
            this._functionTable['hour'] = new _FunctionDefinition(function (params, sheet) {
                var val = params[0].evaluate(sheet);
                if (wjcCore.isNumber(val) && !isNaN(val)) {
                    return Math.floor(24 * (val - Math.floor(val)));
                }
                else if (wjcCore.isDate(val)) {
                    return val.getHours();
                }
                val = _Expression.toDate(params[0], sheet);
                if (!wjcCore.isPrimitive(val) && val) {
                    val = val.value;
                }
                if (wjcCore.isDate(val)) {
                    return val.getHours();
                }
                throw 'Invalid parameter.';
            }, 1, 1);
            this._functionTable['time'] = new _FunctionDefinition(function (params, sheet) {
                var hour = params[0].evaluate(sheet), minute = params[1].evaluate(sheet), second = params[2].evaluate(sheet);
                if (wjcCore.isNumber(hour) && wjcCore.isNumber(minute) && wjcCore.isNumber(second)) {
                    hour %= 24;
                    minute %= 60;
                    second %= 60;
                    return {
                        value: new Date(0, 0, 0, hour, minute, second),
                        format: 't'
                    };
                }
                throw 'Invalid parameters.';
            }, 3, 3);
            this._functionTable['date'] = new _FunctionDefinition(function (params, sheet) {
                var year = params[0].evaluate(sheet), month = params[1].evaluate(sheet), day = params[2].evaluate(sheet);
                if (wjcCore.isNumber(year) && wjcCore.isNumber(month) && wjcCore.isNumber(day)) {
                    return {
                        value: new Date(year, month - 1, day),
                        format: 'd'
                    };
                }
                throw 'Invalid parameters.';
            }, 3, 3);
            this._functionTable['datedif'] = new _FunctionDefinition(function (params, sheet) {
                var startDate = _Expression.toDate(params[0], sheet), endDate = _Expression.toDate(params[1], sheet), unit = params[2].evaluate(sheet), startDateTime, endDateTime, diffDays, diffMonths, diffYears;
                if (!wjcCore.isPrimitive(startDate) && startDate) {
                    startDate = startDate.value;
                }
                if (!wjcCore.isPrimitive(endDate) && endDate) {
                    endDate = endDate.value;
                }
                if (wjcCore.isDate(startDate) && wjcCore.isDate(endDate) && wjcCore.isString(unit)) {
                    startDateTime = startDate.getTime();
                    endDateTime = endDate.getTime();
                    if (startDateTime > endDateTime) {
                        throw 'Start date is later than end date.';
                    }
                    diffDays = endDate.getDate() - startDate.getDate();
                    diffMonths = endDate.getMonth() - startDate.getMonth();
                    diffYears = endDate.getFullYear() - startDate.getFullYear();
                    switch (unit.toUpperCase()) {
                        case 'Y':
                            if (diffMonths > 0) {
                                return diffYears;
                            }
                            else if (diffMonths < 0) {
                                return diffYears - 1;
                            }
                            else {
                                if (diffDays >= 0) {
                                    return diffYears;
                                }
                                else {
                                    return diffYears - 1;
                                }
                            }
                        case 'M':
                            if (diffDays >= 0) {
                                return diffYears * 12 + diffMonths;
                            }
                            else {
                                return diffYears * 12 + diffMonths - 1;
                            }
                        case 'D':
                            return (endDateTime - startDateTime) / (1000 * 3600 * 24);
                        case 'YM':
                            if (diffDays >= 0) {
                                diffMonths = diffYears * 12 + diffMonths;
                            }
                            else {
                                diffMonths = diffYears * 12 + diffMonths - 1;
                            }
                            return diffMonths % 12;
                        case 'YD':
                            if (diffMonths > 0) {
                                return (new Date(startDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime() - startDate.getTime()) / (1000 * 3600 * 24);
                            }
                            else if (diffMonths < 0) {
                                return (new Date(startDate.getFullYear() + 1, endDate.getMonth(), endDate.getDate()).getTime() - startDate.getTime()) / (1000 * 3600 * 24);
                            }
                            else {
                                if (diffDays >= 0) {
                                    return diffDays;
                                }
                                else {
                                    return (new Date(startDate.getFullYear() + 1, endDate.getMonth(), endDate.getDate()).getTime() - startDate.getTime()) / (1000 * 3600 * 24);
                                }
                            }
                        case 'MD':
                            if (diffDays >= 0) {
                                return diffDays;
                            }
                            else {
                                diffDays = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate() - new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1).getDate() + 1 + diffDays;
                                return diffDays;
                            }
                        default:
                            throw 'Invalid unit.';
                    }
                }
                throw 'Invalid parameters.';
            }, 3, 3);
        };
        _CalcEngine.prototype._registLookUpReferenceFunction = function () {
            var self = this;
            self._functionTable['column'] = new _FunctionDefinition(function (params, sheet, rowIndex, columnIndex) {
                var cellExpr;
                if (params == null) {
                    return columnIndex + 1;
                }
                cellExpr = params[0];
                cellExpr = self._ensureNonFunctionExpression(cellExpr);
                if (cellExpr instanceof _CellRangeExpression) {
                    return cellExpr.cells.col + 1;
                }
                throw 'Invalid Cell Reference.';
            }, 1, 0);
            self._functionTable['columns'] = new _FunctionDefinition(function (params, sheet) {
                var cellExpr = params[0];
                cellExpr = self._ensureNonFunctionExpression(cellExpr);
                if (cellExpr instanceof _CellRangeExpression) {
                    return cellExpr.cells.columnSpan;
                }
                throw 'Invalid Cell Reference.';
            }, 1, 1);
            self._functionTable['row'] = new _FunctionDefinition(function (params, sheet, rowIndex, columnIndex) {
                var cellExpr;
                if (params == null) {
                    return rowIndex + 1;
                }
                cellExpr = params[0];
                cellExpr = self._ensureNonFunctionExpression(cellExpr);
                if (cellExpr instanceof _CellRangeExpression) {
                    return cellExpr.cells.row + 1;
                }
                throw 'Invalid Cell Reference.';
            }, 1, 0);
            self._functionTable['rows'] = new _FunctionDefinition(function (params, sheet) {
                var cellExpr = params[0];
                cellExpr = self._ensureNonFunctionExpression(cellExpr);
                if (cellExpr instanceof _CellRangeExpression) {
                    return cellExpr.cells.rowSpan;
                }
                throw 'Invalid Cell Reference.';
            }, 1, 1);
            self._functionTable['choose'] = new _FunctionDefinition(function (params, sheet) {
                var index = _Expression.toNumber(params[0], sheet);
                if (isNaN(index)) {
                    throw 'Invalid index number.';
                }
                if (index < 1 || index >= params.length) {
                    throw 'The index number is out of the list range.';
                }
                return params[index].evaluate(sheet);
            }, 255, 2);
            self._functionTable['index'] = new _FunctionDefinition(function (params, sheet) {
                var cellExpr = params[0], cells, rowNum = _Expression.toNumber(params[1], sheet), colNum = params[2] != null ? _Expression.toNumber(params[2], sheet) : 0;
                if (isNaN(rowNum) || rowNum < 0) {
                    throw 'Invalid Row Number.';
                }
                if (isNaN(colNum) || colNum < 0) {
                    throw 'Invalid Column Number.';
                }
                cellExpr = self._ensureNonFunctionExpression(cellExpr);
                if (cellExpr instanceof _CellRangeExpression) {
                    cells = cellExpr.cells;
                    if (rowNum > cells.rowSpan || colNum > cells.columnSpan) {
                        throw 'Index is out of the cell range.';
                    }
                    if (rowNum > 0 && colNum > 0) {
                        return self._owner.getCellValue(cells.topRow + rowNum - 1, cells.leftCol + colNum - 1, true, sheet);
                    }
                    if (rowNum === 0 && colNum === 0) {
                        return cellExpr;
                    }
                    if (rowNum === 0) {
                        return new _CellRangeExpression(new wjcGrid.CellRange(cells.topRow, cells.leftCol + colNum - 1, cells.bottomRow, cells.leftCol + colNum - 1), cellExpr.sheetRef, self._owner);
                    }
                    if (colNum === 0) {
                        return new _CellRangeExpression(new wjcGrid.CellRange(cells.topRow + rowNum - 1, cells.leftCol, cells.topRow + rowNum - 1, cells.rightCol), cellExpr.sheetRef, self._owner);
                    }
                }
                throw 'Invalid Cell Reference.';
            }, 4, 2);
            self._functionTable['hlookup'] = new _FunctionDefinition(function (params, sheet) {
                return self._handleHLookup(params, sheet);
            }, 4, 3);
        };
        _CalcEngine.prototype._registFinacialFunction = function () {
            var self = this;
            self._functionTable['rate'] = new _FunctionDefinition(function (params, sheet) {
                var rate = self._calculateRate(params, sheet);
                return {
                    value: rate,
                    format: 'p2'
                };
            }, 6, 3);
        };
        _CalcEngine.prototype._addToken = function (symbol, id, type) {
            var token = new _Token(symbol, id, type);
            this._tokenTable[symbol] = token;
        };
        _CalcEngine.prototype._parseExpression = function () {
            this._getToken();
            return this._parseCompareOrConcat();
        };
        _CalcEngine.prototype._parseCompareOrConcat = function () {
            var x = this._parseAddSub(), t, exprArg;
            while (this._token.tokenType === _TokenType.COMPARE || this._token.tokenType === _TokenType.CONCAT) {
                t = this._token;
                this._getToken();
                exprArg = this._parseAddSub();
                x = new _BinaryExpression(t, x, exprArg);
            }
            return x;
        };
        _CalcEngine.prototype._parseAddSub = function () {
            var x = this._parseMulDiv(), t, exprArg;
            while (this._token.tokenType === _TokenType.ADDSUB) {
                t = this._token;
                this._getToken();
                exprArg = this._parseMulDiv();
                x = new _BinaryExpression(t, x, exprArg);
            }
            return x;
        };
        _CalcEngine.prototype._parseMulDiv = function () {
            var x = this._parsePower(), t, exprArg;
            while (this._token.tokenType === _TokenType.MULDIV) {
                t = this._token;
                this._getToken();
                exprArg = this._parsePower();
                x = new _BinaryExpression(t, x, exprArg);
            }
            return x;
        };
        _CalcEngine.prototype._parsePower = function () {
            var x = this._parseUnary(), t, exprArg;
            while (this._token.tokenType === _TokenType.POWER) {
                t = this._token;
                this._getToken();
                exprArg = this._parseUnary();
                x = new _BinaryExpression(t, x, exprArg);
            }
            return x;
        };
        _CalcEngine.prototype._parseUnary = function () {
            var t, exprArg;
            if (this._token.tokenID === _TokenID.ADD || this._token.tokenID === _TokenID.SUB) {
                t = this._token;
                this._getToken();
                exprArg = this._parseAtom();
                return new _UnaryExpression(t, exprArg);
            }
            return this._parseAtom();
        };
        _CalcEngine.prototype._parseAtom = function () {
            var x = null, id, funcDefinition, params, pCnt, cellRef;
            switch (this._token.tokenType) {
                case _TokenType.LITERAL:
                    x = new _Expression(this._token);
                    break;
                case _TokenType.IDENTIFIER:
                    id = this._token.value.toString().toLowerCase();
                    funcDefinition = this._functionTable[id];
                    if (funcDefinition) {
                        params = this._getParameters();
                        pCnt = params ? params.length : 0;
                        if (funcDefinition.paramMin !== -1 && pCnt < funcDefinition.paramMin) {
                            throw 'Too few parameters.';
                        }
                        if (funcDefinition.paramMax !== -1 && pCnt > funcDefinition.paramMax) {
                            throw 'Too many parameters.';
                        }
                        x = new _FunctionExpression(funcDefinition, params, id !== 'rand');
                        break;
                    }
                    cellRef = this._getCellRange(id);
                    if (cellRef) {
                        x = new _CellRangeExpression(cellRef.cellRange, cellRef.sheetRef, this._owner);
                        break;
                    }
                    params = this._getParameters();
                    x = this.onUnknownFunction(id, params);
                    break;
                case _TokenType.GROUP:
                    if (this._token.tokenID !== _TokenID.OPEN) {
                        throw 'Expression expected.';
                    }
                    this._getToken();
                    x = this._parseCompareOrConcat();
                    if (this._token.tokenID !== _TokenID.CLOSE) {
                        throw 'Unbalanced parenthesis.';
                    }
                    break;
            }
            if (x === null) {
                throw '';
            }
            this._getToken();
            return x;
        };
        _CalcEngine.prototype._getToken = function () {
            var i, c, lastChar, isLetter, isDigit, id = '', sheetRef = '', japaneseRegExp = new RegExp('[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]');
            while (this._pointer < this._expressLength && this._expression[this._pointer] === ' ') {
                this._pointer++;
            }
            if (this._pointer >= this._expressLength) {
                this._token = new _Token(null, _TokenID.END, _TokenType.GROUP);
                return;
            }
            c = this._expression[this._pointer];
            isLetter = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || japaneseRegExp.test(c);
            isDigit = (c >= '0' && c <= '9') || c == '.';
            if (!isLetter && !isDigit) {
                var tk = this._tokenTable[c];
                if (tk) {
                    this._token = tk;
                    this._pointer++;
                    if (this._pointer < this._expressLength && (c === '>' || c === '<')) {
                        tk = this._tokenTable[this._expression.substring(this._pointer - 1, this._pointer + 1)];
                        if (tk) {
                            this._token = tk;
                            this._pointer++;
                        }
                    }
                    return;
                }
            }
            if (isDigit) {
                this._parseDigit();
                return;
            }
            if (c === '\"') {
                this._parseString();
                return;
            }
            if (c === '\'') {
                sheetRef = this._parseSheetRef();
                if (!sheetRef) {
                    return;
                }
            }
            if (c === '#') {
                this._parseDate();
                return;
            }
            if (!isLetter && c !== '_' && this._idChars.indexOf(c) < 0 && !sheetRef) {
                throw 'Identifier expected.';
            }
            for (i = 1; i + this._pointer < this._expressLength; i++) {
                c = this._expression[this._pointer + i];
                isLetter = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || japaneseRegExp.test(c);
                isDigit = c >= '0' && c <= '9';
                if (c === '\'' && lastChar === ':') {
                    id = sheetRef + this._expression.substring(this._pointer, this._pointer + i);
                    this._pointer += i;
                    sheetRef = this._parseSheetRef();
                    i = 0;
                    continue;
                }
                lastChar = c;
                if (!isLetter && !isDigit && c !== '_' && this._idChars.indexOf(c) < 0) {
                    break;
                }
            }
            id += sheetRef + this._expression.substring(this._pointer, this._pointer + i);
            this._pointer += i;
            this._token = new _Token(id, _TokenID.ATOM, _TokenType.IDENTIFIER);
        };
        _CalcEngine.prototype._parseDigit = function () {
            var div = -1, sci = false, pct = false, val = 0.0, i, c, lit;
            for (i = 0; i + this._pointer < this._expressLength; i++) {
                c = this._expression[this._pointer + i];
                if (c >= '0' && c <= '9') {
                    val = val * 10 + (+c - 0);
                    if (div > -1) {
                        div *= 10;
                    }
                    continue;
                }
                if (c === '.' && div < 0) {
                    div = 1;
                    continue;
                }
                if ((c === 'E' || c === 'e') && !sci) {
                    sci = true;
                    c = this._expression[this._pointer + i + 1];
                    if (c === '+' || c === '-')
                        i++;
                    continue;
                }
                if (c === '%') {
                    pct = true;
                    i++;
                    break;
                }
                break;
            }
            if (!sci) {
                if (div > 1) {
                    val /= div;
                }
                if (pct) {
                    val /= 100.0;
                }
            }
            else {
                lit = this._expression.substring(this._pointer, this._pointer + i);
                val = +lit;
            }
            this._token = new _Token(val, _TokenID.ATOM, _TokenType.LITERAL);
            this._pointer += i;
        };
        _CalcEngine.prototype._parseString = function () {
            var i, c, cNext, lit;
            for (i = 1; i + this._pointer < this._expressLength; i++) {
                c = this._expression[this._pointer + i];
                if (c !== '\"') {
                    continue;
                }
                cNext = i + this._pointer < this._expressLength - 1 ? this._expression[this._pointer + i + 1] : ' ';
                if (cNext !== '\"') {
                    break;
                }
                i++;
            }
            if (c !== '\"') {
                throw 'Can\'t find final quote.';
            }
            lit = this._expression.substring(this._pointer + 1, this._pointer + i);
            this._pointer += i + 1;
            if (this._expression[this._pointer] === '!') {
                throw 'Illegal cross sheet reference.';
            }
            this._token = new _Token(lit.replace('\"\"', '\"'), _TokenID.ATOM, _TokenType.LITERAL);
        };
        _CalcEngine.prototype._parseDate = function () {
            var i, c, lit;
            for (i = 1; i + this._pointer < this._expressLength; i++) {
                c = this._expression[this._pointer + i];
                if (c === '#') {
                    break;
                }
            }
            if (c !== '#') {
                throw 'Can\'t find final date delimiter ("#").';
            }
            lit = this._expression.substring(this._pointer + 1, this._pointer + i);
            this._pointer += i + 1;
            this._token = new _Token(Date.parse(lit), _TokenID.ATOM, _TokenType.LITERAL);
        };
        _CalcEngine.prototype._parseSheetRef = function () {
            var i, c, cNext, lit;
            for (i = 1; i + this._pointer < this._expressLength; i++) {
                c = this._expression[this._pointer + i];
                if (c !== '\'') {
                    continue;
                }
                cNext = i + this._pointer < this._expressLength - 1 ? this._expression[this._pointer + i + 1] : ' ';
                if (cNext !== '\'') {
                    break;
                }
                i++;
            }
            if (c !== '\'') {
                throw 'Can\'t find final quote.';
            }
            lit = this._expression.substring(this._pointer + 1, this._pointer + i);
            this._pointer += i + 1;
            if (this._expression[this._pointer] === '!') {
                return lit.replace(/\'\'/g, '\'');
            }
            else {
                return '';
            }
        };
        _CalcEngine.prototype._getCellRange = function (identifier) {
            var cells, cell, cell2, sheetRef, rng, rng2;
            if (identifier) {
                cells = identifier.split(':');
                if (cells.length > 0 && cells.length < 3) {
                    cell = this._parseCell(cells[0]);
                    rng = cell.cellRange;
                    if (rng && cells.length === 2) {
                        cell2 = this._parseCell(cells[1]);
                        rng2 = cell2.cellRange;
                        if (cell.sheetRef && !cell2.sheetRef) {
                            cell2.sheetRef = cell.sheetRef;
                        }
                        if (cell.sheetRef !== cell2.sheetRef) {
                            throw 'The cell reference must be in the same sheet!';
                        }
                        if (rng2) {
                            rng.col2 = rng2.col;
                            rng.row2 = rng2.row;
                        }
                        else {
                            rng = null;
                        }
                    }
                }
            }
            if (rng == null) {
                return null;
            }
            return {
                cellRange: rng,
                sheetRef: cell.sheetRef
            };
        };
        _CalcEngine.prototype._parseCellRange = function (cell) {
            var col = -1, row = -1, absCol = false, absRow = false, index, c;
            for (index = 0; index < cell.length; index++) {
                c = cell[index];
                if (c === '$' && !absCol) {
                    absCol = true;
                    continue;
                }
                if (!(c >= 'a' && c <= 'z') && !(c >= 'A' && c <= 'Z')) {
                    break;
                }
                if (col < 0) {
                    col = 0;
                }
                col = 26 * col + (c.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0) + 1);
            }
            for (; index < cell.length; index++) {
                c = cell[index];
                if (c === '$' && !absRow) {
                    absRow = true;
                    continue;
                }
                if (!(c >= '0' && c <= '9')) {
                    break;
                }
                if (row < 0) {
                    row = 0;
                }
                row = 10 * row + (+c - 0);
            }
            if (index < cell.length) {
                row = col = -1;
            }
            if (row === -1 || col === -1) {
                return null;
            }
            return new wjcGrid.CellRange(row - 1, col - 1);
        };
        _CalcEngine.prototype._parseCell = function (cell) {
            var rng, sheetRefIndex, cellsRef, sheetRef;
            sheetRefIndex = cell.lastIndexOf('!');
            if (sheetRefIndex > 0 && sheetRefIndex < cell.length - 1) {
                sheetRef = cell.substring(0, sheetRefIndex);
                cellsRef = cell.substring(sheetRefIndex + 1);
            }
            else if (sheetRefIndex <= 0) {
                cellsRef = cell;
            }
            else {
                return null;
            }
            rng = this._parseCellRange(cellsRef);
            return {
                cellRange: rng,
                sheetRef: sheetRef
            };
        };
        _CalcEngine.prototype._getParameters = function () {
            var pos = this._pointer, tk = this._token, parms, expr;
            this._getToken();
            if (this._token.tokenID !== _TokenID.OPEN) {
                this._pointer = pos;
                this._token = tk;
                return null;
            }
            pos = this._pointer;
            this._getToken();
            if (this._token.tokenID === _TokenID.CLOSE) {
                return null;
            }
            this._pointer = pos;
            parms = new Array();
            expr = this._parseExpression();
            parms.push(expr);
            while (this._token.tokenID === _TokenID.COMMA) {
                expr = this._parseExpression();
                parms.push(expr);
            }
            if (this._token.tokenID !== _TokenID.CLOSE) {
                throw 'Syntax error.';
            }
            return parms;
        };
        _CalcEngine.prototype._getAggregateResult = function (aggType, params, sheet) {
            var list = this._getItemList(params, sheet), result;
            result = wjcCore.getAggregate(aggType, list.items);
            if (list.isDate) {
                result = new Date(result);
            }
            return result;
        };
        _CalcEngine.prototype._getFlexSheetAggregateResult = function (aggType, params, sheet) {
            var list, sumList, num, order;
            switch (aggType) {
                case _FlexSheetAggregate.Count:
                    list = this._getItemList(params, sheet, true, false);
                    return this._countNumberCells(list.items);
                case _FlexSheetAggregate.CountA:
                    list = this._getItemList(params, sheet, false, false);
                    return list.items.length;
                case _FlexSheetAggregate.ConutBlank:
                    list = this._getItemList(params, sheet, false, true);
                    return this._countBlankCells(list.items);
                case _FlexSheetAggregate.Rank:
                    num = _Expression.toNumber(params[0], sheet);
                    order = params[2] ? _Expression.toNumber(params[2], sheet) : 0;
                    if (isNaN(num)) {
                        throw 'Invalid number.';
                    }
                    if (isNaN(order)) {
                        throw 'Invalid order.';
                    }
                    params[1] = this._ensureNonFunctionExpression(params[1]);
                    if (params[1] instanceof _CellRangeExpression) {
                        list = this._getItemList([params[1]], sheet);
                        return this._getRankOfCellRange(num, list.items, order);
                    }
                    throw 'Invalid Cell Reference.';
                case _FlexSheetAggregate.CountIf:
                    params[0] = this._ensureNonFunctionExpression(params[0]);
                    if (params[0] instanceof _CellRangeExpression) {
                        list = this._getItemList([params[0]], sheet, false);
                        return this._countCellsByCriterias([list.items], [params[1]], sheet);
                    }
                    throw 'Invalid Cell Reference.';
                case _FlexSheetAggregate.CountIfs:
                    return this._handleCountIfs(params, sheet);
                case _FlexSheetAggregate.SumIf:
                    params[0] = this._ensureNonFunctionExpression(params[0]);
                    if (params[0] instanceof _CellRangeExpression) {
                        list = this._getItemList([params[0]], sheet, false);
                        params[2] = this._ensureNonFunctionExpression(params[2]);
                        if (params[2] != null && params[2] instanceof _CellRangeExpression) {
                            sumList = this._getItemList([params[2]], sheet);
                        }
                        return this._sumCellsByCriterias([list.items], [params[1]], sumList ? sumList.items : null, sheet);
                    }
                    throw 'Invalid Cell Reference.';
                case _FlexSheetAggregate.SumIfs:
                    return this._handleSumIfs(params, sheet);
                case _FlexSheetAggregate.Product:
                    list = this._getItemList(params, sheet);
                    return this._getProductOfNumbers(list.items);
            }
            throw 'Invalid aggregate type.';
        };
        _CalcEngine.prototype._getItemList = function (params, sheet, needParseToNum, isGetEmptyValue, isGetHiddenValue, columnIndex) {
            if (needParseToNum === void 0) { needParseToNum = true; }
            if (isGetEmptyValue === void 0) { isGetEmptyValue = false; }
            if (isGetHiddenValue === void 0) { isGetHiddenValue = true; }
            var items = new Array(), item, index, cellIndex, cellValues, param, isDate = true;
            for (index = 0; index < params.length; index++) {
                param = params[index];
                param = this._ensureNonFunctionExpression(param);
                if (param instanceof _CellRangeExpression) {
                    cellValues = param.getValues(isGetHiddenValue, columnIndex, sheet);
                    cells: for (cellIndex = 0; cellIndex < cellValues.length; cellIndex++) {
                        item = cellValues[cellIndex];
                        if (!isGetEmptyValue && (item == null || item === '')) {
                            continue cells;
                        }
                        isDate = isDate && (item instanceof Date);
                        item = needParseToNum ? +item : item;
                        items.push(item);
                    }
                }
                else {
                    item = param instanceof _Expression ? param.evaluate(sheet) : param;
                    if (!isGetEmptyValue && (item == null || item === '')) {
                        continue;
                    }
                    isDate = isDate && (item instanceof Date);
                    item = needParseToNum ? +item : item;
                    items.push(item);
                }
            }
            if (items.length === 0) {
                isDate = false;
            }
            return {
                isDate: isDate,
                items: items
            };
        };
        _CalcEngine.prototype._countBlankCells = function (items) {
            var i = 0, count = 0, item;
            for (; i < items.length; i++) {
                item = items[i];
                if (item == null || (wjcCore.isString(item) && item === '') || (wjcCore.isNumber(item) && isNaN(item))) {
                    count++;
                }
            }
            return count;
        };
        _CalcEngine.prototype._countNumberCells = function (items) {
            var i = 0, count = 0, item;
            for (; i < items.length; i++) {
                item = items[i];
                if (item != null && wjcCore.isNumber(item) && !isNaN(item)) {
                    count++;
                }
            }
            return count;
        };
        _CalcEngine.prototype._getRankOfCellRange = function (num, items, order) {
            if (order === void 0) { order = 0; }
            var i = 0, rank = 0, item;
            if (!order) {
                items.sort(function (a, b) {
                    if (isNaN(a) || isNaN(b)) {
                        return 1;
                    }
                    return b - a;
                });
            }
            else {
                items.sort(function (a, b) {
                    if (isNaN(a) || isNaN(b)) {
                        return -1;
                    }
                    return a - b;
                });
            }
            for (; i < items.length; i++) {
                item = items[i];
                if (isNaN(item)) {
                    continue;
                }
                rank++;
                if (num === item) {
                    return rank;
                }
            }
            throw num + ' is not in the cell range.';
        };
        _CalcEngine.prototype._handleCountIfs = function (params, sheet) {
            var i = 0, itemsList = [], critreiaList = [], list, cellExpr, rowCount, colCount;
            if (params.length % 2 !== 0) {
                throw 'Invalid params.';
            }
            for (; i < params.length / 2; i++) {
                cellExpr = params[2 * i];
                cellExpr = this._ensureNonFunctionExpression(cellExpr);
                if (cellExpr instanceof _CellRangeExpression) {
                    if (i === 0) {
                        if (cellExpr.cells) {
                            rowCount = cellExpr.cells.rowSpan;
                            colCount = cellExpr.cells.columnSpan;
                        }
                        else {
                            throw 'Invalid Cell Reference.';
                        }
                    }
                    else {
                        if (!cellExpr.cells) {
                            throw 'Invalid Cell Reference.';
                        }
                        else if (cellExpr.cells.rowSpan !== rowCount || cellExpr.cells.columnSpan !== colCount) {
                            throw 'The row span and column span of each cell range has to be same with each other.';
                        }
                    }
                    list = this._getItemList([cellExpr], sheet, false);
                    itemsList[i] = list.items;
                    critreiaList[i] = params[2 * i + 1];
                }
                else {
                    throw 'Invalid Cell Reference.';
                }
            }
            return this._countCellsByCriterias(itemsList, critreiaList, sheet);
        };
        _CalcEngine.prototype._countCellsByCriterias = function (itemsList, criterias, sheet, countItems) {
            var i = 0, j = 0, count = 0, rangeLength = itemsList[0].length, parsedRightExprs = [], result, countItem, items, leftExpr, rightExpr;
            for (; j < criterias.length; j++) {
                rightExpr = _Expression.toString(criterias[j], sheet);
                if (rightExpr.length === 0) {
                    throw 'Invalid Criteria.';
                }
                if (rightExpr === '*') {
                    parsedRightExprs.push(rightExpr);
                }
                else {
                    parsedRightExprs.push(this._parseRightExpr(rightExpr));
                }
            }
            for (; i < rangeLength; i++) {
                result = false;
                criteriaLoop: for (j = 0; j < itemsList.length; j++) {
                    items = itemsList[j];
                    leftExpr = items[i];
                    rightExpr = parsedRightExprs[j];
                    if (typeof rightExpr === 'string') {
                        if (rightExpr !== '*' && (leftExpr == null || leftExpr === '')) {
                            result = false;
                            break criteriaLoop;
                        }
                        result = rightExpr === '*' || this.evaluate(this._combineExpr(leftExpr, rightExpr), null, sheet);
                        if (!result) {
                            break criteriaLoop;
                        }
                    }
                    else {
                        result = result = rightExpr.reg.test(leftExpr.toString()) === rightExpr.checkMathces;
                        if (!result) {
                            break criteriaLoop;
                        }
                    }
                }
                if (result) {
                    if (countItems) {
                        countItem = countItems[i];
                        if (countItem != null && wjcCore.isNumber(countItem) && !isNaN(countItem)) {
                            count++;
                        }
                    }
                    else {
                        count++;
                    }
                }
            }
            return count;
        };
        _CalcEngine.prototype._handleSumIfs = function (params, sheet) {
            var i = 1, itemsList = [], critreiaList = [], list, sumList, sumCellExpr, cellExpr, rowCount, colCount;
            if (params.length % 2 !== 1) {
                throw 'Invalid params.';
            }
            sumCellExpr = params[0];
            sumCellExpr = this._ensureNonFunctionExpression(sumCellExpr);
            if (sumCellExpr instanceof _CellRangeExpression) {
                if (sumCellExpr.cells) {
                    rowCount = sumCellExpr.cells.rowSpan;
                    colCount = sumCellExpr.cells.columnSpan;
                }
                else {
                    throw 'Invalid Sum Cell Reference.';
                }
                sumList = this._getItemList([sumCellExpr], sheet);
            }
            else {
                throw 'Invalid Sum Cell Reference.';
            }
            for (; i < (params.length + 1) / 2; i++) {
                cellExpr = params[2 * i - 1];
                cellExpr = this._ensureNonFunctionExpression(cellExpr);
                if (cellExpr instanceof _CellRangeExpression) {
                    if (!cellExpr.cells) {
                        throw 'Invalid Criteria Cell Reference.';
                    }
                    else if (cellExpr.cells.rowSpan !== rowCount || cellExpr.cells.columnSpan !== colCount) {
                        throw 'The row span and column span of each cell range has to be same with each other.';
                    }
                    list = this._getItemList([cellExpr], sheet, false);
                    itemsList[i - 1] = list.items;
                    critreiaList[i - 1] = params[2 * i];
                }
                else {
                    throw 'Invalid Criteria Cell Reference.';
                }
            }
            return this._sumCellsByCriterias(itemsList, critreiaList, sumList.items, sheet);
        };
        _CalcEngine.prototype._sumCellsByCriterias = function (itemsList, criterias, sumItems, sheet) {
            var i = 0, j = 0, sum = 0, sumItem, rangeLength = itemsList[0].length, parsedRightExprs = [], result, items, leftExpr, rightExpr;
            if (sumItems == null) {
                sumItems = itemsList[0];
            }
            for (; j < criterias.length; j++) {
                rightExpr = _Expression.toString(criterias[j], sheet);
                if (rightExpr.length === 0) {
                    throw 'Invalid Criteria.';
                }
                if (rightExpr === '*') {
                    parsedRightExprs.push(rightExpr);
                }
                else {
                    parsedRightExprs.push(this._parseRightExpr(rightExpr));
                }
            }
            for (; i < rangeLength; i++) {
                result = false;
                sumItem = sumItems[i];
                criteriaLoop: for (j = 0; j < itemsList.length; j++) {
                    items = itemsList[j];
                    leftExpr = items[i];
                    rightExpr = parsedRightExprs[j];
                    if (typeof rightExpr === 'string') {
                        if (rightExpr !== '*' && (leftExpr == null || leftExpr === '')) {
                            result = false;
                            break criteriaLoop;
                        }
                        result = rightExpr === '*' || this.evaluate(this._combineExpr(leftExpr, rightExpr), null, sheet);
                        if (!result) {
                            break criteriaLoop;
                        }
                    }
                    else {
                        result = rightExpr.reg.test(leftExpr.toString()) === rightExpr.checkMathces;
                        if (!result) {
                            break criteriaLoop;
                        }
                    }
                }
                if (result && wjcCore.isNumber(sumItem) && !isNaN(sumItem)) {
                    sum += sumItem;
                }
            }
            return sum;
        };
        _CalcEngine.prototype._getProductOfNumbers = function (items) {
            var item, i = 0, product = 1, containsValidNum = false;
            if (items) {
                for (; i < items.length; i++) {
                    item = items[i];
                    if (wjcCore.isNumber(item) && !isNaN(item)) {
                        product *= item;
                        containsValidNum = true;
                    }
                }
            }
            if (containsValidNum) {
                return product;
            }
            return 0;
        };
        _CalcEngine.prototype._handleSubtotal = function (params, sheet) {
            var func, list, aggType, result, isGetHiddenValue = true;
            func = _Expression.toNumber(params[0], sheet);
            if ((func >= 1 && func <= 11) || (func >= 101 && func <= 111)) {
                if (func >= 101 && func <= 111) {
                    isGetHiddenValue = false;
                }
                func = wjcCore.asEnum(func, _SubtotalFunction);
                list = this._getItemList(params.slice(1), sheet, true, false, isGetHiddenValue);
                switch (func) {
                    case _SubtotalFunction.Count:
                    case _SubtotalFunction.CountWithoutHidden:
                        return this._countNumberCells(list.items);
                    case _SubtotalFunction.CountA:
                    case _SubtotalFunction.CountAWithoutHidden:
                        return list.items.length;
                    case _SubtotalFunction.Product:
                    case _SubtotalFunction.ProductWithoutHidden:
                        return this._getProductOfNumbers(list.items);
                    case _SubtotalFunction.Average:
                    case _SubtotalFunction.AverageWithoutHidden:
                        aggType = wjcCore.Aggregate.Avg;
                        break;
                    case _SubtotalFunction.Max:
                    case _SubtotalFunction.MaxWithoutHidden:
                        aggType = wjcCore.Aggregate.Max;
                        break;
                    case _SubtotalFunction.Min:
                    case _SubtotalFunction.MinWithoutHidden:
                        aggType = wjcCore.Aggregate.Min;
                        break;
                    case _SubtotalFunction.Std:
                    case _SubtotalFunction.StdWithoutHidden:
                        aggType = wjcCore.Aggregate.Std;
                        break;
                    case _SubtotalFunction.StdPop:
                    case _SubtotalFunction.StdPopWithoutHidden:
                        aggType = wjcCore.Aggregate.StdPop;
                        break;
                    case _SubtotalFunction.Sum:
                    case _SubtotalFunction.SumWithoutHidden:
                        aggType = wjcCore.Aggregate.Sum;
                        break;
                    case _SubtotalFunction.Var:
                    case _SubtotalFunction.VarWithoutHidden:
                        aggType = wjcCore.Aggregate.Var;
                        break;
                    case _SubtotalFunction.VarPop:
                    case _SubtotalFunction.VarPopWithoutHidden:
                        aggType = wjcCore.Aggregate.VarPop;
                        break;
                }
                result = wjcCore.getAggregate(aggType, list.items);
                if (list.isDate) {
                    result = new Date(result);
                }
                return result;
            }
            throw 'Invalid Subtotal function.';
        };
        _CalcEngine.prototype._handleDCount = function (params, sheet) {
            var cellExpr = params[0], criteriaCellExpr = params[2], count = 0, field, columnIndex, list;
            cellExpr = this._ensureNonFunctionExpression(cellExpr);
            criteriaCellExpr = this._ensureNonFunctionExpression(criteriaCellExpr);
            if (cellExpr instanceof _CellRangeExpression && criteriaCellExpr instanceof _CellRangeExpression) {
                field = params[1].evaluate(sheet);
                columnIndex = this._getColumnIndexByField(cellExpr, field);
                list = this._getItemList([cellExpr], sheet, true, false, true, columnIndex);
                if (list.items && list.items.length > 1) {
                    return this._DCountWithCriterias(list.items.slice(1), cellExpr, criteriaCellExpr);
                }
            }
            throw 'Invalid Count Cell Reference.';
        };
        _CalcEngine.prototype._DCountWithCriterias = function (countItems, countRef, criteriaRef) {
            var criteriaCells = criteriaRef.cells, count = 0, countSheet, criteriaSheet, fieldRowIndex, rowIndex, colIndex, criteriaColIndex, criteria, criteriaField, list, itemsList, criteriaList;
            countSheet = this._getSheet(countRef.sheetRef);
            criteriaSheet = this._getSheet(criteriaRef.sheetRef);
            if (criteriaCells.rowSpan > 1) {
                fieldRowIndex = criteriaCells.topRow;
                for (rowIndex = criteriaCells.bottomRow; rowIndex > criteriaCells.topRow; rowIndex--) {
                    itemsList = [];
                    criteriaList = [];
                    for (colIndex = criteriaCells.leftCol; colIndex <= criteriaCells.rightCol; colIndex++) {
                        criteria = this._owner.getCellValue(rowIndex, colIndex, false, criteriaSheet);
                        if (criteria != null && criteria !== '') {
                            criteriaList.push(new _Expression(criteria));
                            criteriaField = this._owner.getCellValue(fieldRowIndex, colIndex, false, criteriaSheet);
                            criteriaColIndex = this._getColumnIndexByField(countRef, criteriaField);
                            list = this._getItemList([countRef], countSheet, false, false, true, criteriaColIndex);
                            if (list.items != null && list.items.length > 1) {
                                itemsList.push(list.items.slice(1));
                            }
                            else {
                                throw 'Invalid Count Cell Reference.';
                            }
                        }
                    }
                    count += this._countCellsByCriterias(itemsList, criteriaList, countSheet, countItems);
                }
                return count;
            }
            throw 'Invalid Criteria Cell Reference.';
        };
        _CalcEngine.prototype._getColumnIndexByField = function (cellExpr, field) {
            var cells, sheet, columnIndex, value, rowIndex;
            cells = cellExpr.cells;
            rowIndex = cells.topRow;
            if (rowIndex === -1) {
                throw 'Invalid Count Cell Reference.';
            }
            if (wjcCore.isInt(field) && !isNaN(field)) {
                if (field >= 1 && field <= cells.columnSpan) {
                    columnIndex = cells.leftCol + field - 1;
                    return columnIndex;
                }
            }
            else {
                sheet = this._getSheet(cellExpr.sheetRef);
                for (columnIndex = cells.leftCol; columnIndex <= cells.rightCol; columnIndex++) {
                    value = this._owner.getCellValue(rowIndex, columnIndex, false, sheet);
                    field = wjcCore.isString(field) ? field.toLowerCase() : field;
                    value = wjcCore.isString(value) ? value.toLowerCase() : value;
                    if (field === value) {
                        return columnIndex;
                    }
                }
            }
            throw 'Invalid field.';
        };
        _CalcEngine.prototype._getSumProduct = function (params, sheet) {
            var product, sum = 0, list = this._getItemListForSumProduct(params, sheet), xAxisCnt, yAxisCnt;
            if (list.length > 0) {
                xAxisCnt = list[0].length;
                yAxisCnt = list.length;
                for (var ci = 0; ci < xAxisCnt; ci++) {
                    product = 1;
                    for (var ri = 0; ri < yAxisCnt; ri++) {
                        product *= list[ri][ci];
                    }
                    sum += product;
                }
            }
            return sum;
        };
        _CalcEngine.prototype._getItemListForSumProduct = function (params, sheet) {
            var list = [new Array()], items, item, index, cellIndex, cellValues, param;
            for (index = 0; index < params.length; index++) {
                param = params[index];
                items = new Array(),
                    param = this._ensureNonFunctionExpression(param);
                if (param instanceof _CellRangeExpression) {
                    cellValues = param.getValues(true, null, sheet);
                    for (cellIndex = 0; cellIndex < cellValues.length; cellIndex++) {
                        item = cellValues[cellIndex];
                        items.push(+item);
                    }
                }
                else {
                    item = param instanceof _Expression ? param.evaluate(sheet) : param;
                    items.push(+item);
                }
                if (index > 0) {
                    if (items.length !== list[0].length) {
                        throw 'The cell ranges of the sumProduct formula must have the same dimensions.';
                    }
                }
                list[index] = items;
            }
            return list;
        };
        _CalcEngine.prototype._getSheet = function (sheetRef) {
            var i = 0, sheet;
            if (sheetRef) {
                for (; i < this._owner.sheets.length; i++) {
                    sheet = this._owner.sheets[i];
                    if (sheet.name === sheetRef) {
                        break;
                    }
                }
            }
            return sheet;
        };
        _CalcEngine.prototype._parseRightExpr = function (rightExpr) {
            var match, matchReg, checkMathces = false;
            if (rightExpr.indexOf('?') > -1 || rightExpr.indexOf('*') > -1) {
                match = rightExpr.match(/([\?\*]*)(\w+)([\?\*]*)(\w+)([\?\*]*)/);
                if (match != null && match.length === 6) {
                    matchReg = new RegExp('^' + (match[1].length > 0 ? this._parseRegCriteria(match[1]) : '') + match[2]
                        + (match[3].length > 0 ? this._parseRegCriteria(match[3]) : '') + match[4]
                        + (match[5].length > 0 ? this._parseRegCriteria(match[5]) : '') + '$', 'i');
                }
                else {
                    throw 'Invalid Criteria.';
                }
                if (/^[<>=]/.test(rightExpr)) {
                    if (rightExpr.trim()[0] === '=') {
                        checkMathces = true;
                    }
                }
                else {
                    checkMathces = true;
                }
                return {
                    reg: matchReg,
                    checkMathces: checkMathces
                };
            }
            else {
                if (!isNaN(+rightExpr)) {
                    rightExpr = '=' + rightExpr;
                }
                else if (/^\w/.test(rightExpr)) {
                    rightExpr = '="' + rightExpr + '"';
                }
                else if (/^[<>=]{1,2}\s*-?\w+$/.test(rightExpr)) {
                    rightExpr = rightExpr.replace(/([<>=]{1,2})\s*(-?\w+)/, '$1"$2"');
                }
                else {
                    throw 'Invalid Criteria.';
                }
                return rightExpr;
            }
        };
        _CalcEngine.prototype._combineExpr = function (leftExpr, rightExpr) {
            if (wjcCore.isString(leftExpr)) {
                leftExpr = '"' + leftExpr + '"';
            }
            leftExpr = '=' + leftExpr;
            return leftExpr + rightExpr;
        };
        _CalcEngine.prototype._parseRegCriteria = function (criteria) {
            var i = 0, questionMarkCnt = 0, regString = '';
            for (; i < criteria.length; i++) {
                if (criteria[i] === '*') {
                    if (questionMarkCnt > 0) {
                        regString += '\\w{' + questionMarkCnt + '}';
                        questionMarkCnt = 0;
                    }
                    regString += '\\w*';
                }
                else if (criteria[i] === '?') {
                    questionMarkCnt++;
                }
            }
            if (questionMarkCnt > 0) {
                regString += '\\w{' + questionMarkCnt + '}';
            }
            return regString;
        };
        _CalcEngine.prototype._calculateRate = function (params, sheet) {
            var FINANCIAL_PRECISION = 0.0000001, FINANCIAL_MAX_ITERATIONS = 20, i = 0, x0 = 0, x1, rate, nper, pmt, pv, fv, type, guess, y, f, y0, y1;
            nper = _Expression.toNumber(params[0], sheet);
            pmt = _Expression.toNumber(params[1], sheet);
            pv = _Expression.toNumber(params[2], sheet);
            fv = params[3] != null ? _Expression.toNumber(params[3], sheet) : 0;
            type = params[4] != null ? _Expression.toNumber(params[4], sheet) : 0;
            guess = params[5] != null ? _Expression.toNumber(params[5], sheet) : 0.1;
            rate = guess;
            if (Math.abs(rate) < FINANCIAL_PRECISION) {
                y = pv * (1 + nper * rate) + pmt * (1 + rate * type) * nper + fv;
            }
            else {
                f = Math.exp(nper * Math.log(1 + rate));
                y = pv * f + pmt * (1 / rate + type) * (f - 1) + fv;
            }
            y0 = pv + pmt * nper + fv;
            y1 = pv * f + pmt * (1 / rate + type) * (f - 1) + fv;
            x1 = rate;
            while ((Math.abs(y0 - y1) > FINANCIAL_PRECISION) && (i < FINANCIAL_MAX_ITERATIONS)) {
                rate = (y1 * x0 - y0 * x1) / (y1 - y0);
                x0 = x1;
                x1 = rate;
                if (Math.abs(rate) < FINANCIAL_PRECISION) {
                    y = pv * (1 + nper * rate) + pmt * (1 + rate * type) * nper + fv;
                }
                else {
                    f = Math.exp(nper * Math.log(1 + rate));
                    y = pv * f + pmt * (1 / rate + type) * (f - 1) + fv;
                }
                y0 = y1;
                y1 = y;
                ++i;
            }
            if (Math.abs(y0 - y1) > FINANCIAL_PRECISION && i === FINANCIAL_MAX_ITERATIONS) {
                throw 'It is not able to calculate the rate with current parameters.';
            }
            return rate;
        };
        _CalcEngine.prototype._handleHLookup = function (params, sheet) {
            var lookupVal = params[0].evaluate(sheet), cellExpr = params[1], rowNum = _Expression.toNumber(params[2], sheet), approximateMatch = params[3] != null ? _Expression.toBoolean(params[3], sheet) : true, cells, colNum;
            if (lookupVal == null || lookupVal == '') {
                throw 'Invalid lookup value.';
            }
            if (isNaN(rowNum) || rowNum < 0) {
                throw 'Invalid row index.';
            }
            cellExpr = this._ensureNonFunctionExpression(cellExpr);
            if (cellExpr instanceof _CellRangeExpression) {
                cells = cellExpr.cells;
                if (rowNum > cells.rowSpan) {
                    throw 'Row index is out of the cell range.';
                }
                if (approximateMatch) {
                    colNum = this._exactMatch(lookupVal, cells, sheet, false);
                    if (colNum === -1) {
                        colNum = this._approximateMatch(lookupVal, cells, sheet);
                    }
                }
                else {
                    colNum = this._exactMatch(lookupVal, cells, sheet);
                }
                if (colNum === -1) {
                    throw 'Lookup Value is not found.';
                }
                return this._owner.getCellValue(cells.topRow + rowNum - 1, colNum, false, sheet);
            }
            throw 'Invalid Cell Reference.';
        };
        _CalcEngine.prototype._exactMatch = function (lookupValue, cells, sheet, needHandleWildCard) {
            if (needHandleWildCard === void 0) { needHandleWildCard = true; }
            var rowIndex = cells.topRow, colIndex, value, match, matchReg;
            if (wjcCore.isString(lookupValue)) {
                lookupValue = lookupValue.toLowerCase();
            }
            if (needHandleWildCard && wjcCore.isString(lookupValue) && (lookupValue.indexOf('?') > -1 || lookupValue.indexOf('*') > -1)) {
                match = lookupValue.match(/([\?\*]*)(\w+)([\?\*]*)(\w+)([\?\*]*)/);
                if (match != null && match.length === 6) {
                    matchReg = new RegExp('^' + (match[1].length > 0 ? this._parseRegCriteria(match[1]) : '') + match[2]
                        + (match[3].length > 0 ? this._parseRegCriteria(match[3]) : '') + match[4]
                        + (match[5].length > 0 ? this._parseRegCriteria(match[5]) : '') + '$', 'i');
                }
                else {
                    throw 'Invalid lookup value.';
                }
            }
            for (colIndex = cells.leftCol; colIndex <= cells.rightCol; colIndex++) {
                value = this._owner.getCellValue(rowIndex, colIndex, false, sheet);
                if (matchReg != null) {
                    if (matchReg.test(value)) {
                        return colIndex;
                    }
                }
                else {
                    if (wjcCore.isString(value)) {
                        value = value.toLowerCase();
                    }
                    if (lookupValue === value) {
                        return colIndex;
                    }
                }
            }
            return -1;
        };
        _CalcEngine.prototype._approximateMatch = function (lookupValue, cells, sheet) {
            var val, colIndex, rowIndex = cells.topRow, cellValues = [], i = 0;
            if (wjcCore.isString(lookupValue)) {
                lookupValue = lookupValue.toLowerCase();
            }
            for (colIndex = cells.leftCol; colIndex <= cells.rightCol; colIndex++) {
                val = this._owner.getCellValue(rowIndex, colIndex, false, sheet);
                val = isNaN(+val) ? val : +val;
                cellValues.push({ value: val, index: colIndex });
            }
            cellValues.sort(function (a, b) {
                if (wjcCore.isString(a.value)) {
                    a.value = a.value.toLowerCase();
                }
                if (wjcCore.isString(b.value)) {
                    b.value = b.value.toLowerCase();
                }
                if (a.value > b.value) {
                    return -1;
                }
                else if (a.value === b.value) {
                    return b.index - a.index;
                }
                return 1;
            });
            for (; i < cellValues.length; i++) {
                val = cellValues[i];
                if (wjcCore.isString(val.value)) {
                    val.value = val.value.toLowerCase();
                }
                if (lookupValue > val.value) {
                    return val.index;
                }
            }
            throw 'Lookup Value is not found.';
        };
        _CalcEngine.prototype._checkCache = function (expression) {
            var expr = this._expressionCache[expression];
            if (expr) {
                return expr;
            }
            expr = this._parse(expression);
            if (this._cacheSize > 10000) {
                this._clearExpressionCache();
            }
            this._expressionCache[expression] = expr;
            this._cacheSize++;
            return expr;
        };
        _CalcEngine.prototype._ensureNonFunctionExpression = function (expr, sheet) {
            while (expr instanceof _FunctionExpression) {
                expr = expr.evaluate(sheet);
            }
            return expr;
        };
        return _CalcEngine;
    }());
    exports._CalcEngine = _CalcEngine;
    var _Token = (function () {
        function _Token(val, tkID, tkType) {
            this._value = val;
            this._tokenID = tkID;
            this._tokenType = tkType;
        }
        Object.defineProperty(_Token.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(_Token.prototype, "tokenID", {
            get: function () {
                return this._tokenID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(_Token.prototype, "tokenType", {
            get: function () {
                return this._tokenType;
            },
            enumerable: true,
            configurable: true
        });
        return _Token;
    }());
    exports._Token = _Token;
    var _FunctionDefinition = (function () {
        function _FunctionDefinition(func, paramMax, paramMin) {
            this._paramMax = Number.MAX_VALUE;
            this._paramMin = Number.MIN_VALUE;
            this._func = func;
            if (wjcCore.isNumber(paramMax) && !isNaN(paramMax)) {
                this._paramMax = paramMax;
            }
            if (wjcCore.isNumber(paramMin) && !isNaN(paramMin)) {
                this._paramMin = paramMin;
            }
        }
        Object.defineProperty(_FunctionDefinition.prototype, "paramMax", {
            get: function () {
                return this._paramMax;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(_FunctionDefinition.prototype, "paramMin", {
            get: function () {
                return this._paramMin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(_FunctionDefinition.prototype, "func", {
            get: function () {
                return this._func;
            },
            enumerable: true,
            configurable: true
        });
        return _FunctionDefinition;
    }());
    exports._FunctionDefinition = _FunctionDefinition;
    var _TokenType;
    (function (_TokenType) {
        _TokenType[_TokenType["COMPARE"] = 0] = "COMPARE";
        _TokenType[_TokenType["ADDSUB"] = 1] = "ADDSUB";
        _TokenType[_TokenType["MULDIV"] = 2] = "MULDIV";
        _TokenType[_TokenType["POWER"] = 3] = "POWER";
        _TokenType[_TokenType["CONCAT"] = 4] = "CONCAT";
        _TokenType[_TokenType["GROUP"] = 5] = "GROUP";
        _TokenType[_TokenType["LITERAL"] = 6] = "LITERAL";
        _TokenType[_TokenType["IDENTIFIER"] = 7] = "IDENTIFIER";
    })(_TokenType = exports._TokenType || (exports._TokenType = {}));
    var _TokenID;
    (function (_TokenID) {
        _TokenID[_TokenID["GT"] = 0] = "GT";
        _TokenID[_TokenID["LT"] = 1] = "LT";
        _TokenID[_TokenID["GE"] = 2] = "GE";
        _TokenID[_TokenID["LE"] = 3] = "LE";
        _TokenID[_TokenID["EQ"] = 4] = "EQ";
        _TokenID[_TokenID["NE"] = 5] = "NE";
        _TokenID[_TokenID["ADD"] = 6] = "ADD";
        _TokenID[_TokenID["SUB"] = 7] = "SUB";
        _TokenID[_TokenID["MUL"] = 8] = "MUL";
        _TokenID[_TokenID["DIV"] = 9] = "DIV";
        _TokenID[_TokenID["DIVINT"] = 10] = "DIVINT";
        _TokenID[_TokenID["MOD"] = 11] = "MOD";
        _TokenID[_TokenID["POWER"] = 12] = "POWER";
        _TokenID[_TokenID["CONCAT"] = 13] = "CONCAT";
        _TokenID[_TokenID["OPEN"] = 14] = "OPEN";
        _TokenID[_TokenID["CLOSE"] = 15] = "CLOSE";
        _TokenID[_TokenID["END"] = 16] = "END";
        _TokenID[_TokenID["COMMA"] = 17] = "COMMA";
        _TokenID[_TokenID["PERIOD"] = 18] = "PERIOD";
        _TokenID[_TokenID["ATOM"] = 19] = "ATOM";
    })(_TokenID = exports._TokenID || (exports._TokenID = {}));
    var _FlexSheetAggregate;
    (function (_FlexSheetAggregate) {
        _FlexSheetAggregate[_FlexSheetAggregate["Count"] = 0] = "Count";
        _FlexSheetAggregate[_FlexSheetAggregate["CountA"] = 1] = "CountA";
        _FlexSheetAggregate[_FlexSheetAggregate["ConutBlank"] = 2] = "ConutBlank";
        _FlexSheetAggregate[_FlexSheetAggregate["CountIf"] = 3] = "CountIf";
        _FlexSheetAggregate[_FlexSheetAggregate["CountIfs"] = 4] = "CountIfs";
        _FlexSheetAggregate[_FlexSheetAggregate["Rank"] = 5] = "Rank";
        _FlexSheetAggregate[_FlexSheetAggregate["SumIf"] = 6] = "SumIf";
        _FlexSheetAggregate[_FlexSheetAggregate["SumIfs"] = 7] = "SumIfs";
        _FlexSheetAggregate[_FlexSheetAggregate["Product"] = 8] = "Product";
    })(_FlexSheetAggregate || (_FlexSheetAggregate = {}));
    var _SubtotalFunction;
    (function (_SubtotalFunction) {
        _SubtotalFunction[_SubtotalFunction["Average"] = 1] = "Average";
        _SubtotalFunction[_SubtotalFunction["Count"] = 2] = "Count";
        _SubtotalFunction[_SubtotalFunction["CountA"] = 3] = "CountA";
        _SubtotalFunction[_SubtotalFunction["Max"] = 4] = "Max";
        _SubtotalFunction[_SubtotalFunction["Min"] = 5] = "Min";
        _SubtotalFunction[_SubtotalFunction["Product"] = 6] = "Product";
        _SubtotalFunction[_SubtotalFunction["Std"] = 7] = "Std";
        _SubtotalFunction[_SubtotalFunction["StdPop"] = 8] = "StdPop";
        _SubtotalFunction[_SubtotalFunction["Sum"] = 9] = "Sum";
        _SubtotalFunction[_SubtotalFunction["Var"] = 10] = "Var";
        _SubtotalFunction[_SubtotalFunction["VarPop"] = 11] = "VarPop";
        _SubtotalFunction[_SubtotalFunction["AverageWithoutHidden"] = 101] = "AverageWithoutHidden";
        _SubtotalFunction[_SubtotalFunction["CountWithoutHidden"] = 102] = "CountWithoutHidden";
        _SubtotalFunction[_SubtotalFunction["CountAWithoutHidden"] = 103] = "CountAWithoutHidden";
        _SubtotalFunction[_SubtotalFunction["MaxWithoutHidden"] = 104] = "MaxWithoutHidden";
        _SubtotalFunction[_SubtotalFunction["MinWithoutHidden"] = 105] = "MinWithoutHidden";
        _SubtotalFunction[_SubtotalFunction["ProductWithoutHidden"] = 106] = "ProductWithoutHidden";
        _SubtotalFunction[_SubtotalFunction["StdWithoutHidden"] = 107] = "StdWithoutHidden";
        _SubtotalFunction[_SubtotalFunction["StdPopWithoutHidden"] = 108] = "StdPopWithoutHidden";
        _SubtotalFunction[_SubtotalFunction["SumWithoutHidden"] = 109] = "SumWithoutHidden";
        _SubtotalFunction[_SubtotalFunction["VarWithoutHidden"] = 110] = "VarWithoutHidden";
        _SubtotalFunction[_SubtotalFunction["VarPopWithoutHidden"] = 111] = "VarPopWithoutHidden";
    })(_SubtotalFunction || (_SubtotalFunction = {}));
    'use strict';
    var _Expression = (function () {
        function _Expression(arg) {
            if (arg) {
                if (arg instanceof _Token) {
                    this._token = arg;
                }
                else {
                    this._token = new _Token(arg, _TokenID.ATOM, _TokenType.LITERAL);
                }
            }
            else {
                this._token = new _Token(null, _TokenID.ATOM, _TokenType.IDENTIFIER);
            }
        }
        Object.defineProperty(_Expression.prototype, "token", {
            get: function () {
                return this._token;
            },
            enumerable: true,
            configurable: true
        });
        _Expression.prototype.evaluate = function (sheet, rowIndex, columnIndex) {
            if (this._token.tokenType !== _TokenType.LITERAL) {
                throw 'Bad expression.';
            }
            return this._token.value;
        };
        _Expression.toString = function (x, sheet) {
            var v = x.evaluate(sheet);
            if (!wjcCore.isPrimitive(v)) {
                v = v.value;
            }
            return v != null ? v.toString() : '';
        };
        _Expression.toNumber = function (x, sheet) {
            var v = x.evaluate(sheet);
            if (!wjcCore.isPrimitive(v)) {
                v = v.value;
            }
            if (wjcCore.isNumber(v)) {
                return v;
            }
            if (wjcCore.isBoolean(v)) {
                return v ? 1 : 0;
            }
            if (wjcCore.isDate(v)) {
                return this._toOADate(v);
            }
            if (wjcCore.isString(v)) {
                if (v) {
                    return +v;
                }
                else {
                    return 0;
                }
            }
            return wjcCore.changeType(v, wjcCore.DataType.Number, '');
        };
        _Expression.toBoolean = function (x, sheet) {
            var v = x.evaluate(sheet);
            if (!wjcCore.isPrimitive(v)) {
                v = v.value;
            }
            if (wjcCore.isBoolean(v)) {
                return v;
            }
            if (wjcCore.isNumber(v)) {
                return v === 0 ? false : true;
            }
            return wjcCore.changeType(v, wjcCore.DataType.Boolean, '');
        };
        _Expression.toDate = function (x, sheet) {
            var v = x.evaluate(sheet);
            if (!wjcCore.isPrimitive(v)) {
                v = v.value;
            }
            if (wjcCore.isDate(v)) {
                return v;
            }
            if (wjcCore.isNumber(v)) {
                return this._fromOADate(v);
            }
            return wjcCore.changeType(v, wjcCore.DataType.Date, '');
        };
        _Expression._toOADate = function (val) {
            var epoch = Date.UTC(1899, 11, 30), currentUTC = Date.UTC(val.getFullYear(), val.getMonth(), val.getDate(), val.getHours(), val.getMinutes(), val.getSeconds(), val.getMilliseconds());
            return (currentUTC - epoch) / 8.64e7;
        };
        _Expression._fromOADate = function (oADate) {
            var epoch = Date.UTC(1899, 11, 30), date = new Date(), offset = oADate >= 60 ? 0 : 8.64e7;
            return new Date(oADate * 8.64e7 + epoch + date.getTimezoneOffset() * 60000 + offset);
        };
        return _Expression;
    }());
    exports._Expression = _Expression;
    var _UnaryExpression = (function (_super) {
        __extends(_UnaryExpression, _super);
        function _UnaryExpression(arg, expr) {
            var _this = _super.call(this, arg) || this;
            _this._expr = expr;
            return _this;
        }
        _UnaryExpression.prototype.evaluate = function (sheet) {
            if (this.token.tokenID === _TokenID.SUB) {
                if (this._evaluatedValue == null) {
                    this._evaluatedValue = -_Expression.toNumber(this._expr, sheet);
                }
                return this._evaluatedValue;
            }
            if (this.token.tokenID === _TokenID.ADD) {
                if (this._evaluatedValue == null) {
                    this._evaluatedValue = +_Expression.toNumber(this._expr, sheet);
                }
                return this._evaluatedValue;
            }
            throw 'Bad expression.';
        };
        return _UnaryExpression;
    }(_Expression));
    exports._UnaryExpression = _UnaryExpression;
    var _BinaryExpression = (function (_super) {
        __extends(_BinaryExpression, _super);
        function _BinaryExpression(arg, leftExpr, rightExpr) {
            var _this = _super.call(this, arg) || this;
            _this._leftExpr = leftExpr;
            _this._rightExpr = rightExpr;
            return _this;
        }
        _BinaryExpression.prototype.evaluate = function (sheet) {
            var strLeftVal, strRightVal, orgLeftVal, orgRightVal, leftValue, rightValue, compareVal, isDate = false;
            if (this._evaluatedValue != null) {
                return this._evaluatedValue;
            }
            strLeftVal = _Expression.toString(this._leftExpr, sheet);
            strRightVal = _Expression.toString(this._rightExpr, sheet);
            if (this.token.tokenType === _TokenType.CONCAT) {
                this._evaluatedValue = strLeftVal + strRightVal;
                return this._evaluatedValue;
            }
            orgLeftVal = this._leftExpr.evaluate(sheet);
            orgRightVal = this._rightExpr.evaluate(sheet);
            isDate = this._isDateValue(orgLeftVal) || this._isDateValue(orgRightVal);
            leftValue = _Expression.toNumber(this._leftExpr, sheet);
            rightValue = _Expression.toNumber(this._rightExpr, sheet);
            compareVal = leftValue - rightValue;
            if (this.token.tokenType === _TokenType.COMPARE) {
                switch (this.token.tokenID) {
                    case _TokenID.GT: return compareVal > 0;
                    case _TokenID.LT: return compareVal < 0;
                    case _TokenID.GE: return compareVal >= 0;
                    case _TokenID.LE: return compareVal <= 0;
                    case _TokenID.EQ:
                        if (isNaN(compareVal)) {
                            this._evaluatedValue = strLeftVal.toLowerCase() === strRightVal.toLowerCase();
                            return this._evaluatedValue;
                        }
                        else {
                            this._evaluatedValue = compareVal === 0;
                            return this._evaluatedValue;
                        }
                    case _TokenID.NE:
                        if (isNaN(compareVal)) {
                            this._evaluatedValue = strLeftVal.toLowerCase() !== strRightVal.toLowerCase();
                            return this._evaluatedValue;
                        }
                        else {
                            this._evaluatedValue = compareVal !== 0;
                            return this._evaluatedValue;
                        }
                }
            }
            switch (this.token.tokenID) {
                case _TokenID.ADD:
                    this._evaluatedValue = leftValue + rightValue;
                    break;
                case _TokenID.SUB:
                    this._evaluatedValue = leftValue - rightValue;
                    break;
                case _TokenID.MUL:
                    this._evaluatedValue = leftValue * rightValue;
                    break;
                case _TokenID.DIV:
                    this._evaluatedValue = leftValue / rightValue;
                    break;
                case _TokenID.DIVINT:
                    this._evaluatedValue = Math.floor(leftValue / rightValue);
                    break;
                case _TokenID.MOD:
                    this._evaluatedValue = Math.floor(leftValue % rightValue);
                    break;
                case _TokenID.POWER:
                    if (rightValue === 0.0) {
                        this._evaluatedValue = 1.0;
                    }
                    if (rightValue === 0.5) {
                        this._evaluatedValue = Math.sqrt(leftValue);
                    }
                    if (rightValue === 1.0) {
                        this._evaluatedValue = leftValue;
                    }
                    if (rightValue === 2.0) {
                        this._evaluatedValue = leftValue * leftValue;
                    }
                    if (rightValue === 3.0) {
                        this._evaluatedValue = leftValue * leftValue * leftValue;
                    }
                    if (rightValue === 4.0) {
                        this._evaluatedValue = leftValue * leftValue * leftValue * leftValue;
                    }
                    this._evaluatedValue = Math.pow(leftValue, rightValue);
                    break;
                default:
                    this._evaluatedValue = NaN;
                    break;
            }
            if (!isNaN(this._evaluatedValue)) {
                if (isDate) {
                    this._evaluatedValue = {
                        value: _Expression._fromOADate(this._evaluatedValue),
                        format: orgLeftVal.format || orgRightVal.format
                    };
                }
                return this._evaluatedValue;
            }
            throw 'Bad expression.';
        };
        _BinaryExpression.prototype._isDateValue = function (val) {
            if (wjcCore.isPrimitive(val)) {
                return wjcCore.isDate(val);
            }
            else {
                return wjcCore.isDate(val.value);
            }
        };
        return _BinaryExpression;
    }(_Expression));
    exports._BinaryExpression = _BinaryExpression;
    var _CellRangeExpression = (function (_super) {
        __extends(_CellRangeExpression, _super);
        function _CellRangeExpression(cells, sheetRef, flex) {
            var _this = _super.call(this) || this;
            _this._cells = cells;
            _this._sheetRef = sheetRef;
            _this._flex = flex;
            _this._evalutingRange = {};
            return _this;
        }
        _CellRangeExpression.prototype.evaluate = function (sheet) {
            if (this._evaluatedValue == null) {
                this._evaluatedValue = this._getCellValue(this._cells, sheet);
            }
            return this._evaluatedValue;
        };
        _CellRangeExpression.prototype.getValues = function (isGetHiddenValue, columnIndex, sheet) {
            if (isGetHiddenValue === void 0) { isGetHiddenValue = true; }
            var cellValue, vals = [], valIndex = 0, rowIndex, columnIndex, startColumnIndex, endColumnIndex;
            startColumnIndex = columnIndex != null && !isNaN(+columnIndex) ? columnIndex : this._cells.leftCol;
            endColumnIndex = columnIndex != null && !isNaN(+columnIndex) ? columnIndex : this._cells.rightCol;
            sheet = this._getSheet() || sheet || this._flex.selectedSheet;
            if (!sheet) {
                return null;
            }
            for (rowIndex = this._cells.topRow; rowIndex <= this._cells.bottomRow; rowIndex++) {
                if (rowIndex >= sheet.grid.rows.length) {
                    throw 'The cell reference is out of the cell range of the flexsheet.';
                }
                if (!isGetHiddenValue && sheet.grid.rows[rowIndex].isVisible === false) {
                    continue;
                }
                for (columnIndex = startColumnIndex; columnIndex <= endColumnIndex; columnIndex++) {
                    if (columnIndex >= sheet.grid.columns.length) {
                        throw 'The cell reference is out of the cell range of the flexsheet.';
                    }
                    if (!isGetHiddenValue && sheet.grid.columns[columnIndex].isVisible === false) {
                        continue;
                    }
                    cellValue = this._getCellValue(new wjcGrid.CellRange(rowIndex, columnIndex), sheet);
                    if (!wjcCore.isPrimitive(cellValue)) {
                        cellValue = cellValue.value;
                    }
                    vals[valIndex] = cellValue;
                    valIndex++;
                }
            }
            return vals;
        };
        _CellRangeExpression.prototype.getValuseWithTwoDimensions = function (isGetHiddenValue, sheet) {
            if (isGetHiddenValue === void 0) { isGetHiddenValue = true; }
            var cellValue, vals = [], rowVals, rowValIndex = 0, valIndex = 0, rowIndex, columnIndex;
            sheet = this._getSheet() || sheet || this._flex.selectedSheet;
            if (!sheet) {
                return null;
            }
            for (rowIndex = this._cells.topRow; rowIndex <= this._cells.bottomRow; rowIndex++) {
                if (rowIndex >= sheet.grid.rows.length) {
                    throw 'The cell reference is out of the cell range of the flexsheet.';
                }
                if (!isGetHiddenValue && sheet.grid.rows[rowIndex].isVisible === false) {
                    rowValIndex++;
                    continue;
                }
                rowVals = [];
                valIndex = 0;
                for (columnIndex = this._cells.leftCol; columnIndex <= this._cells.rightCol; columnIndex++) {
                    if (columnIndex >= sheet.grid.columns.length) {
                        throw 'The cell reference is out of the cell range of the flexsheet.';
                    }
                    if (!isGetHiddenValue && sheet.grid.columns[columnIndex].isVisible === false) {
                        valIndex++;
                        continue;
                    }
                    cellValue = this._getCellValue(new wjcGrid.CellRange(rowIndex, columnIndex), sheet);
                    if (!wjcCore.isPrimitive(cellValue)) {
                        cellValue = cellValue.value;
                    }
                    rowVals[valIndex] = cellValue;
                    valIndex++;
                }
                vals[rowValIndex] = rowVals;
                rowValIndex++;
            }
            return vals;
        };
        Object.defineProperty(_CellRangeExpression.prototype, "cells", {
            get: function () {
                return this._cells;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(_CellRangeExpression.prototype, "sheetRef", {
            get: function () {
                return this._sheetRef;
            },
            enumerable: true,
            configurable: true
        });
        _CellRangeExpression.prototype._getCellValue = function (cell, sheet) {
            var sheet, cellKey;
            sheet = this._getSheet() || sheet || this._flex.selectedSheet;
            if (!sheet) {
                return null;
            }
            cellKey = sheet.name + ':' + cell.row + ',' + cell.col + '-' + cell.row2 + ',' + cell.col2;
            if (this._evalutingRange[cellKey]) {
                throw 'Circular Reference';
            }
            try {
                if (this._flex) {
                    this._evalutingRange[cellKey] = true;
                    return this._flex.getCellValue(cell.row, cell.col, false, sheet);
                }
            }
            finally {
                delete this._evalutingRange[cellKey];
            }
        };
        _CellRangeExpression.prototype._getSheet = function () {
            var i = 0, sheet;
            if (!this._sheetRef) {
                return null;
            }
            for (; i < this._flex.sheets.length; i++) {
                sheet = this._flex.sheets[i];
                if (sheet.name.toLowerCase() === this._sheetRef) {
                    return sheet;
                }
            }
            throw 'Invalid sheet reference';
        };
        return _CellRangeExpression;
    }(_Expression));
    exports._CellRangeExpression = _CellRangeExpression;
    var _FunctionExpression = (function (_super) {
        __extends(_FunctionExpression, _super);
        function _FunctionExpression(func, params, needCacheEvaluatedVal) {
            if (needCacheEvaluatedVal === void 0) { needCacheEvaluatedVal = true; }
            var _this = _super.call(this) || this;
            _this._funcDefinition = func;
            _this._params = params;
            _this._needCacheEvaluatedVal = needCacheEvaluatedVal;
            return _this;
        }
        _FunctionExpression.prototype.evaluate = function (sheet, rowIndex, columnIndex) {
            if (!this._needCacheEvaluatedVal) {
                return this._funcDefinition.func(this._params, sheet, rowIndex, columnIndex);
            }
            if (this._evaluatedValue == null) {
                this._evaluatedValue = this._funcDefinition.func(this._params, sheet, rowIndex, columnIndex);
            }
            return this._evaluatedValue;
        };
        return _FunctionExpression;
    }(_Expression));
    exports._FunctionExpression = _FunctionExpression;
    'use strict';
    var _UndoAction = (function () {
        function _UndoAction(owner) {
            this._owner = owner;
            this._sheetIndex = owner.selectedSheetIndex;
        }
        Object.defineProperty(_UndoAction.prototype, "sheetIndex", {
            get: function () {
                return this._sheetIndex;
            },
            enumerable: true,
            configurable: true
        });
        _UndoAction.prototype.undo = function () {
            throw 'This abstract method must be overridden.';
        };
        _UndoAction.prototype.redo = function () {
            throw 'This abstract method must be overridden.';
        };
        _UndoAction.prototype.saveNewState = function () {
            throw 'This abstract method must be overridden.';
        };
        return _UndoAction;
    }());
    exports._UndoAction = _UndoAction;
    var _EditAction = (function (_super) {
        __extends(_EditAction, _super);
        function _EditAction(owner, selection) {
            var _this = this;
            var index, selection, rowIndex, colIndex, val;
            _this = _super.call(this, owner) || this;
            _this._isPaste = false;
            _this._selections = selection ? [selection] : owner.selectedSheet.selectionRanges.slice();
            _this._oldValues = {};
            _this._mergeAction = new _CellMergeAction(owner);
            for (index = 0; index < _this._selections.length; index++) {
                selection = _this._selections[index];
                for (rowIndex = selection.topRow; rowIndex <= selection.bottomRow; rowIndex++) {
                    for (colIndex = selection.leftCol; colIndex <= selection.rightCol; colIndex++) {
                        val = owner.getCellData(rowIndex, colIndex, !!owner.columns[colIndex].dataMap);
                        val = val == null ? '' : val;
                        _this._oldValues['r' + rowIndex + '_c' + colIndex] = {
                            row: rowIndex,
                            col: colIndex,
                            value: val
                        };
                    }
                }
            }
            return _this;
        }
        Object.defineProperty(_EditAction.prototype, "isPaste", {
            get: function () {
                return this._isPaste;
            },
            enumerable: true,
            configurable: true
        });
        _EditAction.prototype.undo = function () {
            var self = this, index, selection;
            self._owner._clearCalcEngine();
            self._owner.selectedSheet.selectionRanges.clear();
            self._owner.deferUpdate(function () {
                for (index = 0; index < self._selections.length; index++) {
                    selection = self._selections[index];
                    self._owner.selectedSheet.selectionRanges.push(selection);
                }
                Object.keys(self._oldValues).forEach(function (key) {
                    var item = self._oldValues[key];
                    self._owner.setCellData(item.row, item.col, item.value);
                });
                self._mergeAction.undo();
                self._owner.refresh(false);
            });
        };
        _EditAction.prototype.redo = function () {
            var self = this, index, selection;
            self._owner._clearCalcEngine();
            self._owner.selectedSheet.selectionRanges.clear();
            self._owner.deferUpdate(function () {
                for (index = 0; index < self._selections.length; index++) {
                    selection = self._selections[index];
                    self._owner.selectedSheet.selectionRanges.push(selection);
                }
                Object.keys(self._newValues).forEach(function (key) {
                    var item = self._newValues[key];
                    self._owner.setCellData(item.row, item.col, item.value);
                });
                self._mergeAction.redo();
                self._owner.refresh(false);
            });
        };
        _EditAction.prototype.saveNewState = function () {
            var index, selection, currentCol, rowIndex, colIndex, val;
            this._newValues = {};
            for (index = 0; index < this._selections.length; index++) {
                selection = this._selections[index];
                for (rowIndex = selection.topRow; rowIndex <= selection.bottomRow; rowIndex++) {
                    for (colIndex = selection.leftCol; colIndex <= selection.rightCol; colIndex++) {
                        currentCol = this._owner.columns[colIndex];
                        if (!currentCol) {
                            return false;
                        }
                        val = this._owner.getCellData(rowIndex, colIndex, !!currentCol.dataMap);
                        val = val == null ? '' : val;
                        this._newValues['r' + rowIndex + '_c' + colIndex] = {
                            row: rowIndex,
                            col: colIndex,
                            value: val
                        };
                    }
                }
            }
            this._mergeAction.saveNewState();
            return !this._checkActionState();
        };
        _EditAction.prototype.markIsPaste = function () {
            this._isPaste = true;
        };
        _EditAction.prototype.updateForPasting = function (rng) {
            var selection = this._selections[this._selections.length - 1], val = this._owner.getCellData(rng.row, rng.col, !!this._owner.columns[rng.col].dataMap);
            if (!selection) {
                selection = this._owner.selection;
                this._selections = [selection];
            }
            val = val == null ? '' : val;
            this._oldValues['r' + rng.row + '_c' + rng.col] = {
                row: rng.row,
                col: rng.col,
                value: val
            };
            selection.row = Math.min(selection.topRow, rng.topRow);
            selection.row2 = Math.max(selection.bottomRow, rng.bottomRow);
            selection.col = Math.min(selection.leftCol, rng.leftCol);
            selection.col2 = Math.max(selection.rightCol, rng.rightCol);
        };
        _EditAction.prototype._checkActionState = function () {
            var self = this, ret = true;
            Object.keys(self._oldValues).forEach(function (key) {
                var oldItem, newItem;
                if (ret) {
                    oldItem = self._oldValues[key];
                    newItem = self._newValues[key];
                    if (oldItem && newItem && oldItem.value !== newItem.value) {
                        ret = false;
                    }
                }
            });
            return ret;
        };
        return _EditAction;
    }(_UndoAction));
    exports._EditAction = _EditAction;
    var _ColumnResizeAction = (function (_super) {
        __extends(_ColumnResizeAction, _super);
        function _ColumnResizeAction(owner, panel, colIndex) {
            var _this = _super.call(this, owner) || this;
            _this._panel = panel;
            _this._colIndex = colIndex;
            _this._oldColWidth = panel.columns[colIndex].width;
            return _this;
        }
        _ColumnResizeAction.prototype.undo = function () {
            this._panel.columns[this._colIndex].width = this._oldColWidth;
        };
        _ColumnResizeAction.prototype.redo = function () {
            this._panel.columns[this._colIndex].width = this._newColWidth;
        };
        _ColumnResizeAction.prototype.saveNewState = function () {
            this._newColWidth = this._panel.columns[this._colIndex].width;
            if (this._oldColWidth === this._newColWidth) {
                return false;
            }
            return true;
        };
        return _ColumnResizeAction;
    }(_UndoAction));
    exports._ColumnResizeAction = _ColumnResizeAction;
    var _RowResizeAction = (function (_super) {
        __extends(_RowResizeAction, _super);
        function _RowResizeAction(owner, panel, rowIndex) {
            var _this = _super.call(this, owner) || this;
            _this._panel = panel;
            _this._rowIndex = rowIndex;
            _this._oldRowHeight = panel.rows[rowIndex].height;
            return _this;
        }
        _RowResizeAction.prototype.undo = function () {
            this._panel.rows[this._rowIndex].height = this._oldRowHeight;
        };
        _RowResizeAction.prototype.redo = function () {
            this._panel.rows[this._rowIndex].height = this._newRowHeight;
        };
        _RowResizeAction.prototype.saveNewState = function () {
            this._newRowHeight = this._panel.rows[this._rowIndex].height;
            if (this._oldRowHeight === this._newRowHeight) {
                return false;
            }
            return true;
        };
        return _RowResizeAction;
    }(_UndoAction));
    exports._RowResizeAction = _RowResizeAction;
    var _ColumnsChangedAction = (function (_super) {
        __extends(_ColumnsChangedAction, _super);
        function _ColumnsChangedAction(owner) {
            var _this = this;
            var colIndex, columns = [];
            _this = _super.call(this, owner) || this;
            _this._selection = owner.selection;
            for (colIndex = 0; colIndex < owner.columns.length; colIndex++) {
                columns.push(owner.columns[colIndex]);
            }
            _this._oldValue = {
                columns: columns,
                sortList: owner.sortManager._committedList.slice(),
                styledCells: owner.selectedSheet ? JSON.parse(JSON.stringify(owner.selectedSheet._styledCells)) : null,
                mergedCells: owner._cloneMergedCells()
            };
            return _this;
        }
        _ColumnsChangedAction.prototype.undo = function () {
            var colIndex, i, formulaObj, oldFormulas, self = this;
            if (!self._owner.selectedSheet) {
                return;
            }
            self._owner._clearCalcEngine();
            self._owner.finishEditing();
            self._owner.columns.clear();
            self._owner.selectedSheet._styledCells = undefined;
            self._owner.selectedSheet._mergedRanges = undefined;
            self._owner.columns.beginUpdate();
            for (colIndex = 0; colIndex < self._oldValue.columns.length; colIndex++) {
                self._owner.columns.push(self._oldValue.columns[colIndex]);
            }
            self._owner.columns.endUpdate();
            self._owner.selectedSheet._styledCells = self._oldValue.styledCells;
            self._owner.selectedSheet._mergedRanges = self._oldValue.mergedCells;
            if (self._affectedFormulas) {
                oldFormulas = self._affectedFormulas.oldFormulas;
            }
            self._owner.deferUpdate(function () {
                self._owner.selection = self._selection;
                if (!!oldFormulas && oldFormulas.length > 0) {
                    for (i = 0; i < oldFormulas.length; i++) {
                        formulaObj = oldFormulas[i];
                        self._owner.setCellData(formulaObj.point.x, formulaObj.point.y, formulaObj.formula);
                    }
                }
                self._owner._copyTo(self._owner.selectedSheet);
                self._owner._copyFrom(self._owner.selectedSheet);
            });
            self._owner.selectedSheet.grid['wj_sheetInfo'].styledCells = self._owner.selectedSheet._styledCells;
            self._owner.selectedSheet.grid['wj_sheetInfo'].mergedRanges = self._owner.selectedSheet._mergedRanges;
            self._owner.sortManager.sortDescriptions.sourceCollection = self._oldValue.sortList.slice();
            self._owner.sortManager.commitSort(false);
            self._owner.sortManager._refresh();
            self._owner.selection = self._selection;
            self._owner.refresh(true);
            setTimeout(function () {
                self._owner._setFlexSheetToDirty();
                self._owner.refresh(true);
            }, 10);
        };
        _ColumnsChangedAction.prototype.redo = function () {
            var colIndex, i, formulaObj, newFormulas, self = this;
            if (!self._owner.selectedSheet) {
                return;
            }
            self._owner._clearCalcEngine();
            self._owner.finishEditing();
            self._owner.columns.clear();
            self._owner.selectedSheet._styledCells = undefined;
            self._owner.selectedSheet._mergedRanges = undefined;
            self._owner.columns.beginUpdate();
            for (colIndex = 0; colIndex < self._newValue.columns.length; colIndex++) {
                self._owner.columns.push(self._newValue.columns[colIndex]);
            }
            self._owner.columns.endUpdate();
            self._owner.selectedSheet._styledCells = self._newValue.styledCells;
            self._owner.selectedSheet._mergedRanges = self._newValue.mergedCells;
            if (self._affectedFormulas) {
                newFormulas = self._affectedFormulas.newFormulas;
            }
            self._owner.deferUpdate(function () {
                self._owner.selection = self._selection;
                if (!!newFormulas && newFormulas.length > 0) {
                    for (i = 0; i < newFormulas.length; i++) {
                        formulaObj = newFormulas[i];
                        self._owner.setCellData(formulaObj.point.x, formulaObj.point.y, formulaObj.formula);
                    }
                }
                self._owner._copyTo(self._owner.selectedSheet);
                self._owner._copyFrom(self._owner.selectedSheet);
            });
            self._owner.selectedSheet.grid['wj_sheetInfo'].styledCells = self._owner.selectedSheet._styledCells;
            self._owner.selectedSheet.grid['wj_sheetInfo'].mergedRanges = self._owner.selectedSheet._mergedRanges;
            self._owner.sortManager.sortDescriptions.sourceCollection = self._newValue.sortList.slice();
            self._owner.sortManager.commitSort(false);
            self._owner.sortManager._refresh();
            self._owner.selection = self._selection;
            self._owner.refresh(true);
            setTimeout(function () {
                self._owner._setFlexSheetToDirty();
                self._owner.refresh(true);
            }, 10);
        };
        _ColumnsChangedAction.prototype.saveNewState = function () {
            var colIndex, columns = [];
            for (colIndex = 0; colIndex < this._owner.columns.length; colIndex++) {
                columns.push(this._owner.columns[colIndex]);
            }
            this._newValue = {
                columns: columns,
                sortList: this._owner.sortManager._committedList.slice(),
                styledCells: this._owner.selectedSheet ? JSON.parse(JSON.stringify(this._owner.selectedSheet._styledCells)) : null,
                mergedCells: this._owner._cloneMergedCells()
            };
            return true;
        };
        return _ColumnsChangedAction;
    }(_UndoAction));
    exports._ColumnsChangedAction = _ColumnsChangedAction;
    var _RowsChangedAction = (function (_super) {
        __extends(_RowsChangedAction, _super);
        function _RowsChangedAction(owner) {
            var _this = this;
            var rowIndex, colIndex, rows = [], columns = [];
            _this = _super.call(this, owner) || this;
            _this._selection = owner.selection;
            for (rowIndex = 0; rowIndex < owner.rows.length; rowIndex++) {
                rows.push(owner.rows[rowIndex]);
            }
            for (colIndex = 0; colIndex < owner.columns.length; colIndex++) {
                columns.push(owner.columns[colIndex]);
            }
            _this._oldValue = {
                rows: rows,
                columns: columns,
                itemsSource: owner.itemsSource ? owner.itemsSource.slice() : undefined,
                styledCells: owner.selectedSheet ? JSON.parse(JSON.stringify(owner.selectedSheet._styledCells)) : null,
                mergedCells: owner._cloneMergedCells()
            };
            return _this;
        }
        _RowsChangedAction.prototype.undo = function () {
            var rowIndex, colIndex, i, processingRow, formulaObj, oldFormulas, self = this, dataSourceBinding = !!self._oldValue.itemsSource;
            if (!self._owner.selectedSheet) {
                return;
            }
            self._owner._clearCalcEngine();
            self._owner.finishEditing();
            self._owner.columns.clear();
            self._owner.rows.clear();
            self._owner.selectedSheet._styledCells = undefined;
            self._owner.selectedSheet._mergedRanges = undefined;
            if (dataSourceBinding) {
                self._owner.autoGenerateColumns = false;
                self._owner.itemsSource = self._oldValue.itemsSource.slice();
            }
            self._owner.rows.beginUpdate();
            for (rowIndex = 0; rowIndex < self._oldValue.rows.length; rowIndex++) {
                processingRow = self._oldValue.rows[rowIndex];
                if (dataSourceBinding) {
                    if (!processingRow.dataItem && !(processingRow instanceof HeaderRow)) {
                        self._owner.rows.splice(rowIndex, 0, processingRow);
                    }
                }
                else {
                    self._owner.rows.push(processingRow);
                }
            }
            for (colIndex = 0; colIndex < self._oldValue.columns.length; colIndex++) {
                self._owner.columns.push(self._oldValue.columns[colIndex]);
            }
            self._owner.rows.endUpdate();
            self._owner.selectedSheet._styledCells = self._oldValue.styledCells;
            self._owner.selectedSheet._mergedRanges = self._oldValue.mergedCells;
            if (self._affectedFormulas) {
                oldFormulas = self._affectedFormulas.oldFormulas;
            }
            self._owner.deferUpdate(function () {
                self._owner.selection = self._selection;
                if (!!oldFormulas && oldFormulas.length > 0) {
                    for (i = 0; i < oldFormulas.length; i++) {
                        formulaObj = oldFormulas[i];
                        self._owner.setCellData(formulaObj.point.x, formulaObj.point.y, formulaObj.formula);
                    }
                }
                self._owner._copyTo(self._owner.selectedSheet);
                self._owner._copyFrom(self._owner.selectedSheet);
            });
            self._owner.selectedSheet.grid['wj_sheetInfo'].styledCells = self._owner.selectedSheet._styledCells;
            self._owner.selectedSheet.grid['wj_sheetInfo'].mergedRanges = self._owner.selectedSheet._mergedRanges;
            self._owner.selection = self._selection;
            self._owner.refresh(true);
            setTimeout(function () {
                self._owner._setFlexSheetToDirty();
                self._owner.refresh(true);
            }, 10);
        };
        _RowsChangedAction.prototype.redo = function () {
            var rowIndex, colIndex, i, processingRow, formulaObj, newFormulas, self = this, dataSourceBinding = !!self._newValue.itemsSource;
            if (!self._owner.selectedSheet) {
                return;
            }
            self._owner._clearCalcEngine();
            self._owner.finishEditing();
            self._owner.columns.clear();
            self._owner.rows.clear();
            self._owner.selectedSheet._styledCells = undefined;
            self._owner.selectedSheet._mergedRanges = undefined;
            if (dataSourceBinding) {
                self._owner.autoGenerateColumns = false;
                self._owner.itemsSource = self._newValue.itemsSource.slice();
            }
            self._owner.rows.beginUpdate();
            for (rowIndex = 0; rowIndex < self._newValue.rows.length; rowIndex++) {
                processingRow = self._newValue.rows[rowIndex];
                if (dataSourceBinding) {
                    if (!processingRow.dataItem && !(processingRow instanceof HeaderRow)) {
                        self._owner.rows.splice(rowIndex, 0, processingRow);
                    }
                }
                else {
                    self._owner.rows.push(processingRow);
                }
            }
            for (colIndex = 0; colIndex < self._newValue.columns.length; colIndex++) {
                self._owner.columns.push(self._newValue.columns[colIndex]);
            }
            self._owner.rows.endUpdate();
            self._owner.selectedSheet._styledCells = self._newValue.styledCells;
            self._owner.selectedSheet._mergedRanges = self._newValue.mergedCells;
            if (self._affectedFormulas) {
                newFormulas = self._affectedFormulas.newFormulas;
            }
            self._owner.deferUpdate(function () {
                if (!!newFormulas && newFormulas.length > 0) {
                    for (i = 0; i < newFormulas.length; i++) {
                        formulaObj = newFormulas[i];
                        self._owner.setCellData(formulaObj.point.x, formulaObj.point.y, formulaObj.formula);
                    }
                }
                self._owner._copyTo(self._owner.selectedSheet);
                self._owner._copyFrom(self._owner.selectedSheet);
            });
            self._owner.selectedSheet.grid['wj_sheetInfo'].styledCells = self._owner.selectedSheet._styledCells;
            self._owner.selectedSheet.grid['wj_sheetInfo'].mergedRanges = self._owner.selectedSheet._mergedRanges;
            self._owner.selection = self._selection;
            self._owner.refresh(true);
            setTimeout(function () {
                self._owner._setFlexSheetToDirty();
                self._owner.refresh(true);
            }, 10);
        };
        _RowsChangedAction.prototype.saveNewState = function () {
            var rowIndex, colIndex, rows = [], columns = [];
            for (rowIndex = 0; rowIndex < this._owner.rows.length; rowIndex++) {
                rows.push(this._owner.rows[rowIndex]);
            }
            for (colIndex = 0; colIndex < this._owner.columns.length; colIndex++) {
                columns.push(this._owner.columns[colIndex]);
            }
            this._newValue = {
                rows: rows,
                columns: columns,
                itemsSource: this._owner.itemsSource ? this._owner.itemsSource.slice() : undefined,
                styledCells: this._owner.selectedSheet ? JSON.parse(JSON.stringify(this._owner.selectedSheet._styledCells)) : null,
                mergedCells: this._owner._cloneMergedCells()
            };
            return true;
        };
        return _RowsChangedAction;
    }(_UndoAction));
    exports._RowsChangedAction = _RowsChangedAction;
    var _CellStyleAction = (function (_super) {
        __extends(_CellStyleAction, _super);
        function _CellStyleAction(owner, styledCells) {
            var _this = _super.call(this, owner) || this;
            _this._oldStyledCells = styledCells ? JSON.parse(JSON.stringify(styledCells)) : (owner.selectedSheet ? JSON.parse(JSON.stringify(owner.selectedSheet._styledCells)) : null);
            return _this;
        }
        _CellStyleAction.prototype.undo = function () {
            if (!this._owner.selectedSheet) {
                return;
            }
            this._owner.selectedSheet._styledCells = JSON.parse(JSON.stringify(this._oldStyledCells));
            this._owner.selectedSheet.grid['wj_sheetInfo'].styledCells = this._owner.selectedSheet._styledCells;
            this._owner.refresh(false);
        };
        _CellStyleAction.prototype.redo = function () {
            if (!this._owner.selectedSheet) {
                return;
            }
            this._owner.selectedSheet._styledCells = JSON.parse(JSON.stringify(this._newStyledCells));
            this._owner.selectedSheet.grid['wj_sheetInfo'].styledCells = this._owner.selectedSheet._styledCells;
            this._owner.refresh(false);
        };
        _CellStyleAction.prototype.saveNewState = function () {
            this._newStyledCells = this._owner.selectedSheet ? JSON.parse(JSON.stringify(this._owner.selectedSheet._styledCells)) : null;
            return true;
        };
        return _CellStyleAction;
    }(_UndoAction));
    exports._CellStyleAction = _CellStyleAction;
    var _CellMergeAction = (function (_super) {
        __extends(_CellMergeAction, _super);
        function _CellMergeAction(owner) {
            var _this = _super.call(this, owner) || this;
            _this._oldMergedCells = owner._cloneMergedCells();
            return _this;
        }
        _CellMergeAction.prototype.undo = function () {
            if (!this._owner.selectedSheet) {
                return;
            }
            this._owner._clearCalcEngine();
            this._owner.selectedSheet._mergedRanges = this._oldMergedCells;
            this._owner.selectedSheet.grid['wj_sheetInfo'].mergedRanges = this._owner.selectedSheet._mergedRanges;
            this._owner.refresh(true);
        };
        _CellMergeAction.prototype.redo = function () {
            if (!this._owner.selectedSheet) {
                return;
            }
            this._owner._clearCalcEngine();
            this._owner.selectedSheet._mergedRanges = this._newMergedCells;
            this._owner.selectedSheet.grid['wj_sheetInfo'].mergedRanges = this._owner.selectedSheet._mergedRanges;
            this._owner.refresh(true);
        };
        _CellMergeAction.prototype.saveNewState = function () {
            this._newMergedCells = this._owner._cloneMergedCells();
            return true;
        };
        return _CellMergeAction;
    }(_UndoAction));
    exports._CellMergeAction = _CellMergeAction;
    var _SortColumnAction = (function (_super) {
        __extends(_SortColumnAction, _super);
        function _SortColumnAction(owner) {
            var _this = this;
            var rowIndex, colIndex, columns = [], rows = [];
            _this = _super.call(this, owner) || this;
            if (!owner.itemsSource) {
                for (rowIndex = 0; rowIndex < owner.rows.length; rowIndex++) {
                    rows.push(owner.rows[rowIndex]);
                }
                for (colIndex = 0; colIndex < owner.columns.length; colIndex++) {
                    columns.push(owner.columns[colIndex]);
                }
            }
            _this._oldValue = {
                sortList: owner.sortManager._committedList.slice(),
                rows: rows,
                columns: columns,
                formulas: owner._scanFormulas()
            };
            return _this;
        }
        _SortColumnAction.prototype.undo = function () {
            var self = this, rowIndex, colIndex, row, column;
            if (!self._owner.selectedSheet) {
                return;
            }
            self._owner._isUndoing = true;
            self._owner.deferUpdate(function () {
                self._owner._clearCalcEngine();
                self._owner.sortManager.sortDescriptions.sourceCollection = self._oldValue.sortList.slice();
                self._owner.sortManager.commitSort(false);
                self._owner.sortManager._refresh();
                if (!self._owner.itemsSource) {
                    self._owner.rows.clear();
                    self._owner.columns.clear();
                    self._owner.selectedSheet.grid.rows.clear();
                    self._owner.selectedSheet.grid.columns.clear();
                    for (rowIndex = 0; rowIndex < self._oldValue.rows.length; rowIndex++) {
                        row = self._oldValue.rows[rowIndex];
                        self._owner.rows.push(row);
                        self._owner.selectedSheet.grid.rows.push(row);
                    }
                    for (colIndex = 0; colIndex < self._oldValue.columns.length; colIndex++) {
                        column = self._oldValue.columns[colIndex];
                        self._owner.columns.push(column);
                        self._owner.selectedSheet.grid.columns.push(column);
                    }
                    self._owner._resetFormulas(self._oldValue.formulas);
                    self._owner._isUndoing = false;
                    setTimeout(function () {
                        self._owner._setFlexSheetToDirty();
                        self._owner.refresh(true);
                    }, 10);
                }
            });
        };
        _SortColumnAction.prototype.redo = function () {
            var self = this, rowIndex, colIndex, row, column;
            if (!self._owner.selectedSheet) {
                return;
            }
            self._owner._isUndoing = true;
            self._owner.deferUpdate(function () {
                self._owner._clearCalcEngine();
                self._owner.sortManager.sortDescriptions.sourceCollection = self._newValue.sortList.slice();
                self._owner.sortManager.commitSort(false);
                self._owner.sortManager._refresh();
                if (!self._owner.itemsSource) {
                    self._owner.rows.clear();
                    self._owner.columns.clear();
                    self._owner.selectedSheet.grid.rows.clear();
                    self._owner.selectedSheet.grid.columns.clear();
                    for (rowIndex = 0; rowIndex < self._newValue.rows.length; rowIndex++) {
                        row = self._newValue.rows[rowIndex];
                        self._owner.rows.push(row);
                        self._owner.selectedSheet.grid.rows.push(row);
                    }
                    for (colIndex = 0; colIndex < self._newValue.columns.length; colIndex++) {
                        column = self._newValue.columns[colIndex];
                        self._owner.columns.push(column);
                        self._owner.selectedSheet.grid.columns.push(column);
                    }
                    self._owner._resetFormulas(self._newValue.formulas);
                    self._owner._isUndoing = false;
                    setTimeout(function () {
                        self._owner._setFlexSheetToDirty();
                        self._owner.refresh(true);
                    }, 10);
                }
            });
        };
        _SortColumnAction.prototype.saveNewState = function () {
            var rowIndex, colIndex, columns = [], rows = [];
            if (!this._owner.itemsSource) {
                for (rowIndex = 0; rowIndex < this._owner.rows.length; rowIndex++) {
                    rows.push(this._owner.rows[rowIndex]);
                }
                for (colIndex = 0; colIndex < this._owner.columns.length; colIndex++) {
                    columns.push(this._owner.columns[colIndex]);
                }
            }
            this._newValue = {
                sortList: this._owner.sortManager._committedList.slice(),
                rows: rows,
                columns: columns,
                formulas: this._owner._scanFormulas()
            };
            return true;
        };
        return _SortColumnAction;
    }(_UndoAction));
    exports._SortColumnAction = _SortColumnAction;
    var _MoveCellsAction = (function (_super) {
        __extends(_MoveCellsAction, _super);
        function _MoveCellsAction(owner, draggingCells, droppingCells, isCopyCells) {
            var _this = this;
            var rowIndex, colIndex, cellIndex, val, cellStyle;
            _this = _super.call(this, owner) || this;
            if (!owner.selectedSheet) {
                return;
            }
            if (draggingCells.topRow === 0 && draggingCells.bottomRow === owner.rows.length - 1) {
                _this._isDraggingColumns = true;
            }
            else {
                _this._isDraggingColumns = false;
            }
            _this._isCopyCells = isCopyCells;
            _this._dragRange = draggingCells;
            _this._dropRange = droppingCells;
            _this._oldDroppingCells = [];
            _this._oldDroppingColumnSetting = {};
            for (rowIndex = droppingCells.topRow; rowIndex <= droppingCells.bottomRow; rowIndex++) {
                for (colIndex = droppingCells.leftCol; colIndex <= droppingCells.rightCol; colIndex++) {
                    if (_this._isDraggingColumns) {
                        if (!_this._oldDroppingColumnSetting[colIndex]) {
                            _this._oldDroppingColumnSetting[colIndex] = {
                                dataType: owner.columns[colIndex].dataType,
                                align: owner.columns[colIndex].align,
                                format: owner.columns[colIndex].format
                            };
                        }
                    }
                    cellIndex = rowIndex * _this._owner.columns.length + colIndex;
                    if (_this._owner.selectedSheet._styledCells[cellIndex]) {
                        cellStyle = JSON.parse(JSON.stringify(_this._owner.selectedSheet._styledCells[cellIndex]));
                    }
                    else {
                        cellStyle = undefined;
                    }
                    val = _this._owner.getCellData(rowIndex, colIndex, false);
                    _this._oldDroppingCells.push({
                        rowIndex: rowIndex,
                        columnIndex: colIndex,
                        cellContent: val,
                        cellStyle: cellStyle
                    });
                }
            }
            if (!isCopyCells) {
                _this._draggingCells = [];
                _this._draggingColumnSetting = {};
                for (rowIndex = draggingCells.topRow; rowIndex <= draggingCells.bottomRow; rowIndex++) {
                    for (colIndex = draggingCells.leftCol; colIndex <= draggingCells.rightCol; colIndex++) {
                        if (_this._isDraggingColumns) {
                            if (!_this._draggingColumnSetting[colIndex]) {
                                _this._draggingColumnSetting[colIndex] = {
                                    dataType: owner.columns[colIndex].dataType,
                                    align: owner.columns[colIndex].align,
                                    format: owner.columns[colIndex].format
                                };
                            }
                        }
                        cellIndex = rowIndex * _this._owner.columns.length + colIndex;
                        if (_this._owner.selectedSheet._styledCells[cellIndex]) {
                            cellStyle = JSON.parse(JSON.stringify(_this._owner.selectedSheet._styledCells[cellIndex]));
                        }
                        else {
                            cellStyle = undefined;
                        }
                        val = _this._owner.getCellData(rowIndex, colIndex, false);
                        _this._draggingCells.push({
                            rowIndex: rowIndex,
                            columnIndex: colIndex,
                            cellContent: val,
                            cellStyle: cellStyle
                        });
                    }
                }
            }
            return _this;
        }
        _MoveCellsAction.prototype.undo = function () {
            var self = this, index, moveCellActionValue, cellIndex, val, cellStyle, srcColIndex, descColIndex;
            if (!self._owner.selectedSheet) {
                return;
            }
            self._owner._clearCalcEngine();
            for (index = 0; index < self._oldDroppingCells.length; index++) {
                moveCellActionValue = self._oldDroppingCells[index];
                self._owner.setCellData(moveCellActionValue.rowIndex, moveCellActionValue.columnIndex, moveCellActionValue.cellContent);
                cellIndex = moveCellActionValue.rowIndex * self._owner.columns.length + moveCellActionValue.columnIndex;
                if (moveCellActionValue.cellStyle) {
                    self._owner.selectedSheet._styledCells[cellIndex] = moveCellActionValue.cellStyle;
                }
                else {
                    delete self._owner.selectedSheet._styledCells[cellIndex];
                }
            }
            if (self._isDraggingColumns && !!self._oldDroppingColumnSetting) {
                Object.keys(self._oldDroppingColumnSetting).forEach(function (key) {
                    self._owner.columns[+key].dataType = self._oldDroppingColumnSetting[+key].dataType ? self._oldDroppingColumnSetting[+key].dataType : wjcCore.DataType.Object;
                    self._owner.columns[+key].align = self._oldDroppingColumnSetting[+key].align;
                    self._owner.columns[+key].format = self._oldDroppingColumnSetting[+key].format;
                });
            }
            if (!self._isCopyCells) {
                for (index = 0; index < self._draggingCells.length; index++) {
                    moveCellActionValue = self._draggingCells[index];
                    self._owner.setCellData(moveCellActionValue.rowIndex, moveCellActionValue.columnIndex, moveCellActionValue.cellContent);
                    cellIndex = moveCellActionValue.rowIndex * self._owner.columns.length + moveCellActionValue.columnIndex;
                    if (moveCellActionValue.cellStyle) {
                        self._owner.selectedSheet._styledCells[cellIndex] = moveCellActionValue.cellStyle;
                    }
                }
                if (self._isDraggingColumns && !!self._draggingColumnSetting) {
                    Object.keys(self._draggingColumnSetting).forEach(function (key) {
                        self._owner.columns[+key].dataType = self._draggingColumnSetting[+key].dataType ? self._draggingColumnSetting[+key].dataType : wjcCore.DataType.Object;
                        self._owner.columns[+key].align = self._draggingColumnSetting[+key].align;
                        self._owner.columns[+key].format = self._draggingColumnSetting[+key].format;
                    });
                }
                if (self._isDraggingColumns) {
                    if (self._dragRange.leftCol < self._dropRange.leftCol) {
                        descColIndex = self._dragRange.leftCol;
                        for (srcColIndex = self._dropRange.leftCol; srcColIndex <= self._dropRange.rightCol; srcColIndex++) {
                            self._owner._updateColumnFiler(srcColIndex, descColIndex);
                            descColIndex++;
                        }
                    }
                    else {
                        descColIndex = self._dragRange.rightCol;
                        for (srcColIndex = self._dropRange.rightCol; srcColIndex >= self._dropRange.leftCol; srcColIndex--) {
                            self._owner._updateColumnFiler(srcColIndex, descColIndex);
                            descColIndex--;
                        }
                    }
                }
            }
        };
        _MoveCellsAction.prototype.redo = function () {
            var self = this, index, moveCellActionValue, cellIndex, val, cellStyle, srcColIndex, descColIndex;
            if (!self._owner.selectedSheet) {
                return;
            }
            self._owner._clearCalcEngine();
            if (!self._isCopyCells) {
                for (index = 0; index < self._draggingCells.length; index++) {
                    moveCellActionValue = self._draggingCells[index];
                    self._owner.setCellData(moveCellActionValue.rowIndex, moveCellActionValue.columnIndex, null);
                    cellIndex = moveCellActionValue.rowIndex * self._owner.columns.length + moveCellActionValue.columnIndex;
                    if (self._owner.selectedSheet._styledCells[cellIndex]) {
                        delete self._owner.selectedSheet._styledCells[cellIndex];
                    }
                }
                if (self._isDraggingColumns && !!self._draggingColumnSetting) {
                    Object.keys(self._draggingColumnSetting).forEach(function (key) {
                        self._owner.columns[+key].dataType = wjcCore.DataType.Object;
                        self._owner.columns[+key].align = null;
                        self._owner.columns[+key].format = null;
                    });
                }
            }
            for (index = 0; index < self._newDroppingCells.length; index++) {
                moveCellActionValue = self._newDroppingCells[index];
                self._owner.setCellData(moveCellActionValue.rowIndex, moveCellActionValue.columnIndex, moveCellActionValue.cellContent);
                cellIndex = moveCellActionValue.rowIndex * self._owner.columns.length + moveCellActionValue.columnIndex;
                if (moveCellActionValue.cellStyle) {
                    self._owner.selectedSheet._styledCells[cellIndex] = moveCellActionValue.cellStyle;
                }
                else {
                    delete self._owner.selectedSheet._styledCells[cellIndex];
                }
            }
            if (self._isDraggingColumns && !!self._newDroppingColumnSetting) {
                Object.keys(self._newDroppingColumnSetting).forEach(function (key) {
                    self._owner.columns[+key].dataType = self._newDroppingColumnSetting[+key].dataType ? self._newDroppingColumnSetting[+key].dataType : wjcCore.DataType.Object;
                    self._owner.columns[+key].align = self._newDroppingColumnSetting[+key].align;
                    self._owner.columns[+key].format = self._newDroppingColumnSetting[+key].format;
                });
            }
            if (self._isDraggingColumns && !self._isCopyCells) {
                if (self._dragRange.leftCol > self._dropRange.leftCol) {
                    descColIndex = self._dropRange.leftCol;
                    for (srcColIndex = self._dragRange.leftCol; srcColIndex <= self._dragRange.rightCol; srcColIndex++) {
                        self._owner._updateColumnFiler(srcColIndex, descColIndex);
                        descColIndex++;
                    }
                }
                else {
                    descColIndex = self._dropRange.rightCol;
                    for (srcColIndex = self._dragRange.rightCol; srcColIndex >= self._dragRange.leftCol; srcColIndex--) {
                        self._owner._updateColumnFiler(srcColIndex, descColIndex);
                        descColIndex--;
                    }
                }
            }
        };
        _MoveCellsAction.prototype.saveNewState = function () {
            var rowIndex, colIndex, cellIndex, val, cellStyle;
            if (!this._owner.selectedSheet) {
                return false;
            }
            if (this._dropRange) {
                this._newDroppingCells = [];
                this._newDroppingColumnSetting = {};
                for (rowIndex = this._dropRange.topRow; rowIndex <= this._dropRange.bottomRow; rowIndex++) {
                    for (colIndex = this._dropRange.leftCol; colIndex <= this._dropRange.rightCol; colIndex++) {
                        if (this._isDraggingColumns) {
                            if (!this._newDroppingColumnSetting[colIndex]) {
                                this._newDroppingColumnSetting[colIndex] = {
                                    dataType: this._owner.columns[colIndex].dataType,
                                    align: this._owner.columns[colIndex].align,
                                    format: this._owner.columns[colIndex].format
                                };
                            }
                        }
                        cellIndex = rowIndex * this._owner.columns.length + colIndex;
                        if (this._owner.selectedSheet._styledCells[cellIndex]) {
                            cellStyle = JSON.parse(JSON.stringify(this._owner.selectedSheet._styledCells[cellIndex]));
                        }
                        else {
                            cellStyle = undefined;
                        }
                        val = this._owner.getCellData(rowIndex, colIndex, false);
                        this._newDroppingCells.push({
                            rowIndex: rowIndex,
                            columnIndex: colIndex,
                            cellContent: val,
                            cellStyle: cellStyle
                        });
                    }
                }
                return true;
            }
            return false;
        };
        return _MoveCellsAction;
    }(_UndoAction));
    exports._MoveCellsAction = _MoveCellsAction;
    var _CutAction = (function (_super) {
        __extends(_CutAction, _super);
        function _CutAction(owner) {
            var _this = this;
            var rowIndex, colIndex, val, cutSource;
            _this = _super.call(this, owner) || this;
            _this._oldValues = [];
            _this._oldCutValues = [];
            _this._mergeAction = new _CellMergeAction(owner);
            _this._cutSheet = owner._copiedSheet;
            _this._selection = owner.selection;
            _this._cutSelection = owner._copiedRanges[0];
            cutSource = _this._cutSheet === owner.selectedSheet ? owner : _this._cutSheet.grid;
            for (rowIndex = _this._cutSelection.topRow; rowIndex <= _this._cutSelection.bottomRow; rowIndex++) {
                for (colIndex = _this._cutSelection.leftCol; colIndex <= _this._cutSelection.rightCol; colIndex++) {
                    val = cutSource.getCellData(rowIndex, colIndex, !!cutSource.columns[colIndex].dataMap);
                    val = val == null ? '' : val;
                    _this._oldCutValues.push({
                        row: rowIndex,
                        col: colIndex,
                        value: val
                    });
                }
            }
            return _this;
        }
        _CutAction.prototype.undo = function () {
            var self = this;
            self._owner._clearCalcEngine();
            self._owner.selectedSheet.selectionRanges.clear();
            self._owner.deferUpdate(function () {
                var i, item, cutSource = self._cutSheet === self._owner.selectedSheet ? self._owner : self._cutSheet.grid;
                self._owner.selectedSheet.selectionRanges.push(self._selection);
                for (i = 0; i < self._oldCutValues.length; i++) {
                    item = self._oldCutValues[i];
                    cutSource.setCellData(item.row, item.col, item.value);
                }
                for (i = 0; i < self._oldValues.length; i++) {
                    item = self._oldValues[i];
                    self._owner.setCellData(item.row, item.col, item.value);
                }
                self._mergeAction.undo();
                self._owner.refresh(false);
            });
        };
        _CutAction.prototype.redo = function () {
            var self = this;
            self._owner._clearCalcEngine();
            self._owner.selectedSheet.selectionRanges.clear();
            self._owner.deferUpdate(function () {
                var i, item, cutSource = self._cutSheet === self._owner.selectedSheet ? self._owner : self._cutSheet.grid;
                self._owner.selectedSheet.selectionRanges.push(self._selection);
                for (i = 0; i < self._newCutValues.length; i++) {
                    item = self._newCutValues[i];
                    cutSource.setCellData(item.row, item.col, item.value);
                }
                for (i = 0; i < self._newValues.length; i++) {
                    item = self._newValues[i];
                    self._owner.setCellData(item.row, item.col, item.value);
                }
                self._mergeAction.redo();
                self._owner.refresh(false);
            });
        };
        _CutAction.prototype.saveNewState = function () {
            var rowIndex, colIndex, currentCol, val, cutSource = this._cutSheet === this._owner.selectedSheet ? this._owner : this._cutSheet.grid;
            this._newCutValues = [];
            for (rowIndex = this._cutSelection.topRow; rowIndex <= this._cutSelection.bottomRow; rowIndex++) {
                for (colIndex = this._cutSelection.leftCol; colIndex <= this._cutSelection.rightCol; colIndex++) {
                    val = cutSource.getCellData(rowIndex, colIndex, !!cutSource.columns[colIndex].dataMap);
                    val = val == null ? '' : val;
                    this._newCutValues.push({
                        row: rowIndex,
                        col: colIndex,
                        value: val
                    });
                }
            }
            this._newValues = [];
            for (rowIndex = this._selection.topRow; rowIndex <= this._selection.bottomRow; rowIndex++) {
                for (colIndex = this._selection.leftCol; colIndex <= this._selection.rightCol; colIndex++) {
                    currentCol = this._owner.columns[colIndex];
                    if (!currentCol) {
                        return false;
                    }
                    val = this._owner.getCellData(rowIndex, colIndex, !!this._owner.columns[colIndex].dataMap);
                    val = val == null ? '' : val;
                    this._newValues.push({
                        row: rowIndex,
                        col: colIndex,
                        value: val
                    });
                }
            }
            this._mergeAction.saveNewState();
            return true;
        };
        _CutAction.prototype.updateForPasting = function (rng) {
            var val = this._owner.getCellData(rng.row, rng.col, !!this._owner.columns[rng.col].dataMap);
            this._selection = this._owner.selection;
            val = val == null ? '' : val;
            this._oldValues.push({
                row: rng.row,
                col: rng.col,
                value: val
            });
            this._selection.row = Math.min(this._selection.topRow, rng.topRow);
            this._selection.row2 = Math.max(this._selection.bottomRow, rng.bottomRow);
            this._selection.col = Math.min(this._selection.leftCol, rng.leftCol);
            this._selection.col2 = Math.max(this._selection.rightCol, rng.rightCol);
        };
        return _CutAction;
    }(_UndoAction));
    exports._CutAction = _CutAction;
    'use strict';
    var _ContextMenu = (function (_super) {
        __extends(_ContextMenu, _super);
        function _ContextMenu(element, owner) {
            var _this = _super.call(this, element) || this;
            _this._owner = owner;
            _this.applyTemplate('', _this.getTemplate(), {
                _insRows: 'insert-rows',
                _delRows: 'delete-rows',
                _insCols: 'insert-columns',
                _delCols: 'delete-columns',
            });
            _this._init();
            return _this;
        }
        _ContextMenu.prototype.show = function (e, point) {
            var posX = (point ? point.x : e.clientX) + (e ? window.pageXOffset : 0), posY = (point ? point.y : e.clientY) + (e ? window.pageYOffset : 0);
            this.hostElement.style.position = 'absolute';
            this.hostElement.style.display = 'inline';
            if (posY + this.hostElement.clientHeight > window.innerHeight) {
                posY -= this.hostElement.clientHeight;
            }
            if (posX + this.hostElement.clientWidth > window.innerWidth) {
                posX -= this.hostElement.clientWidth;
            }
            this.hostElement.style.top = posY + 'px';
            this.hostElement.style.left = posX + 'px';
        };
        _ContextMenu.prototype.hide = function () {
            this.hostElement.style.display = 'none';
        };
        _ContextMenu.prototype._init = function () {
            var self = this;
            self.hostElement.style.zIndex = '9999';
            document.querySelector('body').appendChild(self.hostElement);
            self.addEventListener(self.hostElement, 'contextmenu', function (e) {
                e.preventDefault();
            });
            self.addEventListener(self._insRows, 'click', function (e) {
                self._owner.insertRows();
                self.hide();
                self._owner.hostElement.focus();
            });
            self.addEventListener(self._delRows, 'click', function (e) {
                self._owner.deleteRows();
                self.hide();
                self._owner.hostElement.focus();
            });
            self.addEventListener(self._insCols, 'click', function (e) {
                self._owner.insertColumns();
                self.hide();
                self._owner.hostElement.focus();
            });
            self.addEventListener(self._delCols, 'click', function (e) {
                self._owner.deleteColumns();
                self.hide();
                self._owner.hostElement.focus();
            });
        };
        return _ContextMenu;
    }(wjcCore.Control));
    _ContextMenu.controlTemplate = '<div class="wj-context-menu" width="150px">' +
        '<div class="wj-context-menu-item" wj-part="insert-rows">Insert Row</div>' +
        '<div class="wj-context-menu-item" wj-part="delete-rows">Delete Rows</div>' +
        '<div class="wj-context-menu-item" wj-part="insert-columns">Insert Column</div>' +
        '<div class="wj-context-menu-item" wj-part="delete-columns">Delete Columns</div>' +
        '</div>';
    exports._ContextMenu = _ContextMenu;
    'use strict';
    var _TabHolder = (function (_super) {
        __extends(_TabHolder, _super);
        function _TabHolder(element, owner) {
            var _this = _super.call(this, element) || this;
            _this._splitterMousedownHdl = _this._splitterMousedownHandler.bind(_this);
            _this._owner = owner;
            if (_this.hostElement.attributes['tabindex']) {
                _this.hostElement.attributes.removeNamedItem('tabindex');
            }
            _this.applyTemplate('', _this.getTemplate(), {
                _divSheet: 'left',
                _divSplitter: 'splitter',
                _divRight: 'right'
            });
            _this._init();
            return _this;
        }
        Object.defineProperty(_TabHolder.prototype, "sheetControl", {
            get: function () {
                return this._sheetControl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(_TabHolder.prototype, "visible", {
            get: function () {
                return this.hostElement.style.display !== 'none';
            },
            set: function (value) {
                this.hostElement.style.display = value ? 'block' : 'none';
                this._divSheet.style.display = value ? 'block' : 'none';
            },
            enumerable: true,
            configurable: true
        });
        _TabHolder.prototype.getSheetBlanketSize = function () {
            return 20;
        };
        _TabHolder.prototype.adjustSize = function () {
            var hScrollDis = this._owner.scrollSize.width - this._owner.clientSize.width, vScrollDis = this._owner.scrollSize.height - this._owner.clientSize.height, eParent = this._divSplitter.parentElement, leftWidth;
            if (hScrollDis <= 0) {
                eParent.style.minWidth = '100px';
                this._divSplitter.style.display = 'none';
                this._divRight.style.display = 'none';
                this._divSheet.style.width = '100%';
                this._divSplitter.removeEventListener('mousedown', this._splitterMousedownHdl, true);
            }
            else {
                eParent.style.minWidth = '300px';
                this._divSplitter.style.display = 'none';
                this._divRight.style.display = 'none';
                this._divSheet.style.width = '100%';
                this._divSplitter.removeEventListener('mousedown', this._splitterMousedownHdl, true);
                this._divSplitter.addEventListener('mousedown', this._splitterMousedownHdl, true);
            }
            this._sheetControl._adjustSize();
        };
        _TabHolder.prototype._init = function () {
            var self = this;
            self._funSplitterMousedown = function (e) {
                self._splitterMouseupHandler(e);
            };
            self._divSplitter.parentElement.style.height = self.getSheetBlanketSize() + 'px';
            self._sheetControl = new _SheetTabs(self._divSheet, this._owner);
        };
        _TabHolder.prototype._splitterMousedownHandler = function (e) {
            this._startPos = e.pageX;
            document.addEventListener('mousemove', this._splitterMousemoveHandler.bind(this), true);
            document.addEventListener('mouseup', this._funSplitterMousedown, true);
            e.preventDefault();
        };
        _TabHolder.prototype._splitterMousemoveHandler = function (e) {
            if (this._startPos === null || typeof (this._startPos) === 'undefined') {
                return;
            }
            this._adjustDis(e.pageX - this._startPos);
        };
        _TabHolder.prototype._splitterMouseupHandler = function (e) {
            document.removeEventListener('mousemove', this._splitterMousemoveHandler, true);
            document.removeEventListener('mouseup', this._funSplitterMousedown, true);
            this._adjustDis(e.pageX - this._startPos);
            this._startPos = null;
        };
        _TabHolder.prototype._adjustDis = function (dis) {
            var rightWidth = this._divRight.offsetWidth - dis, leftWidth = this._divSheet.offsetWidth + dis;
            if (rightWidth <= 100) {
                rightWidth = 100;
                dis = this._divRight.offsetWidth - rightWidth;
                leftWidth = this._divSheet.offsetWidth + dis;
            }
            else if (leftWidth <= 100) {
                leftWidth = 100;
                dis = leftWidth - this._divSheet.offsetWidth;
                rightWidth = this._divRight.offsetWidth - dis;
            }
            if (dis == 0) {
                return;
            }
            this._divRight.style.width = rightWidth + 'px';
            this._divSheet.style.width = leftWidth + 'px';
            this._startPos = this._startPos + dis;
        };
        return _TabHolder;
    }(wjcCore.Control));
    _TabHolder.controlTemplate = '<div>' +
        '<div wj-part="left" style ="float:left;height:100%;overflow:hidden"></div>' +
        '<div wj-part="splitter" style="float:left;height:100%;width:6px;background-color:#e9eaee;padding:2px;cursor:e-resize"><div style="background-color:#8a9eb2;height:100%"></div></div>' +
        '<div wj-part="right" style="float:left;height:100%;background-color:#e9eaee">' +
        '</div>' +
        '</div>';
    exports._TabHolder = _TabHolder;
    'use strict';
    var _FlexSheetCellFactory = (function (_super) {
        __extends(_FlexSheetCellFactory, _super);
        function _FlexSheetCellFactory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        _FlexSheetCellFactory.prototype.updateCell = function (panel, r, c, cell, rng) {
            var g = panel.grid, r2 = r, c2 = c, content, cellIndex, flex, fc, val, data, isFormula, styleInfo, checkBox, input, bcol, format, firstVisibleCell, isGroupRow, dateVal;
            if (panel.cellType === wjcGrid.CellType.Cell) {
                this._resetCellStyle(panel.columns[c], cell);
            }
            _super.prototype.updateCell.call(this, panel, r, c, cell, rng);
            if (rng && !rng.isSingleCell) {
                r = rng.row;
                c = rng.col;
                r2 = rng.row2;
                c2 = rng.col2;
            }
            bcol = g._getBindingColumn(panel, r, panel.columns[c]);
            switch (panel.cellType) {
                case wjcGrid.CellType.RowHeader:
                    cell.textContent = (r + 1) + '';
                    break;
                case wjcGrid.CellType.ColumnHeader:
                    content = FlexSheet.convertNumberToAlpha(c);
                    cell.innerHTML = cell.innerHTML.replace(wjcCore.escapeHtml(cell.textContent), '') + content;
                    cell.style.textAlign = 'center';
                    break;
                case wjcGrid.CellType.Cell:
                    flex = panel.grid;
                    cellIndex = r * flex.columns.length + c;
                    styleInfo = flex.selectedSheet && flex.selectedSheet._styledCells ? flex.selectedSheet._styledCells[cellIndex] : null;
                    if (!!rng && !rng.isSingleCell) {
                        firstVisibleCell = this._getFirstVisibleCell(flex, rng);
                        r = firstVisibleCell.row;
                        c = firstVisibleCell.col;
                    }
                    if (panel.rows[r] instanceof HeaderRow) {
                        if (panel.columns[c].dataType === wjcCore.DataType.Boolean) {
                            if (cell.childElementCount === 1 && cell.firstElementChild instanceof HTMLInputElement && cell.firstElementChild.type === 'checkbox') {
                                cell.innerHTML = wjcCore.escapeHtml(panel.columns[c].header);
                            }
                        }
                        wjcCore.addClass(cell, 'wj-header-row');
                    }
                    else {
                        val = flex.getCellValue(r, c, false);
                        data = flex.getCellData(r, c, false);
                        isFormula = data != null && typeof data === 'string' && data[0] === '=';
                        isGroupRow = panel.rows[r] instanceof wjcGrid.GroupRow;
                        format = (styleInfo ? styleInfo.format : null) || (isGroupRow ? null : bcol.format);
                        if (flex.editRange && flex.editRange.contains(r, c)) {
                            if (wjcCore.isNumber(val) && !bcol.dataMap && !isFormula) {
                                if (format) {
                                    val = this._getFormattedValue(val, format);
                                }
                                input = cell.querySelector('input');
                                if (input) {
                                    input.value = val;
                                }
                            }
                        }
                        else {
                            if (panel.columns[c].dataType === wjcCore.DataType.Boolean) {
                                checkBox = cell.querySelector('[type="checkbox"]');
                                if (checkBox) {
                                    checkBox.checked = flex.getCellValue(r, c);
                                    checkBox.disabled = checkBox.disabled || !flex.canEditCell(r, c);
                                }
                            }
                            else if (bcol.dataMap && !isGroupRow) {
                                val = flex.getCellValue(r, c, true);
                                fc = cell.firstChild;
                                if (fc && fc.nodeType === 3 && fc.nodeValue !== val) {
                                    fc.nodeValue = val;
                                }
                            }
                            else {
                                if (cell.childElementCount === 0 && cell.textContent === flex.getCellData(r, c, true)) {
                                    val = flex.getCellValue(r, c, true);
                                    if (val !== '' && wjcCore.isNumber(+val) && !isNaN(+val) && /[hsmy\:]/i.test(format)) {
                                        dateVal = _Expression._fromOADate(+val);
                                        if (!isNaN(dateVal.getTime())) {
                                            val = wjcCore.Globalize.formatDate(dateVal, format);
                                        }
                                    }
                                    if (format || !isGroupRow) {
                                        cell.innerHTML = wjcCore.escapeHtml(val);
                                    }
                                }
                            }
                        }
                        if (styleInfo) {
                            var st = cell.style, styleInfoVal;
                            for (var styleProp in styleInfo) {
                                if (styleProp === 'className') {
                                    if (styleInfo.className) {
                                        wjcCore.addClass(cell, styleInfo.className);
                                    }
                                }
                                else if (styleProp !== 'format' && (styleInfoVal = styleInfo[styleProp])) {
                                    if ((wjcCore.hasClass(cell, 'wj-state-selected') || wjcCore.hasClass(cell, 'wj-state-multi-selected'))
                                        && (styleProp === 'color' || styleProp === 'backgroundColor')) {
                                        st[styleProp] = '';
                                    }
                                    else if (styleProp === 'whiteSpace' && styleInfoVal === 'normal') {
                                        st[styleProp] = '';
                                    }
                                    else {
                                        st[styleProp] = styleInfoVal;
                                    }
                                }
                            }
                        }
                    }
                    if (!!cell.style.backgroundColor || !!cell.style.color) {
                        if (!styleInfo) {
                            flex.selectedSheet._styledCells[cellIndex] = styleInfo = {};
                        }
                        if (!!cell.style.backgroundColor) {
                            styleInfo.backgroundColor = cell.style.backgroundColor;
                        }
                        if (!!cell.style.color) {
                            styleInfo.color = cell.style.color;
                        }
                    }
                    break;
            }
            if (panel.cellType === wjcGrid.CellType.Cell) {
                if (r === g._lastVisibleFrozenRow && !wjcCore.hasClass(cell, 'wj-frozen-row')) {
                    wjcCore.addClass(cell, 'wj-frozen-row');
                }
                if (c === g._lastVisibleFrozenColumn && !wjcCore.hasClass(cell, 'wj-frozen-col')) {
                    wjcCore.addClass(cell, 'wj-frozen-col');
                }
            }
        };
        _FlexSheetCellFactory.prototype._resetCellStyle = function (column, cell) {
            ['fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'textDecoration', 'textAlign', 'verticalAlign', 'backgroundColor', 'color', 'whiteSpace', 'borderLeftStyle', 'borderLeftColor', 'borderLeftWidth', 'borderRightStyle', 'borderRightColor', 'borderRightWidth', 'borderTopStyle', 'borderTopColor', 'borderTopWidth', 'borderBottomStyle', 'borderBottomColor', 'borderBottomWidth'].forEach(function (val) {
                if (val === 'textAlign') {
                    cell.style.textAlign = column.getAlignment();
                }
                else {
                    cell.style[val] = '';
                }
            });
        };
        _FlexSheetCellFactory.prototype._getFormattedValue = function (value, format) {
            var val;
            if (value !== Math.round(value)) {
                format = format.replace(/([a-z])(\d*)(.*)/ig, '$0112$3');
            }
            val = wjcCore.Globalize.formatNumber(value, format, true);
            return val;
        };
        _FlexSheetCellFactory.prototype._getFirstVisibleCell = function (g, rng) {
            var firstVisibleRow, firstVisibleColumn;
            for (firstVisibleRow = rng.topRow; firstVisibleRow <= rng.bottomRow; firstVisibleRow++) {
                if (g.rows[firstVisibleRow].isVisible) {
                    break;
                }
            }
            for (firstVisibleColumn = rng.leftCol; firstVisibleColumn <= rng.rightCol; firstVisibleColumn++) {
                if (g.columns[firstVisibleColumn].isVisible) {
                    break;
                }
            }
            return new wjcGrid.CellRange(firstVisibleRow, firstVisibleColumn);
        };
        return _FlexSheetCellFactory;
    }(wjcGrid.CellFactory));
    exports._FlexSheetCellFactory = _FlexSheetCellFactory;
    'use strict';
    var FlexSheetFunctions = [
        { name: 'abs', description: 'Returns the absolute value of a number.' },
        { name: 'acos', description: 'Returns the arccosine of a number.' },
        { name: 'and', description: 'Returns TRUE if all of its arguments are TRUE.' },
        { name: 'asin', description: 'Returns the arcsine of a number.' },
        { name: 'atan', description: 'Returns the arctangent of a number.' },
        { name: 'atan2', description: 'Returns the arctangent from x- and y-coordinates.' },
        { name: 'average', description: 'Returns the average of its arguments.' },
        { name: 'ceiling', description: 'Rounds a number to the nearest integer or to the nearest multiple of significance.' },
        { name: 'char', description: 'Returns the character specified by the code number.' },
        { name: 'choose', description: 'Chooses a value from a list of values.' },
        { name: 'code', description: 'Returns a numeric code for the first character in a text string.' },
        { name: 'column', description: 'Returns the column number of a reference.' },
        { name: 'columns', description: 'Returns the number of columns in a reference.' },
        { name: 'concatenate', description: 'Joins several text items into one text item.' },
        { name: 'cos', description: 'Returns the cosine of a number.' },
        { name: 'count', description: 'Counts how many numbers are in the list of arguments.' },
        { name: 'counta', description: 'Counts how many values are in the list of arguments.' },
        { name: 'countblank', description: 'Counts the number of blank cells within a range.' },
        { name: 'countif', description: 'Counts the number of cells within a range that meet the given criteria.' },
        { name: 'countifs', description: 'Counts the number of cells within a range that meet multiple criteria.' },
        { name: 'date', description: 'Returns the serial number of a particular date.' },
        { name: 'datedif', description: 'Calculates the number of days, months, or years between two dates.' },
        { name: 'day', description: 'Converts a serial number to a day of the month.' },
        { name: 'dcount', description: 'Counts the cells that contain numbers in a database.' },
        { name: 'exp', description: 'Returns e raised to the power of a given number.' },
        { name: 'false', description: 'Returns the logical value FALSE.' },
        { name: 'find', description: 'Finds one text value within another (case-sensitive).' },
        { name: 'floor', description: 'Rounds a number down, toward zero.' },
        { name: 'hlookup', description: 'Looks in the top row of an array and returns the value of the indicated cell.' },
        { name: 'hour', description: 'Converts a serial number to an hour.' },
        { name: 'if', description: 'Specifies a logical test to perform.' },
        { name: 'index', description: 'Uses an index to choose a value from a reference.' },
        { name: 'left', description: 'Returns the leftmost characters from a text value.' },
        { name: 'len', description: 'Returns the number of characters in a text string.' },
        { name: 'ln', description: 'Returns the natural logarithm of a number.' },
        { name: 'lower', description: 'Converts text to lowercase.' },
        { name: 'max', description: 'Returns the maximum value in a list of arguments.' },
        { name: 'mid', description: 'Returns a specific number of characters from a text string starting at the position you specify.' },
        { name: 'min', description: 'Returns the minimum value in a list of arguments.' },
        { name: 'mod', description: 'Returns the remainder from division.' },
        { name: 'month', description: 'Converts a serial number to a month.' },
        { name: 'not', description: 'Reverses the logic of its argument.' },
        { name: 'now', description: 'Returns the serial number of the current date and time.' },
        { name: 'or', description: 'Returns TRUE if any argument is TRUE.' },
        { name: 'pi', description: 'Returns the value of pi.' },
        { name: 'power', description: 'Returns the result of a number raised to a power.' },
        { name: 'product', description: 'Multiplies its arguments.' },
        { name: 'proper', description: 'Capitalizes the first letter in each word of a text value.' },
        { name: 'rand', description: 'Returns a random number between 0 and 1.' },
        { name: 'rank', description: 'Returns the rank of a number in a list of numbers.' },
        { name: 'rate', description: 'Returns the interest rate per period of an annuity.' },
        { name: 'replace', description: 'Replaces characters within text.' },
        { name: 'rept', description: 'Repeats text a given number of times.' },
        { name: 'right', description: 'Returns the rightmost characters from a text value.' },
        { name: 'round', description: 'Rounds a number to a specified number of digits.' },
        { name: 'rounddown', description: 'Rounds a number down, toward zero.' },
        { name: 'roundup', description: 'Rounds a number up, away from zero.' },
        { name: 'row', description: 'Returns the row number of a reference.' },
        { name: 'rows', description: 'Returns the number of rows in a reference.' },
        { name: 'search', description: 'Finds one text value within another (not case-sensitive).' },
        { name: 'sin', description: 'Returns the sine of the given angle.' },
        { name: 'sqrt', description: 'Returns a positive square root.' },
        { name: 'stdev', description: 'Estimates standard deviation based on a sample.' },
        { name: 'stdevp', description: 'Calculates standard deviation based on the entire population.' },
        { name: 'substitute', description: 'Substitutes new text for old text in a text string.' },
        { name: 'subtotal', description: 'Returns a subtotal in a list or database.' },
        { name: 'sum', description: 'Adds its arguments.' },
        { name: 'sumif', description: 'Adds the cells specified by a given criteria.' },
        { name: 'sumifs', description: 'Adds the cells in a range that meet multiple criteria.' },
        { name: 'sumproduct', description: 'Multiplies corresponding components in the given arrays, and returns the sum of those products.' },
        { name: 'tan', description: 'Returns the tangent of a number.' },
        { name: 'text', description: 'Formats a number and converts it to text.' },
        { name: 'time', description: 'Returns the serial number of a particular time.' },
        { name: 'today', description: 'Returns the serial number of today\'s date.' },
        { name: 'trim', description: 'Removes spaces from text.' },
        { name: 'true', description: 'Returns the logical value TRUE.' },
        { name: 'trunc', description: 'Truncates a number to an integer.' },
        { name: 'upper', description: 'Converts text to uppercase.' },
        { name: 'value', description: 'Converts a text argument to a number.' },
        { name: 'var', description: 'Estimates variance based on a sample.' },
        { name: 'varp', description: 'Calculates variance based on the entire population.' },
        { name: 'year', description: 'Converts a serial number to a year.' },
    ];
    var FlexSheet = (function (_super) {
        __extends(FlexSheet, _super);
        function FlexSheet(element, options) {
            var _this = _super.call(this, element, options) || this;
            _this._selectedSheetIndex = -1;
            _this._columnHeaderClicked = false;
            _this._addingSheet = false;
            _this._mouseMoveHdl = _this._mouseMove.bind(_this);
            _this._clickHdl = _this._click.bind(_this);
            _this._touchStartHdl = _this._touchStart.bind(_this);
            _this._touchEndHdl = _this._touchEnd.bind(_this);
            _this._isContextMenuKeyDown = false;
            _this._isClicking = false;
            _this._resettingFilter = false;
            _this.selectedSheetChanged = new wjcCore.Event();
            _this.draggingRowColumn = new wjcCore.Event();
            _this.droppingRowColumn = new wjcCore.Event();
            _this.loaded = new wjcCore.Event();
            _this.unknownFunction = new wjcCore.Event();
            _this.sheetCleared = new wjcCore.Event();
            _this.prepareChangingRow = new wjcCore.Event();
            _this.prepareChangingColumn = new wjcCore.Event();
            _this.rowChanged = new wjcCore.Event();
            _this.columnChanged = new wjcCore.Event();
            _this['_eCt'].style.backgroundColor = 'white';
            wjcCore.addClass(_this.hostElement, 'wj-flexsheet');
            wjcCore.setCss(_this.hostElement, {
                fontFamily: 'Arial'
            });
            _this['_cf'] = new _FlexSheetCellFactory();
            _this._init();
            _this.showSort = false;
            _this.allowSorting = false;
            _this.showGroups = false;
            _this.showMarquee = true;
            _this.showSelectedHeaders = wjcGrid.HeadersVisibility.All;
            _this.allowResizing = wjcGrid.AllowResizing.Both;
            _this.allowDragging = wjcGrid.AllowDragging.None;
            return _this;
        }
        Object.defineProperty(FlexSheet.prototype, "sheets", {
            get: function () {
                if (!this._sheets) {
                    this._sheets = new SheetCollection();
                    this._sheets.selectedSheetChanged.addHandler(this._selectedSheetChange, this);
                    this._sheets.collectionChanged.addHandler(this._sourceChange, this);
                    this._sheets.sheetVisibleChanged.addHandler(this._sheetVisibleChange, this);
                    this._sheets.sheetCleared.addHandler(this.onSheetCleared, this);
                }
                return this._sheets;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlexSheet.prototype, "selectedSheetIndex", {
            get: function () {
                return this._selectedSheetIndex;
            },
            set: function (value) {
                if (value !== this._selectedSheetIndex) {
                    this._showSheet(value);
                    this._sheets.selectedIndex = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlexSheet.prototype, "selectedSheet", {
            get: function () {
                return this._sheets[this._selectedSheetIndex];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlexSheet.prototype, "isFunctionListOpen", {
            get: function () {
                return this._functionListHost && this._functionListHost.style.display !== 'none';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlexSheet.prototype, "isTabHolderVisible", {
            get: function () {
                return this._tabHolder.visible;
            },
            set: function (value) {
                if (value !== this._tabHolder.visible) {
                    if (value) {
                        this._divContainer.style.height = (this._divContainer.parentElement.clientHeight - this._tabHolder.getSheetBlanketSize()) + 'px';
                    }
                    else {
                        this._divContainer.style.height = this._divContainer.parentElement.clientHeight + 'px';
                    }
                    this._tabHolder.visible = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlexSheet.prototype, "undoStack", {
            get: function () {
                return this._undoStack;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlexSheet.prototype, "sortManager", {
            get: function () {
                return this._sortManager;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlexSheet.prototype, "showFilterIcons", {
            get: function () {
                if (!!this._filter) {
                    return this._filter.showFilterIcons;
                }
                return false;
            },
            set: function (value) {
                if (!!this._filter && this._filter.showFilterIcons !== value) {
                    this._filter.showFilterIcons = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        FlexSheet.prototype.onSelectedSheetChanged = function (e) {
            this._sortManager._refresh();
            this.selectedSheetChanged.raise(this, e);
        };
        FlexSheet.prototype.onDraggingRowColumn = function (e) {
            this.draggingRowColumn.raise(this, e);
        };
        FlexSheet.prototype.onDroppingRowColumn = function (e) {
            this.droppingRowColumn.raise(this, new wjcCore.EventArgs());
        };
        FlexSheet.prototype.onLoaded = function (e) {
            var self = this;
            if (self._toRefresh) {
                clearTimeout(self._toRefresh);
                self._toRefresh = null;
            }
            self._toRefresh = setTimeout(function () {
                self._setFlexSheetToDirty();
                self.invalidate();
            }, 10);
            self.loaded.raise(this, new wjcCore.EventArgs());
        };
        FlexSheet.prototype.onUnknownFunction = function (e) {
            this.unknownFunction.raise(this, e);
        };
        FlexSheet.prototype.onSheetCleared = function (e) {
            this.sheetCleared.raise(this, new wjcCore.EventArgs());
        };
        FlexSheet.prototype.onPrepareChangingRow = function () {
            this.prepareChangingRow.raise(this, new wjcCore.EventArgs());
        };
        FlexSheet.prototype.onPrepareChangingColumn = function () {
            this.prepareChangingColumn.raise(this, new wjcCore.EventArgs());
        };
        FlexSheet.prototype.onRowChanged = function (e) {
            this.rowChanged.raise(this, e);
        };
        FlexSheet.prototype.onColumnChanged = function (e) {
            this.columnChanged.raise(this, e);
        };
        FlexSheet.prototype.refresh = function (fullUpdate) {
            if (fullUpdate === void 0) { fullUpdate = true; }
            var rowIndex, row, colIndex, col;
            this._divContainer.style.height = (this._divContainer.parentElement.clientHeight - (this.isTabHolderVisible ? this._tabHolder.getSheetBlanketSize() : 0)) + 'px';
            if (!this.preserveSelectedState && !!this.selectedSheet) {
                this.selectedSheet.selectionRanges.clear();
                this.selectedSheet.selectionRanges.push(this.selection);
            }
            if (fullUpdate) {
                this._calcEngine._clearExpressionCache();
            }
            this._lastVisibleFrozenRow = -1;
            if (this.frozenRows > 0) {
                for (var ri = this.frozenRows - 1; ri >= 0; ri--) {
                    if (this.rows[ri] && this.rows[ri].isVisible) {
                        this._lastVisibleFrozenRow = ri;
                        break;
                    }
                }
            }
            this._lastVisibleFrozenColumn = -1;
            if (this.frozenColumns > 0) {
                for (var ci = this.frozenColumns - 1; ci >= 0; ci--) {
                    if (this.columns[ci] && this.columns[ci].isVisible) {
                        this._lastVisibleFrozenColumn = ci;
                        break;
                    }
                }
            }
            if (this.selectedSheet) {
                if (this.selectedSheet._freezeHiddenRowCnt > 0) {
                    for (rowIndex = 0; rowIndex < this.selectedSheet._freezeHiddenRowCnt; rowIndex++) {
                        row = this.rows[rowIndex];
                        if (!(row instanceof HeaderRow)) {
                            row.visible = false;
                        }
                    }
                }
                if (this.selectedSheet._freezeHiddenColumnCnt > 0) {
                    for (colIndex = 0; colIndex < this.selectedSheet._freezeHiddenColumnCnt; colIndex++) {
                        this.columns[colIndex].visible = false;
                    }
                }
            }
            _super.prototype.refresh.call(this, fullUpdate);
            this._tabHolder.adjustSize();
        };
        FlexSheet.prototype.setCellData = function (r, c, value, coerce) {
            if (coerce === void 0) { coerce = false; }
            var isFormula = wjcCore.isString(value) && value.length > 1 && value[0] === '=';
            this._calcEngine._clearExpressionCache();
            return this.cells.setCellData(r, c, value, coerce && !isFormula);
        };
        FlexSheet.prototype.containsFocus = function () {
            return this.isFunctionListOpen || _super.prototype.containsFocus.call(this);
        };
        FlexSheet.prototype.addUnboundSheet = function (sheetName, rows, cols, pos, grid) {
            var sheet = this._addSheet(sheetName, rows, cols, pos, grid);
            if (sheet.selectionRanges.length === 0) {
                sheet.selectionRanges.push(this.selection);
            }
            return sheet;
        };
        FlexSheet.prototype.addBoundSheet = function (sheetName, source, pos, grid) {
            var sheet = this._addSheet(sheetName, 0, 0, pos, grid);
            if (source) {
                sheet.itemsSource = source;
                if (this.childItemsPath) {
                    sheet.grid.childItemsPath = this.childItemsPath;
                }
            }
            if (sheet.selectionRanges.length === 0) {
                sheet.selectionRanges.push(this.selection);
            }
            return sheet;
        };
        FlexSheet.prototype.applyCellsStyle = function (cellStyle, cells, isPreview) {
            if (isPreview === void 0) { isPreview = false; }
            var rowIndex, colIndex, ranges = cells || [this.selection], range, index, cellStyleAction;
            if (!this.selectedSheet) {
                return;
            }
            if (!cellStyle && this._cloneStyle) {
                this.selectedSheet._styledCells = JSON.parse(JSON.stringify(this._cloneStyle));
                this._cloneStyle = null;
                this.refresh(false);
                return;
            }
            if (ranges) {
                if (!cells && !isPreview) {
                    cellStyleAction = new _CellStyleAction(this, this._cloneStyle);
                    this._cloneStyle = null;
                }
                else if (isPreview && !this._cloneStyle) {
                    this._cloneStyle = JSON.parse(JSON.stringify(this.selectedSheet._styledCells));
                }
                for (index = 0; index < ranges.length; index++) {
                    range = ranges[index];
                    for (rowIndex = range.topRow; rowIndex <= range.bottomRow; rowIndex++) {
                        for (colIndex = range.leftCol; colIndex <= range.rightCol; colIndex++) {
                            this._applyStyleForCell(rowIndex, colIndex, cellStyle);
                        }
                    }
                }
                if (!cells && !isPreview) {
                    cellStyleAction.saveNewState();
                    this._undoStack._addAction(cellStyleAction);
                }
            }
            if (!cells) {
                this.refresh(false);
            }
        };
        FlexSheet.prototype.freezeAtCursor = function () {
            var self = this, rowIndex, colIndex, frozenColumns, frozenRows, row, column;
            if (!self.selectedSheet) {
                return;
            }
            if (self.selection && self.frozenRows === 0 && self.frozenColumns === 0) {
                if (self._ptScrl.y < 0) {
                    for (rowIndex = 0; rowIndex < self.selection.topRow - 1; rowIndex++) {
                        row = self.rows[rowIndex];
                        if (!(row instanceof HeaderRow)) {
                            if (row._pos + self._ptScrl.y < 0) {
                                row.visible = false;
                            }
                            else {
                                self.selectedSheet._freezeHiddenRowCnt = rowIndex;
                                break;
                            }
                        }
                    }
                }
                if (self._ptScrl.x < 0) {
                    for (colIndex = 0; colIndex < self.selection.leftCol - 1; colIndex++) {
                        column = self.columns[colIndex];
                        if (column._pos + self._ptScrl.x < 0) {
                            self.columns[colIndex].visible = false;
                        }
                        else {
                            self.selectedSheet._freezeHiddenColumnCnt = colIndex;
                            break;
                        }
                    }
                }
                frozenColumns = self.selection.leftCol > 0 ? self.selection.leftCol : 0;
                frozenRows = self.selection.topRow > 0 ? self.selection.topRow : 0;
            }
            else {
                for (rowIndex = 0; rowIndex < self.frozenRows - 1; rowIndex++) {
                    self.rows[rowIndex].visible = true;
                }
                for (colIndex = 0; colIndex < self.frozenColumns - 1; colIndex++) {
                    self.columns[colIndex].visible = true;
                }
                self._filter.apply();
                frozenColumns = 0;
                frozenRows = 0;
                self.selectedSheet._freezeHiddenRowCnt = 0;
                self.selectedSheet._freezeHiddenColumnCnt = 0;
            }
            self.frozenRows = self.selectedSheet.grid.frozenRows = frozenRows;
            self.frozenColumns = self.selectedSheet.grid.frozenColumns = frozenColumns;
            setTimeout(function () {
                self._setFlexSheetToDirty();
                self.invalidate();
                self.scrollIntoView(self.selection.topRow, self.selection.leftCol);
            }, 10);
        };
        FlexSheet.prototype.showColumnFilter = function () {
            var selectedCol = this.selection.col > 0 ? this.selection.col : 0;
            if (this.columns.length > 0) {
                this._filter.editColumnFilter(this.columns[selectedCol]);
            }
        };
        FlexSheet.prototype.clear = function () {
            this.selection = new wjcGrid.CellRange();
            this.sheets.clear();
            this._selectedSheetIndex = -1;
            this.columns.clear();
            this.rows.clear();
            this.columnHeaders.columns.clear();
            this.rowHeaders.rows.clear();
            this._undoStack.clear();
            this._ptScrl = new wjcCore.Point();
            this._clearCalcEngine();
            this.addUnboundSheet();
        };
        FlexSheet.prototype.getSelectionFormatState = function () {
            var rowIndex, colIndex, rowCount = this.rows.length, columnCount = this.columns.length, formatState = {
                isBold: false,
                isItalic: false,
                isUnderline: false,
                textAlign: 'left',
                isMergedCell: false
            };
            if (rowCount === 0 || columnCount === 0) {
                return formatState;
            }
            if (this.selection) {
                if (this.selection.row >= rowCount || this.selection.row2 >= rowCount
                    || this.selection.col >= columnCount || this.selection.col2 >= columnCount) {
                    return formatState;
                }
                for (rowIndex = this.selection.topRow; rowIndex <= this.selection.bottomRow; rowIndex++) {
                    for (colIndex = this.selection.leftCol; colIndex <= this.selection.rightCol; colIndex++) {
                        this._checkCellFormat(rowIndex, colIndex, formatState);
                    }
                }
            }
            return formatState;
        };
        FlexSheet.prototype.insertRows = function (index, count) {
            var rowIndex = wjcCore.isNumber(index) && index >= 0 ? index :
                (this.selection && this.selection.topRow > -1) ? this.selection.topRow : 0, rowCount = wjcCore.isNumber(count) ? count : 1, insRowAction = new _RowsChangedAction(this), currentRow = this.rows[rowIndex], i;
            if (!this.selectedSheet) {
                return;
            }
            if (this.itemsSource) {
                return;
            }
            this._clearCalcEngine();
            this.finishEditing();
            if (rowIndex === 0 && currentRow && currentRow.constructor === HeaderRow) {
                rowIndex = 1;
            }
            this.onPrepareChangingRow();
            this._updateCellsForUpdatingRow(this.rows.length, rowIndex, rowCount);
            insRowAction._affectedFormulas = this._updateAffectedFormula(rowIndex, rowCount, true, true);
            this.rows.beginUpdate();
            for (i = 0; i < rowCount; i++) {
                this.rows.insert(rowIndex, new wjcGrid.Row());
            }
            this.rows.endUpdate();
            if (!this.selection || this.selection.row === -1 || this.selection.col === -1) {
                this.selection = new wjcGrid.CellRange(0, 0);
            }
            this._copyTo(this.selectedSheet);
            insRowAction.saveNewState();
            this._undoStack._addAction(insRowAction);
            this.onRowChanged(new RowColumnChangedEventArgs(rowIndex, rowCount, true));
        };
        FlexSheet.prototype.deleteRows = function (index, count) {
            var rowCount = wjcCore.isNumber(count) && count >= 0 ? count :
                (this.selection && this.selection.topRow > -1) ? this.selection.bottomRow - this.selection.topRow + 1 : 1, firstRowIndex = wjcCore.isNumber(index) && index >= 0 ? index :
                (this.selection && this.selection.topRow > -1) ? this.selection.topRow : -1, lastRowIndex = wjcCore.isNumber(index) && index >= 0 ? index + rowCount - 1 :
                (this.selection && this.selection.topRow > -1) ? this.selection.bottomRow : -1, delRowAction = new _RowsChangedAction(this), rowDeleted = false, deletingRow, deletingRowIndex, currentRowsLength;
            if (!this.selectedSheet) {
                return;
            }
            if (this.itemsSource) {
                return;
            }
            this._clearCalcEngine();
            this.finishEditing();
            if (firstRowIndex > -1 && lastRowIndex > -1) {
                this.onPrepareChangingRow();
                this._updateCellsForUpdatingRow(this.rows.length, firstRowIndex, rowCount, true);
                delRowAction._affectedFormulas = this._updateAffectedFormula(lastRowIndex, lastRowIndex - firstRowIndex + 1, false, true);
                this.rows.beginUpdate();
                for (; lastRowIndex >= firstRowIndex; lastRowIndex--) {
                    deletingRow = this.rows[lastRowIndex];
                    if (deletingRow && deletingRow.constructor === HeaderRow) {
                        continue;
                    }
                    if (deletingRow.dataItem && this.collectionView) {
                        this.collectionView.beginUpdate();
                        deletingRowIndex = this._getCvIndex(lastRowIndex);
                        if (deletingRowIndex > -1) {
                            this.itemsSource.splice(lastRowIndex - 1, 1);
                        }
                        this.collectionView.endUpdate();
                    }
                    else {
                        this.rows.removeAt(lastRowIndex);
                    }
                    rowDeleted = true;
                }
                this.rows.endUpdate();
                currentRowsLength = this.rows.length;
                if (currentRowsLength === 0) {
                    this.selectedSheet.selectionRanges.clear();
                    this.select(new wjcGrid.CellRange());
                    if (this.hostElement.style.cursor === 'move') {
                        this.hostElement.style.cursor = 'default';
                    }
                }
                else if (lastRowIndex === currentRowsLength - 1) {
                    this.select(new wjcGrid.CellRange(lastRowIndex, 0, lastRowIndex, this.columns.length - 1));
                }
                else {
                    this.select(new wjcGrid.CellRange(this.selection.topRow, this.selection.col, this.selection.topRow, this.selection.col2));
                }
                this._copyTo(this.selectedSheet);
                if (rowDeleted) {
                    delRowAction.saveNewState();
                    this._undoStack._addAction(delRowAction);
                    this.onRowChanged(new RowColumnChangedEventArgs(firstRowIndex, rowCount, false));
                }
            }
        };
        FlexSheet.prototype.insertColumns = function (index, count) {
            var columnIndex = wjcCore.isNumber(index) && index >= 0 ? index :
                this.selection && this.selection.leftCol > -1 ? this.selection.leftCol : 0, colCount = wjcCore.isNumber(count) ? count : 1, insColumnAction = new _ColumnsChangedAction(this), column, i;
            if (!this.selectedSheet) {
                return;
            }
            if (this.itemsSource) {
                return;
            }
            this._clearCalcEngine();
            this.finishEditing();
            this.onPrepareChangingColumn();
            this._updateCellsForUpdatingColumn(this.columns.length, columnIndex, colCount);
            insColumnAction._affectedFormulas = this._updateAffectedFormula(columnIndex, colCount, true, false);
            this.columns.beginUpdate();
            for (i = 0; i < colCount; i++) {
                column = new wjcGrid.Column();
                column.isRequired = false;
                this.columns.insert(columnIndex, column);
            }
            this.columns.endUpdate();
            if (!this.selection || this.selection.row === -1 || this.selection.col === -1) {
                this.selection = new wjcGrid.CellRange(0, 0);
            }
            this._copyTo(this.selectedSheet);
            insColumnAction.saveNewState();
            this._undoStack._addAction(insColumnAction);
            this.onColumnChanged(new RowColumnChangedEventArgs(columnIndex, colCount, true));
        };
        FlexSheet.prototype.deleteColumns = function (index, count) {
            var currentColumnLength, colCount = wjcCore.isNumber(count) && count >= 0 ? count :
                (this.selection && this.selection.leftCol > -1) ? this.selection.rightCol - this.selection.leftCol + 1 : 1, firstColIndex = wjcCore.isNumber(index) && index >= 0 ? index :
                (this.selection && this.selection.leftCol > -1) ? this.selection.leftCol : -1, lastColIndex = wjcCore.isNumber(index) && index >= 0 ? index + colCount - 1 :
                (this.selection && this.selection.leftCol > -1) ? this.selection.rightCol : -1, delColumnAction = new _ColumnsChangedAction(this);
            if (!this.selectedSheet) {
                return;
            }
            if (this.itemsSource) {
                return;
            }
            this._clearCalcEngine();
            this.finishEditing();
            if (firstColIndex > -1 && lastColIndex > -1) {
                this.onPrepareChangingColumn();
                this._updateCellsForUpdatingColumn(this.columns.length, firstColIndex, colCount, true);
                delColumnAction._affectedFormulas = this._updateAffectedFormula(lastColIndex, lastColIndex - firstColIndex + 1, false, false);
                this.columns.beginUpdate();
                for (; lastColIndex >= firstColIndex; lastColIndex--) {
                    this.columns.removeAt(lastColIndex);
                    this._sortManager.deleteSortLevel(lastColIndex);
                }
                this.columns.endUpdate();
                this._sortManager.commitSort(false);
                currentColumnLength = this.columns.length;
                if (currentColumnLength === 0) {
                    this.selectedSheet.selectionRanges.clear();
                    this.select(new wjcGrid.CellRange());
                    if (this.hostElement.style.cursor === 'move') {
                        this.hostElement.style.cursor = 'default';
                    }
                }
                else if (lastColIndex === currentColumnLength - 1) {
                    this.select(new wjcGrid.CellRange(0, lastColIndex, this.rows.length - 1, lastColIndex));
                }
                else {
                    this.select(new wjcGrid.CellRange(this.selection.row, this.selection.leftCol, this.selection.row2, this.selection.leftCol));
                }
                this._copyTo(this.selectedSheet);
                delColumnAction.saveNewState();
                this._undoStack._addAction(delColumnAction);
                this.onColumnChanged(new RowColumnChangedEventArgs(firstColIndex, colCount, false));
            }
        };
        FlexSheet.prototype.mergeRange = function (cells, isCopyMergeCell) {
            if (isCopyMergeCell === void 0) { isCopyMergeCell = false; }
            var rowIndex, colIndex, cellIndex, mergedRange, range = cells || this.selection, mergedCellExists = false, cellMergeAction, firstVisibleRow = -1;
            if (!this.selectedSheet) {
                return;
            }
            if (range) {
                if (range.rowSpan === 1 && range.columnSpan === 1) {
                    return;
                }
                if (!cells && !isCopyMergeCell) {
                    cellMergeAction = new _CellMergeAction(this);
                    this.hostElement.focus();
                }
                if (!this._resetMergedRange(range)) {
                    for (rowIndex = range.topRow; rowIndex <= range.bottomRow; rowIndex++) {
                        if (firstVisibleRow < 0 && this.rows[rowIndex].visible) {
                            firstVisibleRow = rowIndex;
                        }
                        if (firstVisibleRow < 0) {
                            continue;
                        }
                        for (colIndex = range.leftCol; colIndex <= range.rightCol; colIndex++) {
                            cellIndex = rowIndex * this.columns.length + colIndex;
                            this.selectedSheet._mergedRanges[cellIndex] = new wjcGrid.CellRange(firstVisibleRow, range.leftCol, range.bottomRow, range.rightCol);
                        }
                    }
                    if (!cells && !isCopyMergeCell) {
                        cellMergeAction.saveNewState();
                        this._undoStack._addAction(cellMergeAction);
                    }
                }
            }
            if (!cells) {
                this.refresh();
            }
        };
        FlexSheet.prototype.getMergedRange = function (panel, r, c, clip) {
            if (clip === void 0) { clip = true; }
            var cellIndex = r * this.columns.length + c, mergedRange = this.selectedSheet ? this.selectedSheet._mergedRanges[cellIndex] : null, topRow, bottonRow, leftCol, rightCol;
            if (panel === this.cells && mergedRange) {
                if (!mergedRange.isSingleCell && (this.frozenRows > 0 || this.frozenColumns > 0)
                    && ((mergedRange.topRow < this.frozenRows && mergedRange.bottomRow >= this.frozenRows)
                        || (mergedRange.leftCol < this.frozenColumns && mergedRange.rightCol >= this.frozenColumns))) {
                    topRow = mergedRange.topRow;
                    bottonRow = mergedRange.bottomRow;
                    leftCol = mergedRange.leftCol;
                    rightCol = mergedRange.rightCol;
                    if (r >= this.frozenRows && mergedRange.topRow < this.frozenRows) {
                        topRow = this.frozenRows;
                    }
                    if (r < this.frozenRows && mergedRange.bottomRow >= this.frozenRows) {
                        bottonRow = this.frozenRows - 1;
                    }
                    if (bottonRow >= this.rows.length) {
                        bottonRow = this.rows.length - 1;
                    }
                    if (c >= this.frozenColumns && mergedRange.leftCol < this.frozenColumns) {
                        leftCol = this.frozenColumns;
                    }
                    if (c < this.frozenColumns && mergedRange.rightCol >= this.frozenColumns) {
                        rightCol = this.frozenColumns - 1;
                    }
                    if (rightCol >= this.columns.length) {
                        rightCol = this.columns.length - 1;
                    }
                    return new wjcGrid.CellRange(topRow, leftCol, bottonRow, rightCol);
                }
                if (mergedRange.bottomRow >= this.rows.length) {
                    return new wjcGrid.CellRange(mergedRange.topRow, mergedRange.leftCol, this.rows.length - 1, mergedRange.rightCol);
                }
                if (mergedRange.rightCol >= this.columns.length) {
                    return new wjcGrid.CellRange(mergedRange.topRow, mergedRange.leftCol, mergedRange.bottomRow, this.columns.length - 1);
                }
                return mergedRange.clone();
            }
            if (c >= 0 && this.columns && this.columns.length > c && r >= 0 && this.rows && this.rows.length > c) {
                return _super.prototype.getMergedRange.call(this, panel, r, c, clip);
            }
            return null;
        };
        FlexSheet.prototype.evaluate = function (formula, format, sheet) {
            return this._evaluate(formula, format, sheet);
        };
        FlexSheet.prototype.getCellValue = function (rowIndex, colIndex, formatted, sheet) {
            if (formatted === void 0) { formatted = false; }
            var col = sheet ? sheet.grid.columns[colIndex] : this.columns[colIndex], styleInfo = this._getCellStyle(rowIndex, colIndex, sheet), format, cellVal;
            format = styleInfo && styleInfo.format ? styleInfo.format : '';
            cellVal = sheet ? sheet.grid.getCellData(rowIndex, colIndex, false) : this.getCellData(rowIndex, colIndex, false);
            if (wjcCore.isString(cellVal) && cellVal[0] === '=') {
                cellVal = this._evaluate(cellVal, formatted ? format : '', sheet, rowIndex, colIndex);
            }
            if (wjcCore.isPrimitive(cellVal)) {
                if (formatted) {
                    if (col.dataMap) {
                        cellVal = col.dataMap.getDisplayValue(cellVal);
                    }
                    cellVal = cellVal != null ? wjcCore.Globalize.format(cellVal, format || col.format) : '';
                }
            }
            else if (cellVal) {
                if (formatted) {
                    cellVal = wjcCore.Globalize.format(cellVal.value, format || cellVal.format || col.format);
                }
                else {
                    cellVal = cellVal.value;
                }
            }
            return cellVal == null ? '' : cellVal;
        };
        FlexSheet.prototype.showFunctionList = function (target) {
            var self = this, functionOffset = self._cumulativeOffset(target), rootOffset = self._cumulativeOffset(self['_root']), offsetTop, offsetLeft;
            self._functionTarget = wjcCore.tryCast(target, HTMLInputElement);
            if (self._functionTarget && self._functionTarget.value && self._functionTarget.value[0] === '=') {
                self._functionList._cv.filter = function (item) {
                    var text = item['actualvalue'].toLowerCase(), searchIndex = self._getCurrentFormulaIndex(self._functionTarget.value), searchText;
                    if (searchIndex === -1) {
                        searchIndex = 0;
                    }
                    searchText = self._functionTarget.value.substr(searchIndex + 1).trim().toLowerCase();
                    if ((searchText.length > 0 && text.indexOf(searchText) === 0) || self._functionTarget.value === '=') {
                        return true;
                    }
                    return false;
                };
                self._functionList.selectedIndex = 0;
                offsetTop = functionOffset.y + target.clientHeight + 2 + (wjcCore.hasClass(target, 'wj-grid-editor') ? this._ptScrl.y : 0);
                offsetLeft = functionOffset.x + (wjcCore.hasClass(target, 'wj-grid-editor') ? this._ptScrl.x : 0);
                wjcCore.setCss(self._functionListHost, {
                    height: self._functionList._cv.items.length > 5 ? '218px' : 'auto',
                    display: self._functionList._cv.items.length > 0 ? 'block' : 'none',
                    top: '',
                    left: ''
                });
                self._functionListHost.scrollTop = 0;
                if (self._functionListHost.offsetHeight + offsetTop > rootOffset.y + self['_root'].offsetHeight) {
                    offsetTop = offsetTop - target.clientHeight - self._functionListHost.offsetHeight - 5;
                }
                else {
                    offsetTop += 5;
                }
                if (self._functionListHost.offsetWidth + offsetLeft > rootOffset.x + self['_root'].offsetWidth) {
                    offsetLeft = rootOffset.x + self['_root'].offsetWidth - self._functionListHost.offsetWidth;
                }
                wjcCore.setCss(self._functionListHost, {
                    top: offsetTop,
                    left: offsetLeft
                });
            }
            else {
                self.hideFunctionList();
            }
        };
        FlexSheet.prototype.hideFunctionList = function () {
            this._functionListHost.style.display = 'none';
        };
        FlexSheet.prototype.selectPreviousFunction = function () {
            var index = this._functionList.selectedIndex;
            if (index > 0) {
                this._functionList.selectedIndex--;
            }
        };
        FlexSheet.prototype.selectNextFunction = function () {
            var index = this._functionList.selectedIndex;
            if (index < this._functionList.itemsSource.length) {
                this._functionList.selectedIndex++;
            }
        };
        FlexSheet.prototype.applyFunctionToCell = function () {
            var self = this, currentFormulaIndex;
            if (self._functionTarget) {
                currentFormulaIndex = self._getCurrentFormulaIndex(self._functionTarget.value);
                if (currentFormulaIndex === -1) {
                    currentFormulaIndex = self._functionTarget.value.indexOf('=');
                }
                else {
                    currentFormulaIndex += 1;
                }
                self._functionTarget.value = self._functionTarget.value.substring(0, currentFormulaIndex) + self._functionList.selectedValue + '(';
                if (self._functionTarget.value[0] !== '=') {
                    self._functionTarget.value = '=' + self._functionTarget.value;
                }
                self._functionTarget.focus();
                self.hideFunctionList();
            }
        };
        FlexSheet.prototype.save = function (fileName) {
            var workbook = this._saveToWorkbook();
            if (fileName) {
                workbook.save(fileName);
            }
            return workbook;
        };
        FlexSheet.prototype.saveAsync = function (fileName, onSaved, onError) {
            var workbook = this._saveToWorkbook();
            if (fileName) {
                workbook.saveAsync(fileName, onSaved, onError);
            }
            return workbook;
        };
        FlexSheet.prototype.saveToWorkbookOM = function () {
            var workbook = this._saveToWorkbook();
            return workbook._serialize();
        };
        FlexSheet.prototype.load = function (workbook) {
            var workbookInstance, reader, self = this;
            if (workbook instanceof Blob) {
                reader = new FileReader();
                reader.onload = function () {
                    var fileContent = reader.result;
                    fileContent = wjcXlsx.Workbook._base64EncArr(new Uint8Array(fileContent));
                    workbookInstance = new wjcXlsx.Workbook();
                    workbookInstance.load(fileContent);
                    self._loadFromWorkbook(workbookInstance);
                };
                reader.readAsArrayBuffer(workbook);
            }
            else if (workbook instanceof wjcXlsx.Workbook) {
                self._loadFromWorkbook(workbook);
            }
            else {
                if (workbook instanceof ArrayBuffer) {
                    workbook = wjcXlsx.Workbook._base64EncArr(new Uint8Array(workbook));
                }
                else if (!wjcCore.isString(workbook)) {
                    throw 'Invalid workbook.';
                }
                workbookInstance = new wjcXlsx.Workbook();
                workbookInstance.load(workbook);
                self._loadFromWorkbook(workbookInstance);
            }
        };
        FlexSheet.prototype.loadAsync = function (workbook, onLoaded, onError) {
            var workbookInstance, reader, self = this;
            if (workbook instanceof Blob) {
                reader = new FileReader();
                reader.onload = function () {
                    var fileContent = reader.result;
                    fileContent = wjcXlsx.Workbook._base64EncArr(new Uint8Array(fileContent));
                    workbookInstance = new wjcXlsx.Workbook();
                    workbookInstance.loadAsync(fileContent, function (loadedWork) {
                        self._loadFromWorkbook(loadedWork);
                        if (onLoaded) {
                            onLoaded(loadedWork);
                        }
                    }, onError);
                };
                reader.readAsArrayBuffer(workbook);
            }
            else if (workbook instanceof wjcXlsx.Workbook) {
                self._loadFromWorkbook(workbook);
                if (onLoaded) {
                    onLoaded(workbook);
                }
            }
            else {
                if (workbook instanceof ArrayBuffer) {
                    workbook = wjcXlsx.Workbook._base64EncArr(new Uint8Array(workbook));
                }
                else if (!wjcCore.isString(workbook)) {
                    throw 'Invalid workbook.';
                }
                workbookInstance = new wjcXlsx.Workbook();
                workbookInstance.loadAsync(workbook, function (loadedWork) {
                    self._loadFromWorkbook(loadedWork);
                    if (onLoaded) {
                        onLoaded(loadedWork);
                    }
                }, onError);
            }
        };
        FlexSheet.prototype.loadFromWorkbookOM = function (workbook) {
            var grids = [], workbookInstance;
            if (workbook instanceof wjcXlsx.Workbook) {
                workbookInstance = workbook;
            }
            else {
                workbookInstance = new wjcXlsx.Workbook();
                workbookInstance._deserialize(workbook);
            }
            this._loadFromWorkbook(workbookInstance);
        };
        FlexSheet.prototype.undo = function () {
            var self = this;
            setTimeout(function () {
                self._undoStack.undo();
            }, 100);
        };
        FlexSheet.prototype.redo = function () {
            var self = this;
            setTimeout(function () {
                self._undoStack.redo();
            }, 100);
        };
        FlexSheet.prototype.select = function (rng, show) {
            if (show === void 0) { show = true; }
            var mergedRange, rowIndex, colIndex;
            if (rng.rowSpan !== this.rows.length && rng.columnSpan !== this.columns.length) {
                for (rowIndex = rng.topRow; rowIndex <= rng.bottomRow; rowIndex++) {
                    for (colIndex = rng.leftCol; colIndex <= rng.rightCol; colIndex++) {
                        mergedRange = this.getMergedRange(this.cells, rowIndex, colIndex);
                        if (mergedRange && !rng.equals(mergedRange)) {
                            if (rng.row <= rng.row2) {
                                rng.row = Math.min(rng.topRow, mergedRange.topRow);
                                rng.row2 = Math.max(rng.bottomRow, mergedRange.bottomRow);
                            }
                            else {
                                rng.row = Math.max(rng.bottomRow, mergedRange.bottomRow);
                                rng.row2 = Math.min(rng.topRow, mergedRange.topRow);
                            }
                            if (rng.col <= rng.col2) {
                                rng.col = Math.min(rng.leftCol, mergedRange.leftCol);
                                rng.col2 = Math.max(rng.rightCol, mergedRange.rightCol);
                            }
                            else {
                                rng.col = Math.max(rng.rightCol, mergedRange.rightCol);
                                rng.col2 = Math.min(rng.leftCol, mergedRange.leftCol);
                            }
                        }
                    }
                }
            }
            if (this.collectionView) {
                if (rng.topRow === 0 && rng.bottomRow === this.rows.length - 1
                    && rng.leftCol === 0 && rng.rightCol === this.columns.length - 1) {
                    rng.row = 1;
                    rng.row2 = this.rows.length - 1;
                }
            }
            _super.prototype.select.call(this, rng, show);
        };
        FlexSheet.prototype.addCustomFunction = function (name, func, description, minParamsCount, maxParamsCount) {
            wjcCore._deprecated('addCustomFunction', 'addFunction');
            this._calcEngine.addCustomFunction(name, func, minParamsCount, maxParamsCount);
            this._addCustomFunctionDescription(name, description);
        };
        FlexSheet.prototype.addFunction = function (name, func, description, minParamsCount, maxParamsCount) {
            this._calcEngine.addFunction(name, func, minParamsCount, maxParamsCount);
            this._addCustomFunctionDescription(name, description);
        };
        FlexSheet.prototype.dispose = function () {
            var userAgent = window.navigator.userAgent;
            document.removeEventListener('mousemove', this._mouseMoveHdl);
            document.body.removeEventListener('click', this._clickHdl);
            if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
                document.body.removeEventListener('touchstart', this._touchStartHdl);
                document.body.removeEventListener('touchend', this._touchEndHdl);
            }
            this.hideFunctionList();
            _super.prototype.dispose.call(this);
        };
        FlexSheet.prototype.getClipString = function (rng) {
            var clipString = '', selections, rowIndex, selIndex, firstRow = true, firstCell, sel, cell;
            if (!rng) {
                if (this._isMultipleRowsSelected()) {
                    clipString = '';
                    selections = this.selectedSheet.selectionRanges.slice(0);
                    if (selections.length === 0) {
                        selections = [this.selection];
                    }
                    selections.sort(this._sortByRow);
                    for (selIndex = 0; selIndex < selections.length; selIndex++) {
                        if (clipString) {
                            clipString += '\n';
                        }
                        clipString += this.getClipString(selections[selIndex]);
                    }
                    return clipString;
                }
                else if (this._isMultipleColumnsSelected()) {
                    clipString = '';
                    selections = this.selectedSheet.selectionRanges.slice(0);
                    if (selections.length === 0) {
                        selections = [this.selection];
                    }
                    selections.sort(this._sortByColumn);
                    for (rowIndex = 0, firstRow = true; rowIndex < this.rows.length; rowIndex++) {
                        if (!firstRow) {
                            clipString += '\n';
                        }
                        firstRow = false;
                        for (selIndex = 0, firstCell = true; selIndex < selections.length; selIndex++) {
                            if (!firstCell) {
                                clipString += '\t';
                            }
                            firstCell = false;
                            clipString += this.getClipString(selections[selIndex]);
                        }
                        return clipString;
                    }
                }
                else {
                    rng = this.selection;
                    switch (this.selectionMode) {
                        case wjcGrid.SelectionMode.Row:
                        case wjcGrid.SelectionMode.RowRange:
                            rng.col = 0;
                            rng.col2 = this.columns.length - 1;
                            break;
                        case wjcGrid.SelectionMode.ListBox:
                            rng.col = 0;
                            rng.col2 = this.columns.length - 1;
                            for (var i = 0; i < this.rows.length; i++) {
                                if (this.rows[i].isSelected && this.rows[i].isVisible) {
                                    rng.row = rng.row2 = i;
                                    if (clipString)
                                        clipString += '\n';
                                    clipString += this.getClipString(rng);
                                }
                            }
                            return clipString;
                    }
                }
            }
            rng = wjcCore.asType(rng, wjcGrid.CellRange);
            for (var r = rng.topRow; r <= rng.bottomRow; r++) {
                if (!this.rows[r].isVisible)
                    continue;
                if (!firstRow)
                    clipString += '\n';
                firstRow = false;
                for (var c = rng.leftCol, firstCell = true; c <= rng.rightCol; c++) {
                    if (!this.columns[c].isVisible)
                        continue;
                    if (!firstCell)
                        clipString += '\t';
                    firstCell = false;
                    cell = this.getCellValue(r, c, true).toString();
                    cell = cell.replace(/\t/g, ' ');
                    if (cell.indexOf('\n') > -1) {
                        cell = '"' + cell.replace(/"/g, '""') + '"';
                    }
                    clipString += cell;
                }
            }
            return clipString;
        };
        FlexSheet.prototype.setClipString = function (text, rng) {
            var autoRange = rng == null, pasted = false, rngPaste, row, col, copiedRow, copiedCol, lines, cells, cellData, matches, i, cellRefIndex, cellRef, cellAddress, updatedCellRef, rowDiff, colDiff, copiedRange, isMultiLine = false, copiedRowIndex, copiedColIndex, rowSpan, colSpan, orgText;
            rng = rng ? wjcCore.asType(rng, wjcGrid.CellRange) : this.selection;
            text = wjcCore.asString(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            if (text && text[text.length - 1] == '\n') {
                text = text.substring(0, text.length - 1);
            }
            orgText = text;
            if (autoRange && !rng.isSingleCell) {
                text = this._expandClipString(text, rng);
            }
            lines = this._clipToRows(text);
            isMultiLine = this._containsMultiLineText(lines);
            if ((!this._copiedRanges || this._copiedRanges.length === 0 || (orgText !== this._getRangeString(this._copiedRanges, this._copiedSheet) && !this._containsRandFormula(this._copiedRanges, this._copiedSheet)) || !!this._cutData) && !isMultiLine) {
                if (this._cutData != null) {
                    this.beginUpdate();
                    this._delCutData();
                    _super.prototype.setClipString.call(this, this._cutData, rng);
                    this.endUpdate();
                    this._cutData = null;
                    this._cutValue = orgText;
                }
                else if (this._cutValue === null || orgText !== this._cutValue) {
                    this._cutValue = null;
                    _super.prototype.setClipString.call(this, text, rng);
                }
                this._copiedRanges = null;
                this._copiedSheet = null;
                return;
            }
            rngPaste = new wjcGrid.CellRange(rng.topRow, rng.leftCol);
            this.beginUpdate();
            if (isMultiLine || !this._copiedRanges || this._copiedRanges.length > 1 || this._copiedRanges.length === 0) {
                row = rng.topRow;
                copiedRange = this._copiedRanges && this._copiedRanges.length > 1 ? this._copiedRanges[0] : new wjcGrid.CellRange();
                copiedRow = copiedRange.topRow;
                for (i = 0; i < lines.length && row < this.rows.length; i++, row++) {
                    if (!this.rows[row].isVisible) {
                        i--;
                        continue;
                    }
                    cells = this._clipToCells(lines[i]);
                    copiedCol = copiedRange.leftCol;
                    col = rng.leftCol;
                    colDiff = col - copiedCol;
                    for (var j = 0; j < cells.length && col < this.columns.length; j++, col++) {
                        if (!this.columns[col].isVisible) {
                            j--;
                            continue;
                        }
                        cellData = cells[j];
                        if (!this.columns[col].isReadOnly && !this.rows[row].isReadOnly) {
                            pasted = this._postSetClipStringProcess(cellData, row, col, copiedRow, copiedCol);
                            rngPaste.row2 = Math.max(rngPaste.row2, row);
                            rngPaste.col2 = Math.max(rngPaste.col2, col);
                        }
                        if (copiedCol >= 0) {
                            copiedCol++;
                        }
                    }
                    if (copiedRow >= 0) {
                        copiedRow++;
                    }
                }
            }
            else if (this._copiedRanges && this._copiedRanges.length === 1) {
                copiedRowIndex = 0;
                copiedRange = this._copiedRanges[0];
                rowSpan = copiedRange.rowSpan > rng.rowSpan ? copiedRange.rowSpan : rng.rowSpan;
                colSpan = copiedRange.columnSpan > rng.columnSpan ? copiedRange.columnSpan : rng.columnSpan;
                for (row = rng.topRow; row < rng.topRow + rowSpan && row < this.rows.length; row++) {
                    copiedColIndex = 0;
                    if (!this.rows[row].isVisible) {
                        continue;
                    }
                    if (copiedRowIndex >= copiedRange.rowSpan) {
                        if (rowSpan % copiedRange.rowSpan === 0 && colSpan % copiedRange.columnSpan === 0) {
                            copiedRowIndex = copiedRowIndex % copiedRange.rowSpan;
                        }
                        else {
                            break;
                        }
                    }
                    rowDiff = row - copiedRange.topRow - copiedRowIndex;
                    for (col = rng.leftCol; col < rng.leftCol + colSpan && col < this.columns.length; col++) {
                        if (!this.columns[col].isVisible) {
                            continue;
                        }
                        if (copiedColIndex >= copiedRange.columnSpan) {
                            if (rowSpan % copiedRange.rowSpan === 0 && colSpan % copiedRange.columnSpan === 0) {
                                copiedColIndex = copiedColIndex % copiedRange.columnSpan;
                            }
                            else {
                                break;
                            }
                        }
                        colDiff = col - copiedRange.leftCol - copiedColIndex;
                        if (!this.columns[col].isReadOnly && !this.rows[row].isReadOnly) {
                            cellData = this._copiedSheet.grid.getCellData(copiedRange.topRow + copiedRowIndex, copiedRange.leftCol + copiedColIndex, true).toString();
                            if (!!cellData && typeof cellData === 'string' && cellData[0] === '=' && (rowDiff !== 0 || colDiff !== 0)) {
                                matches = cellData.match(/(?=\b\D)\$?[A-Za-z]+\$?\d+/g);
                                if (!!matches && matches.length > 0) {
                                    for (cellRefIndex = 0; cellRefIndex < matches.length; cellRefIndex++) {
                                        cellRef = matches[cellRefIndex];
                                        if (cellRef.toLowerCase() !== 'atan2') {
                                            cellAddress = wjcXlsx.Workbook.tableAddress(cellRef);
                                            cellAddress.row += rowDiff;
                                            cellAddress.col += colDiff;
                                            updatedCellRef = wjcXlsx.Workbook.xlsxAddress(cellAddress.row, cellAddress.col, cellAddress.absRow, cellAddress.absCol);
                                            cellData = cellData.replace(cellRef, updatedCellRef);
                                        }
                                    }
                                }
                            }
                            pasted = this._postSetClipStringProcess(cellData, row, col, copiedRange.topRow + copiedRowIndex, copiedRange.leftCol + copiedColIndex);
                            rngPaste.row2 = Math.max(rngPaste.row2, row);
                            rngPaste.col2 = Math.max(rngPaste.col2, col);
                        }
                        copiedColIndex++;
                    }
                    copiedRowIndex++;
                }
            }
            this.endUpdate();
            if (this.collectionView && pasted) {
                this.collectionView.refresh();
            }
            this.select(rngPaste);
        };
        FlexSheet.prototype._getCvIndex = function (index) {
            var row;
            if (index > -1 && this.collectionView) {
                row = this.rows[index];
                if (row instanceof HeaderRow) {
                    return index;
                }
                if (row.dataItem) {
                    return _super.prototype._getCvIndex.call(this, index);
                }
                return this.collectionView.currentPosition;
            }
            return -1;
        };
        FlexSheet.prototype._init = function () {
            var _this = this;
            var self = this, userAgent = window.navigator.userAgent, mouseUp = function (e) {
                document.removeEventListener('mouseup', mouseUp);
                self._mouseUp(e);
            };
            self._divContainer = self.hostElement.querySelector('[wj-part="container"]');
            self._tabHolder = new _TabHolder(self.hostElement.querySelector('[wj-part="tab-holder"]'), self);
            self._contextMenu = new _ContextMenu(self.hostElement.querySelector('[wj-part="context-menu"]'), self);
            self['_gpCells'] = new FlexSheetPanel(self, wjcGrid.CellType.Cell, self.rows, self.columns, self['_eCt']);
            self['_gpCHdr'] = new FlexSheetPanel(self, wjcGrid.CellType.ColumnHeader, self['_hdrRows'], self.columns, self['_eCHdrCt']);
            self['_gpRHdr'] = new FlexSheetPanel(self, wjcGrid.CellType.RowHeader, self.rows, self['_hdrCols'], self['_eRHdrCt']);
            self['_gpTL'] = new FlexSheetPanel(self, wjcGrid.CellType.TopLeft, self['_hdrRows'], self['_hdrCols'], self['_eTLCt']);
            self._sortManager = new SortManager(self);
            self._filter = new _FlexSheetFilter(self);
            self._calcEngine = new _CalcEngine(self);
            self._calcEngine.unknownFunction.addHandler(function (sender, e) {
                self.onUnknownFunction(e);
            }, self);
            self._initFuncsList();
            self._undoStack = new UndoStack(self);
            self.loadedRows.addHandler(function () {
                if (self.itemsSource && !(self.rows[0] instanceof HeaderRow)) {
                    var row = new HeaderRow(), col;
                    for (var i = 0; i < self.columns.length; i++) {
                        col = self.columns[i];
                        if (!row._ubv) {
                            row._ubv = {};
                        }
                        row._ubv[col._hash] = col.header;
                    }
                    self.rows.insert(0, row);
                }
                if (self._filter) {
                    self._filter.apply();
                }
            });
            self.itemsSourceChanged.addHandler(function () {
                var colIndex;
                for (colIndex = 0; colIndex < self.columns.length; colIndex++) {
                    self.columns[colIndex].isRequired = false;
                }
            });
            self.copied.addHandler(function (sender, args) {
                var selections;
                self._copiedSheet = self.selectedSheet;
                if (self._isMultipleRowsSelected()) {
                    selections = self.selectedSheet.selectionRanges.slice(0);
                    selections.sort(self._sortByRow);
                    self._copiedRanges = selections;
                }
                else if (self._isMultipleColumnsSelected()) {
                    selections = self.selectedSheet.selectionRanges.slice(0);
                    selections.sort(self._sortByColumn);
                    self._copiedRanges = selections;
                }
                else {
                    self._copiedRanges = [args.range];
                }
            });
            self.rows.collectionChanged.addHandler(function (sender, e) {
                self._clearForEmptySheet('rows');
            }, self);
            self.columns.collectionChanged.addHandler(function (sender, e) {
                self._clearForEmptySheet('columns');
            }, self);
            self.addEventListener(self.hostElement, 'mousedown', function (e) {
                document.addEventListener('mouseup', mouseUp);
                if (self._isDescendant(self._divContainer, e.target)) {
                    self._mouseDown(e);
                }
            }, true);
            self.addEventListener(self.hostElement, 'drop', function () {
                self._columnHeaderClicked = false;
            });
            self.addEventListener(self.hostElement, 'contextmenu', function (e) {
                var ht, selectedRow, selectedCol, colPos, rowPos, point, hostOffset, hostScrollOffset, newSelection;
                if (e.defaultPrevented) {
                    return;
                }
                if (!self.activeEditor) {
                    if (self._isContextMenuKeyDown
                        && self.selection.row > -1 && self.selection.col > -1
                        && self.rows.length > 0 && self.columns.length > 0) {
                        selectedCol = self.columns[self.selection.col];
                        selectedRow = self.rows[self.selection.row];
                        hostOffset = self._cumulativeOffset(self.hostElement);
                        hostScrollOffset = self._cumulativeScrollOffset(self.hostElement);
                        colPos = selectedCol.pos + self['_eCt'].offsetLeft + hostOffset.x + selectedCol.renderSize / 2 + self._ptScrl.x;
                        rowPos = selectedRow.pos + self['_eCt'].offsetTop + hostOffset.y + selectedRow.renderSize / 2 + self._ptScrl.y;
                        point = new wjcCore.Point(colPos - hostScrollOffset.x, rowPos - hostScrollOffset.y);
                        ht = self.hitTest(colPos, rowPos);
                        self._isContextMenuKeyDown = false;
                    }
                    else {
                        ht = self.hitTest(e);
                    }
                    e.preventDefault();
                    if (ht && ht.cellType !== wjcGrid.CellType.None) {
                        if (!_this.itemsSource) {
                            self._contextMenu.show(e, point);
                        }
                        newSelection = new wjcGrid.CellRange(ht.row, ht.col);
                        if (ht.cellType === wjcGrid.CellType.Cell && !newSelection.intersects(self.selection)) {
                            if (self.selectedSheet) {
                                self.selectedSheet.selectionRanges.clear();
                            }
                            self.selection = newSelection;
                            self.selectedSheet.selectionRanges.push(newSelection);
                        }
                    }
                }
            });
            self.prepareCellForEdit.addHandler(self._prepareCellForEditHandler, self);
            self.cellEditEnded.addHandler(function (sender, args) {
                if (args.data && (args.data.keyCode === 46 || args.data.keyCode === 8)) {
                    return;
                }
                setTimeout(function () {
                    self.hideFunctionList();
                }, 200);
            });
            self.cellEditEnding.addHandler(function (sender, args) {
                if (args.data && (args.data.keyCode === 46 || args.data.keyCode === 8)) {
                    return;
                }
                self._clearCalcEngine();
            });
            self.pasted.addHandler(function () {
                self._clearCalcEngine();
            });
            self.addEventListener(self.hostElement, 'keydown', function (e) {
                var args, text, selectionCnt;
                if (e.ctrlKey) {
                    if (e.keyCode === 89) {
                        self.finishEditing();
                        self.redo();
                        e.preventDefault();
                    }
                    if (e.keyCode === 90) {
                        self.finishEditing();
                        self.undo();
                        e.preventDefault();
                    }
                    if (!!self.selectedSheet && e.keyCode === 65) {
                        self.selectedSheet.selectionRanges.clear();
                        self.selectedSheet.selectionRanges.push(self.selection);
                    }
                    if (e.keyCode === 67 || e.keyCode == 45) {
                        if (!!self.activeEditor) {
                            self._copiedRanges = null;
                            self._copiedSheet = null;
                        }
                        self._cutValue = null;
                    }
                    if (e.keyCode === 88) {
                        self.finishEditing();
                        args = new wjcGrid.CellRangeEventArgs(self.cells, self.selection);
                        if (self.onCopying(args)) {
                            self._cutData = null;
                            self._cutValue = null;
                            text = self.getClipString();
                            self._cutData = self._getRangeString(self.selection, self.selectedSheet, false);
                            wjcCore.Clipboard.copy(text);
                            self.onCopied(args);
                        }
                        e.stopPropagation();
                    }
                }
                if (e.keyCode === wjcCore.Key.Escape) {
                    self._contextMenu.hide();
                }
                if (e.keyCode === 93 || (e.shiftKey && e.keyCode === 121)) {
                    self._isContextMenuKeyDown = true;
                }
                if (!!self.selectedSheet) {
                    switch (e.keyCode) {
                        case wjcCore.Key.Left:
                        case wjcCore.Key.Right:
                        case wjcCore.Key.Up:
                        case wjcCore.Key.Down:
                        case wjcCore.Key.PageUp:
                        case wjcCore.Key.PageDown:
                        case wjcCore.Key.Home:
                        case wjcCore.Key.End:
                        case wjcCore.Key.Tab:
                        case wjcCore.Key.Enter:
                            selectionCnt = self.selectedSheet.selectionRanges.length;
                            if (selectionCnt > 0) {
                                self.selectedSheet.selectionRanges[selectionCnt - 1] = self.selection;
                            }
                    }
                }
            });
            self.addEventListener(document.body, 'keydown', function (e) {
                if ((self._isDescendant(self.hostElement, e.target) || self.hostElement === e.target) && !self._edtHdl.activeEditor) {
                    if (e.keyCode === wjcCore.Key.Delete || e.keyCode === wjcCore.Key.Back) {
                        self._delSeletionContent(e);
                        e.preventDefault();
                    }
                }
            }, true);
            document.body.addEventListener('click', self._clickHdl);
            document.addEventListener('mousemove', self._mouseMoveHdl);
            if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
                document.body.addEventListener('touchstart', self._touchStartHdl);
                document.body.addEventListener('touchend', self._touchEndHdl);
            }
            self.addEventListener(self.hostElement, 'drop', function () {
                self._htDown = null;
            });
        };
        FlexSheet.prototype._initFuncsList = function () {
            var self = this;
            self._functionListHost = document.createElement('div');
            wjcCore.addClass(self._functionListHost, 'wj-flexsheet-formula-list');
            document.querySelector('body').appendChild(self._functionListHost);
            self._functionListHost.style.display = 'none';
            self._functionListHost.style.position = 'absolute';
            self._functionList = new wjcInput.ListBox(self._functionListHost);
            self._functionList.isContentHtml = true;
            self._functionList.itemsSource = self._getFunctions();
            self._functionList.displayMemberPath = 'displayValue';
            self._functionList.selectedValuePath = 'actualvalue';
            self.addEventListener(self._functionListHost, 'click', self.applyFunctionToCell.bind(self));
            self.addEventListener(self._functionListHost, 'keydown', function (e) {
                if (e.keyCode === wjcCore.Key.Escape) {
                    self.hideFunctionList();
                    self.hostElement.focus();
                    e.preventDefault();
                }
                if (e.keyCode === wjcCore.Key.Enter) {
                    self.applyFunctionToCell();
                    self.hostElement.focus();
                    e.preventDefault();
                }
            });
        };
        FlexSheet.prototype._getFunctions = function () {
            var functions = [], i = 0, func;
            for (; i < FlexSheetFunctions.length; i++) {
                func = FlexSheetFunctions[i];
                functions.push({
                    displayValue: '<div class="wj-flexsheet-formula-name">' + func.name + '</div><div class="wj-flexsheet-formula-description">' + func.description + '</div>',
                    actualvalue: func.name
                });
            }
            return functions;
        };
        FlexSheet.prototype._addCustomFunctionDescription = function (name, description) {
            var customFuncDesc = {
                displayValue: '<div class="wj-flexsheet-formula-name">' + name + '</div>' + (description ? '<div class="wj-flexsheet-formula-description">' + description + '</div>' : ''),
                actualvalue: name
            }, funcList = this._functionList.itemsSource, funcIndex = -1, i = 0, funcDesc;
            for (; i < funcList.length; i++) {
                funcDesc = funcList[i];
                if (funcDesc.actualvalue === name) {
                    funcIndex = i;
                    break;
                }
            }
            if (funcIndex > -1) {
                funcList.splice(funcIndex, 1, customFuncDesc);
            }
            else {
                funcList.push(customFuncDesc);
            }
        };
        FlexSheet.prototype._getCurrentFormulaIndex = function (searchText) {
            var searchIndex = -1;
            ['+', '-', '*', '/', '^', '(', '&'].forEach(function (val) {
                var index = searchText.lastIndexOf(val);
                if (index > searchIndex) {
                    searchIndex = index;
                }
            });
            return searchIndex;
        };
        FlexSheet.prototype._prepareCellForEditHandler = function () {
            var self = this, edt = self._edtHdl._edt;
            if (!edt) {
                return;
            }
            self.addEventListener(edt, 'keydown', function (e) {
                if (self.isFunctionListOpen) {
                    switch (e.keyCode) {
                        case wjcCore.Key.Up:
                            self.selectPreviousFunction();
                            e.preventDefault();
                            break;
                        case wjcCore.Key.Down:
                            self.selectNextFunction();
                            e.preventDefault();
                            break;
                        case wjcCore.Key.Tab:
                        case wjcCore.Key.Enter:
                            self.applyFunctionToCell();
                            e.preventDefault();
                            break;
                        case wjcCore.Key.Escape:
                            self.hideFunctionList();
                            e.preventDefault();
                            break;
                    }
                }
            });
            self.addEventListener(edt, 'keyup', function (e) {
                if ((e.keyCode > 40 || e.keyCode < 32) && e.keyCode !== wjcCore.Key.Tab && e.keyCode !== wjcCore.Key.Escape) {
                    setTimeout(function () {
                        self.showFunctionList(edt);
                    }, 0);
                }
            });
        };
        FlexSheet.prototype._addSheet = function (sheetName, rows, cols, pos, grid) {
            var sheet = new Sheet(this, grid, sheetName, rows, cols);
            if (!this.sheets.isValidSheetName(sheet)) {
                sheet._setValidName(this.sheets.getValidSheetName(sheet));
            }
            if (typeof (pos) === 'number') {
                if (pos < 0) {
                    pos = 0;
                }
                if (pos >= this.sheets.length) {
                    pos = this.sheets.length;
                }
            }
            else {
                pos = this.sheets.length;
            }
            this.sheets.insert(pos, sheet);
            if (pos <= this._selectedSheetIndex) {
                this._selectedSheetIndex += 1;
            }
            this.selectedSheetIndex = pos;
            return sheet;
        };
        FlexSheet.prototype._showSheet = function (index) {
            var oldSheet, newSheet;
            if (!this.sheets || !this.sheets.length || index >= this.sheets.length
                || index < 0 || index === this.selectedSheetIndex
                || (this.sheets[index] && !this.sheets[index].visible)) {
                return;
            }
            this.finishEditing();
            if (this.selectedSheetIndex > -1 && this.selectedSheetIndex < this.sheets.length) {
                this._copyTo(this.sheets[this.selectedSheetIndex]);
                this._resetFilterDefinition();
            }
            if (this.sheets[index]) {
                this._selectedSheetIndex = index;
                this._copyFrom(this.sheets[index]);
            }
            this._filter.closeEditor();
        };
        FlexSheet.prototype._selectedSheetChange = function (sender, e) {
            this._showSheet(e.newValue);
            this.invalidate(true);
            this.onSelectedSheetChanged(e);
        };
        FlexSheet.prototype._sourceChange = function (sender, e) {
            var item;
            if (e.action === wjcCore.NotifyCollectionChangedAction.Add || e.action === wjcCore.NotifyCollectionChangedAction.Change) {
                item = e.item;
                item._attachOwner(this);
                if (e.action === wjcCore.NotifyCollectionChangedAction.Add) {
                    this._addingSheet = true;
                    if (e.index <= this.selectedSheetIndex) {
                        this._selectedSheetIndex += 1;
                    }
                }
                else {
                    if (e.index === this.selectedSheetIndex) {
                        this._copyFrom(e.item, true);
                    }
                }
                this.selectedSheetIndex = e.index;
            }
            else if (e.action === wjcCore.NotifyCollectionChangedAction.Reset) {
                for (var i = 0; i < this.sheets.length; i++) {
                    item = this.sheets[i];
                    item._attachOwner(this);
                }
                if (this.sheets.length > 0) {
                    if (this.selectedSheetIndex === 0) {
                        this._copyFrom(this.selectedSheet, true);
                    }
                    this.selectedSheetIndex = 0;
                }
                else {
                    this.rows.clear();
                    this.columns.clear();
                    this._selectedSheetIndex = -1;
                }
            }
            else {
                if (this.sheets.length > 0) {
                    if (this.selectedSheetIndex >= this.sheets.length) {
                        this.selectedSheetIndex = 0;
                    }
                    else if (this.selectedSheetIndex > e.index) {
                        this._selectedSheetIndex -= 1;
                    }
                }
                else {
                    this.rows.clear();
                    this.columns.clear();
                    this._selectedSheetIndex = -1;
                }
            }
            this.invalidate(true);
        };
        FlexSheet.prototype._sheetVisibleChange = function (sender, e) {
            if (!e.item.visible) {
                if (e.index === this.selectedSheetIndex) {
                    if (this.selectedSheetIndex === this.sheets.length - 1) {
                        this.selectedSheetIndex = e.index - 1;
                    }
                    else {
                        this.selectedSheetIndex = e.index + 1;
                    }
                }
            }
        };
        FlexSheet.prototype._applyStyleForCell = function (rowIndex, colIndex, cellStyle) {
            var self = this, row = self.rows[rowIndex], currentCellStyle, mergeRange, cellIndex;
            if (row == null || row instanceof HeaderRow || !row.isVisible) {
                return;
            }
            cellIndex = rowIndex * self.columns.length + colIndex;
            mergeRange = self.selectedSheet._mergedRanges[cellIndex];
            if (mergeRange) {
                cellIndex = mergeRange.topRow * self.columns.length + mergeRange.leftCol;
            }
            currentCellStyle = self.selectedSheet._styledCells[cellIndex];
            if (!currentCellStyle) {
                self.selectedSheet._styledCells[cellIndex] = {
                    className: cellStyle.className,
                    textAlign: cellStyle.textAlign,
                    verticalAlign: cellStyle.verticalAlign,
                    fontStyle: cellStyle.fontStyle,
                    fontWeight: cellStyle.fontWeight,
                    fontFamily: cellStyle.fontFamily,
                    fontSize: cellStyle.fontSize,
                    textDecoration: cellStyle.textDecoration,
                    backgroundColor: cellStyle.backgroundColor,
                    color: cellStyle.color,
                    format: cellStyle.format,
                    whiteSpace: cellStyle.whiteSpace
                };
            }
            else {
                currentCellStyle.className = cellStyle.className === 'normal' ? '' : cellStyle.className || currentCellStyle.className;
                currentCellStyle.textAlign = cellStyle.textAlign || currentCellStyle.textAlign;
                currentCellStyle.verticalAlign = cellStyle.verticalAlign || currentCellStyle.verticalAlign;
                currentCellStyle.fontFamily = cellStyle.fontFamily || currentCellStyle.fontFamily;
                currentCellStyle.fontSize = cellStyle.fontSize || currentCellStyle.fontSize;
                currentCellStyle.backgroundColor = cellStyle.backgroundColor || currentCellStyle.backgroundColor;
                currentCellStyle.color = cellStyle.color || currentCellStyle.color;
                currentCellStyle.fontStyle = cellStyle.fontStyle === 'none' ? '' : cellStyle.fontStyle || currentCellStyle.fontStyle;
                currentCellStyle.fontWeight = cellStyle.fontWeight === 'none' ? '' : cellStyle.fontWeight || currentCellStyle.fontWeight;
                currentCellStyle.textDecoration = cellStyle.textDecoration === 'none' ? '' : cellStyle.textDecoration || currentCellStyle.textDecoration;
                currentCellStyle.format = cellStyle.format || currentCellStyle.format;
                currentCellStyle.whiteSpace = cellStyle.whiteSpace || currentCellStyle.whiteSpace;
            }
        };
        FlexSheet.prototype._checkCellFormat = function (rowIndex, colIndex, formatState) {
            var cellIndex = rowIndex * this.columns.length + colIndex, mergeRange, cellStyle;
            if (!this.selectedSheet) {
                return;
            }
            mergeRange = this.selectedSheet._mergedRanges[cellIndex];
            if (mergeRange) {
                formatState.isMergedCell = true;
                cellIndex = mergeRange.topRow * this.columns.length + mergeRange.leftCol;
            }
            cellStyle = this.selectedSheet._styledCells[cellIndex];
            if (cellStyle) {
                formatState.isBold = formatState.isBold || cellStyle.fontWeight === 'bold';
                formatState.isItalic = formatState.isItalic || cellStyle.fontStyle === 'italic';
                formatState.isUnderline = formatState.isUnderline || cellStyle.textDecoration === 'underline';
            }
            if (rowIndex === this.selection.row && colIndex === this.selection.col) {
                if (cellStyle && cellStyle.textAlign) {
                    formatState.textAlign = cellStyle.textAlign;
                }
                else if (colIndex > -1) {
                    formatState.textAlign = this.columns[colIndex].getAlignment() || formatState.textAlign;
                }
            }
        };
        FlexSheet.prototype._resetMergedRange = function (range) {
            var rowIndex, colIndex, cellIndex, mergeRowIndex, mergeColIndex, mergeCellIndex, mergedCell, mergedCellExists = false;
            for (rowIndex = range.topRow; rowIndex <= range.bottomRow; rowIndex++) {
                for (colIndex = range.leftCol; colIndex <= range.rightCol; colIndex++) {
                    cellIndex = rowIndex * this.columns.length + colIndex;
                    mergedCell = this.selectedSheet._mergedRanges[cellIndex];
                    if (mergedCell) {
                        mergedCellExists = true;
                        for (mergeRowIndex = mergedCell.topRow; mergeRowIndex <= mergedCell.bottomRow; mergeRowIndex++) {
                            for (mergeColIndex = mergedCell.leftCol; mergeColIndex <= mergedCell.rightCol; mergeColIndex++) {
                                mergeCellIndex = mergeRowIndex * this.columns.length + mergeColIndex;
                                {
                                    delete this.selectedSheet._mergedRanges[mergeCellIndex];
                                }
                            }
                        }
                    }
                }
            }
            return mergedCellExists;
        };
        FlexSheet.prototype._updateCellsForUpdatingRow = function (originalRowCount, index, count, isDelete) {
            var _this = this;
            var startIndex, cellIndex, newCellIndex, cellStyle, mergeRange, updatedMergeCell = {}, originalCellCount = originalRowCount * this.columns.length;
            if (isDelete) {
                startIndex = index * this.columns.length;
                for (cellIndex = startIndex; cellIndex < originalCellCount; cellIndex++) {
                    newCellIndex = cellIndex - count * this.columns.length;
                    cellStyle = this.selectedSheet._styledCells[cellIndex];
                    if (cellStyle) {
                        if (cellIndex >= (index + count) * this.columns.length) {
                            this.selectedSheet._styledCells[newCellIndex] = cellStyle;
                        }
                        delete this.selectedSheet._styledCells[cellIndex];
                    }
                    mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                    if (mergeRange) {
                        if (index <= mergeRange.topRow && index + count > mergeRange.bottomRow) {
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        }
                        else if (mergeRange.bottomRow < index || mergeRange.topRow >= index + count) {
                            if (mergeRange.topRow > index) {
                                mergeRange.row -= count;
                            }
                            mergeRange.row2 -= count;
                            this.selectedSheet._mergedRanges[newCellIndex] = mergeRange;
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        }
                        else {
                            this._updateCellMergeRangeForRow(mergeRange, index, count, updatedMergeCell, true);
                        }
                    }
                }
            }
            else {
                startIndex = index * this.columns.length - 1;
                for (cellIndex = originalCellCount - 1; cellIndex > startIndex; cellIndex--) {
                    newCellIndex = cellIndex + this.columns.length * count;
                    cellStyle = this.selectedSheet._styledCells[cellIndex];
                    if (cellStyle) {
                        this.selectedSheet._styledCells[newCellIndex] = cellStyle;
                        delete this.selectedSheet._styledCells[cellIndex];
                    }
                    mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                    if (mergeRange) {
                        if (mergeRange.topRow < index && mergeRange.bottomRow >= index) {
                            this._updateCellMergeRangeForRow(mergeRange, index, count, updatedMergeCell);
                        }
                        else {
                            mergeRange.row += count;
                            mergeRange.row2 += count;
                            this.selectedSheet._mergedRanges[newCellIndex] = mergeRange;
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        }
                    }
                }
            }
            Object.keys(updatedMergeCell).forEach(function (key) {
                _this.selectedSheet._mergedRanges[key] = updatedMergeCell[key];
            });
        };
        FlexSheet.prototype._updateCellMergeRangeForRow = function (currentRange, index, count, updatedMergeCell, isDelete) {
            var rowIndex, columnIndex, cellIndex, newCellIndex, i, mergeRange, cloneRange;
            if (isDelete) {
                for (rowIndex = currentRange.topRow; rowIndex <= currentRange.bottomRow; rowIndex++) {
                    for (columnIndex = currentRange.leftCol; columnIndex <= currentRange.rightCol; columnIndex++) {
                        cellIndex = rowIndex * this.columns.length + columnIndex;
                        newCellIndex = cellIndex - count * this.columns.length;
                        mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                        if (mergeRange) {
                            cloneRange = mergeRange.clone();
                            if (cloneRange.row > index) {
                                cloneRange.row -= cloneRange.row - index;
                            }
                            if (cloneRange.row2 < index + count - 1) {
                                cloneRange.row2 -= cloneRange.row2 - index + 1;
                            }
                            else {
                                cloneRange.row2 -= count;
                            }
                            if (rowIndex < index) {
                                updatedMergeCell[cellIndex] = cloneRange;
                            }
                            else {
                                if (rowIndex >= index + count) {
                                    updatedMergeCell[newCellIndex] = cloneRange;
                                }
                                delete this.selectedSheet._mergedRanges[cellIndex];
                            }
                        }
                    }
                }
            }
            else {
                for (rowIndex = currentRange.bottomRow; rowIndex >= currentRange.topRow; rowIndex--) {
                    for (columnIndex = currentRange.rightCol; columnIndex >= currentRange.leftCol; columnIndex--) {
                        cellIndex = rowIndex * this.columns.length + columnIndex;
                        mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                        if (mergeRange) {
                            cloneRange = mergeRange.clone();
                            cloneRange.row2 += count;
                            if (rowIndex < index) {
                                updatedMergeCell[cellIndex] = cloneRange.clone();
                            }
                            for (i = 1; i <= count; i++) {
                                newCellIndex = cellIndex + this.columns.length * i;
                                updatedMergeCell[newCellIndex] = cloneRange;
                            }
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        }
                    }
                }
            }
        };
        FlexSheet.prototype._updateCellsForUpdatingColumn = function (originalColumnCount, index, count, isDelete) {
            var _this = this;
            var cellIndex, newCellIndex, cellStyle, rowIndex, columnIndex, mergeRange, updatedMergeCell = {}, originalCellCount = this.rows.length * originalColumnCount;
            if (isDelete) {
                for (cellIndex = index; cellIndex < originalCellCount; cellIndex++) {
                    rowIndex = Math.floor(cellIndex / originalColumnCount);
                    columnIndex = cellIndex % originalColumnCount;
                    newCellIndex = cellIndex - (count * (rowIndex + (columnIndex >= index ? 1 : 0)));
                    cellStyle = this.selectedSheet._styledCells[cellIndex];
                    if (cellStyle) {
                        if (columnIndex < index || columnIndex >= index + count) {
                            this.selectedSheet._styledCells[newCellIndex] = cellStyle;
                        }
                        delete this.selectedSheet._styledCells[cellIndex];
                    }
                    mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                    if (mergeRange) {
                        if (index <= mergeRange.leftCol && index + count > mergeRange.rightCol) {
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        }
                        else if (mergeRange.rightCol < index || mergeRange.leftCol >= index + count) {
                            if (mergeRange.leftCol >= index) {
                                mergeRange.col -= count;
                                mergeRange.col2 -= count;
                            }
                            this.selectedSheet._mergedRanges[newCellIndex] = mergeRange;
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        }
                        else {
                            this._updateCellMergeRangeForColumn(mergeRange, index, count, originalColumnCount, updatedMergeCell, true);
                        }
                    }
                }
            }
            else {
                for (cellIndex = originalCellCount - 1; cellIndex >= index; cellIndex--) {
                    rowIndex = Math.floor(cellIndex / originalColumnCount);
                    columnIndex = cellIndex % originalColumnCount;
                    newCellIndex = cellIndex + rowIndex * count + (columnIndex >= index ? 1 : 0);
                    cellStyle = this.selectedSheet._styledCells[cellIndex];
                    if (cellStyle) {
                        this.selectedSheet._styledCells[newCellIndex] = cellStyle;
                        delete this.selectedSheet._styledCells[cellIndex];
                    }
                    mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                    if (mergeRange) {
                        if (mergeRange.leftCol < index && mergeRange.rightCol >= index) {
                            this._updateCellMergeRangeForColumn(mergeRange, index, count, originalColumnCount, updatedMergeCell);
                        }
                        else {
                            if (mergeRange.leftCol >= index) {
                                mergeRange.col += count;
                                mergeRange.col2 += count;
                            }
                            this.selectedSheet._mergedRanges[newCellIndex] = mergeRange;
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        }
                    }
                }
            }
            Object.keys(updatedMergeCell).forEach(function (key) {
                _this.selectedSheet._mergedRanges[key] = updatedMergeCell[key];
            });
        };
        FlexSheet.prototype._updateCellMergeRangeForColumn = function (currentRange, index, count, originalColumnCount, updatedMergeCell, isDelete) {
            var rowIndex, columnIndex, cellIndex, newCellIndex, i, mergeRange, cloneRange;
            if (isDelete) {
                for (rowIndex = currentRange.topRow; rowIndex <= currentRange.bottomRow; rowIndex++) {
                    for (columnIndex = currentRange.leftCol; columnIndex <= currentRange.rightCol; columnIndex++) {
                        cellIndex = rowIndex * originalColumnCount + columnIndex;
                        newCellIndex = cellIndex - (count * (rowIndex + (columnIndex >= index ? 1 : 0)));
                        mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                        if (mergeRange) {
                            cloneRange = mergeRange.clone();
                            if (cloneRange.col > index) {
                                cloneRange.col -= cloneRange.col - index;
                            }
                            if (cloneRange.col2 < index + count - 1) {
                                cloneRange.col2 -= cloneRange.col2 - index + 1;
                            }
                            else {
                                cloneRange.col2 -= count;
                            }
                            if (columnIndex < index || columnIndex >= index + count) {
                                updatedMergeCell[newCellIndex] = cloneRange;
                            }
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        }
                    }
                }
            }
            else {
                for (rowIndex = currentRange.bottomRow; rowIndex >= currentRange.topRow; rowIndex--) {
                    for (columnIndex = currentRange.rightCol; columnIndex >= currentRange.leftCol; columnIndex--) {
                        cellIndex = rowIndex * originalColumnCount + columnIndex;
                        newCellIndex = cellIndex + rowIndex * count + (columnIndex >= index ? 1 : 0);
                        mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                        if (mergeRange) {
                            cloneRange = mergeRange.clone();
                            cloneRange.col2 += count;
                            if (columnIndex === index) {
                                updatedMergeCell[newCellIndex - 1] = cloneRange.clone();
                            }
                            if (columnIndex >= index) {
                                for (i = 0; i < count; i++) {
                                    updatedMergeCell[newCellIndex + i] = cloneRange;
                                }
                            }
                            else {
                                updatedMergeCell[newCellIndex] = cloneRange;
                            }
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        }
                    }
                }
            }
        };
        FlexSheet.prototype._cloneMergedCells = function () {
            var copy, mergedRanges;
            if (!this.selectedSheet) {
                return null;
            }
            mergedRanges = this.selectedSheet._mergedRanges;
            if (null == mergedRanges || "object" !== typeof mergedRanges)
                return mergedRanges;
            if (mergedRanges instanceof Object) {
                copy = {};
                for (var attr in mergedRanges) {
                    if (mergedRanges.hasOwnProperty(attr)) {
                        if (mergedRanges[attr] && mergedRanges[attr].clone) {
                            copy[attr] = mergedRanges[attr].clone();
                        }
                    }
                }
                return copy;
            }
            throw new Error("Unable to copy obj! Its type isn't supported.");
        };
        FlexSheet.prototype._evaluate = function (formula, format, sheet, rowIndex, columnIndex) {
            if (formula && formula.length > 1) {
                formula = formula[0] === '=' ? formula : '=' + formula;
                return this._calcEngine.evaluate(formula, format, sheet, rowIndex, columnIndex);
            }
            return formula;
        };
        FlexSheet.prototype._copyTo = function (sheet) {
            var self = this, originAutoGenerateColumns = sheet.grid.autoGenerateColumns, colIndex, rowIndex, i;
            sheet._storeRowSettings();
            sheet.grid.selection = new wjcGrid.CellRange();
            sheet.grid.rows.clear();
            sheet.grid.columns.clear();
            sheet.grid.columnHeaders.columns.clear();
            sheet.grid.rowHeaders.rows.clear();
            if (self.itemsSource) {
                sheet.grid.autoGenerateColumns = false;
                sheet.itemsSource = self.itemsSource;
                sheet.grid.collectionView.beginUpdate();
                if (!(sheet.grid.itemsSource instanceof wjcCore.CollectionView)) {
                    sheet.grid.collectionView.sortDescriptions.clear();
                    for (i = 0; i < self.collectionView.sortDescriptions.length; i++) {
                        sheet.grid.collectionView.sortDescriptions.push(self.collectionView.sortDescriptions[i]);
                    }
                }
            }
            else {
                sheet.itemsSource = null;
                for (rowIndex = 0; rowIndex < self.rows.length; rowIndex++) {
                    sheet.grid.rows.push(self.rows[rowIndex]);
                }
            }
            sheet._filterDefinition = self._filter.filterDefinition;
            for (colIndex = 0; colIndex < self.columns.length; colIndex++) {
                sheet.grid.columns.push(self.columns[colIndex]);
            }
            if (sheet.grid.collectionView) {
                self._resetMappedColumns(sheet.grid);
                sheet.grid.collectionView.endUpdate();
            }
            sheet.grid.autoGenerateColumns = originAutoGenerateColumns;
            sheet.grid.frozenRows = self.frozenRows;
            sheet.grid.frozenColumns = self.frozenColumns;
            sheet.grid.selection = self.selection;
            sheet._scrollPosition = self.scrollPosition;
            setTimeout(function () {
                self._setFlexSheetToDirty();
                self.refresh(true);
            }, 10);
        };
        FlexSheet.prototype._copyFrom = function (sheet, needRefresh) {
            if (needRefresh === void 0) { needRefresh = true; }
            var self = this, originAutoGenerateColumns = self.autoGenerateColumns, colIndex, rowIndex, i, rowSetting, column, row;
            self._isCopying = true;
            self._dragable = false;
            self.rows.clear();
            self.columns.clear();
            self.columnHeaders.columns.clear();
            self.rowHeaders.rows.clear();
            self.selection = new wjcGrid.CellRange();
            if (sheet.selectionRanges.length > 1 && self.selectionMode === wjcGrid.SelectionMode.CellRange) {
                self._enableMulSel = true;
            }
            if (sheet.itemsSource) {
                self.autoGenerateColumns = false;
                self.itemsSource = sheet.itemsSource;
                self.collectionView.beginUpdate();
                if (!(self.itemsSource instanceof wjcCore.CollectionView)) {
                    self.collectionView.sortDescriptions.clear();
                    for (i = 0; i < sheet.grid.collectionView.sortDescriptions.length; i++) {
                        self.collectionView.sortDescriptions.push(sheet.grid.collectionView.sortDescriptions[i]);
                    }
                }
            }
            else {
                self.itemsSource = null;
                for (rowIndex = 0; rowIndex < sheet.grid.rows.length; rowIndex++) {
                    self.rows.push(sheet.grid.rows[rowIndex]);
                }
            }
            for (colIndex = 0; colIndex < sheet.grid.columns.length; colIndex++) {
                column = sheet.grid.columns[colIndex];
                column.isRequired = false;
                self.columns.push(column);
            }
            if (self.collectionView) {
                self._resetMappedColumns(self);
                self.collectionView.endUpdate();
                self.collectionView.collectionChanged.addHandler(function (sender, e) {
                    if (e.action === wjcCore.NotifyCollectionChangedAction.Reset) {
                        self.invalidate();
                    }
                }, self);
                for (rowIndex = 0; rowIndex < self.rows.length; rowIndex++) {
                    rowSetting = sheet._rowSettings[rowIndex];
                    if (rowSetting) {
                        row = self.rows[rowIndex];
                        row.height = rowSetting.height;
                        if (row instanceof wjcGrid.GroupRow) {
                            row.isCollapsed = rowSetting.isCollapsed;
                        }
                    }
                }
            }
            if (self.rows.length && self.columns.length) {
                self.selection = sheet.grid.selection;
            }
            if (sheet._filterDefinition) {
                self._filter.filterDefinition = sheet._filterDefinition;
            }
            self.autoGenerateColumns = originAutoGenerateColumns;
            self.frozenRows = sheet.grid.frozenRows;
            self.frozenColumns = sheet.grid.frozenColumns;
            self._isCopying = false;
            if (self._addingSheet) {
                if (self._toRefresh) {
                    clearTimeout(self._toRefresh);
                    self._toRefresh = null;
                }
                self._toRefresh = setTimeout(function () {
                    self._setFlexSheetToDirty();
                    self.invalidate();
                }, 10);
                self._addingSheet = false;
            }
            else if (needRefresh) {
                self.refresh();
            }
            self.scrollPosition = sheet._scrollPosition;
        };
        FlexSheet.prototype._resetMappedColumns = function (flex) {
            var col, sds, i = 0;
            flex._mappedColumns = null;
            if (flex.collectionView) {
                sds = flex.collectionView.sortDescriptions;
                for (; i < sds.length; i++) {
                    col = flex.columns.getColumn(sds[i].property);
                    if (col && col.dataMap) {
                        if (!flex._mappedColumns) {
                            flex._mappedColumns = {};
                        }
                        flex._mappedColumns[col.binding] = col.dataMap;
                    }
                }
            }
        };
        FlexSheet.prototype._resetFilterDefinition = function () {
            this._resettingFilter = true;
            this._filter.filterDefinition = JSON.stringify({
                defaultFilterType: wjcGridFilter.FilterType.Both,
                filters: []
            });
            this._resettingFilter = false;
        };
        FlexSheet.prototype._loadFromWorkbook = function (workbook) {
            var sheetCount, sheetIndex = 0, self = this;
            if (workbook.sheets == null || workbook.sheets.length === 0) {
                return;
            }
            self.clear();
            self._reservedContent = workbook.reservedContent;
            sheetCount = workbook.sheets.length;
            for (; sheetIndex < sheetCount; sheetIndex++) {
                if (sheetIndex > 0) {
                    self.addUnboundSheet();
                }
                self.selectedSheet.grid['wj_sheetInfo'] = {};
                wjcGridXlsx.FlexGridXlsxConverter.load(self.selectedSheet.grid, workbook, { sheetIndex: sheetIndex, includeColumnHeaders: false });
                self.selectedSheet.name = self.selectedSheet.grid['wj_sheetInfo'].name;
                self.selectedSheet.visible = self.selectedSheet.grid['wj_sheetInfo'].visible;
                self.selectedSheet._styledCells = self.selectedSheet.grid['wj_sheetInfo'].styledCells;
                self.selectedSheet._mergedRanges = self.selectedSheet.grid['wj_sheetInfo'].mergedRanges;
                self._copyFrom(self.selectedSheet, false);
            }
            if (workbook.activeWorksheet != null && workbook.activeWorksheet > -1 && workbook.activeWorksheet < self.sheets.length) {
                self.selectedSheetIndex = workbook.activeWorksheet;
            }
            else {
                self.selectedSheetIndex = 0;
            }
            self.onLoaded();
        };
        FlexSheet.prototype._saveToWorkbook = function () {
            var mainBook, tmpBook, currentSheet, sheetIndex;
            if (this.sheets.length === 0) {
                throw 'The flexsheet is empty.';
            }
            currentSheet = this.sheets[0];
            if (this.selectedSheetIndex === 0) {
                currentSheet._storeRowSettings();
                currentSheet._setRowSettings();
            }
            mainBook = wjcGridXlsx.FlexGridXlsxConverter.save(currentSheet.grid, { sheetName: currentSheet.name, sheetVisible: currentSheet.visible, includeColumnHeaders: false });
            mainBook.reservedContent = this._reservedContent;
            for (sheetIndex = 1; sheetIndex < this.sheets.length; sheetIndex++) {
                currentSheet = this.sheets[sheetIndex];
                if (this.selectedSheetIndex === sheetIndex) {
                    currentSheet._storeRowSettings();
                    currentSheet._setRowSettings();
                }
                tmpBook = wjcGridXlsx.FlexGridXlsxConverter.save(currentSheet.grid, { sheetName: currentSheet.name, sheetVisible: currentSheet.visible, includeColumnHeaders: false });
                mainBook._addWorkSheet(tmpBook.sheets[0], sheetIndex);
            }
            mainBook.activeWorksheet = this.selectedSheetIndex;
            return mainBook;
        };
        FlexSheet.prototype._mouseDown = function (e) {
            var userAgent = window.navigator.userAgent, ht = this.hitTest(e), cols = this.columns, currentRange, colIndex, selected, newSelection, edt;
            this._wholeColumnsSelected = false;
            if (this._dragable) {
                this._isDragging = true;
                this._draggingMarker = document.createElement('div');
                wjcCore.setCss(this._draggingMarker, {
                    position: 'absolute',
                    display: 'none',
                    borderStyle: 'dotted',
                    cursor: 'move'
                });
                document.body.appendChild(this._draggingMarker);
                this._draggingTooltip = new wjcCore.Tooltip();
                this._draggingCells = this.selection;
                if (this.selectedSheet) {
                    this.selectedSheet.selectionRanges.clear();
                }
                this.onDraggingRowColumn(new DraggingRowColumnEventArgs(this._draggingRow, e.shiftKey));
                e.preventDefault();
                return;
            }
            if (ht.cellType !== wjcGrid.CellType.None) {
                edt = wjcCore.tryCast(e.target, HTMLInputElement);
                if (edt == null && this._checkHitWithinSelection(ht)) {
                    this._edtHdl._htDown = ht;
                }
                this._isClicking = true;
            }
            if (this.selectionMode === wjcGrid.SelectionMode.CellRange) {
                if (e.ctrlKey) {
                    if (!this._enableMulSel) {
                        this._enableMulSel = true;
                    }
                }
                else {
                    if (ht.cellType !== wjcGrid.CellType.None) {
                        if (this.selectedSheet) {
                            this.selectedSheet.selectionRanges.clear();
                        }
                        if (this._enableMulSel) {
                            this.refresh(false);
                        }
                        this._enableMulSel = false;
                    }
                }
            }
            else {
                this._enableMulSel = false;
                if (this.selectedSheet) {
                    this.selectedSheet.selectionRanges.clear();
                }
            }
            this._htDown = ht;
            if (this.rows.length === 0 || this.columns.length === 0) {
                return;
            }
            if (!userAgent.match(/iPad/i) && !userAgent.match(/iPhone/i)) {
                this._contextMenu.hide();
            }
            if (this.selectionMode !== wjcGrid.SelectionMode.CellRange) {
                return;
            }
            if (ht.cellType === wjcGrid.CellType.RowHeader && e.which === 3) {
                newSelection = new wjcGrid.CellRange(ht.row, 0, ht.row, this.columns.length - 1);
                if (!this.selection.contains(newSelection)) {
                    this.selection = newSelection;
                }
                return;
            }
            if (ht.cellType !== wjcGrid.CellType.ColumnHeader && ht.cellType !== wjcGrid.CellType.None) {
                return;
            }
            if (ht.col > -1 && this.columns[ht.col].isSelected) {
                return;
            }
            if (!wjcCore.hasClass(e.target, 'wj-cell') || ht.edgeRight) {
                return;
            }
            this._columnHeaderClicked = true;
            this._wholeColumnsSelected = true;
            if (e.shiftKey) {
                this._multiSelectColumns(ht);
            }
            else {
                currentRange = new wjcGrid.CellRange(this.itemsSource ? 1 : 0, ht.col, this.rows.length - 1, ht.col);
                if (e.which === 3 && this.selection.contains(currentRange)) {
                    return;
                }
                this.select(currentRange);
            }
        };
        FlexSheet.prototype._mouseMove = function (e) {
            var ht = this.hitTest(e), selection = this.selection, rowCnt = this.rows.length, colCnt = this.columns.length, cursor = this.hostElement.style.cursor, isTopRow;
            if (this.rows.length === 0 || this.columns.length === 0) {
                this._dragable = false;
                if (ht.cellType === wjcGrid.CellType.Cell) {
                    this.hostElement.style.cursor = 'default';
                }
                return;
            }
            if (this._isDragging) {
                this.hostElement.style.cursor = 'move';
                this._showDraggingMarker(e);
                return;
            }
            if (this.itemsSource) {
                isTopRow = selection.topRow === 0 || selection.topRow === 1;
            }
            else {
                isTopRow = selection.topRow === 0;
            }
            if (selection && ht.cellType !== wjcGrid.CellType.None && !this.itemsSource) {
                this._draggingColumn = isTopRow && selection.bottomRow === rowCnt - 1;
                this._draggingRow = selection.leftCol === 0 && selection.rightCol === colCnt - 1;
                if (ht.cellType === wjcGrid.CellType.Cell) {
                    if (this._draggingColumn && (((ht.col === selection.leftCol - 1 || ht.col === selection.rightCol) && ht.edgeRight)
                        || (ht.row === rowCnt - 1 && ht.edgeBottom))) {
                        cursor = 'move';
                    }
                    if (this._draggingRow && !this._containsGroupRows(selection) && ((ht.row === selection.topRow - 1 || ht.row === selection.bottomRow) && ht.edgeBottom
                        || (ht.col === colCnt - 1 && ht.edgeRight))) {
                        cursor = 'move';
                    }
                }
                else if (ht.cellType === wjcGrid.CellType.ColumnHeader) {
                    if (ht.edgeBottom) {
                        if (this._draggingColumn && (ht.col >= selection.leftCol && ht.col <= selection.rightCol)) {
                            cursor = 'move';
                        }
                        else if (this._draggingRow && selection.topRow === 0) {
                            cursor = 'move';
                        }
                    }
                }
                else if (ht.cellType === wjcGrid.CellType.RowHeader) {
                    if (ht.edgeRight) {
                        if (this._draggingColumn && selection.leftCol === 0) {
                            cursor = 'move';
                        }
                        else if (this._draggingRow && (ht.row >= selection.topRow && ht.row <= selection.bottomRow) && !this._containsGroupRows(selection)) {
                            cursor = 'move';
                        }
                    }
                }
                if (cursor === 'move') {
                    this._dragable = true;
                }
                else {
                    this._dragable = false;
                }
                this.hostElement.style.cursor = cursor;
            }
            if (!this._htDown || !this._htDown.panel) {
                return;
            }
            ht = new wjcGrid.HitTestInfo(this._htDown.panel, e);
            this._multiSelectColumns(ht);
            if (ht.cellType === wjcGrid.CellType.Cell) {
                this.scrollIntoView(ht.row, ht.col);
            }
        };
        FlexSheet.prototype._mouseUp = function (e) {
            if (this._isDragging) {
                if (!this._draggingCells.equals(this._dropRange)) {
                    this._handleDropping(e);
                    this.onDroppingRowColumn();
                }
                this._draggingCells = null;
                this._dropRange = null;
                document.body.removeChild(this._draggingMarker);
                this._draggingMarker = null;
                this._draggingTooltip.hide();
                this._draggingTooltip = null;
                this._isDragging = false;
                this._draggingColumn = false;
                this._draggingRow = false;
            }
            if (this._htDown && this._htDown.cellType !== wjcGrid.CellType.None && this.selection.isValid && this.selectedSheet) {
                if (this._htDown.cellType === wjcGrid.CellType.TopLeft) {
                    this.selectedSheet.selectionRanges.push(new wjcGrid.CellRange(this.selectedSheet.itemsSource ? 1 : 0, 0, this.rows.length - 1, this.columns.length - 1));
                }
                else {
                    this.selectedSheet.selectionRanges.push(this.selection);
                }
                this._enableMulSel = false;
            }
            this._isClicking = false;
            this._columnHeaderClicked = false;
            this._htDown = null;
        };
        FlexSheet.prototype._click = function () {
            var self = this, userAgent = window.navigator.userAgent;
            if (!userAgent.match(/iPad/i) && !userAgent.match(/iPhone/i)) {
                self._contextMenu.hide();
            }
            setTimeout(function () {
                self.hideFunctionList();
            }, 200);
        };
        FlexSheet.prototype._touchStart = function (e) {
            var self = this;
            if (!wjcCore.hasClass(e.target, 'wj-context-menu-item')) {
                self._contextMenu.hide();
            }
            self._longClickTimer = setTimeout(function () {
                var ht;
                ht = self.hitTest(e);
                if (ht && ht.cellType !== wjcGrid.CellType.None && !self.itemsSource) {
                    self._contextMenu.show(undefined, new wjcCore.Point(e.pageX + 10, e.pageY + 10));
                }
            }, 500);
        };
        FlexSheet.prototype._touchEnd = function () {
            clearTimeout(this._longClickTimer);
        };
        FlexSheet.prototype._showDraggingMarker = function (e) {
            var hitInfo = new wjcGrid.HitTestInfo(this.cells, e), selection = this.selection, colCnt = this.columns.length, rowCnt = this.rows.length, scrollOffset = this._cumulativeScrollOffset(this.hostElement), rootBounds = this['_root'].getBoundingClientRect(), rootOffsetX = rootBounds.left + scrollOffset.x, rootOffsetY = rootBounds.top + scrollOffset.y, hitCellBounds, selectionCnt, hit, height, width, rootSize, i, content, css;
            this.scrollIntoView(hitInfo.row, hitInfo.col);
            if (this._draggingColumn) {
                selectionCnt = selection.rightCol - selection.leftCol + 1;
                hit = hitInfo.col;
                width = 0;
                if (hit < 0 || hit + selectionCnt > colCnt) {
                    hit = colCnt - selectionCnt;
                }
                hitCellBounds = this.cells.getCellBoundingRect(0, hit);
                rootSize = this['_root'].offsetHeight - this['_eCHdr'].offsetHeight;
                height = this.cells.height;
                height = height > rootSize ? rootSize : height;
                for (i = 0; i < selectionCnt; i++) {
                    width += this.columns[hit + i].renderSize;
                }
                content = FlexSheet.convertNumberToAlpha(hit) + ' : ' + FlexSheet.convertNumberToAlpha(hit + selectionCnt - 1);
                if (this._dropRange) {
                    this._dropRange.col = hit;
                    this._dropRange.col2 = hit + selectionCnt - 1;
                }
                else {
                    this._dropRange = new wjcGrid.CellRange(0, hit, this.rows.length - 1, hit + selectionCnt - 1);
                }
            }
            else if (this._draggingRow) {
                selectionCnt = selection.bottomRow - selection.topRow + 1;
                hit = hitInfo.row;
                height = 0;
                if (hit < 0 || hit + selectionCnt > rowCnt) {
                    hit = rowCnt - selectionCnt;
                }
                hitCellBounds = this.cells.getCellBoundingRect(hit, 0);
                rootSize = this['_root'].offsetWidth - this['_eRHdr'].offsetWidth;
                for (i = 0; i < selectionCnt; i++) {
                    height += this.rows[hit + i].renderSize;
                }
                width = this.cells.width;
                width = width > rootSize ? rootSize : width;
                content = (hit + 1) + ' : ' + (hit + selectionCnt);
                if (this._dropRange) {
                    this._dropRange.row = hit;
                    this._dropRange.row2 = hit + selectionCnt - 1;
                }
                else {
                    this._dropRange = new wjcGrid.CellRange(hit, 0, hit + selectionCnt - 1, this.columns.length - 1);
                }
            }
            if (!hitCellBounds) {
                return;
            }
            css = {
                display: 'inline',
                zIndex: '9999',
                opacity: 0.5,
                top: hitCellBounds.top - (this._draggingColumn ? this._ptScrl.y : 0) + scrollOffset.y,
                left: hitCellBounds.left - (this._draggingRow ? this._ptScrl.x : 0) + scrollOffset.x,
                height: height,
                width: width
            };
            hitCellBounds.top = hitCellBounds.top - (this._draggingColumn ? this._ptScrl.y : 0);
            hitCellBounds.left = hitCellBounds.left - (this._draggingRow ? this._ptScrl.x : 0);
            if (this.rightToLeft && this._draggingRow) {
                css.left = css.left - width + hitCellBounds.width + 2 * this._ptScrl.x;
                hitCellBounds.left = hitCellBounds.left + 2 * this._ptScrl.x;
            }
            if (this._draggingRow) {
                if (rootOffsetX + this['_eRHdr'].offsetWidth !== css.left || rootOffsetY + this['_root'].offsetHeight + 1 < css.top + css.height) {
                    return;
                }
            }
            else {
                if (rootOffsetY + this['_eCHdr'].offsetHeight !== css.top || rootOffsetX + this['_root'].offsetWidth + 1 < css.left + css.width) {
                    return;
                }
            }
            wjcCore.setCss(this._draggingMarker, css);
            this._draggingTooltip.show(this.hostElement, content, hitCellBounds);
        };
        FlexSheet.prototype._handleDropping = function (e) {
            var self = this, srcRowIndex, srcColIndex, desRowIndex, desColIndex, moveCellsAction;
            if (!self.selectedSheet || !self._draggingCells || !self._dropRange || self._containsMergedCells(self._draggingCells) || self._containsMergedCells(self._dropRange)) {
                return;
            }
            self._clearCalcEngine();
            if ((self._draggingColumn && self._draggingCells.leftCol > self._dropRange.leftCol)
                || (self._draggingRow && self._draggingCells.topRow > self._dropRange.topRow)) {
                if (e.shiftKey) {
                    if (self._draggingColumn) {
                        desColIndex = self._dropRange.leftCol;
                        for (srcColIndex = self._draggingCells.leftCol; srcColIndex <= self._draggingCells.rightCol; srcColIndex++) {
                            self.columns.moveElement(srcColIndex, desColIndex);
                            desColIndex++;
                        }
                    }
                    else if (self._draggingRow) {
                        desRowIndex = self._dropRange.topRow;
                        for (srcRowIndex = self._draggingCells.topRow; srcRowIndex <= self._draggingCells.bottomRow; srcRowIndex++) {
                            self.rows.moveElement(srcRowIndex, desRowIndex);
                            desRowIndex++;
                        }
                    }
                    self._exchangeCellStyle(true);
                }
                else {
                    moveCellsAction = new _MoveCellsAction(self, self._draggingCells, self._dropRange, e.ctrlKey);
                    desRowIndex = self._dropRange.topRow;
                    for (srcRowIndex = self._draggingCells.topRow; srcRowIndex <= self._draggingCells.bottomRow; srcRowIndex++) {
                        desColIndex = self._dropRange.leftCol;
                        for (srcColIndex = self._draggingCells.leftCol; srcColIndex <= self._draggingCells.rightCol; srcColIndex++) {
                            self._moveCellContent(srcRowIndex, srcColIndex, desRowIndex, desColIndex, e.ctrlKey);
                            if (self._draggingColumn && desRowIndex === self._dropRange.topRow) {
                                self.columns[desColIndex].dataType = self.columns[srcColIndex].dataType ? self.columns[srcColIndex].dataType : wjcCore.DataType.Object;
                                self.columns[desColIndex].align = self.columns[srcColIndex].align;
                                self.columns[desColIndex].format = self.columns[srcColIndex].format;
                                if (!e.ctrlKey) {
                                    self.columns[srcColIndex].dataType = wjcCore.DataType.Object;
                                    self.columns[srcColIndex].align = null;
                                    self.columns[srcColIndex].format = null;
                                }
                            }
                            desColIndex++;
                        }
                        desRowIndex++;
                    }
                    if (self._draggingColumn && !e.ctrlKey) {
                        desColIndex = self._dropRange.leftCol;
                        for (srcColIndex = self._draggingCells.leftCol; srcColIndex <= self._draggingCells.rightCol; srcColIndex++) {
                            self._updateColumnFiler(srcColIndex, desColIndex);
                            desColIndex++;
                        }
                    }
                    if (moveCellsAction.saveNewState()) {
                        self._undoStack._addAction(moveCellsAction);
                    }
                }
            }
            else if ((self._draggingColumn && self._draggingCells.leftCol < self._dropRange.leftCol)
                || (self._draggingRow && self._draggingCells.topRow < self._dropRange.topRow)) {
                if (e.shiftKey) {
                    if (self._draggingColumn) {
                        desColIndex = self._dropRange.rightCol;
                        for (srcColIndex = self._draggingCells.rightCol; srcColIndex >= self._draggingCells.leftCol; srcColIndex--) {
                            self.columns.moveElement(srcColIndex, desColIndex);
                            desColIndex--;
                        }
                    }
                    else if (self._draggingRow) {
                        desRowIndex = self._dropRange.bottomRow;
                        for (srcRowIndex = self._draggingCells.bottomRow; srcRowIndex >= self._draggingCells.topRow; srcRowIndex--) {
                            self.rows.moveElement(srcRowIndex, desRowIndex);
                            desRowIndex--;
                        }
                    }
                    self._exchangeCellStyle(false);
                }
                else {
                    moveCellsAction = new _MoveCellsAction(self, self._draggingCells, self._dropRange, e.ctrlKey);
                    desRowIndex = self._dropRange.bottomRow;
                    for (srcRowIndex = self._draggingCells.bottomRow; srcRowIndex >= self._draggingCells.topRow; srcRowIndex--) {
                        desColIndex = self._dropRange.rightCol;
                        for (srcColIndex = self._draggingCells.rightCol; srcColIndex >= self._draggingCells.leftCol; srcColIndex--) {
                            self._moveCellContent(srcRowIndex, srcColIndex, desRowIndex, desColIndex, e.ctrlKey);
                            if (self._draggingColumn && desRowIndex === self._dropRange.bottomRow) {
                                self.columns[desColIndex].dataType = self.columns[srcColIndex].dataType ? self.columns[srcColIndex].dataType : wjcCore.DataType.Object;
                                self.columns[desColIndex].align = self.columns[srcColIndex].align;
                                self.columns[desColIndex].format = self.columns[srcColIndex].format;
                                if (!e.ctrlKey) {
                                    self.columns[srcColIndex].dataType = wjcCore.DataType.Object;
                                    self.columns[srcColIndex].align = null;
                                    self.columns[srcColIndex].format = null;
                                }
                            }
                            desColIndex--;
                        }
                        desRowIndex--;
                    }
                    if (self._draggingColumn && !e.ctrlKey) {
                        desColIndex = self._dropRange.rightCol;
                        for (srcColIndex = self._draggingCells.rightCol; srcColIndex >= self._draggingCells.leftCol; srcColIndex--) {
                            self._updateColumnFiler(srcColIndex, desColIndex);
                            desColIndex--;
                        }
                    }
                    if (moveCellsAction.saveNewState()) {
                        self._undoStack._addAction(moveCellsAction);
                    }
                }
            }
            self.select(self._dropRange);
            self.selectedSheet.selectionRanges.push(self.selection);
            self.hostElement.focus();
        };
        FlexSheet.prototype._moveCellContent = function (srcRowIndex, srcColIndex, desRowIndex, desColIndex, isCopyContent) {
            var val = this.getCellData(srcRowIndex, srcColIndex, false), srcCellIndex = srcRowIndex * this.columns.length + srcColIndex, desCellIndex = desRowIndex * this.columns.length + desColIndex, srcCellStyle = this.selectedSheet._styledCells[srcCellIndex];
            this.setCellData(desRowIndex, desColIndex, val);
            if (srcCellStyle) {
                this.selectedSheet._styledCells[desCellIndex] = JSON.parse(JSON.stringify(srcCellStyle));
            }
            else {
                delete this.selectedSheet._styledCells[desCellIndex];
            }
            if (!isCopyContent) {
                this.setCellData(srcRowIndex, srcColIndex, undefined);
                delete this.selectedSheet._styledCells[srcCellIndex];
            }
        };
        FlexSheet.prototype._exchangeCellStyle = function (isReverse) {
            var rowIndex, colIndex, cellIndex, newCellIndex, draggingRange, index = 0, srcCellStyles = [];
            for (rowIndex = this._draggingCells.topRow; rowIndex <= this._draggingCells.bottomRow; rowIndex++) {
                for (colIndex = this._draggingCells.leftCol; colIndex <= this._draggingCells.rightCol; colIndex++) {
                    cellIndex = rowIndex * this.columns.length + colIndex;
                    if (this.selectedSheet._styledCells[cellIndex]) {
                        srcCellStyles.push(JSON.parse(JSON.stringify(this.selectedSheet._styledCells[cellIndex])));
                        delete this.selectedSheet._styledCells[cellIndex];
                    }
                    else {
                        srcCellStyles.push(undefined);
                    }
                }
            }
            if (isReverse) {
                if (this._draggingColumn) {
                    draggingRange = this._draggingCells.rightCol - this._draggingCells.leftCol + 1;
                    for (colIndex = this._draggingCells.leftCol - 1; colIndex >= this._dropRange.leftCol; colIndex--) {
                        for (rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
                            cellIndex = rowIndex * this.columns.length + colIndex;
                            newCellIndex = rowIndex * this.columns.length + colIndex + draggingRange;
                            if (this.selectedSheet._styledCells[cellIndex]) {
                                this.selectedSheet._styledCells[newCellIndex] = JSON.parse(JSON.stringify(this.selectedSheet._styledCells[cellIndex]));
                                delete this.selectedSheet._styledCells[cellIndex];
                            }
                            else {
                                delete this.selectedSheet._styledCells[newCellIndex];
                            }
                        }
                    }
                }
                else if (this._draggingRow) {
                    draggingRange = this._draggingCells.bottomRow - this._draggingCells.topRow + 1;
                    for (rowIndex = this._draggingCells.topRow - 1; rowIndex >= this._dropRange.topRow; rowIndex--) {
                        for (colIndex = 0; colIndex < this.columns.length; colIndex++) {
                            cellIndex = rowIndex * this.columns.length + colIndex;
                            newCellIndex = (rowIndex + draggingRange) * this.columns.length + colIndex;
                            if (this.selectedSheet._styledCells[cellIndex]) {
                                this.selectedSheet._styledCells[newCellIndex] = JSON.parse(JSON.stringify(this.selectedSheet._styledCells[cellIndex]));
                                delete this.selectedSheet._styledCells[cellIndex];
                            }
                            else {
                                delete this.selectedSheet._styledCells[newCellIndex];
                            }
                        }
                    }
                }
            }
            else {
                if (this._draggingColumn) {
                    draggingRange = this._draggingCells.rightCol - this._draggingCells.leftCol + 1;
                    for (colIndex = this._draggingCells.rightCol + 1; colIndex <= this._dropRange.rightCol; colIndex++) {
                        for (rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
                            cellIndex = rowIndex * this.columns.length + colIndex;
                            newCellIndex = rowIndex * this.columns.length + colIndex - draggingRange;
                            if (this.selectedSheet._styledCells[cellIndex]) {
                                this.selectedSheet._styledCells[newCellIndex] = JSON.parse(JSON.stringify(this.selectedSheet._styledCells[cellIndex]));
                                delete this.selectedSheet._styledCells[cellIndex];
                            }
                            else {
                                delete this.selectedSheet._styledCells[newCellIndex];
                            }
                        }
                    }
                }
                else if (this._draggingRow) {
                    draggingRange = this._draggingCells.bottomRow - this._draggingCells.topRow + 1;
                    for (rowIndex = this._draggingCells.bottomRow + 1; rowIndex <= this._dropRange.bottomRow; rowIndex++) {
                        for (colIndex = 0; colIndex < this.columns.length; colIndex++) {
                            cellIndex = rowIndex * this.columns.length + colIndex;
                            newCellIndex = (rowIndex - draggingRange) * this.columns.length + colIndex;
                            if (this.selectedSheet._styledCells[cellIndex]) {
                                this.selectedSheet._styledCells[newCellIndex] = JSON.parse(JSON.stringify(this.selectedSheet._styledCells[cellIndex]));
                                delete this.selectedSheet._styledCells[cellIndex];
                            }
                            else {
                                delete this.selectedSheet._styledCells[newCellIndex];
                            }
                        }
                    }
                }
            }
            for (rowIndex = this._dropRange.topRow; rowIndex <= this._dropRange.bottomRow; rowIndex++) {
                for (colIndex = this._dropRange.leftCol; colIndex <= this._dropRange.rightCol; colIndex++) {
                    cellIndex = rowIndex * this.columns.length + colIndex;
                    if (srcCellStyles[index]) {
                        this.selectedSheet._styledCells[cellIndex] = srcCellStyles[index];
                    }
                    else {
                        delete this.selectedSheet._styledCells[cellIndex];
                    }
                    index++;
                }
            }
        };
        FlexSheet.prototype._containsMergedCells = function (rng) {
            var rowIndex, colIndex, cellIndex, mergedRange;
            if (!this.selectedSheet) {
                return false;
            }
            for (rowIndex = rng.topRow; rowIndex <= rng.bottomRow; rowIndex++) {
                for (colIndex = rng.leftCol; colIndex <= rng.rightCol; colIndex++) {
                    cellIndex = rowIndex * this.columns.length + colIndex;
                    mergedRange = this.selectedSheet._mergedRanges[cellIndex];
                    if (mergedRange && mergedRange.isValid && !mergedRange.isSingleCell) {
                        return true;
                    }
                }
            }
            return false;
        };
        FlexSheet.prototype._multiSelectColumns = function (ht) {
            var range;
            if (ht && this._columnHeaderClicked) {
                range = new wjcGrid.CellRange(ht.row, ht.col);
                range.row = !!this.selectedSheet.itemsSource ? 1 : 0;
                range.row2 = this.rows.length - 1;
                range.col2 = this.selection.col2;
                this.select(range);
            }
        };
        FlexSheet.prototype._cumulativeOffset = function (element) {
            var top = 0, left = 0;
            do {
                top += element.offsetTop || 0;
                left += element.offsetLeft || 0;
                element = element.offsetParent;
            } while (element);
            return new wjcCore.Point(left, top);
        };
        FlexSheet.prototype._cumulativeScrollOffset = function (element) {
            var scrollTop = 0, scrollLeft = 0;
            do {
                scrollTop += element.scrollTop || 0;
                scrollLeft += element.scrollLeft || 0;
                element = element.offsetParent;
            } while (element && !(element instanceof HTMLBodyElement));
            scrollTop += document.body.scrollTop || document.documentElement.scrollTop;
            scrollLeft += document.body.scrollLeft || document.documentElement.scrollLeft;
            return new wjcCore.Point(scrollLeft, scrollTop);
        };
        FlexSheet.prototype._checkHitWithinSelection = function (ht) {
            var cellIndex, mergedRange;
            if (ht != null && ht.cellType === wjcGrid.CellType.Cell) {
                mergedRange = this.getMergedRange(this.cells, ht.row, ht.col);
                if (mergedRange && mergedRange.contains(this.selection)) {
                    return true;
                }
                if (this.selection.row === ht.row && this.selection.col === ht.col) {
                    return true;
                }
            }
            return false;
        };
        FlexSheet.prototype._clearForEmptySheet = function (rowsOrColumns) {
            if (this.selectedSheet && this[rowsOrColumns].length === 0 && this._isCopying !== true && this._isUndoing !== true) {
                this.selectedSheet._mergedRanges = null;
                this.selectedSheet._styledCells = null;
                this.select(new wjcGrid.CellRange());
            }
        };
        FlexSheet.prototype._containsGroupRows = function (cellRange) {
            var rowIndex, row;
            for (rowIndex = cellRange.topRow; rowIndex <= cellRange.bottomRow; rowIndex++) {
                row = this.rows[rowIndex];
                if (row instanceof wjcGrid.GroupRow) {
                    return true;
                }
            }
            return false;
        };
        FlexSheet.prototype._delSeletionContent = function (evt) {
            var selections = this.selectedSheet.selectionRanges, selection, index, colIndex, rowIndex, bcol, contentDeleted = false, e, delAction = new _EditAction(this);
            if (this.isReadOnly) {
                return;
            }
            this.beginUpdate();
            for (index = 0; index < selections.length; index++) {
                selection = selections[index];
                e = new wjcGrid.CellEditEndingEventArgs(this.cells, selection, evt);
                for (rowIndex = selection.topRow; rowIndex <= selection.bottomRow; rowIndex++) {
                    if (this.rows[rowIndex] && !this.rows[rowIndex].isReadOnly) {
                        for (colIndex = selection.leftCol; colIndex <= selection.rightCol; colIndex++) {
                            bcol = this._getBindingColumn(this.cells, rowIndex, this.columns[colIndex]);
                            if (!bcol.isReadOnly && bcol.isRequired === false || (bcol.isRequired == null && bcol.dataType == wjcCore.DataType.String)) {
                                if (this.getCellData(rowIndex, colIndex, true)) {
                                    e.cancel = false;
                                    if (this.onBeginningEdit(e)) {
                                        this.setCellData(rowIndex, colIndex, '', true);
                                        contentDeleted = true;
                                        this.onCellEditEnding(e);
                                        this.onCellEditEnded(e);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (contentDeleted) {
                delAction.saveNewState();
                this._undoStack._addAction(delAction);
            }
            this.endUpdate();
        };
        FlexSheet.prototype._updateAffectedFormula = function (index, count, isAdding, isRow) {
            var rowIndex, colIndex, newRowIndex, newColIndex, cellData, matches, cellRefIndex, isUpdated, changed, cellRef, updatedCellRef, oldFormulas = [], newFormulas = [], cellAddress;
            for (rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
                for (colIndex = 0; colIndex < this.columns.length; colIndex++) {
                    var cellData = this.getCellData(rowIndex, colIndex, false);
                    if (!!cellData && typeof cellData === 'string' && cellData[0] === '=') {
                        matches = cellData.match(/(?=\b\D)\$?[A-Za-z]+\$?\d+/g);
                        if (!!matches && matches.length > 0) {
                            isUpdated = false;
                            for (cellRefIndex = 0; cellRefIndex < matches.length; cellRefIndex++) {
                                cellRef = matches[cellRefIndex];
                                if (cellRef.toLowerCase() !== 'atan2') {
                                    cellAddress = wjcXlsx.Workbook.tableAddress(cellRef);
                                    changed = false;
                                    if (isRow) {
                                        if (isAdding) {
                                            if (cellAddress.row >= index) {
                                                cellAddress.row += count;
                                                changed = true;
                                            }
                                        }
                                        else {
                                            if (cellAddress.row > index - count) {
                                                if (cellAddress.row > index) {
                                                    cellAddress.row -= count;
                                                }
                                                else {
                                                    cellAddress.row = index - count + 1;
                                                }
                                                changed = true;
                                            }
                                        }
                                    }
                                    else {
                                        if (isAdding) {
                                            if (cellAddress.col >= index) {
                                                cellAddress.col += count;
                                                changed = true;
                                            }
                                        }
                                        else {
                                            if (cellAddress.col > index - count) {
                                                if (cellAddress.col > index) {
                                                    cellAddress.col -= count;
                                                }
                                                else {
                                                    cellAddress.col = index - count + 1;
                                                }
                                                changed = true;
                                            }
                                        }
                                    }
                                    if (!isUpdated && changed) {
                                        isUpdated = true;
                                        oldFormulas.push({
                                            point: new wjcCore.Point(rowIndex, colIndex),
                                            formula: cellData
                                        });
                                    }
                                    updatedCellRef = wjcXlsx.Workbook.xlsxAddress(cellAddress.row, cellAddress.col, cellAddress.absRow, cellAddress.absCol);
                                    cellData = cellData.replace(cellRef, updatedCellRef);
                                }
                            }
                            if (isUpdated) {
                                newRowIndex = rowIndex;
                                newColIndex = colIndex;
                                if (isRow) {
                                    if (rowIndex >= index) {
                                        if (isAdding) {
                                            newRowIndex += count;
                                        }
                                        else {
                                            newRowIndex -= count;
                                        }
                                    }
                                }
                                else {
                                    if (colIndex >= index) {
                                        if (isAdding) {
                                            newColIndex += count;
                                        }
                                        else {
                                            newColIndex -= count;
                                        }
                                    }
                                }
                                if (!isAdding) {
                                    if ((isRow && rowIndex <= index && rowIndex >= index - count) ||
                                        (!isRow && colIndex <= index && colIndex >= index - count)) {
                                        continue;
                                    }
                                }
                                this.setCellData(rowIndex, colIndex, cellData);
                                newFormulas.push({
                                    point: new wjcCore.Point(newRowIndex, newColIndex),
                                    formula: cellData
                                });
                            }
                        }
                    }
                }
            }
            return {
                oldFormulas: oldFormulas,
                newFormulas: newFormulas
            };
        };
        FlexSheet.prototype._updateColumnFiler = function (srcColIndex, descColIndex) {
            var filterDef = JSON.parse(this._filter.filterDefinition);
            for (var i = 0; i < filterDef.filters.length; i++) {
                var filter = filterDef.filters[i];
                if (filter.columnIndex === srcColIndex) {
                    filter.columnIndex = descColIndex;
                    break;
                }
            }
            this._filter.filterDefinition = JSON.stringify(filterDef);
        };
        FlexSheet.prototype._isDescendant = function (paranet, child) {
            var node = child.parentNode;
            while (node != null) {
                if (node === paranet) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        };
        FlexSheet.prototype._clearCalcEngine = function () {
            this._calcEngine._clearExpressionCache();
        };
        FlexSheet.prototype._getRangeString = function (ranges, sheet, isGetCellValue) {
            if (isGetCellValue === void 0) { isGetCellValue = true; }
            var clipString = '', rowIndex, selIndex, firstRow = true, firstCell, sel, cell, rng;
            if (wjcCore.isArray(ranges) && ranges.length > 1) {
                if (this._isMultipleRowsSelected(ranges, sheet)) {
                    clipString = '';
                    for (selIndex = 0; selIndex < ranges.length; selIndex++) {
                        if (clipString) {
                            clipString += '\n';
                        }
                        clipString += this._getRangeString(ranges[selIndex], sheet);
                    }
                    return clipString;
                }
                else if (this._isMultipleColumnsSelected(ranges, sheet)) {
                    clipString = '';
                    for (rowIndex = 0, firstRow = true; rowIndex < sheet.grid.rows.length; rowIndex++) {
                        if (!firstRow) {
                            clipString += '\n';
                        }
                        firstRow = false;
                        for (selIndex = 0, firstCell = true; selIndex < ranges.length; selIndex++) {
                            sel = ranges[selIndex].clone();
                            sel.row = sel.row2 = rowIndex;
                            if (!firstCell) {
                                clipString += '\t';
                            }
                            firstCell = false;
                            clipString += this._getRangeString(ranges[selIndex], sheet);
                        }
                        return clipString;
                    }
                }
                else {
                    rng = ranges[0];
                    switch (this.selectionMode) {
                        case wjcGrid.SelectionMode.Row:
                        case wjcGrid.SelectionMode.RowRange:
                            rng.col = 0;
                            rng.col2 = sheet.grid.columns.length - 1;
                            return this._getRangeString(rng, sheet);
                        case wjcGrid.SelectionMode.ListBox:
                            rng.col = 0;
                            rng.col2 = sheet.grid.columns.length - 1;
                            for (var i = 0; i < sheet.grid.rows.length; i++) {
                                if (sheet.grid.rows[i].isSelected && sheet.grid.rows[i].isVisible) {
                                    rng.row = rng.row2 = i;
                                    if (clipString)
                                        clipString += '\n';
                                    clipString += this._getRangeString(rng, sheet);
                                }
                            }
                            return clipString;
                    }
                }
            }
            rng = wjcCore.asType(wjcCore.isArray(ranges) ? ranges[0] : ranges, wjcGrid.CellRange);
            for (var r = rng.topRow; r <= rng.bottomRow; r++) {
                if (!(this.rows[r] && this.rows[r].isVisible))
                    continue;
                if (!firstRow)
                    clipString += '\n';
                firstRow = false;
                for (var c = rng.leftCol, firstCell = true; c <= rng.rightCol; c++) {
                    if (!(this.columns[c] && this.columns[c].isVisible))
                        continue;
                    if (!firstCell)
                        clipString += '\t';
                    firstCell = false;
                    if (isGetCellValue) {
                        cell = this.getCellValue(r, c, true, sheet).toString();
                    }
                    else {
                        cell = this.getCellData(r, c, true).toString();
                    }
                    cell = cell.replace(/\t/g, ' ');
                    if (cell.indexOf('\n') > -1) {
                        cell = '"' + cell.replace(/"/g, '""') + '"';
                    }
                    clipString += cell;
                }
            }
            return clipString;
        };
        FlexSheet.prototype._containsRandFormula = function (ranges, sheet) {
            for (var i = 0; i < ranges.length; i++) {
                var rng = ranges[i];
                for (var rowIndex = rng.topRow; rowIndex <= rng.bottomRow; rowIndex++) {
                    for (var colIndex = rng.leftCol; colIndex <= rng.rightCol; colIndex++) {
                        var cellData = sheet.grid.getCellData(rowIndex, colIndex, false);
                        if (wjcCore.isString(cellData) && cellData[0] === '=' && cellData.search(/rand/i) !== -1) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        FlexSheet.prototype._isMultipleRowsSelected = function (ranges, sheet) {
            var sel, selections = ranges || this.selectedSheet.selectionRanges || [this.selection];
            for (var i = 0; i < selections.length; i++) {
                sel = selections[i];
                if (sheet) {
                    if (sel.leftCol !== 0 || sel.rightCol !== sheet.grid.columns.length - 1) {
                        return false;
                    }
                }
                else {
                    if (sel.leftCol !== 0 || sel.rightCol !== this.columns.length - 1) {
                        return false;
                    }
                }
            }
            return true;
        };
        FlexSheet.prototype._isMultipleColumnsSelected = function (ranges, sheet) {
            var sel, selections = ranges || this.selectedSheet.selectionRanges || [this.selection];
            for (var i = 0; i < selections.length; i++) {
                sel = selections[i];
                if (sheet) {
                    if (sel.bottomRow !== sheet.grid.rows.length - 1) {
                        return false;
                    }
                    if (!sheet.grid.itemsSource && sel.topRow !== 0) {
                        return false;
                    }
                    if (!!sheet.grid.itemsSource && sel.topRow !== 1) {
                        return false;
                    }
                }
                else {
                    if (sel.bottomRow !== this.rows.length - 1) {
                        return false;
                    }
                    if (!this.selectedSheet.itemsSource && sel.topRow !== 0) {
                        return false;
                    }
                    if (!!this.selectedSheet.itemsSource && sel.topRow !== 1) {
                        return false;
                    }
                }
            }
            return true;
        };
        FlexSheet.prototype._postSetClipStringProcess = function (cellData, row, col, copiedRow, copiedCol) {
            var megredCell, rowSpan, colSpan, e, pasted = false, match;
            if (copiedRow >= 0 && copiedCol >= 0) {
                megredCell = this.getMergedRange(this.cells, copiedRow, copiedCol);
                if (!!megredCell && megredCell.topRow === copiedRow && megredCell.leftCol === copiedCol) {
                    rowSpan = row + megredCell.rowSpan - 1;
                    rowSpan = rowSpan < this.rows.length ? rowSpan : this.rows.length - 1;
                    colSpan = col + megredCell.columnSpan - 1;
                    colSpan = colSpan < this.columns.length ? colSpan : this.columns.length - 1;
                    this.mergeRange(new wjcGrid.CellRange(row, col, rowSpan, colSpan), true);
                }
            }
            e = new wjcGrid.CellRangeEventArgs(this.cells, new wjcGrid.CellRange(row, col), cellData);
            if (this.onPastingCell(e)) {
                if (this.cells.setCellData(row, col, cellData)) {
                    match = cellData.match(/\n/g);
                    if (match && match.length > 0) {
                        this._applyStyleForCell(row, col, { whiteSpace: 'pre' });
                        this.rows[row].height = this.rows.defaultSize * (match.length + 1);
                    }
                    this.onPastedCell(e);
                    pasted = true;
                }
            }
            return pasted;
        };
        FlexSheet.prototype._delCutData = function () {
            var row, col, bcol, copySel = this._copiedRanges[0], cutSource = this._copiedSheet === this.selectedSheet ? this : this._copiedSheet.grid;
            for (row = copySel.topRow; row <= copySel.bottomRow; row++) {
                for (col = copySel.leftCol; col <= copySel.rightCol; col++) {
                    bcol = cutSource._getBindingColumn(cutSource.cells, row, cutSource.columns[col]);
                    if (bcol.isRequired == false || (bcol.isRequired == null && bcol.dataType == wjcCore.DataType.String)) {
                        if (cutSource.getCellData(row, col, true)) {
                            cutSource.setCellData(row, col, '', true);
                        }
                    }
                }
            }
        };
        FlexSheet.prototype._containsMultiLineText = function (lines) {
            var text;
            for (var i = 0; i < lines.length; i++) {
                text = lines[i];
                if (text.indexOf('\n') >= 0) {
                    return true;
                }
            }
            return false;
        };
        FlexSheet.prototype._sortByRow = function (sel1, sel2) {
            if (sel1.topRow > sel2.topRow) {
                return 1;
            }
            else if (sel1.topRow < sel2.topRow) {
                return -1;
            }
            else {
                return 0;
            }
        };
        FlexSheet.prototype._sortByColumn = function (sel1, sel2) {
            if (sel1.leftCol > sel2.leftCol) {
                return 1;
            }
            else if (sel1.leftCol < sel2.leftCol) {
                return -1;
            }
            else {
                return 0;
            }
        };
        FlexSheet.prototype._setFlexSheetToDirty = function () {
            this.columns._dirty = true;
            this.rows._dirty = true;
            this.rowHeaders.columns._dirty = true;
            this.rowHeaders.rows._dirty = true;
            this.columnHeaders.columns._dirty = true;
            this.columnHeaders.rows._dirty = true;
        };
        FlexSheet.convertNumberToAlpha = function (c) {
            var content = '', dCount, pos;
            if (c >= 0) {
                do {
                    dCount = Math.floor(c / 26);
                    pos = c % 26;
                    content = String.fromCharCode(pos + 65) + content;
                    c = dCount - 1;
                } while (dCount);
            }
            return content;
        };
        FlexSheet.prototype._updateFormulaForReorderingRows = function (srcRow, dstRow) {
            var distance = dstRow - srcRow, cellData, matches, cellRef, updatedCellRef, cellAddress, updatedRow;
            for (var i = 0; i < this.columns.length; i++) {
                cellData = this.getCellData(dstRow, i, false);
                if (!!cellData && typeof cellData === 'string' && cellData[0] === '=') {
                    matches = cellData.match(/(?=\b\D)\$?[A-Za-z]+\$?\d+/g);
                    if (!!matches && matches.length > 0) {
                        for (var cellRefIndex = 0; cellRefIndex < matches.length; cellRefIndex++) {
                            cellRef = matches[cellRefIndex];
                            if (cellRef.toLowerCase() !== 'atan2') {
                                cellAddress = wjcXlsx.Workbook.tableAddress(cellRef);
                                updatedRow = cellAddress.row + distance;
                                if (updatedRow < 0) {
                                    updatedRow = 0;
                                }
                                else if (updatedRow >= this.rows.length) {
                                    updatedRow = this.rows.length - 1;
                                }
                                cellAddress.row = updatedRow;
                                updatedCellRef = wjcXlsx.Workbook.xlsxAddress(cellAddress.row, cellAddress.col, cellAddress.absRow, cellAddress.absCol);
                                cellData = cellData.replace(cellRef, updatedCellRef);
                            }
                        }
                        this.setCellData(dstRow, i, cellData);
                    }
                }
            }
        };
        FlexSheet.prototype._scanFormulas = function () {
            var formulas = [];
            for (var i = 0; i < this.rows.length; i++) {
                for (var j = 0; j < this.columns.length; j++) {
                    var data = this.getCellData(i, j, false);
                    if (data && wjcCore.isString(data) && data[0] === '=') {
                        formulas.push({
                            row: i,
                            column: j,
                            formula: data
                        });
                    }
                }
            }
            return formulas;
        };
        FlexSheet.prototype._resetFormulas = function (formulas) {
            var self = this;
            if (!formulas) {
                return;
            }
            self.deferUpdate(function () {
                for (var i = 0; i < formulas.length; i++) {
                    var item = formulas[i];
                    self.setCellData(item.row, item.column, item.formula);
                }
            });
        };
        FlexSheet.prototype._getCellStyle = function (rowIndex, colIndex, sheet) {
            var sheet = sheet || this.selectedSheet, cellIndex;
            if (!sheet) {
                return null;
            }
            cellIndex = rowIndex * sheet.grid.columns.length + colIndex;
            return sheet._styledCells[cellIndex];
        };
        return FlexSheet;
    }(wjcGrid.FlexGrid));
    FlexSheet.controlTemplate = '<div style="width:100%;height:100%">' +
        '<div wj-part="container" style="width:100%">' +
        wjcGrid.FlexGrid.controlTemplate +
        '</div>' +
        '<div wj-part="tab-holder" style="width:100%; min-width:100px">' +
        '</div>' +
        '<div wj-part="context-menu" style="display:none;z-index:100"></div>' +
        '</div>';
    exports.FlexSheet = FlexSheet;
    var DraggingRowColumnEventArgs = (function (_super) {
        __extends(DraggingRowColumnEventArgs, _super);
        function DraggingRowColumnEventArgs(isDraggingRows, isShiftKey) {
            var _this = _super.call(this) || this;
            _this._isDraggingRows = isDraggingRows;
            _this._isShiftKey = isShiftKey;
            return _this;
        }
        Object.defineProperty(DraggingRowColumnEventArgs.prototype, "isDraggingRows", {
            get: function () {
                return this._isDraggingRows;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DraggingRowColumnEventArgs.prototype, "isShiftKey", {
            get: function () {
                return this._isShiftKey;
            },
            enumerable: true,
            configurable: true
        });
        return DraggingRowColumnEventArgs;
    }(wjcCore.EventArgs));
    exports.DraggingRowColumnEventArgs = DraggingRowColumnEventArgs;
    var UnknownFunctionEventArgs = (function (_super) {
        __extends(UnknownFunctionEventArgs, _super);
        function UnknownFunctionEventArgs(funcName, params) {
            var _this = _super.call(this) || this;
            _this._funcName = funcName;
            _this._params = params;
            return _this;
        }
        Object.defineProperty(UnknownFunctionEventArgs.prototype, "funcName", {
            get: function () {
                return this._funcName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UnknownFunctionEventArgs.prototype, "params", {
            get: function () {
                return this._params;
            },
            enumerable: true,
            configurable: true
        });
        return UnknownFunctionEventArgs;
    }(wjcCore.EventArgs));
    exports.UnknownFunctionEventArgs = UnknownFunctionEventArgs;
    var RowColumnChangedEventArgs = (function (_super) {
        __extends(RowColumnChangedEventArgs, _super);
        function RowColumnChangedEventArgs(index, count, added) {
            var _this = _super.call(this) || this;
            _this._index = index;
            _this._count = count;
            _this._added = added;
            return _this;
        }
        Object.defineProperty(RowColumnChangedEventArgs.prototype, "index", {
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RowColumnChangedEventArgs.prototype, "count", {
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RowColumnChangedEventArgs.prototype, "added", {
            get: function () {
                return this._added;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RowColumnChangedEventArgs.prototype, "isAdd", {
            get: function () {
                wjcCore._deprecated('RowColumnChangedEventArgs.isAdd', 'RowColumnChangedEventArgs.added');
                return this._added;
            },
            enumerable: true,
            configurable: true
        });
        return RowColumnChangedEventArgs;
    }(wjcCore.EventArgs));
    exports.RowColumnChangedEventArgs = RowColumnChangedEventArgs;
    var FlexSheetPanel = (function (_super) {
        __extends(FlexSheetPanel, _super);
        function FlexSheetPanel(grid, cellType, rows, cols, element) {
            return _super.call(this, grid, cellType, rows, cols, element) || this;
        }
        FlexSheetPanel.prototype.getSelectedState = function (r, c, rng) {
            var selections, selectionCnt, index, selection, selectedState, mergedRange;
            if (!this.grid) {
                return undefined;
            }
            mergedRange = this.grid.getMergedRange(this, r, c);
            selections = this.grid.selectedSheet ? this.grid.selectedSheet.selectionRanges : null;
            selectedState = _super.prototype.getSelectedState.call(this, r, c, rng);
            selectionCnt = selections ? selections.length : 0;
            if (selectedState === wjcGrid.SelectedState.None && selectionCnt > 0 && this.grid._enableMulSel) {
                for (index = 0; index < selections.length; index++) {
                    selection = selections[index];
                    if (selection && selection instanceof wjcGrid.CellRange) {
                        if (this.cellType === wjcGrid.CellType.Cell) {
                            if (mergedRange) {
                                if (mergedRange.contains(selection.row, selection.col)) {
                                    if (index === selectionCnt - 1 && !this.grid._isClicking) {
                                        return this.grid.showMarquee ? wjcGrid.SelectedState.None : wjcGrid.SelectedState.Cursor;
                                    }
                                    return wjcGrid.SelectedState.Selected;
                                }
                                if (mergedRange.intersects(selection)) {
                                    return wjcGrid.SelectedState.Selected;
                                }
                            }
                            if (selection.row === r && selection.col === c) {
                                if (index === selectionCnt - 1 && !this.grid._isClicking) {
                                    return this.grid.showMarquee ? wjcGrid.SelectedState.None : wjcGrid.SelectedState.Cursor;
                                }
                                return wjcGrid.SelectedState.Selected;
                            }
                            if (selection.contains(r, c)) {
                                return wjcGrid.SelectedState.Selected;
                            }
                        }
                        if (this.grid.showSelectedHeaders & wjcGrid.HeadersVisibility.Row
                            && this.cellType === wjcGrid.CellType.RowHeader
                            && selection.containsRow(r)) {
                            return wjcGrid.SelectedState.Selected;
                        }
                        if (this.grid.showSelectedHeaders & wjcGrid.HeadersVisibility.Column
                            && this.cellType === wjcGrid.CellType.ColumnHeader
                            && selection.containsColumn(c)) {
                            return wjcGrid.SelectedState.Selected;
                        }
                    }
                }
            }
            return selectedState;
        };
        FlexSheetPanel.prototype.getCellData = function (r, c, formatted) {
            var value = _super.prototype.getCellData.call(this, r, c, formatted), col = this.columns[wjcCore.asNumber(c, false, true)], bcol = this.grid ? this.grid._getBindingColumn(this, r, col) : col, cellStyle, data;
            if (formatted) {
                data = _super.prototype.getCellData.call(this, r, c, false);
                cellStyle = this.grid ? this.grid._getCellStyle(r, c) : null;
                if (wjcCore.isNumber(data) && data !== 0 && !!bcol && !bcol.format && !bcol.dataMap && !cellStyle) {
                    value = data;
                }
            }
            return value;
        };
        FlexSheetPanel.prototype.setCellData = function (r, c, value, coerce) {
            if (coerce === void 0) { coerce = true; }
            var parsedDateVal, orgVal = this.getCellData(r, c, false);
            if (coerce && value && wjcCore.isString(value)) {
                if (this.grid.columns[c].dataType !== wjcCore.DataType.String && !wjcCore.isNullOrWhiteSpace(value) && !isNaN(+value)) {
                    value = +value;
                }
                else if (value[0] !== '=') {
                    parsedDateVal = wjcCore.Globalize.parseDate(value, '');
                    if (parsedDateVal) {
                        value = parsedDateVal;
                    }
                }
            }
            if ((value && wjcCore.isString(value) && value[0] === '=') || orgVal === '') {
                coerce = false;
            }
            return _super.prototype.setCellData.call(this, r, c, value, coerce);
        };
        FlexSheetPanel.prototype._renderCell = function (r, c, vrng, state, ctr) {
            var cell = this.hostElement.childNodes[ctr], cellStyle, cellIndex = r * this.grid.columns.length + c, mr = this.grid.getMergedRange(this, r, c);
            ctr = _super.prototype._renderCell.call(this, r, c, vrng, state, ctr);
            if (this.cellType !== wjcGrid.CellType.Cell) {
                return ctr;
            }
            if (mr) {
                if (cellIndex > mr.topRow * this.grid.columns.length + mr.leftCol) {
                    return ctr;
                }
            }
            if (wjcCore.hasClass(cell, 'wj-state-selected') || wjcCore.hasClass(cell, 'wj-state-multi-selected')) {
                cell.style.backgroundColor = '';
                cell.style.color = '';
            }
            else if (this.grid.selectedSheet) {
                cellStyle = this.grid.selectedSheet._styledCells[cellIndex];
                if (cell && cellStyle) {
                    cell.style.backgroundColor = cellStyle.backgroundColor;
                    cell.style.color = cellStyle.color;
                }
            }
            return ctr;
        };
        return FlexSheetPanel;
    }(wjcGrid.GridPanel));
    exports.FlexSheetPanel = FlexSheetPanel;
    var HeaderRow = (function (_super) {
        __extends(HeaderRow, _super);
        function HeaderRow() {
            var _this = _super.call(this) || this;
            _this.isReadOnly = true;
            return _this;
        }
        return HeaderRow;
    }(wjcGrid.Row));
    exports.HeaderRow = HeaderRow;
    'use strict';
    var Sheet = (function () {
        function Sheet(owner, grid, sheetName, rows, cols) {
            this._visible = true;
            this._unboundSortDesc = new wjcCore.ObservableArray();
            this._currentStyledCells = {};
            this._currentMergedRanges = {};
            this._isEmptyGrid = false;
            this._rowSettings = [];
            this._scrollPosition = new wjcCore.Point();
            this._freezeHiddenRowCnt = 0;
            this._freezeHiddenColumnCnt = 0;
            this.nameChanged = new wjcCore.Event();
            this.visibleChanged = new wjcCore.Event();
            var self = this, insertRows, insertCols, i;
            self._owner = owner;
            self._name = sheetName;
            if (wjcCore.isNumber(rows) && !isNaN(rows) && rows >= 0) {
                self._rowCount = rows;
            }
            else {
                self._rowCount = 200;
            }
            if (wjcCore.isNumber(cols) && !isNaN(cols) && cols >= 0) {
                self._columnCount = cols;
            }
            else {
                self._columnCount = 20;
            }
            self._grid = grid || this._createGrid();
            self._grid.itemsSourceChanged.addHandler(this._gridItemsSourceChanged, this);
            self._addHeaderRow();
            self._unboundSortDesc.collectionChanged.addHandler(function () {
                var arr = self._unboundSortDesc, i, sd, row;
                for (i = 0; i < arr.length; i++) {
                    sd = wjcCore.tryCast(arr[i], _UnboundSortDescription);
                    if (!sd) {
                        throw 'sortDescriptions array must contain SortDescription objects.';
                    }
                }
                if (self._owner) {
                    self._owner.rows.beginUpdate();
                    self._owner.rows.sort(self._compareRows());
                    if (!self._owner._isUndoing) {
                        for (i = 0; i < self._owner.rows.length; i++) {
                            row = self._owner.rows[i];
                            if (i !== row._idx) {
                                self._owner._updateFormulaForReorderingRows(row._idx, i);
                            }
                        }
                    }
                    self._owner.rows.endUpdate();
                    self._owner.rows._dirty = true;
                    self._owner.rows._update();
                    if (self._owner.selectedSheet) {
                        self._owner._copyTo(self._owner.selectedSheet);
                        self._owner._copyFrom(self._owner.selectedSheet);
                    }
                }
            });
        }
        Object.defineProperty(Sheet.prototype, "grid", {
            get: function () {
                if (this._grid['wj_sheetInfo'] == null) {
                    this._grid['wj_sheetInfo'] = {};
                }
                return this._grid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sheet.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                if (!wjcCore.isNullOrWhiteSpace(value) && ((this._name && this._name.toLowerCase() !== value.toLowerCase()) || !this._name)) {
                    this._name = value;
                    this.grid['wj_sheetInfo'].name = value;
                    this.onNameChanged(new wjcCore.EventArgs());
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sheet.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                if (this._visible !== value) {
                    this._visible = value;
                    this.grid['wj_sheetInfo'].visible = value;
                    this.onVisibleChanged(new wjcCore.EventArgs());
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sheet.prototype, "rowCount", {
            get: function () {
                if (this._grid != null) {
                    return this._grid.rows.length;
                }
                return 0;
            },
            set: function (value) {
                var rowIndex;
                if (!!this.itemsSource) {
                    return;
                }
                if (wjcCore.isNumber(value) && !isNaN(value) && value >= 0 && this._rowCount !== value) {
                    if (this._rowCount < value) {
                        for (rowIndex = 0; rowIndex < (value - this._rowCount); rowIndex++) {
                            this.grid.rows.push(new wjcGrid.Row());
                        }
                    }
                    else {
                        this.grid.rows.splice(value, this._rowCount - value);
                    }
                    this._rowCount = value;
                    if (this._owner && this._owner.selectedSheet && this._name === this._owner.selectedSheet.name) {
                        this._owner._copyFrom(this, true);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sheet.prototype, "columnCount", {
            get: function () {
                if (this._grid != null) {
                    return this._grid.columns.length;
                }
                return 0;
            },
            set: function (value) {
                var colIndex;
                if (!!this.itemsSource) {
                    return;
                }
                if (wjcCore.isNumber(value) && !isNaN(value) && value >= 0 && this._columnCount !== value) {
                    if (this._columnCount < value) {
                        for (colIndex = 0; colIndex < (value - this._columnCount); colIndex++) {
                            this._grid.columns.push(new wjcGrid.Column());
                        }
                    }
                    else {
                        this._grid.columns.splice(value, this._columnCount - value);
                    }
                    this._columnCount = value;
                    if (this._owner && this._owner.selectedSheet && this._name === this._owner.selectedSheet.name) {
                        this._owner._copyFrom(this, true);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sheet.prototype, "selectionRanges", {
            get: function () {
                var _this = this;
                if (!this._selectionRanges) {
                    this._selectionRanges = new wjcCore.ObservableArray();
                    this._selectionRanges.collectionChanged.addHandler(function () {
                        var selectionCnt, lastSelection;
                        if (_this._owner && !_this._owner._isClicking) {
                            selectionCnt = _this._selectionRanges.length;
                            if (selectionCnt > 0) {
                                lastSelection = _this._selectionRanges[selectionCnt - 1];
                                if (lastSelection && lastSelection instanceof wjcGrid.CellRange) {
                                    _this._owner.selection = lastSelection;
                                }
                            }
                            if (selectionCnt > 1) {
                                _this._owner._enableMulSel = true;
                            }
                            _this._owner.refresh();
                            _this._owner._enableMulSel = false;
                        }
                    }, this);
                }
                return this._selectionRanges;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sheet.prototype, "itemsSource", {
            get: function () {
                if (this._grid != null) {
                    return this._grid.itemsSource;
                }
                return null;
            },
            set: function (value) {
                var self = this;
                if (self._grid == null) {
                    self._createGrid();
                    self._grid.itemsSourceChanged.addHandler(self._gridItemsSourceChanged, self);
                }
                if (self._isEmptyGrid) {
                    self._clearGrid();
                }
                self._grid.loadedRows.addHandler(function () {
                    self._addHeaderRow();
                });
                self._grid.itemsSource = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sheet.prototype, "_styledCells", {
            get: function () {
                if (!this._currentStyledCells) {
                    this._currentStyledCells = {};
                }
                return this._currentStyledCells;
            },
            set: function (value) {
                this._currentStyledCells = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sheet.prototype, "_mergedRanges", {
            get: function () {
                if (!this._currentMergedRanges) {
                    this._currentMergedRanges = {};
                }
                return this._currentMergedRanges;
            },
            set: function (value) {
                this._currentMergedRanges = value;
            },
            enumerable: true,
            configurable: true
        });
        Sheet.prototype.onNameChanged = function (e) {
            this.nameChanged.raise(this, e);
        };
        Sheet.prototype.onVisibleChanged = function (e) {
            this.visibleChanged.raise(this, e);
        };
        Sheet.prototype.getCellStyle = function (rowIndex, columnIndex) {
            var cellIndex, rowCnt = this._grid.rows.length, colCnt = this._grid.columns.length;
            if (rowIndex >= rowCnt || columnIndex >= colCnt) {
                return null;
            }
            cellIndex = rowIndex * colCnt + columnIndex;
            return this._styledCells[cellIndex];
        };
        Sheet.prototype._attachOwner = function (owner) {
            if (this._owner !== owner) {
                this._owner = owner;
            }
        };
        Sheet.prototype._setValidName = function (validName) {
            this._name = validName;
            this.grid['wj_sheetInfo'].name = validName;
        };
        Sheet.prototype._storeRowSettings = function () {
            var rowIdx = 0, row;
            this._rowSettings = [];
            for (; rowIdx < this._grid.rows.length; rowIdx++) {
                row = this._owner.rows[rowIdx];
                if (row) {
                    this._rowSettings[rowIdx] = {
                        height: row.height,
                        isCollapsed: row instanceof wjcGrid.GroupRow ? row.isCollapsed : null
                    };
                }
            }
        };
        Sheet.prototype._setRowSettings = function () {
            var rowIdx = 0, rowSettings;
            for (; rowIdx < this._rowSettings.length; rowIdx++) {
                rowSettings = this._rowSettings[rowIdx];
                if (rowSettings) {
                    this._grid.rows[rowIdx].height = rowSettings.height;
                }
            }
        };
        Sheet.prototype._compareRows = function () {
            var self = this, sortDesc = this._unboundSortDesc;
            return function (a, b) {
                for (var i = 0; i < sortDesc.length; i++) {
                    var sd = sortDesc[i], v1 = a._ubv ? a._ubv[sd.column._hash] : '', v2 = b._ubv ? b._ubv[sd.column._hash] : '';
                    if (wjcCore.isString(v1) && v1[0] === '=') {
                        v1 = self._owner.evaluate(v1);
                        if (!wjcCore.isPrimitive(v1)) {
                            v1 = v1.value;
                        }
                    }
                    if (wjcCore.isString(v2) && v2[0] === '=') {
                        v2 = self._owner.evaluate(v2);
                        if (!wjcCore.isPrimitive(v2)) {
                            v2 = v2.value;
                        }
                    }
                    if (v1 !== v1)
                        v1 = null;
                    if (v2 !== v2)
                        v2 = null;
                    if (wjcCore.isString(v1))
                        v1 = v1.toLowerCase() + v1;
                    if (wjcCore.isString(v2))
                        v2 = v2.toLowerCase() + v2;
                    if (v1 === '' || v1 == null) {
                        return 1;
                    }
                    if (v2 === '' || v2 == null) {
                        return -1;
                    }
                    var cmp = (v1 < v2) ? -1 : (v1 > v2) ? +1 : 0;
                    if (wjcCore.isString(v1) && wjcCore.isNumber(v2)) {
                        cmp = 1;
                    }
                    if (wjcCore.isString(v2) && wjcCore.isNumber(v1)) {
                        cmp = -1;
                    }
                    if (cmp !== 0) {
                        return sd.ascending ? +cmp : -cmp;
                    }
                }
                return 0;
            };
        };
        Sheet.prototype._createGrid = function () {
            var hostElement = document.createElement('div'), grid, column, colIndex, rowIndex;
            this._isEmptyGrid = true;
            hostElement.style.visibility = 'hidden';
            document.body.appendChild(hostElement);
            grid = new wjcGrid.FlexGrid(hostElement);
            document.body.removeChild(hostElement);
            for (rowIndex = 0; rowIndex < this._rowCount; rowIndex++) {
                grid.rows.push(new wjcGrid.Row());
            }
            for (colIndex = 0; colIndex < this._columnCount; colIndex++) {
                column = new wjcGrid.Column();
                column.isRequired = false;
                grid.columns.push(column);
            }
            grid['wj_sheetInfo'] = {
                name: this.name,
                visible: this.visible,
                styledCells: this._styledCells,
                mergedRanges: this._mergedRanges
            };
            return grid;
        };
        Sheet.prototype._clearGrid = function () {
            this._grid.rows.clear();
            this._grid.columns.clear();
            this._grid.columnHeaders.columns.clear();
            this._grid.rowHeaders.rows.clear();
        };
        Sheet.prototype._gridItemsSourceChanged = function () {
            var self = this;
            if (self._owner && self._owner.selectedSheet && self._name === self._owner.selectedSheet.name) {
                self._owner._filter.clear();
                self._owner._copyFrom(self, false);
                setTimeout(function () {
                    self._owner._setFlexSheetToDirty();
                    self._owner.invalidate();
                }, 10);
            }
        };
        Sheet.prototype._addHeaderRow = function () {
            var row, col;
            if (this._grid.itemsSource && !(this._grid.rows[0] instanceof HeaderRow)) {
                var row = new HeaderRow(), col;
                for (var i = 0; i < this._grid.columns.length; i++) {
                    col = this._grid.columns[i];
                    if (!row._ubv) {
                        row._ubv = {};
                    }
                    row._ubv[col._hash] = col.header;
                }
                this._grid.rows.insert(0, row);
            }
        };
        return Sheet;
    }());
    exports.Sheet = Sheet;
    var SheetCollection = (function (_super) {
        __extends(SheetCollection, _super);
        function SheetCollection() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._current = -1;
            _this.sheetCleared = new wjcCore.Event();
            _this.selectedSheetChanged = new wjcCore.Event();
            _this.sheetNameChanged = new wjcCore.Event();
            _this.sheetVisibleChanged = new wjcCore.Event();
            return _this;
        }
        SheetCollection.prototype.onSheetCleared = function () {
            this.sheetCleared.raise(this, new wjcCore.EventArgs());
        };
        Object.defineProperty(SheetCollection.prototype, "selectedIndex", {
            get: function () {
                return this._current;
            },
            set: function (index) {
                this._moveCurrentTo(+index);
            },
            enumerable: true,
            configurable: true
        });
        SheetCollection.prototype.onSelectedSheetChanged = function (e) {
            this.selectedSheetChanged.raise(this, e);
        };
        SheetCollection.prototype.insert = function (index, item) {
            var name;
            name = item.name ? this.getValidSheetName(item) : this._getUniqueName();
            if (name !== item.name) {
                item.name = name;
            }
            _super.prototype.insert.call(this, index, item);
            this._postprocessSheet(item);
        };
        SheetCollection.prototype.push = function () {
            var item = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                item[_i] = arguments[_i];
            }
            var currentLength = this.length, idx = 0, name;
            for (; idx < item.length; idx++) {
                name = item[idx].name ? this.getValidSheetName(item[idx]) : this._getUniqueName();
                if (name !== item[idx].name) {
                    item[idx].name = name;
                }
                _super.prototype.push.call(this, item[idx]);
                this._postprocessSheet(item[idx]);
            }
            return this.length;
        };
        SheetCollection.prototype.splice = function (index, count, item) {
            var name;
            if (item) {
                name = item.name ? this.getValidSheetName(item) : this._getUniqueName();
                if (name !== item.name) {
                    item.name = name;
                }
                this._postprocessSheet(item);
                return _super.prototype.splice.call(this, index, count, item);
            }
            else {
                return _super.prototype.splice.call(this, index, count, item);
            }
        };
        SheetCollection.prototype.removeAt = function (index) {
            var succeeded = this.hide(index);
            if (succeeded) {
                _super.prototype.removeAt.call(this, index);
                if (index < this.selectedIndex) {
                    this._current -= 1;
                }
            }
        };
        SheetCollection.prototype.onSheetNameChanged = function (e) {
            this.sheetNameChanged.raise(this, e);
        };
        SheetCollection.prototype.onSheetVisibleChanged = function (e) {
            this.sheetVisibleChanged.raise(this, e);
        };
        SheetCollection.prototype.selectFirst = function () {
            return this._moveCurrentTo(0);
        };
        SheetCollection.prototype.selectLast = function () {
            return this._moveCurrentTo(this.length - 1);
        };
        SheetCollection.prototype.selectPrevious = function () {
            return this._moveCurrentTo(this._current - 1);
        };
        SheetCollection.prototype.selectNext = function () {
            return this._moveCurrentTo(this._current + 1);
        };
        SheetCollection.prototype.hide = function (pos) {
            var succeeded = false;
            if (pos < 0 && pos >= this.length) {
                return false;
            }
            if (!this[pos].visible) {
                return false;
            }
            this[pos].visible = false;
            return true;
        };
        SheetCollection.prototype.show = function (pos) {
            var succeeded = false;
            if (pos < 0 && pos >= this.length) {
                return false;
            }
            this[pos].visible = true;
            this._moveCurrentTo(pos);
            return true;
        };
        SheetCollection.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this._current = -1;
            this.onSheetCleared();
        };
        SheetCollection.prototype.isValidSheetName = function (sheet) {
            var sheetIndex = this._getSheetIndexFrom(sheet.name), currentSheetIndex = this.indexOf(sheet);
            return (sheetIndex === -1 || sheetIndex === currentSheetIndex);
        };
        SheetCollection.prototype.getValidSheetName = function (currentSheet) {
            var validName = currentSheet.name, index = 1, currentSheetIndex = this.indexOf(currentSheet), sheetIndex;
            do {
                sheetIndex = this._getSheetIndexFrom(validName);
                if (sheetIndex === -1 || sheetIndex === currentSheetIndex) {
                    break;
                }
                else {
                    validName = currentSheet.name.concat((index + 1).toString());
                }
                index = index + 1;
            } while (true);
            return validName;
        };
        SheetCollection.prototype._moveCurrentTo = function (pos) {
            var searchedPos = pos, e;
            if (pos < 0 || pos >= this.length) {
                return false;
            }
            if (this._current < searchedPos || searchedPos === 0) {
                while (searchedPos < this.length && !this[searchedPos].visible) {
                    searchedPos++;
                }
            }
            else if (this._current > searchedPos) {
                while (searchedPos >= 0 && !this[searchedPos].visible) {
                    searchedPos--;
                }
            }
            if (searchedPos === this.length) {
                searchedPos = pos;
                while (searchedPos >= 0 && !this[searchedPos].visible) {
                    searchedPos--;
                }
            }
            if (searchedPos < 0) {
                return false;
            }
            if (searchedPos !== this._current) {
                e = new wjcCore.PropertyChangedEventArgs('sheetIndex', this._current, searchedPos);
                this._current = searchedPos;
                this.onSelectedSheetChanged(e);
            }
            return true;
        };
        SheetCollection.prototype._getSheetIndexFrom = function (sheetName) {
            var result = -1, sheet, name;
            if (!sheetName) {
                return result;
            }
            sheetName = sheetName.toLowerCase();
            for (var i = 0; i < this.length; i++) {
                sheet = this[i];
                name = sheet.name ? sheet.name.toLowerCase() : '';
                if (name === sheetName) {
                    return i;
                }
            }
            return result;
        };
        SheetCollection.prototype._postprocessSheet = function (item) {
            var self = this;
            item.nameChanged.addHandler(function () {
                var e, index = self._getSheetIndexFrom(item.name);
                if (!self.isValidSheetName(item)) {
                    item._setValidName(self.getValidSheetName(item));
                }
                e = new wjcCore.NotifyCollectionChangedEventArgs(wjcCore.NotifyCollectionChangedAction.Change, item, wjcCore.isNumber(index) ? index : self.length - 1);
                self.onSheetNameChanged(e);
            });
            item.visibleChanged.addHandler(function () {
                var index = self._getSheetIndexFrom(item.name), e = new wjcCore.NotifyCollectionChangedEventArgs(wjcCore.NotifyCollectionChangedAction.Change, item, wjcCore.isNumber(index) ? index : self.length - 1);
                self.onSheetVisibleChanged(e);
            });
        };
        SheetCollection.prototype._getUniqueName = function () {
            var validName = 'Sheet1', index = 0;
            do {
                if (this._getSheetIndexFrom(validName) === -1) {
                    break;
                }
                else {
                    validName = 'Sheet'.concat((index + 1).toString());
                }
                index = index + 1;
            } while (true);
            return validName;
        };
        return SheetCollection;
    }(wjcCore.ObservableArray));
    exports.SheetCollection = SheetCollection;
    var _SheetTabs = (function (_super) {
        __extends(_SheetTabs, _super);
        function _SheetTabs(element, owner, options) {
            var _this = _super.call(this, element, options) || this;
            _this._rtl = false;
            _this._sheetTabClicked = false;
            var self = _this;
            self._owner = owner;
            self._sheets = owner.sheets;
            self._rtl = getComputedStyle(self._owner.hostElement).direction == 'rtl';
            if (self.hostElement.attributes['tabindex']) {
                self.hostElement.attributes.removeNamedItem('tabindex');
            }
            self._initControl();
            self.deferUpdate(function () {
                if (options) {
                    self.initialize(options);
                }
            });
            return _this;
        }
        _SheetTabs.prototype.refresh = function (fullUpdate) {
            this._tabContainer.innerHTML = '';
            this._tabContainer.innerHTML = this._getSheetTabs();
            if (this._rtl) {
                this._adjustSheetsPosition();
            }
            this._adjustSize();
        };
        _SheetTabs.prototype._sourceChanged = function (sender, e) {
            if (e === void 0) { e = wjcCore.NotifyCollectionChangedEventArgs.reset; }
            var eArgs = e, index;
            switch (eArgs.action) {
                case wjcCore.NotifyCollectionChangedAction.Add:
                    index = eArgs.index - 1;
                    if (index < 0) {
                        index = 0;
                    }
                    this._tabContainer.innerHTML = '';
                    this._tabContainer.innerHTML = this._getSheetTabs();
                    if (this._rtl) {
                        this._adjustSheetsPosition();
                    }
                    this._adjustSize();
                    break;
                case wjcCore.NotifyCollectionChangedAction.Remove:
                    this._tabContainer.removeChild(this._tabContainer.children[eArgs.index]);
                    if (this._tabContainer.hasChildNodes()) {
                        this._updateTabActive(eArgs.index, true);
                    }
                    this._adjustSize();
                    break;
                default:
                    this.invalidate();
                    break;
            }
        };
        _SheetTabs.prototype._selectedSheetChanged = function (sender, e) {
            this._updateTabActive(e.oldValue, false);
            this._updateTabActive(e.newValue, true);
            if (this._sheetTabClicked) {
                this._sheetTabClicked = false;
            }
            else {
                this._scrollToActiveSheet(e.newValue, e.oldValue);
            }
            this._adjustSize();
        };
        _SheetTabs.prototype._initControl = function () {
            var self = this;
            self.applyTemplate('', self.getTemplate(), {
                _sheetContainer: 'sheet-container',
                _tabContainer: 'container',
                _sheetPage: 'sheet-page',
                _newSheet: 'new-sheet'
            });
            if (self._rtl) {
                self._sheetPage.style.right = '0px';
                self._tabContainer.parentElement.style.right = self._sheetPage.clientWidth + 'px';
                self._tabContainer.style.right = '0px';
                self._tabContainer.style.cssFloat = 'right';
                self._newSheet.style.right = (self._sheetPage.clientWidth + self._tabContainer.parentElement.clientWidth) + 'px';
            }
            self._adjustNavigationButtons(self._rtl);
            self.addEventListener(self._newSheet, 'click', function (evt) {
                var oldIndex = self._owner.selectedSheetIndex;
                self._owner.addUnboundSheet();
                self._scrollToActiveSheet(self._owner.selectedSheetIndex, oldIndex);
            });
            self._sheets.collectionChanged.addHandler(self._sourceChanged, self);
            self._sheets.selectedSheetChanged.addHandler(self._selectedSheetChanged, self);
            self._sheets.sheetNameChanged.addHandler(self._updateSheetName, self);
            self._sheets.sheetVisibleChanged.addHandler(self._updateTabShown, self);
            self._initSheetPage();
            self._initSheetTab();
        };
        _SheetTabs.prototype._initSheetTab = function () {
            var self = this;
            self.addEventListener(self._tabContainer, 'mousedown', function (evt) {
                var li = evt.target, idx;
                if (li instanceof HTMLLIElement) {
                    self._sheetTabClicked = true;
                    idx = self._getItemIndex(self._tabContainer, li);
                    self._scrollSheetTabContainer(li);
                    if (idx > -1) {
                        self._sheets.selectedIndex = idx;
                    }
                }
            });
        };
        _SheetTabs.prototype._initSheetPage = function () {
            var self = this;
            self.hostElement.querySelector('div.wj-sheet-page').addEventListener('click', function (e) {
                var btn = e.target.toString() === '[object HTMLButtonElement]' ? e.target : e.target.parentElement, index = self._getItemIndex(self._sheetPage, btn), currentSheetTab;
                if (self._sheets.length === 0) {
                    return;
                }
                switch (index) {
                    case 0:
                        self._sheets.selectFirst();
                        break;
                    case 1:
                        self._sheets.selectPrevious();
                        break;
                    case 2:
                        self._sheets.selectNext();
                        break;
                    case 3:
                        self._sheets.selectLast();
                        break;
                }
            });
        };
        _SheetTabs.prototype._getSheetTabs = function () {
            var html = '', i;
            for (i = 0; i < this._sheets.length; i++) {
                html += this._getSheetElement(this._sheets[i], this._sheets.selectedIndex === i);
            }
            return html;
        };
        _SheetTabs.prototype._getSheetElement = function (sheetItem, isActive) {
            if (isActive === void 0) { isActive = false; }
            var result = '<li';
            if (!sheetItem.visible) {
                result += ' class="hidden"';
            }
            else if (isActive) {
                result += ' class="active"';
            }
            result += '>' + sheetItem.name + '</li>';
            return result;
        };
        _SheetTabs.prototype._updateTabActive = function (pos, active) {
            if (pos < 0 || pos >= this._tabContainer.children.length) {
                return;
            }
            if (active) {
                wjcCore.addClass(this._tabContainer.children[pos], 'active');
            }
            else {
                wjcCore.removeClass(this._tabContainer.children[pos], 'active');
            }
        };
        _SheetTabs.prototype._updateTabShown = function (sender, e) {
            if (e.index < 0 || e.index >= this._tabContainer.children.length) {
                return;
            }
            if (!e.item.visible) {
                wjcCore.addClass(this._tabContainer.children[e.index], 'hidden');
            }
            else {
                wjcCore.removeClass(this._tabContainer.children[e.index], 'hidden');
            }
            this._adjustSize();
        };
        _SheetTabs.prototype._adjustSize = function () {
            var sheetCount = this._tabContainer.childElementCount, index, containerMaxWidth, width = 0, scrollLeft = 0;
            if (this.hostElement.style.display === 'none') {
                return;
            }
            scrollLeft = this._tabContainer.parentElement.scrollLeft;
            this._tabContainer.parentElement.style.width = '';
            this._tabContainer.style.width = '';
            this._sheetPage.parentElement.style.width = '';
            for (index = 0; index < sheetCount; index++) {
                width += this._tabContainer.children[index].offsetWidth + 1;
            }
            containerMaxWidth = this.hostElement.offsetWidth - this._sheetPage.offsetWidth - this._newSheet.offsetWidth - 2;
            this._tabContainer.parentElement.style.width = (width > containerMaxWidth ? containerMaxWidth : width) + 'px';
            this._tabContainer.style.width = width + 'px';
            this._sheetPage.parentElement.style.width = this._sheetPage.offsetWidth + this._newSheet.offsetWidth + this._tabContainer.parentElement.offsetWidth + 3 + 'px';
            this._tabContainer.parentElement.scrollLeft = scrollLeft;
        };
        _SheetTabs.prototype._getItemIndex = function (container, item) {
            var idx = 0;
            for (; idx < container.children.length; idx++) {
                if (container.children[idx] === item) {
                    return idx;
                }
            }
            return -1;
        };
        _SheetTabs.prototype._updateSheetName = function (sender, e) {
            this._tabContainer.querySelectorAll('li')[e.index].textContent = e.item.name;
            this._adjustSize();
        };
        _SheetTabs.prototype._scrollSheetTabContainer = function (currentSheetTab) {
            var scrollLeft = this._tabContainer.parentElement.scrollLeft, sheetPageSize = this._sheetPage.offsetWidth, newSheetSize = this._newSheet.offsetWidth, containerSize = this._tabContainer.parentElement.offsetWidth, containerOffset;
            if (this._rtl) {
                switch (wjcGrid.FlexGrid['_getRtlMode']()) {
                    case 'rev':
                        containerOffset = -this._tabContainer.offsetLeft;
                        if (containerOffset + currentSheetTab.offsetLeft + currentSheetTab.offsetWidth > containerSize + scrollLeft) {
                            this._tabContainer.parentElement.scrollLeft += currentSheetTab.offsetWidth;
                        }
                        else if (containerOffset + currentSheetTab.offsetLeft < scrollLeft) {
                            this._tabContainer.parentElement.scrollLeft -= currentSheetTab.offsetWidth;
                        }
                        break;
                    case 'neg':
                        if (currentSheetTab.offsetLeft < scrollLeft) {
                            this._tabContainer.parentElement.scrollLeft -= currentSheetTab.offsetWidth;
                        }
                        else if (currentSheetTab.offsetLeft + currentSheetTab.offsetWidth > containerSize + scrollLeft) {
                            this._tabContainer.parentElement.scrollLeft += currentSheetTab.offsetWidth;
                        }
                        break;
                    default:
                        if (currentSheetTab.offsetLeft - newSheetSize + scrollLeft < 0) {
                            this._tabContainer.parentElement.scrollLeft += currentSheetTab.offsetWidth;
                        }
                        else if (currentSheetTab.offsetLeft + currentSheetTab.offsetWidth - newSheetSize + scrollLeft > containerSize) {
                            this._tabContainer.parentElement.scrollLeft -= currentSheetTab.offsetWidth;
                        }
                        break;
                }
            }
            else {
                if (currentSheetTab.offsetLeft + currentSheetTab.offsetWidth - sheetPageSize > containerSize + scrollLeft) {
                    this._tabContainer.parentElement.scrollLeft += currentSheetTab.offsetWidth;
                }
                else if (currentSheetTab.offsetLeft - sheetPageSize < scrollLeft) {
                    this._tabContainer.parentElement.scrollLeft -= currentSheetTab.offsetWidth;
                }
            }
        };
        _SheetTabs.prototype._adjustSheetsPosition = function () {
            var sheets = this._tabContainer.querySelectorAll('li'), position = 0, sheet, index;
            for (index = 0; index < sheets.length; index++) {
                sheet = sheets[index];
                sheet.style.cssFloat = 'right';
                sheet.style.right = position + 'px';
                position += sheets[index].clientWidth;
            }
        };
        _SheetTabs.prototype._scrollToActiveSheet = function (newIndex, oldIndex) {
            var sheets = this._tabContainer.querySelectorAll('li'), activeSheet, scrollLeft, i;
            if (this._tabContainer.clientWidth > this._tabContainer.parentElement.clientWidth) {
                scrollLeft = this._tabContainer.clientWidth - this._tabContainer.parentElement.clientWidth;
            }
            else {
                scrollLeft = 0;
            }
            if (sheets.length > 0 && newIndex < sheets.length && oldIndex < sheets.length) {
                if ((newIndex === 0 && !this._rtl) || (newIndex === sheets.length - 1 && this._rtl)) {
                    if (this._rtl) {
                        switch (wjcGrid.FlexGrid['_getRtlMode']()) {
                            case 'rev':
                                this._tabContainer.parentElement.scrollLeft = 0;
                                break;
                            case 'neg':
                                this._tabContainer.parentElement.scrollLeft = -scrollLeft;
                                break;
                            default:
                                this._tabContainer.parentElement.scrollLeft = scrollLeft;
                                break;
                        }
                    }
                    else {
                        this._tabContainer.parentElement.scrollLeft = 0;
                    }
                    return;
                }
                if ((newIndex === 0 && this._rtl) || (newIndex === sheets.length - 1 && !this._rtl)) {
                    if (this._rtl) {
                        switch (wjcGrid.FlexGrid['_getRtlMode']()) {
                            case 'rev':
                                this._tabContainer.parentElement.scrollLeft = scrollLeft;
                                break;
                            case 'neg':
                                this._tabContainer.parentElement.scrollLeft = 0;
                                break;
                            default:
                                this._tabContainer.parentElement.scrollLeft = 0;
                                break;
                        }
                    }
                    else {
                        this._tabContainer.parentElement.scrollLeft = scrollLeft;
                    }
                    return;
                }
                if (newIndex >= oldIndex) {
                    for (i = oldIndex + 1; i <= newIndex; i++) {
                        activeSheet = sheets[i];
                        this._scrollSheetTabContainer(activeSheet);
                    }
                }
                else {
                    for (i = oldIndex - 1; i >= newIndex; i--) {
                        activeSheet = sheets[i];
                        this._scrollSheetTabContainer(activeSheet);
                    }
                }
            }
        };
        _SheetTabs.prototype._adjustNavigationButtons = function (rtl) {
            var navBtns = this.hostElement.querySelectorAll('.wj-sheet-page button'), btnGlyph;
            if (navBtns && navBtns.length === 4) {
                if (rtl) {
                    btnGlyph = navBtns[0].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-step-backward');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-step-backward-rtl');
                    btnGlyph = navBtns[1].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-left');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-left-rtl');
                    btnGlyph = navBtns[2].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-right');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-right-rtl');
                    btnGlyph = navBtns[3].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-step-forward');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-step-forward-rtl');
                }
                else {
                    btnGlyph = navBtns[0].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-step-backward-rtl');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-step-backward');
                    btnGlyph = navBtns[1].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-left-rtl');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-left');
                    btnGlyph = navBtns[2].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-right-rtl');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-right');
                    btnGlyph = navBtns[3].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-step-forward-rtl');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-step-forward');
                }
            }
        };
        return _SheetTabs;
    }(wjcCore.Control));
    _SheetTabs.controlTemplate = '<div wj-part="sheet-container" class="wj-sheet" style="height:100%;position:relative">' +
        '<div wj-part="sheet-page" class="wj-btn-group wj-sheet-page">' +
        '<button type="button" class="wj-btn wj-btn-default">' +
        '<span class="wj-sheet-icon wj-glyph-step-backward"></span>' +
        '</button>' +
        '<button type="button" class="wj-btn wj-btn-default">' +
        '<span class="wj-sheet-icon wj-glyph-left"></span>' +
        '</button>' +
        '<button type="button" class="wj-btn wj-btn-default">' +
        '<span class="wj-sheet-icon wj-glyph-right"></span>' +
        '</button>' +
        '<button type="button" class="wj-btn wj-btn-default">' +
        '<span class="wj-sheet-icon wj-glyph-step-forward"></span>' +
        '</button>' +
        '</div>' +
        '<div class="wj-sheet-tab" style="height:100%;overflow:hidden">' +
        '<ul wj-part="container"></ul>' +
        '</div>' +
        '<div wj-part="new-sheet" class="wj-new-sheet"><span class="wj-sheet-icon wj-glyph-file"></span></div>' +
        '</div>';
    exports._SheetTabs = _SheetTabs;
    var _UnboundSortDescription = (function () {
        function _UnboundSortDescription(column, ascending) {
            this._column = column;
            this._ascending = ascending;
        }
        Object.defineProperty(_UnboundSortDescription.prototype, "column", {
            get: function () {
                return this._column;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(_UnboundSortDescription.prototype, "ascending", {
            get: function () {
                return this._ascending;
            },
            enumerable: true,
            configurable: true
        });
        return _UnboundSortDescription;
    }());
    exports._UnboundSortDescription = _UnboundSortDescription;
    'use strict';
    var SortManager = (function () {
        function SortManager(owner) {
            this._owner = owner;
            this._sortDescriptions = new wjcCore.CollectionView();
            this._committedList = [new ColumnSortDescription(-1, true)];
            this._sortDescriptions.newItemCreator = function () {
                return new ColumnSortDescription(-1, true);
            };
            this._refresh();
        }
        Object.defineProperty(SortManager.prototype, "sortDescriptions", {
            get: function () {
                return this._sortDescriptions;
            },
            set: function (value) {
                this._sortDescriptions = value;
                this.commitSort(true);
                this._refresh();
            },
            enumerable: true,
            configurable: true
        });
        SortManager.prototype.addSortLevel = function (columnIndex, ascending) {
            if (ascending === void 0) { ascending = true; }
            var item = this._sortDescriptions.addNew();
            if (columnIndex != null && !isNaN(columnIndex) && wjcCore.isInt(columnIndex)) {
                item.columnIndex = columnIndex;
            }
            item.ascending = ascending;
            this._sortDescriptions.commitNew();
        };
        SortManager.prototype.deleteSortLevel = function (columnIndex) {
            var item;
            if (columnIndex != null) {
                item = this._getSortItem(columnIndex);
            }
            else {
                item = this._sortDescriptions.currentItem;
            }
            if (item) {
                this._sortDescriptions.remove(item);
            }
        };
        SortManager.prototype.copySortLevel = function () {
            var item = this._sortDescriptions.currentItem;
            if (item) {
                var newItem = this._sortDescriptions.addNew();
                newItem.columnIndex = parseInt(item.columnIndex);
                newItem.ascending = item.ascending;
                this._sortDescriptions.commitNew();
            }
        };
        SortManager.prototype.editSortLevel = function (columnIndex, ascending) {
            if (columnIndex != null) {
                this._sortDescriptions.currentItem.columnIndex = columnIndex;
            }
            if (ascending != null) {
                this._sortDescriptions.currentItem.ascending = ascending;
            }
        };
        SortManager.prototype.moveSortLevel = function (offset) {
            var item = this._sortDescriptions.currentItem;
            if (item) {
                var arr = this._sortDescriptions.sourceCollection, index = arr.indexOf(item), newIndex = index + offset;
                if (index > -1 && newIndex > -1) {
                    arr.splice(index, 1);
                    arr.splice(newIndex, 0, item);
                    this._sortDescriptions.refresh();
                    this._sortDescriptions.moveCurrentTo(item);
                }
            }
        };
        SortManager.prototype.checkSortItemExists = function (columnIndex) {
            var i = 0, sortItemCnt = this._sortDescriptions.itemCount, sortItem;
            for (; i < sortItemCnt; i++) {
                sortItem = this._sortDescriptions.items[i];
                if (+sortItem.columnIndex === columnIndex) {
                    return i;
                }
            }
            return -1;
        };
        SortManager.prototype.commitSort = function (undoable) {
            var _this = this;
            if (undoable === void 0) { undoable = true; }
            var sd, newSortDesc, bindSortDesc, dataBindSortDesc, i, unSortDesc, sortAction, unboundRows, isCVItemsSource = this._owner.itemsSource && this._owner.itemsSource instanceof wjcCore.CollectionView;
            if (!this._owner.selectedSheet) {
                return;
            }
            unSortDesc = this._owner.selectedSheet._unboundSortDesc;
            if (undoable) {
                sortAction = new _SortColumnAction(this._owner);
            }
            if (this._sortDescriptions.itemCount > 0) {
                this._committedList = this._sortDescriptions.items.slice();
            }
            else {
                this._committedList = [new ColumnSortDescription(-1, true)];
            }
            if (this._owner.collectionView) {
                unboundRows = this._scanUnboundRows();
                this._owner.collectionView.beginUpdate();
                this._owner.selectedSheet.grid.collectionView.beginUpdate();
                bindSortDesc = this._owner.collectionView.sortDescriptions;
                bindSortDesc.clear();
                if (isCVItemsSource === false) {
                    dataBindSortDesc = this._owner.selectedSheet.grid.collectionView.sortDescriptions;
                    dataBindSortDesc.clear();
                }
                for (i = 0; i < this._sortDescriptions.itemCount; i++) {
                    sd = this._sortDescriptions.items[i];
                    if (sd.columnIndex > -1) {
                        newSortDesc = new wjcCore.SortDescription(this._owner.columns[sd.columnIndex].binding, sd.ascending);
                        bindSortDesc.push(newSortDesc);
                        if (isCVItemsSource === false) {
                            dataBindSortDesc.push(newSortDesc);
                        }
                    }
                }
                this._owner.collectionView.endUpdate();
                this._owner.selectedSheet.grid.collectionView.endUpdate();
                if (unboundRows) {
                    Object.keys(unboundRows).forEach(function (key) {
                        _this._owner.rows.splice(+key, 0, unboundRows[key]);
                    });
                }
            }
            else {
                unSortDesc.clear();
                for (i = 0; i < this._sortDescriptions.itemCount; i++) {
                    sd = this._sortDescriptions.items[i];
                    if (sd.columnIndex > -1) {
                        unSortDesc.push(new _UnboundSortDescription(this._owner.columns[sd.columnIndex], sd.ascending));
                    }
                }
            }
            if (undoable) {
                sortAction.saveNewState();
                this._owner.undoStack._addAction(sortAction);
            }
        };
        SortManager.prototype.cancelSort = function () {
            this._sortDescriptions.sourceCollection = this._committedList.slice();
            this._refresh();
        };
        SortManager.prototype._refresh = function () {
            var sortList = [], i, sd;
            if (!this._owner.selectedSheet) {
                return;
            }
            if (this._owner.collectionView && this._owner.collectionView.sortDescriptions.length > 0) {
                for (i = 0; i < this._owner.collectionView.sortDescriptions.length; i++) {
                    sd = this._owner.collectionView.sortDescriptions[i];
                    sortList.push(new ColumnSortDescription(this._getColumnIndex(sd.property), sd.ascending));
                }
            }
            else if (this._owner.selectedSheet && this._owner.selectedSheet._unboundSortDesc.length > 0) {
                for (i = 0; i < this._owner.selectedSheet._unboundSortDesc.length; i++) {
                    sd = this._owner.selectedSheet._unboundSortDesc[i];
                    sortList.push(new ColumnSortDescription(sd.column.index, sd.ascending));
                }
            }
            else {
                sortList.push(new ColumnSortDescription(-1, true));
            }
            this._sortDescriptions.sourceCollection = sortList;
        };
        SortManager.prototype._getColumnIndex = function (property) {
            var i = 0, colCnt = this._owner.columns.length;
            for (; i < colCnt; i++) {
                if (this._owner.columns[i].binding === property) {
                    return i;
                }
            }
            return -1;
        };
        SortManager.prototype._getSortItem = function (columnIndex) {
            var index = this.checkSortItemExists(columnIndex);
            if (index > -1) {
                return this._sortDescriptions.items[index];
            }
            return undefined;
        };
        SortManager.prototype._scanUnboundRows = function () {
            var rowIndex, processingRow, unboundRows;
            for (rowIndex = 0; rowIndex < this._owner.rows.length; rowIndex++) {
                processingRow = this._owner.rows[rowIndex];
                if (!processingRow.dataItem) {
                    if (!(processingRow instanceof HeaderRow) && !(processingRow instanceof wjcGrid._NewRowTemplate)) {
                        if (!unboundRows) {
                            unboundRows = {};
                        }
                        unboundRows[rowIndex] = processingRow;
                    }
                }
            }
            return unboundRows;
        };
        return SortManager;
    }());
    exports.SortManager = SortManager;
    var ColumnSortDescription = (function () {
        function ColumnSortDescription(columnIndex, ascending) {
            this._columnIndex = columnIndex;
            this._ascending = ascending;
        }
        Object.defineProperty(ColumnSortDescription.prototype, "columnIndex", {
            get: function () {
                return this._columnIndex;
            },
            set: function (value) {
                this._columnIndex = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ColumnSortDescription.prototype, "ascending", {
            get: function () {
                return this._ascending;
            },
            set: function (value) {
                this._ascending = value;
            },
            enumerable: true,
            configurable: true
        });
        return ColumnSortDescription;
    }());
    exports.ColumnSortDescription = ColumnSortDescription;
    'use strict';
    var UndoStack = (function () {
        function UndoStack(owner) {
            this.MAX_STACK_SIZE = 500;
            this._stack = [];
            this._pointer = -1;
            this._resizingTriggered = false;
            this.undoStackChanged = new wjcCore.Event();
            var self = this;
            self._owner = owner;
            self._owner.prepareCellForEdit.addHandler(self._initCellEditAction, self);
            self._owner.cellEditEnded.addHandler(function (sender, args) {
                if (args.data && (args.data.keyCode === 46 || args.data.keyCode === 8)) {
                    return;
                }
                if (self._pendingAction instanceof _EditAction && !self._pendingAction.isPaste) {
                    self._afterProcessCellEditAction(self);
                }
            }, self);
            self._owner.pasting.addHandler(self._initCellEditActionForPasting, self);
            self._owner.pastingCell.addHandler(function (sender, e) {
                if (self._pendingAction instanceof _EditAction) {
                    self._pendingAction.updateForPasting(e.range);
                }
                else if (self._pendingAction instanceof _CutAction) {
                    self._pendingAction.updateForPasting(e.range);
                }
            }, self);
            self._owner.pasted.addHandler(function () {
                if (self._pendingAction instanceof _EditAction && self._pendingAction.isPaste) {
                    self._afterProcessCellEditAction(self);
                }
                else if (self._pendingAction instanceof _CutAction) {
                    self._pendingAction.saveNewState();
                    self._addAction(self._pendingAction);
                    self._pendingAction = null;
                }
            }, self);
            self._owner.resizingColumn.addHandler(function (sender, e) {
                if (!self._resizingTriggered) {
                    self._pendingAction = new _ColumnResizeAction(self._owner, e.panel, e.col);
                    self._resizingTriggered = true;
                }
            }, self);
            self._owner.resizedColumn.addHandler(function (sender, e) {
                if (self._pendingAction instanceof _ColumnResizeAction && self._pendingAction.saveNewState()) {
                    self._addAction(self._pendingAction);
                }
                self._pendingAction = null;
                self._resizingTriggered = false;
            }, self);
            self._owner.resizingRow.addHandler(function (sender, e) {
                if (!self._resizingTriggered) {
                    self._pendingAction = new _RowResizeAction(self._owner, e.panel, e.row);
                    self._resizingTriggered = true;
                }
            }, self);
            self._owner.resizedRow.addHandler(function (sender, e) {
                if (self._pendingAction instanceof _RowResizeAction && self._pendingAction.saveNewState()) {
                    self._addAction(self._pendingAction);
                }
                self._pendingAction = null;
                self._resizingTriggered = false;
            }, self);
            self._owner.draggingRowColumn.addHandler(function (sender, e) {
                if (e.isShiftKey) {
                    if (e.isDraggingRows) {
                        self._pendingAction = new _RowsChangedAction(self._owner);
                    }
                    else {
                        self._pendingAction = new _ColumnsChangedAction(self._owner);
                    }
                }
            }, self);
            self._owner.droppingRowColumn.addHandler(function () {
                if (self._pendingAction && self._pendingAction.saveNewState()) {
                    self._addAction(self._pendingAction);
                }
                self._pendingAction = null;
            }, self);
        }
        Object.defineProperty(UndoStack.prototype, "canUndo", {
            get: function () {
                return this._pointer > -1 && this._pointer < this._stack.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UndoStack.prototype, "canRedo", {
            get: function () {
                return this._pointer + 1 > -1 && this._pointer + 1 < this._stack.length;
            },
            enumerable: true,
            configurable: true
        });
        UndoStack.prototype.onUndoStackChanged = function () {
            this.undoStackChanged.raise(this);
        };
        UndoStack.prototype.undo = function () {
            var action;
            if (this.canUndo) {
                action = this._stack[this._pointer];
                this._beforeUndoRedo(action);
                action.undo();
                this._pointer--;
                this.onUndoStackChanged();
            }
        };
        UndoStack.prototype.redo = function () {
            var action;
            if (this.canRedo) {
                this._pointer++;
                action = this._stack[this._pointer];
                this._beforeUndoRedo(action);
                action.redo();
                this.onUndoStackChanged();
            }
        };
        UndoStack.prototype._addAction = function (action) {
            if (this._stack.length > 0 && this._stack.length > this._pointer + 1) {
                this._stack.splice(this._pointer + 1, this._stack.length - this._pointer - 1);
            }
            if (this._stack.length >= this.MAX_STACK_SIZE) {
                this._stack.splice(0, this._stack.length - this.MAX_STACK_SIZE + 1);
            }
            this._pointer = this._stack.length;
            this._stack.push(action);
            this.onUndoStackChanged();
        };
        UndoStack.prototype._pop = function () {
            var action = this._stack[this._pointer];
            this._pointer--;
            return action;
        };
        UndoStack.prototype.clear = function () {
            this._stack.length = 0;
        };
        UndoStack.prototype._initCellEditAction = function (sender, args) {
            this._pendingAction = new _EditAction(this._owner, args.range);
        };
        UndoStack.prototype._initCellEditActionForPasting = function () {
            if (this._owner._cutData) {
                this._pendingAction = new _CutAction(this._owner);
            }
            else {
                this._pendingAction = new _EditAction(this._owner);
                this._pendingAction.markIsPaste();
            }
        };
        UndoStack.prototype._afterProcessCellEditAction = function (self) {
            if (self._pendingAction instanceof _EditAction && self._pendingAction.saveNewState()) {
                self._addAction(this._pendingAction);
            }
            self._pendingAction = null;
        };
        UndoStack.prototype._beforeUndoRedo = function (action) {
            this._owner.selectedSheetIndex = action.sheetIndex;
        };
        return UndoStack;
    }());
    exports.UndoStack = UndoStack;
    'use strict';
    var _FlexSheetValueFilter = (function (_super) {
        __extends(_FlexSheetValueFilter, _super);
        function _FlexSheetValueFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        _FlexSheetValueFilter.prototype.apply = function (value) {
            var flexSheet = this.column.grid;
            if (!(flexSheet instanceof FlexSheet)) {
                return false;
            }
            if (!this.showValues || !Object.keys(this.showValues).length) {
                return true;
            }
            value = flexSheet.getCellValue(value, this.column.index, true);
            return this.showValues[value] != undefined;
        };
        return _FlexSheetValueFilter;
    }(wjcGridFilter.ValueFilter));
    exports._FlexSheetValueFilter = _FlexSheetValueFilter;
    'use strict';
    var _FlexSheetValueFilterEditor = (function (_super) {
        __extends(_FlexSheetValueFilterEditor, _super);
        function _FlexSheetValueFilterEditor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        _FlexSheetValueFilterEditor.prototype.updateEditor = function () {
            var col = this.filter.column, flexSheet = col.grid, colIndex = col.index, values = [], keys = {}, row, mergedRange, value, sv, currentFilterResult, otherFilterResult, text;
            if (this.filter.uniqueValues) {
                _super.prototype.updateEditor.call(this);
                return;
            }
            for (var i = 0; i < flexSheet.rows.length; i++) {
                currentFilterResult = this.filter.apply(i);
                sv = this.filter.showValues;
                this.filter.showValues = null;
                otherFilterResult = flexSheet._filter['_filter'](i);
                this.filter.showValues = sv;
                mergedRange = flexSheet.getMergedRange(flexSheet.cells, i, colIndex);
                if (mergedRange && (i !== mergedRange.topRow || colIndex !== mergedRange.leftCol)) {
                    continue;
                }
                row = flexSheet.rows[i];
                if (row instanceof HeaderRow || row instanceof wjcGrid.GroupRow || (!row.visible && (currentFilterResult || !otherFilterResult))) {
                    continue;
                }
                value = flexSheet.getCellValue(i, colIndex);
                text = flexSheet.getCellValue(i, colIndex, true);
                if (!keys[text]) {
                    keys[text] = true;
                    values.push({ value: value, text: text });
                }
            }
            var showValues = this.filter.showValues;
            if (!showValues || Object.keys(showValues).length == 0) {
                for (var i = 0; i < values.length; i++) {
                    values[i].show = true;
                }
            }
            else {
                for (var key in showValues) {
                    for (var i = 0; i < values.length; i++) {
                        if (values[i].text == key) {
                            values[i].show = true;
                            break;
                        }
                    }
                }
            }
            this['_lbValues'].isContentHtml = col.isContentHtml;
            this['_cmbFilter'].text = this.filter.filterText;
            this['_filterText'] = this['_cmbFilter'].text.toLowerCase();
            this['_view'].pageSize = this.filter.maxValues;
            this['_view'].sourceCollection = values;
            this['_view'].moveCurrentToPosition(-1);
        };
        return _FlexSheetValueFilterEditor;
    }(wjcGridFilter.ValueFilterEditor));
    exports._FlexSheetValueFilterEditor = _FlexSheetValueFilterEditor;
    'use strict';
    var _FlexSheetConditionFilter = (function (_super) {
        __extends(_FlexSheetConditionFilter, _super);
        function _FlexSheetConditionFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        _FlexSheetConditionFilter.prototype.apply = function (value) {
            var col = this.column, flexSheet = col.grid, c1 = this.condition1, c2 = this.condition2, compareVal, compareVal1, compareVal2;
            if (!(flexSheet instanceof FlexSheet)) {
                return false;
            }
            if (!this.isActive) {
                return true;
            }
            compareVal = flexSheet.getCellValue(value, col.index);
            compareVal1 = compareVal2 = compareVal;
            if (col.dataMap) {
                compareVal = col.dataMap.getDisplayValue(compareVal);
                compareVal1 = compareVal2 = compareVal;
            }
            else if (wjcCore.isDate(compareVal)) {
                if (wjcCore.isString(c1.value) || wjcCore.isString(c2.value)) {
                    compareVal = flexSheet.getCellValue(value, col.index, true);
                    compareVal1 = compareVal2 = compareVal;
                }
            }
            else if (wjcCore.isNumber(compareVal)) {
                compareVal = wjcCore.Globalize.parseFloat(flexSheet.getCellValue(value, col.index, true));
                compareVal1 = compareVal2 = compareVal;
                if (compareVal === 0 && !col.dataType) {
                    if (c1.isActive && c1.value === '') {
                        compareVal1 = null;
                    }
                    if (c2.isActive && c2.value === '') {
                        compareVal2 = null;
                    }
                }
            }
            var rv1 = c1.apply(compareVal1), rv2 = c2.apply(compareVal2);
            if (c1.isActive && c2.isActive) {
                return this.and ? rv1 && rv2 : rv1 || rv2;
            }
            else {
                return c1.isActive ? rv1 : c2.isActive ? rv2 : true;
            }
        };
        return _FlexSheetConditionFilter;
    }(wjcGridFilter.ConditionFilter));
    exports._FlexSheetConditionFilter = _FlexSheetConditionFilter;
    'use strict';
    var _FlexSheetColumnFilter = (function (_super) {
        __extends(_FlexSheetColumnFilter, _super);
        function _FlexSheetColumnFilter(owner, column) {
            var _this = _super.call(this, owner, column) || this;
            _this['_valueFilter'] = new _FlexSheetValueFilter(column);
            _this['_conditionFilter'] = new _FlexSheetConditionFilter(column);
            return _this;
        }
        return _FlexSheetColumnFilter;
    }(wjcGridFilter.ColumnFilter));
    exports._FlexSheetColumnFilter = _FlexSheetColumnFilter;
    'use strict';
    var _FlexSheetColumnFilterEditor = (function (_super) {
        __extends(_FlexSheetColumnFilterEditor, _super);
        function _FlexSheetColumnFilterEditor(element, filter, sortButtons) {
            if (sortButtons === void 0) { sortButtons = true; }
            var _this = _super.call(this, element, filter, sortButtons) || this;
            var self = _this, btnAsc, btnDsc;
            if (sortButtons) {
                _this['_divSort'].style.display = '';
            }
            btnAsc = _this.cloneElement(_this['_btnAsc']);
            btnDsc = _this.cloneElement(_this['_btnDsc']);
            _this['_btnAsc'].parentNode.replaceChild(btnAsc, _this['_btnAsc']);
            _this['_btnDsc'].parentNode.replaceChild(btnDsc, _this['_btnDsc']);
            btnAsc.addEventListener('click', function (e) {
                self._sortBtnClick(e, true);
            });
            btnDsc.addEventListener('click', function (e) {
                self._sortBtnClick(e, false);
            });
            return _this;
        }
        _FlexSheetColumnFilterEditor.prototype._showFilter = function (filterType) {
            if (filterType == wjcGridFilter.FilterType.Value && this['_edtVal'] == null) {
                this['_edtVal'] = new _FlexSheetValueFilterEditor(this['_divEdtVal'], this.filter.valueFilter);
            }
            _super.prototype._showFilter.call(this, filterType);
        };
        _FlexSheetColumnFilterEditor.prototype._sortBtnClick = function (e, asceding) {
            var column = this.filter.column, sortManager = column.grid.sortManager, sortIndex, offset, sortItem;
            e.preventDefault();
            e.stopPropagation();
            sortIndex = sortManager.checkSortItemExists(column.index);
            if (sortIndex > -1) {
                sortManager.sortDescriptions.moveCurrentToPosition(sortIndex);
                sortItem = sortManager.sortDescriptions.currentItem;
                sortItem.ascending = asceding;
                offset = -sortIndex;
            }
            else {
                sortManager.addSortLevel(column.index, asceding);
                offset = -(sortManager.sortDescriptions.items.length - 1);
            }
            sortManager.moveSortLevel(offset);
            sortManager.commitSort();
            this.updateEditor();
            this.onButtonClicked();
        };
        _FlexSheetColumnFilterEditor.prototype.cloneElement = function (element) {
            var cloneEle = element.cloneNode();
            while (element.firstChild) {
                cloneEle.appendChild(element.lastChild);
            }
            return cloneEle;
        };
        return _FlexSheetColumnFilterEditor;
    }(wjcGridFilter.ColumnFilterEditor));
    exports._FlexSheetColumnFilterEditor = _FlexSheetColumnFilterEditor;
    'use strict';
    var _FlexSheetFilter = (function (_super) {
        __extends(_FlexSheetFilter, _super);
        function _FlexSheetFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(_FlexSheetFilter.prototype, "filterDefinition", {
            get: function () {
                var def = {
                    defaultFilterType: this.defaultFilterType,
                    filters: []
                };
                for (var i = 0; i < this['_filters'].length; i++) {
                    var cf = this['_filters'][i];
                    if (cf && cf.column) {
                        if (cf.conditionFilter.isActive) {
                            var cfc = cf.conditionFilter;
                            def.filters.push({
                                columnIndex: cf.column.index,
                                type: 'condition',
                                condition1: { operator: cfc.condition1.operator, value: cfc.condition1.value },
                                and: cfc.and,
                                condition2: { operator: cfc.condition2.operator, value: cfc.condition2.value }
                            });
                        }
                        else if (cf.valueFilter.isActive) {
                            var cfv = cf.valueFilter;
                            def.filters.push({
                                columnIndex: cf.column.index,
                                type: 'value',
                                filterText: cfv.filterText,
                                showValues: cfv.showValues
                            });
                        }
                    }
                }
                return JSON.stringify(def);
            },
            set: function (value) {
                var def = JSON.parse(wjcCore.asString(value));
                this.clear();
                this.defaultFilterType = def.defaultFilterType;
                for (var i = 0; i < def.filters.length; i++) {
                    var cfs = def.filters[i], col = this.grid.columns[cfs.columnIndex], cf = this.getColumnFilter(col, true);
                    if (cf) {
                        switch (cfs.type) {
                            case 'condition':
                                var cfc = cf.conditionFilter;
                                cfc.condition1.value = col.dataType == wjcCore.DataType.Date
                                    ? wjcCore.changeType(cfs.condition1.value, col.dataType, null)
                                    : cfs.condition1.value;
                                cfc.condition1.operator = cfs.condition1.operator;
                                cfc.and = cfs.and;
                                cfc.condition2.value = col.dataType == wjcCore.DataType.Date
                                    ? wjcCore.changeType(cfs.condition2.value, col.dataType, null)
                                    : cfs.condition2.value;
                                cfc.condition2.operator = cfs.condition2.operator;
                                break;
                            case 'value':
                                var cfv = cf.valueFilter;
                                cfv.filterText = cfs.filterText;
                                cfv.showValues = cfs.showValues;
                                break;
                        }
                    }
                }
                this.apply();
            },
            enumerable: true,
            configurable: true
        });
        _FlexSheetFilter.prototype.apply = function () {
            var self = this;
            self.grid.deferUpdate(function () {
                var row;
                for (var i = 0; i < self.grid.rows.length; i++) {
                    row = self.grid.rows[i];
                    if (row instanceof HeaderRow) {
                        continue;
                    }
                    if (row instanceof wjcGrid.GroupRow) {
                        row.visible = self._checkGroupVisible(row.getCellRange());
                    }
                    else {
                        row.visible = self['_filter'](i);
                    }
                }
                if (!self.grid._isCopying && !self.grid._resettingFilter) {
                    self.onFilterApplied();
                }
            });
        };
        _FlexSheetFilter.prototype.editColumnFilter = function (col, ht) {
            var _this = this;
            this.closeEditor();
            col = wjcCore.isString(col)
                ? this.grid.columns.getColumn(col)
                : wjcCore.asType(col, wjcGrid.Column, false);
            var e = new wjcGrid.CellRangeEventArgs(this.grid.cells, new wjcGrid.CellRange(-1, col.index));
            this.onFilterChanging(e);
            if (e.cancel) {
                return;
            }
            e.cancel = true;
            var div = document.createElement('div'), flt = this.getColumnFilter(col), edt = new _FlexSheetColumnFilterEditor(div, flt, this.showSortButtons);
            wjcCore.addClass(div, 'wj-dropdown-panel');
            if (this.grid.rightToLeft) {
                div.dir = 'rtl';
            }
            edt.filterChanged.addHandler(function () {
                e.cancel = false;
                setTimeout(function () {
                    if (!e.cancel) {
                        _this.apply();
                    }
                });
            });
            edt.buttonClicked.addHandler(function () {
                _this.closeEditor();
                _this.onFilterChanged(e);
            });
            edt.lostFocus.addHandler(function () {
                setTimeout(function () {
                    var ctl = wjcCore.Control.getControl(_this['_divEdt']);
                    if (ctl && !ctl.containsFocus()) {
                        _this.closeEditor();
                    }
                }, 10);
            });
            var ch = this.grid.columnHeaders, r = ht ? ht.row : ch.rows.length - 1, c = ht ? ht.col : col.index, rc = ch.getCellBoundingRect(r, c), hdrCell = document.elementFromPoint(rc.left + rc.width / 2, rc.top + rc.height / 2);
            hdrCell = wjcCore.closest(hdrCell, '.wj-cell');
            if (hdrCell) {
                wjcCore.showPopup(div, hdrCell, false, false, false);
            }
            else {
                wjcCore.showPopup(div, rc);
            }
            edt.focus();
            this['_divEdt'] = div;
            this['_edtCol'] = col;
        };
        _FlexSheetFilter.prototype.getColumnFilter = function (col, create) {
            if (create === void 0) { create = true; }
            if (wjcCore.isString(col)) {
                col = this.grid.columns.getColumn(col);
            }
            else if (wjcCore.isNumber(col)) {
                col = this.grid.columns[col];
            }
            if (!col) {
                return null;
            }
            col = wjcCore.asType(col, wjcGrid.Column);
            for (var i = 0; i < this['_filters'].length; i++) {
                if (this['_filters'][i].column == col) {
                    return this['_filters'][i];
                }
            }
            if (create) {
                var cf = new _FlexSheetColumnFilter(this, col);
                this['_filters'].push(cf);
                return cf;
            }
            return null;
        };
        _FlexSheetFilter.prototype._checkGroupVisible = function (range) {
            var groupVisible = true, row;
            for (var i = range.topRow + 1; i <= range.bottomRow; i++) {
                row = this.grid.rows[i];
                if (row) {
                    if (row instanceof wjcGrid.GroupRow) {
                        groupVisible = this._checkGroupVisible(row.getCellRange());
                    }
                    else {
                        groupVisible = this['_filter'](i);
                        if (groupVisible) {
                            break;
                        }
                    }
                }
            }
            return groupVisible;
        };
        return _FlexSheetFilter;
    }(wjcGridFilter.FlexGridFilter));
    exports._FlexSheetFilter = _FlexSheetFilter;
});
//# sourceMappingURL=wijmo.grid.sheet.js.map