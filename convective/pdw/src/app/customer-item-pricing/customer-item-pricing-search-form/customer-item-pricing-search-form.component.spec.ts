import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CustomerItemPricingSearchFormComponent} from './customer-item-pricing-search-form.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ItemService} from '../../shared/item-search/item.service';
import {ApiService} from '../../shared/api/api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../../auth.service';
import {ConfigService} from '../../config.service';
import {CustomerItemPricingService} from '../customer-item-pricing.service';
import {GridConfigurationService} from '../../grid/grid-configuration.service';
import {DateService} from '../../shared/date.service';
import {CustomersService} from '../customers.service';
import {ShipLocationsService} from '../ship-locations.service';
import {PriceBracketsService} from '../price-brackets.service';
import {LookupService} from '../../shared/lookup.service';

describe('CustomerItemPricingSearchFormComponent', () => {
  let component: CustomerItemPricingSearchFormComponent;
  let fixture: ComponentFixture<CustomerItemPricingSearchFormComponent>;
  let httpMock: HttpTestingController;
  let priceBracketsService: PriceBracketsService;
  let gridConfigurationService: GridConfigurationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerItemPricingSearchFormComponent],
      imports: [
        SharedModule, RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        ItemService, ApiService, AuthService, ConfigService, CustomerItemPricingService,
        GridConfigurationService, DateService, CustomersService, ShipLocationsService,
        PriceBracketsService, LookupService
      ]
    }).compileComponents();
    httpMock = TestBed.get(HttpTestingController);
    priceBracketsService = TestBed.get(PriceBracketsService);
    gridConfigurationService = TestBed.get(GridConfigurationService);
  }));

  // TODO: mock up responses for PriceBracketsService and GridConfigurationService
  // TODO: use httpMock to expect the requests and flush the mock responses
  // afterEach(() => {
  //   httpMock.verify();
  // });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerItemPricingSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
