import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdButtonModule, MdCardModule, MdExpansionModule, MdInputModule, MdSelectModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchPanelComponent} from './search-panel/search-panel.component';

export * from './search-panel/search-panel.component';

@NgModule({
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
})
export class HfcComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HfcComponentsModule,
      providers: []
    };
  }
}
