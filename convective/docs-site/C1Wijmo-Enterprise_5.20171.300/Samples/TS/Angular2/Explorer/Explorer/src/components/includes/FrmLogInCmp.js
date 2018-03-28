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
var wjcInput = require("wijmo/wijmo.input");
'use strict';
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var FrmBaseCmp_1 = require("./FrmBaseCmp");
var FrmLogInCmp = (function (_super) {
    __extends(FrmLogInCmp, _super);
    function FrmLogInCmp(popup) {
        var _this = _super.call(this) || this;
        _this.popup = popup;
        _this.createAccount = new core_1.EventEmitter();
        return _this;
    }
    FrmLogInCmp.prototype.hide = function (message) {
        if (this.popup) {
            this.popup.hide();
        }
        if (message) {
            alert(message);
        }
    };
    FrmLogInCmp.prototype.onCreateAccount = function () {
        this.createAccount.next(null);
    };
    return FrmLogInCmp;
}(FrmBaseCmp_1.FrmBaseCmp));
__decorate([
    core_1.Output()
], FrmLogInCmp.prototype, "createAccount", void 0);
FrmLogInCmp = __decorate([
    core_1.Component({
        selector: 'frm-log-in-cmp',
        templateUrl: 'src/components/includes/frmLogInCmp.html'
    }),
    __param(0, core_1.Inject(wjcInput.Popup)), __param(0, core_1.Optional())
], FrmLogInCmp);
exports.FrmLogInCmp = FrmLogInCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: FrmLogInCmp }
]);
var FrmLogInModule = (function () {
    function FrmLogInModule() {
    }
    return FrmLogInModule;
}());
FrmLogInModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, routing],
        declarations: [FrmLogInCmp],
    })
], FrmLogInModule);
exports.FrmLogInModule = FrmLogInModule;
//# sourceMappingURL=FrmLogInCmp.js.map