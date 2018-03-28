import {inject, TestBed} from '@angular/core/testing';
import {PriceBracketsService} from './price-brackets.service';
import {ApiService} from '../shared/api/api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from '../config.service';
import {GridConfigurationService} from '../grid/grid-configuration.service';
import {DateService} from '../shared/date.service';

describe('PriceBracketsService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        PriceBracketsService,
        ApiService,
        AuthService,
        ConfigService,
        GridConfigurationService,
        DateService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([PriceBracketsService], (service: PriceBracketsService) => {
    expect(service).toBeTruthy();
  }));
});
