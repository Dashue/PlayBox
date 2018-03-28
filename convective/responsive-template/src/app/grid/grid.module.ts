import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import {WjGridModule} from 'wijmo/wijmo.angular2.grid';
import {WjGridDetailModule} from 'wijmo/wijmo.angular2.grid.detail';
import {MatPaginatorModule} from '@angular/material';
import {GridComponent} from './grid.component';
import {GridConfigurationComponent} from './grid-configuration.component';
import {GridConfigurationService} from './grid-configuration.service';
import {GridDataService} from './grid-data.service';
import {ColumnPickerDialog} from './column-picker.dialog';
import {ConfirmationDialog} from '../shared/confirmation.dialog';
import {SaveGridConfigConfirmationDialog} from './save-grid-config-confirmation.dialog';
import {ApiService} from '../shared/api/api.service';
import {ConfigService} from '../config.service';
import {GridInstanceService} from './grid-instance.service';
import {GridExportDialog} from './grid-export.dialog';
import {GridExportService} from './grid-export.service';
import {GridComponentService} from './grid-component.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    MatPaginatorModule,
    WjGridModule,
    WjGridDetailModule
  ],
  declarations: [
    GridComponent,
    GridConfigurationComponent,
    ColumnPickerDialog,
    ConfirmationDialog,
    SaveGridConfigConfirmationDialog,
    GridExportDialog
  ],
  providers: [
    ApiService,
    ConfigService,
    GridComponentService,
    GridConfigurationService,
    GridDataService,
    GridInstanceService,
    GridExportService
  ],
  exports: [
    GridComponent
  ],
  entryComponents: [
    ColumnPickerDialog,
    ConfirmationDialog,
    GridExportDialog,
    SaveGridConfigConfirmationDialog
  ]
})
export class GridModule {
}
