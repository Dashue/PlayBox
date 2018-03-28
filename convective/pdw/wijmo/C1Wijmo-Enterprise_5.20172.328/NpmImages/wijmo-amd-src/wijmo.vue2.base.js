define(["require", "exports", "wijmo/wijmo", "wijmo/wijmo.vue2.base"], function (require, exports, wjcCore, wjcSelf) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window['wijmo'] = window['wijmo'] || {};
    window['wijmo']['vue2'] = window['wijmo']['vue2'] || {};
    window['wijmo']['vue2']['base'] = wjcSelf;
    function _getProps(ctlClass, extraProps) {
        var cls = window, ns = ctlClass.split('.');
        for (var i = 0; i < ns.length && cls != null; i++) {
            cls = cls[ns[i]];
        }
        if (!cls)
            return null;
        var p = ['control', 'initialized'];
        for (var proto = cls.prototype; proto != Object.prototype; proto = Object.getPrototypeOf(proto)) {
            var props = Object.getOwnPropertyNames(proto);
            for (var i = 0; i < props.length; i++) {
                var prop = props[i], pd = Object.getOwnPropertyDescriptor(proto, prop), eventRaiser = prop.match(/^on[A-Z]/);
                if (pd.set || eventRaiser) {
                    if (eventRaiser) {
                        prop = prop[2].toLowerCase() + prop.substr(3);
                    }
                    if (p.indexOf(prop) < 0 && !prop.match(/disabled|required/)) {
                        p.push(prop);
                    }
                }
            }
        }
        if (extraProps) {
            Array.prototype.push.apply(p, extraProps);
        }
        return p;
    }
    exports._getProps = _getProps;
    function _initialize(component, ctl) {
        var props = [];
        for (var prop in component.$options.propsData) {
            props.push(prop);
        }
        props.sort();
        props.forEach(function (prop) {
            if (prop in ctl && !(ctl[prop] instanceof wjcCore.Event) && !wjcCore.isUndefined(component[prop])) {
                ctl[prop] = component[prop];
                component.$watch(prop, _updateControl.bind({ ctl: ctl, prop: prop }));
            }
        });
        function _updateControl(newValue) {
            this.ctl[this.prop] = newValue;
        }
        props.forEach(function (prop) {
            if (ctl[prop] instanceof wjcCore.Event) {
                var event = ctl[prop];
                if (wjcCore.isFunction(component[prop])) {
                    event.addHandler(component[prop], ctl);
                }
            }
        });
        if (component.control && component.$parent) {
            component.$parent[component.control] = ctl;
        }
        if (wjcCore.isFunction(component.initialized)) {
            component.initialized(ctl);
        }
        return ctl;
    }
    exports._initialize = _initialize;
});
//# sourceMappingURL=wijmo.vue2.base.js.map