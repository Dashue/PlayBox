import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdExpansionModule, MdInputModule, MdSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout/index';
import { SearchPanelComponent } from './search-panel/search-panel.component';
export { SearchPanelComponent } from './search-panel/search-panel.component';
var HfcComponentsModule = (function () {
    function HfcComponentsModule() {
    }
    /**
     * @return {?}
     */
    HfcComponentsModule.forRoot = function () {
        return {
            ngModule: HfcComponentsModule,
            providers: []
        };
    };
    return HfcComponentsModule;
}());
export { HfcComponentsModule };
HfcComponentsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MdCardModule,
                    MdButtonModule,
                    MdExpansionModule,
                    MdInputModule,
                    MdSelectModule,
                    FlexLayoutModule
                ],
                declarations: [
                    SearchPanelComponent
                ],
                exports: [
                    SearchPanelComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
HfcComponentsModule.ctorParameters = function () { return []; };
function HfcComponentsModule_tsickle_Closure_declarations() {
    /** @type {?} */
    HfcComponentsModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    HfcComponentsModule.ctorParameters;
}
