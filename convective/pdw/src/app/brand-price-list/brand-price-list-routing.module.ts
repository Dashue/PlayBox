import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthService} from '../auth.service';
import {BrandPriceListComponent} from './brand-price-list.component';
import {BrandSearchComponent} from './brand-search/brand-search.component';

const routes: Routes = [
  {path: '', component: BrandPriceListComponent, children: [], canActivate: [AuthService]},
  {path: 'brand-search', component: BrandSearchComponent, children: [], canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BrandPriceListRoutingModule {}
