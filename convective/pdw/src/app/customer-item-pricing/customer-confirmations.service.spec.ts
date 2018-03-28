import {inject, TestBed} from '@angular/core/testing';
import {CustomerConfirmationsService} from './customer-confirmations.service';
import {ApiService} from '../shared/api/api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from '../config.service';

describe('CustomerConfirmationsService', () => {
  let httpMock: HttpTestingController;
  let customerConfirmationsService: CustomerConfirmationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CustomerConfirmationsService,
        ApiService,
        AuthService,
        ConfigService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    customerConfirmationsService = TestBed.get(CustomerConfirmationsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([CustomerConfirmationsService], (service: CustomerConfirmationsService) => {
    expect(service).toBeTruthy();
  }));
});
