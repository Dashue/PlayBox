import {inject, TestBed} from '@angular/core/testing';
import {CustomerItemsSoldService} from './customer-items-sold.service';
import {ApiService} from '../shared/api/api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from '../config.service';
import {GridConfigurationService} from '../grid/grid-configuration.service';
import {DateService} from '../shared/date.service';

describe('CustomerItemsSoldService', () => {
  let httpMock: HttpTestingController;
  let customerItemsSoldService: CustomerItemsSoldService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CustomerItemsSoldService,
        ApiService,
        AuthService,
        ConfigService,
        GridConfigurationService,
        DateService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    customerItemsSoldService = TestBed.get(CustomerItemsSoldService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([CustomerItemsSoldService], (service: CustomerItemsSoldService) => {
    expect(service).toBeTruthy();
  }));
});
