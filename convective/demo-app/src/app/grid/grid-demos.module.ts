import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {WjGridModule} from 'wijmo/wijmo.angular2.grid';
import {GridDemosRoutingModule} from './grid-demos-routing.module';
import {ColumnSizingComponent} from './column-sizing.component';
import {ColumnOrderingComponent} from './column-ordering.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WjGridModule,
    GridDemosRoutingModule
  ],
  declarations: [
    ColumnSizingComponent,
    ColumnOrderingComponent
  ]
})
export class GridDemosModule {}
