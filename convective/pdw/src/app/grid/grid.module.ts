import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import {WjGridModule} from 'wijmo/wijmo.angular2.grid';
import {WjGridDetailModule} from 'wijmo/wijmo.angular2.grid.detail';
import {MdPaginatorModule} from '@angular/material';
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
import {BrandService} from '../brand-price-list/brand.service';
import {ItemService} from '../shared/item-search/item.service';
import {CustomersService} from '../customer-item-pricing/customers.service';
import {ShipLocationsService} from '../customer-item-pricing/ship-locations.service';
import {GridExportService} from './grid-export.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    MdPaginatorModule,
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
    BrandService,
    ConfigService,
    CustomersService,
    GridConfigurationService,
    GridDataService,
    GridInstanceService,
    ItemService,
    ShipLocationsService,
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
