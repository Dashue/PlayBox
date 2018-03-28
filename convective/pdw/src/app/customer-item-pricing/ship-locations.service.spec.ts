import {inject, TestBed} from '@angular/core/testing';
import {ShipLocationsService} from './ship-locations.service';
import {ApiService} from '../shared/api/api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from '../config.service';
import {GridConfigurationService} from '../grid/grid-configuration.service';
import {DateService} from '../shared/date.service';

describe('ShipLocationsService', () => {
  let httpMock: HttpTestingController;
  let shipLocationsService: ShipLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ShipLocationsService,
        ApiService,
        AuthService,
        ConfigService,
        GridConfigurationService,
        DateService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    shipLocationsService = TestBed.get(ShipLocationsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([ShipLocationsService], (service: ShipLocationsService) => {
    expect(service).toBeTruthy();
  }));
});
