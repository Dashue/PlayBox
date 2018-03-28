import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from '../auth.service';
import {CustomerItemPricingComponent} from './customer-item-pricing.component';
import {ItemSearchComponent} from '../shared/item-search/item-search.component';
import {CustomerSearchComponent} from './customer-search/customer-search.component';
import {ShipLocationSearchComponent} from './ship-location-search/ship-location-search.component';
import {ConfirmationDetailsComponent} from './confirmation-details/confirmation-details.component';
import {
  MobileReportContainerComponent
} from './customer-item-report/mobile-report-container/mobile-report-container.component';

const routes: Routes = [
  {path: '', component: CustomerItemPricingComponent, children: [], canActivate: [AuthService]},
  {path: 'customer-search', component: CustomerSearchComponent, children: [], canActivate: [AuthService]},
  {path: 'item-search', component: ItemSearchComponent, children: [], canActivate: [AuthService]},
  {
    path: 'ship-location-search',
    component: ShipLocationSearchComponent,
    children: [],
    canActivate: [AuthService]
  },
  {
    path: 'confirmations/:confirmationId/items/:itemKey',
    component: ConfirmationDetailsComponent,
    children: [],
    canActivate: [AuthService]
  },
  {
    path: 'report',
    component: MobileReportContainerComponent,
    children: [],
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CustomerItemPricingRoutingModule {
}
