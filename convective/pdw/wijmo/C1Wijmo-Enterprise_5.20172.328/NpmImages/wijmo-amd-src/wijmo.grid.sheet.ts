

import * as wjcCore from 'wijmo/wijmo';
import * as wjcXlsx from 'wijmo/wijmo.xlsx';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';
import * as wjcGridXlsx from 'wijmo/wijmo.grid.xlsx';


import * as wjcSelf from 'wijmo/wijmo.grid.sheet';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['grid'] = window['wijmo']['grid'] || {};
window['wijmo']['grid']['sheet'] = wjcSelf;

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

	/*
	 * Defines the CalcEngine class.
	 *
	 * It deals with the calculation for the flexsheet control.
	 */
	export class _CalcEngine {
		private _owner: FlexSheet;
		private _expression: string;
		private _expressLength: number;
		private _pointer: number;
		private _expressionCache: any = {};
		private _tokenTable: any;
		private _token: _Token;
		private _idChars: string = '$:!';
		private _functionTable: any = {};
		private _cacheSize: number = 0;

		/*
		 * Initializes a new instance of the @see:CalcEngine class.
		 *
		 * @param owner The @see: FlexSheet control that the CalcEngine works for.
		 */
		constructor(owner: FlexSheet) {
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

		/*
		 * Occurs when the @see:_CalcEngine meets the unknown formula.
		 */
		unknownFunction = new wjcCore.Event();
		/*
		 * Raises the unknownFunction event.
		 */
		onUnknownFunction(funcName: string, params: Array<_Expression>): _Expression {
			var paramsList: any[],
				eventArgs: UnknownFunctionEventArgs;

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
		}

		/*
		 * Evaluates an expression.
		 *
		 * @param expression the expression need to be evaluated to value.
		 * @param format the format string used to convert raw values into display.
		 * @param sheet The @see:Sheet is referenced by the @see:Expression.
		 * @param rowIndex The row index of the cell where the expression located in.
		 * @param columnIndex The column index of the cell where the expression located in.
		 */
		evaluate(expression: string, format?: string, sheet?: Sheet, rowIndex?: number, columnIndex?: number): any {
			var expr: _Expression,
				result: any;

			try {
				if (expression && expression.length > 1 && expression[0] === '=') {
					expr = this._checkCache(expression);
					result = expr.evaluate(sheet, rowIndex, columnIndex);
					while (result instanceof _Expression) {
						result = (<_Expression>result).evaluate(sheet);
					}
					if (format && wjcCore.isPrimitive(result)) {
						return wjcCore.Globalize.format(result, format);
					}
					return result;
				}

				return expression ? expression : '';
			} catch (e) {
				return "Error: " + e;
			}
		}

		/*
		 * Add a custom function to the @see:_CalcEngine.
         *
		 * @param name the name of the custom function, the function name should be lower case.
		 * @param func the custom function.
		 * @param minParamsCount the minimum count of the parameter that the function need.
		 * @param maxParamsCount the maximum count of the parameter that the function need.
		 *        If the count of the parameters in the custom function is arbitrary, the
         *        minParamsCount and maxParamsCount should be set to null.
		 */
		addCustomFunction(name: string, func: Function, minParamsCount?: number, maxParamsCount?: number) {
			var self = this;

			name = name.toLowerCase();
			this._functionTable[name] = new _FunctionDefinition((params) => {
				var param,
					paramsList = [];
				if (params.length > 0) {
					for (var i = 0; i < params.length; i++) {
						param = params[i];
                        if (param instanceof _CellRangeExpression) {
                            paramsList[i] = (<_CellRangeExpression>param).cells;
						} else {
							paramsList[i] = param.evaluate();
						}
					}
				}
				return func.apply(self, paramsList);
			}, maxParamsCount, minParamsCount);
        }

        /*
		 * Add a custom function to the @see:_CalcEngine.
         *
		 * @param name the name of the custom function, the function name should be lower case.
		 * @param func the custom function.
		 * @param minParamsCount the minimum count of the parameter that the function need.
		 * @param maxParamsCount the maximum count of the parameter that the function need.
		 *        If the count of the parameters in the custom function is arbitrary, the
         *        minParamsCount and maxParamsCount should be set to null.
		 */
        addFunction(name: string, func: Function, minParamsCount?: number, maxParamsCount?: number) {
            var self = this;

            name = name.toLowerCase();
            this._functionTable[name] = new _FunctionDefinition((params) => {
                var param,
                    paramsList = [];
                if (params.length > 0) {
                    for (var i = 0; i < params.length; i++) {
                        param = params[i];
                        if (param instanceof _CellRangeExpression) {
                            paramsList[i] = (<_CellRangeExpression>param).getValuseWithTwoDimensions();
                        } else {
                            paramsList[i] = [[param.evaluate()]];
                        }
                    }
                }
                return func.apply(self, paramsList);
            }, maxParamsCount, minParamsCount);
        }

		// Clear the expression cache.
		_clearExpressionCache() {
			this._expressionCache = null;
			this._expressionCache = {};
			this._cacheSize = 0;
		}

		// Parse the string expression to an Expression instance that can be evaluated to value.
		private _parse(expression: string): _Expression {
			this._expression = expression;
			this._expressLength = expression ? expression.length : 0;
			this._pointer = 0;

			// skip leading equals sign
			if (this._expressLength > 0 && this._expression[0] === '=') {
				this._pointer++;
			}

			return this._parseExpression();
		}

		// Build static token table.
		private _buildSymbolTable(): any {
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
		}

		// Register the aggregate function for the CalcEngine.
		private _registerAggregateFunction() {
			var self = this;

			self._functionTable['sum'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getAggregateResult(wjcCore.Aggregate.Sum, params, sheet);
			});
			self._functionTable['average'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getAggregateResult(wjcCore.Aggregate.Avg, params, sheet);
			});
			self._functionTable['max'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getAggregateResult(wjcCore.Aggregate.Max, params, sheet);
			});
			self._functionTable['min'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getAggregateResult(wjcCore.Aggregate.Min, params, sheet);
			});
			self._functionTable['var'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getAggregateResult(wjcCore.Aggregate.Var, params, sheet);
			});
			self._functionTable['varp'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getAggregateResult(wjcCore.Aggregate.VarPop, params, sheet);
			});
			self._functionTable['stdev'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getAggregateResult(wjcCore.Aggregate.Std, params, sheet);
			});
			self._functionTable['stdevp'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getAggregateResult(wjcCore.Aggregate.StdPop, params, sheet);
			});
			self._functionTable['count'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getFlexSheetAggregateResult(_FlexSheetAggregate.Count, params, sheet);
			});
			self._functionTable['counta'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getFlexSheetAggregateResult(_FlexSheetAggregate.CountA, params, sheet);
			});
			self._functionTable['countblank'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getFlexSheetAggregateResult(_FlexSheetAggregate.ConutBlank, params, sheet);
			});
			self._functionTable['countif'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getFlexSheetAggregateResult(_FlexSheetAggregate.CountIf, params, sheet);
			}, 2, 2);
			self._functionTable['countifs'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getFlexSheetAggregateResult(_FlexSheetAggregate.CountIfs, params, sheet);
			}, 254, 2);
			self._functionTable['sumif'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getFlexSheetAggregateResult(_FlexSheetAggregate.SumIf, params, sheet);
			}, 3, 2);
			self._functionTable['sumifs'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getFlexSheetAggregateResult(_FlexSheetAggregate.SumIfs, params, sheet);
			}, 255, 2);
			self._functionTable['rank'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getFlexSheetAggregateResult(_FlexSheetAggregate.Rank, params, sheet);
			}, 3, 2);
			self._functionTable['product'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._getFlexSheetAggregateResult(_FlexSheetAggregate.Product, params, sheet);
			}, 255, 1);
			self._functionTable['subtotal'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._handleSubtotal(params, sheet);
			}, 255, 2);
			self._functionTable['dcount'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._handleDCount(params, sheet);
            }, 3, 3);
            self._functionTable['sumproduct'] = new _FunctionDefinition((params, sheet?: Sheet) => {
                return self._getSumProduct(params, sheet);
            }, 255, 1);
		}

		// Register the math function for the calcEngine.
		private _registerMathFunction() {
			var self = this,
				unaryFuncs = ['abs', 'acos', 'asin', 'atan', 'ceiling', 'cos', 'exp', 'floor', 'ln', 'sin', 'sqrt', 'tan'],
				roundFuncs = ['round', 'rounddown', 'roundup'];

			self._functionTable['pi'] = new _FunctionDefinition(() => {
				return Math.PI;
			}, 0, 0);

			self._functionTable['rand'] = new _FunctionDefinition(() => {
				return Math.random();
			}, 0, 0);

			self._functionTable['power'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return Math.pow(_Expression.toNumber(params[0], sheet), _Expression.toNumber(params[1], sheet));
			}, 2, 2);

			self._functionTable['atan2'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var x = _Expression.toNumber(params[0], sheet),
					y = _Expression.toNumber(params[1], sheet);

				if (x === 0 && y === 0) {
					throw 'The x number and y number can\'t both be zero for the atan2 function';
				}
				return Math.atan2(y, x);
			}, 2, 2);

			self._functionTable['mod'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return _Expression.toNumber(params[0], sheet) % _Expression.toNumber(params[1], sheet);
			}, 2, 2);

			self._functionTable['trunc'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var num = _Expression.toNumber(params[0], sheet),
					precision = params.length === 2 ? _Expression.toNumber(params[1], sheet) : 0,
					multiple: number;

				if (precision === 0) {
					if (num >= 0) {
						return Math.floor(num);
					} else {
						return Math.ceil(num);
					}
				} else {
					multiple = Math.pow(10, precision);
					if (num >= 0) {
						return Math.floor(num * multiple) / multiple;
					} else {
						return Math.ceil(num * multiple) / multiple;
					}
				}

			}, 2, 1);

			roundFuncs.forEach((val) => {
				self._functionTable[val] = new _FunctionDefinition((params, sheet?: Sheet) => {
					var num = _Expression.toNumber(params[0], sheet),
                        precision = _Expression.toNumber(params[1], sheet),
                        result: number,
                        format: string,
						multiple: number;

					if (precision === 0) {
						switch (val) {
                            case 'rounddown':
                                if (num >= 0) {
                                    result = Math.floor(num);
                                } else {
                                    result = Math.ceil(num);
                                }
                                break;
                            case 'roundup':
                                if (num >= 0) {
                                    result = Math.ceil(num);
                                } else {
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
					} else if (precision > 0 && wjcCore.isInt(precision)) {
						multiple = Math.pow(10, precision);
						switch (val) {
                            case 'rounddown':
                                if (num >= 0) {
                                    result = Math.floor(num * multiple) / multiple;
                                } else {
                                    result = Math.ceil(num * multiple) / multiple;
                                }
                                break;
                            case 'roundup':
                                if (num >= 0) {
                                    result = Math.ceil(num * multiple) / multiple;
                                } else {
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

			unaryFuncs.forEach((val) => {
				self._functionTable[val] = new _FunctionDefinition((params, sheet?: Sheet) => {
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
		}

		// Register the logical function for the calcEngine.
		private _registerLogicalFunction() {
			// and(true,true,false,...)
			this._functionTable['and'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var result: boolean = true,
					index: number;
				for (index = 0; index < params.length; index++) {
					result = result && _Expression.toBoolean(params[index], sheet);
					if (!result) {
						break;
					}
				}
				return result;
			}, Number.MAX_VALUE, 1);

			// or(false,true,true,...)
			this._functionTable['or'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var result: boolean = false,
					index: number;
				for (index = 0; index < params.length; index++) {
					result = result || _Expression.toBoolean(params[index], sheet);
					if (result) {
						break;
					}
				}
				return result;
			}, Number.MAX_VALUE, 1);

			// not(false)
			this._functionTable['not'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return !_Expression.toBoolean(params[0], sheet);
			}, 1, 1);

			// if(true,a,b)
            this._functionTable['if'] = new _FunctionDefinition((params, sheet?: Sheet) => {
                if (params.length === 3) {
                    return _Expression.toBoolean(params[0], sheet) ? params[1].evaluate(sheet) : params[2].evaluate(sheet);
                } else {
                    return _Expression.toBoolean(params[0], sheet) ? params[1].evaluate(sheet) : false;
                }
			}, 3, 2);

			// true()
			this._functionTable['true'] = new _FunctionDefinition(() => {
				return true;
			}, 0, 0);

			// false()
			this._functionTable['false'] = new _FunctionDefinition(() => {
				return false;
			}, 0, 0);
		}

		// register the text process function
		private _registerTextFunction() {
			// char(65, 66, 67,...) => "abc"
			this._functionTable['char'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var index: number,
					result: string = '';

				for (index = 0; index < params.length; index++) {
					result += String.fromCharCode(_Expression.toNumber(params[index], sheet));
				}
				return result;
			}, Number.MAX_VALUE, 1);

			// code("A")
			this._functionTable['code'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var str = _Expression.toString(params[0], sheet);

				if (str && str.length > 0) {
					return str.charCodeAt(0);
				}

				return -1;
			}, 1, 1);

			// concatenate("abc","def","ghi",...) => "abcdefghi"
			this._functionTable['concatenate'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var index: number,
					result: string = '';

				for (index = 0; index < params.length; index++) {
					result = result.concat(_Expression.toString(params[index], sheet));
				}
				return result;
			}, Number.MAX_VALUE, 1);

			// left("Abcdefgh", 5) => "Abcde"
			this._functionTable['left'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var str = _Expression.toString(params[0], sheet),
					length = Math.floor(_Expression.toNumber(params[1], sheet));

				if (str && str.length > 0) {
					return str.slice(0, length);
				}

				return undefined;
			}, 2, 2);

			// right("Abcdefgh", 5) => "defgh"
			this._functionTable['right'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var str = _Expression.toString(params[0], sheet),
					length = Math.floor(_Expression.toNumber(params[1], sheet));

				if (str && str.length > 0) {
					return str.slice(-length);
				}

				return undefined;
			}, 2, 2);

			// find("abc", "abcdefgh") 
			// this function is case-sensitive.
			this._functionTable['find'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var search = _Expression.toString(params[0], sheet),
                    text = _Expression.toString(params[1], sheet),
                    startIndex = params[2] != null ? wjcCore.asInt(_Expression.toNumber(params[2])) : 0,
					result: number;

                if (text != null && search != null) {
                    if (!isNaN(startIndex) && startIndex > 0 && startIndex < text.length) {
                        result = text.indexOf(search, startIndex);
                    } else {
                        result = text.indexOf(search);
                    }
					if (result > -1) {
						return result + 1;
					}
				}

				return -1;
			}, 3, 2);

			// search("abc", "ABCDEFGH") 
			// this function is not case-sensitive.
			this._functionTable['search'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var search = _Expression.toString(params[0], sheet),
                    text = _Expression.toString(params[1], sheet),
                    startIndex = params[2] != null ? wjcCore.asInt(_Expression.toNumber(params[2])) : 0,
                    adjustNum: number,
					searchRegExp: RegExp,
					result: number;
                    
				if (text != null && search != null) {
                    searchRegExp = new RegExp(search, 'i');
                    if (!isNaN(startIndex) && startIndex > 0 && startIndex < text.length) {
                        text = text.substring(startIndex);
                        adjustNum = startIndex + 1;
                    } else {
                        adjustNum = 1;
                    }
					result = text.search(searchRegExp);
                    if (result > -1) {
                        return result + adjustNum;
					}
				}

				return -1;
			}, 3, 2);

			// len("abcdefgh")
			this._functionTable['len'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var str = _Expression.toString(params[0], sheet);

				if (str) {
					return str.length;
				}

				return -1;
			}, 1, 1);

			//  mid("abcdefgh", 2, 3) => "bcd"
			this._functionTable['mid'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var text = _Expression.toString(params[0], sheet),
					start = Math.floor(_Expression.toNumber(params[1], sheet)),
					length = Math.floor(_Expression.toNumber(params[2], sheet));

				if (text && text.length > 0 && start > 0) {
					return text.substr(start - 1, length);
				}

				return undefined;
			}, 3, 3);

			// lower("ABCDEFGH")
			this._functionTable['lower'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var str = _Expression.toString(params[0], sheet);

				if (str && str.length > 0) {
					return str.toLowerCase();
				}

				return undefined;
			}, 1, 1);

			// upper("abcdefgh")
			this._functionTable['upper'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var str = _Expression.toString(params[0], sheet);

				if (str && str.length > 0) {
					return str.toUpperCase();
				}

				return undefined;
			}, 1, 1);

			// proper("abcdefgh") => "Abcdefgh"
			this._functionTable['proper'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var str = _Expression.toString(params[0], sheet);

				if (str && str.length > 0) {
					return str[0].toUpperCase() + str.substring(1).toLowerCase();
				}

				return undefined;
			}, 1, 1);

			// trim("   abcdefgh   ") => "abcdefgh"
			this._functionTable['trim'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var str = _Expression.toString(params[0], sheet);

				if (str && str.length > 0) {
					return str.trim();
				}

				return undefined;
			}, 1, 1);

			// replace("abcdefg", 2, 3, "xyz") => "axyzefg"
			this._functionTable['replace'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var text = _Expression.toString(params[0], sheet),
					start = Math.floor(_Expression.toNumber(params[1], sheet)),
					length = Math.floor(_Expression.toNumber(params[2], sheet)),
					replaceText = _Expression.toString(params[3], sheet);

				if (text && text.length > 0 && start > 0) {
					return text.substring(0, start - 1) + replaceText + text.slice(start - 1 + length);
				}

				return undefined;
			}, 4, 4);

			// substitute("abcabcdabcdefgh", "ab", "xy") => "xycxycdxycdefg"
			this._functionTable['substitute'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var text = _Expression.toString(params[0], sheet),
					oldText = _Expression.toString(params[1], sheet),
					newText = _Expression.toString(params[2], sheet),
					searhRegExp: RegExp;

				if (text && text.length > 0 && oldText && oldText.length > 0) {
					searhRegExp = new RegExp(oldText, 'g');
					return text.replace(searhRegExp, newText);
				}

				return undefined;
			}, 3, 3);

			// rept("abc", 3) => "abcabcabc"
			this._functionTable['rept'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var text = _Expression.toString(params[0], sheet),
					repeatTimes = Math.floor(_Expression.toNumber(params[1], sheet)),
					result = '',
					i: number;

				if (text && text.length > 0 && repeatTimes > 0) {
					for (i = 0; i < repeatTimes; i++) {
						result = result.concat(text);
					}
				}

				return result;
			}, 2, 2);

			// text("1234", "n2") => "1234.00"
			this._functionTable['text'] = new _FunctionDefinition((params, sheet?: Sheet) => {
                var value = params[0].evaluate(),
                    format = _Expression.toString(params[1], sheet);

                if (!!format && format.indexOf('#') > -1) {
                    format = wjcXlsx.Workbook.fromXlsxFormat(format)[0];
                } 

                return wjcCore.Globalize.format(value, format);
			}, 2, 2);

			// value("1234") => 1234
			this._functionTable['value'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return _Expression.toNumber(params[0], sheet);
			}, 1, 1);
		}

		// Register the datetime function for the calcEngine.
		private _registerDateFunction() {
			this._functionTable['now'] = new _FunctionDefinition(() => {
				return {
					value: new Date(),
					format: 'M/d/yyyy h:mm'
				};
			}, 0, 0);

            this._functionTable['today'] = new _FunctionDefinition(() => {
                var now = new Date();
                return {
                    value: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
					format: 'd'
				};
			}, 0, 0);

			// year("11/25/2015") => 2015
			this._functionTable['year'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var date = _Expression.toDate(params[0], sheet);
				if (!wjcCore.isPrimitive(date) && date) {
					return date.value;
				}
				if (wjcCore.isDate(date)) {
					return date.getFullYear();
				}
				return 1900;
			}, 1, 1);

			// month("11/25/2015") => 11
			this._functionTable['month'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var date = _Expression.toDate(params[0], sheet);
				if (!wjcCore.isPrimitive(date) && date) {
					return date.value;
				}
				if (wjcCore.isDate(date)) {
					return date.getMonth() + 1;
				}
				return 1;
			}, 1, 1);

			// day("11/25/2015") => 25
			this._functionTable['day'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var date = _Expression.toDate(params[0], sheet);
				if (!wjcCore.isPrimitive(date) && date) {
					return date.value;
				}
				if (wjcCore.isDate(date)) {
					return date.getDate();
				}
				return 0;
			}, 1, 1);

			// hour("11/25/2015 16:50") => 16 or hour(0.5) => 12
			this._functionTable['hour'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var val = params[0].evaluate(sheet);
				if (wjcCore.isNumber(val) && !isNaN(val)) {
					return Math.floor(24 * (val - Math.floor(val)));
				} else if (wjcCore.isDate(val)) {
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

			// time(10, 23, 11) => 10:23:11 AM
			this._functionTable['time'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var hour = params[0].evaluate(sheet),
					minute = params[1].evaluate(sheet),
					second = params[2].evaluate(sheet);

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

			// time(2015, 11, 25) => 11/25/2015
			this._functionTable['date'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var year = params[0].evaluate(sheet),
					month = params[1].evaluate(sheet),
					day = params[2].evaluate(sheet);

				if (wjcCore.isNumber(year) && wjcCore.isNumber(month) && wjcCore.isNumber(day)) {
					return {
						value: new Date(year, month - 1, day),
						format: 'd'
					};
				}

				throw 'Invalid parameters.';
			}, 3, 3);

			this._functionTable['datedif'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var startDate = _Expression.toDate(params[0], sheet),
					endDate = _Expression.toDate(params[1], sheet),
					unit = params[2].evaluate(sheet),
					startDateTime: number,
					endDateTime: number,
					diffDays: number,
					diffMonths: number,
					diffYears: number;

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
							} else if (diffMonths < 0) {
								return diffYears - 1;
							} else {
								if (diffDays >= 0) {
									return diffYears;
								} else {
									return diffYears - 1;
								}
							}
						case 'M':
							if (diffDays >= 0) {
								return diffYears * 12 + diffMonths;
							} else {
								return diffYears * 12 + diffMonths - 1;
							}
						case 'D':
							return (endDateTime - startDateTime) / (1000 * 3600 * 24);
						case 'YM':
							if (diffDays >= 0) {
								diffMonths = diffYears * 12 + diffMonths;
							} else {
								diffMonths = diffYears * 12 + diffMonths - 1;
							}
							return diffMonths % 12;
						case 'YD':
							if (diffMonths > 0) {
								return (new Date(startDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime() - startDate.getTime()) / (1000 * 3600 * 24);
							} else if (diffMonths < 0) {
								return (new Date(startDate.getFullYear() + 1, endDate.getMonth(), endDate.getDate()).getTime() - startDate.getTime()) / (1000 * 3600 * 24);
							} else {
								if (diffDays >= 0) {
									return diffDays;
								} else {
									return (new Date(startDate.getFullYear() + 1, endDate.getMonth(), endDate.getDate()).getTime() - startDate.getTime()) / (1000 * 3600 * 24);
								}
							}
						case 'MD':
							if (diffDays >= 0) {
								return diffDays;
							} else {
								diffDays = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate() - new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1).getDate() + 1 + diffDays;
								return diffDays;
							}
						default:
							throw 'Invalid unit.';
					}
				}

				throw 'Invalid parameters.';
			}, 3, 3);
		}

		// Register the cell reference and look up related functions for the calcEngine.
		private _registLookUpReferenceFunction() {
			var self = this;

			self._functionTable['column'] = new _FunctionDefinition((params, sheet?: Sheet, rowIndex?: number, columnIndex?: number) => {
				var cellExpr: _Expression;
				if (params == null) {
					return columnIndex + 1;
				}

				cellExpr = params[0];
				cellExpr = self._ensureNonFunctionExpression(<_Expression>cellExpr);
				if (cellExpr instanceof _CellRangeExpression) {
					return (<_CellRangeExpression>cellExpr).cells.col + 1;
				}

				throw 'Invalid Cell Reference.';
			}, 1, 0);

			self._functionTable['columns'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var cellExpr = params[0];

				cellExpr = self._ensureNonFunctionExpression(<_Expression>cellExpr);
				if (cellExpr instanceof _CellRangeExpression) {
					return (<_CellRangeExpression>cellExpr).cells.columnSpan;
				}
				throw 'Invalid Cell Reference.';
			}, 1, 1);

			self._functionTable['row'] = new _FunctionDefinition((params, sheet?: Sheet, rowIndex?: number, columnIndex?: number) => {
				var cellExpr: _Expression;
				if (params == null) {
					return rowIndex + 1;
				}

				cellExpr = params[0];
				cellExpr = self._ensureNonFunctionExpression(<_Expression>cellExpr);
				if (cellExpr instanceof _CellRangeExpression) {
					return (<_CellRangeExpression>cellExpr).cells.row + 1;
				}
				throw 'Invalid Cell Reference.';
			}, 1, 0);

			self._functionTable['rows'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var cellExpr = params[0];

				cellExpr = self._ensureNonFunctionExpression(<_Expression>cellExpr);
				if (cellExpr instanceof _CellRangeExpression) {
					return (<_CellRangeExpression>cellExpr).cells.rowSpan;
				}
				throw 'Invalid Cell Reference.';
			}, 1, 1);

			self._functionTable['choose'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var index = _Expression.toNumber(params[0], sheet);

				if (isNaN(index)) {
					throw 'Invalid index number.';
				}

				if (index < 1 || index >= params.length) {
					throw 'The index number is out of the list range.';
				}

				return params[index].evaluate(sheet);
			}, 255, 2);

			self._functionTable['index'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var cellExpr = params[0],
					cells: wjcGrid.CellRange,
					rowNum = _Expression.toNumber(params[1], sheet),
					colNum = params[2] != null ? _Expression.toNumber(params[2], sheet) : 0;

				if (isNaN(rowNum) || rowNum < 0) {
					throw 'Invalid Row Number.';
				}
				if (isNaN(colNum) || colNum < 0) {
					throw 'Invalid Column Number.';
				}

				cellExpr = self._ensureNonFunctionExpression(<_Expression>cellExpr);
				if (cellExpr instanceof _CellRangeExpression) {
					cells = (<_CellRangeExpression>cellExpr).cells;
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
						return new _CellRangeExpression(new wjcGrid.CellRange(cells.topRow, cells.leftCol + colNum - 1, cells.bottomRow, cells.leftCol + colNum - 1), (<_CellRangeExpression>cellExpr).sheetRef, self._owner);
					}
					if (colNum === 0) {
						return new _CellRangeExpression(new wjcGrid.CellRange(cells.topRow + rowNum - 1, cells.leftCol, cells.topRow + rowNum - 1, cells.rightCol), (<_CellRangeExpression>cellExpr).sheetRef, self._owner);
					}
				}
				throw 'Invalid Cell Reference.';
			}, 4, 2);

			self._functionTable['hlookup'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				return self._handleHLookup(params, sheet);
			}, 4, 3);
		}

		// Register the finacial function for the calcEngine.
		private _registFinacialFunction() {
			var self = this;

			self._functionTable['rate'] = new _FunctionDefinition((params, sheet?: Sheet) => {
				var rate = self._calculateRate(params, sheet);

				return {
					value: rate,
					format: 'p2'
				};
			}, 6, 3);
		}

		// Add token into the static token table.
		private _addToken(symbol: any, id: _TokenID, type: _TokenType) {
			var token = new _Token(symbol, id, type);
			this._tokenTable[symbol] = token;
		}

		// Parse expression
		private _parseExpression(): _Expression {
			this._getToken();
			return this._parseCompareOrConcat();
		}

		// Parse compare expression
		private _parseCompareOrConcat(): _Expression {
			var x = this._parseAddSub(),
				t: _Token,
				exprArg: _Expression;

			while (this._token.tokenType === _TokenType.COMPARE || this._token.tokenType === _TokenType.CONCAT) {
				t = this._token;
				this._getToken();
				exprArg = this._parseAddSub();
				x = new _BinaryExpression(t, x, exprArg);
			}

			return x;
		}

		// Parse add/sub expression.
		private _parseAddSub(): _Expression {
			var x = this._parseMulDiv(),
				t: _Token,
				exprArg: _Expression;

			while (this._token.tokenType === _TokenType.ADDSUB) {
				t = this._token;
				this._getToken();
				exprArg = this._parseMulDiv();
				x = new _BinaryExpression(t, x, exprArg);
			}

			return x;
		}

		// Parse multiple/division expression.
		private _parseMulDiv(): _Expression {
			var x = this._parsePower(),
				t: _Token,
				exprArg: _Expression;

			while (this._token.tokenType === _TokenType.MULDIV) {
				t = this._token;
				this._getToken();
				exprArg = this._parsePower();
				x = new _BinaryExpression(t, x, exprArg);
			}

			return x;
		}

		// Parse power expression.
		private _parsePower(): _Expression {
			var x = this._parseUnary(),
				t: _Token,
				exprArg: _Expression;

			while (this._token.tokenType === _TokenType.POWER) {
				t = this._token;
				this._getToken();
				exprArg = this._parseUnary();
				x = new _BinaryExpression(t, x, exprArg);
			}

			return x;
		}

		// Parse unary expression
		private _parseUnary(): _Expression {
			var t: _Token,
				exprArg: _Expression;

			// unary plus and minus
			if (this._token.tokenID === _TokenID.ADD || this._token.tokenID === _TokenID.SUB) {
				t = this._token;
				this._getToken();
				exprArg = this._parseAtom();
				return new _UnaryExpression(t, exprArg);
			}

			// not unary, return atom
			return this._parseAtom();
		}

		// Parse atomic expression
		private _parseAtom(): _Expression {
            var x: _Expression = null,
                id: string,
                funcDefinition: _FunctionDefinition,
                params: Array<_Expression>,
                pCnt: number,
                cellRef: _ICellReferrence,
                definedName: any,
                orgExpression: string,
                orgExpressionLength: number,
                orgPointer: number,
                definedNameRefs: string[],
                definedNameRef: string,
                sheetRef: string;

			switch (this._token.tokenType) {
				// literals
				case _TokenType.LITERAL:
					x = new _Expression(this._token);
					break;
				// identifiers
				case _TokenType.IDENTIFIER:
					// get identifier
                    id = this._token.value.toString().toLowerCase();
					funcDefinition = this._functionTable[id];

					// look for functions
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

                    // look for defined name
                    definedNameRefs = id.split('!');
                    if (definedNameRefs.length === 2) {
                        sheetRef = definedNameRefs[0];
                        definedNameRef = definedNameRefs[1];
                    } else {
                        definedNameRef = definedNameRefs[0];
                    }
                    definedName = this._getDefinedName(definedNameRef);
                    if (definedName) {
                        if (!definedName.sheetName || definedName.sheetName === this._owner.selectedSheet.name || definedName.sheetName.toLowerCase() === sheetRef) {
                            orgPointer = this._pointer;
                            orgExpressionLength = this._expressLength;
                            orgExpression = this._expression;
                            this._pointer = 0;
                            x = this._checkCache(definedName.value);
                            this._pointer = orgPointer;
                            this._expressLength = orgExpressionLength;
                            this._expression = orgExpression;
                            break;
                        } else {
                            throw 'The defined name item works in ' + definedName.sheetName + '.  It does not work in current sheet.';
                        }
                    }

					// look for Cell Range.
					cellRef = this._getCellRange(id);
					if (cellRef) {
						x = new _CellRangeExpression(cellRef.cellRange, cellRef.sheetRef, this._owner);
						break;
                    }

					// trigger the unknownFunction event.
					params = this._getParameters();
					x = this.onUnknownFunction(id, params);

					break;
				// sub-expressions
				case _TokenType.GROUP:
					// anything other than opening parenthesis is illegal here
					if (this._token.tokenID !== _TokenID.OPEN) {
						throw 'Expression expected.';
					}

					// get expression
					this._getToken();
					x = this._parseCompareOrConcat();

                    // check that the parenthesis was closed
                    if (this._token.tokenID !== <_TokenID>_TokenID.CLOSE) {
						throw 'Unbalanced parenthesis.';
					}

					break;
			}

			// make sure we got something...
			if (x === null) {
				throw '';
			}

			// done
			this._getToken();
			return x;
		}

		// Get token for the expression.
		private _getToken() {
			var i: number,
				c: string,
				lastChar: string,
				isLetter: boolean,
				isDigit: boolean,
				id = '',
				sheetRef = '',
				// About the Japanese characters checking
				// Please refer http://stackoverflow.com/questions/15033196/using-javascript-to-check-whether-a-string-contains-japanese-characters-includi
				// And http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml
				japaneseRegExp = new RegExp('[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]');

			// eat white space 
			while (this._pointer < this._expressLength && this._expression[this._pointer] === ' ') {
				this._pointer++;
			}

			// are we done?
			if (this._pointer >= this._expressLength) {
				this._token = new _Token(null, _TokenID.END, _TokenType.GROUP);
				return;
			}

			// prepare to parse
			c = this._expression[this._pointer];

			// operators
			// this gets called a lot, so it's pretty optimized.
			// note that operators must start with non-letter/digit characters.
			isLetter = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || japaneseRegExp.test(c);
			isDigit = (c >= '0' && c <= '9') || c == '.';
			if (!isLetter && !isDigit) {
				var tk = this._tokenTable[c];
				if (tk) {
					// save token we found
					this._token = tk;
					this._pointer++;

					// look for double-char tokens (special case)
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

			// parse numbers token
			if (isDigit) {
				this._parseDigit();
				return;
			}

			// parse strings token
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

			// parse dates token
			if (c === '#') { 
				this._parseDate();
				return;
			}

			// identifiers (functions, objects) must start with alpha or underscore
			if (!isLetter && c !== '_' && this._idChars.indexOf(c) < 0 && !sheetRef) {
				throw 'Identifier expected.';
			}

			// and must contain only letters/digits/_idChars
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

			// got identifier
			id += sheetRef + this._expression.substring(this._pointer, this._pointer + i);
			this._pointer += i;
			this._token = new _Token(id, _TokenID.ATOM, _TokenType.IDENTIFIER);
		}

		// Parse digit token
		private _parseDigit() {
			var div = -1,
				sci = false,
				pct = false,
				val = 0.0,
				i: number,
				c: string,
				lit: string;

			for (i = 0; i + this._pointer < this._expressLength; i++) {
				c = this._expression[this._pointer + i];

				// digits always OK
				if (c >= '0' && c <= '9') {
					val = val * 10 + (+c - 0);
					if (div > -1) {
						div *= 10;
					}
					continue;
				}

				// one decimal is OK
				if (c === '.' && div < 0) {
					div = 1;
					continue;
				}

				// scientific notation?
				if ((c === 'E' || c === 'e') && !sci) {
					sci = true;
					c = this._expression[this._pointer + i + 1];
					if (c === '+' || c === '-') i++;
					continue;
				}

				// percentage?
				if (c === '%') {
					pct = true;
					i++;
					break;
				}

				// end of literal
				break;
			}

			// end of number, get value
			if (!sci) {
				// much faster than ParseDouble
				if (div > 1) {
					val /= div;
				}
				if (pct) {
					val /= 100.0;
				}
			} else {
				lit = this._expression.substring(this._pointer, this._pointer + i);
				val = +lit;
			}

			// build token
			this._token = new _Token(val, _TokenID.ATOM, _TokenType.LITERAL);

			// advance pointer and return
			this._pointer += i;
		}

		// Parse string token
		private _parseString() {
			var i: number,
				c: string,
				cNext: string,
				lit: string;

			// look for end quote, skip double quotes
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

			// check that we got the end of the string
			if (c !== '\"') {
				throw 'Can\'t find final quote.';
			}

			// end of string
			lit = this._expression.substring(this._pointer + 1, this._pointer + i);
			this._pointer += i + 1;
			if (this._expression[this._pointer] === '!') {
				throw 'Illegal cross sheet reference.';
			}
			this._token = new _Token(lit.replace('\"\"', '\"'), _TokenID.ATOM, _TokenType.LITERAL);
		}

		// Parse datetime token
		private _parseDate() {
			var i: number,
				c: string,
				lit: string;

			// look for end #
			for (i = 1; i + this._pointer < this._expressLength; i++) {
				c = this._expression[this._pointer + i];
				if (c === '#') {
					break;
				}
			}

			// check that we got the end of the date
			if (c !== '#') {
				throw 'Can\'t find final date delimiter ("#").';
			}

			// end of date
			lit = this._expression.substring(this._pointer + 1, this._pointer + i);
			this._pointer += i + 1;
			this._token = new _Token(Date.parse(lit), _TokenID.ATOM, _TokenType.LITERAL);
		}

		// Parse the sheet reference.
		private _parseSheetRef(): string {
			var i: number,
				c: string,
				cNext: string,
				lit: string;

			// look for end quote, skip double quotes
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

			// check that we got the end of the string
			if (c !== '\'') {
				throw 'Can\'t find final quote.';
			}

			// end of string
			lit = this._expression.substring(this._pointer + 1, this._pointer + i);
			this._pointer += i + 1;
			if (this._expression[this._pointer] === '!') {
				return lit.replace(/\'\'/g, '\'');
			} else {
				return '';
			}
		}

		// Gets the cell range by the identifier.
		// For e.g. A1:C3 to cellRange(row=0, col=0, row1=2, col1=2)
		private _getCellRange(identifier: string): _ICellReferrence {
			var cells: string[],
				cell: _ICellReferrence,
				cell2: _ICellReferrence,
				sheetRef: string,
				rng: wjcGrid.CellRange,
				rng2: wjcGrid.CellRange;

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
							throw 'The cell reference must be in the same sheet!'
						}

						if (rng2) {
							rng.col2 = rng2.col;
							rng.row2 = rng2.row;
						} else {
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
		}

		// Parse the single string cell identifier to cell range;
		// For e.g. A1 to cellRange(row=0, col=0).
		private _parseCellRange(cell: string): wjcGrid.CellRange {
			var col = -1,
				row = -1,
				absCol = false,
				absRow = false,
				index: number,
				c: string;

			// parse column
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

			// parse row
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

			// sanity
			if (index < cell.length) {
				row = col = -1;
			}

			if (row === -1 || col === -1) {
				return null;
			}

			// done
			return new wjcGrid.CellRange(row - 1, col - 1);
		}

		// Parse the single cell reference string to cell reference object.
		// For e.g. 'sheet1!A1' to { sheetRef: 'sheet1', cellRange: CellRange(row = 0, col = 0)}
		private _parseCell(cell: string): _ICellReferrence {
			var rng: wjcGrid.CellRange,
				sheetRefIndex: number,
				cellsRef: string,
				sheetRef: string;

			sheetRefIndex = cell.lastIndexOf('!');

			if (sheetRefIndex > 0 && sheetRefIndex < cell.length - 1) {
				sheetRef = cell.substring(0, sheetRefIndex);
				cellsRef = cell.substring(sheetRefIndex + 1);
			} else if (sheetRefIndex <= 0) {
				cellsRef = cell;
			} else {
				return null;
			}

			rng = this._parseCellRange(cellsRef);

			return {
				cellRange: rng,
				sheetRef: sheetRef
			};
		}

		// Gets the parameters for the function.
		// e.g. myfun(a, b, c+2)
		private _getParameters() {
			// check whether next token is a (, 
			// restore state and bail if it's not
			var pos = this._pointer,
				tk = this._token,
				parms: Array<_Expression>,
				expr: _Expression;

			this._getToken();

            if (this._token.tokenID !== <_TokenID>_TokenID.OPEN) {
				this._pointer = pos;
				this._token = tk;
				return null;
			}

			// check for empty Parameter list
			pos = this._pointer;
			this._getToken();
            if (this._token.tokenID === <_TokenID>_TokenID.CLOSE) {
				return null;
			}
			this._pointer = pos;

			// get Parameters until we reach the end of the list
			parms = new Array();
			expr = this._parseExpression();
			parms.push(expr);
			while (this._token.tokenID === _TokenID.COMMA) {
				expr = this._parseExpression();
				parms.push(expr);
			}

			// make sure the list was closed correctly
			if (this._token.tokenID !== _TokenID.CLOSE) {
				throw 'Syntax error.';
			}

			// done
			return parms;
		}

		// Get the aggregate result for the CalcEngine.
		private _getAggregateResult(aggType: wjcCore.Aggregate, params: Array<_Expression>, sheet?: Sheet): any {
            var list = this._getItemList(params, sheet),
                result: any;

            result = wjcCore.getAggregate(aggType, list.items);
            if (list.isDate) {
                result = new Date(result);
            }
            return result;
		}

		// Get the flexsheet aggregate result for the CalcEngine
        private _getFlexSheetAggregateResult(aggType: _FlexSheetAggregate, params: Array<_Expression>, sheet?: Sheet): any {
            var list: _ICalcutationItems,
                sumList: _ICalcutationItems,
				num: number,
				order: number;

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
					params[1] = this._ensureNonFunctionExpression(<_Expression>params[1]);
					if (params[1] instanceof _CellRangeExpression) {
                        list = this._getItemList([params[1]], sheet);
                        return this._getRankOfCellRange(num, list.items, order);
					}
					throw 'Invalid Cell Reference.';
				case _FlexSheetAggregate.CountIf:
					params[0] = this._ensureNonFunctionExpression(<_Expression>params[0]);
					if (params[0] instanceof _CellRangeExpression) {
                        list = this._getItemList([params[0]], sheet, false);
                        return this._countCellsByCriterias([list.items], [params[1]], sheet);
					}
					throw 'Invalid Cell Reference.';
				case _FlexSheetAggregate.CountIfs:
					return this._handleCountIfs(params, sheet);
				case _FlexSheetAggregate.SumIf:
					params[0] = this._ensureNonFunctionExpression(<_Expression>params[0]);
					if (params[0] instanceof _CellRangeExpression) {
                        list = this._getItemList([params[0]], sheet, false);
						params[2] = this._ensureNonFunctionExpression(<_Expression>params[2]);
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
		}

        // Get item list for aggregate processing.
        private _getItemList(params: Array<_Expression>, sheet?: Sheet, needParseToNum: boolean = true, isGetEmptyValue: boolean = false, isGetHiddenValue: boolean = true, columnIndex?: number): _ICalcutationItems {
            var items: Array<any> = new Array<any>(),
                item: any,
                index: number,
                cellIndex: number,
                cellValues: any[],
                param: _Expression,
                isDate = true;

			for (index = 0; index < params.length; index++) {
				param = params[index];
				// When meets the CellRangeExpression, 
				// we need set the value of the each cell in the cell range into the array to get the aggregate result.
				param = this._ensureNonFunctionExpression(<_Expression>param);
				if (param instanceof _CellRangeExpression) {
					cellValues = (<_CellRangeExpression>param).getValues(isGetHiddenValue, columnIndex, sheet);
					cells:
					for (cellIndex = 0; cellIndex < cellValues.length; cellIndex++) {
						item = cellValues[cellIndex];
                        if (!isGetEmptyValue && (item == null || item === '')) {
							continue cells;
                        }
                        isDate = isDate && (item instanceof Date);
						item = needParseToNum ? +item : item;
                        items.push(item);
					}
				} else {
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
		}

		// Count blank cells
		private _countBlankCells(items: Array<any>): number {
			var i = 0,
				count = 0,
				item: any;

			for (; i < items.length; i++) {
				item = items[i];
				if (item == null || (wjcCore.isString(item) && item === '') || (wjcCore.isNumber(item) && isNaN(item))) {
					count++;
				}
			}

			return count;
		}

		// Count number cells
		private _countNumberCells(items: Array<any>): number {
			var i = 0,
				count = 0,
				item: any;

			for (; i < items.length; i++) {
				item = items[i];
				if (item != null && wjcCore.isNumber(item) && !isNaN(item)) {
					count++;
				}
			}

			return count;
		}

		// Get the rank for the number in the cell range.
		private _getRankOfCellRange(num: number, items: Array<any>, order: number = 0): number {
			var i = 0,
				rank = 0,
				item: any;

			// Sort the items list
			if (!order) {
				items.sort((a, b) => {
					if (isNaN(a) || isNaN(b)) {
						return 1;
					}
					return b - a;
				});
			} else {
				items.sort((a, b) => {
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
		}

		// Handles the CountIfs function
		private _handleCountIfs(params: Array<_Expression>, sheet?: Sheet) {
            var i = 0,
				itemsList = [],
                critreiaList = [],
                list: _ICalcutationItems,
				cellExpr: _Expression,
				rowCount: number,
				colCount: number;
				
			if (params.length % 2 !== 0) {
				throw 'Invalid params.';
			}
			for (; i < params.length / 2; i++) {
				cellExpr = params[2 * i];
				cellExpr = this._ensureNonFunctionExpression(cellExpr);
				if (cellExpr instanceof _CellRangeExpression) {
					if (i === 0) {
						if ((<_CellRangeExpression>cellExpr).cells) {
							rowCount = (<_CellRangeExpression>cellExpr).cells.rowSpan;
							colCount = (<_CellRangeExpression>cellExpr).cells.columnSpan;
						} else {
							throw 'Invalid Cell Reference.';
						}
					} else {
						if (!(<_CellRangeExpression>cellExpr).cells) {
							throw 'Invalid Cell Reference.';
						} else if ((<_CellRangeExpression>cellExpr).cells.rowSpan !== rowCount || (<_CellRangeExpression>cellExpr).cells.columnSpan !== colCount){
							throw 'The row span and column span of each cell range has to be same with each other.';
						}
                    }
                    list = this._getItemList([cellExpr], sheet, false);
                    itemsList[i] = list.items;
					
					critreiaList[i] = params[2 * i + 1];
				} else {
					throw 'Invalid Cell Reference.';
				}
			}

			return this._countCellsByCriterias(itemsList, critreiaList, sheet);
		}

		// Count the cells that meet the criteria.
		private _countCellsByCriterias(itemsList: Array<any>[], criterias: _Expression[], sheet?: Sheet, countItems?: Array<any>): number {
			var i = 0,
				j = 0,
				count = 0,
				rangeLength = itemsList[0].length,
				parsedRightExprs = [],
				result: boolean,
				countItem: any,
				items: Array<any>,
				leftExpr: any,
				rightExpr: any;

			for (; j < criterias.length; j++) {
				rightExpr = _Expression.toString(criterias[j], sheet);
				if (rightExpr.length === 0) {
					throw 'Invalid Criteria.';
				}
				if (rightExpr === '*') {
					parsedRightExprs.push(rightExpr);
				} else {
					parsedRightExprs.push(this._parseRightExpr(rightExpr));
				}
			}

			for (; i < rangeLength; i++) {
				result = false;
				criteriaLoop:
				for (j = 0; j < itemsList.length; j++) {
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
					} else {
						result = result = (<_IRegCriteria>rightExpr).reg.test(leftExpr.toString()) === (<_IRegCriteria>rightExpr).checkMathces;
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
					} else {
						count++;
					}
				}
			}

			return count;
		}

		// Handles the SumIfs function
		private _handleSumIfs(params: Array<_Expression>, sheet?: Sheet) {
			var i = 1,
				itemsList = [],
                critreiaList = [],
                list: _ICalcutationItems,
                sumList: _ICalcutationItems,
				sumCellExpr: _Expression,
				cellExpr: _Expression,
				rowCount: number,
				colCount: number;

			if (params.length % 2 !== 1) {
				throw 'Invalid params.';
			}

			sumCellExpr = params[0];
			sumCellExpr = this._ensureNonFunctionExpression(sumCellExpr);
			if (sumCellExpr instanceof _CellRangeExpression) {
				if ((<_CellRangeExpression>sumCellExpr).cells) {
					rowCount = (<_CellRangeExpression>sumCellExpr).cells.rowSpan;
					colCount = (<_CellRangeExpression>sumCellExpr).cells.columnSpan;
				} else {
					throw 'Invalid Sum Cell Reference.';
                }
                sumList = this._getItemList([sumCellExpr], sheet);
			} else {
				throw 'Invalid Sum Cell Reference.';
			}

			for (; i < (params.length + 1) / 2; i++) {
				cellExpr = params[2 * i - 1];
				cellExpr = this._ensureNonFunctionExpression(cellExpr);
				if (cellExpr instanceof _CellRangeExpression) {
					if (!(<_CellRangeExpression>cellExpr).cells) {
						throw 'Invalid Criteria Cell Reference.';
					} else if ((<_CellRangeExpression>cellExpr).cells.rowSpan !== rowCount || (<_CellRangeExpression>cellExpr).cells.columnSpan !== colCount) {
						throw 'The row span and column span of each cell range has to be same with each other.';
                    }
                    list = this._getItemList([cellExpr], sheet, false);
                    itemsList[i - 1] = list.items;

					critreiaList[i - 1] = params[2 * i];
				} else {
					throw 'Invalid Criteria Cell Reference.';
				}
			}

            return this._sumCellsByCriterias(itemsList, critreiaList, sumList.items, sheet);
		}

		// Gets the sum of the numeric values in the cells specified by a given criteria.
		private _sumCellsByCriterias(itemsList: Array<any>[], criterias: _Expression[], sumItems?: Array<any>, sheet?: Sheet): number {
			var i = 0,
				j = 0,
				sum = 0,
				sumItem: number,
				rangeLength = itemsList[0].length,
				parsedRightExprs = [],
				result: boolean,
				items: Array<any>,
				leftExpr: any,
				rightExpr: any;

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
				} else {
					parsedRightExprs.push(this._parseRightExpr(rightExpr));
				}
			}

			for (; i < rangeLength; i++) {
				result = false;
				sumItem = sumItems[i];

				criteriaLoop:
				for (j = 0; j < itemsList.length; j++) {
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
				} else {
						result = (<_IRegCriteria>rightExpr).reg.test(leftExpr.toString()) === (<_IRegCriteria>rightExpr).checkMathces;
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
		}

		// Get product for numbers
		private _getProductOfNumbers(items: any[]) {
			var item: any,
				i = 0,
				product = 1,
				containsValidNum = false;

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
		}

		//  Handle the subtotal function.
		private _handleSubtotal(params: Array<_Expression>, sheet: Sheet): any {
            var func: any,
                list: _ICalcutationItems,
                aggType: wjcCore.Aggregate,
                result: any,
				isGetHiddenValue = true;

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
		}

		// Handle the DCount function.
		private _handleDCount(params: Array<_Expression>, sheet: Sheet) {
			var cellExpr = params[0],
				criteriaCellExpr = params[2],
				count = 0,
				field: any,
                columnIndex: number,
                list: _ICalcutationItems;

			cellExpr = this._ensureNonFunctionExpression(cellExpr);
			criteriaCellExpr = this._ensureNonFunctionExpression(criteriaCellExpr);

			if (cellExpr instanceof _CellRangeExpression && criteriaCellExpr instanceof _CellRangeExpression) {
				field = params[1].evaluate(sheet);
				columnIndex = this._getColumnIndexByField(<_CellRangeExpression>cellExpr, field);
                list = this._getItemList([cellExpr], sheet, true, false, true, columnIndex);
                if (list.items && list.items.length > 1) {
                    return this._DCountWithCriterias(list.items.slice(1), <_CellRangeExpression>cellExpr, <_CellRangeExpression>criteriaCellExpr);
				}
			}

			throw 'Invalid Count Cell Reference.';
		}

		// Counts the cells by the specified criterias.
		private _DCountWithCriterias(countItems: Array<any>, countRef: _CellRangeExpression, criteriaRef: _CellRangeExpression) {
			var criteriaCells = criteriaRef.cells,
				count = 0,
				countSheet: Sheet,
				criteriaSheet: Sheet,
				fieldRowIndex: number,
				rowIndex: number,
				colIndex: number,
				criteriaColIndex: number,
				criteria: any,
                criteriaField: any,
                list: _ICalcutationItems,
				itemsList: Array<any>[],
				criteriaList: any[];
				
			countSheet = this._getSheet(countRef.sheetRef);
			criteriaSheet = this._getSheet(criteriaRef.sheetRef);

			if (criteriaCells.rowSpan > 1) {
				fieldRowIndex = criteriaCells.topRow;
				for (rowIndex = criteriaCells.bottomRow; rowIndex > criteriaCells.topRow; rowIndex--) {
					itemsList = [];
					criteriaList = [];
					for (colIndex = criteriaCells.leftCol; colIndex <= criteriaCells.rightCol; colIndex++) {
						// Collects the criterias and related cell reference.
						criteria = this._owner.getCellValue(rowIndex, colIndex, false, criteriaSheet);
						if (criteria != null && criteria !== '') {
							criteriaList.push(new _Expression(criteria));

							criteriaField = this._owner.getCellValue(fieldRowIndex, colIndex, false, criteriaSheet);
							criteriaColIndex = this._getColumnIndexByField(countRef, criteriaField);
                            list = this._getItemList([countRef], countSheet, false, false, true, criteriaColIndex);
                            if (list.items != null && list.items.length > 1) {
                                itemsList.push(list.items.slice(1));
							} else {
								throw 'Invalid Count Cell Reference.';
							}
						}
					}

					count += this._countCellsByCriterias(itemsList, criteriaList, countSheet, countItems);
				}

				return count;
			}

			throw 'Invalid Criteria Cell Reference.'
		}

		// Get column index of the count cell range by the field.
		private _getColumnIndexByField(cellExpr: _CellRangeExpression, field: any) {
			var cells: wjcGrid.CellRange,
				sheet: Sheet,
				columnIndex: number,
				value: any,
				rowIndex: number;

			cells = cellExpr.cells;
			rowIndex = cells.topRow;

			if (rowIndex === -1) {
				throw 'Invalid Count Cell Reference.';
			}

			if (wjcCore.isInt(field) && !isNaN(field)) {
				// if the field is integer, we consider the field it the column index of the count cell range.
				if (field >= 1 && field <= cells.columnSpan) {
					columnIndex = cells.leftCol + field - 1;
					return columnIndex;
				}
			} else {
				sheet = this._getSheet(cellExpr.sheetRef);
				for (columnIndex = cells.leftCol; columnIndex <= cells.rightCol; columnIndex++) {
					value = this._owner.getCellValue(rowIndex, columnIndex, false, sheet);
					field = wjcCore.isString(field) ? (<string>field).toLowerCase() : field;
					value = wjcCore.isString(value) ? (<string>value).toLowerCase() : value;
					if (field === value) {
						return columnIndex;
					}
				}
			}

			throw 'Invalid field.';
        }

        // Gets the result of the sumProduct formula. 
        private _getSumProduct(params: Array<_Expression>, sheet: Sheet): number {
            var product: number,
                sum: number = 0,
                list = this._getItemListForSumProduct(params, sheet),
                xAxisCnt: number,
                yAxisCnt: number;

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
        }

        // Gets item list for the sumProduct formula.
        private _getItemListForSumProduct(params: Array<_Expression>, sheet: Sheet): Array<number>[] {
            var list: Array<number>[] = [new Array<number>()], 
                items: Array<number>,
                item: any,
                index: number,
                cellIndex: number,
                cellValues: any[],
                param: _Expression;

            for (index = 0; index < params.length; index++) {
                param = params[index];
                items = new Array<number>(),
                // When meets the CellRangeExpression, 
                // we need set the value of the each cell in the cell range into the array to get the aggregate result.
                param = this._ensureNonFunctionExpression(<_Expression>param);
                if (param instanceof _CellRangeExpression) {
                    cellValues = (<_CellRangeExpression>param).getValues(true, null, sheet);
                    for (cellIndex = 0; cellIndex < cellValues.length; cellIndex++) {
                        item = cellValues[cellIndex];
                        items.push(+item);
                    }
                } else {
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
        }

		// Gets the sheet by the sheetRef.
		private _getSheet(sheetRef: string): Sheet {
			var i = 0,
				sheet: Sheet;

			if (sheetRef) {
				for (; i < this._owner.sheets.length; i++) {
					sheet = this._owner.sheets[i];

					if (sheet.name === sheetRef) {
						break;
					}
				}
			} 

			return sheet;
		}

		// Parse the right expression for countif countifs sumif and sumifs function.
		private _parseRightExpr(rightExpr: string): any {
			var match: string[],
				matchReg: RegExp,
				checkMathces = false;

			// Match the criteria that contains '?' such as '??match' and etc..
			if (rightExpr.indexOf('?') > -1 || rightExpr.indexOf('*') > -1) {
				match = rightExpr.match(/([\?\*]*)(\w+)([\?\*]*)(\w+)([\?\*]*)/);
				if (match != null && match.length === 6) {
					matchReg = new RegExp('^' + (match[1].length > 0 ? this._parseRegCriteria(match[1]) : '') + match[2]
						+ (match[3].length > 0 ? this._parseRegCriteria(match[3]) : '') + match[4]
						+ (match[5].length > 0 ? this._parseRegCriteria(match[5]) : '') + '$', 'i');
				} else {
					throw 'Invalid Criteria.';
				}

				if (/^[<>=]/.test(rightExpr)) {
					if (rightExpr.trim()[0] === '=') {
						checkMathces = true;
					}
				} else {
					checkMathces = true;
				}

				return {
					reg: matchReg,
					checkMathces: checkMathces
				};
			} else {
				if (!isNaN(+rightExpr)) {
					rightExpr = '=' + rightExpr;
				} else if (/^\w/.test(rightExpr)) {
					rightExpr = '="' + rightExpr + '"';
				} else if (/^[<>=]{1,2}\s*-?\w+$/.test(rightExpr)) {
					rightExpr = rightExpr.replace(/([<>=]{1,2})\s*(-?\w+)/, '$1"$2"');
				} else {
					throw 'Invalid Criteria.';
				}

				return rightExpr;
			}
		}

		// combine the left expression and right expression for countif countifs sumif and sumifs function.
		private _combineExpr(leftExpr: any, rightExpr: string): string {
			if (wjcCore.isString(leftExpr)) {
				leftExpr = '"' + leftExpr + '"';
			}
			leftExpr = '=' + leftExpr;

			return leftExpr + rightExpr;
		}

		// Parse regex criteria for '?' and '*'
		private _parseRegCriteria(criteria: string): string {
			var i = 0,
				questionMarkCnt = 0,
				regString = '';

			for (; i < criteria.length; i++) {
				if (criteria[i] === '*') {
					if (questionMarkCnt > 0) {
						regString += '\\w{' + questionMarkCnt + '}';
						questionMarkCnt = 0;
					}
					regString += '\\w*'
				} else if (criteria[i] === '?') {
					questionMarkCnt++;
				}
			}

			if (questionMarkCnt > 0) {
				regString += '\\w{' + questionMarkCnt + '}';
			}

			return regString;
		}

		// Calculate the rate.
		// The algorithm of the rate calculation refers http://stackoverflow.com/questions/3198939/recreate-excel-rate-function-using-newtons-method
		private _calculateRate(params: Array<_Expression>, sheet?: Sheet) {
			var FINANCIAL_PRECISION = 0.0000001,
				FINANCIAL_MAX_ITERATIONS = 20,
				i = 0,
				x0 = 0,
				x1: number,
				rate: number,
				nper: number,
				pmt: number,
				pv: number,
				fv: number,
				type: number,
				guess: number,
				y: number,
				f: number,
				y0: number,
				y1: number;

			nper = _Expression.toNumber(params[0], sheet);
			pmt = _Expression.toNumber(params[1], sheet);
			pv = _Expression.toNumber(params[2], sheet);
			fv = params[3] != null ? _Expression.toNumber(params[3], sheet) : 0;
			type = params[4] != null ? _Expression.toNumber(params[4], sheet) : 0;
			guess = params[5] != null ? _Expression.toNumber(params[5], sheet) : 0.1;

			rate = guess;
			if (Math.abs(rate) < FINANCIAL_PRECISION) {
				y = pv * (1 + nper * rate) + pmt * (1 + rate * type) * nper + fv;
			} else {
				f = Math.exp(nper * Math.log(1 + rate));
				y = pv * f + pmt * (1 / rate + type) * (f - 1) + fv;
			}
			y0 = pv + pmt * nper + fv;
			y1 = pv * f + pmt * (1 / rate + type) * (f - 1) + fv;

			// find root by secant method
			x1 = rate;
			while ((Math.abs(y0 - y1) > FINANCIAL_PRECISION) && (i < FINANCIAL_MAX_ITERATIONS)) {
				rate = (y1 * x0 - y0 * x1) / (y1 - y0);
				x0 = x1;
				x1 = rate;

				if (Math.abs(rate) < FINANCIAL_PRECISION) {
					y = pv * (1 + nper * rate) + pmt * (1 + rate * type) * nper + fv;
				} else {
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
		}

		// Handle the hlookup function.
		private _handleHLookup(params: Array<_Expression>, sheet?: Sheet) {
			var lookupVal = (<_Expression>params[0]).evaluate(sheet),
				cellExpr = params[1],
				rowNum = _Expression.toNumber(params[2], sheet),
				approximateMatch = params[3] != null ? _Expression.toBoolean(params[3], sheet) : true,
				cells: wjcGrid.CellRange,
				colNum: number;

			if (lookupVal == null || lookupVal == '') {
				throw 'Invalid lookup value.';
			}

			if (isNaN(rowNum) || rowNum < 0) {
				throw 'Invalid row index.';
			}

			cellExpr = this._ensureNonFunctionExpression(<_Expression>cellExpr);
			if (cellExpr instanceof _CellRangeExpression) {
				cells = (<_CellRangeExpression>cellExpr).cells;
				if (rowNum > cells.rowSpan) {
					throw 'Row index is out of the cell range.';
				}
				if (approximateMatch) {
					colNum = this._exactMatch(lookupVal, cells, sheet, false);
					if (colNum === -1) {
						colNum = this._approximateMatch(lookupVal, cells, sheet);
					}
				} else {
					colNum = this._exactMatch(lookupVal, cells, sheet);
				}

				if (colNum === -1) {
					throw 'Lookup Value is not found.';
				}

				return this._owner.getCellValue(cells.topRow + rowNum - 1, colNum, false, sheet);
			}
			throw 'Invalid Cell Reference.';
		}

		// Handle the exact match for the hlookup.
		private _exactMatch(lookupValue: any, cells: wjcGrid.CellRange, sheet?: Sheet, needHandleWildCard: boolean = true): number {
			var rowIndex = cells.topRow,
				colIndex: number,
				value: any,
				match: any[],
				matchReg: RegExp;

			if (wjcCore.isString(lookupValue)) {
				lookupValue = (<string>lookupValue).toLowerCase();
			}

			// handle the wildcard question mark (?) and asterisk (*) for the lookup value.
			if (needHandleWildCard && wjcCore.isString(lookupValue) && ((<string>lookupValue).indexOf('?') > -1 || (<string>lookupValue).indexOf('*') > -1)) {
				match = (<string>lookupValue).match(/([\?\*]*)(\w+)([\?\*]*)(\w+)([\?\*]*)/);
				if (match != null && match.length === 6) {
					matchReg = new RegExp('^' + (match[1].length > 0 ? this._parseRegCriteria(match[1]) : '') + match[2]
						+ (match[3].length > 0 ? this._parseRegCriteria(match[3]) : '') + match[4]
						+ (match[5].length > 0 ? this._parseRegCriteria(match[5]) : '') + '$', 'i');
				} else {
					throw 'Invalid lookup value.';
				}
			}

			for (colIndex = cells.leftCol; colIndex <= cells.rightCol; colIndex++) {
				value = this._owner.getCellValue(rowIndex, colIndex, false, sheet);
				if (matchReg != null) {
					if (matchReg.test(value)) {
						return colIndex;
					}
				} else {
					if (wjcCore.isString(value)) {
						value = (<string>value).toLowerCase();
					}
					if (lookupValue === value) {
						return colIndex;
					}
				}
			}

			return -1;
		}

		// Handle the approximate match for the hlookup.
		private _approximateMatch(lookupValue: any, cells: wjcGrid.CellRange, sheet?: Sheet) {
			var val: any,
				colIndex: number,
				rowIndex = cells.topRow,
				cellValues = [],
				i = 0;

			if (wjcCore.isString(lookupValue)) {
				lookupValue = (<string>lookupValue).toLowerCase();
			}

			for (colIndex = cells.leftCol; colIndex <= cells.rightCol; colIndex++) {
				val = this._owner.getCellValue(rowIndex, colIndex, false, sheet);
				val = isNaN(+val) ? val : +val;
				cellValues.push({value: val, index: colIndex});
			}

			// Sort the cellValues array with descent order.
			cellValues.sort((a, b) => {
				if (wjcCore.isString(a.value)) {
					a.value = (<string>a.value).toLowerCase();
				}
				if (wjcCore.isString(b.value)) {
					b.value = (<string>b.value).toLowerCase();
				}
				if (a.value > b.value) {
					return -1;
				} else if (a.value === b.value) {
					return b.index - a.index;
				}
				return 1;
			})

			for (; i < cellValues.length; i++) {
				val = cellValues[i];
				if (wjcCore.isString(val.value)) {
					val.value = (<string>val.value).toLowerCase();
				}
				// return the column index of the first value that less than lookup value.
				if (lookupValue > val.value) {
					return val.index;
				}
			}

			throw 'Lookup Value is not found.';
		}

		// Check the expression cache.
		private _checkCache(expression: string): _Expression {
			var expr = this._expressionCache[expression];

			if (expr) {
				return expr;
			} 

			expr = this._parse(expression);
			// when the size of the expression cache is greater than 10000,
			// We will release the expression cache.
			if (this._cacheSize > 10000) {
				this._clearExpressionCache();
			}
			this._expressionCache[expression] = expr;
			this._cacheSize++;

			return expr;
		}

		// Ensure current is not function expression.
		private _ensureNonFunctionExpression(expr: _Expression, sheet?: Sheet) {
			while (expr instanceof _FunctionExpression) {
				expr = expr.evaluate(sheet);
			}
			return expr;
        }

        // Gets the defined name item of FlexSheet by its name.
        private _getDefinedName(name: string): any {
            var item: any;
            for (var i = 0; i < this._owner.definedNames.length; i++) {
                item = this._owner.definedNames[i];
                if (item.name.toLowerCase() === name) {
                    return item;
                }
            }
            return null;
        }
	}

	/*
	 * Defines the Token class.
	 *
	 * It assists the expression instance to evaluate value.
	 */
	export class _Token {
		private _tokenType: _TokenType;
		private _tokenID: _TokenID;
		private _value: any;

		/*
		 * Initializes a new instance of the @see:Token class.
		 *
		 * @param val The value of the token.
		 * @param tkID The @see:TokenID value of the token.
		 * @param tkType The @see:TokenType value of the token.
		 */
		constructor(val: any, tkID: _TokenID, tkType: _TokenType) {
			this._value = val;
			this._tokenID = tkID;
			this._tokenType = tkType;
		}

		/*
		 * Gets the value of the token instance.
		 */
		get value(): any {
			return this._value;
		}

		/*
		 * Gets the token ID of the token instance.
		 */
		get tokenID(): _TokenID {
			return this._tokenID;
		}

		/*
		 * Gets the token type of the token instance.
		 */
		get tokenType(): _TokenType {
			return this._tokenType;
		}
	}

	/*
	 * Function definition class (keeps function name, parameter counts, and function).
	 */
	export class _FunctionDefinition {
		private _paramMax: number = Number.MAX_VALUE;
		private _paramMin: number = Number.MIN_VALUE;
		private _func: Function;

		/*
		 * Initializes a new instance of the @see:FunctionDefinition class.
		 *
		 * @param func The function will be invoked by the CalcEngine.
		 * @param paramMax The maximum count of the parameter that the function need.
		 * @param paramMin The minimum count of the parameter that the function need.
		 */
		constructor(func: Function, paramMax?: number, paramMin?: number) {
			this._func = func;
			if (wjcCore.isNumber(paramMax) && !isNaN(paramMax)) {
				this._paramMax = paramMax;
			}
			if (wjcCore.isNumber(paramMin) && !isNaN(paramMin)) {
				this._paramMin = paramMin;
			}
		}

		/*
		 * Gets the paramMax of the FunctionDefinition instance.
		 */
		get paramMax(): number {
			return this._paramMax;
		}

		/*
		 * Gets the paramMin of the FunctionDefinition instance.
		 */
		get paramMin(): number {
			return this._paramMin;
		}

		/*
		 * Gets the func of the FunctionDefinition instance.
		 */
		get func(): Function {
			return this._func;
		}
	}

	/*
	 * Token types (used when building expressions, sequence defines operator priority)
	 */
	export enum _TokenType {
		/*
		 * This token type includes '<', '>', '=', '<=', '>=' and '<>'.
		 */
		COMPARE,
		/*
		 * This token type includes '+' and '-'.
		 */
		ADDSUB,
		/*
		 * This token type includes '*' and '/'.
		 */
		MULDIV,
		/*
		 * This token type includes '^'.
		 */
		POWER,
		/*
		 * This token type includes '&'.
		 */
		CONCAT,
		/*
		 * This token type includes '(' and ')'.
		 */
		GROUP,
		/*
		 * This token type includes number value, string value and etc..
		 */
		LITERAL,
		/*
		 * This token type includes function.
		 */
		IDENTIFIER 
	}

	/*
	 * Token ID (used when evaluating expressions)
	 */
	export enum _TokenID {
		/*
		 * Greater than.
		 */
		GT,
		/*
		 * Less than.
		 */
		LT,
		/*
		 * Greater than or equal to.
		 */
		GE,
		/*
		 * Less than or equal to.
		 */
		LE,
		/*
		 * Equal to.
		 */
		EQ,
		/*
		 * Not equal to.
		 */
		NE,
		/*
		 * Addition.
		 */
		ADD,
		/*
		 * Subtraction.
		 */
		SUB, 
		/*
		 * Multiplication.
		 */
		MUL,
		/*
		 * Division.
		 */
		DIV,
		/*
		 * Gets quotient of division.
		 */
		DIVINT,
		/*
		 * Gets remainder of division.
		 */
		MOD,
		/*
		 * Power.
		 */
		POWER,
		/*
		 * String concat.
		 */
		CONCAT,
		/*
		 * Opening bracket.
		 */
		OPEN,
		/*
		 * Closing bracket.
		 */
		CLOSE,
		/*
		 * Group end.
		 */
		END,
		/*
		 * Comma.
		 */
		COMMA,
		/*
		 * Period.
		 */
		PERIOD,
		/*
		 * Literal token
		 */
		ATOM
	}

	/*
	 * Specifies the type of aggregate for flexsheet.
	 */
	enum _FlexSheetAggregate {
		/*
		 * Counts the number of cells that contain numbers, and counts numbers within the list of arguments.
		 */
		Count,
		/*
		 * Returns the number of cells that are not empty in a range.
		 */
		CountA,
		/*
		 * Returns the number of empty cells in a specified range of cells.
		 */
		ConutBlank,
		/*
		 * Returns the number of the cells that meet the criteria you specify in the argument.
		 */
		CountIf,
		/*
		 * Returns the number of the cells that meet multiple criteria.
		 */
		CountIfs,
		/*
		 * Returns the rank of a number in a list of numbers.
		 */
		Rank,
		/*
		 * Returns the sum of the numeric values in the cells specified by a given criteria.
		 */
		SumIf,
		/*
		 * Returns the sum of the numeric values in the cells specified by a multiple criteria.
		 */
		SumIfs,
		/*
		 * Multiplies all the numbers given as arguments and returns the product.
		 */
		Product
	}

	/*
	 * Specifies the type of subtotal f to calculate over a group of values.
	 */
	enum _SubtotalFunction {
		/*
		 * Returns the average value of the numeric values in the group.
		 */
		Average = 1,
		/*
		 * Counts the number of cells that contain numbers, and counts numbers within the list of arguments.
		 */
		Count = 2,
		/*
		 * Counts the number of cells that are not empty in a range.
		 */
		CountA = 3,
		/*
		 * Returns the maximum value in the group.
		 */
		Max = 4,
		/*
		 * Returns the minimum value in the group.
		 */
		Min = 5,
		/*
		 * Multiplies all the numbers given as arguments and returns the product.
		 */
		Product = 6,
		/*
		 *Returns the sample standard deviation of the numeric values in the group 
		 * (uses the formula based on n-1).
		 */
		Std = 7,
		/*
		 *Returns the population standard deviation of the values in the group 
		 * (uses the formula based on n).
		 */
		StdPop = 8,
		/*
		 * Returns the sum of the numeric values in the group.
		 */
		Sum = 9,
		/*
		 * Returns the sample variance of the numeric values in the group 
		 * (uses the formula based on n-1).
		 */
		Var = 10,
		/*
		 * Returns the population variance of the values in the group 
		 * (uses the formula based on n).
		 */
		VarPop = 11,
		/*
		 * Returns the average value of the numeric values in the group and ignores the hidden rows and columns.
		 */
		AverageWithoutHidden = 101,
		/*
		 * Counts the number of cells that contain numbers, and counts numbers within the list of arguments and ignores the hidden rows and columns.
		 */
		CountWithoutHidden = 102,
		/*
		 * Counts the number of cells that are not empty in a range and ignores the hidden rows and columns.
		 */
		CountAWithoutHidden = 103,
		/*
		 * Returns the maximum value in the group and ignores the hidden rows and columns.
		 */
		MaxWithoutHidden = 104,
		/*
		 * Multiplies all the numbers given as arguments and returns the product and ignores the hidden rows and columns.
		 */
		MinWithoutHidden = 105,
		/*
		 * Multiplies all the numbers given as arguments and returns the product and ignores the hidden rows and columns.
		 */
		ProductWithoutHidden = 106,
		/*
		 *Returns the sample standard deviation of the numeric values in the group 
		 * (uses the formula based on n-1) and ignores the hidden rows and columns.
		 */
		StdWithoutHidden = 107,
		/*
		 *Returns the population standard deviation of the values in the group 
		 * (uses the formula based on n) and ignores the hidden rows and columns.
		 */
		StdPopWithoutHidden = 108,
		/*
		 * Returns the sum of the numeric values in the group and ignores the hidden rows and columns.
		 */
		SumWithoutHidden = 109,
		/*
		 * Returns the sample variance of the numeric values in the group 
		 * (uses the formula based on n-1) and ignores the hidden rows and columns.
		 */
		VarWithoutHidden = 110,
		/*
		 * Returns the population variance of the values in the group 
		 * (uses the formula based on n) and ignores the hidden rows and columns.
		 */
		VarPopWithoutHidden = 111
	}

	/*
	 * Cell reference information
	 */
	interface _ICellReferrence {
		/*
		 * Cell range.
		 */
		cellRange: wjcGrid.CellRange;
		/*
		 * The sheet name of the sheet which the cells range refers.
		 */
		sheetRef: string;
	}

	/*
	 * Prensents the regex expression criteria.
	 */
	interface _IRegCriteria {
		/*
		 * The match regex expression.
		 */
		reg: RegExp;
		/*
		 * Indicates whether the regex expression should match the text or not.
		 */
		checkMathces: boolean;
    }

    /*
     * The Calculation list
     */
    interface _ICalcutationItems {
        /*
         * Indicates whether the all the items are date instance.
         */
        isDate: boolean;
        /*
         * The items for calculation.
         */
        items: Array<any>;
    }


	'use strict';

	/*
	 * Defines the base class that represents parsed expressions.
	 */
	export class _Expression {
		private _token: _Token;
		_evaluatedValue: any;

		/*
		 * Initializes a new instance of the @see:Expression class.
		 *
		 * @param arg This parameter is used to build the token for the expression.
		 */
		constructor(arg?: any) {
			if (arg) {
				if (arg instanceof _Token) {
					this._token = arg;
				} else {
					this._token = new _Token(arg, _TokenID.ATOM, _TokenType.LITERAL);
				}
			} else {
				this._token = new _Token(null, _TokenID.ATOM, _TokenType.IDENTIFIER);
			}
		}

		/*
		 * Gets the token of the expression.
		 */
		get token(): _Token {
			return this._token;
		}

		/*
		 * Evaluates the expression.
		 *
		 * @param sheet The @see:Sheet is referenced by the @see:Expression.
		 * @param rowIndex The row index of the cell where the expression located in.
		 * @param columnIndex The column index of the cell where the expression located in.
		 */
		evaluate(sheet?: Sheet, rowIndex?: number, columnIndex?: number): any {
			if (this._token.tokenType !== _TokenType.LITERAL) {
				throw 'Bad expression.';
			}
			return this._token.value;
		}

		/*
		 * Parse the expression to a string value.
		 *
		 * @param x The @see:Expression need be parsed to string value.
		 * @param sheet The @see:Sheet is referenced by the @see:Expression.
		 */
		static toString(x: _Expression, sheet?: Sheet): string {
			var v = x.evaluate(sheet);

			if (!wjcCore.isPrimitive(v)) {
				v = v.value;
			}

			return v != null ? v.toString() : '';
		 }

		/*
		 * Parse the expression to a number value.
		 *
		 * @param x The @see:Expression need be parsed to number value.
		 * @param sheet The @see:Sheet is referenced by the @see:Expression.
		 */
		static toNumber(x: _Expression, sheet?: Sheet): number {
			// evaluate
			var v = x.evaluate(sheet);

			if (!wjcCore.isPrimitive(v)) {
				v = v.value;
			}

			// handle numbers
			if (wjcCore.isNumber(v)) {
				return v;
			}

			// handle booleans
			if (wjcCore.isBoolean(v)) {
				return v ? 1 : 0;
			}

			// handle dates
			if (wjcCore.isDate(v)) {
				return this._toOADate(v);
			}

			// handle strings
			if (wjcCore.isString(v)) {
				if (v) {
					return +v;
				} else {
					return 0;
				}
			}
			// handle everything else
			return wjcCore.changeType(v, wjcCore.DataType.Number, '');
		}

		/*
		 * Parse the expression to a boolean value.
		 *
		 * @param x The @see:Expression need be parsed to boolean value.
		 * @param sheet The @see:Sheet is referenced by the @see:Expression.
		 */
		static toBoolean(x: _Expression, sheet?: Sheet) {
			// evaluate
			var v = x.evaluate(sheet);

			if (!wjcCore.isPrimitive(v)) {
				v = v.value;
			}

			// handle booleans
			if (wjcCore.isBoolean(v)) {
				return v;
			}

			// handle numbers
			if (wjcCore.isNumber(v)) {
				return v === 0 ? false : true;
			}

			// handle everything else
			return wjcCore.changeType(v, wjcCore.DataType.Boolean, '');
		}

		/*
		 * Parse the expression to a date value.
		 *
		 * @param x The @see:Expression need be parsed to date value.
		 * @param sheet The @see:Sheet is referenced by the @see:Expression.
		 */
		static toDate(x: _Expression, sheet?: Sheet) {
			// evaluate
			var v = x.evaluate(sheet);

			if (!wjcCore.isPrimitive(v)) {
				v = v.value;
			}

			// handle dates
			if (wjcCore.isDate(v)) {
				return v;
			}

			// handle numbers
			if (wjcCore.isNumber(v)) {
				return this._fromOADate(v);
			}

			// handle everything else
			return wjcCore.changeType(v, wjcCore.DataType.Date, '');
		}

		// convert the common date to OLE Automation date.
		static _toOADate(val: Date): number {
			var epoch = Date.UTC(1899, 11, 30), // 1899-12-30T00:00:00
				currentUTC = Date.UTC(val.getFullYear(), val.getMonth(), val.getDate(),
					val.getHours(), val.getMinutes(), val.getSeconds(), val.getMilliseconds());

			return (currentUTC - epoch) / 8.64e7;
		}

		// convert the OLE Automation date to common date.
		static _fromOADate(oADate: number): Date {
            var epoch = Date.UTC(1899, 11, 30),
                date = new Date(),
                offset = oADate >= 60 ? 0 : 8.64e7;

            return new Date(oADate * 8.64e7 + epoch + date.getTimezoneOffset() * 60000 + offset);
		}
	}

	/*
	 * Defines the unary expression class.
	 * For e.g. -1.23.
	 */
	export class _UnaryExpression extends _Expression {
		private _expr: _Expression;

		/*
		 * Initializes a new instance of the @see:UnaryExpression class.
		 *
		 * @param arg This parameter is used to build the token for the expression.
		 * @param expr The @see:Expression instance for evaluating the UnaryExpression.
		 */
		constructor(arg: any, expr: _Expression) {
			super(arg);

			this._expr = expr;
		}

		/*
		 * Overrides the evaluate function of base class.
		 *
		 * @param sheet The @see:Sheet is referenced by the @see:Expression.
		 */
        evaluate(sheet?: Sheet): any {
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
		}
	}

	/*
	 * Defines the binary expression class.
	 * For e.g. 1 + 1.
	 */
	export class _BinaryExpression extends _Expression {
		private _leftExpr: _Expression;
		private _rightExpr: _Expression;

		/*
		 * Initializes a new instance of the @see:BinaryExpression class.
		 *
		 * @param arg This parameter is used to build the token for the expression.
		 * @param leftExpr The @see:Expression instance for evaluating the BinaryExpression.
		 * @param rightExpr The @see:Expression instance for evaluating the BinaryExpression.
		 */
		constructor(arg: any, leftExpr: _Expression, rightExpr: _Expression) {
			super(arg);

			this._leftExpr = leftExpr;
			this._rightExpr = rightExpr;
		}

		/*
		 * Overrides the evaluate function of base class.
		 *
		 * @param sheet The @see:Sheet is referenced by the @see:Expression.
		 */
		evaluate(sheet?: Sheet): any {
            var strLeftVal: string,
                strRightVal: string,
                orgLeftVal: any,
                orgRightVal: any,
                leftValue: number,
                rightValue: number,
                compareVal: number,
                isDate = false;

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
			// handle comparisons
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
						} else {
							this._evaluatedValue = compareVal === 0;
							return this._evaluatedValue;
						}
					case _TokenID.NE:
						if (isNaN(compareVal)) {
							this._evaluatedValue = strLeftVal.toLowerCase() !== strRightVal.toLowerCase();
							return this._evaluatedValue;
						} else {
							this._evaluatedValue = compareVal !== 0;
							return this._evaluatedValue;
						}
				}
			}

			// handle everything else
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
        }

        // Check whether the value is date.
        private _isDateValue(val: any) {
            if (wjcCore.isPrimitive(val)) {
                return wjcCore.isDate(val);
            } else {
                return wjcCore.isDate(val.value);
            }
        }
	}

	/*
	 * Defines the cell range expression class.
	 * For e.g. A1 or A1:B2.
	 */
	export class _CellRangeExpression extends _Expression {
		private _cells: wjcGrid.CellRange;
		private _sheetRef: string;
		private _flex: FlexSheet;
		private _evalutingRange: any;

		/*
		 * Initializes a new instance of the @see:CellRangeExpression class.
		 *
		 * @param cells The @see:CellRange instance represents the cell range for the CellRangeExpression.
		 * @param sheetRef The sheet name of the sheet which the cells range refers.
		 * @param flex The @see:FlexSheet instance for evaluating the value for the CellRangeExpression.
		 */
		constructor(cells: wjcGrid.CellRange, sheetRef: string, flex: FlexSheet) {
			super();

			this._cells = cells;
			this._sheetRef = sheetRef;
			this._flex = flex;
			this._evalutingRange = {};
		}

		/*
		 * Overrides the evaluate function of base class.
		 *
		 * @param sheet The @see:Sheet is referenced by the @see:Expression.
		 */
		evaluate(sheet?: Sheet): any {
			if (this._evaluatedValue == null) {
				this._evaluatedValue = this._getCellValue(this._cells, sheet);
			}
			return this._evaluatedValue;
		}

		/*
		 * Gets the value list for each cell inside the cell range.
		 *
		 * @param isGetHiddenValue indicates whether get the cell value of the hidden row or hidden column.
		 * @param columnIndex indicates which column of the cell range need be get.
		 * @param sheet The @see:Sheet whose value to evaluate. If not specified then the data from current sheet 
		 */
		getValues(isGetHiddenValue: boolean = true, columnIndex?: number, sheet?: Sheet): any[] {
			var cellValue: any,
				vals: any[] = [],
				valIndex: number = 0,
				rowIndex: number,
				columnIndex: number,
				startColumnIndex: number,
				endColumnIndex: number;

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
				if (!isGetHiddenValue && (<wjcGrid.Row>sheet.grid.rows[rowIndex]).isVisible === false) {
					continue;
				}
				for (columnIndex = startColumnIndex; columnIndex <= endColumnIndex; columnIndex++) {
					if (columnIndex >= sheet.grid.columns.length) {
						throw 'The cell reference is out of the cell range of the flexsheet.';
					}
					if (!isGetHiddenValue && (<wjcGrid.Column>sheet.grid.columns[columnIndex]).isVisible === false) {
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
        }

        /*
		 * Gets the two-dimensional value list for each cell inside the cell range.
		 *
		 * @param isGetHiddenValue indicates whether get the cell value of the hidden row or hidden column.
		 * @param sheet The @see:Sheet whose value to evaluate. If not specified then the data from current sheet 
		 */
        getValuseWithTwoDimensions(isGetHiddenValue: boolean = true, sheet?: Sheet) {
            var cellValue: any,
                vals: any[] = [],
                rowVals: any[],
                rowValIndex: number = 0,
                valIndex: number = 0,
                rowIndex: number,
                columnIndex: number;

            sheet = this._getSheet() || sheet || this._flex.selectedSheet;
            if (!sheet) {
                return null;
            }

            for (rowIndex = this._cells.topRow; rowIndex <= this._cells.bottomRow; rowIndex++) {
                if (rowIndex >= sheet.grid.rows.length) {
                    throw 'The cell reference is out of the cell range of the flexsheet.';
                }
                if (!isGetHiddenValue && (<wjcGrid.Row>sheet.grid.rows[rowIndex]).isVisible === false) {
                    rowValIndex++;
                    continue;
                }
                rowVals = [];
                valIndex = 0;
                for (columnIndex = this._cells.leftCol; columnIndex <= this._cells.rightCol; columnIndex++) {
                    if (columnIndex >= sheet.grid.columns.length) {
                        throw 'The cell reference is out of the cell range of the flexsheet.';
                    }
                    if (!isGetHiddenValue && (<wjcGrid.Column>sheet.grid.columns[columnIndex]).isVisible === false) {
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
        } 

		/*
		 * Gets the cell range of the CellRangeExpression.
		 */
		get cells(): wjcGrid.CellRange {
			return this._cells;
		}

		/*
		 * Gets the sheet reference of the CellRangeExpression.
		 */
		get sheetRef(): string {
			return this._sheetRef;
		}

		// Get cell value for a cell.
		private _getCellValue(cell: wjcGrid.CellRange, sheet?: Sheet): any {
			var sheet: Sheet,
				cellKey: string;

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
		}

		// Gets the sheet by the sheetRef.
		_getSheet(): Sheet {
			var i = 0,
				sheet: Sheet;

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
		}
	}

	/*
	 * Defines the function expression class.
	 * For e.g. sum(1,2,3).
	 */
	export class _FunctionExpression extends _Expression {
		private _funcDefinition: _FunctionDefinition;
        private _params: Array<_Expression>;
        private _needCacheEvaluatedVal: boolean;

		/*
		 * Initializes a new instance of the @see:FunctionExpression class.
		 *
		 * @param func The @see:FunctionDefinition instance keeps function name, parameter counts, and function.
		 * @param params The parameter list that the function of the @see:FunctionDefinition instance needs.
         * @param needCacheEvaluatedVal indicates whether the _FunctionExpression need cache the evaluated value.
		 */
        constructor(func: _FunctionDefinition, params: Array<_Expression>, needCacheEvaluatedVal: boolean = true) {
			super();

			this._funcDefinition = func;
            this._params = params;
            this._needCacheEvaluatedVal = needCacheEvaluatedVal;
		}

		/*
		 * Overrides the evaluate function of base class.
		 *
		 * @param sheet The @see:Sheet is referenced by the @see:Expression.
		 * @param rowIndex The row index of the cell where the expression located in.
		 * @param columnIndex The column index of the cell where the expression located in.
		 */
        evaluate(sheet?: Sheet, rowIndex?: number, columnIndex?: number): any {
            if (!this._needCacheEvaluatedVal) {
                return this._funcDefinition.func(this._params, sheet, rowIndex, columnIndex);
            }
            if (this._evaluatedValue == null) {
				this._evaluatedValue = this._funcDefinition.func(this._params, sheet, rowIndex, columnIndex);
            }
			return this._evaluatedValue;
		}
	}
 

	'use strict';

	/*
	 * Base class for @see:FlexSheet undo/redo actions.
	 */
	export class _UndoAction {
		_owner: FlexSheet;
		private _sheetIndex: number;

		/*
		 * Initializes a new instance of the @see:_UndoAction class.
		 *
		 * @param owner The @see:FlexSheet control that the @see:_UndoAction works for.
		 */
		constructor(owner: FlexSheet) {
			this._owner = owner;
			this._sheetIndex = owner.selectedSheetIndex;
		}

		/*
		 * Gets the index of the sheet that the undo action wokrs for.
		 */
		get sheetIndex(): number {
			return this._sheetIndex;
		}

		/*
		 * Executes undo of the undo action
		 */
		undo() {
			throw 'This abstract method must be overridden.';
		}

		/*
		 * Executes redo of the undo action
		 */
		redo() {
			throw 'This abstract method must be overridden.';
		}

		/*
		 * Saves the current FlexSheet state.
		 */
		saveNewState(): boolean {
			throw 'This abstract method must be overridden.';
		}
	}

	/*
	 * Defines the _EditAction class.
	 *
	 * It deals with the undo/redo for editing values in FlexSheet cells.
	 */
	export class _EditAction extends _UndoAction {
		private _selections: wjcGrid.CellRange[];
		private _oldValues: any;
		private _newValues: any;
		private _isPaste: boolean;
        private _mergeAction: _CellMergeAction;

		/*
		 * Initializes a new instance of the @see:_EditAction class.
		 *
		 * @param owner The @see: FlexSheet control that the _EditAction works for.
         * @param selection The @CellRange of current editing cell.
		 */
        constructor(owner: FlexSheet, selection?: wjcGrid.CellRange) {
            var index: number,
                selection: wjcGrid.CellRange,
                rowIndex: number,
				colIndex: number,
				val: any;

			super(owner);

            this._isPaste = false;
            this._selections = selection ? [selection] : owner.selectedSheet.selectionRanges.slice();
            this._oldValues = {};
            this._mergeAction = new _CellMergeAction(owner);

            for (index = 0; index < this._selections.length; index++) {
                selection = this._selections[index];
                for (rowIndex = selection.topRow; rowIndex <= selection.bottomRow; rowIndex++) {
                    for (colIndex = selection.leftCol; colIndex <= selection.rightCol; colIndex++) {
                        val = owner.getCellData(rowIndex, colIndex, !!owner.columns[colIndex].dataMap);
                        val = val == null ? '' : val;
                        this._oldValues['r' + rowIndex + '_c' + colIndex] = {
                            row: rowIndex,
                            col: colIndex,
                            value: val
                        };
                    }
                }
            }
		}

		/*
		 * Gets the isPaste state to indicate the edit action works for edit cell or copy/paste.
		 */
		get isPaste(): boolean {
			return this._isPaste;
		}

		/*
		 * Overrides the undo method of its base class @see:_UndoAction.
		 */
		undo() {
            var self = this,
                index: number,
                selection: wjcGrid.CellRange;

            self._owner._clearCalcEngine();
            self._owner.selectedSheet.selectionRanges.clear();

            self._owner.deferUpdate(() => {
                for (index = 0; index < self._selections.length; index++) {
                    selection = self._selections[index];
                    self._owner.selectedSheet.selectionRanges.push(selection);
                }
                Object.keys(self._oldValues).forEach((key) => {
                    var item = self._oldValues[key];
                    self._owner.setCellData(item.row, item.col, item.value);
                });
                self._mergeAction.undo();
                self._owner.refresh(false);
            });
            
		}

		/*
		 * Overrides the redo method of its base class @see:_UndoAction.
		 */
		redo() {
            var self = this,
                index: number,
                selection: wjcGrid.CellRange;

            self._owner._clearCalcEngine();
            self._owner.selectedSheet.selectionRanges.clear();

            self._owner.deferUpdate(() => {
                for (index = 0; index < self._selections.length; index++) {
                    selection = self._selections[index];
                    self._owner.selectedSheet.selectionRanges.push(selection);
                }
                Object.keys(self._newValues).forEach((key) => {
                    var item = self._newValues[key];
                    self._owner.setCellData(item.row, item.col, item.value);
                });
                self._mergeAction.redo();
                self._owner.refresh(false);
            });
		}

		/*
		 * Overrides the saveNewState of its base class @see:_UndoAction.
		 */
		saveNewState(): boolean {
            var index: number,
                selection: wjcGrid.CellRange,
                currentCol: wjcGrid.Column,
				rowIndex: number,
				colIndex: number,
				val: any;

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
		}

		/*
		 * Mark the cell edit action works for paste action.
		 */
		markIsPaste() {
			this._isPaste = true;
		}

        /*
         * Update the edit action for pasting.
         * 
         * @param rng the @see:CellRange used to update the edit action
         */
        updateForPasting(rng: wjcGrid.CellRange) {
            var selection = this._selections[this._selections.length - 1],
                val = this._owner.getCellData(rng.row, rng.col, !!this._owner.columns[rng.col].dataMap);

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
        }

		// Check whether the values changed after editing.
        private _checkActionState(): boolean {
            var self = this,
                ret = true;
            Object.keys(self._oldValues).forEach((key) => {
                var oldItem: any,
                    newItem: any;
                if (ret) {
                    oldItem = self._oldValues[key];
                    newItem = self._newValues[key];
                    if (oldItem && newItem && oldItem.value !== newItem.value) {
                        ret = false;
                    }
                }
            });

			return ret;
		}
	}

	/*
	 * Defines the _ColumnResizeAction class.
	 *
	 * It deals with the undo/redo for resize the column of the FlexSheet.
	 */
	export class _ColumnResizeAction extends _UndoAction {
        private _colIndex: number;
        private _panel: wjcGrid.GridPanel;
		private _oldColWidth: number;
		private _newColWidth: number;

		/*
		 * Initializes a new instance of the @see:_ColumnResizeAction class.
		 *
		 * @param owner The @see: FlexSheet control that the _ColumnResizeAction works for.
         * @param panel The @see: GridPanel indicates the resizing column belongs to which part of the FlexSheet.
		 * @param colIndex it indicates which column is resizing.
		 */
        constructor(owner: FlexSheet, panel: wjcGrid.GridPanel, colIndex: number) {
            super(owner);

            this._panel = panel;
            this._colIndex = colIndex;
			this._oldColWidth = (<wjcGrid.Column>panel.columns[colIndex]).width;
		}

		/*
		 * Overrides the undo method of its base class @see:_UndoAction.
		 */
        undo() {
            (<wjcGrid.Column>this._panel.columns[this._colIndex]).width = this._oldColWidth;
		}

		/*
		 * Overrides the redo method of its base class @see:_UndoAction.
		 */
        redo() {
            (<wjcGrid.Column>this._panel.columns[this._colIndex]).width = this._newColWidth;
		}

		/*
		 * Overrides the saveNewState method of its base class @see:_UndoAction.
		 */
        saveNewState(): boolean {
            this._newColWidth = (<wjcGrid.Column>this._panel.columns[this._colIndex]).width;
			if (this._oldColWidth === this._newColWidth) {
				return false;
			}
			return true;
        }
	}

	/*
	 * Defines the _RowResizeAction class.
	 *
	 * It deals with the undo\redo for resize the row of the FlexSheet.
	 */
	export class _RowResizeAction extends _UndoAction {
        private _rowIndex: number;
        private _panel: wjcGrid.GridPanel;
		private _oldRowHeight: number;
		private _newRowHeight: number;

		/*
		 * Initializes a new instance of the @see:_RowResizeAction class.
		 *
		 * @param owner The @see: FlexSheet control that the _RowResizeAction works for.
         * @param panel The @see: GridPanel indicates the resizing row belongs to which part of the FlexSheet.
		 * @param rowIndex it indicates which row is resizing.
		 */
        constructor(owner: FlexSheet, panel: wjcGrid.GridPanel, rowIndex: number) {
            super(owner);

            this._panel = panel;
            this._rowIndex = rowIndex;
            this._oldRowHeight = (<wjcGrid.Row>panel.rows[rowIndex]).height;
		}

		/*
		 * Overrides the undo method of its base class @see:_UndoAction.
		 */
        undo() {
            (<wjcGrid.Row>this._panel.rows[this._rowIndex]).height = this._oldRowHeight;
		}

		/*
		 * Overrides the redo method of its base class @see:_UndoAction.
		 */
        redo() {
            (<wjcGrid.Row>this._panel.rows[this._rowIndex]).height = this._newRowHeight;
		}

		/*
		 * Overrides the saveNewState method of its base class @see:_UndoAction.
		 */
        saveNewState(): boolean {
            this._newRowHeight = (<wjcGrid.Row>this._panel.rows[this._rowIndex]).height;
			if (this._oldRowHeight === this._newRowHeight) {
				return false;
			}
			return true;
        }
	}

	/*
	 * Defines the _ColumnsChangedAction class.
	 *
	 * It deals with the undo\redo for insert or delete column of the FlexSheet.
	 */
	export class _ColumnsChangedAction extends _UndoAction {
		private _oldValue: _IColumnsChangedActionValue;
        private _newValue: _IColumnsChangedActionValue;
        private _selection: wjcGrid.CellRange;
        _affectedFormulas: any;

		/*
		 * Initializes a new instance of the @see:_ColumnsChangedAction class.
		 *
		 * @param owner The @see: FlexSheet control that the _ColumnsChangedAction works for.
		 */
		constructor(owner: FlexSheet) {
			var colIndex: number,
				columns = [];

			super(owner);

            this._selection = owner.selection;
			for (colIndex = 0; colIndex < owner.columns.length; colIndex++) {
				columns.push(owner.columns[colIndex]);
			}

			this._oldValue = {
				columns: columns,
				sortList: owner.sortManager._committedList.slice(),
                styledCells: owner.selectedSheet ? JSON.parse(JSON.stringify(owner.selectedSheet._styledCells)) : null,
				mergedCells: owner._cloneMergedCells()
			};
		}

		/*
		 * Overrides the undo method of its base class @see:_UndoAction.
		 */
		undo() {
            var colIndex: number,
                i: number,
                formulaObj: any,
                oldFormulas: any[],
                self = this;

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
            self._owner.deferUpdate(() => {
                self._owner.selection = self._selection;
                // Set the 'old' formulas for redo.
                if (!!oldFormulas && oldFormulas.length > 0) {
                    for (i = 0; i < oldFormulas.length; i++) {
                        formulaObj = oldFormulas[i];
                        self._owner.setCellData(formulaObj.point.x, formulaObj.point.y, formulaObj.formula);
                    }
                }
                // Synch with current sheet.
                self._owner._copyTo(self._owner.selectedSheet);
                self._owner._copyFrom(self._owner.selectedSheet);
            });

			// Synch the cell style for current sheet.
            self._owner.selectedSheet.grid['wj_sheetInfo'].styledCells = self._owner.selectedSheet._styledCells;
			// Synch the merged range for current sheet.
            self._owner.selectedSheet.grid['wj_sheetInfo'].mergedRanges = self._owner.selectedSheet._mergedRanges;

            self._owner.sortManager.sortDescriptions.sourceCollection = self._oldValue.sortList.slice();
            self._owner.sortManager.commitSort(false);
            self._owner.sortManager._refresh();

            self._owner.selection = self._selection;
            self._owner.refresh(true);
            setTimeout(() => {
                self._owner._setFlexSheetToDirty();
                self._owner.refresh(true);
			}, 10);
		}

		/*
		 * Overrides the redo method of its base class @see:_UndoAction.
		 */
		redo() {
            var colIndex: number,
                i: number,
                formulaObj: any,
                newFormulas: any[],
                self = this;

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
            self._owner.deferUpdate(() => {
                self._owner.selection = self._selection;
                // Set the 'new' formulas for redo.
                if (!!newFormulas && newFormulas.length > 0) {
                    for (i = 0; i < newFormulas.length; i++) {
                        formulaObj = newFormulas[i];
                        self._owner.setCellData(formulaObj.point.x, formulaObj.point.y, formulaObj.formula);
                    }
                }
                // Synch with current sheet.
                self._owner._copyTo(self._owner.selectedSheet);
                self._owner._copyFrom(self._owner.selectedSheet);
            });

			// Synch the cell style for current sheet.
            self._owner.selectedSheet.grid['wj_sheetInfo'].styledCells = self._owner.selectedSheet._styledCells;
			// Synch the merged range for current sheet.
            self._owner.selectedSheet.grid['wj_sheetInfo'].mergedRanges = self._owner.selectedSheet._mergedRanges;

            self._owner.sortManager.sortDescriptions.sourceCollection = self._newValue.sortList.slice();
            self._owner.sortManager.commitSort(false);
            self._owner.sortManager._refresh();

            self._owner.selection = self._selection;
            self._owner.refresh(true);
			setTimeout(() => {
                self._owner._setFlexSheetToDirty();
                self._owner.refresh(true);
			}, 10);
		}

		/*
		 * Overrides the saveNewState method of its base class @see:_UndoAction.
		 */
		saveNewState(): boolean {
			var colIndex: number,
				columns = [];

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
		}
	}

	/*
	 * Defines the _RowsChangedAction class.
	 *
	 * It deals with the undo\redo for insert or delete row of the FlexSheet.
	 */
	export class _RowsChangedAction extends _UndoAction {
		private _oldValue: _IRowsChangedActionValue;
        private _newValue: _IRowsChangedActionValue;
        private _selection: wjcGrid.CellRange;
        _affectedFormulas: any;

		/*
		 * Initializes a new instance of the @see:_RowsChangedAction class.
		 *
		 * @param owner The @see: FlexSheet control that the _RowsChangedAction works for.
		 */
		constructor(owner: FlexSheet) {
			var rowIndex: number,
				colIndex: number,
				rows = [],
				columns = [];

			super(owner);

            this._selection = owner.selection;
			for (rowIndex = 0; rowIndex < owner.rows.length; rowIndex++) {
				rows.push(owner.rows[rowIndex]);
			}

			for (colIndex = 0; colIndex < owner.columns.length; colIndex++) {
				columns.push(owner.columns[colIndex]);
			}

			this._oldValue = {
				rows: rows,
				columns: columns,
				itemsSource: owner.itemsSource ? owner.itemsSource.slice() : undefined,
                styledCells: owner.selectedSheet ? JSON.parse(JSON.stringify(owner.selectedSheet._styledCells)) : null,
				mergedCells: owner._cloneMergedCells()
			};
		}

		/*
		 * Overrides the undo method of its base class @see:_UndoAction.
		 */
		undo() {
            var rowIndex: number,
                colIndex: number,
                i: number,
                processingRow: wjcGrid.Row,
                formulaObj: any,
                oldFormulas: any[],
                self = this,
                dataSourceBinding = !!self._oldValue.itemsSource;

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
				} else {
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
            self._owner.deferUpdate(() => {
                self._owner.selection = self._selection;
                // Set the 'old' formulas for redo.
                if (!!oldFormulas && oldFormulas.length > 0) {
                    for (i = 0; i < oldFormulas.length; i++) {
                        formulaObj = oldFormulas[i];
                        self._owner.setCellData(formulaObj.point.x, formulaObj.point.y, formulaObj.formula);
                    }
                }
                // Synch with current sheet.
                self._owner._copyTo(self._owner.selectedSheet);
                self._owner._copyFrom(self._owner.selectedSheet);
            });

			// Synch the cell style for current sheet.
            self._owner.selectedSheet.grid['wj_sheetInfo'].styledCells = self._owner.selectedSheet._styledCells;
			// Synch the merged range for current sheet.
            self._owner.selectedSheet.grid['wj_sheetInfo'].mergedRanges = self._owner.selectedSheet._mergedRanges;

            self._owner.selection = self._selection;
            self._owner.refresh(true);
			setTimeout(() => {
                self._owner._setFlexSheetToDirty();
                self._owner.refresh(true);
			}, 10);
		}

		/*
		 * Overrides the redo method of its base class @see:_UndoAction.
		 */
		redo() {
            var rowIndex: number,
                colIndex: number,
                i: number,
                processingRow: wjcGrid.Row,
                formulaObj: any,
                newFormulas: any[],
                self = this,
                dataSourceBinding = !!self._newValue.itemsSource; 

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
				} else {
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
            self._owner.deferUpdate(() => {
                // Set the 'new' formulas for redo.
                if (!!newFormulas && newFormulas.length > 0) {
                    for (i = 0; i < newFormulas.length; i++) {
                        formulaObj = newFormulas[i];
                        self._owner.setCellData(formulaObj.point.x, formulaObj.point.y, formulaObj.formula);
                    }
                }
                // Synch with current sheet.
                self._owner._copyTo(self._owner.selectedSheet);
                self._owner._copyFrom(self._owner.selectedSheet);
            });

			// Synch the cell style for current sheet.
            self._owner.selectedSheet.grid['wj_sheetInfo'].styledCells = self._owner.selectedSheet._styledCells;
			// Synch the merged range for current sheet.
            self._owner.selectedSheet.grid['wj_sheetInfo'].mergedRanges = self._owner.selectedSheet._mergedRanges;

            self._owner.selection = self._selection;
            self._owner.refresh(true);
			setTimeout(() => {
                self._owner._setFlexSheetToDirty();
                self._owner.refresh(true);
			}, 10);
		}

		/*
		 * Overrides the saveNewState method of its base class @see:_UndoAction.
		 */
		saveNewState(): boolean {
			var rowIndex: number,
				colIndex: number,
				rows = [],
				columns = [];

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
		}
	}

	/*
	 * Defines the _CellStyleAction class.
	 *
	 * It deals with the undo\redo for applying style for the cells of the FlexSheet.
	 */
	export class _CellStyleAction extends _UndoAction {
		private _oldStyledCells: any;
		private _newStyledCells: any;

		/*
		 * Initializes a new instance of the @see:_CellStyleAction class.
		 *
		 * @param owner The @see: FlexSheet control that the _CellStyleAction works for.
		 * @param styledCells Current styled cells of the @see: FlexSheet control.
		 */
		constructor(owner: FlexSheet, styledCells?: any) {
			super(owner);

            this._oldStyledCells = styledCells ? JSON.parse(JSON.stringify(styledCells)) : (owner.selectedSheet ? JSON.parse(JSON.stringify(owner.selectedSheet._styledCells)) : null);
		}

		/*
		 * Overrides the undo method of its base class @see:_UndoAction.
		 */
        undo() {
            if (!this._owner.selectedSheet) {
                return;
            }
			this._owner.selectedSheet._styledCells = JSON.parse(JSON.stringify(this._oldStyledCells));
			this._owner.selectedSheet.grid['wj_sheetInfo'].styledCells = this._owner.selectedSheet._styledCells;
			this._owner.refresh(false);
		}

		/*
		 * Overrides the redo method of its base class @see:_UndoAction.
		 */
        redo() {
            if (!this._owner.selectedSheet) {
                return;
            }
			this._owner.selectedSheet._styledCells = JSON.parse(JSON.stringify(this._newStyledCells));
			this._owner.selectedSheet.grid['wj_sheetInfo'].styledCells = this._owner.selectedSheet._styledCells;
			this._owner.refresh(false);
		}

		/*
		 * Overrides the saveNewState method of its base class @see:_UndoAction.
		 */
		saveNewState(): boolean {
            this._newStyledCells = this._owner.selectedSheet ? JSON.parse(JSON.stringify(this._owner.selectedSheet._styledCells)) : null;
			return true;
		}
	}

	/*
	 * Defines the _CellMergeAction class.
	 *
	 * It deals with the undo\redo for merging the cells of the FlexSheet.
	 */
	export class _CellMergeAction extends _UndoAction {
		private _oldMergedCells: any;
		private _newMergedCells: any;

		/*
		 * Initializes a new instance of the @see:_CellMergeAction class.
		 *
		 * @param owner The @see: FlexSheet control that the _CellMergeAction works for.
		 */
		constructor(owner: FlexSheet) {
			super(owner);

			this._oldMergedCells = owner._cloneMergedCells();
		}

		/*
		 * Overrides the undo method of its base class @see:_UndoAction.
		 */
        undo() {
            if (!this._owner.selectedSheet) {
                return;
            }
			this._owner._clearCalcEngine();
			this._owner.selectedSheet._mergedRanges = this._oldMergedCells;
			this._owner.selectedSheet.grid['wj_sheetInfo'].mergedRanges = this._owner.selectedSheet._mergedRanges;
			this._owner.refresh(true);
		}

		/*
		 * Overrides the redo method of its base class @see:_UndoAction.
		 */
        redo() {
            if (!this._owner.selectedSheet) {
                return;
            }
			this._owner._clearCalcEngine();
			this._owner.selectedSheet._mergedRanges = this._newMergedCells;
			this._owner.selectedSheet.grid['wj_sheetInfo'].mergedRanges = this._owner.selectedSheet._mergedRanges;
			this._owner.refresh(true);
		}

		/*
		 * Overrides the saveNewState method of its base class @see:_UndoAction.
		 */
		saveNewState(): boolean {
			this._newMergedCells = this._owner._cloneMergedCells();
			return true;
		}
	}

	/*
	 * Defines the _SortColumnAction class.
	 *
	 * It deals with the undo\redo for sort columns of the FlexSheet.
	 */
	export class _SortColumnAction extends _UndoAction {
		private _oldValue: _ISortColumnActionValue;
		private _newValue: _ISortColumnActionValue;

		/*
		 * Initializes a new instance of the @see:_CellMergeAction class.
		 *
		 * @param owner The @see: FlexSheet control that the @see:_CellMergeAction works for.
		 */
		constructor(owner: FlexSheet) {
			var rowIndex: number,
				colIndex: number,
				columns: wjcGrid.Column[] = [],
				rows: wjcGrid.Row[] = [];

			super(owner);

			if (!owner.itemsSource) {
				for (rowIndex = 0; rowIndex < owner.rows.length; rowIndex++) {
					rows.push(owner.rows[rowIndex]);
				}
				for (colIndex = 0; colIndex < owner.columns.length; colIndex++) {
					columns.push(owner.columns[colIndex]);
				}
			}

			this._oldValue = {
				sortList: owner.sortManager._committedList.slice(),
				rows: rows,
                columns: columns,
                formulas: owner._scanFormulas()
			}
		}

		/*
		 * Overrides the undo method of its base class @see:_UndoAction.
		 */
		undo() {
            var self = this,
                rowIndex: number,
                colIndex: number,
                row: wjcGrid.Row,
                column: wjcGrid.Column;

            if (!self._owner.selectedSheet) {
                return;
            }
            self._owner._isUndoing = true;
            self._owner.deferUpdate(() => {
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
                        // Synch the rows of the grid for current sheet.
                        self._owner.selectedSheet.grid.rows.push(row);
                    }
                    for (colIndex = 0; colIndex < self._oldValue.columns.length; colIndex++) {
                        column = self._oldValue.columns[colIndex];
                        self._owner.columns.push(column);
                        // Synch the columns of the grid for current sheet.
                        self._owner.selectedSheet.grid.columns.push(column);
                    }
                    self._owner._resetFormulas(self._oldValue.formulas);
                    self._owner._isUndoing = false;
                    setTimeout(() => {
                        self._owner._setFlexSheetToDirty();
                        self._owner.refresh(true);
                    }, 10);
                }
            });
		}

		/*
		 * Overrides the redo method of its base class @see:_UndoAction.
		 */
		redo() {
            var self = this,
                rowIndex: number,
                colIndex: number,
                row: wjcGrid.Row,
                column: wjcGrid.Column;

            if (!self._owner.selectedSheet) {
                return;
            }
            self._owner._isUndoing = true;
            self._owner.deferUpdate(() => {
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
                        // Synch the rows of the grid for current sheet.
                        self._owner.selectedSheet.grid.rows.push(row);
                    }
                    for (colIndex = 0; colIndex < self._newValue.columns.length; colIndex++) {
                        column = self._newValue.columns[colIndex];
                        self._owner.columns.push(column);
                        // Synch the columns of the grid for current sheet.
                        self._owner.selectedSheet.grid.columns.push(column);
                    }
                    self._owner._resetFormulas(self._newValue.formulas);
                    self._owner._isUndoing = false;
                    setTimeout(() => {
                        self._owner._setFlexSheetToDirty();
                        self._owner.refresh(true);
                    }, 10);
                }
            });
		}

		/*
		 * Overrides the saveNewState method of its base class @see:_UndoAction.
		 */
		saveNewState(): boolean {
			var rowIndex: number,
				colIndex: number,
				columns: wjcGrid.Column[] = [],
				rows: wjcGrid.Row[] = [];

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
			}

			return true;
		}
	}

	/*
	 * Defines the _MoveCellsAction class.
	 *
	 * It deals with drag & drop the rows or columns to move or copy the cells action.
	 */
	export class _MoveCellsAction extends _UndoAction {
        private _draggingCells: _IMoveCellsActionValue[];
        private _draggingColumnSetting: any;
		private _oldDroppingCells: _IMoveCellsActionValue[];
        private _newDroppingCells: _IMoveCellsActionValue[];
        private _oldDroppingColumnSetting: any;
        private _newDroppingColumnSetting: any;
        private _dragRange: wjcGrid.CellRange;
		private _dropRange: wjcGrid.CellRange;
        private _isCopyCells: boolean;
        private _isDraggingColumns: boolean;

		/*
		 * Initializes a new instance of the @see:_MoveCellsAction class.
		 *
		 * @param owner The @see: FlexSheet control that the @see:_MoveCellsAction works for.
		 * @param draggingCells The @see: CellRange contains dragging target cells.
		 * @param droppingCells The @see: CellRange contains the dropping target cells.
		 * @param isCopyCells Indicates whether the action is moving or copying the cells.
		 */
		constructor(owner: FlexSheet, draggingCells: wjcGrid.CellRange, droppingCells: wjcGrid.CellRange, isCopyCells: boolean) {
            var rowIndex: number,
                colIndex: number,
                cellIndex: number,
                val: any,
                cellStyle: any;

            super(owner);

            if (!owner.selectedSheet) {
                return;
            }

            if (draggingCells.topRow === 0 && draggingCells.bottomRow === owner.rows.length - 1) {
                this._isDraggingColumns = true;
            } else {
                this._isDraggingColumns = false;
            }

			this._isCopyCells = isCopyCells;

            this._dragRange = draggingCells;
			this._dropRange = droppingCells;
            this._oldDroppingCells = [];
            this._oldDroppingColumnSetting = {};
			for (rowIndex = droppingCells.topRow; rowIndex <= droppingCells.bottomRow; rowIndex++) {
                for (colIndex = droppingCells.leftCol; colIndex <= droppingCells.rightCol; colIndex++) {
                    if (this._isDraggingColumns) {
                        if (!this._oldDroppingColumnSetting[colIndex]) {
                            this._oldDroppingColumnSetting[colIndex] = {
                                dataType: owner.columns[colIndex].dataType,
                                align: owner.columns[colIndex].align,
                                format: owner.columns[colIndex].format
                            };
                        }
                    }
					cellIndex = rowIndex * this._owner.columns.length + colIndex;
					if (this._owner.selectedSheet._styledCells[cellIndex]) {
						cellStyle = JSON.parse(JSON.stringify(this._owner.selectedSheet._styledCells[cellIndex]));
					} else {
						cellStyle = undefined;
					}

					val = this._owner.getCellData(rowIndex, colIndex, false);
					this._oldDroppingCells.push({
						rowIndex: rowIndex,
						columnIndex: colIndex,
						cellContent: val,
						cellStyle: cellStyle
					});
				}
			}

            if (!isCopyCells) {
                this._draggingCells = [];
                this._draggingColumnSetting = {};
                for (rowIndex = draggingCells.topRow; rowIndex <= draggingCells.bottomRow; rowIndex++) {
                    for (colIndex = draggingCells.leftCol; colIndex <= draggingCells.rightCol; colIndex++) {
                        if (this._isDraggingColumns) {
                            if (!this._draggingColumnSetting[colIndex]) {
                                this._draggingColumnSetting[colIndex] = {
                                    dataType: owner.columns[colIndex].dataType,
                                    align: owner.columns[colIndex].align,
                                    format: owner.columns[colIndex].format
                                };
                            }
                        }
                        cellIndex = rowIndex * this._owner.columns.length + colIndex;
                        if (this._owner.selectedSheet._styledCells[cellIndex]) {
                            cellStyle = JSON.parse(JSON.stringify(this._owner.selectedSheet._styledCells[cellIndex]));
                        } else {
                            cellStyle = undefined;
                        }

                        val = this._owner.getCellData(rowIndex, colIndex, false);
                        this._draggingCells.push({
                            rowIndex: rowIndex,
                            columnIndex: colIndex,
                            cellContent: val,
                            cellStyle: cellStyle
                        });
                    }
                }
            }
		}

		/*
		 * Overrides the undo method of its base class @see:_UndoAction.
		 */
		undo() {
            var self = this,
                index: number,
                moveCellActionValue: _IMoveCellsActionValue,
                cellIndex: number,
                val: any,
                cellStyle: any,
                srcColIndex: number,
                descColIndex: number;

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
				} else {
                    delete self._owner.selectedSheet._styledCells[cellIndex];
				}
            }

            if (self._isDraggingColumns && !!self._oldDroppingColumnSetting) {
                Object.keys(self._oldDroppingColumnSetting).forEach((key) => {
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
                    Object.keys(self._draggingColumnSetting).forEach((key) => {
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
                    } else {
                        descColIndex = self._dragRange.rightCol;
                        for (srcColIndex = self._dropRange.rightCol; srcColIndex >= self._dropRange.leftCol; srcColIndex--) {
                            self._owner._updateColumnFiler(srcColIndex, descColIndex);
                            descColIndex--;
                        }
                    }
                }
			}
		}

		/*
		 * Overrides the redo method of its base class @see:_UndoAction.
		 */
		redo() {
            var self = this,
                index: number,
				moveCellActionValue: _IMoveCellsActionValue,
				cellIndex: number,
				val: any,
                cellStyle: any,
                srcColIndex: number,
                descColIndex: number;

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
                    Object.keys(self._draggingColumnSetting).forEach((key) => {
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
                } else {
                    delete self._owner.selectedSheet._styledCells[cellIndex];
                }
            }

            if (self._isDraggingColumns && !!self._newDroppingColumnSetting) {
                Object.keys(self._newDroppingColumnSetting).forEach((key) => {
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
                } else {
                    descColIndex = self._dropRange.rightCol;
                    for (srcColIndex = self._dragRange.rightCol; srcColIndex >= self._dragRange.leftCol; srcColIndex--) {
                        self._owner._updateColumnFiler(srcColIndex, descColIndex);
                        descColIndex--;
                    }
                }
            }
		}

		/*
		 * Overrides the saveNewState method of its base class @see:_UndoAction.
		 */
		saveNewState(): boolean {
			var rowIndex: number,
				colIndex: number,
				cellIndex: number,
				val: any,
				cellStyle: any;

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
						} else {
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
		}
    }

    /*
	 * Defines the _CutAction class.
	 *
	 * It deals with the undo/redo for cutting pasting values in FlexSheet cells.
	 */
    export class _CutAction extends _UndoAction {
        private _selection: wjcGrid.CellRange;
        private _cutSelection: wjcGrid.CellRange;
        private _cutSheet: Sheet;
        private _oldValues: any[];
        private _newValues: any[];
        private _oldCutValues: any[];
        private _newCutValues: any[];
        private _mergeAction: _CellMergeAction;

		/*
		 * Initializes a new instance of the @see:_CutAction class.
		 *
		 * @param owner The @see: FlexSheet control that the _CutAction works for.
		 */
        constructor(owner: FlexSheet) {
            var rowIndex: number,
                colIndex: number,
                val: any,
                cutSource: any;

            super(owner);

            this._oldValues = [];
            this._oldCutValues = [];
            this._mergeAction = new _CellMergeAction(owner);
            this._cutSheet = owner._copiedSheet;
            this._selection = owner.selection;
            this._cutSelection = owner._copiedRanges[0];
            cutSource = this._cutSheet === owner.selectedSheet ? owner : this._cutSheet.grid;
            for (rowIndex = this._cutSelection.topRow; rowIndex <= this._cutSelection.bottomRow; rowIndex++) {
                for (colIndex = this._cutSelection.leftCol; colIndex <= this._cutSelection.rightCol; colIndex++) {
                    val = cutSource.getCellData(rowIndex, colIndex, !!cutSource.columns[colIndex].dataMap);
                    val = val == null ? '' : val;
                    this._oldCutValues.push({
                        row: rowIndex,
                        col: colIndex,
                        value: val
                    });
                }
            }
        }

		/*
		 * Overrides the undo method of its base class @see:_UndoAction.
		 */
        undo() {
            var self = this;

            self._owner._clearCalcEngine();
            self._owner.selectedSheet.selectionRanges.clear();

            self._owner.deferUpdate(() => {
                var i: number,
                    item: any,
                    cutSource = self._cutSheet === self._owner.selectedSheet ? self._owner : self._cutSheet.grid;

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
        }

		/*
		 * Overrides the redo method of its base class @see:_UndoAction.
		 */
        redo() {
            var self = this;

            self._owner._clearCalcEngine();
            self._owner.selectedSheet.selectionRanges.clear();

            self._owner.deferUpdate(() => {
                var i: number,
                    item: any,
                    cutSource = self._cutSheet === self._owner.selectedSheet ? self._owner : self._cutSheet.grid;

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
        }

		/*
		 * Overrides the saveNewState of its base class @see:_UndoAction.
		 */
        saveNewState(): boolean {
            var rowIndex: number,
                colIndex: number,
                currentCol: wjcGrid.Column,
                val: any,
                cutSource = this._cutSheet === this._owner.selectedSheet ? this._owner : this._cutSheet.grid;

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
        }

        /*
         * Update the cut action for pasting.
         * 
         * @param rng the @see:CellRange used to update the cut action
         */
        updateForPasting(rng: wjcGrid.CellRange) {
            var val = this._owner.getCellData(rng.row, rng.col, !!this._owner.columns[rng.col].dataMap);

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
        }
    }

	interface _IColumnsChangedActionValue {
		columns: wjcGrid.Column[];
		sortList: any[];
		styledCells: any;
		mergedCells: any;
	}

	interface _IRowsChangedActionValue {
		rows: wjcGrid.Row[];
		columns: wjcGrid.Column[];
		itemsSource: any;
		styledCells: any;
		mergedCells: any;
	}

	interface _ISortColumnActionValue {
		sortList: any[];
		columns: wjcGrid.Column[];
        rows: wjcGrid.Row[];
        formulas: any[];
	}

	interface _IMoveCellsActionValue {
		rowIndex: number;
		columnIndex: number;
		cellContent: any;
        cellStyle?: any;
    }


	'use strict';

	/*
	 * Defines the ContextMenu for a @see:FlexSheet control.
	 */
	export class _ContextMenu extends wjcCore.Control {
		private _owner: FlexSheet;
		private _insRows: HTMLElement;
		private _delRows: HTMLElement;
		private _insCols: HTMLElement;
		private _delCols: HTMLElement;

		static controlTemplate = '<div class="wj-context-menu" width="150px">' +
		'<div class="wj-context-menu-item" wj-part="insert-rows">Insert Row</div>' +
		'<div class="wj-context-menu-item" wj-part="delete-rows">Delete Rows</div>' +
		'<div class="wj-context-menu-item" wj-part="insert-columns">Insert Column</div>' +
		'<div class="wj-context-menu-item" wj-part="delete-columns">Delete Columns</div>' +
		'</div>';

		/*
		 * Initializes a new instance of the _ContextMenu class.
		 *
		 * @param element The DOM element that will host the control, or a jQuery selector (e.g. '#theCtrl').
		 * @param owner The @see: FlexSheet control what the ContextMenu works with.
		 */
		constructor(element: any, owner: FlexSheet) {
			super(element);

			this._owner = owner;

			this.applyTemplate('', this.getTemplate(), {
				_insRows: 'insert-rows',
				_delRows: 'delete-rows',
				_insCols: 'insert-columns',
				_delCols: 'delete-columns',
			});

			this._init();
		}

		/*
		 * Show the context menu.
		 *
		 * @param e The mouse event.
		 * @param point The point indicates the position for the context menu.
		 */
		show(e: MouseEvent, point?: wjcCore.Point) {
			var posX = (point ? point.x : e.clientX) + (e ? window.pageXOffset : 0), //Left Position of Mouse Pointer
				posY = (point ? point.y : e.clientY) + (e ? window.pageYOffset : 0); //Top Position of Mouse Pointer
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
		}

		/*
		 * Hide the context menu.
		 */
		hide() {
			this.hostElement.style.display = 'none';
		}

		// Initialize the context menu.
		private _init() {
			var self = this;

            self.hostElement.style.zIndex = '9999';
			document.querySelector('body').appendChild(self.hostElement);

			self.addEventListener(self.hostElement, 'contextmenu', (e: MouseEvent) => {
				e.preventDefault();
			});

			self.addEventListener(self._insRows, 'click', (e: MouseEvent) => {
				self._owner.insertRows();
                self.hide();
                self._owner.hostElement.focus();
			});
			self.addEventListener(self._delRows, 'click', (e: MouseEvent) => {
				self._owner.deleteRows();
                self.hide();
                self._owner.hostElement.focus();
			});
			self.addEventListener(self._insCols, 'click', (e: MouseEvent) => {
				self._owner.insertColumns();
                self.hide();
                self._owner.hostElement.focus();
			});
			self.addEventListener(self._delCols, 'click', (e: MouseEvent) => {
				self._owner.deleteColumns();
                self.hide();
                self._owner.hostElement.focus();
			});
		}
	}


	'use strict';

	/*
	 * Defines the _TabHolder control.
	 */
	export class _TabHolder extends wjcCore.Control {
		private _owner: FlexSheet;

		// child controls
		//private _hScrollbar: ScrollBar;
		private _sheetControl: _SheetTabs;

		// child elements
		private _divSheet: HTMLElement;
		private _divSplitter: HTMLElement;
		private _divRight: HTMLElement;
		//private _divHScrollbar: HTMLElement;

		// event handler
		private _funSplitterMousedown: (ev: MouseEvent) => any;
		private _splitterMousedownHdl = this._splitterMousedownHandler.bind(this);

		private _startPos: number;

		static controlTemplate = '<div>' +
		'<div wj-part="left" style ="float:left;height:100%;overflow:hidden"></div>' +  // left sheet
		'<div wj-part="splitter" style="float:left;height:100%;width:6px;background-color:#e9eaee;padding:2px;cursor:e-resize"><div style="background-color:#8a9eb2;height:100%"></div></div>' + // splitter
		'<div wj-part="right" style="float:left;height:100%;background-color:#e9eaee">' +
		// We will use the native scrollbar of the flexgrid instead of the custom scrollbar of flexsheet (TFS 121971)
		//'<div wj-part="hscrollbar" style="float:none;height:100%;border-left:1px solid #8a9eb2; padding-top:1px; display: none;"></div>' + // right scrollbar
		'</div>' +
		'</div>';

		/*
		 * Initializes a new instance of the _TabHolder class.
		 *
		 * @param element The DOM element that will host the control, or a jQuery selector (e.g. '#theCtrl').
		 * @param owner The @see: FlexSheet control that the _TabHolder control is associated to.
		 */
		constructor(element: any, owner: FlexSheet) {
			super(element);
			this._owner = owner;

			if (this.hostElement.attributes['tabindex']) {
				this.hostElement.attributes.removeNamedItem('tabindex');
			}
			// instantiate and apply template
			this.applyTemplate('', this.getTemplate(), {
				_divSheet: 'left',
				_divSplitter: 'splitter',
				_divRight: 'right'
				//_divHScrollbar: 'hscrollbar'
			});

			this._init();
		}

		/*
		 * Gets the SheetTabs control
		 */
		get sheetControl(): _SheetTabs {
			return this._sheetControl;
		}

		//get scrollBar(): ScrollBar {
		//	return this._hScrollbar;
		//}

		/*
		 * Gets or sets the visibility of the TabHolder control
		 */
		get visible(): boolean {
			return this.hostElement.style.display !== 'none';
		}
		set visible(value: boolean) {
			this.hostElement.style.display = value ? 'block' : 'none'; 
			this._divSheet.style.display = value ? 'block' : 'none'; 
		}

		/*
		 * Gets the Blanket size for the TabHolder control.
		 */
		public getSheetBlanketSize(): number {
			//var scrollBarSize = ScrollBar.getSize();
			//return (scrollBarSize === 0 ? 20 : scrollBarSize + 3);
			return 20;
		}

		/*
		 * Adjust the size of the TabHolder control 
		 */
		public adjustSize() {
			var hScrollDis = this._owner.scrollSize.width - this._owner.clientSize.width,
				vScrollDis = this._owner.scrollSize.height - this._owner.clientSize.height,
				eParent = this._divSplitter.parentElement,
				//totalWidth: number,
				leftWidth: number;

			if (hScrollDis <= 0) {
				eParent.style.minWidth = '100px';
				this._divSplitter.style.display = 'none';
				this._divRight.style.display = 'none';
				this._divSheet.style.width = '100%';
				this._divSplitter.removeEventListener('mousedown', this._splitterMousedownHdl, true);
				//this._hScrollbar.scrolled.removeHandler(this._scrollbarScrolled, this);
			} else {
				eParent.style.minWidth = '300px';
				this._divSplitter.style.display = 'none';
				this._divRight.style.display = 'none';
				//totalWidth = eParent.clientWidth - this._divSplitter.offsetWidth;
				this._divSheet.style.width = '100%';
				//leftWidth = Math.ceil(totalWidth / 2);
				//this._divSheet.style.width = leftWidth + 'px';
				//this._divRight.style.width = (totalWidth - leftWidth) + 'px';
				//if (vScrollDis <= 0) {
				//	this._divHScrollbar.style.marginRight = '0px';
				//} else {
				//	this._divHScrollbar.style.marginRight = '20px';
				//}
				//this._hScrollbar.scrollDistance = hScrollDis;
				//this._hScrollbar.scrollValue = -this._owner.scrollPosition.x;
				this._divSplitter.removeEventListener('mousedown', this._splitterMousedownHdl, true);
				this._divSplitter.addEventListener('mousedown', this._splitterMousedownHdl, true);
				//this._hScrollbar.scrolled.removeHandler(this._scrollbarScrolled, this);
				//this._hScrollbar.scrolled.addHandler(this._scrollbarScrolled, this);
				//this._hScrollbar.refresh();
            }

            this._sheetControl._adjustSize();
		}

		// Init the size of the splitter.
		// And init the ScrollBar, SheetTabs control 
		private _init() {
			var self = this;
			self._funSplitterMousedown = function (e: MouseEvent) {
				self._splitterMouseupHandler(e);
			};
			self._divSplitter.parentElement.style.height = self.getSheetBlanketSize() + 'px';
			//init scrollbar
			//self._hScrollbar = new ScrollBar(self._divHScrollbar);
			//init sheet
			self._sheetControl = new _SheetTabs(self._divSheet, this._owner);
			//self._owner.scrollPositionChanged.addHandler(() => {
			//	self._hScrollbar.scrollValue = -self._owner.scrollPosition.x;
			//});
		}

		// Mousedown event handler for the splitter
		private _splitterMousedownHandler(e: MouseEvent) {
			this._startPos = e.pageX;
			document.addEventListener('mousemove', this._splitterMousemoveHandler.bind(this), true);
			document.addEventListener('mouseup', this._funSplitterMousedown, true);
			e.preventDefault();
		}

		// Mousemove event handler for the splitter
		private _splitterMousemoveHandler(e: MouseEvent) {
			if (this._startPos === null || typeof (this._startPos) === 'undefined') {
				return;
			}
			this._adjustDis(e.pageX - this._startPos);
		}

		// Mouseup event handler for the splitter
		private _splitterMouseupHandler(e: MouseEvent) {
			document.removeEventListener('mousemove', this._splitterMousemoveHandler, true);
			document.removeEventListener('mouseup', this._funSplitterMousedown, true);
			this._adjustDis(e.pageX - this._startPos);
			this._startPos = null;
		}

		// Adjust the distance for the splitter
		private _adjustDis(dis: number) {
			var rightWidth = this._divRight.offsetWidth - dis,
				leftWidth = this._divSheet.offsetWidth + dis;

			if (rightWidth <= 100) {
				rightWidth = 100;
				dis = this._divRight.offsetWidth - rightWidth;
				leftWidth = this._divSheet.offsetWidth + dis;
			} else if (leftWidth <= 100) {
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
			//this._hScrollbar.invalidate(false);
		}

		// scrolled event handler for the scrollbar control
		//private _scrollbarScrolled(sender, e) {
		//	var hs = <ScrollBar> sender,
		//		scrollValue = -hs.scrollValue;
			
		//	if (scrollValue !== this._owner.scrollPosition.x) {
		//		this._owner._ptScrl = new wijmo.Point(scrollValue, this._owner.scrollPosition.y);
		//		this._owner.refresh(true);
		//	}
		//}
	}


	'use strict';

	/*
	 * Defines the _FlexSheetCellFactory class.
	 *
	 * This class extends the CellFactory of FlexGrid control.
	 * It updates the content of the row/column header for the FlexSheet control.
	 */
	export class _FlexSheetCellFactory extends wjcGrid.CellFactory {

		/*
		 * Overrides the updateCell function of the CellFactory class.  
		 *
		 * @param panel Part of the grid that owns this cell.
		 * @param r Index of this cell's row.
		 * @param c Index of this cell's column.
		 * @param cell Element that represents the cell.
		 * @param rng @see:CellRange that contains the cell's merged range, or null if the cell is not merged.
		 */
		public updateCell(panel: wjcGrid.GridPanel, r: number, c: number, cell: HTMLElement, rng?: wjcGrid.CellRange) {
            var g = panel.grid,
                r2 = r,
                c2 = c,
                content: string,
                cellIndex: number,
                flex: FlexSheet,
                fc: Node,
                val: any,
                data: any,
                isFormula: boolean,
                styleInfo: ICellStyle,
                checkBox: HTMLInputElement,
                input: HTMLInputElement,
                bcol: wjcGrid.Column,
                format: string,
                firstVisibleCell: wjcGrid.CellRange,
                isGroupRow: boolean,
                dateVal: Date;

			// We shall reset the styles of current cell before updating current cell.
			if (panel.cellType === wjcGrid.CellType.Cell) {
				this._resetCellStyle(panel.columns[c], cell);
			}

			super.updateCell(panel, r, c, cell, rng);

			// adjust for merged ranges
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
                    flex = <FlexSheet>panel.grid;
                    cellIndex = r * flex.columns.length + c;
                    styleInfo = flex.selectedSheet && flex.selectedSheet._styledCells ? flex.selectedSheet._styledCells[cellIndex] : null;
                    if (!!rng && !rng.isSingleCell) {
                        firstVisibleCell = this._getFirstVisibleCell(flex, rng);
                        r = firstVisibleCell.row;
                        c = firstVisibleCell.col;
                    }

					//process the header row with binding
                    if (panel.rows[r] instanceof HeaderRow) {
                        if (panel.columns[c].dataType === wjcCore.DataType.Boolean) {
                            if (cell.childElementCount === 1 && cell.firstElementChild instanceof HTMLInputElement && cell.firstElementChild.type === 'checkbox') {
                                cell.innerHTML = wjcCore.escapeHtml(panel.columns[c].header);
                            }
                        }
                        wjcCore.addClass(cell, 'wj-header-row');
                    } else {
                        val = flex.getCellValue(r, c, false);
                        data = flex.getCellData(r, c, false);
                        isFormula = data != null && typeof data === 'string' && (<string>data)[0] === '=';
                        isGroupRow = panel.rows[r] instanceof wjcGrid.GroupRow;
                        format = (styleInfo ? styleInfo.format : null) || (isGroupRow ? null : bcol.format);
                        if (flex.editRange && flex.editRange.contains(r, c)) {
                            if (wjcCore.isNumber(val) && !bcol.dataMap && !isFormula) {
                                if (format) {
                                    val = this._getFormattedValue(val, format);
                                }
                                input = <HTMLInputElement>cell.querySelector('input');
                                if (input) {
                                    input.value = val;
                                }
                            }
                        } else {
                            if (panel.columns[c].dataType === wjcCore.DataType.Boolean) {
                                checkBox = <HTMLInputElement>cell.querySelector('[type="checkbox"]');
                                if (checkBox) {
                                    checkBox.checked = flex.getCellValue(r, c);
                                    checkBox.disabled = checkBox.disabled || !flex.canEditCell(r, c);
                                }
                            } else if (bcol.dataMap && !isGroupRow) {
                                val = flex.getCellValue(r, c, true);
                                fc = cell.firstChild;
                                if (fc && fc.nodeType === 3 && fc.nodeValue !== val) {
                                    fc.nodeValue = val
                                }
                            } else {
                                // Only when the cell is not customized by itemFormatter or formatItem, flexsheet will handle the cell content itself.
                                // Otherwise the customized cell content will be lost.
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
							var st = cell.style,
								styleInfoVal;
							for (var styleProp in styleInfo) {
								if (styleProp === 'className') {
									if (styleInfo.className) {
										wjcCore.addClass(cell, styleInfo.className);
									}
								} else if (styleProp !== 'format' && (styleInfoVal = styleInfo[styleProp])) {
									if ((wjcCore.hasClass(cell, 'wj-state-selected') || wjcCore.hasClass(cell, 'wj-state-multi-selected'))
                                        && (styleProp === 'color' || styleProp === 'backgroundColor')) {
                                        st[styleProp] = '';
                                    } else if (styleProp === 'whiteSpace' && styleInfoVal === 'normal') {
                                        // Remove the whiteSpace style if the value of whiteSpace is normal. TFS 247165.
                                        // Because the whiteSpace style will cause the cell measure the width incorrectly.
										st[styleProp] = '';
                                    } else {
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
                if (r === (<FlexSheet>g)._lastVisibleFrozenRow && !wjcCore.hasClass(cell, 'wj-frozen-row')) {
                    wjcCore.addClass(cell, 'wj-frozen-row');
                }

                if (c === (<FlexSheet>g)._lastVisibleFrozenColumn && !wjcCore.hasClass(cell, 'wj-frozen-col')) {
                    wjcCore.addClass(cell, 'wj-frozen-col');
                }
            }
		}

		// Reset the styles of the cell.
		private _resetCellStyle(column: wjcGrid.Column, cell: HTMLElement) {
            ['fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'textDecoration', 'textAlign', 'verticalAlign', 'backgroundColor', 'color', 'whiteSpace', 'borderLeftStyle', 'borderLeftColor', 'borderLeftWidth', 'borderRightStyle', 'borderRightColor', 'borderRightWidth', 'borderTopStyle', 'borderTopColor', 'borderTopWidth', 'borderBottomStyle', 'borderBottomColor', 'borderBottomWidth'].forEach((val) => {
				if (val === 'textAlign') {
					cell.style.textAlign = column.getAlignment();
				} else {
					cell.style[val] = '';
				}
			});
        }

        // Get the formatted value.
        private _getFormattedValue(value: number, format: string): string {
            var val: string;

            if (value !== Math.round(value)) {
                format = format.replace(/([a-z])(\d*)(.*)/ig, '$0112$3');
            }
            val = wjcCore.Globalize.formatNumber(value, format, true);

            return val;
        }

        // Get the first visible cell of the merged range.
        private _getFirstVisibleCell(g: FlexSheet, rng: wjcGrid.CellRange): wjcGrid.CellRange {
            var firstVisibleRow: number,
                firstVisibleColumn: number;

            for (firstVisibleRow = rng.topRow; firstVisibleRow <= rng.bottomRow; firstVisibleRow++) {
                if ((<wjcGrid.Row>g.rows[firstVisibleRow]).isVisible) {
                    break;
                }
            }

            for (firstVisibleColumn = rng.leftCol; firstVisibleColumn <= rng.rightCol; firstVisibleColumn++) {
                if ((<wjcGrid.Column>g.columns[firstVisibleColumn]).isVisible) {
                    break;
                }
            }

            return new wjcGrid.CellRange(firstVisibleRow, firstVisibleColumn);
        }
	}

/**
 * Defines the @see:FlexSheet control and associated classes.
 *
 * The @see:FlexSheet control extends the @see:FlexGrid control to provide
 * Excel-like features.
 *
 * @fiddle:t8tp9tnx
 */

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
        { name: 'sumproduct', description: 'Multiplies corresponding components in the given arrays, and returns the sum of those products.'},
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

    /**
     * Defines the @see:FlexSheet control.
     *
     * The @see:FlexSheet control extends the @see:FlexGrid control to provide Excel-like 
     * features such as a calculation engine, multiple sheets, undo/redo, and 
     * XLSX import/export.
     *
     * A complete list of the functions supported by the @see:FlexSheet's calculation
     * engine can be found here:
     * <a href="static/FlexSheetFunctions.html">FlexSheet Functions</a>.
     *
     * @fiddle:t8tp9tnx
     */
    export class FlexSheet extends wjcGrid.FlexGrid {
        private _sheets: SheetCollection;
        private _selectedSheetIndex: number = -1;
        private _tabHolder: _TabHolder;
        private _contextMenu: _ContextMenu;
        private _divContainer: HTMLElement;
        private _columnHeaderClicked: boolean = false;
        private _htDown: wjcGrid.HitTestInfo;
        _filter: _FlexSheetFilter;
        private _calcEngine: _CalcEngine;
        private _functionListHost: HTMLElement;
        private _functionList: wjcInput.ListBox;
        private _functionTarget: HTMLInputElement;
        private _undoStack: UndoStack;
        private _longClickTimer: any;
        private _cloneStyle: any;
        private _sortManager: SortManager;
        private _dragable: boolean;
        private _isDragging: boolean;
        private _draggingColumn: boolean;
        private _draggingRow: boolean;
        private _draggingMarker: HTMLDivElement;
        private _draggingTooltip: wjcCore.Tooltip;
        private _draggingCells: wjcGrid.CellRange;
        private _dropRange: wjcGrid.CellRange;
        private _wholeColumnsSelected: boolean;
        private _addingSheet: boolean = false;
        private _mouseMoveHdl = this._mouseMove.bind(this);
        private _clickHdl = this._click.bind(this);
        private _touchStartHdl = this._touchStart.bind(this);
        private _touchEndHdl = this._touchEnd.bind(this);
        private _toRefresh: any;
        /*private*/ _copiedRanges: wjcGrid.CellRange[];
        /*private*/ _copiedSheet: Sheet;
        /*private*/ _cutData: string;
        private _cutValue: string;
        private _isContextMenuKeyDown: boolean = false;
        _enableMulSel: boolean;
        _isClicking: boolean = false;
        _isCopying: boolean;
        _isUndoing: boolean;
        _reservedContent: any;
        _lastVisibleFrozenRow: number;
        _lastVisibleFrozenColumn: number;
        _resettingFilter: boolean = false;
        definedNames: wjcCore.ObservableArray = new wjcCore.ObservableArray();

        /**
         * Overrides the template used to instantiate @see:FlexSheet control.
         */
        static controlTemplate = '<div style="width:100%;height:100%">' +
        '<div wj-part="container" style="width:100%">' +  // (start)a container contains original flexgrid to hide the horizontal scrollbar.
        wjcGrid.FlexGrid.controlTemplate +
        '</div>' + // (end)a container contains original flexgrid to hide the horizontal scrollbar.
        '<div wj-part="tab-holder" style="width:100%; min-width:100px">' + // sheet scrollbar splitter
        '</div>' +
        '<div wj-part="context-menu" style="display:none;z-index:100"></div>' +
        '</div>';

        /**
         * Initializes a new instance of the @see:FlexSheet class.
         *
         * @param element The DOM element that will host the control, or a jQuery selector (e.g. '#theCtrl').
         * @param options JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element, options);

            this['_eCt'].style.backgroundColor = 'white';
            // We will use the native scrollbar of the flexgrid instead of the custom scrollbar of flexsheet (TFS 121971)
            //this['_root'].style.overflowX = 'hidden';
            wjcCore.addClass(this.hostElement, 'wj-flexsheet');
            // Set the default font to Arial of the FlexSheet control (TFS 127769) 
            wjcCore.setCss(this.hostElement, {
                fontFamily: 'Arial'
            });
            this['_cf'] = new _FlexSheetCellFactory();

            // initialize the splitter, the sheet tab and the hscrollbar.
            this._init();

            this.showSort = false;
            this.allowSorting = false;
            this.showGroups = false;
            this.showMarquee = true;
            this.showSelectedHeaders = wjcGrid.HeadersVisibility.All;
            this.allowResizing = wjcGrid.AllowResizing.Both;
            this.allowDragging = wjcGrid.AllowDragging.None;
        }

        /**
         * Gets the collection of @see:Sheet objects representing workbook sheets.
         */
        get sheets(): SheetCollection {
            if (!this._sheets) {
                this._sheets = new SheetCollection();
                this._sheets.selectedSheetChanged.addHandler(this._selectedSheetChange, this);
                this._sheets.collectionChanged.addHandler(this._sourceChange, this);
                this._sheets.sheetVisibleChanged.addHandler(this._sheetVisibleChange, this);
                this._sheets.sheetCleared.addHandler(this.onSheetCleared, this);
            }
            return this._sheets;
        }

        /**
         * Gets or sets the index of the current sheet in the @see:FlexSheet. 
         */
        get selectedSheetIndex(): number {
            return this._selectedSheetIndex;
        }
        set selectedSheetIndex(value: number) {
            if (value !== this._selectedSheetIndex) {
                this._showSheet(value);
                this._sheets.selectedIndex = value;
            }
        }

        /**
         * Gets the current @see:Sheet in the <b>FlexSheet</b>. 
         */
        get selectedSheet(): Sheet {
            return this._sheets[this._selectedSheetIndex];
        }

        /**
         * Gets a value indicating whether the function list is opened.
         */
        get isFunctionListOpen(): boolean {
            return this._functionListHost && this._functionListHost.style.display !== 'none';
        }

        /**
         * Gets or sets a value indicating whether the TabHolder is visible.
         */
        get isTabHolderVisible (): boolean {
            return this._tabHolder.visible;
        }
        set isTabHolderVisible (value: boolean) {
            if (value !== this._tabHolder.visible) {
                if (value) {
                    this._divContainer.style.height = (this._divContainer.parentElement.clientHeight - this._tabHolder.getSheetBlanketSize()) + 'px';
                } else {
                    this._divContainer.style.height = this._divContainer.parentElement.clientHeight + 'px';
                }
                this._tabHolder.visible = value;
            }
        }

        /**
         * Gets the @see:UndoStack instance that controls undo and redo operations of the <b>FlexSheet</b>.
         */
        get undoStack(): UndoStack {
            return this._undoStack;
        }

        /**
         * Gets the @see:SortManager instance that controls <b>FlexSheet</b> sorting.
         */
        get sortManager(): SortManager {
            return this._sortManager;
        }

        /**
         * Gets or sets the visiblity of the filter icon.
         */
        get showFilterIcons(): boolean {
            if (!!this._filter) {
                return this._filter.showFilterIcons;
            }
            return false;
        }
        set showFilterIcons(value: boolean) {
            if (!!this._filter && this._filter.showFilterIcons !== value) {
                this._filter.showFilterIcons = value;
            }
        }

        /**
         * Occurs when current sheet index changed.
         */
        selectedSheetChanged = new wjcCore.Event();
        /**
         * Raises the currentSheetChanged event.
         *
         * @param e @see:PropertyChangedEventArgs that contains the event data.
         */
        onSelectedSheetChanged(e: wjcCore.PropertyChangedEventArgs) {
            this._sortManager._refresh();
            this.selectedSheetChanged.raise(this, e);
        }

        /**
         * Occurs when dragging the rows or the columns of the <b>FlexSheet</b>.
         */
        draggingRowColumn = new wjcCore.Event();
        /**
         * Raises the draggingRowColumn event.
         */
        onDraggingRowColumn(e: DraggingRowColumnEventArgs) {
            this.draggingRowColumn.raise(this, e);
        }

        /**
         * Occurs when dropping the rows or the columns of the <b>FlexSheet</b>.
         */
        droppingRowColumn = new wjcCore.Event();
        /**
         * Raises the droppingRowColumn event.
         */
        onDroppingRowColumn(e?: wjcCore.EventArgs) {
            this.droppingRowColumn.raise(this, new wjcCore.EventArgs());
        }

        /**
         * Occurs after the @see:FlexSheet loads the @see:Workbook instance 
         */
        loaded = new wjcCore.Event();
        /**
         * Raises the loaded event.
         */
        onLoaded(e?: wjcCore.EventArgs) {
            var self = this;
            if (self._toRefresh) {
                clearTimeout(self._toRefresh);
                self._toRefresh = null;
            }
            self._toRefresh = setTimeout(() => {
                self._setFlexSheetToDirty();
                self.invalidate();
            }, 10);
            self.loaded.raise(this, new wjcCore.EventArgs());
        }

        /**
         * Occurs when the @see:FlexSheet meets the unknown formula.
         */
        unknownFunction = new wjcCore.Event();
        /**
         * Raises the unknownFunction event.
         */
        onUnknownFunction(e: UnknownFunctionEventArgs) {
            this.unknownFunction.raise(this, e);
        }

        /**
         * Occurs when the @see:FlexSheet is cleared.
         */
        sheetCleared = new wjcCore.Event();
        /**
         * Raises the sheetCleared event.
         */
        onSheetCleared(e?: wjcCore.EventArgs) {
            this.sheetCleared.raise(this, new wjcCore.EventArgs());
        }

        /**
         * Occurs before the @see:FlexSheet insert\delete rows.
         */
        prepareChangingRow = new wjcCore.Event();
        /**
         * Raises the prepareChangingRow event.
         */
        onPrepareChangingRow() {
            this.prepareChangingRow.raise(this, new wjcCore.EventArgs());
        }

        /**
         * Occurs before the @see:FlexSheet insert\delete columns.
         */
        prepareChangingColumn = new wjcCore.Event();
        /**
         * Raises the prepareChangingColumn event.
         */
        onPrepareChangingColumn() {
            this.prepareChangingColumn.raise(this, new wjcCore.EventArgs());
        }

        /**
         * Occurs after the @see:FlexSheet insert\delete rows.
         */
        rowChanged = new wjcCore.Event();
        /**
         * Raises the rowChanged event.
         */
        onRowChanged(e: RowColumnChangedEventArgs) {
            this.rowChanged.raise(this, e);
        }

        /**
         * Occurs after the @see:FlexSheet insert\delete columns.
         */
        columnChanged = new wjcCore.Event();
        /**
         * Raises the columnChanged event.
         */
        onColumnChanged(e: RowColumnChangedEventArgs) {
            this.columnChanged.raise(this, e);
        }

        /**
         * Overridden to refresh the sheet and the TabHolder.
         *
         * @param fullUpdate Whether to update the control layout as well as the content.
         */
        refresh(fullUpdate = true) {
            var rowIndex: number,
                row: wjcGrid.Row,
                colIndex: number,
                col: wjcGrid.Column;

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
            super.refresh(fullUpdate);
            this._tabHolder.adjustSize();
        }

        /**
         * Overrides the setCellData function of the base class.
         *
         * @param r Index of the row that contains the cell.
         * @param c Index, name, or binding of the column that contains the cell.
         * @param value Value to store in the cell.
         * @param coerce Whether to change the value automatically to match the column's data type.
         * @return True if the value was stored successfully, false otherwise.
         */
        setCellData(r: number, c: any, value: any, coerce = false): boolean {
            var isFormula = wjcCore.isString(value) && (<string>value).length > 1 && (<string>value)[0] === '=';

            this._calcEngine._clearExpressionCache();

            return this.cells.setCellData(r, c, value, coerce && !isFormula);
        }

        /**
         * Overrides the base class method to take into account the function list.
         */
        containsFocus() : boolean {
            return this.isFunctionListOpen || super.containsFocus();
        }

        /**
         * Add an unbound @see:Sheet to the <b>FlexSheet</b>.
         * 
         * @param sheetName The name of the Sheet.
         * @param rows The row count of the Sheet.
         * @param cols The column count of the Sheet.
         * @param pos The position in the <b>sheets</b> collection.
         * @param grid The @see:FlexGrid instance associated with the @see:Sheet. If not specified then new @see:FlexGrid instance 
         * will be created.
         */
        addUnboundSheet(sheetName?: string, rows?: number, cols?: number, pos?: number, grid?: wjcGrid.FlexGrid): Sheet {
            var sheet = this._addSheet(sheetName, rows, cols, pos, grid);
            
            if (sheet.selectionRanges.length === 0) {
                // Store current selection in the selection array for multiple selection.
                sheet.selectionRanges.push(this.selection);
            }

            return sheet;
        }

        /**
         * Add a bound @see:Sheet to the <b>FlexSheet</b>.
         *
         * @param sheetName The name of the @see:Sheet.
         * @param source The items source for the @see:Sheet.
         * @param pos The position in the <b>sheets</b> collection.
         * @param grid The @see:FlexGrid instance associated with the @see:Sheet. If not specified then new @see:FlexGrid instance 
         * will be created.
         */
        addBoundSheet(sheetName: string, source: any, pos?: number, grid?: wjcGrid.FlexGrid): Sheet {
            var sheet = this._addSheet(sheetName, 0, 0, pos, grid);
            
            if (source) {
                sheet.itemsSource = source;
                if (this.childItemsPath) {
                    sheet.grid.childItemsPath = this.childItemsPath;
                }
            }

            if (sheet.selectionRanges.length === 0) {
                // Store current selection in the selection array for multiple selection.
                sheet.selectionRanges.push(this.selection);
            }

            return sheet;
        }

        /**
         * Apply the style to a range of cells. 
         *
         * @param cellStyle The @see:ICellStyle object to apply. 
         * @param cells An array of @see:CellRange objects to apply the style to. If not specified then
         * style is applied to the currently selected cells.
         * @param isPreview Indicates whether the applied style is just for preview.
         */
        applyCellsStyle(cellStyle: ICellStyle, cells?: wjcGrid.CellRange[], isPreview: boolean = false) {
            var rowIndex: number,
                colIndex: number,
                ranges = cells || [this.selection],
                range: wjcGrid.CellRange,
                index: number,
                cellStyleAction: _CellStyleAction;

            if (!this.selectedSheet) {
                return;
            }

            // Cancel current applied style.
            if (!cellStyle && this._cloneStyle) {
                this.selectedSheet._styledCells = JSON.parse(JSON.stringify(this._cloneStyle));
                this._cloneStyle = null;
                this.refresh(false);
                return;
            }

            // Apply cells style for the cell range of the FlexSheet control.
            if (ranges) {
                if (!cells && !isPreview) {
                    cellStyleAction = new _CellStyleAction(this, this._cloneStyle);
                    this._cloneStyle = null;
                } else if (isPreview && !this._cloneStyle) {
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
        }

        /**
         * Freeze or unfreeze the columns and rows of the <b>FlexSheet</b> control.
         */
        freezeAtCursor() {
            var self = this,
                rowIndex: number,
                colIndex: number,
                frozenColumns: number,
                frozenRows: number,
                row: wjcGrid.Row,
                column: wjcGrid.Column;

            if (!self.selectedSheet) {
                return;
            }

            if (self.selection && self.frozenRows === 0 && self.frozenColumns === 0) {
                // hide rows\cols scrolled above and scrolled left of the view range
                // so the user can freeze arbitrary parts of the grid 
                // (not necessarily starting with the first row/column)
                if (self._ptScrl.y < 0) {
                    for (rowIndex = 0; rowIndex < self.selection.topRow - 1; rowIndex++) {
                        row = self.rows[rowIndex];
                        if (!(row instanceof HeaderRow)) {
                            if (row._pos + self._ptScrl.y < 0) {
                                row.visible = false;
                            } else {
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
                            (<wjcGrid.Column>self.columns[colIndex]).visible = false;
                        } else {
                            self.selectedSheet._freezeHiddenColumnCnt = colIndex;
                            break;
                        }
                    }
                }

                // freeze
                frozenColumns = self.selection.leftCol > 0 ? self.selection.leftCol : 0;
                frozenRows = self.selection.topRow > 0 ? self.selection.topRow : 0;
            } else {
                // unhide
                for (rowIndex = 0; rowIndex < self.frozenRows - 1; rowIndex++) {
                    (<wjcGrid.Row>self.rows[rowIndex]).visible = true;
                }
                for (colIndex = 0; colIndex < self.frozenColumns - 1; colIndex++) {
                    (<wjcGrid.Column>self.columns[colIndex]).visible = true;
                }

                // Apply the filter of the FlexSheet again after resetting the visible of the rows. (TFS 204887)
                self._filter.apply();

                // unfreeze
                frozenColumns = 0;
                frozenRows = 0;
                self.selectedSheet._freezeHiddenRowCnt = 0;
                self.selectedSheet._freezeHiddenColumnCnt = 0;
            }

            // Synch to the grid of current sheet.
            self.frozenRows = self.selectedSheet.grid.frozenRows = frozenRows;
            self.frozenColumns = self.selectedSheet.grid.frozenColumns = frozenColumns;

            setTimeout(() => {
                self._setFlexSheetToDirty();
                self.invalidate();
                self.scrollIntoView(self.selection.topRow, self.selection.leftCol);
            }, 10);
        }

        /**
         * Show the filter editor.
         */
        showColumnFilter() {
            var selectedCol = this.selection.col > 0 ? this.selection.col : 0;

            if (this.columns.length > 0) {
                this._filter.editColumnFilter(this.columns[selectedCol]);
            }
        }

        /**
         * Clears the content of the <b>FlexSheet</b> control.
         */
        clear() {
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
            this.definedNames.clear();

            this.addUnboundSheet();
        }

        /**
         * Gets the @see:IFormatState object describing formatting of the selected cells.
         *
         * @return The @see:IFormatState object containing formatting properties.
         */
        getSelectionFormatState(): IFormatState {
            var rowIndex: number,
                colIndex: number,
                rowCount = this.rows.length,
                columnCount = this.columns.length,
                formatState = {
                    isBold: false,
                    isItalic: false,
                    isUnderline: false,
                    textAlign: 'left',
                    isMergedCell: false
                };

            // If there is no rows or columns in the flexsheet, we should return the default format state (TFS 122628)
            if (rowCount === 0 || columnCount === 0) {
                return formatState;
            }

            // Check the selected cells
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
        }

        /**
         * Inserts rows in the current @see:Sheet of the <b>FlexSheet</b> control.
         *
         * @param index The position where new rows should be added. If not specified then rows will be added
         * before the first row of the current selection.
         * @param count The numbers of rows to add. If not specified then one row will be added.
         */
        insertRows(index?: number, count?: number) {
            var rowIndex = wjcCore.isNumber(index) && index >= 0 ? index :
                (this.selection && this.selection.topRow > -1) ? this.selection.topRow : 0,
                rowCount = wjcCore.isNumber(count) ? count : 1,
                insRowAction = new _RowsChangedAction(this),
                currentRow = this.rows[rowIndex],
                i: number;

            if (!this.selectedSheet) {
                return;
            }
            // We disable inserting rows manually for the bound sheet.
            // Because it will cause the synch issue between the itemsSource and the sheet.
            if (this.itemsSource) {
                return;
            }

            this._clearCalcEngine();
            this.finishEditing();
            // The header row of the bound sheet should always in the top of the flexsheet.
            // The new should be added below the header row. (TFS #124391.)
            if (rowIndex === 0 && currentRow && currentRow.constructor === HeaderRow) {
                rowIndex = 1;
            }

            this.onPrepareChangingRow();
            // We should update styled cells hash before adding rows.
            this._updateCellsForUpdatingRow(this.rows.length, rowIndex, rowCount);

            // Update the affected formulas.
            insRowAction._affectedFormulas = this._updateAffectedFormula(rowIndex, rowCount, true, true);

            this.rows.beginUpdate();
            for (i = 0; i < rowCount; i++) {
                this.rows.insert(rowIndex, new wjcGrid.Row());
            }
            this.rows.endUpdate();

            if (!this.selection || this.selection.row === -1 || this.selection.col === -1) {
                this.selection = new wjcGrid.CellRange(0, 0);
            }

            // Synch with current sheet.
            this._copyTo(this.selectedSheet);

            insRowAction.saveNewState();
            this._undoStack._addAction(insRowAction);
            this.onRowChanged(new RowColumnChangedEventArgs(rowIndex, rowCount, true));
        }

        /**
         * Deletes rows from the current @see:Sheet of the <b>FlexSheet</b> control.
         * 
         * @param index The starting index of the deleting rows. If not specified then rows will be deleted
         * starting from the first row of the current selection.
         * @param count The numbers of rows to delete. If not specified then one row will be deleted.
         */
        deleteRows(index?: number, count?: number) {
            var rowCount = wjcCore.isNumber(count) && count >= 0 ? count :
                (this.selection && this.selection.topRow > -1) ? this.selection.bottomRow - this.selection.topRow + 1 : 1,
                firstRowIndex = wjcCore.isNumber(index) && index >= 0 ? index :
                (this.selection && this.selection.topRow > -1) ? this.selection.topRow : -1,
                lastRowIndex = wjcCore.isNumber(index) && index >= 0 ? index + rowCount - 1 :
                (this.selection && this.selection.topRow > -1) ? this.selection.bottomRow : -1,
                delRowAction = new _RowsChangedAction(this),
                rowDeleted = false,
                deletingRow: wjcGrid.Row,
                deletingRowIndex: number,
                currentRowsLength: number;

            if (!this.selectedSheet) {
                return;
            }
            // We disable deleting rows manually for the bound sheet.
            // Because it will cause the synch issue between the itemsSource and the sheet.
            if (this.itemsSource) {
                return;
            }

            this._clearCalcEngine();
            this.finishEditing();
            if (firstRowIndex > -1 && lastRowIndex > -1) {
                this.onPrepareChangingRow();
                // We should update styled cells hash before deleting rows.
                this._updateCellsForUpdatingRow(this.rows.length, firstRowIndex, rowCount, true);

                // Update the affected formulas.
                delRowAction._affectedFormulas = this._updateAffectedFormula(lastRowIndex, lastRowIndex - firstRowIndex + 1, false, true);

                this.rows.beginUpdate();
                for (; lastRowIndex >= firstRowIndex; lastRowIndex--) {
                    deletingRow = this.rows[lastRowIndex];

                    // The header row of the bound sheet is a specific row.
                    // So it hasn't to be deleted manually.
                    if (deletingRow && deletingRow.constructor === HeaderRow) {
                        continue;
                    }
                    // if we remove the rows in the bound sheet,
                    // we need remove the row related item in the itemsSource of the flexsheet. (TFS 121651)
                    if (deletingRow.dataItem && this.collectionView) {
                        this.collectionView.beginUpdate();
                        deletingRowIndex = this._getCvIndex(lastRowIndex);
                        if (deletingRowIndex > -1) {
                            this.itemsSource.splice(lastRowIndex - 1, 1);
                        }
                        this.collectionView.endUpdate();
                    } else {
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
                } else if (lastRowIndex === currentRowsLength - 1) {
                    this.select(new wjcGrid.CellRange(lastRowIndex, 0, lastRowIndex, this.columns.length - 1));
                } else {
                    this.select(new wjcGrid.CellRange(this.selection.topRow, this.selection.col, this.selection.topRow, this.selection.col2));
                }

                // Synch with current sheet.
                this._copyTo(this.selectedSheet);

                if (rowDeleted) {
                    delRowAction.saveNewState();
                    this._undoStack._addAction(delRowAction);
                    this.onRowChanged(new RowColumnChangedEventArgs(firstRowIndex, rowCount, false));
                }
            }
        }

        /**
         * Inserts columns in the current @see:Sheet of the <b>FlexSheet</b> control.
         *
         * @param index The position where new columns should be added. If not specified then columns will be added
         * before the left column of the current selection.
         * @param count The numbers of columns to add. If not specified then one column will be added.
         */
        insertColumns(index?: number, count?: number) {
            var columnIndex = wjcCore.isNumber(index) && index >= 0 ? index :
                this.selection && this.selection.leftCol > -1 ? this.selection.leftCol : 0,
                colCount = wjcCore.isNumber(count) ? count : 1,
                insColumnAction = new _ColumnsChangedAction(this),
                column: wjcGrid.Column,
                i: number;

            if (!this.selectedSheet) {
                return;
            }
            // We disable inserting columns manually for the bound sheet.
            // Because it will cause the synch issue between the itemsSource and the sheet.
            if (this.itemsSource) {
                return;
            }

            this._clearCalcEngine();
            this.finishEditing();

            this.onPrepareChangingColumn();

            // We should update styled cells hash before adding columns.
            this._updateCellsForUpdatingColumn(this.columns.length, columnIndex, colCount);

            // Update the affected formulas.
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

            // Synch with current sheet.
            this._copyTo(this.selectedSheet);

            insColumnAction.saveNewState();
            this._undoStack._addAction(insColumnAction);
            this.onColumnChanged(new RowColumnChangedEventArgs(columnIndex, colCount, true));
        }

        /**
         * Deletes columns from the current @see:Sheet of the <b>FlexSheet</b> control.
         * 
         * @param index The starting index of the deleting columns. If not specified then columns will be deleted
         * starting from the first column of the current selection.
         * @param count The numbers of columns to delete. If not specified then one column will be deleted.
         */
        deleteColumns(index?: number, count?: number) {
            var currentColumnLength: number,
                colCount = wjcCore.isNumber(count) && count >= 0 ? count :
                (this.selection && this.selection.leftCol > -1) ? this.selection.rightCol - this.selection.leftCol + 1 : 1,
                firstColIndex = wjcCore.isNumber(index) && index >= 0 ? index :
                (this.selection && this.selection.leftCol > -1) ? this.selection.leftCol : -1,
                lastColIndex = wjcCore.isNumber(index) && index >= 0 ? index + colCount - 1 :
                (this.selection && this.selection.leftCol > -1) ? this.selection.rightCol : -1,
                delColumnAction = new _ColumnsChangedAction(this);

            if (!this.selectedSheet) {
                return;
            }
            // We disable deleting columns manually for the bound sheet.
            // Because it will cause the synch issue between the itemsSource and the sheet.
            if (this.itemsSource) {
                return;
            }

            this._clearCalcEngine();
            this.finishEditing();
            if (firstColIndex > -1 && lastColIndex > -1) {
                this.onPrepareChangingColumn();

                // We should update styled cells hash before deleting columns.
                this._updateCellsForUpdatingColumn(this.columns.length, firstColIndex, colCount, true);

                // Update the affected formulas.
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
                } else if (lastColIndex === currentColumnLength - 1) {
                    this.select(new wjcGrid.CellRange(0, lastColIndex, this.rows.length - 1, lastColIndex));
                } else {
                    this.select(new wjcGrid.CellRange(this.selection.row, this.selection.leftCol, this.selection.row2, this.selection.leftCol));
                }

                // Synch with current sheet.
                this._copyTo(this.selectedSheet);

                delColumnAction.saveNewState();
                this._undoStack._addAction(delColumnAction);
                this.onColumnChanged(new RowColumnChangedEventArgs(firstColIndex, colCount, false));
            }
        }

        /**
         * Merges the selected @see:CellRange into one cell.
         *
         * @param cells The @see:CellRange to merge.
         * @param isCopyMergeCell This parameter indicates that merge operation is done by copy\paste merge cell or not.
         */
        mergeRange(cells?: wjcGrid.CellRange, isCopyMergeCell: boolean = false) {
            var rowIndex: number,
                colIndex: number,
                cellIndex: number,
                mergedRange: wjcGrid.CellRange,
                range = cells || this.selection,
                mergedCellExists = false,
                cellMergeAction: _CellMergeAction,
                firstVisibleRow = -1;

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
        }

        /**
         * Gets a @see:CellRange that specifies the merged extent of a cell
         * in a @see:GridPanel.
         * This method overrides the getMergedRange method of its parent class FlexGrid
         *
         * @param panel @see:GridPanel that contains the range.
         * @param r Index of the row that contains the cell.
         * @param c Index of the column that contains the cell.
         * @param clip Whether to clip the merged range to the grid's current view range.
         * @return A @see:CellRange that specifies the merged range, or null if the cell is not merged.
         */
        getMergedRange(panel: wjcGrid.GridPanel, r: number, c: number, clip = true): wjcGrid.CellRange {
            var cellIndex = r * this.columns.length + c,
                mergedRange = this.selectedSheet ? <wjcGrid.CellRange>this.selectedSheet._mergedRanges[cellIndex] : null,
                topRow: number,
                bottonRow: number,
                leftCol: number,
                rightCol: number;

            if (panel === this.cells && mergedRange) {
                // Adjust the merged cell with the frozen pane.
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

            // Only when there are columns in current sheet, it will get the merge range from parent flexgrid. (TFS #142348, #143544)
            if (c >= 0 && this.columns && this.columns.length > c && r >= 0 && this.rows && this.rows.length > c) {
                return super.getMergedRange(panel, r, c, clip);
            }
            return null;
        }

        /**
         * Evaluates a formula.
         *
         * @see:FlexSheet formulas follow the Excel syntax, including a large subset of the
         * functions supported by Excel. A complete list of the functions supported by
         * @see:FlexSheet can be found here: 
         * <a href="static/FlexSheetFunctions.html">FlexSheet Functions</a>.
         *
         * @param formula The formula to evaluate. The formula may start with an optional equals sign ('=').
         * @param format If specified, defines the .Net format that will be applied to the evaluated value.
         * @param sheet The @see:Sheet whose data will be used for evaluation. 
         *              If not specified then the current sheet is used.
         */
        evaluate(formula: string, format?: string, sheet?: Sheet): any {
            return this._evaluate(formula, format, sheet);
        }

        /**
         * Gets the evaluated cell value.
         * 
         * Unlike the <b>getCellData</b> method that returns a raw data that can be a value or a formula, the <b>getCellValue</b>
         * method always returns an evaluated value, that is if the cell contains a formula then it will be evaluated first and the 
         * resulting value will be returned.
         *
         * @param rowIndex The row index of the cell.
         * @param colIndex The column index of the cell.
         * @param formatted Indicates whether to return an original or a formatted value of the cell.
         * @param sheet The @see:Sheet whose value to evaluate. If not specified then the data from current sheet 
         * is used.
         */
        getCellValue(rowIndex: number, colIndex: number, formatted: boolean = false, sheet?: Sheet): any {
            var col = sheet ? <wjcGrid.Column>sheet.grid.columns[colIndex] : <wjcGrid.Column>this.columns[colIndex],
                styleInfo = this._getCellStyle(rowIndex, colIndex, sheet),
                format: string,
                cellVal: any;
                
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
            } else if (cellVal) {
                if (formatted) {
                    cellVal = wjcCore.Globalize.format(cellVal.value, format || cellVal.format || col.format);
                } else {
                    cellVal = cellVal.value;
                }
            }
            return cellVal == null ? '' : cellVal;
        }

        /**
         * Open the function list.
         *
         * @param target The DOM element that toggle the function list.
         */
        showFunctionList(target: HTMLElement) {
            var self = this,
                functionOffset = self._cumulativeOffset(target),
                rootOffset = self._cumulativeOffset(self['_root']),
                offsetTop: number,
                offsetLeft: number;

            self._functionTarget = wjcCore.tryCast(target, HTMLInputElement);
            if (self._functionTarget && self._functionTarget.value && self._functionTarget.value[0] === '=') {
                self._functionList._cv.filter = (item: any) => {
                    var text = (<string>item['actualvalue']).toLowerCase(),
                        searchIndex = self._getCurrentFormulaIndex(self._functionTarget.value),
                        searchText: string;

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
                } else {
                    offsetTop += 5;
                }
                if (self._functionListHost.offsetWidth + offsetLeft > rootOffset.x + self['_root'].offsetWidth) {
                    offsetLeft = rootOffset.x + self['_root'].offsetWidth - self._functionListHost.offsetWidth;
                }
                wjcCore.setCss(self._functionListHost, {
                    top: offsetTop,
                    left: offsetLeft
                });
            } else {
                self.hideFunctionList();
            }
        }

        /**
         * Close the function list.
         */
        hideFunctionList() {
            this._functionListHost.style.display = 'none';
        }

        /**
         * Select previous function in the function list.
         */
        selectPreviousFunction() {
            var index = this._functionList.selectedIndex;
            if (index > 0) {
                this._functionList.selectedIndex--;
            }
        }

        /**
         * Select next function in the function list.
         */
        selectNextFunction() {
            var index = this._functionList.selectedIndex;
            if (index < this._functionList.itemsSource.length) {
                this._functionList.selectedIndex++;
            }
        }

        /**
         * Inserts the selected function from the function list to the cell value editor.
         */
        applyFunctionToCell() {
            var self = this,
                currentFormulaIndex: number;

            if (self._functionTarget) {
                currentFormulaIndex = self._getCurrentFormulaIndex(self._functionTarget.value);
                if (currentFormulaIndex === -1) {
                    currentFormulaIndex = self._functionTarget.value.indexOf('=');
                } else {
                    currentFormulaIndex += 1;
                }
                self._functionTarget.value = self._functionTarget.value.substring(0, currentFormulaIndex) + self._functionList.selectedValue + '(';
                if (self._functionTarget.value[0] !== '=') {
                    self._functionTarget.value = '=' + self._functionTarget.value;
                }
                self._functionTarget.focus();
                self.hideFunctionList();
            }
        }

        /**
         * Saves <b>FlexSheet</b> to xlsx file.
         * This method works with JSZip 2.5.
         *
         * For example:
         * <pre>// This sample exports FlexSheet content to an xlsx file.  
         * // click.
         * &nbsp;
         * // HTML
         * &lt;button 
         *     onclick="saveXlsx('FlexSheet.xlsx')"&gt;
         *     Save
         * &lt;/button&gt;
         * &nbsp;
         * // JavaScript
         * function saveXlsx(fileName) {
         *     // Save the flexGrid to xlsx file.
         *     flexsheet.save(fileName);
         * }</pre>
         *
         * @param fileName Name of the file that is generated.
         * @return A workbook instance containing the generated xlsx file content.
         */
        save(fileName?: string): wjcXlsx.Workbook {
            var workbook = this._saveToWorkbook();

            if (fileName) {
                workbook.save(fileName);
            }

            return workbook;
        }

        /**
         * Saves the <b>FlexSheet</b> to xlsx file asynchronously.
         * This method works with JSZip 3.0.
         *
         * @param fileName Name of the file that is generated.
         * @param onSaved This callback provides an approach to get the base-64 string that
         *  represents the content of the saved FlexSheet. Since this method is an asynchronous
         * method, user is not able to get the base-64 string immediately. User has to get the
         * base-64 string through this callback. This has a single parameter, the base64 string
         * of the saved flexsheet. It is passed to user.
         * @param onError This callback catches error information when saving.
         * This has a single parameter, the failure reason. The return value is passed to user
         * if he wants to catch the save failure reason.
         *
         * For example:
         * <pre>
         * flexsheet.saveAsync('', function (base64) {
         *      // user can access the base64 string in this callback.
         *      document.getElementByID('export').href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' + 'base64,' + base64;
         * }, function (reason) {
         *      // User can catch the failure reason in this callback.
         *      console.log('The reason of save failure is ' + reason);
         * });
         * </pre>
         
         * @return A workbook instance containing the generated xlsx file content.
         */
        saveAsync(fileName?: string, onSaved?: (base64?: string) => any, onError?: (reason?: any) => any) {
            var workbook = this._saveToWorkbook();

            if (fileName) {
                workbook.saveAsync(fileName, onSaved, onError);
            }

            return workbook;
        }

        /*
         * Save the <b>FlexSheet</b> to Workbook Object Model represented by the @see:IWorkbook interface.
         *
         * @return The @see:IWorkbook instance that represents the export results.
         */
        saveToWorkbookOM(): wjcXlsx.IWorkbook {
            var workbook = this._saveToWorkbook();

            return workbook._serialize();
        }

        /**
         * Loads the workbook into <b>FlexSheet</b>.
         * This method works with JSZip 2.5.
         *
         * For example:
         * <pre>// This sample opens an xlsx file chosen through Open File
         * // dialog and fills FlexSheet
         * &nbsp;
         * // HTML
         * &lt;input type="file" 
         *     id="importFile" 
         *     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
         * /&gt;
         * &lt;div id="flexHost"&gt;&lt;/&gt;
         * &nbsp;
         * // JavaScript
         * var flexSheet = new wijmo.grid.FlexSheet("#flexHost"),
         *     importFile = document.getElementById('importFile');
         * &nbsp;
         * importFile.addEventListener('change', function () {
         *     loadWorkbook();
         * });
         * &nbsp;
         * function loadWorkbook() {
         *     var reader,
         *         file = importFile.files[0];
         *     if (file) {
         *         reader = new FileReader();
         *         reader.onload = function (e) {
         *             flexSheet.load(reader.result);
         *         };
         *         reader.readAsArrayBuffer(file);
         *     }
         * }</pre>
         *
         * @param workbook A workbook instance or a Blob instance or a base-64 string
         * or an ArrayBuffer containing xlsx file content.
         */
        load(workbook: any) {
            var workbookInstance: wjcXlsx.Workbook,
                reader: FileReader,
                self = this;

            if (workbook instanceof Blob) {
                reader = new FileReader();
                reader.onload = () => {
                    var fileContent = reader.result;
                    fileContent = wjcXlsx.Workbook._base64EncArr(new Uint8Array(fileContent));
                    workbookInstance = new wjcXlsx.Workbook();
                    workbookInstance.load(fileContent);
                    self._loadFromWorkbook(workbookInstance);
                }
                reader.readAsArrayBuffer(workbook);
            } else if (workbook instanceof wjcXlsx.Workbook) {
                self._loadFromWorkbook(workbook);
            } else {
                if (workbook instanceof ArrayBuffer) {
                    workbook = wjcXlsx.Workbook._base64EncArr(new Uint8Array(workbook));
                } else if (!wjcCore.isString(workbook)) {
                    throw 'Invalid workbook.';
                }
                workbookInstance = new wjcXlsx.Workbook();
                workbookInstance.load(workbook);
                self._loadFromWorkbook(workbookInstance);
            }
        }

        /**
         * Loads the workbook into <b>FlexSheet</b> asynchronously.
         * This method works with JSZip 3.0.
         *
         * @param workbook A workbook instance or a Blob instance or a base-64
         * string or an ArrayBuffer containing xlsx file content.
         * @param onLoaded This callback provides an approach to get the loaded workbook instance.
         * Since this method is an asynchronous method, user is not able to get the loaded workbook
         * instance immediately. User has to get the loaded workbook instance through this callback.
         * This has a single parameter, the loaded workbook instance. It is passed to user.
         * @param onError This callback catches error information when loading.
         * This has a single parameter, the failure reason. The return value is passed to user
         * if he wants to catch the load failure reason.
         *
         * For example:
         * <pre>
         * flexsheet.loadAsync(blob, function (workbook) {
         *      // user can access the loaded workbook instance in this callback.
         *      var app = worksheet.application ;
         *      ...
         * }, function (reason) {
         *      // User can catch the failure reason in this callback.
         *      console.log('The reason of load failure is ' + reason);
         * });
         * </pre>
         */
        loadAsync(workbook: any, onLoaded?: (workbook: wjcXlsx.Workbook) => void, onError?: (reason?: any) => any) {
            var workbookInstance: wjcXlsx.Workbook,
                reader: FileReader,
                self = this;

            if (workbook instanceof Blob) {
                reader = new FileReader();
                reader.onload = () => {
                    var fileContent = reader.result;
                    fileContent = wjcXlsx.Workbook._base64EncArr(new Uint8Array(fileContent));
                    workbookInstance = new wjcXlsx.Workbook();
                    workbookInstance.loadAsync(fileContent, (loadedWork: wjcXlsx.Workbook) => {
                        self._loadFromWorkbook(loadedWork);
                        if (onLoaded) {
                            onLoaded(loadedWork);
                        }
                    }, onError);
                }
                reader.readAsArrayBuffer(workbook);
            } else if (workbook instanceof wjcXlsx.Workbook) {
                self._loadFromWorkbook(workbook);
                if (onLoaded) {
                    onLoaded(workbook);
                }
            } else {
                if (workbook instanceof ArrayBuffer) {
                    workbook = wjcXlsx.Workbook._base64EncArr(new Uint8Array(workbook));
                } else if (!wjcCore.isString(workbook)) {
                    throw 'Invalid workbook.';
                }
                workbookInstance = new wjcXlsx.Workbook();
                workbookInstance.loadAsync(workbook, (loadedWork: wjcXlsx.Workbook) => {
                    self._loadFromWorkbook(loadedWork);
                    if (onLoaded) {
                        onLoaded(loadedWork);
                    }
                }, onError);
            }
        }

        /*
         * Load the Workbook Object Model instance into the <b>FlexSheet</b>.
         *
         * @param workbook The Workbook Object Model instance to load data from.
         */
        loadFromWorkbookOM(workbook: wjcXlsx.IWorkbook) {
            var grids = [],
                workbookInstance: wjcXlsx.Workbook;

            if (workbook instanceof wjcXlsx.Workbook) {
                workbookInstance = <wjcXlsx.Workbook>workbook;
            } else {
                workbookInstance = new wjcXlsx.Workbook();
                workbookInstance._deserialize(workbook);
            }

            this._loadFromWorkbook(workbookInstance);
        }

        /**
         * Undo the last user action.
         */
        undo() {
            var self = this;
            // The undo should wait until other operations have done. (TFS 189582) 
            setTimeout(() => {
                self._undoStack.undo();
            }, 100);
        } 

        /**
         * Redo the last user action.
         */
        redo() {
            var self = this;
            // The redo should wait until other operations have done. (TFS 189582) 
            setTimeout(() => {
                self._undoStack.redo();
            }, 100);
        }

        /**
         * Selects a cell range and optionally scrolls it into view.
         *
         * @see:FlexSheet overrides this method to adjust the selection cell range for the merged cells in the @see:FlexSheet.
         *
         * @param rng The cell range to select.
         * @param show Indicates whether to scroll the new selection into view.
         */
        select(rng: any, show: any = true) {
            var mergedRange: wjcGrid.CellRange,
                rowIndex: number,
                colIndex: number; 

            if (rng.rowSpan !== this.rows.length && rng.columnSpan !== this.columns.length) {
                for (rowIndex = rng.topRow; rowIndex <= rng.bottomRow; rowIndex++) {
                    for (colIndex = rng.leftCol; colIndex <= rng.rightCol; colIndex++) {
                        mergedRange = this.getMergedRange(this.cells, rowIndex, colIndex);

                        if (mergedRange && !rng.equals(mergedRange)) {
                            if (rng.row <= rng.row2) {
                                rng.row = Math.min(rng.topRow, mergedRange.topRow);
                                rng.row2 = Math.max(rng.bottomRow, mergedRange.bottomRow);
                            } else {
                                rng.row = Math.max(rng.bottomRow, mergedRange.bottomRow);
                                rng.row2 = Math.min(rng.topRow, mergedRange.topRow);
                            }

                            if (rng.col <= rng.col2) {
                                rng.col = Math.min(rng.leftCol, mergedRange.leftCol);
                                rng.col2 = Math.max(rng.rightCol, mergedRange.rightCol);
                            } else {
                                rng.col = Math.max(rng.rightCol, mergedRange.rightCol);
                                rng.col2 = Math.min(rng.leftCol, mergedRange.leftCol);
                            }
                        }
                    }
                }
            }

            if (this.collectionView) {
                // When select all cells in the bound sheet, we should ignore the header row of the bound sheet.
                // This updating is for TFS issue #128358
                if (rng.topRow === 0 && rng.bottomRow === this.rows.length - 1
                    && rng.leftCol === 0 && rng.rightCol === this.columns.length - 1) {
                    rng.row = 1;
                    rng.row2 = this.rows.length - 1;
                }
            }

            super.select(rng, show);
        }

        /*
         * Add custom function in @see:FlexSheet.
         * @param name the name of the custom function.
         * @param func the custom function.
         * @param description the description of the custom function, it will be shown in the function autocompletion of the @see:FlexSheet.
         * @param minParamsCount the minimum count of the parameter that the function need.
         * @param maxParamsCount the maximum count of the parameter that the function need.
         *        If the count of the parameters in the custom function is arbitrary, the minParamsCount and maxParamsCount should be set to null.
         */
        addCustomFunction(name: string, func: Function, description?: string, minParamsCount?: number, maxParamsCount?: number) {
            wjcCore._deprecated('addCustomFunction', 'addFunction');
            this._calcEngine.addCustomFunction(name, func, minParamsCount, maxParamsCount);
            this._addCustomFunctionDescription(name, description);
        }

        /**
         * Add custom function in @see:FlexSheet.
         * @param name the name of the custom function.
         * @param func the custom function.
         * <br/>
         * The function signature looks as follows:
         * <br/>
         * <pre>function (...params: any[][][]): any;</pre>
         * The function takes a variable number of parameters, each parameter corresponds to an expression
         * passed as a function argument. Independently of whether the expression passed as a function argument
         * resolves to a single value or to a cell range, each parameter value is always a two dimensional array
         * of resolved values. The number of rows (first index) and columns (second index) in the array corresponds
         * to the size of the specified cell range. In case where argument is an expression that resolves
         * to a single value, it will be a one-to-one array where its value can be retrieved using the
         * param[0][0] indexer.
         * <br/>
         * The sample below adds a custom Sum Product function ('customSumProduct') to the FlexSheet:
         * <pre>flexSheet.addFunction('customSumProduct', (...params: any[][][]) =&gt; {
         *    let result = 0,
         *        range1 = params[0],
         *        range2 = params[1];
         *
         *    if (range1.length &gt; 0 && range1.length === range2.length && range1[0].length === range2[0].length) {
         *        for (let i = 0; i &lt; range1.length; i++) {
         *            for (let j = 0; j &lt; range1[0].length; j++) {
         *                result += range1[i][j] * range2[i][j];
         *            }
         *        }
         *    }
         *    return result;
         * }, 'Custom SumProduct Function', 2, 2);</pre>
         * After adding this function, it can be used it in sheet cell expressions, like here:
         * <pre>=customSumProduct(A1:B5, B1:C5)</pre>
         * @param description the description of the custom function, it will be shown in the function autocompletion of the @see:FlexSheet.
         * @param minParamsCount the minimum count of the parameter that the function need.
         * @param maxParamsCount the maximum count of the parameter that the function need.
         *        If the count of the parameters in the custom function is arbitrary, the minParamsCount and maxParamsCount should be set to null.
         */
        addFunction(name: string, func: Function, description?: string, minParamsCount?: number, maxParamsCount?: number) {
            this._calcEngine.addFunction(name, func, minParamsCount, maxParamsCount);
            this._addCustomFunctionDescription(name, description);
        }

        /**
         * Disposes of the control by removing its association with the host element.
         */
        dispose() {
            var userAgent = window.navigator.userAgent;

            document.removeEventListener('mousemove', this._mouseMoveHdl);
            document.body.removeEventListener('click', this._clickHdl);

            if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
                document.body.removeEventListener('touchstart', this._touchStartHdl);
                document.body.removeEventListener('touchend', this._touchEndHdl);
            }

            this.hideFunctionList();

            super.dispose();
        }

        /**
         * Gets the content of a @see:CellRange as a string suitable for 
         * copying to the clipboard.
         *
         * @see:FlexSheet overrides this method to support multiple rows or columns selection in @see:FlexSheet.
         *
         * Hidden rows and columns are not included in the clip string.
         *
         * @param rng @see:CellRange to copy. If omitted, the current selection is used.
         */
        getClipString(rng?: wjcGrid.CellRange): string {
            var clipString = '',
                selections: wjcGrid.CellRange[],
                rowIndex: number,
                selIndex: number,
                firstRow: boolean = true,
                firstCell: boolean,
                sel: wjcGrid.CellRange,
                cell: string;

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
                } else if (this._isMultipleColumnsSelected()) {
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
                } else {
                    rng = this.selection;
                    switch (this.selectionMode) {

                        // row modes: expand range to cover all columns
                        case wjcGrid.SelectionMode.Row:
                        case wjcGrid.SelectionMode.RowRange:
                            rng.col = 0;
                            rng.col2 = this.columns.length - 1;
                            break;

                        // ListBox mode: scan rows and copy selected ones
                        case wjcGrid.SelectionMode.ListBox:
                            rng.col = 0;
                            rng.col2 = this.columns.length - 1;
                            for (var i = 0; i < this.rows.length; i++) {
                                if (this.rows[i].isSelected && this.rows[i].isVisible) {
                                    rng.row = rng.row2 = i;
                                    if (clipString) clipString += '\n';
                                    clipString += this.getClipString(rng);
                                }
                            }
                            return clipString;
                    }
                }
            }

            // scan rows
            rng = wjcCore.asType(rng, wjcGrid.CellRange);
            for (var r = rng.topRow; r <= rng.bottomRow; r++) {

                // skip invisible, add separator
                if (!this.rows[r].isVisible) continue;
                if (!firstRow) clipString += '\n';
                firstRow = false;

                // scan cells
                for (var c = rng.leftCol, firstCell = true; c <= rng.rightCol; c++) {

                    // skip invisible, add separator
                    if (!this.columns[c].isVisible) continue;
                    if (!firstCell) clipString += '\t';
                    firstCell = false;

                    // append cell
                    cell = this.getCellValue(r, c, true).toString();
                    cell = cell.replace(/\t/g, ' '); // handle tabs
                    if (cell.indexOf('\n') > -1) {   // handle line breaks
                        cell = '"' + cell.replace(/"/g, '""') + '"';
                    }
                    clipString += cell;
                }
            }

            return clipString;
        }

        /**
         * Parses a string into rows and columns and applies the content to a given range.
         *
         * Override the <b>setClipString</b> method of @see:FlexGrid.
         *
         * @param text Tab and newline delimited text to parse into the grid.
         * @param rng @see:CellRange to copy. If omitted, the current selection is used.
         */
        setClipString(text: string, rng?: wjcGrid.CellRange) {
            var autoRange = rng == null,
                pasted = false,
                rngPaste: wjcGrid.CellRange,
                row: number,
                col: number,
                copiedRow: number,
                copiedCol: number,
                lines: string[],
                cells: string[],
                cellData: string,
                matches: string[],
                i: number,
                cellRefIndex: number,
                cellRef: string,
                cellAddress: wjcXlsx.ITableAddress,
                updatedCellRef: string,
                rowDiff: number,
                colDiff: number,
                copiedRange: wjcGrid.CellRange,
                isMultiLine: boolean = false,
                copiedRowIndex: number,
                copiedColIndex: number,
                rowSpan: number,
                colSpan: number,
                orgText: string;

            rng = rng ? wjcCore.asType(rng, wjcGrid.CellRange) : this.selection;

            // normalize text
            text = wjcCore.asString(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            if (text && text[text.length - 1] == '\n') {
                text = text.substring(0, text.length - 1);
            }
            orgText = text;
            if (autoRange && !rng.isSingleCell) {
                text = this._edtHdl._expandClipString(text, rng);
            }

            lines = this._edtHdl._clipToRows(text);
            isMultiLine = this._containsMultiLineText(lines);

            if ((!this._copiedRanges || this._copiedRanges.length === 0 || (orgText !== this._getRangeString(this._copiedRanges, this._copiedSheet) && !this._containsRandFormula(this._copiedRanges, this._copiedSheet)) || !!this._cutData) && !isMultiLine) {
                if (this._cutData != null) {
                    this.beginUpdate();
                    this._delCutData();
                    super.setClipString(this._cutData, rng);
                    this.endUpdate();
                    this._cutData = null;
                    this._cutValue = orgText;
                } else if (this._cutValue === null || orgText !== this._cutValue) {
                    this._cutValue = null;
                    super.setClipString(text, rng);
                }
                this._copiedRanges = null;
                this._copiedSheet = null;
                return;
            }

            // keep track of paste range to select later
            rngPaste = new wjcGrid.CellRange(rng.topRow, rng.leftCol);

            // copy lines to rows
            this.beginUpdate();
            if (isMultiLine || !this._copiedRanges || this._copiedRanges.length > 1 || this._copiedRanges.length === 0) {
                row = rng.topRow;
                copiedRange = this._copiedRanges && this._copiedRanges.length > 1 ? this._copiedRanges[0] : new wjcGrid.CellRange();
                copiedRow = copiedRange.topRow;
                for (i = 0; i < lines.length && row < this.rows.length; i++ , row++) {
                    // skip invisible row, keep clip line
                    if (!this.rows[row].isVisible) {
                        i--;
                        continue;
                    }
                    // copy cells to columns
                    cells = this._edtHdl._clipToCells(lines[i]);
                    copiedCol = copiedRange.leftCol;
                    col = rng.leftCol;
                    colDiff = col - copiedCol;
                    for (var j = 0; j < cells.length && col < this.columns.length; j++ , col++) {
                        // skip invisible column, keep clip cell
                        if (!this.columns[col].isVisible) {
                            j--;
                            continue;
                        }
                        // assign cell
                        cellData = cells[j];
                        if (!this.columns[col].isReadOnly && !this.rows[row].isReadOnly) {
                            pasted = this._postSetClipStringProcess(cellData, row, col, copiedRow, copiedCol);

                            // update paste range
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
            } else if (this._copiedRanges && this._copiedRanges.length === 1) {
                copiedRowIndex = 0;
                copiedRange = this._copiedRanges[0];
                rowSpan = copiedRange.rowSpan > rng.rowSpan ? copiedRange.rowSpan : rng.rowSpan;
                colSpan = copiedRange.columnSpan > rng.columnSpan ? copiedRange.columnSpan : rng.columnSpan;
                for (row = rng.topRow; row < rng.topRow + rowSpan && row < this.rows.length; row++) {
                    copiedColIndex = 0;
                    // skip invisible row
                    if (!this.rows[row].isVisible) {
                        continue;
                    }
                    if (copiedRowIndex >= copiedRange.rowSpan) {
                        if (rowSpan % copiedRange.rowSpan === 0 && colSpan % copiedRange.columnSpan === 0) {
                            copiedRowIndex = copiedRowIndex % copiedRange.rowSpan;
                        } else {
                            break;
                        }
                    }
                    rowDiff = row - copiedRange.topRow - copiedRowIndex;
                    for (col = rng.leftCol; col < rng.leftCol + colSpan && col < this.columns.length; col++) {
                        // skip invisible column
                        if (!this.columns[col].isVisible) {
                            continue;
                        }
                        if (copiedColIndex >= copiedRange.columnSpan) {
                            if (rowSpan % copiedRange.rowSpan === 0 && colSpan % copiedRange.columnSpan === 0) {
                                copiedColIndex = copiedColIndex % copiedRange.columnSpan;
                            } else {
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

                            // update paste range
                            rngPaste.row2 = Math.max(rngPaste.row2, row);
                            rngPaste.col2 = Math.max(rngPaste.col2, col);
                        }
                        copiedColIndex++;
                    }
                    copiedRowIndex++
                }
            }
            this.endUpdate();

            // done, refresh view to update sorting/filtering 
            if (this.collectionView && pasted) {
                this.collectionView.refresh();
            }

            // select pasted range
            this.select(rngPaste);
        }

        // Override the getCvIndex method of its parent class FlexGrid
        _getCvIndex(index: number): number {
            var row;
            if (index > -1 && this.collectionView) {
                row = this.rows[index];
                if (row instanceof HeaderRow) {
                    return index;
                } else {
                    return super._getCvIndex(index);
                }
            }

            return -1;
        }

        // Initialize the FlexSheet control
        private _init() {
            var self = this,
                userAgent = window.navigator.userAgent,
                mouseUp = (e: MouseEvent) => {
                    document.removeEventListener('mouseup', mouseUp);
                    self._mouseUp(e);
                };

            self.hostElement.setAttribute('tabindex', '-1');
            self._divContainer = <HTMLElement>self.hostElement.querySelector('[wj-part="container"]');
            self._tabHolder = new _TabHolder(self.hostElement.querySelector('[wj-part="tab-holder"]'), self);
            self._contextMenu = new _ContextMenu(self.hostElement.querySelector('[wj-part="context-menu"]'), self);
            self['_gpCells'] = new FlexSheetPanel(self, wjcGrid.CellType.Cell, self.rows, self.columns, <HTMLElement>self['_eCt']);
            self['_gpCHdr'] = new FlexSheetPanel(self, wjcGrid.CellType.ColumnHeader, self['_hdrRows'], self.columns, self['_eCHdrCt']);
            self['_gpRHdr'] = new FlexSheetPanel(self, wjcGrid.CellType.RowHeader, self.rows, self['_hdrCols'], self['_eRHdrCt']);
            self['_gpTL'] = new FlexSheetPanel(self, wjcGrid.CellType.TopLeft, self['_hdrRows'], self['_hdrCols'], self['_eTLCt']);

            self._sortManager = new SortManager(self);
            self._filter = new _FlexSheetFilter(self);
            self._calcEngine = new _CalcEngine(self);
            self._calcEngine.unknownFunction.addHandler((sender: Object, e: UnknownFunctionEventArgs) => {
                self.onUnknownFunction(e);
            }, self);
            self._initFuncsList();

            self._undoStack = new UndoStack(self);

            // Add header row for the bind sheet.
            self.loadedRows.addHandler(() => {
                if (self.itemsSource && !(self.rows[0] instanceof HeaderRow)) {
                    var row = new HeaderRow(),
                        col: wjcGrid.Column;
                    for (var i = 0; i < self.columns.length; i++) {
                        col = self.columns[i]
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

            // Setting the required property of the column to false for the bound sheet.
            // TFS #126125
            self.itemsSourceChanged.addHandler(() => {
                var colIndex: number;

                for (colIndex = 0; colIndex < self.columns.length; colIndex++) {
                    self.columns[colIndex].isRequired = false;
                }
            });

            // Store the copied range for updating cell reference of the formula when pasting. (TFS 190785)
            self.copied.addHandler((sender: Object, args: wjcGrid.CellRangeEventArgs) => {
                var selections: wjcGrid.CellRange[];
                self._copiedSheet = self.selectedSheet;
                if (self._isMultipleRowsSelected()) {
                    selections = self.selectedSheet.selectionRanges.slice(0);
                    selections.sort(self._sortByRow);
                    self._copiedRanges = selections;
                } else if (self._isMultipleColumnsSelected()) {
                    selections = self.selectedSheet.selectionRanges.slice(0);
                    selections.sort(self._sortByColumn);
                    self._copiedRanges = selections;
                } else {
                    self._copiedRanges = [args.range];
                }
            });

            // If the rows\columns of FlexSheet were cleared, we should reset merged cells, styled cells and selection of current sheet to null. (TFS 140344)
            self.rows.collectionChanged.addHandler((sender: any, e: wjcCore.NotifyCollectionChangedEventArgs) => {
                self._clearForEmptySheet('rows');
            }, self);
            self.columns.collectionChanged.addHandler((sender: any, e: wjcCore.NotifyCollectionChangedEventArgs) => {
                self._clearForEmptySheet('columns');
            }, self);

            // Validate the inserted and updated defined name item.
            self.definedNames.collectionChanged.addHandler((sender: any, e: wjcCore.NotifyCollectionChangedEventArgs) => {
                if (e.action === wjcCore.NotifyCollectionChangedAction.Add || e.action === wjcCore.NotifyCollectionChangedAction.Change) {
                    if (!(e.item && e.item.name && e.item.value != null)) {
                        self.definedNames.remove(e.item);
                        throw 'Invalidate defined name was ' + (e.action === wjcCore.NotifyCollectionChangedAction.Add ? 'inserted.' : 'updated.');
                    }
                    if (e.item.sheetName != null && !self._validateSheetName(e.item.sheetName)) {
                        self.definedNames.remove(e.item);
                        throw 'The sheet name:(' + e.item.sheetName + ') does not exist in FlexSheet.';
                    }
                }
            });

            self.addEventListener(self.hostElement, 'mousedown', (e: MouseEvent) => {
                document.addEventListener('mouseup', mouseUp);
                // Only when the target is the child of the root container of the FlexSheet control, 
                // it will deal with the mouse down event handler of the FlexSheet control. (TFS 152995)
                if (self._isDescendant(self._divContainer, e.target)) {
                    self._mouseDown(e);
                }
            }, true);

            self.addEventListener(self.hostElement, 'drop', () => {
                self._columnHeaderClicked = false;
            });

            self.addEventListener(self.hostElement, 'contextmenu', (e: MouseEvent) => {
                var ht: wjcGrid.HitTestInfo,
                    selectedRow: wjcGrid.Row,
                    selectedCol: wjcGrid.Column,
                    colPos: number,
                    rowPos: number,
                    point: wjcCore.Point,
                    hostOffset: wjcCore.Point,
                    hostScrollOffset: wjcCore.Point,
                    newSelection: wjcGrid.CellRange;

                if (e.defaultPrevented) {
                    return;
                }

                if (!self.activeEditor) {
                    // Handle the hitTest for the keyboard context menu event in IE
                    // Since it can't get the correct position for the keyboard context menu event in IE (TFS 122943)
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
                    } else {
                        ht = self.hitTest(e);
                    }
                    e.preventDefault();
                    if (ht && ht.cellType !== wjcGrid.CellType.None) {
                        // Disable add\remove rows\columns for bound sheet.
                        if (!this.itemsSource) {
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

            self.cellEditEnded.addHandler((sender: wjcGrid.FlexGrid, args: wjcGrid.CellEditEndingEventArgs) => {
                if (args.data && (args.data.keyCode === 46 || args.data.keyCode === 8)) {
                    return;
                }
                setTimeout(() => {
                    self.hideFunctionList();
                }, 200);
			});

            self.cellEditEnding.addHandler((sender: wjcGrid.FlexGrid, args: wjcGrid.CellEditEndingEventArgs) => {
                if (args.data && (args.data.keyCode === 46 || args.data.keyCode === 8)) {
                    return;
                }
                self._clearCalcEngine();
            });

            self.pasted.addHandler(() => {
                self._clearCalcEngine();
            });

            self.addEventListener(self.hostElement, 'keydown', (e: KeyboardEvent) => {
                var args: wjcGrid.CellRangeEventArgs,
                    text: string,
                    selectionCnt: number;

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

                    // Processing for 'Cut' operation. (TFS 191694)
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

                // When press 'Esc' key, we should hide the context menu (TFS 122527)
                if (e.keyCode === wjcCore.Key.Escape) {
                    self._contextMenu.hide();
                }

                // Mark the context menu shortcut key pressed.
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

            self.addEventListener(document.body, 'keydown', (e: KeyboardEvent) => {
                if ((self._isDescendant(self.hostElement, e.target) || self.hostElement === e.target) && !self._edtHdl.activeEditor) {
                    // Delete cell content when user presses Delete or Back keys
                    // (Mac keyboards don't have a Delete key, so honor Back here as well)
                    if (e.keyCode === wjcCore.Key.Delete || e.keyCode === wjcCore.Key.Back) {
                        self._delSeletionContent(e);
                        e.preventDefault();
                    }
                }
            }, true);

            document.body.addEventListener('click', self._clickHdl);

            document.addEventListener('mousemove', self._mouseMoveHdl);

            // Show/hide the customize context menu for iPad or iPhone 
            if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
                document.body.addEventListener('touchstart', self._touchStartHdl);
                document.body.addEventListener('touchend', self._touchEndHdl);
            }

            // After dropping in flexsheet, the flexsheet._htDown should be reset to null. (TFS #142369)
            self.addEventListener(self.hostElement, 'drop', () => {
                self._htDown = null;
            });
        }

        // initialize the function autocomplete list
        private _initFuncsList() {
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
            self.addEventListener(self._functionListHost, 'keydown', (e: KeyboardEvent) => {
                // When press 'Esc' key in the host element of the function list,
                // the function list should be hidden and make the host element of the flexsheet get focus. (TFS 142370)
                if (e.keyCode === wjcCore.Key.Escape) {
                    self.hideFunctionList();
                    self.hostElement.focus();
                    e.preventDefault();
                }
                // When press 'Enter' key in the host element of the function list,
                // the selected function of the function should be applied to the selected cell
                // and make the host element of the flexsheet get focus.
                if (e.keyCode === wjcCore.Key.Enter) {
                    self.applyFunctionToCell();
                    self.hostElement.focus();
                    e.preventDefault();
                }
            });
        }

        // Organize the functions data the function list box
        private _getFunctions(): string[]{
            var functions = [],
                i = 0,
                func: any;

            for (; i < FlexSheetFunctions.length; i++) {
                func = FlexSheetFunctions[i];
                functions.push({
                    displayValue: '<div class="wj-flexsheet-formula-name">' + func.name + '</div><div class="wj-flexsheet-formula-description">' + func.description + '</div>',
                    actualvalue: func.name
                });
            }

            return functions;
        }

        // Add the description of the custom function in flexsheet.
        private _addCustomFunctionDescription(name: string, description: string) {
            var customFuncDesc = {
                    displayValue: '<div class="wj-flexsheet-formula-name">' + name + '</div>' + (description ? '<div class="wj-flexsheet-formula-description">' + description + '</div>' : ''),
                    actualvalue: name
                },
                funcList = this._functionList.itemsSource,
                funcIndex = -1,
                i = 0,
                funcDesc: any;

            for (; i < funcList.length; i++) {
                funcDesc = funcList[i];
                if (funcDesc.actualvalue === name) {
                    funcIndex = i;
                    break;
                }
            }

            if (funcIndex > -1) {
                funcList.splice(funcIndex, 1, customFuncDesc)
            } else {
                funcList.push(customFuncDesc);
            }
        }

        // Get current processing formula index.
        private _getCurrentFormulaIndex(searchText: string): number {
            var searchIndex = -1;

            ['+', '-', '*', '/', '^', '(', '&'].forEach((val) => {
                var index = searchText.lastIndexOf(val);

                if (index > searchIndex) {
                    searchIndex = index;
                }
            });

            return searchIndex;
        }

        // Prepare cell for edit event handler.
        // This event handler will attach keydown, keyup and blur event handler for the edit cell.
        private _prepareCellForEditHandler() {
            var self = this,
                edt = self._edtHdl._edt;

            if (!edt) {
                return;
            }
            // bind keydown event handler for the edit cell.
            self.addEventListener(edt, 'keydown', (e: KeyboardEvent) => {
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
            // bind the keyup event handler for the edit cell.
            self.addEventListener(edt, 'keyup', (e: KeyboardEvent) => {
                if ((e.keyCode > 40 || e.keyCode < 32) && e.keyCode !== wjcCore.Key.Tab && e.keyCode !== wjcCore.Key.Escape) {
                    setTimeout(() => {
                        self.showFunctionList(edt);
                    }, 0);
                }
            });
        }

        // Add new sheet into the flexsheet.
        private _addSheet(sheetName?: string, rows?: number, cols?: number, pos?: number, grid?: wjcGrid.FlexGrid): Sheet {
            var self = this,
                sheet = new Sheet(self, grid, sheetName, rows, cols);

            if (!self.sheets.isValidSheetName(sheet)) {
                sheet._setValidName(self.sheets.getValidSheetName(sheet));
            }

            sheet.nameChanged.addHandler((sender: any, e: wjcCore.PropertyChangedEventArgs) => {
                self._updateDefinedNameWithSheetRefUpdating(e.oldValue, e.newValue);
            });
            
            if (typeof (pos) === 'number') {
                if (pos < 0) {
                    pos = 0;
                }
                if (pos >= self.sheets.length) {
                    pos = self.sheets.length;
                }
            } else {
                pos = self.sheets.length;
            }
            self.sheets.insert(pos, sheet);

            // If the new sheet is added before current selected sheet, we should adjust the index of current selected sheet. (TFS 143291)
            if (pos <= self._selectedSheetIndex) {
                self._selectedSheetIndex += 1;
            }
            self.selectedSheetIndex = pos;

            return sheet;
        }

        // Show specific sheet in the FlexSheet.
        private _showSheet(index: number) {
            var oldSheet: Sheet,
                newSheet: Sheet;

            if (!this.sheets || !this.sheets.length || index >= this.sheets.length
                || index < 0 || index === this.selectedSheetIndex
                || (this.sheets[index] && !this.sheets[index].visible)) {
                return;
            }

            // finish any pending edits in the old sheet data.
            this.finishEditing();

            // save the old sheet data
            if (this.selectedSheetIndex > -1 && this.selectedSheetIndex < this.sheets.length) {
                this._copyTo(this.sheets[this.selectedSheetIndex]);

                this._resetFilterDefinition();
            }

            // show the new sheet data
            if (this.sheets[index]) {
                this._selectedSheetIndex = index;
                this._copyFrom(this.sheets[index]);
            }

            this._filter.closeEditor();
        }

        // Current sheet changed event handler.
        private _selectedSheetChange(sender: any, e: wjcCore.PropertyChangedEventArgs) {
            this._showSheet(e.newValue);
            this.invalidate(true);

            this.onSelectedSheetChanged(e);
        }

        // SheetCollection changed event handler.
        private _sourceChange(sender: any, e: wjcCore.NotifyCollectionChangedEventArgs) {
            var item: Sheet;

            if (e.action === wjcCore.NotifyCollectionChangedAction.Add || e.action === wjcCore.NotifyCollectionChangedAction.Change) {
                item = <Sheet>e.item;
                item._attachOwner(this);
                if (e.action === wjcCore.NotifyCollectionChangedAction.Add) {
                    this._addingSheet = true;
                    if (e.index <= this.selectedSheetIndex) {
                        this._selectedSheetIndex += 1;
                    }
                } else {
                    if (e.index === this.selectedSheetIndex) {
                        this._copyFrom(e.item, true);
                    }
                }
                this.selectedSheetIndex = e.index;
            } else if (e.action === wjcCore.NotifyCollectionChangedAction.Reset) {
                for (var i = 0; i < this.sheets.length; i++) {
                    item = <Sheet>this.sheets[i];
                    item._attachOwner(this);
                }
                if (this.sheets.length > 0) {
                    if (this.selectedSheetIndex === 0) {
                        this._copyFrom(this.selectedSheet, true);
                    }
                    this.selectedSheetIndex = 0;
                } else {
                    this.rows.clear();
                    this.columns.clear();
                    this._selectedSheetIndex = -1;
                }
            } else {
                if (this.sheets.length > 0) {
                    if (this.selectedSheetIndex >= this.sheets.length) {
                        this.selectedSheetIndex = 0;
                    } else if (this.selectedSheetIndex > e.index) {
                        this._selectedSheetIndex -= 1;
                    }
                } else {
                    this.rows.clear();
                    this.columns.clear();
                    this._selectedSheetIndex = -1;
                }
            }
            this.invalidate(true);
        }

        // Sheet visible changed event handler.
        private _sheetVisibleChange(sender: any, e: wjcCore.NotifyCollectionChangedEventArgs) {
            if (!e.item.visible) {
                if (e.index === this.selectedSheetIndex) {
                    if (this.selectedSheetIndex === this.sheets.length - 1) {
                        this.selectedSheetIndex = e.index - 1;
                    } else {
                        this.selectedSheetIndex = e.index + 1;
                    }
                }
            }
        }

        // apply the styles for the selected cells.
        private _applyStyleForCell(rowIndex: number, colIndex: number, cellStyle: ICellStyle) {
            var self = this,
                row = <wjcGrid.Row>self.rows[rowIndex],
                currentCellStyle: ICellStyle,
                mergeRange: wjcGrid.CellRange,
                cellIndex: number;

            // Will ignore the cells in the HeaderRow. 
            if (row == null || row instanceof HeaderRow || !row.isVisible) {
                return;
            }

            cellIndex = rowIndex * self.columns.length + colIndex;

            // Handle the merged range style.
            mergeRange = <wjcGrid.CellRange>self.selectedSheet._mergedRanges[cellIndex];
            if (mergeRange) {
                cellIndex = mergeRange.topRow * self.columns.length + mergeRange.leftCol;
            }

            currentCellStyle = self.selectedSheet._styledCells[cellIndex];
            // Add new cell style for the cell.
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
                }
            } else {
                // Update the cell style.
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
        }

        // Check the format states for the cells of the selection.
        private _checkCellFormat(rowIndex: number, colIndex: number, formatState: IFormatState) {
            //return;
            var cellIndex = rowIndex * this.columns.length + colIndex,
                mergeRange: wjcGrid.CellRange,
                cellStyle: ICellStyle;

            if (!this.selectedSheet) {
                return;
            }

            mergeRange = <wjcGrid.CellRange>this.selectedSheet._mergedRanges[cellIndex];
            if (mergeRange) {
                formatState.isMergedCell = true;
                cellIndex = mergeRange.topRow * this.columns.length + mergeRange.leftCol;
            }
            cellStyle = <ICellStyle>this.selectedSheet._styledCells[cellIndex];

            // get the format states for the cells of the selection.
            if (cellStyle) {
                formatState.isBold = formatState.isBold || cellStyle.fontWeight === 'bold';
                formatState.isItalic = formatState.isItalic || cellStyle.fontStyle === 'italic';
                formatState.isUnderline = formatState.isUnderline || cellStyle.textDecoration === 'underline';
            }

            // get text align state for the selected cells.
            if (rowIndex === this.selection.row && colIndex === this.selection.col) {
                if (cellStyle && cellStyle.textAlign) {
                    formatState.textAlign = cellStyle.textAlign
                } else if (colIndex > -1) {
                    formatState.textAlign = (<wjcGrid.Column>this.columns[colIndex]).getAlignment() || formatState.textAlign;
                }
            }
        }

        // Reset the merged range.
        private _resetMergedRange(range: wjcGrid.CellRange): boolean {
            var rowIndex: number,
                colIndex: number,
                cellIndex: number,
                mergeRowIndex: number,
                mergeColIndex: number,
                mergeCellIndex: number,
                mergedCell: wjcGrid.CellRange,
                mergedCellExists = false;

            for (rowIndex = range.topRow; rowIndex <= range.bottomRow; rowIndex++) {
                for (colIndex = range.leftCol; colIndex <= range.rightCol; colIndex++) {
                    cellIndex = rowIndex * this.columns.length + colIndex;

                    mergedCell = this.selectedSheet._mergedRanges[cellIndex];
                    // Reset the merged state of each cell inside current merged range.
                    if (mergedCell) {
                        mergedCellExists = true;

                        for (mergeRowIndex = mergedCell.topRow; mergeRowIndex <= mergedCell.bottomRow; mergeRowIndex++) {
                            for (mergeColIndex = mergedCell.leftCol; mergeColIndex <= mergedCell.rightCol; mergeColIndex++) {
                                mergeCellIndex = mergeRowIndex * this.columns.length + mergeColIndex; {
                                    delete this.selectedSheet._mergedRanges[mergeCellIndex];
                                }
                            }
                        }
                    }
                }
            }

            return mergedCellExists;
        }

        // update the styledCells hash and mergedRange hash for add\delete rows.
        private _updateCellsForUpdatingRow(originalRowCount: number, index: number, count: number, isDelete?: boolean) {
            //return;
            var startIndex: number,
                cellIndex: number,
                newCellIndex: number,
                cellStyle: ICellStyle,
                mergeRange: wjcGrid.CellRange,
                updatedMergeCell = {},
                originalCellCount = originalRowCount * this.columns.length;

            // update for deleting rows.
            if (isDelete) {
                startIndex = index * this.columns.length;
                for (cellIndex = startIndex; cellIndex < originalCellCount; cellIndex++) {
                    newCellIndex = cellIndex - count * this.columns.length;

                    // Update the styledCells hash
                    cellStyle = this.selectedSheet._styledCells[cellIndex];
                    if (cellStyle) {
                        // if the cell is behind the delete cell range, we should update the cell index for the cell to store the style.
                        // if the cell is inside the delete cell range, it need be deleted directly.
                        if (cellIndex >= (index + count) * this.columns.length) {
                            this.selectedSheet._styledCells[newCellIndex] = cellStyle;
                        }
                        delete this.selectedSheet._styledCells[cellIndex];
                    }

                    // Update the mergedRange hash
                    mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                    if (mergeRange) {
                        if (index <= mergeRange.topRow && index + count > mergeRange.bottomRow) {
                            // if the delete rows contain the merge cell range
                            // we will delete the merge cell range directly.
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        } else if (mergeRange.bottomRow < index || mergeRange.topRow >= index + count) {
                            // Update the merge range when the deleted row is outside current merge cell range.
                            if (mergeRange.topRow > index) {
                                mergeRange.row -= count;
                            }
                            mergeRange.row2 -= count;
                            this.selectedSheet._mergedRanges[newCellIndex] = mergeRange;
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        } else {
                            // Update the merge range when the deleted rows intersect with current merge cell range.
                            this._updateCellMergeRangeForRow(mergeRange, index, count, updatedMergeCell, true);
                        } 
                    }
                }
            } else {
                // Update for adding rows.
                startIndex = index * this.columns.length - 1;
                for (cellIndex = originalCellCount - 1; cellIndex > startIndex; cellIndex--) {
                    newCellIndex = cellIndex + this.columns.length * count;

                    // Update the styledCells hash
                    cellStyle = this.selectedSheet._styledCells[cellIndex];
                    if (cellStyle) {
                        this.selectedSheet._styledCells[newCellIndex] = cellStyle;
                        delete this.selectedSheet._styledCells[cellIndex];
                    }

                    // Update the mergedRange hash
                    mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                    if (mergeRange) {
                        if (mergeRange.topRow < index && mergeRange.bottomRow >= index) {
                            // Update the merge range when the added row is inside current merge cell range.
                            this._updateCellMergeRangeForRow(mergeRange, index, count, updatedMergeCell);
                        } else {
                            // Update the merge range when the added row is outside current merge cell range.
                            mergeRange.row += count;
                            mergeRange.row2 += count;
                            this.selectedSheet._mergedRanges[newCellIndex] = mergeRange;
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        }
                    }
                }
            }

            Object.keys(updatedMergeCell).forEach((key) => {
                this.selectedSheet._mergedRanges[key] = updatedMergeCell[key];
            });
        }

        // Update the merge cell range when the add\delete rows intersect with current merge cell range.
        private _updateCellMergeRangeForRow(currentRange: wjcGrid.CellRange, index: number, count: number, updatedMergeCell: any, isDelete?: boolean) {
            //return;
            var rowIndex: number,
                columnIndex: number,
                cellIndex: number,
                newCellIndex: number,
                i: number,
                mergeRange: wjcGrid.CellRange,
                cloneRange: wjcGrid.CellRange;

            if (isDelete) {
                // Update the merge cell range for deleting rows.
                for (rowIndex = currentRange.topRow; rowIndex <= currentRange.bottomRow; rowIndex++) {
                    for (columnIndex = currentRange.leftCol; columnIndex <= currentRange.rightCol; columnIndex++) {
                        cellIndex = rowIndex * this.columns.length + columnIndex;
                        newCellIndex = cellIndex - count * this.columns.length;
                        mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                        if (mergeRange) {
                            cloneRange = mergeRange.clone();
                            // when the first delete row is above the merge cell range
                            // we should adjust the topRow of the merge cell rang via the first delete row.
                            if (cloneRange.row > index) {
                                cloneRange.row -= cloneRange.row - index;
                            } 
                            // when the last delete row is behind the merge cell range.
                            // we should adjust the bottomRow of the merge cell rang via the first delete row.
                            if (cloneRange.row2 < index + count - 1) {
                                cloneRange.row2 -= cloneRange.row2 - index + 1;
                            } else {
                                cloneRange.row2 -= count;
                            }

                            if (rowIndex < index) {
                                updatedMergeCell[cellIndex] = cloneRange;
                            } else {
                                if (rowIndex >= index + count) {
                                    updatedMergeCell[newCellIndex] = cloneRange;
                                }
                                delete this.selectedSheet._mergedRanges[cellIndex];
                            }
                        }
                    }
                }
            } else {
                // Update the merge cell range for adding row.
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
        }

        // update styledCells hash and mergedRange hash for add\delete columns.
        private _updateCellsForUpdatingColumn(originalColumnCount: number, index: number, count: number, isDelete?: boolean) {
            var cellIndex: number,
                newCellIndex: number,
                cellStyle: ICellStyle,
                rowIndex: number,
                columnIndex: number,
                mergeRange: wjcGrid.CellRange,
                updatedMergeCell = {},
                originalCellCount = this.rows.length * originalColumnCount;

            // Update for deleting columns.
            if (isDelete) {
                for (cellIndex = index; cellIndex < originalCellCount; cellIndex++) {
                    rowIndex = Math.floor(cellIndex / originalColumnCount);
                    columnIndex = cellIndex % originalColumnCount;
                    newCellIndex = cellIndex - (count * (rowIndex + (columnIndex >= index ? 1 : 0)));

                    // Update the styledCells hash
                    cellStyle = this.selectedSheet._styledCells[cellIndex];
                    if (cellStyle) {
                        // if the cell is outside the delete cell range, we should update the cell index for the cell to store the style.
                        // otherwise it need be deleted directly.
                        if (columnIndex < index || columnIndex >= index + count) {
                            this.selectedSheet._styledCells[newCellIndex] = cellStyle;
                        }
                        delete this.selectedSheet._styledCells[cellIndex];
                    }

                    // Update the mergedRange hash
                    mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                    if (mergeRange) {
                        if (index <= mergeRange.leftCol && index + count > mergeRange.rightCol) {
                            // if the delete columns contain the merge cell range
                            // we will delete the merge cell range directly.
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        } else if (mergeRange.rightCol < index || mergeRange.leftCol >= index + count) {
                            // Update the merge range when the deleted column is outside current merge cell range.
                            if (mergeRange.leftCol >= index) {
                                mergeRange.col -= count;
                                mergeRange.col2 -= count;
                            }
                            this.selectedSheet._mergedRanges[newCellIndex] = mergeRange;
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        } else {
                            // Update the merge range when the deleted columns intersect with current merge cell range.
                            this._updateCellMergeRangeForColumn(mergeRange, index, count, originalColumnCount,  updatedMergeCell, true);
                        } 
                    }
                }
            } else {
                // Update for adding columns.
                for (cellIndex = originalCellCount - 1; cellIndex >= index; cellIndex--) {
                    rowIndex = Math.floor(cellIndex / originalColumnCount);
                    columnIndex = cellIndex % originalColumnCount;
                    newCellIndex = cellIndex + rowIndex * count + (columnIndex >= index ? 1 : 0);

                    // Update the styledCells hash
                    cellStyle = this.selectedSheet._styledCells[cellIndex];
                    if (cellStyle) {
                        this.selectedSheet._styledCells[newCellIndex] = cellStyle;
                        delete this.selectedSheet._styledCells[cellIndex];
                    }

                    // Update the mergedRange hash
                    mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                    if (mergeRange) {
                        if (mergeRange.leftCol < index && mergeRange.rightCol >= index) {
                            // Update the merge range when the added column is inside current merge cell range.
                            this._updateCellMergeRangeForColumn(mergeRange, index, count, originalColumnCount, updatedMergeCell);
                        } else {
                            // Update the merge range when the added column is outside current merge cell range.
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

            Object.keys(updatedMergeCell).forEach((key) => {
                this.selectedSheet._mergedRanges[key] = updatedMergeCell[key];
            });
        }

        // Update the merge cell range when the add\delete columns intersect with current merge cell range.
        private _updateCellMergeRangeForColumn(currentRange: wjcGrid.CellRange, index: number, count: number, originalColumnCount: number, updatedMergeCell: any, isDelete?: boolean) {
            var rowIndex: number,
                columnIndex: number,
                cellIndex: number,
                newCellIndex: number,
                i: number,
                mergeRange: wjcGrid.CellRange,
                cloneRange: wjcGrid.CellRange;

            if (isDelete) {
                // Update the merge cell range for deleting columns.
                for (rowIndex = currentRange.topRow; rowIndex <= currentRange.bottomRow; rowIndex++) {
                    for (columnIndex = currentRange.leftCol; columnIndex <= currentRange.rightCol; columnIndex++) {
                        cellIndex = rowIndex * originalColumnCount + columnIndex;
                        newCellIndex = cellIndex - (count * (rowIndex + (columnIndex >= index ? 1 : 0)));
                        mergeRange = this.selectedSheet._mergedRanges[cellIndex];
                        if (mergeRange) {
                            cloneRange = mergeRange.clone();
                            // when the first delete column is before with merge cell range
                            // we should adjust the leftCol of the merge cell rang via the first delete column.
                            if (cloneRange.col > index) {
                                cloneRange.col -= cloneRange.col - index;
                            }
                            // when the last delete row is behind the merge cell range.
                            // we should adjust the bottomRow of the merge cell rang via the first delete row.
                            if (cloneRange.col2 < index + count - 1) {
                                cloneRange.col2 -= cloneRange.col2 - index + 1;
                            } else {
                                cloneRange.col2 -= count;
                            }

                            if (columnIndex < index || columnIndex >= index + count) {
                                updatedMergeCell[newCellIndex] = cloneRange;
                            } 
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        }
                    }
                }
            } else {
                // Update the merge cell range for adding column.
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
                            } else {
                                updatedMergeCell[newCellIndex] = cloneRange;
                            }
                            delete this.selectedSheet._mergedRanges[cellIndex];
                        }
                    }
                }
            }
        }

        // Clone the mergedRange of the Flexsheet
        _cloneMergedCells(): any {
            var copy: any,
                mergedRanges: any;

            if (!this.selectedSheet) {
                return null;
            }
            mergedRanges = this.selectedSheet._mergedRanges
            // Handle the 3 simple types, and null or undefined
            if (null == mergedRanges || "object" !== typeof mergedRanges) return mergedRanges;

            // Handle Object
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
        }

        // Evaluate specified formula for flexsheet.
        private _evaluate(formula: string, format?: string, sheet?: Sheet, rowIndex?: number, columnIndex?: number): any {
            if (formula && formula.length > 1) {
                formula = formula[0] === '=' ? formula : '=' + formula;

                return this._calcEngine.evaluate(formula, format, sheet, rowIndex, columnIndex);
            }

            return formula;
        }

        // Copy the current flex sheet to the flexgrid of current sheet.
        _copyTo(sheet: Sheet) {
            var self = this,
                originAutoGenerateColumns = sheet.grid.autoGenerateColumns,
                colIndex: number,
                rowIndex: number,
                i: number;

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
            } else {
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

            setTimeout(() => {
                self._setFlexSheetToDirty();
                self.refresh(true);
            }, 10);
        }

        // Copy the flexgrid of current sheet to flexsheet.
        _copyFrom(sheet: Sheet, needRefresh: boolean = true) {
            var self = this,
                originAutoGenerateColumns = self.autoGenerateColumns,
                colIndex: number,
                rowIndex: number,
                i: number,
                rowSetting: any,
                column: wjcGrid.Column,
                row: wjcGrid.Row;

            self._isCopying = true;

            self._dragable = false;
            self.itemsSource = null;
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
            } else {
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
                self.collectionView.collectionChanged.addHandler((sender: any, e: wjcCore.NotifyCollectionChangedEventArgs) => {
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
                            (<wjcGrid.GroupRow>row).isCollapsed = rowSetting.isCollapsed;
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
                self._toRefresh = setTimeout(() => {
                    self._setFlexSheetToDirty();
                    self.invalidate();
                }, 10);
                self._addingSheet = false;
            } else if (needRefresh) {
                self.refresh();
            }

            self.scrollPosition = sheet._scrollPosition;
        }

        // Reset the _mappedColumns hash for the flexgrid. 
        private _resetMappedColumns(flex: wjcGrid.FlexGrid) {
            var col: wjcGrid.Column,
                sds: wjcCore.ObservableArray,
                i = 0;

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
        }

        // reset the filter definition for the flexsheet.
        private _resetFilterDefinition() {
            this._resettingFilter = true;
            this._filter.filterDefinition = JSON.stringify({
                defaultFilterType: wjcGridFilter.FilterType.Both,
                filters: []
            });
            this._resettingFilter = false;
        }

        // Load the workbook instance to the flexsheet
        private _loadFromWorkbook(workbook: wjcXlsx.Workbook) {
            var sheetCount: number,
                defiendName: wjcXlsx.DefinedName,
                sheetIndex = 0,
                self = this;

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
            } else {
                self.selectedSheetIndex = 0;
            }
            if (workbook.definedNames && workbook.definedNames.length > 0) {
                for (var i = 0; i < workbook.definedNames.length; i++) {
                    defiendName = workbook.definedNames[i];
                    self.definedNames.push({
                        name: defiendName.name,
                        value: defiendName.value,
                        sheetName: defiendName.sheetName
                    });
                }
            }
            self.onLoaded();
        }

        // Save the flexsheet to the workbook instance.
        private _saveToWorkbook(): wjcXlsx.Workbook {
            var mainBook: wjcXlsx.Workbook,
                tmpBook: wjcXlsx.Workbook,
                definedName: wjcXlsx.DefinedName,
                item: any,
                currentSheet: Sheet,
                sheetIndex: number;

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
            for (var i = 0; i < this.definedNames.length; i++){
                var item = this.definedNames[i];
                definedName = new wjcXlsx.DefinedName();
                definedName.name = item.name;
                definedName.value = item.value;
                definedName.sheetName = item.sheetName;
                mainBook.definedNames.push(definedName);
            }

            return mainBook;
        }

        // mouseDown event handler.
        // This event handler for handling selecting columns
        private _mouseDown(e: MouseEvent) {
            var userAgent = window.navigator.userAgent,
                ht = this.hitTest(e),
                cols = this.columns,
                currentRange: wjcGrid.CellRange,
                colIndex: number,
                selected: boolean,
                newSelection: wjcGrid.CellRange,
                edt: HTMLInputElement;

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
                this._isClicking = true;
            }

            if (this.selectionMode === wjcGrid.SelectionMode.CellRange) {
                if (e.ctrlKey) {
                    if (!this._enableMulSel) {
                        this._enableMulSel = true;
                    }
                } else {
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
            } else {
                this._enableMulSel = false;
                if (this.selectedSheet) {
                    this.selectedSheet.selectionRanges.clear();
                }
            }

            this._htDown = ht;

            // If there is no rows or columns in the flexsheet, we don't need deal with anything in the mouse down event(TFS 122628)
            if (this.rows.length === 0 || this.columns.length === 0) {
                return;
            }

            if (!userAgent.match(/iPad/i) && !userAgent.match(/iPhone/i)) {
                this._contextMenu.hide();
            }

            if (this.selectionMode !== wjcGrid.SelectionMode.CellRange) {
                return;
            }

            // When right click the row header, we should select current row. (TFS 121167)
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

            if (!wjcCore.hasClass(<HTMLElement>e.target, 'wj-cell') || ht.edgeRight) {
                return;
            }

            this._columnHeaderClicked = true;
            this._wholeColumnsSelected = true;

            if (e.shiftKey) {
                this._multiSelectColumns(ht);
            } else {
                currentRange = new wjcGrid.CellRange(this.itemsSource ? 1 : 0, ht.col, this.rows.length - 1, ht.col);
                if (e.which === 3 && this.selection.contains(currentRange)) {
                    return;
                }
                this.select(currentRange);
            }
        }

        // mouseMove event handler
        // This event handler for handling multiple selecting columns.
        private _mouseMove(e: MouseEvent) {
            var ht = this.hitTest(e),
                selection = this.selection,
                rowCnt = this.rows.length,
                colCnt = this.columns.length,
                cursor = this.hostElement.style.cursor,
                isTopRow: boolean;

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
            } else {
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
                } else if (ht.cellType === wjcGrid.CellType.ColumnHeader) {
                    if (ht.edgeBottom) {
                        if (this._draggingColumn && (ht.col >= selection.leftCol && ht.col <= selection.rightCol)) {
                            cursor = 'move';
                        } else if (this._draggingRow && selection.topRow === 0) {
                            cursor = 'move';
                        }
                    }
                } else if (ht.cellType === wjcGrid.CellType.RowHeader) {
                    if (ht.edgeRight) {
                        if (this._draggingColumn && selection.leftCol === 0) {
                            cursor = 'move';
                        } else if (this._draggingRow && (ht.row >= selection.topRow && ht.row <= selection.bottomRow) && !this._containsGroupRows(selection)) {
                            cursor = 'move';
                        }
                    }
                }

                if (cursor === 'move') {
                    this._dragable = true;
                } else {
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
        }

        // mouseUp event handler.
        // This event handler for resetting the variable for handling multiple select columns
        private _mouseUp(e: MouseEvent) {
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
                } else {
                    this.selectedSheet.selectionRanges.push(this.selection);
                }
                this._enableMulSel = false;
            }

            this._isClicking = false;
            this._columnHeaderClicked = false;
            this._htDown = null;
        }

        // Click event handler.
        private _click() {
            var self = this,
                userAgent = window.navigator.userAgent;

            // When click in the body, we also need hide the context menu.
            if (!userAgent.match(/iPad/i) && !userAgent.match(/iPhone/i)) {
                self._contextMenu.hide();
            }
            setTimeout(() => {
                self.hideFunctionList();
            }, 200);
        }

        // touch start event handler for iOS device
        private _touchStart(e: any) {
            var self = this;

            if (!wjcCore.hasClass(e.target, 'wj-context-menu-item')) {
                self._contextMenu.hide();
            }
            self._longClickTimer = setTimeout(() => {
                var ht: wjcGrid.HitTestInfo;
                ht = self.hitTest(e);

                if (ht && ht.cellType !== wjcGrid.CellType.None && !self.itemsSource) {
                    self._contextMenu.show(undefined, new wjcCore.Point(e.pageX + 10, e.pageY + 10));
                }
            }, 500);
        }

        // touch end event handler for iOS device
        private _touchEnd() {
            clearTimeout(this._longClickTimer);
        }

        // Show the dragging marker while the mouse moving.
        private _showDraggingMarker(e: MouseEvent) {
            var hitInfo = new wjcGrid.HitTestInfo(this.cells, e),
                selection = this.selection,
                colCnt = this.columns.length,
                rowCnt = this.rows.length,
                scrollOffset = this._cumulativeScrollOffset(this.hostElement),
                rootBounds = this['_root'].getBoundingClientRect(),
                rootOffsetX = rootBounds.left + scrollOffset.x,
                rootOffsetY = rootBounds.top + scrollOffset.y,
                hitCellBounds: wjcCore.Rect,
                selectionCnt: number,
                hit: number,
                height: number,
                width: number,
                rootSize: number,
                i: number,
                content: string,
                css: any;

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
                } else {
                    this._dropRange = new wjcGrid.CellRange(0, hit, this.rows.length - 1, hit + selectionCnt - 1);
                }
            } else if (this._draggingRow) {
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
                } else {
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
            }

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
            } else {
                if (rootOffsetY + this['_eCHdr'].offsetHeight !== css.top || rootOffsetX + this['_root'].offsetWidth + 1 < css.left + css.width) {
                    return;
                }
            }

            wjcCore.setCss(this._draggingMarker, css);

            this._draggingTooltip.show(this.hostElement, content, hitCellBounds);
        }

        // Handle dropping rows or columns.
        private _handleDropping(e: MouseEvent) {
            var self = this,
                srcRowIndex: number,
                srcColIndex: number,
                desRowIndex: number,
                desColIndex: number,
                moveCellsAction: _MoveCellsAction;

            if (!self.selectedSheet || !self._draggingCells || !self._dropRange || self._containsMergedCells(self._draggingCells) || self._containsMergedCells(self._dropRange)) {
                return;
            }

            self._clearCalcEngine();
            if ((self._draggingColumn && self._draggingCells.leftCol > self._dropRange.leftCol)
                || (self._draggingRow && self._draggingCells.topRow > self._dropRange.topRow)) {
                // Handle changing the columns or rows position.
                if (e.shiftKey) {
                    if (self._draggingColumn) {
                        desColIndex = self._dropRange.leftCol;
                        for (srcColIndex = self._draggingCells.leftCol; srcColIndex <= self._draggingCells.rightCol; srcColIndex++) {
                            self.columns.moveElement(srcColIndex, desColIndex);
                            desColIndex++;
                        }
                    } else if (self._draggingRow) {
                        desRowIndex = self._dropRange.topRow;
                        for (srcRowIndex = self._draggingCells.topRow; srcRowIndex <= self._draggingCells.bottomRow; srcRowIndex++) {
                            self.rows.moveElement(srcRowIndex, desRowIndex);
                            desRowIndex++;
                        }
                    }
                    self._exchangeCellStyle(true);
                } else {
                    // Handle moving or copying the cell content.
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
            } else if ((self._draggingColumn && self._draggingCells.leftCol < self._dropRange.leftCol)
                || (self._draggingRow && self._draggingCells.topRow < self._dropRange.topRow)) {
                // Handle changing the columns or rows position.
                if (e.shiftKey) {
                    if (self._draggingColumn) {
                        desColIndex = self._dropRange.rightCol;
                        for (srcColIndex = self._draggingCells.rightCol; srcColIndex >= self._draggingCells.leftCol; srcColIndex--) {
                            self.columns.moveElement(srcColIndex, desColIndex);
                            desColIndex--;
                        }
                    } else if (self._draggingRow) {
                        desRowIndex = self._dropRange.bottomRow;
                        for (srcRowIndex = self._draggingCells.bottomRow; srcRowIndex >= self._draggingCells.topRow; srcRowIndex--) {
                            self.rows.moveElement(srcRowIndex, desRowIndex);
                            desRowIndex--;
                        }
                    }
                    self._exchangeCellStyle(false);
                } else {
                    // Handle moving or copying the cell content.
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
            // Ensure that the host element of FlexSheet get focus after dropping. (TFS 142888)
            self.hostElement.focus();
        }

        // Move the content and style of the source cell to the destination cell.
        private _moveCellContent(srcRowIndex: number, srcColIndex: number, desRowIndex: number, desColIndex: number, isCopyContent: boolean) {
            var val = this.getCellData(srcRowIndex, srcColIndex, false),
                srcCellIndex = srcRowIndex * this.columns.length + srcColIndex,
                desCellIndex = desRowIndex * this.columns.length + desColIndex,
                srcCellStyle = this.selectedSheet._styledCells[srcCellIndex];

            this.setCellData(desRowIndex, desColIndex, val);

            // Copy the cell style of the source cell to the destination cell.
            if (srcCellStyle) {
                this.selectedSheet._styledCells[desCellIndex] = JSON.parse(JSON.stringify(srcCellStyle));
            } else {
                delete this.selectedSheet._styledCells[desCellIndex];
            }

            // If we just move the columns or the rows, we need remove the content and styles of the cells in the columns or the rows.
            if (!isCopyContent) {
                this.setCellData(srcRowIndex, srcColIndex, undefined);
                delete this.selectedSheet._styledCells[srcCellIndex];
            }
        }

        // Exchange the cell style for changing the rows or columns position.
        private _exchangeCellStyle(isReverse: boolean) {
            var rowIndex: number,
                colIndex: number,
                cellIndex: number,
                newCellIndex: number,
                draggingRange: number,
                index = 0,
                srcCellStyles = [];

            // Store the style of the source cells and delete the style of the source cells.
            // Since the stored style will be moved to the destination cells.
            for (rowIndex = this._draggingCells.topRow; rowIndex <= this._draggingCells.bottomRow; rowIndex++) {
                for (colIndex = this._draggingCells.leftCol; colIndex <= this._draggingCells.rightCol; colIndex++) {
                    cellIndex = rowIndex * this.columns.length + colIndex;
                    if (this.selectedSheet._styledCells[cellIndex]) {
                        srcCellStyles.push(JSON.parse(JSON.stringify(this.selectedSheet._styledCells[cellIndex])));
                        delete this.selectedSheet._styledCells[cellIndex];
                    } else {
                        srcCellStyles.push(undefined);
                    }
                }
            }

            // Adjust the style of the cells that is between the dragging cells and the drop range.
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
                            } else {
                                delete this.selectedSheet._styledCells[newCellIndex];
                            }
                        }
                    }
                } else if (this._draggingRow) {
                    draggingRange = this._draggingCells.bottomRow - this._draggingCells.topRow + 1;
                    for (rowIndex = this._draggingCells.topRow - 1; rowIndex >= this._dropRange.topRow; rowIndex--) {
                        for (colIndex = 0; colIndex < this.columns.length; colIndex++) {
                            cellIndex = rowIndex * this.columns.length + colIndex;
                            newCellIndex = (rowIndex + draggingRange) * this.columns.length + colIndex;
                            if (this.selectedSheet._styledCells[cellIndex]) {
                                this.selectedSheet._styledCells[newCellIndex] = JSON.parse(JSON.stringify(this.selectedSheet._styledCells[cellIndex]));
                                delete this.selectedSheet._styledCells[cellIndex];
                            } else {
                                delete this.selectedSheet._styledCells[newCellIndex];
                            }
                        }
                    }
                }
            } else {
                if (this._draggingColumn) {
                    draggingRange = this._draggingCells.rightCol - this._draggingCells.leftCol + 1;
                    for (colIndex = this._draggingCells.rightCol + 1; colIndex <= this._dropRange.rightCol; colIndex++) {
                        for (rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
                            cellIndex = rowIndex * this.columns.length + colIndex;
                            newCellIndex = rowIndex * this.columns.length + colIndex - draggingRange;
                            if (this.selectedSheet._styledCells[cellIndex]) {
                                this.selectedSheet._styledCells[newCellIndex] = JSON.parse(JSON.stringify(this.selectedSheet._styledCells[cellIndex]));
                                delete this.selectedSheet._styledCells[cellIndex];
                            } else {
                                delete this.selectedSheet._styledCells[newCellIndex];
                            }
                        }
                    }
                } else if (this._draggingRow) {
                    draggingRange = this._draggingCells.bottomRow - this._draggingCells.topRow + 1;
                    for (rowIndex = this._draggingCells.bottomRow + 1; rowIndex <= this._dropRange.bottomRow; rowIndex++) {
                        for (colIndex = 0; colIndex < this.columns.length; colIndex++) {
                            cellIndex = rowIndex * this.columns.length + colIndex;
                            newCellIndex = (rowIndex - draggingRange) * this.columns.length + colIndex;
                            if (this.selectedSheet._styledCells[cellIndex]) {
                                this.selectedSheet._styledCells[newCellIndex] = JSON.parse(JSON.stringify(this.selectedSheet._styledCells[cellIndex]));
                                delete this.selectedSheet._styledCells[cellIndex];
                            } else {
                                delete this.selectedSheet._styledCells[newCellIndex];
                            }
                        }
                    }
                }
            } 

            // Set the stored the style of the source cells to the destination cells.
            for (rowIndex = this._dropRange.topRow; rowIndex <= this._dropRange.bottomRow; rowIndex++) {
                for (colIndex = this._dropRange.leftCol; colIndex <= this._dropRange.rightCol; colIndex++) {
                    cellIndex = rowIndex * this.columns.length + colIndex;
                    if (srcCellStyles[index]) {
                        this.selectedSheet._styledCells[cellIndex] = srcCellStyles[index];
                    } else {
                        delete this.selectedSheet._styledCells[cellIndex];
                    }

                    index++;
                }
            }
        }

        // Check whether the specific cell range contains merged cells.
        private _containsMergedCells(rng: wjcGrid.CellRange): boolean {
            var rowIndex: number,
                colIndex: number,
                cellIndex: number,
                mergedRange: wjcGrid.CellRange;

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
        }

        // Multiple select columns processing.
        private _multiSelectColumns(ht: wjcGrid.HitTestInfo) {
            var range: wjcGrid.CellRange;

            if (ht && this._columnHeaderClicked) {
                range = new wjcGrid.CellRange(ht.row, ht.col);

                range.row = !!this.selectedSheet.itemsSource ? 1 : 0;
                range.row2 = this.rows.length - 1;
                range.col2 = this.selection.col2;

                this.select(range);
            }
        }

        // Gets the absolute offset for the element.
        private _cumulativeOffset(element): wjcCore.Point {
            var top = 0, left = 0;

            do {
                top += element.offsetTop || 0;
                left += element.offsetLeft || 0;
                element = element.offsetParent;
            } while (element);

            return new wjcCore.Point(left, top);
        }

        // Gets the absolute scroll offset for the element.
        private _cumulativeScrollOffset(element): wjcCore.Point {
            var scrollTop = 0, scrollLeft = 0;

            do {
                scrollTop += element.scrollTop || 0;
                scrollLeft += element.scrollLeft || 0;
                element = element.offsetParent;
            } while (element && !(element instanceof HTMLBodyElement));

            // Chrome and Safari always use document.body.scrollTop, 
            // while IE and Firefox use document.body.scrollTop for quirks mode and document.documentElement.scrollTop for standard mode. 
            // So we need check both the document.body.scrollTop and document.documentElement.scrollTop (TFS 142679)
            scrollTop += document.body.scrollTop || document.documentElement.scrollTop;
            scrollLeft += document.body.scrollLeft || document.documentElement.scrollLeft;

            return new wjcCore.Point(scrollLeft, scrollTop);
        }

        // Check whether current hit is within current selection.
        private _checkHitWithinSelection(ht: wjcGrid.HitTestInfo): boolean {
            var cellIndex: number,
                mergedRange: wjcGrid.CellRange;

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
        }

        // Clear the merged cells, styled cells and selection for the empty sheet.
        private _clearForEmptySheet(rowsOrColumns: string) {
            if (this.selectedSheet && this[rowsOrColumns].length === 0 && this._isCopying !== true && this._isUndoing !== true) {
                this.selectedSheet._mergedRanges = null;
                this.selectedSheet._styledCells = null;
                this.select(new wjcGrid.CellRange());
            }
        }

        // Check whether the specified cell range contains Group Row.
        private _containsGroupRows(cellRange: wjcGrid.CellRange): boolean {
            var rowIndex: number,
                row: wjcGrid.Row;

            for (rowIndex = cellRange.topRow; rowIndex <= cellRange.bottomRow; rowIndex++) {
                row = this.rows[rowIndex];
                if (row instanceof wjcGrid.GroupRow) {
                    return true;
                }
            }
            return false;
        }

        // Delete the content of the selected cells.
        private _delSeletionContent(evt: KeyboardEvent) {
            var selections = this.selectedSheet.selectionRanges,
                selection: wjcGrid.CellRange,
                evtRange: wjcGrid.CellRange,
                index: number,
                colIndex: number,
                rowIndex: number,
                bcol: wjcGrid.Column,
                contentDeleted = false,
                e: wjcGrid.CellEditEndingEventArgs,
                delAction = new _EditAction(this);

            if (this.isReadOnly) {
                return;
            }

            this.beginUpdate();

            for (index = 0; index < selections.length; index++) {
                selection = selections[index];
                evtRange = new wjcGrid.CellRange();
                e = new wjcGrid.CellEditEndingEventArgs(this.cells, evtRange, evt);
                for (rowIndex = selection.topRow; rowIndex <= selection.bottomRow; rowIndex++) {
                    if (this.rows[rowIndex] && !(<wjcGrid.Row>this.rows[rowIndex]).isReadOnly) {
                        for (colIndex = selection.leftCol; colIndex <= selection.rightCol; colIndex++) {
                            bcol = this._getBindingColumn(this.cells, rowIndex, this.columns[colIndex]);
                            if (!bcol.isReadOnly && bcol.isRequired === false || (bcol.isRequired == null && bcol.dataType == wjcCore.DataType.String)) {
                                if (this.getCellData(rowIndex, colIndex, true)) {
                                    evtRange.setRange(rowIndex, colIndex);
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
        }

        // Update the affected formulas for inserting/removing row/columns.
        private _updateAffectedFormula(index: number, count: number, isAdding: boolean, isRow: boolean): any {
            var rowIndex: number,
                colIndex: number,
                newRowIndex: number,
                newColIndex: number,
                cellData: any,
                matches: Array<string>,
                cellRefIndex: number,
                isUpdated: boolean,
                changed: boolean,
                cellRef: string,
                updatedCellRef: string,
                oldFormulas: any[] = [],
                newFormulas: any[] = [],
                cellAddress: wjcXlsx.ITableAddress;

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
                                        } else {
                                            if (cellAddress.row > index - count) {
                                                if (cellAddress.row > index) {
                                                    cellAddress.row -= count;
                                                } else {
                                                    cellAddress.row = index - count + 1;
                                                }
                                                changed = true;
                                            }
                                        }
                                    } else {
                                        if (isAdding) {
                                            if (cellAddress.col >= index) {
                                                cellAddress.col += count;
                                                changed = true;
                                            }
                                        } else {
                                            if (cellAddress.col > index - count) {
                                                if (cellAddress.col > index) {
                                                    cellAddress.col -= count;
                                                } else {
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
                                        } else {
                                            newRowIndex -= count;
                                        }
                                    }
                                } else {
                                    if (colIndex >= index) {
                                        if (isAdding) {
                                            newColIndex += count;
                                        } else {
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
            }
        }

        // Update the column filter for moving the column. 
        _updateColumnFiler(srcColIndex: number, descColIndex: number) {
            var filterDef = JSON.parse(this._filter.filterDefinition);

            for (var i = 0; i < filterDef.filters.length; i++) {
                var filter = filterDef.filters[i];
                if (filter.columnIndex === srcColIndex) {
                    filter.columnIndex = descColIndex;
                    break;
                }
            }

            this._filter.filterDefinition = JSON.stringify(filterDef);
        }

        // Chech the specific element is the child of other element.
        private _isDescendant(paranet, child): boolean {
            var node = child.parentNode;
            while (node != null) {
                if (node === paranet) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        }

        // Clear the expression cache of the CalcEngine.
        _clearCalcEngine() {
            this._calcEngine._clearExpressionCache();
        }

        // Get string of the given cell ranges and sheet.
        private _getRangeString(ranges, sheet: Sheet, isGetCellValue: boolean = true) {
            var clipString = '',
                rowIndex: number,
                selIndex: number,
                firstRow: boolean = true,
                firstCell: boolean,
                sel: wjcGrid.CellRange,
                cell: string,
                rng: wjcGrid.CellRange;

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
                } else if (this._isMultipleColumnsSelected(ranges, sheet)) {
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
                } else {
                    rng = ranges[0];
                    switch (this.selectionMode) {

                        // row modes: expand range to cover all columns
                        case wjcGrid.SelectionMode.Row:
                        case wjcGrid.SelectionMode.RowRange:
                            rng.col = 0;
                            rng.col2 = sheet.grid.columns.length - 1;
                            return this._getRangeString(rng, sheet);

                        // ListBox mode: scan rows and copy selected ones
                        case wjcGrid.SelectionMode.ListBox:
                            rng.col = 0;
                            rng.col2 = sheet.grid.columns.length - 1;
                            for (var i = 0; i < sheet.grid.rows.length; i++) {
                                if (sheet.grid.rows[i].isSelected && sheet.grid.rows[i].isVisible) {
                                    rng.row = rng.row2 = i;
                                    if (clipString) clipString += '\n';
                                    clipString += this._getRangeString(rng, sheet);
                                }
                            }
                            return clipString;
                    }
                }
            }

            // scan rows
            rng = wjcCore.asType(wjcCore.isArray(ranges) ? ranges[0] : ranges, wjcGrid.CellRange);
            for (var r = rng.topRow; r <= rng.bottomRow; r++) {

                // skip invisible, add separator
                if (!(this.rows[r] && this.rows[r].isVisible)) continue;
                if (!firstRow) clipString += '\n';
                firstRow = false;

                // scan cells
                for (var c = rng.leftCol, firstCell = true; c <= rng.rightCol; c++) {

                    // skip invisible, add separator
                    if (!(this.columns[c] && this.columns[c].isVisible)) continue;
                    if (!firstCell) clipString += '\t';
                    firstCell = false;

                    // append cell
                    if (isGetCellValue) {
                        cell = this.getCellValue(r, c, true, sheet).toString();
                    } else {
                        cell = this.getCellData(r, c, true).toString();
                    }
                    
                    cell = cell.replace(/\t/g, ' '); // handle tabs
                    if (cell.indexOf('\n') > -1) {   // handle line breaks
                        cell = '"' + cell.replace(/"/g, '""') + '"';
                    }
                    clipString += cell;
                }
            }

            // done
            return clipString;

        }

        // Check whether the cell ranges contains formula cells.
        private _containsRandFormula(ranges: wjcGrid.CellRange[], sheet: Sheet): boolean {
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
        }

        // Check current selections of the FlexSheet are multiple rows.
        private _isMultipleRowsSelected(ranges?, sheet?: Sheet): boolean {
            var sel: wjcGrid.CellRange,
                selections = ranges || this.selectedSheet.selectionRanges || [this.selection];                

            for (var i = 0; i < selections.length; i++) {
                sel = selections[i];
                if (sheet) {
                    if (sel.leftCol !== 0 || sel.rightCol !== sheet.grid.columns.length - 1) {
                        return false;
                    }
                } else {
                    if (sel.leftCol !== 0 || sel.rightCol !== this.columns.length - 1) {
                        return false;
                    }
                }
            }
            return true;
        }

        // Check current selections of the FlexSheet are multiple columns.
        private _isMultipleColumnsSelected(ranges?, sheet?: Sheet): boolean {
            var sel: wjcGrid.CellRange,
                selections = ranges || this.selectedSheet.selectionRanges || [this.selection];
                
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
                } else {
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
        }

        // Post processing for setting clip string in FlexSheet.
        private _postSetClipStringProcess(cellData: any, row: number, col: number, copiedRow: number, copiedCol: number): boolean {
            var megredCell: wjcGrid.CellRange,
                rowSpan: number,
                colSpan: number,
                e: wjcGrid.CellRangeEventArgs,
                pasted: boolean = false,
                match: string[];


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

            // raise events so user can cancel the paste
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
        }

        // Delete the cut data.
        private _delCutData() {
            var row: number,
                col: number,
                bcol: wjcGrid.Column,
                copySel = this._copiedRanges[0],
                cutSource = this._copiedSheet === this.selectedSheet ? this : this._copiedSheet.grid;

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
        }

        // Check whether the pasted texts contains multi-line text.
        private _containsMultiLineText(lines: string[]): boolean {
            var text: string;
            for (var i = 0; i < lines.length; i++) {
                text = lines[i];
                if (text.indexOf('\n') >= 0) {
                    return true;
                }
            }
            return false;
        }

        // Sort the selections by row.
        private _sortByRow(sel1: wjcGrid.CellRange, sel2: wjcGrid.CellRange): number {
            if (sel1.topRow > sel2.topRow) {
                return 1;
            } else if (sel1.topRow < sel2.topRow) {
                return -1;
            } else {
                return 0;
            }
        }

        // Sort the selections by column.
        private _sortByColumn(sel1: wjcGrid.CellRange, sel2: wjcGrid.CellRange): number {
            if (sel1.leftCol > sel2.leftCol) {
                return 1;
            } else if (sel1.leftCol < sel2.leftCol) {
                return -1;
            } else {
                return 0;
            }
        }

        // Set all the rows and columns to dirty for updating
        _setFlexSheetToDirty() {
            this.columns._dirty = true;
            this.rows._dirty = true;
            this.rowHeaders.columns._dirty = true;
            this.rowHeaders.rows._dirty = true;
            this.columnHeaders.columns._dirty = true;
            this.columnHeaders.rows._dirty = true;
        }

        /**
         * Converts the number value to its corresponding alpha value.
         * For instance: 0, 1, 2...to a, b, c...
         * @param c The number value need to be converted.
         */
        static convertNumberToAlpha(c: number): string {
            var content = '',
                dCount: number,
                pos: number;

            if (c >= 0) {
                do {
                    dCount = Math.floor(c / 26);
                    pos = c % 26;
                    content = String.fromCharCode(pos + 65) + content;
                    c = dCount - 1;
                } while (dCount);
            }

            return content;
        }

        // update the formula of the row after reordering the row.
        _updateFormulaForReorderingRows(srcRow: number, dstRow: number) {
            var distance = dstRow - srcRow,
                cellData: any,
                matches: string[],
                cellRef: string,
                updatedCellRef: string,
                cellAddress: wjcXlsx.ITableAddress,
                updatedRow: number;

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
                                } else if (updatedRow >= this.rows.length) {
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
        }

        // Scan the formulas of current sheet.
        _scanFormulas(): any[] {
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
        }

        // Reset the formulas for current sheet.
        _resetFormulas(formulas: any[]) {
            var self = this;
            if (!formulas) {
                return;
            }
            self.deferUpdate(() => {
                for (var i = 0; i < formulas.length; i++) {
                    var item = formulas[i];
                    self.setCellData(item.row, item.column, item.formula);
                }
            });
        }

        // Get the cell style in selected sheet.
        _getCellStyle(rowIndex: number, colIndex: number, sheet?: Sheet): ICellStyle {
            var sheet = sheet || this.selectedSheet,
                cellIndex: number;
            if (!sheet) {
                return null;
            }    
            cellIndex = rowIndex * sheet.grid.columns.length + colIndex;
            return sheet._styledCells[cellIndex];
        }

        // Validate the sheet name of the defined name item.
        private _validateSheetName(sheetName: string): boolean {
            for (let i = 0; i < this.sheets.length; i++) {
                if (this.sheets[i].name === sheetName) {
                    return true;
                }
            }
            return false;
        }

        // Update the defiend name item with the sheet name changing.
        private _updateDefinedNameWithSheetRefUpdating(oldSheetName: string, newSheetName: string) {
            var definedName: any,
                match: any,
                cellRef: string,
                sheetRef: string;
            for (var i = 0; i < this.definedNames.length; i++) {
                definedName = this.definedNames[i];
                // Update the sheet name of the defined name item.
                if (definedName.sheetName === oldSheetName) {
                    definedName.sheetName = newSheetName;
                }
                // Update the sheet reference of the value of the defined name item.
                match = definedName.value.match(/(\w+)\!\$?[A-Za-z]+\$?\d+/g);
                if (match && match.length > 0) {
                    for (var j = 0; j < match.length; j++) {
                        cellRef = match[j];
                        sheetRef = cellRef.substring(0, cellRef.indexOf('!'));
                        if (sheetRef === oldSheetName) {
                            definedName.value = definedName.value.replace(cellRef, cellRef.replace(oldSheetName, newSheetName));
                        }
                    }
                }
            }
        }
    }

    /**
     * Provides arguments for the @see:FlexSheet.draggingRowColumn event.
     */
    export class DraggingRowColumnEventArgs extends wjcCore.EventArgs {
        private _isDraggingRows: boolean;
        private _isShiftKey: boolean;

        /**
         * Initializes a new instance of the @see:DraggingRowColumnEventArgs class.
         *
         * @param isDraggingRows Indicates whether the dragging event is triggered due to dragging rows or columns.
         * @param isShiftKey Indicates whether the shift key is pressed when dragging.
         */
        constructor(isDraggingRows: boolean, isShiftKey: boolean) {
            super();

            this._isDraggingRows = isDraggingRows;
            this._isShiftKey = isShiftKey;
        }

        /**
         * Gets a value indicating whether the event refers to dragging rows or columns.
         */
        get isDraggingRows(): boolean {
            return this._isDraggingRows;
        }

        /**
         * Gets a value indicating whether the shift key is pressed.
         */
        get isShiftKey(): boolean {
            return this._isShiftKey;
        }
    }

    /**
     * Provides arguments for unknown function events.
     */
    export class UnknownFunctionEventArgs extends wjcCore.EventArgs {
        private _funcName: string;
        private _params: any[];
        /**
         * Gets or sets the result for the unknown funtion.
         */
        value: string;

        /**
         * Initializes a new instance of the @see:UnknownFunctionEventArgs class.
         *
         * @param funcName The name of the unknown function.
         * @param params The parameters' value list of the nuknown function.
         */
        constructor(funcName: string, params: any[]) {
            super();

            this._funcName = funcName;
            this._params = params;
        }

        /**
         * Gets the name of the unknown function.
         */
        get funcName(): string {
            return this._funcName;
        }

        /**
         * Gets the parameters' value list of the nuknown function.
         */
        get params(): any[] {
            return this._params;
        }
    }

    /**
     * Provides arguments for rows or columns changed events.
     */
    export class RowColumnChangedEventArgs extends wjcCore.EventArgs {
        private _index: number;
        private _count: number;
        private _added: boolean;

        /**
         * Initializes a new instance of the @see:UnknownFunctionEventArgs class.
         *
         * @param index The start index of the changed rows or columns.
         * @param count The added or removed count of the rows or columns.
         * @param added The value indicates the event is for adding ot removing rows or columns.
         */
        constructor(index: number, count: number, added: boolean) {
            super();

            this._index = index;
            this._count = count;
            this._added = added;
        }

        /**
         * Gets the start index of the changed rows or columns.
         */
        get index(): number {
            return this._index;
        }

        /**
         * Gets the added or removed count of the rows or columns.
         */
        get count(): number {
            return this._count;
        }
        /**
        * Gets the value indicates the event is for adding ot removing rows or columns.
        */
        get added(): boolean {
            return this._added;
        }

        /*
         * Gets the value indicates the event is for adding ot removing rows or columns.
         */
        get isAdd(): boolean {
            wjcCore._deprecated('RowColumnChangedEventArgs.isAdd', 'RowColumnChangedEventArgs.added');
            return this._added;
        }
    }

    /**
     * Defines the extension of the @see:GridPanel class, which is used by <b>FlexSheet</b> where 
     * the base @see:FlexGrid class uses @see:GridPanel. For example, the <b>cells</b> property returns an instance
     * of this class.
     */
    export class FlexSheetPanel extends wjcGrid.GridPanel {

        /**
         * Initializes a new instance of the @see:FlexSheetPanel class.
         *
         * @param grid The @see:FlexGrid object that owns the panel.
         * @param cellType The type of cell in the panel.
         * @param rows The rows displayed in the panel.
         * @param cols The columns displayed in the panel.
         * @param element The HTMLElement that hosts the cells in the control.
         */
        constructor(grid: wjcGrid.FlexGrid, cellType: wjcGrid.CellType, rows: wjcGrid.RowCollection, cols: wjcGrid.ColumnCollection, element: HTMLElement) {
            super(grid, cellType, rows, cols, element);
        }

        /**
         * Gets a @see:SelectedState value that indicates the selected state of a cell.
         *
         * Overrides this method to support multiple selection showSelectedHeaders for @see:FlexSheet
         *
         * @param r Specifies Row index of the cell.
         * @param c Specifies Column index of the cell.
         * @param rng @see:CellRange that contains the cell that would be included.
         */
        getSelectedState(r: number, c: number, rng: wjcGrid.CellRange): wjcGrid.SelectedState {
            var selections: wjcCore.ObservableArray,
                selectionCnt: number,
                index: number,
                selection: wjcGrid.CellRange,
                selectedState: wjcGrid.SelectedState,
                mergedRange: wjcGrid.CellRange;

            if (!this.grid) {
                return undefined;
            }

            mergedRange = this.grid.getMergedRange(this, r, c);

            selections = (<FlexSheet>this.grid).selectedSheet ? (<FlexSheet>this.grid).selectedSheet.selectionRanges : null;
            selectedState = super.getSelectedState(r, c, rng);
            selectionCnt = selections ? selections.length : 0;

            if (selectedState === wjcGrid.SelectedState.None && selectionCnt > 0 && (<FlexSheet>this.grid)._enableMulSel) {
                for (index = 0; index < selections.length; index++) {
                    selection = selections[index];

                    if (selection && selection instanceof wjcGrid.CellRange) {
                        if (this.cellType === wjcGrid.CellType.Cell) {
                            if (mergedRange) {
                                if (mergedRange.contains(selection.row, selection.col)) {
                                    if (index === selectionCnt - 1 && !(<FlexSheet>this.grid)._isClicking) {
                                        return this.grid.showMarquee ? wjcGrid.SelectedState.None : wjcGrid.SelectedState.Cursor;
                                    }
                                    return wjcGrid.SelectedState.Selected;
                                }
                                if (mergedRange.intersects(selection)) {
                                    return wjcGrid.SelectedState.Selected;
                                }
                            }

                            if (selection.row === r && selection.col === c) {
                                if (index === selectionCnt - 1 && !(<FlexSheet>this.grid)._isClicking) {
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
        }

        /**
         * Gets the value stored in a cell in the panel.
         *
         * @param r The row index of the cell.
         * @param c The index, name, or binding of the column that contains the cell.
         * @param formatted Whether to format the value for display.
         */
        getCellData(r: number, c: any, formatted: boolean): any {
            var value = super.getCellData(r, c, formatted),
                col = <wjcGrid.Column>this.columns[wjcCore.asNumber(c, false, true)],
                bcol = this.grid ? this.grid._getBindingColumn(this, r, col) : col,
                cellStyle: ICellStyle,
                data: any;
                

            if (formatted) {
                data = super.getCellData(r, c, false);
                cellStyle = this.grid ? (<FlexSheet>this.grid)._getCellStyle(r, c) : null;
                if (wjcCore.isNumber(data) && data !== 0 && !!bcol && !bcol.format && !bcol.dataMap && !cellStyle) {
                    value = data;
                }
            } 

            return value;
        }

        /**
         * Sets the content of a cell in the panel.
         *
         * @param r The index of the row that contains the cell.
         * @param c The index, name, or binding of the column that contains the cell.
         * @param value The value to store in the cell.
         * @param coerce A value indicating whether to change the value automatically to match the column's data type.
         * @return Returns true if the value is stored successfully, otherwise false (failed cast).
         */
        setCellData(r: number, c: any, value: any, coerce = true): boolean {
            var parsedDateVal: Date,
                orgVal = this.getCellData(r, c, false);

            if (coerce && value && wjcCore.isString(value)) {
                if (this.grid.columns[c].dataType !== wjcCore.DataType.String && !wjcCore.isNullOrWhiteSpace(value) && !isNaN(+value)) {
                    value = +value;
                } else if (value[0] !== '=') {
                    parsedDateVal = wjcCore.Globalize.parseDate(value, '');
                    if (parsedDateVal) {
                        value = parsedDateVal;
                    }
                }
            }
            // When the cell data is formula, we shall not force to change the data type of the cell data.
            if ((value && wjcCore.isString(value) && value[0] === '=') || orgVal === '') {
                coerce = false;
            }

            return super.setCellData(r, c, value, coerce);
        }

        // renders a cell
        // It overrides the _renderCell method of the parent class GridPanel.
        _renderCell(row: HTMLElement, r: number, c: number, vrng: wjcGrid.CellRange, state: boolean, ctr: number): number {
            var cell = <HTMLElement>row.childNodes[ctr],
                cellStyle: ICellStyle,
                cellIndex = r * this.grid.columns.length + c,
                mr = this.grid.getMergedRange(this, r, c);

            ctr = super._renderCell(row, r, c, vrng, state, ctr);

            if (this.cellType !== wjcGrid.CellType.Cell) {
                return ctr;
            }

            // skip over cells that have been merged over
            if (mr) {
                if (cellIndex > mr.topRow * this.grid.columns.length + mr.leftCol) {
                    return ctr;
                }
            }

            if (wjcCore.hasClass(cell, 'wj-state-selected') || wjcCore.hasClass(cell, 'wj-state-multi-selected')) {
                // If the cell is selected state, we'll remove the custom background color and font color style.
                cell.style.backgroundColor = '';
                cell.style.color = '';
            } else if ((<FlexSheet>this.grid).selectedSheet){
                // If the cell removes selected state, we'll resume the custom background color and font color style.
                cellStyle = (<FlexSheet>this.grid).selectedSheet._styledCells[cellIndex];
                if (cell && cellStyle) {
                    cell.style.backgroundColor = cellStyle.backgroundColor;
                    cell.style.color = cellStyle.color;
                }
            }

            return ctr;
        }
    }

    /**
     * Represents a row used to display column header information for a bound sheet.
     */
    export class HeaderRow extends wjcGrid.Row {
        /**
        * Initializes a new instance of the HeaderRow class. 
        */
        constructor() {
            super();
            this.isReadOnly = true;
        }
    }

    /**
     * Defines the cell styling properties.
     */
    export interface ICellStyle {
        /**
         * The CSS class name to add to a cell.
         */
        className?: string;
        /**
         * The font family.
         */
        fontFamily?: string;
        /**
         * The font size.
         */
        fontSize?: string;
        /**
         * The font style.
         */
        fontStyle?: string;
        /**
         * The font weight.
         */
        fontWeight?: string;
        /**
         * The text decoration.
         */
        textDecoration?: string;
        /**
         * The text alignment.
         */
        textAlign?: string;
        /**
         * The vertical alignment.
         */
        verticalAlign?: string;
        /**
         * The background color.
         */
        backgroundColor?: string;
        /**
         * The font color.
         */
        color?: string;
        /**
         * Format string for formatting the value of the cell.
         */
        format?: string;
        /**
         * Describes how whitespace inside the element is handled.
         */
        whiteSpace?: string;
    }

    /**
     * Defines the format states for the cells.
     */
    export interface IFormatState {
        /**
         * Indicates whether the bold style is applied. 
         */
        isBold?: boolean;
        /**
         * Indicates whether the italic style is applied. 
         */
        isItalic?: boolean;
        /**
         * Indicates whether the underlined style is applied. 
         */
        isUnderline?: boolean;
        /**
         * Gets the applied text alignment.
         */
        textAlign?: string;
        /**
         * Indicate whether the current selection is a merged cell.
         */
        isMergedCell?: boolean;
    }


	'use strict';

	/**
	 * Represents a sheet within the @see:FlexSheet control.
	 */
	export class Sheet {
		private _name: string;
		private _owner: FlexSheet; 
		private _rowCount: number;
		private _columnCount: number;
		private _visible: boolean = true;
		_unboundSortDesc = new wjcCore.ObservableArray();
		private _currentStyledCells: any = {};
		private _currentMergedRanges: any = {};
        private _grid: wjcGrid.FlexGrid;
        private _selectionRanges: wjcCore.ObservableArray;
        private _isEmptyGrid = false;
        _rowSettings = [];
		_filterDefinition: string;
        _scrollPosition: wjcCore.Point = new wjcCore.Point();
        _freezeHiddenRowCnt: number = 0;
        _freezeHiddenColumnCnt: number = 0;

		/**
		 * Initializes a new instance of the @see:FlexSheet class.
		 *
		 * @param owner The owner @see: FlexSheet control.
		 * @param grid The associated @see:FlexGrid control used to store the sheet data. If not specified then the 
         * new <b>FlexGrid</b> control will be created.
		 * @param sheetName The name of the sheet within the @see:FlexSheet control.
		 * @param rows The row count for the sheet.
		 * @param cols The column count for the sheet.
		 */
		constructor(owner?: FlexSheet, grid?: wjcGrid.FlexGrid, sheetName?: string, rows?: number, cols?: number) {
			var self = this,
				insertRows: number,
				insertCols: number,
				i: number;

			self._owner = owner;
			self._name = sheetName;
			if (wjcCore.isNumber(rows) && !isNaN(rows) && rows >= 0) {
				self._rowCount = rows;
			} else {
				self._rowCount = 200;
			}

			if (wjcCore.isNumber(cols) && !isNaN(cols) && cols >= 0) {
				self._columnCount = cols;
			} else {
				self._columnCount = 20;
			}

			self._grid = grid || this._createGrid();
            self._grid.itemsSourceChanged.addHandler(this._gridItemsSourceChanged, this);
            // Add header row for the grid of the bind sheet.
            self._addHeaderRow();

			self._unboundSortDesc.collectionChanged.addHandler(() => {
                var arr = self._unboundSortDesc,
                    i: number,
                    sd: _UnboundSortDescription,
                    row: wjcGrid.Row;

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

                    // Synch with current sheet.
                    if (self._owner.selectedSheet) {
                        self._owner._copyTo(self._owner.selectedSheet);
                        self._owner._copyFrom(self._owner.selectedSheet);
                    }
                }
			});
		}

		/**
		 * Gets the associated @see:FlexGrid control used to store the sheet data.
		 */
        get grid(): wjcGrid.FlexGrid {
            if (this._grid['wj_sheetInfo'] == null) {
                this._grid['wj_sheetInfo'] = {};
            }
			return this._grid;
		}

		/**
		 * Gets or sets the name of the sheet.
		 */
		get name(): string {
			return this._name;
		}
		set name(value: string) {
            if (!wjcCore.isNullOrWhiteSpace(value) && ((this._name && this._name.toLowerCase() !== value.toLowerCase()) || !this._name)) {
                var e = new wjcCore.PropertyChangedEventArgs('sheetName', this._name, value);
				this._name = value;
                this.grid['wj_sheetInfo'].name = value;
                this.onNameChanged(e);
			}
		}

		/**
		 * Gets or sets the sheet visibility.
		 */
		get visible(): boolean {
			return this._visible;
		}
        set visible(value: boolean) {
            if (this._visible !== value) {
                this._visible = value;
                this.grid['wj_sheetInfo'].visible = value;
                this.onVisibleChanged(new wjcCore.EventArgs());
            }
		}

		/**
		 * Gets or sets the number of rows in the sheet.
		 */
		get rowCount(): number {
            if (this._grid != null) {
                return this._grid.rows.length;
			}
			return 0;
        }
        set rowCount(value: number) {
            var rowIndex: number;
            if (!!this.itemsSource) {
                return;
            }
            if (wjcCore.isNumber(value) && !isNaN(value) && value >= 0 && this._rowCount !== value) {
                if (this._rowCount < value) {
                    for (rowIndex = 0; rowIndex < (value - this._rowCount); rowIndex++) {
                        this.grid.rows.push(new wjcGrid.Row());
                    }
                } else {
                    this.grid.rows.splice(value, this._rowCount - value);
                }
                this._rowCount = value;

                // If the sheet is current selected sheet of the flexsheet, 
                // we should synchronize the updating of the sheet to the flexsheet.
                if (this._owner && this._owner.selectedSheet && this._name === this._owner.selectedSheet.name) {
                    this._owner._copyFrom(this, true);
                }
            }
        }

		/**
		 * Gets or sets the number of columns in the sheet.
		 */
		get columnCount(): number {
            if (this._grid != null) {
                return this._grid.columns.length;
			}
			return 0;
        }
        set columnCount(value: number) {
            var colIndex: number;
            if (!!this.itemsSource) {
                return;
            }
            if (wjcCore.isNumber(value) && !isNaN(value) && value >= 0 && this._columnCount !== value) {
                if (this._columnCount < value) {
                    for (colIndex = 0; colIndex < (value - this._columnCount); colIndex++) {
                        this._grid.columns.push(new wjcGrid.Column());
                    }
                } else {
                    this._grid.columns.splice(value, this._columnCount - value);
                }
                this._columnCount = value;

                // If the sheet is current selected sheet of the flexsheet, 
                // we should synchronize the updating of the sheet to the flexsheet.
                if (this._owner && this._owner.selectedSheet && this._name === this._owner.selectedSheet.name) {
                    this._owner._copyFrom(this, true);
                }
            }
        }

		/**
		 * Gets the selection array.
		 */
        get selectionRanges(): wjcCore.ObservableArray {
			if (!this._selectionRanges) {
                this._selectionRanges = new wjcCore.ObservableArray();
                this._selectionRanges.collectionChanged.addHandler(() => {
                    var selectionCnt: number,
                        lastSelection: wjcGrid.CellRange;
                    if (this._owner && !this._owner._isClicking) {
                        selectionCnt = this._selectionRanges.length;
                        if (selectionCnt > 0) {
                            lastSelection = this._selectionRanges[selectionCnt - 1];
                            if (lastSelection && lastSelection instanceof wjcGrid.CellRange) {
                                this._owner.selection = lastSelection;
                            }
                        }
                        if (selectionCnt > 1) {
                            this._owner._enableMulSel = true;
                        }
                        this._owner.refresh();
                        this._owner._enableMulSel = false;
                    }
                }, this);
			}
			return this._selectionRanges;
        }

		/**
         * Gets or sets the array or @see:ICollectionView for the @see:FlexGrid instance of the sheet.
         */
		get itemsSource(): any {
			if (this._grid != null) {
				return this._grid.itemsSource;
			}
			return null;
		}
        set itemsSource(value: any) {
            var self = this;
            if (self._grid == null) {
                self._createGrid();
                self._grid.itemsSourceChanged.addHandler(self._gridItemsSourceChanged, self);
            } 

            if (self._isEmptyGrid) {
                self._clearGrid();
            }

            self._grid.loadedRows.addHandler(() => {
                self._addHeaderRow();
            });
            self._grid.itemsSource = value;
		}

		/*
		 * Gets or sets the styled cells
		 * This property uses the cell index as the key and stores the @ICellStyle object as the value.
		 * { 1: { fontFamily: xxxx, fontSize: xxxx, .... }, 2: {...}, ... }
		 */
		get _styledCells(): any {
			if (!this._currentStyledCells) {
				this._currentStyledCells = {};
			}
			return this._currentStyledCells;
		}
		set _styledCells(value: any) {
			this._currentStyledCells = value;
		}

		/*
		 * Gets or sets the merge ranges.
		 * This property uses the cell index as the key and stores the @CellRange object as the value.
		 * { 1: CellRange(row = 1, col = 1, row2 = 3, col2 = 4), 2: CellRange(), ...}
		 */
		get _mergedRanges(): any {
			if (!this._currentMergedRanges) {
				this._currentMergedRanges = {};
			}
			return this._currentMergedRanges;
		}
		set _mergedRanges(value: any) {
			this._currentMergedRanges = value;
        }

		/**
		 * Occurs after the sheet name has changed.
		 */
		nameChanged = new wjcCore.Event();
		/**
		 * Raises the @see:nameChanged event.
		 */
        onNameChanged(e: wjcCore.PropertyChangedEventArgs) {
			this.nameChanged.raise(this, e);
        }

        /**
		 * Occurs after the visible of sheet has changed.
		 */
        visibleChanged = new wjcCore.Event();
        /**
		 * Raises the @see:visibleChanged event.
		 */
        onVisibleChanged(e: wjcCore.EventArgs) {
            this.visibleChanged.raise(this, e);
        }

		/**
		 * Gets the style of specified cell.
		 *
		 * @param rowIndex the row index of the specified cell.
		 * @param columnIndex the column index of the specified cell.
		 */
		getCellStyle(rowIndex: number, columnIndex: number): ICellStyle {
			var cellIndex: number,
				rowCnt = this._grid.rows.length,
				colCnt = this._grid.columns.length;

			if (rowIndex >= rowCnt || columnIndex >= colCnt) {
				return null;
			}

			cellIndex = rowIndex * colCnt + columnIndex;

			return this._styledCells[cellIndex];
        }

        // Attach the sheet to the @see: FlexSheet control as owner.
        _attachOwner(owner: FlexSheet) {
            if (this._owner !== owner) {
                this._owner = owner;
            }
        }

		// Update the sheet name with valid name.
		_setValidName(validName: string) {
			this._name = validName;
            this.grid['wj_sheetInfo'].name = validName;
        }

        // Store the row settings FlexSheet.
        _storeRowSettings() {
            var rowIdx = 0,
                row: wjcGrid.Row;

            this._rowSettings = [];
            for (; rowIdx < this._grid.rows.length; rowIdx++) {
                row = this._owner.rows[rowIdx];
                if (row) {
                    this._rowSettings[rowIdx] = {
                        height: row.height,
                        isCollapsed: row instanceof wjcGrid.GroupRow ? (<wjcGrid.GroupRow>row).isCollapsed : null
                    }
                }
            }
        }

        // Set the row settings to the sheet grid.
        _setRowSettings() {
            var rowIdx = 0,
                rowSettings: any;

            for (; rowIdx < this._rowSettings.length; rowIdx++) {
                rowSettings = this._rowSettings[rowIdx];
                if (rowSettings) {
                    this._grid.rows[rowIdx].height = rowSettings.height;
                }
            }
        }

		// comparison function used in rows sort for unbound sheet.
		private _compareRows() {
			var self = this,
				sortDesc = this._unboundSortDesc;

			return function (a, b) {
				for (var i = 0; i < sortDesc.length; i++) {

					// get values
					var sd = <_UnboundSortDescription>sortDesc[i],
						v1 = a._ubv ? a._ubv[sd.column._hash] : '',
						v2 = b._ubv ? b._ubv[sd.column._hash] : '';

					// if the cell value is formula, we should try to evaluate this formula.
					if (wjcCore.isString(v1) && v1[0] === '=') {
                        v1 = self._owner.evaluate(v1);
                        if (v1 != null && !wjcCore.isPrimitive(v1)) {
                            v1 = v1.value;
                        }
					}
					if (wjcCore.isString(v2) && v2[0] === '=') {
                        v2 = self._owner.evaluate(v2);
                        if (v2 != null && !wjcCore.isPrimitive(v2)) {
                            v2 = v2.value;
                        }
					}

					// check for NaN (isNaN returns true for NaN but also for non-numbers)
					if (v1 !== v1) v1 = null;
					if (v2 !== v2) v2 = null;

					// ignore case when sorting  (but add the original string to keep the 
					// strings different and the sort consistent, 'aa' between 'AA' and 'bb')
					if (wjcCore.isString(v1)) v1 = v1.toLowerCase() + v1;
                    if (wjcCore.isString(v2)) v2 = v2.toLowerCase() + v2;

					// compare the values (at last!)
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
			}
		}

		// Create a blank flexsheet.
		private _createGrid(): wjcGrid.FlexGrid {
			var hostElement = document.createElement('div'),
				grid: wjcGrid.FlexGrid,
				column: wjcGrid.Column,
				colIndex: number,
				rowIndex: number;

            this._isEmptyGrid = true;
			// We should append the host element of the data grid of current sheet to body before creating data grid,
			// this will make the host element to inherit the style of body (TFS 121713)
			hostElement.style.visibility = 'hidden';
			document.body.appendChild(hostElement);
			grid = new wjcGrid.FlexGrid(hostElement);
			document.body.removeChild(hostElement);
			for (rowIndex = 0; rowIndex < this._rowCount; rowIndex++) {
				grid.rows.push(new wjcGrid.Row());
			}

			for (colIndex = 0; colIndex < this._columnCount; colIndex++) {
				column = new wjcGrid.Column();
				// Setting the required property of the column to false for the data grid of current sheet.
				// TFS #126125
                column.isRequired = false;
				grid.columns.push(column);
			}

			// Add sheet related info into the flexgrid.
			// This property contains the name, style of cells and merge cells of current sheet.
			grid['wj_sheetInfo'] = {
				name: this.name,
				visible: this.visible,
				styledCells: this._styledCells,
				mergedRanges: this._mergedRanges
			};

			return grid;
		}

		// Clear the grid of the sheet.
		private _clearGrid() {
			this._grid.rows.clear();
			this._grid.columns.clear();
			this._grid.columnHeaders.columns.clear();
			this._grid.rowHeaders.rows.clear();
		}

		// Items source changed handler for the grid of the sheet.
        private _gridItemsSourceChanged() {
            var self = this;
			// If the sheet is current seleced sheet of the flexsheet, we should synchronize the updating of the sheet to the flexsheet.
            if (self._owner && self._owner.selectedSheet && self._name === self._owner.selectedSheet.name) {
                self._owner._filter.clear();
                self._owner._copyFrom(self, false);
                setTimeout(() => {
                    self._owner._setFlexSheetToDirty();
                    self._owner.invalidate();
                }, 10);
			}
        }

        // Add header row for the bound grid.
        private _addHeaderRow() {
            var row: HeaderRow,
                col: wjcGrid.Column;
            if (this._grid.itemsSource && !(this._grid.rows[0] instanceof HeaderRow)) {
                var row = new HeaderRow(),
                    col: wjcGrid.Column;
                for (var i = 0; i < this._grid.columns.length; i++) {
                    col = this._grid.columns[i]
                    if (!row._ubv) {
                        row._ubv = {};
                    }
                    row._ubv[col._hash] = col.header;
                }
                this._grid.rows.insert(0, row);
            }
        }
	}

	/**
	 * Defines the collection of the @see:Sheet objects.
	 */
	export class SheetCollection extends wjcCore.ObservableArray {
        private _current: number = -1;

        /**
		 * Occurs when the @see:SheetCollection is cleared.
		 */
        sheetCleared = new wjcCore.Event();
        /**
		 * Raises the sheetCleared event.
		 */
        onSheetCleared() {
            this.sheetCleared.raise(this, new wjcCore.EventArgs());
        }

		/**
		 * Gets or sets the index of the currently selected sheet.
		 */
		get selectedIndex(): number {
			return this._current;
		}
		set selectedIndex(index: number) {
			this._moveCurrentTo(+index);
		}

		/**
		 * Occurs when the <b>selectedIndex</b> property changes.
		 */
		selectedSheetChanged  = new wjcCore.Event();
		/**
         * Raises the <b>currentChanged</b> event.
         *
         * @param e @see:PropertyChangedEventArgs that contains the event data.
         */
		onSelectedSheetChanged(e: wjcCore.PropertyChangedEventArgs) {
			this.selectedSheetChanged.raise(this, e);
		}

		/**
		 * Inserts an item at a specific position in the array.
		 * Overrides the insert method of its base class @see:ObservableArray. 
		 *
		 * @param index Position where the item will be added.
		 * @param item Item to add to the array.
		 */
        insert(index: number, item: any) {
            var name: string;
            name = item.name ? this.getValidSheetName(item) : this._getUniqueName();
            if (name !== item.name) {
                item.name = name;
            }
            super.insert(index, item);
            this._postprocessSheet(<Sheet>item);
        }

        /**
         * Adds one or more items to the end of the array.
         * Overrides the push method of its base class @see:ObservableArray. 
         *
         * @param ...item One or more items to add to the array.
         * @return The new length of the array.
         */
        push(...item: any[]): number {
            var currentLength = this.length,
                idx = 0,
                name: string;
            for (; idx < item.length; idx++) {
                name = item[idx].name ? this.getValidSheetName(item[idx]) : this._getUniqueName();
                if (name !== item[idx].name) {
                    item[idx].name = name;
                }
                super.push(item[idx]);
                this._postprocessSheet(<Sheet>item[idx]);
            }
            return this.length;
        }

        /**
         * Removes and/or adds items to the array.
         * Overrides the splice method of its base class @see:ObservableArray. 
         *
         * @param index Position where items will be added or removed.
         * @param count Number of items to remove from the array.
         * @param item Item to add to the array.
         * @return An array containing the removed elements.
         */
        splice(index: number, count: number, item?: any): any[] {
            var name: string;
            if (item) {
                name = item.name ? this.getValidSheetName(item) : this._getUniqueName();
                if (name !== item.name) {
                    item.name = name;
                }
                this._postprocessSheet(<Sheet>item);
                return super.splice(index, count, item);
            } else {
                return super.splice(index, count, item);
            }
        }

		/**
		 * Removes an item at a specific position in the array.
		 * Overrides the removeAt method of its base class @see:ObservableArray. 
		 *
		 * @param index Position of the item to remove.
		 */
		removeAt(index: number) {
			var succeeded = this.hide(index);
            if (succeeded) {
                super.removeAt(index);
                if (index < this.selectedIndex) {
                    this._current -= 1;
                }
			}
		}

		/**
		 * Occurs after the name of the sheet in the collection has changed.
		 */
		sheetNameChanged = new wjcCore.Event();
		/**
		 * Raises the <b>sheetNameChanged</b> event.
		 */
		onSheetNameChanged(e: wjcCore.NotifyCollectionChangedEventArgs) {
			this.sheetNameChanged.raise(this, e);
        }

        /**
		 * Occurs after the visible of the sheet in the collection has changed.
		 */
        sheetVisibleChanged = new wjcCore.Event();
		/**
		 * Raises the <b>sheetVisibleChanged</b> event.
		 */
        onSheetVisibleChanged(e: wjcCore.NotifyCollectionChangedEventArgs) {
            this.sheetVisibleChanged.raise(this, e);
        }

		/**
		 * Selects the first sheet in the @see:FlexSheet control.
		 */
		selectFirst(): boolean {
			return this._moveCurrentTo(0);
		}

		/**
		 * Selects the last sheet in the owner @see:FlexSheet control.
		 */
		selectLast(): boolean {
			return this._moveCurrentTo(this.length - 1);
		}

		/**
		 * Selects the previous sheet in the owner @see:FlexSheet control.
		 */
		selectPrevious(): boolean {
			return this._moveCurrentTo(this._current - 1);
		}

		/**
		 * Select the next sheet in the owner @see:FlexSheet control.
		 */
		selectNext(): boolean {
			return this._moveCurrentTo(this._current + 1);
		}

		/**
		 * Hides the sheet at the specified position.
		 *
		 * @param pos The position of the sheet to hide.
		 */
		hide(pos: number): boolean {
			var succeeded = false;
			if (pos < 0 && pos >= this.length) {
				return false;
			}
			if (!this[pos].visible) {
				return false;
			}
			this[pos].visible = false;

			return true;
		}

		/**
		 * Unhide and selects the @see:Sheet at the specified position.
		 *
		 * @param pos The position of the sheet to show.
		 */
		show(pos: number): boolean {
			var succeeded = false;
			if (pos < 0 && pos >= this.length) {
				return false;
			}
			this[pos].visible = true;
			this._moveCurrentTo(pos);
			return true;
		}

		/**
		 * Clear the SheetCollection.
		 */
		clear() {
			super.clear();
            this._current = -1;

            this.onSheetCleared();
		}

		/**
		 * Checks whether the sheet name is valid.
		 *
		 * @param sheet The @see:Sheet for which the name needs to check.
		 */
		isValidSheetName(sheet: Sheet): boolean {
			var sheetIndex = this._getSheetIndexFrom(sheet.name),
				currentSheetIndex = this.indexOf(sheet);

			return (sheetIndex === -1 || sheetIndex === currentSheetIndex);
		}

		/**
		 * Gets the valid name for the sheet.
		 *
		 * @param currentSheet The @see:Sheet need get the valid name.
		 */
		getValidSheetName(currentSheet: Sheet): string {
			var validName = currentSheet.name,
				index = 1,
				currentSheetIndex = this.indexOf(currentSheet),
				sheetIndex: number;

			do {
				sheetIndex = this._getSheetIndexFrom(validName);
				if (sheetIndex === -1 || sheetIndex === currentSheetIndex) {
					break;
				} else {
					validName = currentSheet.name.concat((index + 1).toString());
				}
				index = index + 1;
			} while (true);

			return validName;
		}

		// Move the current index to indicated position.
		private _moveCurrentTo(pos: number): boolean {
			var searchedPos = pos,
				e: wjcCore.PropertyChangedEventArgs;

			if (pos < 0 || pos >= this.length) {
				return false;
            }
            if (this._current < searchedPos || searchedPos === 0) {
                while (searchedPos < this.length && !this[searchedPos].visible) {
                    searchedPos++;
                }
            } else if (this._current > searchedPos) {
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
		}

		// Get the index for the sheet in the SheetCollection.
		private _getSheetIndexFrom(sheetName: string): number {
			var result = -1,
				sheet: Sheet,
				name: string;

            if (!sheetName) {
                return result;
            }

			sheetName = sheetName.toLowerCase();
			for (var i = 0; i < this.length; i++) {
				sheet = <Sheet>this[i];
				name = sheet.name ? sheet.name.toLowerCase() : '';
				if (name === sheetName) {
					return i;
				}
			}
			return result;
        }

        // Post process the newly added sheet. 
        private _postprocessSheet(item: Sheet) {
            var self = this;

            // Update the sheet name via the sheetNameChanged event handler.
            item.nameChanged.addHandler(() => {
                var e: wjcCore.NotifyCollectionChangedEventArgs,
                    index = self._getSheetIndexFrom(item.name);

                if (!self.isValidSheetName(item)) {
                    item._setValidName(self.getValidSheetName(item));
                }
                e = new wjcCore.NotifyCollectionChangedEventArgs(wjcCore.NotifyCollectionChangedAction.Change, item, wjcCore.isNumber(index) ? index : self.length - 1);
                self.onSheetNameChanged(e);
            });

            item.visibleChanged.addHandler(() => {
                var index = self._getSheetIndexFrom(item.name),
                    e = new wjcCore.NotifyCollectionChangedEventArgs(wjcCore.NotifyCollectionChangedAction.Change, item, wjcCore.isNumber(index) ? index : self.length - 1);
                self.onSheetVisibleChanged(e);
            });
        }

		// Get the unique name for the sheet in the SheetCollection.
		private _getUniqueName(): string {
			var validName = 'Sheet1',
				index = 0;
			do {
				if (this._getSheetIndexFrom(validName) === -1) {
					break;
				} else {
					validName = 'Sheet'.concat((index + 1).toString());
				}
				index = index + 1;
			} while (true);

			return validName;
		}
	}

	/*
	 * Represents the control that shows tabs for switching between @see:FlexSheet sheets.
	 */
	export class _SheetTabs extends wjcCore.Control {
        private _sheets: SheetCollection;
        private _sheetContainer: HTMLElement;
		private _tabContainer: HTMLElement;
		private _sheetPage: HTMLElement;
		private _newSheet: HTMLElement;
        private _owner: FlexSheet;
        private _rtl = false;
        private _sheetTabClicked = false;

		static controlTemplate = '<div wj-part="sheet-container" class="wj-sheet" style="height:100%;position:relative">' +
			'<div wj-part="sheet-page" class="wj-btn-group wj-sheet-page">' + // Sheets pageg
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
			'<div class="wj-sheet-tab" style="height:100%;overflow:hidden">' + //Sheet Tabs
			'<ul wj-part="container"></ul>' +
			'</div>' +
			'<div wj-part="new-sheet" class="wj-new-sheet"><span class="wj-sheet-icon wj-glyph-file"></span></div>' +
			'</div>';

		/*
		 * Initializes a new instance of the @see:_SheetTabs class.
		 *
		 * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
		 * @param owner The @see: FlexSheet control what the SheetTabs control works with.
		 * @param options JavaScript object containing initialization data for the control.
		 */
		constructor(element: any, owner: FlexSheet, options?: any) {
			super(element, options);
			var self = this;

			self._owner = owner;
            self._sheets = owner.sheets;
            self._rtl = getComputedStyle(self._owner.hostElement).direction == 'rtl';

			if (self.hostElement.attributes['tabindex']) {
				self.hostElement.attributes.removeNamedItem('tabindex');
			}

			self._initControl();
			self.deferUpdate(() => {
				if (options) {
					self.initialize(options);
				}
			});
		}

		/*
		 * Override to refresh the control.
		 *
		 * @param fullUpdate Whether to update the control layout as well as the content.
		 */
		refresh(fullUpdate) {
			this._tabContainer.innerHTML = '';
            this._tabContainer.innerHTML = this._getSheetTabs();
            if (this._rtl) {
                this._adjustSheetsPosition();
            }
			this._adjustSize();
		}

		// The items source changed event handler.
		private _sourceChanged(sender: any, e: wjcCore.EventArgs = wjcCore.NotifyCollectionChangedEventArgs.reset) {
			var eArgs: wjcCore.NotifyCollectionChangedEventArgs = <wjcCore.NotifyCollectionChangedEventArgs> e,
				index: number;

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
		}

		// The current changed of the item source event handler.
		private _selectedSheetChanged(sender: any, e: wjcCore.PropertyChangedEventArgs) {
			this._updateTabActive(e.oldValue, false);
            this._updateTabActive(e.newValue, true);
            if (this._sheetTabClicked) {
                this._sheetTabClicked = false;
            } else {
                this._scrollToActiveSheet(e.newValue, e.oldValue);
            }
			this._adjustSize();
		}

		// Initialize the SheetTabs control.
		private _initControl() {
			var self = this;

			//apply template
            self.applyTemplate('', self.getTemplate(), {
                _sheetContainer: 'sheet-container',
				_tabContainer: 'container',
				_sheetPage: 'sheet-page',
				_newSheet: 'new-sheet'
			});
			//init opts

            if (self._rtl) {
                self._sheetPage.style.right = '0px';
                self._tabContainer.parentElement.style.right = self._sheetPage.clientWidth + 'px';
                self._tabContainer.style.right = '0px';
                self._tabContainer.style.cssFloat = 'right';
                self._newSheet.style.right = (self._sheetPage.clientWidth + self._tabContainer.parentElement.clientWidth) + 'px';
            }

            self._adjustNavigationButtons(self._rtl);

            self.addEventListener(self._newSheet, 'click', (evt: MouseEvent) => {
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
		}

		// Initialize the sheet tab part.
		private _initSheetTab() {
			var self = this;

			self.addEventListener(self._tabContainer, 'mousedown', (evt: MouseEvent) => {
				var li = <HTMLElement>evt.target,
					idx;

                if (li instanceof HTMLLIElement) {
                    self._sheetTabClicked = true;

                    idx = self._getItemIndex(self._tabContainer, li);

                    self._scrollSheetTabContainer(li);

                    if (idx > -1) {
                        self._sheets.selectedIndex = idx;
                    }
                }
			});
			//todo
			//contextmenu
		}

		// Initialize the sheet pager part.
		private _initSheetPage() {
			var self = this;

			self.hostElement.querySelector('div.wj-sheet-page').addEventListener('click', (e: MouseEvent) => {
                var btn = (<HTMLElement>e.target).toString() === '[object HTMLButtonElement]' ? <HTMLElement>e.target : (<HTMLElement>e.target).parentElement,
                    index = self._getItemIndex(self._sheetPage, btn),
                    currentSheetTab: HTMLElement;

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
		}

		// Get markup for the sheet tabs
		private _getSheetTabs(): string {
			var html = '',
				i: number;
                
            for (i = 0; i < this._sheets.length; i++) {
                html += this._getSheetElement(this._sheets[i], this._sheets.selectedIndex === i);
            }
			return html;
		}

		// Get the markup for a sheet tab.
		private _getSheetElement(sheetItem: Sheet, isActive=false): string {
			var result = '<li';
			if (!sheetItem.visible) {
				result += ' class="hidden"';
			} else if (isActive) {
				result += ' class="active"';
			}
			result += '>' + sheetItem.name + '</li>';
			return result;
		}

		// Update the active state for the sheet tabs.
		private _updateTabActive(pos: number, active: boolean) {
			if (pos < 0 || pos >= this._tabContainer.children.length) {
				return;
			}
			if (active) {
				wjcCore.addClass(<HTMLElement>this._tabContainer.children[pos], 'active');
			} else {
				wjcCore.removeClass(<HTMLElement>this._tabContainer.children[pos], 'active');
            }
		}

		// Update the show or hide state for the sheet tabs
        private _updateTabShown(sender: any, e: wjcCore.NotifyCollectionChangedEventArgs) {
			if (e.index < 0 || e.index >= this._tabContainer.children.length) {
				return;
			}
			if (!e.item.visible) {
				wjcCore.addClass(<HTMLElement>this._tabContainer.children[e.index], 'hidden');
			} else {
				wjcCore.removeClass(<HTMLElement>this._tabContainer.children[e.index], 'hidden');
            }
            this._adjustSize();
		}

		// Adjust the size of the SheetTabs control.
		_adjustSize() {
			//adjust the size
			var sheetCount = this._tabContainer.childElementCount,
				index: number,
				containerMaxWidth: number,
				width: number = 0,
				scrollLeft = 0;

			if (this.hostElement.style.display === 'none') {
				return;
			}

			// Get the scroll left of the tab container, before setting the size of the size of the tab container. (TFS 142788)
			scrollLeft = this._tabContainer.parentElement.scrollLeft;

			// Before adjusting the size of the sheet tab, we should reset the size to ''. (TFS #139846)
			this._tabContainer.parentElement.style.width = '';
			this._tabContainer.style.width = '';
			this._sheetPage.parentElement.style.width = '';

			for (index = 0; index < sheetCount; index++) {
				width += (<HTMLElement>this._tabContainer.children[index]).offsetWidth + 1;
			}
			containerMaxWidth = this.hostElement.offsetWidth - this._sheetPage.offsetWidth - this._newSheet.offsetWidth - 2;
			this._tabContainer.parentElement.style.width = (width > containerMaxWidth ? containerMaxWidth : width) + 'px';
			this._tabContainer.style.width = width + 'px';
			this._sheetPage.parentElement.style.width = this._sheetPage.offsetWidth + this._newSheet.offsetWidth + this._tabContainer.parentElement.offsetWidth + 3 + 'px';

			// Reset the scroll left for the tab container. (TFS 142788)
			this._tabContainer.parentElement.scrollLeft = scrollLeft;
		}

		// Get the index of the element in its parent container.
		private _getItemIndex(container:HTMLElement, item: HTMLElement): number {
			var idx = 0;
			for (; idx < container.children.length; idx++) {
				if (container.children[idx] === item) {
					return idx;
				}
			}
			return -1;
		}

		// Update the sheet tab name.
		private _updateSheetName(sender: any, e: wjcCore.NotifyCollectionChangedEventArgs) {
			(<HTMLElement>this._tabContainer.querySelectorAll('li')[e.index]).textContent = e.item.name;
			this._adjustSize();
        }

		// Scroll the sheet tab container to display the invisible or partial visible sheet tab.
        private _scrollSheetTabContainer(currentSheetTab: HTMLElement) {
            var scrollLeft = this._tabContainer.parentElement.scrollLeft,
                sheetPageSize = this._sheetPage.offsetWidth,
                newSheetSize = this._newSheet.offsetWidth,
                containerSize = this._tabContainer.parentElement.offsetWidth,
                containerOffset: number;

            if (this._rtl) {
                switch (wjcGrid.FlexGrid['_getRtlMode']()) {
                    case 'rev':
                        containerOffset = -this._tabContainer.offsetLeft;
                        if (containerOffset + currentSheetTab.offsetLeft + currentSheetTab.offsetWidth > containerSize + scrollLeft) {
                            this._tabContainer.parentElement.scrollLeft += currentSheetTab.offsetWidth;
                        } else if (containerOffset + currentSheetTab.offsetLeft < scrollLeft) {
                            this._tabContainer.parentElement.scrollLeft -= currentSheetTab.offsetWidth;
                        }
                        break;
                    case 'neg':
                        if (currentSheetTab.offsetLeft < scrollLeft) {
                            this._tabContainer.parentElement.scrollLeft -= currentSheetTab.offsetWidth;
                        } else if (currentSheetTab.offsetLeft + currentSheetTab.offsetWidth > containerSize + scrollLeft) {
                            this._tabContainer.parentElement.scrollLeft += currentSheetTab.offsetWidth;
                        }
                        break;
                    default:
                        if (currentSheetTab.offsetLeft - newSheetSize + scrollLeft < 0) {
                            this._tabContainer.parentElement.scrollLeft += currentSheetTab.offsetWidth;
                        } else if (currentSheetTab.offsetLeft + currentSheetTab.offsetWidth - newSheetSize + scrollLeft > containerSize) {
                            this._tabContainer.parentElement.scrollLeft -= currentSheetTab.offsetWidth;
                        }
                        break;
                }
            } else {
                if (currentSheetTab.offsetLeft + currentSheetTab.offsetWidth - sheetPageSize > containerSize + scrollLeft) {
                    this._tabContainer.parentElement.scrollLeft += currentSheetTab.offsetWidth;
                } else if (currentSheetTab.offsetLeft - sheetPageSize < scrollLeft) {
                    this._tabContainer.parentElement.scrollLeft -= currentSheetTab.offsetWidth;
                }
            }
        }

        // Adjust the position of each sheet tab for 'rtl' direction.
        private _adjustSheetsPosition() {
            var sheets = this._tabContainer.querySelectorAll('li'),
                position = 0,
                sheet: HTMLElement,
                index: number;

            for (index = 0; index < sheets.length; index++) {
                sheet = <HTMLElement>sheets[index];
                sheet.style.cssFloat = 'right';
                sheet.style.right = position + 'px';
                position += (<HTMLElement>sheets[index]).clientWidth;
            }
        }

        // Scroll to the active sheet tab.
        private _scrollToActiveSheet(newIndex: number, oldIndex: number) {
            var sheets = this._tabContainer.querySelectorAll('li'),
                activeSheet: HTMLElement,
                scrollLeft: number,
                i: number;

            if (this._tabContainer.clientWidth > this._tabContainer.parentElement.clientWidth) {
                scrollLeft = this._tabContainer.clientWidth - this._tabContainer.parentElement.clientWidth;
            } else {
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
                    } else {
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
                    } else {
                        this._tabContainer.parentElement.scrollLeft = scrollLeft;
                    }
                    return;
                }

                if (newIndex >= oldIndex) {
                    for (i = oldIndex + 1; i <= newIndex; i++) {
                        activeSheet = <HTMLElement>sheets[i];
                        this._scrollSheetTabContainer(activeSheet);
                    }
                } else {
                    for (i = oldIndex - 1; i >= newIndex; i--) {
                        activeSheet = <HTMLElement>sheets[i];
                        this._scrollSheetTabContainer(activeSheet);
                    }
                }
            }
        }

        // Adjust the direction for sheet navigation buttons' glyph.
        private _adjustNavigationButtons(rtl: boolean) {
            var navBtns = this.hostElement.querySelectorAll('.wj-sheet-page button'),
                btnGlyph: HTMLSpanElement;

            if (navBtns && navBtns.length === 4) {
                if (rtl) {
                    btnGlyph = <HTMLSpanElement>navBtns[0].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-step-backward');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-step-backward-rtl');

                    btnGlyph = <HTMLSpanElement>navBtns[1].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-left');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-left-rtl');

                    btnGlyph = <HTMLSpanElement>navBtns[2].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-right');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-right-rtl');

                    btnGlyph = <HTMLSpanElement>navBtns[3].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-step-forward');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-step-forward-rtl');
                } else {
                    btnGlyph = <HTMLSpanElement>navBtns[0].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-step-backward-rtl');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-step-backward');

                    btnGlyph = <HTMLSpanElement>navBtns[1].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-left-rtl');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-left');

                    btnGlyph = <HTMLSpanElement>navBtns[2].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-right-rtl');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-right');

                    btnGlyph = <HTMLSpanElement>navBtns[3].querySelector('span');
                    wjcCore.removeClass(btnGlyph, 'wj-glyph-step-forward-rtl');
                    wjcCore.addClass(btnGlyph, 'wj-glyph-step-forward');
                }
            }
        }
	}

	/*
	 * Defines the class defining @see:FlexSheet column sorting criterion.
	 */
	export class _UnboundSortDescription {
		private _column: wjcGrid.Column;
		private _ascending: boolean;

		/*
		 * Initializes a new instance of the @see:UnboundSortDescription class.
		 *
		 * @param column The column to sort the rows by.
		 * @param ascending The sort order.
		 */
		constructor(column: wjcGrid.Column, ascending: boolean) {
			this._column = column;
			this._ascending = ascending;
		}

		/*
		 * Gets the column to sort the rows by.
		 */
		get column(): wjcGrid.Column {
			return this._column;
		}

		/*
		 * Gets the sort order.
		 */
		get ascending(): boolean {
			return this._ascending;
		}
	}


	'use strict';

	/**
	 * Maintains sorting of the selected @see:Sheet of the @see:FlexSheet. 
	 */
	export class SortManager {
		private _sortDescriptions: wjcCore.CollectionView;
		private _owner: FlexSheet;
		_committedList: ColumnSortDescription[];

		/**
		 * Initializes a new instance of the @see:SortManager class.
		 *
		 * @param owner The @see:FlexSheet control that owns this <b>SortManager</b>.
		 */
		constructor(owner: FlexSheet) {
			this._owner = owner;
			this._sortDescriptions = new wjcCore.CollectionView();
			this._committedList = [new ColumnSortDescription(-1, true)];
			this._sortDescriptions.newItemCreator = () => {
				return new ColumnSortDescription(-1, true);
			}

			this._refresh();
		}

		/**
		 * Gets or sets the collection of the sort descriptions represented by the  @see:ColumnSortDescription objects.
		 */
		get sortDescriptions(): wjcCore.CollectionView {
			return this._sortDescriptions;
		}
		set sortDescriptions(value: wjcCore.CollectionView) {
			this._sortDescriptions = value;

			this.commitSort(true);
			this._refresh();
		}

		/**
		 * Adds a blank sorting level to the sort descriptions.
         *
         * @param columnIndex The index of the column in the FlexSheet control.
         * @param ascending The sort order for the sort level.
		 */
        addSortLevel(columnIndex?: number, ascending: boolean = true) {
            var item = this._sortDescriptions.addNew();
            if (columnIndex != null && !isNaN(columnIndex) && wjcCore.isInt(columnIndex)) {
                item.columnIndex = columnIndex;
            }
            item.ascending = ascending;
			this._sortDescriptions.commitNew();
		}

		/**
		 * Removes the current sorting level from the sort descriptions.
		 *
		 * @param columnIndex The index of the column in the FlexSheet control.
		 */
		deleteSortLevel(columnIndex?: number) {
			var item: any;

			if (columnIndex != null) {
				item = this._getSortItem(columnIndex);
			} else {
				item = this._sortDescriptions.currentItem;
			}
			if (item) {
				this._sortDescriptions.remove(item);
			}
		}

		/**
		 * Adds a copy of the current sorting level to the sort descriptions.
		 */
		copySortLevel() {
			var item = this._sortDescriptions.currentItem;
			if (item) {
				var newItem = this._sortDescriptions.addNew();
				newItem.columnIndex = parseInt(item.columnIndex);
				newItem.ascending = item.ascending;
				this._sortDescriptions.commitNew();
			}
		}

		/**
		 * Updates the current sort level.
		 *
		 * @param columnIndex The column index for the sort level.
		 * @param ascending The sort order for the sort level.
		 */
		editSortLevel(columnIndex?: number, ascending?: boolean) {
			if (columnIndex != null) {
				this._sortDescriptions.currentItem.columnIndex = columnIndex;
			}
			if (ascending != null) {
				this._sortDescriptions.currentItem.ascending = ascending;
			}
		}

		/**
		 * Moves the current sorting level to a new position.
		 *
		 * @param offset The offset to move the current level by.
		 */
		moveSortLevel(offset: number) {
			var item = this._sortDescriptions.currentItem;
			if (item) {
				var arr = this._sortDescriptions.sourceCollection,
					index = arr.indexOf(item),
					newIndex = index + offset;
				if (index > -1 && newIndex > -1) {
					arr.splice(index, 1);
					arr.splice(newIndex, 0, item);
					this._sortDescriptions.refresh();
					this._sortDescriptions.moveCurrentTo(item);
				}
			}
        }

        /**
         * Check whether the sort item of specific column exists or not 
         *
         * @param columnIndex The index of the column in the FlexSheet control.
         */
        checkSortItemExists(columnIndex): number {
            var i = 0,
                sortItemCnt = this._sortDescriptions.itemCount,
                sortItem: any;

            for (; i < sortItemCnt; i++) {
                sortItem = this._sortDescriptions.items[i];

                if (+sortItem.columnIndex === columnIndex) {
                    return i;
                }
            }

            return -1;
        }

		/**
		 * Commits the current sort descriptions to the FlexSheet control.
		 *
		 * @param undoable The boolean value indicating whether the commit sort action is undoable.
		 */
		commitSort(undoable = true) {
			var sd: any,
				newSortDesc: wjcCore.SortDescription,
				bindSortDesc: wjcCore.ObservableArray,
				dataBindSortDesc: wjcCore.ObservableArray,
				i: number,
                unSortDesc: wjcCore.ObservableArray,
				sortAction: _SortColumnAction,
				unboundRows: any,
				isCVItemsSource: boolean = this._owner.itemsSource && this._owner.itemsSource instanceof wjcCore.CollectionView;

            if (!this._owner.selectedSheet) {
                return;
            }

            unSortDesc = this._owner.selectedSheet._unboundSortDesc;
			if (undoable) {
				sortAction = new _SortColumnAction(this._owner);
			}

			if (this._sortDescriptions.itemCount > 0) {
				this._committedList = this._sortDescriptions.items.slice();
			} else {
				this._committedList = [new ColumnSortDescription(-1, true)];
			}

			if (this._owner.collectionView) {
				// Try to get the unbound row in the bound sheet.
				unboundRows = this._scanUnboundRows();
				// Update sorting for the bind booksheet
				this._owner.collectionView.beginUpdate();
				this._owner.selectedSheet.grid.collectionView.beginUpdate();
				bindSortDesc = this._owner.collectionView.sortDescriptions;
				bindSortDesc.clear();
				// Synch the sorts for the grid of current sheet.
				if (isCVItemsSource === false) {
					dataBindSortDesc = this._owner.selectedSheet.grid.collectionView.sortDescriptions;
					dataBindSortDesc.clear();
				}
				for (i = 0; i < this._sortDescriptions.itemCount; i++) {
					sd = this._sortDescriptions.items[i];

					if (sd.columnIndex > -1) {
						newSortDesc = new wjcCore.SortDescription(this._owner.columns[sd.columnIndex].binding, sd.ascending); 
						bindSortDesc.push(newSortDesc);
						// Synch the sorts for the grid of current sheet.
						if (isCVItemsSource === false) {
							dataBindSortDesc.push(newSortDesc);
						}
					}
				}
				this._owner.collectionView.endUpdate();
				this._owner.selectedSheet.grid.collectionView.endUpdate();
				// Re-insert the unbound row into the sheet.
				if (unboundRows) {
					Object.keys(unboundRows).forEach((key) => {
						this._owner.rows.splice(+key, 0, unboundRows[key]);
					});
				}
			} else {
				// Update sorting for the unbound booksheet.
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
		}

		/**
		 * Cancel the current sort descriptions to the FlexSheet control.
		 */
		cancelSort() {
			this._sortDescriptions.sourceCollection = this._committedList.slice();

			this._refresh();
        }

		// Updates the <b>sorts</b> collection based on the current @see:Sheet sort conditions.
		_refresh() {
			var sortList = [],
				i: number,
                sd: any;

            if (!this._owner.selectedSheet) {
                return;
            }

			if (this._owner.collectionView && this._owner.collectionView.sortDescriptions.length > 0) {
				for (i = 0; i < this._owner.collectionView.sortDescriptions.length; i++) {
					sd = this._owner.collectionView.sortDescriptions[i];
					sortList.push(new ColumnSortDescription(this._getColumnIndex(sd.property), sd.ascending));
				}
			} else if (this._owner.selectedSheet && this._owner.selectedSheet._unboundSortDesc.length > 0) {
				for (i = 0; i < this._owner.selectedSheet._unboundSortDesc.length; i++) {
					sd = this._owner.selectedSheet._unboundSortDesc[i];
					sortList.push(new ColumnSortDescription(sd.column.index, sd.ascending));
				}
			} else {
				sortList.push(new ColumnSortDescription(-1, true));
			}
			this._sortDescriptions.sourceCollection = sortList;
		}

		// Get the index of the column by the binding property.
		private _getColumnIndex(property: string): number {
			var i = 0,
				colCnt = this._owner.columns.length;

			for (; i < colCnt; i++) {
				if (this._owner.columns[i].binding === property) {
					return i;
				}
			}
			return -1;
		}

		// Get the sort item via the column index
        private _getSortItem(columnIndex: number): any {
            var index = this.checkSortItemExists(columnIndex);

            if (index > -1) {
                return this._sortDescriptions.items[index];
            }

			return undefined;
		}

		// Scan the unbound row of the bound sheet.
		private _scanUnboundRows(): any {
			var rowIndex: number,
				processingRow: wjcGrid.Row,
				unboundRows: any;

			for (rowIndex = 0; rowIndex < this._owner.rows.length; rowIndex++) {
				processingRow = this._owner.rows[rowIndex];
				if (!processingRow.dataItem) {
                    if (!(processingRow instanceof HeaderRow) && !(processingRow instanceof wjcGrid._NewRowTemplate) ) {
						if (!unboundRows) {
							unboundRows = {};
						}
						unboundRows[rowIndex] = processingRow;
					}
				}
			}

			return unboundRows;
		}
	}

	/**
	 * Describes a @see:FlexSheet column sorting criterion. 
	 */
	export class ColumnSortDescription {
		private _columnIndex: number;
		private _ascending: boolean;

		/**
		 * Initializes a new instance of the @see:ColumnSortDescription class.
		 *
		 * @param columnIndex Indicates which column to sort the rows by.
		 * @param ascending The sort order.
		 */
		constructor(columnIndex: number, ascending: boolean) {
			this._columnIndex = columnIndex;
			this._ascending = ascending;
		}

		/**
		 * Gets or sets the column index.
		 */
		get columnIndex(): number {
			return this._columnIndex;
		}
		set columnIndex(value: number) {
			this._columnIndex = value;
		}

		/**
		 * Gets or sets the ascending.
		 */
		get ascending(): boolean {
			return this._ascending;
		}
		set ascending(value: boolean) {
			this._ascending = value;
		}
	}


	'use strict';

	/**
	 * Controls undo and redo operations in the @see:FlexSheet.
	 */
	export class UndoStack {
		private MAX_STACK_SIZE = 500;
		private _owner: FlexSheet;
		private _stack = [];
		private _pointer = -1;
		private _pendingAction: _UndoAction;
		private _resizingTriggered = false;

		/**
		 * Initializes a new instance of the @see:UndoStack class.
		 *
		 * @param owner The @see:FlexSheet control that the @see:UndoStack works for.
		 */
        constructor(owner: FlexSheet) {
            var self = this;

            self._owner = owner;

			// Handles the cell edit action for editing cell
            self._owner.prepareCellForEdit.addHandler(self._initCellEditAction, self);
            self._owner.cellEditEnded.addHandler((sender: wjcGrid.FlexGrid, args: wjcGrid.CellEditEndingEventArgs) => {
                // For edit cell content.
                if (args.data && (args.data.keyCode === 46 || args.data.keyCode === 8)) {
                    return;
                }
                if (self._pendingAction instanceof _EditAction && !(<_EditAction>self._pendingAction).isPaste) {
                    self._afterProcessCellEditAction(self);
				}
            }, self);

            // Handles the cell edit action for copy\paste operation
            self._owner.pasting.addHandler(self._initCellEditActionForPasting, self);
            self._owner.pastingCell.addHandler((sender: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
                if (self._pendingAction instanceof _EditAction) {
                    (<_EditAction>self._pendingAction).updateForPasting(e.range);
                } else if (self._pendingAction instanceof _CutAction) {
                    (<_CutAction>self._pendingAction).updateForPasting(e.range);
                }
            }, self);
            self._owner.pasted.addHandler(() => {
				// For paste content to the cell.
                if (self._pendingAction instanceof _EditAction && (<_EditAction>self._pendingAction).isPaste) {
                    self._afterProcessCellEditAction(self);
                } else if (self._pendingAction instanceof _CutAction) {
                    self._pendingAction.saveNewState();
                    self._addAction(self._pendingAction);
                    self._pendingAction = null;
                }
            }, self);

			// Handles the resize column action
            self._owner.resizingColumn.addHandler((sender: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
                if (!self._resizingTriggered) {
                    self._pendingAction = new _ColumnResizeAction(self._owner, e.panel, e.col);
                    self._resizingTriggered = true;
				}
            }, self)
            self._owner.resizedColumn.addHandler((sender: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
                if (self._pendingAction instanceof _ColumnResizeAction && self._pendingAction.saveNewState()) {
                    self._addAction(self._pendingAction);
				}
                self._pendingAction = null;
                self._resizingTriggered = false;
            }, self);

			// Handles the resize row action
            self._owner.resizingRow.addHandler((sender: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
                if (!self._resizingTriggered) {
                    self._pendingAction = new _RowResizeAction(self._owner, e.panel, e.row);
                    self._resizingTriggered = true;
				}
            }, self);
            self._owner.resizedRow.addHandler((sender: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
                if (self._pendingAction instanceof _RowResizeAction && self._pendingAction.saveNewState()) {
                    self._addAction(self._pendingAction);
				}
                self._pendingAction = null;
                self._resizingTriggered = false;
            }, self);

			// Handle the changing rows\columns position action.
            self._owner.draggingRowColumn.addHandler((sender: wjcGrid.FlexGrid, e: DraggingRowColumnEventArgs) => {
				if (e.isShiftKey) {
					if (e.isDraggingRows) {
                        self._pendingAction = new _RowsChangedAction(self._owner);
					} else {
                        self._pendingAction = new _ColumnsChangedAction(self._owner);
					}
				}
            }, self);
            self._owner.droppingRowColumn.addHandler(() => {
                if (self._pendingAction && self._pendingAction.saveNewState()) {
                    self._addAction(self._pendingAction);
				}
                self._pendingAction = null;
            }, self);
		}

		/**
		 * Checks whether an undo action can be performed.
		 */
		get canUndo(): boolean {
			return this._pointer > -1 && this._pointer < this._stack.length;
		}

		/**
		 * Checks whether a redo action can be performed.
		 */
		get canRedo(): boolean {
			return this._pointer + 1 > -1 && this._pointer + 1 < this._stack.length;
		}

		/**
		 * Occurs after the undo stack has changed.
		 */
		undoStackChanged = new wjcCore.Event();
		/**
		 * Raises the @see:undoStackChanged event.
		 */
		onUndoStackChanged() {
			this.undoStackChanged.raise(this);
		}

		/**
		 * Undo the last action.
		 */
		undo() {
			var action: _UndoAction;
			if (this.canUndo) {
				action = this._stack[this._pointer];
				this._beforeUndoRedo(action);
				action.undo();
				this._pointer--;
				this.onUndoStackChanged();
			}
		}

		/**
		 * Redo the last undone action.
		 */
		redo() {
			var action: _UndoAction;
			if (this.canRedo) {
				this._pointer++;
				action = this._stack[this._pointer];
				this._beforeUndoRedo(action);
				action.redo();
				this.onUndoStackChanged();
			}
		}

		/*
		 * Add an action to the undo stack.
		 *
		 * @param action The @see:_UndoAction to add to the stack.
		 */
		_addAction(action: _UndoAction) {
			// trim stack
			if (this._stack.length > 0 && this._stack.length > this._pointer + 1) {
				this._stack.splice(this._pointer + 1, this._stack.length - this._pointer - 1);
			}
			if (this._stack.length >= this.MAX_STACK_SIZE) {
				this._stack.splice(0, this._stack.length - this.MAX_STACK_SIZE + 1);
			}

			// update pointer and add action to stack
			this._pointer = this._stack.length;
			this._stack.push(action);
			this.onUndoStackChanged();
        }

        /*
         * Removes the last undo action from the undo stack.
         */
        _pop(): _UndoAction {
            var action = this._stack[this._pointer];
            this._pointer--;
            return action;
        }

		/**
		 * Clears the undo stack.
		 */
		clear() {
			this._stack.length = 0;
		}

        // initialize the cell edit action.
        private _initCellEditAction(sender: any, args: wjcGrid.CellRangeEventArgs) {
            this._pendingAction = new _EditAction(this._owner, args.range);
		}

		// initialize the cell edit action for pasting action.
        private _initCellEditActionForPasting() {
            if (this._owner._cutData) {
                this._pendingAction = new _CutAction(this._owner);
            } else {
                this._pendingAction = new _EditAction(this._owner);
                (<_EditAction>this._pendingAction).markIsPaste();
            }
        }

		// after processing the cell edit action.
		private _afterProcessCellEditAction(self: UndoStack) {
			if (self._pendingAction instanceof _EditAction && self._pendingAction.saveNewState()) {
				self._addAction(this._pendingAction);
			}
			self._pendingAction = null;
		}

		// Called before an action is undone or redone.
		private _beforeUndoRedo(action: _UndoAction) {
			this._owner.selectedSheetIndex = action.sheetIndex;
		}
	}


    'use strict';

    /*
     * Defines a value filter for a column on a @see:FlexSheet control.
     *
     * Value filters contain an explicit list of values that should be 
     * displayed by the sheet.
     */
    export class _FlexSheetValueFilter extends wjcGridFilter.ValueFilter {
        /*
         * Gets a value that indicates whether a value passes the filter.
         *
         * @param value The value to test.
         */
        apply(value): boolean {
            var flexSheet = <FlexSheet>this.column.grid;

            if (!(flexSheet instanceof FlexSheet)) {
                return false;
            }

            // values? accept everything
            if (!this.showValues || !Object.keys(this.showValues).length) {
                return true;
            }

            value = flexSheet.getCellValue(value, this.column.index, true);

            // apply conditions
            return this.showValues[value] != undefined;
        }
    }


    'use strict';

    /*
     * The editor used to inspect and modify @see:FlexSheetValueFilter objects.
     *
     * This class is used by the @see:FlexSheetFilter class; you 
     * rarely use it directly.
     */
    export class _FlexSheetValueFilterEditor extends wjcGridFilter.ValueFilterEditor {
        /*
         * Updates editor with current filter settings.
         */
        updateEditor() {
            var col = this.filter.column,
                flexSheet = <FlexSheet>col.grid,
                colIndex = col.index,
                values = [],
                keys = {},
                row: wjcGrid.Row,
                mergedRange: wjcGrid.CellRange,
                value: any,
                sv: any,
                currentFilterResult: boolean,
                otherFilterResult: boolean,
                text: string;

            // get list of unique values
            if (this.filter.uniqueValues) {  // explicit list provided
                super.updateEditor();
                return;
            }

            // format and add unique values to the 'values' array
            for (var i = 0; i < flexSheet.rows.length; i++) {
                // Get the result of current filter for current row.
                currentFilterResult = this.filter.apply(i);
                // Get the result of other filters for current row.
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
            
            // check the items that are currently selected
            var showValues = this.filter.showValues;
            if (!showValues || Object.keys(showValues).length == 0) {
                for (var i = 0; i < values.length; i++) {
                    values[i].show = true;
                }
            } else {
                for (var key in showValues) {
                    for (var i = 0; i < values.length; i++) {
                        if (values[i].text == key) {
                            values[i].show = true;
                            break;
                        }
                    }
                }
            }

            // honor isContentHtml property
            this['_lbValues'].isContentHtml = col.isContentHtml;

            // load filter and apply immediately
            this['_cmbFilter'].text = this.filter.filterText;
            this['_filterText'] = this['_cmbFilter'].text.toLowerCase();

            // show the values
            this['_view'].pageSize = this.filter.maxValues;
            this['_view'].sourceCollection = values;
            this['_view'].moveCurrentToPosition(-1);
        }
    }


    'use strict';

    /*
     * Defines a condition filter for a column on a @see:FlexSheet control.
     *
     * Condition filters contain two conditions that may be combined
     * using an 'and' or an 'or' operator.
     *
     * This class is used by the @see:FlexSheetFilter class; you will
     * rarely use it directly.
     */
    export class _FlexSheetConditionFilter extends wjcGridFilter.ConditionFilter {
       /*
        * Returns a value indicating whether a value passes this filter.
        *
        * @param value The value to test.
        */
        apply(value): boolean {
            var col = this.column,
                flexSheet = <FlexSheet>col.grid,
                c1 = this.condition1,
                c2 = this.condition2,
                compareVal: any,
                compareVal1: any,
                compareVal2: any;

            if (!(flexSheet instanceof FlexSheet)) {
                return false;
            }

            // no binding or not active? accept everything
            if (!this.isActive) {
                return true;
            }

            // retrieve the value
            compareVal = flexSheet.getCellValue(value, col.index);
            compareVal1 = compareVal2 = compareVal;
            if (col.dataMap) {
                compareVal = col.dataMap.getDisplayValue(compareVal);
                compareVal1 = compareVal2 = compareVal;
            } else if (wjcCore.isDate(compareVal)) {
                if (wjcCore.isString(c1.value) || wjcCore.isString(c2.value)) { // comparing times
                    compareVal = flexSheet.getCellValue(value, col.index, true);
                    compareVal1 = compareVal2 = compareVal;
                }
            } else if (wjcCore.isNumber(compareVal)) { 
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

            // apply conditions
            var rv1 = c1.apply(compareVal1),
                rv2 = c2.apply(compareVal2);

            // combine results
            if (c1.isActive && c2.isActive) {
                return this.and ? rv1 && rv2 : rv1 || rv2;
            } else {
                return c1.isActive ? rv1 : c2.isActive ? rv2 : true;
            }
        }
    }


    'use strict';

    /*
     * Defines a filter for a column on a @see:FlexSheet control.
     *
     * The @see:FlexSheetColumnFilter contains a @see:FlexSheetConditionFilter and a
     * @see:FlexSheetValueFilter; only one of them may be active at a time.
     *
     * This class is used by the @see:FlexSheetFilter class; you 
     * rarely use it directly.
     */
    export class _FlexSheetColumnFilter extends wjcGridFilter.ColumnFilter {
        /*
         * Initializes a new instance of the @see:FlexSheetColumnFilter class.
         *
         * @param owner The @see:FlexSheetFilter that owns this column filter.
         * @param column The @see:Column to filter.
         */
        constructor(owner: _FlexSheetFilter, column: wjcGrid.Column) {
            super(owner, column);
            
            this['_valueFilter'] = new _FlexSheetValueFilter(column);
            this['_conditionFilter'] = new _FlexSheetConditionFilter(column);
        }
    }


    'use strict';

    /*
     * The editor used to inspect and modify column filters.
     *
     * This class is used by the @see:FlexSheetFilter class; you 
     * rarely use it directly.
     */
    export class _FlexSheetColumnFilterEditor extends wjcGridFilter.ColumnFilterEditor {
       /*
        * Initializes a new instance of the @see:FlexSheetColumnFilterEditor class.
        *
        * @param element The DOM element that hosts the control, or a selector 
        * for the host element (e.g. '#theCtrl').
        * @param filter The @see:FlexSheetColumnFilter to edit.
        * @param sortButtons Whether to show sort buttons in the editor.
        */
        constructor(element: any, filter: _FlexSheetColumnFilter, sortButtons = true) {
            super(element, filter, sortButtons);

            var self = this,
                btnAsc: Node,
                btnDsc: Node;


            if (sortButtons) {
                this['_divSort'].style.display = '';
            }

            btnAsc = this.cloneElement(this['_btnAsc']);
            btnDsc = this.cloneElement(this['_btnDsc']);

            this['_btnAsc'].parentNode.replaceChild(btnAsc, this['_btnAsc']);
            this['_btnDsc'].parentNode.replaceChild(btnDsc, this['_btnDsc']);
            btnAsc.addEventListener('click', (e: MouseEvent) => {
                self._sortBtnClick(e, true);
            });
            btnDsc.addEventListener('click', (e: MouseEvent) => {
                self._sortBtnClick(e, false);
            });
        }

        // shows the value or filter editor
        _showFilter(filterType: wjcGridFilter.FilterType) {
            
            // create editor if we have to
            if (filterType == wjcGridFilter.FilterType.Value && this['_edtVal'] == null) {
                this['_edtVal'] = new _FlexSheetValueFilterEditor(this['_divEdtVal'], this.filter.valueFilter);
            }
           
            super._showFilter(filterType);
        }

        // sort button click event handler
        private _sortBtnClick(e: MouseEvent, asceding: boolean) {
            var column = this.filter.column,
                sortManager = (<FlexSheet>column.grid).sortManager,
                sortIndex: number,
                offset: number,
                sortItem: ColumnSortDescription;

            e.preventDefault();
            e.stopPropagation();

            sortIndex = sortManager.checkSortItemExists(column.index);
            if (sortIndex > -1) {
                // If the sort item for current column doesn't exist, we add new sort item for current column
                sortManager.sortDescriptions.moveCurrentToPosition(sortIndex)
                sortItem = sortManager.sortDescriptions.currentItem;
                sortItem.ascending = asceding;
                offset = -sortIndex;
            } else {
                sortManager.addSortLevel(column.index, asceding);
                offset = -(sortManager.sortDescriptions.items.length - 1);
            }
            // Move sort item for current column to first level.
            sortManager.moveSortLevel(offset);
            sortManager.commitSort();

            // show current filter state
            this.updateEditor();

            // raise event so caller can close the editor and apply the new filter
            this.onButtonClicked();
        }

        // Clone dom element and its child node
        private cloneElement(element: HTMLElement): Node {
            var cloneEle = element.cloneNode();

            while (element.firstChild) {
                cloneEle.appendChild(element.lastChild);
            }

            return cloneEle;
        }
    }


    'use strict';

    /*
     * Implements an Excel-style filter for @see:FlexSheet controls.
     *
     * To enable filtering on a @see:FlexSheet control, create an instance 
     * of the @see:_FlexSheetFilter and pass the grid as a parameter to the 
     * constructor. 
     */
    export class _FlexSheetFilter extends wjcGridFilter.FlexGridFilter {

        /*
         * Gets or sets the current filter definition as a JSON string.
         */
        get filterDefinition(): string {
            var def = {
                defaultFilterType: this.defaultFilterType,
                filters: []
            }
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
                    } else if (cf.valueFilter.isActive) {
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
        }
        set filterDefinition(value: string) {
            var def = JSON.parse(wjcCore.asString(value));
            this.clear();
            this.defaultFilterType = def.defaultFilterType;
            for (var i = 0; i < def.filters.length; i++) {
                var cfs = def.filters[i],
                    col = this.grid.columns[cfs.columnIndex],
                    cf = this.getColumnFilter(col, true);
                if (cf) {
                    switch (cfs.type) {
                        case 'condition':
                            var cfc = cf.conditionFilter;
                            cfc.condition1.value = col.dataType == wjcCore.DataType.Date // handle times/times: TFS 125144, 143453
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
        }
        /*
         * Applies the current column filters to the sheet.
         */
        apply() {
            var self = this;
            self.grid.deferUpdate(() => {
                var row: wjcGrid.Row;
                for (var i = 0; i < self.grid.rows.length; i++) {
                    row = self.grid.rows[i];
                    if (row instanceof HeaderRow) {
                        continue;
                    }
                    if (row instanceof wjcGrid.GroupRow) {
                        row.visible = self._checkGroupVisible((<wjcGrid.GroupRow>row).getCellRange());
                    } else {
                        row.visible = self['_filter'](i);
                    }
                }

                // and fire the event
                if (!(<FlexSheet>self.grid)._isCopying && !(<FlexSheet>self.grid)._resettingFilter) {
                    self.onFilterApplied();
                }
            });
        }

        /*
         * Shows the filter editor for the given grid column.
         *
         * @param col The @see:Column that contains the filter to edit.
         * @param ht A @see:wijmo.chart.HitTestInfo object containing the range of the cell that
         * triggered the filter display.
         */
        editColumnFilter(col: any, ht?: wjcGrid.HitTestInfo) {

            // remove current editor
            this.closeEditor();

            // get column by name or by reference
            col = wjcCore.isString(col)
                ? this.grid.columns.getColumn(col)
                : wjcCore.asType(col, wjcGrid.Column, false);

            // raise filterChanging event
            var e = new wjcGrid.CellRangeEventArgs(this.grid.cells, new wjcGrid.CellRange(-1, col.index));
            this.onFilterChanging(e);
            if (e.cancel) {
                return;
            }
            e.cancel = true; // assume the changes will be canceled

            // get the filter and the editor
            var div = document.createElement('div'),
                flt = this.getColumnFilter(col),
                edt = new _FlexSheetColumnFilterEditor(div, flt, this.showSortButtons);
            wjcCore.addClass(div, 'wj-dropdown-panel');

            // handle RTL
            if (this.grid.rightToLeft) {
                div.dir = 'rtl';
            }

            // apply filter when it changes
            edt.filterChanged.addHandler(() => {
                e.cancel = false; // the changes were not canceled
                setTimeout(() => { // apply after other handlers have been called
                    if (!e.cancel) {
                        this.apply();
                    }
                });
            });

            // close editor when editor button is clicked
            edt.buttonClicked.addHandler(() => {
                this.closeEditor();
                this.onFilterChanged(e);
            });

            // close editor when it loses focus (changes are not applied)
            edt.lostFocus.addHandler(() => {
                setTimeout(() => {
                    var ctl = wjcCore.Control.getControl(this['_divEdt']);
                    if (ctl && !ctl.containsFocus()) {
                        this.closeEditor();
                    }
                }, 10); //200); // let others handle it first
            });

            // get the header cell to position editor
            var ch = this.grid.columnHeaders,
                r = ht ? ht.row : ch.rows.length - 1,
                c = ht ? ht.col : col.index,
                rc = ch.getCellBoundingRect(r, c),
                hdrCell = <HTMLElement>document.elementFromPoint(rc.left + rc.width / 2, rc.top + rc.height / 2);
            hdrCell = <HTMLElement>wjcCore.closest(hdrCell, '.wj-cell');

            // show editor and give it focus
            if (hdrCell) {
                wjcCore.showPopup(div, hdrCell, false, false, false);
            } else {
                wjcCore.showPopup(div, rc);
            }
            edt.focus();

            // save reference to editor
            this['_divEdt'] = div;
            this['_edtCol'] = col;
        }

        /*
         * Gets the filter for the given column.
         *
         * @param col The @see:Column that the filter applies to (or column name or index).
         * @param create Whether to create the filter if it does not exist.
         */
        getColumnFilter(col: any, create = true): _FlexSheetColumnFilter {

            // get the column by name or index, check type
            if (wjcCore.isString(col)) {
                col = this.grid.columns.getColumn(col);
            } else if (wjcCore.isNumber(col)) {
                col = this.grid.columns[col];
            }
            if (!col) {
                return null;
            }
            col = wjcCore.asType(col, wjcGrid.Column);

            // look for the filter
            for (var i = 0; i < this['_filters'].length; i++) {
                if (this['_filters'][i].column == col) {
                    return this['_filters'][i];
                }
            }

            // not found, create one now
            if (create) {
                var cf = new _FlexSheetColumnFilter(this, col);
                this['_filters'].push(cf);
                return cf;
            }

            // not found, not created
            return null;
        }

        // Check the visiblity of the group.
        private _checkGroupVisible(range: wjcGrid.CellRange): boolean {
            var groupVisible = true,
                row: wjcGrid.Row;
            for (var i = range.topRow + 1; i <= range.bottomRow; i++) {
                row = this.grid.rows[i];
                if (row) {
                    if (row instanceof wjcGrid.GroupRow) {
                        groupVisible = this._checkGroupVisible((<wjcGrid.GroupRow>row).getCellRange());
                    } else {
                        groupVisible = this['_filter'](i);
                        if (groupVisible) {
                            break;
                        }
                    }
                }
            }
            return groupVisible;
        }
    }


