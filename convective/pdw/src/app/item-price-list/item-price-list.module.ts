import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HfcComponentsModule} from 'hfc-components/dist';
import {SharedModule} from '../shared/shared.module';
import {ItemPriceListComponent} from './item-price-list.component';
import {ItemPriceListRoutingModule} from './item-price-list-routing.module';
import {ItemPriceListService} from './item-price-list.service';
import {ApiService} from '../shared/api/api.service';
import {StaticLookupsService} from '../static-lookups.service';
import {
  ItemPriceListSearchFormComponent
} from './item-price-list-search-form/item-price-list-search-form.component';
import {ItemSearchModule} from '../shared/item-search/item-search.module';
import {DateService} from '../shared/date.service';
import {GridModule} from '../grid/grid.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HfcComponentsModule.forRoot(),
    ItemPriceListRoutingModule,
    ItemSearchModule,
    GridModule
  ],
  declarations: [
    ItemPriceListComponent,
    ItemPriceListSearchFormComponent
  ],
  providers: [
    ApiService,
    ItemPriceListService,
    StaticLookupsService,
    DateService
  ]
})
export class ItemPriceListModule {}
