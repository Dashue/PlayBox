import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthService} from '../auth.service';
import {ItemBasePricesComponent} from './item-base-prices.component';
import {ItemSearchComponent} from '../shared/item-search/item-search.component';
import {ItemSearchModule} from '../shared/item-search/item-search.module';
import {DateService} from '../shared/date.service';

const routes: Routes = [
  {path: '', component: ItemBasePricesComponent, children: [], canActivate: [AuthService]},
  {path: 'item-search', component: ItemSearchComponent, children: [], canActivate: [AuthService]}
];

@NgModule({
  imports: [
    ItemSearchModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [
    DateService
  ]
})
export class ItemBasePricesRoutingModule {}
