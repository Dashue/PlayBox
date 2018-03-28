import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SearchPanelDemoComponent} from './search-panel-demo.component';
import {SearchPanelRoutingModule} from './search-panel-routing.module';
import {HfcComponentsModule} from 'hfc-components/dist';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SearchPanelRoutingModule,
    HfcComponentsModule
  ],
  declarations: [
    SearchPanelDemoComponent
  ],
  exports: []
})
export class SearchPanelModule {}
