import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HfcComponentsModule} from 'hfc-components/dist';
import {SharedModule} from '../shared/shared.module';
import {ItemSearchModule} from '../shared/item-search/item-search.module';
import {ApiService} from '../shared/api/api.service';

import {ItemBasePricesRoutingModule} from './item-base-prices-routing.module';
import {ItemBasePricesComponent} from './item-base-prices.component';
import {
  ItemBasePricesSearchFormComponent
} from './item-base-prices-search-form/item-base-prices-search-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HfcComponentsModule.forRoot(),
    ItemBasePricesRoutingModule,
    ItemSearchModule
  ],
  declarations: [
    ItemBasePricesComponent,
    ItemBasePricesSearchFormComponent
  ],
  providers: [ApiService]
})
export class ItemBasePricesModule {}
