import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthService} from '../auth.service';
import {ItemPriceListComponent} from './item-price-list.component';
import {ItemSearchComponent} from '../shared/item-search/item-search.component';

const routes: Routes = [
  {path: '', component: ItemPriceListComponent, children: [], canActivate: [AuthService]},
  {path: 'item-search', component: ItemSearchComponent, children: [], canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ItemPriceListRoutingModule {}
