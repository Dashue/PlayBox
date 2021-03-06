"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_chart_1 = require("wijmo/wijmo.angular2.chart");
var wijmo_angular2_chart_interaction_1 = require("wijmo/wijmo.angular2.chart.interaction");
var AxisScrollbar_1 = require("./AxisScrollbar");
var DataSvc_1 = require("./services/DataSvc");
'use strict';
// The Explorer application root component.
var AppCmp = (function () {
    function AppCmp(dataSvc) {
        this.dataSvc = dataSvc;
        this.data = this.dataSvc.getData();
    }
    AppCmp.prototype.chartRendered = function (chart) {
        // create Scrollbar
        if (!this.axisXScrollbar) {
            this.axisXScrollbar = new AxisScrollbar_1.AxisScrollbar(chart.axes[0], {
                minScale: 0.02
            });
        }
        if (!this.axisYScrollbar) {
            this.axisYScrollbar = new AxisScrollbar_1.AxisScrollbar(chart.axes[1], {
                buttonsVisible: false,
                minScale: 0.05
            });
        }
    };
    return AppCmp;
}());
AppCmp = __decorate([
    core_1.Component({
        selector: 'app-cmp',
        templateUrl: 'src/app.html'
    }),
    __param(0, core_1.Inject(DataSvc_1.DataSvc))
], AppCmp);
exports.AppCmp = AppCmp;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_chart_1.WjChartModule, wijmo_angular2_chart_interaction_1.WjChartInteractionModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
        declarations: [AppCmp],
        providers: [DataSvc_1.DataSvc],
        bootstrap: [AppCmp]
    })
], AppModule);
exports.AppModule = AppModule;
core_1.enableProdMode();
// Bootstrap application with hash style navigation and global services.
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.js.map