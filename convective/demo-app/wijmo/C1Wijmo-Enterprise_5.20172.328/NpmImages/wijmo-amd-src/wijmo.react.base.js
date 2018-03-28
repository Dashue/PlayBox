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
define(["require", "exports", "wijmo/wijmo", "wijmo/wijmo.react.base", "react-dom", "react"], function (require, exports, wjcCore, wjcSelf, ReactDOM, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window['wijmo'] = window['wijmo'] || {};
    window['wijmo']['react'] = window['wijmo']['react'] || {};
    window['wijmo']['react']['base'] = wjcSelf;
    var ComponentBase = (function (_super) {
        __extends(ComponentBase, _super);
        function ComponentBase(props, controlType) {
            var _this = _super.call(this, props) || this;
            _this.props = props;
            _this.controlType = controlType;
            return _this;
        }
        ComponentBase.prototype.render = function () {
            return React.createElement('div');
        };
        ComponentBase.prototype.componentDidMount = function () {
            var host = ReactDOM.findDOMNode(this), control = new this.controlType(host), cprops = this.props;
            var props = {};
            for (var prop in cprops) {
                if (prop in control) {
                    props[prop] = cprops[prop];
                }
                else {
                    switch (prop) {
                        case 'className':
                            wjcCore.addClass(host, cprops.className);
                            break;
                        case 'style':
                            wjcCore.setCss(host, cprops.style);
                            break;
                        default:
                            if (host[prop] != null) {
                                host[prop] = cprops[prop];
                            }
                            break;
                    }
                }
            }
            control.initialize(props);
            if (wjcCore.isFunction(cprops.initialized)) {
                cprops.initialized(control);
            }
            return control;
        };
        ComponentBase.prototype.componentWillUnmount = function () {
            this._getControl(this).dispose();
        };
        ComponentBase.prototype.shouldComponentUpdate = function (nextProps) {
            var ctl = this._getControl(this);
            this._copy(ctl, nextProps);
            return true;
        };
        ComponentBase.prototype._getControl = function (component) {
            var host = ReactDOM.findDOMNode(component);
            return wjcCore.Control.getControl(host);
        };
        ComponentBase.prototype._copy = function (dst, src) {
            for (var p in src) {
                var value = src[p];
                if (p in src && !this._sameValue(dst[p], value)) {
                    if (p == 'className') {
                        if (dst.hostElement) {
                            wjcCore.addClass(dst.hostElement, src[p]);
                        }
                    }
                    else if (p == 'style') {
                        if (dst.hostElement) {
                            wjcCore.setCss(dst.hostElement, src[p]);
                        }
                    }
                    else if (wjcCore.isPrimitive(value) || p === 'itemsSource') {
                        dst[p] = value;
                    }
                    else if (wjcCore.isObject(value)) {
                        this._copy(dst[p], src[p]);
                    }
                    else if (wjcCore.isArray(value) && wjcCore.isArray(dst[p])) {
                        var dstArr = dst[p], srcArr = value;
                        if (srcArr.length == dstArr.length) {
                            for (var i = 0; i < srcArr.length; i++) {
                                this._copy(dstArr[i], srcArr[i]);
                            }
                        }
                    }
                }
            }
        };
        ComponentBase.prototype._sameValue = function (v1, v2) {
            return v1 == v2 || wjcCore.DateTime.equals(v1, v2);
        };
        return ComponentBase;
    }(React.Component));
    exports.ComponentBase = ComponentBase;
});
//# sourceMappingURL=wijmo.react.base.js.map