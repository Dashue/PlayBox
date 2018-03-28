import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CustomerItemPricingComponent} from './customer-item-pricing.component';
import {SharedModule} from '../shared/shared.module';
import {HfcComponentsModule} from 'hfc-components/dist';
import {ApiService} from '../shared/api/api.service';
import {ConfigService} from '../config.service';
import {SoldItemListComponent} from './sold-item-list/sold-item-list.component';
import {CustomerItemReportComponent} from './customer-item-report/customer-item-report.component';
import {ItemSearchModule} from '../shared/item-search/item-search.module';
import {ShipLocationsService} from './ship-locations.service';
import {PriceBracketsService} from './price-brackets.service';
import {CustomersService} from './customers.service';
import {CustomerSearchComponent} from './customer-search/customer-search.component';
import {ItemPriceListService} from '../item-price-list/item-price-list.service';
import {DateService} from '../shared/date.service';
import {ShipLocationSearchComponent} from './ship-location-search/ship-location-search.component';
import {CustomerItemPricingService} from './customer-item-pricing.service';
import {CustomerItemsSoldService} from './customer-items-sold.service';
import {GridModule} from '../grid/grid.module';
import {CustomerConfirmationsService} from './customer-confirmations.service';
import {ConfirmationDetailsComponent} from './confirmation-details/confirmation-details.component';
import {NavService} from '../nav.service';
import {RouterTestingModule} from '@angular/router/testing';
import {MediaService, BreakPointRegistry} from '@angular/flex-layout';
import {AuthService} from '../auth.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MobileReportContainerComponent
} from './customer-item-report/mobile-report-container/mobile-report-container.component';
import {
  CustomerItemPricingSearchFormComponent
} from './customer-item-pricing-search-form/customer-item-pricing-search-form.component';
import {
  ShipLocationSearchFormComponent
} from './ship-location-search/ship-location-search-form/ship-location-search-form.component';
import {
  CustomerSearchFormComponent
} from './customer-search/customer-search-form/customer-search-form.component';
import {MockMatchMediaProvider} from '@angular/flex-layout/media-query/mock/mock-match-media';

describe('CustomerItemPricingComponent', () => {
  let component: CustomerItemPricingComponent;
  let fixture: ComponentFixture<CustomerItemPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
          HfcComponentsModule.forRoot(),
          ItemSearchModule,
          RouterTestingModule,
          NoopAnimationsModule,
          GridModule
        ],
        declarations: [
          CustomerItemPricingComponent,
          CustomerItemPricingSearchFormComponent,
          SoldItemListComponent,
          CustomerItemReportComponent,
          CustomerSearchComponent,
          CustomerSearchFormComponent,
          ShipLocationSearchComponent,
          ShipLocationSearchFormComponent,
          ConfirmationDetailsComponent,
          MobileReportContainerComponent
        ],
        providers: [
          ApiService,
          ConfigService,
          CustomersService,
          DateService,
          NavService,
          AuthService,
          MediaService,
          MockMatchMediaProvider,
          BreakPointRegistry,
          ItemPriceListService,
          ShipLocationsService,
          PriceBracketsService,
          CustomerItemPricingService,
          CustomerItemsSoldService,
          CustomerConfirmationsService
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerItemPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
