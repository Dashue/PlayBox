import {inject, TestBed} from '@angular/core/testing';
import {CustomerItemPricingService} from './customer-item-pricing.service';
import {ApiService} from '../shared/api/api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from '../config.service';
import {GridConfigurationService} from '../grid/grid-configuration.service';
import {DateService} from '../shared/date.service';

describe('CustomerItemPricingService', () => {
  let httpMock: HttpTestingController;
  let customerItemPricingService: CustomerItemPricingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CustomerItemPricingService,
        ApiService,
        AuthService,
        ConfigService,
        GridConfigurationService,
        DateService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    customerItemPricingService = TestBed.get(CustomerItemPricingService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([CustomerItemPricingService], (service: CustomerItemPricingService) => {
    expect(service).toBeTruthy();
  }));
});
