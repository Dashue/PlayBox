import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import {MaintenanceRoutingModule} from './maintenance-routing.module';
import {MaintenanceComponent} from './maintenance.component';
import {MaintenanceService} from './maintenance.service';
import {DynamicFormComponent} from './dynamic-form/dynamic-form.component';
import {ApiService} from '../shared/api/api.service';
import {ConfigService} from '../config.service';
import {HfcComponentsModule} from 'hfc-components/dist';
import {GridModule} from '../grid/grid.module';
import {LocationComponent} from '../location/location.component';
import {LocationService} from '../location/location.service';
import {LocationSearchFormComponent} from '../location/location-search-form/location-search-form.component';
import {DateService} from '../shared/date.service';
import {StaticLookupsService} from '../static-lookups.service';
import {LocationCreateFormComponent} from '../location/location-create-form/location-create-form.component';
import {CreateRowComponent} from './create-row/create-row.component';

export class LocationModule {}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    MaintenanceRoutingModule,
    HfcComponentsModule.forRoot(),
    GridModule
  ],
  declarations: [
    MaintenanceComponent,
    DynamicFormComponent,
    LocationComponent,
    LocationSearchFormComponent,
    LocationCreateFormComponent,
    CreateRowComponent
  ],
  providers: [
    ApiService,
    ConfigService,
    DateService,
    LocationService,
    MaintenanceService,
    StaticLookupsService
  ]
})
export class MaintenanceModule {}
