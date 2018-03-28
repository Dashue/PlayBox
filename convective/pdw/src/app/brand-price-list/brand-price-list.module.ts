import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HfcComponentsModule} from 'hfc-components/dist';
import {SharedModule} from '../shared/shared.module';
import {ApiService} from '../shared/api/api.service';
import {BrandPriceListRoutingModule} from './brand-price-list-routing.module';
import {BrandPriceListComponent} from './brand-price-list.component';
import {
  BrandPriceListSearchFormComponent
} from './brand-price-list-search-form/brand-price-list-search-form.component';
import {BrandSearchComponent} from './brand-search/brand-search.component';
import {BrandSearchFormComponent} from './brand-search/brand-search-form/brand-search-form.component';
import {BrandService} from './brand.service';
import {ItemPriceListService} from '../item-price-list/item-price-list.service';
import {DateService} from '../shared/date.service';
import {GridModule} from '../grid/grid.module';
import {LookupService} from '../shared/lookup.service';
import {StaticLookupsService} from '../static-lookups.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HfcComponentsModule.forRoot(),
    BrandPriceListRoutingModule,
    GridModule
  ],
  declarations: [
    BrandPriceListComponent,
    BrandPriceListSearchFormComponent,
    BrandSearchComponent,
    BrandSearchFormComponent
  ],
  providers: [
    ApiService,
    BrandService,
    DateService,
    ItemPriceListService,
    LookupService,
    StaticLookupsService
  ]
})
export class BrandPriceListModule {}
