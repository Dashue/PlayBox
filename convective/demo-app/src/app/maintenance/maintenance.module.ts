import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {WjGridModule} from 'wijmo/wijmo.angular2.grid';
import {MaintenanceRoutingModule} from './maintenance-routing.module';
import {MaintenanceComponent} from './maintenance.component';
import {MaintenanceService} from './maintenance.service';
import {DynamicFormComponent} from './dynamic-form/dynamic-form.component';
import {MdPaginatorModule} from '@angular/material';
import {GridComponent} from '../grid/grid.component';
import {ColumnPickerComponent} from '../grid/column-picker.component';
import {ConfirmationDialogComponent} from '../shared/confirmation-dialog.component';
import {HfcComponentsModule} from 'hfc-components/dist';
import {SelectComponent} from '../grid/select/select.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaintenanceRoutingModule,
    MdPaginatorModule,
    WjGridModule,
    HfcComponentsModule.forRoot()
  ],
  declarations: [
    MaintenanceComponent,
    DynamicFormComponent,
    GridComponent,
    ColumnPickerComponent,
    ConfirmationDialogComponent,
    SelectComponent
  ],
  providers: [MaintenanceService],
  entryComponents: [ColumnPickerComponent, ConfirmationDialogComponent]
})
export class MaintenanceModule {}
