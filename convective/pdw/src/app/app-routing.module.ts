import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'customer-item-pricing',
    loadChildren: './customer-item-pricing/customer-item-pricing.module#CustomerItemPricingModule'},
  {path: 'brand-price-list',
    loadChildren: './brand-price-list/brand-price-list.module#BrandPriceListModule'},
  {path: 'item-price-list',
    loadChildren: './item-price-list/item-price-list.module#ItemPriceListModule'},
  {path: 'item-base-prices',
    loadChildren: './item-base-prices/item-base-prices.module#ItemBasePricesModule'},
  {path: 'help', loadChildren: './help/help.module#HelpModule'},
  {path: '**', component: PageNotFoundComponent, children: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
