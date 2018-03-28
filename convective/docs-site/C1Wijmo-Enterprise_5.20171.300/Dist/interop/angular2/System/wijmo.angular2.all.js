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
///<amd-module name='wijmo/wijmo.angular2.all'/>
System.register("wijmo/wijmo.angular2.all", ["wijmo/wijmo.angular2.input", "wijmo/wijmo.angular2.grid", "wijmo/wijmo.angular2.chart", "wijmo/wijmo.angular2.gauge", "wijmo/wijmo.angular2.core", "wijmo/wijmo.angular2.viewer"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var wjNg2Input, wjNg2Grid, wjNg2Chart, wjNg2Gauge, wjNg2Core, wjNg2Viewer;
    return {
        setters: [
            function (wjNg2Input_1) {
                wjNg2Input = wjNg2Input_1;
            },
            function (wjNg2Grid_1) {
                wjNg2Grid = wjNg2Grid_1;
            },
            function (wjNg2Chart_1) {
                wjNg2Chart = wjNg2Chart_1;
            },
            function (wjNg2Gauge_1) {
                wjNg2Gauge = wjNg2Gauge_1;
            },
            function (wjNg2Core_1) {
                wjNg2Core = wjNg2Core_1;
            },
            function (wjNg2Viewer_1) {
                wjNg2Viewer = wjNg2Viewer_1;
            }
        ],
        execute: function () {///<amd-module name='wijmo/wijmo.angular2.all'/>
            exports_1("wjNg2Input", wjNg2Input);
            exports_1("wjNg2Grid", wjNg2Grid);
            exports_1("wjNg2Chart", wjNg2Chart);
            exports_1("wjNg2Gauge", wjNg2Gauge);
            exports_1("wjNg2Core", wjNg2Core);
            exports_1("wjNg2Viewer", wjNg2Viewer);
            //export module wj.angular2 {
            //} 
        }
    };
});
